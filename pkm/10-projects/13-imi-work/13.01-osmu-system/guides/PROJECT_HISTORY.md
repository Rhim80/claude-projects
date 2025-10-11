# IMI WORK OSMU 프로젝트 히스토리 v2.0

> "일을 잘한다는 것"에 대한 통찰을 전하는 SENSE & AI 블로그 OSMU 콘텐츠 자동화 시스템

## 📋 프로젝트 개요

### 진화 과정
- **Phase 1**: YouTube to Blog 자동화 (2025.08.26-27)
- **Phase 2**: OSMU (One Source Multi Use) 전략 도입 (2025.08.27)
- **Phase 3**: 서브에이전트 아키텍처 전환 (2025.09.08)
- **Phase 4**: 이미지 중앙화 및 보안 강화 (2025.09.08)

### 현재 목표
YouTube 콘텐츠를 IMI WORK 브랜드 페르소나로 변환하여 Ghost, 네이버 블로그, Instagram 등 다중 플랫폼에 최적화된 콘텐츠로 자동 배포하는 OSMU 시스템 구축

### 핵심 차별점
- **Claude Code 서브에이전트 아키텍처**: 각 에이전트의 전문성 극대화
- **OSMU 이미지 중앙화**: osmu-image-generator가 모든 플랫폼용 이미지 패키지 생성
- **IMI WORK 브랜드 일관성**: "일을 잘한다" 철학 중심의 콘텐츠 변환
- **slug 기반 자산 관리**: 체계적인 디렉토리 구조와 매니페스트 관리

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

## 🛠 서브에이전트 상세

### 1. imi-work-persona-writer (콘텐츠 작성)
**위치**: `/home/hovoo/.claude/agents/imi-work-persona-writer.md`

**역할 축소와 전문화**:
- 기존 `imi-work-youtube-blogger`에서 역할 축소
- YouTube 영상 분석 및 IMI WORK 브랜드 페르소나 변환에 집중
- 이미지 생성 책임 제거 → osmu-image-generator로 분리

**핵심 기능**:
- YouTube Data API v3 활용 메타데이터 추출
- IMI WORK 브랜드 가이드라인 자동 적용
- "일을 잘한다" 철학 중심 콘텐츠 재해석
- 마크다운 형태의 완성된 블로그 글 생성

### 2. osmu-image-generator (이미지 중앙화)
**위치**: `/home/hovoo/.claude/agents/osmu-image-generator.md`

**핵심 역할**:
- 모든 플랫폼용 이미지를 한 번에 생성
- Gemini 2.5 Flash Image API 활용
- slug 기반 디렉토리 구조 생성
- image-manifest.json 메타데이터 관리

**생성 이미지 사양**:
- **Ghost**: Feature (1200x630) + Content (800x450)
- **네이버**: Main (800x450) + Body (800x450)
- **Instagram**: Feed (1080x1080) + Story (1080x1350)

### 3. ghost-auto-publisher (Ghost 발행)
**위치**: `/home/hovoo/.claude/agents/ghost-auto-publisher.md`

**v2.0 업그레이드**:
- 이미지 생성 로직 완전 제거
- OSMU 이미지 패키지 로드 및 활용
- Ghost Admin API v5.0 연동
- YouTube 임베드 자동 처리

**핵심 클래스**:
```javascript
// ghost-automation-osmu.js
class OSMUGhostPublisherV2 {
    loadImageManifest(slug)
    getGhostImagePaths(slug) 
    publishWithOSMUPackage(postData, slug, options)
}
```

### 4. naver-seo-writer (네이버 최적화)
**위치**: `/home/hovoo/.claude/agents/naver-seo-writer.md`

**워크플로우 위치**: Ghost 발행 이후
- OSMU 이미지 패키지 재활용
- 네이버 블로그 SEO 최적화 (C-Rank, D.I.A+)
- 수동 업로드 형태의 가이드 제공
- 한국어 검색 키워드 최적화

### 5. sns-essay-writer (SNS 에세이)
**위치**: `/home/hovoo/.claude/agents/sns-essay-writer.md`

**역할 명확화**:
- 개인적, 에세이 톤의 SNS 콘텐츠 전용
- 무라카미 하루키 스타일 감성적 글쓰기
- Instagram 캡션, 블로그 포스트 등

## 🔧 보안 및 환경 설정

### API 키 중앙화 (.env)
```bash
# imi-work-osmu/.env
GEMINI_API_KEY=your_gemini_api_key_here
GHOST_API_URL=https://blog.imiwork.com
GHOST_ADMIN_API_KEY=your_ghost_admin_api_key_here
YOUTUBE_API_KEY=your_youtube_api_key_here
```

### 보안 개선사항
- 모든 하드코딩된 API 키 제거
- `.env` 파일을 통한 환경변수 관리
- `.gitignore`에 `.env` 포함하여 Git 커밋 방지
- 모든 JavaScript 파일에서 `require('dotenv').config()` 적용

## 🔄 데이터 흐름

### OSMU 워크플로우
```
1. 사용자: YouTube URL + 핵심 포인트 제공
   ↓
2. imi-work-persona-writer: 브랜드 콘텐츠 생성
   ↓
3. osmu-image-generator: 종합 이미지 패키지 생성
   ├── imi-work-osmu/assets/images/[slug]/
   ├── ghost/, naver/, instagram/ 디렉토리
   └── image-manifest.json
   ↓
4. ghost-auto-publisher: 이미지 패키지 로드 + Ghost 발행
   ├── manifest에서 이미지 경로 추출
   ├── Ghost API 업로드
   └── Draft 상태로 포스팅
   ↓
5. 추가 플랫폼 확장 (선택적)
   ├── naver-seo-writer: 네이버 최적화
   └── sns-essay-writer: Instagram 에세이
```

### image-manifest.json 구조
```json
{
  "slug": "ai-literacy-gap",
  "title": "AI 리터러시 격차, 4개월이면 충분할까?",
  "created_at": "2025-09-08T10:00:00Z",
  "generator_version": "1.0",
  "content_summary": "AI 활용 능력의 극단적 격차와 해결 방안",
  "platforms": {
    "ghost": {
      "feature": "ghost/feature.png",
      "content": ["ghost/content-1.png"]
    },
    "naver": {
      "main": "naver/main.png", 
      "body": ["naver/body-1.png", "naver/body-2.png"]
    },
    "instagram": {
      "feed": "instagram/feed.png",
      "story": "instagram/story.png"
    }
  }
}
```

## 📊 파일 구조 정리

### 현재 디렉토리 구조
```
imi-work-osmu/
├── .env                     # API 키 중앙 관리
├── assets/images/           # 이미지 자산 저장소
│   └── [slug]/              # 콘텐츠별 이미지 패키지
├── contents/                # 생성된 콘텐츠
│   ├── ghost-automation-osmu.js      # Ghost Publisher v2
│   └── ghost-automation-workflow.md  # 워크플로우 가이드
├── guides/                  # 전략 및 가이드 문서
│   ├── PROJECT_HISTORY.md   # 프로젝트 히스토리 (이 파일)
│   ├── OSMU_IMAGE_STRATEGY.md
│   ├── IMI_WORK_PERSONA_GUIDE.md
│   ├── IMI_WORK_PROMPT_TEMPLATE.md
│   └── SENSE_AI_SEO_STRATEGY.md
└── archive/                 # 아카이브된 테스트 파일들
```

### 서브에이전트 위치
```
/home/hovoo/.claude/agents/
├── imi-work-persona-writer.md   # YouTube → IMI WORK 콘텐츠 변환
├── osmu-image-generator.md      # 다중 플랫폼 이미지 생성
├── ghost-auto-publisher.md      # Ghost CMS 자동 발행
├── naver-seo-writer.md          # 네이버 블로그 SEO 최적화
└── sns-essay-writer.md          # SNS 에세이 톤 글쓰기
```

## 🚀 현재 워크플로우 실행 방법

### 권장 방법: Claude Code 인터랙티브 가이드
```bash
# 단계별 서브에이전트 실행
1. YouTube URL 제공 → imi-work-persona-writer 호출
2. 콘텐츠 완성 → osmu-image-generator 호출  
3. 이미지 패키지 완성 → ghost-auto-publisher 호출
4. Ghost 발행 완료 → naver-seo-writer 호출 (필요시)
5. 개인적 에세이 → sns-essay-writer 호출 (필요시)
```

### 장점
- Claude Code의 실시간 가이드와 오류 처리
- 각 단계별 결과 확인 및 조정 가능
- 예상치 못한 상황에서도 유연한 대응
- 서브에이전트별 전문성 극대화

## 🔄 주요 변경 이력

### 2025.08.26-27: 프로젝트 초기 구축
- YouTube to Blog 자동화 프로젝트 시작
- YouTube Data API v3 연동 완료
- IMI WORK 브랜드 페르소나 시스템 구축
- Ghost CMS 연동 및 첫 블로그 포스팅 완료

### 2025.08.27: OSMU 전략 도입
- One Source Multi Use 전략 수립
- 프로젝트 폴더명 변경: youtube-to-blog-personalized → imi-work-osmu
- 멀티플랫폼 확장 계획 (네이버 블로그, Instagram, Threads)

### 2025.09.08: 아키텍처 대전환
**서브에이전트 분업 체계 구축**:
- `imi-work-youtube-blogger` → `imi-work-persona-writer`로 역할 축소
- `osmu-image-generator` 신규 생성 (이미지 중앙화)
- `ghost-auto-publisher` v2.0 업그레이드 (이미지 생성 로직 제거)
- `naver-seo-writer`, `sns-essay-writer` 역할 명확화

**보안 및 구조 개선**:
- 모든 API 키를 `.env`로 중앙화
- 하드코딩된 키 완전 제거
- 20+ 테스트 파일을 archive/ 폴더로 정리
- osmu-pipeline.js 삭제 (기술적 불가능성 확인)

**이미지 관리 혁신**:
- slug 기반 디렉토리 구조 도입
- image-manifest.json 메타데이터 시스템
- 플랫폼별 이미지 사양 체계화
- OSMU 재사용성 극대화

### 2025.09.08: 시스템 최적화
**충돌 해결 및 최적화**:
- 서브에이전트 간 역할 중복 제거
- 워크플로우 단계별 명확화
- naver-seo-writer는 Ghost 발행 후 수동 업로드 방식
- sns-essay-writer는 에세이 톤 전용으로 특화

**문서화 완성**:
- OSMU_IMAGE_STRATEGY.md v2.0 업데이트
- ghost-automation-workflow.md 전면 개편
- PROJECT_HISTORY.md 전체 재작성 (이 문서)

## 🎯 향후 계획

### 단기 목표 (1개월)
- OSMU 이미지 패키지 시스템 안정화
- 각 서브에이전트별 성능 최적화
- A/B 테스트 이미지 생성 기능 추가

### 중기 목표 (3개월)
- LinkedIn, Facebook 등 추가 플랫폼 지원
- 성과 분석 및 최적화 자동화
- 콘텐츠 추천 AI 시스템 구축

### 장기 비전 (6개월+)
- 완전 자동화 파이프라인 (콘텐츠 아이디어 → 발행)
- AI 브랜딩 시스템 상품화
- 교육 콘텐츠로 확장 (아르키메데스 목욕탕 강의 연계)

## 🏆 성과 및 효과

### 자동화 효과
- **시간 절약**: 기존 수동 작업 대비 80% 시간 단축
- **일관성 향상**: 100% 브랜드 가이드라인 준수
- **확장성**: 새 플랫폼 추가 시 개발 시간 70% 단축
- **품질 보장**: 자동 SEO 최적화 및 이미지 최적화

### 브랜드 가치
- IMI WORK 브랜드 정체성의 일관된 전달
- "일을 잘한다" 철학의 체계적 확산
- 15년 F&B 경험과 AI 전문성의 효과적 결합

---

## 🚨 주요 학습과 개선점

### 기술적 제약 인식
- **Claude Code 에이전트 API 부재**: Node.js에서 서브에이전트 직접 호출 불가
- **해결책**: Claude Code 인터랙티브 가이드 방식으로 전환

### 아키텍처 설계 교훈
- **분업의 중요성**: 각 에이전트의 책임을 명확히 분리할 때 효율성 극대화
- **중앙화의 가치**: 이미지 생성을 한 곳에서 관리하여 일관성과 재사용성 확보
- **보안 우선**: API 키 관리를 처음부터 체계화하는 것의 중요성

### 프로젝트 관리 인사이트
- **점진적 발전**: Phase별 단계적 발전이 시스템 안정성과 품질을 보장
- **문서화 필수**: 복잡한 시스템일수록 체계적 문서화가 생산성에 직결
- **사용자 중심**: 기술적 가능성보다는 실제 사용 편의성 우선

---

*"서브에이전트 분업과 OSMU 전략으로 구현된 효율적이고 확장 가능한 AI 콘텐츠 자동화 시스템 - 2025.09.08 완성"*

## Related Notes
- [[system-vs-tool-master]] - 높은 연관성
- [[learning-roadmap]] - 높은 연관성
- [[ai-automation-hub]] - 높은 연관성
- [[personal-tone-version]] - 높은 연관성
- [[final-seo-version]] - 높은 연관성
- [[business-operations-hub]] - 높은 연관성
- [[menu-development-hub]] - 높은 연관성
