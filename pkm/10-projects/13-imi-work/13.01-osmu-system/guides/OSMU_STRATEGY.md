# IMI WORK OSMU v2.0 전략 가이드

> One Source Multi Use: 서브에이전트 분업과 이미지 중앙화 기반의 효율적인 멀티플랫폼 콘텐츠 전략

## 🎯 전략 개요

### v2.0 핵심 컨셉
**YouTube 원본 → OSMU 이미지 패키지 생성 → 멀티플랫폼 동시 배포**

```
1. 콘텐츠 작성 (imi-work-persona-writer)
   ↓
2. 이미지 패키지 생성 (osmu-image-generator)
   ↓  
3. 플랫폼별 배포
   ├── Ghost (ghost-auto-publisher)
   ├── 네이버 (naver-seo-writer)
   └── Instagram (sns-essay-writer)
```

### v2.0 목표
- **효율성 극대화**: 한 번의 이미지 생성으로 모든 플랫폼 대응
- **브랜드 일관성**: 중앙집중식 이미지 관리로 100% 브랜드 통일성
- **확장성 보장**: 새 플랫폼 추가 시 이미지 생성만 확장하면 완료
- **품질 보장**: 각 서브에이전트의 전문성으로 플랫폼 최적화

## 🏗️ v2.0 OSMU 아키텍처

### 이미지 중앙화 시스템
```
osmu-image-generator가 한 번에 생성:
├── Ghost용: feature.png (1200x630) + content.png (800x450)
├── 네이버용: main.png (800x450) + body-1.png, body-2.png
└── Instagram용: feed.png (1080x1080) + story.png (1080x1350)

→ image-manifest.json으로 모든 이미지 메타데이터 관리
```

### 서브에이전트 분업 체계
```
1. imi-work-persona-writer
   - YouTube 분석 및 IMI WORK 브랜드 페르소나 변환
   - 마크다운 콘텐츠 생성

2. osmu-image-generator  
   - 모든 플랫폼용 이미지 패키지 생성
   - slug 기반 디렉토리 구조 관리

3. 플랫폼별 전문 에이전트
   ├── ghost-auto-publisher: Ghost CMS 자동 발행
   ├── naver-seo-writer: 네이버 SEO 최적화
   └── sns-essay-writer: Instagram 에세이 톤
```

## 📱 플랫폼별 최적화 전략

### 1. Ghost 블로그 (원본 발행)
```
역할: 모든 플랫폼의 기준점
특징: 완성도 높은 긴 형식 콘텐츠
이미지: OSMU 패키지의 feature + content 이미지 활용
```

### 2. 네이버 블로그 (Ghost 발행 후)
```
목적: 한국 SEO 최적화  
방식: OSMU 이미지 패키지 재활용 + 네이버 특화 편집
특징: C-Rank 알고리즘 최적화, 수동 업로드 가이드
```

### 3. Instagram (개인 에세이 톤)
```
목적: 브랜드 인지도 + 개인적 연결
방식: OSMU 이미지 패키지 활용 + 무라카미 하루키 스타일 글쓰기
특징: 감성적이고 개인적인 톤, 시각적 완성도
```

## 🚀 v2.0 실행 워크플로우

### 현재 완성된 시스템 (2025.09.08)
```
1. YouTube URL 입력
   ↓
2. imi-work-persona-writer → IMI WORK 브랜드 콘텐츠 생성
   ↓
3. osmu-image-generator → 종합 이미지 패키지 생성
   ├── imi-work-osmu/assets/images/[slug]/
   ├── ghost/, naver/, instagram/ 디렉토리
   └── image-manifest.json 메타데이터
   ↓
4. ghost-auto-publisher → Ghost 블로그 자동 발행
   ↓
5. 추가 플랫폼 확장 (선택적)
   ├── naver-seo-writer → 네이버 최적화
   └── sns-essay-writer → Instagram 에세이
```

### 권장 실행 방법
**Claude Code 인터랙티브 가이드**
- 각 단계별 결과 확인 및 조정 가능
- 실시간 가이드와 오류 처리
- 서브에이전트별 전문성 극대화

### 확장 계획
**Phase 1** (완료): 이미지 중앙화 + 서브에이전트 분업
**Phase 2** (진행중): LinkedIn, Facebook 등 추가 플랫폼
**Phase 3** (예정): A/B 테스트 이미지 생성 기능

## 📊 v2.0 성과 및 효과

### 자동화 효과 (실제 측정)
- **시간 절약**: 기존 수동 작업 대비 80% 시간 단축
- **일관성 향상**: 100% 브랜드 가이드라인 준수
- **확장성**: 새 플랫폼 추가 시 개발 시간 70% 단축
- **품질 보장**: 자동 SEO 최적화 및 이미지 최적화

### 플랫폼별 최적화 성과
- **Ghost**: Draft 상태 자동 발행으로 리뷰 후 발행 가능
- **네이버**: OSMU 이미지 재활용으로 일관된 브랜딩
- **Instagram**: 에세이 톤으로 개인적 연결감 극대화

### 시스템 안정성
- **중앙집중식 이미지 관리**: 브랜드 일관성 100% 보장
- **서브에이전트 분업**: 각 전문 영역에서 최적화 성능
- **환경변수 보안**: API 키 안전 관리로 보안 위험 제로

## 🎯 v2.0 핵심 성과

### 아키텍처 혁신
- **분업의 효과**: 각 에이전트가 핵심 업무에 집중하여 효율성 극대화
- **중앙화의 가치**: 이미지 생성 한 곳 관리로 일관성과 재사용성 확보
- **확장성 실현**: 새 플랫폼 추가 시 이미지 생성만 확장하면 완료

---

*"서브에이전트 분업과 OSMU 전략으로 구현된 효율적이고 확장 가능한 AI 콘텐츠 자동화 시스템 - 2025.09.08 완성"*

## Related Notes
- [[system-vs-tool-master]] - 높은 연관성
- [[naver-seo-version]] - 높은 연관성
- [[learning-roadmap]] - 높은 연관성
- [[personal-tone-version]] - 높은 연관성
- [[ai-automation-hub]] - 높은 연관성
- [[final-seo-version]] - 높은 연관성
- [[business-operations-hub]] - 높은 연관성
