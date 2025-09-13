import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Download, Star, Target, MessageCircle, Lightbulb, TrendingUp } from 'lucide-react';
import { BrandData, QAPair } from './BrandIdentityBuilder';

interface FinalReportProps {
  brandData: BrandData;
  qaHistory: QAPair[];
}

export function FinalReport({ brandData, qaHistory }: FinalReportProps) {
  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    const content = generateReportContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brandData.brandName || 'Brand'}-Identity-Report.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateReportContent = () => {
    return `
BRAND IDENTITY REPORT
=====================

Brand Name: ${brandData.brandName || 'Your Brand'}
Slogan: ${brandData.slogan || 'Your Brand Slogan'}

MISSION & VISION
================
Mission: ${brandData.mission || 'Your brand mission'}
Vision: ${brandData.vision || 'Your brand vision'}

CORE VALUES
===========
${brandData.values?.map(value => `• ${value}`).join('\n') || '• Value 1\n• Value 2\n• Value 3'}

TARGET AUDIENCE
===============
${brandData.targetAudience || 'Your target audience description'}

BRAND ESSENCE
=============
Core Essence: ${brandData.coreEssence || 'Your brand essence'}
Attributes: ${brandData.attributes?.join(', ') || 'Your brand attributes'}
Benefits: ${brandData.benefits?.join(', ') || 'Your brand benefits'}
Personality: ${brandData.personality?.join(', ') || 'Your brand personality'}

VALIDATION SCORES
=================
${brandData.scores ? `
Consistency: ${brandData.scores.consistency}/10
Differentiation: ${brandData.scores.differentiation}/10
Market Fit: ${brandData.scores.marketFit}/10
Memorability: ${brandData.scores.memorability}/10
Relevance: ${brandData.scores.relevance}/10

Total Score: ${brandData.totalScore}/50
` : 'Validation scores will be generated based on your responses'}

EXECUTION PRIORITIES
====================
${brandData.roadmap ? `
Immediate Actions:
${brandData.roadmap.immediate?.map(action => `• ${action}`).join('\n') || '• Define immediate actions'}

Short-term Goals:
${brandData.roadmap.shortTerm?.map(goal => `• ${goal}`).join('\n') || '• Set short-term goals'}

Long-term Vision:
${brandData.roadmap.longTerm?.map(vision => `• ${vision}`).join('\n') || '• Plan long-term vision'}
` : 'Execution roadmap to be developed'}

Generated on: ${new Date().toLocaleDateString()}
    `;
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-500';
    if (score >= 6) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{brandData.brandName || 'Your Brand'}</h2>
          <p className="text-xl text-muted-foreground mt-1">
            "{brandData.slogan || 'Your Brand Slogan'}"
          </p>
        </div>
        <Button onClick={handleDownloadPDF} className="gap-2">
          <Download className="w-4 h-4" />
          Download Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mission & Vision */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold">Mission & Vision</h3>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-primary mb-2">Mission</h4>
              <p className="text-muted-foreground">
                {brandData.mission || 'Your brand mission statement'}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Vision</h4>
              <p className="text-muted-foreground">
                {brandData.vision || 'Your brand vision statement'}
              </p>
            </div>
          </div>
        </Card>

        {/* Core Values */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold">Core Values</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {brandData.values && brandData.values.length > 0 ? (
              brandData.values.map((value, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {value}
                </Badge>
              ))
            ) : (
              <div className="space-y-2">
                <Badge variant="secondary">Innovation</Badge>
                <Badge variant="secondary">Quality</Badge>
                <Badge variant="secondary">Trust</Badge>
              </div>
            )}
          </div>
        </Card>

        {/* Target Audience */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold">Target Audience</h3>
          </div>
          <p className="text-muted-foreground">
            {brandData.targetAudience || 'Your target audience description'}
          </p>
        </Card>

        {/* Validation Scores */}
        {brandData.scores && (
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold">Brand Validation</h3>
            </div>
            <div className="space-y-3">
              {Object.entries(brandData.scores).map(([key, score]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className={`font-semibold ${getScoreColor(score)}`}>
                    {score}/10
                  </span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Score</span>
                <span className={getScoreColor((brandData.totalScore || 0) / 5)}>
                  {brandData.totalScore || 0}/50
                </span>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Brand Essence Wheel */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold">Brand Essence Wheel</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <h4 className="font-medium text-primary mb-2">Core Essence</h4>
            <p className="text-sm text-muted-foreground">
              {brandData.coreEssence || 'Your brand essence'}
            </p>
          </div>
          <div className="text-center">
            <h4 className="font-medium text-primary mb-2">Attributes</h4>
            <div className="space-y-1">
              {brandData.attributes && brandData.attributes.length > 0 ? (
                brandData.attributes.map((attr, index) => (
                  <p key={index} className="text-sm text-muted-foreground">{attr}</p>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Quality, Innovation, Trust</p>
              )}
            </div>
          </div>
          <div className="text-center">
            <h4 className="font-medium text-primary mb-2">Benefits</h4>
            <div className="space-y-1">
              {brandData.benefits && brandData.benefits.length > 0 ? (
                brandData.benefits.map((benefit, index) => (
                  <p key={index} className="text-sm text-muted-foreground">{benefit}</p>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Value, Efficiency, Peace of mind</p>
              )}
            </div>
          </div>
          <div className="text-center">
            <h4 className="font-medium text-primary mb-2">Personality</h4>
            <div className="space-y-1">
              {brandData.personality && brandData.personality.length > 0 ? (
                brandData.personality.map((trait, index) => (
                  <p key={index} className="text-sm text-muted-foreground">{trait}</p>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Professional, Friendly, Reliable</p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Execution Roadmap */}
      {brandData.roadmap && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold">Execution Roadmap</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-primary mb-2">Immediate (0-30 days)</h4>
              <ul className="space-y-1">
                {brandData.roadmap.immediate?.map((action, index) => (
                  <li key={index} className="text-sm text-muted-foreground">• {action}</li>
                )) || <li className="text-sm text-muted-foreground">• Define immediate actions</li>}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Short-term (1-6 months)</h4>
              <ul className="space-y-1">
                {brandData.roadmap.shortTerm?.map((goal, index) => (
                  <li key={index} className="text-sm text-muted-foreground">• {goal}</li>
                )) || <li className="text-sm text-muted-foreground">• Set short-term goals</li>}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Long-term (6+ months)</h4>
              <ul className="space-y-1">
                {brandData.roadmap.longTerm?.map((vision, index) => (
                  <li key={index} className="text-sm text-muted-foreground">• {vision}</li>
                )) || <li className="text-sm text-muted-foreground">• Plan long-term vision</li>}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Footer */}
      <Card className="p-4 bg-muted">
        <p className="text-center text-sm text-muted-foreground">
          Brand Identity Report generated on {new Date().toLocaleDateString()} • 
          This document represents your complete brand foundation based on the 7-step guided process.
        </p>
      </Card>
    </div>
  );
}