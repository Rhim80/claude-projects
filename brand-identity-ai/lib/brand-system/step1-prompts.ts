import { STEP1_EXPERT, detectUserStruggling, summarizeConversation, summarizeBrandData } from './stage-experts';

export interface Step1PromptContext {
  currentBrandData: any;
  userMessage: string;
  conversationHistory: any[];
}

// Step 1 전용 프롬프트 생성기
export function generateStep1Prompt(context: Step1PromptContext): string {
  const { currentBrandData, userMessage, conversationHistory } = context;
  
  const isUserStruggling = detectUserStruggling(userMessage);
  const conversationSummary = summarizeConversation(conversationHistory);
  const brandDataSummary = summarizeBrandData(currentBrandData);

  // Step 0에서 전달받은 브랜드 씨앗 정보 구조화
  const step0Output = currentBrandData.step0Output || {};
  const brandSeed = {
    brandType: step0Output.brandType || currentBrandData.brandType || '알 수 없음',
    triggerStory: step0Output.triggerStory || currentBrandData.triggers || '',
    painPoint: step0Output.painPoint || '',
    idealScene: step0Output.idealScene || '',
    brandSense: step0Output.brandSense || {},
    principles: step0Output.principles || { keep: [], avoid: [] },
    targetCustomer: step0Output.targetCustomer || { fit: '', notFit: '' },
    oneLineIdentity: step0Output.oneLineIdentity || ''
  };

  let prompt = `${STEP1_EXPERT.systemPrompt}

[🌱 Step 0에서 발굴된 브랜드 씨앗]
브랜드 유형: ${brandSeed.brandType}
트리거 스토리: ${brandSeed.triggerStory}
해결하고자 한 문제: ${brandSeed.painPoint}
이상적 장면: ${brandSeed.idealScene}
브랜드 감각: ${JSON.stringify(brandSeed.brandSense)}
브랜드 원칙: 
- 지킬 것: ${Array.isArray(brandSeed.principles.keep) ? brandSeed.principles.keep.join(', ') : ''}
- 피할 것: ${Array.isArray(brandSeed.principles.avoid) ? brandSeed.principles.avoid.join(', ') : ''}
타깃 고객: 
- 맞는 고객: ${brandSeed.targetCustomer.fit}
- 안 맞는 고객: ${brandSeed.targetCustomer.notFit}
한 문장 정체성: ${brandSeed.oneLineIdentity}

[Step 1 미션: 브랜드 정체성 체계 구축]
목적: 브랜드 씨앗을 바탕으로 명확한 미션, 비전, 핵심가치 정립
방법: Step 0 정보를 기반으로 한 전략적 브랜드 정체성 체계 구축

[대화 컨텍스트]
${conversationSummary}

[현재까지 수집된 브랜드 정보]
${brandDataSummary}

[사용자 현재 답변]
"${userMessage}"
`;

  // 첫 방문자인 경우 (비어있는 메시지)
  if (!userMessage.trim()) {
    prompt += `
[첫 방문 환영 메시지]
Step 0에서 발굴한 브랜드 씨앗을 바탕으로 브랜드의 정체성 체계를 구축하는 단계임을 안내하세요.

다음 요소들을 포함해서 질문하세요:
1. Step 0 결과에 대한 간단한 요약과 인정
2. 이제 구체적인 미션, 비전, 핵심가치를 정립할 것임을 설명
3. 브랜드 씨앗의 핵심 요소들을 활용하여 제안 제시
4. 사용자가 편하게 대화할 수 있도록 격려`;
  }

  // 사용자가 어려워하는 경우
  if (isUserStruggling) {
    prompt += `
[중요] 사용자가 답변을 어려워하고 있습니다!
- ${STEP1_EXPERT.helpPatterns.helpResponse}
- Step 0에서 수집된 정보를 바탕으로 구체적인 미션/비전 제안을 제공하세요
- 브랜드 씨앗의 내용을 연결하여 이해하기 쉽게 설명해주세요`;
  }

  prompt += `
[Step 1 산출물 목표]
이 단계에서는 다음을 완성해야 합니다:
- 미션 (Mission): "우리는 누구를 위해 무엇을 하는가?"
- 비전 (Vision): "우리가 그리는 미래의 모습은?"  
- 핵심가치 (Core Values): "우리가 가장 중요하게 여기는 가치 3-5개"
- 타깃 오디언스 (Target Audience): "구체적인 고객 프로필"

[응답 가이드라인]
1. Step 0 브랜드 씨앗 정보를 적극 활용하여 연결성 있는 제안 제시
2. 추상적인 질문보다는 구체적인 예시와 함께 제안
3. 브랜드 유형(${brandSeed.brandType})에 맞는 맞춤형 접근
4. 사용자의 트리거 스토리와 이상적 장면을 미션/비전과 연결
5. 발견된 브랜드 요소를 간단히 정리하며 진행
6. 따뜻하고 전문적인 브랜드 컨설턴트 톤 유지
7. 한 번에 하나의 요소씩 집중 (미션 → 비전 → 핵심가치 → 타깃 순서)

${!userMessage.trim() ? `
특히 첫 메시지에서는:
- "Step 0에서 발굴하신 '${brandSeed.oneLineIdentity}' 정체성이 정말 인상적이네요!"
- "이제 이 브랜드 씨앗을 바탕으로 구체적인 미션과 비전을 만들어보겠습니다"
- 트리거 스토리나 이상적 장면을 언급하며 자연스럽게 미션 질문으로 연결` : ''}`;

  return prompt;
}