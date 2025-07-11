import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuizContext } from '../contexts/QuizContext'
import { Button } from '@/components/ui/button'
import type { SupportedLanguage, GameMode } from '../types/quiz'

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const { loadQuestions, setNickname } = useQuizContext()
  
  const [nickname, setNicknameInput] = useState('')
  const [language, setLanguage] = useState<SupportedLanguage>('ko')
  const [gameMode, setGameMode] = useState<GameMode>('standard')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleStartQuiz = async () => {
    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요.')
      return
    }

    const isValidNickname = setNickname(nickname.trim())
    if (!isValidNickname) {
      setError('닉네임은 영문, 한글, 숫자만 사용 가능하며 1-10자여야 합니다.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await loadQuestions(language)
      navigate('/quiz', { 
        state: { 
          gameMode, 
          language,
          nickname: nickname.trim()
        } 
      })
    } catch (err) {
      setError('문제를 불러오는데 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <header className="bg-primary text-white py-12 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">FaceRead</h1>
        <p className="text-xl opacity-90 mb-2">감정을 읽는 능력을 게임처럼 체험해보세요!</p>
        <p className="text-lg opacity-80">얼굴 표정과 감정을 맞추는 재미있는 퀴즈</p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            퀴즈 시작하기
          </h2>

          {/* Nickname Input */}
          <div className="mb-6">
            <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-2">
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNicknameInput(e.target.value)}
              placeholder="닉네임을 입력하세요 (1-10자)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              maxLength={10}
            />
            <p className="text-xs text-gray-500 mt-1">
              영문, 한글, 숫자만 사용 가능합니다.
            </p>
          </div>

          {/* Language Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              언어 선택
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'ko', label: '한국어' },
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Español' }
              ].map((lang) => (
                <Button
                  key={lang.value}
                  onClick={() => setLanguage(lang.value as SupportedLanguage)}
                  variant={language === lang.value ? "default" : "outline"}
                  className="w-full"
                >
                  {lang.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Game Mode Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              게임 모드
            </label>
            <div className="space-y-3">
              <Button
                onClick={() => setGameMode('standard')}
                variant={gameMode === 'standard' ? "default" : "outline"}
                className="w-full p-6 h-auto text-left justify-start"
                asChild
              >
                <div>
                  <div className="font-medium">표준 모드</div>
                  <div className="text-sm opacity-80 mt-1">
                    얼굴→감정 4문제 + 감정→얼굴 3문제 + 눈→감정 3문제 (총 10문제)
                  </div>
                </div>
              </Button>
              
              <Button
                onClick={() => setGameMode('integrated')}
                variant={gameMode === 'integrated' ? "default" : "outline"}
                className="w-full p-6 h-auto text-left justify-start"
                asChild
              >
                <div>
                  <div className="font-medium">통합 모드</div>
                  <div className="text-sm opacity-80 mt-1">
                    모든 유형에서 랜덤하게 10문제 출제
                  </div>
                </div>
              </Button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Start Button */}
          <Button
            onClick={handleStartQuiz}
            disabled={isLoading}
            size="lg"
            className="w-full"
          >
            {isLoading ? '문제 불러오는 중...' : '퀴즈 시작하기'}
          </Button>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-medium text-gray-800 mb-2">정확한 분석</h3>
            <p className="text-sm text-gray-600">
              얼굴 표정과 감정을 정확하게 분석하고 학습할 수 있습니다.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎮</span>
            </div>
            <h3 className="font-medium text-gray-800 mb-2">게임처럼 재미있게</h3>
            <p className="text-sm text-gray-600">
              퀴즈 형태로 재미있게 감정 인식 능력을 향상시킬 수 있습니다.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-medium text-gray-800 mb-2">결과 공유</h3>
            <p className="text-sm text-gray-600">
              결과를 친구들과 공유하고 함께 도전해보세요.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage 