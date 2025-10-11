#!/usr/bin/env python3
"""
Generate link suggestions for PKM vault using semantic analysis.

This script:
1. Extracts key concepts from all files
2. Calculates semantic similarity
3. Generates bidirectional link suggestions
4. Identifies hub notes

Uses simple but effective heuristics:
- TF-IDF-like concept extraction
- Jaccard similarity for linking
- Hub detection via degree centrality
"""

import os
import re
from pathlib import Path
from collections import defaultdict, Counter
import json

PKM_ROOT = Path("/Users/rhim/Projects/pkm")
MIN_CONFIDENCE = 0.15  # Lower threshold for more connections
MAX_SUGGESTIONS = 7    # Allow more links per file
MIN_WORD_COUNT = 30    # Lower minimum word count

# Korean stopwords and common words to filter
KOREAN_STOPWORDS = {
    '있습니다', '합니다', '합니다', '것입니다', '수', '때문', '경우', '있다', '하다',
    '되다', '이다', '아니다', '있는', '하는', '된', '등', '및', '것', '수있다',
    '통해', '대한', '위한', '같은', '있어', '따라', '관련', '경우', '있으며',
}

ENGLISH_STOPWORDS = {
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
    'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
    'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this',
    'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
}

def extract_body(content):
    """Extract body text, removing frontmatter."""
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            return parts[2]
    return content

def extract_title(file_path):
    """Extract clean title from filename."""
    # Remove extension
    title = file_path.stem

    # Remove date prefix patterns (YYYY-MM-DD, YYYY-MM, etc.)
    title = re.sub(r'^\d{4}-\d{2}(-\d{2})?[-_\s]*', '', title)

    # Remove numbers at start
    title = re.sub(r'^\d+[-_\s.]*', '', title)

    return title

def extract_concepts(content, title):
    """Extract key concepts from content using simple heuristics."""
    concepts = set()

    # Remove code blocks
    content = re.sub(r'```.*?```', '', content, flags=re.DOTALL)
    content = re.sub(r'`[^`]+`', '', content)

    # Extract from headers (H1-H3)
    headers = re.findall(r'^#{1,3}\s+(.+)$', content, re.MULTILINE)
    for header in headers:
        cleaned = re.sub(r'[#*`\[\]]', '', header).strip()
        if cleaned and len(cleaned) > 2:
            concepts.add(cleaned.lower())

    # Extract [[wikilinks]]
    wikilinks = re.findall(r'\[\[([^\]]+)\]\]', content)
    for link in wikilinks:
        # Take first part if there's a | separator
        link_text = link.split('|')[0].strip()
        if link_text and len(link_text) > 2:
            concepts.add(link_text.lower())

    # Extract Korean phrases (2-4 words)
    korean_phrases = re.findall(r'[\uac00-\ud7af]+([\s_-][\uac00-\ud7af]+){1,3}', content)
    for phrase in korean_phrases:
        phrase_text = phrase[0] if isinstance(phrase, tuple) else phrase
        cleaned = re.sub(r'[^\uac00-\ud7af\s]', '', phrase_text).strip()
        if cleaned and len(cleaned) > 3 and cleaned not in KOREAN_STOPWORDS:
            concepts.add(cleaned.lower())

    # Extract English multi-word terms (2-4 words)
    english_phrases = re.findall(r'\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})\b', content)
    for phrase in english_phrases:
        words = phrase.lower().split()
        if all(w not in ENGLISH_STOPWORDS for w in words):
            concepts.add(phrase.lower())

    # Extract hashtags (common in markdown)
    hashtags = re.findall(r'#([\w가-힣]+)', content)
    for tag in hashtags:
        if len(tag) > 2:
            concepts.add(tag.lower())

    # Add title as a concept
    if title:
        concepts.add(title.lower())

    return concepts

def calculate_similarity(concepts_a, concepts_b):
    """Calculate Jaccard similarity between two concept sets."""
    if not concepts_a or not concepts_b:
        return 0.0

    intersection = len(concepts_a & concepts_b)
    union = len(concepts_a | concepts_b)

    if union == 0:
        return 0.0

    return intersection / union

def extract_category_from_path(file_path):
    """Extract Johnny Decimal category."""
    match = re.search(r'/(\d\d-[\w-]+)/', str(file_path))
    return match.group(1) if match else None

def should_link(file_a, file_b, similarity):
    """Determine if two files should be linked."""
    # Don't link if same file
    if file_a == file_b:
        return False

    # Don't link if in same immediate directory (already related)
    if file_a.parent == file_b.parent:
        return False

    # Must meet minimum similarity threshold
    if similarity < MIN_CONFIDENCE:
        return False

    # Boost cross-domain links (knowledge ↔ projects ↔ operations)
    cat_a = extract_category_from_path(file_a)
    cat_b = extract_category_from_path(file_b)

    if cat_a and cat_b:
        # Cross-domain bonus (30 ↔ 10, 30 ↔ 20, 10 ↔ 20)
        if (cat_a.startswith('30-') and cat_b.startswith('10-')) or \
           (cat_a.startswith('30-') and cat_b.startswith('20-')) or \
           (cat_a.startswith('10-') and cat_b.startswith('20-')) or \
           (cat_b.startswith('30-') and cat_a.startswith('10-')) or \
           (cat_b.startswith('30-') and cat_a.startswith('20-')) or \
           (cat_b.startswith('10-') and cat_a.startswith('20-')):
            return similarity >= (MIN_CONFIDENCE * 0.8)  # Lower threshold for cross-domain

    return True

def main():
    """Main link generation function."""

    print("Generating link suggestions...")
    print("=" * 80)

    # Step 1: Extract concepts from all files
    file_concepts = {}
    file_content_map = {}

    print("\nStep 1: Extracting concepts from all files...")

    for md_file in PKM_ROOT.rglob('*.md'):
        # Skip hidden, system, and reports
        if any(part.startswith('.') for part in md_file.parts):
            continue
        if '00-system' in str(md_file):
            continue
        if 'node_modules' in str(md_file):
            continue
        if any(keyword in md_file.name for keyword in ['REPORT', 'CHECKLIST', 'README', 'CLAUDE']):
            continue

        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()

            body = extract_body(content)
            title = extract_title(md_file)
            concepts = extract_concepts(body, title)

            if concepts:  # Only process files with concepts
                file_concepts[md_file] = concepts
                file_content_map[md_file] = content

        except Exception as e:
            print(f"Error processing {md_file}: {e}")

    print(f"Processed {len(file_concepts)} files")

    # Step 2: Calculate similarities and generate suggestions
    print("\nStep 2: Calculating similarities and generating suggestions...")

    suggestions = defaultdict(list)  # file -> [(target_file, similarity)]

    files = list(file_concepts.keys())
    total_comparisons = len(files) * (len(files) - 1) // 2

    print(f"Comparing {len(files)} files ({total_comparisons} comparisons)...")

    for i, file_a in enumerate(files):
        if i % 50 == 0:
            print(f"  Progress: {i}/{len(files)} files...")

        for file_b in files[i+1:]:
            similarity = calculate_similarity(file_concepts[file_a], file_concepts[file_b])

            if should_link(file_a, file_b, similarity):
                suggestions[file_a].append((file_b, similarity))
                suggestions[file_b].append((file_a, similarity))

    # Step 3: Rank and limit suggestions
    print("\nStep 3: Ranking and limiting suggestions...")

    final_suggestions = {}

    for file, candidates in suggestions.items():
        # Sort by similarity (highest first)
        sorted_candidates = sorted(candidates, key=lambda x: x[1], reverse=True)

        # Take top N
        top_suggestions = sorted_candidates[:MAX_SUGGESTIONS]

        if top_suggestions:
            final_suggestions[file] = top_suggestions

    # Step 4: Identify hub notes
    print("\nStep 4: Identifying hub notes...")

    # Count incoming links (degree centrality)
    link_counts = Counter()
    for file, targets in final_suggestions.items():
        for target, _ in targets:
            link_counts[target] += 1

    # Hubs are files with many incoming links
    hub_candidates = [(file, count) for file, count in link_counts.most_common(20) if count >= 5]

    # Statistics
    total_links = sum(len(targets) for targets in final_suggestions.values())
    files_with_links = len(final_suggestions)
    avg_links = total_links / files_with_links if files_with_links > 0 else 0

    print("\n" + "=" * 80)
    print("LINK SUGGESTION RESULTS")
    print("=" * 80)
    print(f"Total files analyzed: {len(file_concepts)}")
    print(f"Files with link suggestions: {files_with_links}")
    print(f"Total link suggestions: {total_links}")
    print(f"Average links per file: {avg_links:.1f}")
    print(f"Hub candidates identified: {len(hub_candidates)}")

    # Save results to JSON for later processing
    output_data = {
        'statistics': {
            'total_files': len(file_concepts),
            'files_with_links': files_with_links,
            'total_links': total_links,
            'avg_links_per_file': avg_links,
            'hub_candidates': len(hub_candidates),
        },
        'suggestions': {
            str(file.relative_to(PKM_ROOT)): [
                (str(target.relative_to(PKM_ROOT)), score)
                for target, score in targets
            ]
            for file, targets in final_suggestions.items()
        },
        'hubs': [
            (str(file.relative_to(PKM_ROOT)), count)
            for file, count in hub_candidates
        ]
    }

    output_file = PKM_ROOT / "LINK_SUGGESTIONS.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)

    print(f"\nSuggestions saved to: {output_file.relative_to(PKM_ROOT)}")

    # Generate human-readable report
    report_file = PKM_ROOT / "LINK_SUGGESTIONS_REPORT.md"
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write("# PKM Vault Link Suggestions\n\n")
        f.write(f"**Generated**: {os.popen('date').read().strip()}\n\n")

        f.write("## Statistics\n\n")
        f.write(f"- Total files analyzed: {len(file_concepts)}\n")
        f.write(f"- Files with link suggestions: {files_with_links}\n")
        f.write(f"- Total link suggestions: {total_links}\n")
        f.write(f"- Average links per file: {avg_links:.1f}\n")
        f.write(f"- Hub candidates: {len(hub_candidates)}\n\n")

        f.write("## Hub Note Candidates\n\n")
        f.write("These files have many incoming links and should become hub notes:\n\n")
        for file, count in hub_candidates:
            f.write(f"- **{file.relative_to(PKM_ROOT)}** ({count} incoming links)\n")

        f.write("\n## Sample Link Suggestions\n\n")
        f.write("Showing first 20 files with suggestions:\n\n")

        sample_count = 0
        for file, targets in sorted(final_suggestions.items(), key=lambda x: len(x[1]), reverse=True):
            if sample_count >= 20:
                break

            f.write(f"### {file.name}\n")
            f.write(f"`{file.relative_to(PKM_ROOT)}`\n\n")
            f.write(f"**Suggested links** ({len(targets)}):\n\n")

            for target, score in targets:
                f.write(f"- [{score:.2f}] [[{target.stem}]] - `{target.relative_to(PKM_ROOT)}`\n")

            f.write("\n")
            sample_count += 1

    print(f"Report saved to: {report_file.relative_to(PKM_ROOT)}")

    print("\n" + "=" * 80)
    print("Link suggestion generation complete!")
    print("=" * 80)

if __name__ == '__main__':
    main()
