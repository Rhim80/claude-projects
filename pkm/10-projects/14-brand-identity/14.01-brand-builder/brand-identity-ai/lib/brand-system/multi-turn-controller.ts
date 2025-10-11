// 다중 턴 대화 제어 시스템
import { UserIntent, DialogueState, ConversationContext } from './dialogue-state-manager';
import { ExtendedUserProfile } from './user-profiler';
import { GeneratedQuestion, QuestionType } from './dynamic-question-generator';
import { BrandData, QAPair } from '../../src/types/brand';

// 대화 턴 타입
export type TurnType =
  | 'question'          // 질문
  | 'answer'            // 답변
  | 'clarification'     // 명확화
  | 'follow_up'         // 후속 질문
  | 'validation'        // 검증
  | 'transition'        // 전환
  | 'summary';          // 요약

// 대화 분기 타입
export type BranchType =
  | 'linear'            // 선형 진행
  | 'conditional'       // 조건부 분기
  | 'loop'              // 반복 루프
  | 'parallel'          // 병렬 처리
  | 'skip'              // 건너뛰기
  | 'backtrack';        // 역추적

// 턴 정보
export interface TurnInfo {
  id: string;
  type: TurnType;
  timestamp: Date;
  speaker: 'user' | 'assistant';
  content: string;
  metadata: {
    step: number;
    subQuestion?: number;
    intent?: UserIntent;
    confidence?: number;
    extractedData?: any;
  };
}

// 대화 분기 정보
export interface ConversationBranch {
  id: string;
  type: BranchType;
  parentBranchId?: string;
  startTurnId: string;
  endTurnId?: string;
  condition?: {
    type: 'user_intent' | 'answer_quality' | 'completion_status' | 'error_state';
    value: any;
  };
  isActive: boolean;
  priority: number;
}

// 대화 세션 정보
export interface ConversationSession {
  id: string;
  turns: TurnInfo[];
  branches: ConversationBranch[];
  currentBranchId: string;
  mainBranchId: string;
  completedSteps: number[];
  pendingValidations: string[];
  context: ConversationContext;
}

// 턴 전환 규칙
export interface TurnTransitionRule {
  fromType: TurnType;
  toType: TurnType;
  condition: (turn: TurnInfo, context: ConversationContext) => boolean;
  action?: (session: ConversationSession) => void;
}

// 대화 플로우 제어기
export class MultiTurnController {
  private session: ConversationSession;
  private transitionRules: TurnTransitionRule[];
  private maxTurnsPerBranch = 20;
  private maxBranches = 10;

  constructor(sessionId: string, initialContext: ConversationContext) {
    this.session = {
      id: sessionId,
      turns: [],
      branches: [],
      currentBranchId: this.generateId(),
      mainBranchId: this.generateId(),
      completedSteps: [],
      pendingValidations: [],
      context: initialContext
    };

    // 메인 브랜치 생성
    this.createBranch('linear', undefined, 'main');

    // 전환 규칙 초기화
    this.initializeTransitionRules();
  }

  // ID 생성기
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // 브랜치 생성
  private createBranch(
    type: BranchType,
    parentBranchId?: string,
    name?: string
  ): string {
    if (this.session.branches.length >= this.maxBranches) {
      console.warn('최대 브랜치 수에 도달했습니다.');
      return this.session.currentBranchId;
    }

    const branchId = this.generateId();
    const lastTurnId = this.getLastTurn()?.id || this.generateId();

    const branch: ConversationBranch = {
      id: branchId,
      type,
      parentBranchId,
      startTurnId: lastTurnId,
      isActive: true,
      priority: parentBranchId ? 1 : 0
    };

    this.session.branches.push(branch);

    // 메인 브랜치 설정
    if (name === 'main') {
      this.session.mainBranchId = branchId;
      this.session.currentBranchId = branchId;
    }

    return branchId;
  }

  // 턴 추가
  addTurn(
    type: TurnType,
    speaker: 'user' | 'assistant',
    content: string,
    metadata: Partial<TurnInfo['metadata']> = {}
  ): TurnInfo {

    const turn: TurnInfo = {
      id: this.generateId(),
      type,
      timestamp: new Date(),
      speaker,
      content,
      metadata: {
        step: this.session.context.dialogueState.currentStep,
        subQuestion: this.session.context.dialogueState.currentSubQuestion,
        ...metadata
      }
    };

    this.session.turns.push(turn);

    // 현재 브랜치의 턴 수 확인
    if (this.getCurrentBranchTurns().length > this.maxTurnsPerBranch) {
      this.handleBranchOverflow();
    }

    // 전환 규칙 적용
    this.applyTransitionRules(turn);

    return turn;
  }

  // 현재 브랜치의 턴들 가져오기
  private getCurrentBranchTurns(): TurnInfo[] {
    const currentBranch = this.getCurrentBranch();
    if (!currentBranch) return this.session.turns;

    const startIndex = this.session.turns.findIndex(
      turn => turn.id === currentBranch.startTurnId
    );

    if (startIndex === -1) return [];

    const endIndex = currentBranch.endTurnId ?
      this.session.turns.findIndex(turn => turn.id === currentBranch.endTurnId) :
      this.session.turns.length;

    return this.session.turns.slice(startIndex, endIndex);
  }

  // 현재 브랜치 가져오기
  private getCurrentBranch(): ConversationBranch | undefined {
    return this.session.branches.find(b => b.id === this.session.currentBranchId);
  }

  // 마지막 턴 가져오기
  private getLastTurn(): TurnInfo | undefined {
    return this.session.turns[this.session.turns.length - 1];
  }

  // 전환 규칙 초기화
  private initializeTransitionRules(): void {
    this.transitionRules = [
      // 질문 → 답변
      {
        fromType: 'question',
        toType: 'answer',
        condition: (turn) => turn.speaker === 'user',
        action: (session) => {
          // 답변 분석 및 후속 처리 준비
          this.analyzeUserAnswer(turn.content, session);
        }
      },

      // 답변 → 후속 질문 (답변이 불충분한 경우)
      {
        fromType: 'answer',
        toType: 'follow_up',
        condition: (turn, context) => {
          return this.isAnswerIncomplete(turn.content) ||
                 context.dialogueState.needsClarification;
        },
        action: (session) => {
          this.createFollowUpBranch(session);
        }
      },

      // 답변 → 검증 (답변이 충분한 경우)
      {
        fromType: 'answer',
        toType: 'validation',
        condition: (turn, context) => {
          return !this.isAnswerIncomplete(turn.content) &&
                 !context.dialogueState.needsClarification;
        }
      },

      // 검증 → 전환 (다음 단계로)
      {
        fromType: 'validation',
        toType: 'transition',
        condition: (turn, context) => {
          return this.isStepComplete(context.dialogueState.currentStep, context);
        },
        action: (session) => {
          this.prepareStepTransition(session);
        }
      },

      // 명확화 → 답변
      {
        fromType: 'clarification',
        toType: 'answer',
        condition: (turn) => turn.speaker === 'user'
      }
    ];
  }

  // 전환 규칙 적용
  private applyTransitionRules(currentTurn: TurnInfo): void {
    const previousTurn = this.session.turns[this.session.turns.length - 2];
    if (!previousTurn) return;

    const applicableRule = this.transitionRules.find(rule =>
      rule.fromType === previousTurn.type &&
      rule.toType === currentTurn.type &&
      rule.condition(currentTurn, this.session.context)
    );

    if (applicableRule && applicableRule.action) {
      applicableRule.action(this.session);
    }
  }

  // 사용자 답변 분석
  private analyzeUserAnswer(answer: string, session: ConversationSession): void {
    const answerLength = answer.length;
    const hasSpecificDetails = /구체적|예를 들어|실제로|경험/.test(answer);
    const isVague = /모르겠|아마도|그냥|대충/.test(answer);

    // 메타데이터 업데이트
    const lastTurn = this.getLastTurn();
    if (lastTurn) {
      lastTurn.metadata.extractedData = {
        answerLength,
        hasSpecificDetails,
        isVague,
        qualityScore: this.calculateAnswerQuality(answer)
      };
    }
  }

  // 답변 품질 계산
  private calculateAnswerQuality(answer: string): number {
    let score = 0.5; // 기본 점수

    // 길이 점수
    if (answer.length > 100) score += 0.2;
    else if (answer.length < 20) score -= 0.2;

    // 구체성 점수
    if (/구체적|예를 들어|실제로|경험/.test(answer)) score += 0.2;
    if (/\d+|년|월|일/.test(answer)) score += 0.1; // 숫자나 시간 표현

    // 모호함 감점
    if (/모르겠|아마도|그냥|대충/.test(answer)) score -= 0.3;

    return Math.max(0, Math.min(1, score));
  }

  // 답변 불완전성 판단
  private isAnswerIncomplete(answer: string): boolean {
    const length = answer.length;
    const isVague = /모르겠|아마도|그냥|대충/.test(answer);
    const isTooShort = length < 20;
    const hasHelpRequest = /도와|모르|어려/.test(answer);

    return isVague || isTooShort || hasHelpRequest;
  }

  // 단계 완료 여부 확인
  private isStepComplete(step: number, context: ConversationContext): boolean {
    const brandData = context.brandData;

    switch (step) {
      case 0:
        return (brandData.currentQuestion || 0) >= 8;
      case 1:
        return !!brandData.mission && !!brandData.vision && !!brandData.values;
      case 2:
        return !!brandData.brandName;
      default:
        return true;
    }
  }

  // 후속 질문 브랜치 생성
  private createFollowUpBranch(session: ConversationSession): void {
    const followUpBranchId = this.createBranch('loop', session.currentBranchId);

    // 현재 브랜치를 일시 중단하고 후속 브랜치로 전환
    const currentBranch = this.getCurrentBranch();
    if (currentBranch) {
      currentBranch.isActive = false;
    }

    session.currentBranchId = followUpBranchId;
  }

  // 단계 전환 준비
  private prepareStepTransition(session: ConversationSession): void {
    const currentStep = session.context.dialogueState.currentStep;

    // 현재 단계를 완료 목록에 추가
    if (!session.completedSteps.includes(currentStep)) {
      session.completedSteps.push(currentStep);
    }

    // 메인 브랜치로 복귀
    session.currentBranchId = session.mainBranchId;

    // 비활성 브랜치들 정리
    this.cleanupInactiveBranches();
  }

  // 브랜치 오버플로우 처리
  private handleBranchOverflow(): void {
    console.warn('브랜치의 턴 수가 한계에 도달했습니다. 새로운 브랜치로 전환합니다.');

    const currentBranch = this.getCurrentBranch();
    if (currentBranch) {
      currentBranch.isActive = false;
      currentBranch.endTurnId = this.getLastTurn()?.id;
    }

    // 새 브랜치 생성
    const newBranchId = this.createBranch('linear', this.session.mainBranchId);
    this.session.currentBranchId = newBranchId;
  }

  // 비활성 브랜치 정리
  private cleanupInactiveBranches(): void {
    this.session.branches = this.session.branches.filter(branch =>
      branch.isActive || branch.id === this.session.mainBranchId
    );
  }

  // 조건부 분기 생성
  createConditionalBranch(
    condition: ConversationBranch['condition'],
    branchType: BranchType = 'conditional'
  ): string {
    const branchId = this.createBranch(branchType, this.session.currentBranchId);
    const branch = this.session.branches.find(b => b.id === branchId);

    if (branch) {
      branch.condition = condition;
    }

    return branchId;
  }

  // 브랜치 전환
  switchBranch(branchId: string): boolean {
    const branch = this.session.branches.find(b => b.id === branchId);
    if (!branch || !branch.isActive) {
      return false;
    }

    this.session.currentBranchId = branchId;
    return true;
  }

  // 이전 브랜치로 복귀
  returnToPreviousBranch(): boolean {
    const currentBranch = this.getCurrentBranch();
    if (!currentBranch || !currentBranch.parentBranchId) {
      return false;
    }

    return this.switchBranch(currentBranch.parentBranchId);
  }

  // 대화 흐름 분석
  analyzeConversationFlow(): {
    totalTurns: number;
    activeBranches: number;
    averageTurnsPerBranch: number;
    longestBranch: number;
    branchingPoints: number;
  } {
    const activeBranches = this.session.branches.filter(b => b.isActive);
    const branchTurnCounts = activeBranches.map(branch =>
      this.getCurrentBranchTurns().length
    );

    return {
      totalTurns: this.session.turns.length,
      activeBranches: activeBranches.length,
      averageTurnsPerBranch: branchTurnCounts.reduce((a, b) => a + b, 0) / branchTurnCounts.length || 0,
      longestBranch: Math.max(...branchTurnCounts, 0),
      branchingPoints: this.session.branches.filter(b => b.parentBranchId).length
    };
  }

  // 대화 요약 생성
  generateConversationSummary(): {
    completedSteps: number[];
    keyInsights: string[];
    pendingItems: string[];
    nextRecommendedAction: string;
  } {
    const completedSteps = this.session.completedSteps;
    const keyInsights = this.extractKeyInsights();
    const pendingItems = this.session.pendingValidations;

    return {
      completedSteps,
      keyInsights,
      pendingItems,
      nextRecommendedAction: this.getNextRecommendedAction()
    };
  }

  // 핵심 인사이트 추출
  private extractKeyInsights(): string[] {
    const insights: string[] = [];
    const userTurns = this.session.turns.filter(turn => turn.speaker === 'user');

    // 각 단계별 핵심 답변 추출
    const stepTurns = userTurns.reduce((acc, turn) => {
      const step = turn.metadata.step;
      if (!acc[step]) acc[step] = [];
      acc[step].push(turn);
      return acc;
    }, {} as Record<number, TurnInfo[]>);

    Object.entries(stepTurns).forEach(([step, turns]) => {
      const longestTurn = turns.reduce((longest, current) =>
        current.content.length > longest.content.length ? current : longest
      );

      if (longestTurn.content.length > 50) {
        insights.push(`Step ${step}: ${longestTurn.content.substring(0, 100)}...`);
      }
    });

    return insights;
  }

  // 다음 권장 액션
  private getNextRecommendedAction(): string {
    const currentStep = this.session.context.dialogueState.currentStep;
    const completedSteps = this.session.completedSteps;

    if (completedSteps.includes(currentStep)) {
      return `Step ${currentStep + 1}로 진행`;
    } else {
      return `Step ${currentStep} 완료`;
    }
  }

  // 세션 상태 접근자
  getSession(): ConversationSession {
    return { ...this.session };
  }

  getCurrentBranchId(): string {
    return this.session.currentBranchId;
  }

  getTurns(): TurnInfo[] {
    return [...this.session.turns];
  }

  getBranches(): ConversationBranch[] {
    return [...this.session.branches];
  }

  // 세션 저장/복원
  serialize(): string {
    return JSON.stringify(this.session);
  }

  deserialize(data: string): boolean {
    try {
      this.session = JSON.parse(data);
      return true;
    } catch (error) {
      console.error('Failed to deserialize session:', error);
      return false;
    }
  }

  // 세션 리셋
  reset(): void {
    const newSessionId = this.generateId();
    const initialContext = {
      ...this.session.context,
      brandData: {},
      qaHistory: [],
      dialogueState: {
        currentStep: 0,
        currentSubQuestion: 0,
        isWaitingForAnswer: true,
        retryCount: 0,
        lastUserIntent: 'answer' as UserIntent,
        conversationMood: 'neutral' as const,
        userEngagementLevel: 'medium' as const,
        hasPartialData: false,
        needsClarification: false
      }
    };

    this.session = {
      id: newSessionId,
      turns: [],
      branches: [],
      currentBranchId: this.generateId(),
      mainBranchId: this.generateId(),
      completedSteps: [],
      pendingValidations: [],
      context: initialContext
    };

    this.createBranch('linear', undefined, 'main');
  }
}