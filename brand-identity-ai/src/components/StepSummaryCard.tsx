import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { 
  CheckCircle, 
  Edit2, 
  Save, 
  X, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { StepSummary } from '../types/brand';

interface StepSummaryCardProps {
  stepSummary: StepSummary;
  onEdit: (editedOutput: any) => void;
  onContinue: () => void;
  isLastStep?: boolean;
}

export function StepSummaryCard({ 
  stepSummary, 
  onEdit, 
  onContinue, 
  isLastStep = false 
}: StepSummaryCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedOutput, setEditedOutput] = useState(stepSummary.output);

  const handleSave = () => {
    onEdit(editedOutput);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedOutput(stepSummary.output);
    setIsEditing(false);
  };

  const renderStep0Output = () => (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium text-sm text-muted-foreground mb-2">브랜드 유형</h4>
        {isEditing ? (
          <Input 
            value={editedOutput.brandType || ''} 
            onChange={(e) => setEditedOutput({...editedOutput, brandType: e.target.value})}
            className="text-sm"
          />
        ) : (
          <p className="text-sm">{stepSummary.output.brandType}</p>
        )}
      </div>
      
      <div>
        <h4 className="font-medium text-sm text-muted-foreground mb-2">브랜드 트리거 스토리</h4>
        {isEditing ? (
          <Textarea 
            value={editedOutput.triggerStory || ''} 
            onChange={(e) => setEditedOutput({...editedOutput, triggerStory: e.target.value})}
            className="text-sm min-h-[60px]"
          />
        ) : (
          <p className="text-sm line-clamp-3">{stepSummary.output.triggerStory}</p>
        )}
      </div>

      <div>
        <h4 className="font-medium text-sm text-muted-foreground mb-2">브랜드 감각</h4>
        <div className="flex flex-wrap gap-2">
          {stepSummary.output.brandSense && Object.entries(stepSummary.output.brandSense).map(([key, value]) => (
            <Badge key={key} variant="secondary" className="text-xs">
              {key}: {value}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium text-sm text-muted-foreground mb-2">한 문장 정체성</h4>
        {isEditing ? (
          <Textarea 
            value={editedOutput.oneLineIdentity || ''} 
            onChange={(e) => setEditedOutput({...editedOutput, oneLineIdentity: e.target.value})}
            className="text-sm min-h-[40px]"
          />
        ) : (
          <p className="text-sm font-medium text-primary">{stepSummary.output.oneLineIdentity}</p>
        )}
      </div>
    </div>
  );

  const renderStep1Output = () => (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium text-sm text-muted-foreground mb-2">미션</h4>
        {isEditing ? (
          <Textarea 
            value={editedOutput.mission || ''} 
            onChange={(e) => setEditedOutput({...editedOutput, mission: e.target.value})}
            className="text-sm min-h-[60px]"
          />
        ) : (
          <p className="text-sm font-medium">{stepSummary.output.mission}</p>
        )}
      </div>
      
      <div>
        <h4 className="font-medium text-sm text-muted-foreground mb-2">비전</h4>
        {isEditing ? (
          <Textarea 
            value={editedOutput.vision || ''} 
            onChange={(e) => setEditedOutput({...editedOutput, vision: e.target.value})}
            className="text-sm min-h-[60px]"
          />
        ) : (
          <p className="text-sm font-medium">{stepSummary.output.vision}</p>
        )}
      </div>

      <div>
        <h4 className="font-medium text-sm text-muted-foreground mb-2">핵심 가치</h4>
        <div className="flex flex-wrap gap-1">
          {stepSummary.output.coreValues?.map((value: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              {value}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep2Output = () => (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium text-sm text-muted-foreground mb-2">최종 브랜드명</h4>
        <p className="text-lg font-bold text-primary">{stepSummary.output.finalBrandName}</p>
      </div>
      
      <div>
        <h4 className="font-medium text-sm text-muted-foreground mb-2">네이밍 전략</h4>
        <p className="text-sm">{stepSummary.output.namingStrategy}</p>
      </div>

      <div>
        <h4 className="font-medium text-sm text-muted-foreground mb-2">대안</h4>
        <div className="flex flex-wrap gap-1">
          {stepSummary.output.alternatives?.map((alt: string, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {alt}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGenericOutput = () => (
    <div className="space-y-2">
      {Object.entries(stepSummary.output).map(([key, value]) => (
        <div key={key}>
          <h4 className="font-medium text-sm text-muted-foreground capitalize mb-1">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </h4>
          <p className="text-sm">
            {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
          </p>
        </div>
      ))}
    </div>
  );

  const renderStepOutput = () => {
    switch (stepSummary.step) {
      case 0:
        return renderStep0Output();
      case 1:
        return renderStep1Output();
      case 2:
        return renderStep2Output();
      default:
        return renderGenericOutput();
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-green-900">
              {stepSummary.title} 완료!
            </h3>
            <p className="text-sm text-green-700">{stepSummary.mission}</p>
          </div>
        </div>
        
        {stepSummary.isEditable && (
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleCancel}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
                <Button variant="default" size="sm" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-1" />
                  저장
                </Button>
              </>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsEditing(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Edit2 className="w-4 h-4 mr-1" />
                수정
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-6">
        {renderStepOutput()}
      </div>

      {/* Actions */}
      <div className="flex justify-end pt-4 border-t border-green-200">
        <Button 
          onClick={onContinue}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {isLastStep ? '최종 결과 확인' : '이 내용으로 다음 단계 진행'}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
      
      <p className="text-xs text-green-600 mt-2 text-center">
        {isLastStep 
          ? '모든 단계가 완료되었습니다!' 
          : '다음 단계에서 이 정보를 활용하여 브랜드를 발전시켜나갑니다'
        }
      </p>
    </Card>
  );
}