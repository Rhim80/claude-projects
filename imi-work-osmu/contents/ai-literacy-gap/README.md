# AI 리터러시 격차 - Ghost CMS 최적화 패키지

## 📋 개요

원본 에세이 "그 사이, 우리는 다른 세상에 살게 되었다"를 Ghost CMS에 최적화한 완전한 패키지입니다.

### 🎯 최적화 포인트

#### SEO 최적화
- **메타 제목**: 60자 이내, 주요 키워드 포함
- **메타 설명**: 150자 이내, 클릭 유도 문구
- **URL 슬러그**: `/ai-literacy-gap-different-worlds`
- **구조화된 데이터**: JSON-LD 스키마 마크업
- **키워드 밀도**: 1-2% 자연스러운 분포

#### 콘텐츠 구조화
- **제목 계층**: H1 → H2 → H3 적절한 구조
- **읽기 쉬운 단락**: 3-4줄 내외로 분할
- **시각적 요소**: 인용구, 강조 박스, 케이스 스터디
- **내부 링크**: IMI WORK 관련 콘텐츠 연결
- **CTA**: 독자 참여 유도

#### 기술적 최적화
- **Ghost 5.0 호환**: 최신 Ghost API 지원
- **반응형 디자인**: 모바일 최적화
- **다크 모드**: 자동 색상 조정
- **구조화된 데이터**: 검색 엔진 최적화

## 📁 파일 구조

```
/ai-literacy-gap/
├── essay.md                 # 원본 에세이
├── instagram.md             # 인스타그램용 짧은 버전
├── ghost-optimized.json     # Ghost 최적화 데이터
├── naver-optimized.md       # 네이버 블로그 SEO 최적화 버전
├── naver-metadata.json      # 네이버 SEO 메타데이터
├── ghost-styles.css         # Ghost 전용 CSS 스타일
└── README.md               # 이 파일
```

## 🚀 사용 방법

### 1. 환경 설정

```bash
# Ghost Admin API 패키지 설치
npm install @tryghost/admin-api

# 환경 변수 설정
export GHOST_ADMIN_API_KEY="your_ghost_admin_api_key"
```

### 2. 포스트 업로드

```bash
# 새 포스트 생성
node upload-to-ghost.js upload

# 기존 포스트 업데이트
node upload-to-ghost.js update <post-id>
```

### 3. CSS 스타일 적용

`ghost-styles.css` 파일의 내용을 Ghost 관리자 → Code Injection → Site Footer에 추가:

```html
<style>
/* ghost-styles.css 내용을 여기에 복사 */
</style>
```

## 🎨 스타일 컴포넌트

### 주요 CSS 클래스
- `.gh-post-intro`: 포스트 소개 섹션
- `.highlight-text`: 중요 문장 강조
- `.case-study-box`: 실무 사례 박스
- `.action-call`: 독자 행동 유도 섹션
- `.author-note`: 작가 노트 스타일
- `.related-links`: 관련 링크 섹션

### 반응형 지원
- 모바일 최적화 (768px 이하)
- 태블릿 지원
- 다크 모드 자동 적용

## 📊 SEO 최적화 세부사항

### 메타데이터
```json
{
  "meta_title": "AI 리터러시 격차로 벌어지는 새로운 계층 구조 | IMI WORK",
  "meta_description": "같은 시대를 살지만 AI 활용 능력에 따라 전혀 다른 세상을 경험하는 사람들. 15년차 카페 사장이 Claude Code와 n8n으로 경험한 디지털 전환의 현실.",
  "keywords": "AI 리터러시, 비즈니스 자동화, Claude Code, n8n, 소상공인, 디지털 전환"
}
```

### 구조화된 데이터
- **@type**: Article
- **author**: 이미커피 대표 (hovoo)
- **publisher**: IMI WORK - SENSE & AI
- **mainEntityOfPage**: 블로그 포스트 URL
- **about**: AI 리터러시, 비즈니스 자동화

### 키워드 배치
- **주요 키워드**: AI 리터러시 격차 (제목, H2, 본문 자연스럽게 배치)
- **보조 키워드**: Claude Code, n8n, 비즈니스 자동화
- **브랜드 키워드**: IMI WORK, SENSE & AI

## 🔗 내부 링크 전략

### 계획된 내부 링크
- GPTers 스터디 관련 포스트
- Claude Code 자동화 가이드
- n8n 워크플로우 사례
- AI 리터러시 태그 페이지

### 외부 링크
- YouTube 영상 임베드 (노정석님 콘텐츠)
- 관련 도구 공식 사이트

## 📈 성과 측정 지표

### 추적할 KPI
- **검색 순위**: "AI 리터러시", "비즈니스 자동화" 등
- **트래픽**: 유입 경로별 방문자 수
- **참여도**: 체류 시간, 스크롤 깊이
- **전환**: 관련 서비스 문의, 스터디 신청

### Google Search Console
- 클릭률 (CTR) 모니터링
- 노출수 대비 클릭 수
- 평균 검색 순위 변화

## 🎯 IMI WORK 브랜딩 통합

### 브랜드 메시징
- **핵심 메시지**: "오프라인 비즈니스 × AI 융합"
- **차별점**: 15년 F&B 경험 + AI 전문성
- **신뢰성**: 실제 운영 사례 기반

### 콘텐츠 전략
- **OSMU**: One Source Multi Use 활용
- **일관성**: SENSE & AI 블로그 철학 반영
- **실용성**: 즉시 적용 가능한 인사이트 제공

## 🔧 추가 최적화 가능사항

### OSMU v2.0 완성 현황 ✅
- **Ghost 블로그**: 완성된 HTML 버전 포스팅 완료
- **네이버 블로그**: SEO 최적화된 2,847자 콘텐츠 완성
- **인스타그램**: 피드/스토리용 콘텐츠 및 이미지 완성
- **이미지 패키지**: 7개 플랫폼별 최적화 이미지 생성

### 향후 개선점
- **이미지 최적화**: WebP 포맷, 압축 최적화
- **페이지 속도**: Core Web Vitals 개선
- **AMP 지원**: 모바일 성능 향상
- **다국어**: 영어 번역본 제작

### A/B 테스트 계획
- 제목 변형 테스트
- CTA 위치 및 문구 테스트
- 이미지 vs 텍스트 비중 테스트

---

## 📞 지원 및 문의

**IMI WORK** - SENSE & AI  
Blog: https://blog.imiwork.com  
Contact: hovoo@imiwork.com

> *"AI를 단순한 도구가 아닌 비즈니스 파트너로 활용하여, 오프라인 경험과 온라인 효율성을 결합한 새로운 가치를 창출한다."*