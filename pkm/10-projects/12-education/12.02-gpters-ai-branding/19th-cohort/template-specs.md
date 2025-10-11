# imi-working-backwards 템플릿 상세 스펙

**작성일**: 2025-10-10
**저장소**: https://github.com/hovoo/imi-working-backwards
**용도**: GPTers 19기 Working Backwards 스터디

---

## 📁 전체 폴더 구조

```
imi-working-backwards/
├── 00_Inbox/
│   └── project-ideas.md
│
├── 01_Projects/
│   └── my-working-backwards-project/
│       ├── pr-document.md
│       ├── faq.md
│       ├── todo-roadmap.md
│       ├── customer-research/
│       │   ├── interview-01.md
│       │   ├── interview-02.md
│       │   └── interview-template.md
│       ├── daily-progress/
│       │   ├── 2025-10-21.md
│       │   └── daily-template.md
│       └── final-presentation/
│           └── presentation.md
│
├── 06_Metadata/
│   └── templates/
│       ├── pr-template.md
│       ├── faq-template.md
│       ├── interview-template.md
│       └── daily-log-template.md
│
├── .claude/
│   ├── CLAUDE.md
│   └── commands/
│       ├── working-backwards-pr.md
│       ├── thinking-partner.md
│       ├── daily-review.md
│       └── generate-todo-roadmap.md
│
├── README.md
├── package.json
└── .gitignore
```

---

## 📄 핵심 파일 상세 내용

### 1. `.claude/CLAUDE.md`

```markdown
# GPTers 19기 창업.BM 스터디 컨텍스트

## 스터디 개요
- **주제**: Working Backwards 방법론으로 프로젝트 구체화
- **기간**: 4주
- **스터디장**: hovoo (이미커피 대표), 진여진 (공동 스터디장)
- **도구**: Claude Code + Obsidian

## Working Backwards란?
Amazon이 사용하는 제품 개발 방법론:
1. **미래의 성공**을 먼저 상상 (보도자료 작성)
2. **거꾸로** 필요한 단계 도출
3. **고객 관점**에서 사고

## 참가자 역할
당신은 자신의 프로젝트/제품/서비스를 구체화하려는 창업가입니다.
- 명확한 아이디어가 없어도 괜찮습니다
- AI가 사고 파트너 역할을 합니다
- 4주 안에 "이거 진짜 될 것 같다" 확신을 얻는 것이 목표

## AI 작업 모드

### Thinking Mode (기본)
- 즉시 답 주지 않기
- 질문으로 사고 촉진
- 모순점 발견
- `/thinking-partner` 명령어

### Writing Mode
- 구체적 문서 작성
- PR, FAQ 초안 생성
- `/working-backwards-pr` 명령어

## 4주 마일스톤
- Week 1: PR 초안 + FAQ 초안
- Week 2: PR 2.0 + TODO 로드맵
- Week 3: 중간 실행 결과
- Week 4: 최종 발표 + 지속 가능한 시스템

## 중요한 원칙
1. **사고 과정을 기록**하세요 (daily-progress/)
2. **완벽 추구 금지** - 반복 개선이 핵심
3. **고객 관점** 잊지 말기
4. **AI는 도구**, 최종 결정은 당신
```

---

### 2. `.claude/commands/working-backwards-pr.md`

```markdown
---
description: Amazon Working Backwards 방식으로 보도자료 초안 생성
---

당신은 Amazon Working Backwards 전문가입니다.
사용자의 프로젝트 아이디어를 듣고 "출시 성공 시점"의 보도자료를 작성합니다.

## 단계별 프로세스

1. **프로젝트 이해하기**
   "어떤 문제를 해결하려고 하시나요?" (깊게 질문)

2. **타겟 고객 확인**
   "누구를 위한 건가요? 구체적으로 어떤 사람인가요?"

3. **성공 상상하기**
   "1년 후 이게 대성공했다고 가정하면, 무슨 일이 일어났을까요?"

4. **보도자료 작성**
   - 제목: 고객 혜택 중심
   - 부제: 구체적인 가치 제안
   - 본문 (300-500자):
     * 문제 정의
     * 솔루션 소개
     * 핵심 기능 3가지
     * 고객 추천사 (가상)
     * CTA (Call to Action)

5. **FAQ 초안 (5-10개)**
   - 어려운 질문 포함
   - "이건 어떻게 할 건데?" 스타일

## 출력 형식

\`\`\`markdown
# [프로젝트명] 보도자료

## [임팩트 있는 제목]
[부제: 구체적 가치 제안]

[본문 300-500자]

## FAQ

1. Q: [어려운 질문]
   A: [솔직한 답변 또는 "아직 모름"]

...
\`\`\`

## 중요 원칙
- **고객 언어** 사용 (기술 용어 최소화)
- **구체적 숫자** 포함 ("많은" → "3배 빠른")
- **완벽하지 않아도 OK** (초안의 목적은 사고 촉진)
```

---

### 3. `.claude/commands/generate-todo-roadmap.md`

```markdown
---
description: PR/FAQ 기반으로 역순 TODO 로드맵 생성
---

당신은 프로젝트 기획 전문가입니다.
완성된 PR 문서를 읽고 "어떻게 여기까지 도달할 수 있을지" 역순으로 계획을 세웁니다.

## 입력
- `01_Projects/my-working-backwards-project/pr-document.md`
- `01_Projects/my-working-backwards-project/faq.md`

## 출력: `todo-roadmap.md`

### 구조

\`\`\`markdown
# [프로젝트명] TODO 로드맵

> 생성일: YYYY-MM-DD
> 기반: PR v[버전]

## 🎯 최종 목표 (PR에서)
[PR의 핵심 목표 1문장 요약]

## 📅 단기 계획 (4주)
**목표:** MVP 테스트 또는 고객 검증

Week 1:
- [ ] [구체적 태스크]
- [ ] [구체적 태스크]

Week 2:
- [ ] [구체적 태스크]

Week 3:
- [ ] [구체적 태스크]

Week 4:
- [ ] [최종 발표 준비]

## 📅 중기 계획 (3개월)
**목표:** 실제 출시 준비

Month 1:
- [ ] [마일스톤]

Month 2:
- [ ] [마일스톤]

Month 3:
- [ ] [출시]

## 📅 장기 계획 (1년)
**목표:** 확장 및 성장

Q1:
- [ ] [목표]

Q2-Q4:
- [ ] [확장 계획]

## ⚠️ 위험 요소 (FAQ 기반)
1. [FAQ의 어려운 질문] → 해결 방안: [...]
2. [FAQ의 어려운 질문] → 해결 방안: [...]

## 📊 성공 지표
- 4주 후: [측정 가능한 지표]
- 3개월 후: [측정 가능한 지표]
- 1년 후: [측정 가능한 지표]
\`\`\`

## 중요 원칙
- **실행 가능한** 태스크 (모호한 표현 금지)
- **측정 가능한** 성공 지표
- **위험 요소** 명시 (낙관 금지)
- **4주 계획**이 가장 구체적이어야 함
```

---

### 4. `.claude/commands/thinking-partner.md`

```markdown
---
description: 아이디어 탐색 및 사고 촉진 (즉시 답변하지 않고 질문으로 유도)
---

당신은 협업 사고 파트너입니다.
복잡한 문제를 탐색하도록 돕되, 즉시 해결책을 제시하지 않습니다.

## 핵심 행동

1. **답하기 전에 질문하기**
   - 이해를 명확히 하고 깊이를 더하는 질문

2. **인사이트 추적**
   - 주요 발견 및 연결점 기록

3. **솔루션 지향 거부**
   - 명시적 요청 전까지 탐색 모드 유지

4. **아이디어 연결**
   - 다양한 노트 간 패턴 및 관계 식별

5. **가정 표면화**
   - 암묵적 믿음과 가정에 부드럽게 도전

## 워크플로우

1. 주제나 과제 이해
2. 볼트에서 관련 기존 노트 검색
3. 3-5개 명확화 질문
4. 대화가 발전하면서:
   - 핵심 인사이트 기록
   - 다른 아이디어와의 연결 식별
   - 열린 질문 추적
   - 탐색할 잠재적 방향 기록
5. 주기적으로 떠오르는 것 요약

## 주요 프롬프트

- "그 생각의 이면은 무엇인가요?"
- "이것이 [다른 개념]과 어떻게 연결되나요?"
- "반대의 경우는 어떻게 생겼을까요?"
- "여기서 진짜 도전 과제는 무엇인가요?"
- "우리가 고려하지 않은 것은 무엇인가요?"

## 기억하기

목표는 답을 갖는 것이 아니라 발견하는 것입니다.
당신의 가치는 해결 속도가 아닌 탐색의 질에 있습니다.
```

---

### 5. `.claude/commands/daily-review.md`

```markdown
---
description: 일일 진행 상황 리뷰 및 요약
---

당신은 프로젝트 진행 상황을 추적하는 도우미입니다.
오늘 무엇을 했는지, 무엇을 배웠는지, 내일 무엇을 할지 정리합니다.

## 단계별 프로세스

1. **오늘 한 일 확인**
   - `daily-progress/` 폴더에서 오늘 날짜 파일 읽기
   - Git 커밋 히스토리 확인 (가능하면)
   - 변경된 파일 목록 확인

2. **요약 생성**
   \`\`\`markdown
   # Daily Review - YYYY-MM-DD

   ## 오늘 한 일
   - [구체적 작업 1]
   - [구체적 작업 2]
   - [구체적 작업 3]

   ## 배운 점
   - [인사이트 1]
   - [인사이트 2]

   ## 어려웠던 점
   - [막힌 부분 1]
   - [막힌 부분 2]

   ## 내일 할 일
   - [ ] [우선순위 1]
   - [ ] [우선순위 2]
   - [ ] [우선순위 3]
   \`\`\`

3. **자동 저장**
   - `daily-progress/YYYY-MM-DD.md`에 저장
   - 기존 파일이 있으면 추가

## 질문 프롬프트

- "오늘 가장 중요한 진전은 무엇이었나요?"
- "예상치 못한 발견은 없었나요?"
- "내일 우선순위는 무엇인가요?"
```

---

### 6. `06_Metadata/templates/pr-template.md`

```markdown
# [프로젝트명] 보도자료

> 작성일: YYYY-MM-DD
> 버전: 0.1
> 출시 예정일 (가상): YYYY-MM-DD

---

## [임팩트 있는 제목]
**[부제: 30자 이내 가치 제안]**

---

### 문제 정의
[타겟 고객이 겪는 고통, 구체적으로]

### 솔루션 소개
[우리 제품/서비스가 어떻게 해결하는지]

### 핵심 기능
1. **[기능 1]**: [고객 혜택]
2. **[기능 2]**: [고객 혜택]
3. **[기능 3]**: [고객 혜택]

### 고객 추천사 (가상)
> "[구체적이고 감정적인 추천사]"
> — [가상의 고객 이름, 직업]

### 지금 시작하기
[CTA: 고객이 다음에 할 행동]

---

## 작성 팁
- **고객 언어** 사용 (내부 용어 금지)
- **구체적 숫자** 포함
- **감정적 임팩트** 담기
- **A4 1장** 이내로
```

---

### 7. `06_Metadata/templates/faq-template.md`

```markdown
# [프로젝트명] FAQ

> 작성일: YYYY-MM-DD
> 버전: 0.1
> 기반: PR 문서 v[버전]

---

## 기본 질문

### 1. 이것이 정확히 무엇인가요?
[30자 이내 간단 설명]

### 2. 누구를 위한 건가요?
[타겟 고객 구체적 페르소나]

### 3. 왜 필요한가요?
[현재 문제점 + 솔루션의 가치]

---

## 어려운 질문 (Working Backwards의 핵심)

### 4. 이미 비슷한 게 있지 않나요?
[경쟁사와의 차별점]

### 5. 이걸 어떻게 만들 건가요?
[기술적 실현 가능성]

### 6. 돈은 어떻게 벌 건가요?
[수익 모델]

### 7. 고객이 정말 돈을 낼까요?
[가격 책정 + 지불 의향 근거]

### 8. 가장 큰 위험은 무엇인가요?
[솔직한 리스크 인정 + 완화 방안]

---

## 추가 질문

### 9. [프로젝트 특화 질문]
[답변]

### 10. [프로젝트 특화 질문]
[답변]

---

## FAQ 작성 팁
- **어려운 질문**을 회피하지 마세요
- "아직 모른다"고 답해도 괜찮습니다
- FAQ가 많을수록 아이디어가 구체화됩니다
```

---

### 8. `06_Metadata/templates/interview-template.md`

```markdown
# 고객 인터뷰 - [인터뷰 대상자명]

> 인터뷰 날짜: YYYY-MM-DD
> 인터뷰 방식: 대면 / 전화 / 화상
> 소요 시간: XX분

---

## 인터뷰 대상자 정보
- **이름**: [익명 처리 가능]
- **나이/성별**:
- **직업**:
- **관련 경험**:

---

## 인터뷰 질문 및 답변

### 1. 문제 확인
**Q: 현재 [문제 영역]에서 어떤 어려움을 겪고 계신가요?**

A:

**Q: 이 문제가 얼마나 자주 발생하나요?**

A:

**Q: 현재 어떻게 해결하고 계신가요?**

A:

---

### 2. 솔루션 반응
**Q: [우리 솔루션]에 대해 어떻게 생각하시나요?**

A:

**Q: 이게 있다면 사용하시겠어요?**

A:

**Q: 얼마 정도면 적정하다고 생각하시나요?**

A:

---

### 3. 추가 인사이트
**Q: 우리가 놓친 부분이 있을까요?**

A:

**Q: 누구에게 추천하시겠어요?**

A:

---

## 핵심 인사이트
- [발견 1]
- [발견 2]
- [발견 3]

## 다음 액션
- [ ] [인사이트 기반 다음 단계]
```

---

### 9. `06_Metadata/templates/daily-log-template.md`

```markdown
# Daily Progress - YYYY-MM-DD

> 작성 시간: HH:MM

---

## 오늘의 목표
- [ ] [목표 1]
- [ ] [목표 2]
- [ ] [목표 3]

---

## 실제 한 일

### 오전
- [작업 1]
- [작업 2]

### 오후
- [작업 1]
- [작업 2]

---

## 배운 점 / 인사이트
- [인사이트 1]
- [인사이트 2]

---

## 어려웠던 점 / 막힌 부분
- [문제 1]: [시도한 해결 방법]
- [문제 2]: [아직 해결 못함]

---

## 내일 할 일
- [ ] [우선순위 1]
- [ ] [우선순위 2]
- [ ] [우선순위 3]

---

## 메모 / 빠른 아이디어
-
```

---

### 10. `README.md`

```markdown
# imi-working-backwards

> GPTers 19기 창업.BM 스터디용 Working Backwards 템플릿
> Amazon의 PR/FAQ 방법론을 Claude Code + Obsidian에서 실행

---

## 🚀 빠른 시작

### 1. 템플릿 다운로드
\`\`\`bash
git clone https://github.com/hovoo/imi-working-backwards.git my-project
cd my-project
\`\`\`

### 2. Claude Code 열기
\`\`\`bash
claude code
\`\`\`

### 3. PR 작성 시작
\`\`\`bash
> /working-backwards-pr
\`\`\`

AI가 질문하며 함께 보도자료를 작성합니다.

---

## 📁 폴더 구조

- `00_Inbox/`: 빠른 아이디어 메모
- `01_Projects/my-working-backwards-project/`: 메인 작업 공간
  - `pr-document.md`: 보도자료
  - `faq.md`: 자주 묻는 질문
  - `todo-roadmap.md`: 실행 계획
  - `customer-research/`: 고객 인터뷰
  - `daily-progress/`: 일일 기록
- `06_Metadata/templates/`: 템플릿 모음

---

## 🛠 주요 명령어

### `/working-backwards-pr`
Amazon 스타일 보도자료 작성

### `/thinking-partner`
아이디어 탐색 및 사고 촉진

### `/generate-todo-roadmap`
PR 기반 실행 계획 생성

### `/daily-review`
오늘 진행 상황 요약

---

## 📝 4주 워크플로우

### Week 1
1. 템플릿 다운로드 및 설정
2. `/working-backwards-pr`로 PR 초안 작성
3. `daily-progress/`에 사고 과정 기록

### Week 2
1. PR 발표 및 피드백 반영
2. `/generate-todo-roadmap`로 실행 계획 수립
3. 4주 계획 착수

### Week 3
1. 중간 점검 및 진행 상황 공유
2. 어려운 부분 함께 해결
3. MVP 또는 고객 테스트

### Week 4
1. 최종 발표 준비
2. 배운 점 정리
3. 다음 3개월 계획 수립

---

## ❓ 문제 해결

### Claude Code가 안 열려요
\`\`\`bash
# Claude CLI 재설치
npm install -g @anthropic-ai/claude-cli
\`\`\`

### Git이 처음이에요
GitHub Desktop 사용 추천: https://desktop.github.com

### 기술적 문제
- GPTers 커뮤니티
- 공동 스터디장 진여진님

---

## 📚 참고 자료

- [Amazon Working Backwards 가이드](링크)
- [Noah Brier의 Claudesidian](https://github.com/heyitsnoah/claudesidian)
- [GPTers 커뮤니티](링크)

---

Made with ❤️ by hovoo & 진여진
```

---

### 11. `.gitignore`

```
# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Obsidian
.obsidian/

# Personal
*.private.md
/00_Inbox/*.md

# Logs
npm-debug.log*
```

---

### 12. `package.json` (선택사항)

```json
{
  "name": "imi-working-backwards",
  "version": "1.0.0",
  "description": "Amazon Working Backwards template for Claude Code + Obsidian",
  "scripts": {
    "init": "node scripts/init-project.js"
  },
  "keywords": [
    "working-backwards",
    "amazon",
    "pr-faq",
    "claude-code",
    "obsidian"
  ],
  "author": "hovoo",
  "license": "MIT"
}
```

---

## 🎯 다음 단계

### 즉시 실행 (hovoo님)
1. [ ] GitHub 저장소 생성
2. [ ] 기본 폴더 구조 생성
3. [ ] README.md 작성
4. [ ] `.claude/CLAUDE.md` 작성

### Week 1 전 (hovoo + 진여진님)
5. [ ] 모든 커스텀 명령어 작성 및 테스트
6. [ ] 템플릿 파일 작성
7. [ ] 실제 프로젝트로 테스트

---

**문서 위치**: `/Users/rhim/Projects/education/gpters-ai-branding-study/19th-cohort/template-specs.md`

## Related Notes
- [[learning-roadmap]] - 높은 연관성
- [[pkm-sustainability]] - 높은 연관성
- [[personal-tone-version]] - 높은 연관성
- [[system-vs-tool-master]] - 높은 연관성
- [[final-seo-version]] - 높은 연관성
- [[menu-development-hub]] - 높은 연관성
- [[business-operations-hub]] - 높은 연관성
