import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { EmotionQuestion, AnswerChoice } from '../types/quiz'
import { cn, shuffleArray } from '../lib/utils'
import { useTranslation } from 'react-i18next'

interface QuestionCardProps {
  question: EmotionQuestion
  onAnswer: (selectedAnswerId: string) => void
  questionNumber: number
  totalQuestions: number
  isLoading?: boolean
  className?: string
}

interface ChoiceButtonProps {
  choice: AnswerChoice
  isSelected: boolean
  isCorrect?: boolean
  isIncorrect?: boolean
  showResult?: boolean
  onClick: () => void
  isProcessing?: boolean
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  choice,
  isSelected,
  isCorrect,
  isIncorrect,
  showResult,
  onClick,
  isProcessing = false
}) => {
  const baseClasses = "w-full min-h-[44px] p-4 rounded-xl border-2 transition-all duration-200 font-medium text-left"
  
  // 결과 표시 시 색상 (다크모드 최적화)
  const resultClasses = showResult ? (
    isCorrect ? "border-mint bg-mint/10 text-mint dark:border-mint dark:bg-mint/20 dark:text-mint" :
    isIncorrect ? "border-coral bg-coral/10 text-coral dark:border-coral dark:bg-coral/20 dark:text-coral" :
    "border-border bg-card text-muted-foreground dark:border-border dark:bg-card dark:text-muted-foreground"
  ) : (
    isSelected ? "border-primary bg-primary/10 text-primary dark:border-primary dark:bg-primary/20 dark:text-primary" :
    "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5 dark:border-border dark:bg-card dark:text-foreground dark:hover:border-primary/70 dark:hover:bg-primary/10"
  )
  
  const isDisabled = showResult || isProcessing
  
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cn(baseClasses, resultClasses, {
        "cursor-not-allowed opacity-50": isDisabled,
        "cursor-pointer hover:scale-[1.01] active:scale-[0.98] hover:shadow-md hover:border-primary": !isDisabled
      })}
    >
      <div className="flex items-center gap-3">
        {/* 선택지 텍스트 */}
        <div className="flex-1">
          <span className="text-sm sm:text-base md:text-lg font-medium leading-relaxed">
            {choice.text}
          </span>
        </div>
        
        {/* 결과 표시 아이콘 */}
        {showResult && (
          <div className="flex-shrink-0">
            {isCorrect && (
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            {isIncorrect && (
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        )}
        
        {/* 처리 중 아이콘 */}
        {!showResult && isProcessing && isSelected && (
          <div className="flex-shrink-0">
            <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
          </div>
        )}
      </div>
    </button>
  )
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  questionNumber,
  totalQuestions,
  isLoading = false,
  className
}) => {
  // TODO: questionNumber와 totalQuestions를 사용한 진행률 표시 구현 예정
  void questionNumber;
  void totalQuestions;
  const { t } = useTranslation()
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingError, setProcessingError] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const processingStartTime = useRef<number | null>(null)
  
  // 선택지를 랜덤으로 섞기 (문제가 바뀔 때마다)
  const shuffledChoices = useMemo(() => {
    return shuffleArray([...question.choices])
  }, [question.choices])
  
  // 타임아웃 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])
  
  // 문제 변경 시 상태 리셋
  useEffect(() => {
    setSelectedAnswerId(null)
    setIsProcessing(false)
    setProcessingError(null)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [question.id])
  
  const handleChoiceClick = useCallback((choiceId: string) => {
    console.log('=== CHOICE CLICK DEBUG START ===')
    console.log('Clicked choice ID:', choiceId)
    console.log('Current selectedAnswerId:', selectedAnswerId)
    console.log('Is loading:', isLoading)
    console.log('Is processing:', isProcessing)
    console.log('Question ID:', question.id)
    console.log('Question type:', question.type)
    
    if (selectedAnswerId || isLoading || isProcessing) {
      console.log('⚠️ Choice click blocked:')
      console.log('- Already selected:', !!selectedAnswerId)
      console.log('- Is loading:', isLoading)
      console.log('- Is processing:', isProcessing)
      return
    }
    
    console.log('✅ Setting selected answer ID:', choiceId)
    setSelectedAnswerId(choiceId)
    setIsProcessing(true)
    setProcessingError(null)
    processingStartTime.current = Date.now()
    
    // 5초 타임아웃 설정
    timeoutRef.current = setTimeout(() => {
      console.error('⏰ Answer processing timeout - forcing reset')
      setProcessingError(t('question.error.timeout'))
      setSelectedAnswerId(null)
      setIsProcessing(false)
    }, 5000)
    
    try {
      console.log('📤 Calling onAnswer with choice ID:', choiceId)
      onAnswer(choiceId)
      
      // 성공적으로 처리되면 타임아웃 정리
      setTimeout(() => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
        setIsProcessing(false)
      }, 100) // 다음 틱에서 처리 상태 해제
      
    } catch (error) {
      console.error('❌ Error calling onAnswer:', error)
      setProcessingError(t('question.error.general'))
      setSelectedAnswerId(null)
      setIsProcessing(false)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
    
    console.log('=== CHOICE CLICK DEBUG END ===')
  }, [selectedAnswerId, isLoading, isProcessing, onAnswer, question.id, question.type, t])
  
  const renderQuestionContent = () => {
    return (
      <div className="text-center">
        {question.image && (
          <div className="mx-auto mb-6 w-64 h-64 rounded-xl overflow-hidden bg-muted/10 dark:bg-muted/20 shadow-lg">
            <img
              src={question.image}
              alt="표정 이미지"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        )}
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-2 leading-tight">
          {t('question.title')}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {t('question.description')}
        </p>
      </div>
    )
  }
  
  return (
    <div className={cn("w-full bg-card border border-border rounded-2xl shadow-sm p-6", className)}>
      {/* 문제 내용 */}
      <div className="mb-6">
        {renderQuestionContent()}
      </div>
      
      {/* 선택지 */}
      <div className="space-y-3">
        {shuffledChoices.map((choice) => {
          const isSelected = selectedAnswerId === choice.id
          
          return (
            <ChoiceButton
              key={choice.id}
              choice={choice}
              isSelected={isSelected}
              isCorrect={false}
              isIncorrect={false}
              showResult={false}
              onClick={() => handleChoiceClick(choice.id)}
              isProcessing={isProcessing}
            />
          )
        })}
      </div>
      
      {/* 처리 상태 및 오류 표시 */}
      {isProcessing && (
        <div className="mt-6 flex justify-center items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
          <span className="text-sm text-muted-foreground">{t('question.processing')}</span>
        </div>
      )}
      
      {processingError && (
        <div className="mt-6 p-3 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950/20 dark:border-red-800/30">
          <div className="flex items-center gap-2">
            <span className="text-red-600 text-sm dark:text-red-400">⚠️</span>
            <span className="text-red-700 text-sm dark:text-red-300">{processingError}</span>
          </div>
          <button
            onClick={() => {
              setProcessingError(null)
              setSelectedAnswerId(null)
              setIsProcessing(false)
            }}
            className="mt-2 text-xs text-red-600 hover:text-red-800 underline dark:text-red-400 dark:hover:text-red-300"
          >
{t('question.retry')}
          </button>
        </div>
      )}
      
      {/* 로딩 상태 */}
      {isLoading && (
        <div className="mt-6 flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
        </div>
      )}
    </div>
  )
}

export default QuestionCard 