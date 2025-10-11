# 22-automation - 비즈니스 자동화 시스템

> n8n + Claude Code 기반 스몰 비즈니스 운영 자동화

## 📋 시스템 개요

**인프라**: 미니PC (Windows) + Docker
**핵심 도구**: n8n (n8n.imiwork.com), Claude Code
**목표**: 4개 카페 매장 + 교육 사업 운영의 완전 자동화

## 🤖 운영 중인 n8n 워크플로우

### 1. YouTube RSS Bot
**목적**: AI 콘텐츠 자동 수집 및 블로그 글 생성
- YouTube RSS 모니터링
- 자막 추출 및 AI 요약
- Notion 데이터베이스 저장
- Telegram 알림 발송
- Ghost 블로그 자동 포스팅

### 2. Gmail 알리미 Bot
**목적**: 이메일 자동 분류 및 우선순위 처리
- 11개 카테고리 자동 분류
- AI 기반 요약 생성
- Telegram 인터랙티브 알림
- 중요 메일 우선 처리

### 3. Payroll System A
**목적**: 급여 변동사항 자동 관리
- 월간 급여 변동 자동 수집
- 노무사 리포트 자동 생성
- 급여 데이터 정합성 검증
- 월 1회 자동 실행

### 4. Payroll System B
**목적**: 급여명세서 자동 발송
- Google Drive에서 명세서 수집
- 파일명 파싱 및 직원 매칭
- 개별 이메일 자동 발송
- 발송 이력 기록

### 5. 영수증 처리기
**목적**: 회계 자동화
- OCR 영수증 텍스트 추출
- AI 기반 9개 계정과목 자동 분류
- 회계 시스템 연동
- 월별 집계 리포트

## 📁 시스템 구조

### n8n-workflows-backup/
**워크플로우 백업 및 버전 관리**
- `n8n-project/`: 메인 워크플로우 프로젝트
  - `CLAUDE.md`: Claude Code 연동 계획
  - `workflows/`: 워크플로우 JSON 파일
  - `claude-integration/`: Claude Code 통합 설정
- `n8n-playwright-tests.js`: 워크플로우 테스트 스크립트
- `n8n-test-runner.js`: 테스트 러너
- `youtube-rss-automation-blog-post.md`: YouTube 자동화 워크플로우 문서

### ghost-blog/
**Ghost 블로그 자동화**
- Ghost API 연동 설정
- 콘텐츠 자동 발행 로직

### n8n-databases/
**데이터베이스 백업**
- 워크플로우 실행 이력
- 수집된 데이터 아카이브

### payroll-changes/ & payroll-history/
**급여 시스템 데이터**
- 월별 급여 변동사항
- 급여 이력 데이터
- 노무사 리포트

### youtube-collector/
**YouTube 콘텐츠 수집**
- AI 관련 YouTube 채널 모니터링
- 자막 및 메타데이터 수집
- 콘텐츠 아카이브

## 🔄 Claude Code 연동 전략

### Phase 1: 기존 워크플로우 고도화
- **YouTube RSS Bot** → `imi-work-youtube-blogger` 에이전트 연동
- **Gmail 분류** → `ai-business-architect` 에이전트로 중요도 판별 강화
- **영수증 처리** → Claude Code OCR + AI 분류 정확도 향상

### Phase 2: 새로운 AI 워크플로우
- **콘텐츠 OSMU 시스템**: Ghost → Naver Blog + Instagram + Threads 자동 변환
- **프로젝트 관리 봇**: `cafe-launch-pm` 에이전트로 매장 프로젝트 관리
- **AI 브랜딩 시스템**: 고객별 브랜드 가이드라인 자동 생성

### Phase 3: 통합 대시보드
- 모든 워크플로우 상태 모니터링
- Claude Code + n8n 연동 성과 분석
- 자동화 ROI 측정 및 최적화

## 🏆 주요 성과

**시간 절감**:
- 급여 처리: 월 8시간 → 0시간 (100% 자동화)
- 영수증 분류: 주 2시간 → 0시간 (100% 자동화)
- 이메일 처리: 일 1시간 → 15분 (75% 절감)
- 콘텐츠 생성: 영상당 2시간 → 30분 (75% 절감)

**정확도 향상**:
- 급여 데이터 정합성: 95% → 99.8%
- 계정과목 분류 정확도: 85% → 96%
- 이메일 분류 정확도: 90% → 98%

## 🔗 연관 카테고리

- [[21-cafe-operations]] - 카페 운영 자동화 연동
- [[13-imi-work/13.01-osmu-system]] - OSMU 콘텐츠 자동화
- [[30-knowledge/36-ai-tools]] - n8n 활용 노하우
- [[40-personal/44-reflections]] - 자동화 인사이트

## 🛠 기술 스택

**자동화 엔진**:
- n8n (Self-hosted on Docker)
- n8n-workflow-builder (Claude Code 에이전트)
- korean-n8n-prompt-converter (Claude Code 에이전트)

**AI 통합**:
- GPT-4 (텍스트 생성 및 요약)
- Claude (논리적 분석 및 분류)
- Gemini (비용 효율적 일반 작업)

**인프라**:
- Docker (컨테이너 관리)
- Cloudflare (도메인 및 SSL)
- Ghost v5 (블로그 플랫폼)

---

*"반복 작업은 자동화하고, 창의적 일에 집중한다."*
