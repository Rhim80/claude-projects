# OSMU Ghost 자동화 워크플로우 v2.0

> 새로운 서브에이전트 아키텍처 기반의 효율적인 멀티플랫폼 콘텐츠 발행 가이드

## 🏗️ 새로운 워크플로우 개요

### 개선된 OSMU 아키텍처
```
1. 콘텐츠 작성 (imi-work-persona-writer)
   ↓
2. 이미지 패키지 생성 (osmu-image-generator)
   ↓  
3. Ghost 발행 (ghost-auto-publisher)
   ↓
4. 추가 플랫폼 확장 (naver-seo-writer, sns-essay-writer)
```

### 핵심 개선사항
- **분업 체계**: 각 서브에이전트가 전문 영역에 집중
- **이미지 중앙화**: 모든 플랫폼용 이미지를 한 번에 생성
- **재사용성**: 생성된 이미지 패키지를 여러 에이전트가 활용
- **확장성**: 새 플랫폼 추가 시 이미지 생성만 확장

## 🛠 필수 환경 설정

### API 키 설정
```bash
# .env 파일 생성 (프로젝트 루트에)
cp .env.template .env

# API 키 설정 (실제 키로 교체)
GEMINI_API_KEY=your_gemini_api_key_here
GHOST_API_URL=https://blog.imiwork.com
GHOST_ADMIN_API_KEY=your_ghost_admin_api_key_here
```

⚠️ **보안 주의**: `.env` 파일은 Git에 커밋하지 마세요! `.gitignore`에 포함되어 있습니다.

### 디렉토리 구조 확인
```bash
# OSMU 자산 관리 구조
imi-work-osmu/
├── assets/images/           # 이미지 자산 저장소
│   └── [slug]/              # 콘텐츠별 통합 관리
│       ├── ghost/           # Ghost CMS 전용 이미지
│       ├── naver/           # 네이버 블로그 전용
│       ├── instagram/       # 인스타그램 전용  
│       └── image-manifest.json  # 이미지 메타데이터
├── scripts/                 # 자동화 스크립트
└── guides/                  # 전략 및 가이드 문서
```

## 🚀 새로운 OSMU 실행 가이드

### 방법 1: 단계별 서브에이전트 실행

#### STEP 1: 콘텐츠 작성
```bash
# imi-work-persona-writer 서브에이전트 사용
/agents imi-work-persona-writer

입력 예시:
- YouTube URL: https://youtu.be/9v_mwoi9Q4Q
- 핵심 포인트: "AI 리터러시 격차에 대한 현장 경험"
- 타겟 독자: 브랜딩 전문가, 자영업자

출력:
- IMI WORK 브랜드 페르소나 기반 완성된 마크다운 콘텐츠
```

#### STEP 2: OSMU 이미지 패키지 생성
```bash
# osmu-image-generator 서브에이전트 사용  
/agents osmu-image-generator

입력:
- 콘텐츠 제목: "AI 리터러시 격차, 4개월이면 충분할까?"
- 콘텐츠 요약: "AI 활용 능력의 극단적 격차와 해결 방안"
- slug: "ai-literacy-gap"
- 타겟 플랫폼: ["ghost", "naver", "instagram"]

출력:
- imi-work-osmu/assets/images/ai-literacy-gap/ (완전한 이미지 패키지)
- image-manifest.json (메타데이터)
```

#### STEP 3: Ghost 발행
```bash
# ghost-auto-publisher 서브에이전트 사용
/agents ghost-auto-publisher

입력:
- 마크다운 콘텐츠
- slug: "ai-literacy-gap" (이미지 패키지 참조)
- YouTube URL (선택사항)

출력:
- Ghost CMS 자동 발행 (Draft 상태)
- SEO 최적화 완료
- 이미지 패키지 자동 연동
```

### 현재 권장 방법: 단계별 서브에이전트 실행

Claude Code의 인터랙티브 가이드를 통해 각 단계를 순차적으로 실행하는 것이 가장 효율적입니다:

```
1. YouTube URL 제공 → imi-work-persona-writer 호출
2. 콘텐츠 완성 → osmu-image-generator 호출  
3. 이미지 패키지 완성 → ghost-auto-publisher 호출
4. Ghost 발행 완료 → naver-seo-writer 호출 (필요시)
5. 개인적 에세이 → sns-essay-writer 호출 (필요시)
```

**장점:**
- Claude Code의 실시간 가이드와 오류 처리
- 각 단계별 결과 확인 및 조정 가능
- 예상치 못한 상황에서도 유연한 대응

## 📊 image-manifest.json 구조

### 생성된 매니페스트 예시
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
      "story": "instagram/story.png",
      "carousel": ["instagram/carousel-1.png"]
    }
  },
  "generation_metadata": {
    "total_images": 6,
    "api_calls": 6,
    "generation_time": "2025-09-08T10:05:00Z"
  }
}
```

## 🔄 서브에이전트 간 데이터 흐름

### 1. osmu-image-generator → ghost-auto-publisher
```
Input: Content metadata + platform requirements
Process: Comprehensive image generation for all platforms
Output: Structured image package with manifest

↓ (manifest.json provides image paths)

Input: Content + slug (references image package)
Process: Load images from manifest, upload to Ghost
Output: Published Ghost post with optimized images
```

### 2. 자동화된 이미지 로딩 과정
```javascript
// ghost-auto-publisher 내부 프로세스
const manifest = loadManifest(`assets/images/${slug}/image-manifest.json`);
const ghostImages = manifest.platforms.ghost;

// Feature image upload
const featureImagePath = `assets/images/${slug}/${ghostImages.feature}`;
const featureUpload = await ghostAPI.images.upload(featureImagePath);

// Content images upload (if any)
const contentUploads = await Promise.all(
  ghostImages.content.map(img => 
    ghostAPI.images.upload(`assets/images/${slug}/${img}`)
  )
);
```

## 🎯 OSMU 확장 전략

### 추가 플랫폼 발행
```bash
# 네이버 블로그 확장
/agents naver-seo-writer
# 입력: slug (이미지 패키지 참조) + 네이버 최적화 요구사항

# 인스타그램 확장  
/agents sns-essay-writer
# 입력: slug (이미지 패키지 참조) + SNS 캡션 요구사항

# LinkedIn 확장 (향후)
/agents linkedin-publisher
# 입력: slug (이미지 패키지 참조) + 전문가 네트워크 최적화
```

### 이미지 패키지 재활용
- **Ghost 발행 후**: 네이버/인스타그램용 이미지 즉시 사용 가능
- **일관성 보장**: 모든 플랫폼에서 동일한 브랜드 아이덴티티 유지
- **효율성 극대화**: 한 번의 이미지 생성으로 여러 플랫폼 대응

## 🔧 트러블슈팅

### 자주 발생하는 이슈들

#### 1. 이미지 매니페스트를 찾을 수 없음
```bash
Error: OSMU image manifest not found: imi-work-osmu/assets/images/[slug]/image-manifest.json

해결책:
1. osmu-image-generator 먼저 실행하여 이미지 패키지 생성
2. slug 이름이 정확한지 확인
3. 디렉토리 권한 확인
```

#### 2. Ghost API 연결 실패
```bash
Error: Ghost API authentication failed

해결책:
1. GHOST_ADMIN_API_KEY 확인
2. Ghost Admin API 버전 호환성 확인 (v5.0)
3. 네트워크 연결 상태 확인
```

#### 3. 이미지 업로드 실패
```bash
Error: Image upload failed - file not found

해결책:
1. 이미지 파일 경로 확인
2. 파일 형식 확인 (PNG, JPG 지원)
3. 파일 크기 제한 확인 (최대 5MB)
```

## 📈 성과 측정

### 자동화 효과 추적
- **시간 절약**: 기존 수동 작업 대비 80% 시간 단축
- **일관성 향상**: 100% 브랜드 가이드라인 준수
- **확장성**: 새 플랫폼 추가 시 개발 시간 70% 단축
- **품질 보장**: 자동 SEO 최적화 및 이미지 최적화

### 다음 단계 개선 계획
1. **A/B 테스트 자동화**: 여러 이미지 버전 자동 생성 및 테스트
2. **성과 분석 통합**: 각 플랫폼 성과 데이터 자동 수집 및 분석
3. **콘텐츠 추천**: AI 기반 다음 콘텐츠 주제 추천
4. **완전 자동화**: 콘텐츠 아이디어부터 발행까지 원클릭 자동화

---

*"서브에이전트 분업으로 구현된 효율적이고 확장 가능한 OSMU 콘텐츠 자동화 시스템"*