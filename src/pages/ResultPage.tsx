import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuizContext } from '../contexts/QuizContext'
import RewardScreen from '../components/RewardScreen'

const ResultPage: React.FC = () => {
  const navigate = useNavigate()
  const quiz = useQuizContext()
  
  // 퀴즈가 완료되지 않았으면 홈으로 리다이렉트
  if (!quiz.isQuizFinished || !quiz.quizResult) {
    navigate('/')
    return null
  }

  const handleRestart = () => {
    quiz.resetQuiz()
    navigate('/')
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