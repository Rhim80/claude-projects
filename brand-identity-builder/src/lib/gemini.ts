import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'
import type { 
  GeminiConfig, 
  GeminiRequest, 
  GeminiResponse,
  StepProcessRequest,
  StepProcessResponse 
} from '@/types/api'

class GeminiClient {
  private genAI: GoogleGenerativeAI;
  private config: GeminiConfig;

  constructor(config: GeminiConfig) {
    this.config = config;
    this.genAI = new GoogleGenerativeAI(config.apiKey);
  }

  /**
   * Get Generative Model with safety settings
   */
  private getModel(systemInstruction?: string) {
    return this.genAI.getGenerativeModel({
      model: this.config.model,
      systemInstruction: systemInstruction ? {
        role: 'system',
        parts: [{ text: systemInstruction }]
      } : undefined,
      generationConfig: {
        maxOutputTokens: this.config.maxOutputTokens || 4096,
        temperature: this.config.temperature || 0.7,
        topP: this.config.topP || 0.8,
        topK: this.config.topK || 40,
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });
  }

  /**
   * Process a single step with system prompt protection
   */
  async processStep(request: StepProcessRequest): Promise<StepProcessResponse> {
    try {
      // Get system prompt from environment (protected)
      const systemPrompt = this.getStepPrompt(request.step);
      if (!systemPrompt) {
        throw new Error(`Step ${request.step} prompt not found`);
      }

      const model = this.getModel(systemPrompt);

      // Prepare user input with context
      const userMessage = this.formatUserInput(request);
      
      const result = await model.generateContent({
        contents: [{
          role: 'user',
          parts: [{ text: userMessage }]
        }]
      });

      const response = result.response;
      const responseText = response.text();

      // Parse response and extract structured data
      const processedResponse = this.parseStepResponse(request.step, responseText);

      return {
        response: processedResponse.response,
        nextStep: this.determineNextStep(request.step, processedResponse.isStepComplete),
        isStepComplete: processedResponse.isStepComplete,
        extractedData: processedResponse.extractedData,
        suggestions: processedResponse.suggestions
      };

    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error(`AI processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get step prompt from environment variables (protected)
   */
  private getStepPrompt(step: number): string | null {
    const prompts = {
      0: process.env.PROMPT_STEP_0,
      1: process.env.PROMPT_STEP_1,
      2: process.env.PROMPT_STEP_2,
      3: process.env.PROMPT_STEP_3,
      4: process.env.PROMPT_STEP_4,
      5: process.env.PROMPT_STEP_5,
      6: process.env.PROMPT_STEP_6,
    } as const;

    return prompts[step as keyof typeof prompts] || null;
  }

  /**
   * Format user input with previous context
   */
  private formatUserInput(request: StepProcessRequest): string {
    const context = request.previousData ? JSON.stringify(request.previousData, null, 2) : '';
    
    return `
사용자 입력: ${request.userInput}

이전 단계 데이터:
${context}

현재 진행 중인 단계: ${request.step}
프로젝트 ID: ${request.projectId}
    `.trim();
  }

  /**
   * Parse AI response and extract structured data
   */
  private parseStepResponse(step: number, responseText: string) {
    // Try to extract JSON data from response
    let extractedData = null;
    let isStepComplete = false;
    let suggestions: string[] = [];

    // Look for JSON blocks in the response
    const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      try {
        extractedData = JSON.parse(jsonMatch[1]);
        isStepComplete = true;
      } catch (e) {
        console.warn('Failed to parse JSON from response:', e);
      }
    }

    // Extract suggestions if present
    const suggestionMatch = responseText.match(/제안사항:\s*\n([\s\S]*?)(?:\n\n|$)/);
    if (suggestionMatch) {
      suggestions = suggestionMatch[1]
        .split('\n')
        .filter(line => line.trim())
        .map(line => line.replace(/^[-*]\s*/, ''));
    }

    // Check for completion indicators
    if (responseText.includes('단계 완료') || responseText.includes('다음 단계로')) {
      isStepComplete = true;
    }

    return {
      response: responseText,
      extractedData,
      isStepComplete,
      suggestions
    };
  }

  /**
   * Determine next step based on current progress
   */
  private determineNextStep(currentStep: number, isComplete: boolean): number | undefined {
    if (!isComplete) {
      return undefined; // Stay on current step
    }

    if (currentStep >= 6) {
      return undefined; // All steps completed
    }

    return currentStep + 1;
  }

  /**
   * Test connection with a simple query
   */
  async testConnection(): Promise<boolean> {
    try {
      const model = this.getModel('You are a helpful assistant. Respond with "Connection successful" in Korean.');
      const result = await model.generateContent({
        contents: [{
          role: 'user',
          parts: [{ text: 'Test connection' }]
        }]
      });
      
      const response = result.response.text();
      return response.includes('성공') || response.includes('연결');
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }

  /**
   * Get usage statistics for monitoring
   */
  getUsageStats() {
    return {
      model: this.config.model,
      apiKey: this.config.apiKey ? '***configured***' : 'not configured',
      timestamp: new Date().toISOString()
    };
  }
}

// Default client instance
export const createGeminiClient = (apiKey?: string): GeminiClient => {
  const key = apiKey || process.env.GEMINI_API_KEY;
  
  if (!key) {
    throw new Error('Gemini API key not found in environment variables');
  }

  return new GeminiClient({
    apiKey: key,
    model: 'gemini-2.5-flash',
    maxOutputTokens: 4096,
    temperature: 0.7,
  });
};

// Utility function for rate limiting
export const rateLimitMiddleware = (
  maxRequests: number = 60,
  windowMs: number = 60000
) => {
  const requests = new Map<string, number[]>();

  return (identifier: string): boolean => {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    const userRequests = requests.get(identifier) || [];
    const validRequests = userRequests.filter(time => time > windowStart);
    
    if (validRequests.length >= maxRequests) {
      return false; // Rate limit exceeded
    }

    validRequests.push(now);
    requests.set(identifier, validRequests);
    return true; // Request allowed
  };
};

export default GeminiClient;