'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useBrandBuilderStore from '@/lib/store'
import type { StepMetadata } from '@/types/brand'

const STEP_METADATA: StepMetadata[] = [
  {
    step: 0,
    title: '브랜드 씨앗 발굴',
    description: '브랜드의 시작점과 감각 찾기',
    estimatedTime: '15-20분',
    isCompleted: false,
    isActive: false,
    isAccessible: true,
  },
  {
    step: 1,
    title: '브랜드 정체성 체계',
    description: '미션/비전/핵심가치 정리',
    estimatedTime: '20-25분',
    isCompleted: false,
    isActive: false,
    isAccessible: false,
  },
  {
    step: 2,
    title: '브랜드 네이밍 설계',
    description: '과학적 원리 기반 전략적 네이밍',
    estimatedTime: '25-30분',
    isCompleted: false,
    isActive: false,
    isAccessible: false,
  },
  {
    step: 3,
    title: '브랜드 언어 설계',
    description: '철학의 언어화, 슬로건과 보이스',
    estimatedTime: '30-35분',
    isCompleted: false,
    isActive: false,
    isAccessible: false,
  },
  {
    step: 4,
    title: '컨셉 검증 & 최적화',
    description: '통합적 검증과 시장 적합성',
    estimatedTime: '20-25분',
    isCompleted: false,
    isActive: false,
    isAccessible: false,
  },
  {
    step: 5,
    title: '실행 설계',
    description: '통합 실행 로드맵과 접점별 구현',
    estimatedTime: '25-30분',
    isCompleted: false,
    isActive: false,
    isAccessible: false,
  },
  {
    step: 6,
    title: '브랜딩 휠 완성',
    description: '최종 브랜드 가이드북 생성',
    estimatedTime: '15-20분',
    isCompleted: false,
    isActive: false,
    isAccessible: false,
  },
]

export function StepProgress() {
  const { currentStep, currentProject } = useBrandBuilderStore()

  const getStepStatus = (stepNumber: number) => {
    if (!currentProject) {
      return { isCompleted: false, isActive: false, isAccessible: stepNumber === 0 }
    }

    const isCompleted = stepNumber < currentStep || 
      (currentProject.stepData && Object.hasOwnProperty.call(currentProject.stepData, `step${stepNumber}`))
    const isActive = stepNumber === currentStep
    const isAccessible = stepNumber <= currentStep

    return { isCompleted, isActive, isAccessible }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">브랜드 구축 진행상황</CardTitle>
        <div className="text-sm text-muted-foreground">
          7단계 체계적 프로세스로 완성하세요
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {STEP_METADATA.map((step) => {
          const status = getStepStatus(step.step)
          
          return (
            <div
              key={step.step}
              className={`p-3 rounded-lg border transition-colors ${
                status.isActive
                  ? 'bg-primary/10 border-primary'
                  : status.isCompleted
                  ? 'bg-green-50 border-green-200'
                  : status.isAccessible
                  ? 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  : 'bg-gray-25 border-gray-100 opacity-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                {/* Step Indicator */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    status.isCompleted
                      ? 'bg-green-500 text-white'
                      : status.isActive
                      ? 'bg-primary text-primary-foreground'
                      : status.isAccessible
                      ? 'bg-gray-300 text-gray-700'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {status.isCompleted ? '✓' : step.step}
                </div>

                {/* Step Info */}
                <div className="flex-1 min-w-0">
                  <div className={`font-medium text-sm ${
                    status.isAccessible ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {step.description}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    ⏱ {step.estimatedTime}
                  </div>
                </div>

                {/* Status Icon */}
                <div className="text-xs">
                  {status.isCompleted && '🎉'}
                  {status.isActive && '🔄'}
                  {!status.isAccessible && '🔒'}
                </div>
              </div>
            </div>
          )
        })}

        {/* Progress Summary */}
        <div className="mt-6 p-3 bg-muted rounded-lg">
          <div className="text-sm font-medium mb-2">전체 진행률</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{
                width: `${((currentStep) / 7) * 100}%`
              }}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            {currentStep}/7 단계 완료 ({Math.round(((currentStep) / 7) * 100)}%)
          </div>
        </div>

        {/* Current Project Info */}
        {currentProject && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm font-medium text-blue-900">
              📋 {currentProject.projectName}
            </div>
            <div className="text-xs text-blue-700 mt-1">
              시작일: {new Date(currentProject.createdAt).toLocaleDateString('ko-KR')}
            </div>
            {currentProject.isCompleted && (
              <div className="text-xs text-green-700 mt-1">
                ✅ 브랜드 시스템 완성!
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}