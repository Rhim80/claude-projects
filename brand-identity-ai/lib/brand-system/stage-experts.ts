// 브랜드 시스템 단계별 전문가 정의
export interface StageExpert {
  name: string;
  role: string;
  systemPrompt: string;
  stageGoals: string[];
  instructions: string[];
  progressTemplate: (current: number, total: number) => string;
  completionCriteria: string[];
  helpPatterns: {
    keywords: string[];
    helpResponse: string;
  };
}

export interface ConversationContext {
  previousStages: Record<number, any>;
  currentStageHistory: any[];
  userStruggling: boolean;
  brandData: any;
}

export interface StageResponse {
  message: string;
  isStepComplete: boolean;
  nextStep: number;
  extractedData: any;
  needsHelp?: boolean;
}

// Step 0: 브랜드 씨앗 발굴 전문가
export const STEP0_EXPERT: StageExpert = {
  name: "브랜드 씨앗 발굴 전문가",
  role: "브랜드의 근본적인 동기와 감정을 끌어내는 인터뷰어",
  
  systemPrompt: `당신은 15년 경력의 브랜드 전략 컨설턴트입니다.

🎯 **핵심 역할**: 브랜딩 초보자의 답변을 브랜드 관점에서 해석하고 씨앗을 체계적으로 발굴

💡 **대화 철학**:
- 매 답변마다 브랜드 전문가 관점에서 해석하고 핵심 인사이트 제공
- "이 답변에서 발견되는 브랜드 가치는..." 형태로 전문적 피드백 우선
- 답변을 정리한 후 자연스럽게 다음 질문으로 연결
- 격려적이고 친근한 톤으로 부담 없는 분위기 조성
- 사용자가 모르던 브랜드 가치를 발견하게 도움

📋 **응답 구조**:
1. 사용자 답변에 대한 공감과 이해 표현
2. 브랜드 전문가 관점에서 해석과 인사이트 (핵심!)
3. 발견된 브랜드 요소나 가치 요약
4. 다음 질문으로 자연스럽게 연결

🚫 **절대 금지**:
- 단순 질문만 반복하기 (반드시 전문가적 해석 포함)
- 한 번에 여러 질문
- 추상적이고 모호한 조언
- 사용자 답변을 그대로 받아들이기만 하기`,

  stageGoals: [
    "브랜드 유형 파악 (비즈니스 vs 퍼스널)",
    "시작 장면: 브랜드를 해볼까? 생각한 구체적 순간",
    "불편함/이상함: 업계에서 '이건 아닌데' 싶었던 경험",
    "이상적 장면: 브랜드가 잘 되었을 때 보고 싶은 모습",
    "감각 표현: 브랜드를 오감으로 표현",
    "지키고 싶은 태도: 원칙과 피하고 싶은 것",
    "고객의 얼굴: 좋아할 사람 vs 안 맞을 사람",
    "한 문장 정체성: 브랜드를 한 문장으로 정리"
  ],

  instructions: [
    "첫 방문시 브랜드 유형부터 파악하세요",
    "각 질문마다 브랜드 유형별 맞춤 예시를 제공하세요",
    "사용자 답변이 부족하면 구체적 재질문으로 유도하세요",
    "감각 표현 단계에서는 색상/계절/음악/속도/질감 모두 물어보세요",
    "태도 단계에서는 '지킬것'과 '안할것'을 구분해서 수집하세요",
    "7단계 완료시 반드시 완료 안내와 다음 단계 선택지를 제시하세요"
  ],

  progressTemplate: (current: number, total: number) => {
    const steps = [
      "브랜드 유형", "시작 장면", "불편함/이상함", "이상적 장면", 
      "감각 표현", "지키고 싶은 태도", "고객의 얼굴", "한 문장 정체성"
    ];
    
    const completed = "✅";
    const current_icon = "🔄";
    const pending = "⏸️";
    
    let progress = `🎯 브랜드 씨앗 탐색 (${current}/${total} 완료)\n`;
    
    steps.forEach((step, index) => {
      if (index < current) {
        progress += `${completed} ${index + 1}. ${step} `;
      } else if (index === current) {
        progress += `${current_icon} ${index + 1}. ${step} - 현재 진행중\n`;
      } else {
        progress += `${pending} ${index + 1}. ${step} `;
      }
    });
    
    return progress;
  },

  completionCriteria: [
    "브랜드 유형이 명확히 파악됨",
    "각 단계별 답변이 3문장 이상 구체적",
    "감각 표현의 모든 요소 수집됨",
    "지킬것/안할것이 구분되어 수집됨",
    "타깃 고객이 구체적으로 묘사됨",
    "한 문장 정체성이 명확함"
  ],

  helpPatterns: {
    keywords: ["모르겠", "어려워", "잘 모르", "글쎄", "패스", "다음", "그냥", "아무거나", "네가 정해", "추천해", "예시", "도와"],
    helpResponse: "이해해요! 조금 어려울 수 있어요. 지금까지 나눈 대화를 바탕으로 제가 도움을 드릴게요."
  }
};

// 사용자 어려움 감지 함수
export function detectUserStruggling(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return STEP0_EXPERT.helpPatterns.keywords.some(keyword => 
    lowerMessage.includes(keyword)
  );
}

// 대화 컨텍스트 요약 함수
export function summarizeConversation(history: any[]): string {
  if (history.length === 0) return "새로운 대화 시작";
  
  const userMessages = history
    .filter(msg => msg.role === 'user')
    .slice(-3) // 최근 3개만
    .map(msg => `- ${msg.content.substring(0, 50)}...`)
    .join('\n');
    
  return `최근 대화:\n${userMessages}`;
}

// 브랜드 데이터 요약 함수
export function summarizeBrandData(brandData: any): string {
  const summary = [];
  
  if (brandData.brandType) {
    summary.push(`브랜드 유형: ${brandData.brandType}`);
  }
  
  if (brandData.step0Data) {
    const data = brandData.step0Data;
    if (data.startingMoment) summary.push(`시작 계기: ${data.startingMoment.substring(0, 30)}...`);
    if (data.painPoint) summary.push(`불편함: ${data.painPoint.substring(0, 30)}...`);
    if (data.idealScene) summary.push(`이상적 장면: ${data.idealScene.substring(0, 30)}...`);
  }
  
  return summary.length > 0 ? summary.join('\n') : "수집된 브랜드 정보 없음";
}