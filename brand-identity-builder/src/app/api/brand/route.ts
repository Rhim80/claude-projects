import { NextRequest, NextResponse } from 'next/server'
import type { 
  BrandProject, 
  ProjectCreateRequest, 
  ProjectUpdateRequest,
  ApiResponse 
} from '@/types/brand'

// In-memory storage for development (나중에 Supabase로 교체)
const projects = new Map<string, BrandProject>();

// Create new brand project
export async function POST(request: NextRequest) {
  try {
    const body: ProjectCreateRequest = await request.json();
    
    if (!body.projectName) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: {
          code: 'INVALID_INPUT',
          message: '프로젝트 이름이 필요합니다.'
        }
      }, { status: 400 });
    }

    const projectId = generateProjectId();
    const now = new Date();

    const newProject: BrandProject = {
      id: projectId,
      userId: body.userId,
      projectName: body.projectName,
      currentStep: 0,
      isCompleted: false,
      stepData: {},
      createdAt: now,
      updatedAt: now,
    };

    projects.set(projectId, newProject);

    return NextResponse.json<ApiResponse<BrandProject>>({
      success: true,
      data: newProject,
      metadata: {
        timestamp: now.toISOString(),
        version: '1.0.0'
      }
    });

  } catch (error) {
    console.error('Project creation error:', error);
    
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: '프로젝트 생성 중 오류가 발생했습니다.'
      }
    }, { status: 500 });
  }
}

// Get all projects (for development)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let filteredProjects = Array.from(projects.values());
    
    if (userId) {
      filteredProjects = filteredProjects.filter(p => p.userId === userId);
    }

    return NextResponse.json<ApiResponse<BrandProject[]>>({
      success: true,
      data: filteredProjects.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()),
      metadata: {
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      }
    });

  } catch (error) {
    console.error('Projects fetch error:', error);
    
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: '프로젝트 목록을 가져오는 중 오류가 발생했습니다.'
      }
    }, { status: 500 });
  }
}

function generateProjectId(): string {
  return `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}