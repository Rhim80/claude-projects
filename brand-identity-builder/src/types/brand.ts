// Core Brand Data Types
export interface BrandProject {
  id: string;
  userId?: string;
  projectName: string;
  currentStep: number;
  isCompleted: boolean;
  stepData: BrandStepData;
  createdAt: Date;
  updatedAt: Date;
}

export interface BrandStepData {
  step0?: Step0Data;
  step1?: Step1Data;
  step2?: Step2Data;
  step3?: Step3Data;
  step4?: Step4Data;
  step5?: Step5Data;
  step6?: Step6Data;
}

// Step 0: 브랜드 씨앗 발굴
export interface Step0Data {
  triggers: string[];      // 브랜드 시작 계기
  senses: {
    visual: string[];      // 시각적 영감
    auditory: string[];    // 청각적 영감  
    emotional: string[];   // 감정적 영감
  };
  seedStatement: string;   // 핵심 씨앗 문장
}

// Step 1: 브랜드 정체성 체계
export interface Step1Data {
  mission: string;         // 미션
  vision: string;          // 비전
  coreValues: string[];    // 핵심 가치 (3-5개)
  targetAudience: {
    demographics: string;  // 인구통계학적 특성
    psychographics: string; // 심리적 특성
    painPoints: string[];  // 고충점
  };
}

// Step 2: 브랜드 네이밍
export interface Step2Data {
  brandName: string;
  namingStrategy: 'functional' | 'philosophical' | 'hybrid' | 'metaphorical' | 'sound' | 'target';
  alternatives: string[];
  rationale: string;
}

// Step 3: 브랜드 언어 설계
export interface Step3Data {
  slogan: string;
  sloganStrategy: 'definition' | 'contrast' | 'action' | 'declaration' | 'philosophy' | 'question';
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

// Step 4: 컨셉 검증
export interface Step4Data {
  validationScores: {
    consistency: number;     // 일관성 (1-10)
    differentiation: number; // 차별성 (1-10)
    customerResponse: number; // 고객 반응도 (1-10)
    applicability: number;   // 적용성 (1-10)
    scalability: number;     // 확장성 (1-10)
  };
  totalScore: number;        // 총점 (/50)
  improvements: string[];
  finalApproval: boolean;
  reframingResults?: {
    actionFocused: string;
    valueFocused: string;
    challengeFocused: string;
  };
}

// Step 5: 실행 설계
export interface Step5Data {
  touchpoints: {
    website: string;
    social: string;
    offline: string;
    email: string;
    advertising: string;
    customerService: string;
  };
  roadmap: {
    immediate: string[];     // 1-2주
    shortTerm: string[];     // 1-3개월
    longTerm: string[];      // 6-12개월
  };
  budgetConsiderations?: string[];
}

// Step 6: 브랜딩 휠 완성
export interface Step6Data {
  brandingWheel: {
    core: string;           // 핵심 정체성
    attributes: string[];   // 브랜드 속성
    benefits: string[];     // 고객 혜택
    personality: string[];  // 브랜드 인격
  };
  finalDeliverable: string; // 최종 산출물 링크
  exportFormats: string[];  // PDF, Notion 등
}

// API Response Types
export interface ApiResponse<T> {
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

// Chat Interface Types  
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  stepNumber?: number;
}

export interface ChatSession {
  id: string;
  projectId: string;
  messages: ChatMessage[];
  currentStep: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Step Processing Types
export interface StepProcessRequest {
  projectId: string;
  step: number;
  userInput: string;
  previousData?: Partial<BrandStepData>;
}

export interface StepProcessResponse {
  response: string;
  nextStep?: number;
  isStepComplete: boolean;
  extractedData?: Partial<BrandStepData>;
  suggestions?: string[];
}

// UI State Types
export interface BuilderState {
  currentProject: BrandProject | null;
  currentStep: number;
  isLoading: boolean;
  error: string | null;
  chatMessages: ChatMessage[];
}

// Form Types for each step
export interface Step0Form {
  triggers: string;
  visualInspiration: string;
  auditoryInspiration: string;
  emotionalInspiration: string;
}

export interface Step1Form {
  mission: string;
  vision: string;
  coreValues: string;
  targetDemographics: string;
  targetPsychographics: string;
  painPoints: string;
}

// Validation Schemas (for Zod)
export const STEP_VALIDATION = {
  MAX_TRIGGERS: 10,
  MAX_CORE_VALUES: 5,
  MIN_CORE_VALUES: 3,
  MAX_ALTERNATIVES: 8,
  MIN_VALIDATION_SCORE: 1,
  MAX_VALIDATION_SCORE: 10,
  MIN_TOTAL_SCORE_PASS: 40,
} as const;

// Step Navigation
export interface StepMetadata {
  step: number;
  title: string;
  description: string;
  estimatedTime: string; // "10-15분"
  isCompleted: boolean;
  isActive: boolean;
  isAccessible: boolean;
}