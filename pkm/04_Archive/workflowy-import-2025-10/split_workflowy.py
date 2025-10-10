#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Workflowy IMI 파일 분리 스크립트
원본 파일을 주제별로 자연스럽게 분리하여 개별 마크다운 파일로 저장
"""

import os
import re
from pathlib import Path
from datetime import datetime

# 설정
SOURCE_FILE = "/Users/rhim/Projects/pkm/04_Archive/workflowy-import-2025-10/original/workflowy-IMI.txt"
BASE_DIR = "/Users/rhim/Projects/pkm"

# 섹션 정의 (라인 번호 기준)
SECTIONS = [
    {
        "lines": (1, 22),
        "title": "스타필드 팝업 프로젝트",
        "folder": "01_Projects/starfield-popup",
        "filename": "스타필드-팝업-프로젝트.md",
        "tags": ["from-workflowy", "imi", "popup", "starfield", "2023"]
    },
    {
        "lines": (23, 72),
        "title": "IMI Business Model 전략",
        "folder": "03_Resources/business",
        "filename": "imi-business-model-전략.md",
        "tags": ["from-workflowy", "imi", "business-model", "strategy"]
    },
    {
        "lines": (73, 603),
        "title": "imi old mansion - AAR 및 오픈 프로세스",
        "folder": "01_Projects/imi-old-mansion",
        "filename": "imi-old-mansion-aar-오픈프로세스.md",
        "tags": ["from-workflowy", "imi", "old-mansion", "aar", "2024"]
    },
    {
        "lines": (604, 795),
        "title": "점장회의 및 팀 커뮤니케이션",
        "folder": "03_Resources/insights/from-workflowy",
        "filename": "점장회의-팀커뮤니케이션.md",
        "tags": ["from-workflowy", "imi", "meeting", "team", "communication"]
    },
    {
        "lines": (796, 1267),
        "title": "2024년 이미 계획 및 신사업",
        "folder": "03_Resources/business",
        "filename": "2024-이미-계획-신사업.md",
        "tags": ["from-workflowy", "imi", "business-plan", "2024", "new-business"]
    },
    {
        "lines": (1268, 1400),
        "title": "매장 운영 룰 및 프로세스",
        "folder": "03_Resources/insights/from-workflowy",
        "filename": "매장운영-룰-프로세스.md",
        "tags": ["from-workflowy", "imi", "operations", "rules", "process"]
    },
]

def read_lines(file_path, start_line, end_line):
    """파일에서 특정 라인 범위 읽기"""
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        # 라인 번호는 1부터 시작하므로 -1
        return lines[start_line-1:end_line]

def extract_date_from_content(content):
    """내용에서 날짜 추출 (YYYY.MM.DD, YYYY-MM-DD, YY.MM.DD 형식)"""
    # 다양한 날짜 패턴 시도
    patterns = [
        r'20\d{2}[-./]\d{1,2}[-./]\d{1,2}',  # 2024-01-01, 2024.01.01
        r'\d{2}[-./]\d{1,2}[-./]\d{1,2}',     # 24.01.01
        r'20\d{2}년\s*\d{1,2}월',              # 2024년 1월
    ]

    for pattern in patterns:
        match = re.search(pattern, content)
        if match:
            return match.group(0)
    return None

def clean_workflowy_content(lines):
    """Workflowy 형식의 내용을 마크다운으로 변환"""
    result = []

    for line in lines:
        # 화살표(→) 기준으로 분리
        if '→' in line:
            parts = line.split('→', 1)
            if len(parts) == 2:
                # 라인 번호 제거, 내용만 추출
                content = parts[1].strip()

                # 들여쓰기 레벨 계산 (탭이나 스페이스로)
                indent_level = len(parts[0]) - len(parts[0].lstrip())

                # 마크다운 리스트로 변환 (2칸 들여쓰기씩)
                indent = '  ' * (indent_level // 2) if indent_level > 0 else ''

                if content:
                    result.append(f"{indent}- {content}\n")
        else:
            # 화살표가 없는 라인은 그대로 유지
            if line.strip():
                result.append(line)

    return ''.join(result)

def create_markdown_file(section, content):
    """마크다운 파일 생성"""
    # 폴더 생성
    folder_path = Path(BASE_DIR) / section['folder']
    folder_path.mkdir(parents=True, exist_ok=True)

    # 날짜 추출
    date_created = extract_date_from_content(content)

    # Frontmatter 생성
    frontmatter = f"""---
source: workflowy-IMI.txt
date_created: {date_created if date_created else 'unknown'}
tags: {section['tags']}
lines: {section['lines'][0]}-{section['lines'][1]}
---

"""

    # 제목 추가
    title = f"# {section['title']}\n\n"

    # 내용 정리
    clean_content = clean_workflowy_content(content.split('\n'))

    # 파일 저장
    file_path = folder_path / section['filename']
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(frontmatter + title + clean_content)

    return file_path

def analyze_remaining_content(source_file, processed_lines):
    """아직 처리되지 않은 내용 분석"""
    with open(source_file, 'r', encoding='utf-8') as f:
        total_lines = len(f.readlines())

    # 처리된 라인 범위 찾기
    covered_lines = set()
    for start, end in processed_lines:
        covered_lines.update(range(start, end + 1))

    # 미처리 범위 찾기
    uncovered = []
    current_start = None

    for line_num in range(1, total_lines + 1):
        if line_num not in covered_lines:
            if current_start is None:
                current_start = line_num
        else:
            if current_start is not None:
                uncovered.append((current_start, line_num - 1))
                current_start = None

    if current_start is not None:
        uncovered.append((current_start, total_lines))

    return uncovered, total_lines

def main():
    """메인 실행 함수"""
    print("=" * 60)
    print("Workflowy IMI 파일 분리 시작")
    print("=" * 60)
    print()

    created_files = []
    processed_line_ranges = []

    # 각 섹션 처리
    for i, section in enumerate(SECTIONS, 1):
        print(f"[{i}/{len(SECTIONS)}] 처리 중: {section['title']}")
        print(f"  라인: {section['lines'][0]}-{section['lines'][1]}")

        # 내용 읽기
        lines = read_lines(SOURCE_FILE, section['lines'][0], section['lines'][1])
        content = ''.join(lines)

        # 마크다운 파일 생성
        file_path = create_markdown_file(section, content)
        created_files.append(file_path)
        processed_line_ranges.append(section['lines'])

        print(f"  ✓ 저장: {file_path}")
        print()

    # 미처리 내용 분석
    uncovered, total_lines = analyze_remaining_content(SOURCE_FILE, processed_line_ranges)

    print("=" * 60)
    print("처리 완료 요약")
    print("=" * 60)
    print()
    print(f"총 라인 수: {total_lines}")
    print(f"생성된 파일: {len(created_files)}개")
    print()
    print("생성된 파일 목록:")
    for file_path in created_files:
        print(f"  - {file_path}")
    print()

    if uncovered:
        print("⚠️  아직 처리되지 않은 내용:")
        for start, end in uncovered:
            print(f"  - 라인 {start}-{end} ({end-start+1}줄)")
        print()
        print("다음 단계: 미처리 내용을 확인하고 추가 섹션을 정의하세요.")
    else:
        print("✓ 모든 내용이 처리되었습니다!")

    print()
    print("=" * 60)

if __name__ == "__main__":
    main()
