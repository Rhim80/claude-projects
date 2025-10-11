#!/usr/bin/env python3
"""
Clean Notion migration metadata from PKM vault files.

This script:
1. Removes notion-id fields
2. Removes para-system and db-* tags
3. Removes hash-based aliases
4. Removes folder fields
5. Adds appropriate Johnny Decimal category based on file location
6. Updates source to notion-migration
"""

import os
import re
import sys
from pathlib import Path

PKM_ROOT = Path("/Users/rhim/Projects/pkm")

def extract_category_from_path(file_path):
    """Extract Johnny Decimal category from file path."""
    path_str = str(file_path)

    # Match patterns like 30-knowledge, 31-business, etc.
    match = re.search(r'/(\d\d-[\w-]+)/', path_str)
    if match:
        return match.group(1)

    return None

def clean_frontmatter(content, file_path):
    """Clean YAML frontmatter in markdown file."""

    # Check if file has frontmatter
    if not content.startswith('---'):
        return content

    # Extract frontmatter
    parts = content.split('---', 2)
    if len(parts) < 3:
        return content

    frontmatter = parts[1]
    body = parts[2]

    # Remove problematic fields
    lines = frontmatter.split('\n')
    cleaned_lines = []
    skip_next = False
    in_tags = False
    in_aliases = False

    for line in lines:
        # Skip empty lines at start
        if not line.strip() and not cleaned_lines:
            continue

        # Skip notion-id
        if line.startswith('notion-id:'):
            continue

        # Skip folder
        if line.startswith('folder:'):
            continue

        # Handle tags section
        if line.startswith('tags:'):
            in_tags = True
            in_aliases = False
            cleaned_lines.append('tags:')
            continue

        # Handle aliases section
        if line.startswith('aliases:'):
            in_aliases = True
            in_tags = False
            # Skip entire aliases section (usually just hash IDs)
            continue

        # Skip para-system and db-* tags
        if in_tags and line.strip().startswith('- '):
            tag = line.strip()[2:].strip('"')
            if tag in ['para-system', 'db-resources', 'db-areas', 'db-projects', 'db-archive']:
                continue
            # Stop tags section if we hit another field
            if not line.strip().startswith('- '):
                in_tags = False

        # Skip hash-based aliases
        if in_aliases and line.strip().startswith('- '):
            # Skip if it contains a hash
            if any(c in line for c in ['0123456789abcdef']*4):
                continue
            # Stop aliases section if we hit another field
            if not line.strip().startswith('- '):
                in_aliases = False

        # Stop tags/aliases if new field starts
        if line and not line.startswith(' ') and not line.startswith('-'):
            in_tags = False
            in_aliases = False

        cleaned_lines.append(line)

    # Add category and source if not present
    new_frontmatter = '\n'.join(cleaned_lines)

    # Check if category exists
    if 'category:' not in new_frontmatter:
        category = extract_category_from_path(file_path)
        if category:
            # Insert after title if exists
            if 'title:' in new_frontmatter:
                new_frontmatter = new_frontmatter.replace(
                    'title:',
                    f'title:\ncategory: {category}',
                    1
                )
            else:
                new_frontmatter = f'category: {category}\n' + new_frontmatter

    # Check if source exists
    if 'source:' not in new_frontmatter:
        # Insert after category if exists
        if 'category:' in new_frontmatter:
            new_frontmatter = new_frontmatter.replace(
                'category:',
                'category:\nsource: notion-migration',
                1
            )
        else:
            new_frontmatter = 'source: notion-migration\n' + new_frontmatter

    return f'---{new_frontmatter}---{body}'

def process_file(file_path):
    """Process a single markdown file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if file has notion-id
        if 'notion-id:' not in content:
            return False

        # Clean the content
        cleaned_content = clean_frontmatter(content, file_path)

        # Write back if changed
        if cleaned_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(cleaned_content)
            return True

        return False

    except Exception as e:
        print(f"Error processing {file_path}: {e}", file=sys.stderr)
        return False

def main():
    """Main function to process all markdown files."""

    # Find all markdown files with notion-id
    total_processed = 0
    total_updated = 0

    for md_file in PKM_ROOT.rglob('*.md'):
        # Skip hidden files and directories
        if any(part.startswith('.') for part in md_file.parts):
            continue

        # Skip reports
        if 'REPORT' in md_file.name or 'CHECKLIST' in md_file.name:
            continue

        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                if 'notion-id:' in f.read():
                    total_processed += 1
                    if process_file(md_file):
                        total_updated += 1
                        print(f"✓ Cleaned: {md_file.relative_to(PKM_ROOT)}")
        except Exception as e:
            print(f"Error reading {md_file}: {e}", file=sys.stderr)

    print(f"\n{'='*60}")
    print(f"Files processed: {total_processed}")
    print(f"Files updated: {total_updated}")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
