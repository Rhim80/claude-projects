import { NextRequest, NextResponse } from 'next/server'
import type { 
  BrandProject, 
  ProjectUpdateRequest,
  ApiResponse 
} from '@/types/brand'

// In-memory storage for development (나중에 Supabase로 교체)
const projects = new Map<string, BrandProject>();

// Get specific project
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;
    const project = projects.get(projectId);

    if (!project) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: {
          code: 'INVALID_INPUT',
          message: '프로젝트를 찾을 수 없습니다.'
        }
      }, { status: 404 });
    }

    return NextResponse.json<ApiResponse<BrandProject>>({
      success: true,
      data: project,
      metadata: {
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      }
    });

  } catch (error) {
    console.error('Project fetch error:', error);
    
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: '프로젝트를 가져오는 중 오류가 발생했습니다.'
      }
    }, { status: 500 });
  }
}

// Update project
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;
    const body: Partial<ProjectUpdateRequest> = await request.json();
    
    const existingProject = projects.get(projectId);
    if (!existingProject) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: {
          code: 'INVALID_INPUT',
          message: '프로젝트를 찾을 수 없습니다.'
        }
      }, { status: 404 });
    }

    const now = new Date();
    const updatedProject: BrandProject = {
      ...existingProject,
      ...body,
      updatedAt: now,
    };

    // Update step data if provided
    if (body.stepData) {
      updatedProject.stepData = {
        ...existingProject.stepData,
        ...body.stepData
      };
    }

    // Update current step if provided
    if (typeof body.currentStep === 'number') {
      updatedProject.currentStep = body.currentStep;
      
      // Check if all steps completed
      if (body.currentStep >= 6) {
        updatedProject.isCompleted = true;
      }
    }

    projects.set(projectId, updatedProject);

    return NextResponse.json<ApiResponse<BrandProject>>({
      success: true,
      data: updatedProject,
      metadata: {
        timestamp: now.toISOString(),
        version: '1.0.0'
      }
    });

  } catch (error) {
    console.error('Project update error:', error);
    
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: '프로젝트 업데이트 중 오류가 발생했습니다.'
      }
    }, { status: 500 });
  }
}

// Delete project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;
    
    if (!projects.has(projectId)) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: {
          code: 'INVALID_INPUT',
          message: '프로젝트를 찾을 수 없습니다.'
        }
      }, { status: 404 });
    }

    projects.delete(projectId);

    return NextResponse.json<ApiResponse<{ deleted: boolean }>>({
      success: true,
      data: { deleted: true },
      metadata: {
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      }
    });

  } catch (error) {
    console.error('Project deletion error:', error);
    
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: '프로젝트 삭제 중 오류가 발생했습니다.'
      }
    }, { status: 500 });
  }
}