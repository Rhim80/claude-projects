#!/usr/bin/env python3
"""
Workflowy Consulting Projects Splitter
Splits workflowy-consulting PROJECT.txt into individual project files based on project markers
"""

import re
from pathlib import Path
from datetime import datetime

def sanitize_filename(name):
    """Create a safe filename from project name"""
    # Remove hashtags for filename
    name = re.sub(r'#\w+', '', name).strip()
    # Remove special characters
    name = re.sub(r'[<>:"/\\|?*]', '', name)
    # Replace spaces with hyphens
    name = name.replace(' ', '-')
    # Remove multiple hyphens
    name = re.sub(r'-+', '-', name)
    # Remove leading/trailing hyphens
    name = name.strip('-')
    # Limit length
    if len(name) > 80:
        name = name[:80]

    return name if name else 'untitled'

def extract_hashtags(text):
    """Extract all hashtags from text"""
    return re.findall(r'#(\w+)', text)

def is_project_marker(line, line_num):
    """Check if line is a project marker"""
    line_stripped = line.strip()

    # Skip empty lines
    if not line_stripped:
        return False

    # Markers:
    # 1. Lines with hashtags (like #aynil, #yp, #ty, #ws, #hk)
    # 2. Lines starting with "Project" or "project"
    # 3. Special cases: "양평 Kant Haus", "프로젝트"

    patterns = [
        r'.*#\w+.*project',  # Has both hashtag and "project"
        r'^Project\s+\w+',   # Starts with "Project "
        r'^프로젝트\s+',      # Korean "project"
        r'.*\s+#\w+$',       # Ends with hashtag (likely a project title)
        r'^양평\s+.*#\w+',   # Yangpyeong project
        r'^the\s+worker\s+shop',  # Worker shop project
        r'^헝키도리\s+#',     # Hunkidori project
    ]

    for pattern in patterns:
        if re.search(pattern, line_stripped, re.IGNORECASE):
            return True

    return False

def split_into_projects(lines):
    """Split lines into project sections"""
    projects = []
    current_project = None
    current_lines = []

    for i, line in enumerate(lines, 1):
        if i == 1:
            # Skip root "consulting PROJECT"
            continue

        # Check if this is a project marker
        if is_project_marker(line, i):
            # Save previous project
            if current_project:
                projects.append({
                    'title': current_project,
                    'lines': current_lines,
                    'start_line': i - len(current_lines)
                })

            # Start new project
            current_project = line.strip()
            current_lines = [line]
        else:
            # Add to current project
            if current_project:
                current_lines.append(line)

    # Save last project
    if current_project:
        projects.append({
            'title': current_project,
            'lines': current_lines,
            'start_line': i - len(current_lines) + 1
        })

    return projects

def create_project_file(project, output_dir, base_dir):
    """Create a markdown file for a project"""
    title = project['title']
    lines = project['lines']

    # Extract metadata
    hashtags = extract_hashtags(title)

    # Determine client/project name
    clean_title = re.sub(r'#\w+', '', title).strip()
    tags = ['from-workflowy', 'consulting'] + hashtags

    # Create filename and folder
    filename = sanitize_filename(title)
    if not filename or filename == 'untitled':
        filename = f'project-{project["start_line"]}'

    # Create project folder
    project_folder = output_dir / filename
    project_folder.mkdir(parents=True, exist_ok=True)

    # Create markdown content
    content_parts = []

    # YAML frontmatter
    content_parts.append('---')
    content_parts.append('source: workflowy-consulting PROJECT.txt')
    content_parts.append(f'project: {clean_title}')
    content_parts.append(f'tags: [{", ".join(tags)}]')
    content_parts.append(f'created: {datetime.now().strftime("%Y-%m-%d")}')
    content_parts.append('---')
    content_parts.append('')

    # Title
    content_parts.append(f'# {clean_title}')
    content_parts.append('')

    # Content - group related items
    current_section = []
    in_list = False

    for line in lines[1:]:  # Skip first line (title)
        stripped = line.strip()

        if not stripped:
            if current_section:
                content_parts.extend(current_section)
                content_parts.append('')
                current_section = []
                in_list = False
            continue

        # Detect if this might be a section header
        # (short lines, starts with capital, no numbers)
        is_header = (
            len(stripped) < 50 and
            not stripped[0].isdigit() and
            not stripped.startswith('*') and
            not stripped.startswith('-') and
            not re.match(r'^\d+\.', stripped)
        )

        # Check if looks like a list item (dates, numbered items, etc)
        is_list_item = (
            stripped.startswith('*') or
            stripped.startswith('-') or
            re.match(r'^\d+\.', stripped) or
            re.match(r'^\*\d{4}', stripped)  # Date like *1213
        )

        if is_list_item:
            current_section.append(f'- {stripped}')
            in_list = True
        elif is_header and not in_list:
            # Might be a subsection
            if current_section:
                content_parts.extend(current_section)
                content_parts.append('')
                current_section = []
            current_section.append(f'## {stripped}')
            current_section.append('')
        else:
            # Regular content
            if in_list:
                current_section.append(f'  {stripped}')
            else:
                current_section.append(stripped)
                content_parts.append('')

    # Add remaining content
    if current_section:
        content_parts.extend(current_section)

    # Write file
    output_file = project_folder / f'{filename}.md'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(content_parts))

    return output_file, project_folder

def main():
    # Paths
    base_dir = Path('/Users/rhim/Projects/pkm')
    input_file = base_dir / '04_Archive/workflowy-import-2025-10/original/workflowy-consulting PROJECT.txt'
    output_dir = base_dir / '01_Projects/consulting'

    print('='*70)
    print('🔄 Workflowy Consulting Projects Splitter')
    print('='*70)
    print(f'📖 Input:  {input_file.relative_to(base_dir)}')
    print(f'📁 Output: {output_dir.relative_to(base_dir)}')
    print()

    # Read file
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    print(f'📄 Total lines: {len(lines)}')
    print()

    # Split into projects
    print('🔍 Identifying projects...')
    projects = split_into_projects(lines)
    print(f'✅ Found {len(projects)} projects')
    print()

    # Create output directory
    output_dir.mkdir(parents=True, exist_ok=True)

    # Process each project
    print('📝 Creating project files...')
    print('-'*70)
    created = []

    for i, project in enumerate(projects, 1):
        title = project['title'][:60]
        lines_count = len(project['lines'])

        print(f'[{i:2d}/{len(projects)}] {title}')
        print(f'        Lines: {lines_count}')

        try:
            output_file, project_folder = create_project_file(project, output_dir, base_dir)
            created.append((output_file, project_folder, lines_count))
            print(f'        ✅ {output_file.relative_to(output_dir)}')
        except Exception as e:
            print(f'        ❌ Error: {e}')

        print()

    # Summary
    print('='*70)
    print('✅ Summary')
    print('='*70)
    print(f'Total projects:   {len(projects)}')
    print(f'Files created:    {len(created)}')
    print(f'Total lines:      {sum(c[2] for c in created)}')
    print()
    print('📂 Project Structure:')
    print()

    for output_file, project_folder, lines_count in created:
        folder_name = project_folder.relative_to(output_dir)
        print(f'   {folder_name}/')
        print(f'   └── {output_file.name} ({lines_count} lines)')

    print()
    print(f'✅ All projects saved to: {output_dir.relative_to(base_dir)}')
    print('='*70)

if __name__ == '__main__':
    main()
