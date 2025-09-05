# n8n Project - AI 자동화 워크플로우 허브

> Claude Code와 n8n을 연동한 차세대 자동화 시스템 구축

## 📋 프로젝트 개요

### 목표
기존 n8n 워크플로우들을 Claude Code와 통합하여 더욱 지능적이고 유연한 자동화 시스템 구축

### 현재 운영 중인 n8n 워크플로우 (n8n.imiwork.com)
1. **YouTube RSS Bot** - AI 콘텐츠 수집 → 자막 추출 → 요약 → Notion 저장 → Telegram 알림 → 블로그 글 생성
2. **Gmail 알리미 Bot** - 11개 카테고리 자동 분류 → AI 요약 → Telegram 인터랙티브 처리
3. **Payroll System A** - 급여 변동사항 자동 수집 및 노무사 리포트 생성 (월간 자동화)
4. **Payroll System B** - 급여명세서 자동 발송 (Google Drive → 파일명 파싱 → 직원 매칭 → 이메일 발송)
5. **영수증 처리기** - OCR → AI 기반 9개 계정과목 자동 분류 → 회계 자동화

## 🎯 Claude Code 연동 목표

### Phase 1: Claude Code로 기존 워크플로우 고도화
- **YouTube RSS Bot** → `imi-work-youtube-blogger` 에이전트 연동
- **Gmail 분류** → `ai-business-architect` 에이전트로 중요도 판별 강화
- **영수증 처리** → Claude Code OCR + AI 분류 정확도 향상

### Phase 2: 새로운 AI 워크플로우 개발
- **콘텐츠 OSMU 시스템** → Ghost Blog → Naver Blog + Instagram + Threads 자동 변환
- **프로젝트 관리 봇** → `cafe-launch-pm` 에이전트로 매장 프로젝트 관리
- **AI 브랜딩 시스템** → 고객별 브랜드 가이드라인 자동 생성

### Phase 3: 통합 대시보드
- 모든 워크플로우 상태 모니터링
- Claude Code + n8n 연동 성과 분석
- 자동화 ROI 측정 및 최적화

## 🛠 기술 스택

### 현재 인프라
```
미니PC (Windows) + Docker
├── n8n (n8n.imiwork.com) - 자동화 엔진
├── Ghost 블로그 (blog.imiwork.com) - 콘텐츠 플랫폼
├── Cloudflare - 도메인 및 SSL 관리
└── 정기 백업 시스템 구축
```

### Claude Code 연동 계획
```
Claude Code CLI
├── n8n-workflow-builder 에이전트 (핵심) ⭐
│   ├── 새로운 워크플로우 설계 및 구축
│   ├── 기존 워크플로우 개선 및 최적화
│   ├── 노드 검색 및 설정 지원
│   └── 워크플로우 배포 및 테스트
├── korean-n8n-prompt-converter 에이전트
│   └── 한국어 요구사항 → n8n 워크플로우 변환
├── 기존 서브에이전트들 연동
│   ├── imi-work-youtube-blogger (콘텐츠 자동화)
│   ├── ai-business-architect (비즈니스 분석)
│   ├── cafe-launch-pm (프로젝트 관리)
│   └── premium-market-strategist (시장 전략)
└── n8n MCP 서버 연동 (미래)
```

## 📁 폴더 구조

```
n8n-project/
├── CLAUDE.md                    # 프로젝트 개요 (현재 파일)
├── workflows/                   # n8n 워크플로우 백업 및 버전 관리
│   ├── youtube-rss-bot.json
│   ├── gmail-classifier.json
│   ├── payroll-systems.json
│   ├── receipt-processor.json
│   └── new-workflows/          # 새로 개발할 워크플로우들
├── claude-integration/         # Claude Code 연동 설정
│   ├── workflow-prompts/       # n8n용 프롬프트 템플릿
│   ├── agents-config/          # 서브에이전트 설정
│   └── automation-scripts/     # 자동화 스크립트
├── docs/                       # 문서화
│   ├── workflow-manual.md      # 워크플로우 매뉴얼
│   ├── troubleshooting.md      # 문제 해결 가이드
│   └── api-references.md       # API 참조 문서
└── monitoring/                 # 모니터링 및 로그
    ├── performance-logs/
    ├── error-reports/
    └── roi-analysis/
```

## 🚀 실행 계획

### 1단계: 현재 워크플로우 분석 및 백업
- [ ] 기존 5개 워크플로우 JSON 파일 백업
- [ ] 각 워크플로우 성능 지표 수집
- [ ] 개선 포인트 도출

### 2단계: Claude Code 연동 POC
- [ ] `n8n-workflow-builder` 에이전트로 새로운 워크플로우 구축 테스트
- [ ] `korean-n8n-prompt-converter` 에이전트로 요구사항 변환 테스트
- [ ] YouTube RSS Bot에 `imi-work-youtube-blogger` 연동 테스트
- [ ] 에이전트 조합 효과성 검증
- [ ] 성과 측정 및 개선

### 3단계: 점진적 확장
- [ ] 나머지 워크플로우들에 Claude Code 적용
- [ ] 새로운 AI 워크플로우 개발
- [ ] 통합 모니터링 시스템 구축

## 📊 기대 효과

### 정량적 목표
- 워크플로우 실행 성공률 95% → 98% 향상
- AI 분류 정확도 85% → 95% 향상
- 새로운 자동화 영역 3개 이상 확장

### 정성적 목표
- n8n + Claude Code 연동 선도 사례 구축
- AI 자동화 컨설팅 서비스 차별점 확보
- "아르키메데스 목욕탕 강의"에서 실제 사례로 활용

## 🔗 관련 프로젝트 연동

- **imi-work-osmu**: YouTube → Blog 콘텐츠 자동화와 연계
- **archimedes-bath-lecture**: 강의에서 실제 사례로 활용
- **insight-platform**: F&B AI 교육에서 자동화 시스템 사례로 제시

---

*"n8n의 안정성과 Claude Code의 지능성을 결합하여, 진정한 AI 파트너와 함께하는 자동화 시스템을 구축한다."*