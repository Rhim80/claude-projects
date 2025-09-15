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

#### 핵심 탐구 질문
**"일을 잘한다는 것이 무엇인가?"**

'일을 잘한다는 것'은 단순히 주어진 작업을 잘 수행하는 것을 넘어, **성과를 창출하고 고객에게 절대적인 신뢰를 얻으며 대체 불가능한 존재가 되는 것**을 의미합니다.

#### 시대적 인식: 필요에서 의미로
- **과거**: '필요'를 충족시키는 효용 가치 중심
- **현재**: '의미'를 만족시키는 가치 창출 시대
- **해결책 과잉 상태**: 정답이 넘치는 시대에서 질적 문제 해결이 핵심

#### 감각(Sense)의 중요성
- **핵심 역량**: 예측 불가능한 시대의 가장 중요한 능력
- **차별화의 원천**: 개인 경험에서 나오는 대체 불가능한 무기
- **문제 설정 능력**: 문제 해결보다 중요한 문제 발견과 설정
- **직관과 통찰**: 논리적 가설 설정의 출발점

#### AI와 감각의 관계
- **감각 우선**: AI는 감각을 증폭시키는 도구
- **상호 보완**: 감각만으로도, AI만으로도 부족한 시대
- **효과적 활용**: 감각이 뛰어나야 AI도 제대로 쓸 수 있음

#### 철학적 토대
- **비전**: "감각과 AI의 조합으로 불확실한 시대에서도 대체 불가능한 가치를 만드는 세상"
- **미션**: "일을 잘한다는 것의 본질을 탐구하고, 감각과 AI를 통해 실현할 수 있도록 돕는다"
- **핵심 공식**: 문제 설정 감각 × AI 증폭 효과 = 대체 불가능한 가치

### 핵심 가치 (Core Values)

#### 탐구와 발견
- **ESSENTIAL**: 문제 해결이 아닌 문제 설정의 본질을 탐구한다
- **THOUGHTFUL**: 가설 설정과 직관의 중요성, "무엇을 알고 싶은가?" 질문 우선

#### 감각과 전략  
- **PRIORITIZED**: 양적 문제에서 질적 문제로, 의미 가치 창출에 집중
- **PRINCIPLED**: 인사이드 아웃 사고방식, 자신의 감각에서 출발하는 논리

#### 실행과 연마
- **PRACTICAL**: 구체와 추상의 왕복운동, 톱다운과 보텀업의 조화
- **AUTHENTIC**: 감각의 사후성과 경험 축적, 시행착오를 통한 확신 구축

#### 일을 잘하는 방법론
1. **인사이드 아웃 사고**: 시스템이 아닌 자신의 감각에서 출발
2. **시간의 깊이 읽기**: 인과관계의 역학 파악, 논리적 시간 흐름 이해
3. **스토리텔링**: 논리적 개연성으로 설득, 수치가 아닌 스토리에 공감
4. **가설 설정 우선**: 무턱대고 분석하지 않고 방향성 먼저 잡기
5. **산의 양쪽에서 터널 파기**: 직관적 예측(톱다운)과 체계적 분석(보텀업) 결합

### 해결하고자 하는 문제

#### 근본적 문제 인식
- **일을 잘한다는 것의 정의 부재**: '열심히'와 '잘함'을 구분하지 못하는 상태
- **문제 설정 능력 부족**: 해결책은 많지만 정작 해결해야 할 문제를 찾지 못함
- **감각 연마의 기회 부족**: 논리와 분석에만 의존, 직관과 감각을 키우지 못함

#### 시대적 변화에 따른 문제
- **해결책 과잉 시대의 혼란**: 정답이 넘쳐나는 상황에서 선택의 기준 부재
- **효용 가치에서 의미 가치로의 전환 미인식**: 여전히 과거 방식으로 접근
- **AI 시대의 핵심 역량 오해**: AI를 단순 도구로만 보거나, 반대로 만능으로 과신

#### 실무적 고민
- **가설 설정 없는 분석**: "무엇을 알고 싶은가?" 질문 없이 무작정 데이터 분석
- **아웃사이드 인 사고의 한계**: 시스템에 의존하여 자신만의 관점 부재
- **단기 성과와 장기 감각의 균형**: 즉시 결과를 원하지만 감각은 시간이 필요

#### 개인적 성장의 벽
- **구체와 추상의 왕복운동 부족**: 경험을 일반화하거나 원리를 적용하지 못함
- **감각의 사후성 이해 부족**: 지금은 모르겠지만 나중에 의미가 될 것이라는 믿음 부재
- **인간에 대한 이해(교양) 경시**: 기술만 배우고 인간과 세상에 대한 통찰 부족

### 타겟 독자
**1차 타겟**: 브랜딩/마케팅 전문가들 (비즈니스 우선)
**2차 타겟**: 자영업자/소상공인들 (마음이 가는 곳)

## 🏗️ OSMU v2.0 하이브리드 아키텍처

### 새로운 서브에이전트 + Python 협력 체계

#### 🧠 Claude Code 서브에이전트 역할 (전략적 두뇌)
**핵심 원리**: 파이썬이 처리하지 못하는 지적 결정을 담당

```
1. 콘텐츠 전략 (imi-work-persona-writer)
   ├── 다양한 소스 분석 및 인사이트 추출
   ├── IMI WORK 브랜드 페르소나 적용 전략 
   ├── "일을 잘한다" 철학으로 콘텐츠 재해석
   └── 브랜드 일관성 및 품질 기준 설정
   
2. 이미지 생성 전략 (osmu-image-generator) - 메타프롬프트 방식
   ├── 콘텐츠 분석 및 예술적 해석 (브랜드 제약 제거)
   ├── 2개 메타프롬프트 생성 (Primary/Secondary Visual)
   ├── 예술사/디자인 이론 전문 용어 활용 (갤러리급 품질)
   └── Python 스크립트에 prompts_dict 전달
   
3. 발행 전략 (ghost-auto-publisher)
   ├── SEO 전략 및 브랜드 정렬 결정
   ├── 콘텐츠 구조 및 품질 기준 설정
   ├── Python 스크립트 실행 조정
   └── 발행 결과 검증 및 전략적 보고
```

#### 🖥️ Python 스크립트 역할 (기술적 실행 엔진)
**핵심 원리**: 서브에이전트가 정의한 전략을 기술적으로 실행

```
1. 이미지 생성 엔진 (scripts/gemini-image-generator.py)
   ├── Gemini 2.5 Flash API 호출 및 이미지 생성
   ├── 파일 시스템 관리 및 디렉토리 구조 생성
   ├── image-manifest.json 메타데이터 생성
   └── 오류 처리 및 재시도 로직

2. Ghost 발행 엔진 (scripts/ghost-auto-publish.py)
   ├── Ghost v5 Admin API 인증 및 호출
   ├── HTML/Lexical 변환 및 H1 중복 제거
   ├── 이미지 업로드 및 콘텐츠 통합
   └── API 응답 처리 및 오류 핸들링

3. 기반 라이브러리 (scripts/ghost-publisher.py)
   ├── 검증된 Ghost API 로직
   ├── JWT 토큰 관리
   ├── 이미지 업로드 및 포스트 생성
   └── source=html 파라미터 적용
```

#### 🔄 하이브리드 협력 방식
```
[서브에이전트] 전략적 분석 및 결정
     ↓ (파라미터 및 요구사항 전달)
[Python 스크립트] 기술적 실행
     ↓ (실행 결과 반환)
[서브에이전트] 결과 검증 및 보고
```

**장점:**
- **지능적 결정**: 서브에이전트가 창의성, 브랜드 일관성, 전략적 판단 담당
- **기술적 안정성**: Python이 API 호출, 파일 처리, 오류 핸들링 담당  
- **유연성**: 각 역할이 독립적으로 개선 가능
- **확장성**: 새로운 플랫폼 추가 시 서브에이전트는 전략만, Python은 기술만 확장

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
- **API 키**: 환경변수로 설정 (.env 파일 참조)
- **제한사항**: 자막 텍스트는 별도 방법 필요 (사용자 입력 보완)

#### 2. **OSMU 서브에이전트 시스템** ✅
- **imi-work-persona-writer**: YouTube → IMI WORK 콘텐츠 변환
- **osmu-image-generator**: 다중 플랫폼 이미지 패키지 생성
- **ghost-auto-publisher**: Ghost CMS 자동 발행 (v2.0) - ghost-publisher.py 사용
- **naver-seo-writer**: 네이버 블로그 SEO 최적화
- **sns-essay-writer**: SNS 에세이 톤 글쓰기

## 🔄 IMI WORK OSMU 표준 워크플로우 (검증 완료 ✅)

### ⚠️ 중요: 완전 자동화 프로덕션 워크플로우
2025년 9월 14일 Ben Horowitz 콘텐츠로 전체 워크플로우 검증 완료

### 📌 검증된 실행 순서 (100% 성공)
```
방법 1: Claude Code 서브에이전트 (권장)
1. YouTube 분석    → Task youtube-content-analyzer "[YouTube URL]"
2. 브랜드 변환     → Task imi-work-persona-writer "콘텐츠 변환"  
3. 이미지 생성     → Task osmu-image-generator "2개 메타프롬프트로 갤러리급 이미지 패키지"
4. Ghost 발행     → Task ghost-auto-publisher "HTML 콘텐츠로 발행"

방법 2: Python 스크립트 직접 실행 (검증 완료)
1. 이미지 생성: python3 scripts/gemini-image-generator.py
2. Ghost 발행: python3 scripts/ghost-auto-publish.py
```

### 🎯 최종 검증 결과
- **성공한 Ghost 포스트**: https://blog.imiwork.com/ben-horowitz-fear-leadership-insights-2/
- **생성된 이미지**: 2개 메타프롬프트로 6개 갤러리급 이미지 (총 8.5MB)
- **콘텐츠 길이**: 3,089자 마크다운 → 3,405자 HTML
- **기술 스택**: Ghost v5 + Gemini 2.5 Flash + JWT 인증 완료

### 🚀 하이브리드 서브에이전트 역할 정의

#### youtube-content-analyzer (순수 서브에이전트)
- YouTube API로 메타데이터 추출 (제목, 설명, 조회수 등)
- 핵심 인사이트 및 키워드 추출  
- JSON 형식으로 구조화된 데이터 제공
- **특징**: Python 스크립트 없이 Claude Code 내장 API만 사용

#### imi-work-persona-writer (순수 서브에이전트)
- guides/IMI_WORK_PERSONA_GUIDE.md 자동 읽기
- "일을 잘한다" 철학으로 콘텐츠 재해석
- 15년 F&B 경험 관점 자연스럽게 통합  
- 2500자 이상 브랜드 콘텐츠 생성
- **특징**: 창의적 글쓰기는 AI가 Python보다 우수

#### osmu-image-generator (하이브리드) - 메타프롬프트 전략
- **서브에이전트 역할**: 2개 메타프롬프트 생성 (Primary/Secondary), 예술사/디자인 이론 활용, 갤러리급 품질 추구
- **Python 역할**: scripts/gemini-image-generator.py가 Gemini API 호출 및 파일 관리
- **협력 결과**: 2개 프롬프트로 6개 이미지 생성 (브랜드 제약 없는 창의적 해석)
- **새로운 특징**: 브랜드 색상 제거, 영어 제목 우측하단 배치, 박물관급 시각적 품질

#### ghost-auto-publisher (하이브리드)
- **서브에이전트 역할**: SEO 전략, 브랜드 정렬, 콘텐츠 구조 최적화 결정
- **Python 역할**: scripts/ghost-auto-publish.py가 Ghost v5 API 처리 및 Lexical 변환
- **협력 결과**: HTML 직접 전송, H1 중복 제거, 이미지 통합 자동화
- **검증 완료**: https://blog.imiwork.com/ben-horowitz-fear-leadership-insights-2/ 발행 성공

#### naver-seo-writer (순수 서브에이전트)
- C-Rank, D.I.A+ 알고리즘 최적화 전략
- 한국어 키워드 및 해시태그 최적화
- 네이버 Smart Block 구조화
- **특징**: 네이버 API 없어서 수동 복사-붙여넣기 방식

#### instagram-threads-optimizer (순수 서브에이전트)  
- 카드뉴스 형식으로 콘텐츠 변환
- Instagram/Threads 해시태그 최적화
- 스토리텔링 구조 재편성
- **특징**: OSMU 이미지 패키지 활용, 수동 게시

### 📁 프로젝트 구조 (검증 완료)
```
imi-work-osmu/
├── guides/                        # 브랜드 가이드
│   ├── IMI_WORK_PERSONA_GUIDE.md
│   └── IMI_WORK_PROMPT_TEMPLATE.md
├── scripts/                       # 검증된 Python 헬퍼 스크립트
│   ├── gemini-image-generator.py  # ✅ Photorealistic 이미지 생성 엔진
│   ├── ghost-auto-publish.py      # ✅ Ghost v5 발행 엔진  
│   └── ghost-publisher.py         # ✅ 검증된 Ghost API 로직
├── contents/                      # 생성된 콘텐츠
│   └── ben-horowitz-fear-leadership-insights/
│       └── main.md                # ✅ 3,089자 IMI WORK 브랜드 콘텐츠
├── assets/images/                 # OSMU 이미지 저장소
│   └── ben-horowitz-fear-leadership-insights/  # ✅ 검증 완료
│       ├── ghost/
│       │   ├── feature.png        # 1200x630, 1.2MB
│       │   └── content-1.png      # 800x450, 1.5MB
│       ├── naver/
│       │   ├── main.png          # 800x450, 1.5MB  
│       │   └── body-1.png        # 800x450, 1.4MB
│       ├── instagram/
│       │   ├── feed.png          # 1080x1080, 1.5MB
│       │   └── story.png         # 1080x1350, 1.4MB
│       └── image-manifest.json
├── SUCCESS_GUIDE.md              # ✅ 검증된 워크플로우 가이드
└── CLAUDE.md                     # 프로젝트 문서 (업데이트됨)
```

### 🎯 하이브리드 워크플로우 실행 예시 (검증된 성공 사례)
```
✅ 실제 성공 사례: Ben Horowitz Fear Leadership 콘텐츠
YouTube: https://www.youtube.com/watch?v=KPxTekxQjzc

하이브리드 실행 과정:
1. 순수 서브에이전트 - Task youtube-content-analyzer "https://www.youtube.com/watch?v=KPxTekxQjzc"
   → YouTube 메타데이터 추출 및 핵심 인사이트 분석

2. 순수 서브에이전트 - Task imi-work-persona-writer "Ben Horowitz 두려움 리더십을 IMI WORK 브랜드로 변환"
   → 3,089자 브랜드 콘텐츠 생성 (창의적 글쓰기)

3. 하이브리드 - Task osmu-image-generator "photorealistic 스타일로 이미지 패키지 생성"
   → 서브에이전트: 비주얼 전략 수립 및 브랜드 일관성 확보
   → Python: scripts/gemini-image-generator.py로 6개 실사 이미지 생성 (8.5MB)

4. 하이브리드 - Task ghost-auto-publisher "HTML 콘텐츠와 이미지로 Ghost 발행"  
   → 서브에이전트: SEO 전략 및 품질 기준 설정
   → Python: scripts/ghost-auto-publish.py로 Ghost v5 API 처리
   → 결과: https://blog.imiwork.com/ben-horowitz-fear-leadership-insights-2/

하이브리드 아키텍처 장점 확인:
✅ 창의적 결정은 AI가, 기술적 실행은 Python이 최적 분담
✅ 각 도구의 강점을 최대한 활용한 효율적 협력
✅ 전체 프로세스 100% 성공, 프로덕션 준비 완료
```

## 🔀 소스 타입별 워크플로우 분기 처리

### 📌 소스 타입 자동 감지 및 라우팅

#### 1️⃣ YouTube 소스가 들어왔을 때
**패턴 인식**: youtube.com, youtu.be 포함된 URL
```bash
# YouTube URL 예시
- https://www.youtube.com/watch?v=xxxxx
- https://youtu.be/xxxxx
- youtube.com/shorts/xxxxx

# 실행 워크플로우
1. Task youtube-content-analyzer "[YouTube URL]"
   → YouTube 메타데이터 및 인사이트 추출
2. Task imi-work-persona-writer "추출된 인사이트를 IMI WORK 브랜드로 변환"
   → YouTube 데이터 기반 브랜드 콘텐츠 생성
3. Task osmu-image-generator "콘텐츠 기반 이미지 패키지 생성"
4. Task ghost-auto-publisher "Ghost 블로그 발행"
```

#### 2️⃣ 비YouTube 소스가 들어왔을 때
**패턴 인식**: 일반 URL, 텍스트, 경험 설명 등

##### 아티클/블로그 링크
```bash
# 입력 예시
- https://example.com/article
- "이 기사 내용으로 글 써줘: [링크]"

# 실행 워크플로우
1. [SKIP youtube-content-analyzer] ❌
2. Task imi-work-persona-writer "아티클 링크: [URL] + 핵심 내용 요약"
   → 직접 콘텐츠 분석 및 브랜드 변환
3. Task osmu-image-generator "콘텐츠 기반 이미지 패키지 생성"
4. Task ghost-auto-publisher "Ghost 블로그 발행"
```

##### 개인 경험/텍스트
```bash
# 입력 예시
- "오늘 카페에서 있었던 일을 블로그 글로 만들어줘"
- "이 아이디어를 IMI WORK 관점에서 정리해줘: [텍스트]"

# 실행 워크플로우
1. [SKIP youtube-content-analyzer] ❌
2. Task imi-work-persona-writer "[경험/텍스트 직접 입력]"
   → 경험을 브랜드 스토리로 변환
3. Task osmu-image-generator "스토리 기반 이미지 패키지 생성"
4. Task ghost-auto-publisher "Ghost 블로그 발행"
```

##### 복합 소스 (YouTube + 추가 자료)
```bash
# 입력 예시
- "이 YouTube 영상과 이 아티클을 함께 참고해서 글 써줘"

# 실행 워크플로우
1. Task youtube-content-analyzer "[YouTube URL]" (YouTube 부분만)
2. Task imi-work-persona-writer "YouTube 인사이트 + 추가 자료 통합"
   → 모든 소스 통합하여 브랜드 콘텐츠 생성
3. Task osmu-image-generator "통합 콘텐츠 기반 이미지 패키지"
4. Task ghost-auto-publisher "Ghost 블로그 발행"
```

### 🛡️ 에러 처리 및 폴백

#### 소스 타입 불명확할 때
```bash
# 기본 처리 방식
→ youtube-content-analyzer 건너뛰고
→ imi-work-persona-writer가 직접 처리

# 사용자에게 확인 요청
"제공하신 콘텐츠가 YouTube가 아닌 것 같습니다. 
바로 브랜드 콘텐츠로 변환하시겠습니까?"
```

#### YouTube URL이지만 접근 불가
```bash
# 폴백 처리
→ YouTube 제목/설명만으로 진행
→ 또는 사용자에게 핵심 내용 요청
```

### 💡 실행 팁
- **YouTube**: 항상 youtube-content-analyzer 먼저
- **그 외 모든 소스**: youtube-content-analyzer 건너뛰기
- **확실하지 않으면**: imi-work-persona-writer가 알아서 처리

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

### 1단계: 다양한 소스 분석 및 인사이트 추출
- **YouTube**: 영상 메타데이터 자동 추출 (YouTube Data API v3 활용)
- **아티클/블로그**: 핵심 개념 및 논점 파악
- **일상 경험**: 비즈니스 상황, 개인 성찰, 업계 대화 등
- **기타 콘텐츠**: 책, 팟캐스트, 연구자료 등
- **관점 전환**: 모든 소스를 **"일을 잘한다"** 철학으로 재해석

### 2단계: IMI WORK 브랜드 페르소나 콘텐츠 생성

**핵심 원칙**: 소스의 인사이트와 내용에 따라 가장 자연스러운 구성으로 작성

**반드시 포함할 요소들** (순서와 형식은 자유):
- "일을 잘한다"는 철학으로 소스 내용 재해석
- 감각과 AI 두 축의 균형 관점에서 접근
- ESSENTIAL/THOUGHTFUL/PRACTICAL 등 핵심 가치 자연스럽게 반영
- 브랜딩 전문가와 자영업자 모두를 위한 실용적 통찰
- 겸손하면서도 차별점이 드러나는 개인적 경험과 관점

**가능한 구성 방식들**:
- 스토리텔링 중심 (콘텐츠 속 인물이나 사례를 따라가며)
- 질문 던지기 중심 (근본적 질문에서 시작해서)  
- 개인 경험 연결 (소스와 연결되는 경험담에서 출발)
- 패턴 분석 중심 (콘텐츠 속 패턴을 발견하고 분석)
- 문제 해결 중심 (소스에서 제기하는 이슈 중심)

**중요**: 정형화된 템플릿에 맞추려 하지 말고, 소스의 인사이트를 가장 효과적으로 전달할 수 있는 자연스러운 흐름으로 작성

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
GEMINI_API_KEY=your_gemini_api_key_here
GHOST_API_URL=https://blog.imiwork.com
GHOST_ADMIN_API_KEY=your_ghost_admin_api_key_here
YOUTUBE_API_KEY=your_youtube_api_key_here
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
# 1. 다양한 소스 제공 (+ 선택적 핵심 포인트 메모)
예시 인풋:
- YouTube URL: https://www.youtube.com/watch?v=shvJ5mWb4Kk
- 아티클 링크 + 핵심 내용 요약
- "오늘 GPTers 스터디에서 나눈 대화 정리해줘"
- "이 경험을 IMI WORK 관점에서 블로그 글로 만들어줘"

# 2. imi-work-persona-writer 에이전트 호출
/agents
imi-work-persona-writer 사용하여 소스 분석 및 브랜드 콘텐츠 작성

# 3. 자동 실행 과정
├── 소스 분석 (YouTube API, 텍스트 분석, 경험 구조화 등)
├── "일을 잘한다" 철학으로 관점 재해석
├── IMI WORK 6가지 핵심 가치 자연스럽게 통합
└── 브랜드 페르소나 일관성 유지

# 4. 출력: 완성된 IMI WORK 스타일 콘텐츠
```

### 🔀 소스별 실행 예시 (NEW: Multi-Source Support)

#### 📺 YouTube 콘텐츠 처리
```bash
# 입력: YouTube URL
URL: "https://www.youtube.com/watch?v=KPxTekxQjzc"

# 실행 단계
1. Task youtube-content-analyzer "https://www.youtube.com/watch?v=KPxTekxQjzc"
   → YouTube 메타데이터 및 인사이트 추출
   
2. Task imi-work-persona-writer "Ben Horowitz 두려움 리더십을 IMI WORK 브랜드로 변환"
   → YouTube 데이터 기반 브랜드 콘텐츠 생성
   
3. Task osmu-image-generator "두려움 리더십 테마로 photorealistic 이미지 패키지"
   → 6개 플랫폼 최적화 이미지 생성
   
4. Task ghost-auto-publisher "HTML 콘텐츠로 Ghost 발행"
   → 완성된 블로그 포스트 자동 발행
```

#### 📄 아티클/블로그 콘텐츠 처리
```bash
# 입력: 아티클 링크 또는 내용
입력: "이 기사 내용으로 글 써줘: https://example.com/ai-business-trends"

# 실행 단계 (youtube-content-analyzer 생략)
1. [SKIP youtube-content-analyzer] ❌
   
2. Task imi-work-persona-writer "아티클 링크: https://example.com/ai-business-trends + AI 비즈니스 트렌드 분석"
   → 아티클 내용을 IMI WORK 관점으로 재해석
   
3. Task osmu-image-generator "AI 비즈니스 트렌드 테마 이미지 패키지"
   → 비즈니스 트렌드 관련 시각화 이미지 생성
   
4. Task ghost-auto-publisher "AI 트렌드 인사이트 Ghost 발행"
   → 트렌드 분석 블로그 포스트 발행
```

#### 💭 개인 경험/텍스트 처리
```bash
# 입력: 개인 경험이나 아이디어
입력: "오늘 카페에서 AI 자동화 시스템 도입 관련해서 팀 미팅을 했는데, 이를 블로그 글로 정리해줘"

# 실행 단계 (youtube-content-analyzer 생략)
1. [SKIP youtube-content-analyzer] ❌
   
2. Task imi-work-persona-writer "카페 AI 자동화 도입 팀 미팅 경험을 15년 F&B 관점에서 정리"
   → 개인 경험을 비즈니스 인사이트로 변환
   
3. Task osmu-image-generator "카페 AI 자동화 테마 이미지 패키지"
   → F&B AI 자동화 관련 이미지 생성
   
4. Task ghost-auto-publisher "카페 AI 도입기 Ghost 발행"
   → 실무 경험 기반 블로그 포스트 발행
```

#### 🔄 복합 소스 처리
```bash
# 입력: YouTube + 추가 자료
입력: "이 YouTube 영상 https://youtu.be/abc123과 이 McKinsey 보고서를 함께 참고해서 AI 리더십에 대한 글 써줘"

# 실행 단계 (YouTube 먼저 처리, 추가 자료 통합)
1. Task youtube-content-analyzer "https://youtu.be/abc123"
   → YouTube 메타데이터 추출
   
2. Task imi-work-persona-writer "YouTube 인사이트 + McKinsey 보고서 통합하여 AI 리더십 관점 정리"
   → 다중 소스 통합 브랜드 콘텐츠
   
3. Task osmu-image-generator "AI 리더십 통합 인사이트 이미지 패키지"
   → 리더십 테마 종합 이미지 생성
   
4. Task ghost-auto-publisher "AI 리더십 종합 분석 Ghost 발행"
   → 다중 소스 기반 종합 분석 포스트
```

### 🏆 완전 검증된 프로덕션 워크플로우 (2025.09.14)
```bash
# ✅ 검증 완료: Ben Horowitz 콘텐츠 성공 사례
# Ghost 포스트: https://blog.imiwork.com/ben-horowitz-fear-leadership-insights-2/

완성된 자동화 프로세스:
1. YouTube 소스 분석 → IMI WORK 브랜드 콘텐츠 변환 (3,089자)
2. Photorealistic 이미지 6개 생성 (총 8.5MB)
3. Ghost v5 API로 HTML 자동 발행 (source=html)
4. 피처 이미지 자동 업로드 및 연결
5. SEO 메타데이터 최적화 완료

# 🎯 검증된 기술 스택
✅ Gemini 2.5 Flash Image Preview (photorealistic 생성)
✅ Ghost v5 Admin API (JWT 인증 + source=html)
✅ Python 자동화 스크립트 (검증된 로직)
✅ OSMU 이미지 패키지 (6개 플랫폼 최적화)
✅ H1 중복 제거 (Ghost 제목과 충돌 방지)
✅ IMI WORK 브랜드 페르소나 100% 적용
```

### 🚀 하이브리드 프로덕션 실행 방법

#### 방법 1: 순수 Python 스크립트 (빠른 실행, 전략 결정 생략)
```bash
python3 scripts/gemini-image-generator.py  # 기술적 실행만, 전략적 결정 부족
python3 scripts/ghost-auto-publish.py      # 기술적 실행만, 브랜드 검증 생략
```
**장점**: 빠름 | **단점**: 창의성, 브랜드 일관성, 전략적 판단 부족

#### 방법 2: 하이브리드 서브에이전트 (권장, 지능적 협력)
```bash
Task osmu-image-generator "photorealistic 이미지 패키지"
# → 서브에이전트가 전략 수립 → Python이 기술 실행 → 서브에이전트가 결과 검증

Task ghost-auto-publisher "HTML 콘텐츠로 Ghost 발행"  
# → 서브에이전트가 SEO 전략 → Python이 API 처리 → 서브에이전트가 품질 확인
```
**장점**: 전략적 지능 + 기술적 안정성 | **단점**: 상대적으로 느림

#### 방법 3: 완전 수동 (학습 및 디버깅용)
```bash
# 1. 서브에이전트로 전략만 수립
# 2. Python 파라미터 수동 조정
# 3. 단계별 검증 및 개선
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
- **2025.08.26**: YouTube Data API v3 연동 완료 (환경변수로 보안 설정)
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
- **2025.09.14**: 🎉 **완전한 프로덕션 워크플로우 검증 완료**
  - **Photorealistic 이미지 생성**: Gemini 2.5 Flash로 6개 고품질 이미지 성공
  - **Ghost v5 완전 연동**: source=html로 HTML 직접 발행, Lexical 자동 변환
  - **H1 중복 제거**: Ghost 제목과 본문 충돌 해결
  - **Ben Horowitz 콘텐츠**: 전체 워크플로우 100% 성공 검증
  - **SUCCESS_GUIDE.md**: 재현 가능한 완전한 가이드라인 작성
- **2025.09.14**: 🔄 **하이브리드 아키텍처 전환 완료**
  - **서브에이전트 역할 재정의**: 전략적 두뇌 역할로 명확화
  - **Python 스크립트 역할 정의**: 기술적 실행 엔진으로 명확화
  - **osmu-image-generator.md 업데이트**: 하이브리드 협력 방식 명시
  - **ghost-auto-publisher.md 업데이트**: 전략적 조정 + 기술적 실행 분리
  - **CLAUDE.md 하이브리드 문서화**: 새로운 협력 체계 완전 반영

---

**🏆 프로젝트 진화**: IMI WORK OSMU v2.0 하이브리드 아키텍처가 완성되었습니다.

**핵심 성과:**
- ✅ **기술적 검증**: Ben Horowitz 콘텐츠로 전체 워크플로우 100% 성공
- ✅ **아키텍처 진화**: 서브에이전트(전략적 두뇌) + Python(기술적 실행) 하이브리드 체계 확립
- ✅ **역할 명확화**: AI가 창의성과 전략을, Python이 안정성과 기술을 담당하는 최적 분업
- ✅ **확장 가능성**: 새로운 플랫폼 추가 시 전략과 기술이 독립적으로 확장 가능

*검증된 성공 사례: https://blog.imiwork.com/ben-horowitz-fear-leadership-insights-2/*  
*하이브리드 아키텍처 완성: 2025.09.14*