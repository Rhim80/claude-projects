#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Workflowy IMI 파일 분리 스크립트 v3 - 개선된 마크다운 포맷팅
"""

import os
import re
from pathlib import Path

SOURCE_FILE = "/Users/rhim/Projects/pkm/04_Archive/workflowy-import-2025-10/original/workflowy-IMI.txt"
BASE_DIR = "/Users/rhim/Projects/pkm"

SECTIONS = [
    {"lines": (1, 22), "title": "스타필드 팝업 프로젝트", "folder": "01_Projects/starfield-popup", "filename": "스타필드-팝업-프로젝트.md", "tags": ["from-workflowy", "imi", "popup", "starfield", "2023"]},
    {"lines": (23, 72), "title": "IMI Business Model 전략", "folder": "03_Resources/business", "filename": "imi-business-model-전략.md", "tags": ["from-workflowy", "imi", "business-model", "strategy"]},
    {"lines": (73, 603), "title": "imi old mansion - AAR 및 오픈 프로세스", "folder": "01_Projects/imi-old-mansion", "filename": "imi-old-mansion-aar-오픈프로세스.md", "tags": ["from-workflowy", "imi", "old-mansion", "aar", "2024"]},
    {"lines": (604, 795), "title": "점장회의 및 팀 커뮤니케이션", "folder": "03_Resources/insights/from-workflowy", "filename": "점장회의-팀커뮤니케이션.md", "tags": ["from-workflowy", "imi", "meeting", "team", "communication"]},
    {"lines": (796, 1267), "title": "2024년 이미 계획 및 신사업", "folder": "03_Resources/business", "filename": "2024-이미-계획-신사업.md", "tags": ["from-workflowy", "imi", "business-plan", "2024", "new-business"]},
    {"lines": (1268, 1400), "title": "매장 운영 룰 및 프로세스", "folder": "03_Resources/insights/from-workflowy", "filename": "매장운영-룰-프로세스.md", "tags": ["from-workflowy", "imi", "operations", "rules", "process"]},
    {"lines": (1401, 1700), "title": "인테리어 반셀프 가이드 및 실전 경험", "folder": "03_Resources/knowledge", "filename": "인테리어-반셀프-가이드.md", "tags": ["from-workflowy", "imi", "interior", "self-build", "guide"]},
    {"lines": (1701, 1900), "title": "매장 매뉴얼 및 서비스 가이드", "folder": "03_Resources/insights/from-workflowy", "filename": "매장매뉴얼-서비스가이드.md", "tags": ["from-workflowy", "imi", "manual", "service", "operations"]},
    {"lines": (1901, 2100), "title": "직원 채용 공고 및 철학", "folder": "03_Resources/insights/from-workflowy", "filename": "직원채용-공고-철학.md", "tags": ["from-workflowy", "imi", "hiring", "recruitment", "philosophy"]},
    {"lines": (2101, 2600), "title": "이미 워크숍 및 브랜드 철학", "folder": "03_Resources/insights/from-workflowy", "filename": "이미워크숍-브랜드철학.md", "tags": ["from-workflowy", "imi", "workshop", "brand", "philosophy"]},
    {"lines": (2601, 3200), "title": "로스팅 작업 일지 및 생두 관리", "folder": "03_Resources/insights/from-workflowy", "filename": "로스팅-작업일지-생두관리.md", "tags": ["from-workflowy", "imi", "roasting", "coffee", "operations"]},
    {"lines": (3201, 3800), "title": "메뉴 개발 및 레시피", "folder": "03_Resources/insights/from-workflowy", "filename": "메뉴개발-레시피.md", "tags": ["from-workflowy", "imi", "menu", "recipe", "development"]},
    {"lines": (3801, 4400), "title": "마케팅 및 SNS 운영 전략", "folder": "03_Resources/business", "filename": "마케팅-sns-운영전략.md", "tags": ["from-workflowy", "imi", "marketing", "sns", "strategy"]},
    {"lines": (4401, 5000), "title": "직원 교육 및 성과 관리", "folder": "03_Resources/insights/from-workflowy", "filename": "직원교육-성과관리.md", "tags": ["from-workflowy", "imi", "training", "performance", "hr"]},
    {"lines": (5001, 5671), "title": "브랜드 캘린더 및 조직 관리", "folder": "03_Resources/insights/from-workflowy", "filename": "브랜드캘린더-조직관리.md", "tags": ["from-workflowy", "imi", "brand-calendar", "organization", "management"]},
]

def read_lines(file_path, start_line, end_line):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        return lines[start_line-1:end_line]

def extract_date_from_content(content):
    patterns = [r'20\d{2}[-./]\d{1,2}[-./]\d{1,2}', r'\d{2}[-./]\d{1,2}[-./]\d{1,2}', r'20\d{2}년\s*\d{1,2}월', r'\*\d{4}']
    for pattern in patterns:
        match = re.search(pattern, content)
        if match:
            return match.group(0)
    return None

def clean_workflowy_content(lines):
    """Workflowy 형식을 계층적 마크다운으로 변환"""
    result = []

    for line in lines:
        if '→' not in line:
            continue

        parts = line.split('→', 1)
        if len(parts) != 2:
            continue

        # 라인 번호 부분과 내용 분리
        line_num_part = parts[0]
        content = parts[1].strip()

        if not content:
            continue

        # 들여쓰기 레벨 계산 (공백 개수로)
        indent = len(line_num_part) - len(line_num_part.lstrip())

        # 레벨에 따른 마크다운 변환
        if indent == 0:
            # 최상위 레벨 - 큰 헤더
            result.append(f"\n## {content}\n\n")
        elif indent <= 6:
            # 1차 하위 - 중간 헤더
            result.append(f"\n### {content}\n\n")
        elif indent <= 12:
            # 2차 하위 - 리스트 아이템
            result.append(f"- {content}\n")
        else:
            # 3차 이하 - 들여쓴 리스트
            list_indent = '  ' * ((indent - 12) // 6)
            result.append(f"{list_indent}- {content}\n")

    return ''.join(result)

def create_markdown_file(section, content):
    folder_path = Path(BASE_DIR) / section['folder']
    folder_path.mkdir(parents=True, exist_ok=True)

    date_created = extract_date_from_content(content)

    frontmatter = f"""---
source: workflowy-IMI.txt
date_created: {date_created if date_created else 'unknown'}
tags: {section['tags']}
lines: {section['lines'][0]}-{section['lines'][1]}
---

"""

    title = f"# {section['title']}\n"
    clean_content = clean_workflowy_content(content.split('\n'))

    file_path = folder_path / section['filename']
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(frontmatter + title + clean_content)

    return file_path

def main():
    print("=" * 60)
    print("Workflowy IMI 파일 완전 분리 (v3 - 개선된 포맷팅)")
    print("=" * 60)
    print()

    created_files = []

    for i, section in enumerate(SECTIONS, 1):
        print(f"[{i}/{len(SECTIONS)}] {section['title']}")
        lines = read_lines(SOURCE_FILE, section['lines'][0], section['lines'][1])
        content = ''.join(lines)
        file_path = create_markdown_file(section, content)
        created_files.append(file_path)
        print(f"  ✓ {file_path.relative_to(BASE_DIR)}")

    print()
    print("=" * 60)
    print(f"✅ 완료: {len(created_files)}개 파일 생성")
    print("=" * 60)

if __name__ == "__main__":
    main()
