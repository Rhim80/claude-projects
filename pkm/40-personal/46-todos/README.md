# 📋 Todo Management System

> Claude Code 기반 통합 Todo 관리 시스템
>
> **핵심 철학**: "어디에 뒀는지 기억 못하는" 문제 해결

---

## 🎯 시스템 개요

### 문제
- Todo를 여러 곳에 저장 → 어디에 뒀는지 기억 못함
- 장기 프로젝트를 생각없이 넘어감
- 주기적인 알림이 없음

### 해결책
- **단일 저장소**: `active-todos.md` 하나로 통합
- **자동 컨텍스트**: 어디서 추가했는지 자동 기록
- **주기적 체크**: `/daily-review`에서 자동 제안
- **다양한 뷰**: `/todos`로 여러 방식으로 조회

---

## 📂 파일 구조

```
pkm/40-personal/43-todos/
├── README.md              # 이 파일
├── active-todos.md        # 중앙 Todo 저장소 ⭐
├── completed-todos.md     # 완료된 Todo 아카이브
└── project-todos.md       # 프로젝트별 집계 (자동 생성)
```

---

## 🚀 사용법

### 1️⃣ Todo 추가하기

**기본 사용:**
```bash
/todo 서수현님 급여 차액 확인
```

**우선순위 지정:**
```bash
/todo [urgent] 노무사 퇴직금 문의
/todo [high] GPTers 19기 결과 확인
/todo [low] 매장 인테리어 아이디어 수집
```

**프로젝트 지정:**
```bash
/todo [gpters] 스터디 템플릿 업데이트
/todo [cafe] 인사동 매장 의자 수리
```

**자동 저장되는 정보:**
- 추가 시각
- 현재 작업 중인 파일 (컨텍스트)
- 우선순위
- 프로젝트 연결

---

### 2️⃣ Todo 확인하기

**전체 Todo 보기:**
```bash
/todos
```

**오늘 할 일만:**
```bash
/todos today
```

**프로젝트별 그룹화:**
```bash
/todos project
```

**오래된 것 체크:**
```bash
/todos overdue
```

**통계 보기:**
```bash
/todos stats
```

---

### 3️⃣ 매일 아침 루틴

**Daily Review 실행:**
```bash
/daily-review
```

**자동으로 제공되는 정보:**
1. 어제 프로젝트 진행 상황 (Git 분석)
2. **📋 Todo 상태 체크**
   - 미처리 Todo 개수
   - 오늘 할 일 개수
   - 지연 중인 Todo (⚠️ 1주일 이상)
3. **오늘 처리 제안**
   - High priority Todo
   - 오래된 Todo 중 급한 것
   - 연관된 Todo 묶음 제안
4. 프로젝트 인사이트

---

## 📊 Todo 데이터 구조

```markdown
- [ ] [Todo 내용]
  - added: 2025-10-11 15:23
  - context: gpters-ai-branding-study/README.md
  - priority: high
  - project: gpters
```

**필드 설명:**
- `added`: 추가된 시각 (Overdue 판단 기준)
- `context`: 어디서 추가했는지 (나중에 추적 가능)
- `priority`: high/normal/low (정렬 기준)
- `project`: 프로젝트명 (그룹화 기준)

---

## 🔄 워크플로우 예시

### 시나리오 1: 작업 중 Todo 생각남

```
1. GPTers 프로젝트 README 수정 중
2. "아 급여 처리 해야지" 생각남
3. /todo 서수현님 급여 차액 확인
4. ✅ 저장됨 (context: gpters 프로젝트)
5. 계속 작업
```

### 시나리오 2: 매일 아침 체크

```
1. 아침에 VS Code 열고
2. /daily-review 실행
3. 📋 Todo 상태 확인:
   - 미처리: 7개
   - 오늘 할 일: 3개
   - 지연 중: 2개 (⚠️)
4. 오늘 처리할 것 3개 선택
5. Daily Note에 기록
```

### 시나리오 3: 프로젝트별 Todo 정리

```
1. /todos project 실행
2. cafe-operations 관련 Todo 4개 발견
3. 매장 순회할 때 한 번에 처리 계획
4. 체크리스트 작성
```

### 시나리오 4: 오래된 Todo 처리

```
1. /todos overdue 실행
2. 14일 지난 Todo 발견
3. "아 이거 까먹었네" 확인
4. 바로 처리 또는 Today로 이동
```

---

## 🎨 커스터마이징

### active-todos.md 섹션 구조

```markdown
## 📥 Inbox (처리 안 한 것들)
→ /todo로 추가되는 기본 위치

## 🎯 Today (오늘 할 일)
→ 매일 아침 여기로 이동

## 📅 Scheduled (날짜 지정된 것들)
→ 특정 날짜에 해야 하는 것

## 🗂️ Project-Related (프로젝트 연결된 것들)
→ 프로젝트와 함께 봐야 하는 것

## ⚠️ Overdue (오래된 것들)
→ 자동 감지 (1주일 이상)
```

---

## 💡 활용 팁

### 1. 컨텍스트 활용
```
"이 Todo를 왜 추가했지?"
→ context 필드 확인
→ 원래 작업하던 파일로 돌아가기
```

### 2. 프로젝트 묶음 처리
```
/todos project 실행
→ 같은 프로젝트 Todo 3개 발견
→ 한 번에 처리하면 효율적
```

### 3. Overdue 주기적 체크
```
주 1회 /todos overdue 실행
→ 방치된 Todo 확인
→ 삭제 또는 재우선순위화
```

### 4. Daily Review 활용
```
매일 아침 /daily-review
→ Todo 상태 자동 체크
→ 오늘 할 것 제안받기
→ 실행
```

---

## 🔧 고급 기능 (향후 확장)

### 자동 완료 감지
- `[x]` 체크된 Todo 자동 아카이빙
- `completed-todos.md`로 이동
- 월별 통계 자동 생성

### 반복 작업
```markdown
- [ ] 급여 처리
  - recurring: monthly
  - next: 2025-11-10
```

### 알림 시스템 (옵션)
```
n8n 연동 시:
- 매일 오전 9시 Telegram 알림
- 오래된 Todo 주간 리포트
- 프로젝트 방치 경고
```

---

## 📈 성공 지표

**시스템이 성공하려면:**
1. ✅ Todo를 잊지 않음 (단일 저장소)
2. ✅ 주기적으로 확인함 (/daily-review)
3. ✅ 장기 프로젝트를 놓치지 않음 (Overdue)
4. ✅ 추가하기 쉬움 (/todo 2초 소요)

**실패 신호:**
- Todo가 여러 곳에 분산됨
- 1주일 이상 /todos 안 봄
- Overdue가 10개 이상 쌓임

---

## 🔗 관련 시스템

### Daily Note 시스템
- `/daily-note` - 오늘 노트 생성
- `/daily-review` - Todo 통합 분석

### PKM 시스템
- `00-inbox/` - 빠른 캡처
- `10-projects/` - 프로젝트별 Todo
- `40-personal/` - 개인 Todo 관리

### 기존 워크플로우
- `/idea` - 아이디어 캡처 (Todo와 구분)
- `/backup` - 정기 백업
- `/sync` - 동기화

---

## 📝 체인지로그

**2025-10-11: 시스템 구축**
- `/todo` 커맨드 생성
- `/todos` 커맨드 생성
- `/daily-review` Todo 통합
- 중앙 저장소 구조 설계

---

*"어디에 뒀는지 기억 못하는" 문제를 해결하는 단일 Todo 시스템*
