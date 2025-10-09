---
title: "Notion Import 정리 계획"
created: 2025-10-09
status: in-progress
---

# 📋 Notion Import 정리 계획

## 📊 콘텐츠 분석 결과

### DB Projects 🚀 (147 files)
- ✅ **NOTE COFFEE HOUSE 프로젝트** → `04_Archive/projects/` (완료 프로젝트)
- ✅ **소경계 프로젝트** → `04_Archive/projects/` (완료 프로젝트)

### DB Areas 🔲 (412 files)
- ⭐ **IMI AI STUDY** (296 files) → `02_Areas/education/imi-ai-study/`
  - 가장 많은 콘텐츠, 핵심 영역
  - GPTers 스터디, 강의 세션 등

- ⭐ **(주) 음** (102 files) → `02_Areas/business/eum/`
  - 회사 운영 관련 중요 자료

- ❌ **교육 및 강연** (2 files) → 삭제 또는 IMI AI STUDY로 통합
  - 거의 비어있음

- **IMI Contents Archive System** → 확인 필요

### DB Resources 📚 (46 files)
- MEMO, idea 노트들
- `03_Resources/` 로 이동

### 자동화 시스템
```
02_Areas/automation/ 생성 후 이동:
├── Ghost Blog Automation
├── YouTube 콘텐츠 자동수집
├── [급여자동화] 급여명세서 발송 이력 DB
├── [급여자동화] 월별 급여 변동 DB
├── [HR] 직원 관리 DB
└── 영수증 자동 리뷰 작성기
```

### 기타
- **Rhim's Project Hub** → 분석 후 재분류
- **notion & n8n 데이터베이스** → `02_Areas/automation/n8n-workflows/`
- **People** → `03_Resources/contacts/`

---

## 🎯 실행 계획

### Phase 1: Archive 완료 프로젝트
```bash
mkdir -p 04_Archive/projects/
mv "00_Inbox/NOTION_IMPORT/🚀 PARA System/DB Projects 🚀/NOTE COFFEE HOUSE 프로젝트" \
   04_Archive/projects/note-coffee-house
mv "00_Inbox/NOTION_IMPORT/🚀 PARA System/DB Projects 🚀/소경계 프로젝트" \
   04_Archive/projects/sokyungkye
```

### Phase 2: Areas 정리
```bash
# 핵심 Areas 이동
mkdir -p 02_Areas/education/
mv "00_Inbox/NOTION_IMPORT/🚀 PARA System/DB Areas 🔲/IMI AI STUDY" \
   02_Areas/education/imi-ai-study

mkdir -p 02_Areas/business/
mv "00_Inbox/NOTION_IMPORT/🚀 PARA System/DB Areas 🔲/(주) 음" \
   02_Areas/business/eum

# 비어있는 폴더 삭제
rm -rf "00_Inbox/NOTION_IMPORT/🚀 PARA System/DB Areas 🔲/교육 및 강연"
```

### Phase 3: Automation 시스템
```bash
mkdir -p 02_Areas/automation/
mv "00_Inbox/NOTION_IMPORT/🚀 PARA System/Ghost Blog Automation" \
   02_Areas/automation/ghost-blog
mv "00_Inbox/NOTION_IMPORT/🚀 PARA System/YouTube 콘텐츠 자동수집" \
   02_Areas/automation/youtube-collector
# ... 나머지 자동화 시스템들
```

### Phase 4: Resources
```bash
mkdir -p 03_Resources/notes/
mv "00_Inbox/NOTION_IMPORT/🚀 PARA System/DB Resources 📚"/* \
   03_Resources/notes/

mkdir -p 03_Resources/contacts/
mv "00_Inbox/NOTION_IMPORT/People" \
   03_Resources/contacts/
```

### Phase 5: 정리 및 삭제
```bash
# CSV, _data 폴더들 정리
find 00_Inbox/NOTION_IMPORT -name "_data" -type d -exec rm -rf {} +
find 00_Inbox/NOTION_IMPORT -name "*.csv" -delete
find 00_Inbox/NOTION_IMPORT -name ".DS_Store" -delete

# 빈 폴더 정리 후 NOTION_IMPORT 삭제
rm -rf 00_Inbox/NOTION_IMPORT
```

---

## ⚠️ 주의사항

1. **각 단계마다 Git 커밋**
2. **중요 폴더는 먼저 백업**
3. **링크 깨짐 확인** (Wiki links)
4. **빈 폴더 여부 재확인**

---

**다음:** Phase 1부터 실행
