#!/usr/bin/env python3
"""
Analyze PKM vault quality: identify files to DELETE or SPLIT.

DELETE candidates:
- Empty or near-empty (<50 words, no content)
- Test files (temp, test in name)
- Pure metadata files

SPLIT candidates:
- >2000 words with multiple distinct topics
- Multiple H1 headers
- Clear section boundaries
"""

import os
import re
from pathlib import Path
from collections import defaultdict

PKM_ROOT = Path("/Users/rhim/Projects/pkm")

def count_words(content):
    """Count words in content, excluding frontmatter."""
    # Remove YAML frontmatter
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            content = parts[2]

    # Remove markdown syntax
    content = re.sub(r'!\[.*?\]\(.*?\)', '', content)  # Images
    content = re.sub(r'\[.*?\]\(.*?\)', '', content)   # Links
    content = re.sub(r'```.*?```', '', content, flags=re.DOTALL)  # Code blocks
    content = re.sub(r'`.*?`', '', content)  # Inline code
    content = re.sub(r'#+ ', '', content)  # Headers

    words = content.split()
    return len(words)

def count_h1_headers(content):
    """Count H1 headers in content."""
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            content = parts[2]

    # Count lines starting with '# '
    h1_count = len(re.findall(r'^# [^\n]+', content, re.MULTILINE))
    return h1_count

def is_empty_file(content, word_count):
    """Check if file is effectively empty."""
    # Remove frontmatter
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            content = parts[2]

    # Strip whitespace and check if truly empty
    body = content.strip()

    # Empty or just a title
    if not body or len(body) < 20:
        return True

    # Less than 50 words and no real content
    if word_count < 50:
        # Check if it's just links or metadata
        lines = [l.strip() for l in body.split('\n') if l.strip()]
        content_lines = [l for l in lines if not l.startswith('[[') and not l.startswith('#') and not l.startswith('생성일:')]
        if len(content_lines) < 3:
            return True

    return False

def is_test_file(file_path):
    """Check if file is a test/temp file."""
    name_lower = file_path.name.lower()
    return any(keyword in name_lower for keyword in ['(test)', '(temp)', '강의 실습용'])

def analyze_file(file_path):
    """Analyze a single file and return classification."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        word_count = count_words(content)
        h1_count = count_h1_headers(content)

        # DELETE candidates
        if is_empty_file(content, word_count):
            return 'DELETE', 'empty', word_count

        if is_test_file(file_path):
            return 'DELETE', 'test_file', word_count

        # SPLIT candidates
        if word_count > 2000:
            if h1_count > 1:
                return 'SPLIT', 'multiple_h1', word_count
            else:
                return 'SPLIT', 'long_content', word_count

        # KEEP
        return 'KEEP', 'good', word_count

    except Exception as e:
        return 'ERROR', str(e), 0

def main():
    """Main analysis function."""

    delete_candidates = []
    split_candidates = []
    keep_files = []
    errors = []

    print("Analyzing vault...")
    print("=" * 80)

    for md_file in PKM_ROOT.rglob('*.md'):
        # Skip hidden files
        if any(part.startswith('.') for part in md_file.parts):
            continue

        # Skip reports and system files
        if 'REPORT' in md_file.name or 'CHECKLIST' in md_file.name or 'README' in md_file.name:
            continue

        # Skip system folders
        if '00-system' in str(md_file):
            continue

        classification, reason, word_count = analyze_file(md_file)

        if classification == 'DELETE':
            delete_candidates.append((md_file, reason, word_count))
        elif classification == 'SPLIT':
            split_candidates.append((md_file, reason, word_count))
        elif classification == 'KEEP':
            keep_files.append((md_file, reason, word_count))
        elif classification == 'ERROR':
            errors.append((md_file, reason))

    # Print results
    print(f"\nVAULT ANALYSIS RESULTS")
    print("=" * 80)
    print(f"Total files analyzed: {len(delete_candidates) + len(split_candidates) + len(keep_files)}")
    print(f"KEEP files: {len(keep_files)}")
    print(f"DELETE candidates: {len(delete_candidates)}")
    print(f"SPLIT candidates: {len(split_candidates)}")
    print(f"Errors: {len(errors)}")

    # DELETE candidates
    if delete_candidates:
        print(f"\n{'=' * 80}")
        print(f"DELETE CANDIDATES ({len(delete_candidates)} files)")
        print(f"{'=' * 80}")

        # Group by reason
        by_reason = defaultdict(list)
        for file, reason, wc in delete_candidates:
            by_reason[reason].append((file, wc))

        for reason, files in sorted(by_reason.items()):
            print(f"\n### {reason.upper()} ({len(files)} files)")
            for file, wc in sorted(files, key=lambda x: x[1]):
                rel_path = file.relative_to(PKM_ROOT)
                print(f"  [{wc:4d}w] {rel_path}")

    # SPLIT candidates
    if split_candidates:
        print(f"\n{'=' * 80}")
        print(f"SPLIT CANDIDATES ({len(split_candidates)} files)")
        print(f"{'=' * 80}")

        for file, reason, wc in sorted(split_candidates, key=lambda x: x[2], reverse=True):
            rel_path = file.relative_to(PKM_ROOT)
            print(f"  [{wc:5d}w] {reason:15s} {rel_path}")

    # Errors
    if errors:
        print(f"\n{'=' * 80}")
        print(f"ERRORS ({len(errors)} files)")
        print(f"{'=' * 80}")
        for file, reason in errors:
            print(f"  {file.relative_to(PKM_ROOT)}: {reason}")

    print(f"\n{'=' * 80}")
    print(f"Analysis complete!")
    print(f"{'=' * 80}")

    # Save to file
    output_file = PKM_ROOT / "VAULT_QUALITY_ANALYSIS.md"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(f"# PKM Vault Quality Analysis\n\n")
        f.write(f"**Generated**: {os.popen('date').read().strip()}\n\n")
        f.write(f"## Summary\n\n")
        f.write(f"- Total files: {len(delete_candidates) + len(split_candidates) + len(keep_files)}\n")
        f.write(f"- KEEP: {len(keep_files)} files\n")
        f.write(f"- DELETE: {len(delete_candidates)} files\n")
        f.write(f"- SPLIT: {len(split_candidates)} files\n\n")

        if delete_candidates:
            f.write(f"## DELETE Candidates ({len(delete_candidates)} files)\n\n")
            by_reason = defaultdict(list)
            for file, reason, wc in delete_candidates:
                by_reason[reason].append((file, wc))

            for reason, files in sorted(by_reason.items()):
                f.write(f"### {reason.replace('_', ' ').title()} ({len(files)} files)\n\n")
                for file, wc in sorted(files, key=lambda x: x[1]):
                    f.write(f"- [{wc} words] `{file.relative_to(PKM_ROOT)}`\n")
                f.write(f"\n")

        if split_candidates:
            f.write(f"## SPLIT Candidates ({len(split_candidates)} files)\n\n")
            for file, reason, wc in sorted(split_candidates, key=lambda x: x[2], reverse=True):
                f.write(f"- [{wc} words] **{reason}**: `{file.relative_to(PKM_ROOT)}`\n")

    print(f"\nReport saved to: {output_file.relative_to(PKM_ROOT)}")

if __name__ == '__main__':
    main()
