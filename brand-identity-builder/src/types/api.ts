// Gemini API Types
export interface GeminiConfig {
  apiKey: string;
  model: 'gemini-2.5-flash' | 'gemini-1.5-pro-latest';
  maxOutputTokens?: number;
  temperature?: number;
  topP?: number;
  topK?: number;
}

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: Array<{
    text: string;
  }>;
}

export interface GeminiRequest {
  contents: GeminiMessage[];
  systemInstruction?: {
    role: 'system';
    parts: Array<{
      text: string;
    }>;
  };
  generationConfig?: {
    maxOutputTokens?: number;
    temperature?: number;
    topP?: number;
    topK?: number;
  };
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
      role: 'model';
    };
    finishReason: 'STOP' | 'MAX_TOKENS' | 'SAFETY' | 'RECITATION' | 'OTHER';
    index: number;
    safetyRatings: Array<{
      category: string;
      probability: string;
    }>;
  }>;
  promptFeedback?: {
    safetyRatings: Array<{
      category: string;
      probability: string;
    }>;
  };
  usageMetadata?: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
}

// Internal API Types
export interface ProjectCreateRequest {
  projectName: string;
  userId?: string;
}

export interface ProjectUpdateRequest {
  projectId: string;
  stepData: Partial<any>;
  currentStep?: number;
}

export interface StepPromptTemplate {
  step: number;
  systemPrompt: string;
  userPromptTemplate: string;
  expectedOutput: string[];
  validationRules: string[];
}

// Error Types
export interface ApiError {
  code: 'INVALID_INPUT' | 'AI_ERROR' | 'AUTH_ERROR' | 'RATE_LIMIT' | 'SERVER_ERROR';
  message: string;
  details?: any;
}

// Rate Limiting
export interface RateLimitConfig {
  windowMs: number;    // 시간 창 (밀리초)
  maxRequests: number; // 최대 요청 수
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

// Monitoring and Analytics
export interface UsageMetrics {
  userId?: string;
  projectId: string;
  step: number;
  tokensUsed: number;
  responseTime: number;
  timestamp: Date;
  success: boolean;
  errorCode?: string;
}

export interface SessionAnalytics {
  sessionId: string;
  projectId: string;
  startTime: Date;
  endTime?: Date;
  stepsCompleted: number;
  totalTokensUsed: number;
  userAgent?: string;
  referrer?: string;
}