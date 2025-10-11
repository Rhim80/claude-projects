// 마스터 대화 제어 시스템 - 모든 서브시스템 통합 관리
import { DialogueStateManager, ConversationContext, UserIntent } from './dialogue-state-manager';
import { UserProfiler, ExtendedUserProfile, AnswerAnalysis } from './user-profiler';
import { DynamicQuestionGenerator, GeneratedQuestion, QuestionType } from './dynamic-question-generator';
import { ErrorRecoveryHandler, ErrorInfo, RecoveryResult } from './error-recovery-handler';
import { MultiTurnController, TurnInfo, ConversationSession } from './multi-turn-controller';
import { ConsistencyValidator, ValidationResult, ConsistencyIssue } from './consistency-validator';
import { BrandData, QAPair } from '../../src/types/brand';

// 시스템 응답 타입
export interface SystemResponse {
  message: string;
  type: 'question' | 'validation' | 'error' | 'transition' | 'completion';
  metadata: {
    step: number;
    subQuestion?: number;
    intent: UserIntent;
    confidence: number;
    needsFollowUp: boolean;
    extractedData?: Partial<BrandData>;
  };
  context: {
    userProfile: ExtendedUserProfile;
    conversationState: string;
    validationIssues: ConsistencyIssue[];
    nextRecommendedAction: string;
  };
}

// 시스템 상태
export interface SystemState {
  isInitialized: boolean;
  currentStep: number;
  currentSubQuestion: number;
  totalInteractions: number;
  lastUpdateTime: Date;
  systemHealth: 'healthy' | 'warning' | 'error';
  activeSystems: string[];
}

// 처리 결과
export interface ProcessingResult {
  success: boolean;
  response: SystemResponse;
  updatedBrandData: BrandData;
  systemState: SystemState;
  logs: string[];
}

export class MasterDialogueController {
  private dialogueStateManager: DialogueStateManager;
  private userProfiler: UserProfiler;
  private questionGenerator: DynamicQuestionGenerator;
  private errorRecoveryHandler: ErrorRecoveryHandler;
  private multiTurnController: MultiTurnController;
  private consistencyValidator: ConsistencyValidator;

  private systemState: SystemState;
  private brandData: BrandData;
  private logs: string[] = [];

  constructor(initialBrandData: BrandData = {}) {
    this.brandData = initialBrandData;

    // 서브시스템들 초기화
    this.dialogueStateManager = new DialogueStateManager(initialBrandData);
    this.userProfiler = new UserProfiler();
    this.errorRecoveryHandler = new ErrorRecoveryHandler();

    const context = this.dialogueStateManager.getContext();
    this.multiTurnController = new MultiTurnController('session_' + Date.now(), context);
    this.consistencyValidator = new ConsistencyValidator(initialBrandData);

    this.questionGenerator = new DynamicQuestionGenerator(
      this.userProfiler.getProfile(),
      this.dialogueStateManager.getCurrentState(),
      initialBrandData
    );

    // 시스템 상태 초기화
    this.systemState = {
      isInitialized: true,
      currentStep: 0,
      currentSubQuestion: 0,
      totalInteractions: 0,
      lastUpdateTime: new Date(),
      systemHealth: 'healthy',
      activeSystems: [
        'DialogueStateManager',
        'UserProfiler',
        'DynamicQuestionGenerator',
        'ErrorRecoveryHandler',
        'MultiTurnController',
        'ConsistencyValidator'
      ]
    };

    this.log('MasterDialogueController initialized successfully');
  }

  // 메인 처리 메소드 - 사용자 입력 처리
  async processUserInput(userInput: string): Promise<ProcessingResult> {
    try {
      this.log(`Processing user input: "${userInput.substring(0, 50)}..."`);

      // 1. 사용자 의도 분석
      const intentAnalysis = this.dialogueStateManager.analyzeUserIntent(userInput);
      this.log(`Detected intent: ${intentAnalysis.intent} (confidence: ${intentAnalysis.confidence})`);

      // 2. 턴 추가
      const userTurn = this.multiTurnController.addTurn(
        'answer',
        'user',
        userInput,
        { intent: intentAnalysis.intent, confidence: intentAnalysis.confidence }
      );

      // 3. 오류 감지
      const context = this.dialogueStateManager.getContext();
      const errorInfo = this.errorRecoveryHandler.detectError(
        null, // 일반적인 입력에는 error 객체가 없음
        context,
        userInput
      );

      // 4. 오류가 있다면 복구 처리
      if (errorInfo) {
        return await this.handleError(errorInfo, userInput);
      }

      // 5. 사용자 프로필 업데이트
      const answerAnalysis = this.userProfiler.analyzeAnswer(userInput);
      this.userProfiler.trackUserIntent(intentAnalysis.intent);
      this.log(`Answer analysis: quality ${answerAnalysis.complexity}, tone ${answerAnalysis.emotionalTone}`);

      // 6. 대화 상태 업데이트
      let aiResponse = '';
      this.dialogueStateManager.updateDialogueState(userInput, aiResponse);

      // 7. 브랜드 데이터 추출 및 업데이트
      const extractedData = this.extractBrandDataFromAnswer(userInput, this.systemState.currentStep);
      this.brandData = { ...this.brandData, ...extractedData };

      // 8. 일관성 검증
      this.consistencyValidator.updateBrandData(this.brandData);
      const validationResult = this.consistencyValidator.validate();

      // 9. 다음 액션 결정
      const nextAction = this.dialogueStateManager.getNextAction();
      this.log(`Next action: ${nextAction.action}`);

      // 10. 응답 생성
      const response = await this.generateResponse(
        intentAnalysis.intent,
        answerAnalysis,
        nextAction,
        validationResult
      );

      // 11. AI 응답 턴 추가
      this.multiTurnController.addTurn(
        'question',
        'assistant',
        response.message,
        { step: this.systemState.currentStep }
      );

      // 12. 시스템 상태 업데이트
      this.updateSystemState(extractedData);

      return {
        success: true,
        response,
        updatedBrandData: this.brandData,
        systemState: this.systemState,
        logs: [...this.logs]
      };

    } catch (error) {
      this.log(`Error processing user input: ${error.message}`);
      return await this.handleUnexpectedError(error, userInput);
    }
  }

  // 오류 처리
  private async handleError(errorInfo: ErrorInfo, userInput: string): Promise<ProcessingResult> {
    this.log(`Handling error: ${errorInfo.type} - ${errorInfo.message}`);

    const userProfile = this.userProfiler.getProfile();
    const recoveryAction = this.errorRecoveryHandler.determineRecoveryStrategy(errorInfo, userProfile);

    const recoveryResult = this.errorRecoveryHandler.executeRecovery(
      errorInfo,
      recoveryAction,
      this.dialogueStateManager.getContext()
    );

    // 시스템 상태를 경고로 변경
    this.systemState.systemHealth = 'warning';

    const response: SystemResponse = {
      message: recoveryResult.userMessage,
      type: 'error',
      metadata: {
        step: this.systemState.currentStep,
        intent: 'help',
        confidence: 0.8,
        needsFollowUp: true
      },
      context: {
        userProfile: this.userProfiler.getProfile(),
        conversationState: 'error_recovery',
        validationIssues: [],
        nextRecommendedAction: 'retry_with_guidance'
      }
    };

    return {
      success: recoveryResult.success,
      response,
      updatedBrandData: this.brandData,
      systemState: this.systemState,
      logs: [...this.logs]
    };
  }

  // 예상치 못한 오류 처리
  private async handleUnexpectedError(error: any, userInput: string): Promise<ProcessingResult> {
    this.log(`Unexpected error: ${error.message}`);
    this.systemState.systemHealth = 'error';

    const response: SystemResponse = {
      message: '죄송합니다. 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
      type: 'error',
      metadata: {
        step: this.systemState.currentStep,
        intent: 'help',
        confidence: 0.5,
        needsFollowUp: true
      },
      context: {
        userProfile: this.userProfiler.getProfile(),
        conversationState: 'system_error',
        validationIssues: [],
        nextRecommendedAction: 'restart_or_contact_support'
      }
    };

    return {
      success: false,
      response,
      updatedBrandData: this.brandData,
      systemState: this.systemState,
      logs: [...this.logs]
    };
  }

  // 응답 생성
  private async generateResponse(
    intent: UserIntent,
    answerAnalysis: AnswerAnalysis,
    nextAction: any,
    validationResult: ValidationResult
  ): Promise<SystemResponse> {

    let questionType: QuestionType = 'initial';
    let message = '';

    // 의도에 따른 응답 타입 결정
    switch (intent) {
      case 'help':
        questionType = 'example';
        break;
      case 'clarification':
        questionType = 'clarification';
        break;
      case 'struggle':
        questionType = 'example';
        break;
      default:
        if (answerAnalysis.length < 50 || answerAnalysis.concreteness === 'abstract') {
          questionType = 'follow_up';
        } else {
          questionType = 'initial';
        }
    }

    // 질문 생성
    const generatedQuestion = this.questionGenerator.generateQuestion(
      this.systemState.currentStep,
      this.systemState.currentSubQuestion,
      questionType
    );

    message = generatedQuestion.text;

    // 사용자 프로필에 따른 메시지 조정
    const recommendedStyle = this.userProfiler.getRecommendedCommunicationStyle();
    if (recommendedStyle.provideEncouragement) {
      message = this.addEncouragement(message);
    }

    // 일관성 문제가 있다면 알림 추가
    if (validationResult.issues.length > 0) {
      const criticalIssues = validationResult.issues.filter(i => i.severity === 'critical');
      if (criticalIssues.length > 0) {
        message += '\n\n💡 참고: 일부 답변 간에 일관성을 확인해보시면 좋을 것 같습니다.';
      }
    }

    return {
      message,
      type: this.determineResponseType(intent, nextAction),
      metadata: {
        step: this.systemState.currentStep,
        subQuestion: this.systemState.currentSubQuestion,
        intent,
        confidence: generatedQuestion.style === 'direct' ? 0.9 : 0.7,
        needsFollowUp: questionType === 'follow_up',
        extractedData: this.extractBrandDataFromAnswer('', this.systemState.currentStep)
      },
      context: {
        userProfile: this.userProfiler.getProfile(),
        conversationState: this.getConversationState(),
        validationIssues: validationResult.issues,
        nextRecommendedAction: this.getNextRecommendedAction()
      }
    };
  }

  // 브랜드 데이터 추출
  private extractBrandDataFromAnswer(userInput: string, step: number): Partial<BrandData> {
    const extracted: Partial<BrandData> = {};

    // Step 0 데이터 추출
    if (step === 0) {
      if (!this.brandData.step0Data) {
        extracted.step0Data = {};
      }

      const currentQuestion = this.brandData.currentQuestion || 0;

      switch (currentQuestion) {
        case 0: // 브랜드 타입
          extracted.brandType = userInput;
          break;
        case 1: // 시작 계기
          extracted.step0Data = {
            ...this.brandData.step0Data,
            startingMoment: userInput
          };
          break;
        case 2: // 문제점
          extracted.step0Data = {
            ...this.brandData.step0Data,
            painPoint: userInput
          };
          break;
        // ... 다른 질문들
      }

      extracted.currentQuestion = Math.min(currentQuestion + 1, 8);
    }

    // Step 1 데이터 추출 (미션, 비전, 가치)
    else if (step === 1) {
      if (userInput.includes('미션') || userInput.includes('목적')) {
        extracted.mission = userInput;
      }
      if (userInput.includes('비전') || userInput.includes('미래')) {
        extracted.vision = userInput;
      }
    }

    return extracted;
  }

  // 격려 메시지 추가
  private addEncouragement(message: string): string {
    const encouragements = [
      '좋은 방향으로 진행되고 있어요! ',
      '잘하고 계십니다. ',
      '훌륭한 접근이네요! ',
      '정말 좋은 생각이에요! '
    ];

    const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
    return randomEncouragement + message;
  }

  // 응답 타입 결정
  private determineResponseType(intent: UserIntent, nextAction: any): SystemResponse['type'] {
    if (intent === 'help' || intent === 'struggle') return 'validation';
    if (nextAction.action === 'proceed') return 'question';
    if (nextAction.action === 'clarify') return 'validation';
    return 'question';
  }

  // 대화 상태 문자열 생성
  private getConversationState(): string {
    const state = this.dialogueStateManager.getCurrentState();
    return `step_${state.currentStep}_${state.conversationMood}_${state.userEngagementLevel}`;
  }

  // 다음 권장 액션
  private getNextRecommendedAction(): string {
    const dialogueState = this.dialogueStateManager.getCurrentState();

    if (dialogueState.needsClarification) {
      return 'provide_clarification';
    }

    if (dialogueState.retryCount > 2) {
      return 'provide_examples';
    }

    return 'continue_conversation';
  }

  // 시스템 상태 업데이트
  private updateSystemState(extractedData: Partial<BrandData>): void {
    this.systemState.totalInteractions++;
    this.systemState.lastUpdateTime = new Date();

    // 단계 진행 체크
    if (extractedData.currentQuestion && extractedData.currentQuestion >= 8) {
      this.systemState.currentStep = 1;
      this.systemState.currentSubQuestion = 0;
    } else if (this.systemState.currentStep === 0) {
      this.systemState.currentSubQuestion = extractedData.currentQuestion || 0;
    }

    // 시스템 건강 상태 복구
    if (this.systemState.systemHealth === 'warning') {
      this.systemState.systemHealth = 'healthy';
    }
  }

  // 로그 기록
  private log(message: string): void {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}`;
    this.logs.push(logEntry);

    // 최대 100개 로그만 유지
    if (this.logs.length > 100) {
      this.logs = this.logs.slice(-100);
    }

    console.log(logEntry);
  }

  // 초기 질문 생성
  generateInitialQuestion(): SystemResponse {
    const initialQuestion = this.questionGenerator.generateQuestion(0, 0, 'initial');

    return {
      message: initialQuestion.text,
      type: 'question',
      metadata: {
        step: 0,
        subQuestion: 0,
        intent: 'answer',
        confidence: 0.9,
        needsFollowUp: false
      },
      context: {
        userProfile: this.userProfiler.getProfile(),
        conversationState: 'initial',
        validationIssues: [],
        nextRecommendedAction: 'start_conversation'
      }
    };
  }

  // 세션 요약 생성
  generateSessionSummary(): {
    totalSteps: number;
    completedSteps: number[];
    brandDataCompleteness: number;
    userEngagement: string;
    keyInsights: string[];
    nextSteps: string[];
  } {
    const conversationSummary = this.multiTurnController.generateConversationSummary();
    const validationResult = this.consistencyValidator.validate();
    const userProfile = this.userProfiler.getProfile();

    return {
      totalSteps: 7,
      completedSteps: conversationSummary.completedSteps,
      brandDataCompleteness: this.calculateDataCompleteness(),
      userEngagement: userProfile.behaviorPattern.detailLevel,
      keyInsights: conversationSummary.keyInsights,
      nextSteps: validationResult.recommendations
    };
  }

  // 데이터 완성도 계산
  private calculateDataCompleteness(): number {
    const requiredFields = [
      'brandType', 'step0Data.startingMoment', 'step0Data.painPoint',
      'mission', 'vision', 'values', 'brandName'
    ];

    const completedFields = requiredFields.filter(field => {
      const value = this.getNestedValue(this.brandData, field);
      return value && value.toString().length > 0;
    });

    return completedFields.length / requiredFields.length;
  }

  // 중첩된 값 가져오기
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  // 시스템 상태 접근자
  getSystemState(): SystemState {
    return { ...this.systemState };
  }

  getBrandData(): BrandData {
    return { ...this.brandData };
  }

  getUserProfile(): ExtendedUserProfile {
    return this.userProfiler.getProfile();
  }

  getConversationHistory(): TurnInfo[] {
    return this.multiTurnController.getTurns();
  }

  // 시스템 리셋
  resetSystem(): void {
    this.brandData = {};
    this.logs = [];
    this.systemState = {
      isInitialized: true,
      currentStep: 0,
      currentSubQuestion: 0,
      totalInteractions: 0,
      lastUpdateTime: new Date(),
      systemHealth: 'healthy',
      activeSystems: this.systemState.activeSystems
    };

    this.dialogueStateManager.resetSession();
    this.userProfiler.reset();
    this.multiTurnController.reset();
    this.consistencyValidator.updateBrandData({});

    this.log('System reset completed');
  }

  // 상태 저장/복원
  saveState(): string {
    return JSON.stringify({
      brandData: this.brandData,
      systemState: this.systemState,
      dialogueState: this.dialogueStateManager.saveState(),
      userProfile: this.userProfiler.serialize(),
      multiTurnSession: this.multiTurnController.serialize()
    });
  }

  loadState(savedState: string): boolean {
    try {
      const state = JSON.parse(savedState);

      this.brandData = state.brandData;
      this.systemState = state.systemState;

      this.dialogueStateManager.loadState(state.dialogueState);
      this.userProfiler.deserialize(state.userProfile);
      this.multiTurnController.deserialize(state.multiTurnSession);

      this.consistencyValidator.updateBrandData(this.brandData);

      this.log('System state loaded successfully');
      return true;
    } catch (error) {
      this.log(`Failed to load system state: ${error.message}`);
      return false;
    }
  }
}