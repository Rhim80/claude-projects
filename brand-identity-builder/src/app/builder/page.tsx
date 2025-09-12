'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChatInterface } from '@/components/builder/ChatInterface'
import { StepProgress } from '@/components/builder/StepProgress'
import useBrandBuilderStore from '@/lib/store'

export default function BuilderPage() {
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false)
  const [projectName, setProjectName] = useState('')
  
  const { 
    currentProject, 
    isLoading, 
    createProject,
    clearChatMessages 
  } = useBrandBuilderStore()

  const handleCreateProject = async () => {
    if (!projectName.trim()) return

    const project = await createProject(projectName.trim())
    if (project) {
      setShowNewProjectDialog(false)
      setProjectName('')
      clearChatMessages() // Clear any existing chat
    }
  }

  const handleStartNewProject = () => {
    setShowNewProjectDialog(true)
    setProjectName('')
  }

  // Show project creation dialog if no current project
  if (!currentProject || showNewProjectDialog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">
              새 브랜드 프로젝트 시작
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="projectName" className="block text-sm font-medium mb-2">
                프로젝트 이름
              </label>
              <input
                id="projectName"
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="예: 내 카페 브랜드, 개인 브랜드 등"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isLoading) {
                    handleCreateProject()
                  }
                }}
                disabled={isLoading}
              />
            </div>
            
            <div className="text-sm text-gray-600">
              💡 구체적인 이름을 지으면 더 맞춤형 가이드를 받을 수 있어요
            </div>
            
            <div className="flex space-x-3">
              {showNewProjectDialog && currentProject && (
                <Button 
                  variant="outline" 
                  onClick={() => setShowNewProjectDialog(false)}
                  disabled={isLoading}
                  className="flex-1"
                >
                  취소
                </Button>
              )}
              <Button 
                onClick={handleCreateProject}
                disabled={!projectName.trim() || isLoading}
                className="flex-1"
              >
                {isLoading ? '생성 중...' : '프로젝트 시작'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Brand Identity Builder
              </h1>
              <p className="text-sm text-slate-600">
                7단계 시스템으로 브랜드 아이덴티티 구축
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleStartNewProject}
              >
                새 프로젝트
              </Button>
              
              <div className="text-sm text-slate-600">
                {currentProject.projectName}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-160px)]">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">
                  AI 브랜드 컨설턴트와 대화
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  자연스러운 대화를 통해 브랜드를 발견해보세요
                </div>
              </CardHeader>
              <CardContent className="h-full p-0">
                <ChatInterface />
              </CardContent>
            </Card>
          </div>

          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <StepProgress />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <div>
              © 2025 Brand Identity Builder - Powered by IMI WORK
            </div>
            <div className="flex items-center space-x-4">
              <span>🚀 Gemini 2.5 Flash</span>
              <span>⚡ Next.js 14</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}