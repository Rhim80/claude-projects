# Notion 페이지 설정 지침서

## 🎯 대상 페이지: 25cd0f53623d8078b7bccc15d606ede0

### 1단계: 메인 대시보드 페이지 구성

```
페이지 제목: IMI WORK OSMU 대시보드
이모지: 🎯
```

#### 복사해서 붙여넣을 대시보드 내용:

---

# 🎯 IMI WORK OSMU 대시보드

## 📊 이번 달 목표

- [ ] 네이버 블로그 3개 글 발행
- [ ] Instagram 캐러셀 8개 제작  
- [ ] Threads 스레드 12회 발행
- [ ] Ghost 블로그 방문자 1,000명 달성

## 🔥 최근 성과 하이라이트

**최고 성과 콘텐츠**: Bret Taylor - 연결하는 사람  
**이번 주 총 도달률**: [집계 예정]  
**플랫폼별 성장률**: Ghost(+0%) | 네이버(+0%) | Instagram(+0%) | Threads(+0%)

---

## 📝 콘텐츠 현황

### 🟢 발행 완료
✅ Bret Taylor - 연결하는 사람 (Ghost)

### 🟡 작업 중  
🔄 Bret Taylor - 네이버 버전 준비 중  
🔄 Bret Taylor - Instagram 캐러셀 기획 중  
🔄 Bret Taylor - Threads 스레드 기획 중

### ⚪ 예정
⏳ 다음 YouTube 영상 선정 및 기획

---

## 🛠 이번 주 작업 계획

**Monday**
- [ ] 새 YouTube 영상 발굴
- [ ] 네이버 블로그 SEO 최적화 작업

**Tuesday**
- [ ] Instagram 캐러셀 텍스트 작성  
- [ ] Featured image 제작

**Wednesday**
- [ ] Threads 스레드 기획 및 작성

**Thursday**  
- [ ] 플랫폼별 포스팅 실행

**Friday**
- [ ] 주간 성과 분석 및 리뷰

---

## 🔗 빠른 접근

[Ghost 블로그 관리자](https://blog.imiwork.com/ghost/)  
[네이버 블로그](https://blog.naver.com/)  
[Instagram](https://www.instagram.com/)  
[Threads](https://www.threads.net/)

---

## 📈 성과 요약 (월별)

### 8월 2025
**총 콘텐츠**: 1개 (Bret Taylor)  
**Ghost**: 발행 1개, 방문자 [집계 예정]  
**네이버**: 준비 중  
**Instagram**: 준비 중  
**Threads**: 준비 중

---

*마지막 업데이트: 2025.08.27*

---

### 2단계: 콘텐츠 관리 데이터베이스 생성

1. 대시보드 페이지 하단에 `/database` 입력
2. "New database" 선택  
3. 이름: "콘텐츠 관리"
4. 다음 속성들을 차례로 추가:

**속성 설정:**
```
1. 제목 (Title) - 기본값
2. YouTube 소스 (URL)
3. 제작일 (Date)  
4. 상태 (Select): 🔵기획중, 🟡작업중, 🟢완성, 🔴보류
5. 우선순위 (Select): 🔥높음, ⚡중간, 📝낮음
6. Ghost 블로그 (Select): ✅완성, 🔄작업중, ⏳예정, ❌해당없음
7. 네이버 블로그 (Select): ✅발행완료, 🔄작업중, ⏳예정, ❌해당없음  
8. Instagram 캐러셀 (Select): ✅발행완료, 🔄작업중, ⏳예정, ❌해당없음
9. Threads 스레드 (Select): ✅발행완료, 🔄작업중, ⏳예정, ❌해당없음
10. 키워드 (Multi-select): 일을잘한다는것, 감각과AI, 브랜딩전략, 연결의힘
11. 카테고리 (Select): 비즈니스인사이트, AI활용법, 브랜딩전략, 자영업노하우
12. Ghost 조회수 (Number)
13. 네이버 조회수 (Number)  
14. Instagram 도달률 (Number)
15. 총 도달률 (Formula): prop("Ghost 조회수") + prop("네이버 조회수") + prop("Instagram 도달률")
```

**첫 번째 레코드 입력:**
```
제목: 연결하는 사람이 되면 일이 잘 풀린다
YouTube 소스: https://www.youtube.com/watch?v=qImgGtnNbx0  
제작일: 2025-08-27
상태: 🟢완성
우선순위: 🔥높음
Ghost 블로그: ✅완성
네이버 블로그: ⏳예정
Instagram 캐러셀: ⏳예정
Threads 스레드: ⏳예정  
키워드: 연결의힘, 일을잘한다는것, 감각과AI
카테고리: 비즈니스인사이트
```

### 3단계: 성과 추적 데이터베이스 생성

1. `/database` 입력
2. "New database" 선택
3. 이름: "성과 추적"  

**속성 설정:**
```
1. 날짜 (Date)
2. 관련 콘텐츠 (Relation) - 콘텐츠 관리 DB와 연결
3. 측정 주기 (Select): 📅일간, 📆주간, 📊월간
4. 플랫폼 (Select): 👻Ghost, 🟢네이버, 📷Instagram, 🧵Threads
5. 방문자수 (Number)
6. 페이지뷰 (Number)  
7. 참여율 (Number)
8. 주요 인사이트 (Text)
9. 개선 계획 (Text)
```

### 4단계: 콘텐츠 캘린더 데이터베이스 생성

1. `/database` 입력  
2. "New database" 선택
3. 이름: "콘텐츠 캘린더"

**속성 설정:**
```
1. 제목 (Title)
2. 날짜 (Date)  
3. 타입 (Select): 📝콘텐츠제작, 📤발행, 📊분석, 🔧시스템개선, 💡기획
4. 플랫폼 (Multi-select): 👻Ghost, 🟢네이버, 📷Instagram, 🧵Threads
5. 작업단계 (Select): 🔍리서치, ✍️작성, 🎨디자인, 📤발행, ✅완료
6. 우선순위 (Select): 🚨긴급, 🔥높음, ⚡중간, 📝낮음
7. 관련 콘텐츠 (Relation) - 콘텐츠 관리 DB와 연결  
8. 소요시간 (Number)
9. 작업내용 (Text)
```

### 5단계: 캘린더 뷰 생성

콘텐츠 캘린더 DB에서:
1. 우상단 "Add a view" 클릭
2. "Calendar" 선택
3. 날짜 속성을 "날짜"로 설정
4. 색상 구분을 "타입"으로 설정

### 6단계: 대시보드에 DB 뷰 연결

메인 대시보드 페이지로 돌아가서:

1. "## 📝 콘텐츠 현황" 섹션 아래에 콘텐츠 관리 DB 링크 추가
2. "## 🛠 이번 주 작업 계획" 섹션 아래에 콘텐츠 캘린더 DB 링크 추가  
3. "## 📈 성과 요약" 섹션 아래에 성과 추적 DB 링크 추가

---

## 🎯 완료 체크리스트

- [ ] 1단계: 메인 대시보드 내용 붙여넣기
- [ ] 2단계: 콘텐츠 관리 DB 생성 및 속성 설정
- [ ] 3단계: 성과 추적 DB 생성 및 속성 설정  
- [ ] 4단계: 콘텐츠 캘린더 DB 생성 및 속성 설정
- [ ] 5단계: 캘린더 뷰 생성
- [ ] 6단계: 대시보드에 DB 뷰 연결
- [ ] 7단계: 첫 번째 콘텐츠 데이터 입력

설정 완료 후 OSMU 워크스페이스가 완벽하게 구동될 준비가 됩니다! 🚀