import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import ShareButtons from './ShareButtons'
import {
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Eye,
  Target,
  Award,
} from 'lucide-react'
import type { QuizResult } from '../types/quiz'

interface RewardScreenProps {
  result: QuizResult
  nickname: string
  onRestart: () => void
}

const RewardScreen: React.FC<RewardScreenProps> = ({
  result,
  nickname,
  onRestart,
}) => {
  const { t } = useTranslation()
  const [showExplanations, setShowExplanations] = useState(false)

  const gradeLabels: { [key: string]: string } = {
    master: t('grades.master'),
    expert: t('grades.expert'),
    rookie: t('grades.rookie'),
    novice: t('grades.novice'),
  }

  const gradeColors = {
    master: 'text-purple-600',
    expert: 'text-blue-600',
    rookie: 'text-green-600',
    novice: 'text-orange-600',
  }

  const percentage = Math.round((result.score / result.totalQuestions) * 100)

  const shareText = t('share.twitterText', {
    nickname,
    score: result.score,
    total: result.totalQuestions,
    grade: gradeLabels[result.grade],
  })

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-lg mx-auto">
        {/* 메인 결과 카드 */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 mb-6">
          {/* 등급 표시 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 mb-4">
              <Award
                size={18}
                className={gradeColors[result.grade as keyof typeof gradeColors]}
              />
              <span
                className={`font-bold ${
                  gradeColors[result.grade as keyof typeof gradeColors]
                }`}
              >
                {gradeLabels[result.grade]}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {t('result.title', { nickname })}
            </h1>

            {result.score === result.totalQuestions && (
              <div className="text-lg text-yellow-600 font-medium mb-4">
                {t('result.perfectScore')}
              </div>
            )}
          </div>

          {/* 점수 표시 */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Target size={24} className="text-primary" />
              <span className="text-5xl font-bold text-gray-800">
                {result.score}
              </span>
              <span className="text-2xl text-gray-500 self-end mb-1">
                /{result.totalQuestions}
              </span>
            </div>

            <div className="text-xl text-gray-600 mb-6">
              {t('result.accuracy', { percentage })}
            </div>

            {/* 정답/오답 통계 */}
            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-sm text-green-600 font-medium">
                  {t('common.correct')}
                </div>
                <div className="text-2xl font-bold text-green-700">
                  {result.correctAnswers}
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-sm text-red-600 font-medium">
                  {t('common.incorrect')}
                </div>
                <div className="text-2xl font-bold text-red-700">
                  {result.incorrectAnswers.length}
                </div>
              </div>
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="text-center text-sm font-medium text-gray-600 mb-2">
              {t('share.title')}
            </div>
            <ShareButtons shareText={shareText} shareUrl={window.location.href} />

            <Button
              onClick={onRestart}
              variant="outline"
              size="lg"
              className="w-full !mt-6"
            >
              <RotateCcw size={18} className="mr-2" />
              {t('common.retry')}
            </Button>
          </div>
        </div>

        {/* 설명보기 섹션 */}
        {result.incorrectAnswers.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <Button
              onClick={() => setShowExplanations(!showExplanations)}
              variant="ghost"
              className="w-full flex items-center justify-between p-4 h-auto text-left"
            >
              <div className="flex items-center gap-2">
                <Eye size={18} className="text-gray-600" />
                <span className="font-medium text-gray-800">
                  {t('result.viewIncorrect', {
                    count: result.incorrectAnswers.length,
                  })}
                </span>
              </div>
              {showExplanations ? (
                <ChevronUp size={18} className="text-gray-500" />
              ) : (
                <ChevronDown size={18} className="text-gray-500" />
              )}
            </Button>

            {showExplanations && (
              <div className="mt-4 space-y-4 border-t border-gray-100 pt-4">
                {result.incorrectAnswers.map((wrongAnswer, index) => (
                  <div
                    key={wrongAnswer.questionId}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-600 text-sm font-bold rounded-full">
                        {index + 1}
                      </span>
                      <span className="text-sm text-gray-600">
                        {t('result.question')} {wrongAnswer.questionId}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-red-500 mt-0.5">❌</span>
                        <div>
                          <span className="text-gray-600">
                            {t('result.yourAnswer')}:{' '}
                          </span>
                          <span className="font-medium text-red-600">
                            {wrongAnswer.selectedAnswerId}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✅</span>
                        <div>
                          <span className="text-gray-600">
                            {t('result.correctAnswer')}:{' '}
                          </span>
                          <span className="font-medium text-green-600">
                            {wrongAnswer.correctAnswerId}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default RewardScreen 