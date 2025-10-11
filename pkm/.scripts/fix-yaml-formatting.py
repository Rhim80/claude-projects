#!/usr/bin/env python3
"""
Fix YAML frontmatter formatting after metadata cleaning.
"""

import os
import re
from pathlib import Path

PKM_ROOT = Path("/Users/rhim/Projects/pkm")

def fix_yaml_formatting(content, file_path):
    """Fix concatenated YAML fields."""

    if not content.startswith('---'):
        return content

    parts = content.split('---', 2)
    if len(parts) < 3:
        return content

    frontmatter = parts[1]
    body = parts[2]

    # Fix concatenated title/category/source
    fixed = frontmatter

    # Pattern: "---title:\ncategory:\nsource: notion-migration XX-folder "Title""
    # Should be: "---\ntitle: "Title"\ncategory: XX-folder\nsource: notion-migration"

    # Extract title value (in quotes at the end)
    title_match = re.search(r'"([^"]+)"\s*$', frontmatter, re.MULTILINE)
    title = title_match.group(1) if title_match else ""

    # Extract category (XX-folder pattern before title)
    category_match = re.search(r'notion-migration\s+(\d\d-[\w-]+)', frontmatter)
    category = category_match.group(1) if category_match else ""

    # If we found both, reconstruct properly
    if title and category:
        # Remove the malformed parts
        fixed = re.sub(r'title:\s*category:\s*source: notion-migration.*$', '', frontmatter, flags=re.MULTILINE | re.DOTALL)

        # Build proper YAML
        yaml_lines = ["\n"]
        yaml_lines.append(f'title: "{title}"\n')
        yaml_lines.append(f'category: {category}\n')
        yaml_lines.append(f'source: notion-migration\n')

        # Find tags section if it exists
        tags_match = re.search(r'(tags:.*?)(?=\n\w|\Z)', frontmatter, re.DOTALL)
        if tags_match:
            tags_section = tags_match.group(1).strip()
            # Clean up old hash-based tags
            if 'e4dd2c14' not in tags_section or '1d9d0f53' not in tags_section:  # Not a hash
                yaml_lines.append(tags_section + '\n')

        # Find published field
        if 'published:' in frontmatter:
            pub_match = re.search(r'published:\s*(\w+)', frontmatter)
            if pub_match:
                yaml_lines.append(f'published: {pub_match.group(1)}\n')

        fixed = ''.join(yaml_lines)

    return f'---{fixed}---{body}'

def process_file(file_path):
    """Process a single file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if file has malformed YAML
        if content.startswith('---title:'):
            fixed_content = fix_yaml_formatting(content, file_path)

            if fixed_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(fixed_content)
                return True

        return False

    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """Main function."""
    total_fixed = 0

    for md_file in PKM_ROOT.rglob('*.md'):
        # Skip hidden files
        if any(part.startswith('.') for part in md_file.parts):
            continue

        # Skip reports
        if 'REPORT' in md_file.name or 'CHECKLIST' in md_file.name:
            continue

        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                first_line = f.readline()
                if first_line.startswith('---title:'):
                    if process_file(md_file):
                        total_fixed += 1
                        print(f"✓ Fixed: {md_file.relative_to(PKM_ROOT)}")
        except Exception:
            pass

    print(f"\n{'='*60}")
    print(f"Files fixed: {total_fixed}")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
