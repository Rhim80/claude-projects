import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { generateStep0Prompt } from '../../../lib/brand-system/step0-prompts';
import { generateStep1Prompt } from '../../../lib/brand-system/step1-prompts';
import { detectUserStruggling } from '../../../lib/brand-system/stage-experts';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  step: number;
}

interface BrandData {
  // Step 0
  brandType?: string;
  currentQuestion?: number; // 0단계 내 질문 진행 상황 추적
  triggers?: string;
  sensoryKeywords?: string;
  seedStatement?: string;
  step0Data?: {
    startingMoment?: string;
    painPoint?: string;
    idealScene?: string;
    brandSense?: {
      color?: string;
      season?: string;
      music?: string;
      speed?: string;
      texture?: string;
      other?: string;
    };
    principles?: {
      keep?: string[];
      avoid?: string[];
    };
    targetCustomer?: {
      fit?: string;
      notFit?: string;
    };
    identity?: string;
  };
  
  // Step 1
  mission?: string;
  vision?: string;
  coreValues?: string[];
  targetAudience?: string;
  
  // Step 2
  brandName?: string;
  namingStrategy?: string;
  alternatives?: string[];
  
  // Step 3
  slogan?: string;
  voiceGuidelines?: { do: string[]; dont: string[] };
  keyMessages?: string[];
  
  // Step 4
  validationScores?: {
    consistency: number;
    differentiation: number;
    marketFit: number;
    memorability: number;
    relevance: number;
  };
  improvements?: string[];
  
  // Step 5
  channelStrategies?: string;
  implementationRoadmap?: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  
  // Step 6
  coreEssence?: string;
  brandAttributes?: string[];
  customerBenefits?: string[];
  brandPersonality?: string[];
}

const STEP_PROMPTS = {
  0: `당신은 15년 경력의 브랜드 전문가이자 친근한 브랜드 인터뷰어입니다. 
목표: 브랜딩 초보자도 쉽게 답할 수 있게 브랜드의 씨앗을 발굴하는 것입니다.

핵심 원칙:
1. 질문을 하나씩만 제시
2. 답변 부족시 재질문으로 구체화  
3. 매 답변 후 진행 상황 표시
4. 유형별 맞춤 질문 활용
5. 좋은 답변엔 적극 피드백, 막힐때 구체적 예시 제시

대화 톤: 격려적이고 친근하게
금지사항: 한번에 여러 질문, 추상적 조언, 진행상황 생략

브랜드 유형별 맞춤 접근:
- 카페/식당: 고객 경험, 공간감, 음식과 서비스 철학
- 전문가/강사: 전문성, 교육 철학, 차별화된 접근법  
- 디자이너: 작업 스타일, 클라이언트 관계, 창작 철학
- 인플루언서: 콘텐츠 방향성, 팔로워 관계, 개인 가치관

7단계 질문 흐름:
1. 시작 장면 (브랜드 아이디어가 떠오른 구체적 순간)
2. 불편함/이상함 (업계에서 아쉬웠던 점)
3. 이상적 장면 (성공했을 때 보고 싶은 모습)
4. 감각 표현 (색상, 계절, 음악, 속도, 질감)
5. 지키고 싶은 태도 (원칙과 금기사항)
6. 고객의 얼굴 (타겟과 비타겟)
7. 한 문장 정체성

반드시 첫 번째로 브랜드 유형을 파악하는 질문부터 시작하세요.`,

  1: `당신은 전략적 브랜드 컨설턴트입니다. 사용자의 브랜드 정체성 체계를 구축하는 것이 목표입니다.

역할:
- 명확한 미션과 비전 수립
- 핵심 가치 체계 정립
- 타겟 오디언스 정의

대화 스타일:
- 체계적이고 논리적인 접근
- 구체적인 질문으로 명확화
- 비즈니스 관점과 철학적 관점 균형

이전 단계에서 발굴된 브랜드 씨앗을 바탕으로, 사용자가 이 브랜드로 무엇을 이루고 싶은지(미션), 
어떤 미래를 그리는지(비전), 어떤 가치를 중시하는지를 체계적으로 정립해주세요.`,

  2: `당신은 네이밍 전략 전문가입니다. 사용자의 브랜드명을 창조하는 것이 목표입니다.

역할:
- 창의적이고 전략적인 브랜드명 개발
- 네이밍의 의미와 전략 설명
- 대안 옵션들 제시

대화 스타일:
- 창의적이고 분석적
- 언어적 감각과 비즈니스 감각 균형
- 다양한 관점에서 접근

브랜드의 정체성과 가치를 반영하면서도 기억하기 쉽고 의미 있는 이름을 함께 만들어가세요. 
다양한 네이밍 전략(기능적, 철학적, 은유적 등)을 활용하여 최적의 이름을 찾아주세요.`,

  3: `당신은 브랜드 언어 디자이너입니다. 사용자의 브랜드 언어 시스템을 구축하는 것이 목표입니다.

역할:
- 매력적인 슬로건 개발
- 브랜드 보이스 가이드라인 수립
- 핵심 메시지 체계 구축

대화 스타일:
- 언어적이고 감성적
- 창의적 표현과 전략적 사고 결합
- 브랜드 성격을 언어로 구현

브랜드의 개성과 가치를 언어로 표현하는 방법을 함께 만들어가세요. 
고객과 소통할 때 어떤 톤과 메시지를 사용할지, 기억에 남는 슬로건은 무엇인지 개발해주세요.`,

  4: `당신은 브랜드 분석가입니다. 구축된 브랜드 컨셉을 객관적으로 검증하는 것이 목표입니다.

역할:
- 브랜드 컨셉의 일관성 분석
- 시장에서의 차별성 평가
- 개선 방안 제시

대화 스타일:
- 객관적이고 비판적
- 건설적인 피드백 제공
- 데이터와 논리에 기반한 분석

지금까지 구축한 브랜드 요소들을 종합적으로 분석하여 강점과 약점을 파악하고, 
시장에서 성공할 수 있는 브랜드가 되도록 개선 방향을 제시해주세요.`,

  5: `당신은 실행 전략 플래너입니다. 브랜드를 실제 비즈니스에 적용하는 전략을 수립하는 것이 목표입니다.

역할:
- 다양한 채널별 브랜드 적용 전략
- 단계별 실행 로드맵 수립
- 구체적이고 실행 가능한 계획 제시

대화 스타일:
- 실무적이고 구체적
- 단계별 접근 방식
- 비즈니스 현실성 고려

완성된 브랜드 아이덴티티를 웹사이트, 소셜미디어, 오프라인 매장 등 다양한 접점에서 
어떻게 일관되게 구현할 수 있을지 구체적인 실행 계획을 세워주세요.`,

  6: `당신은 브랜드 통합 전문가입니다. 모든 브랜드 요소를 하나의 완성된 시스템으로 통합하는 것이 목표입니다.

역할:
- 브랜드 본질(Core Essence) 정의
- 브랜드 속성과 혜택 정리
- 브랜드 성격 체계화

대화 스타일:
- 종합적이고 완성적
- 모든 요소의 연결성 강조
- 브랜드의 전체적 조화 추구

7단계에 걸쳐 함께 만들어온 브랜드의 모든 요소들을 하나로 통합하여, 
완성된 브랜딩 휠과 최종 브랜드 아이덴티티 시스템을 완성해주세요.`
};

function getStepPrompt(step: number): string {
  return STEP_PROMPTS[step as keyof typeof STEP_PROMPTS] || '';
}


// 이전 단계 산출물을 포맷팅하는 함수
function formatPreviousOutputs(brandData: Partial<BrandData>, currentStep: number): string {
  if (currentStep === 0) return '';
  
  let formattedOutputs = '\n\n📋 **이전 단계에서 완성된 산출물:**\n\n';
  
  // Step 0 산출물 포맷팅
  if (currentStep >= 1 && brandData.step0Data) {
    formattedOutputs += `### 🌱 Step 0: 브랜드 씨앗 발굴
**브랜드 트리거 스토리:** ${brandData.step0Data.startingMoment || ''}
**해결하고자 한 문제:** ${brandData.step0Data.painPoint || ''}
**이상적 장면:** ${brandData.step0Data.idealScene || ''}
**브랜드 감각:** ${JSON.stringify(brandData.step0Data.brandSense || {})}
**브랜드 원칙:** 
- 지킬 것: ${(brandData.step0Data.principles?.keep || []).join(', ')}
- 피할 것: ${(brandData.step0Data.principles?.avoid || []).join(', ')}
**타겟 고객:** ${brandData.step0Data.targetCustomer?.fit || ''}
**한 문장 정체성:** ${brandData.step0Data.identity || ''}

`;
  }
  
  // Step 1 산출물 포맷팅  
  if (currentStep >= 2 && brandData.mission) {
    formattedOutputs += `### 🎯 Step 1: 브랜드 정체성 체계
**미션:** ${brandData.mission}
**비전:** ${brandData.vision || ''}
**핵심 가치:** ${(brandData.values || []).join(', ')}
**타겟 오디언스:** ${brandData.targetAudience || ''}

`;
  }
  
  // Step 2 산출물 포맷팅
  if (currentStep >= 3 && brandData.brandName) {
    formattedOutputs += `### 🏷️ Step 2: 브랜드 네이밍
**최종 브랜드명:** ${brandData.brandName}
**네이밍 전략:** ${brandData.namingStrategy || ''}
**대안:** ${(brandData.alternatives || []).join(', ')}

`;
  }
  
  // 더 많은 단계들도 추가 가능...
  
  return formattedOutputs;
}

function buildContextualPrompt(
  userMessage: string,
  conversationHistory: ChatMessage[],
  currentBrandData: Partial<BrandData>,
  step: number
): string {
  let context = '';
  
  // Add previous step outputs first
  context += formatPreviousOutputs(currentBrandData, step);
  
  // Add previous brand data context (현재 단계 진행 상황)
  if (Object.keys(currentBrandData).length > 0) {
    context += '\n\n[현재 단계 진행 상황]\n';
    // 현재 단계 관련 데이터만 표시
    const currentStepData: any = {};
    if (step === 0 && currentBrandData.step0Data) {
      currentStepData.step0Progress = currentBrandData.step0Data;
      currentStepData.currentQuestion = currentBrandData.currentQuestion;
    }
    context += JSON.stringify(currentStepData, null, 2);
  }
  
  // Add conversation history context (last 3 messages only for context window management)
  if (conversationHistory.length > 0) {
    context += '\n\n[최근 대화 내역]\n';
    const recentHistory = conversationHistory.slice(-3);
    recentHistory.forEach(msg => {
      context += `${msg.role}: ${msg.content}\n`;
    });
  }
  
  return `${context}\n\n[사용자 메시지]\n${userMessage}`;
}

export async function POST(req: NextRequest) {
  try {
    const { 
      message, 
      step, 
      conversationHistory = [], 
      currentBrandData = {},
      requestSummary = false
    } = await req.json();

    // Step 0에서 단계별 질문 처리 (API 키 불필요)
    if (step === 0) {
      return handleStep0Question(message, conversationHistory, currentBrandData, requestSummary);
    }

    // API 키 유효성 검증 (Step 1 이상에서만)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return NextResponse.json({
        error: '죄송합니다. AI 서비스 설정이 완료되지 않았습니다. 관리자에게 문의해 주세요.'
      }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: getStepPrompt(step)
    });

    const prompt = buildContextualPrompt(
      message, 
      conversationHistory, 
      currentBrandData, 
      step
    );

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Simple data extraction based on step
    const extractedData = extractDataFromResponse(response, step, message);

    return NextResponse.json({
      message: response,
      extractedData,
      isStepComplete: shouldCompleteStep(response, step),
      nextStep: shouldCompleteStep(response, step) ? step + 1 : step
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // 더 구체적인 에러 메시지 제공
    let errorMessage = '죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해 주세요.';
    
    if (error.message?.includes('API_KEY') || error.message?.includes('API key not valid')) {
      errorMessage = '죄송합니다. AI 서비스 설정에 문제가 있습니다. 관리자에게 문의해 주세요.';
    } else if (error.message?.includes('quota') || error.message?.includes('QUOTA_EXCEEDED')) {
      errorMessage = '죄송합니다. 현재 서비스 사용량이 많습니다. 잠시 후 다시 시도해 주세요.';
    } else if (error.message?.includes('PERMISSION_DENIED')) {
      errorMessage = '죄송합니다. 서비스 접근 권한에 문제가 있습니다. 관리자에게 문의해 주세요.';
    } else if (error.message?.includes('timeout') || error.message?.includes('TIMEOUT')) {
      errorMessage = '죄송합니다. 응답 시간이 초과되었습니다. 다시 시도해 주세요.';
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// Step 0 질문 처리 함수 (Expert System 기반)
async function handleStep0Question(userMessage: string, conversationHistory: ChatMessage[], currentBrandData: Partial<BrandData>, requestSummary: boolean = false) {
  let currentQuestion = currentBrandData.currentQuestion || 0;
  const brandType = currentBrandData.brandType || '';
  
  // requestSummary가 true이면 종합 정리 단계(8번)로 설정
  if (requestSummary) {
    currentQuestion = 8;
  }
  
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    // Step별 Expert System을 사용한 프롬프트 생성
    let expertPrompt: string;
    
    // handleStep0Question 함수는 Step 0 전용이므로 항상 Step 0 프롬프트 사용
    expertPrompt = generateStep0Prompt({
      currentQuestion,
      userMessage,
      conversationHistory,
      brandData: currentBrandData,
      brandType
    });
    
    const result = await model.generateContent(expertPrompt);
    const response = result.response;
    const message = response.text();
    
    // requestSummary인 경우 브랜드 씨앗 종합 정리 반환
    if (requestSummary) {
      return NextResponse.json({
        message: message,
        extractedData: { currentQuestion: 8 },
        isStepComplete: true,
        nextStep: 1
      });
    }
    
    // 첫 방문시 처리
    if (currentQuestion === 0 && !userMessage.trim()) {
      return NextResponse.json({
        message: message,
        extractedData: { currentQuestion: 0 },
        isStepComplete: false,
        nextStep: 0
      });
    }
    
    // 브랜드 유형 파악 후 처리
    if (currentQuestion === 0 && userMessage.trim()) {
      const extractedBrandType = extractBrandType(userMessage);
      
      return NextResponse.json({
        message: message,
        extractedData: { 
          brandType: extractedBrandType,
          currentQuestion: 1,
          step0Data: {}
        },
        isStepComplete: false,
        nextStep: 0
      });
    }
    
    // 2-7번째 질문들 처리
    if (currentQuestion >= 1 && currentQuestion <= 7) {
      const updatedData = updateStep0Data(currentQuestion, userMessage, currentBrandData);
      const nextQuestionNum = currentQuestion + 1;
      
      // 7단계 완료 시
      if (currentQuestion === 7) {
        return NextResponse.json({
          message: message,
          extractedData: {
            ...updatedData,
            currentQuestion: 8
          },
          isStepComplete: true,
          nextStep: 1
        });
      }
      
      // 다음 질문으로 진행
      return NextResponse.json({
        message: message,
        extractedData: {
          ...updatedData,
          currentQuestion: nextQuestionNum
        },
        isStepComplete: false,
        nextStep: 0
      });
    }
    
    // Step 1 처리 로직
    if (step === 1) {
      // Step 1에서는 미션, 비전, 핵심가치, 타깃을 순차적으로 수집
      const extractedData = extractStep1Data(userMessage, currentBrandData);
      
      // Step 1 완료 체크: 모든 필수 요소가 있으면 완료
      const hasAllRequiredData = extractedData.mission && 
                                extractedData.vision && 
                                extractedData.coreValues && 
                                extractedData.targetAudience;
      
      return NextResponse.json({
        message: message,
        extractedData: {
          ...currentBrandData,
          ...extractedData,
          step1Output: extractedData
        },
        isStepComplete: hasAllRequiredData,
        nextStep: hasAllRequiredData ? 2 : 1
      });
    }
    
    // Step 2-6 기본 처리
    return NextResponse.json({
      message: message,
      extractedData: currentBrandData,
      isStepComplete: false,
      nextStep: step
    });
    
  } catch (error) {
    console.error('Gemini API Error in Step 0:', error);
    return NextResponse.json({
      message: "죄송해요! 잠깐 문제가 생겼네요. 다시 한번 말씀해 주시겠어요? 😊",
      extractedData: currentBrandData,
      isStepComplete: false,
      nextStep: 0
    });
  }
}

// 브랜드 유형 추출 함수 (간소화 - expert system에서 더 정교한 처리 진행)

// 브랜드 유형 추출 함수
function extractBrandType(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  if (message.includes('카페') || message.includes('레스토랑') || message.includes('베이커리')) {
    return '카페/레스토랑';
  }
  if (message.includes('온라인') || message.includes('쇼핑몰') || message.includes('플랫폼') || message.includes('커머스')) {
    return '온라인 비즈니스';
  }
  if (message.includes('디자인') || message.includes('에이전시') || message.includes('스튜디오')) {
    return '디자인 서비스';
  }
  if (message.includes('전문가') || message.includes('강사') || message.includes('코치') || message.includes('컨설') || message.includes('교육')) {
    return '전문가/교육';
  }
  if (message.includes('인플루언서') || message.includes('크리에이터') || message.includes('유튜브') || message.includes('블로그')) {
    return '인플루언서/크리에이터';
  }
  if (message.includes('프리랜서') || message.includes('개발') || message.includes('개발자')) {
    return '프리랜서';
  }
  if (message.includes('작가') || message.includes('아티스트') || message.includes('예술')) {
    return '작가/아티스트';
  }
  if (message.includes('제조') || message.includes('유통') || message.includes('제품')) {
    return '제조/유통업';
  }
  
  // 비즈니스 vs 퍼스널 구분
  if (message.includes('퍼스널') || message.includes('개인') || message.includes('personal')) {
    return '퍼스널 브랜드';
  }
  if (message.includes('비즈니스') || message.includes('사업') || message.includes('회사')) {
    return '비즈니스 브랜드';
  }
  
  return userMessage; // 원문 그대로 반환
}

// Step 1 데이터 추출 함수
function extractStep1Data(userMessage: string, currentBrandData: Partial<BrandData>): any {
  const text = userMessage.toLowerCase();
  const extractedData: any = {};
  
  // 미션 키워드 탐지
  if (text.includes('미션') || text.includes('목표') || text.includes('이루고') || 
      text.includes('도움') || text.includes('제공') || text.includes('해결')) {
    extractedData.mission = userMessage;
  }
  
  // 비전 키워드 탐지
  if (text.includes('비전') || text.includes('미래') || text.includes('꿈') || 
      text.includes('되고 싶') || text.includes('만들고 싶') || text.includes('그리는')) {
    extractedData.vision = userMessage;
  }
  
  // 핵심가치 키워드 탐지
  if (text.includes('가치') || text.includes('중요') || text.includes('신념') || 
      text.includes('원칙') || text.includes('추구')) {
    // 쉼표나 줄바꿈으로 분리된 가치들 추출
    const values = userMessage.split(/[,\n\r]/).map(v => v.trim()).filter(v => v.length > 0);
    extractedData.coreValues = values.length > 1 ? values : [userMessage];
  }
  
  // 타깃 오디언스 키워드 탐지
  if (text.includes('고객') || text.includes('타깃') || text.includes('대상') || 
      text.includes('사람들') || text.includes('누구') || text.includes('고객층')) {
    extractedData.targetAudience = userMessage;
  }
  
  // 기존 데이터와 병합
  const result = {
    mission: extractedData.mission || currentBrandData.mission || '',
    vision: extractedData.vision || currentBrandData.vision || '',
    coreValues: extractedData.coreValues || currentBrandData.coreValues || [],
    targetAudience: extractedData.targetAudience || currentBrandData.targetAudience || ''
  };
  
  return result;
}

// Step 0 데이터 업데이트 함수
function updateStep0Data(currentQuestion: number, userMessage: string, currentBrandData: Partial<BrandData>): Partial<BrandData> {
  const step0Data = currentBrandData.step0Data || {};
  
  switch (currentQuestion) {
    case 1: // 시작 장면
      step0Data.startingMoment = userMessage;
      break;
    case 2: // 불편함/이상함
      step0Data.painPoint = userMessage;
      break;
    case 3: // 이상적 장면
      step0Data.idealScene = userMessage;
      break;
    case 4: // 감각 표현
      step0Data.brandSense = parseBrandSense(userMessage);
      break;
    case 5: // 태도/원칙
      step0Data.principles = parsePrinciples(userMessage);
      break;
    case 6: // 고객 얼굴
      step0Data.targetCustomer = parseTargetCustomer(userMessage);
      break;
    case 7: // 한 문장 정체성
      step0Data.identity = userMessage;
      break;
  }
  
  return {
    ...currentBrandData,
    step0Data
  };
}

// 브랜드 감각 파싱
function parseBrandSense(text: string): any {
  const sense: any = {};
  
  if (text.includes('색상') || text.includes('색깔')) {
    const colorMatch = text.match(/색상[:\s]*([^\n•]+)/i);
    if (colorMatch) sense.color = colorMatch[1].trim();
  }
  
  if (text.includes('계절')) {
    const seasonMatch = text.match(/계절[:\s]*([^\n•]+)/i);
    if (seasonMatch) sense.season = seasonMatch[1].trim();
  }
  
  if (text.includes('음악')) {
    const musicMatch = text.match(/음악[:\s]*([^\n•]+)/i);
    if (musicMatch) sense.music = musicMatch[1].trim();
  }
  
  if (text.includes('속도')) {
    const speedMatch = text.match(/속도[:\s]*([^\n•]+)/i);
    if (speedMatch) sense.speed = speedMatch[1].trim();
  }
  
  if (text.includes('질감')) {
    const textureMatch = text.match(/질감[:\s]*([^\n•]+)/i);
    if (textureMatch) sense.texture = textureMatch[1].trim();
  }
  
  return sense;
}

// 원칙/태도 파싱
function parsePrinciples(text: string): any {
  const principles: any = { keep: [], avoid: [] };
  
  const keepMatch = text.match(/지킬것[:\s]*([^❌]+)/i);
  const avoidMatch = text.match(/안할것[:\s]*(.+)/i);
  
  if (keepMatch) {
    principles.keep = keepMatch[1].split(/[,\n]/).map(item => item.trim()).filter(item => item.length > 0);
  }
  
  if (avoidMatch) {
    principles.avoid = avoidMatch[1].split(/[,\n]/).map(item => item.trim()).filter(item => item.length > 0);
  }
  
  return principles;
}

// 타겟 고객 파싱
function parseTargetCustomer(text: string): any {
  const customer: any = {};
  
  const fitMatch = text.match(/좋아할 사람[:\s]*([^🚫]+)/i);
  const notFitMatch = text.match(/안맞을 사람[:\s]*(.+)/i);
  
  if (fitMatch) customer.fit = fitMatch[1].trim();
  if (notFitMatch) customer.notFit = notFitMatch[1].trim();
  
  return customer;
}

function extractDataFromResponse(response: string, step: number, userMessage: string): Partial<BrandData> {
  const data: Partial<BrandData> = {};
  
  // This is a simplified extraction. In production, you might want more sophisticated NLP
  switch (step) {
    case 0:
      data.triggers = userMessage;
      data.sensoryKeywords = extractKeywords(userMessage, ['색깔', '소리', '느낌', '향기', '맛']);
      data.seedStatement = extractSeedStatement(response);
      break;
      
    case 1:
      data.mission = extractSection(userMessage, ['미션', '목표', '이루고']);
      data.vision = extractSection(userMessage, ['비전', '미래', '꿈']);
      data.coreValues = extractValues(userMessage);
      data.targetAudience = extractSection(userMessage, ['고객', '타겟', '대상']);
      break;
      
    case 2:
      data.brandName = extractBrandName(userMessage);
      data.namingStrategy = userMessage;
      data.alternatives = extractAlternatives(response);
      break;
      
    case 3:
      data.slogan = extractSlogan(userMessage);
      data.voiceGuidelines = extractVoiceGuidelines(response);
      data.keyMessages = extractMessages(userMessage);
      break;
      
    case 4:
      data.validationScores = {
        consistency: Math.floor(Math.random() * 3) + 8,
        differentiation: Math.floor(Math.random() * 3) + 7,
        marketFit: Math.floor(Math.random() * 3) + 8,
        memorability: Math.floor(Math.random() * 3) + 7,
        relevance: Math.floor(Math.random() * 3) + 8
      };
      data.improvements = extractImprovements(response);
      break;
      
    case 5:
      data.channelStrategies = userMessage;
      data.implementationRoadmap = extractRoadmap(response);
      break;
      
    case 6:
      data.coreEssence = extractEssence(response);
      data.brandAttributes = extractList(response, ['속성', '특징', '장점']);
      data.customerBenefits = extractList(response, ['혜택', '이익', '가치']);
      data.brandPersonality = extractList(response, ['성격', '개성', '인격']);
      break;
  }
  
  return data;
}

// Helper functions for data extraction
function extractKeywords(text: string, keywords: string[]): string {
  const matches = keywords.filter(k => text.includes(k));
  return matches.join(', ') || '';
}

function extractSeedStatement(text: string): string {
  const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 10);
  return sentences[0] || '';
}

function extractSection(text: string, keywords: string[]): string {
  const sentences = text.split(/[.!?]/).filter(s => s.trim());
  const relevant = sentences.find(s => keywords.some(k => s.includes(k)));
  return relevant ? relevant.trim() : '';
}

function extractValues(text: string): string[] {
  const values = text.split(/[,\n]/).filter(v => v.trim().length > 2).slice(0, 5);
  return values.map(v => v.trim());
}

function extractBrandName(text: string): string {
  const namePattern = /[가-힣A-Za-z]{2,20}/g;
  const matches = text.match(namePattern);
  return matches ? matches[0] : '';
}

function extractAlternatives(text: string): string[] {
  const alternatives = text.split(/[,\n]/).filter(a => a.trim().length > 1).slice(0, 3);
  return alternatives.map(a => a.trim());
}

function extractSlogan(text: string): string {
  const sentences = text.split(/[.!]/).filter(s => s.length < 30 && s.length > 5);
  return sentences[0] || '';
}

function extractVoiceGuidelines(text: string): { do: string[]; dont: string[] } {
  return {
    do: ['진정성 있게 소통', '명확한 언어 사용', '일관된 톤 유지'],
    dont: ['전문용어 남발 금지', '강압적 어조 금지', '부정적 표현 금지']
  };
}

function extractMessages(text: string): string[] {
  const messages = text.split(/[,\n]/).filter(m => m.trim().length > 5).slice(0, 3);
  return messages.map(m => m.trim());
}

function extractImprovements(text: string): string[] {
  const improvements = ['감정적 연결 강화', '차별화 메시지 개선', '시장 포지셔닝 최적화'];
  return improvements;
}

function extractRoadmap(text: string): { immediate: string[]; shortTerm: string[]; longTerm: string[] } {
  return {
    immediate: ['브랜드 가이드 완성', '로고 디자인 시작'],
    shortTerm: ['웹사이트 구축', '소셜미디어 런칭'],
    longTerm: ['브랜드 확장', '시장 점유율 증대']
  };
}

function extractEssence(text: string): string {
  const sentences = text.split(/[.!?]/).filter(s => s.length < 50 && s.length > 10);
  return sentences[0] || '';
}

function extractList(text: string, keywords: string[]): string[] {
  const items: string[] = [];
  const sentences = text.split(/[,\n]/).filter(s => s.trim());
  
  sentences.forEach(sentence => {
    if (keywords.some(k => sentence.includes(k))) {
      items.push(sentence.trim());
    }
  });
  
  return items.slice(0, 5);
}

function shouldCompleteStep(response: string, step: number): boolean {
  // Simple heuristic: if response contains conclusion keywords
  const conclusionKeywords = ['정리하면', '요약하면', '다음 단계', '완성되었', '마무리'];
  return conclusionKeywords.some(keyword => response.includes(keyword));
}