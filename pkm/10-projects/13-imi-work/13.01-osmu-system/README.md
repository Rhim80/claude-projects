# IMI WORK OSMU v2.0

> "일을 잘한다는 것"에 대한 통찰을 전하는 SENSE & AI 블로그 OSMU 콘텐츠 자동화 시스템

## 🎯 프로젝트 개요

**Experience Bridge 병렬 워크플로우**를 통해 YouTube 콘텐츠를 개인 경험과 연결하여 IMI WORK 브랜드에 맞는 고품질 콘텐츠와 갤러리급 이미지를 동시에 생성하는 시스템입니다.

## 🔄 핵심 워크플로우

```
1. 콘텐츠 분석     → Task youtube-content-analyzer
2. 경험 연결       → Task experience-bridge
3. [병렬 실행]
   ├─ 텍스트 생성  → Task imi-work-persona-writer/sns-essay-writer
   └─ 이미지 생성  → Task osmu-image-generator
4. Ghost 발행     → Task ghost-auto-publisher
```

## 🌟 핵심 특징

### Experience Bridge System
- **개인 경험 중심**: 콘텐츠와 15년 F&B 경험을 자연스럽게 연결
- **질문 기반 접근**: 강제하지 않는 선택적 질문으로 경험 추출
- **시각적 기억 포함**: 색상, 질감, 분위기 등 이미지 생성을 위한 감각 데이터

### 병렬 생성 시스템
- **동시 실행**: 텍스트와 이미지가 같은 경험 데이터를 활용하여 일관성 있는 결과
- **Tech 제약 해제**: 91개 도메인에서 완전 자유로운 선택
- **갤러리급 품질**: VISUAL_PROMPT v5.5로 미술관 전시 수준의 작품 생성

### 브랜드 일관성
- **"일을 잘한다" 철학**: 모든 콘텐츠에 핵심 가치 반영
- **감각과 AI 조화**: 인간의 직관과 AI 기술의 균형
- **실무 중심**: 15년 F&B 경험에서 나온 진짜 인사이트

## 📁 프로젝트 구조

```
imi-work-osmu/
├── assets/
│   └── images/           # OSMU 이미지 자산
│       └── [slug]/       # 콘텐츠별 이미지 패키지
│           ├── ghost/    # Ghost 블로그용
│           ├── naver/    # 네이버 블로그용
│           ├── instagram/ # 인스타그램용
│           └── image-manifest.json
├── scripts/
│   └── dalle3-osmu-generator.py  # 이미지 생성 스크립트
├── guides/               # 브랜드 가이드라인
└── CLAUDE.md            # 프로젝트 설정 문서
```

## 🚀 사용법

### 1. YouTube 콘텐츠 분석
```
Task youtube-content-analyzer "YouTube URL"
```

### 2. 경험 브릿지 실행
```
Task experience-bridge "콘텐츠와 개인 경험 연결"
```

### 3. 병렬 콘텐츠 생성
```
# 텍스트 생성
Task imi-work-persona-writer "경험 기반 브랜드 콘텐츠"

# 이미지 생성 (동시 실행)
Task osmu-image-generator "경험 기반 갤러리급 이미지"
```

### 4. Ghost 발행
```
Task ghost-auto-publisher "통합 콘텐츠 발행"
```

## 🎨 VISUAL_PROMPT v5.5

### 특징
- **91개 도메인 자유 선택**: Tech 제약 없는 완전한 창작 자유
- **PRE/TICK/POST 구조**: 전통 파괴 → 순간 포착 → 미래 재구축
- **경험 기반 도메인 선택**: 개인의 감각적 기억이 시각 언어 결정
- **333개 전문 용어**: 도메인별 전문 용어 자동 활용

### 생성 품질
- **Gallery Exhibition Quality**: 미술관 전시 가능 수준
- **6개 플랫폼 최적화**: Ghost, Naver, Instagram 각각 맞춤 해상도
- **경계 돌파 미학**: 기존 기대를 뒤엎는 혁신적 시각 언어

## 🏆 성과

- ✅ **기술적 검증**: 전체 워크플로우 100% 성공
- ✅ **아키텍처 완성**: Experience Bridge 병렬 시스템 구축
- ✅ **창작 자유화**: 템플릿 없는 순수한 창작 시스템
- ✅ **품질 향상**: 개인 경험 기반 authentic 콘텐츠 생성

## 📚 브랜드 철학

### "일을 잘한다는 것"
성과를 창출하고 고객에게 절대적 신뢰를 얻으며 대체 불가능한 존재가 되는 것

### 감각과 AI의 조화
- **감각 우선**: AI는 감각을 증폭시키는 도구
- **문제 설정**: 해결보다 중요한 올바른 문제 발견
- **대체 불가능**: 개인 경험에서 나오는 독특한 가치

---

**핵심 공식**: 문제 설정 감각 × AI 증폭 효과 = 대체 불가능한 가치