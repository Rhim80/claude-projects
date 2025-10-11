#!/usr/bin/env python3
"""
Zettelkasten Link Generator - FINAL VERSION
Threshold: 0.25 (balanced)
Max Links: 5 per file
Context: Specific and meaningful
"""

import os
import re
from pathlib import Path
from collections import defaultdict
from dataclasses import dataclass
from typing import List, Set, Tuple
import math

# CONFIGURATION
PKM_ROOT = Path("/Users/rhim/Projects/pkm")
SIMILARITY_THRESHOLD = 0.25
MAX_LINKS_PER_FILE = 5
MIN_WORDS = 100
MIN_CONFIDENCE = 0.6

# EXCLUDE PATTERNS
EXCLUDE_PATTERNS = [
    "node_modules/",
    ".obsidian/",
    "README.md",
    "00-system/05-reports/",
    "90-archive/",
    "report.md",
    "validation.md",
    "audit.md",
    "checklist.md",
]

# TOPIC CLUSTERS (7 major topics)
TOPIC_CLUSTERS = {
    "pkm_systems": {
        "keywords": ["pkm", "zettelkasten", "obsidian", "johnny decimal", "knowledge management", "second brain"],
        "weight": 1.5
    },
    "ai_automation": {
        "keywords": ["claude", "ai", "automation", "n8n", "mcp", "workflow", "agent"],
        "weight": 1.5
    },
    "business_strategy": {
        "keywords": ["business", "strategy", "consulting", "branding", "brand identity", "positioning"],
        "weight": 1.3
    },
    "education": {
        "keywords": ["gpters", "study", "education", "teaching", "learning", "course", "curriculum"],
        "weight": 1.3
    },
    "cafe_operations": {
        "keywords": ["cafe", "coffee", "roasting", "pairing", "bakery", "operations", "menu"],
        "weight": 1.2
    },
    "leadership": {
        "keywords": ["leadership", "playing coach", "team", "culture", "management"],
        "weight": 1.2
    },
    "content_creation": {
        "keywords": ["content", "osmu", "blog", "ghost", "youtube", "instagram", "seo"],
        "weight": 1.2
    }
}

@dataclass
class Document:
    path: Path
    relative_path: str
    content: str
    word_count: int
    topics: Set[str]
    key_concepts: List[str]

class ZettelkastenLinker:
    def __init__(self):
        self.documents: List[Document] = []
        self.links_generated = 0
        self.files_processed = 0

    def should_exclude(self, path: Path) -> bool:
        """Check if file should be excluded"""
        path_str = str(path)
        for pattern in EXCLUDE_PATTERNS:
            if pattern in path_str:
                return True
        return False

    def extract_key_concepts(self, content: str) -> List[str]:
        """Extract key concepts from content"""
        concepts = []

        # Extract headers
        headers = re.findall(r'^#{1,3}\s+(.+)$', content, re.MULTILINE)
        concepts.extend([h.strip() for h in headers])

        # Extract emphasized terms (bold/italic)
        emphasized = re.findall(r'\*\*(.+?)\*\*|__(.+?)__|_(.+?)_|\*(.+?)\*', content)
        for match in emphasized:
            concept = next((m for m in match if m), None)
            if concept:
                concepts.append(concept.strip())

        # Extract quoted terms
        quoted = re.findall(r'"([^"]+)"', content)
        concepts.extend([q.strip() for q in quoted if len(q.split()) <= 4])

        return concepts[:20]  # Top 20 concepts

    def get_topics(self, content: str) -> Set[str]:
        """Determine which topics this document belongs to"""
        content_lower = content.lower()
        topics = set()

        for topic_name, topic_data in TOPIC_CLUSTERS.items():
            for keyword in topic_data["keywords"]:
                if keyword in content_lower:
                    topics.add(topic_name)
                    break

        return topics

    def load_documents(self):
        """Load all markdown files from PKM vault"""
        print("Loading documents...")

        for md_file in PKM_ROOT.rglob("*.md"):
            if self.should_exclude(md_file):
                continue

            try:
                content = md_file.read_text(encoding='utf-8')
                word_count = len(content.split())

                if word_count < MIN_WORDS:
                    continue

                relative_path = str(md_file.relative_to(PKM_ROOT))
                topics = self.get_topics(content)
                key_concepts = self.extract_key_concepts(content)

                doc = Document(
                    path=md_file,
                    relative_path=relative_path,
                    content=content,
                    word_count=word_count,
                    topics=topics,
                    key_concepts=key_concepts
                )

                self.documents.append(doc)

            except Exception as e:
                print(f"Error loading {md_file}: {e}")

        print(f"Loaded {len(self.documents)} documents")

    def calculate_similarity(self, doc1: Document, doc2: Document) -> Tuple[float, str]:
        """Calculate similarity between two documents with context"""
        score = 0.0
        context_parts = []

        # Topic overlap bonus
        topic_overlap = doc1.topics & doc2.topics
        if topic_overlap:
            topic_weight = sum(TOPIC_CLUSTERS[t]["weight"] for t in topic_overlap) / len(topic_overlap)
            score += 0.3 * topic_weight
            context_parts.append(f"{', '.join(topic_overlap)} 관련")

        # Key concept overlap
        doc1_concepts_lower = set(c.lower() for c in doc1.key_concepts)
        doc2_concepts_lower = set(c.lower() for c in doc2.key_concepts)
        concept_overlap = doc1_concepts_lower & doc2_concepts_lower

        if concept_overlap:
            overlap_ratio = len(concept_overlap) / min(len(doc1_concepts_lower), len(doc2_concepts_lower))
            score += 0.4 * overlap_ratio

            # Add specific concept to context
            top_concept = list(concept_overlap)[0]
            context_parts.append(f"'{top_concept}' 개념 공유")

        # Cross-domain bonus (different top-level folders)
        path1_parts = doc1.relative_path.split('/')
        path2_parts = doc2.relative_path.split('/')

        if len(path1_parts) > 0 and len(path2_parts) > 0:
            if path1_parts[0] != path2_parts[0]:
                score += 0.1
                context_parts.append(f"{path1_parts[0]} ↔ {path2_parts[0]} 연결")

        # Text similarity (simple term frequency)
        doc1_terms = set(re.findall(r'\b\w{3,}\b', doc1.content.lower()))
        doc2_terms = set(re.findall(r'\b\w{3,}\b', doc2.content.lower()))

        if doc1_terms and doc2_terms:
            jaccard = len(doc1_terms & doc2_terms) / len(doc1_terms | doc2_terms)
            score += 0.2 * jaccard

        # Generate context string
        if not context_parts:
            context_parts.append("개념적 연관성")

        context = "; ".join(context_parts[:2])  # Max 2 context parts

        return score, context

    def find_related_notes(self, doc: Document) -> List[Tuple[Document, float, str]]:
        """Find related notes for a document"""
        similarities = []

        for other_doc in self.documents:
            if doc.path == other_doc.path:
                continue

            # Skip if same directory (already related by folder structure)
            if doc.path.parent == other_doc.path.parent:
                continue

            similarity, context = self.calculate_similarity(doc, other_doc)

            if similarity >= SIMILARITY_THRESHOLD:
                similarities.append((other_doc, similarity, context))

        # Sort by similarity and return top N
        similarities.sort(key=lambda x: x[1], reverse=True)
        return similarities[:MAX_LINKS_PER_FILE]

    def generate_wiki_link(self, source_doc: Document, target_doc: Document) -> str:
        """Generate Obsidian wiki link"""
        # Remove .md extension and create wiki link
        link_path = target_doc.relative_path.replace('.md', '')
        return f"[[{link_path}]]"

    def add_links_to_document(self, doc: Document, related_notes: List[Tuple[Document, float, str]]):
        """Add Related Notes section to document"""
        if not related_notes:
            return

        # Check if document already has Related Notes section
        if "## Related Notes" in doc.content:
            return

        # Generate links section
        links_section = "\n\n## Related Notes\n\n"

        for target_doc, similarity, context in related_notes:
            wiki_link = self.generate_wiki_link(doc, target_doc)
            links_section += f"- {wiki_link} - {context}\n"

        # Append to document
        new_content = doc.content.rstrip() + links_section

        try:
            doc.path.write_text(new_content, encoding='utf-8')
            self.links_generated += len(related_notes)
            self.files_processed += 1

            if self.files_processed % 10 == 0:
                print(f"Processed {self.files_processed} files, generated {self.links_generated} links...")

        except Exception as e:
            print(f"Error writing to {doc.path}: {e}")

    def run(self):
        """Main execution"""
        print("\n" + "="*60)
        print("ZETTELKASTEN LINK GENERATOR - FINAL RUN")
        print("="*60)
        print(f"Threshold: {SIMILARITY_THRESHOLD}")
        print(f"Max Links: {MAX_LINKS_PER_FILE}")
        print(f"Min Words: {MIN_WORDS}")
        print("="*60 + "\n")

        # Load documents
        self.load_documents()

        # Generate links
        print("\nGenerating links...")
        for doc in self.documents:
            related_notes = self.find_related_notes(doc)
            self.add_links_to_document(doc, related_notes)

        # Final statistics
        print("\n" + "="*60)
        print("FINAL STATISTICS")
        print("="*60)
        print(f"Total documents analyzed: {len(self.documents)}")
        print(f"Files with links added: {self.files_processed}")
        print(f"Total links generated: {self.links_generated}")

        if self.files_processed > 0:
            avg_links = self.links_generated / self.files_processed
            print(f"Average links per file: {avg_links:.1f}")
            coverage = (self.files_processed / len(self.documents)) * 100
            print(f"Coverage: {coverage:.1f}%")

        print("="*60 + "\n")

if __name__ == "__main__":
    linker = ZettelkastenLinker()
    linker.run()
