# 14-brand-identity - 브랜드 아이덴티티 빌더

> AI 기반 대화형 브랜드 구축 웹 애플리케이션 프로젝트

## 📋 프로젝트 개요

**Product Name**: Brand Identity Builder
**Version**: 1.0.0
**Status**: 개발 준비 단계

**핵심 가치 제안**:
- 브랜딩 전문 지식 없이도 체계적인 브랜드 구축 가능
- Gemini 2.5 Flash API를 활용한 경제적인 AI 서비스
- 핵심 프롬프트는 백엔드에서 보호 (지적 재산 보호)
- 15년 F&B 경험 + AI 전문성이 결합된 검증된 시스템

## 🏗️ 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Shadcn/ui
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod

### Backend
- **Runtime**: Next.js API Routes
- **AI Model**: Gemini 2.5 Flash (gemini-2.5-flash-latest)
- **Database**: PostgreSQL (Supabase)
- **Authentication**: NextAuth.js
- **File Storage**: Supabase Storage

### Infrastructure
- **Hosting**: Vercel
- **CDN**: Vercel Edge Network
- **Package Manager**: pnpm

## 📁 프로젝트 구조

### 14.01-brand-builder
메인 애플리케이션 코드베이스

**주요 디렉토리**:
- `brand-identity-ai/`: Next.js 웹 애플리케이션
- `brand-identity-system/`: 브랜드 시스템 로직 및 프롬프트
- `brand-identity-builder-prd.md`: 제품 요구사항 문서 v1
- `brand-identity-builder-prd-v2.md`: 제품 요구사항 문서 v2 (업데이트)

## 🎯 핵심 기능

### 7단계 브랜드 구축 시스템
1. **Step 1**: 브랜드 기초 설정
2. **Step 2**: 타겟 고객 정의
3. **Step 3**: 가치 제안 수립
4. **Step 4**: 브랜드 개성 정립
5. **Step 5**: 브랜드 메시지 개발
6. **Step 6**: 시각적 아이덴티티 가이드
7. **Step 7**: 브랜드 실행 계획

### AI 대화형 인터페이스
- 단계별 AI 가이드 질문
- 사용자 응답 기반 맞춤형 브랜드 구축
- 실시간 피드백 및 개선 제안
- 최종 브랜드 북 자동 생성

## 🔗 연관 프로젝트

### 교육 사업 연계
- [[12-education/12.02-gpters-ai-branding]] - GPTers AI 브랜딩 스터디
  - 스터디에서 검증된 브랜딩 시스템을 웹 앱으로 구현
  - 스터디 참가자들에게 도구로 제공 가능

### 브랜드 전략 연계
- [[20-operations/23-brand]] - IMI WORK 브랜드 관리
  - 자체 브랜딩 노하우를 제품화
  - 컨설팅 경험을 시스템화

## 📊 개발 현황

**현재 상태**: 📋 기획 단계
- ✅ PRD 문서 v2 완성
- ✅ 기술 스택 확정
- ✅ 브랜딩 시스템 로직 설계
- 🚧 개발 시작 대기 중

**다음 단계**:
- [ ] 개발 환경 셋업
- [ ] 프로토타입 구현
- [ ] AI 프롬프트 최적화
- [ ] 베타 테스트 (GPTers 스터디 참가자 대상)

## 💡 비즈니스 모델

**타겟 시장**:
1. 1차: 1인 사업가, 프리랜서, 스타트업 창업자
2. 2차: 소상공인, 자영업자
3. 3차: 마케터, 브랜드 매니저

**수익 모델** (검토 중):
- Freemium: 기본 기능 무료, 고급 기능 유료
- 구독형: 월 단위 브랜드 관리 서비스
- B2B: 교육 기관 및 컨설팅 패키지

## 📚 주요 문서

- `brand-identity-builder-prd.md`: 초기 PRD
- `brand-identity-builder-prd-v2.md`: 업데이트된 PRD (최신)
- `brand-identity-ai/`: 실제 코드베이스
- `brand-identity-system/`: 브랜딩 로직 및 프롬프트

---

*"AI와 함께, 누구나 자신만의 브랜드를 체계적으로 구축할 수 있다."*
