import React, { useState } from 'react'
import { useQuizContext } from '../contexts/QuizContext'
import { Button } from '@/components/ui/button'
import ShareButtons from '../components/ShareButtons'
import { Play, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import FAQ from '../components/FAQ' // FAQ 컴포넌트 임포트

const HomePage: React.FC = () => {
  const { loadQuestions, setNickname, setStep, language } = useQuizContext()
  const { t } = useTranslation()

  const [nickname, setNicknameInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleStartQuiz = async () => {
    if (!nickname.trim()) {
      setError(t('nickname.error.required'))
      return
    }

    const isValidNickname = setNickname(nickname.trim())
    if (!isValidNickname) {
      setError(t('nickname.error.invalid'))
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await loadQuestions(language)
      setStep('quiz')
    } catch (err) {
      setError(t('quiz.error.load'))
    } finally {
      setIsLoading(false)
    }
  }


  const homeShareText = t('share.homeText')
  const homeShareUrl = window.location.href

  return (
    <>
      {/* 메인 컨텐츠 */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8">
          {/* Left Hero Visual */}
          <div className="flex-1 max-w-md w-full bg-card border border-border rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center min-h-[300px]">
            <div className="text-6xl mb-4" role="img" aria-label="Emotion detection visualization">
              🎭✨
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2 text-center">
              {t('quiz.title')}
            </h3>
            <p className="text-foreground text-center opacity-80">
              {t('quiz.description')}
            </p>
          </div>

          {/* Right Section - 퀴즈 영역 */}
          <div className="flex-1 max-w-md w-full bg-card border border-border rounded-2xl shadow-sm p-8">
            <h2 className="text-left text-xl font-bold text-foreground mb-4">
              🎯 {t('quiz.title')}
            </h2>
            <p className="text-left text-foreground mb-6">
              {t('quiz.description')}
            </p>

            {/* 닉네임 입력 */}
            <div className="mb-6">
              <div className="relative flex items-center">
                <User className="absolute left-3 text-foreground" size={20} />
                <input
                  type="text"
                  id="nickname"
                  value={nickname}
                  onChange={(e) => setNicknameInput(e.target.value)}
                  placeholder={t('nickname.placeholder')}
                  className="w-full pl-10 pr-4 py-3 bg-input rounded-lg outline-none border border-transparent focus:ring-2 focus:ring-primary hover:border-primary text-foreground placeholder-placeholder-light transition-all duration-200"
                  maxLength={10}
                />
              </div>
              <p className="text-xs text-foreground mt-2">
                {t('nickname.hint')}
              </p>
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* 시작 버튼 */}
            <Button
              onClick={handleStartQuiz}
              disabled={isLoading}
              size="lg"
              variant="default"
              className="w-full"
            >
              <Play size={18} className="mr-2" />
              {isLoading ? t('quiz.loading') : t('quiz.start')}
            </Button>

            {/* 공유 버튼 영역 */}
            <div className="mt-6 text-center">
              <ShareButtons shareText={homeShareText} shareUrl={homeShareUrl} />
            </div>
          </div>
        </div>

        {/* FAQ 섹션 */}
        <div className="mt-12">
          <FAQ />
        </div>
      </div>
    </>
  )
}

export default HomePage