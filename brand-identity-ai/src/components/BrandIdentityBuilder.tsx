import { useState } from 'react';
import { ChatInterface } from './ChatInterface';
import { ProgressTracker } from './ProgressTracker';
import { FinalReport } from './FinalReport';
import { Step0Progress } from './Step0Progress';
import { Button } from './ui/button';
import { Card } from './ui/card';

export interface QAPair {
  question: string;
  answer: string;
  step: number;
}

export interface BrandData {
  // Step 0 관련
  currentQuestion?: number;
  brandType?: string;
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
  
  triggers?: string;
  sensoryKeywords?: string;
  seedStatement?: string;
  mission?: string;
  vision?: string;
  values?: string[];
  targetAudience?: string;
  brandName?: string;
  namingStrategy?: string;
  alternatives?: string[];
  slogan?: string;
  voiceGuidelines?: { do: string[]; dont: string[] };
  keyMessages?: string[];
  scores?: { consistency: number; differentiation: number; marketFit: number; memorability: number; relevance: number };
  totalScore?: number;
  improvements?: string[];
  channelStrategies?: string;
  roadmap?: { immediate: string[]; shortTerm: string[]; longTerm: string[] };
  coreEssence?: string;
  attributes?: string[];
  benefits?: string[];
  personality?: string[];
}

const STEPS = [
  { id: 0, name: '브랜드 씨앗 발굴', description: '브랜드 시작 계기와 트리거 발견' },
  { id: 1, name: '브랜드 정체성 체계', description: '미션, 비전, 핵심가치 정립' },
  { id: 2, name: '브랜드 네이밍', description: '전략적 브랜드명 개발' },
  { id: 3, name: '브랜드 언어 설계', description: '보이스, 슬로건, 메시지 구축' },
  { id: 4, name: '컨셉 검증', description: '브랜드 컨셉 검증 및 최적화' },
  { id: 5, name: '실행 설계', description: '채널별 구현 전략 수립' },
  { id: 6, name: '브랜딩 휠 완성', description: '브랜드 본질과 아이덴티티 완성' }
];

export function BrandIdentityBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [qaHistory, setQAHistory] = useState<QAPair[]>([]);
  const [brandData, setBrandData] = useState<BrandData>({});
  const [projectName, setProjectName] = useState('새 브랜드 프로젝트');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNewProject = () => {
    setCurrentStep(0);
    setQAHistory([]);
    setBrandData({});
    setProjectName('새 브랜드 프로젝트');
    setIsCompleted(false);
  };

  const handleStepComplete = (answer: string, extractedData: Partial<BrandData>) => {
    const newQA: QAPair = {
      question: getCurrentQuestion(),
      answer,
      step: currentStep
    };

    setQAHistory(prev => [...prev, newQA]);
    setBrandData(prev => ({ ...prev, ...extractedData }));

    // Step 0 완료 처리 - currentQuestion이 8이 되면 Step 1로 진행
    if (currentStep === 0 && extractedData.currentQuestion >= 8) {
      setCurrentStep(1);
    } 
    // 일반 Step 진행
    else if (currentStep > 0 && currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } 
    // 마지막 Step 완료
    else if (currentStep >= STEPS.length - 1) {
      setIsCompleted(true);
    }
  };

  // Step 0의 진행상황 업데이트를 위한 핸들러
  const handleStep0Progress = (extractedData: Partial<BrandData>) => {
    setBrandData(prev => ({ ...prev, ...extractedData }));
  };

  const getCurrentQuestion = () => {
    const questions = [
      "What triggered you to start this brand? Tell me about the moment or experience that made you realize you needed to create this brand. What emotions, visuals, or sounds come to mind when you think about this trigger?",
      "What's your mission and vision for this brand? Describe what you want to accomplish (mission) and where you see your brand in the future (vision). What are the 3-5 core values that will guide your brand's decisions?",
      "What feeling should your brand name convey? Think about the emotional response you want people to have when they hear your brand name. What personality traits should it reflect?",
      "What's your brand slogan or key message? Create a memorable phrase that captures your brand's essence. How should your brand speak to customers - what tone and style feels right?",
      "Let me evaluate your brand concept for consistency, differentiation, and market fit. Based on what you've shared, I'll provide scores and recommendations for improvement.",
      "How will you implement your brand across different touchpoints? Think about your website, social media, packaging, customer service - how will your brand show up consistently everywhere?",
      "Let's complete your branding wheel by synthesizing everything we've discussed. I'll help you define your core essence, key attributes, customer benefits, and brand personality traits."
    ];
    return questions[currentStep] || "Thank you for completing the brand identity process!";
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border p-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">브랜드 아이덴티티 빌더</h1>
              <p className="text-muted-foreground">{projectName} - 완료!</p>
            </div>
            <Button onClick={handleNewProject}>새 프로젝트</Button>
          </div>
        </header>
        <main className="max-w-6xl mx-auto p-4">
          <FinalReport brandData={brandData} qaHistory={qaHistory} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">브랜드 아이덴티티 빌더</h1>
            <p className="text-muted-foreground">{projectName}</p>
          </div>
          <div className="flex items-center gap-4">
            <ProgressTracker currentStep={currentStep} totalSteps={STEPS.length} />
            <Button variant="outline" onClick={handleNewProject}>새 프로젝트</Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
        {/* Side Panel - Always show main steps tracker */}
        <div className="lg:col-span-1">
          <Card className="p-4 h-fit">
            <h3 className="font-semibold mb-4">진행 상황</h3>
            <div className="space-y-3">
              {STEPS.map((step, index) => (
                <div
                  key={step.id}
                  className={`p-3 rounded-lg border transition-colors ${
                    index < currentStep
                      ? 'bg-primary text-primary-foreground border-primary'
                      : index === currentStep
                      ? 'bg-accent border-accent-foreground/20'
                      : 'bg-muted border-border'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                      index < currentStep
                        ? 'bg-primary-foreground text-primary'
                        : index === currentStep
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted-foreground text-background'
                    }`}>
                      {index < currentStep ? '✓' : index + 1}
                    </div>
                    <span className="font-medium">{step.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Chat Interface with Step 0 Progress */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Step 0 Progress - Show at top of chat when in Step 0 */}
          {currentStep === 0 && (
            <Step0Progress brandData={brandData} />
          )}
          
          {/* Chat Interface */}
          <div className="flex-1">
            <ChatInterface
              currentStep={currentStep}
              currentBrandData={brandData}
              qaHistory={qaHistory}
              onStepComplete={handleStepComplete}
              onStep0Progress={handleStep0Progress}
            />
          </div>
        </div>
      </div>
    </div>
  );
}