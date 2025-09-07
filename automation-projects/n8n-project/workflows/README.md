# n8n Workflows - 백업 및 버전 관리

> 워크플로우별 전용 폴더 구조로 체계적 관리

## 📁 폴더 구조

```
workflows/
├── README.md                    # 이 파일
├── youtube-rss-bot/            # YouTube RSS 자동화
│   ├── youtube-rss-bot.json    # 워크플로우 파일
│   ├── youtube-rss-bot-분석.md  # 상세 분석 문서
│   └── CHANGELOG.md            # 변경 로그 (예정)
├── gmail-classifier/           # Gmail 자동 분류
│   ├── gmail-classifier.json   # 워크플로우 파일
│   ├── gmail-classifier-분석.md # 상세 분석 문서
│   └── CHANGELOG.md            # 변경 로그 (예정)
├── payroll-systems/            # 급여 처리 시스템
│   ├── payroll-a.json          # 급여 변동사항 처리 (예정)
│   ├── payroll-b.json          # 급여명세서 발송 (예정)
│   ├── payroll-systems-분석.md  # 상세 분석 문서 (예정)
│   └── CHANGELOG.md            # 변경 로그 (예정)
├── receipt-processor/          # 영수증 처리 자동화
│   ├── receipt-processor.json  # 워크플로우 파일 (예정)
│   ├── receipt-processor-분석.md # 상세 분석 문서 (예정)
│   └── CHANGELOG.md            # 변경 로그 (예정)
└── new-workflows/              # 새로 개발할 워크플로우들
    ├── osmu-content-automation/ # OSMU 콘텐츠 자동화 (예정)
    ├── project-management-bot/  # 프로젝트 관리 봇 (예정)
    ├── ai-branding-system/     # AI 브랜딩 시스템 (예정)
    └── customer-support-auto/  # 고객 응대 자동화 (예정)
```

## 🚀 현재 운영 중인 워크플로우 (2개)

### 1. YouTube RSS Bot ✅
- **폴더**: `youtube-rss-bot/`
- **기능**: 10개 YouTube 채널 모니터링 → AI 요약 → Notion 저장 → Telegram 알림 → 블로그 생성 연동
- **AI 모델**: Google Gemini 2.0 Flash
- **처리량**: 시간당 2-3개 영상 자동 처리
- **Claude Code 연동 계획**: `imi-work-youtube-blogger` 에이전트로 브랜드 맞춤 콘텐츠 생성

### 2. Gmail Classifier ✅  
- **폴더**: `gmail-classifier/`
- **기능**: Gmail 11개 카테고리 자동 분류 → 라벨링 → AI 요약 → Telegram 인터랙티브 처리
- **AI 모델**: GPT-4o-mini (분류) + Gemini 2.5 Pro (요약)
- **분류 정확도**: 85-90% (특별 규칙 + AI 조합)
- **Claude Code 연동 계획**: `ai-business-architect` 에이전트로 비즈니스 우선순위 자동 판별

## 📋 구현 예정 워크플로우 (3개)

### 3. Payroll Systems
- **폴더**: `payroll-systems/`
- **기능**: 급여 변동사항 자동 수집 → 노무사 리포트 생성 + 급여명세서 자동 발송
- **구성**: 2개 워크플로우 (Payroll A + Payroll B)
- **Claude Code 연동 계획**: 급여 데이터 분석 및 인사이트 자동 생성

### 4. Receipt Processor
- **폴더**: `receipt-processor/`
- **기능**: 영수증 OCR → AI 기반 9개 계정과목 자동 분류 → 회계 자동화
- **AI 활용**: OCR 정확도 향상 + 분류 로직 지능화
- **Claude Code 연동 계획**: 회계 처리 정확도 95% 이상 달성

## 🔮 새로 개발할 워크플로우 (4개+)

### new-workflows/ 하위 프로젝트
1. **OSMU 콘텐츠 자동화**: Ghost → Naver Blog + Instagram + Threads 자동 변환
2. **프로젝트 관리 봇**: `cafe-launch-pm` 에이전트 기반 매장 프로젝트 관리
3. **AI 브랜딩 시스템**: 고객별 브랜드 가이드라인 자동 생성
4. **고객 응대 자동화**: AI 기반 고객 문의 자동 응답 및 분류

## 📊 Claude Code 연동 우선순위

### Phase 1: 기존 워크플로우 고도화 (1-2주)
1. **YouTube RSS Bot** → `imi-work-youtube-blogger` 연동
2. **Gmail Classifier** → `ai-business-architect` 중요도 분석

### Phase 2: 새 워크플로우 개발 (1-2개월)  
3. **Payroll Systems** → 급여 인사이트 자동 생성
4. **Receipt Processor** → 회계 분류 정확도 극대화

### Phase 3: 고급 자동화 (3-6개월)
5. **OSMU 시스템** → 완전 자동화된 멀티채널 콘텐츠 배포
6. **통합 대시보드** → 모든 워크플로우 통합 모니터링

## 🛠 관리 규칙

### 파일 네이밍
- **워크플로우 파일**: `{워크플로우명}.json`
- **분석 문서**: `{워크플로우명}-분석.md`
- **백업 파일**: `{워크플로우명}_YYYYMMDD.json`
- **변경 로그**: `CHANGELOG.md`

### 백업 및 버전 관리
1. **백업 주기**: 매주 일요일 자동 백업
2. **변경 추적**: 각 폴더별 CHANGELOG.md 유지
3. **테스트 환경**: 프로덕션 적용 전 반드시 검증
4. **Claude Code 연동**: 단계별 POC → 전면 적용

### 문서화 기준
- **워크플로우 분석 문서**: 구조, 기능, 개선 계획 포함
- **Claude Code 연동 계획**: 에이전트별 활용 전략 명시
- **성과 지표**: 현재 성과 + 개선 목표 수치화

---

*체계적인 폴더 구조로 7개 워크플로우를 효율적으로 관리하며, Claude Code 에이전트와의 단계적 연동을 통해 차세대 AI 자동화 시스템으로 진화합니다.*