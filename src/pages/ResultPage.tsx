import React from 'react'
import { useQuizContext } from '../contexts/QuizContext'
import RewardScreen from '../components/RewardScreen'

const ResultPage: React.FC = () => {
  const quiz = useQuizContext()
  
  const handleRestart = () => {
    quiz.restartQuiz()
  }

  // 퀴즈 결과가 없으면 로딩 상태 표시
  if (!quiz.quizResult) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div>결과를 불러오는 중...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <RewardScreen
        result={quiz.quizResult}
        nickname={quiz.nickname}
        questions={quiz.questions}
        onRestart={handleRestart}
      />
    </div>
  )
}

export default ResultPage 