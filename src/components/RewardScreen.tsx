import React from 'react'
import { Button } from '@/components/ui/button'
import type { QuizResult } from '../types/quiz'

interface RewardScreenProps {
  result: QuizResult
  nickname: string
  onRestart: () => void
}

const RewardScreen: React.FC<RewardScreenProps> = ({
  result,
  nickname,
  onRestart
}) => {
  // 등급별 테마 색상
  const getGradeTheme = (grade: string) => {
    switch (grade) {
      case 'master':
        return {
          gradient: 'from-purple-600 to-purple-800',
          bg: 'bg-purple-50',
          text: 'text-purple-800',
          badge: 'bg-purple-600'
        }
      case 'expert':
        return {
          gradient: 'from-blue-600 to-blue-800',
          bg: 'bg-blue-50',
          text: 'text-blue-800',
          badge: 'bg-blue-600'
        }
      case 'rookie':
        return {
          gradient: 'from-green-600 to-green-800',
          bg: 'bg-green-50',
          text: 'text-green-800',
          badge: 'bg-green-600'
        }
      default: // novice
        return {
          gradient: 'from-orange-600 to-orange-800',
          bg: 'bg-orange-50',
          text: 'text-orange-800',
          badge: 'bg-orange-600'
        }
    }
  }

  const theme = getGradeTheme(result.grade)

  const gradeLabels = {
    master: '감정 탐정 마스터',
    expert: '감정 탐정 전문가',
    rookie: '감정 탐정 초보자',
    novice: '감정 탐정 견습생'
  }

  const percentage = Math.round((result.score / result.totalQuestions) * 100)

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.gradient} p-4`}>
      <div className="max-w-2xl mx-auto">
        {/* 결과 카드 */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center px-4 py-2 rounded-full ${theme.badge} text-white font-medium mb-4`}>
              <span className="text-2xl mr-2">🎯</span>
              {gradeLabels[result.grade as keyof typeof gradeLabels]}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {nickname}님의 결과
            </h1>
            
            {result.score === result.totalQuestions && (
              <div className="text-lg text-yellow-600 font-medium mb-4">
                🎉 완벽한 점수입니다! 축하합니다! 🎉
              </div>
            )}
          </div>

          {/* 점수 표시 */}
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-gray-800 mb-2">
              {result.score}
              <span className="text-3xl text-gray-500">/{result.totalQuestions}</span>
            </div>
            <div className="text-xl text-gray-600 mb-4">
              정답률 {percentage}%
            </div>
            
            {/* 통계 */}
            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
              <div className={`${theme.bg} rounded-lg p-3`}>
                <div className="text-sm text-gray-600">정답</div>
                <div className={`text-2xl font-bold ${theme.text}`}>
                  {result.correctAnswers}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm text-gray-600">오답</div>
                <div className="text-2xl font-bold text-gray-800">
                  {result.incorrectAnswers.length}
                </div>
              </div>
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="space-y-4 mb-8">
            <Button
              onClick={() => {
                // 간단한 공유 기능
                if (navigator.share) {
                  navigator.share({
                    title: 'FaceRead 퀴즈 결과',
                    text: `나의 감정 인식 능력은 ${gradeLabels[result.grade as keyof typeof gradeLabels]}! (${result.score}/${result.totalQuestions}점)`,
                    url: window.location.origin
                  })
                } else {
                  navigator.clipboard?.writeText(`나의 감정 인식 능력은 ${gradeLabels[result.grade as keyof typeof gradeLabels]}! (${result.score}/${result.totalQuestions}점) - ${window.location.origin}`)
                  alert('결과가 클립보드에 복사되었습니다!')
                }
              }}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              <span className="mr-2">📤</span>
              결과 공유하기
            </Button>
            
            <Button
              onClick={onRestart}
              variant="outline"
              size="lg"
              className="w-full"
            >
              <span className="mr-2">🔄</span>
              다시 도전하기
            </Button>
          </div>
        </div>

        {/* 오답 해설 (간단 버전) */}
        {result.incorrectAnswers.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              오답 {result.incorrectAnswers.length}개
            </h2>
            
            <div className="space-y-4">
              {result.incorrectAnswers.map((wrongAnswer, index) => (
                <div key={wrongAnswer.questionId} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-red-500 font-bold">#{index + 1}</span>
                    <span className="text-sm text-gray-600">
                      문제 {wrongAnswer.questionId}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-red-500">❌</span>
                      <span className="text-gray-600">선택한 답:</span>
                      <span className="font-medium text-red-600">
                        {wrongAnswer.selectedAnswerId}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-500">✅</span>
                      <span className="text-gray-600">정답:</span>
                      <span className="font-medium text-green-600">
                        {wrongAnswer.correctAnswerId}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RewardScreen 