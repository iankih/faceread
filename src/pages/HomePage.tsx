import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuizContext } from '../contexts/QuizContext'
import { Button } from '@/components/ui/button'
import AdBanner from '../components/AdBanner'
import ShareButtons from '../components/ShareButtons'
import { Play, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { SupportedLanguage } from '../types/quiz'
import FAQ from '../components/FAQ' // FAQ 컴포넌트 임포트

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const { loadQuestions, setNickname } = useQuizContext()
  const { t, i18n } = useTranslation()

  const [nickname, setNicknameInput] = useState('')
  const [language, setLanguage] = useState<SupportedLanguage>(
    i18n.language as SupportedLanguage
  )
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
      navigate('/quiz', {
        state: {
          gameMode: 'standard',
          language,
          nickname: nickname.trim(),
        },
      })
    } catch (err) {
      setError(t('quiz.error.load'))
    } finally {
      setIsLoading(false)
    }
  }

  const languages = [
    { value: 'ko', label: '한국어', flag: '🇰🇷' },
    { value: 'en', label: 'English', flag: '🇺🇸' },
    // { value: 'es', label: 'Español', flag: '🇪🇸' }, // 스페인어 임시 비활성화
  ]

  const homeShareText = t('share.homeText')
  const homeShareUrl = window.location.href

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 상단바 */}
      <header className="bg-background-light border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* 로고 */}
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">FaceRead</h1>
              <span className="text-2xl">🧠🫣</span>
            </div>

            {/* 언어 선택 */}
            <Select
              value={language}
              onValueChange={(value: SupportedLanguage) => {
                setLanguage(value as SupportedLanguage)
                i18n.changeLanguage(value)
              }}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.flag} {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* 광고 배너 */}
      <AdBanner />

      {/* 메인 컨텐츠 */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8">
          {/* Left Hero Visual */}
          <div className="flex-1 max-w-md w-full bg-background-light border border-gray-200 rounded-2xl shadow-sm p-8 flex items-center justify-center min-h-[300px]">
            <p className="text-foreground text-center">
              얼굴 감정 콜라주 / 애니 GIF / Lottie (비율 유지, 반투명 오버레이
              가능)
            </p>
          </div>

          {/* Right Section - 퀴즈 영역 */}
          <div className="flex-1 max-w-md w-full bg-background-light border border-gray-200 rounded-2xl shadow-sm p-8">
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
                  className="w-full pl-10 pr-4 py-3 bg-input rounded-lg outline-none border border-transparent focus:ring-0 hover:border-primary text-foreground placeholder-placeholder-light transition-all duration-200"
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
              className="w-full bg-primary text-white hover:bg-[#9e95ff] hover:border-primary cursor-pointer border-2 border-transparent"
            >
              <Play size={18} className="mr-2" />
              {isLoading ? t('quiz.loading') : t('quiz.start')}
            </Button>

            {/* 공유 버튼 영역 */}
            <div className="mt-6 text-center">
              <div className="text-center text-sm font-medium text-gray-600 mb-3">
                {t('share.titleHome')}
              </div>
              <ShareButtons shareText={homeShareText} shareUrl={homeShareUrl} />
            </div>
          </div>
        </div>

        {/* FAQ 섹션 */}
        <div className="mt-12">
          <FAQ />
        </div>
      </main>

      {/* 하단바 */}
      <footer className="mt-auto bg-input border-t border-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-foreground">
          <p>
            {t('footer.madeBy')} | {t('footer.version', { version: '0.1.0-beta' })}{' '}
            | {t('footer.build', { date: '2025-07-17' })} |{' '}
            {t('footer.contact', { email: 'support@faceread.com' })}
          </p>
          <p className="mt-1">
            <a href="#" className="hover:underline">
              {t('footer.privacyPolicy')}
            </a>{' '}
            |{' '}
            <a href="#" className="hover:underline">
              {t('footer.termsOfService')}
            </a>{' '}
            |{' '}
            <a
              href="https://github.com/your-repo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {t('footer.githubSource')}
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage