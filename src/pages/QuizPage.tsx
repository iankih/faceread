import React, { useEffect } from 'react'
import { useQuizContext } from '../contexts/QuizContext'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import QuestionCard from '../components/QuestionCard'
import { useTranslation } from 'react-i18next'

const QuizPage: React.FC = () => {
  const quiz = useQuizContext()
  const { t } = useTranslation()
  
  useEffect(() => {
    // 퀴즈가 시작되지 않았고 문제가 로드되어 있다면 자동으로 시작
    if (quiz.questions.length > 0 && !quiz.isQuizStarted) {
      quiz.startQuiz(quiz.gameMode, quiz.language)
    }
  }, [quiz])
  
  // 로딩 상태
  if (quiz.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" role="status" aria-label={t('quiz.loading')}></div>
          <p className="text-muted-foreground">{t('quiz.loading')}</p>
        </div>
      </div>
    )
  }
  
  // 에러 상태
  if (quiz.error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 text-6xl mb-4" role="img" aria-label="Warning">⚠️</div>
          <h2 className="text-xl font-bold text-foreground mb-2">{t('quiz.error.title')}</h2>
          <p className="text-muted-foreground mb-6">{quiz.error}</p>
          <Button
            onClick={() => quiz.resetToHome()}
            variant="default"
          >
            {t('quiz.error.backToHome')}
          </Button>
        </div>
      </div>
    )
  }
  
  // 퀴즈가 시작되지 않았거나 문제가 없는 경우
  if (!quiz.isQuizStarted || !quiz.currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
            <div className="h-8 bg-gray-300 rounded w-32 mx-auto"></div>
          </div>
          <p className="text-muted-foreground mt-4">{t('quiz.preparing')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 상단 진행률 - 고정 */}
      <header className="bg-card shadow-sm px-4 py-3 sticky top-0 z-10 border-b border-border">
        <div className="max-w-sm mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">문제 {quiz.currentQuestionIndex + 1}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">총 {quiz.totalQuestions}문제입니다</span>
              <Button
                onClick={() => quiz.resetToHome()}
                variant="ghost"
                size="sm"
                className="h-8 px-2"
              >
                <Home size={14} />
              </Button>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((quiz.currentQuestionIndex + 1) / quiz.totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </header>
      
      {/* 메인 콘텐츠 - 스크롤 가능 */}
      <main className="flex-1 p-4 overflow-y-auto">
        <QuestionCard
          className="max-w-sm mx-auto"
          question={quiz.currentQuestion}
          questionNumber={quiz.currentQuestionIndex + 1}
          totalQuestions={quiz.totalQuestions}
          onAnswer={(selectedAnswerId) => {
            console.log('=== QUIZ PAGE ANSWER HANDLER ===')
            console.log('Answer received from QuestionCard:', selectedAnswerId)
            console.log('Current question ID:', quiz.currentQuestion.id)
            console.log('Quiz state before submit:', {
              currentQuestionIndex: quiz.currentQuestionIndex,
              totalQuestions: quiz.totalQuestions,
              isQuizStarted: quiz.isQuizStarted,
              isQuizFinished: quiz.isQuizFinished
            })
            quiz.submitAnswer(quiz.currentQuestion.id, selectedAnswerId)
            console.log('=== QUIZ PAGE ANSWER HANDLER END ===')
          }}
        />
      </main>
    </div>
  )
}

export default QuizPage 