# IMI WORK OSMU v2.0

> "일을 잘한다는 것"에 대한 통찰을 전하는 SENSE & AI 블로그 OSMU 콘텐츠 자동화 시스템

## 📋 프로젝트 개요

YouTube 콘텐츠를 IMI WORK 브랜드 페르소나로 변환하여 Ghost, 네이버 블로그, Instagram 등 다중 플랫폼에 최적화된 콘텐츠로 자동 배포하는 OSMU(One Source Multi Use) 시스템입니다.

### 🌟 주요 특징

- **Claude Code 서브에이전트 아키텍처**: 각 에이전트의 전문성 극대화
- **OSMU 이미지 중앙화**: osmu-image-generator가 모든 플랫폼용 이미지 패키지 생성
- **IMI WORK 브랜드 일관성**: "일을 잘한다" 철학 중심의 콘텐츠 변환
- **slug 기반 자산 관리**: 체계적인 디렉토리 구조와 매니페스트 관리

## 🏗️ 프로젝트 구조

```
imi-work-osmu/
├── contents/                   # 모든 생성된 콘텐츠
│   └── [slug]/                # 각 콘텐츠별 폴더
│       ├── main.md            # 메인 블로그 글
│       ├── naver.md           # 네이버 최적화 버전
│       ├── instagram.md       # 인스타 버전
│       └── README.md          # 콘텐츠 메타정보
├── assets/images/             # 모든 이미지 자산
│   └── [slug]/               # 각 콘텐츠별 이미지
│       ├── ghost/            # Ghost용 이미지
│       ├── naver/           # 네이버용 이미지
│       ├── instagram/       # 인스타용 이미지
│       └── image-manifest.json
├── scripts/                   # 모든 파이썬 스크립트
│   ├── youtube-analyzer.py
│   ├── imi-work-persona-writer.py
│   ├── osmu-image-generator.py
│   ├── ghost-auto-publisher.py
│   └── tests/               # 테스트 파일들
├── guides/                   # 가이드 문서들
├── tracking/                 # 성과 추적 관련
├── lectures/                 # 강의/스터디 자료
└── archive/                  # 과거 자료들
```

## 🚀 빠른 시작

### 1. 환경 설정

```bash
# 레포지토리 클론
git clone <repository-url>
cd imi-work-osmu

# 의존성 설치
pip install -r requirements.txt

# 환경 변수 설정
cp .env.template .env
# .env 파일에 실제 API 키들 입력
```

### 2. 필요한 API 키

`.env` 파일에 다음 API 키들을 설정하세요:

- **YOUTUBE_API_KEY**: YouTube Data API v3 키
- **GEMINI_API_KEY**: Google Gemini 이미지 생성 키
- **GHOST_ADMIN_API_KEY**: Ghost CMS API 키
- **NOTION_TOKEN**: Notion API 토큰 (선택)

### 3. 기본 워크플로우 실행

```bash
# 1. YouTube 영상 분석
cd scripts
python youtube-analyzer.py "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"

# 2. IMI WORK 콘텐츠 생성
python imi-work-persona-writer.py

# 3. 이미지 패키지 생성
python osmu-image-generator.py --slug your-content-slug

# 4. Ghost 블로그 자동 발행
python ghost-auto-publisher.py --slug your-content-slug
```

## 🤖 서브에이전트 시스템

### 1. youtube-analyzer
- YouTube Data API v3를 사용한 메타데이터 추출
- 영상 제목, 설명, 채널 정보 등 구조화

### 2. imi-work-persona-writer
- YouTube → IMI WORK 브랜드 톤 변환
- "일을 잘한다" 철학 중심의 콘텐츠 재해석
- 브랜딩 전문가 + 자영업자 대상 통찰 제공

### 3. osmu-image-generator
- Gemini 2.5 Flash 기반 이미지 생성
- 다중 플랫폼 최적화 (Ghost/네이버/Instagram)
- slug 기반 체계적 자산 관리

### 4. ghost-auto-publisher
- Ghost Admin API v5 연동
- SEO 최적화된 자동 발행
- Draft → Published 워크플로우

## 📊 브랜드 정체성

### IMI WORK 핵심 가치
- **ESSENTIAL**: 문제 해결이 아닌 문제 설정의 본질 탐구
- **THOUGHTFUL**: 가설 설정과 직관의 중요성
- **PRIORITIZED**: 양적 문제에서 질적 문제로
- **PRINCIPLED**: 인사이드 아웃 사고방식
- **PRACTICAL**: 구체와 추상의 왕복운동
- **AUTHENTIC**: 감각의 사후성과 경험 축적

### 타겟 독자
- **1차**: 브랜딩/마케팅 전문가들
- **2차**: 자영업자/소상공인들

## 🔧 고급 설정

### Claude Code와 함께 사용

```bash
# Claude Code 서브에이전트 호출 예시
Task imi-work-persona-writer "YouTube 영상을 IMI WORK 브랜드로 변환"
Task osmu-image-generator "다중 플랫폼 이미지 패키지 생성"  
Task ghost-auto-publisher "Ghost 블로그 자동 발행"
```

### 성과 추적

- 콘텐츠별 성과는 `tracking/` 폴더에서 관리
- Notion API 연동으로 자동 데이터 수집 가능

## 🤝 기여하기

1. Fork 후 브랜치 생성
2. 변경사항 커밋
3. Pull Request 제출

## 📝 라이선스

MIT License

---

**"일을 잘한다는 것은, 반복되는 일을 시스템화하고 창의적인 일에 집중하는 것이다."**

*Made with ❤️ by IMI WORK Team*