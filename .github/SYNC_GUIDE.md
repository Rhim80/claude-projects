# Mac-Windows WSL Git 동기화 가이드

이 저장소는 **Mac (주 작업환경)**과 **Windows WSL (사무실 PC)** 두 환경에서 동시에 사용됩니다.

## 🔄 동기화 워크플로우

### Mac에서 작업 완료 후
```bash
# 변경사항 확인
git status

# 커밋 전 체크리스트
# ✅ 새로 추가한 폴더에 .git 디렉토리가 없는지 확인
find . -name ".git" -type d -not -path "./.git"

# 만약 .git이 발견되면 제거
rm -rf [폴더명]/.git

# 정상적으로 커밋 & 푸시
git add .
git commit -m "작업 내용"
git push
```

### Windows WSL에서 동기화
```bash
# 최신 변경사항 가져오기
git pull

# 문제 발생 시 상태 확인
git status
git submodule status  # submodule 관련 이슈 확인
```

## ⚠️ 주의사항

### 1. Submodule 방지
- **새 폴더를 추가할 때**: 반드시 내부에 `.git` 디렉토리가 없는지 확인
- `.git`이 있으면 git이 자동으로 submodule로 인식
- submodule은 `.gitmodules` 파일로 관리되어야 하며, 그렇지 않으면 동기화 실패

### 2. 다른 git 저장소를 복사할 때
```bash
# ❌ 잘못된 방법
cp -r /path/to/other-git-repo ./new-folder

# ✅ 올바른 방법 (1) - .git 제거
cp -r /path/to/other-git-repo ./new-folder
rm -rf ./new-folder/.git

# ✅ 올바른 방법 (2) - 파일만 복사
rsync -av --exclude='.git' /path/to/other-git-repo/ ./new-folder/
```

### 3. 정기 동기화 습관
- **Mac 작업 완료 시**: 즉시 commit & push
- **Windows WSL 작업 시작 전**: git pull 먼저 실행
- **충돌 발생 시**: Mac에서 해결 후 push (Mac이 주 환경)

## 🐛 트러블슈팅

### "No url found for submodule" 에러
```bash
# 1. submodule로 잘못 추가된 디렉토리 확인
git ls-files -s | grep 160000

# 2. submodule 참조 제거
git rm --cached [폴더명]

# 3. .git 디렉토리 제거
rm -rf [폴더명]/.git

# 4. 일반 디렉토리로 다시 추가
git add [폴더명]
git commit -m "Fix: convert submodule to normal directory"
git push
```

### Windows WSL에서 pull 실패 시
```bash
# 1. 현재 상태 백업
git stash

# 2. 강제로 원격 상태와 동기화
git fetch origin
git reset --hard origin/main

# 3. 백업한 변경사항 복원 (필요시)
git stash pop
```

## 📋 체크리스트

작업 시작 전:
- [ ] Windows WSL: `git pull` 실행
- [ ] 최신 상태 확인

작업 완료 후 (Mac):
- [ ] `find . -name ".git" -type d -not -path "./.git"` 실행
- [ ] .git 발견 시 제거
- [ ] commit & push
- [ ] Windows WSL에서 `git pull` 테스트

## 🔗 관련 문서
- [Git Submodules 공식 문서](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
- 문제 발생 시: Claude Code에 이 가이드와 함께 문의
