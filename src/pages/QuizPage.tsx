import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuizContext } from '../contexts/QuizContext'
import { Button } from '@/components/ui/button'
import QuestionCard from '../components/QuestionCard'
import type { SupportedLanguage, GameMode } from '../types/quiz'

interface LocationState {
  gameMode: GameMode
  language: SupportedLanguage
  nickname: string
}

const QuizPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const quiz = useQuizContext()
  
  const state = location.state as LocationState
  
  useEffect(() => {
    // 상태가 없으면 홈으로 리다이렉트
    if (!state) {
      navigate('/')
      return
    }
    
    // 문제가 로드되었고 퀴즈가 시작되지 않았다면 시작
    if (quiz.questions.length > 0 && !quiz.isQuizStarted) {
      quiz.startQuiz(state.gameMode, state.language)
    }
  }, [state, quiz.questions.length, quiz.isQuizStarted, quiz.startQuiz, navigate])
  
  // 퀴즈가 완료되면 결과 페이지로 이동
  useEffect(() => {
    if (quiz.isQuizFinished) {
      navigate('/result')
    }
  }, [quiz.isQuizFinished, navigate])
  
  // 로딩 상태
  if (quiz.isLoading) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-secondary-600">문제를 불러오는 중...</p>
        </div>
      </div>
    )
  }
  
  // 에러 상태
  if (quiz.error) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-secondary-800 mb-2">오류가 발생했습니다</h2>
          <p className="text-secondary-600 mb-6">{quiz.error}</p>
          <Button
            onClick={() => navigate('/')}
            variant="default"
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    )
  }
  
  // 퀴즈가 시작되지 않았거나 문제가 없는 경우
  if (!quiz.isQuizStarted || !quiz.currentQuestion) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
            <div className="h-8 bg-gray-300 rounded w-32 mx-auto"></div>
          </div>
          <p className="text-secondary-600 mt-4">퀴즈를 준비하고 있습니다...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header with Progress */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-bold text-secondary-800">FaceRead</h1>
              <span className="text-sm text-secondary-600">
                {state?.nickname || '플레이어'}님의 퀴즈
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-secondary-600">
                {quiz.currentQuestionIndex + 1} / {quiz.totalQuestions}
              </span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${quiz.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Quiz Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <QuestionCard
            question={quiz.currentQuestion}
            questionNumber={quiz.currentQuestionIndex + 1}
            totalQuestions={quiz.totalQuestions}
            onAnswer={() => {
              // QuestionCard 컴포넌트에서 자동으로 submitAnswer를 호출하므로
              // 여기서는 추가 처리가 필요하지 않음
            }}
          />
        </div>
      </main>

      {/* Quiz Info */}
      <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 text-sm">
        <div className="text-secondary-600">
          <div>점수: {quiz.score}점</div>
          <div>모드: {state?.gameMode === 'standard' ? '표준' : '통합'}</div>
          <div>언어: {state?.language === 'ko' ? '한국어' : state?.language === 'en' ? 'English' : 'Español'}</div>
        </div>
      </div>
    </div>
  )
}

export default QuizPage 