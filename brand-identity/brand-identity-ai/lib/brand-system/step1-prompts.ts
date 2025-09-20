import { STEP1_EXPERT, detectUserStruggling, summarizeConversation, summarizeBrandData } from './stage-experts';
import { assessAnswerQuality, AnswerValidation } from './validation';
import { generateResponse } from './response-templates';

export interface Step1PromptContext {
  currentBrandData: any;
  userMessage: string;
  conversationHistory: any[];
}

// Step 1 전용 프롬프트 생성기 (검증 시스템 통합)
export function generateStep1Prompt(context: Step1PromptContext): string {
  const { currentBrandData, userMessage, conversationHistory } = context;

  // Step 0 브랜드 씨앗 정보 구조화
  const step0Output = currentBrandData.step0Output || {};
  const brandSeed = {
    brandType: step0Output.brandType || currentBrandData.brandType || '알 수 없음',
    triggerStory: step0Output.triggerStory || currentBrandData.triggers || '',
    oneLineIdentity: step0Output.oneLineIdentity || ''
  };

  // 첫 방문자인 경우
  if (!userMessage.trim()) {
    return `${STEP1_EXPERT.systemPrompt}

[Step 1 시작 - 브랜드 정체성 체계 구축]
Step 0에서 발굴하신 "${brandSeed.oneLineIdentity}" 정체성을 바탕으로 구체적인 미션, 비전, 핵심가치를 정립하겠습니다.

브랜드 유형: ${brandSeed.brandType}
트리거 스토리를 활용하여 미션부터 시작해보겠습니다.

따뜻하고 전문적인 톤으로 미션 질문을 시작하세요.`;
  }

  // 현재 진행 중인 요소 파악 (미션 → 비전 → 핵심가치 순서)
  let currentElement = 'mission';
  if (currentBrandData.mission && !currentBrandData.vision) {
    currentElement = 'vision';
  } else if (currentBrandData.mission && currentBrandData.vision && !currentBrandData.coreValues) {
    currentElement = 'coreValues';
  }

  // 답변 품질 검증
  const validation = assessAnswerQuality(userMessage, currentElement, 1);

  // 검증 결과에 따른 맞춤형 응답
  if (validation.actionRequired === 'help') {
    return `${STEP1_EXPERT.systemPrompt}

[도움 요청 감지 - Step 1]
Step 0 브랜드 씨앗을 바탕으로 구체적인 ${currentElement} 제안을 드리겠습니다.

브랜드 씨앗 정보:
- 유형: ${brandSeed.brandType}  
- 트리거: ${brandSeed.triggerStory}
- 정체성: ${brandSeed.oneLineIdentity}

이 정보를 연결하여 구체적인 예시와 함께 도움을 제공하세요.`;
  }

  if (validation.actionRequired === 'redirect') {
    return `${STEP1_EXPERT.systemPrompt}

[주제 이탈 감지 - Step 1]
${currentElement} 질문에서 벗어난 답변입니다. 브랜드 관점에서 다시 유도해주세요.

현재 작업: ${currentElement}
브랜드 컨텍스트: ${brandSeed.brandType}

친근하게 올바른 방향으로 유도하세요.`;
  }

  if (validation.actionRequired === 'ask_more') {
    return `${STEP1_EXPERT.systemPrompt}

[추가 정보 필요 - Step 1]  
${currentElement}에 대한 답변이 부족합니다.

Step 0 정보를 활용하여 더 구체적인 질문을 해주세요:
- 트리거 스토리: ${brandSeed.triggerStory}
- 브랜드 정체성: ${brandSeed.oneLineIdentity}

긍정적으로 인정한 후 구체적인 보충 질문을 하세요.`;
  }

  // Step 1 완료 체크
  if (currentBrandData.mission && currentBrandData.vision && currentBrandData.coreValues) {
    return `${STEP1_EXPERT.systemPrompt}

[Step 1 완료 - 브랜드 정체성 체계 완성]
미션, 비전, 핵심가치가 모두 완성되었습니다.

지금까지의 결과를 체계적으로 정리하고 Step 2로의 전환을 안내하세요:
- 미션: ${currentBrandData.mission}
- 비전: ${currentBrandData.vision}  
- 핵심가치: ${Array.isArray(currentBrandData.coreValues) ? currentBrandData.coreValues.join(', ') : currentBrandData.coreValues}

"브랜드 정체성 체계가 완성되었습니다! 다음 단계로 진행하시겠습니까?"라고 안내하세요.`;
  }

  // 일반적인 진행 상황
  return `${STEP1_EXPERT.systemPrompt}

[Step 1 진행 중]
현재 작업: ${currentElement}
답변 품질: ${validation.quality}

Step 0 브랜드 씨앗을 적극 활용하여:
- 브랜드 유형: ${brandSeed.brandType}
- 트리거 스토리를 ${currentElement}와 연결

전문가 관점에서 해석하고 다음 단계로 자연스럽게 진행하세요.
응답은 4-5줄로 제한하세요.`;
}