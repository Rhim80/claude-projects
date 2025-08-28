# CLAUDE.md - IMI WORK YouTube to Blog 자동화 프로젝트

> "일을 잘한다는 것"에 대한 통찰을 전하는 SENSE & AI 블로그 콘텐츠 자동화

## 📋 프로젝트 개요

### 목표
YouTube 영상을 IMI WORK 브랜드 정체성에 맞게 "일을 잘한다는 것"에 대한 깊이 있는 블로그 글로 자동 변환

### 핵심 차별점
- **n8n 대신 Claude Code** 사용으로 더 유연하고 정교한 콘텐츠 생성
- **IMI WORK 브랜드 페르소나** 활용한 차별화된 콘텐츠 생성
- **"일을 잘한다" 중심**: 단순 AI/비즈니스 넘어선 근본적 통찰
- **SENSE & AI 블로그** 특화 SEO 최적화

## 🌟 IMI WORK 브랜드 정체성

### 브랜드 핵심
- **브랜드명**: IMI WORK
- **블로그명**: SENSE & AI  
- **블로그 설명**: "인간을 이해하는 감각과 AI로 멋진 일을 만드는 이야기"
- **포지셔닝**: "15년차 자영업자 출신의 기획자 + AI를 진짜 중요하게 생각하고 적극 활용하는 사람"

### 브랜드 철학
- **비전**: "인간을 이해하는 감각과 AI, 두 축을 제대로 갖추면 정말 멋진 일을 할 수 있는 세상"
- **미션**: "사람들이 감각과 AI 두 축을 균형있게 발전시켜서 더 멋진 일을 할 수 있게 돕는다"
- **핵심 공식**: 인간을 이해하는 감각 × AI 적극 활용 = 멋진 일

### 핵심 가치 (Core Values)
- **ESSENTIAL**: 표면적 방법론이 아닌 근본 원리부터 이해하게 한다
- **THOUGHTFUL**: 즉시성보다 깊이 있는 고민과 사고를 추구한다  
- **PRIORITIZED**: 지금 정말 중요한 것이 무엇인지 구분하게 돕는다
- **PRINCIPLED**: 잘 이해한 원리를 바탕으로 일관성 있게 전달한다
- **PRACTICAL**: 현장 경험과 이론적 이해의 균형을 유지한다
- **AUTHENTIC**: 15년 현장 경험에서 나온 진실하고 솔직한 이야기를 한다

### 해결하고자 하는 문제
- 일을 열심히 하지만 "잘하고 있는 건지" 확신이 없는 상태
- 이론은 많지만 현장에서 실제로 적용 가능한 방법을 찾지 못하는 문제  
- AI 도구는 있지만 실무에 어떻게 활용해야 할지 모르는 상황
- 좋아하는 일과 잘하는 일 사이에서 방향을 잡지 못하는 고민

### 타겟 독자
**1차 타겟**: 브랜딩/마케팅 전문가들 (비즈니스 우선)
**2차 타겟**: 자영업자/소상공인들 (마음이 가는 곳)

## 🛠 기술 아키텍처

### Claude Code 기반 워크플로우
```
YouTube URL 입력
↓
YouTube Data API v3 (영상 메타데이터 추출)
↓
[imi-work-youtube-blogger] IMI WORK 전용 에이전트
├── IMI_WORK_PERSONA_GUIDE.md 자동 적용
├── IMI_WORK_PROMPT_TEMPLATE.md 템플릿 사용
└── SENSE_AI_SEO_STRATEGY.md SEO 최적화
↓
완성된 블로그 글 (Markdown + SEO 메타데이터 + YouTube 임베딩)
↓
Ghost Admin API 포스팅 (자동 YouTube 임베딩 포함)
↓
Notion 저장 + Telegram 알림 (향후)
```

### 핵심 구성 요소

#### 1. **YouTube Data API v3 연동** ✅
- **기능**: 영상 제목, 채널명, 설명, 발행일 등 메타데이터 추출
- **API 키**: `AIzaSyCRQTa4R1X2huihwWoLpLnsJsM0jZwj-PI` (설정 완료)
- **제한사항**: 자막 텍스트는 별도 방법 필요 (사용자 입력 보완)

#### 2. **IMI WORK 전용 서브에이전트** ✅
- **에이전트명**: `imi-work-youtube-blogger`
- **기능**: 3개 가이드라인 파일 자동 참조하여 브랜드 일관성 보장
- **파일 의존성**:
  - `/Users/rhim/projects/youtube-to-blog-personalized/IMI_WORK_PERSONA_GUIDE.md`
  - `/Users/rhim/projects/youtube-to-blog-personalized/IMI_WORK_PROMPT_TEMPLATE.md`
  - `/Users/rhim/projects/youtube-to-blog-personalized/SENSE_AI_SEO_STRATEGY.md`

#### 3. **YouTube 임베딩 시스템** ✅
- **기능**: 블로그 글 내 원본 YouTube 영상 자동 임베딩
- **Ghost CMS 활용**: YouTube URL 자동 변환 → 썸네일 + 제목 표시
- **장점**: 
  - 시각적 완성도 향상 (별도 이미지 제작 불필요)
  - 독자 편의성 (원본 영상 바로 시청 가능)
  - 작업 효율성 (featured image 생성 과정 생략)
- **위치**: 블로그 글 상단 또는 관련 섹션에 자연스럽게 배치

#### 4. **향후 연동 시스템** (구현 예정)
- **Ghost Admin API**: blog.imiwork.com 자동 포스팅
- **Notion API**: 콘텐츠 관리 및 저장  
- **Telegram Bot**: 완료 알림 및 상태 공유

## 📝 콘텐츠 생성 프로세스

### 1단계: YouTube 영상 분석 (YouTube Data API v3)
- **자동 추출**: 영상 제목, 채널명, 설명, 발행일, 태그 등
- **사용자 보완**: 핵심 포인트나 인상깊었던 부분 2-3줄 메모 제공  
- **관점 전환**: **"일을 잘한다"** 철학으로 영상 내용 재해석

### 2단계: IMI WORK 브랜드 페르소나 콘텐츠 생성

**핵심 원칙**: 영상의 인사이트와 내용에 따라 가장 자연스러운 구성으로 작성

**반드시 포함할 요소들** (순서와 형식은 자유):
- "일을 잘한다"는 철학으로 영상 내용 재해석
- 감각과 AI 두 축의 균형 관점에서 접근
- ESSENTIAL/THOUGHTFUL/PRACTICAL 등 핵심 가치 자연스럽게 반영
- 브랜딩 전문가와 자영업자 모두를 위한 실용적 통찰
- 겸손하면서도 차별점이 드러나는 개인적 경험과 관점

**가능한 구성 방식들**:
- 스토리텔링 중심 (영상 속 인물이나 사례를 따라가며)
- 질문 던지기 중심 (근본적 질문에서 시작해서)  
- 개인 경험 연결 (영상과 연결되는 경험담에서 출발)
- 패턴 분석 중심 (영상 속 패턴을 발견하고 분석)
- 문제 해결 중심 (영상에서 제기하는 이슈 중심)

**중요**: 정형화된 템플릿에 맞추려 하지 말고, 영상의 인사이트를 가장 효과적으로 전달할 수 있는 자연스러운 흐름으로 작성

### 3단계: SEO 최적화
**Naver Blog 특화**
- C-Rank, D.I.A+, Smart Block 최적화
- 한국어 검색 키워드 최적화
- 이미지, 구조화 데이터 활용

**Ghost Blog 특화**  
- 메타 태그, slug 최적화
- blog.imiwork.com 도메인 특화
- 내부 링크 및 카테고리 설정

### 4단계: Ghost 블로그 발행 ✅
- **HTML 변환**: 마크다운을 Ghost CMS 호환 HTML로 변환
- **YouTube 임베드 최적화**: 반응형 iframe 구조로 모바일/데스크톱 대응
- **Featured Image**: IMI WORK 브랜드 일관성을 유지하는 대표 이미지 생성
- **수동 포스팅**: Ghost 에디터에서 HTML 카드 활용하여 완성된 콘텐츠 발행

### 5단계: 향후 자동화 (구현 예정)
- Ghost Admin API를 통한 자동 포스팅
- Notion 데이터베이스 업데이트
- Telegram 성공/실패 알림

## 🎯 품질 관리 기준

### 콘텐츠 품질 (IMI WORK 6가지 가치 기준)
- **ESSENTIAL**: 표면적 팁이 아닌 근본 원리 전달
- **THOUGHTFUL**: 즉시성보다 깊이 있는 사고 유도  
- **PRIORITIZED**: 중요한 것과 덜 중요한 것 명확히 구분
- **PRINCIPLED**: 일관된 철학과 원리 기반 내용
- **PRACTICAL**: 현장 적용 가능한 구체적 방법 제시
- **AUTHENTIC**: 15년 경험에서 나온 진실한 이야기

### "일을 잘한다" 중심성
- YouTube 영상을 단순 요약하지 않고 "일 잘하기" 관점으로 재해석
- "인간을 이해하는 감각 × AI 적극 활용 = 멋진 일" 공식 반영
- 감각과 AI 두 축의 균형과 조합을 통한 실질적 통찰 제공
- 독자가 자신의 일에서 적용할 수 있는 통찰 제공
- 최소 2500자 이상의 완성된 깊이 있는 글

### SEO & 브랜드 일관성
- IMI WORK, SENSE & AI 브랜드 키워드 자연스러운 포함
- "일을 잘한다", "현장에서 찾은", "감각과 AI" 등 핵심 메시지 활용
- 1차 타겟(브랜딩/마케팅 전문가) 고려한 전문성
- 2차 타겟(자영업자/소상공인) 고려한 실용성

## 🔧 환경 변수 및 설정

### 현재 설정된 API 키
```bash
# YouTube Data API v3 ✅
YOUTUBE_API_KEY=AIzaSyCRQTa4R1X2huihwWoLpLnsJsM0jZwj-PI

# 향후 추가 필요
GHOST_API_URL=https://blog.imiwork.com
GHOST_ADMIN_API_KEY=(추후 설정)

NOTION_API_TOKEN=(기존 n8n 토큰 재사용 가능)
NOTION_DATABASE_ID=(기존 n8n DB ID 재사용 가능)

TELEGRAM_BOT_TOKEN=(기존 n8n 토큰 재사용 가능)
TELEGRAM_CHAT_ID=(기존 n8n 채팅 ID 재사용 가능)
```

### Claude Code 설정
```json
{
  "project": "youtube-to-blog-personalized",
  "agents": {
    "primary": "sns-essay-writer",
    "secondary": ["naver-seo-writer", "ghost-seo-optimizer"]
  },
  "persona": "hovoo-imicoffe-ceo",
  "output_format": "ghost-ready-markdown"
}
```

## 🚀 사용법

### 현재 구현된 기본 워크플로우
```bash
# 1. YouTube URL 제공 (+ 선택적 핵심 포인트 메모)
YouTube URL: https://www.youtube.com/watch?v=shvJ5mWb4Kk
핵심 포인트: "GaryVee가 말하는 변화 적응에 대한 부분이 특히 인상깊었음"

# 2. imi-work-youtube-blogger 에이전트 호출
/agents
imi-work-youtube-blogger 사용하여 위 영상 분석 및 블로그 글 작성

# 3. 자동 실행 과정
├── YouTube Data API로 영상 메타데이터 추출
├── IMI_WORK_PERSONA_GUIDE.md 가이드라인 적용
├── IMI_WORK_PROMPT_TEMPLATE.md 템플릿 사용  
└── SENSE_AI_SEO_STRATEGY.md SEO 최적화

# 4. 출력: 완성된 IMI WORK 스타일 블로그 글
```

### 현재 완성된 워크플로우 ✅
```bash
# 완성된 프로세스
1. YouTube URL + 핵심 포인트 입력
2. imi-work-youtube-blogger 에이전트로 브랜드 맞춤 콘텐츠 생성
3. HTML 변환 및 YouTube 임베드 최적화
4. Featured Image 생성 (브랜드 가이드라인 기반)
5. Ghost 블로그 수동 포스팅 완료

# 검증 완료 사항
✅ IMI WORK 브랜드 페르소나 일관성
✅ 자연스러운 글 구성 (템플릿 유연화)
✅ Ghost CMS 호환성 (HTML 변환)
✅ 반응형 YouTube 임베드
✅ Featured Image 워크플로우
```

### 향후 구현 예정 (자동화 확장)
- **Ghost API 자동 포스팅**: blog.imiwork.com에 직접 발행
- **Notion DB 저장**: 콘텐츠 관리 및 아카이빙
- **Telegram 알림**: 작업 완료 상태 실시간 공유
- **A/B 테스트**: 여러 버전 생성 후 최적화 선택

## 📊 성과 측정

### 콘텐츠 메트릭
- 평균 글자수 및 완성도
- hovoo 페르소나 일관성 점수
- 실무 경험 포함도

### SEO 메트릭  
- 네이버/구글 검색 랭킹
- 유입 트래픽 분석
- 키워드별 성과 추적

### 비즈니스 메트릭
- 블로그 방문자 수
- 컨설팅 문의 증가율
- 브랜드 인지도 향상

## 🔄 업데이트 로그

- **2025.08.26**: 프로젝트 초기 설정 및 CLAUDE.md 생성
- **2025.08.26**: YouTube Data API v3 연동 완료 (`AIzaSyCRQTa4R1X2huihwWoLpLnsJsM0jZwj-PI`)
- **2025.08.26**: IMI WORK 전용 서브에이전트 `imi-work-youtube-blogger` 생성 
- **2025.08.26**: 3개 가이드라인 파일 작성 완료 (페르소나, 프롬프트, SEO)
- **2025.08.27**: 첫 번째 블로그 글 작성 및 피드백 반영 (사실 왜곡, 강제 비교, 페르소나 과노출 문제 해결)
- **2025.08.27**: 템플릿 시스템 유연화 - 정형 구조 → 자연스러운 흐름 우선
- **2025.08.27**: Ghost CMS 연동 테스트 및 HTML 변환 완료
- **2025.08.27**: YouTube 임베드 반응형 최적화 (16:9 비율 유지, 모바일 대응)
- **2025.08.27**: Featured Image 생성 가이드라인 수립
- **2025.08.27**: Bret Taylor 블로그 글 완성 및 Ghost 블로그 발행 완료 ✅
- **2025.08.27**: OSMU 전략 수립 (Ghost → 네이버 + Instagram + Threads)
- **2025.08.27**: 프로젝트 폴더 재구성 (`/Users/rhim/projects/imi-work-osmu/`)
- **2025.08.27**: Notion 워크스페이스 설계 (대시보드 + 3개 DB 스키마)
- **2025.08.27**: Smithery Notion MCP 연동 준비 (페이지 ID: 25cd0f53623d8078b7bccc15d606ede0)
- **현재**: Notion MCP 인증 대기 중, OSMU 워크스페이스 구축 준비 완료

---

*"YouTube에서 얻은 인사이트를 hovoo의 15년 F&B 경험으로 재해석하여, 자영업자들에게 실질적 가치를 제공하는 개인화된 콘텐츠 자동화"*