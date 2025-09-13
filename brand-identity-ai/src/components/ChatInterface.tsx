import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ChevronDown, ChevronUp, Send, Bot, User } from 'lucide-react';
import { QAPair, BrandData } from './BrandIdentityBuilder';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  step: number;
}

interface ChatInterfaceProps {
  currentStep: number;
  currentBrandData: Partial<BrandData>;
  qaHistory: QAPair[];
  onStepComplete: (answer: string, extractedData: Partial<BrandData>) => void;
  onStep0Progress?: (extractedData: Partial<BrandData>) => void;
}

export function ChatInterface({
  currentStep,
  currentBrandData,
  qaHistory,
  onStepComplete,
  onStep0Progress
}: ChatInterfaceProps) {
  const [answer, setAnswer] = useState('');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([]);

  // Initialize AI conversation for current step
  useEffect(() => {
    initializeStepConversation();
  }, [currentStep]);

  const initializeStepConversation = async () => {
    // Step 0의 경우 API를 호출해서 초기 질문을 받아옴
    if (currentStep === 0) {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: '',
            step: 0,
            conversationHistory: [],
            currentBrandData: currentBrandData
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setAiResponse(data.message);
        } else {
          const errorData = await response.json();
          setAiResponse(errorData.error || '서비스 초기화 중 문제가 발생했습니다.');
        }
      } catch (error) {
        setAiResponse('서비스 연결에 문제가 있습니다. 잠시 후 다시 시도해 주세요.');
      }
    } else {
      const initialMessage = getStepInitialMessage(currentStep);
      setAiResponse(initialMessage);
    }
  };

  const handleSubmit = async () => {
    if (!answer.trim()) return;

    setIsSubmitting(true);
    
    try {
      // Add user message to history
      const userMessage: ChatMessage = {
        role: 'user',
        content: answer,
        timestamp: new Date().toISOString(),
        step: currentStep
      };
      
      setConversationHistory(prev => [...prev, userMessage]);

      // Call AI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: answer,
          step: currentStep,
          conversationHistory: conversationHistory,
          currentBrandData: currentBrandData
        }),
      });

      if (!response.ok) {
        throw new Error('AI 응답 중 오류가 발생했습니다.');
      }

      const data = await response.json();
      
      // Add AI response to history
      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date().toISOString(),
        step: currentStep
      };
      
      setConversationHistory(prev => [...prev, aiMessage]);
      setAiResponse(data.message);

      // Step 0 진행상황 업데이트 또는 완료 처리
      if (currentStep === 0) {
        if (onStep0Progress && data.extractedData) {
          onStep0Progress(data.extractedData);
        }
        
        // Step 0 완료 체크 - currentQuestion이 8에 도달하면 종합 정리 요청
        if (data.extractedData?.currentQuestion >= 8) {
          // Step 0 종합 정리를 위한 추가 API 요청
          const summaryResponse = await fetch('/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: '브랜드 씨앗 종합 정리를 해주세요.',
              step: 0,
              conversationHistory: conversationHistory,
              currentBrandData: { ...currentBrandData, ...data.extractedData },
              requestSummary: true
            }),
          });

          if (summaryResponse.ok) {
            const summaryData = await summaryResponse.json();
            
            // 종합 정리 메시지를 AI 응답으로 업데이트
            const summaryMessage: ChatMessage = {
              role: 'assistant',
              content: summaryData.message,
              timestamp: new Date().toISOString(),
              step: currentStep
            };
            
            setConversationHistory(prev => [...prev, summaryMessage]);
            setAiResponse(summaryData.message);
            
            // Step 완료 처리
            onStepComplete(answer, { ...data.extractedData, currentQuestion: 8 });
          }
        }
      } else if (data.isStepComplete) {
        onStepComplete(answer, data.extractedData);
      }
      
      setAnswer('');
    } catch (error) {
      console.error('Chat error:', error);
      setAiResponse('죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepInitialMessage = (step: number): string => {
    const messages = [
      "안녕하세요! 저는 여러분의 브랜드 여정을 함께할 AI 브랜드 코치입니다. 🎯\n\n먼저 브랜드를 시작하게 된 계기에 대해 이야기해볼까요? 어떤 순간이나 경험이 '이 브랜드를 만들어야겠다'라는 생각을 갖게 했나요? 그때 느꼈던 감정이나 떠올린 장면을 자세히 들려주세요.",
      
      "훌륭한 브랜드 씨앗을 발굴하셨네요! 🌱\n\n이제 이 브랜드로 무엇을 이루고 싶은지 구체화해보겠습니다. 브랜드의 미션(이루고자 하는 목표)과 비전(그리는 미래의 모습), 그리고 가장 중요하게 여기는 가치들에 대해 이야기해주세요.",
      
      "멋진 브랜드 정체성이 잡혔네요! 💫\n\n이제 이 브랜드를 어떤 이름으로 부를지 정해볼 시간입니다. 브랜드명을 들었을 때 어떤 느낌이나 이미지를 전달하고 싶으신가요? 몇 가지 후보가 있다면 함께 검토해보겠습니다.",
      
      "브랜드명이 정해졌으니, 이제 브랜드만의 언어를 만들어보겠습니다! 🗣️\n\n고객과 소통할 때 어떤 톤으로, 어떤 메시지를 전달하고 싶으신가요? 브랜드를 한 문장으로 표현한다면 어떤 슬로건이나 캐치프레이즈가 좋을까요?",
      
      "지금까지 구축한 브랜드 요소들을 객관적으로 검증해보는 시간입니다! 🔍\n\n현재까지의 브랜드 컨셉이 일관성 있고, 차별화되며, 시장에 적합한지 종합적으로 분석해드리겠습니다. 혹시 우려되는 부분이나 강화하고 싶은 요소가 있다면 알려주세요.",
      
      "브랜드 컨셉이 탄탄하게 완성되었네요! 🚀\n\n이제 실제 비즈니스에서 이 브랜드를 어떻게 구현할지 구체적인 실행 계획을 세워보겠습니다. 웹사이트, 소셜미디어, 오프라인 매장 등 다양한 접점에서 어떻게 브랜드를 표현하고 싶으신가요?",
      
      "드디어 마지막 단계입니다! 🏆\n\n지금까지 함께 만들어온 모든 브랜드 요소들을 하나의 완성된 브랜딩 휠로 통합해보겠습니다. 브랜드의 핵심 본질과 성격, 고객에게 제공하는 핵심 가치를 최종적으로 정리해보겠습니다."
    ];
    
    return messages[step] || "함께 브랜드를 만들어가요!";
  };

  const extractDataFromAnswer = (answer: string, step: number): Partial<BrandData> => {
    // Simple keyword-based extraction (in a real app, this would use AI)
    const data: Partial<BrandData> = {};
    
    switch (step) {
      case 0:
        data.triggers = answer;
        data.sensoryKeywords = extractKeywords(answer, ['visual', 'sound', 'feel', 'emotion']);
        data.seedStatement = answer.slice(0, 100) + '...';
        break;
      case 1:
        data.mission = extractSentence(answer, ['mission', 'accomplish', 'goal']);
        data.vision = extractSentence(answer, ['vision', 'future', 'see']);
        data.values = extractList(answer, ['value', 'principle', 'believe']);
        data.targetAudience = extractSentence(answer, ['audience', 'customer', 'target']);
        break;
      case 2:
        data.brandName = extractBrandName(answer);
        data.namingStrategy = answer;
        data.alternatives = extractAlternatives(answer);
        break;
      case 3:
        data.slogan = extractSlogan(answer);
        data.voiceGuidelines = extractVoiceGuidelines(answer);
        data.keyMessages = extractList(answer, ['message', 'communicate', 'say']);
        break;
      case 4:
        data.scores = {
          consistency: Math.floor(Math.random() * 3) + 7,
          differentiation: Math.floor(Math.random() * 3) + 7,
          marketFit: Math.floor(Math.random() * 3) + 7,
          memorability: Math.floor(Math.random() * 3) + 7,
          relevance: Math.floor(Math.random() * 3) + 7
        };
        data.totalScore = Object.values(data.scores).reduce((a, b) => a + b, 0);
        data.improvements = ['Strengthen emotional connection', 'Improve differentiation messaging', 'Enhance market positioning'];
        break;
      case 5:
        data.channelStrategies = answer;
        data.roadmap = {
          immediate: extractList(answer, ['immediate', 'first', 'start']),
          shortTerm: extractList(answer, ['short', 'next', 'soon']),
          longTerm: extractList(answer, ['long', 'future', 'eventually'])
        };
        break;
      case 6:
        data.coreEssence = extractSentence(answer, ['essence', 'core', 'heart']);
        data.attributes = extractList(answer, ['attribute', 'quality', 'characteristic']);
        data.benefits = extractList(answer, ['benefit', 'advantage', 'value']);
        data.personality = extractList(answer, ['personality', 'trait', 'character']);
        break;
    }
    
    return data;
  };

  // Helper functions for data extraction
  const extractKeywords = (text: string, keywords: string[]): string => {
    const sentences = text.split('.').filter(s => s.trim());
    const relevant = sentences.find(s => keywords.some(k => s.toLowerCase().includes(k)));
    return relevant || '';
  };

  const extractSentence = (text: string, keywords: string[]): string => {
    const sentences = text.split('.').filter(s => s.trim());
    const relevant = sentences.find(s => keywords.some(k => s.toLowerCase().includes(k)));
    return relevant ? relevant.trim() : '';
  };

  const extractList = (text: string, keywords: string[]): string[] => {
    const items: string[] = [];
    const sentences = text.split(/[.!?]/).filter(s => s.trim());
    
    sentences.forEach(sentence => {
      if (keywords.some(k => sentence.toLowerCase().includes(k))) {
        const parts = sentence.split(/[,:]/).map(p => p.trim()).filter(p => p);
        items.push(...parts.slice(0, 3));
      }
    });
    
    return items.slice(0, 5);
  };

  const extractBrandName = (text: string): string => {
    const words = text.split(' ');
    const nameKeywords = ['name', 'called', 'brand'];
    
    for (let i = 0; i < words.length; i++) {
      if (nameKeywords.some(k => words[i].toLowerCase().includes(k))) {
        if (i + 1 < words.length) {
          return words[i + 1].replace(/[^a-zA-Z]/g, '');
        }
      }
    }
    
    return 'YourBrand';
  };

  const extractSlogan = (text: string): string => {
    const sentences = text.split(/[.!]/).filter(s => s.trim());
    return sentences.find(s => s.length < 50 && s.length > 10) || '';
  };

  const extractAlternatives = (text: string): string[] => {
    const alternatives: string[] = [];
    const words = text.split(' ').filter(w => w.length > 3 && /^[A-Z]/.test(w));
    return words.slice(0, 3);
  };

  const extractVoiceGuidelines = (text: string): { do: string[]; dont: string[] } => {
    return {
      do: ['Be authentic', 'Use clear language', 'Stay consistent'],
      dont: ['Avoid jargon', 'Don\'t be pushy', 'Avoid negative tone']
    };
  };

  return (
    <div className="flex flex-col h-full">
      {/* AI Response Card */}
      <Card className="p-6 mb-4 bg-accent">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <Bot className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">AI 브랜드 코치</h3>
            <div className="text-foreground leading-relaxed prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-3 leading-relaxed">{children}</p>,
                  strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
                  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                  h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-md font-semibold mb-2">{children}</h2>,
                }}
              >
                {aiResponse || '대화를 시작하는 중입니다...'}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </Card>

      {/* Conversation History */}
      {qaHistory.length > 0 && (
        <Collapsible open={isHistoryOpen} onOpenChange={setIsHistoryOpen} className="mb-4">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-3 h-auto">
              <span>Conversation History ({qaHistory.length} steps completed)</span>
              {isHistoryOpen ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="p-4 max-h-60 overflow-y-auto">
              <div className="space-y-4">
                {qaHistory.map((qa, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Bot className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{qa.question}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <User className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                      <p className="text-sm bg-muted p-2 rounded">{qa.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Input Section */}
      <div className="mt-auto">
        <Card className="p-4">
          <div className="space-y-4">
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="여기에 당신의 생각을 자유롭게 적어주세요... 브랜드 구축에 도움이 되도록 구체적이고 솔직하게 답변해주시면 좋습니다."
              className="min-h-[200px] resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                팁: Cmd/Ctrl + Enter로 전송
              </p>
              <Button 
                onClick={handleSubmit} 
                disabled={!answer.trim() || isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? 'AI 분석 중...' : '전송'}
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}