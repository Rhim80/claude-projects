import { NextRequest, NextResponse } from 'next/server'
import { createGeminiClient, rateLimitMiddleware } from '@/lib/gemini'
import type { StepProcessRequest, StepProcessResponse, ApiResponse } from '@/types/api'

// Rate limiting middleware
const rateLimiter = rateLimitMiddleware(30, 60000); // 30 requests per minute

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';

    // Check rate limit
    if (!rateLimiter(clientIP)) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: {
          code: 'RATE_LIMIT',
          message: '요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.'
        }
      }, { status: 429 });
    }

    // Parse request body
    const body: StepProcessRequest = await request.json();
    
    // Validate request
    if (!body.projectId || typeof body.step !== 'number' || !body.userInput) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: {
          code: 'INVALID_INPUT',
          message: '필수 필드가 누락되었습니다.'
        }
      }, { status: 400 });
    }

    // Validate step range
    if (body.step < 0 || body.step > 6) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: {
          code: 'INVALID_INPUT',
          message: '유효하지 않은 단계입니다.'
        }
      }, { status: 400 });
    }

    // Create Gemini client
    const geminiClient = createGeminiClient();

    // Process step with AI
    const startTime = Date.now();
    const response = await geminiClient.processStep(body);
    const responseTime = Date.now() - startTime;

    // Log usage metrics (for monitoring)
    console.log('Step processing:', {
      projectId: body.projectId,
      step: body.step,
      responseTime,
      success: true,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json<ApiResponse<StepProcessResponse>>({
      success: true,
      data: response,
      metadata: {
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      }
    });

  } catch (error) {
    console.error('Step processing error:', error);

    // Log error metrics
    console.log('Step processing error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });

    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    const errorCode = errorMessage.includes('API key') ? 'AUTH_ERROR' : 
                     errorMessage.includes('quota') ? 'RATE_LIMIT' :
                     errorMessage.includes('AI processing') ? 'AI_ERROR' : 'SERVER_ERROR';

    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: {
        code: errorCode,
        message: errorCode === 'SERVER_ERROR' ? 
          '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' : errorMessage
      }
    }, { status: 500 });
  }
}

// Health check endpoint
export async function GET() {
  try {
    // Test Gemini client connection
    const geminiClient = createGeminiClient();
    const isConnected = await geminiClient.testConnection();

    return NextResponse.json({
      status: 'healthy',
      geminiConnection: isConnected,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy', 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 503 });
  }
}