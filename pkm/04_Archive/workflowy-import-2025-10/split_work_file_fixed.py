#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Workflowy Work.txt 파일 자연스러운 주제별 분리 스크립트 (수정본)
맥락 손실 없이 모든 내용 보존
"""

import os
import re
from pathlib import Path

SOURCE_FILE = "/Users/rhim/Projects/pkm/04_Archive/workflowy-import-2025-10/original/workflowy-Work.txt"
BASE_DIR = "/Users/rhim/Projects/pkm"

# 섹션 정의
SECTIONS = [
    # 컨설팅 프로젝트들
    {
        "lines": (6, 520),
        "title": "경탁주 프로젝트 기획",
        "folder": "01_Projects/consulting/gyeongtakju",
        "filename": "경탁주-프로젝트-기획.md",
        "tags": ["from-workflowy", "consulting", "gyeongtakju", "project", "f&b"]
    },
    {
        "lines": (520, 650),
        "title": "롯데 크리스마스 마켓 2024",
        "folder": "01_Projects/consulting/lotte-christmas-market-2024",
        "filename": "롯데-크리스마스-마켓-2024.md",
        "tags": ["from-workflowy", "consulting", "lotte", "christmas-market", "2024"]
    },
    {
        "lines": (650, 700),
        "title": "파주 카페 프로젝트",
        "folder": "01_Projects/consulting/paju-cafe",
        "filename": "파주-카페-프로젝트.md",
        "tags": ["from-workflowy", "consulting", "paju", "cafe", "garden-cafe"]
    },
    {
        "lines": (529, 648),
        "title": "진주 프로젝트 - 김지숙",
        "folder": "01_Projects/consulting/jinju-project",
        "filename": "진주-프로젝트-김지숙.md",
        "tags": ["from-workflowy", "consulting", "jinju", "kim-jisuk", "branding"]
    },
    {
        "lines": (1077, 1700),
        "title": "일상의틈 LG U+ 프로젝트",
        "folder": "01_Projects/consulting/ilsangui-teum-lgu",
        "filename": "일상의틈-lgu-프로젝트.md",
        "tags": ["from-workflowy", "consulting", "lgu", "ilsangui-teum", "space-planning"]
    },

    # 비즈니스 프로세스
    {
        "lines": (1700, 2006),
        "title": "오프라인 비즈니스 운영 프로세스",
        "folder": "03_Resources/business",
        "filename": "오프라인-비즈니스-운영-프로세스.md",
        "tags": ["from-workflowy", "business", "operations", "process", "offline"]
    },

    # 일일 노트 (240921-241016)
    {
        "lines": (2006, 2278),
        "title": "2024년 9-10월 일일 업무 노트",
        "folder": "03_Resources/insights/from-workflowy",
        "filename": "2024-09-10월-일일업무노트.md",
        "tags": ["from-workflowy", "daily-notes", "work-log", "2024-09", "2024-10"]
    },
]

def read_lines(file_path, start_line, end_line):
    """파일에서 특정 라인 범위를 읽어옴"""
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        return lines[start_line-1:end_line]

def extract_date_from_content(content):
    """내용에서 날짜 추출"""
    patterns = [
        r'\*\d{6}',  # *240921
        r'20\d{2}[-./]\d{1,2}[-./]\d{1,2}',
        r'\d{6}',  # 240921
        r'20\d{2}년\s*\d{1,2}월'
    ]
    for pattern in patterns:
        match = re.search(pattern, content)
        if match:
            date_str = match.group(0)
            # *240921 형식을 2024-09-21로 변환
            if date_str.startswith('*'):
                date_str = date_str[1:]
            if len(date_str) == 6 and date_str.isdigit():
                year = '20' + date_str[:2]
                month = date_str[2:4]
                day = date_str[4:6]
                return f"{year}-{month}-{day}"
            return date_str
    return None

def clean_workflowy_content(lines):
    """
    Workflowy 형식을 계층적 마크다운으로 변환
    맥락 손실 없이 모든 라인 보존
    """
    result = []

    for line in lines:
        # 빈 줄은 그대로 유지
        if line.strip() == '':
            result.append('\n')
            continue

        # → 가 없는 라인도 그대로 유지
        if '→' not in line:
            result.append(line)
            continue

        parts = line.split('→', 1)
        if len(parts) != 2:
            result.append(line)
            continue

        # 라인 번호 부분과 내용 분리
        line_num_part = parts[0]
        content = parts[1].strip()

        # 비어있는 컨텐츠는 빈 줄로
        if not content:
            result.append('\n')
            continue

        # 들여쓰기 레벨 계산 (공백 수)
        indent = len(line_num_part) - len(line_num_part.lstrip())

        # 레벨에 따른 마크다운 변환
        # 레벨 0-2: ## 헤더
        if indent <= 6:
            result.append(f"\n## {content}\n\n")
        # 레벨 3-4: ### 헤더
        elif indent <= 12:
            result.append(f"\n### {content}\n\n")
        # 레벨 5-6: 리스트
        elif indent <= 18:
            result.append(f"- {content}\n")
        # 레벨 7-8: 들여쓴 리스트
        elif indent <= 24:
            result.append(f"  - {content}\n")
        # 레벨 9 이상: 더 들여쓴 리스트
        else:
            list_indent = '  ' * ((indent - 18) // 6 + 2)
            result.append(f"{list_indent}- {content}\n")

    return ''.join(result)

def create_markdown_file(section):
    """섹션을 마크다운 파일로 생성"""
    # 폴더 생성
    folder_path = Path(BASE_DIR) / section['folder']
    folder_path.mkdir(parents=True, exist_ok=True)

    # 해당 라인 읽기
    lines = read_lines(SOURCE_FILE, section['lines'][0], section['lines'][1])
    content = ''.join(lines)

    # 날짜 추출
    date_created = extract_date_from_content(content)

    # YAML frontmatter 생성
    frontmatter = f"""---
source: workflowy-Work.txt
date_created: {date_created if date_created else 'unknown'}
tags: {section['tags']}
lines: {section['lines'][0]}-{section['lines'][1]}
---

"""

    # 제목
    title = f"# {section['title']}\n\n"

    # 본문 내용 변환
    clean_content = clean_workflowy_content(lines)

    # 파일 쓰기
    file_path = folder_path / section['filename']
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(frontmatter + title + clean_content)

    return file_path, len(lines)

def main():
    """메인 실행 함수"""
    print("="*80)
    print("Workflowy Work.txt 파일 분리 작업 시작 (수정본)")
    print("="*80)
    print(f"\n원본 파일: {SOURCE_FILE}")
    print(f"총 섹션 수: {len(SECTIONS)}개\n")

    created_files = []

    for i, section in enumerate(SECTIONS, 1):
        print(f"[{i}/{len(SECTIONS)}] 처리 중: {section['title']}")
        print(f"  라인: {section['lines'][0]}-{section['lines'][1]}")

        file_path, line_count = create_markdown_file(section)

        created_files.append({
            'title': section['title'],
            'path': file_path,
            'lines': line_count,
            'folder': section['folder']
        })

        rel_path = file_path.relative_to(BASE_DIR)
        print(f"  ✅ 생성: {rel_path} ({line_count}줄)\n")

    # 요약 출력
    print("\n" + "="*80)
    print("📊 작업 완료 요약")
    print("="*80)

    print(f"\n총 생성 파일: {len(created_files)}개\n")

    # 폴더별 분류
    by_folder = {}
    for file_info in created_files:
        folder = file_info['folder']
        if folder not in by_folder:
            by_folder[folder] = []
        by_folder[folder].append(file_info)

    for folder, files in sorted(by_folder.items()):
        print(f"\n📁 {folder}/")
        for file_info in files:
            print(f"   - {file_info['title']} ({file_info['lines']}줄)")

    print("\n" + "="*80)
    print("✅ 모든 파일이 성공적으로 생성되었습니다!")
    print("="*80)

if __name__ == "__main__":
    main()
