# Claude Code로 효과적인 글쓰기 구현하기 - 실제 사례와 해결 방법

## 들어가며

Claude Code로 글쓰기 작업을 3개월간 진행하면서 겪은 템플릿화 문제와 실제 해결 방법을 공유합니다. 이 글은 실제 테스트를 거친 방법만을 다룹니다.

## 1. 문제 상황: Claude Code 글쓰기의 한계

### 1.1 실제 발생한 문제

GPTers 스터디 후기를 작성할 때 발생한 실제 사례:

```markdown
# 문제가 된 출력
15년 전 첫 카페를 열 때의 설렘이 떠오른다.
[...중략...]
GPTers 스터디를 마치며 느낀 것은
카페를 운영하며 배운 교훈과 비슷했다.
그래도 응원은 좀 부탁드린다.
```

**문제점:**
- GPTers 후기에 갑작스런 카페 이야기
- CLAUDE.md 정보 무분별 삽입
- 매번 같은 템플릿 문구 반복

### 1.2 근본 원인

Claude Code의 에이전트 특성:
- 모든 컨텍스트(CLAUDE.md) 정보를 활용하려는 경향
- 과도한 사고 과정으로 단순한 글도 복잡하게 처리
- 한 번 학습한 패턴을 계속 반복

## 2. 실제 해결 방법

### 2.1 서브에이전트 전략

**디렉토리 구조:**
```
~/.claude/agents/
├── sns-essay-writer.md
├── technical-writer.md
└── imi-work-persona-writer.md
```

### 2.2 핵심 서브에이전트 구현

**sns-essay-writer.md 실제 코드:**

```markdown
---
name: sns-essay-writer
description: SNS 에세이 작성 전용 에이전트
model: sonnet
color: green
---

You are a contemplative essay writer specializing in SNS content.

## 📌 CONTEXTUAL RELEVANCE PRINCIPLE (최우선)

### 정보 포함 판단 기준
1. **주제 직접 연관성**: 현재 글의 핵심 주제와 직접 연결되는가?
2. **자연스러운 흐름**: 억지로 끼워넣지 않고 자연스럽게 녹아드는가?
3. **가치 추가**: 독자에게 실제 가치를 제공하는가?

### 판단 프로세스
- CLAUDE.md 정보는 "선택적 활용"
- 매 글마다 새롭게 판단
- 관련 없으면 과감히 제외

### 예시
✅ 카페 창업 글 → 카페 운영 경험 포함
❌ AI 스터디 후기 → 카페 운영 경험 제외

## Style Guidelines

### 시작 방식 다양화
- 시간+상황: "오늘 아침에 일어났는데"
- 사실 선언: "48일간의 팝업이 끝났다"
- 자문: "요즘 내 인스타를 보면"

### ⚠️ 절대 사용 금지
- "그래도 응원은 좀 부탁드린다"
- "늘 이랬지"
- 반복되는 템플릿 표현
```

## 3. 실제 사용 방법

### 3.1 기본 프롬프트 구조

```markdown
# 효과적인 사용법
@sns-essay-writer

GPTers 18기 스터디 완주 후기 작성

주요 내용:
- 스터디장 첫 경험
- "딸깍 너머" 발표 준비
- 참가자 피드백

톤: 담담하고 진솔한
주의: 카페 경험 제외
```

### 3.2 단계별 작업 (수동)

```markdown
# Step 1: 분석
"GPTers 발표 자료의 핵심 메시지 정리해줘"

# Step 2: 초안 작성
@sns-essay-writer
"위 내용으로 후기 작성"

# Step 3: 수정 요청
"템플릿 표현 제거하고 다시 써줘"
```

## 4. 실제 개선 결과

### 4.1 Before
```markdown
15년 전 첫 카페를 열 때의 기억이 새록새록...
[억지로 끼워넣은 비즈니스 정보들]
그래도 응원은 좀 부탁드린다.
```

### 4.2 After
```markdown
어제로 GPTers 18기 AI 브랜딩 스터디가 끝났다.
스터디장으로서는 처음이었는데,
생각보다 많은 걸 배웠고 또 많이 아쉬웠다.
[주제에 집중한 자연스러운 전개]
```

## 5. 실용적인 트러블슈팅

### 문제 1: 여전히 템플릿화된 출력

**해결:**
1. 서브에이전트 .md 파일 직접 수정
2. `/clear` 명령으로 대화 초기화
3. 프롬프트에 명시: "이전과 다른 표현으로"

### 문제 2: CLAUDE.md 정보 과다 포함

**해결:**
```markdown
@sns-essay-writer

주의사항:
- 카페 운영 경험 제외
- 15년 경력 언급 불필요
- 주제에 집중
```

### 문제 3: 매번 같은 구조

**해결:**
- 시작 방식 명시: "시간 묘사로 시작" 또는 "대화로 시작"
- 마무리 지정: "질문으로 끝내기" 또는 "담담하게 마무리"

## 6. 실제 작동하는 워크플로우

### 6.1 수동 체인 방식

```markdown
1. 첫 번째 작업
@technical-writer
"주제 분석 및 핵심 포인트 정리"

2. 결과 복사 → 두 번째 작업
@sns-essay-writer
"위 분석을 바탕으로 SNS 글 작성"

3. 품질 체크 (수동)
- 템플릿 문구 확인
- 불필요한 정보 제거
- 필요시 재작성 요청
```

### 6.2 커스텀 명령어 활용

`.claude/commands/` 폴더에 자주 쓰는 명령 저장:

**write-post.md:**
```markdown
@sns-essay-writer
다음 원칙으로 글 작성:
1. CLAUDE.md 정보는 선택적 활용
2. 템플릿 표현 금지
3. 자연스러운 구어체
$ARGUMENTS
```

사용: `/write-post GPTers 후기`

## 7. 실제 한계와 대안

### Claude Code의 실제 한계

1. **자동화 불가능한 것들:**
   - 에이전트 간 자동 체이닝
   - 품질 메트릭 자동 측정
   - 프로그래밍적 후처리

2. **수동으로 해야 하는 것들:**
   - 단계별 결과 복사/붙여넣기
   - 품질 체크
   - 반복 수정 요청

### 실용적 대안

1. **일반 Claude/ChatGPT 사용 고려:**
   - 단순 글쓰기는 웹 버전이 더 효율적일 수 있음
   - Claude Code는 파일 작업이 필요한 경우에만

2. **하이브리드 접근:**
   - 초안: Claude Code (파일 참조 필요시)
   - 수정: Claude 웹 버전 (빠른 반복)

## 8. 실제 성과

### 측정 가능한 개선

- **수정 횟수**: 평균 4회 → 1-2회
- **관련성**: 주제 이탈 빈도 대폭 감소
- **템플릿 문구**: 거의 제거됨

### 여전한 과제

- 완벽한 자동화는 불가능
- 수동 개입 필요
- 일관성 유지 어려움

## 마치며

Claude Code로 글쓰기는 완벽하지 않습니다. 하지만 다음 원칙을 지키면 실용적 수준의 결과를 얻을 수 있습니다:

1. **서브에이전트 활용** - 글쓰기 전용 설정
2. **맥락적 판단 원칙** - CLAUDE.md 선택적 활용
3. **수동 품질 관리** - 템플릿 체크 및 수정

무엇보다 중요한 것은 **현실적인 기대치**입니다. Claude Code는 강력한 도구지만, 마법은 아닙니다. 적절한 수동 개입과 함께 사용할 때 가장 효과적입니다.

---

**참고**: 이 가이드는 실제 테스트를 거친 방법만 포함합니다.
**문의**: 실제 사용 중 문제 발생시 공유 부탁드립니다.

- [[30-knowledge/36-ai-tools/ai-automation-hub]] - GPTers AI 브랜딩 스터디
- [[40-personal/41-daily/2025-10-11]] - GPTers AI 브랜딩 스터디
- [[40-personal/41-daily/2025-10-10]] - GPTers AI 브랜딩 스터디

## Related Notes

- [[30-knowledge/36-ai-tools/36.01-claude-code/vs-gpts-comparison]] - ai_automation 관련; '들어가며' 개념 공유
- [[40-personal/44-reflections/learning/ab-method-philosophy]] - ai_automation 관련; 10-projects ↔ 40-personal 연결
- [[40-personal/44-reflections/learning/git-repository-study-plan]] - ai_automation 관련; 10-projects ↔ 40-personal 연결
- [[.claude/commands/create-command]] - ai_automation 관련; 10-projects ↔ .claude 연결
- [[30-knowledge/36-ai-tools/36.01-claude-code/archived-versions/final-seo-version]] - ai_automation 관련; 10-projects ↔ 30-knowledge 연결
