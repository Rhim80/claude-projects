# Claudesidian 학습 로드맵

> Noah Brier의 Claudesidian 가이드 기반
> 생성일: 2025-01-09

---

## 🎯 우선순위 학습 주제

### 1. Daily Notes 시스템 구축 ⭐⭐⭐

**현재 상태:**
- ❌ Daily notes 구조 없음
- ❌ `/quick-note` 커맨드 삭제됨
- ✅ PKM 기본 구조는 있음

**Noah의 접근:**
```
~/obsidian/
├── 00_Inbox/
│   └── quick-capture.md    # 빠른 메모
├── daily-notes/             # 날짜별 저널
│   ├── 2025-01-08.md
│   └── 2025-01-09.md
```

**학습 필요 사항:**
- [ ] Daily note 템플릿 설계
  - 일일 로그 섹션 (시간별)
  - 인사이트 캡처
  - 액션 아이템
  - 프로젝트 연결
- [ ] 자동 생성 로직 구현
- [ ] `/daily-review` 커맨드 적용
- [ ] n8n과 연동 (Telegram → Daily note)

**적용 시나리오:**
```bash
# 매일 아침 루틴
$ claude code
> /daily-review

# AI가 수행:
1. 어제 변경된 파일 분석
2. 진행 상황 요약
3. 오늘의 우선순위 제안
4. 새 daily note 생성
```

---

### 2. Thinking Mode vs Writing Mode ⭐⭐⭐

**핵심 개념:**
> "우리는 아티팩트를 만드는 것보다 훨씬 자주 생각합니다."

**Thinking Mode (사고 모드):**
- 목적: 아이디어 탐색, 패턴 발견
- 특징: 즉시 작성 X, 질문 중심
- 명령어: `/thinking-partner`

**Writing Mode (작성 모드):**
- 목적: 구체적 결과물 생성
- 특징: 콘텐츠 초안, 문서 작성
- 명령어: 일반 대화

**학습 필요 사항:**
- [ ] `/thinking-partner` 커맨드 분석
- [ ] 두 모드의 명확한 구분 기준
- [ ] 프로젝트별 모드 전환 전략
- [ ] CLAUDE.md에 모드 명시 추가

**적용 예시:**
```bash
# GPTers 스터디 준비 시
$ claude code
> /thinking-partner

# AI 질문:
"이번 주 피드백에서 공통된 어려움은?"
"15년 F&B 경험 중 유사 사례는?"
"어떤 실습이 효과적일까?"

# → 충분히 생각한 후
> 이제 week 4 커리큘럼 작성해줘 (Writing Mode)
```

---

### 3. 파일시스템 기반 AI 메모리 ⭐⭐

**핵심 철학:**
> "파일시스템은 AI의 장기 기억"

**현재 문제:**
- ChatGPT: 대화 길어지면 초반 내용 망각
- Context window 제한

**Noah의 해결:**
```markdown
~/obsidian/projects/brand-conference/
├── chats/
│   ├── 2025-10-01-initial-brainstorm.md
│   ├── 2025-10-03-walter-benjamin-research.md
│   └── 2025-10-05-transformer-architecture.md
├── research/
└── conclusions/
```

**학습 필요 사항:**
- [ ] 프로젝트별 `/chats` 폴더 생성
- [ ] 대화 내용 자동 저장 방법
- [ ] 과거 대화 참조 워크플로우
- [ ] Git 버전 관리 활용

**hovoo 적용:**
```bash
# GPTers 스터디 4주차에
$ claude code
> chats/week1-brand-identity.md 읽고
  우리가 처음 정의한 철학 상기시켜줘

# → 1주차 내용 완벽 회상
```

---

### 4. Unix 철학 + AI ⭐⭐

**Unix 3원칙:**
1. Do One Thing Well (하나만 완벽하게)
2. Composability (조합 가능)
3. Text Streams (텍스트 입출력)

**복잡한 접근 (피해야 할):**
```python
# 100줄 멀티 에이전트 시스템
class ResearchAgent:
    def __init__(self):
        self.memory = {}
        # 복잡한 상태 관리...
```

**Noah의 접근 (권장):**
```bash
llm "research AI marketing" > research.txt
llm "summarize" < research.txt > summary.txt
llm "outline" < summary.txt > outline.md
```

**학습 필요 사항:**
- [ ] LLM CLI 도구 설치 및 테스트
- [ ] 파이프 기반 워크플로우 설계
- [ ] 기존 n8n과 통합 방법
- [ ] 간단한 스크립트 작성 연습

**hovoo 적용:**
```bash
# 컨설팅 준비
cat clients/cafe-abc/reviews.txt | \
  llm "identify strengths and weaknesses" > analysis.txt

cat analysis.txt | \
  llm "create meeting prep" > meeting-prep.md
```

---

### 5. Inbox Magic 프로젝트 벤치마킹 ⭐

**Noah의 Inbox Magic:**
```
Gmail API
↓
Claude Code 도구
↓
분석 → 분류 → 초안 작성
↓
Obsidian 기록
↓
사용자 승인 → 발송
```

**hovoo의 현재 시스템:**
```
Gmail 수신 (n8n)
↓
11개 카테고리 분류
↓
AI 요약
↓
Telegram 전송
```

**업그레이드 방향:**
```
Gmail 수신 (n8n)
↓
기본 분류
↓
Obsidian 저장 (중요 메일)
  → 00_Inbox/emails/
↓
Claude Code 분석:
  - 과거 유사 메일 찾기
  - 액션 아이템 추출
  - 답장 초안 (hovoo 스타일)
↓
Telegram 인터랙티브 버튼
```

**학습 필요 사항:**
- [ ] 답장 스타일 학습 방법
- [ ] 과거 이메일 패턴 분석
- [ ] n8n → Obsidian 연동
- [ ] Claude Code → Telegram 피드백

---

### 6. 모바일 Deep Work 환경 ⭐⭐

**Noah의 증명:**
- 스마트폰 + SSH + Claude Code
- 2시간 강연 준비 완료
- 어디서나 접근 가능

**hovoo의 기회:**
- 매장 순회 이동 시간: 2-3시간/일
- 월 40-60시간 추가 생산성

**환경 구축:**
```
미니PC (Windows)
├── Obsidian 볼트
├── Git 동기화
└── Tailscale VPN

↕️

스마트폰 (Termius)
└── SSH → Claude Code
```

**학습 필요 사항:**
- [ ] Tailscale VPN 설치 및 설정
- [ ] Termius 앱 설정
- [ ] SSH 키 인증
- [ ] 모바일 워크플로우 최적화

**적용 시나리오:**
```bash
# 매장 이동 중 (Termius)
$ ssh hovoo@home-pc
$ cd obsidian/gpters-study
$ claude code

> 오늘 참가자 피드백 요약해줘
> daily-notes/2025-01-09.md에 인사이트 추가해줘
```

---

### 7. Claudesidian 내장 명령어 활용 ⭐⭐

**핵심 명령어 8개:**

1. `/thinking-partner` - 사고 촉진
2. `/inbox-processor` - Inbox 정리
3. `/research-assistant` - 리서치 지원
4. `/daily-review` - 일일 리뷰
5. `/weekly-synthesis` - 주간 종합
6. `/create-command` - 커스텀 명령어 생성
7. `/de-ai-ify` - AI 어투 제거
8. `/upgrade` - 시스템 업데이트

**학습 필요 사항:**
- [ ] 각 명령어 실제 테스트
- [ ] hovoo 환경에 맞게 커스터마이징
- [ ] 새 명령어 개발 방법 학습
- [ ] 명령어 조합 전략

**hovoo 전용 명령어 아이디어:**
```bash
/gpters-report        # GPTers 주간 리포트
/lecture-prep         # 강의 자료 준비
/consulting-brief     # 컨설팅 사전 브리프
/store-visit-log      # 매장 방문 일지
/n8n-changelog        # n8n 워크플로우 변경 기록
```

---

### 8. Gemini 이미지 분석 통합 ⭐

**Noah의 활용:**
- PDF 연구 논문 → 핵심 인용구 추출
- 영수증 사진 → 회계 정보 추출
- 화이트보드 사진 → 구조화된 노트

**hovoo 적용 가능성:**
```bash
# 매장 인테리어 체크
> 05_Attachments/store-photos/imi-gangnam.jpg
  브랜드 가이드라인과 일치 확인

# 영수증 자동 처리 (기존 n8n과 연동)
> 05_Attachments/receipts/2025-01-09.jpg
  회계 항목 분류

# 메뉴 디자인 평가
> 05_Attachments/menu-designs/new-menu.jpg
  브랜드 일관성 평가
```

**학습 필요 사항:**
- [ ] Gemini API 키 발급
- [ ] 이미지 분석 프롬프트 작성법
- [ ] 기존 영수증 처리 시스템과 통합
- [ ] 품질 체크 자동화

---

## 📅 4주 학습 계획

### Week 1: 기초 인프라 (1월 9일-15일)

**목표: 파일 기반 메모리 시스템 구축**

- [ ] Daily notes 템플릿 생성
- [ ] `/daily-review` 커맨드 구현
- [ ] 프로젝트별 `/chats` 폴더 추가
- [ ] Git 자동 백업 설정

**실습 프로젝트:** GPTers 스터디 대화 저장

---

### Week 2: 모드 전환 & 워크플로우 (1월 16일-22일)

**목표: Thinking Mode 활용 숙달**

- [ ] `/thinking-partner` 실제 사용
- [ ] Writing Mode와 구분 연습
- [ ] LLM CLI 도구 설치
- [ ] 간단한 파이프 워크플로우 작성

**실습 프로젝트:** 강의 자료 개발에 Thinking Mode 적용

---

### Week 3: 자동화 & 통합 (1월 23일-29일)

**목표: n8n + Obsidian 연동**

- [ ] n8n → Obsidian 저장 워크플로우
- [ ] Gmail 알리미 → Daily notes 통합
- [ ] YouTube RSS → Research 폴더 저장
- [ ] Telegram 알림 개선

**실습 프로젝트:** 이메일 관리 시스템 업그레이드

---

### Week 4: 모바일 & 고급 기능 (1월 30일-2월 5일)

**목표: 어디서나 작업 가능**

- [ ] Tailscale VPN 설치
- [ ] Termius SSH 설정
- [ ] Gemini 이미지 분석 테스트
- [ ] 커스텀 명령어 3개 개발

**실습 프로젝트:** 매장 순회 중 모바일 작업 테스트

---

## 🎓 심화 학습 자료

### 필독 문서
1. [Noah Brier - The Magic of Claude Code](https://www.alephic.com/writing/the-magic-of-claude-code)
2. [Claudesidian GitHub](https://github.com/heyitsnoah/claudesidian)
3. [LLM CLI Documentation](https://llm.datasette.io/)
4. Tiago Forte - "Building a Second Brain" (PARA 방법론)

### 선택 자료
- Eric S. Raymond - "The Art of Unix Programming"
- Simon Willison의 AI 도구 블로그
- Every.com 팀의 AI 활용 사례

---

## 💡 즉시 실험 가능한 아이디어

### 1. GPTers 스터디 자동화
```bash
# 매주 일요일
$ claude code
> /gpters-report

# 자동 생성:
- 참가자 피드백 분석
- 공통 질문 추출
- 다음 주 커리큘럼 개선안
```

### 2. 컨설팅 준비 자동화
```bash
# 미팅 전날
$ ./scripts/client-research.sh cafe-abc

# 15분 후 완성:
- 웹사이트 분석
- Instagram 브랜드 일관성
- 리뷰 요약
- 미팅 준비 문서
```

### 3. n8n 워크플로우 문서화
```bash
# 워크플로우 수정 시
$ claude code
> n8n-workflows/youtube-rss/changelog.md에
  오늘 변경사항 기록해줘
```

---

## ✅ 체크포인트: 시스템 완성 기준

### Phase 1 완성 (2주 후)
- [x] Daily notes 매일 작성
- [x] 대화 내용 파일로 저장
- [x] Git 자동 백업

### Phase 2 완성 (4주 후)
- [x] n8n → Obsidian 연동
- [x] 모바일 SSH 접속
- [x] 커스텀 명령어 5개

### Phase 3 완성 (8주 후)
- [x] 전체 프로젝트 통합
- [x] 주간 루틴 확립
- [x] ROI 측정 (시간 절약)

---

## 🚀 다음 스텝

**오늘 (2025-01-09):**
1. Daily notes 템플릿 설계
2. `/daily-review` 커맨드 초안 작성
3. GPTers 프로젝트에 `/chats` 폴더 생성

**이번 주:**
- LLM CLI 설치 및 테스트
- Thinking Mode 실험
- 첫 파이프 워크플로우 작성

**다음 주:**
- n8n 연동 시작
- Tailscale 환경 구축

---

*"파일시스템은 AI의 장기 기억이다. 복잡한 멀티 에이전트보다 간단한 도구 체인이 강력하다."*
— Noah Brier, 2025

## Related Notes
- [[19th-gpters-submission]] - 높은 연관성
- [[gmail-classifier-분석]] - 높은 연관성
- [[19th-cohort-proposal]] - 높은 연관성
- [[BRAND_FRAMEWORK_ANALYSIS]] - 높은 연관성
- [[19th-proposal-simple]] - 높은 연관성
- [[솔로프리너_생산성_치트키_AI_강의안]] - 높은 연관성
- [[IMPROVED_TEMPLATE_V1.1]] - 높은 연관성
