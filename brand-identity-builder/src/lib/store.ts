import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { 
  BrandProject, 
  ChatMessage, 
  BuilderState,
  BrandStepData 
} from '@/types/brand'

interface BrandBuilderStore extends BuilderState {
  // Actions
  setCurrentProject: (project: BrandProject | null) => void
  setCurrentStep: (step: number) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  addChatMessage: (message: ChatMessage) => void
  clearChatMessages: () => void
  updateProjectData: (stepData: Partial<BrandStepData>) => void
  
  // API Actions
  createProject: (name: string) => Promise<BrandProject | null>
  loadProject: (id: string) => Promise<BrandProject | null>
  saveProject: (project: BrandProject) => Promise<boolean>
  processStep: (input: string) => Promise<string | null>
}

const useBrandBuilderStore = create<BrandBuilderStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        currentProject: null,
        currentStep: 0,
        isLoading: false,
        error: null,
        chatMessages: [],

        // Actions
        setCurrentProject: (project) => set({ currentProject: project }),
        setCurrentStep: (step) => set({ currentStep: step }),
        setLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error }),
        
        addChatMessage: (message) => 
          set((state) => ({ 
            chatMessages: [...state.chatMessages, message] 
          })),
        
        clearChatMessages: () => set({ chatMessages: [] }),

        updateProjectData: (stepData) => 
          set((state) => ({
            currentProject: state.currentProject ? {
              ...state.currentProject,
              stepData: {
                ...state.currentProject.stepData,
                ...stepData
              },
              updatedAt: new Date()
            } : null
          })),

        // API Actions
        createProject: async (name: string) => {
          set({ isLoading: true, error: null })
          
          try {
            const response = await fetch('/api/brand', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ projectName: name }),
            })

            const result = await response.json()
            
            if (!result.success) {
              throw new Error(result.error.message)
            }

            const project = result.data
            set({ 
              currentProject: project,
              currentStep: 0,
              chatMessages: [],
              isLoading: false 
            })
            
            return project

          } catch (error) {
            const errorMsg = error instanceof Error ? error.message : '프로젝트 생성에 실패했습니다.'
            set({ error: errorMsg, isLoading: false })
            return null
          }
        },

        loadProject: async (id: string) => {
          set({ isLoading: true, error: null })
          
          try {
            const response = await fetch(`/api/brand/${id}`)
            const result = await response.json()
            
            if (!result.success) {
              throw new Error(result.error.message)
            }

            const project = result.data
            set({ 
              currentProject: project,
              currentStep: project.currentStep,
              isLoading: false 
            })
            
            return project

          } catch (error) {
            const errorMsg = error instanceof Error ? error.message : '프로젝트 로드에 실패했습니다.'
            set({ error: errorMsg, isLoading: false })
            return null
          }
        },

        saveProject: async (project: BrandProject) => {
          set({ isLoading: true, error: null })
          
          try {
            const response = await fetch(`/api/brand/${project.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                stepData: project.stepData,
                currentStep: project.currentStep,
              }),
            })

            const result = await response.json()
            
            if (!result.success) {
              throw new Error(result.error.message)
            }

            set({ 
              currentProject: result.data,
              isLoading: false 
            })
            
            return true

          } catch (error) {
            const errorMsg = error instanceof Error ? error.message : '프로젝트 저장에 실패했습니다.'
            set({ error: errorMsg, isLoading: false })
            return false
          }
        },

        processStep: async (input: string) => {
          const { currentProject, currentStep } = get()
          
          if (!currentProject) {
            set({ error: '프로젝트가 선택되지 않았습니다.' })
            return null
          }

          set({ isLoading: true, error: null })

          // Add user message to chat
          const userMessage: ChatMessage = {
            id: `user_${Date.now()}`,
            role: 'user',
            content: input,
            timestamp: new Date(),
            stepNumber: currentStep
          }
          
          get().addChatMessage(userMessage)

          try {
            const response = await fetch('/api/step/process', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                projectId: currentProject.id,
                step: currentStep,
                userInput: input,
                previousData: currentProject.stepData,
              }),
            })

            const result = await response.json()
            
            if (!result.success) {
              throw new Error(result.error.message)
            }

            const { response: aiResponse, nextStep, isStepComplete, extractedData } = result.data

            // Add AI message to chat
            const aiMessage: ChatMessage = {
              id: `ai_${Date.now()}`,
              role: 'assistant',
              content: aiResponse,
              timestamp: new Date(),
              stepNumber: currentStep
            }
            
            get().addChatMessage(aiMessage)

            // Update project data if step completed
            if (isStepComplete && extractedData) {
              get().updateProjectData(extractedData)
              
              // Move to next step if available
              if (nextStep !== undefined) {
                set({ currentStep: nextStep })
              }
              
              // Save project automatically
              const updatedProject = get().currentProject
              if (updatedProject) {
                await get().saveProject(updatedProject)
              }
            }

            set({ isLoading: false })
            return aiResponse

          } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'AI 처리 중 오류가 발생했습니다.'
            set({ error: errorMsg, isLoading: false })
            
            // Add error message to chat
            const errorMessage: ChatMessage = {
              id: `error_${Date.now()}`,
              role: 'assistant',
              content: `죄송합니다. ${errorMsg}`,
              timestamp: new Date(),
              stepNumber: currentStep
            }
            
            get().addChatMessage(errorMessage)
            return null
          }
        },
      }),
      {
        name: 'brand-builder-store',
        partialize: (state) => ({
          currentProject: state.currentProject,
          currentStep: state.currentStep,
        }),
      }
    ),
    {
      name: 'brand-builder-store',
    }
  )
)

export default useBrandBuilderStore