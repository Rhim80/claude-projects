// 동적 질문 생성 시스템
import { ExtendedUserProfile } from './user-profiler';
import { DialogueState, UserIntent } from './dialogue-state-manager';
import { BrandData } from '../../src/types/brand';

// 질문 타입 정의
export type QuestionType =
  | 'initial'       // 초기 질문
  | 'follow_up'     // 후속 질문
  | 'clarification' // 명확화 질문
  | 'deepening'     // 심화 질문
  | 'example'       // 예시 요청
  | 'validation'    // 검증 질문
  | 'transition';   // 전환 질문

// 질문 난이도
export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

// 질문 스타일
export type QuestionStyle = 'direct' | 'narrative' | 'choice' | 'creative';

// 생성된 질문
export interface GeneratedQuestion {
  text: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  style: QuestionStyle;
  context: string;
  expectedAnswerType: 'short' | 'medium' | 'long' | 'structured';
  helpHints?: string[];
  examples?: string[];
  followUpQuestions?: string[];
}

// 질문 템플릿
interface QuestionTemplate {
  pattern: string;
  difficulty: QuestionDifficulty;
  style: QuestionStyle;
  context: string[];
  variables: string[];
}

export class DynamicQuestionGenerator {
  private userProfile: ExtendedUserProfile;
  private dialogueState: DialogueState;
  private brandData: BrandData;

  // Step 0 질문 템플릿
  private step0Templates: Record<number, QuestionTemplate[]> = {
    0: [ // 브랜드 유형
      {
        pattern: "먼저 {name}님이 만들고 싶은 브랜드에 대해 알려주세요. 개인 브랜드인가요, 비즈니스 브랜드인가요?",
        difficulty: 'easy',
        style: 'choice',
        context: ['브랜드 유형 파악'],
        variables: ['name']
      },
      {
        pattern: "어떤 분야의 브랜드를 만들고 계신가요? 구체적으로 어떤 서비스나 제품을 다루시나요?",
        difficulty: 'medium',
        style: 'direct',
        context: ['분야 확인'],
        variables: []
      }
    ],
    1: [ // 시작 계기
      {
        pattern: "이 브랜드를 시작하게 된 특별한 순간이나 계기가 있나요? 그때의 상황을 자세히 들려주세요.",
        difficulty: 'medium',
        style: 'narrative',
        context: ['시작 스토리'],
        variables: []
      },
      {
        pattern: "어떤 경험이나 사건이 '{brandType}' 브랜드를 만들어야겠다는 생각을 하게 만들었나요?",
        difficulty: 'easy',
        style: 'direct',
        context: ['개인 경험'],
        variables: ['brandType']
      }
    ],
    2: [ // 문제점 인식
      {
        pattern: "현재 {brandType} 분야에서 가장 아쉽거나 불편하다고 느끼는 점이 무엇인가요?",
        difficulty: 'medium',
        style: 'direct',
        context: ['시장 문제점'],
        variables: ['brandType']
      },
      {
        pattern: "기존 서비스나 제품을 이용하면서 '이런 게 있었으면 좋겠다'고 생각했던 적이 있나요?",
        difficulty: 'easy',
        style: 'narrative',
        context: ['개선 아이디어'],
        variables: []
      }
    ],
    // ... 나머지 질문들
  };

  // 도움 질문 템플릿
  private helpTemplates: Record<string, string[]> = {
    'brand_type': [
      "개인 브랜드: 본인의 전문성이나 개성을 알리는 브랜드 (예: 요리 전문가, 디자이너)",
      "비즈니스 브랜드: 특정 서비스나 제품을 판매하는 브랜드 (예: 카페, 온라인 쇼핑몰)",
      "어떤 것에 더 가까우신가요?"
    ],
    'trigger_story': [
      "예를 들어:",
      "• 불편한 경험을 했던 순간",
      "• 좋은 아이디어가 떠올랐던 순간",
      "• 누군가의 말이나 조언이 계기가 된 순간",
      "이런 구체적인 경험이 있으셨나요?"
    ],
    'pain_point': [
      "다음 중에서 비슷한 경험이 있는지 생각해보세요:",
      "• 원하는 서비스를 찾기 어려웠던 경험",
      "• 가격이 너무 비싸다고 느꼈던 경험",
      "• 품질이나 서비스가 아쉬웠던 경험",
      "• 접근하기 어렵거나 복잡했던 경험"
    ]
  };

  constructor(userProfile: ExtendedUserProfile, dialogueState: DialogueState, brandData: BrandData) {
    this.userProfile = userProfile;
    this.dialogueState = dialogueState;
    this.brandData = brandData;
  }

  // 메인 질문 생성 메소드
  generateQuestion(
    step: number,
    subQuestion?: number,
    questionType: QuestionType = 'initial',
    previousAnswer?: string
  ): GeneratedQuestion {

    switch (questionType) {
      case 'initial':
        return this.generateInitialQuestion(step, subQuestion);
      case 'follow_up':
        return this.generateFollowUpQuestion(step, subQuestion, previousAnswer);
      case 'clarification':
        return this.generateClarificationQuestion(step, subQuestion, previousAnswer);
      case 'deepening':
        return this.generateDeepeningQuestion(step, subQuestion, previousAnswer);
      case 'example':
        return this.generateExampleQuestion(step, subQuestion);
      default:
        return this.generateInitialQuestion(step, subQuestion);
    }
  }

  // 초기 질문 생성
  private generateInitialQuestion(step: number, subQuestion: number = 0): GeneratedQuestion {
    if (step === 0) {
      return this.generateStep0Question(subQuestion);
    }

    // 다른 스텝들은 기본 템플릿 사용
    return this.generateBasicQuestion(step);
  }

  // Step 0 질문 생성
  private generateStep0Question(subQuestion: number): GeneratedQuestion {
    const templates = this.step0Templates[subQuestion] || [];
    const userStyle = this.getUserPreferredStyle();

    // 사용자 스타일에 맞는 템플릿 선택
    let selectedTemplate = templates.find(t => t.style === userStyle) || templates[0];

    if (!selectedTemplate) {
      selectedTemplate = {
        pattern: `Step 0의 ${subQuestion + 1}번째 질문을 진행하겠습니다.`,
        difficulty: 'medium',
        style: 'direct',
        context: ['기본'],
        variables: []
      };
    }

    // 변수 치환
    let questionText = this.interpolateVariables(selectedTemplate.pattern);

    // 사용자 프로필에 따른 조정
    questionText = this.adjustQuestionForUser(questionText, selectedTemplate.difficulty);

    return {
      text: questionText,
      type: 'initial',
      difficulty: selectedTemplate.difficulty,
      style: selectedTemplate.style,
      context: selectedTemplate.context.join(', '),
      expectedAnswerType: this.getExpectedAnswerType(selectedTemplate.difficulty),
      helpHints: this.getHelpHints(subQuestion),
      examples: this.getExamples(subQuestion),
      followUpQuestions: this.getFollowUpQuestions(subQuestion)
    };
  }

  // 후속 질문 생성
  private generateFollowUpQuestion(step: number, subQuestion: number = 0, previousAnswer?: string): GeneratedQuestion {
    if (!previousAnswer) {
      return this.generateInitialQuestion(step, subQuestion);
    }

    const answerLength = previousAnswer.length;
    const hasSpecificDetails = /구체적|예를 들어|실제로|경험/.test(previousAnswer);

    let followUpText = "";

    if (answerLength < 50) {
      followUpText = "좀 더 자세히 설명해주실 수 있나요? 구체적인 예시나 상황을 들려주시면 더 도움이 될 것 같아요.";
    } else if (!hasSpecificDetails) {
      followUpText = "흥미로운 답변이네요! 혹시 구체적인 경험이나 사례가 있다면 더 들려주세요.";
    } else {
      followUpText = "네, 잘 이해했습니다. 그렇다면 이제 다음 질문으로 넘어가볼까요?";
    }

    return {
      text: followUpText,
      type: 'follow_up',
      difficulty: 'easy',
      style: 'direct',
      context: '후속 질문',
      expectedAnswerType: answerLength < 50 ? 'medium' : 'short'
    };
  }

  // 명확화 질문 생성
  private generateClarificationQuestion(step: number, subQuestion: number = 0, previousAnswer?: string): GeneratedQuestion {
    const clarificationTemplates = [
      "혹시 제가 잘못 이해한 건 아닌지요? {point}에 대해 다시 한 번 확인해주실 수 있나요?",
      "{point} 부분이 조금 애매한데, 좀 더 명확하게 설명해주실 수 있을까요?",
      "말씀해주신 {point}가 정확히 어떤 의미인지 다시 한 번 설명해주세요."
    ];

    const template = clarificationTemplates[Math.floor(Math.random() * clarificationTemplates.length)];
    const questionText = template.replace('{point}', '해당 내용');

    return {
      text: questionText,
      type: 'clarification',
      difficulty: 'easy',
      style: 'direct',
      context: '명확화',
      expectedAnswerType: 'medium'
    };
  }

  // 심화 질문 생성
  private generateDeepeningQuestion(step: number, subQuestion: number = 0, previousAnswer?: string): GeneratedQuestion {
    const deepeningTemplates = [
      "정말 흥미로운 관점이네요! 그 부분을 조금 더 깊이 파보고 싶은데, 어떻게 생각하세요?",
      "그렇다면 그런 생각을 하게 된 특별한 이유나 배경이 있나요?",
      "정말 좋은 아이디어입니다. 이를 더 발전시킨다면 어떤 모습일까요?"
    ];

    const template = deepeningTemplates[Math.floor(Math.random() * deepeningTemplates.length)];

    return {
      text: template,
      type: 'deepening',
      difficulty: 'medium',
      style: 'narrative',
      context: '심화',
      expectedAnswerType: 'long'
    };
  }

  // 예시 요청 질문 생성
  private generateExampleQuestion(step: number, subQuestion: number = 0): GeneratedQuestion {
    const helpKey = this.getHelpKey(step, subQuestion);
    const examples = this.helpTemplates[helpKey] || ["구체적인 예시를 생각해보세요."];

    return {
      text: "구체적인 예시가 있으면 더 도움이 될 것 같아요. " + examples.join('\n'),
      type: 'example',
      difficulty: 'easy',
      style: 'direct',
      context: '예시 제공',
      expectedAnswerType: 'medium',
      examples: examples
    };
  }

  // 기본 질문 생성 (Step 1 이상)
  private generateBasicQuestion(step: number): GeneratedQuestion {
    const basicQuestions = {
      1: "브랜드의 미션과 비전을 정의해보겠습니다. 이 브랜드로 무엇을 달성하고 싶으신가요?",
      2: "이제 브랜드명을 정해보겠습니다. 어떤 느낌의 이름을 원하시나요?",
      3: "브랜드의 목소리와 어조를 설계해보겠습니다. 고객과 어떤 톤으로 소통하고 싶으신가요?",
      4: "지금까지 구축한 브랜드 컨셉을 검증해보겠습니다.",
      5: "브랜드 실행 전략을 수립해보겠습니다.",
      6: "마지막으로 브랜딩 휠을 완성해보겠습니다."
    };

    return {
      text: basicQuestions[step] || "다음 단계를 진행하겠습니다.",
      type: 'initial',
      difficulty: 'medium',
      style: 'direct',
      context: `Step ${step}`,
      expectedAnswerType: 'medium'
    };
  }

  // 사용자 선호 스타일 결정
  private getUserPreferredStyle(): QuestionStyle {
    if (this.userProfile.learningStyle.prefersExamples) {
      return 'narrative';
    } else if (this.userProfile.experienceLevel === 'beginner') {
      return 'choice';
    } else {
      return 'direct';
    }
  }

  // 변수 치환
  private interpolateVariables(pattern: string): string {
    return pattern
      .replace('{name}', '고객')
      .replace('{brandType}', this.brandData.brandType || '해당 분야')
      .replace('{previousAnswer}', '앞서 말씀해주신 내용');
  }

  // 사용자에 맞게 질문 조정
  private adjustQuestionForUser(questionText: string, difficulty: QuestionDifficulty): string {
    // 격려가 필요한 사용자에게는 격려 문구 추가
    if (this.userProfile.learningStyle.needsEncouragement) {
      questionText = "천천히 생각해보세요. " + questionText;
    }

    // 단계별 설명을 좋아하는 사용자에게는 구조 추가
    if (this.userProfile.learningStyle.likesStepByStep && difficulty !== 'easy') {
      questionText += " 단계별로 차근차근 설명해주셔도 좋습니다.";
    }

    return questionText;
  }

  // 기대 답변 타입 결정
  private getExpectedAnswerType(difficulty: QuestionDifficulty): 'short' | 'medium' | 'long' | 'structured' {
    switch (difficulty) {
      case 'easy': return 'short';
      case 'medium': return 'medium';
      case 'hard': return 'long';
      default: return 'medium';
    }
  }

  // 도움말 힌트 제공
  private getHelpHints(subQuestion: number): string[] {
    const helpKey = this.getHelpKey(0, subQuestion);
    return this.helpTemplates[helpKey] || [];
  }

  // 예시 제공
  private getExamples(subQuestion: number): string[] {
    const exampleMap: Record<number, string[]> = {
      0: ["개인 브랜드: 요리 블로거", "비즈니스 브랜드: 카페"],
      1: ["불편한 경험", "좋은 아이디어가 떠오른 순간"],
      2: ["가격이 비싸다", "품질이 아쉽다", "찾기 어렵다"]
    };

    return exampleMap[subQuestion] || [];
  }

  // 후속 질문 제안
  private getFollowUpQuestions(subQuestion: number): string[] {
    const followUpMap: Record<number, string[]> = {
      0: ["구체적으로 어떤 분야인가요?"],
      1: ["그때 어떤 기분이셨나요?", "누군가에게 도움을 받으셨나요?"],
      2: ["개선할 수 있는 방법을 생각해보신 적 있나요?"]
    };

    return followUpMap[subQuestion] || [];
  }

  // 도움말 키 생성
  private getHelpKey(step: number, subQuestion: number): string {
    const keyMap: Record<string, string> = {
      '0-0': 'brand_type',
      '0-1': 'trigger_story',
      '0-2': 'pain_point'
    };

    return keyMap[`${step}-${subQuestion}`] || 'general';
  }

  // 조건부 질문 생성 (사용자 상태 기반)
  generateConditionalQuestion(condition: UserIntent): GeneratedQuestion {
    switch (condition) {
      case 'help':
        return {
          text: "괜찮습니다! 어려운 질문이 맞아요. 천천히 생각해보시고, 어떤 부분이 어려우신지 말씀해주세요.",
          type: 'example',
          difficulty: 'easy',
          style: 'direct',
          context: '도움 제공',
          expectedAnswerType: 'short'
        };

      case 'struggle':
        return {
          text: "충분히 이해합니다. 이런 질문들이 처음에는 어려울 수 있어요. 좀 더 쉬운 방법으로 접근해볼까요?",
          type: 'example',
          difficulty: 'easy',
          style: 'choice',
          context: '격려 및 대안 제시',
          expectedAnswerType: 'short'
        };

      case 'off_topic':
        return {
          text: "그런 이야기도 중요하지만, 지금은 브랜드에 집중해볼까요? 다시 브랜드 관련 질문으로 돌아가겠습니다.",
          type: 'initial',
          difficulty: 'easy',
          style: 'direct',
          context: '주제 복귀',
          expectedAnswerType: 'medium'
        };

      default:
        return this.generateInitialQuestion(this.dialogueState.currentStep, this.dialogueState.currentSubQuestion);
    }
  }
}