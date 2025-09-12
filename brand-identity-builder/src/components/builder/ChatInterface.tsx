'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import useBrandBuilderStore from '@/lib/store'
import { STEP_0_INITIAL_MESSAGE } from '@/lib/prompts/step-0'
import type { ChatMessage } from '@/types/brand'

export function ChatInterface() {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const {
    chatMessages,
    isLoading,
    error,
    currentStep,
    currentProject,
    addChatMessage,
    processStep,
    setError
  } = useBrandBuilderStore()

  // Initialize with step 0 message
  useEffect(() => {
    if (chatMessages.length === 0 && currentStep === 0) {
      const initialMessage: ChatMessage = {
        id: 'initial_step_0',
        role: 'assistant',
        content: STEP_0_INITIAL_MESSAGE,
        timestamp: new Date(),
        stepNumber: 0
      }
      addChatMessage(initialMessage)
    }
  }, [chatMessages.length, currentStep, addChatMessage])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!input.trim() || isLoading || !currentProject) {
      return
    }

    const userInput = input.trim()
    setInput('')
    setError(null)

    // Process the step with AI
    await processStep(userInput)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <div className="flex flex-col h-full max-h-[600px]">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {chatMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <Card
              className={`max-w-[80%] ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              <CardContent className="p-4">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>
                <div className="text-xs mt-2 opacity-70">
                  {message.timestamp.toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                  {message.stepNumber !== undefined && (
                    <span className="ml-2">Step {message.stepNumber}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <Card className="bg-muted">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                  <span className="text-sm text-muted-foreground">
                    AI가 응답을 생성하고 있습니다...
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-destructive/10 border-t border-destructive/20">
          <div className="text-sm text-destructive">
            ⚠️ {error}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="브랜드에 대한 생각을 자유롭게 입력해주세요..."
              className="min-h-[80px] resize-none pr-12"
              disabled={isLoading || !currentProject}
            />
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              {input.length}/2000
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              {currentProject ? (
                <span>
                  💬 Step {currentStep} | {currentProject.projectName}
                </span>
              ) : (
                <span className="text-destructive">
                  프로젝트를 먼저 생성해주세요
                </span>
              )}
            </div>
            
            <Button 
              type="submit"
              disabled={!input.trim() || isLoading || !currentProject}
              size="sm"
            >
              {isLoading ? '처리중...' : '전송'}
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground">
            💡 Shift + Enter로 줄바꿈, Enter로 전송
          </div>
        </form>
      </div>
    </div>
  )
}