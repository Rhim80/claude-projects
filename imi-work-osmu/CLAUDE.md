# CLAUDE.md - IMI WORK OSMU v2.0 프로젝트

> "일을 잘한다는 것"에 대한 통찰을 전하는 SENSE & AI 블로그 OSMU 콘텐츠 자동화 시스템

## 📋 프로젝트 개요

### 현재 목표
YouTube 콘텐츠를 IMI WORK 브랜드 페르소나로 변환하여 Ghost, 네이버 블로그, Instagram 등 다중 플랫폼에 최적화된 콘텐츠로 자동 배포하는 OSMU 시스템 구축

### 핵심 차별점
- **Claude Code 서브에이전트 아키텍처**: 각 에이전트의 전문성 극대화
- **OSMU 이미지 중앙화**: osmu-image-generator가 모든 플랫폼용 이미지 패키지 생성
- **IMI WORK 브랜드 일관성**: "일을 잘한다" 철학 중심의 콘텐츠 변환
- **slug 기반 자산 관리**: 체계적인 디렉토리 구조와 매니페스트 관리

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

## 🏗️ OSMU v2.0 아키텍처

### 새로운 서브에이전트 분업 체계
```
1. 콘텐츠 작성 (imi-work-persona-writer)
   ├── YouTube 영상 분석 및 메타데이터 추출
   ├── IMI WORK 브랜드 페르소나 적용
   └── 마크다운 콘텐츠 생성
   
2. 이미지 패키지 생성 (osmu-image-generator)
   ├── Gemini AI 기반 이미지 생성
   ├── 플랫폼별 최적화 (Ghost/네이버/Instagram)
   └── image-manifest.json 메타데이터 생성
   
3. 플랫폼별 발행
   ├── Ghost 발행 (ghost-auto-publisher)
   ├── 네이버 최적화 (naver-seo-writer)
   └── SNS 에세이 (sns-essay-writer)
```

### slug 기반 자산 관리 구조
```
imi-work-osmu/assets/images/
└── [slug]/                  # 콘텐츠별 통합 관리
    ├── ghost/               # Ghost 블로그 전용
    │   ├── feature.png      # 피처 이미지 (1200x630)
    │   └── content-1.png    # 본문 이미지 (800x450)
    ├── naver/               # 네이버 블로그 전용
    │   ├── main.png         # 대표 이미지 (800x450)
    │   └── body-1.png       # 본문 이미지 (800x450)
    ├── instagram/           # 인스타그램 전용
    │   ├── feed.png         # 피드 이미지 (1080x1080)
    │   └── story.png        # 스토리 이미지 (1080x1350)
    └── image-manifest.json  # 이미지 메타데이터
```

### 핵심 구성 요소

#### 1. **YouTube Data API v3 연동** ✅
- **기능**: 영상 제목, 채널명, 설명, 발행일 등 메타데이터 추출
- **API 키**: `AIzaSyCRQTa4R1X2huihwWoLpLnsJsM0jZwj-PI` (설정 완료)
- **제한사항**: 자막 텍스트는 별도 방법 필요 (사용자 입력 보완)

#### 2. **OSMU 서브에이전트 시스템** ✅
- **imi-work-persona-writer**: YouTube → IMI WORK 콘텐츠 변환
- **osmu-image-generator**: 다중 플랫폼 이미지 패키지 생성
- **ghost-auto-publisher**: Ghost CMS 자동 발행 (v2.0)
- **naver-seo-writer**: 네이버 블로그 SEO 최적화
- **sns-essay-writer**: SNS 에세이 톤 글쓰기

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

### API 키 중앙화 (.env) ✅
```bash
# imi-work-osmu/.env
GEMINI_API_KEY=AIzaSyDBjAmTsAcj3YT2_F0eh6thHb4ctAxFfL4
GHOST_API_URL=https://blog.imiwork.com
GHOST_ADMIN_API_KEY=689ab9c2806ede000158236d:bcf8cc2cdfe9d9ecf91c534145101b6586aa6586f6ccec19ba359ec071cc2f8a
YOUTUBE_API_KEY=AIzaSyCRQTa4R1X2huihwWoLpLnsJsM0jZwj-PI
```

### 보안 개선사항 ✅
- 모든 하드코딩된 API 키 제거
- `.env` 파일을 통한 환경변수 관리
- `.gitignore`에 `.env` 포함하여 Git 커밋 방지
- 모든 JavaScript 파일에서 `require('dotenv').config()` 적용

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

# 2. imi-work-persona-writer 에이전트 호출
/agents
imi-work-persona-writer 사용하여 위 영상 분석 및 블로그 글 작성

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
2. imi-work-persona-writer 에이전트로 브랜드 맞춤 콘텐츠 생성
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

### 현재 워크플로우 (OSMU v2.0) ✅
```bash
# 권장 방법: Claude Code 인터랙티브 가이드
1. YouTube URL 제공 → imi-work-persona-writer 호출
2. 콘텐츠 완성 → osmu-image-generator 호출  
3. 이미지 패키지 완성 → ghost-auto-publisher 호출
4. Ghost 발행 완료 → naver-seo-writer 호출 (필요시)
5. 개인적 에세이 → sns-essay-writer 호출 (필요시)
```

### 향후 구현 예정 (확장)
- **LinkedIn, Facebook** 등 추가 플랫폼 지원
- **성과 분석 및 최적화** 자동화
- **A/B 테스트 이미지** 생성 기능

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
- **2025.08.26**: IMI WORK 전용 서브에이전트 `imi-work-persona-writer` 생성 
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
- **2025.09.08**: OSMU v2.0 아키텍처 대전환 (서브에이전트 분업 + 이미지 중앙화)
- **2025.09.08**: API 키 보안 강화 (.env 도입) 및 프로젝트 구조 최적화
- **현재**: OSMU v2.0 시스템 완성, Claude Code 인터랙티브 가이드 방식 확립

---

*"서브에이전트 분업과 OSMU 전략으로 구현된 효율적이고 확장 가능한 AI 콘텐츠 자동화 시스템 - 2025.09.08 완성"*