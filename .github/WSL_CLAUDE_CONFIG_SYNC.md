# WSL에서 Claude Config 동기화 가이드

> `.claude` 설정을 Mac과 Windows WSL 간 git으로 동기화하는 방법

## 📋 현재 상황

### Mac
```bash
~/.claude/  ← Git 저장소 (https://github.com/Rhim80/claude-config.git)
  ├── .git/
  ├── CLAUDE.md
  ├── agents/
  ├── commands/
  └── settings.json
```

### Windows WSL (목표)
```bash
~/.claude/  ← 동일한 Git 저장소 clone
  ├── .git/
  ├── CLAUDE.md
  ├── agents/
  ├── commands/
  └── settings.json
```

---

## 🚀 설정 방법

### 1단계: 기존 `.claude` 폴더 확인

```bash
# WSL Ubuntu에서
ls -la ~/.claude/

# 출력 예시:
# 1. 폴더 없음 → 바로 2단계로
# 2. 폴더 있음 → 백업 후 진행
```

### 2단계: 기존 설정 백업 (있는 경우만)

```bash
# 기존 설정이 있으면 백업
if [ -d ~/.claude ]; then
    mv ~/.claude ~/.claude.backup.$(date +%Y%m%d_%H%M%S)
    echo "기존 .claude 폴더를 백업했습니다"
fi
```

### 3단계: Claude Config 저장소 Clone

```bash
# Mac과 동일한 설정 clone
git clone https://github.com/Rhim80/claude-config.git ~/.claude

# 확인
ls -la ~/.claude/
cd ~/.claude
git remote -v
# origin  https://github.com/Rhim80/claude-config.git (fetch)
# origin  https://github.com/Rhim80/claude-config.git (push)
```

### 4단계: 환경별 설정 파일 생성

`settings.local.json`은 환경별로 다르므로 git에서 제외됩니다:

```bash
# WSL 전용 로컬 설정 생성
cat > ~/.claude/settings.local.json <<'EOF'
{
  "environment": "windows-wsl",
  "workingDirectory": "/mnt/c/Users/hovoo/Documents/claude-projects"
}
EOF
```

### 5단계: Git 설정

```bash
cd ~/.claude

# Git 사용자 정보 (아직 안 했다면)
git config --global user.name "Rhim80"
git config --global user.email "hovooimi@gmail.com"

# 현재 브랜치 확인
git branch
# * main
```

---

## 🔄 일상 동기화 워크플로우

### Mac에서 설정 변경 → WSL 동기화

```bash
# Mac에서
cd ~/.claude
# agents 추가, commands 수정 등
git add .
git commit -m "Add new agent"
git push

# WSL에서
cd ~/.claude
git pull
```

### WSL에서 설정 변경 → Mac 동기화

```bash
# WSL에서
cd ~/.claude
# 설정 변경
git add .
git commit -m "Update WSL commands"
git push

# Mac에서
cd ~/.claude
git pull
```

---

## 🎯 통합 워크플로우 (Projects + Claude Config)

### Mac 작업 완료 후

```bash
# 1. Projects 저장소 동기화
cd ~/Projects
git add .
git commit -m "작업 내용"
git push

# 2. Claude 설정 동기화 (변경 있으면)
cd ~/.claude
git add .
git commit -m "설정 업데이트"
git push
```

### WSL 작업 시작 전

```bash
# 1. Projects 저장소 동기화
cd ~/Projects
git pull

# 2. Claude 설정 동기화
cd ~/.claude
git pull
```

---

## ⚙️ .gitignore 설정 확인

`.claude/.gitignore`에 환경별 파일 제외 확인:

```bash
cd ~/.claude
cat .gitignore
```

필수 제외 항목:
```
settings.local.json
history.jsonl
shell-snapshots/
todos/
debug/
*.log
.DS_Store
```

---

## 🔧 설정 파일 구조

### 공유되는 설정 (Git 관리)
```
~/.claude/
├── CLAUDE.md              # 사용자 컨텍스트 (공유)
├── agents/                # 서브에이전트 (공유)
├── commands/              # 커맨드 (공유)
├── scripts/               # 스크립트 (공유)
└── settings.json          # 기본 설정 (공유)
```

### 환경별 설정 (Git 제외)
```
~/.claude/
├── settings.local.json    # 환경별 설정 (제외)
├── history.jsonl          # 히스토리 (제외)
├── shell-snapshots/       # 스냅샷 (제외)
└── todos/                 # 할일 (제외)
```

---

## 🎨 Windows VS Code에서 Claude Code 실행

### 설정 완료 후 확인

1. **VS Code 실행**
2. **프로젝트 열기**: `C:\Users\hovoo\Documents\claude-projects`
3. **Claude Code 실행**: `Ctrl + Shift + P` → "Claude Code: Start"
4. **설정 확인**:
   ```
   Claude Code가 ~/.claude/CLAUDE.md를 읽음
   Custom agents, commands 자동 로드
   ```

### 환경 변수 확인 (필요시)

```powershell
# PowerShell에서
$env:CLAUDE_CODE_GIT_BASH_PATH
# 출력: C:\Program Files\Git\bin\bash.exe
```

---

## 🐛 트러블슈팅

### 문제 1: Git push 권한 에러

```bash
# GitHub 인증 설정
cd ~/.claude

# 옵션 1: GitHub CLI
gh auth login

# 옵션 2: Windows Credential Manager 공유
git config --global credential.helper "/mnt/c/Program\ Files/Git/mingw64/bin/git-credential-manager.exe"
```

### 문제 2: 설정이 적용 안 됨

```bash
# Claude Code 재시작 필요
# VS Code 또는 터미널에서 Claude Code 종료 후 다시 실행

# 설정 파일 확인
cat ~/.claude/settings.json
cat ~/.claude/settings.local.json
```

### 문제 3: Mac과 WSL 설정 충돌

```bash
# 공유해야 하는 설정: CLAUDE.md, agents/, commands/
# 환경별 설정: settings.local.json

# 충돌 해결
cd ~/.claude
git status
git diff
# 필요시 수동 병합
```

### 문제 4: 심볼릭 링크 문제

```bash
# .claude 폴더는 심볼릭 링크로 만들지 마세요!
# WSL 네이티브 경로에 실제 clone 필요

# 확인
ls -la ~/.claude
# drwxr-xr-x (디렉토리여야 함)
# lrwxrwxrwx (심볼릭 링크 안 됨!)
```

---

## 📊 최종 확인 체크리스트

### ✅ 완료 확인

- [ ] `ls ~/.claude/.git` 존재 확인
- [ ] `cd ~/.claude && git remote -v` 에서 claude-config.git 확인
- [ ] `cat ~/.claude/CLAUDE.md` 내용 확인 (Mac과 동일)
- [ ] `ls ~/.claude/agents/` 에이전트 목록 확인
- [ ] `git pull` 정상 작동
- [ ] `git push` 정상 작동 (테스트 커밋)
- [ ] VS Code에서 Claude Code 실행 시 설정 로드 확인

### 🎊 성공 시 구조

```
Mac:           ~/.claude (Git 저장소)
   ↕ git push/pull
GitHub:        github.com/Rhim80/claude-config
   ↕ git push/pull
Windows WSL:   ~/.claude (Git 저장소)

Projects:      ~/Projects → /mnt/c/Users/hovoo/.../claude-projects
Claude Config: ~/.claude (WSL 네이티브 경로)

결과:
  - Mac과 WSL이 동일한 Claude 설정 공유
  - Agents, Commands 자동 동기화
  - 환경별 설정은 독립적으로 관리
```

---

## 🎯 핵심 정리

### Projects vs Claude Config

| 저장소 | 위치 (WSL) | 이유 |
|--------|-----------|------|
| **Projects** | `/mnt/c/.../claude-projects` | Obsidian과 공유 필요 |
| **Claude Config** | `~/.claude` (WSL 네이티브) | WSL 전용, Windows 접근 불필요 |

### 동기화 패턴

```bash
# 작업 시작 전 (WSL)
cd ~/Projects && git pull       # 프로젝트 동기화
cd ~/.claude && git pull        # 설정 동기화

# 작업 완료 후 (WSL)
cd ~/Projects && git push       # 프로젝트 푸시
cd ~/.claude && git push        # 설정 푸시 (변경 시)
```

---

**이제 Mac과 Windows WSL에서 동일한 Claude Code 환경을 사용할 수 있습니다!** 🎊
