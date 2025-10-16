# 1-2. git pull, 두 단어로 시작하는 하루

> **목표**: 첫 성공 경험 - "와, 진짜 되네!"
> **핵심**: Before(맥락 손실 30분) vs After(동기화 10초)
> **결과**: 수동 30분 → Claude Code 10초

---

## 😫 매일 아침 반복되는 악몽

### 시나리오: 일요일 밤 집에서 작업 → 월요일 아침 사무실 출근

**일요일 밤 (집 맥북)**:
```
✅ 강릉 카페 프로젝트 브랜드 전략 문서 작성 (2시간)
✅ 롯데 크리스마스 마켓 가격표 4가지 시뮬레이션 (1시간)
✅ GPTers 19기 커리큘럼 초안 (30분)
```

**월요일 아침 (회사 PC)**:
```
❓ "어? 어제 만든 파일 어디 있지?"
❓ "USB 가져왔나? 아, 집에 두고 왔네..."
❓ "이메일로 보냈나? 메일함 뒤지기..."
❓ "드라이브에 올렸나? 검색... 검색..."
```

**결과**: 30분 허비 + 스트레스 + 맥락 손실

---

## 💡 git pull: 두 단어의 마법

### Claude Code의 아침 루틴

**월요일 아침 (회사 PC)**:

```bash
cd /Users/rhim/Projects
claude "git pull"
```

**10초 후**:
```
✅ 강릉 카페 프로젝트 브랜드 전략 문서 (최신 버전)
✅ 롯데 크리스마스 마켓 가격표 시뮬레이션 (최신 버전)
✅ GPTers 19기 커리큘럼 초안 (최신 버전)

모든 변경사항이 동기화되었습니다.
집 맥북에서 작업한 21개 파일이 회사 PC에 반영되었습니다.
```

**결과**: 10초 + 스트레스 0 + 맥락 100% 보존

---

## 🎯 git이란? (비개발자 친화적 설명)

### 간단한 비유: "시간 여행 가능한 구글 드라이브"

| 기능 | 구글 드라이브 | git |
|------|--------------|-----|
| **저장** | 파일 업로드 | commit (저장 시점) |
| **동기화** | 자동 동기화 | push/pull (수동 동기화) |
| **버전 관리** | "복사본" 만들기 | 자동 버전 관리 |
| **협업** | 공유 링크 | 브랜치, 머지 |
| **장점** | 간편함 | 완벽한 버전 제어 |
| **단점** | 버전 관리 수동 | 초기 학습 필요 |

### git의 핵심 개념

```
집 맥북 (작업)
    ↓ git push (업로드)
GitHub (클라우드 저장소)
    ↓ git pull (다운로드)
회사 PC (최신 버전)
```

**핵심**:
- `git push`: 내 작업을 클라우드에 올리기
- `git pull`: 클라우드에서 최신 버전 가져오기

---

## 🚀 실전 예시: 이림의 실제 아침 루틴

### Before: git 없이 (2024년 이전)

**일요일 밤 (집 맥북)**:
```
1. 작업 완료
2. USB에 복사 (5분)
3. 이메일로도 보내기 (5분)
4. 드라이브에도 올리기 (5분)
```

**월요일 아침 (회사 PC)**:
```
1. USB 꽂기 → "어? USB 어디 갔지?" (5분)
2. 이메일 찾기 → "어느 메일이었지?" (10분)
3. 드라이브 검색 → "파일명이 뭐였지?" (10분)
4. 결국 찾음 → "어? 이거 최신 버전 맞나?" (5분)
```

**총 소요 시간**: 45분 (저장 15분 + 찾기 30분)

---

### After: git + Claude Code (2025년 현재)

**일요일 밤 (집 맥북)**:
```bash
claude "오늘 작업한 파일들 저장해줘"
```

**Claude Code**:
```
✅ 21개 파일 변경사항 확인
✅ 커밋 메시지 자동 생성: "강릉 프로젝트 브랜드 전략 + 롯데 가격표 시뮬레이션"
✅ GitHub에 업로드 완료

변경된 파일:
- pkm/10-projects/11-consulting/강릉-카페/브랜드-전략.md
- pkm/20-operations/21-cafe-operations/롯데-크리스마스-마켓/가격표-시뮬레이션.xlsx
- pkm/10-projects/12-education/12.02-gpters-ai-branding/19기-커리큘럼.md
... (18개 더)
```

**소요 시간**: 30초

---

**월요일 아침 (회사 PC)**:
```bash
cd /Users/rhim/Projects
claude "git pull"
```

**Claude Code**:
```
✅ 최신 변경사항 다운로드 완료

어제 집에서 작업한 내용:
- 강릉 프로젝트 브랜드 전략 문서 (2,340자)
- 롯데 가격표 시뮬레이션 4개 시트
- GPTers 19기 커리큘럼 초안

모든 파일이 최신 버전으로 동기화되었습니다.
바로 이어서 작업할 수 있습니다.
```

**소요 시간**: 10초

**총 절약 시간**: 44분 30초

---

## 📋 Step-by-Step: 첫 git 설정 (10분)

### 1단계: git 설치 확인

```bash
git --version
```

**결과**:
```
git version 2.39.2
```

만약 "command not found" 에러가 나면:
- **Mac**: Xcode Command Line Tools 자동 설치 프롬프트 따라가기
- **Windows**: [git-scm.com](https://git-scm.com/)에서 다운로드

---

### 2단계: GitHub 계정 생성

1. [github.com](https://github.com) 접속
2. "Sign up" 클릭
3. 이메일, 비밀번호, 사용자명 입력
4. 무료 계정 선택

**소요 시간**: 3분

---

### 3단계: 프로젝트 폴더를 git 저장소로 만들기

```bash
cd /Users/rhim/Projects/pkm
claude "이 폴더를 git 저장소로 만들어줘"
```

**Claude Code**:
```
✅ git 저장소 초기화 완료
✅ .gitignore 파일 생성 (민감한 파일 제외)
✅ 첫 커밋 준비 완료

다음 단계:
1. GitHub에 새 저장소 만들기
2. 원격 저장소 연결하기
3. 첫 push 실행하기

진행할까요? (yes/no)
```

**여러분**: `yes`

---

### 4단계: GitHub에 업로드

```bash
claude "GitHub에 pkm 저장소 만들고 업로드해줘"
```

**Claude Code**:
```
✅ GitHub에 'pkm' 저장소 생성 완료
✅ 원격 저장소 연결 완료
✅ 792개 파일 업로드 완료

GitHub 저장소 주소:
https://github.com/rhim/pkm

이제 다른 컴퓨터에서 git pull로 최신 버전을 받을 수 있습니다.
```

---

## 🎯 실전 활용: 3가지 시나리오

### 시나리오 1: 집 ↔ 회사 동기화

**집 맥북에서 작업 완료**:
```bash
claude "오늘 작업 저장해줘"
```

**회사 PC에서 이어서 작업**:
```bash
claude "git pull"
```

**결과**: 10초 만에 완벽한 동기화

---

### 시나리오 2: 실수로 파일 삭제했을 때

**문제 상황**:
```
😱 "아! 중요한 문서를 실수로 지웠어!"
```

**해결**:
```bash
claude "1시간 전 버전으로 되돌려줘"
```

**Claude Code**:
```
✅ 1시간 전 커밋으로 복원 완료
✅ 삭제된 파일 복구:
   - 강릉-브랜드-전략.md
   - 롯데-가격표.xlsx

파일이 복구되었습니다.
```

---

### 시나리오 3: 협업 (선택 사항)

**팀원과 공유**:
```bash
claude "이 저장소를 팀원 이메일 team@example.com과 공유해줘"
```

**Claude Code**:
```
✅ team@example.com에게 협업 초대 발송
✅ 읽기/쓰기 권한 부여

팀원이 초대를 수락하면 같은 저장소에서 작업할 수 있습니다.
```

---

## 💪 실습: 첫 번째 git pull 경험

### 실습 1: 테스트 프로젝트 만들기

**집 컴퓨터 (또는 첫 번째 환경)**:

```bash
# 1. 테스트 폴더 생성
mkdir ~/test-git-project
cd ~/test-git-project

# 2. Claude에게 git 저장소로 만들어달라고 요청
claude "이 폴더를 git 저장소로 만들고,
test.txt 파일에 '첫 번째 테스트'라고 써줘"
```

**Claude Code**:
```
✅ git 저장소 초기화
✅ test.txt 파일 생성
✅ 첫 커밋 완료: "첫 번째 테스트 파일 생성"

다음 단계: GitHub에 업로드
```

---

**3. GitHub에 업로드**:
```bash
claude "GitHub에 test-git-project 저장소 만들고 업로드해줘"
```

**Claude Code**:
```
✅ GitHub 저장소 생성: https://github.com/yourusername/test-git-project
✅ 원격 저장소 연결
✅ 업로드 완료

이제 다른 컴퓨터에서 받을 수 있습니다.
```

---

### 실습 2: 다른 컴퓨터에서 받기

**회사 컴퓨터 (또는 두 번째 환경)**:

```bash
# 1. 저장소 복제
cd ~/Downloads
claude "GitHub에서 test-git-project 가져와줘"
```

**Claude Code**:
```
✅ https://github.com/yourusername/test-git-project 복제 완료
✅ 폴더 위치: ~/Downloads/test-git-project

파일 확인:
- test.txt: "첫 번째 테스트"
```

---

**2. 파일 수정**:
```bash
cd ~/Downloads/test-git-project
claude "test.txt에 '두 번째 수정 - 회사 PC'를 추가해줘"
```

**Claude Code**:
```
✅ test.txt 수정 완료

현재 내용:
첫 번째 테스트
두 번째 수정 - 회사 PC

커밋할까요? (yes/no)
```

**여러분**: `yes`

---

**3. GitHub에 업로드**:
```bash
claude "변경사항 저장해줘"
```

**Claude Code**:
```
✅ 커밋 완료: "회사 PC에서 두 번째 수정"
✅ GitHub에 업로드 완료

최신 버전이 GitHub에 반영되었습니다.
```

---

### 실습 3: 첫 번째 컴퓨터에서 최신 버전 받기

**집 컴퓨터로 돌아와서**:

```bash
cd ~/test-git-project
claude "git pull"
```

**Claude Code**:
```
✅ 최신 변경사항 다운로드 완료

회사 PC에서 수정한 내용:
- test.txt: "두 번째 수정 - 회사 PC" 추가됨

현재 내용:
첫 번째 테스트
두 번째 수정 - 회사 PC

동기화 완료! 🎉
```

---

## 🎁 보너스: Claude Code가 git을 더 쉽게 만드는 이유

### 1. 자연스러운 한국어 명령

**일반 git (외워야 함)**:
```bash
git add .
git commit -m "강릉 프로젝트 브랜드 전략 문서 작성"
git push origin main
```

**Claude Code (대화처럼)**:
```bash
claude "오늘 작업한 파일들 저장해줘"
```

---

### 2. 커밋 메시지 자동 생성

**일반 git**:
```bash
# 매번 커밋 메시지를 직접 작성해야 함
git commit -m "뭐라고 쓰지...?"
```

**Claude Code**:
```bash
claude "변경사항 저장해줘"
```

**Claude Code가 자동 생성**:
```
✅ 커밋 메시지 생성: "강릉 카페 프로젝트 브랜드 전략 문서 작성 + 롯데 가격표 4가지 시뮬레이션 추가"
```

---

### 3. 에러 자동 해결

**일반 git (에러 발생)**:
```bash
git push
# 에러: "Updates were rejected because the remote contains work..."
# 😱 "무슨 뜻이지? 어떻게 해결하지?"
```

**Claude Code (에러 자동 처리)**:
```bash
claude "git push"
```

**Claude Code**:
```
⚠️  원격 저장소에 새로운 변경사항이 있습니다.

자동 해결 방법:
1. 원격 변경사항 먼저 받기 (git pull)
2. 충돌 확인 및 해결
3. 다시 업로드 (git push)

자동으로 처리할까요? (yes/no)
```

**여러분**: `yes`

**Claude Code**:
```
✅ 원격 변경사항 다운로드
✅ 충돌 없음 확인
✅ 업로드 완료

모든 변경사항이 GitHub에 반영되었습니다.
```

---

## 📊 Before/After 비교표

| 항목 | Before (수동) | After (git + Claude Code) |
|------|--------------|--------------------------|
| **동기화 시간** | 30-45분 (찾기 + 복사) | 10초 (git pull) |
| **맥락 손실** | 항상 발생 | 0% |
| **실수 복구** | 불가능 (파일 삭제 시) | 언제든 복구 가능 |
| **버전 관리** | 수동 ("최종_진짜최종.docx") | 자동 (모든 버전 저장) |
| **협업** | 이메일 첨부 (혼란) | 실시간 동기화 |
| **스트레스** | 😫😫😫 | 😊 |

---

## 🚦 다음 단계

### 오늘 배운 것:
- ✅ git pull: 두 단어로 최신 버전 받기
- ✅ git push: 내 작업 저장하고 업로드하기
- ✅ Claude Code로 git을 쉽게 쓰기

### 다음 콘텐츠 예고:
- **1-3**: "/daily-review: 2분 만에 하루를 정리하는 마법" (커스텀 커맨드)
- **1-4**: "파일시스템이 AI의 장기 기억이 되는 순간" (맥락 보존)
- **1-5**: "Claude Code 없는 하루는 상상이 안 된다" (Week 1 종합)

---

## 💬 FAQ

**Q: "git pull을 매일 해야 하나요?"**
A: 네! 아침 루틴으로 만들면 좋습니다. 10초면 충분합니다.

**Q: "실수로 잘못된 파일을 업로드하면?"**
A: `claude "이전 버전으로 되돌려줘"`로 언제든 복구 가능합니다.

**Q: "GitHub 대신 다른 서비스도 되나요?"**
A: 네, GitLab, Bitbucket 등도 가능하지만 GitHub이 가장 대중적입니다.

**Q: "개인 파일도 안전한가요?"**
A: Private 저장소(비공개)를 사용하면 본인만 접근 가능합니다.

**Q: "팀원과 공유하고 싶은데 어떻게 하나요?"**
A: `claude "이 저장소를 [이메일]과 공유해줘"`로 간단히 공유 가능합니다.

---

## 🎯 오늘의 챌린지

**실습 과제**: 테스트 프로젝트 만들고 두 컴퓨터에서 동기화하기

1. 첫 번째 컴퓨터에서 git 저장소 만들기
2. GitHub에 업로드
3. 두 번째 컴퓨터에서 git pull
4. 파일 수정 후 다시 업로드
5. 첫 번째 컴퓨터에서 git pull로 최신 버전 받기

**소요 시간**: 20분
**효과**: "git pull"의 마법 체험 ✨

---

## 📚 참고 자료

- **git 공식 문서**: [git-scm.com](https://git-scm.com/)
- **GitHub 가이드**: [guides.github.com](https://guides.github.com/)
- **Claude Code git 활용**: [docs.anthropic.com/claude-code](https://docs.anthropic.com/en/docs/claude-code)

---

**작성일**: 2025-10-16
**버전**: v1.0
**시리즈**: 비개발자를 위한 Claude Code (2/50)

**Tags**: #claude-code #git #동기화 #생산성
**Related**:
- [[01-claude-code란-무엇이며-왜-필요한가]]
- [[50개-콘텐츠-최종-구성안]]
- Next: [[03-daily-review-2분-만에-하루를-정리하는-마법]]

---

_P.S. - git pull 두 단어가 여러분의 아침을 바꿉니다. 맥락 손실 0%, 스트레스 0%, 생산성 100%._
