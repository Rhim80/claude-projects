import { STEP0_EXPERT, detectUserStruggling, summarizeConversation, summarizeBrandData } from './stage-experts';

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
    examples: `
📌 **비즈니스 브랜드**
• 카페, 레스토랑, 베이커리
• 온라인 쇼핑몰, 플랫폼  
• 디자인 스튜디오, 에이전시
• 제조업, 유통업
• 서비스업 (컨설팅, 교육 등)

📌 **퍼스널 브랜드**
• 전문가, 강사, 코치
• 인플루언서, 크리에이터
• 프리랜서 (디자이너, 개발자 등)
• 작가, 아티스트
• 경영진, 리더`,
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
  }
};

// Step 0 전용 프롬프트 생성기
export function generateStep0Prompt(context: Step0PromptContext): string {
  const { currentQuestion, userMessage, conversationHistory, brandData, brandType } = context;
  
  const isUserStruggling = detectUserStruggling(userMessage);
  const conversationSummary = summarizeConversation(conversationHistory);
  const brandDataSummary = summarizeBrandData(brandData);
  const questionGuide = STEP0_QUESTION_GUIDES[currentQuestion as keyof typeof STEP0_QUESTION_GUIDES];
  const progressDisplay = STEP0_EXPERT.progressTemplate(currentQuestion, 7);

  // 기본 시스템 프롬프트 (진행 상황은 UI에서 표시하므로 제거)
  let prompt = `${STEP0_EXPERT.systemPrompt}

[현재 질문 단계: ${currentQuestion + 1}/8]
목적: ${questionGuide.purpose}
접근법: ${questionGuide.approach}

[대화 컨텍스트]
${conversationSummary}

[현재까지 수집된 브랜드 정보]
${brandDataSummary}

[사용자 현재 답변]
"${userMessage}"
`;

  // 사용자가 어려워하는 경우
  if (isUserStruggling) {
    prompt += `
[중요] 사용자가 답변을 어려워하고 있습니다!
- ${STEP0_EXPERT.helpPatterns.helpResponse}
- 이전 대화 내용을 바탕으로 구체적 예시나 제안을 제공하세요
- 부담을 덜어주되 목표는 달성하도록 도와주세요`;
  }

  // 단계별 특화 지침
  switch(currentQuestion) {
    case 0: // 브랜드 유형 파악
      if (!userMessage.trim()) {
        prompt += `
[첫 방문자 안내]
따뜻한 인사와 함께 다음을 포함하여 질문하세요:
${questionGuide.examples}

자연스럽고 대화하기 편한 톤으로 질문해주세요.`;
      } else {
        prompt += `
[브랜드 유형 확인 후]
- 사용자 답변을 바탕으로 브랜드 유형을 파악하고 확인
- 다음 단계(시작 장면) 질문으로 자연스럽게 전환
- 반드시 진행 상황 표시 포함`;
      }
      break;

    case 1: case 2: // 시작 장면, 불편함
      const brandTypeExamples = questionGuide.byBrandType?.[brandType as keyof typeof questionGuide.byBrandType] || '';
      prompt += `
[브랜드 유형별 맞춤 질문]
브랜드 유형: ${brandType}
${brandTypeExamples}

구체적인 경험과 감정을 끌어내세요.`;
      break;

    case 3: // 이상적 장면
      prompt += `
[비전 설정 단계]
${questionGuide.examples}

영화 한 장면처럼 구체적으로 묘사하도록 유도하세요.`;
      break;

    case 4: // 감각 표현
      prompt += `
[감각 표현 수집]
다음 템플릿을 사용하여 5개 요소를 모두 물어보세요:
${questionGuide.template}`;
      break;

    case 5: // 태도
      prompt += `
[원칙 설정]
${questionGuide.template}

DO & DON'T를 구분하여 수집하세요.`;
      break;

    case 6: // 고객
      prompt += `
[타깃 고객 설정]
${questionGuide.examples}

구체적 인물상을 그릴 수 있도록 유도하세요.`;
      break;

    case 7: // 정체성
      prompt += `
[최종 정체성 정리]
${questionGuide.template}

이제 마지막 단계입니다! 격려하며 마무리하세요.`;
      break;

    case 8: // Step 0 완료 - 브랜드 씨앗 종합 정리
      prompt += `
[🌱 브랜드 씨앗 완성 - 종합 정리]
8개의 질문을 모두 완료했습니다! 이제 브랜드 컨설턴트로서 수집된 모든 정보를 종합하여 브랜드 씨앗을 정리해야 합니다.

다음 구조로 브랜드 씨앗을 요약 정리하세요:

## 🌱 브랜드 씨앗 발굴 완료!

### 💫 핵심 트리거 (브랜드 시작 동기)
- 시작 계기: [구체적 상황과 감정]
- 해결하고자 한 문제: [불편함/이상함]

### 🎯 브랜드 비전 (이상적 장면)
- 꿈꾸는 모습: [구체적 장면 묘사]

### 🌈 브랜드 감각 정체성
- 색상/계절/음악/속도/질감 키워드 정리

### 🛡️ 브랜드 원칙
- 지킬 것: [DO 항목들]
- 피할 것: [DON'T 항목들]

### 👥 타깃 고객 프로필
- 맞는 고객: [구체적 인물상]
- 안 맞는 고객: [피해야 할 타입]

### 💎 브랜드 정체성 선언
- [한 문장 정체성 정리]

**다음 단계 안내**
"브랜드 씨앗 발굴이 완료되었습니다! 이제 이 씨앗을 바탕으로 구체적인 미션, 비전, 핵심가치를 정립하는 '브랜드 정체성 체계' 단계로 넘어가겠습니다."`;
      break;
  }

  // 마지막에 응답 가이드라인
  prompt += `

[응답 가이드라인]
1. 사용자 답변에 공감과 이해 표현
2. **브랜드 전문가 관점에서 해석과 인사이트 제공 (필수!)**
   - "이 답변에서 브랜드의 [특성]이 잘 드러나네요"
   - "이는 브랜드의 [가치]를 보여주는 중요한 단서입니다"
   - "[답변 내용]은 고객에게 [어떤 느낌]을 줄 것 같아요"
3. 발견된 브랜드 요소를 간단히 정리
4. ${isUserStruggling ? '도움과 예시 제공 후' : '자연스럽게'} 다음 질문으로 연결
5. 격려적이고 대화적인 톤 유지
6. 질문은 하나씩만! 여러 질문 금지
7. 진행 상황 표시는 UI에서 자동 처리되므로 텍스트로 출력하지 마세요

${currentQuestion === 7 ? `
⚠️ 마지막 단계 완료시 반드시 다음 안내 출력:
"브랜드 씨앗 발굴이 완료되었습니다! 이제 다음 단계로 진행하시겠습니까?"
- "네, 다음 단계로 갈게요" 
- "아직 수정하고 싶어요"
- "일단 여기서 마무리할게요"` : ''}`;

  return prompt;
}