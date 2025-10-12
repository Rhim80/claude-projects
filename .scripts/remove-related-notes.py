#!/usr/bin/env python3
"""
Related Notes 섹션 자동 삭제 스크립트

34-learning 폴더의 모든 마크다운 파일에서
'## Related Notes' 섹션을 제거합니다.
"""

import os
import re
from pathlib import Path

# 설정
TARGET_DIR = Path("/Users/rhim/Projects/pkm/30-knowledge/34-learning")

def remove_related_notes(file_path):
    """파일에서 Related Notes 섹션 제거"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # ## Related Notes 섹션부터 파일 끝까지 제거
        # 패턴: ## Related Notes로 시작하는 라인부터 끝까지
        pattern = r'\n## Related Notes\n.*$'
        new_content = re.sub(pattern, '', content, flags=re.DOTALL)

        # 변경사항이 있는 경우에만 파일 업데이트
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """메인 실행 함수"""
    if not TARGET_DIR.exists():
        print(f"Error: Directory not found: {TARGET_DIR}")
        return

    print(f"Scanning directory: {TARGET_DIR}")
    print("=" * 60)

    # 모든 마크다운 파일 찾기
    md_files = list(TARGET_DIR.rglob("*.md"))
    print(f"Found {len(md_files)} markdown files\n")

    # Related Notes 제거
    modified_count = 0
    for file_path in md_files:
        if remove_related_notes(file_path):
            print(f"✓ Removed Related Notes: {file_path.relative_to(TARGET_DIR)}")
            modified_count += 1

    print("\n" + "=" * 60)
    print(f"Summary:")
    print(f"- Total files scanned: {len(md_files)}")
    print(f"- Files modified: {modified_count}")
    print(f"- Files unchanged: {len(md_files) - modified_count}")
    print("=" * 60)

if __name__ == "__main__":
    main()
