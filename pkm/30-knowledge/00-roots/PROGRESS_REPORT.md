---
title: Root 재구성 프로젝트 진행 상황
date: 2025-10-12
status: in-progress
last-update: 2025-10-12 (30-knowledge 링크 재구성)
---

# Root 재구성 프로젝트 진행 상황

## 🎯 프로젝트 목표

**7개 → 10개 루트로 재구성** (당신의 실제 목소리 기반)

## ✅ Phase 1: Root 파일 생성 완료

### 1. Primary Source 분석 완료
- **파일**: `이미커피에 대한 인터뷰.txt`, `하고싶은일하면행복할까_강연.txt`
- **결과**: 기존 7개 루트는 당신 철학의 60%만 커버
- **발견**: 3개 핵심 루트 누락, 2개 수정 필요

### 2. ROOT_VALIDATION_REPORT.md 생성
- **위치**: `/Users/rhim/Projects/pkm/30-knowledge/00-roots/ROOT_VALIDATION_REPORT.md`
- **내용**:
  - 기존 7개 루트 검증
  - 3개 새 루트 발견 (응원 경제, 주도성, 나음보다 다름)
  - 10개 루트 구조 제안

### 3. 기존 7개 루트 백업
- **위치**: `/Users/rhim/Projects/pkm/30-knowledge/00-roots/.archive-v1/`
- **파일**: root-01~07.md (구버전)

### 4. Tier 1 (철학) 3개 루트 생성 ✅

**완성된 파일:**

#### root-01-의미가치.md ✅
- **Tier**: 1-Philosophy
- **검증**: Primary source (강연 98% 신뢰도)
- **핵심 인용**: "좋아하는 일도, 주도성과 의미가 없으면 오래가지 못한다"
- **상태**: 완료

#### root-02-응원-경제.md ✅
- **Tier**: 1-Philosophy
- **검증**: Primary source (강연 3개 섹션 전체)
- **핵심 인용**: "finance의 어원은 라틴어 finis, 즉 끝, 종결을 의미합니다"
- **상태**: 완료

#### root-03-주도성.md ✅
- **Tier**: 1-Philosophy
- **검증**: Primary source (강연 첫 번째 조건)
- **핵심 인용**: "주도성이 없으면, 좋아하는 일도 결국 남의 일이 됩니다"
- **상태**: 완료

### 5. Tier 2 (전략) 3개 루트 생성 ✅

#### root-04-동사-중심-사고.md ✅
- **Tier**: 2-Strategy
- **핵심 인용**: "하고 싶은 일은 명사가 아니라 동사다"
- **상태**: 완료

#### root-05-나음보다-다름.md ✅
- **Tier**: 2-Strategy
- **핵심 인용**: "더 잘한다가 아닌, 이렇게 다르다고 말하는 것이 훨씬 효과적"
- **상태**: 완료

#### root-06-각오와-책임.md ✅
- **Tier**: 2-Strategy
- **핵심 인용**: "용기보다는 '각오'의 문제라고 생각한다"
- **상태**: 완료

### 6. Tier 3 (실행) 4개 루트 생성 ✅

#### root-07-감각.md ✅
- **Tier**: 3-Execution
- **핵심 인용**: "손에 닿는 테이블의 감촉, 눈에 보이는 식기의 디자인이 고객 경험을 만든다"
- **상태**: 완료

#### root-08-프로세스-공유.md ✅
- **Tier**: 3-Execution
- **핵심 인용**: "손님과 대화하는 것은 중요한 업무 중 하나다"
- **상태**: 완료

#### root-09-아카이브-사고.md ✅
- **Tier**: 3-Execution
- **핵심 인용**: "브랜딩의 가장 기본은 아카이빙이다"
- **상태**: 완료

#### root-10-소비자-중심.md ✅
- **Tier**: 3-Execution
- **핵심 인용**: "수천만 원짜리 머신보다 손님이 앉는 테이블을 먼저 챙겨라"
- **상태**: 완료

## ✅ Phase 2: 30-knowledge 링크 재구성 (진행 중)

### 7. 30-knowledge/README.md 재작성 ✅
- **커밋**: `ca38473` (2025-10-12)
- **내용**:
  - 10개 Root 기준으로 전면 재작성
  - 3계층 구조 (Tier 1-3) 시각화
  - IMI WORK 철학 방정식
  - AI 시대 경쟁력 구조
  - 의사결정 가이드 (10개 질문)

### 8. 00-roots/README.md 재작성 ✅
- **작업 완료**: 2025-10-12
- **내용**:
  - 7개 → 10개 루트로 전면 재작성
  - 3계층 구조 (Philosophy → Strategy → Execution) 반영
  - 각 Tier별 Root 테이블 (3+3+4 구조)
  - 10개 질문 의사결정 프레임워크 (Tier별 분류)
  - 루트별 대표 인물 (Tier별 분류)
  - 7→10 변경 사항 상세 문서화

### 9. 핵심 책 노트 2개 Root 링크 수정 ✅
- **커밋**: `a2a3b0b` (2025-10-12)

#### 일을-잘한다는-것.md
- **Root 링크**: 의미가치 (root-01) + 감각 (root-07) + 주도성 (root-03)
- **출처**: 본문 2장, 3장, 12장

#### 프로세스-이코노미.md
- **Root 링크**: 프로세스-공유 (root-08) + 의미가치 (root-01) + 응원-경제 (root-02)
- **출처**: 핵심 개념, 본문, 파타고니아 사례

### 10. 33-insights 파일 7개 Root 링크 추가 ✅
- **작업 완료**: 2025-10-12

#### do-too-much-alexandr-wang.md
- **Root 링크**: 각오와-책임 (root-06) + 주도성 (root-03) + 나음보다-다름 (root-05)
- **출처**: 본문 "과도해 보일 것이다. 하지만 너무 많이 하는 것이 적당한 양이다"

#### 감각과-기술.md
- **Root 링크**: 감각 (root-07) + 소비자-중심 (root-10)
- **출처**: 본문 "이 커피로 사람들을 설득할 수 있는지"

#### 전자음악과-발효커피-비유.md
- **Root 링크**: 소비자-중심 (root-10) + 나음보다-다름 (root-05)
- **출처**: 본문 "중요한건 사람이고 소비자입니다"

#### 초대에-대한-생각.md
- **Root 링크**: 의미가치 (root-01) + 동사-중심-사고 (root-04)
- **출처**: 본문 "내가 왜 이 일을 하려는지 고민"

#### startup-reality-check.md
- **Root 링크**: 각오와-책임 (root-06) + 의미가치 (root-01)
- **출처**: 본문 "창업 후 결코 누구도 당신의 선택에 책임져 주지 않습니다"

#### 스페셜티-커피에-대한-비판.md
- **Root 링크**: 나음보다-다름 (root-05) + 소비자-중심 (root-10)
- **출처**: 본문 "뭔가 스페셜한걸 하고 있다고 믿고 보여주고 싶어한다"

#### 비사이드-라디오-사연.md
- **Root 링크**: 의미가치 (root-01) + 주도성 (root-03)
- **출처**: 본문 "나의 삶에 신선함을 계속 부여하기 위한 도구로"

## 📊 전체 진행률

```
Phase 1 (Root 파일): [████████████████████] 100% 완료 ✅
Phase 2 (링크 재구성): [████████████░░░░░░░░] 60% 진행 중 🔄

✅ 완료: 10/10 Root 파일 + 2개 README + 핵심 책 2개 + 33-insights 7개
🔄 진행 중: 30-knowledge 링크 재구성
⏳ 대기: 31-business (9개), 36-ai-tools (5개)
```

## 📁 파일 구조 현황

```
30-knowledge/
├── 00-roots/                 # ✅ 10개 Root 완성
│   ├── root-01-의미가치.md
│   ├── root-02-응원-경제.md
│   ├── root-03-주도성.md
│   ├── root-04-동사-중심-사고.md
│   ├── root-05-나음보다-다름.md
│   ├── root-06-각오와-책임.md
│   ├── root-07-감각.md
│   ├── root-08-프로세스-공유.md
│   ├── root-09-아카이브-사고.md
│   ├── root-10-소비자-중심.md
│   ├── README.md (7개 기준, 업데이트 필요)
│   ├── PROGRESS_REPORT.md (이 파일)
│   └── ROOT_VALIDATION_REPORT.md
│
├── README.md                 # ✅ 10개 Root 기준 재작성
│
├── 34-learning/34.01-books/books/
│   ├── 일을-잘한다는-것.md    # ✅ Root 링크 완료
│   └── 프로세스-이코노미.md    # ✅ Root 링크 완료
│
├── 33-insights/              # ✅ Root 링크 완료 (7개 파일)
│   ├── do-too-much-alexandr-wang.md
│   └── 33.03-writing/ (6개)
│
├── 31-business/              # ⏳ 대기 (9개 파일)
│   ├── ai-business-maturity.md
│   ├── market-entry-framework.md
│   └── ...
│
└── 36-ai-tools/              # ⏳ 대기 (5개 파일)
    ├── human-sense-importance.md
    ├── leadership-transformation.md
    └── ...
```

## 🎯 다음 단계

### 즉시 진행 (우선순위 순)

1. **31-business 파일 Root 링크 추가** (9개) ⬅️ 다음 작업
   - ai-business-maturity.md
   - market-entry-framework.md
   - pkm-sustainability.md
   - 기타 6개

3. **36-ai-tools 파일 Root 링크 추가** (5개)
   - human-sense-importance.md
   - leadership-transformation.md
   - 기타 3개

## 💡 핵심 변경 사항

### 7개 → 10개 루트

**추가된 3개 (NEW):**
1. **응원 경제** (root-02) - 강연 3개 섹션, 패러다임 전환
2. **주도성** (root-03) - 강연 명시적 첫 번째 조건
3. **나음보다 다름** (root-05) - 인터뷰 12번+ 등장

**이름 변경 2개:**
1. 과도함 → **각오와 책임** (root-06) - 실제 사용 언어
2. 현장감 → **소비자 중심** (root-10) - 실제 강조점

**통합 1개:**
1. 인사이드 아웃 → **동사 중심 사고** (root-04) - 재해석

**위치 변경:**
- 감각: root-01 → root-07
- 의미가치: root-02 → root-01
- 프로세스-공유: root-04 → root-08
- 아카이브-사고: root-07 → root-09

### 3계층 구조

**Tier 1 (철학 - Why):** 의미가치, 응원 경제, 주도성
**Tier 2 (전략 - How to Think):** 동사 중심 사고, 나음보다 다름, 각오와 책임
**Tier 3 (실행 - How to Do):** 감각, 프로세스 공유, 아카이브 사고, 소비자 중심

## 📌 Root 링크 추가 방법 (표준 패턴)

### 메타데이터 추가
```yaml
root-concepts: [의미가치, 감각, 주도성]
```

### 문서 상단 섹션 추가
```markdown
## 🌳 관련 Root Concepts

- **[[../../00-roots/root-01-의미가치]]** - "효용 → 의미 시대" (본문 2장)
- **[[../../00-roots/root-07-감각]]** - "감각의 시대" (본문 3장)
- **[[../../00-roots/root-03-주도성]]** - "인사이드 아웃" (본문 12장)

→ **핵심 메시지 요약**
```

## ⏱️ 실제 소요 시간

- ~~**Phase 1: Root 파일** (10개): ~100분~~ ✅ 완료
- **Phase 2: 링크 재구성**:
  - ✅ 30-knowledge/README.md: ~20분
  - ✅ 핵심 책 2개: ~15분
  - ✅ 00-roots/README.md: ~20분
  - ✅ 33-insights (7개): ~30분
  - ⏳ 31-business (9개): ~40분 (다음)
  - ⏳ 36-ai-tools (5개): ~25분
- **예상 총 소요 시간**: ~250분 (4.2시간)

## 🎉 현재까지 성과

### 완료된 것 ✅
- **10개 Root 파일 완성** (Primary Source 기반)
- **30-knowledge/README.md** 10개 Root 기준 재작성
- **00-roots/README.md** 10개 Root 기준 재작성
- **핵심 책 2개** Root 링크 추가
- **33-insights 7개** Root 링크 추가

### 남은 작업 ⏳
- **31-business** Root 링크 추가 (9개)
- **36-ai-tools** Root 링크 추가 (5개)

---

**프로젝트 시작**: 2025-10-12
**Phase 1 완료**: 2025-10-12
**Phase 2 진행 중**: 2025-10-12 (60% 완료)
**작업자**: Claude Code + 이림
**다음 작업**: 31-business 파일 Root 링크 추가 (9개)
