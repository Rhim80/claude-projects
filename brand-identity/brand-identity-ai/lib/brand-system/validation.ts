// 브랜드 시스템 답변 검증 및 품질 관리

export interface AnswerValidation {
  isValid: boolean;
  quality: 'excellent' | 'good' | 'needs_improvement' | 'invalid';
  score: number; // 0-100
  issues: string[];
  suggestions: string[];
  actionRequired: 'proceed' | 'ask_more' | 'redirect' | 'help';
}

export interface ValidationCriteria {
  minLength: number;
  maxLength: number;
  requiredElements: string[];
  forbiddenKeywords: string[];
  mustInclude?: string[];
  checkPatterns?: RegExp[];
}

// Step 0 각 질문별 검증 기준
export const STEP0_VALIDATION_CRITERIA = {
  brandType: {
    minLength: 5,
    maxLength: 200,
    requiredElements: ['분야', '유형'],
    forbiddenKeywords: ['모르겠', '아무거나', '그냥', '네가', '추천'],
    mustInclude: [],
  },
  
  triggerStory: {
    minLength: 30,
    maxLength: 500,
    requiredElements: ['상황', '계기'],
    forbiddenKeywords: ['모르겠', '그냥', '특별히 없', '기억 안'],
    checkPatterns: [/언제|그때|당시|순간|상황/],
  },
  
  painPoint: {
    minLength: 20,
    maxLength: 400,
    requiredElements: ['문제', '불편'],
    forbiddenKeywords: ['없어', '괜찮아', '문제없어'],
    checkPatterns: [/아쉬워|불편|문제|이상해|안좋아/],
  },
  
  idealScene: {
    minLength: 30,
    maxLength: 500,
    requiredElements: ['모습', '장면'],
    forbiddenKeywords: ['모르겠', '그냥', '별로'],
    checkPatterns: [/보고싶|되었으면|모습|장면|상상/],
  },
  
  brandSense: {
    minLength: 10,
    maxLength: 300,
    requiredElements: ['색상', '느낌'],
    forbiddenKeywords: ['모르겠', '아무거나'],
  },
  
  principles: {
    minLength: 15,
    maxLength: 400,
    requiredElements: ['원칙', '태도'],
    forbiddenKeywords: ['없어', '모르겠'],
  },
  
  targetCustomer: {
    minLength: 20,
    maxLength: 400,
    requiredElements: ['고객', '사람'],
    forbiddenKeywords: ['아무나', '모든사람', '다'],
  },
  
  identity: {
    minLength: 10,
    maxLength: 200,
    requiredElements: ['브랜드', '정체성'],
    forbiddenKeywords: ['모르겠', '그냥'],
  }
} as const;

// Step 1 검증 기준
export const STEP1_VALIDATION_CRITERIA = {
  mission: {
    minLength: 20,
    maxLength: 300,
    requiredElements: ['목적', '사명'],
    forbiddenKeywords: ['모르겠', '그냥'],
    checkPatterns: [/위해|위한|목적|사명|미션/],
  },
  
  vision: {
    minLength: 20,
    maxLength: 300,
    requiredElements: ['미래', '비전'],
    forbiddenKeywords: ['모르겠', '그냥'],
    checkPatterns: [/되고싶|만들고싶|비전|미래|목표/],
  },
  
  coreValues: {
    minLength: 15,
    maxLength: 400,
    requiredElements: ['가치', '중요'],
    forbiddenKeywords: ['없어', '모르겠'],
  }
} as const;

// 기본 답변 검증 함수
export function validateAnswer(
  answer: string, 
  questionType: keyof typeof STEP0_VALIDATION_CRITERIA | keyof typeof STEP1_VALIDATION_CRITERIA,
  step: number = 0
): AnswerValidation {
  const criteria = step === 0 
    ? STEP0_VALIDATION_CRITERIA[questionType as keyof typeof STEP0_VALIDATION_CRITERIA]
    : STEP1_VALIDATION_CRITERIA[questionType as keyof typeof STEP1_VALIDATION_CRITERIA];
  
  if (!criteria) {
    return {
      isValid: true,
      quality: 'good',
      score: 70,
      issues: [],
      suggestions: [],
      actionRequired: 'proceed'
    };
  }

  const issues: string[] = [];
  const suggestions: string[] = [];
  let score = 100;

  // 길이 검증
  if (answer.length < criteria.minLength) {
    issues.push(`답변이 너무 짧습니다 (최소 ${criteria.minLength}자 필요)`);
    suggestions.push('좀 더 구체적으로 설명해주세요');
    score -= 30;
  }

  if (answer.length > criteria.maxLength) {
    issues.push('답변이 너무 깁니다');
    suggestions.push('핵심 내용만 간단히 말씀해주세요');
    score -= 10;
  }

  // 금지 키워드 검증
  const lowerAnswer = answer.toLowerCase();
  const foundForbidden = criteria.forbiddenKeywords.filter(keyword => 
    lowerAnswer.includes(keyword)
  );
  
  if (foundForbidden.length > 0) {
    issues.push('구체적인 답변이 필요합니다');
    suggestions.push('경험이나 생각을 구체적으로 말씀해주세요');
    score -= 40;
  }

  // 패턴 검증 (있는 경우)
  if (criteria.checkPatterns) {
    const hasPattern = criteria.checkPatterns.some(pattern => pattern.test(answer));
    if (!hasPattern) {
      issues.push('주제와 관련된 내용이 부족합니다');
      suggestions.push('질문의 핵심에 맞는 답변을 해주세요');
      score -= 20;
    }
  }

  // 품질 등급 결정
  let quality: AnswerValidation['quality'];
  let actionRequired: AnswerValidation['actionRequired'];

  if (score >= 85) {
    quality = 'excellent';
    actionRequired = 'proceed';
  } else if (score >= 70) {
    quality = 'good';
    actionRequired = 'proceed';
  } else if (score >= 40) {
    quality = 'needs_improvement';
    actionRequired = 'ask_more';
  } else {
    quality = 'invalid';
    actionRequired = foundForbidden.length > 0 ? 'help' : 'redirect';
  }

  return {
    isValid: score >= 40,
    quality,
    score,
    issues,
    suggestions,
    actionRequired
  };
}

// 도움 요청 감지
export function detectHelpRequest(answer: string): boolean {
  const helpKeywords = [
    '모르겠', '어려워', '잘 모르', '글쎄', '패스', '다음', 
    '그냥', '아무거나', '네가 정해', '추천해', '예시', '도와'
  ];
  
  const lowerAnswer = answer.toLowerCase();
  return helpKeywords.some(keyword => lowerAnswer.includes(keyword));
}

// 주제 이탈 감지
export function detectOffTopic(answer: string, questionType: string): boolean {
  const topicKeywords = {
    brandType: ['브랜드', '사업', '비즈니스', '카페', '온라인', '전문가', '서비스'],
    triggerStory: ['시작', '계기', '순간', '생각', '경험', '동기'],
    painPoint: ['문제', '불편', '아쉬워', '부족', '개선', '이상'],
    idealScene: ['모습', '장면', '되었으면', '보고싶', '이상적', '꿈'],
    brandSense: ['색', '느낌', '분위기', '감각', '이미지', '스타일'],
    principles: ['원칙', '가치', '태도', '지키', '피하', '중요'],
    targetCustomer: ['고객', '사람', '타깃', '대상', '누구'],
    identity: ['정체성', '브랜드', '본질', '핵심', '특징']
  };

  const keywords = topicKeywords[questionType as keyof typeof topicKeywords] || [];
  const lowerAnswer = answer.toLowerCase();
  
  return !keywords.some(keyword => lowerAnswer.includes(keyword));
}

// 답변 품질 종합 평가
export function assessAnswerQuality(
  answer: string, 
  questionType: string, 
  step: number = 0
): AnswerValidation {
  // 기본 검증
  const validation = validateAnswer(answer, questionType as any, step);
  
  // 추가 검증
  if (detectHelpRequest(answer)) {
    validation.actionRequired = 'help';
    validation.suggestions.unshift('구체적인 예시를 들어 도움을 드리겠습니다');
  }
  
  if (detectOffTopic(answer, questionType)) {
    validation.score -= 25;
    validation.issues.push('질문 주제와 다른 내용입니다');
    validation.suggestions.push('질문에 직접적으로 관련된 답변을 해주세요');
    validation.actionRequired = 'redirect';
  }

  return validation;
}