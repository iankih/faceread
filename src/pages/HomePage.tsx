import React, { useState } from 'react'
import { useQuizContext } from '../contexts/QuizContext'
import { Button } from '@/components/ui/button'
import ShareButtons from '../components/ShareButtons'
import { User } from 'lucide-react'
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
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6">
          {/* 히어로 카드 - 컴팩트하게 */}
          <div className="w-full max-w-sm bg-card rounded-2xl p-6 shadow-lg border border-border">
            {/* 아이콘 + 제목 */}
            <div className="text-center mb-6">
              <div className="text-4xl sm:text-5xl mb-3">🎭</div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-tight">{t('quiz.title')}</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">{t('quiz.description')}</p>
            </div>

            {/* 닉네임 입력 - 더 큰 터치 영역 */}
            <div className="mb-4">
              <div className="relative flex items-center">
                <User className="absolute left-3 text-muted-foreground" size={20} />
                <input
                  type="text"
                  id="nickname"
                  value={nickname}
                  onChange={(e) => setNicknameInput(e.target.value)}
                  placeholder={t('nickname.placeholder')}
                  className="w-full h-12 pl-10 pr-4 bg-input border-2 border-border rounded-xl outline-none transition-all duration-200 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-3 focus:ring-primary/20"
                  maxLength={10}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {t('nickname.hint')}
              </p>
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* 시작 버튼 - 골든 옐로우 */}
            <Button
              onClick={handleStartQuiz}
              disabled={isLoading}
              size="lg"
              variant="default"
              className="w-full h-12 bg-primary text-foreground font-semibold rounded-xl hover:bg-primary-dark hover:scale-[1.02] transition-all duration-200"
            >
              {isLoading ? t('quiz.loading') : t('quiz.start')}
            </Button>

            {/* 공유 버튼 영역 */}
            <div className="mt-6 text-center">
              <ShareButtons shareText={homeShareText} shareUrl={homeShareUrl} />
            </div>
          </div>
          
          {/* FAQ는 접기 가능하게 */}
          <div className="w-full max-w-sm">
            <FAQ />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage