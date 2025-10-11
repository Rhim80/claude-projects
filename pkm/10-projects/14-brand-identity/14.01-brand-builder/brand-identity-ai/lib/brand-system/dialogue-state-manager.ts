// 대화 상태 관리 시스템
import { BrandData, QAPair, StepSummary } from '../../src/types/brand';

// 사용자 의도 타입 정의
export type UserIntent =
  | 'answer'          // 정상 답변
  | 'clarification'   // 명확성 요청
  | 'help'            // 도움 요청
  | 'correction'      // 이전 답변 수정
  | 'navigation'      // 단계 이동 요청
  | 'restart'         // 재시작 요청
  | 'struggle'        // 어려움 표현
  | 'off_topic';      // 주제 이탈

// 대화 상태 정의
export interface DialogueState {
  currentStep: number;
  currentSubQuestion?: number;
  isWaitingForAnswer: boolean;
  retryCount: number;
  lastUserIntent: UserIntent;
  conversationMood: 'positive' | 'neutral' | 'frustrated';
  userEngagementLevel: 'high' | 'medium' | 'low';
  hasPartialData: boolean;
  needsClarification: boolean;
}

// 컨텍스트 정보
export interface ConversationContext {
  brandData: BrandData;
  qaHistory: QAPair[];
  dialogueState: DialogueState;
  userProfile: UserProfile;
  sessionStartTime: Date;
  lastActivity: Date;
}

// 사용자 프로필
export interface UserProfile {
  experienceLevel: 'beginner' | 'intermediate' | 'expert';
  preferredCommunicationStyle: 'formal' | 'casual' | 'encouraging';
  averageResponseLength: 'short' | 'medium' | 'long';
  strugglingAreas: string[];
  strongAreas: string[];
}

// 의도 분석 결과
export interface IntentAnalysis {
  intent: UserIntent;
  confidence: number;
  extractedInfo?: any;
  needsFollowUp: boolean;
  suggestedResponse?: string;
}

export class DialogueStateManager {
  private context: ConversationContext;

  constructor(initialBrandData: BrandData = {}) {
    this.context = {
      brandData: initialBrandData,
      qaHistory: [],
      dialogueState: {
        currentStep: 0,
        currentSubQuestion: 0,
        isWaitingForAnswer: true,
        retryCount: 0,
        lastUserIntent: 'answer',
        conversationMood: 'neutral',
        userEngagementLevel: 'medium',
        hasPartialData: false,
        needsClarification: false
      },
      userProfile: {
        experienceLevel: 'beginner',
        preferredCommunicationStyle: 'encouraging',
        averageResponseLength: 'medium',
        strugglingAreas: [],
        strongAreas: []
      },
      sessionStartTime: new Date(),
      lastActivity: new Date()
    };
  }

  // 사용자 의도 분석
  analyzeUserIntent(userInput: string): IntentAnalysis {
    const lowercaseInput = userInput.toLowerCase();

    // 도움 요청 패턴
    const helpPatterns = [
      /모르겠어/, /잘 모르겠어/, /어려워/, /힘들어/, /도와줘/, /도와주세요/,
      /예시/, /예를 들어/, /구체적으로/, /어떻게/, /뭘/, /무엇을/
    ];

    // 수정 요청 패턴
    const correctionPatterns = [
      /수정/, /바꾸고/, /다시/, /틀렸/, /잘못/, /아니야/, /아니에요/
    ];

    // 주제 이탈 패턴
    const offTopicPatterns = [
      /안녕/, /날씨/, /나이/, /뭐해/, /시간/, /음식/, /맛집/
    ];

    // 좌절감 패턴
    const strugglePatterns = [
      /모르겠어/, /어려워/, /복잡해/, /너무 많아/, /못하겠어/, /포기/
    ];

    if (helpPatterns.some(pattern => pattern.test(lowercaseInput))) {
      return {
        intent: 'help',
        confidence: 0.9,
        needsFollowUp: true,
        suggestedResponse: 'help_guidance'
      };
    }

    if (correctionPatterns.some(pattern => pattern.test(lowercaseInput))) {
      return {
        intent: 'correction',
        confidence: 0.85,
        needsFollowUp: true
      };
    }

    if (offTopicPatterns.some(pattern => pattern.test(lowercaseInput))) {
      return {
        intent: 'off_topic',
        confidence: 0.8,
        needsFollowUp: true,
        suggestedResponse: 'redirect_to_topic'
      };
    }

    if (strugglePatterns.some(pattern => pattern.test(lowercaseInput))) {
      return {
        intent: 'struggle',
        confidence: 0.85,
        needsFollowUp: true,
        suggestedResponse: 'encourage_and_simplify'
      };
    }

    // 기본적으로 답변으로 간주
    return {
      intent: 'answer',
      confidence: 0.7,
      needsFollowUp: false
    };
  }

  // 대화 상태 업데이트
  updateDialogueState(userInput: string, aiResponse: string): void {
    const intentAnalysis = this.analyzeUserIntent(userInput);

    this.context.dialogueState.lastUserIntent = intentAnalysis.intent;
    this.context.lastActivity = new Date();

    // 재시도 횟수 관리
    if (intentAnalysis.intent === 'help' || intentAnalysis.intent === 'struggle') {
      this.context.dialogueState.retryCount++;
    } else if (intentAnalysis.intent === 'answer') {
      this.context.dialogueState.retryCount = 0;
    }

    // 사용자 참여도 평가
    this.updateEngagementLevel(userInput, intentAnalysis);

    // 대화 분위기 업데이트
    this.updateConversationMood(intentAnalysis);
  }

  private updateEngagementLevel(userInput: string, intentAnalysis: IntentAnalysis): void {
    const inputLength = userInput.length;
    const hasDetails = /구체적|자세히|예를 들어|상황|경험|느낌/.test(userInput);

    if (intentAnalysis.intent === 'answer' && inputLength > 100 && hasDetails) {
      this.context.dialogueState.userEngagementLevel = 'high';
    } else if (intentAnalysis.intent === 'help' || intentAnalysis.intent === 'struggle') {
      this.context.dialogueState.userEngagementLevel = 'low';
    } else {
      this.context.dialogueState.userEngagementLevel = 'medium';
    }
  }

  private updateConversationMood(intentAnalysis: IntentAnalysis): void {
    if (intentAnalysis.intent === 'struggle' || this.context.dialogueState.retryCount > 2) {
      this.context.dialogueState.conversationMood = 'frustrated';
    } else if (intentAnalysis.intent === 'answer' && this.context.dialogueState.retryCount === 0) {
      this.context.dialogueState.conversationMood = 'positive';
    } else {
      this.context.dialogueState.conversationMood = 'neutral';
    }
  }

  // 사용자 프로필 업데이트
  updateUserProfile(userInput: string, quality: string): void {
    // 답변 길이 패턴 분석
    const inputLength = userInput.length;
    if (inputLength < 50) {
      this.context.userProfile.averageResponseLength = 'short';
    } else if (inputLength > 200) {
      this.context.userProfile.averageResponseLength = 'long';
    }

    // 경험 수준 추정
    const professionalTerms = /브랜딩|마케팅|타겟|포지셔닝|차별화|아이덴티티/.test(userInput);
    if (professionalTerms && quality === 'excellent') {
      this.context.userProfile.experienceLevel = 'intermediate';
    }
  }

  // 다음 액션 결정
  getNextAction(): {
    action: 'proceed' | 'retry' | 'clarify' | 'help' | 'redirect';
    message?: string;
    params?: any;
  } {
    const state = this.context.dialogueState;

    if (state.lastUserIntent === 'help') {
      return {
        action: 'help',
        message: 'provide_guidance'
      };
    }

    if (state.lastUserIntent === 'off_topic') {
      return {
        action: 'redirect',
        message: 'redirect_to_brand_topic'
      };
    }

    if (state.conversationMood === 'frustrated') {
      return {
        action: 'help',
        message: 'encourage_and_simplify'
      };
    }

    if (state.retryCount > 3) {
      return {
        action: 'help',
        message: 'provide_examples'
      };
    }

    return { action: 'proceed' };
  }

  // 컨텍스트 접근자
  getContext(): ConversationContext {
    return this.context;
  }

  getCurrentState(): DialogueState {
    return this.context.dialogueState;
  }

  getUserProfile(): UserProfile {
    return this.context.userProfile;
  }

  // 상태 저장/복원
  saveState(): string {
    return JSON.stringify(this.context);
  }

  loadState(savedState: string): void {
    try {
      this.context = JSON.parse(savedState);
      this.context.lastActivity = new Date();
    } catch (error) {
      console.error('Failed to load dialogue state:', error);
    }
  }

  // 세션 초기화
  resetSession(): void {
    this.context = {
      ...this.context,
      brandData: {},
      qaHistory: [],
      dialogueState: {
        currentStep: 0,
        currentSubQuestion: 0,
        isWaitingForAnswer: true,
        retryCount: 0,
        lastUserIntent: 'answer',
        conversationMood: 'neutral',
        userEngagementLevel: 'medium',
        hasPartialData: false,
        needsClarification: false
      },
      sessionStartTime: new Date(),
      lastActivity: new Date()
    };
  }
}