import React from 'react'
import { useQuizContext } from '../contexts/QuizContext'
import RewardScreen from '../components/RewardScreen'

const ResultPage: React.FC = () => {
  const quiz = useQuizContext()
  
  // 퀴즈가 완료되지 않았으면 초기 화면으로 이동
  if (!quiz.isQuizFinished || !quiz.quizResult) {
    quiz.setStep('intro')
    return null
  }

  const handleRestart = () => {
    quiz.resetQuiz()
    quiz.setStep('intro')
  }

  return (
    <div className="min-h-screen bg-background-light">
      <RewardScreen
        result={quiz.quizResult}
        nickname={quiz.nickname}
        onRestart={handleRestart}
      />
    </div>
  )
}

export default ResultPage 