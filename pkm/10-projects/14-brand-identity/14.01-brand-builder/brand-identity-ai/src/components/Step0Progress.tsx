import { Card } from './ui/card';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { BrandData } from './BrandIdentityBuilder';

interface Step0ProgressProps {
  brandData: Partial<BrandData>;
}

const STEP0_QUESTIONS = [
  { id: 0, name: '브랜드 유형', short: '유형' },
  { id: 1, name: '시작 장면', short: '시작' },
  { id: 2, name: '불편함/이상함', short: '불편함' },
  { id: 3, name: '이상적 장면', short: '이상' },
  { id: 4, name: '감각 표현', short: '감각' },
  { id: 5, name: '지키고 싶은 태도', short: '태도' },
  { id: 6, name: '고객의 얼굴', short: '고객' },
  { id: 7, name: '한 문장 정체성', short: '정체성' }
];

export function Step0Progress({ brandData }: Step0ProgressProps) {
  const currentQuestion = brandData.currentQuestion || 0;
  
  const getStepStatus = (questionId: number) => {
    if (questionId < currentQuestion) return 'completed';
    if (questionId === currentQuestion) return 'current';
    return 'pending';
  };

  return (
    <Card className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <div className="space-y-2">
        {/* Header with progress */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-blue-900">🌱 씨앗 탐색 단계</span>
            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
              {currentQuestion}/8 완료
            </span>
          </div>
          {currentQuestion >= 8 && (
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs font-medium">완료!</span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white/50 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentQuestion / 8) * 100}%` }}
          />
        </div>

        {/* Horizontal steps */}
        <div className="flex items-center justify-between gap-1 mt-2">
          {STEP0_QUESTIONS.map((question) => {
            const status = getStepStatus(question.id);
            
            return (
              <div
                key={question.id}
                className="flex flex-col items-center flex-1"
              >
                <div className={`relative transition-all duration-300 ${
                  status === 'current' ? 'scale-110' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                    status === 'completed' 
                      ? 'bg-green-500 text-white' 
                      : status === 'current'
                      ? 'bg-blue-500 text-white ring-2 ring-blue-300 ring-offset-2'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {status === 'completed' ? '✓' : question.id + 1}
                  </div>
                  {status === 'current' && (
                    <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-25" />
                  )}
                </div>
                <span className={`text-[10px] mt-1 text-center font-medium transition-colors ${
                  status === 'completed' 
                    ? 'text-green-600' 
                    : status === 'current'
                    ? 'text-blue-700'
                    : 'text-gray-400'
                }`}>
                  {question.short}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}