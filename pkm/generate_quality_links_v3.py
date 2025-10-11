#!/usr/bin/env python3
"""
Generate high-quality, meaningful links with CONSERVATIVE matching
Version 3: Much stricter - only link when there's clear semantic overlap
"""

import os
import re
from pathlib import Path
from typing import List, Dict, Tuple

# Configuration
PKM_ROOT = Path("/Users/rhim/Projects/pkm")
SIMILARITY_THRESHOLD = 0.5  # Very strict
MAX_LINKS_PER_FILE = 5
MAX_LINKS_FOR_HUBS = 10
MIN_WORDS = 150  # Increased minimum

# Strict exclusions
EXCLUDE_PATTERNS = [
    "00-system/",
    ".obsidian/",
    "node_modules/",
    ".git/",
    "/test/",
    "/tests/",
    "remove_related_notes",
    "generate_quality_links",
    "PHASE_",
    "MIGRATION_",
    "VALIDATION_",
    "_REPORT",
    "_SUMMARY",
    "AUDIT",
    "CHECKLIST",
    "readme.md",
    "README.md",
    "CHANGELOG.md",
    "LICENSE.md",
    ".scripts/",
    "package",
    "tsconfig",
    "/templates/",
    "/archive/",
    "90-archive/"
]

HUB_KEYWORDS = ["hub", "index", "마스터", "master", "모음", "collection"]

# Much more specific topic detection - require MULTIPLE strong signals
TOPIC_CLUSTERS = {
    "leadership-philosophy": {
        # Alexandr Wang, Playing Coach, leadership transformation
        "required_any": ["alexandr wang", "playing coach", "플레잉 코치"],
        "supporting": ["리더십 변화", "leadership transformation", "do too much", "과도하게"],
        "min_signals": 2
    },
    "pkm-zettelkasten": {
        "required_any": ["zettelkasten", "제텔카스텐", "johnny decimal"],
        "supporting": ["pkm", "obsidian", "노트 시스템", "knowledge management"],
        "min_signals": 2
    },
    "claude-code": {
        "required_any": ["claude code", "claudesidian", "noah brier"],
        "supporting": ["mcp", "sub-agent", "서브에이전트"],
        "min_signals": 2
    },
    "n8n-automation": {
        "required_any": ["n8n workflow", "n8n 워크플로우", "n8n automation"],
        "supporting": ["webhook", "gmail classifier", "payroll"],
        "min_signals": 2
    },
    "cafe-pairing": {
        "required_any": ["페어링 디저트", "pairing dessert", "imi coffee 메뉴"],
        "supporting": ["카페 운영", "커피", "로스팅"],
        "min_signals": 2
    },
    "gpters-study": {
        "required_any": ["gpters 19기", "gpters 18기", "gpters cohort"],
        "supporting": ["ai 브랜딩", "스터디"],
        "min_signals": 2
    },
    "brand-identity-system": {
        "required_any": ["brand identity builder", "브랜드 아이덴티티 빌더", "prd v2"],
        "supporting": ["next.js", "gemini", "supabase"],
        "min_signals": 2
    }
}

def should_exclude(file_path: Path) -> bool:
    """Check if file should be excluded"""
    path_str = str(file_path).lower()

    for pattern in EXCLUDE_PATTERNS:
        if pattern.lower() in path_str:
            return True

    # Exclude very deep paths
    if len(file_path.relative_to(PKM_ROOT).parts) > 7:
        return True

    return False

def is_hub_note(file_path: Path) -> bool:
    """Check if file is a hub note"""
    filename = file_path.stem.lower()
    return any(keyword in filename for keyword in HUB_KEYWORDS)

def detect_topic(content: str, topic_config: Dict) -> bool:
    """
    Detect if content matches topic with STRICT criteria.
    Must have required keyword AND multiple supporting signals.
    """
    content_lower = content.lower()

    # Must have at least one required keyword
    has_required = any(req in content_lower for req in topic_config["required_any"])
    if not has_required:
        return False

    # Count supporting signals
    supporting_count = sum(1 for sup in topic_config["supporting"]
                          if sup in content_lower)

    # Must meet minimum signal threshold
    return supporting_count >= topic_config["min_signals"]

def extract_topics(content: str) -> set:
    """Extract topics with CONSERVATIVE matching"""
    detected_topics = set()

    for topic, config in TOPIC_CLUSTERS.items():
        if detect_topic(content, config):
            detected_topics.add(topic)

    return detected_topics

def extract_key_concepts(content: str, file_path: Path) -> Dict:
    """Extract key concepts conservatively"""
    # Remove frontmatter
    content = re.sub(r'^---\n.*?\n---\n', '', content, flags=re.DOTALL)

    # Title
    title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    title = title_match.group(1) if title_match else file_path.stem

    # Word count
    word_count = len(content.split())

    # Path category
    parts = file_path.relative_to(PKM_ROOT).parts
    category = parts[0] if len(parts) > 0 else "unknown"

    # Topics (strict detection)
    topics = extract_topics(content)

    # Extract specific entities (very specific)
    entities = []
    content_lower = content.lower()

    if "alexandr wang" in content_lower:
        entities.append("alexandr-wang")
    if "noah brier" in content_lower:
        entities.append("noah-brier")
    if "강릉" in content_lower or "gangneung" in content_lower:
        entities.append("gangneung-cafe")
    if "gpters 19" in content_lower:
        entities.append("gpters-19")
    if "brand identity builder" in content_lower:
        entities.append("brand-builder")

    return {
        "title": title,
        "word_count": word_count,
        "category": category,
        "topics": topics,
        "entities": entities,
        "content": content
    }

def calculate_similarity(file1_data: Dict, file2_data: Dict,
                        file1_path: Path, file2_path: Path) -> float:
    """Calculate similarity with VERY strict matching"""
    score = 0.0

    # Topic overlap (must share specific topics)
    common_topics = file1_data["topics"] & file2_data["topics"]
    if common_topics:
        # Strong signal for shared specific topics
        score += 0.6 * len(common_topics)

    # Entity overlap (specific people/projects)
    common_entities = set(file1_data["entities"]) & set(file2_data["entities"])
    if common_entities:
        score += 0.4 * len(common_entities)

    # Penalty for same category (already related by folder)
    if file1_data["category"] == file2_data["category"]:
        score -= 0.2

    # Cross-domain bonus (theory meets practice)
    cat1 = file1_data["category"]
    cat2 = file2_data["category"]

    valuable_pairs = [
        ("10-projects", "30-knowledge"),
        ("11-consulting", "30-knowledge"),
        ("20-operations", "30-knowledge")
    ]

    for pair in valuable_pairs:
        if (cat1.startswith(pair[0]) and cat2.startswith(pair[1])) or \
           (cat1.startswith(pair[1]) and cat2.startswith(pair[0])):
            score += 0.3
            break

    return max(0.0, min(score, 1.0))

def generate_specific_context(file1_data: Dict, file2_data: Dict,
                              file1_path: Path, file2_path: Path) -> str:
    """Generate HIGHLY specific context"""

    common_topics = file1_data["topics"] & file2_data["topics"]
    common_entities = set(file1_data["entities"]) & set(file2_data["entities"])

    # Most specific: shared entities
    if "alexandr-wang" in common_entities:
        return "Alexandr Wang의 'Do Too Much' 리더십 철학"
    if "noah-brier" in common_entities:
        return "Noah Brier의 Claudesidian PKM 시스템"
    if "gangneung-cafe" in common_entities:
        return "강릉 카페 프로젝트 관련"
    if "gpters-19" in common_entities:
        return "GPTers 19기 스터디 관련"
    if "brand-builder" in common_entities:
        return "Brand Identity Builder 시스템"

    # Topic-specific contexts
    if "leadership-philosophy" in common_topics:
        return "리더십 변화와 조직 문화 혁신"
    if "pkm-zettelkasten" in common_topics:
        return "제텔카스텐 PKM 시스템 구축 방법"
    if "claude-code" in common_topics:
        return "Claude Code와 MCP 활용법"
    if "n8n-automation" in common_topics:
        return "n8n 워크플로우 자동화 시스템"
    if "cafe-pairing" in common_topics:
        return "카페 메뉴와 페어링 디저트 운영"
    if "gpters-study" in common_topics:
        return "GPTers AI 브랜딩 스터디"
    if "brand-identity-system" in common_topics:
        return "브랜드 아이덴티티 시스템 개발"

    # Cross-domain
    cat1 = file1_data["category"]
    cat2 = file2_data["category"]

    if cat1.startswith("10-projects") and cat2.startswith("30-knowledge"):
        return "프로젝트 실무에서 활용한 지식과 이론"
    if cat1.startswith("30-knowledge") and cat2.startswith("10-projects"):
        return "지식의 실전 프로젝트 적용 사례"

    return "관련 개념과 방법론"

def find_related_files(target_path: Path, target_data: Dict,
                       all_files_data: Dict[Path, Dict]) -> List[Tuple[Path, float, str]]:
    """Find related files conservatively"""

    max_links = MAX_LINKS_FOR_HUBS if is_hub_note(target_path) else MAX_LINKS_PER_FILE

    candidates = []

    for other_path, other_data in all_files_data.items():
        if other_path == target_path:
            continue

        score = calculate_similarity(target_data, other_data, target_path, other_path)

        if score >= SIMILARITY_THRESHOLD:
            context = generate_specific_context(target_data, other_data,
                                              target_path, other_path)
            candidates.append((other_path, score, context))

    candidates.sort(key=lambda x: x[1], reverse=True)
    return candidates[:max_links]

def main():
    """Main execution"""

    print("="*60)
    print("QUALITY LINK GENERATION V3 - CONSERVATIVE")
    print("="*60)
    print(f"Threshold: {SIMILARITY_THRESHOLD} (very strict)")
    print(f"Max links: {MAX_LINKS_PER_FILE}")
    print(f"Min words: {MIN_WORDS}")
    print(f"Topic clusters: {len(TOPIC_CLUSTERS)}")
    print("="*60)
    print()

    # Find files
    all_files = [f for f in PKM_ROOT.rglob("*.md") if not should_exclude(f)]

    print(f"Found {len(all_files)} eligible files")
    print("Analyzing...\n")

    # Extract data
    all_files_data = {}
    skipped = 0

    for i, file_path in enumerate(all_files, 1):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            word_count = len(content.split())
            if word_count < MIN_WORDS:
                skipped += 1
                continue

            file_data = extract_key_concepts(content, file_path)
            all_files_data[file_path] = file_data

            if i % 100 == 0:
                print(f"[{i}/{len(all_files)}] Analyzed...")

        except Exception as e:
            print(f"ERROR: {file_path.relative_to(PKM_ROOT)}: {e}")

    print(f"\nAnalyzed: {len(all_files_data)} files")
    print(f"Skipped: {skipped}")
    print()

    # Generate links
    print("="*60)
    print("GENERATING LINKS (CONSERVATIVE)")
    print("="*60)
    print()

    link_suggestions = {}
    total_links = 0

    for i, (file_path, file_data) in enumerate(all_files_data.items(), 1):
        related = find_related_files(file_path, file_data, all_files_data)

        if related:
            link_suggestions[file_path] = related
            total_links += len(related)

        if i % 50 == 0:
            avg = total_links / i if i > 0 else 0
            print(f"[{i}/{len(all_files_data)}] Avg: {avg:.1f}")

    print(f"\n{'='*60}")
    print(f"Files with links: {len(link_suggestions)}")
    print(f"Total links: {total_links}")
    if len(link_suggestions) > 0:
        print(f"Average: {total_links / len(link_suggestions):.1f}")
    print(f"{'='*60}")
    print()

    # Apply
    print("Applying...\n")

    applied = 0

    for i, (file_path, related_files) in enumerate(link_suggestions.items(), 1):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            related_section = "\n## Related Notes\n\n"

            for related_path, score, context in related_files:
                rel_path = related_path.relative_to(PKM_ROOT)
                link_path = str(rel_path).replace('.md', '')
                related_section += f"- [[{link_path}]] - {context}\n"

            new_content = content.rstrip() + '\n' + related_section

            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)

            applied += 1

            if i % 50 == 0:
                print(f"[{i}/{len(link_suggestions)}] Applied to {i} files")

        except Exception as e:
            print(f"ERROR: {file_path.relative_to(PKM_ROOT)}: {e}")

    print(f"\n{'='*60}")
    print("FINAL RESULTS")
    print(f"{'='*60}")
    print(f"Analyzed: {len(all_files)} files")
    print(f"Files with links: {applied}")
    print(f"Total links: {total_links}")
    if applied > 0:
        print(f"Average per file: {total_links / applied:.1f}")
        print(f"Coverage: {applied / len(all_files) * 100:.1f}%")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
