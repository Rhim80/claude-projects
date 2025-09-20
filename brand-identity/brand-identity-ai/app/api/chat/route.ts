// Master Dialogue Controller 기반 ChatAPI Route
import { NextRequest, NextResponse } from 'next/server';
import { MasterDialogueController, SystemResponse } from '../../../lib/brand-system/master-dialogue-controller';
import { BrandData } from '../../../src/types/brand';

// 마스터 컨트롤러 인스턴스 (메모리에 세션별로 관리)
const activeSessions = new Map<string, MasterDialogueController>();

// 세션 관리
function getOrCreateSession(sessionId: string, brandData: BrandData = {}): MasterDialogueController {
  if (!activeSessions.has(sessionId)) {
    const controller = new MasterDialogueController(brandData);
    activeSessions.set(sessionId, controller);

    // 10분 후 세션 자동 정리
    setTimeout(() => {
      activeSessions.delete(sessionId);
    }, 10 * 60 * 1000);
  }

  return activeSessions.get(sessionId)!;
}

// 세션 ID 생성
function generateSessionId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export async function POST(req: NextRequest) {
  try {
    const {
      message = '',
      sessionId: providedSessionId,
      currentBrandData = {},
      reset = false
    } = await req.json();

    // 세션 ID 처리
    let sessionId = providedSessionId;
    if (!sessionId || reset) {
      sessionId = generateSessionId();
    }

    // 마스터 컨트롤러 가져오기/생성
    const masterController = getOrCreateSession(sessionId, currentBrandData);

    // 리셋 요청 시 시스템 초기화
    if (reset) {
      masterController.resetSystem();
    }

    let response: SystemResponse;

    // 초기 요청 (빈 메시지) 처리
    if (!message.trim()) {
      response = masterController.generateInitialQuestion();
    } else {
      // 사용자 입력 처리
      const processingResult = await masterController.processUserInput(message);

      if (!processingResult.success) {
        // 오류 발생 시 적절한 오류 응답 반환
        return NextResponse.json({
          error: processingResult.response.message,
          sessionId,
          systemState: processingResult.systemState
        }, { status: 500 });
      }

      response = processingResult.response;
    }

    // 성공 응답
    return NextResponse.json({
      message: response.message,
      type: response.type,
      metadata: response.metadata,
      context: response.context,
      sessionId,
      systemState: masterController.getSystemState(),
      brandData: masterController.getBrandData(),
      userProfile: masterController.getUserProfile(),

      // 호환성을 위한 기존 필드들
      extractedData: response.metadata.extractedData || {},
      isStepComplete: response.metadata.step > response.metadata.step, // 단계 완료 로직
      nextStep: response.metadata.needsFollowUp ? response.metadata.step : response.metadata.step + 1
    });

  } catch (error: any) {
    console.error('Master Chat API Error:', error);

    // 구체적인 오류 메시지 제공
    let errorMessage = '죄송합니다. 일시적인 오류가 발생했습니다.';
    let statusCode = 500;

    if (error.message?.includes('API_KEY')) {
      errorMessage = '죄송합니다. AI 서비스 설정에 문제가 있습니다.';
      statusCode = 503;
    } else if (error.message?.includes('QUOTA')) {
      errorMessage = '죄송합니다. 현재 서비스 사용량이 많습니다. 잠시 후 다시 시도해 주세요.';
      statusCode = 429;
    } else if (error.message?.includes('timeout')) {
      errorMessage = '응답 시간이 초과되었습니다. 다시 시도해 주세요.';
      statusCode = 408;
    }

    return NextResponse.json({
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: statusCode });
  }
}

// 세션 상태 조회 엔드포인트
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    const masterController = activeSessions.get(sessionId);
    if (!masterController) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    return NextResponse.json({
      systemState: masterController.getSystemState(),
      brandData: masterController.getBrandData(),
      userProfile: masterController.getUserProfile(),
      conversationHistory: masterController.getConversationHistory(),
      sessionSummary: masterController.generateSessionSummary()
    });

  } catch (error) {
    console.error('Session query error:', error);
    return NextResponse.json({ error: 'Failed to get session data' }, { status: 500 });
  }
}

// 세션 삭제 엔드포인트
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    const deleted = activeSessions.delete(sessionId);

    return NextResponse.json({
      success: deleted,
      message: deleted ? 'Session deleted successfully' : 'Session not found'
    });

  } catch (error) {
    console.error('Session deletion error:', error);
    return NextResponse.json({ error: 'Failed to delete session' }, { status: 500 });
  }
}