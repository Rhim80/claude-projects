# 📥 Notion → PKM 마이그레이션 가이드

**생성일:** 2025-10-09
**도구:** notion2obsidian v2.5.2
**상태:** ✅ 설치 완료, 실행 준비됨

---

## 🎯 개요

Notion 워크스페이스를 PKM vault로 자동 마이그레이션하는 완전 자동화 가이드입니다.

---

## ✅ 설치 완료 항목

- ✅ Bun 런타임 설치됨 (v1.2.23)
- ✅ notion2obsidian CLI 설치됨 (v2.5.2)
- ✅ 마이그레이션 헬퍼 스크립트 생성됨

---

## 🚀 실행 방법

### Step 1: Notion에서 Export

1. **Notion 웹사이트 접속**
2. **Settings & Members** → **Settings** 클릭
3. **Export all workspace content** 클릭
4. **Format:** `Markdown & CSV` 선택
5. **Include subpages** 체크 ✓
6. **Export** 버튼 클릭
7. **ZIP 파일 다운로드** (보통 `Export-xxxxx.zip` 형식)

### Step 2: 마이그레이션 스크립트 실행

```bash
# PKM vault로 이동
cd /Users/rhim/Projects/pkm

# 마이그레이션 스크립트 실행
.scripts/notion-migrate.sh
```

스크립트가 자동으로:
- ✅ 필수 도구 확인
- ✅ ZIP 파일 경로 입력 받기
- ✅ Dry-run 또는 Full migration 선택
- ✅ `00_Inbox/NOTION_IMPORT/` 폴더로 import

### Step 3: 결과 확인

```bash
# Import된 파일 확인
ls -la 00_Inbox/NOTION_IMPORT/

# Git 상태 확인
git status
```

---

## 🔧 수동 실행 (스크립트 없이)

```bash
# Dry-run (미리보기)
notion2obsidian ~/Downloads/Export-xxxxx.zip ~/Projects/pkm/00_Inbox/NOTION_IMPORT --dry-run --verbose

# 실제 마이그레이션
notion2obsidian ~/Downloads/Export-xxxxx.zip ~/Projects/pkm/00_Inbox/NOTION_IMPORT --verbose
```

---

## 📂 다음 단계: PARA 구조 정리

Import 후 Claude Code에게 요청:

```
/thinking-partner

00_Inbox/NOTION_IMPORT/ 폴더의 내용을 분석하고
PARA 구조로 체계적으로 정리해줘:

- 프로젝트 관련 → 01_Projects/
- 지속적인 영역 → 02_Areas/
- 참고 자료 → 03_Resources/
- 이미지/파일 → 05_Attachments/Organized/

각 파일에 적절한 YAML frontmatter도 추가해줘.
```

---

## 🎁 notion2obsidian 기능

자동으로 처리되는 작업들:

- ✅ **파일명 정리**: Notion ID 제거
- ✅ **YAML frontmatter**: 메타데이터 자동 추가
- ✅ **링크 변환**: Markdown links → Wiki links
- ✅ **중복 처리**: 폴더 컨텍스트로 자동 해결
- ✅ **첨부파일 정리**: 폴더별 자동 조직
- ✅ **Callout 변환**: Notion callouts → Obsidian callouts
- ✅ **CSV 처리**: 데이터베이스 인덱스 생성

---

## 💡 팁

### Dry-run 먼저 실행
처음에는 반드시 `--dry-run`으로 미리보기를 확인하세요.

### 단계별 마이그레이션
전체 워크스페이스 대신 중요한 페이지만 먼저 Export하여 테스트해보세요.

### Git 커밋
각 단계마다 커밋하여 롤백 가능하도록 하세요.

```bash
git add .
git commit -m "📥 Notion 워크스페이스 마이그레이션"
git push
```

---

## 🔗 유용한 링크

- [notion2obsidian GitHub](https://bitbonsai.github.io/notion2obsidian/)
- [Bun 공식 문서](https://bun.sh)

---

## ⚠️ 주의사항

1. **백업**: 마이그레이션 전 현재 PKM vault Git 커밋
2. **용량**: 대용량 워크스페이스는 시간이 걸릴 수 있음
3. **링크**: 외부 링크는 그대로 유지됨
4. **데이터베이스**: CSV 파일로 변환됨 (Dataview 플러그인 활용 가능)

---

**준비 완료! 이제 Notion에서 Export하고 스크립트를 실행하세요.** 🚀
