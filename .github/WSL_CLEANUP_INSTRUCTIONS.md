# WSL Claude Code - 중복 저장소 정리 작업 가이드

> **작업 목적**: Mac과 Windows PC 간 git 동기화를 단순화하고, Obsidian과 Claude Code를 하나의 저장소에서 사용하기 위한 환경 재구성

## 📋 현재 상황 요약

### 배경
- **Mac**: `/Users/rhim/Projects/claude-projects` 에서 Claude Code 사용 중
- **Windows PC (WSL)**: 기존에 WSL 내부 경로에 저장소를 clone하여 Mac과 git push/pull로 동기화 중
- **Windows PC (Windows)**: 방금 `C:\Users\hovoo\Documents\claude-projects` 에 git clone 완료

### 문제점
현재 **저장소가 2개** 존재:
1. WSL 내부: `~/claude-projects` (또는 다른 경로) ← WSL 네이티브 파일시스템
2. Windows: `C:\Users\hovoo\Documents\claude-projects` ← 방금 clone

**결과**:
- Obsidian(Windows)은 `C:\Users\hovoo\...` 만 접근 가능
- WSL Claude Code는 기존 WSL 경로 사용 중
- 두 저장소가 분리되어 **수동 동기화 필요** (비효율)

### 목표
**단일 저장소 구조**로 통합:
```
실제 저장소: C:\Users\hovoo\Documents\claude-projects (Windows 파일시스템)
              ↕
WSL 접근:     ~/Projects → /mnt/c/Users/hovoo/Documents/claude-projects (심볼릭 링크)

사용:
  - Obsidian (Windows): C:\Users\hovoo\Documents\claude-projects\pkm
  - Claude Code (WSL):  cd ~/Projects (같은 파일 공유!)
  - Git (WSL):          cd ~/Projects && git push/pull
```

**장점**:
- ✅ 저장소 1개만 관리
- ✅ Obsidian과 Claude Code가 실시간으로 같은 파일 공유
- ✅ 중복 동기화 불필요
- ✅ Mac ↔ Windows 동기화 단순화

---

## 🔍 1단계: 현재 WSL 저장소 위치 확인

### 명령어 실행

```bash
# WSL Ubuntu에서 실행
# 현재 어디서 Claude Code를 사용하고 있는지 확인
pwd

# claude-projects 폴더 찾기
find ~ -name "claude-projects" -type d 2>/dev/null

# 또는 Projects 폴더 찾기
find ~ -name "Projects" -type d 2>/dev/null
```

### 예상 출력

```bash
# 예시 1: WSL 네이티브 경로
/home/hovoo/claude-projects

# 예시 2: 다른 이름
/home/hovoo/Projects

# 예시 3: 이미 Windows 공유 중 (이 경우 작업 불필요!)
/mnt/c/Users/hovoo/Documents/claude-projects
```

### 판단 기준

**출력이 `/mnt/c/`로 시작하나요?**
- **YES** → 이미 Windows와 공유 중! 추가 작업 불필요 (이 가이드 종료)
- **NO** → 계속 진행 (WSL 네이티브 경로이므로 정리 필요)

---

## 🔍 2단계: 커밋 안 한 작업 확인 및 백업

### 명령어 실행

```bash
# 기존 WSL 저장소로 이동
cd ~/claude-projects  # 또는 1단계에서 찾은 경로

# 현재 브랜치 및 상태 확인
git status

# 커밋 안 한 변경사항 확인
git diff
```

### 시나리오별 대응

#### 시나리오 A: 변경사항 없음
```bash
# 출력: "nothing to commit, working tree clean"
# → 바로 3단계로 진행
```

#### 시나리오 B: 커밋 안 한 파일 있음
```bash
# 출력: "Changes not staged for commit" 또는 "Untracked files"

# 백업 저장
git stash save "WSL 환경 정리 전 백업 $(date +%Y%m%d_%H%M%S)"

# 확인
git stash list
# 출력: stash@{0}: On main: WSL 환경 정리 전 백업 20251009_1530
```

#### 시나리오 C: 중요한 작업 중
```bash
# 먼저 커밋하고 push
git add .
git commit -m "WSL 환경 정리 전 임시 커밋"
git push

# 또는 파일로 백업
cp -r ~/claude-projects ~/claude-projects.backup
```

---

## 🗑️ 3단계: WSL 기존 저장소 삭제

### 명령어 실행

```bash
# 홈 디렉토리로 이동
cd ~

# 현재 위치 확인 (안전 확인)
pwd
# 출력: /home/hovoo

# WSL 저장소 삭제
rm -rf claude-projects

# 또는 다른 이름이었다면
# rm -rf Projects

# 삭제 확인
ls -la | grep -i project
# 아무것도 출력되지 않으면 성공
```

### ⚠️ 안전 체크

```bash
# 삭제 전 한 번 더 확인
ls -la ~/claude-projects

# 정말 WSL 경로인지 확인 (/home/... 이어야 함)
# /mnt/c/... 경로라면 절대 삭제하지 마세요!
```

---

## 🔗 4단계: Windows 저장소로 심볼릭 링크 생성

### 명령어 실행

```bash
# Windows 저장소 존재 확인
ls -la /mnt/c/Users/hovoo/Documents/claude-projects
# 파일 목록이 보이면 OK

# 심볼릭 링크 생성
ln -s /mnt/c/Users/hovoo/Documents/claude-projects ~/Projects

# 링크 확인
ls -la ~/ | grep Projects
# 출력 예시:
# lrwxrwxrwx  1 hovoo hovoo   50 Oct  9 15:30 Projects -> /mnt/c/Users/hovoo/Documents/claude-projects
```

### 심볼릭 링크 이해

```
~/Projects (바로가기) → /mnt/c/Users/hovoo/Documents/claude-projects (실제 위치)
                         ↕
                      C:\Users\hovoo\Documents\claude-projects (Windows에서 보는 경로)
```

---

## ✅ 5단계: 동작 확인

### Git 설정 확인

```bash
# 새 경로로 이동
cd ~/Projects

# 현재 위치 확인
pwd
# 출력: /mnt/c/Users/hovoo/Documents/claude-projects

# Git 저장소 확인
git status
git remote -v
# origin  https://github.com/Rhim80/claude-projects.git (fetch)
# origin  https://github.com/Rhim80/claude-projects.git (push)

# 파일 목록 확인
ls -la
# pkm/, education/, imi-work-osmu/ 등이 보여야 함
```

### Claude Code 테스트

```bash
cd ~/Projects

# Claude Code 실행 가능 확인
claude --version

# 또는 바로 실행
claude
```

### Git 동기화 테스트

```bash
cd ~/Projects

# Mac 최신 변경사항 가져오기
git pull

# 테스트 파일 생성
echo "WSL 환경 설정 완료" > wsl-setup-test.txt

# 커밋 & 푸시
git add wsl-setup-test.txt
git commit -m "✅ WSL 환경 재구성 완료 테스트"
git push

# Mac에서 git pull 하면 이 파일이 보여야 함
```

---

## 🔄 6단계: 백업 복원 (필요시)

2단계에서 stash한 내용이 있다면:

```bash
cd ~/Projects

# Stash 목록 확인
git stash list

# 가장 최근 stash 복원
git stash pop

# 충돌 발생 시 수동 해결
git status
# 충돌 파일 확인 후 수동 편집
git add .
git commit -m "백업 내용 복원"
```

---

## 🎯 7단계: WSL Git 설정 (선택사항)

### Git 사용자 정보 확인

```bash
git config --global user.name
git config --global user.email

# 설정 안 되어 있으면
git config --global user.name "Rhim80"
git config --global user.email "hovooimi@gmail.com"
```

### Git 개행 문자 설정

```bash
# Windows 파일과 호환성을 위해
git config --global core.autocrlf input

# 확인
git config --global --list
```

### GitHub 인증 (필요시)

```bash
# 옵션 1: GitHub CLI 사용
sudo apt update
sudo apt install gh
gh auth login

# 옵션 2: Windows Git Credential Manager 공유
git config --global credential.helper "/mnt/c/Program\ Files/Git/mingw64/bin/git-credential-manager.exe"
```

---

## 📊 최종 확인 체크리스트

### ✅ 완료 확인

- [ ] `cd ~/Projects` 실행 가능
- [ ] `pwd` 출력이 `/mnt/c/Users/hovoo/Documents/claude-projects`
- [ ] `git status` 정상 작동
- [ ] `git remote -v` 에서 `github.com/Rhim80/claude-projects.git` 확인
- [ ] `ls pkm/` 에서 Obsidian vault 파일 확인
- [ ] `claude --version` 또는 `claude` 실행 가능
- [ ] `git pull` 및 `git push` 정상 작동

### 🎊 성공 시 구조

```
Mac:      /Users/rhim/Projects/claude-projects
   ↕ git push/pull
GitHub:   github.com/Rhim80/claude-projects
   ↕ git push/pull
Windows:  C:\Users\hovoo\Documents\claude-projects (실제 저장소)
   ↕ 파일시스템 공유
WSL:      ~/Projects → /mnt/c/Users/hovoo/.../claude-projects (심볼릭 링크)

도구별 사용:
  - Obsidian (Windows): C:\Users\hovoo\Documents\claude-projects\pkm
  - Claude Code (WSL):  cd ~/Projects
  - Git (WSL):          cd ~/Projects && git push/pull
```

---

## 🐛 트러블슈팅

### 문제 1: 심볼릭 링크 생성 실패

```bash
# 에러: File exists
# 기존 폴더가 남아있는 경우
rm -rf ~/Projects
ln -s /mnt/c/Users/hovoo/Documents/claude-projects ~/Projects
```

### 문제 2: Windows 저장소가 안 보임

```bash
# Windows 경로 확인
ls /mnt/c/Users/hovoo/Documents/

# claude-projects 폴더가 없으면
# Windows에서 다시 git clone 필요
```

### 문제 3: Git 인증 실패

```bash
# SSH 키 사용 시
ls ~/.ssh/
cat ~/.ssh/id_rsa.pub

# HTTPS 인증 시
gh auth login
# 또는
git config --global credential.helper "/mnt/c/Program\ Files/Git/mingw64/bin/git-credential-manager.exe"
```

### 문제 4: 파일 권한 에러

```bash
# WSL 설정 확인
sudo nano /etc/wsl.conf

# 다음 내용 추가
[automount]
options = "metadata,umask=22,fmask=11"

# WSL 재시작 (PowerShell에서)
wsl --shutdown
```

---

## 📝 작업 완료 후 Mac에 보고

작업 완료 후 다음 내용을 Mac Claude Code에 전달:

```
✅ WSL 환경 재구성 완료

- 기존 WSL 저장소: 삭제 완료
- 새 경로: ~/Projects → /mnt/c/Users/hovoo/Documents/claude-projects
- Git 동작: 정상
- Claude Code: 정상 실행 가능
- Obsidian 연동: 준비 완료 (C:\Users\hovoo\Documents\claude-projects\pkm)

테스트 파일 커밋: wsl-setup-test.txt
```

---

## 🎯 핵심 요약

### 왜 이 작업을 하나요?

기존에는:
```
WSL 저장소 (~/claude-projects) ← Claude Code 사용
   ↕ git push/pull
Mac 저장소 (/Users/rhim/Projects/claude-projects)

Windows 저장소 (C:\Users\hovoo\...) ← Obsidian 사용
   ↕ 별도 동기화 필요 (비효율!)
```

변경 후:
```
Windows 저장소 (C:\Users\hovoo\Documents\claude-projects)
   ↕ 파일시스템 공유 (실시간!)
WSL 접근 (~/Projects) ← Claude Code 사용
   ↕ git push/pull
Mac 저장소 (/Users/rhim/Projects/claude-projects)

Obsidian과 Claude Code가 같은 파일 사용!
```

### 성능 걱정은?

- WSL에서 Windows 파일 접근 시 약간 느릴 수 있음
- **하지만** 텍스트 파일 작업이라 체감 불가
- Claude Code, Git 모두 정상 작동
- **통합의 편리함 >>> 미미한 성능 차이**

### Claude Code 사용법 변화는?

**전혀 없습니다!**
- 경로만 `~/Projects`로 변경
- 모든 명령어, 기능 동일
- Git push/pull 동일하게 작동

---

**이 가이드를 따라 작업하면 Mac과 Windows PC 간 완벽한 동기화 환경이 구축됩니다!** 🎊
