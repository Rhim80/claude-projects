# IMI Working Backwards 템플릿 프로젝트 기획서

> Claude Code 워크스페이스 템플릿 - Working Backwards 방법론 × Johnny Decimal PKM 시스템

**작성일**: 2025-10-11
**작성자**: 이림 (hovoo)
**버전**: v0.1 (기획)

---

## 📋 Executive Summary

### 프로젝트 개요
- **이름**: `imi-working-backwards`
- **목적**: Working Backwards 방법론을 Claude Code + Obsidian 환경에서 실행할 수 있는 턴키 템플릿
- **타겟**: GPTers 19기 스터디 참가자 (1차), AI × 비즈니스 실행자 (2차)
- **참고**: Noah Brier의 [Claudesidian](https://github.com/heyitsnoah/claudesidian)

### 핵심 가치 제안
1. **Working Backwards 실행 시스템**: PR/FAQ 작성부터 로드맵, 실행까지 원스톱
2. **검증된 PKM 구조**: 이림의 15년 F&B 경험 + AI 전문성 기반 Johnny Decimal 시스템
3. **자동화 내장**: 제텔카스텐 링크 생성, Daily Review, Thinking Partner 등
4. **낮은 진입장벽**: 설치 마법사로 10분 내 세팅 완료

---

## 🎯 프로젝트 목표

### Phase 1: GPTers 19기 스터디 (2025년 4주)
- [ ] 스터디 시작 전 템플릿 배포
- [ ] 4주간 Working Backwards 실습 환경 제공
- [ ] 참가자 피드백 수집 및 개선

### Phase 2: 오픈소스 공개 (스터디 후)
- [ ] GitHub Public 저장소 공개
- [ ] 커뮤니티 기여 받기
- [ ] 문서화 및 예제 확충

### Phase 3: 제품화 (장기)
- [ ] Advanced 기능 추가 (유료 고려)
- [ ] IMI WORK 교육 프로그램 연계
- [ ] 다른 방법론 템플릿 확장 (JTBD, Lean Canvas 등)

---

## 📂 폴더 구조 설계

### 최종 구조 (Johnny Decimal + Working Backwards)

```
imi-working-backwards/
├── .claude/
│   ├── commands/
│   │   ├── daily-note.md
│   │   ├── daily-review.md
│   │   ├── idea.md
│   │   ├── inbox-processor.md
│   │   ├── thinking-partner.md
│   │   ├── working-backwards-pr.md        # 신규
│   │   ├── generate-roadmap.md            # 신규
│   │   └── init-bootstrap.md              # 신규 (설치 마법사)
│   ├── agents/
│   │   ├── zettelkasten-linker.md
│   │   ├── experience-bridge.md
│   │   ├── business-strategist.md
│   │   └── code-reviewer.md
│   ├── CLAUDE.md                          # 템플릿 버전 (사용자 커스터마이징)
│   └── SUBAGENT_TEMPLATE.md
│
├── pkm/
│   ├── 00-system/
│   │   ├── 01-templates/
│   │   │   ├── daily-note-template.md
│   │   │   ├── pr-faq-template.md         # 신규
│   │   │   ├── roadmap-template.md        # 신규
│   │   │   └── project-template.md
│   │   ├── 02-scripts/
│   │   │   └── zettelkasten_linker_final.py
│   │   ├── 03-config/
│   │   ├── 04-docs/
│   │   │   ├── README.md
│   │   │   ├── WORKING_BACKWARDS_GUIDE.md # 신규
│   │   │   └── INSTALLATION.md            # 신규
│   │   └── 05-reports/
│   │
│   ├── 10-projects/
│   │   ├── 11-working-backwards/          # Working Backwards 전용
│   │   │   ├── pr-faq/
│   │   │   │   └── example-pr-faq.md      # 예제
│   │   │   ├── roadmap/
│   │   │   │   └── example-roadmap.md     # 예제
│   │   │   └── execution/
│   │   │       └── sprint-01.md           # 예제
│   │   └── 12-general/                    # 일반 프로젝트
│   │
│   ├── 20-operations/                     # (옵션) 비즈니스 운영
│   │   └── README.md
│   │
│   ├── 30-knowledge/                      # 지식 저장소
│   │   ├── 31-business/
│   │   │   └── working-backwards-method.md
│   │   ├── 32-frameworks/
│   │   └── 33-insights/
│   │
│   ├── 40-personal/                       # 개인 노트
│   │   ├── 41-daily/
│   │   │   └── 2025-10-12.md             # 예제
│   │   ├── 42-weekly/
│   │   ├── 43-ideas/
│   │   └── 44-reflections/
│   │
│   ├── 50-resources/                      # 리소스
│   │   └── 51-education-materials/
│   │
│   └── 90-archive/                        # 아카이브
│
├── .gitignore
├── README.md                              # 프로젝트 소개
├── INSTALLATION.md                        # 설치 가이드
├── QUICKSTART.md                          # 빠른 시작 가이드
├── LICENSE
└── package.json                           # (옵션) 메타데이터
```

### 폴더 설명

**00-system**: 시스템 설정, 템플릿, 스크립트
**10-projects**: 활성 프로젝트 (Working Backwards 전용 폴더 포함)
**20-operations**: 비즈니스 운영 (선택적)
**30-knowledge**: 지식 저장소 (방법론, 프레임워크, 인사이트)
**40-personal**: 개인 노트 (Daily, Weekly, Ideas)
**50-resources**: 학습 자료
**90-archive**: 완료/중단 프로젝트

---

## 🛠️ 포함할 커스텀 커맨드

### 기존 커맨드 (이림의 시스템에서 가져옴)

| 커맨드 | 설명 | 포함 여부 |
|--------|------|----------|
| `/daily-note` | 오늘 날짜 Daily Note 생성/열기 | ✅ 포함 |
| `/daily-review` | 어제와 오늘 변경사항 분석 및 리뷰 | ✅ 포함 |
| `/idea [카테고리]` | 아이디어 추출 후 저장 | ✅ 포함 |
| `/inbox-processor` | Inbox 정리 및 분류 | ✅ 포함 |
| `/thinking-partner` | Noah 스타일 사고 파트너 | ✅ 포함 |
| `/research-assistant` | 리서치 도우미 | ⚠️ 검토 필요 |
| `/weekly-synthesis` | 주간 종합 | ⚠️ 검토 필요 |
| `/todo` | 빠른 Todo 추가 | ❌ 제외 (중복) |
| `/todos` | Todo 뷰 | ❌ 제외 (중복) |

### 신규 커맨드 (Working Backwards 전용)

| 커맨드 | 설명 | 우선순위 |
|--------|------|---------|
| `/working-backwards-pr` | PR/FAQ 문서 생성 | ⭐⭐⭐ 필수 |
| `/generate-roadmap` | 역순 로드맵 생성 | ⭐⭐⭐ 필수 |
| `/init-bootstrap` | 설치 마법사 (최초 1회) | ⭐⭐⭐ 필수 |
| `/customer-interview` | 고객 인터뷰 분석 | ⭐⭐ 추천 |
| `/retrospective` | 스프린트 회고 | ⭐⭐ 추천 |

---

## 🤖 포함할 서브에이전트

### 기존 에이전트 (이림의 시스템에서 가져옴)

| 에이전트 | 설명 | 포함 여부 |
|---------|------|----------|
| `zettelkasten-linker` | 제텔카스텐 링크 자동 생성 | ✅ 포함 |
| `experience-bridge` | 콘텐츠와 경험 연결 질문 생성 | ✅ 포함 |
| `business-strategist` | 비즈니스 전략 가이드 | ✅ 포함 |
| `code-reviewer` | 코드 리뷰 | ✅ 포함 |
| `ghost-publisher` | Ghost 블로그 발행 | ❌ 제외 (OSMU 전용) |
| `ghost-validator` | Ghost 검증 | ❌ 제외 (OSMU 전용) |
| `imi-work-persona-writer` | IMI WORK 브랜드 글쓰기 | ❌ 제외 (OSMU 전용) |
| `instagram-threads-optimizer` | SNS 최적화 | ❌ 제외 (OSMU 전용) |
| `naver-seo-writer` | 네이버 블로그 작성 | ❌ 제외 (OSMU 전용) |
| `osmu-image-generator` | 이미지 생성 | ❌ 제외 (OSMU 전용) |
| `youtube-content-analyzer` | YouTube 분석 | ⚠️ 검토 필요 |
| `cafe-launch-pm` | 카페 런칭 PM | ❌ 제외 (특화됨) |
| `n8n-workflow-builder` | n8n 워크플로우 | ❌ 제외 (특화됨) |
| `korean-n8n-prompt-converter` | 한글→n8n 변환 | ❌ 제외 (특화됨) |
| `seo-optimizer` | SEO 최적화 | ❌ 제외 (OSMU 전용) |
| `sns-essay-writer` | SNS 에세이 작성 | ❌ 제외 (OSMU 전용) |

### 신규 에이전트 (Working Backwards 전용)

| 에이전트 | 설명 | 우선순위 |
|---------|------|---------|
| `working-backwards-guide` | WB 방법론 실행 가이드 | ⭐⭐⭐ 필수 |
| `customer-persona-builder` | 고객 페르소나 생성 | ⭐⭐ 추천 |
| `market-research-analyzer` | 시장 조사 분석 | ⭐⭐ 추천 |

---

## 📦 Git 저장소 구조

### 저장소 정보
- **이름**: `imi-working-backwards`
- **저장소**: `https://github.com/Rhim80/imi-working-backwards`
- **라이선스**: MIT (또는 Creative Commons)
- **Public/Private**: Private (Phase 1), Public (Phase 2)

### 배포 전략
1. **Phase 1 (Private)**: GPTers 19기 참가자만 접근
2. **Phase 2 (Public)**: 스터디 후 오픈소스 공개
3. **Phase 3 (Advanced)**: 고급 기능은 별도 저장소 또는 유료

### 버전 관리
- **v0.x**: 베타 (GPTers 19기 전용)
- **v1.0**: 정식 공개
- **v1.x**: 기능 추가
- **v2.0**: 대규모 업데이트

---

## 🚀 설치 마법사 (`/init-bootstrap`) 설계

### 목적
사용자가 **10분 내**에 템플릿을 자신의 환경에 맞게 커스터마이징

### 실행 흐름

```bash
# 사용자가 실행
/init-bootstrap
```

**Step 1: 환경 확인**
```
✓ Claude Code Pro 구독 확인
✓ Obsidian 설치 확인
✓ Git 설치 확인
✓ 필요한 권한 확인
```

**Step 2: 사용자 정보 수집**
```
👤 이름: [사용자 입력]
📧 이메일: [사용자 입력]
🏢 비즈니스 도메인: [선택: F&B / Tech / Healthcare / Other]
🎯 Working Backwards 목적: [텍스트 입력]
```

**Step 3: CLAUDE.md 생성**
```yaml
# 템플릿 기반으로 사용자 정보 치환
name: [사용자 이름]
business_domain: [선택한 도메인]
working_backwards_goal: [입력한 목적]
johnny_decimal_customization: [기본값 또는 커스텀]
```

**Step 4: 폴더 구조 초기화**
```bash
# 필요한 폴더 생성
mkdir -p pkm/10-projects/11-working-backwards/{pr-faq,roadmap,execution}
mkdir -p pkm/40-personal/41-daily
mkdir -p pkm/30-knowledge/31-business

# 템플릿 파일 복사
cp 00-system/01-templates/daily-note-template.md pkm/40-personal/41-daily/
cp 00-system/01-templates/pr-faq-template.md pkm/10-projects/11-working-backwards/pr-faq/
```

**Step 5: Git 초기화**
```bash
# Git 저장소 초기화
git init
git add .
git commit -m "🎉 Initialize IMI Working Backwards workspace"

# (선택) GitHub 연결
echo "GitHub 저장소에 연결하시겠습니까? (y/n)"
```

**Step 6: 첫 Daily Note 생성**
```bash
# 오늘 날짜로 Daily Note 생성
/daily-note
```

**Step 7: 완료 메시지**
```
✅ IMI Working Backwards 템플릿 설치 완료!

📚 다음 단계:
1. README.md를 읽고 시작하기
2. /working-backwards-pr 명령으로 첫 PR/FAQ 작성
3. GPTers 19기 Discord에 참여하기

🔗 유용한 링크:
- 문서: /pkm/00-system/04-docs/WORKING_BACKWARDS_GUIDE.md
- 예제: /pkm/10-projects/11-working-backwards/pr-faq/example-pr-faq.md
- 커뮤니티: [Discord 링크]
```

---

## 📚 문서화 구조

### README.md (루트)
```markdown
# IMI Working Backwards

> Working Backwards 방법론을 Claude Code 환경에서 실행하는 턴키 템플릿

## Quick Start
1. 저장소 클론
2. `/init-bootstrap` 실행
3. 10분 내 시작!

## Features
- ✅ Working Backwards PR/FAQ 생성
- ✅ 역순 로드맵 자동화
- ✅ 제텔카스텐 PKM 시스템
- ✅ 10+ 커스텀 커맨드
- ✅ 5+ AI 서브에이전트

## Documentation
- [설치 가이드](INSTALLATION.md)
- [빠른 시작](QUICKSTART.md)
- [Working Backwards 가이드](pkm/00-system/04-docs/WORKING_BACKWARDS_GUIDE.md)
```

### INSTALLATION.md
```markdown
# 설치 가이드

## 필수 요구사항
- Claude Code Pro 구독
- Obsidian (무료)
- Git
- 터미널 기본 지식

## 설치 단계
1. 저장소 클론
2. Claude Code에서 폴더 열기
3. `/init-bootstrap` 실행
4. 가이드 따라하기

## 트러블슈팅
[자주 묻는 질문]
```

### QUICKSTART.md
```markdown
# 빠른 시작 가이드

## 첫 Working Backwards 프로젝트 시작하기

### Step 1: PR/FAQ 작성
\`\`\`bash
/working-backwards-pr
\`\`\`

### Step 2: 로드맵 생성
\`\`\`bash
/generate-roadmap
\`\`\`

### Step 3: Daily Review
\`\`\`bash
/daily-review
\`\`\`

## 예제 프로젝트
- [카페 런칭 PR/FAQ](pkm/10-projects/11-working-backwards/pr-faq/example-pr-faq.md)
- [SaaS 제품 로드맵](pkm/10-projects/11-working-backwards/roadmap/example-roadmap.md)
```

### pkm/00-system/04-docs/WORKING_BACKWARDS_GUIDE.md
```markdown
# Working Backwards 완전 가이드

## 방법론 소개
Amazon의 Working Backwards 방법론을...

## PR/FAQ 작성법
1. Press Release 섹션
2. FAQ 섹션
3. 고객 관점

## 역순 로드맵
1. 최종 목표 (6개월 후)
2. 마일스톤 역순 배치
3. 스프린트 계획

## 실전 팁
- 고객 인터뷰 먼저
- 데이터 기반 검증
- 반복 개선
```

---

## 🎨 예제 파일

### pkm/10-projects/11-working-backwards/pr-faq/example-pr-faq.md
```markdown
# [제품명] Press Release & FAQ

**출시일**: 2026년 Q1
**작성일**: 2025-10-11

---

## Press Release

### 헤드라인
[고객이 읽을 헤드라인]

### 부제
[한 문장 요약]

### 도입부
[고객의 문제점 설명]

### 해결책
[우리 제품이 어떻게 해결하는가]

### 인용구
"[CEO 또는 고객 인용]"

### 시작하기
[고객이 어떻게 시작하는가]

---

## FAQ

### 고객 FAQ
**Q1: 이 제품은 누구를 위한 건가요?**
A: ...

**Q2: 기존 솔루션과 어떻게 다른가요?**
A: ...

### 내부 FAQ
**Q1: 기술적으로 실현 가능한가?**
A: ...

**Q2: 비즈니스 모델은?**
A: ...

---

## Next Steps
- [ ] 고객 인터뷰 5회
- [ ] 로드맵 생성 (`/generate-roadmap`)
- [ ] 프로토타입 개발
```

### pkm/10-projects/11-working-backwards/roadmap/example-roadmap.md
```markdown
# [제품명] 역순 로드맵

**최종 목표**: 2026년 Q1 출시
**작성일**: 2025-10-11

---

## Timeline (역순)

### 2026년 Q1: 출시 🚀
- [ ] 마케팅 캠페인
- [ ] 고객 온보딩 자동화
- [ ] 운영 체계 구축

### 2025년 Q4: 베타 테스트
- [ ] 베타 사용자 50명 모집
- [ ] 피드백 수집 및 개선
- [ ] 성능 최적화

### 2025년 Q3: MVP 개발
- [ ] 핵심 기능 3가지 구현
- [ ] UI/UX 디자인
- [ ] 기술 스택 확정

### 2025년 Q2: 검증
- [ ] 고객 인터뷰 20회
- [ ] 프로토타입 제작
- [ ] 시장 조사

### 현재 (2025-10-11)
- [x] PR/FAQ 작성
- [ ] 팀 구성
- [ ] 초기 자금 확보

---

## Milestones

### M1: 검증 완료 (2025-12-31)
**정의**: 10명 이상의 고객이 "이거 꼭 필요해"라고 말함

### M2: MVP 출시 (2025-09-30)
**정의**: 핵심 기능 3가지가 작동함

### M3: 베타 성공 (2025-12-31)
**정의**: NPS 50+ 달성

### M4: 정식 출시 (2026-03-31)
**정의**: 100명 유료 고객 확보

---

## Dependencies
- 기술 스택 결정 → MVP 개발
- 고객 검증 → 베타 테스트
- 펀딩 확보 → 팀 확장

## Risks
- [ ] 고객 검증 실패 → Pivot 계획
- [ ] 기술 구현 지연 → 외주 고려
- [ ] 자금 부족 → 단계적 출시
```

---

## 🧪 테스트 계획

### Phase 1: 내부 테스트 (1주)
- [ ] 이림 본인이 직접 사용
- [ ] 모든 커맨드 동작 확인
- [ ] 설치 마법사 검증
- [ ] 문서 오타/누락 체크

### Phase 2: 알파 테스트 (1주)
- [ ] 신뢰할 수 있는 2-3명에게 배포
- [ ] 피드백 수집
- [ ] 주요 버그 수정

### Phase 3: 베타 테스트 (GPTers 19기)
- [ ] 스터디 참가자 전원에게 배포
- [ ] 4주간 실사용
- [ ] 매주 피드백 세션
- [ ] 개선 사항 반영

---

## 📅 타임라인

### Week 1 (2025-10-14 ~ 10-20)
- [ ] 폴더 구조 최종 확정
- [ ] 기존 커맨드 복사 및 수정
- [ ] 신규 커맨드 3개 개발 (working-backwards-pr, generate-roadmap, init-bootstrap)
- [ ] CLAUDE.md 템플릿 작성

### Week 2 (2025-10-21 ~ 10-27)
- [ ] 서브에이전트 이전 및 수정
- [ ] 예제 파일 작성
- [ ] README, INSTALLATION, QUICKSTART 작성
- [ ] 설치 마법사 구현

### Week 3 (2025-10-28 ~ 11-03)
- [ ] 내부 테스트 및 버그 수정
- [ ] 알파 테스트 (2-3명)
- [ ] 피드백 반영

### Week 4 (2025-11-04 ~ 11-10)
- [ ] GPTers 19기 스터디 시작 전 배포
- [ ] 온보딩 세션 (Zoom or Discord)
- [ ] 초기 지원 및 트러블슈팅

---

## ❓ 미결정 사항

### 1. 라이선스
- **옵션 A**: MIT (완전 오픈소스)
- **옵션 B**: Creative Commons BY-NC (비상업적 사용)
- **결정**: [ ]

### 2. 유료화 전략
- **Phase 1**: 완전 무료
- **Phase 2**: 기본 무료 + 고급 기능 유료?
- **Phase 3**: 교육 프로그램 연계?
- **결정**: [ ]

### 3. 커뮤니티
- **Discord 서버**: 필요?
- **GitHub Discussions**: 활성화?
- **주간 오피스 아워**: 운영?
- **결정**: [ ]

### 4. Working Backwards 커맨드 상세 스펙
- `/working-backwards-pr`: 어떤 프롬프트로?
- `/generate-roadmap`: PR/FAQ를 어떻게 파싱?
- **결정**: [ ] (다음 단계에서 상세 설계)

---

## 📊 성공 지표

### Phase 1 (GPTers 19기)
- [ ] 참가자 80% 이상이 템플릿 설치 성공
- [ ] 4주간 주 1회 이상 커맨드 사용
- [ ] NPS 50+ (추천 의향)

### Phase 2 (오픈소스 공개)
- [ ] GitHub Star 100+
- [ ] 외부 기여자 5명+
- [ ] 다른 커뮤니티에서 언급

### Phase 3 (장기)
- [ ] 월 활성 사용자 100명+
- [ ] 교육 프로그램 연계 매출 발생
- [ ] 파생 템플릿 출현 (Lean Canvas, JTBD 등)

---

## 🔗 참고 자료

### Working Backwards 방법론
- Amazon Working Backwards 원문
- GPTers 19기 제안서: `pkm/10-projects/12-education/12.02-gpters-ai-branding/19th-cohort/19th-proposal-simple.md`

### 템플릿 참고
- Noah Brier의 Claudesidian: https://github.com/heyitsnoah/claudesidian
- 이림의 현재 시스템: `/Users/rhim/Projects/pkm/`

### Johnny Decimal
- 공식 사이트: https://johnnydecimal.com/
- 이림의 적용 사례: `pkm/00-system/04-docs/`

---

## 📝 다음 액션

### 즉시 (이번 주)
1. [ ] 이 기획서 리뷰 및 피드백
2. [ ] 미결정 사항 3가지 결정
3. [ ] Week 1 타임라인 시작

### 단기 (2주 내)
1. [ ] 폴더 구조 및 커맨드 구현
2. [ ] 내부 테스트 완료
3. [ ] 알파 테스트 시작

### 중기 (1달 내)
1. [ ] GPTers 19기 배포
2. [ ] 피드백 수집 및 개선
3. [ ] 오픈소스 공개 준비

---

**작성 완료**: 2025-10-11 23:55
**다음 리뷰**: 2025-10-14 (월)

---

## 🔄 세션 재개 가이드 (맥락 복구용)

### 내일(2025-10-12) 이 문서로 시작할 때:

**Claude에게 제공할 컨텍스트**:
```
"나는 IMI Working Backwards 템플릿 프로젝트를 시작하려고 합니다.
어제 작성한 기획서를 바탕으로 실제 구현을 시작하고 싶습니다.

프로젝트 위치: /Users/rhim/Projects/pkm/10-projects/15-imi-working-backwards/
기획서: /Users/rhim/Projects/imi-working-backwards-planning.md

오늘 할 일:
1. 15-imi-working-backwards 폴더 구조 생성
2. Noah Claudesidian GitHub 참고
3. 기존 커맨드 복사 시작

@imi-working-backwards-planning.md 이 파일 참고해서 진행해주세요."
```

### 핵심 컨텍스트 요약

**프로젝트 정체성**:
- Working Backwards 방법론 × Johnny Decimal PKM
- Noah Claudesidian 참고 (https://github.com/heyitsnoah/claudesidian)
- GPTers 19기 스터디 타겟

**현재 시스템 위치**:
- 커맨드: `~/.claude/commands/`
- 에이전트: `~/.claude/agents/`
- PKM: `/Users/rhim/Projects/pkm/`
- Noah 참고: `pkm/30-knowledge/36-ai-tools/36.01-claude-code/noah-brier-claudesidian-guide.md`

**포함 결정**:
- ✅ 커맨드: daily-note, daily-review, idea, inbox-processor, thinking-partner + 3개 신규
- ✅ 에이전트: zettelkasten-linker, experience-bridge, business-strategist, code-reviewer
- ❌ 제외: OSMU 관련 전부 (ghost, naver, instagram, osmu-image 등)

**첫 작업**: Week 1, Day 1 - 폴더 구조 생성 및 Noah GitHub 분석

---

## 🎉 결론

이 기획서는 **IMI Working Backwards 템플릿**의 청사진입니다.

**핵심 가치**:
- Working Backwards 방법론을 Claude Code 환경에서 쉽게 실행
- 검증된 Johnny Decimal PKM 시스템
- 10분 내 설치 가능한 턴키 템플릿
- GPTers 19기부터 시작해 오픈소스 커뮤니티로 확장

**다음 단계**: 미결정 사항 결정 후 개발 시작! 🚀
