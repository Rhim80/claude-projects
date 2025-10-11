# Brand Identity Builder - AI 챗봇 시스템 PRD v2.0

## 1. Executive Summary

### 1.1 Product Overview
**Product Name**: Brand Identity Builder  
**Version**: 2.0.0  
**Document Date**: 2025-01-13  
**Author**: IMI WORK

**핵심 변경사항**: Figma 디자인 기반 AI 챗봇 시스템으로 완전 재구축. Gemini 2.5 Flash API를 활용한 7단계 브랜드 구축 대화형 플랫폼.

### 1.2 핵심 가치 제안
- **AI 개인 브랜드 코치**: 15년 검증된 브랜딩 시스템 + Gemini AI의 대화형 가이드
- **한국어 최적화**: 한국 사용자를 위한 자연스러운 대화 경험
- **실시간 브랜드 구축**: 7단계 과정을 통한 체계적 브랜드 아이덴티티 완성
- **Figma 디자인 완벽 구현**: 전문적이고 세련된 다크 테마 UI

## 2. 기술 스택 및 아키텍처

### 2.1 핵심 기술 스택
```yaml
Frontend:
  - Framework: Next.js 14 (App Router)
  - Language: TypeScript 5.x
  - Styling: Tailwind CSS 3.4 (다크 테마)
  - UI Components: Radix UI + shadcn/ui
  - Icons: Lucide React
  - State Management: React Hooks (useState, useEffect)

Backend:
  - Runtime: Next.js API Routes (App Router)
  - AI Model: Gemini 2.5 Flash (gemini-2.5-flash-latest)
  - Response: Streaming API
  - Environment: Environment Variables (프롬프트 보호)

Infrastructure:
  - Hosting: Vercel
  - CDN: Vercel Edge Network
  - Environment: Node.js 20.x
  - Package Manager: npm
```

### 2.2 시스템 아키텍처
```
┌─────────────────────────────────────────┐
│           Client (Browser)               │
│  ┌─────────────────────────────────┐    │
│  │  Figma Design Implementation    │    │
│  │  - Dark Theme UI                │    │
│  │  - Chat Interface               │    │
│  │  - Progress Tracker             │    │
│  │  - Real-time Response Display   │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
                    ↕ HTTPS
┌─────────────────────────────────────────┐
│         Next.js API Routes              │
│  ┌─────────────────────────────────┐    │
│  │  /api/chat - Gemini Integration │    │
│  │  Protected Prompt Templates     │    │
│  │  Korean Language Processing     │    │
│  │  Streaming Response Handler     │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
                    ↕
┌─────────────────────────────────────────┐
│          Gemini 2.5 Flash API           │
│  - Korean Language Optimized            │
│  - Context-aware Conversations          │
│  - Structured Data Extraction           │
│  - Real-time Streaming Responses        │
└─────────────────────────────────────────┘
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
  - Korean Language Support
  - System instructions support
  - Streaming responses
  - Context preservation
```

### 3.2 예상 비용 분석
```yaml
사용자당 평균 세션:
  - 7단계 완료: 약 60,000 토큰 (입력+출력)
  - 비용: 약 $0.018 (약 25원)

월간 예상 (1000명 기준):
  - 총 토큰: 60M tokens
  - 예상 비용: $18 (약 2.5만원)
  
수익 모델:
  - 무료: 2단계까지 체험
  - 프리미엄: ₩9,900/월 (전체 단계 + 무제한 브랜드 프로젝트)
  - 손익분기점: 약 3명/월
```

## 4. 핵심 기능 명세

### 4.1 7단계 AI 대화 시스템

#### Step 0: 브랜드 씨앗 발굴
- **AI 역할**: 브랜드 트리거와 감각적 요소 발굴 전문가
- **대화 스타일**: 친근하고 탐구적
- **추출 데이터**: triggers, sensoryKeywords, seedStatement

#### Step 1: 브랜드 정체성 체계
- **AI 역할**: 전략적 브랜드 컨설턴트
- **대화 스타일**: 체계적이고 논리적
- **추출 데이터**: mission, vision, coreValues, targetAudience

#### Step 2: 브랜드 네이밍
- **AI 역할**: 네이밍 전략 전문가
- **대화 스타일**: 창의적이고 분석적
- **추출 데이터**: brandName, namingStrategy, alternatives

#### Step 3: 브랜드 언어 설계
- **AI 역할**: 브랜드 언어 디자이너
- **대화 스타일**: 언어적이고 감성적
- **추출 데이터**: slogan, voiceGuidelines, keyMessages

#### Step 4: 컨셉 검증
- **AI 역할**: 브랜드 분석가
- **대화 스타일**: 객관적이고 비판적
- **추출 데이터**: validationScores, improvements, recommendations

#### Step 5: 실행 설계
- **AI 역할**: 실행 전략 플래너
- **대화 스타일**: 실무적이고 구체적
- **추출 데이터**: channelStrategies, implementationRoadmap

#### Step 6: 브랜딩 휠 완성
- **AI 역할**: 브랜드 통합 전문가
- **대화 스타일**: 종합적이고 완성적
- **추출 데이터**: coreEssence, brandAttributes, customerBenefits, brandPersonality

### 4.2 AI 대화 시스템 구조

```typescript
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  step: number;
}

interface BrandData {
  // Step 0
  triggers?: string;
  sensoryKeywords?: string;
  seedStatement?: string;
  
  // Step 1
  mission?: string;
  vision?: string;
  coreValues?: string[];
  targetAudience?: string;
  
  // Step 2
  brandName?: string;
  namingStrategy?: string;
  alternatives?: string[];
  
  // Step 3
  slogan?: string;
  voiceGuidelines?: { do: string[]; dont: string[] };
  keyMessages?: string[];
  
  // Step 4
  validationScores?: {
    consistency: number;
    differentiation: number;
    marketFit: number;
    memorability: number;
    relevance: number;
  };
  improvements?: string[];
  
  // Step 5
  channelStrategies?: string;
  implementationRoadmap?: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  
  // Step 6
  coreEssence?: string;
  brandAttributes?: string[];
  customerBenefits?: string[];
  brandPersonality?: string[];
}
```

## 5. API 엔드포인트 설계

### 5.1 주요 API Routes

```typescript
// app/api/chat/route.ts
POST /api/chat
Request: {
  message: string;
  step: number;
  conversationHistory: ChatMessage[];
  currentBrandData: Partial<BrandData>;
}
Response: {
  message: string;
  extractedData: Partial<BrandData>;
  nextStep?: number;
  isStepComplete: boolean;
}

// app/api/export/route.ts
POST /api/export
Request: {
  brandData: BrandData;
  format: 'pdf' | 'json' | 'markdown';
}
Response: {
  downloadUrl: string;
}
```

### 5.2 Gemini API 통합

```typescript
// lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function processStepConversation(
  step: number,
  userMessage: string,
  conversationHistory: ChatMessage[],
  currentBrandData: Partial<BrandData>
) {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash-latest",
    systemInstruction: getStepPrompt(step)
  });

  const prompt = buildContextualPrompt(
    userMessage, 
    conversationHistory, 
    currentBrandData
  );

  const result = await model.generateContentStream(prompt);
  return result;
}
```

## 6. 프롬프트 시스템 설계

### 6.1 단계별 프롬프트 구조

```typescript
const STEP_PROMPTS = {
  0: `당신은 15년 경력의 브랜드 전문가입니다. 
      사용자의 브랜드 씨앗을 발굴하는 것이 목표입니다.
      
      역할:
      - 브랜드의 시작점과 트리거 요소 탐구
      - 감각적 키워드와 감정적 연결점 발견
      - 브랜드 씨앗 문장 도출
      
      대화 스타일:
      - 친근하고 호기심 많은 탐구자
      - 구체적인 경험과 감정에 집중
      - 시각, 청각, 촉각적 요소 중시
      
      한국어로 자연스럽게 대화하며, 사용자의 답변에서 다음 데이터를 추출하세요:
      - triggers: 브랜드 시작 계기
      - sensoryKeywords: 감각적 키워드들
      - seedStatement: 핵심 씨앗 문장`,
      
  1: `당신은 전략적 브랜드 컨설턴트입니다.
      사용자의 브랜드 정체성 체계를 구축하는 것이 목표입니다.
      
      역할:
      - 명확한 미션과 비전 수립
      - 핵심 가치 체계 정립
      - 타겟 오디언스 정의
      
      대화 스타일:
      - 체계적이고 논리적인 접근
      - 구체적인 질문으로 명확화
      - 비즈니스 관점과 철학적 관점 균형
      
      한국어로 대화하며, 다음 데이터를 추출하세요:
      - mission: 브랜드 미션
      - vision: 브랜드 비전  
      - coreValues: 핵심 가치들
      - targetAudience: 타겟 오디언스`,
      
  // ... Step 2-6 프롬프트
} as const;
```

### 6.2 프롬프트 보호 시스템

```typescript
// 환경 변수로 프롬프트 보호
// .env.local
GEMINI_API_KEY=your_gemini_api_key
PROMPT_STEP_0="[Step 0 전문 프롬프트]"
PROMPT_STEP_1="[Step 1 전문 프롬프트]"
PROMPT_STEP_2="[Step 2 전문 프롬프트]"
PROMPT_STEP_3="[Step 3 전문 프롬프트]"
PROMPT_STEP_4="[Step 4 전문 프롬프트]"
PROMPT_STEP_5="[Step 5 전문 프롬프트]"
PROMPT_STEP_6="[Step 6 전문 프롬프트]"

// API Route에서만 접근
export function getStepPrompt(step: number): string {
  return process.env[`PROMPT_STEP_${step}`] || '';
}
```

## 7. Figma 디자인 구현

### 7.1 UI 컴포넌트 구조

```typescript
// 기존 Figma 컴포넌트 활용
BrandIdentityBuilder.tsx      // 메인 컨테이너
├── ChatInterface.tsx         // AI 대화 인터페이스
├── ProgressTracker.tsx       // 7단계 진행 표시
├── FinalReport.tsx          // 최종 브랜드 리포트
└── ui/                      // Radix UI 컴포넌트들
    ├── card.tsx
    ├── button.tsx
    ├── textarea.tsx
    ├── collapsible.tsx
    └── progress.tsx
```

### 7.2 다크 테마 적용

```css
/* 기존 Figma CSS 활용 */
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 84% 4.9%;
  /* ... 기타 색상 변수들 */
}
```

## 8. 개발 로드맵

### Phase 1: 프로젝트 초기화 (1일)
- [x] 기존 코드 정리
- [x] Figma 디자인 분석
- [ ] Next.js 프로젝트 초기화
- [ ] 기본 패키지 설치

### Phase 2: AI 백엔드 구축 (2일)
- [ ] Gemini API 연동
- [ ] 7단계 프롬프트 시스템 구축
- [ ] API Routes 구현
- [ ] 스트리밍 응답 처리

### Phase 3: 프론트엔드 구현 (2일)
- [ ] Figma 컴포넌트 이식
- [ ] AI 채팅 인터페이스 구현
- [ ] 실시간 응답 표시
- [ ] 진행 상태 트래킹

### Phase 4: 통합 및 테스트 (1일)
- [ ] 전체 시스템 통합
- [ ] 한국어 대화 품질 테스트
- [ ] UI/UX 최적화
- [ ] 배포 준비

## 9. 성공 지표 (KPIs)

### 9.1 사용자 지표
- **대화 완료율**: 시작한 사용자의 60% 이상 7단계 완료
- **대화 품질**: AI 응답 만족도 8점 이상 (10점 만점)
- **재사용률**: 월 1회 이상 재방문 40%

### 9.2 기술 지표
- **응답 속도**: 평균 3초 이내 첫 응답
- **API 비용**: 사용자당 30원 이하
- **시스템 안정성**: 99% 이상 가동률

## 10. 리스크 및 대응 방안

### 10.1 기술적 리스크
| 리스크 | 영향도 | 대응 방안 |
|--------|--------|-----------|
| Gemini API 장애 | 높음 | 응답 캐싱 + 에러 처리 강화 |
| 한국어 품질 | 중간 | 프롬프트 튜닝 + 테스트 강화 |
| 비용 폭증 | 중간 | 토큰 사용량 모니터링 |

### 10.2 비즈니스 리스크
| 리스크 | 영향도 | 대응 방안 |
|--------|--------|-----------|
| 낮은 대화 완료율 | 높음 | 단계별 가이드 개선 |
| AI 응답 품질 | 높음 | 프롬프트 지속 최적화 |

---

## 문서 버전 관리
- v2.0.0 (2025-01-13): AI 챗봇 시스템 PRD 작성
- 작성자: IMI WORK
- 기반: Figma 디자인 + brand-identity-system 콘텐츠

## 연락처
- 프로젝트 매니저: hovoo@imiwork.com

- [[10-projects/14-brand-identity/14.01-brand-builder/brand-identity-builder-prd]] - Brand Identity Builder 시스템
- [[10-projects/14-brand-identity/14.01-brand-builder/brand-identity-ai/brand-identity-builder-prd]] - Brand Identity Builder 시스템

## Related Notes

- [[40-personal/44-reflections/learning/ab-method-philosophy]] - ai_automation 관련; 10-projects ↔ 40-personal 연결
- [[30-knowledge/36-ai-tools/36.01-claude-code/ab-method-study/ab-method/.ab-method/core/resume-mission]] - ai_automation 관련; 10-projects ↔ 30-knowledge 연결
- [[30-knowledge/36-ai-tools/36.01-claude-code/ab-method-study/awesome-claude-code/resources/claude-files/Giselle/CLAUDE]] - ai_automation 관련; 10-projects ↔ 30-knowledge 연결
- [[.claude/commands/release]] - ai_automation 관련; 10-projects ↔ .claude 연결
- [[40-personal/44-reflections/learning/git-repository-study-plan]] - ai_automation 관련; 10-projects ↔ 40-personal 연결
