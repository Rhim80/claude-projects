# Obsidian Mac-Windows 동기화 가이드

이 PKM vault는 Mac과 Windows WSL에서 Obsidian으로 동시에 사용 가능하도록 설정되어 있습니다.

## 🔄 공유되는 설정

### ✅ Git으로 공유됨
```
.obsidian/
├── app.json              # 앱 기본 설정 (공유)
├── appearance.json       # 테마/외관 설정 (공유)
├── core-plugins.json     # 활성화된 플러그인 (공유)
├── workspace.json        # ❌ 제외됨 (환경별로 다름)
└── workspace-mobile.json # ❌ 제외됨 (모바일 전용)
```

### ❌ Git에서 제외됨 (.gitignore)
- `workspace.json` - 현재 열린 파일, 패널 레이아웃 (환경마다 다를 수 있음)
- `workspace-mobile.json` - 모바일 레이아웃

## 🖥 Windows WSL에서 Obsidian 설치

### 1. Windows에 Obsidian 설치
```powershell
# Windows에서 Obsidian 다운로드 및 설치
# https://obsidian.md/download
```

### 2. WSL 폴더를 Vault로 열기
```
Obsidian 실행
→ "Open folder as vault" 선택
→ \\wsl$\Ubuntu\home\[username]\Projects\pkm 선택
```

### 3. 첫 실행 시 확인사항
- ✅ 테마 설정 자동 적용됨
- ✅ 활성화된 플러그인 목록 동일함
- ✅ PARA 폴더 구조 그대로 보임
- ⚠️ 마지막 작업 파일은 각 환경마다 다를 수 있음

## 🔧 추천 워크플로우

### Mac에서 작업 완료 후
```bash
cd /Users/rhim/Projects/pkm
git add .
git commit -m "노트 추가/수정"
git push
```

### Windows WSL에서 작업 시작 전
```bash
cd ~/Projects/pkm
git pull
```

### Obsidian 자동 동기화 흐름
```
Mac에서 노트 작성
  ↓
git push
  ↓
Windows WSL에서 git pull
  ↓
Obsidian이 자동으로 변경사항 감지
  ↓
Windows에서 동일한 노트 확인 가능
```

## ⚙️ 플러그인 설치

### Community Plugins 동기화
`.obsidian/community-plugins.json`이 공유되므로:

1. **Mac에서 플러그인 설치**
   - Settings → Community plugins → Browse
   - 플러그인 설치 및 활성화
   - git commit & push

2. **Windows에서 동기화**
   - git pull
   - Obsidian 재시작
   - 동일한 플러그인 목록 자동 표시
   - 각 플러그인 개별 설치 필요 (자동 다운로드 안 됨)

### 플러그인 설정 동기화
`.obsidian/plugins/` 폴더도 git으로 관리되므로 플러그인 설정도 공유됩니다.

## ⚠️ 주의사항

### 1. 동시 편집 방지
- **동일한 파일을 양쪽에서 동시에 편집하지 말 것**
- git pull 전에 항상 현재 변경사항 커밋
- 충돌 발생 시 수동으로 해결해야 함

### 2. Workspace 충돌 방지
- `workspace.json`은 git에서 제외됨
- 각 환경에서 독립적인 레이아웃 유지 가능
- 마지막 작업 파일 위치는 환경마다 다를 수 있음

### 3. 절대 경로 사용 금지
- 노트 내 링크는 항상 **상대 경로** 사용
- 예: `[[01_Projects/project-name/note.md]]` (✅)
- 예: `/Users/rhim/Projects/pkm/...` (❌)

## 🐛 트러블슈팅

### "파일을 찾을 수 없습니다" 에러
```bash
# Windows WSL에서
git pull
# Obsidian 재시작
```

### 플러그인이 작동하지 않음
```
Obsidian Settings
→ Community plugins
→ 해당 플러그인 재설치
```

### Git 충돌 발생 시
```bash
# 1. 현재 변경사항 백업
git stash

# 2. 원격 변경사항 가져오기
git pull

# 3. 백업한 내용 복원 (충돌 수동 해결)
git stash pop
```

## 📚 관련 문서
- [Obsidian 공식 문서](https://help.obsidian.md/)
- [PARA 시스템 가이드](./README.md)
- [Git 동기화 가이드](../.github/SYNC_GUIDE.md)

## Related Notes

- [[40-personal/41-daily/2025-10-09]] - pkm_systems 관련; 00-system ↔ 40-personal 연결
- [[20-operations/22-automation/n8n-workflows-backup/n8n-project/CLAUDE]] - pkm_systems 관련; 00-system ↔ 20-operations 연결
- [[MIGRATION_VALIDATION_REPORT]] - pkm_systems 관련; 00-system ↔ MIGRATION_VALIDATION_REPORT.md 연결
- [[CLAUDE]] - pkm_systems 관련; 00-system ↔ CLAUDE.md 연결
- [[10-projects/12-education/12.02-gpters-ai-branding/19th-cohort/19th-working-backwards-final]] - pkm_systems 관련; 00-system ↔ 10-projects 연결
