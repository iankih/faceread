import React, { createContext, useContext, ReactNode } from 'react'
import { useQuiz } from '../hooks/useQuiz'

// useQuiz의 반환 타입을 그대로 사용
type QuizContextType = ReturnType<typeof useQuiz>

const QuizContext = createContext<QuizContextType | undefined>(undefined)

interface QuizProviderProps {
  children: ReactNode
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const quiz = useQuiz()
  
  return (
    <QuizContext.Provider value={quiz}>
      {children}
    </QuizContext.Provider>
  )
}

export const useQuizContext = (): QuizContextType => {
  const context = useContext(QuizContext)
  if (context === undefined) {
    throw new Error('useQuizContext must be used within a QuizProvider')
  }
  return context
} 