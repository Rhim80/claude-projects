# IMI WORK OSMU Notion 워크스페이스 자동 설정

> Claude Code로 IMI WORK OSMU 전략 실행을 위한 통합 Notion 워크스페이스를 자동으로 구축합니다.

## 🎯 생성되는 워크스페이스 구조

```
IMI WORK OSMU 워크스페이스
├── 🎯 OSMU 대시보드 (메인 페이지)
│   ├── 📊 전체 현황
│   ├── 🔥 최근 성과 하이라이트  
│   ├── 📝 콘텐츠 현황
│   ├── 🛠 이번 주 작업 계획
│   └── 🔧 도구 및 링크
├── 📝 콘텐츠 관리 (데이터베이스)
│   ├── YouTube → Ghost → 네이버/Instagram/Threads 진행상황 추적
│   ├── 키워드 및 카테고리 관리
│   └── 플랫폼별 발행 상태 관리
├── 📊 성과 추적 (데이터베이스)
│   ├── 플랫폼별 일/주/월간 성과 데이터
│   ├── 방문자, 페이지뷰, 도달률, 참여율 추적
│   └── 인사이트 및 개선계획 기록
└── 📅 콘텐츠 캘린더 (데이터베이스)
    ├── 주간/월간 콘텐츠 제작 일정
    ├── 플랫폼별 포스팅 일정  
    └── 우선순위 및 상태 관리
```

## 🚀 자동 설정 방법

### 1단계: Notion Integration 생성
1. https://www.notion.so/my-integrations 접속
2. **New integration** 클릭
3. **Name**: "IMI WORK OSMU"
4. **Associated workspace** 선택
5. **Submit** → **Internal Integration Token** 복사

### 2단계: 워크스페이스 페이지 준비  
1. Notion에서 새 페이지 생성 (워크스페이스 루트)
2. 페이지명: "IMI WORK OSMU" 또는 원하는 이름
3. 페이지 URL에서 ID 추출:
   ```
   https://www.notion.so/workspace/25cd0f53623d8078b7bccc15d606ede0
                                   ↑ 이 부분이 페이지 ID
   ```
4. 페이지에서 **Share** → **Invite** → IMI WORK OSMU Integration 추가

### 3단계: 환경 설정
```bash
# 프로젝트 디렉토리로 이동
cd /Users/rhim/Projects/imi-work-osmu

# Python 패키지 설치
pip install -r requirements.txt

# 환경변수 파일 생성
cp .env.template .env

# .env 파일 수정 (실제 값 입력)
# NOTION_TOKEN=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
# NOTION_WORKSPACE_PAGE_ID=25cd0f53623d8078b7bccc15d606ede0
```

### 4단계: 자동 워크스페이스 생성
```bash
# 스크립트 실행
python notion_workspace_setup.py

# 실행 결과 예시:
# 🚀 IMI WORK OSMU Notion 워크스페이스 설정을 시작합니다...
# ✅ 대시보드 페이지 생성 완료: https://notion.so/...
# ✅ 콘텐츠 관리 DB 생성 완료: https://notion.so/...
# ✅ 성과 추적 DB 생성 완료: https://notion.so/...
# ✅ 콘텐츠 캘린더 DB 생성 완료: https://notion.so/...
# 🎉 IMI WORK OSMU Notion 워크스페이스 설정이 완료되었습니다!
```

## 🎨 생성되는 콘텐츠

### 콘텐츠 관리 DB 샘플 데이터
- **제목**: "연결하는 사람이 되면 일이 잘 풀린다"  
- **YouTube 소스**: https://www.youtube.com/watch?v=qImgGtnNbx0
- **상태**: 🟢 완성
- **Ghost 블로그**: ✅ 완성
- **나머지 플랫폼**: ⏳ 예정

### 콘텐츠 캘린더 주간 일정
- **월요일**: 새 YouTube 영상 발굴
- **화요일**: Instagram 캐러셀 제작
- **수요일**: Threads 스레드 기획
- **목요일**: 플랫폼별 포스팅 실행
- **금요일**: 주간 성과 분석 및 리뷰

## 🔧 생성 후 추가 설정

### 데이터베이스 뷰 커스터마이징
1. **콘텐츠 관리**: 상태별, 플랫폼별 필터 뷰 추가
2. **성과 추적**: 일간/주간/월간 뷰 분리
3. **캘린더**: 플랫폼별 색상 구분, 우선순위별 정렬

### 대시보드 페이지 임베딩
생성된 대시보드 페이지에 각 데이터베이스의 요약 뷰를 삽입:
1. `/database` 입력 → 생성된 DB 선택
2. **Create linked database** 선택
3. 적절한 필터와 정렬 설정

## 📱 일일 워크플로우

### 아침 루틴 (5분)
1. OSMU 대시보드 확인
2. 오늘 캘린더 일정 체크
3. 어제 완료 작업 상태 업데이트

### 작업 중 (수시)
1. 콘텐츠 제작 진행상황 실시간 업데이트
2. 완료된 작업 즉시 상태 변경

### 주말 루틴 (20분)
1. 주간 성과 데이터 입력
2. 다음 주 캘린더 계획
3. 대시보드 전체 리뷰

## 🤖 향후 자동화 연동

이 Notion 워크스페이스는 다음 자동화 시스템과 연동 예정:

### Claude Code 에이전트 연동
- **imi-work-youtube-blogger**: 콘텐츠 생성 시 자동 DB 업데이트
- **naver-seo-writer**: 네이버 버전 완성 시 상태 변경
- **sns-essay-writer**: SNS 콘텐츠 생성 시 캘린더 업데이트

### API 기반 자동화
- **Ghost API**: 블로그 발행 시 자동 상태 업데이트
- **Analytics API**: 성과 데이터 자동 수집 및 입력
- **Telegram Bot**: 작업 완료 알림

## 📊 설정 파일

생성 완료 후 `notion_workspace_config.json` 파일이 생성됩니다:

```json
{
  "dashboard_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "content_db_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 
  "analytics_db_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "calendar_db_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "created_at": "2025-08-27T10:00:00.000000"
}
```

이 ID들은 향후 API 연동 시 사용됩니다.

## 🔍 문제해결

### 권한 오류
- Integration이 페이지에 정상적으로 추가되었는지 확인
- 워크스페이스 관리자 권한으로 Integration 생성했는지 확인

### API 토큰 오류
- Notion Integration 페이지에서 토큰을 정확히 복사했는지 확인  
- 토큰 앞에 `secret_`가 포함되어 있는지 확인

### 페이지 ID 오류
- URL에서 추출한 ID가 32자리 hex 문자열인지 확인
- 하이픈(-)은 제거하고 입력

---

*IMI WORK OSMU 전략의 체계적 실행을 위한 완벽한 Notion 워크스페이스를 자동으로 구축하세요!*