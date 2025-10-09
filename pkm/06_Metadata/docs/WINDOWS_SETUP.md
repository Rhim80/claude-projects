# Windows에서 PKM Vault 설정 가이드

WSL 파일시스템에서 Windows Obsidian을 직접 실행하면 "EISDIR: illegal operation on a directory" 에러가 발생합니다.

## 📦 사전 준비: Git 설치

### Git for Windows 설치 (필수)

1. **다운로드**
   - https://git-scm.com/download/win
   - Windows 64-bit 버전 다운로드

2. **설치 옵션** (기본값 권장)
   ```
   ✅ Git Bash Here
   ✅ Git from the command line and also from 3rd-party software
   ✅ Use bundled OpenSSH
   ✅ Checkout Windows-style, commit Unix-style line endings
   ✅ Git Credential Manager (인증 자동 저장)
   ```

3. **설치 확인**
   ```powershell
   # PowerShell 또는 CMD에서
   git --version
   # git version 2.x.x 출력되면 성공
   ```

4. **Git 사용자 정보 설정**
   ```powershell
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"

   # 설정 확인
   git config --global --list
   ```

## 🎯 권장 방법: Windows 경로에 Clone

### 1단계: Windows에 저장소 Clone

```powershell
# PowerShell 또는 Git Bash에서
cd C:\Users\[YourUsername]\Documents

# 저장소 복제 (첫 실행 시 GitHub 로그인 필요)
git clone https://github.com/Rhim80/claude-projects.git

# 🔐 GitHub 인증 창이 뜨면:
#    - "Sign in with your browser" 선택
#    - GitHub 계정으로 로그인
#    - 이후 자동으로 인증 정보 저장됨

# pkm 폴더로 이동
cd claude-projects\pkm
```

### 2단계: Obsidian에서 Vault 열기

```
Obsidian 실행
→ "Open folder as vault" 선택
→ C:\Users\[YourUsername]\Documents\claude-projects\pkm 선택
→ Trust author and enable plugins (안전한 vault임)
```

### 3단계: 동기화 워크플로우

#### Windows에서 작업 후
```powershell
cd C:\Users\[YourUsername]\Documents\claude-projects
git add .
git commit -m "Windows에서 노트 작성"
git push
```

#### Mac에서 동기화
```bash
cd /Users/rhim/Projects
git pull
```

#### Mac에서 작업 후 Windows로
```powershell
# Windows PowerShell
cd C:\Users\[YourUsername]\Documents\claude-projects
git pull
```

## 🔄 WSL과 Windows 병행 사용

Windows와 WSL 모두에서 작업이 필요한 경우:

### 파일 구조
```
Windows: C:\Users\[You]\Documents\claude-projects\
WSL:     ~/Projects/ (또는 별도 경로)
```

### WSL에서 Windows 저장소 접근
```bash
# WSL에서 Windows 파일에 접근
cd /mnt/c/Users/[YourUsername]/Documents/claude-projects

# 또는 심볼릭 링크 생성
ln -s /mnt/c/Users/[YourUsername]/Documents/claude-projects ~/windows-projects
```

### 작업 패턴

**옵션 A: Obsidian만 Windows에서**
```
Windows: Obsidian으로 노트 작성/관리
WSL:     Claude Code로 자동화/스크립트 작업
둘 다:   C:\Users\...\claude-projects 공유
```

**옵션 B: 완전 분리**
```
Windows: C:\Users\...\claude-projects (Obsidian 전용)
WSL:     ~/Projects/ (Claude Code 전용)
동기화:  git push/pull로 양방향 동기화
```

## ⚠️ 주의사항

### Git 개행 문자 설정
```bash
# Windows에서 (PowerShell)
git config --global core.autocrlf true

# WSL에서
git config --global core.autocrlf input
```

### 파일 권한 문제 방지
```bash
# WSL에서 Windows 파일 수정 시
# /etc/wsl.conf 설정
[automount]
options = "metadata,umask=22,fmask=11"
```

### .gitignore 확인
```
# 이미 설정됨
.obsidian/workspace.json  # 환경별로 다름
node_modules/
.env
```

## 🐛 트러블슈팅

### Git 명령어가 작동하지 않음
```powershell
# 1. Git 설치 확인
git --version

# 2. 미설치 시 Git for Windows 설치
# https://git-scm.com/download/win

# 3. PowerShell 재시작 후 다시 시도
```

### GitHub 인증 실패
```powershell
# 1. Credential Manager 확인
git config --global credential.helper

# 2. 인증 정보 초기화 후 재시도
git credential-manager-core erase

# 3. 다시 clone 시도 (브라우저 로그인 창 뜸)
git clone https://github.com/Rhim80/claude-projects.git
```

### "EISDIR" 에러 발생 시
→ WSL 경로(`\\wsl$\...`)가 아닌 Windows 경로(`C:\Users\...`)를 사용하세요

### Obsidian이 파일 변경을 감지하지 못함
```powershell
# Vault를 다시 닫고 열기
# 또는 Obsidian 재시작
```

### WSL과 Windows 간 파일 동기화 안 됨
```bash
# WSL에서 Windows 저장소로 이동
cd /mnt/c/Users/[YourUsername]/Documents/claude-projects
git status
```

### Git 충돌 발생
```bash
# 1. 현재 변경사항 확인
git status

# 2. 백업
git stash

# 3. 최신 버전 가져오기
git pull

# 4. 백업 복원 (충돌 수동 해결)
git stash pop
```

## 📊 성능 비교

| 방법 | Obsidian 성능 | Claude Code | 관리 복잡도 |
|------|--------------|-------------|------------|
| Windows 경로 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ (WSL 접근) | 🟢 낮음 |
| WSL 경로 | ❌ 에러 발생 | ⭐⭐⭐⭐⭐ | - |
| WSL GUI (WSLg) | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 🔴 높음 |

## 🎯 최종 권장사항

**사무실 PC 환경:**
```
Windows: C:\Users\[You]\Documents\claude-projects
  ├─ Obsidian으로 pkm vault 열기
  └─ Git으로 Mac과 동기화

선택적 WSL 사용:
  └─ /mnt/c/Users/[You]/Documents/claude-projects
      └─ Claude Code로 자동화 작업
```

이 구조가 가장 안정적이고 성능도 좋습니다.

## 📚 관련 문서
- [Mac-Windows Git 동기화 가이드](../.github/SYNC_GUIDE.md)
- [Obsidian 동기화 가이드](./OBSIDIAN_SYNC_GUIDE.md)
