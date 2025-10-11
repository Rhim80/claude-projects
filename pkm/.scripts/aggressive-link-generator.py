#!/usr/bin/env python3
"""
Aggressive link generator using multiple heuristics.

This approach uses:
1. Topic-based clustering (manual topic detection)
2. Cross-domain connections (10-projects ↔ 30-knowledge)
3. Keyword matching (more permissive)
4. File name similarity
"""

import os
import re
from pathlib import Path
from collections import defaultdict
import json

PKM_ROOT = Path("/Users/rhim/Projects/pkm")
MAX_LINKS_PER_FILE = 7

# Define topic clusters manually
TOPIC_KEYWORDS = {
    'leadership': ['리더십', 'leader', 'leadership', 'playing coach', 'playing-coach', '과도하게', 'alexandr wang'],
    'pkm': ['pkm', 'zettelkasten', '제텔카스텐', 'obsidian', 'johnny decimal', 'claude', 'knowledge'],
    'branding': ['브랜딩', 'branding', 'brand', '브랜드', 'identity', '아이덴티티'],
    'ai-tools': ['claude', 'gpt', 'ai', 'mcp', 'n8n', 'automation', '자동화', 'gemini'],
    'consulting': ['컨설팅', 'consulting', '강릉', 'gangneung', 'cafe', '카페'],
    'education': ['교육', 'education', 'study', 'gpters', 'learning', '학습'],
    'business': ['비즈니스', 'business', 'market', '시장', 'strategy', '전략'],
    'cafe': ['coffee', '커피', 'cafe', '카페', 'roasting', '로스팅', 'pairing', '페어링'],
}

def extract_body(content):
    """Extract body text, removing frontmatter."""
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            return parts[2]
    return content

def get_topics(file_path, content):
    """Identify topics for a file based on keywords."""
    topics = set()
    text = (file_path.name + ' ' + content).lower()

    for topic, keywords in TOPIC_KEYWORDS.items():
        for keyword in keywords:
            if keyword in text:
                topics.add(topic)
                break

    return topics

def get_category(file_path):
    """Extract Johnny Decimal category."""
    parts = str(file_path).split('/')
    for part in parts:
        if re.match(r'^\d\d-', part):
            return part
    return None

def extract_keywords(content):
    """Extract important keywords from content."""
    keywords = set()

    # Remove code blocks
    content = re.sub(r'```.*?```', '', content, flags=re.DOTALL)

    # Headers
    headers = re.findall(r'^#{1,3}\s+(.+)$', content, re.MULTILINE)
    for h in headers:
        keywords.add(h.lower().strip())

    # Wikilinks
    links = re.findall(r'\[\[([^\]]+)\]\]', content)
    for link in links:
        keywords.add(link.split('|')[0].lower().strip())

    # Korean phrases (2-4 chars)
    korean = re.findall(r'[\uac00-\ud7af]{2,4}', content)
    keywords.update(set(korean[:50]))  # Top 50

    # English words (3+ chars)
    english = re.findall(r'\b[a-z]{3,}\b', content.lower())
    keywords.update(set(english[:50]))  # Top 50

    return keywords

def calculate_score(file_a, file_b, topics_a, topics_b, keywords_a, keywords_b):
    """Calculate connection score between two files."""
    score = 0.0

    # Same topic cluster (high weight)
    common_topics = topics_a & topics_b
    if common_topics:
        score += len(common_topics) * 0.3

    # Cross-domain bonus
    cat_a = get_category(file_a)
    cat_b = get_category(file_b)
    if cat_a and cat_b:
        if (cat_a.startswith('30-') and cat_b.startswith('10-')) or \
           (cat_b.startswith('30-') and cat_a.startswith('10-')) or \
           (cat_a.startswith('30-') and cat_b.startswith('20-')) or \
           (cat_b.startswith('30-') and cat_a.startswith('20-')):
            score += 0.2

    # Keyword overlap (Jaccard)
    if keywords_a and keywords_b:
        intersection = len(keywords_a & keywords_b)
        union = len(keywords_a | keywords_b)
        if union > 0:
            score += (intersection / union) * 0.5

    # Filename similarity
    name_a = file_a.stem.lower()
    name_b = file_b.stem.lower()
    name_words_a = set(re.findall(r'[\w가-힣]+', name_a))
    name_words_b = set(re.findall(r'[\w가-힣]+', name_b))
    if name_words_a and name_words_b:
        name_overlap = len(name_words_a & name_words_b) / max(len(name_words_a), len(name_words_b))
        score += name_overlap * 0.3

    return score

def should_skip_file(file_path):
    """Check if file should be skipped."""
    # Skip hidden files
    if any(part.startswith('.') for part in file_path.parts):
        return True

    # Skip system files
    if '00-system' in str(file_path):
        return True

    # Skip reports and checklists
    if any(keyword in file_path.name.upper() for keyword in ['REPORT', 'CHECKLIST', 'CLAUDE']):
        return True

    # Skip README
    if 'README' in file_path.name:
        return True

    return False

def main():
    print("Aggressive Link Generator")
    print("=" * 80)

    # Step 1: Scan all files
    print("\nStep 1: Scanning all markdown files...")

    files_data = {}  # file_path -> {topics, keywords, content}

    for md_file in PKM_ROOT.rglob('*.md'):
        if should_skip_file(md_file):
            continue

        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()

            # Skip very short files
            if len(content.strip()) < 100:
                continue

            body = extract_body(content)
            topics = get_topics(md_file, body)
            keywords = extract_keywords(body)

            files_data[md_file] = {
                'topics': topics,
                'keywords': keywords,
                'content': content
            }

        except Exception as e:
            print(f"Error processing {md_file}: {e}")

    print(f"Processed {len(files_data)} files")

    # Step 2: Generate link suggestions
    print("\nStep 2: Generating link suggestions...")

    suggestions = defaultdict(list)  # file -> [(target, score)]

    files = list(files_data.keys())

    for i, file_a in enumerate(files):
        if i % 50 == 0:
            print(f"  Progress: {i}/{len(files)} files...")

        data_a = files_data[file_a]

        for file_b in files:
            if file_a == file_b:
                continue

            # Skip same directory
            if file_a.parent == file_b.parent:
                continue

            data_b = files_data[file_b]

            score = calculate_score(
                file_a, file_b,
                data_a['topics'], data_b['topics'],
                data_a['keywords'], data_b['keywords']
            )

            # Lower threshold for acceptance
            if score >= 0.20:
                suggestions[file_a].append((file_b, score))

    # Step 3: Rank and limit
    print("\nStep 3: Ranking and limiting suggestions...")

    final_suggestions = {}

    for file, candidates in suggestions.items():
        # Sort by score
        sorted_candidates = sorted(candidates, key=lambda x: x[1], reverse=True)

        # Take top N
        top = sorted_candidates[:MAX_LINKS_PER_FILE]

        if top:
            final_suggestions[file] = top

    # Statistics
    total_links = sum(len(targets) for targets in final_suggestions.values())
    files_with_links = len(final_suggestions)
    avg_links = total_links / files_with_links if files_with_links > 0 else 0

    print("\n" + "=" * 80)
    print("RESULTS")
    print("=" * 80)
    print(f"Total files analyzed: {len(files_data)}")
    print(f"Files with link suggestions: {files_with_links}")
    print(f"Total link suggestions: {total_links}")
    print(f"Average links per file: {avg_links:.1f}")

    # Save to JSON
    output_data = {
        'statistics': {
            'total_files': len(files_data),
            'files_with_links': files_with_links,
            'total_links': total_links,
            'avg_links_per_file': avg_links,
        },
        'suggestions': {
            str(file.relative_to(PKM_ROOT)): [
                (str(target.relative_to(PKM_ROOT)), score)
                for target, score in targets
            ]
            for file, targets in final_suggestions.items()
        }
    }

    output_file = PKM_ROOT / "AGGRESSIVE_LINK_SUGGESTIONS.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)

    print(f"\nSaved to: {output_file.relative_to(PKM_ROOT)}")
    print("=" * 80)

if __name__ == '__main__':
    main()
