// 브랜드 시스템 응답 템플릿 관리

import { AnswerValidation } from './validation';

export interface ResponseTemplate {
  pattern: string;
  examples: string[];
  tone: 'encouraging' | 'professional' | 'helpful' | 'redirecting';
}

// 답변 품질별 응답 템플릿
export const RESPONSE_TEMPLATES = {
  // 우수한 답변에 대한 응답
  excellent: {
    pattern: "[구체적 공감] + [전문가 인사이트] + [발견된 브랜드 가치] + [다음 질문]",
    examples: [
      "정말 인상적인 이야기네요! 이런 구체적인 경험에서 브랜드의 진정성이 느껴집니다.",
      "와, 이 부분에서 브랜드만의 차별화된 관점이 명확히 드러나네요!",
      "이런 디테일한 설명에서 브랜드의 핵심 가치가 분명하게 보입니다."
    ],
    tone: 'encouraging' as const
  },

  // 좋은 답변에 대한 응답  
  good: {
    pattern: "[긍정적 인정] + [브랜드 관점 해석] + [간단 정리] + [다음 단계]",
    examples: [
      "좋은 답변이네요. 이것은 브랜드의 {특성}을 잘 보여주는 중요한 요소입니다.",
      "네, 이해했습니다. 여기서 브랜드의 {가치}가 드러나는군요.",
      "맞습니다. 이런 관점이 브랜드를 특별하게 만드는 부분이죠."
    ],
    tone: 'professional' as const
  },

  // 개선이 필요한 답변에 대한 응답
  needsImprovement: {
    pattern: "[부분 인정] + [구체적 보충 요청] + [도움 예시] + [격려]",
    examples: [
      "좋은 시작이에요! 조금 더 구체적으로 말씀해주시면 브랜드의 특색을 더 잘 찾을 수 있을 것 같아요.",
      "네, 이해가 가요. 그 상황에서 구체적으로 어떤 감정이나 생각이 들었는지 조금 더 자세히 들려주세요.",
      "맞아요. 그런데 예를 들어 어떤 구체적인 모습을 상상하시는지 말씀해주실 수 있을까요?"
    ],
    tone: 'helpful' as const
  },

  // 유효하지 않거나 주제에서 벗어난 답변
  invalid: {
    pattern: "[이해 표현] + [올바른 방향 제시] + [구체적 재질문]",
    examples: [
      "이해합니다. 하지만 브랜드 관점에서 보면 조금 다른 접근이 필요할 것 같아요.",
      "그렇군요. 브랜드 구축 측면에서 다시 생각해보면 어떨까요?",
      "네, 알겠습니다. 브랜드의 정체성을 찾기 위해 다른 각도로 접근해볼게요."
    ],
    tone: 'redirecting' as const
  },

  // 도움 요청에 대한 응답
  helpNeeded: {
    pattern: "[공감과 격려] + [구체적 도움 제공] + [선택지 제시]",
    examples: [
      "괜찮아요! 많은 분들이 처음엔 어려워하세요. 제가 구체적인 예시로 도와드릴게요.",
      "전혀 이상하지 않아요. 브랜드에 대해 생각하는 것이 쉽지 않죠. 함께 차근차근 풀어가봐요.",
      "걱정 마세요! 지금까지의 대화를 바탕으로 제가 몇 가지 제안을 해드릴게요."
    ],
    tone: 'encouraging' as const
  }
} as const;

// 단계별 인사이트 템플릿
export const INSIGHT_TEMPLATES = {
  step0: {
    brandType: "이것은 {type} 브랜드의 특성을 잘 보여주는 답변이네요.",
    triggerStory: "이런 시작 이야기에서 브랜드의 진정성과 동기가 분명하게 드러납니다.",
    painPoint: "이런 문제의식이 브랜드만의 차별화된 관점을 만들어내는 원동력이 되겠네요.",
    idealScene: "이런 구체적인 비전이 브랜드가 추구하는 방향성을 명확하게 보여줍니다.",
    brandSense: "이런 감각적 표현은 브랜드 아이덴티티의 핵심 요소가 될 것 같아요.",
    principles: "이런 원칙은 브랜드 운영의 나침반 역할을 하게 될 중요한 가치관이네요.",
    targetCustomer: "이렇게 구체적인 고객 이해는 브랜드 메시지를 더 정확하게 전달하는데 도움이 될 거예요.",
    identity: "이런 정체성 정의는 브랜드의 본질을 한 문장으로 잘 압축한 것 같습니다."
  },
  
  step1: {
    mission: "이런 미션은 브랜드의 존재 이유를 명확하게 정의하는 핵심 문장이네요.",
    vision: "이런 비전은 브랜드가 만들고자 하는 미래의 모습을 구체적으로 그리고 있어요.",
    coreValues: "이런 가치들은 브랜드 의사결정의 기준이 되는 중요한 철학이 될 것 같습니다."
  }
} as const;

// 질문 연결 템플릿
export const TRANSITION_TEMPLATES = {
  step0: {
    0: "이제 이런 브랜드를 시작하게 된 구체적인 계기나 순간이 있으셨나요?",
    1: "그 과정에서 기존 업계나 서비스들을 보면서 '이건 아닌데' 싶었던 불편함이나 아쉬운 점이 있었나요?",
    2: "그렇다면 브랜드가 잘 되어서 이상적으로 운영되고 있을 때의 모습을 구체적으로 상상해보시겠어요?",
    3: "브랜드를 오감으로 표현한다면 어떤 색깔, 계절, 음악, 속도, 질감이 떠오르시나요?",
    4: "브랜드를 운영하면서 어떤 상황에서도 꼭 지키고 싶은 태도나 절대 하지 않을 것들이 있을까요?",
    5: "이 브랜드를 정말 좋아할 만한 사람들은 어떤 분들일까요? 반대로 잘 안 맞을 것 같은 사람들도 떠올려보세요.",
    6: "지금까지의 이야기를 바탕으로 브랜드 정체성을 한 문장으로 정리해보시겠어요?"
  },
  
  step1: {
    mission: "이제 이런 브랜드 씨앗을 바탕으로 구체적인 미션을 만들어봐요. 이 브랜드는 누구를 위해 무엇을 하는 브랜드인가요?",
    vision: "미션이 현재의 목적이라면, 비전은 미래의 모습이죠. 이 브랜드가 만들고 싶은 미래는 어떤 모습인가요?",
    coreValues: "이제 브랜드 운영의 기준이 될 핵심가치를 정해봅시다. 가장 중요하게 여기는 가치 3-5개는 무엇일까요?"
  }
} as const;

// 응답 생성 함수
export function generateResponse(
  validation: AnswerValidation,
  questionType: string,
  step: number,
  userAnswer: string,
  brandData?: any
): string {
  let template: ResponseTemplate;
  let insight: string = "";
  let transition: string = "";

  // 답변 품질에 따른 템플릿 선택
  switch (validation.actionRequired) {
    case 'proceed':
      template = validation.quality === 'excellent' 
        ? RESPONSE_TEMPLATES.excellent 
        : RESPONSE_TEMPLATES.good;
      break;
    case 'ask_more':
      template = RESPONSE_TEMPLATES.needsImprovement;
      break;
    case 'redirect':
      template = RESPONSE_TEMPLATES.invalid;
      break;
    case 'help':
      template = RESPONSE_TEMPLATES.helpNeeded;
      break;
    default:
      template = RESPONSE_TEMPLATES.good;
  }

  // 인사이트 생성
  if (step === 0 && INSIGHT_TEMPLATES.step0[questionType as keyof typeof INSIGHT_TEMPLATES.step0]) {
    insight = INSIGHT_TEMPLATES.step0[questionType as keyof typeof INSIGHT_TEMPLATES.step0];
  } else if (step === 1 && INSIGHT_TEMPLATES.step1[questionType as keyof typeof INSIGHT_TEMPLATES.step1]) {
    insight = INSIGHT_TEMPLATES.step1[questionType as keyof typeof INSIGHT_TEMPLATES.step1];
  }

  // 전환 문장 생성
  if (validation.actionRequired === 'proceed') {
    if (step === 0) {
      const currentQ = parseInt(questionType) || 0;
      const nextQ = currentQ + 1;
      if (nextQ < 7) {
        transition = TRANSITION_TEMPLATES.step0[nextQ as keyof typeof TRANSITION_TEMPLATES.step0];
      }
    } else if (step === 1) {
      transition = TRANSITION_TEMPLATES.step1[questionType as keyof typeof TRANSITION_TEMPLATES.step1] || "";
    }
  }

  // 최종 응답 조합
  let response = "";
  
  // 공감/인정 표현
  const exampleResponse = template.examples[Math.floor(Math.random() * template.examples.length)];
  response += exampleResponse;

  // 인사이트 추가
  if (insight) {
    response += " " + insight;
  }

  // 개선이 필요한 경우 구체적 제안
  if (validation.suggestions.length > 0) {
    response += " " + validation.suggestions[0];
  }

  // 다음 질문으로 전환
  if (transition) {
    response += "\n\n" + transition;
  }

  return response;
}

// 브랜드 유형별 맞춤 예시 제공
export function getExamplesByBrandType(questionType: string, brandType: string): string[] {
  const examples: Record<string, Record<string, string[]>> = {
    triggerStory: {
      '카페': [
        "친구들과 카페를 갔는데 분위기나 음료가 아쉬워서 '내가 만든다면?' 하고 생각했어요",
        "좋은 원두로 정말 맛있는 커피를 만들어 사람들과 나누고 싶었어요",
        "동네에 이런 따뜻한 공간이 있으면 좋겠다고 생각했습니다"
      ],
      '온라인 비즈니스': [
        "기존 서비스들이 너무 복잡하고 불편해서 직접 만들어보고 싶었어요",
        "사람들의 실제 문제를 해결할 수 있는 아이디어가 떠올랐습니다",
        "온라인으로 더 많은 사람들에게 도움을 주고 싶었어요"
      ],
      '전문가': [
        "내가 가진 전문성으로 더 많은 사람들을 도울 수 있겠다고 생각했어요",
        "기존 교육 방식의 한계를 느끼고 새로운 방법을 시도하고 싶었습니다",
        "경험과 노하우를 체계적으로 전수하고 싶었어요"
      ]
    }
    // 다른 질문 타입들도 필요시 추가
  };

  return examples[questionType]?.[brandType] || [];
}