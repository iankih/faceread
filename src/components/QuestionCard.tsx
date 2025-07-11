import React, { useState, useCallback } from 'react'
import { EmotionQuestion, AnswerChoice } from '../types/quiz'
import { cn } from '../lib/utils'

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
  questionType: 'face2text' | 'text2face' | 'eyes2text'
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  choice,
  isSelected,
  isCorrect,
  isIncorrect,
  showResult,
  onClick,
  questionType
}) => {
  const baseClasses = "w-full p-4 rounded-lg border-2 transition-all duration-200 font-medium text-left"
  
  // 결과 표시 시 색상
  const resultClasses = showResult ? (
    isCorrect ? "border-green-500 bg-green-50 text-green-700" :
    isIncorrect ? "border-red-500 bg-red-50 text-red-700" :
    "border-gray-200 bg-gray-50 text-gray-500"
  ) : (
    isSelected ? "border-primary bg-primary/10 text-primary" :
    "border-gray-200 bg-white text-gray-700 hover:border-primary/50 hover:bg-primary/5"
  )
  
  const isDisabled = showResult
  
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cn(baseClasses, resultClasses, {
        "cursor-not-allowed": isDisabled,
        "cursor-pointer hover:scale-[1.02] active:scale-[0.98]": !isDisabled
      })}
    >
      <div className="flex items-center gap-3">
        {/* text2face 타입에서는 이미지 표시 */}
        {questionType === 'text2face' && choice.image && (
          <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={choice.image}
              alt={`선택지 ${choice.text}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        
        {/* 선택지 텍스트 */}
        <div className="flex-1">
          <span className="text-sm font-medium text-gray-500 mr-2">
            {choice.text}
          </span>
          
          {/* face2text, eyes2text 타입에서는 감정 설명 */}
          {(questionType === 'face2text' || questionType === 'eyes2text') && (
            <span className="text-base">
              {choice.id === 'happy' && '기쁨'}
              {choice.id === 'sad' && '슬픔'}
              {choice.id === 'angry' && '화남'}
              {choice.id === 'surprised' && '놀람'}
              {choice.id === 'fear' && '두려움'}
              {choice.id === 'disgust' && '혐오'}
              {choice.id === 'neutral' && '무표정'}
              {choice.id === 'confused' && '혼란'}
              {choice.id === 'focused' && '집중'}
              {choice.id === 'determined' && '결연함'}
            </span>
          )}
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
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  
  const handleChoiceClick = useCallback((choiceId: string) => {
    if (showResult || isLoading) return
    
    setSelectedAnswerId(choiceId)
    setShowResult(true)
    
    // 1.2초 후 답변 제출 (PRD 애니메이션 120ms + 사용자 확인 시간)
    setTimeout(() => {
      onAnswer(choiceId)
      // 상태 리셋은 부모 컴포넌트에서 새 문제 로드 시 처리
    }, 1200)
  }, [showResult, isLoading, onAnswer])
  
  const renderQuestionContent = () => {
    switch (question.type) {
      case 'face2text':
        return (
          <div className="text-center">
            {question.image && (
              <div className="mx-auto mb-6 w-32 h-32 rounded-xl overflow-hidden bg-gray-100 shadow-lg">
                <img
                  src={question.image}
                  alt="얼굴 표정"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            )}
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              이 표정은 어떤 감정일까요?
            </h2>
            <p className="text-gray-600">
              사진 속 인물의 감정을 선택해주세요.
            </p>
          </div>
        )
        
      case 'text2face':
        return (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              <span className="text-primary font-bold">{question.emotionKey}</span> 감정을 나타내는 표정은?
            </h2>
            <p className="text-gray-600">
              해당 감정에 맞는 얼굴 표정을 선택해주세요.
            </p>
          </div>
        )
        
      case 'eyes2text':
        return (
          <div className="text-center">
            {question.image && (
              <div className="mx-auto mb-6 w-40 h-24 rounded-lg overflow-hidden bg-gray-100 shadow-lg">
                <img
                  src={question.image}
                  alt="눈 표정"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            )}
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              이 눈빛이 나타내는 감정은?
            </h2>
            <p className="text-gray-600">
              눈을 통해 드러나는 감정을 선택해주세요.
            </p>
          </div>
        )
        
      default:
        return null
    }
  }
  
  return (
    <div className={cn("w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6", className)}>
      {/* 진행률 바 */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>문제 {questionNumber}</span>
          <span>{totalQuestions}개 중</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>
      
      {/* 문제 내용 */}
      <div className="mb-8">
        {renderQuestionContent()}
      </div>
      
      {/* 선택지 */}
      <div className="space-y-3">
        {question.choices.map((choice) => {
          const isSelected = selectedAnswerId === choice.id
          const isCorrect = showResult && choice.id === question.correctAnswer
          const isIncorrect = showResult && isSelected && choice.id !== question.correctAnswer
          
          return (
            <ChoiceButton
              key={choice.id}
              choice={choice}
              isSelected={isSelected}
              isCorrect={isCorrect}
              isIncorrect={isIncorrect}
              showResult={showResult}
              onClick={() => handleChoiceClick(choice.id)}
              questionType={question.type}
            />
          )
        })}
      </div>
      
      {/* 로딩 상태 */}
      {isLoading && (
        <div className="mt-6 flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      )}
      
      {/* 결과 표시 시 설명 */}
      {showResult && selectedAnswerId && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">설명</h3>
          <p className="text-sm text-gray-600">
            {question.explanation.ko}
          </p>
        </div>
      )}
    </div>
  )
}

export default QuestionCard 