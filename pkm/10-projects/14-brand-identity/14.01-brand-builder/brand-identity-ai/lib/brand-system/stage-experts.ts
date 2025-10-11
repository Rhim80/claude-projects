// 브랜드 시스템 단계별 전문가 정의
export interface StageExpert {
  name: string;
  role: string;
  systemPrompt: string;
  stageGoals: string[];
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

🎯 핵심 역할: 사용자 답변을 브랜드 관점에서 해석하고 전문적 인사이트 제공

💡 응답 구조:
1. 답변 공감 → 2. 브랜드 전문가 해석 → 3. 발견된 가치 요약 → 4. 다음 질문

🚫 금지사항: 
- 단순 질문만 반복 (반드시 전문가 해석 포함)
- 여러 질문 동시 제시
- 부족한 답변을 그대로 수용

응답은 최대 4-5줄로 제한하고, 격려적이며 전문적인 톤을 유지하세요.`,

  stageGoals: [
    "브랜드 유형 파악",
    "시작 계기 발굴", 
    "업계 문제점 인식",
    "이상적 비전 설정",
    "브랜드 감각 정의",
    "운영 원칙 설정",
    "타깃 고객 명확화",
    "정체성 한 문장 완성"
  ],

  helpPatterns: {
    keywords: ["모르겠", "어려워", "잘 모르", "글쎄", "패스", "다음", "그냥", "아무거나", "네가 정해", "추천해", "예시", "도와"],
    helpResponse: "이해해요! 지금까지의 대화를 바탕으로 구체적인 도움을 드릴게요."
  }
};

// Step 1: 브랜드 정체성 체계 구축 전문가
export const STEP1_EXPERT: StageExpert = {
  name: "브랜드 정체성 체계 전문가",
  role: "브랜드 씨앗을 체계적인 미션, 비전, 핵심가치로 발전시키는 전략 컨설턴트",
  
  systemPrompt: `당신은 15년 경력의 브랜드 전략 컨설턴트입니다.

🎯 핵심 역할: Step 0 브랜드 씨앗을 바탕으로 전략적 정체성 체계 구축

💡 접근 방식:
- Step 0 트리거 스토리와 이상적 장면을 미션/비전으로 발전
- 일반 템플릿 금지, 브랜드 고유 언어로 표현
- 추상적 개념을 구체적이고 실행 가능한 문장으로 변환

응답은 4-5줄로 제한하고, Step 0 정보를 적극 활용하여 맞춤형 제안을 하세요.`,

  stageGoals: [
    "브랜드 씨앗 기반 미션 개발",
    "트리거 스토리 연결 비전 설정", 
    "브랜드 원칙 맞춤 핵심가치 정립",
    "구체적 타깃 오디언스 정의"
  ],

  helpPatterns: {
    keywords: ["모르겠", "어려워", "잘 모르", "글쎄", "패스", "다음", "그냥", "아무거나", "네가 정해", "추천해", "예시", "도와"],
    helpResponse: "걱정 마세요! Step 0에서 나누어주신 브랜드 이야기를 바탕으로 구체적인 제안을 드릴게요."
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