// 브랜드 아이덴티티 빌더 타입 정의

// 각 단계별 산출물 정의
export interface Step0Output {
  // 브랜드 씨앗 발굴 산출물
  brandType: string;
  triggerStory: string;
  painPoint: string;
  idealScene: string;
  brandSense: {
    color: string;
    season: string;
    music: string;
    speed: string;
    texture: string;
  };
  principles: {
    keep: string[];
    avoid: string[];
  };
  targetCustomer: {
    fit: string;
    notFit: string;
  };
  oneLineIdentity: string;
}

export interface Step1Output {
  // 브랜드 정체성 체계 산출물
  mission: string;
  vision: string;
  coreValues: string[];
  targetAudience: string;
}

export interface Step2Output {
  // 브랜드 네이밍 산출물
  finalBrandName: string;
  namingStrategy: string;
  alternatives: string[];
  domainCheck?: string[];
}

export interface Step3Output {
  // 브랜드 언어 설계 산출물
  brandSlogan: string;
  toneAndManner: {
    do: string[];
    dont: string[];
  };
  keyMessages: string[];
  forbiddenExpressions: string[];
}

export interface Step4Output {
  // 컨셉 검증 산출물
  validationScores: {
    consistency: number;
    differentiation: number;
    marketFit: number;
    memorability: number;
    relevance: number;
  };
  totalScore: number;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  competitiveAdvantages: string[];
}

export interface Step5Output {
  // 실행 설계 산출물
  channelStrategies: {
    online: string[];
    offline: string[];
  };
  roadmap: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  requiredResources: string[];
  kpiTargets: string[];
}

export interface Step6Output {
  // 브랜딩 휠 완성 산출물
  brandEssence: string;
  attributes: string[];
  benefits: string[];
  personality: string[];
  finalBrandBook: {
    summary: string;
    guidelines: string;
  };
}

// 단계별 산출물을 담는 통합 인터페이스
export interface StepOutputs {
  step0?: Step0Output;
  step1?: Step1Output;
  step2?: Step2Output;
  step3?: Step3Output;
  step4?: Step4Output;
  step5?: Step5Output;
  step6?: Step6Output;
}

// 단계 요약 정보
export interface StepSummary {
  step: number;
  title: string;
  mission: string;
  output: any; // 해당 단계의 산출물
  completedAt: string;
  isEditable: boolean;
}

// 누적 컨텍스트
export interface CumulativeContext {
  currentStep: number;
  completedSteps: StepSummary[];
  outputs: StepOutputs;
}

// 기존 BrandData 인터페이스 확장
export interface BrandData {
  // Step 0 관련
  currentQuestion?: number;
  brandType?: string;
  step0Data?: {
    startingMoment?: string;
    painPoint?: string;
    idealScene?: string;
    brandSense?: {
      color?: string;
      season?: string;
      music?: string;
      speed?: string;
      texture?: string;
      other?: string;
    };
    principles?: {
      keep?: string[];
      avoid?: string[];
    };
    targetCustomer?: {
      fit?: string;
      notFit?: string;
    };
    identity?: string;
  };

  // 산출물 관리
  stepOutputs?: StepOutputs;
  cumulativeContext?: CumulativeContext;
  
  // 기존 필드들 (호환성 유지)
  triggers?: string;
  sensoryKeywords?: string;
  seedStatement?: string;
  mission?: string;
  vision?: string;
  values?: string[];
  targetAudience?: string;
  brandName?: string;
  namingStrategy?: string;
  alternatives?: string[];
  slogan?: string;
  voiceGuidelines?: { do: string[]; dont: string[] };
  keyMessages?: string[];
  scores?: { consistency: number; differentiation: number; marketFit: number; memorability: number; relevance: number };
  totalScore?: number;
  improvements?: string[];
  channelStrategies?: string;
  roadmap?: { immediate: string[]; shortTerm: string[]; longTerm: string[] };
  coreEssence?: string;
  attributes?: string[];
  benefits?: string[];
  personality?: string[];
}

// QA 히스토리 (기존)
export interface QAPair {
  question: string;
  answer: string;
  step: number;
}