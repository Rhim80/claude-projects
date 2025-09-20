// 오류 복구 처리 시스템
import { UserIntent, DialogueState, ConversationContext } from './dialogue-state-manager';
import { ExtendedUserProfile } from './user-profiler';
import { BrandData, QAPair } from '../../src/types/brand';

// 오류 타입 정의
export type ErrorType =
  | 'api_failure'           // API 호출 실패
  | 'parsing_error'         // JSON 파싱 오류
  | 'incomplete_answer'     // 불완전한 답변
  | 'invalid_input'         // 유효하지 않은 입력
  | 'context_loss'          // 컨텍스트 손실
  | 'session_timeout'       // 세션 타임아웃
  | 'data_corruption'       // 데이터 손상
  | 'user_confusion'        // 사용자 혼란
  | 'repeated_failure'      // 반복적 실패
  | 'step_regression';      // 단계 후퇴

// 오류 심각도
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

// 복구 전략
export type RecoveryStrategy =
  | 'retry'                 // 재시도
  | 'rollback'              // 이전 상태로 복구
  | 'simplify'              // 질문 단순화
  | 'provide_examples'      // 예시 제공
  | 'change_approach'       // 접근 방식 변경
  | 'skip_step'             // 단계 건너뛰기
  | 'reset_session'         // 세션 초기화
  | 'manual_intervention';  // 수동 개입 필요

// 오류 정보
export interface ErrorInfo {
  type: ErrorType;
  severity: ErrorSeverity;
  message: string;
  timestamp: Date;
  context: {
    step: number;
    subQuestion?: number;
    lastUserInput?: string;
    lastAiResponse?: string;
    retryCount: number;
  };
  stackTrace?: string;
}

// 복구 액션
export interface RecoveryAction {
  strategy: RecoveryStrategy;
  message: string;
  nextStep?: number;
  nextSubQuestion?: number;
  modifiedBrandData?: Partial<BrandData>;
  userGuidance?: string[];
  preventiveActions?: string[];
}

// 복구 결과
export interface RecoveryResult {
  success: boolean;
  action: RecoveryAction;
  updatedContext?: Partial<ConversationContext>;
  userMessage: string;
  shouldContinue: boolean;
}

export class ErrorRecoveryHandler {
  private errorHistory: ErrorInfo[] = [];
  private recoveryAttempts: Map<string, number> = new Map();
  private maxRetryAttempts = 3;
  private maxErrorHistory = 50;

  // 오류 감지 및 분류
  detectError(
    error: any,
    context: ConversationContext,
    userInput?: string,
    aiResponse?: string
  ): ErrorInfo | null {

    const now = new Date();
    const dialogueState = context.dialogueState;

    // API 실패 감지
    if (error?.message?.includes('API') || error?.code === 'NETWORK_ERROR') {
      return {
        type: 'api_failure',
        severity: 'high',
        message: 'AI 서비스 연결에 문제가 발생했습니다.',
        timestamp: now,
        context: {
          step: dialogueState.currentStep,
          subQuestion: dialogueState.currentSubQuestion,
          lastUserInput: userInput,
          lastAiResponse: aiResponse,
          retryCount: dialogueState.retryCount
        }
      };
    }

    // JSON 파싱 오류 감지
    if (error?.name === 'SyntaxError' || error?.message?.includes('JSON')) {
      return {
        type: 'parsing_error',
        severity: 'medium',
        message: 'AI 응답 처리 중 오류가 발생했습니다.',
        timestamp: now,
        context: {
          step: dialogueState.currentStep,
          retryCount: dialogueState.retryCount
        }
      };
    }

    // 반복적 실패 감지
    if (dialogueState.retryCount > this.maxRetryAttempts) {
      return {
        type: 'repeated_failure',
        severity: 'high',
        message: '같은 질문에서 여러 번 어려움을 겪고 계십니다.',
        timestamp: now,
        context: {
          step: dialogueState.currentStep,
          subQuestion: dialogueState.currentSubQuestion,
          retryCount: dialogueState.retryCount
        }
      };
    }

    // 사용자 혼란 감지
    if (this.detectUserConfusion(userInput, context)) {
      return {
        type: 'user_confusion',
        severity: 'medium',
        message: '사용자가 혼란스러워하는 것 같습니다.',
        timestamp: now,
        context: {
          step: dialogueState.currentStep,
          lastUserInput: userInput,
          retryCount: dialogueState.retryCount
        }
      };
    }

    // 세션 타임아웃 감지
    const timeSinceLastActivity = now.getTime() - context.lastActivity.getTime();
    if (timeSinceLastActivity > 30 * 60 * 1000) { // 30분
      return {
        type: 'session_timeout',
        severity: 'medium',
        message: '세션이 오래 비활성 상태였습니다.',
        timestamp: now,
        context: {
          step: dialogueState.currentStep,
          retryCount: 0
        }
      };
    }

    return null;
  }

  // 사용자 혼란 감지
  private detectUserConfusion(userInput?: string, context?: ConversationContext): boolean {
    if (!userInput) return false;

    const confusionPatterns = [
      /무슨 말|무슨 뜻|이해 못|잘 모르겠|헷갈려|어려워/,
      /다시|처음부터|설명|도움/,
      /뭐|어떻게|왜|어디서/
    ];

    const hasConfusionPattern = confusionPatterns.some(pattern => pattern.test(userInput));
    const isShortResponse = userInput.length < 10;
    const hasRecentHelp = context?.dialogueState.lastUserIntent === 'help';

    return hasConfusionPattern || (isShortResponse && hasRecentHelp);
  }

  // 복구 전략 결정
  determineRecoveryStrategy(errorInfo: ErrorInfo, userProfile: ExtendedUserProfile): RecoveryAction {
    const errorKey = `${errorInfo.type}-${errorInfo.context.step}`;
    const attemptCount = this.recoveryAttempts.get(errorKey) || 0;
    this.recoveryAttempts.set(errorKey, attemptCount + 1);

    switch (errorInfo.type) {
      case 'api_failure':
        return this.handleApiFailure(errorInfo, attemptCount);

      case 'parsing_error':
        return this.handleParsingError(errorInfo, attemptCount);

      case 'repeated_failure':
        return this.handleRepeatedFailure(errorInfo, userProfile);

      case 'user_confusion':
        return this.handleUserConfusion(errorInfo, userProfile);

      case 'session_timeout':
        return this.handleSessionTimeout(errorInfo);

      case 'incomplete_answer':
        return this.handleIncompleteAnswer(errorInfo, userProfile);

      default:
        return this.handleGenericError(errorInfo, attemptCount);
    }
  }

  // API 실패 처리
  private handleApiFailure(errorInfo: ErrorInfo, attemptCount: number): RecoveryAction {
    if (attemptCount < 2) {
      return {
        strategy: 'retry',
        message: '잠시 기술적인 문제가 있었습니다. 다시 시도하겠습니다.',
        userGuidance: ['잠시 후 다시 답변해주세요.'],
        preventiveActions: ['네트워크 연결 확인']
      };
    } else {
      return {
        strategy: 'manual_intervention',
        message: '기술적인 문제가 지속되고 있습니다. 잠시 후 다시 시도해주세요.',
        userGuidance: [
          '브라우저를 새로고침해보세요.',
          '네트워크 연결을 확인해주세요.',
          '문제가 지속되면 고객지원에 문의해주세요.'
        ]
      };
    }
  }

  // 파싱 오류 처리
  private handleParsingError(errorInfo: ErrorInfo, attemptCount: number): RecoveryAction {
    if (attemptCount < 2) {
      return {
        strategy: 'retry',
        message: '응답 처리 중 문제가 있었습니다. 다시 처리하겠습니다.',
        userGuidance: ['같은 내용으로 다시 답변해주세요.']
      };
    } else {
      return {
        strategy: 'simplify',
        message: '더 간단한 방식으로 진행하겠습니다.',
        userGuidance: ['간단하고 명확하게 답변해주세요.']
      };
    }
  }

  // 반복적 실패 처리
  private handleRepeatedFailure(errorInfo: ErrorInfo, userProfile: ExtendedUserProfile): RecoveryAction {
    if (userProfile.learningStyle.prefersExamples) {
      return {
        strategy: 'provide_examples',
        message: '이 질문이 어려우시군요. 구체적인 예시를 들어 설명드리겠습니다.',
        userGuidance: [
          '예시를 참고해서 비슷하게 답변해주세요.',
          '완벽하지 않아도 괜찮습니다.',
          '생각나는 대로 편하게 말씀해주세요.'
        ]
      };
    } else {
      return {
        strategy: 'simplify',
        message: '좀 더 쉬운 방식으로 접근해보겠습니다.',
        userGuidance: [
          '간단하게 한 문장으로만 답변해도 좋습니다.',
          '떠오르는 키워드만 말씀해주세요.'
        ]
      };
    }
  }

  // 사용자 혼란 처리
  private handleUserConfusion(errorInfo: ErrorInfo, userProfile: ExtendedUserProfile): RecoveryAction {
    return {
      strategy: 'change_approach',
      message: '제가 질문을 너무 복잡하게 했나 보네요. 다른 방식으로 접근해보겠습니다.',
      userGuidance: [
        '어떤 부분이 어려우신지 말씀해주세요.',
        '아는 것만 말씀해주셔도 됩니다.',
        '예/아니오로만 답변하셔도 괜찮습니다.'
      ],
      preventiveActions: ['질문 단순화', '선택지 제공']
    };
  }

  // 세션 타임아웃 처리
  private handleSessionTimeout(errorInfo: ErrorInfo): RecoveryAction {
    return {
      strategy: 'rollback',
      message: '오랜 시간 비활성 상태였네요. 이전 진행상황을 확인하고 계속 진행하겠습니다.',
      userGuidance: [
        '지금까지의 진행상황을 확인해주세요.',
        '어디서부터 계속할지 알려주세요.'
      ]
    };
  }

  // 불완전한 답변 처리
  private handleIncompleteAnswer(errorInfo: ErrorInfo, userProfile: ExtendedUserProfile): RecoveryAction {
    if (userProfile.learningStyle.needsEncouragement) {
      return {
        strategy: 'provide_examples',
        message: '좋은 시작입니다! 조금 더 자세히 설명해주시면 더 도움이 될 것 같아요.',
        userGuidance: [
          '예를 들어, 구체적인 상황이나 경험이 있나요?',
          '어떤 느낌이나 생각이 드셨나요?'
        ]
      };
    } else {
      return {
        strategy: 'simplify',
        message: '추가로 몇 가지만 더 알려주세요.',
        userGuidance: ['구체적인 예시나 상황을 하나만 더 들려주세요.']
      };
    }
  }

  // 일반적 오류 처리
  private handleGenericError(errorInfo: ErrorInfo, attemptCount: number): RecoveryAction {
    if (attemptCount < 2) {
      return {
        strategy: 'retry',
        message: '일시적인 문제가 있었습니다. 다시 시도하겠습니다.',
        userGuidance: ['다시 한 번 답변해주세요.']
      };
    } else {
      return {
        strategy: 'skip_step',
        message: '이 단계에서 계속 문제가 발생하고 있습니다. 일단 다음 단계로 넘어가겠습니다.',
        userGuidance: ['나중에 다시 돌아와서 완성할 수 있습니다.']
      };
    }
  }

  // 복구 실행
  executeRecovery(
    errorInfo: ErrorInfo,
    recoveryAction: RecoveryAction,
    context: ConversationContext
  ): RecoveryResult {

    // 오류 히스토리에 추가
    this.errorHistory.push(errorInfo);
    if (this.errorHistory.length > this.maxErrorHistory) {
      this.errorHistory = this.errorHistory.slice(-this.maxErrorHistory);
    }

    let updatedContext: Partial<ConversationContext> = {};
    let userMessage = recoveryAction.message;

    switch (recoveryAction.strategy) {
      case 'retry':
        // 재시도 - 현재 상태 유지
        break;

      case 'rollback':
        // 이전 상태로 복구
        updatedContext = this.rollbackToPreviousState(context);
        break;

      case 'simplify':
        // 질문 단순화
        updatedContext.dialogueState = {
          ...context.dialogueState,
          retryCount: 0,
          needsClarification: false
        };
        break;

      case 'skip_step':
        // 단계 건너뛰기
        const nextStep = recoveryAction.nextStep || context.dialogueState.currentStep + 1;
        updatedContext.dialogueState = {
          ...context.dialogueState,
          currentStep: nextStep,
          currentSubQuestion: 0,
          retryCount: 0
        };
        break;

      case 'reset_session':
        // 세션 초기화
        updatedContext = this.resetSession(context);
        break;
    }

    // 사용자 가이던스 추가
    if (recoveryAction.userGuidance && recoveryAction.userGuidance.length > 0) {
      userMessage += '\n\n' + recoveryAction.userGuidance.join('\n');
    }

    return {
      success: true,
      action: recoveryAction,
      updatedContext,
      userMessage,
      shouldContinue: recoveryAction.strategy !== 'manual_intervention'
    };
  }

  // 이전 상태로 롤백
  private rollbackToPreviousState(context: ConversationContext): Partial<ConversationContext> {
    const qaHistory = context.qaHistory;
    if (qaHistory.length > 0) {
      const lastQA = qaHistory[qaHistory.length - 1];
      return {
        dialogueState: {
          ...context.dialogueState,
          currentStep: lastQA.step,
          retryCount: 0
        },
        qaHistory: qaHistory.slice(0, -1) // 마지막 QA 제거
      };
    }
    return {};
  }

  // 세션 초기화
  private resetSession(context: ConversationContext): Partial<ConversationContext> {
    return {
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

  // 복구 가능성 평가
  assessRecoverability(errorInfo: ErrorInfo): {
    recoverable: boolean;
    confidence: number;
    recommendedAction: RecoveryStrategy;
  } {
    const errorKey = `${errorInfo.type}-${errorInfo.context.step}`;
    const attemptCount = this.recoveryAttempts.get(errorKey) || 0;

    switch (errorInfo.severity) {
      case 'critical':
        return {
          recoverable: false,
          confidence: 0.1,
          recommendedAction: 'reset_session'
        };

      case 'high':
        if (attemptCount > 2) {
          return {
            recoverable: false,
            confidence: 0.3,
            recommendedAction: 'manual_intervention'
          };
        }
        return {
          recoverable: true,
          confidence: 0.6,
          recommendedAction: 'change_approach'
        };

      case 'medium':
        return {
          recoverable: true,
          confidence: 0.8,
          recommendedAction: attemptCount > 1 ? 'simplify' : 'retry'
        };

      case 'low':
        return {
          recoverable: true,
          confidence: 0.9,
          recommendedAction: 'retry'
        };

      default:
        return {
          recoverable: true,
          confidence: 0.7,
          recommendedAction: 'retry'
        };
    }
  }

  // 오류 통계
  getErrorStatistics(): {
    totalErrors: number;
    errorsByType: Record<ErrorType, number>;
    mostCommonError: ErrorType | null;
    recoverySuccessRate: number;
  } {
    const errorsByType = this.errorHistory.reduce((acc, error) => {
      acc[error.type] = (acc[error.type] || 0) + 1;
      return acc;
    }, {} as Record<ErrorType, number>);

    const mostCommonError = Object.entries(errorsByType)
      .sort(([, a], [, b]) => b - a)[0]?.[0] as ErrorType || null;

    return {
      totalErrors: this.errorHistory.length,
      errorsByType,
      mostCommonError,
      recoverySuccessRate: 0.85 // 실제로는 복구 성공 기록을 추적해야 함
    };
  }

  // 정리 및 리셋
  cleanup(): void {
    this.errorHistory = [];
    this.recoveryAttempts.clear();
  }
}