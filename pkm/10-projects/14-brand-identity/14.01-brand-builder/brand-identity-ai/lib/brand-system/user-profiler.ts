// 사용자 프로파일링 시스템
import { UserProfile, UserIntent } from './dialogue-state-manager';

// 답변 분석 결과
export interface AnswerAnalysis {
  length: number;
  complexity: 'simple' | 'moderate' | 'complex';
  professionalTerms: string[];
  emotionalTone: 'positive' | 'neutral' | 'negative' | 'uncertain';
  concreteness: 'abstract' | 'moderate' | 'concrete';
  businessMaturity: 'startup' | 'growth' | 'established';
}

// 사용자 행동 패턴
export interface UserBehaviorPattern {
  avgResponseTime: number;
  retryFrequency: number;
  helpRequestFrequency: number;
  detailLevel: 'minimal' | 'adequate' | 'detailed';
  consistencyScore: number; // 0-1
}

// 학습 스타일
export interface LearningStyle {
  prefersExamples: boolean;
  needsEncouragement: boolean;
  respondsToStructure: boolean;
  likesStepByStep: boolean;
}

// 확장된 사용자 프로필
export interface ExtendedUserProfile extends UserProfile {
  behaviorPattern: UserBehaviorPattern;
  learningStyle: LearningStyle;
  domainKnowledge: {
    branding: 'novice' | 'basic' | 'intermediate' | 'advanced';
    business: 'novice' | 'basic' | 'intermediate' | 'advanced';
    marketing: 'novice' | 'basic' | 'intermediate' | 'advanced';
  };
  personalityTraits: {
    creativity: number; // 0-1
    analyticalThinking: number; // 0-1
    riskTolerance: number; // 0-1
    detailOrientation: number; // 0-1
  };
  sessionHistory: {
    totalSessions: number;
    completionRate: number;
    lastSessionDate?: Date;
  };
}

export class UserProfiler {
  private profile: ExtendedUserProfile;
  private answerHistory: AnswerAnalysis[] = [];
  private intentHistory: UserIntent[] = [];

  constructor(initialProfile?: Partial<ExtendedUserProfile>) {
    this.profile = {
      experienceLevel: 'beginner',
      preferredCommunicationStyle: 'encouraging',
      averageResponseLength: 'medium',
      strugglingAreas: [],
      strongAreas: [],
      behaviorPattern: {
        avgResponseTime: 0,
        retryFrequency: 0,
        helpRequestFrequency: 0,
        detailLevel: 'adequate',
        consistencyScore: 0.7
      },
      learningStyle: {
        prefersExamples: true,
        needsEncouragement: true,
        respondsToStructure: true,
        likesStepByStep: true
      },
      domainKnowledge: {
        branding: 'novice',
        business: 'basic',
        marketing: 'novice'
      },
      personalityTraits: {
        creativity: 0.5,
        analyticalThinking: 0.5,
        riskTolerance: 0.5,
        detailOrientation: 0.5
      },
      sessionHistory: {
        totalSessions: 1,
        completionRate: 0
      },
      ...initialProfile
    };
  }

  // 답변 분석
  analyzeAnswer(answer: string): AnswerAnalysis {
    const length = answer.length;
    const words = answer.split(/\s+/).length;

    // 전문 용어 감지
    const professionalTerms = this.detectProfessionalTerms(answer);

    // 복잡도 분석
    const complexity = this.analyzeComplexity(answer, words);

    // 감정 톤 분석
    const emotionalTone = this.analyzeEmotionalTone(answer);

    // 구체성 분석
    const concreteness = this.analyzeConcreteness(answer);

    // 비즈니스 성숙도 분석
    const businessMaturity = this.analyzeBusinessMaturity(answer);

    const analysis: AnswerAnalysis = {
      length,
      complexity,
      professionalTerms,
      emotionalTone,
      concreteness,
      businessMaturity
    };

    this.answerHistory.push(analysis);
    this.updateProfileFromAnalysis(analysis);

    return analysis;
  }

  private detectProfessionalTerms(text: string): string[] {
    const brandingTerms = [
      '브랜딩', '브랜드', '아이덴티티', '포지셔닝', '차별화', '타겟', '세그먼트',
      '마케팅', '퍼스널 브랜딩', '브랜드 가치', '브랜드 인지도', '브랜드 로열티'
    ];

    const businessTerms = [
      '매출', '수익', '고객', '시장', '경쟁사', '사업모델', '가치제안',
      'ROI', 'KPI', '전략', '분석', '개선', '최적화'
    ];

    const allTerms = [...brandingTerms, ...businessTerms];
    return allTerms.filter(term => text.includes(term));
  }

  private analyzeComplexity(text: string, wordCount: number): 'simple' | 'moderate' | 'complex' {
    const sentenceCount = text.split(/[.!?]/).length;
    const avgWordsPerSentence = wordCount / sentenceCount;
    const hasSubClauses = /[,;:]/.test(text);
    const hasConjunctions = /그리고|하지만|그러나|또한|따라서/.test(text);

    if (avgWordsPerSentence > 15 && hasSubClauses && hasConjunctions) {
      return 'complex';
    } else if (avgWordsPerSentence > 8 && (hasSubClauses || hasConjunctions)) {
      return 'moderate';
    }
    return 'simple';
  }

  private analyzeEmotionalTone(text: string): 'positive' | 'neutral' | 'negative' | 'uncertain' {
    const positiveWords = /좋아|기대|흥미|재미|행복|만족|성공|발전|성장|확신/;
    const negativeWords = /어려워|힘들어|걱정|불안|실패|문제|안좋아|싫어/;
    const uncertainWords = /모르겠|아직|확실|생각해|고민|망설/;

    if (uncertainWords.test(text)) return 'uncertain';
    if (positiveWords.test(text)) return 'positive';
    if (negativeWords.test(text)) return 'negative';
    return 'neutral';
  }

  private analyzeConcreteness(text: string): 'abstract' | 'moderate' | 'concrete' {
    const concreteIndicators = [
      /\d+/, // 숫자
      /예를 들어|구체적으로|실제로|경험/, // 구체성 표현
      /년|월|일|시간/, // 시간 표현
      /원|달러|퍼센트/, // 구체적 수치
    ];

    const abstractIndicators = [
      /생각|느낌|감정|인상|이미지/, // 추상적 표현
      /대략|어느정도|조금|많이/ // 모호한 표현
    ];

    const concreteScore = concreteIndicators.filter(pattern => pattern.test(text)).length;
    const abstractScore = abstractIndicators.filter(pattern => pattern.test(text)).length;

    if (concreteScore > abstractScore + 1) return 'concrete';
    if (abstractScore > concreteScore + 1) return 'abstract';
    return 'moderate';
  }

  private analyzeBusinessMaturity(text: string): 'startup' | 'growth' | 'established' {
    const startupIndicators = /시작|창업|아이디어|계획|준비/;
    const growthIndicators = /확장|성장|발전|개선|다음단계/;
    const establishedIndicators = /운영|관리|시스템|프로세스|안정적/;

    if (establishedIndicators.test(text)) return 'established';
    if (growthIndicators.test(text)) return 'growth';
    return 'startup';
  }

  private updateProfileFromAnalysis(analysis: AnswerAnalysis): void {
    // 도메인 지식 업데이트
    if (analysis.professionalTerms.length > 3) {
      this.updateDomainKnowledge(analysis.professionalTerms);
    }

    // 경험 수준 업데이트
    if (analysis.complexity === 'complex' && analysis.professionalTerms.length > 0) {
      this.profile.experienceLevel = 'intermediate';
    } else if (analysis.complexity === 'simple' && analysis.professionalTerms.length === 0) {
      this.profile.experienceLevel = 'beginner';
    }

    // 성격 특성 업데이트
    this.updatePersonalityTraits(analysis);

    // 학습 스타일 업데이트
    this.updateLearningStyle(analysis);
  }

  private updateDomainKnowledge(professionalTerms: string[]): void {
    const brandingTerms = professionalTerms.filter(term =>
      ['브랜딩', '브랜드', '아이덴티티', '포지셔닝'].some(bt => term.includes(bt))
    );
    const businessTerms = professionalTerms.filter(term =>
      ['매출', '수익', '사업모델', '전략'].some(bt => term.includes(bt))
    );
    const marketingTerms = professionalTerms.filter(term =>
      ['마케팅', '고객', '타겟', '세그먼트'].some(mt => term.includes(mt))
    );

    if (brandingTerms.length > 2) {
      this.profile.domainKnowledge.branding = 'intermediate';
    }
    if (businessTerms.length > 2) {
      this.profile.domainKnowledge.business = 'intermediate';
    }
    if (marketingTerms.length > 2) {
      this.profile.domainKnowledge.marketing = 'intermediate';
    }
  }

  private updatePersonalityTraits(analysis: AnswerAnalysis): void {
    // 창의성 (감정적 표현, 은유 사용 등)
    if (analysis.emotionalTone === 'positive' && analysis.concreteness === 'abstract') {
      this.profile.personalityTraits.creativity = Math.min(1, this.profile.personalityTraits.creativity + 0.1);
    }

    // 분석적 사고 (논리적 구조, 전문 용어 사용)
    if (analysis.complexity === 'complex' && analysis.professionalTerms.length > 0) {
      this.profile.personalityTraits.analyticalThinking = Math.min(1, this.profile.personalityTraits.analyticalThinking + 0.1);
    }

    // 세부 지향성 (구체적 예시, 상세한 설명)
    if (analysis.concreteness === 'concrete' && analysis.length > 200) {
      this.profile.personalityTraits.detailOrientation = Math.min(1, this.profile.personalityTraits.detailOrientation + 0.1);
    }
  }

  private updateLearningStyle(analysis: AnswerAnalysis): void {
    // 구체적 예시를 좋아하는지
    if (analysis.concreteness === 'concrete') {
      this.profile.learningStyle.prefersExamples = true;
    }

    // 격려가 필요한지
    if (analysis.emotionalTone === 'uncertain' || analysis.emotionalTone === 'negative') {
      this.profile.learningStyle.needsEncouragement = true;
    }
  }

  // 사용자 의도 추적
  trackUserIntent(intent: UserIntent): void {
    this.intentHistory.push(intent);

    // 행동 패턴 업데이트
    if (intent === 'help') {
      this.profile.behaviorPattern.helpRequestFrequency++;
      this.profile.learningStyle.needsEncouragement = true;
    }

    if (intent === 'struggle') {
      this.profile.learningStyle.likesStepByStep = true;
    }
  }

  // 맞춤형 커뮤니케이션 스타일 추천
  getRecommendedCommunicationStyle(): {
    tone: 'formal' | 'casual' | 'encouraging';
    pace: 'slow' | 'medium' | 'fast';
    detailLevel: 'minimal' | 'standard' | 'detailed';
    useExamples: boolean;
    provideEncouragement: boolean;
  } {
    return {
      tone: this.profile.learningStyle.needsEncouragement ? 'encouraging' :
            this.profile.experienceLevel === 'expert' ? 'formal' : 'casual',
      pace: this.profile.behaviorPattern.helpRequestFrequency > 2 ? 'slow' : 'medium',
      detailLevel: this.profile.personalityTraits.detailOrientation > 0.7 ? 'detailed' : 'standard',
      useExamples: this.profile.learningStyle.prefersExamples,
      provideEncouragement: this.profile.learningStyle.needsEncouragement
    };
  }

  // 다음 질문 난이도 추천
  getRecommendedQuestionComplexity(): 'simple' | 'moderate' | 'complex' {
    const avgComplexity = this.answerHistory.length > 0 ?
      this.answerHistory[this.answerHistory.length - 1].complexity : 'simple';

    if (this.profile.experienceLevel === 'beginner' ||
        this.profile.behaviorPattern.helpRequestFrequency > 2) {
      return 'simple';
    }

    if (this.profile.experienceLevel === 'expert' && avgComplexity === 'complex') {
      return 'complex';
    }

    return 'moderate';
  }

  // 프로필 접근자
  getProfile(): ExtendedUserProfile {
    return { ...this.profile };
  }

  // 프로필 저장/불러오기
  serialize(): string {
    return JSON.stringify({
      profile: this.profile,
      answerHistory: this.answerHistory.slice(-10), // 최근 10개만
      intentHistory: this.intentHistory.slice(-20) // 최근 20개만
    });
  }

  deserialize(data: string): void {
    try {
      const parsed = JSON.parse(data);
      this.profile = parsed.profile;
      this.answerHistory = parsed.answerHistory || [];
      this.intentHistory = parsed.intentHistory || [];
    } catch (error) {
      console.error('Failed to deserialize user profile:', error);
    }
  }

  // 프로필 초기화
  reset(): void {
    this.answerHistory = [];
    this.intentHistory = [];
    // 기본 프로필로 초기화하되 세션 히스토리는 유지
    const sessionHistory = this.profile.sessionHistory;
    this.profile = {
      experienceLevel: 'beginner',
      preferredCommunicationStyle: 'encouraging',
      averageResponseLength: 'medium',
      strugglingAreas: [],
      strongAreas: [],
      behaviorPattern: {
        avgResponseTime: 0,
        retryFrequency: 0,
        helpRequestFrequency: 0,
        detailLevel: 'adequate',
        consistencyScore: 0.7
      },
      learningStyle: {
        prefersExamples: true,
        needsEncouragement: true,
        respondsToStructure: true,
        likesStepByStep: true
      },
      domainKnowledge: {
        branding: 'novice',
        business: 'basic',
        marketing: 'novice'
      },
      personalityTraits: {
        creativity: 0.5,
        analyticalThinking: 0.5,
        riskTolerance: 0.5,
        detailOrientation: 0.5
      },
      sessionHistory: {
        ...sessionHistory,
        totalSessions: sessionHistory.totalSessions + 1
      }
    };
  }
}