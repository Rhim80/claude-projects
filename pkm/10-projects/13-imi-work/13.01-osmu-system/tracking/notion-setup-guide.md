# Notion 워크스페이스 설정 가이드

## 🎯 전체 구조

```
IMI WORK OSMU 워크스페이스
├── 📋 OSMU 대시보드 (메인 페이지)
├── 📝 콘텐츠 관리 (데이터베이스)
├── 📊 성과 추적 (데이터베이스)
├── 📅 콘텐츠 캘린더 (데이터베이스)
└── 📁 리소스
    ├── 🤖 에이전트 가이드들
    ├── 📋 템플릿 모음
    └── 🔗 자주 사용하는 링크
```

## 🚀 설정 순서

### 1단계: 워크스페이스 생성
1. Notion에서 새 워크스페이스 생성
2. 이름: "IMI WORK OSMU"
3. 아이콘: 🎯 또는 적절한 이모지

### 2단계: 메인 대시보드 페이지 생성
1. 새 페이지 생성: "OSMU 대시보드"
2. `/tracking/notion-dashboard-template.md` 내용 복사 붙여넣기
3. 필요한 부분을 Notion 블록으로 변환:
   - 체크박스 → Notion 체크박스
   - 상태 표시 → Notion 상태 속성
   - 링크 → Notion 링크 블록

### 3단계: 콘텐츠 관리 데이터베이스 생성
1. 새 데이터베이스 생성: "콘텐츠 관리"
2. `/tracking/notion-content-db-schema.md` 참고하여 속성 설정:
   ```
   - 제목 (Title)
   - YouTube 소스 (URL)
   - 제작일 (Date)  
   - 상태 (Select): 🔵기획중, 🟡작업중, 🟢완성, 🔴보류
   - Ghost 블로그 (Select): ✅완성, 🔄작업중, ⏳예정, ❌해당없음
   - 네이버 블로그 (Select): ✅발행완료, 🔄작업중, ⏳예정, ❌해당없음
   - Instagram 캐러셀 (Select): ✅발행완료, 🔄작업중, ⏳예정, ❌해당없음
   - Threads 스레드 (Select): ✅발행완료, 🔄작업중, ⏳예정, ❌해당없음
   - 키워드 (Multi-select)
   - 카테고리 (Select)
   ```

3. 첫 번째 레코드 입력:
   - 제목: "연결하는 사람이 되면 일이 잘 풀린다"
   - YouTube 소스: https://www.youtube.com/watch?v=qImgGtnNbx0
   - 제작일: 2025-08-27
   - 상태: 🟢 완성
   - Ghost 블로그: ✅ 완성
   - 나머지: ⏳ 예정

### 4단계: 성과 추적 데이터베이스 생성
1. 새 데이터베이스 생성: "성과 추적"
2. `/tracking/notion-analytics-db-schema.md` 참고하여 속성 설정
3. 뷰 설정:
   - 일간 뷰: 측정 주기 = "일간" 필터
   - 주간 뷰: 측정 주기 = "주간" 필터  
   - 월간 뷰: 측정 주기 = "월간" 필터
   - 플랫폼별 뷰: 플랫폼별 그룹화

### 5단계: 콘텐츠 캘린더 데이터베이스 생성
1. 새 데이터베이스 생성: "콘텐츠 캘린더"
2. `/tracking/notion-calendar-template.md` 참고하여 속성 설정
3. 캘린더 뷰 추가:
   - 날짜 속성을 기준으로 캘린더 뷰 생성
   - 색상 구분: 타입별 또는 플랫폼별

### 6단계: 데이터베이스 간 관계 설정
1. 성과 추적 DB → 콘텐츠 관리 DB: 릴레이션 연결
2. 콘텐츠 캘린더 → 콘텐츠 관리 DB: 릴레이션 연결
3. 각 관계에 대해 역방향 속성도 설정

### 7단계: 대시보드 페이지에 DB 뷰 삽입
1. OSMU 대시보드 페이지로 이동
2. 각 데이터베이스의 뷰를 페이지에 임베드:
   - 콘텐츠 관리: 최근 작업 상태 뷰
   - 성과 추적: 주간 성과 요약 뷰
   - 콘텐츠 캘린더: 이번 주 일정 뷰

## 🎨 템플릿 설정

### 콘텐츠 관리용 템플릿
```
제목: [YouTube 제목 기반으로 수정]
YouTube 소스: [YouTube URL]
제작일: [오늘 날짜]
상태: 🔵 기획중
Ghost 블로그: ⏳ 예정
네이버 블로그: ⏳ 예정
Instagram 캐러셀: ⏳ 예정  
Threads 스레드: ⏳ 예정
카테고리: [적절한 카테고리 선택]
```

### 성과 추적용 주간 템플릿
```
날짜: [매주 일요일]
측정 주기: 📆 주간
주요 인사이트: [이번 주 주요 발견사항]
개선 계획: [다음 주 개선사항]
```

## 🔄 일일 사용 워크플로우

### 아침 루틴 (10분)
1. OSMU 대시보드 확인
2. 오늘 일정 캘린더에서 확인
3. 어제 성과 지표 간단 체크

### 작업 중 (수시)
1. 콘텐츠 작업 상태 실시간 업데이트
2. 완료된 작업은 즉시 상태 변경

### 저녁 루틴 (15분)  
1. 오늘 완료한 작업 체크
2. 내일 일정 확인 및 조정
3. 간단한 성과 메모 작성

### 주말 루틴 (30분)
1. 주간 성과 데이터 입력
2. 다음 주 캘린더 계획 수립
3. 대시보드 전체 현황 점검

## 🎯 활용 팁

### 효율적인 태그 활용
- **urgent**: 긴급한 작업
- **review**: 검토 필요
- **idea**: 아이디어 메모
- **complete**: 완료된 작업

### 자동화 활용
- Zapier/Make.com과 연동하여 일부 데이터 자동 수집
- n8n에서 Notion API로 데이터 자동 업데이트

### 협업 준비
- 각 DB에 적절한 권한 설정
- 외부 협업자를 위한 제한된 뷰 생성

---

*이 가이드를 따라서 체계적인 OSMU 관리 시스템을 구축하세요!*

## Related Notes

- [[40-personal/41-daily/2025-10-09]] - ai_automation 관련; 10-projects ↔ 40-personal 연결
- [[20-operations/22-automation/n8n-workflows-backup/n8n-project/workflows/gmail-classifier/gmail-classifier-분석]] - ai_automation 관련; 10-projects ↔ 20-operations 연결
- [[20-operations/22-automation/n8n-workflows-backup/n8n-project/workflows/payroll-systems/payroll-a-분석]] - ai_automation 관련; 10-projects ↔ 20-operations 연결
- [[40-personal/44-reflections/learning/git-repository-study-plan]] - ai_automation 관련; 10-projects ↔ 40-personal 연결
- [[00-inbox/2025-08-30]] - ai_automation 관련; 10-projects ↔ 00-inbox 연결
