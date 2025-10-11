# Brand Identity Builder - Product Requirements Document (PRD)

## 1. Executive Summary

### 1.1 Product Overview
**Product Name**: Brand Identity Builder  
**Version**: 1.0.0  
**Document Date**: 2025-01-12  
**Author**: IMI WORK

Brand Identity Builder는 검증된 7단계 브랜드 아이덴티티 시스템을 웹 애플리케이션으로 구현한 서비스입니다. 사용자는 AI 기반 대화형 인터페이스를 통해 체계적으로 자신만의 브랜드를 구축할 수 있습니다.

### 1.2 핵심 가치 제안
- **접근성**: 브랜딩 전문 지식 없이도 체계적인 브랜드 구축 가능
- **비용 효율성**: Gemini 2.5 Flash API를 활용한 경제적인 AI 서비스
- **지적 재산 보호**: 핵심 프롬프트는 백엔드에서 보호되어 노출되지 않음
- **실전 검증**: 15년 F&B 경험과 AI 전문성이 결합된 시스템

## 2. 기술 스택 및 아키텍처

### 2.1 핵심 기술 스택
```yaml
Frontend:
  - Framework: Next.js 14 (App Router)
  - Language: TypeScript 5.x
  - Styling: Tailwind CSS 3.4
  - UI Components: Shadcn/ui
  - State Management: Zustand
  - Form Handling: React Hook Form + Zod

Backend:
  - Runtime: Next.js API Routes (App Router)
  - AI Model: Gemini 2.5 Flash (gemini-2.5-flash-latest)
  - Database: PostgreSQL (Supabase)
  - Authentication: NextAuth.js
  - File Storage: Supabase Storage

Infrastructure:
  - Hosting: Vercel
  - CDN: Vercel Edge Network
  - Environment: Node.js 20.x
  - Package Manager: pnpm
```

### 2.2 시스템 아키텍처
```
┌─────────────────────────────────────────────────┐
│                   Client (Browser)               │
│  ┌─────────────────────────────────────────┐   │
│  │    Next.js Frontend (React + TypeScript) │   │
│  │         Tailwind CSS + Shadcn/ui         │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
                        ↕ HTTPS
┌─────────────────────────────────────────────────┐
│              Vercel Edge Network                 │
└─────────────────────────────────────────────────┘
                        ↕
┌─────────────────────────────────────────────────┐
│           Next.js API Routes (Backend)           │
│  ┌─────────────────────────────────────────┐   │
│  │     Protected Prompt Templates (ENV)     │   │
│  │          Business Logic Layer            │   │
│  │           Session Management             │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
                        ↕
┌──────────────────┐    ┌────────────────────────┐
│  Gemini 2.5 Flash│    │   Supabase (Database)  │
│      API         │    │   - User Data          │
│                  │    │   - Brand Projects     │
│                  │    │   - Session History    │
└──────────────────┘    └────────────────────────┘
```

## 3. Gemini 2.5 Flash 사양 및 비용 분석

### 3.1 모델 사양
```yaml
Model: gemini-2.5-flash-latest
Context Window: 1,048,576 tokens
Input Price: $0.075 per 1M tokens (128K 이하)
              $0.15 per 1M tokens (128K 초과)
Output Price: $0.30 per 1M tokens (128K 이하)
               $0.60 per 1M tokens (128K 초과)
Rate Limits: 
  - 1000 RPM (Requests Per Minute)
  - 4M TPM (Tokens Per Minute)
Features:
  - Multimodal (text, images, audio, video)
  - Function calling
  - Grounding with Google Search
  - System instructions support
```

### 3.2 예상 비용 분석
```yaml
사용자당 평균 세션:
  - 7단계 완료: 약 50,000 토큰 (입력+출력)
  - 비용: 약 $0.015 (약 20원)

월간 예상 (1000명 기준):
  - 총 토큰: 50M tokens
  - 예상 비용: $15 (약 2만원)
  
수익 모델:
  - 무료: 3단계까지 체험
  - 프리미엄: ₩9,900/월 (전체 단계 + 무제한 수정)
  - 손익분기점: 약 3명/월
```

## 4. 핵심 기능 명세

### 4.1 7단계 브랜드 구축 프로세스

#### Step 0: 브랜드 씨앗 발굴
```typescript
interface Step0Data {
  triggers: string[];      // 브랜드 시작 계기
  senses: {
    visual: string[];      // 시각적 영감
    auditory: string[];    // 청각적 영감
    emotional: string[];   // 감정적 영감
  };
  seedStatement: string;   // 핵심 씨앗 문장
}
```

#### Step 1: 브랜드 정체성 체계
```typescript
interface Step1Data {
  mission: string;         // 미션
  vision: string;          // 비전
  coreValues: string[];    // 핵심 가치 (3-5개)
  targetAudience: {
    demographics: string;
    psychographics: string;
    painPoints: string[];
  };
}
```

#### Step 2: 브랜드 네이밍
```typescript
interface Step2Data {
  brandName: string;
  namingStrategy: 'functional' | 'philosophical' | 'hybrid' | 'metaphorical';
  alternatives: string[];
  rationale: string;
}
```

#### Step 3: 브랜드 언어 설계
```typescript
interface Step3Data {
  slogan: string;
  voiceGuidelines: {
    do: string[];
    dont: string[];
  };
  keyWords: {
    emotion: string[];
    action: string[];
    value: string[];
  };
}
```

#### Step 4: 컨셉 검증
```typescript
interface Step4Data {
  validationScores: {
    consistency: number;     // 일관성 (1-10)
    differentiation: number; // 차별성 (1-10)
    marketFit: number;       // 시장 적합성 (1-10)
    applicability: number;   // 적용성 (1-10)
    scalability: number;     // 확장성 (1-10)
  };
  improvements: string[];
  finalApproval: boolean;
}
```

#### Step 5: 실행 설계
```typescript
interface Step5Data {
  touchpoints: {
    website: string;
    social: string;
    offline: string;
  };
  roadmap: {
    immediate: string[];     // 1-2주
    shortTerm: string[];     // 1-3개월
    longTerm: string[];      // 6-12개월
  };
}
```

#### Step 6: 브랜딩 휠 완성
```typescript
interface Step6Data {
  brandingWheel: {
    core: string;           // 핵심 정체성
    attributes: string[];   // 브랜드 속성
    benefits: string[];     // 고객 혜택
    personality: string[];  // 브랜드 인격
  };
  finalDeliverable: string; // 최종 산출물 링크
}
```

### 4.2 프롬프트 보호 시스템

```typescript
// backend/prompts/step-prompts.ts
export const STEP_PROMPTS = {
  step0: process.env.PROMPT_STEP_0,
  step1: process.env.PROMPT_STEP_1,
  step2: process.env.PROMPT_STEP_2,
  step3: process.env.PROMPT_STEP_3,
  step4: process.env.PROMPT_STEP_4,
  step5: process.env.PROMPT_STEP_5,
  step6: process.env.PROMPT_STEP_6,
} as const;

// API Route Handler
export async function POST(req: Request) {
  const { step, userInput, previousData } = await req.json();
  
  // 프롬프트는 서버에서만 접근
  const systemPrompt = STEP_PROMPTS[`step${step}`];
  
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash-latest",
    systemInstruction: systemPrompt
  });
  
  const result = await model.generateContent({
    contents: [{
      role: "user",
      parts: [{ text: JSON.stringify({ userInput, previousData }) }]
    }]
  });
  
  return NextResponse.json({ 
    response: result.response.text(),
    nextStep: step + 1
  });
}
```

## 5. UI/UX 설계

### 5.1 핵심 화면 구성

#### 랜딩 페이지
```tsx
<Hero>
  <h1>당신만의 브랜드를 체계적으로 구축하세요</h1>
  <p>15년 검증된 7단계 시스템으로 브랜드 아이덴티티 완성</p>
  <Button>무료로 시작하기</Button>
</Hero>

<Features>
  - AI 기반 맞춤형 가이드
  - 단계별 체계적 프로세스
  - 실시간 피드백 및 개선
  - 최종 브랜드 가이드북 제공
</Features>
```

#### 대화형 빌더 인터페이스
```tsx
<BuilderLayout>
  <ProgressBar currentStep={currentStep} totalSteps={7} />
  
  <ChatInterface>
    <MessageList messages={messages} />
    <InputArea>
      <Textarea placeholder="답변을 입력하세요..." />
      <Button>전송</Button>
    </InputArea>
  </ChatInterface>
  
  <Sidebar>
    <StepNavigation steps={steps} currentStep={currentStep} />
    <SavedData data={brandData} />
  </Sidebar>
</BuilderLayout>
```

### 5.2 Shadcn/ui 컴포넌트 활용

```bash
# 필요한 컴포넌트 설치
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card dialog form input label 
pnpm dlx shadcn@latest add progress radio-group select separator
pnpm dlx shadcn@latest add sheet skeleton tabs textarea toast
```

## 6. 데이터베이스 스키마

```sql
-- Users 테이블
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  subscription_tier ENUM('free', 'premium') DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Brand Projects 테이블
CREATE TABLE brand_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_name VARCHAR(255) NOT NULL,
  current_step INTEGER DEFAULT 0,
  step_data JSONB DEFAULT '{}',
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Conversation History 테이블
CREATE TABLE conversation_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES brand_projects(id) ON DELETE CASCADE,
  step INTEGER NOT NULL,
  user_message TEXT,
  ai_response TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_projects_user ON brand_projects(user_id);
CREATE INDEX idx_history_project ON conversation_history(project_id);
```

## 7. API 엔드포인트 설계

### 7.1 주요 API Routes

```typescript
// app/api/brand/route.ts
POST   /api/brand/create       // 새 브랜드 프로젝트 생성
GET    /api/brand/[id]          // 브랜드 프로젝트 조회
PUT    /api/brand/[id]          // 브랜드 프로젝트 업데이트
DELETE /api/brand/[id]          // 브랜드 프로젝트 삭제

// app/api/step/route.ts
POST   /api/step/process        // 단계별 AI 처리
GET    /api/step/[id]/history   // 단계별 대화 기록 조회

// app/api/export/route.ts
POST   /api/export/pdf          // PDF 내보내기
POST   /api/export/notion       // Notion 내보내기
```

### 7.2 API 응답 형식

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  metadata?: {
    timestamp: string;
    version: string;
  };
}
```

## 8. 보안 및 성능

### 8.1 보안 고려사항
- **프롬프트 보호**: 모든 프롬프트는 환경 변수로 관리
- **Rate Limiting**: IP당 분당 10회 요청 제한
- **Input Validation**: Zod를 통한 입력 검증
- **SQL Injection 방지**: Prepared statements 사용
- **XSS 방지**: React의 자동 이스케이핑 + CSP 헤더

### 8.2 성능 최적화
- **캐싱**: Redis를 통한 AI 응답 캐싱 (TTL: 1시간)
- **스트리밍**: Gemini API 스트리밍 응답 활용
- **이미지 최적화**: Next.js Image 컴포넌트 활용
- **코드 스플리팅**: 동적 import를 통한 번들 크기 최적화
- **Edge Functions**: Vercel Edge Runtime 활용

## 9. 개발 로드맵

### Phase 1: MVP (2주)
- [ ] Next.js 프로젝트 초기 설정
- [ ] Shadcn/ui 컴포넌트 설정
- [ ] 기본 UI 레이아웃 구현
- [ ] Gemini API 연동
- [ ] Step 0-2 구현
- [ ] 기본 데이터 저장 기능

### Phase 2: Core Features (2주)
- [ ] Step 3-6 구현
- [ ] 사용자 인증 시스템
- [ ] 프로젝트 관리 기능
- [ ] 대화 히스토리 저장
- [ ] 프롬프트 최적화

### Phase 3: Polish (1주)
- [ ] UI/UX 개선
- [ ] 에러 처리 강화
- [ ] 로딩 상태 개선
- [ ] 반응형 디자인 완성
- [ ] 성능 최적화

### Phase 4: Launch (1주)
- [ ] Vercel 배포
- [ ] 도메인 연결
- [ ] 모니터링 설정
- [ ] 사용자 피드백 수집
- [ ] 버그 수정

## 10. 성공 지표 (KPIs)

### 10.1 사용자 지표
- **가입 전환율**: 방문자 대비 15% 이상
- **완료율**: 시작한 사용자의 40% 이상 7단계 완료
- **재방문율**: 월 1회 이상 재방문 50%
- **NPS**: 40점 이상

### 10.2 비즈니스 지표
- **MAU**: 3개월 내 1,000명
- **유료 전환율**: 무료 사용자의 10%
- **API 비용 대비 수익**: 300% 이상
- **고객 획득 비용(CAC)**: ₩10,000 이하

## 11. 리스크 및 대응 방안

### 11.1 기술적 리스크
| 리스크 | 영향도 | 대응 방안 |
|--------|--------|-----------|
| Gemini API 장애 | 높음 | OpenAI API 백업 준비 |
| 프롬프트 유출 | 높음 | 환경변수 + 암호화 이중 보호 |
| 비용 폭증 | 중간 | Rate limiting + 사용량 모니터링 |
| 성능 저하 | 중간 | 캐싱 + CDN 활용 |

### 11.2 비즈니스 리스크
| 리스크 | 영향도 | 대응 방안 |
|--------|--------|-----------|
| 낮은 사용자 참여 | 높음 | 온보딩 개선 + 튜토리얼 강화 |
| 경쟁 서비스 출현 | 중간 | 차별화 기능 지속 개발 |
| 수익성 부족 | 중간 | 가격 정책 유연화 + B2B 모델 검토 |

## 12. 부록

### 12.1 프롬프트 변환 가이드
```markdown
Claude → Gemini 변환 시 고려사항:
1. System prompt → systemInstruction으로 변경
2. XML 태그 → JSON 구조로 변환
3. 토큰 제한 고려 (1M 토큰 활용)
4. 멀티모달 기능 활용 가능
```

### 12.2 개발 환경 설정
```bash
# 프로젝트 생성
npx create-next-app@latest brand-identity-builder \
  --typescript --tailwind --app

# 의존성 설치
cd brand-identity-builder
pnpm add @google/generative-ai
pnpm add @supabase/supabase-js
pnpm add next-auth
pnpm add zustand
pnpm add react-hook-form zod
pnpm add @hookform/resolvers

# Shadcn/ui 초기화
pnpm dlx shadcn@latest init

# 개발 서버 실행
pnpm dev
```

### 12.3 환경 변수 템플릿
```env
# .env.local
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Prompt Templates (각 단계별 프롬프트)
PROMPT_STEP_0="[Step 0 프롬프트 내용]"
PROMPT_STEP_1="[Step 1 프롬프트 내용]"
PROMPT_STEP_2="[Step 2 프롬프트 내용]"
PROMPT_STEP_3="[Step 3 프롬프트 내용]"
PROMPT_STEP_4="[Step 4 프롬프트 내용]"
PROMPT_STEP_5="[Step 5 프롬프트 내용]"
PROMPT_STEP_6="[Step 6 프롬프트 내용]"
```

---

## 문서 버전 관리
- v1.0.0 (2025-01-12): 초기 PRD 작성
- 작성자: IMI WORK
- 검토자: -
- 승인자: -

## 연락처
- 프로젝트 매니저: hovoo@imiwork.com
- 기술 문의: dev@imiwork.com
- 비즈니스 문의: biz@imiwork.com

## Related Notes
- [[system-vs-tool-master]] - 높은 연관성
- [[business-operations-hub]] - 높은 연관성
- [[ai-automation-hub]] - 높은 연관성
- [[education-hub]] - 높은 연관성
- [[naver-seo-version]] - 높은 연관성
- [[menu-development-hub]] - 높은 연관성
- [[personal-tone-version]] - 높은 연관성
