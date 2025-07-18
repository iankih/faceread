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
  const [showIncorrectAnswers, setShowIncorrectAnswers] = useState(false)
  const [showAllAnswers, setShowAllAnswers] = useState(false)

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
    <div className="min-h-screen bg-background-light p-4">
      <div className="max-w-lg mx-auto">
        {/* 메인 결과 카드 */}
        <div className="bg-card border border-border rounded-2xl shadow-sm p-8 mb-6">
          {/* 등급 표시 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-light border border-border mb-4">
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

            <h1 className="text-2xl font-bold text-foreground mb-2">
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
              <span className="text-5xl font-bold text-foreground">
                {result.score}
              </span>
              <span className="text-2xl text-gray-500 self-end mb-1">
                /{result.totalQuestions}
              </span>
            </div>

            <div className="text-xl text-foreground mb-6">
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
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="text-center text-sm font-medium text-foreground mb-2">
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

        {/* 답변 보기 섹션 */}
        <div className="space-y-4">
          {/* 틀린 답 보기 버튼 */}
          {result.incorrectAnswers.length > 0 && (
            <div className="bg-card border border-border rounded-2xl shadow-sm p-6">
              <Button
                onClick={() => setShowIncorrectAnswers(!showIncorrectAnswers)}
                variant="ghost"
                className="w-full flex items-center justify-between p-4 h-auto text-left"
              >
                <div className="flex items-center gap-2">
                  <Eye size={18} className="text-red-600" />
                  <span className="font-medium text-foreground">
                    틀린 답 보기 ({result.incorrectAnswers.length}개)
                  </span>
                </div>
                {showIncorrectAnswers ? (
                  <ChevronUp size={18} className="text-gray-500" />
                ) : (
                  <ChevronDown size={18} className="text-gray-500" />
                )}
              </Button>

              {showIncorrectAnswers && (
                <div className="mt-4 space-y-4 border-t border-border pt-4">
                  {result.incorrectAnswers.map((wrongAnswer, index) => (
                    <div
                      key={wrongAnswer.questionId}
                      className="p-4 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-600 text-sm font-bold rounded-full">
                          {index + 1}
                        </span>
                        <span className="text-sm text-foreground">
                          문제 {wrongAnswer.questionId}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-red-500 mt-0.5">❌</span>
                          <div>
                            <span className="text-foreground">
                              당신의 답:{' '}
                            </span>
                            <span className="font-medium text-red-600">
                              {wrongAnswer.selectedAnswerId}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✅</span>
                          <div>
                            <span className="text-foreground">
                              정답:{' '}
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

          {/* 전체 답 보기 버튼 */}
          <div className="bg-card border border-border rounded-2xl shadow-sm p-6">
            <Button
              onClick={() => setShowAllAnswers(!showAllAnswers)}
              variant="ghost"
              className="w-full flex items-center justify-between p-4 h-auto text-left"
            >
              <div className="flex items-center gap-2">
                <Target size={18} className="text-blue-600" />
                <span className="font-medium text-foreground">
                  전체 답 보기 ({result.answers.length}개)
                </span>
              </div>
              {showAllAnswers ? (
                <ChevronUp size={18} className="text-gray-500" />
              ) : (
                <ChevronDown size={18} className="text-gray-500" />
              )}
            </Button>

            {showAllAnswers && (
              <div className="mt-4 space-y-4 border-t border-border pt-4">
                {result.answers.map((answer, index) => (
                  <div
                    key={answer.questionId}
                    className={`p-4 rounded-lg border ${
                      answer.isCorrect 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center justify-center w-6 h-6 text-sm font-bold rounded-full ${
                        answer.isCorrect 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="text-sm text-foreground">
                        문제 {answer.questionId}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        answer.isCorrect 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {answer.isCorrect ? '정답' : '오답'}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span className={`mt-0.5 ${answer.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                          {answer.isCorrect ? '✅' : '❌'}
                        </span>
                        <div>
                          <span className="text-foreground">
                            당신의 답:{' '}
                          </span>
                          <span className={`font-medium ${
                            answer.isCorrect ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {answer.selectedAnswerId}
                          </span>
                        </div>
                      </div>

                      {!answer.isCorrect && (
                        <div className="flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✅</span>
                          <div>
                            <span className="text-foreground">
                              정답:{' '}
                            </span>
                            <span className="font-medium text-green-600">
                              {answer.correctAnswerId}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RewardScreen 