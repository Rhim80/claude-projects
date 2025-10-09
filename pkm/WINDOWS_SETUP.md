# Windows에서 PKM Vault 설정 가이드

WSL 파일시스템에서 Windows Obsidian을 직접 실행하면 "EISDIR: illegal operation on a directory" 에러가 발생합니다.

## 🎯 권장 방법: Windows 경로에 Clone

### 1단계: Windows에 저장소 Clone

```powershell
# PowerShell 또는 Git Bash에서
cd C:\Users\[YourUsername]\Documents

# 저장소 복제
git clone https://github.com/Rhim80/claude-projects.git

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
