// 브랜드 데이터 일관성 검증 시스템
import { BrandData, QAPair, StepSummary } from '../../src/types/brand';

// 일관성 문제 타입
export type ConsistencyIssueType =
  | 'contradiction'         // 모순
  | 'inconsistency'        // 불일치
  | 'gap'                  // 누락
  | 'redundancy'           // 중복
  | 'misalignment'         // 불일치
  | 'temporal_conflict'    // 시간적 모순
  | 'value_conflict'       // 가치 충돌
  | 'tone_mismatch';       // 톤 불일치

// 심각도 수준
export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

// 일관성 문제 정보
export interface ConsistencyIssue {
  id: string;
  type: ConsistencyIssueType;
  severity: SeverityLevel;
  description: string;
  affectedFields: string[];
  conflictingValues: any[];
  suggestedResolution: string;
  autoFixable: boolean;
  step1?: number;
  step2?: number;
  context?: string;
}

// 검증 규칙
export interface ValidationRule {
  id: string;
  name: string;
  type: ConsistencyIssueType;
  fields: string[];
  validator: (brandData: BrandData, qaHistory: QAPair[]) => ConsistencyIssue | null;
  priority: number;
}

// 검증 결과
export interface ValidationResult {
  isValid: boolean;
  overallScore: number; // 0-1
  issues: ConsistencyIssue[];
  recommendations: string[];
  summary: {
    totalIssues: number;
    criticalIssues: number;
    autoFixableIssues: number;
  };
}

// 자동 수정 제안
export interface AutoFixSuggestion {
  issueId: string;
  originalValue: any;
  suggestedValue: any;
  confidence: number; // 0-1
  reasoning: string;
}

export class ConsistencyValidator {
  private validationRules: ValidationRule[];
  private brandData: BrandData;
  private qaHistory: QAPair[];

  constructor(brandData: BrandData, qaHistory: QAPair[] = []) {
    this.brandData = brandData;
    this.qaHistory = qaHistory;
    this.validationRules = this.initializeValidationRules();
  }

  // 검증 규칙 초기화
  private initializeValidationRules(): ValidationRule[] {
    return [
      // 브랜드 타입과 타겟 고객 일관성
      {
        id: 'brand_type_target_consistency',
        name: '브랜드 타입과 타겟 고객 일관성',
        type: 'misalignment',
        fields: ['brandType', 'targetAudience', 'step0Data.targetCustomer'],
        validator: this.validateBrandTypeTargetConsistency.bind(this),
        priority: 8
      },

      // 미션과 비전 일관성
      {
        id: 'mission_vision_consistency',
        name: '미션과 비전 일관성',
        type: 'contradiction',
        fields: ['mission', 'vision'],
        validator: this.validateMissionVisionConsistency.bind(this),
        priority: 9
      },

      // 브랜드 가치와 원칙 일관성
      {
        id: 'values_principles_consistency',
        name: '브랜드 가치와 원칙 일관성',
        type: 'value_conflict',
        fields: ['values', 'step0Data.principles'],
        validator: this.validateValuesPrinciplesConsistency.bind(this),
        priority: 7
      },

      // 브랜드 네이밍과 아이덴티티 일관성
      {
        id: 'naming_identity_consistency',
        name: '브랜드 네이밍과 아이덴티티 일관성',
        type: 'misalignment',
        fields: ['brandName', 'step0Data.identity', 'mission'],
        validator: this.validateNamingIdentityConsistency.bind(this),
        priority: 6
      },

      // 브랜드 감각과 성격 일관성
      {
        id: 'sense_personality_consistency',
        name: '브랜드 감각과 성격 일관성',
        type: 'tone_mismatch',
        fields: ['step0Data.brandSense', 'personality', 'voiceGuidelines'],
        validator: this.validateSensePersonalityConsistency.bind(this),
        priority: 5
      },

      // 문제점과 해결책 일관성
      {
        id: 'problem_solution_consistency',
        name: '문제점과 해결책 일관성',
        type: 'contradiction',
        fields: ['step0Data.painPoint', 'mission', 'step0Data.idealScene'],
        validator: this.validateProblemSolutionConsistency.bind(this),
        priority: 8
      },

      // 데이터 완성도 검증
      {
        id: 'data_completeness',
        name: '데이터 완성도',
        type: 'gap',
        fields: ['*'],
        validator: this.validateDataCompleteness.bind(this),
        priority: 4
      },

      // 중복 정보 검증
      {
        id: 'redundancy_check',
        name: '중복 정보 검증',
        type: 'redundancy',
        fields: ['*'],
        validator: this.validateRedundancy.bind(this),
        priority: 3
      }
    ];
  }

  // 전체 검증 실행
  validate(): ValidationResult {
    const issues: ConsistencyIssue[] = [];

    // 모든 규칙 실행
    for (const rule of this.validationRules) {
      try {
        const issue = rule.validator(this.brandData, this.qaHistory);
        if (issue) {
          issues.push(issue);
        }
      } catch (error) {
        console.error(`Validation rule ${rule.id} failed:`, error);
      }
    }

    // 심각도순 정렬
    issues.sort((a, b) => {
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    });

    const overallScore = this.calculateOverallScore(issues);
    const recommendations = this.generateRecommendations(issues);

    return {
      isValid: issues.filter(i => i.severity === 'critical').length === 0,
      overallScore,
      issues,
      recommendations,
      summary: {
        totalIssues: issues.length,
        criticalIssues: issues.filter(i => i.severity === 'critical').length,
        autoFixableIssues: issues.filter(i => i.autoFixable).length
      }
    };
  }

  // 브랜드 타입과 타겟 고객 일관성 검증
  private validateBrandTypeTargetConsistency(brandData: BrandData): ConsistencyIssue | null {
    const brandType = brandData.brandType;
    const targetCustomer = brandData.step0Data?.targetCustomer;
    const targetAudience = brandData.targetAudience;

    if (!brandType || (!targetCustomer && !targetAudience)) {
      return null;
    }

    // 개인 브랜드인데 B2B 타겟을 설정한 경우
    if (brandType.includes('개인') && targetAudience?.includes('기업')) {
      return {
        id: 'brand_type_target_mismatch',
        type: 'misalignment',
        severity: 'medium',
        description: '개인 브랜드인데 기업을 타겟으로 설정했습니다.',
        affectedFields: ['brandType', 'targetAudience'],
        conflictingValues: [brandType, targetAudience],
        suggestedResolution: '개인 브랜드라면 개인 고객을 타겟으로 하거나, 비즈니스 브랜드로 변경을 고려해보세요.',
        autoFixable: false
      };
    }

    return null;
  }

  // 미션과 비전 일관성 검증
  private validateMissionVisionConsistency(brandData: BrandData): ConsistencyIssue | null {
    const mission = brandData.mission;
    const vision = brandData.vision;

    if (!mission || !vision) {
      return null;
    }

    // 미션과 비전이 너무 유사한 경우
    const similarity = this.calculateStringSimilarity(mission, vision);
    if (similarity > 0.8) {
      return {
        id: 'mission_vision_too_similar',
        type: 'redundancy',
        severity: 'medium',
        description: '미션과 비전이 너무 유사합니다.',
        affectedFields: ['mission', 'vision'],
        conflictingValues: [mission, vision],
        suggestedResolution: '미션은 현재 목적을, 비전은 미래 목표를 명확히 구분해서 작성해보세요.',
        autoFixable: false
      };
    }

    // 미션과 비전의 방향성이 다른 경우
    const missionKeywords = this.extractKeywords(mission);
    const visionKeywords = this.extractKeywords(vision);
    const commonKeywords = missionKeywords.filter(k => visionKeywords.includes(k));

    if (commonKeywords.length === 0 && missionKeywords.length > 2 && visionKeywords.length > 2) {
      return {
        id: 'mission_vision_direction_mismatch',
        type: 'contradiction',
        severity: 'high',
        description: '미션과 비전의 방향성이 일치하지 않습니다.',
        affectedFields: ['mission', 'vision'],
        conflictingValues: [mission, vision],
        suggestedResolution: '미션과 비전이 같은 브랜드 목표를 향하도록 연결점을 찾아보세요.',
        autoFixable: false
      };
    }

    return null;
  }

  // 브랜드 가치와 원칙 일관성 검증
  private validateValuesPrinciplesConsistency(brandData: BrandData): ConsistencyIssue | null {
    const values = brandData.values;
    const principles = brandData.step0Data?.principles;

    if (!values || !principles) {
      return null;
    }

    const keepPrinciples = principles.keep || [];
    const avoidPrinciples = principles.avoid || [];

    // 가치와 피할 원칙이 모순되는 경우
    for (const value of values) {
      for (const avoid of avoidPrinciples) {
        if (this.isConceptuallyOpposite(value, avoid)) {
          return {
            id: 'values_avoid_contradiction',
            type: 'value_conflict',
            severity: 'high',
            description: `브랜드 가치 "${value}"와 피할 원칙 "${avoid}"이 모순됩니다.`,
            affectedFields: ['values', 'step0Data.principles.avoid'],
            conflictingValues: [value, avoid],
            suggestedResolution: '브랜드 가치와 피할 원칙이 일치하도록 수정해보세요.',
            autoFixable: false
          };
        }
      }
    }

    return null;
  }

  // 브랜드 네이밍과 아이덴티티 일관성 검증
  private validateNamingIdentityConsistency(brandData: BrandData): ConsistencyIssue | null {
    const brandName = brandData.brandName;
    const identity = brandData.step0Data?.identity;
    const mission = brandData.mission;

    if (!brandName || (!identity && !mission)) {
      return null;
    }

    const nameStyle = this.analyzeBrandNameStyle(brandName);
    const identityStyle = this.analyzeContentStyle(identity || mission || '');

    // 브랜드명 스타일과 아이덴티티가 매우 다른 경우
    if (this.isStyleMismatch(nameStyle, identityStyle)) {
      return {
        id: 'naming_identity_style_mismatch',
        type: 'misalignment',
        severity: 'medium',
        description: '브랜드명의 느낌과 브랜드 아이덴티티가 일치하지 않습니다.',
        affectedFields: ['brandName', 'step0Data.identity', 'mission'],
        conflictingValues: [brandName, identity],
        suggestedResolution: '브랜드명과 아이덴티티의 느낌을 통일하거나 의도적인 대비라면 명확한 이유를 정의해보세요.',
        autoFixable: false
      };
    }

    return null;
  }

  // 브랜드 감각과 성격 일관성 검증
  private validateSensePersonalityConsistency(brandData: BrandData): ConsistencyIssue | null {
    const brandSense = brandData.step0Data?.brandSense;
    const personality = brandData.personality;
    const voiceGuidelines = brandData.voiceGuidelines;

    if (!brandSense && !personality && !voiceGuidelines) {
      return null;
    }

    // 브랜드 감각과 성격이 모순되는 경우
    if (brandSense && personality) {
      const senseStyle = this.analyzeSenseStyle(brandSense);
      const personalityStyle = this.analyzePersonalityStyle(personality);

      if (this.isStyleMismatch(senseStyle, personalityStyle)) {
        return {
          id: 'sense_personality_mismatch',
          type: 'tone_mismatch',
          severity: 'medium',
          description: '브랜드 감각과 성격이 일치하지 않습니다.',
          affectedFields: ['step0Data.brandSense', 'personality'],
          conflictingValues: [brandSense, personality],
          suggestedResolution: '브랜드 감각(색상, 계절, 음악 등)과 성격 특성이 일관되도록 조정해보세요.',
          autoFixable: false
        };
      }
    }

    return null;
  }

  // 문제점과 해결책 일관성 검증
  private validateProblemSolutionConsistency(brandData: BrandData): ConsistencyIssue | null {
    const painPoint = brandData.step0Data?.painPoint;
    const mission = brandData.mission;
    const idealScene = brandData.step0Data?.idealScene;

    if (!painPoint || (!mission && !idealScene)) {
      return null;
    }

    const problemKeywords = this.extractKeywords(painPoint);
    const solutionKeywords = this.extractKeywords((mission || '') + ' ' + (idealScene || ''));

    // 문제점과 해결책이 연결되지 않는 경우
    const hasConnection = problemKeywords.some(pk =>
      solutionKeywords.some(sk => this.areRelatedConcepts(pk, sk))
    );

    if (!hasConnection && problemKeywords.length > 1 && solutionKeywords.length > 1) {
      return {
        id: 'problem_solution_disconnect',
        type: 'contradiction',
        severity: 'high',
        description: '식별한 문제점과 제시한 해결책이 연결되지 않습니다.',
        affectedFields: ['step0Data.painPoint', 'mission', 'step0Data.idealScene'],
        conflictingValues: [painPoint, mission || idealScene],
        suggestedResolution: '문제점에 대한 구체적인 해결책이 미션이나 이상적 장면에 반영되도록 수정해보세요.',
        autoFixable: false
      };
    }

    return null;
  }

  // 데이터 완성도 검증
  private validateDataCompleteness(brandData: BrandData): ConsistencyIssue | null {
    const requiredFields = {
      0: ['brandType', 'step0Data.startingMoment', 'step0Data.painPoint'],
      1: ['mission', 'vision', 'values'],
      2: ['brandName'],
      3: ['slogan', 'voiceGuidelines']
    };

    const currentStep = brandData.currentQuestion || 0;
    const missingFields: string[] = [];

    for (let step = 0; step <= Math.min(currentStep, 3); step++) {
      const required = requiredFields[step] || [];
      for (const field of required) {
        if (!this.getNestedValue(brandData, field)) {
          missingFields.push(field);
        }
      }
    }

    if (missingFields.length > 0) {
      return {
        id: 'incomplete_data',
        type: 'gap',
        severity: missingFields.length > 3 ? 'high' : 'medium',
        description: `필수 정보가 누락되었습니다: ${missingFields.join(', ')}`,
        affectedFields: missingFields,
        conflictingValues: [],
        suggestedResolution: '누락된 필수 정보를 입력해주세요.',
        autoFixable: false
      };
    }

    return null;
  }

  // 중복 정보 검증
  private validateRedundancy(brandData: BrandData): ConsistencyIssue | null {
    const mission = brandData.mission;
    const vision = brandData.vision;
    const identity = brandData.step0Data?.identity;

    const texts = [mission, vision, identity].filter(Boolean);

    for (let i = 0; i < texts.length; i++) {
      for (let j = i + 1; j < texts.length; j++) {
        const similarity = this.calculateStringSimilarity(texts[i], texts[j]);
        if (similarity > 0.9) {
          return {
            id: 'redundant_content',
            type: 'redundancy',
            severity: 'low',
            description: '매우 유사한 내용이 중복되고 있습니다.',
            affectedFields: ['mission', 'vision', 'step0Data.identity'],
            conflictingValues: [texts[i], texts[j]],
            suggestedResolution: '각 항목의 고유한 목적을 살려서 차별화해보세요.',
            autoFixable: false
          };
        }
      }
    }

    return null;
  }

  // 문자열 유사도 계산
  private calculateStringSimilarity(str1: string, str2: string): number {
    if (!str1 || !str2) return 0;

    const words1 = str1.toLowerCase().split(/\s+/);
    const words2 = str2.toLowerCase().split(/\s+/);

    const intersection = words1.filter(word => words2.includes(word));
    const union = [...new Set([...words1, ...words2])];

    return intersection.length / union.length;
  }

  // 키워드 추출
  private extractKeywords(text: string): string[] {
    if (!text) return [];

    const stopwords = ['은', '는', '이', '가', '을', '를', '의', '에', '에서', '로', '으로', '와', '과', '하고'];
    const words = text.toLowerCase()
      .replace(/[^\w\s가-힣]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 1 && !stopwords.includes(word));

    return [...new Set(words)];
  }

  // 반대 개념 판단
  private isConceptuallyOpposite(concept1: string, concept2: string): boolean {
    const opposites = [
      ['빠른', '느린'], ['새로운', '전통적'], ['혁신적', '보수적'],
      ['개방적', '폐쇄적'], ['자유로운', '엄격한'], ['캐주얼', '정형적']
    ];

    return opposites.some(([a, b]) =>
      (concept1.includes(a) && concept2.includes(b)) ||
      (concept1.includes(b) && concept2.includes(a))
    );
  }

  // 브랜드명 스타일 분석
  private analyzeBrandNameStyle(name: string): string {
    if (/[A-Za-z]/.test(name)) return 'english';
    if (/\d/.test(name)) return 'numeric';
    if (name.length <= 3) return 'short';
    if (name.length > 8) return 'long';
    return 'korean';
  }

  // 콘텐츠 스타일 분석
  private analyzeContentStyle(content: string): string {
    if (/혁신|새로운|미래/.test(content)) return 'innovative';
    if (/전통|클래식|정통/.test(content)) return 'traditional';
    if (/친근|따뜻|편안/.test(content)) return 'friendly';
    if (/전문|고급|프리미엄/.test(content)) return 'professional';
    return 'neutral';
  }

  // 브랜드 감각 스타일 분석
  private analyzeSenseStyle(sense: any): string {
    const { color, season, music } = sense;

    if (color?.includes('빨간') || music?.includes('록')) return 'energetic';
    if (color?.includes('파란') || season?.includes('겨울')) return 'calm';
    if (color?.includes('노란') || season?.includes('봄')) return 'bright';
    if (color?.includes('검은') || music?.includes('클래식')) return 'sophisticated';

    return 'neutral';
  }

  // 성격 스타일 분석
  private analyzePersonalityStyle(personality: string[]): string {
    const energeticWords = ['활동적', '역동적', '열정적'];
    const calmWords = ['차분한', '안정적', '신뢰할만한'];
    const friendlyWords = ['친근한', '따뜻한', '편안한'];

    if (personality.some(p => energeticWords.some(w => p.includes(w)))) return 'energetic';
    if (personality.some(p => calmWords.some(w => p.includes(w)))) return 'calm';
    if (personality.some(p => friendlyWords.some(w => p.includes(w)))) return 'friendly';

    return 'neutral';
  }

  // 스타일 불일치 판단
  private isStyleMismatch(style1: string, style2: string): boolean {
    const incompatiblePairs = [
      ['energetic', 'calm'],
      ['traditional', 'innovative'],
      ['professional', 'casual']
    ];

    return incompatiblePairs.some(([a, b]) =>
      (style1 === a && style2 === b) || (style1 === b && style2 === a)
    );
  }

  // 관련 개념 판단
  private areRelatedConcepts(concept1: string, concept2: string): boolean {
    const relatedGroups = [
      ['비싸', '가격', '저렴', '할인'],
      ['불편', '편리', '쉬운', '어려운'],
      ['품질', '좋은', '나쁜', '개선'],
      ['서비스', '고객', '만족', '불만']
    ];

    return relatedGroups.some(group =>
      group.some(word => concept1.includes(word)) &&
      group.some(word => concept2.includes(word))
    );
  }

  // 중첩된 값 가져오기
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  // 전체 점수 계산
  private calculateOverallScore(issues: ConsistencyIssue[]): number {
    if (issues.length === 0) return 1.0;

    const severityWeights = { critical: 0.4, high: 0.3, medium: 0.2, low: 0.1 };
    const totalDeduction = issues.reduce((sum, issue) => {
      return sum + severityWeights[issue.severity];
    }, 0);

    return Math.max(0, 1 - totalDeduction);
  }

  // 권장사항 생성
  private generateRecommendations(issues: ConsistencyIssue[]): string[] {
    const recommendations: string[] = [];

    if (issues.filter(i => i.severity === 'critical').length > 0) {
      recommendations.push('치명적인 일관성 문제를 우선 해결하세요.');
    }

    if (issues.filter(i => i.type === 'contradiction').length > 0) {
      recommendations.push('모순되는 내용들을 점검하고 일치시키세요.');
    }

    if (issues.filter(i => i.type === 'gap').length > 0) {
      recommendations.push('누락된 필수 정보를 완성하세요.');
    }

    if (issues.filter(i => i.autoFixable).length > 0) {
      recommendations.push('자동 수정이 가능한 항목들을 검토해보세요.');
    }

    return recommendations;
  }

  // 자동 수정 제안 생성
  generateAutoFixSuggestions(issues: ConsistencyIssue[]): AutoFixSuggestion[] {
    const suggestions: AutoFixSuggestion[] = [];

    for (const issue of issues.filter(i => i.autoFixable)) {
      // 여기서는 간단한 예시만 구현
      if (issue.type === 'redundancy') {
        suggestions.push({
          issueId: issue.id,
          originalValue: issue.conflictingValues[0],
          suggestedValue: `${issue.conflictingValues[0]} (수정됨)`,
          confidence: 0.7,
          reasoning: '중복 내용을 차별화했습니다.'
        });
      }
    }

    return suggestions;
  }

  // 브랜드 데이터 업데이트
  updateBrandData(newBrandData: BrandData): void {
    this.brandData = newBrandData;
  }

  // QA 히스토리 업데이트
  updateQAHistory(newQAHistory: QAPair[]): void {
    this.qaHistory = newQAHistory;
  }

  // 실시간 검증 (특정 필드만)
  validateField(fieldPath: string, value: any): ConsistencyIssue[] {
    const issues: ConsistencyIssue[] = [];
    const relevantRules = this.validationRules.filter(rule =>
      rule.fields.includes(fieldPath) || rule.fields.includes('*')
    );

    for (const rule of relevantRules) {
      try {
        const issue = rule.validator(this.brandData, this.qaHistory);
        if (issue) {
          issues.push(issue);
        }
      } catch (error) {
        console.error(`Field validation rule ${rule.id} failed:`, error);
      }
    }

    return issues;
  }
}