# YouTube RSS Bot 워크플로우 분석

> 10개 YouTube 채널을 모니터링하여 AI 요약 → Notion 저장 → Telegram 알림 → 블로그 글 생성 연동

## 📋 워크플로우 개요

### 기본 정보
- **파일명**: `youtube-rss-bot.json`
- **버전**: stable-2.0
- **실행 주기**: 매시간 (everyHour)
- **주요 기능**: YouTube 영상 자동 수집 → AI 요약 → Notion 저장 → Telegram 인터랙티브 알림

### 모니터링 채널 (10개)
1. **시민개발자 구씨** - `UCDLlMjELbrJdETmSiAB68AA` (국내 AI/개발)
2. **Lenny's Podcast** - `UC6t1O76G0jYXOAoYCm153dA` (해외 제품관리)
3. **언더스텐딩딩** - `UCIUni4ScRp4mqPXsxy62L5w` (국내 브랜딩)
4. **디자인하는AI** - `UCk_xkR8ORNwtMkaffvYArGA` (국내 AI 디자인)
5. **a16z** - `UC9cn0TuPq4dnbTY-CBsm8XA` (해외 VC)
6. **Big Think** - `UCvQECJukTDE2i6aCoMnS-Vg` (해외 철학/사고)
7. **GaryVee** - `UCctXZhXmG-kf3tlIXgVZUlw` (해외 마케팅/기업가)
8. **Startup Grind** - `UCwB3HiWejAkml1UZ0Qo2bFg` (해외 스타트업)
9. **Ali Abdaal** - `UCoOae5nYA7VqaXzerajD0lg` (해외 생산성)
10. **CMI Content** - `UCN5xPNTy8hLoRVTGbECznMg` (해외 콘텐츠 마케팅)

## 🔄 워크플로우 구조

### Phase 1: 영상 수집 및 전처리
```
RSS 피드 모니터링 (10개 채널)
         ↓
Edit Fields (데이터 정규화)
├── title 추출
├── link 정규화 (Shorts → 일반 영상)
├── pubDate 추출
├── author 추출
└── rss_source 분류
```

### Phase 2: AI 분석 및 요약
```
YouTube Transcript (자막 추출)
         ↓
Google Gemini 2.0 Flash (AI 요약)
├── 800자 이내 완결 요약
├── 핵심 주제 → 주요 논점 → 결론 구조
├── Temperature: 0.3 (일관성 우선)
└── Max Tokens: 300
```

### Phase 3: 데이터 저장 및 알림
```
Notion DB 저장
├── URL, 채널명, 게시일, 수집일
├── RSS소스 분류
└── AI 요약 내용
         ↓
Telegram 알림 (인터랙티브)
├── 영상 정보 + 요약 표시
├── "📝 블로그 글 생성" 버튼
├── "🎥 영상 보기" 버튼
└── "📊 Notion에서 보기" 버튼
```

### Phase 4: 블로그 글 생성 연동
```
Telegram Callback 처리
         ↓
데이터 파싱 및 검증
         ↓
별도 블로그 워크플로우 트리거
├── 웹훅: https://n8n.imiwork.com/webhook-test/youtube-blog-automation
├── Notion Page ID + Video ID 전달
├── 진행 상황 Telegram 알림
└── 완료/실패 알림
```

## 🛠 핵심 노드 분석

### 1. RSS Feed Triggers (10개)
- **유형**: `n8n-nodes-base.rssFeedReadTrigger`
- **주기**: 매시간 폴링
- **기능**: 새로운 YouTube 영상 감지

### 2. Edit Fields
- **유형**: `n8n-nodes-base.set`
- **기능**: 
  - Shorts URL을 일반 YouTube URL로 변환
  - 채널명 기반 RSS 소스 자동 분류
  - 데이터 구조 정규화

### 3. YouTube Transcript
- **유형**: `n8n-nodes-bandi-youtube-transcript.youtubeTranscriptNode`
- **언어**: 한국어 우선 (`preferCapLang: "ko"`)
- **기능**: YouTube 자막 자동 추출

### 4. Google Gemini Chat Model
- **모델**: `models/gemini-2.0-flash-001`
- **설정**:
  - Max Tokens: 300
  - Temperature: 0.3 (일관성 중심)
- **프롬프트**: 800자 완결 요약, 구조화된 형식

### 5. Notion 저장
- **DB ID**: `23fd0f53-623d-81fe-a9cb-fda36d562a91`
- **필드**:
  - URL (url), 채널명 (rich_text)
  - 게시일/수집일 (date), RSS소스 (select)
  - 요약 (rich_text)

### 6. Telegram 인터랙티브 알림
- **채널 ID**: `7830356405`
- **기능**:
  - 영상 정보 + 요약 표시
  - 3가지 인터랙티브 버튼 제공
  - Callback Data로 추가 워크플로우 트리거

## 🎯 Claude Code 연동 개선 계획

### 현재 한계점
1. **AI 요약 품질**: Google Gemini 단독 사용
2. **브랜드 일관성**: IMI WORK 페르소나 미반영
3. **콘텐츠 활용**: 단순 요약에서 그침
4. **분류 정확도**: 규칙 기반 RSS 소스 분류

### Claude Code 연동 개선안

#### 1단계: AI 요약 품질 향상
```bash
# 기존: Google Gemini 단독 요약
Google Gemini → 800자 요약

# 개선: imi-work-youtube-blogger 에이전트 활용  
YouTube Transcript → imi-work-youtube-blogger → IMI WORK 관점 재해석 → 블로그 초안
```

#### 2단계: 지능적 분류 시스템
```bash
# 기존: 규칙 기반 채널명 매칭
Edit Fields → 하드코딩된 채널명 분류

# 개선: AI 기반 콘텐츠 분류
Basic LLM Chain → ai-business-architect → 콘텐츠 중요도 + 카테고리 자동 분류
```

#### 3단계: 자동 블로그 생성 고도화
```bash
# 기존: 수동 버튼 클릭 → 별도 워크플로우
Telegram Callback → 외부 웹훅 호출

# 개선: 통합 자동 생성
Notion 저장 → imi-work-youtube-blogger → Ghost 자동 포스팅 → OSMU 변환
```

## 📊 성과 지표

### 현재 성과 (추정)
- **처리량**: 시간당 평균 2-3개 영상
- **요약 품질**: 일반적인 AI 요약 수준
- **사용자 피드백**: Telegram 인터랙션율 기반
- **후속 활용**: 수동 블로그 생성 (버튼 클릭률 약 20-30% 예상)

### Claude Code 연동 후 목표
- **요약 품질**: IMI WORK 브랜드 관점 반영으로 차별화된 인사이트 제공
- **자동화율**: 수동 버튼 클릭 → 자동 블로그 생성으로 효율성 향상
- **콘텐츠 확장**: 1개 영상 → 5개 플랫폼 OSMU 자동 변환
- **분류 정확도**: 규칙 기반 → AI 기반으로 정확도 95% 이상

## 🔧 기술적 세부사항

### 에러 처리
- **YouTube Transcript 실패**: 영상 정보만으로 Notion 저장
- **AI 요약 실패**: 원본 자막 저장
- **Notion 저장 실패**: Telegram 에러 알림
- **블로그 생성 실패**: 사용자에게 재시도 안내

### 보안 및 인증
- **Notion API**: `kCKFfrau35Gf4PvW`
- **Telegram Bot**: `hIo5i77YKdu9Rs8g`  
- **Google Gemini**: `SO4eLSfcE2Z5kkss`
- **Webhook 보안**: callback data 검증 로직

### 데이터 흐름 최적화
- **병렬 처리**: 10개 RSS 피드 동시 모니터링
- **중복 방지**: RSS 피드 자체 중복 제거 기능
- **재시도 로직**: 네트워크 오류 시 자동 재시도
- **타임아웃 설정**: HTTP 요청 120초 제한

## 🚀 향후 개발 계획

### 즉시 적용 가능 (1-2주)
1. `imi-work-youtube-blogger` 에이전트 연동 테스트
2. 기존 Google Gemini와 성능 비교
3. 소수 채널로 파일럿 테스트

### 중기 개발 (1-2개월)
1. `ai-business-architect` 기반 지능형 분류 시스템
2. Ghost 블로그 자동 포스팅 연동  
3. OSMU 자동 변환 시스템

### 장기 비전 (3-6개월)  
1. 완전 자동화된 콘텐츠 파이프라인
2. Claude Code 기반 개인화 추천 시스템
3. 성과 분석 및 최적화 대시보드

---

*이 워크플로우는 현재 IMI WORK의 핵심 자동화 시스템으로, Claude Code 연동을 통해 단순한 RSS 수집을 넘어선 지능적 콘텐츠 생성 플랫폼으로 진화할 예정입니다.*