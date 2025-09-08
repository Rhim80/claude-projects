# OSMU 이미지 전략 가이드 v2.0

> 개선된 OSMU (One Source Multi Use) 이미지 전략: 서브에이전트 분업과 slug 기반 체계적 관리

## 🏗️ 새로운 아키텍처 개요

### 기존 문제점
- Ghost 에이전트가 이미지 생성까지 담당하여 역할 과중
- 플랫폼별 다양한 이미지 요구사항에 대한 유연성 부족
- 이미지 재사용 및 관리의 비체계적 구조

### 개선된 솔루션
```
1. 콘텐츠 작성 (imi-work-persona-writer)
   ↓
2. 이미지 패키지 생성 (osmu-image-generator) 
   ↓
3. 플랫폼별 발행
   ├── Ghost (ghost-auto-publisher)
   ├── Naver (naver-seo-writer)
   └── Instagram (sns-essay-writer)
```

## 📁 새로운 이미지 저장 구조

### Slug 기반 체계적 구조
```
imi-work-osmu/assets/images/
└── [slug]/                  # 콘텐츠별 통합 관리
    ├── ghost/               # Ghost 블로그 전용
    │   ├── feature.png      # 피처 이미지 (1200x630)
    │   ├── content-1.png    # 본문 이미지 (800x450)
    │   └── content-2.png    # 본문 이미지 (800x450)
    ├── naver/               # 네이버 블로그 전용
    │   ├── main.png         # 대표 이미지 (800x450)
    │   ├── body-1.png       # 본문 이미지 (800x450)
    │   ├── body-2.png       # 본문 이미지 (800x450)
    │   └── body-3.png       # 본문 이미지 (800x450)
    ├── instagram/           # 인스타그램 전용
    │   ├── feed.png         # 피드 이미지 (1080x1080)
    │   ├── story.png        # 스토리 이미지 (1080x1350)
    │   ├── carousel-1.png   # 캐러셀 1 (1080x1080)
    │   ├── carousel-2.png   # 캐러셀 2 (1080x1080)
    │   └── carousel-3.png   # 캐러셀 3 (1080x1080)
    └── image-manifest.json  # 이미지 메타데이터
```

## 🎨 이미지 사양별 용도

### 1. Feature Images (1200x630)
- **용도**: Ghost 블로그 피처 이미지, 네이버 블로그 대표 이미지
- **사양**: 1200x630px, PNG/JPG, 최대 500KB
- **특징**: 
  - IMI WORK 브랜드 아이덴티티 반영
  - 글 제목의 핵심 키워드 포함
  - 미니멀하고 전문적인 디자인
- **생성 프롬프트**: Gemini 2.5 Flash Image API 활용

### 2. Blog Images (800x450)  
- **용도**: 네이버 블로그 본문 삽입, Ghost 블로그 본문 이미지
- **사양**: 800x450px, PNG/JPG, 최대 300KB
- **특징**:
  - 글 내용과 직접 연관된 시각적 설명
  - 인포그래픽, 도표, 개념도 등
  - 네이버 블로그 가독성 최적화

### 3. Social Images (1080x1080, 1080x1350)
- **용도**: 인스타그램, 페이스북, 쓰레드 등 SNS 플랫폼
- **사양**: 
  - 정사각형: 1080x1080px (인스타그램 피드)
  - 세로형: 1080x1350px (인스타그램 스토리)
- **특징**:
  - 모바일 최적화 텍스트 크기
  - 강렬한 컬러와 임팩트
  - 브랜드 로고/워터마크 포함

## 🤖 OSMU 서브에이전트 워크플로우

### 1. osmu-image-generator 서브에이전트
**역할**: 모든 플랫폼용 이미지 세트를 중앙 집중식으로 생성
- **입력**: 콘텐츠 제목, 요약, 핵심 메시지, 타겟 플랫폼 리스트
- **처리**: Gemini API를 활용한 플랫폼별 최적화 이미지 생성
- **출력**: slug 기반 구조화된 이미지 패키지 + image-manifest.json

### 2. ghost-auto-publisher 서브에이전트 (업그레이드됨)
**역할**: 이미지 패키지를 활용한 Ghost CMS 발행
- **입력**: 콘텐츠 + slug (이미지 패키지 참조)
- **처리**: manifest 기반 이미지 로딩 및 Ghost API 업로드
- **출력**: 완성된 Ghost 블로그 포스트

### 3. 기타 발행 에이전트들
- **naver-seo-writer**: 네이버용 이미지 패키지 활용
- **sns-essay-writer**: 인스타그램용 이미지 패키지 활용

## 📋 image-manifest.json 스키마

```json
{
  "slug": "content-slug",
  "title": "콘텐츠 제목",
  "created_at": "2025-09-08T10:00:00Z",
  "generator_version": "1.0",
  "content_summary": "콘텐츠 요약",
  "platforms": {
    "ghost": {
      "feature": "ghost/feature.png",
      "content": ["ghost/content-1.png", "ghost/content-2.png"]
    },
    "naver": {
      "main": "naver/main.png",
      "body": ["naver/body-1.png", "naver/body-2.png"]
    },
    "instagram": {
      "feed": "instagram/feed.png",
      "story": "instagram/story.png",
      "carousel": ["instagram/carousel-1.png"]
    }
  },
  "generation_metadata": {
    "total_images": 8,
    "prompts_used": {...},
    "generation_time": "2025-09-08T10:05:00Z",
    "api_calls": 8
  }
}
```

## 🎨 개선된 Gemini 프롬프트 템플릿

#### Feature Image 생성
```
Create a professional feature image for a blog post about "[TOPIC]".

Style Requirements:
- Clean, modern, minimalist design
- Professional color scheme (navy blue #1e3a8a, white, light gray)
- IMI WORK brand identity
- Korean and English text combination
- 1200x630 pixels aspect ratio

Content:
- Main title: "[BLOG_TITLE]" (Korean)
- Subtitle: "SENSE & AI Blog" 
- Visual metaphor related to: [CORE_CONCEPT]
- Include subtle geometric elements or abstract shapes
- No stock photos or cliché business imagery

Brand Elements:
- IMI WORK logo/text in bottom right corner
- Consistent with professional consulting brand
- Target audience: Business professionals and entrepreneurs
```

#### Social Media Image 생성
```
Create an Instagram-optimized image for "[TOPIC]".

Style Requirements:
- Bold, eye-catching design optimized for mobile
- Square format (1080x1080)
- High contrast colors for small screen visibility
- Modern typography with clear hierarchy

Content:
- Hook text: "[INSTAGRAM_HOOK]" (Korean)
- Key insight: "[MAIN_TAKEAWAY]"
- Brand identifier: "@imi_work"
- Relevant emoji or icon
- Call-to-action element

Visual Style:
- Vibrant but professional color palette
- Clean background with subtle texture
- Easy to read on mobile devices
- Shareable and engaging aesthetic
```

## 📋 OSMU 이미지 체크리스트

### Ghost 블로그 발행 시
- [ ] Feature image 생성 (1200x630)
- [ ] `assets/images/feature-images/`에 저장
- [ ] Ghost CMS 업로드 및 설정
- [ ] 파일명 규칙: `[slug]-feature.png`

### 네이버 블로그 OSMU 시
- [ ] Feature image를 대표 이미지로 활용
- [ ] 필요시 본문용 추가 이미지 생성 (800x450)
- [ ] 네이버 에디터 최적화 확인
- [ ] 이미지 alt 텍스트 한글 설정

### 인스타그램 OSMU 시  
- [ ] 정사각형 이미지 생성 (1080x1080)
- [ ] 핵심 메시지를 시각적으로 강조
- [ ] 해시태그 전략과 연계된 디자인
- [ ] 스토리용 세로 이미지도 고려 (1080x1350)

## 🚀 새로운 OSMU 파이프라인

### OSMU Pipeline Orchestrator
```javascript
// imi-work-osmu/scripts/osmu-pipeline.js
const pipeline = new OSMUPipeline();

const jobConfig = {
  slug: 'ai-literacy-gap',
  title: 'AI 리터러시 격차',
  summary: '콘텐츠 요약',
  platforms: ['ghost', 'naver', 'instagram']
};

// 전체 파이프라인 실행
await pipeline.execute(jobConfig);
```

### 단계별 실행 과정
1. **이미지 패키지 생성**: osmu-image-generator 호출
2. **Ghost 발행**: ghost-auto-publisher 호출 (이미지 패키지 사용)
3. **네이버 최적화**: naver-seo-writer 호출 (이미지 패키지 사용)
4. **SNS 준비**: sns-essay-writer 호출 (이미지 패키지 사용)

### 서브에이전트 분업의 장점
- **명확한 책임 분리**: 각 에이전트가 핵심 업무에 집중
- **확장성**: 새 플랫폼 추가 시 이미지 생성만 확장
- **재사용성**: 생성된 이미지 패키지를 여러 에이전트가 공유
- **일관성**: 중앙 집중식 이미지 생성으로 브랜드 일관성 보장

## 📊 이미지 성과 측정

### 추적할 메트릭
- **브랜드 일관성**: 시각적 아이덴티티 점수
- **플랫폼별 성과**: 각 플랫폼에서의 이미지 반응도
- **OSMU 효율성**: 하나의 이미지로 여러 플랫폼 활용도
- **생성 시간**: 자동화를 통한 시간 절약 효과

### 최적화 포인트
- **A/B 테스트**: 다양한 이미지 스타일 실험
- **플랫폼 맞춤화**: 각 플랫폼 특성에 맞는 최적화
- **SEO 효과**: 이미지가 검색 노출에 미치는 영향
- **브랜드 인지도**: 일관된 이미지 사용의 브랜딩 효과

## 🎯 실행 가이드

### 새로운 콘텐츠 발행 워크플로우
```bash
# 1. 콘텐츠 작성
/agents imi-work-persona-writer

# 2. 이미지 패키지 생성  
/agents osmu-image-generator

# 3. Ghost 발행
/agents ghost-auto-publisher

# 4. 추가 플랫폼 발행
/agents naver-seo-writer
/agents sns-essay-writer
```

### 또는 통합 파이프라인 사용
```bash
cd imi-work-osmu/scripts
node osmu-pipeline.js
```

## 📈 마이그레이션 로드맵

### Phase 1: 구조 개선 (완료)
- [x] osmu-image-generator 서브에이전트 생성
- [x] ghost-auto-publisher 이미지 생성 로직 분리
- [x] slug 기반 디렉토리 구조 구축
- [x] image-manifest.json 스키마 정의

### Phase 2: 파이프라인 구축 (진행 중)
- [x] OSMU Pipeline Orchestrator 구현
- [ ] 서브에이전트 간 통합 테스트
- [ ] 자동화 스크립트 디버깅 및 최적화

### Phase 3: 확장 및 최적화 (예정)
- [ ] 추가 플랫폼 지원 (LinkedIn, Facebook 등)
- [ ] A/B 테스트 이미지 생성 기능
- [ ] 성과 분석 및 최적화 자동화

---

*"서브에이전트 분업과 체계적 관리로 OSMU 효율성을 극대화하는 새로운 워크플로우"*