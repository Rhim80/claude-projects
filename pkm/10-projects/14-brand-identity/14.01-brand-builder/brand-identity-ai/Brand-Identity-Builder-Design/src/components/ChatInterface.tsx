import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ChevronDown, ChevronUp, Send, Bot, User } from 'lucide-react';
import { QAPair, BrandData } from './BrandIdentityBuilder';

interface ChatInterfaceProps {
  currentStep: number;
  currentQuestion: string;
  qaHistory: QAPair[];
  onStepComplete: (answer: string, extractedData: Partial<BrandData>) => void;
}

export function ChatInterface({
  currentStep,
  currentQuestion,
  qaHistory,
  onStepComplete
}: ChatInterfaceProps) {
  const [answer, setAnswer] = useState('');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!answer.trim()) return;

    setIsSubmitting(true);
    
    // Simulate AI processing and data extraction
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const extractedData = extractDataFromAnswer(answer, currentStep);
    onStepComplete(answer, extractedData);
    
    setAnswer('');
    setIsSubmitting(false);
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
      {/* Current Question Card */}
      <Card className="p-6 mb-4 bg-accent">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <Bot className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">AI Brand Coach</h3>
            <p className="text-foreground leading-relaxed">{currentQuestion}</p>
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
              placeholder="Share your thoughts here... Take your time to provide detailed answers that will help build your brand identity."
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
                Tip: Press Cmd/Ctrl + Enter to submit
              </p>
              <Button 
                onClick={handleSubmit} 
                disabled={!answer.trim() || isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? 'Processing...' : 'Send'}
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}