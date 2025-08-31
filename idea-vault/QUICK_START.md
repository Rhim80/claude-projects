# 🚀 빠른 시작 가이드

## ⚡ 1분만에 시작하기

### 방법 1: 스크립트 사용 (추천)
```bash
# idea-vault 폴더로 이동
cd /Users/rhim/Projects/idea-vault

# 빠른 메모 스크립트 실행
./quick-note.sh
```

### 방법 2: 직접 파일 생성
```bash
# 오늘 날짜 일일 메모 생성
touch daily-notes/$(date +%Y-%m-%d).md
code daily-notes/$(date +%Y-%m-%d).md
```

### 방법 3: 템플릿 복사
```bash
# 비즈니스 아이디어 템플릿 복사해서 사용
cp business-ideas/TEMPLATE_business.md business-ideas/2025-08-30_my_idea.md
code business-ideas/2025-08-30_my_idea.md
```

---

## 🎯 상황별 사용법

### 📱 갑자기 아이디어가 떠올랐을 때
1. `./quick-note.sh` 실행
2. `1` 선택 (daily notes)
3. 바로 메모 시작!

### 💼 구체적인 비즈니스 아이디어가 있을 때
1. `./quick-note.sh` 실행
2. `2` 선택 (business ideas)
3. 아이디어 제목 입력
4. 템플릿 가이드 따라 작성

### 🎨 고객 행동에서 인사이트를 얻었을 때
1. `./quick-note.sh` 실행
2. `3` 선택 (branding insights)
3. 인사이트 제목 입력
4. 관찰 내용부터 실무 적용까지 체계적 정리

---

## 💡 효과적 사용 팁

### 📝 메모할 때
- **완벽하지 않아도 OK**: 일단 적고 나중에 다듬기
- **키워드 태그 활용**: 나중에 검색하기 쉽게
- **구체적으로 작성**: 나중에 봤을 때 이해할 수 있도록

### 🗂️ 정리할 때
- **주 1회**: daily-notes 내용을 카테고리별로 분류
- **월 1회**: 전체 아이디어 리뷰하고 실행 계획 수립
- **분기 1회**: 체계 자체를 점검하고 개선

### 🔍 찾을 때
```bash
# 특정 키워드 검색
grep -r "브랜딩" /Users/rhim/Projects/idea-vault/
grep -r "#AI" /Users/rhim/Projects/idea-vault/

# 최근 파일들 확인
find /Users/rhim/Projects/idea-vault/ -name "*.md" -mtime -7
```

---

## 🛠️ 커스터마이징

### 폴더 추가하고 싶다면
```bash
mkdir /Users/rhim/Projects/idea-vault/새로운카테고리
```

### 새 템플릿 만들고 싶다면
```bash
# 기존 템플릿 복사해서 수정
cp daily-notes/TEMPLATE_daily.md 새로운카테고리/TEMPLATE_new.md
```

### 스크립트 수정하고 싶다면
```bash
code /Users/rhim/Projects/idea-vault/quick-note.sh
```

---

## 🎊 첫 번째 메모 작성해보기

지금 바로 시작해보세요!

```bash
cd /Users/rhim/Projects/idea-vault
./quick-note.sh
```

**또는 간단히:**
- 지금 이 순간 떠오르는 아이디어가 있다면?
- 오늘 누군가와의 대화에서 영감을 받은 게 있다면?
- 최근에 본 것 중에 "이거 흥미롭네"라고 생각한 게 있다면?

일단 적어두세요! 🌟

---

*작은 아이디어가 큰 혁신이 되는 첫걸음입니다.*