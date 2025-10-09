# WSL + Windows 통합 워크플로우 가이드

Windows PC에서 Claude Code(WSL)와 Obsidian(Windows)를 함께 사용하는 방법입니다.

## 🎯 단일 저장소 공유 구조

```
Windows:  C:\Users\hovoo\Documents\claude-projects
   ↕
WSL:      /mnt/c/Users/hovoo/Documents/claude-projects

사용처:
  ✅ Obsidian (Windows)  → pkm vault
  ✅ Claude Code (WSL)   → 자동화, 스크립트
  ✅ Git (WSL)           → push/pull 동기화
```

**중요**: 별도로 clone하지 마세요! 하나의 저장소를 공유합니다.

## 📋 초기 설정

### 1단계: Windows에서 Clone (이미 완료)

```powershell
# Windows PowerShell
cd C:\Users\hovoo\Documents
git clone https://github.com/Rhim80/claude-projects.git
```

### 2단계: WSL에서 심볼릭 링크 생성

```bash
# WSL Ubuntu에서
# Windows 저장소로 바로 가기 생성
ln -s /mnt/c/Users/hovoo/Documents/claude-projects ~/Projects

# 확인
cd ~/Projects
ls -la
```

### 3단계: WSL에서 Git 설정

```bash
# WSL에서 Git 사용자 정보 설정
git config --global user.name "Rhim80"
git config --global user.email "hovooimi@gmail.com"

# 개행 문자 설정 (Windows 파일과 호환)
git config --global core.autocrlf input

# 확인
git config --global --list
```

### 4단계: Claude Code 설치 (WSL)

```bash
# WSL에서
cd ~/Projects
npm install -g @anthropic/claude-code

# 또는 이미 설치되어 있다면
claude --version
```

## 🔄 일상 워크플로우

### 패턴 A: Obsidian 노트 작성 → Git 동기화

```bash
# 1. Obsidian (Windows)에서 노트 작성
#    C:\Users\hovoo\Documents\claude-projects\pkm

# 2. WSL에서 Git 동기화
cd ~/Projects  # 또는 /mnt/c/Users/hovoo/Documents/claude-projects
git status
git add pkm/
git commit -m "노트 작성"
git push

# 3. Mac에서 동기화
# (Mac에서 git pull 하면 동일한 노트 확인 가능)
```

### 패턴 B: Claude Code 작업 → 자동 반영

```bash
# 1. WSL에서 Claude Code 실행
cd ~/Projects
claude

# 2. Claude Code로 파일 수정
#    (예: n8n 워크플로우 생성, 스크립트 작성 등)

# 3. Obsidian이 자동으로 변경 감지
#    별도 작업 불필요 (같은 파일시스템 공유)

# 4. Git 커밋
git add .
git commit -m "Claude Code로 자동화 추가"
git push
```

### 패턴 C: Mac 작업 → Windows 동기화

```bash
# Mac에서 작업 후 push하면

# WSL에서 동기화
cd ~/Projects
git pull

# Obsidian이 자동으로 변경사항 반영
# (Vault 새로고침 또는 재시작)
```

## ⚙️ 추가 설정

### WSL에서 파일 권한 문제 방지

```bash
# /etc/wsl.conf 파일 생성/편집
sudo nano /etc/wsl.conf

# 다음 내용 추가
[automount]
options = "metadata,umask=22,fmask=11"

# WSL 재시작 (PowerShell에서)
# wsl --shutdown
```

### Git 인증 공유 (선택사항)

Windows Git Credential Manager를 WSL과 공유:

```bash
# WSL에서
git config --global credential.helper "/mnt/c/Program\ Files/Git/mingw64/bin/git-credential-manager.exe"
```

또는 WSL에서 독립적으로 인증:

```bash
# WSL에서 GitHub CLI 설치
sudo apt update
sudo apt install gh

# GitHub 로그인
gh auth login
```

## 🎨 Obsidian 설정

### Vault 위치

```
C:\Users\hovoo\Documents\claude-projects\pkm
```

### 자동 새로고침

Obsidian Settings → Files & Links:
- ✅ Automatically update internal links
- ✅ Detect all file extensions

## 📊 디렉토리 구조 확인

### Windows에서 보이는 구조

```
C:\Users\hovoo\Documents\claude-projects\
├── pkm\                    # Obsidian vault
│   ├── 00_Inbox\
│   ├── 01_Projects\
│   └── ...
├── education\
├── imi-work-osmu\
└── .git\
```

### WSL에서 보이는 구조 (동일)

```bash
cd ~/Projects  # 또는 /mnt/c/Users/hovoo/Documents/claude-projects
ls -la

# 출력 동일:
# pkm/
# education/
# imi-work-osmu/
# .git/
```

## ⚠️ 주의사항

### 1. 파일 잠금 충돌 방지

```
❌ 동시에 작업하지 말 것:
   - Obsidian에서 파일 A 편집 중
   - WSL Claude Code에서 동일한 파일 A 수정

✅ 권장:
   - Obsidian → 노트 작성 전용
   - Claude Code → 자동화, 스크립트 전용
   - 다른 파일 작업
```

### 2. Git 커밋 전 확인

```bash
# 항상 status 확인 후 커밋
git status

# 의도하지 않은 파일 제외
git reset pkm/.obsidian/workspace.json
```

### 3. 성능 고려

WSL에서 Windows 파일시스템(`/mnt/c/...`)에 접근하면 약간 느릴 수 있습니다.
- **Obsidian**: 영향 없음 (네이티브 Windows)
- **Claude Code**: 대부분 작업은 문제없음
- **대용량 파일**: 가능하면 WSL 네이티브 경로 사용

## 🐛 트러블슈팅

### Obsidian이 변경사항을 감지하지 못함

```
1. Obsidian 재시작
2. Vault 닫았다가 다시 열기
3. Settings → Files & Links → "Automatically update internal links" 확인
```

### WSL에서 파일 권한 에러

```bash
# WSL 파일 권한 확인
ls -la /mnt/c/Users/hovoo/Documents/claude-projects

# 권한 이상하면 /etc/wsl.conf 설정 확인
cat /etc/wsl.conf
```

### Git push 인증 실패 (WSL)

```bash
# GitHub CLI로 재인증
gh auth login

# 또는 Windows Credential Manager 사용
git config --global credential.helper "/mnt/c/Program\ Files/Git/mingw64/bin/git-credential-manager.exe"
```

### 심볼릭 링크 깨짐

```bash
# 링크 확인
ls -la ~/Projects

# 재생성
rm ~/Projects
ln -s /mnt/c/Users/hovoo/Documents/claude-projects ~/Projects
```

## 📚 관련 문서

- [Windows 설정 가이드](../pkm/WINDOWS_SETUP.md)
- [Mac-Windows Git 동기화](./SYNC_GUIDE.md)
- [Obsidian 동기화 가이드](../pkm/OBSIDIAN_SYNC_GUIDE.md)

## 🎯 요약

```
하나의 저장소: C:\Users\hovoo\Documents\claude-projects

접근 방법:
  Windows:  C:\Users\hovoo\Documents\claude-projects
  WSL:      ~/Projects → /mnt/c/Users/hovoo/Documents/claude-projects

도구 역할:
  Obsidian (Windows)  → 노트 작성/관리
  Claude Code (WSL)   → 자동화/스크립트
  Git (WSL)           → Mac과 동기화

결과:
  ✅ 중복 없음
  ✅ 실시간 동기화
  ✅ 단일 진실 공급원
```
