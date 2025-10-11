# 성과 추적 데이터베이스 스키마

## 📈 성과 지표 데이터베이스

### 기본 정보
- **날짜** (Date): 측정 날짜
- **콘텐츠** (Relation): 콘텐츠 관리 DB와 연결
- **측정 주기** (Select):
  - 📅 일간
  - 📆 주간  
  - 📊 월간
- **플랫폼** (Select):
  - 👻 Ghost
  - 🟢 네이버
  - 📷 Instagram
  - 🧵 Threads

### Ghost 블로그 지표
- **Ghost 방문자수** (Number): 일별 방문자 수
- **Ghost 페이지뷰** (Number): 일별 페이지뷰
- **Ghost 체류시간** (Number): 평균 체류시간(초)
- **Ghost 이탈률** (Number): 이탈률(%)
- **Ghost 유입경로** (Multi-select):
  - 직접 접속
  - 검색 엔진
  - 소셜 미디어
  - 기타

### 네이버 블로그 지표  
- **네이버 방문자수** (Number): 일별 방문자 수
- **네이버 검색 노출** (Number): 검색 노출 횟수
- **네이버 검색 클릭** (Number): 검색 클릭 수
- **네이버 이웃수** (Number): 누적 이웃 수
- **주요 키워드 순위** (Text): 상위 키워드들의 검색 순위

### Instagram 지표
- **Instagram 도달률** (Number): 포스트 도달 사용자 수  
- **Instagram 노출수** (Number): 총 노출 횟수
- **Instagram 좋아요** (Number): 좋아요 수
- **Instagram 댓글** (Number): 댓글 수
- **Instagram 저장** (Number): 저장 수
- **Instagram 공유** (Number): 공유 수
- **참여율** (Formula): (좋아요+댓글+저장) / 도달률 * 100
- **프로필 방문** (Number): 프로필 방문 수

### Threads 지표
- **Threads 조회수** (Number): 스레드 조회 수
- **Threads 좋아요** (Number): 좋아요 수  
- **Threads 리스레드** (Number): 리스레드 수
- **Threads 댓글** (Number): 댓글 수
- **Threads 참여율** (Formula): (좋아요+리스레드+댓글) / 조회수 * 100

### 통합 지표
- **총 도달률** (Formula): 모든 플랫폼 도달률 합계
- **총 참여수** (Formula): 모든 플랫폼 참여 액션 합계  
- **플랫폼별 기여도** (Formula): 각 플랫폼이 총 성과에서 차지하는 비율
- **ROI** (Number): 투입 시간 대비 성과 지수
- **브랜드 언급** (Number): 온라인상 브랜드 언급 횟수

### 메모 및 분석
- **주요 인사이트** (Text): 이번 주/월의 주요 발견 사항
- **개선 계획** (Text): 다음 주기 개선 사항
- **외부 요인** (Text): 성과에 영향을 준 외부 요인들

## 📊 대시보드 뷰 설정

### 1. 일간 뷰
- 필터: 측정 주기 = "일간"
- 정렬: 날짜 (최신순)
- 그룹화: 플랫폼별

### 2. 주간 요약 뷰  
- 필터: 측정 주기 = "주간"
- 정렬: 날짜 (최신순)
- 표시: 핵심 KPI만 선별

### 3. 월간 리포트 뷰
- 필터: 측정 주기 = "월간"  
- 정렬: 날짜 (최신순)
- 표시: 전체 지표 + 분석 메모

### 4. 플랫폼별 뷰
- 그룹화: 플랫폼별
- 차트: 성장 추세 그래프
- 비교: 플랫폼 간 성과 비교

## 📋 샘플 데이터 구조

### 주간 리포트 예시 (2025-08-27)
- **날짜**: 2025-08-27
- **콘텐츠**: "연결하는 사람이 되면 일이 잘 풀린다"
- **측정 주기**: 주간
- **Ghost 방문자수**: [집계 예정]
- **Instagram 도달률**: [집계 예정]  
- **주요 인사이트**: "첫 번째 콘텐츠로 기준점 설정"
- **개선 계획**: "네이버 블로그 확장 및 Instagram 캐러셀 제작"

---

*이 스키마를 활용하여 체계적인 성과 추적 시스템을 구축하세요.*

## Related Notes

- [[20-operations/22-automation/n8n-workflows-backup/n8n-project/workflows/youtube-rss-bot/youtube-rss-bot-분석]] - content_creation 관련; '기본 정보' 개념 공유
- [[30-knowledge/36-ai-tools/human-sense-importance]] - content_creation 관련; '날짜' 개념 공유
- [[20-operations/22-automation/n8n-workflows-backup/n8n-project/workflows/payroll-systems/payroll-b-분석]] - content_creation 관련; '기본 정보' 개념 공유
- [[CLAUDE]] - content_creation 관련; '기본 정보' 개념 공유
- [[20-operations/22-automation/n8n-workflows-backup/n8n-project/CLAUDE]] - content_creation 관련; 10-projects ↔ 20-operations 연결
