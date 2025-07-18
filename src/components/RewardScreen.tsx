import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import ShareButtons from './ShareButtons'
import {
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Target,
  Award,
} from 'lucide-react'
import type { QuizResult, EmotionQuestion } from '../types/quiz'

interface RewardScreenProps {
  result: QuizResult
  nickname: string
  questions: EmotionQuestion[]
  onRestart: () => void
}

const RewardScreen: React.FC<RewardScreenProps> = ({
  result,
  nickname,
  questions,
  onRestart,
}) => {
  const { t, i18n } = useTranslation()
  const [showAllAnswers, setShowAllAnswers] = useState(false)

  // questionId로 원본 question을 찾는 함수
  const findQuestionById = (questionId: string): EmotionQuestion | undefined => {
    return questions.find(q => q.id === questionId)
  }

  // answerId로 choice 텍스트를 찾는 함수
  const findChoiceTextById = (question: EmotionQuestion, choiceId: string): string => {
    const choice = question.choices.find(c => c.id === choiceId)
    return choice?.text || choiceId
  }

  // 현재 언어에 맞는 해설을 가져오는 함수
  const getExplanationByLanguage = (explanation: { ko: string; en: string; es: string }): string => {
    const currentLanguage = i18n.language as keyof typeof explanation
    return explanation[currentLanguage] || explanation.ko || explanation.en
  }

  const gradeLabels: { [key: string]: string } = {
    master: t('grades.master'),
    expert: t('grades.expert'),
    rookie: t('grades.rookie'),
    novice: t('grades.novice'),
  }

  const gradeColors = {
    master: 'text-lavender',
    expert: 'text-soft-blue', 
    rookie: 'text-mint',
    novice: 'text-warning',
  }

  const percentage = Math.round((result.score / result.totalQuestions) * 100)

  const shareText = t('share.twitterText', {
    nickname,
    score: result.score,
    total: result.totalQuestions,
    grade: gradeLabels[result.grade],
  })

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-sm mx-auto">
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

            {/* 등급별 코멘트 */}
            <div className="text-sm text-muted-foreground mb-4">
              {result.grade === 'master' && '완벽한 감정 읽기 능력을 보유하고 있습니다!'}
              {result.grade === 'expert' && '뛰어난 감정 인식 능력을 가지고 있네요!'}
              {result.grade === 'rookie' && '평균 이상의 감정 이해력을 보여줍니다.'}
              {result.grade === 'novice' && '감정 읽기 연습을 통해 더 발전할 수 있어요.'}
            </div>

            {result.score === result.totalQuestions && (
              <div className="text-lg text-primary font-medium mb-4">
                {t('result.perfectScore')}
              </div>
            )}
          </div>

          {/* 점수 표시 */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
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
              <div className="bg-mint/10 border border-mint/30 rounded-lg p-4">
                <div className="text-sm text-mint font-medium">
                  {t('common.correct')}
                </div>
                <div className="text-2xl font-bold text-mint">
                  {result.correctAnswers}
                </div>
              </div>
              <div className="bg-coral/10 border border-coral/30 rounded-lg p-4">
                <div className="text-sm text-coral font-medium">
                  {t('common.incorrect')}
                </div>
                <div className="text-2xl font-bold text-coral">
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
              variant="default"
              size="lg"
              className="w-full !mt-6 bg-primary text-foreground font-semibold"
            >
              <RotateCcw size={18} className="mr-2" />
              {t('common.retry')}
            </Button>
          </div>
        </div>

        {/* 답변 보기 섹션 */}
        <div className="space-y-4">
          {/* 전체 답 보기 버튼 */}
          <div className="bg-card border border-border rounded-2xl shadow-sm p-6">
            <Button
              onClick={() => setShowAllAnswers(!showAllAnswers)}
              variant="ghost"
              className="w-full flex items-center justify-between p-4 h-auto text-left"
            >
              <div className="flex items-center gap-2">
                <Target size={18} className="text-soft-blue" />
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
                {result.answers.map((answer, index) => {
                  const question = findQuestionById(answer.questionId)
                  if (!question) return null

                  const selectedChoiceText = findChoiceTextById(question, answer.selectedAnswerId)
                  const correctChoiceText = findChoiceTextById(question, answer.correctAnswerId)
                  
                  return (
                    <div
                      key={answer.questionId}
                      className={`p-4 rounded-lg border ${
                        answer.isCorrect 
                          ? 'bg-mint/10 border-mint/30' 
                          : 'bg-coral/10 border-coral/30'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`inline-flex items-center justify-center w-6 h-6 text-sm font-bold rounded-full ${
                          answer.isCorrect 
                            ? 'bg-mint/20 text-mint' 
                            : 'bg-coral/20 text-coral'
                        }`}>
                          {index + 1}
                        </span>
                        <span className="text-sm text-foreground">
                          문제 #{index + 1}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          answer.isCorrect 
                            ? 'bg-mint/20 text-mint' 
                            : 'bg-coral/20 text-coral'
                        }`}>
                          {answer.isCorrect ? '정답' : '오답'}
                        </span>
                      </div>

                      {/* 문제 이미지 (face2text, eyes2text만) */}
                      {question.image && (question.type === 'face2text' || question.type === 'eyes2text') && (
                        <div className="mb-3">
                          <img 
                            src={question.image} 
                            alt={`문제 ${index + 1} 이미지`}
                            className="w-20 h-20 object-cover rounded-lg border border-border"
                          />
                        </div>
                      )}

                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className={`mt-0.5 ${answer.isCorrect ? 'text-mint' : 'text-coral'}`}>
                            {answer.isCorrect ? '✅' : '❌'}
                          </span>
                          <div>
                            <span className="text-foreground">
                              당신의 답:{' '}
                            </span>
                            <span className={`font-medium ${
                              answer.isCorrect ? 'text-mint' : 'text-coral'
                            }`}>
                              {selectedChoiceText}
                            </span>
                          </div>
                        </div>

                        {!answer.isCorrect && (
                          <div className="flex items-start gap-2">
                            <span className="text-mint mt-0.5">✅</span>
                            <div>
                              <span className="text-foreground">
                                정답:{' '}
                              </span>
                              <span className="font-medium text-mint">
                                {correctChoiceText}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* 해설 표시 */}
                        {question.explanation && (
                          <div className="mt-3 p-3 bg-background/50 rounded-lg border border-border">
                            <div className="text-xs text-muted-foreground mb-1">💡 해설</div>
                            <div className="text-sm text-foreground">
                              {getExplanationByLanguage(question.explanation)}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RewardScreen