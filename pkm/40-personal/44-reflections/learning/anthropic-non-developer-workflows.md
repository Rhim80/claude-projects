# 앤트로픽 비개발 직군의 Claude Code 활용 워크플로우

> 2025-09-20 대화에서 발견한 앤트로픽 내부 비개발 직군의 업무 워크플로우 자료

## 📋 핵심 발견사항

### Claude Code를 "Thought Partner"로 활용
- 단순한 코드 생성 도구가 아닌 **사고 파트너**로 접근
- 업무 전반의 맥락을 이해하고 지속적인 대화를 통한 문제 해결
- 개발자가 아니어도 CLI 환경을 통해 체계적인 업무 관리 가능

### 5단계 워크플로우 패턴
```
Brainstorm → Document → Plan → Execute → Track
```

1. **Brainstorm**: 아이디어 발산 및 문제 정의
2. **Document**: 체계적 문서화 (CLAUDE.md 활용)
3. **Plan**: 구체적 실행 계획 수립
4. **Execute**: 단계별 실행 및 검증
5. **Track**: 진행사항 추적 및 피드백

### 계층적 업무 구조
```
PRD (Product Requirements Document)
  ↓
Epic (큰 기능/프로젝트 단위)
  ↓
Task (실행 가능한 작업 단위)
  ↓
Issue (구체적 문제/버그)
  ↓
Code (실제 구현)
```

## 🏢 앤트로픽 팀의 실제 활용 사례

### 마케팅 팀
- **광고 생성 자동화**: 수백 개의 광고 변형을 몇 초 만에 생성
- **Growth Marketing**: CSV 파일 처리로 저성과 광고 식별 및 새로운 변형 자동 생성
- **Figma 플러그인**: 프레임 식별 후 헤드라인/설명 교체로 100개 광고 변형 생성 (수시간 → 0.5초)

### 법무 팀
- **내부 도구 개발**: 팀원이 적절한 변호사와 연결되는 "전화 트리" 시스템 프로토타입 제작
- **부서별 맞춤 도구**: 전통적인 개발 리소스 없이도 맞춤형 도구 구축

### 데이터 사이언스 팀
- **시각화 자동화**: JavaScript 지식 없이도 복잡한 데이터 시각화 구현
- **분석 도구**: 데이터 분석 워크플로우 자동화

### 제품 디자인 팀
- **주요 설계 도구**: Figma와 Claude Code를 80% 시간 동안 함께 활용
- **엔지니어링 협업**: 이전에 엔지니어와의 광범위한 소통이 필요했던 시각적/상태 관리 변경을 직접 구현
- **프로젝트 관리**: GA 출시 메시징 같은 복잡한 프로젝트가 1주일 조정 → 30분 통화 2회로 단축

### 보안 엔지니어링 팀
- **문서화 자동화**: 여러 문서 소스를 수집해 마크다운 런북 및 트러블슈팅 가이드 생성
- **효율적 디버깅**: 전체 지식 베이스 검색보다 압축된 문서를 컨텍스트로 활용한 실제 프로덕션 이슈 디버깅

### 핵심 성공 패턴
- **사고 파트너 접근**: 코드 생성기가 아닌 사고 파트너로 Claude Code 활용
- **빠른 프로토타이핑**: 가능성 탐색, 빠른 프로토타입 제작, 팀 간 발견사항 공유
- **기술/비기술 융합**: 기술팀과 비기술팀 간의 협업 장벽 해소
- **맞춤형 자동화**: 전용 개발자나 비싼 소프트웨어 없이도 맞춤형 자동화 구축

### 사용자 경험의 차이
- **개발자**: "워크플로우 증강" (더 빠른 실행)
- **비기술자**: "나도 개발자가 된 것 같은" 경험 (이전에 불가능했던 새로운 능력)

## 🗂️ 프로젝트 구조화 방법

### CLAUDE.md 파일 활용
- **글로벌**: `/Users/rhim/.claude/CLAUDE.md` - 전체 컨텍스트
- **프로젝트별**: 각 작업 디렉토리에 개별 CLAUDE.md
- **자동 컨텍스트 로딩**: 해당 디렉토리에서 작업 시 자동 참조

### 도메인별 vs 프로젝트별 구조
- **도메인 폴더**: `.claude/domains/` (Claude Code가 자동 인식하지 않음)
- **프로젝트 폴더**: `/Projects/` 하위 구조 (권장)
- **Git 연동**: 버전 관리를 통한 작업 이력 추적

## 💼 비즈니스 활용 사례

### 업무 맥락 관리
- 복잡한 비즈니스 도메인을 체계적으로 문서화
- 업무 간 연관성과 우선순위 명확화
- 장기적 관점에서의 전략 수립 지원

### 자동화와 효율성
- 반복 업무의 패턴 인식 및 자동화 제안
- 기존 시스템(n8n, Notion 등)과의 연동 방안 모색
- 업무 프로세스 최적화 컨설팅

### 의사결정 지원
- 데이터 기반의 객관적 분석
- 다양한 시나리오 검토 및 리스크 분석
- 전문가 수준의 조언 및 가이드라인 제공

## 🔗 참고 자료

### Claude Code 공식 문서
- **메인 페이지**: https://www.anthropic.com/claude-code
- **개요 문서**: https://docs.claude.com/en/docs/claude-code/overview
- **튜토리얼**: https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/tutorials
- **문서 맵**: https://docs.anthropic.com/en/docs/claude-code/claude_code_docs_map.md
- **GitHub 리포지토리**: https://github.com/anthropics/claude-code

### 앤트로픽 팀 활용 사례
- **팀 활용 방법**: https://www.anthropic.com/news/how-anthropic-teams-use-claude-code
- **베스트 프랙티스**: https://www.anthropic.com/engineering/claude-code-best-practices
- **팀 활용 PDF**: https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf

### Claude 프로젝트 기능
- **프로젝트 협업**: https://www.anthropic.com/news/projects
- **Claude 4 소개**: https://www.anthropic.com/news/claude-4
- **API 개발 가이드**: https://www.anthropic.com/learn/build-with-claude

### 비개발자 Git 활용 자료
- **Git 공식 사이트**: https://git-scm.com/
- **비개발자 Git 활용법**: https://www.geeksforgeeks.org/how-could-non-developers-benefit-from-using-git/
- **GitHub 비개발자 교육**: https://github.com/services/github-for-non-developers-training
- **비기술직을 위한 GitHub**: https://ben.balter.com/2023/03/02/github-for-non-technical-roles/
- **GitHub 프로젝트 관리**: https://www.jobsity.com/blog/a-quick-guide-to-using-github-for-project-management
- **GitHub Issues**: https://github.com/features/issues

### Git 워크플로우 가이드
- **Git 워크플로우 비교**: https://www.atlassian.com/git/tutorials/comparing-workflows
- **Gitflow 워크플로우**: https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow

### 핵심 기능
- **서브에이전트**: 특화된 업무별 AI 어시스턴트 구축
- **TodoWrite**: 체계적인 업무 추적 및 관리
- **컨텍스트 관리**: 장기간에 걸친 프로젝트 맥락 유지
- **Git 연동**: 모든 작업의 버전 관리 및 협업
- **MCP 연동**: Google Drive, Figma, Slack 등 외부 도구 통합

## 📚 비개발자를 위한 Git 활용법

### Git이 비개발자에게 주는 가치

#### 1. 버전 관리 (Version Control)
- **문서 관리**: 회의록, 기획서, 제안서 등 모든 문서의 변경 이력 추적
- **협업 효율성**: 여러 사람이 동시에 작업해도 충돌 없이 관리
- **되돌리기**: 언제든지 이전 버전으로 복구 가능
- **변경 추적**: 누가, 언제, 무엇을 변경했는지 명확한 기록

#### 2. 프로젝트 관리 도구로서의 Git
- **GitHub Issues**: 태스크 관리, 버그 추적, 기능 요청 관리
- **Project Boards**: 칸반 보드 방식의 업무 관리
- **Milestones**: 프로젝트 목표 및 데드라인 관리
- **Wiki**: 프로젝트 문서화 및 지식 관리

#### 3. 비즈니스 워크플로우 통합
- **브랜치 전략**: 업무 단위별 작업 분리 (기획/개발/마케팅 브랜치)
- **릴리즈 관리**: 제품 출시 일정과 연동된 태그 및 릴리즈
- **자동화**: GitHub Actions를 통한 반복 업무 자동화

### 비개발자 Git 활용 사례

#### 마케팅 팀
- **캠페인 기획서**: 버전별 기획안 관리 및 피드백 추적
- **광고 소재**: 이미지, 카피, 동영상 파일의 버전 관리
- **성과 분석**: 데이터 파일과 리포트의 체계적 관리

#### 법무/총무팀
- **계약서 관리**: 계약서 템플릿 및 수정 이력 관리
- **정책 문서**: 사내 규정, 가이드라인의 변경 추적
- **법적 검토**: 문서별 검토 과정 및 승인 절차 관리

#### 프로젝트 매니저
- **프로젝트 문서**: 요구사항, 명세서, 계획서 통합 관리
- **진행 상황**: 이슈 트래킹과 마일스톤 관리
- **의사소통**: 팀 간 커뮤니케이션 및 의사결정 기록

### Git 학습 로드맵 (비개발자용)

#### 1단계: 기본 개념 이해
- Git과 GitHub의 차이점
- Repository, Commit, Branch 개념
- Pull Request와 Merge 이해

#### 2단계: 웹 인터페이스 활용
- GitHub 웹에서 파일 편집 및 커밋
- 이슈 생성 및 관리
- 프로젝트 보드 활용

#### 3단계: 협업 워크플로우
- 브랜치 생성 및 Pull Request
- 코드 리뷰 프로세스 참여
- 마크다운 문서 작성

#### 4단계: 고급 활용
- GitHub Actions 기본 이해
- 템플릿 및 자동화 활용
- API 연동 기초

### Claude Code + Git 시너지

#### 자동화된 문서 관리
- Claude Code로 문서 자동 생성 및 업데이트
- Git으로 문서 버전 관리 및 협업
- 변경 이력 자동 추적 및 리포트 생성

#### 프로젝트 생명주기 관리
- 기획 → 문서화 → 실행 → 추적의 전 과정을 Git으로 관리
- Claude Code가 각 단계별 자동화 지원
- 팀 간 의사소통 및 지식 공유 플랫폼 역할

## 💡 적용 아이디어

### IMI 비즈니스 통합
- 카페 운영, 컨설팅, 교육 업무를 하나의 시스템으로 관리
- 각 도메인별 특화된 워크플로우 구축
- 크로스 도메인 시너지 발굴 및 활용

### AI 브랜딩 시스템
- GPTers 스터디 경험을 바탕으로 한 시스템화
- 개인 브랜딩에서 비즈니스 브랜딩으로 확장
- 교육 콘텐츠 및 컨설팅 상품 개발

### 자동화 고도화
- 기존 n8n 워크플로우와 Claude Code 연동
- 업무 패턴 학습을 통한 proactive 제안
- ROI 측정 가능한 자동화 시스템 구축

## 📂 Git 리포지토리에서 발견한 비개발자 활용 사례

### 공식 Anthropic 리포지토리

#### anthropics/anthropic-cookbook
**비개발자 활용 가능한 예제들:**
- **고객 서비스 에이전트**: AI 기반 고객 지원 시스템 구축
- **콘텐츠 모더레이션**: 사용자 생성 콘텐츠 관리 필터
- **자동화된 평가**: 프로젝트 결과물이나 성과 지표 체계적 평가
- **지식 관리**: RAG(검색 증강 생성) 기법으로 조직 내부 지식 통합
- **문서 처리**: PDF 업로드 및 자동 요약, 분석 기능

#### anthropics/claude-code-action
**GitHub Actions 통합:**
- **문서 동기화**: 코드 변경사항과 문서 자동 업데이트
- **진행사항 추적**: 자동화 모드에서 추적 댓글 생성
- **이슈 관리**: @claude 멘션, 이슈 할당 기반 자동 응답

### 커뮤니티 리포지토리

#### hesreallyhim/awesome-claude-code
**비개발자 워크플로우:**
- **블로깅 플랫폼 관리**: 포스트 생성, 카테고리 관리, 미디어 파일 처리
- **프로젝트 관리 워크플로우**: 전문 에이전트, 슬래시 명령어, 강력한 문서화
- **AB Method**: 대규모 문제를 증분적 미션으로 변환하는 체계적 워크플로우
- **Claude Task Master**: AI 기반 개발을 위한 태스크 관리 시스템

#### OneRedOak/claude-code-workflows
**업무 영역별 특화 워크플로우:**

1. **디자인 리뷰 워크플로우**
   - Playwright MCP 브라우저 자동화 활용
   - UI/UX 일관성, 접근성 준수, 디자인 표준 확인
   - 팀 간 디자인 품질 유지 및 프로덕션 전 시각적 이슈 발견

2. **보안 리뷰 워크플로우**
   - 취약점, 노출된 시크릿, 잠재적 공격 벡터 식별
   - OWASP Top 10 표준 기반
   - 심각도별 분류된 발견사항과 명확한 해결 가이드

3. **코드 리뷰 워크플로우**
   - 이중 루프 아키텍처 (슬래시 명령어 + GitHub Actions)
   - 일상적인 코드 리뷰 체크 자동화
   - 팀이 전략적 사고와 아키텍처 정렬에 집중할 수 있도록 지원

#### disler/claude-code-hooks-mastery
**메타 에이전트 시스템:**
- **에이전트 빌더**: 설명으로부터 새로운 서브에이전트 생성
- **확장성**: 에이전트 개발 속도 향상을 위한 "에이전트를 만드는 에이전트"

### 핵심 발견사항

#### 1. 프로세스 자동화 중심
- 단순 코딩이 아닌 **비즈니스 프로세스 전반의 자동화**
- 반복적인 검토 작업을 AI가 처리하여 팀이 고부가가치 업무에 집중

#### 2. 품질 관리 시스템
- **디자인, 보안, 코드** 품질을 체계적으로 관리
- 사람은 전략적 판단, AI는 일관된 기준 적용

#### 3. 워크플로우 템플릿화
- 성공한 워크플로우를 **재사용 가능한 템플릿**으로 공유
- 조직별 맞춤화 가능한 구조

#### 4. 크로스 도메인 적용
- **기술 + 비기술 영역 융합**: 디자인, 보안, 프로젝트 관리, 고객 서비스
- **도구 연동**: GitHub Actions, Playwright, 다양한 MCP 도구 활용

---

## 📝 메모 및 후속 작업

### 즉시 적용 가능한 항목
- [x] Projects 폴더 구조 정리 완료
- [ ] 각 프로젝트별 CLAUDE.md 작성
- [ ] 글로벌 CLAUDE.md 간소화
- [ ] 기존 .claude/projects/ 정리 (110M)

### 중장기 개발 항목
- [ ] n8n + Claude Code 연동 워크플로우 설계
- [ ] 브랜딩 시스템 자동화 구축
- [ ] 교육 콘텐츠 자동 생성 시스템
- [ ] 비즈니스 인사이트 대시보드 구축

### 학습 및 연구 항목
- [ ] 앤트로픽 내부 워크플로우 사례 추가 연구
- [ ] 비개발자 Claude Code 활용 사례 수집
- [ ] AI 브랜딩 시스템 방법론 체계화
- [ ] 교육 커리큘럼 고도화 방안 연구

---

*"비개발자도 Claude Code를 통해 체계적이고 전문적인 업무 환경을 구축할 수 있다는 가능성을 확인했습니다. 이는 단순한 도구 활용을 넘어 업무 방식 자체의 혁신을 의미합니다."*

## Related Notes
- [[19th-cohort-proposal]] - 높은 연관성
- [[19th-gpters-submission]] - 높은 연관성
- [[learning-roadmap]] - 높은 연관성
- [[persuasion-strategy]] - 높은 연관성
- [[작업-진행상황]] - 높은 연관성
- [[gmail-classifier-분석]] - 높은 연관성
- [[ideas-analysis]] - 높은 연관성
