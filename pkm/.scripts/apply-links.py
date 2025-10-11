#!/usr/bin/env python3
"""
Apply link suggestions to markdown files.

Reads AGGRESSIVE_LINK_SUGGESTIONS.json and adds "## Related Notes" sections
to files that don't already have them.
"""

import os
import json
from pathlib import Path
import re

PKM_ROOT = Path("/Users/rhim/Projects/pkm")
SUGGESTIONS_FILE = PKM_ROOT / "AGGRESSIVE_LINK_SUGGESTIONS.json"
BATCH_SIZE = 50

def has_related_notes_section(content):
    """Check if file already has a Related Notes section."""
    return bool(re.search(r'^##\s+Related Notes', content, re.MULTILINE))

def get_link_reason(source_file, target_file, score):
    """Generate a brief reason for the link based on file paths and score."""
    source_cat = None
    target_cat = None

    # Extract category
    for part in source_file.split('/'):
        if re.match(r'^\d\d-', part):
            source_cat = part
            break

    for part in target_file.split('/'):
        if re.match(r'^\d\d-', part):
            target_cat = part
            break

    # Generate reason based on categories
    if source_cat and target_cat:
        if source_cat.startswith('30-') and target_cat.startswith('10-'):
            return "실무 적용"
        elif source_cat.startswith('10-') and target_cat.startswith('30-'):
            return "이론 참고"
        elif source_cat.startswith('30-') and target_cat.startswith('20-'):
            return "운영 사례"
        elif source_cat.startswith('20-') and target_cat.startswith('30-'):
            return "관련 지식"

    # Default based on score
    if score >= 0.6:
        return "높은 연관성"
    elif score >= 0.4:
        return "관련 주제"
    else:
        return "참고"

def create_related_notes_section(suggestions):
    """Create a Related Notes markdown section."""
    lines = ["\n## Related Notes\n"]

    for target_file, score in suggestions:
        # Extract filename without extension
        target_name = Path(target_file).stem

        # Get reason
        reason = get_link_reason("", target_file, score)

        lines.append(f"- [[{target_name}]] - {reason}\n")

    return ''.join(lines)

def apply_links_to_file(file_path, suggestions):
    """Add Related Notes section to a file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Skip if already has Related Notes
        if has_related_notes_section(content):
            return 'skipped'

        # Create section
        section = create_related_notes_section(suggestions)

        # Append to end of file
        new_content = content.rstrip() + '\n' + section

        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        return 'success'

    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return 'error'

def main():
    print("Apply Links to Files")
    print("=" * 80)

    # Load suggestions
    print(f"\nLoading suggestions from {SUGGESTIONS_FILE.name}...")

    with open(SUGGESTIONS_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)

    suggestions_map = data['suggestions']

    print(f"Loaded {len(suggestions_map)} files with link suggestions")

    # Apply in batches
    total_files = len(suggestions_map)
    files_processed = 0
    files_updated = 0
    files_skipped = 0
    files_error = 0

    print(f"\nApplying links to {total_files} files...")
    print("=" * 80)

    for i, (file_rel_path, suggestions) in enumerate(suggestions_map.items()):
        file_path = PKM_ROOT / file_rel_path

        if not file_path.exists():
            print(f"File not found: {file_rel_path}")
            files_error += 1
            continue

        result = apply_links_to_file(file_path, suggestions)

        if result == 'success':
            files_updated += 1
        elif result == 'skipped':
            files_skipped += 1
        else:
            files_error += 1

        files_processed += 1

        # Progress report every 50 files
        if (i + 1) % BATCH_SIZE == 0:
            print(f"Progress: {i + 1}/{total_files} files")
            print(f"  Updated: {files_updated}, Skipped: {files_skipped}, Errors: {files_error}")

    # Final report
    print("\n" + "=" * 80)
    print("FINAL RESULTS")
    print("=" * 80)
    print(f"Total files processed: {files_processed}")
    print(f"Files updated: {files_updated}")
    print(f"Files skipped (already had links): {files_skipped}")
    print(f"Errors: {files_error}")
    print("=" * 80)

    # Verify
    print("\nVerifying results...")
    count_cmd = f'find "{PKM_ROOT}" -name "*.md" -exec grep -l "## Related Notes" {{}} \\; | wc -l'
    result = os.popen(count_cmd).read().strip()
    print(f"Total files with '## Related Notes' section: {result}")

if __name__ == '__main__':
    main()
