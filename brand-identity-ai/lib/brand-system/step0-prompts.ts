import { STEP0_EXPERT, detectUserStruggling, summarizeConversation, summarizeBrandData } from './stage-experts';
import { assessAnswerQuality, AnswerValidation } from './validation';
import { generateResponse } from './response-templates';

export interface Step0PromptContext {
  currentQuestion: number;
  userMessage: string;
  conversationHistory: any[];
  brandData: any;
  brandType?: string;
}

// Step 0 단계별 질문 지침
const STEP0_QUESTION_GUIDES = {
  0: { // 브랜드 유형 파악
    purpose: "브랜드 유형을 파악하여 맞춤형 질문 제공 기반 구축",
    approach: "비즈니스/퍼스널 브랜드 구분과 구체적 예시 제공",
    examples: `비즈니스 브랜드: 카페, 온라인 쇼핑몰, 디자인 스튜디오 등
퍼스널 브랜드: 전문가, 인플루언서, 프리랜서 등`,
    validation: "사용자가 구체적 분야를 언급했는지 확인"
  },

  1: { // 시작 장면
    purpose: "브랜드를 시작하게 된 구체적 트리거 순간 발굴",
    approach: "감정과 상황이 포함된 구체적 에피소드 유도",
    byBrandType: {
      '카페/레스토랑': `예시로 이런 경험들을 들어보세요:
• "친구들과 카페를 갔는데 분위기나 음료가 아쉬워서..."
• "맛있는 음식을 만들어 사람들과 나누고 싶어서..."
• "동네에 이런 공간이 있으면 좋겠다고 생각해서..."`,
      '온라인 비즈니스': `예시:
• "기존 서비스들이 불편해서 직접 만들어보고 싶었다"
• "사람들의 문제를 해해결할 수 있는 아이디어가 떠올랐다"
• "온라인으로 더 많은 사람들에게 도움을 주고 싶었다"`,
      '전문가/교육': `예시:
• "내가 가진 전문성으로 더 많은 사람들을 도울 수 있겠다"
• "기존 교육 방식에 한계를 느끼고 새로운 방법을 시도하고 싶었다"
• "경험과 노하우를 체계적으로 전수하고 싶었다"`
    },
    validation: "구체적 상황 + 감정 + 3문장 이상"
  },

  2: { // 불편함/이상함
    purpose: "업계에서 느꼈던 불편함이나 문제점 파악",
    approach: "감정적 반응과 함께 구체적 상황 묘사",
    byBrandType: {
      '카페/레스토랑': `예시:
• "가격대비 퀄리티가 아쉬운 곳들이 많더라"
• "진정성 있는 브랜드를 찾기 어려웠다"
• "획일화된 인테리어와 메뉴들"`,
      '온라인 비즈니스': `예시:
• "복잡하고 사용하기 어려운 인터페이스들"
• "고객 서비스 품질이 떨어지는 플랫폼들"
• "진정성보다는 이익만 추구하는 느낌"`,
      '전문가/교육': `예시:
• "이론 중심의 실무와 동떨어진 교육들"
• "일방적이고 지루한 강의 방식들"
• "개인의 상황을 고려하지 않는 획일적인 커리큘럼"`
    },
    validation: "구체적 불편함 + 그때 감정"
  },

  3: { // 이상적 장면
    purpose: "브랜드가 성공했을 때의 구체적 비전 설정",
    approach: "영화 한 장면처럼 구체적 묘사 유도",
    examples: `구체적으로 상상해보세요:
• 고객들의 표정과 행동
• 그 순간의 분위기와 느낌
• 주변 사람들의 반응`,
    validation: "영화적 묘사 수준의 구체성"
  },

  4: { // 감각 표현
    purpose: "브랜드를 오감으로 표현하여 감각적 정체성 구축",
    approach: "직감적 연상을 통한 5가지 요소 수집",
    template: `🎨 브랜드 감각 표현
• 색상: 어떤 색이 떠오르나요?
• 계절: 어떤 계절 같나요?
• 음악: 어떤 음악 장르인가요?
• 속도: 어떤 속도감인가요?
• 질감: 어떤 질감 같나요?

완벽하지 않아도 괜찮아요! 직감적으로 떠오르는 것들을 말씀해주세요`,
    validation: "5개 요소 모두 응답"
  },

  5: { // 지키고 싶은 태도
    purpose: "브랜드 운영 원칙과 피하고 싶은 것들 명확화",
    approach: "DO & DON'T 리스트 구분 수집",
    template: `어떤 상황에서도 지키고 싶은 태도가 있나요? 💫
반대로 "이런 건 절대 안 하고 싶다" 하는 것도요!`,
    validation: "지킬것/안할것 구분 명확"
  },

  6: { // 고객의 얼굴
    purpose: "타깃 고객과 비타깃 고객 구체화",
    approach: "구체적 인물상과 라이프스타일 묘사",
    examples: `구체적으로 떠올려보세요:
👍 좋아할 사람: 나이, 직업, 라이프스타일, 가치관
🚫 안맞을 사람: 어떤 성향의 사람들?`,
    validation: "구체적 인물 묘사"
  },

  7: { // 한 문장 정체성
    purpose: "브랜드 정체성을 하나의 명확한 문장으로 정리",
    approach: "템플릿 제공 후 자유로운 표현 유도",
    template: `"___은 ___한 사람을 위한 ___한 브랜드입니다"

또는 자유롭게 한 문장으로 표현해보세요!`,
    validation: "브랜드 정체성이 명확히 담긴 한 문장"
  },

  8: { // 종합 정리
    purpose: "8개 질문을 통해 수집된 브랜드 씨앗을 체계적으로 정리",
    approach: "수집된 모든 정보를 브랜드 씨앗 구조로 체계화하여 요약 제시",
    template: `브랜드 씨앗 발굴이 완료되었습니다! 수집된 정보를 정리하여 브랜드 정체성의 기초를 만들어드립니다.`,
    validation: "모든 단계별 정보가 체계적으로 정리됨"
  }
};

// Step 0 전용 프롬프트 생성기 (검증 시스템 통합)
export function generateStep0Prompt(context: Step0PromptContext): string {
  const { currentQuestion, userMessage, conversationHistory, brandData, brandType } = context;

  // 첫 방문자인 경우 (빈 메시지)
  if (!userMessage.trim()) {
    return `${STEP0_EXPERT.systemPrompt}

[첫 방문 환영 메시지]
브랜드 씨앗 발굴을 시작합니다. 먼저 어떤 종류의 브랜드를 구상하고 계신지 알려주세요.

예시: 카페, 온라인 쇼핑몰, 디자인 스튜디오, 전문가 브랜딩, 교육 서비스 등

자연스럽고 편안한 톤으로 질문해주세요.`;
  }

  // 답변이 있는 경우 검증 시스템 활용
  const questionTypes = ['brandType', 'triggerStory', 'painPoint', 'idealScene', 'brandSense', 'principles', 'targetCustomer', 'identity'];
  const questionType = questionTypes[currentQuestion] || 'brandType';
  
  // 답변 품질 검증
  const validation = assessAnswerQuality(userMessage, questionType, 0);
  
  // 검증 결과에 따른 맞춤형 응답 생성
  if (validation.actionRequired === 'help') {
    return `${STEP0_EXPERT.systemPrompt}

[도움 요청 감지]
사용자가 도움을 요청했습니다. 구체적인 예시와 함께 친근하게 도와주세요.

현재 질문: ${questionType}
브랜드 유형: ${brandType || '파악 중'}

격려하며 구체적인 예시를 들어 도움을 제공하세요.`;
  }

  if (validation.actionRequired === 'redirect') {
    return `${STEP0_EXPERT.systemPrompt}

[주제 이탈 감지]
답변이 질문 주제에서 벗어났습니다. 친근하게 올바른 방향으로 유도해주세요.

현재 질문: ${questionType}
문제점: ${validation.issues.join(', ')}

이해 표현 후 브랜드 관점에서 다시 질문해주세요.`;
  }

  if (validation.actionRequired === 'ask_more') {
    return `${STEP0_EXPERT.systemPrompt}

[추가 정보 필요]
답변이 부족합니다. 더 구체적인 정보를 요청하세요.

현재 질문: ${questionType}
부족한 부분: ${validation.suggestions.join(', ')}

긍정적으로 인정한 후 구체적인 보충 질문을 해주세요.`;
  }

  // 좋은 답변인 경우 단계 완료 및 종료 처리
  if (currentQuestion >= 7) {
    return `${STEP0_EXPERT.systemPrompt}

[Step 0 완료 - 브랜드 씨앗 종합 정리]
8개 질문이 모두 완료되었습니다. 브랜드 씨앗을 체계적으로 정리해주세요.

수집된 정보를 다음 구조로 요약:
- 브랜드 유형과 시작 계기
- 해결하고자 한 문제와 이상적 비전
- 브랜드 감각과 운영 원칙
- 타깃 고객과 정체성 선언

마지막에 "브랜드 씨앗 발굴이 완료되었습니다! 다음 단계로 진행하시겠습니까?"라고 안내하세요.`;
  }

  // 일반적인 진행 상황
  return `${STEP0_EXPERT.systemPrompt}

[현재 진행 상황]
질문 단계: ${currentQuestion + 1}/8 (${questionType})
답변 품질: ${validation.quality}

사용자 답변을 브랜드 관점에서 해석하고, 발견된 가치를 정리한 후 자연스럽게 다음 질문으로 연결하세요.

응답은 4-5줄로 제한하고 전문적이면서 격려적인 톤을 유지하세요.`;
}