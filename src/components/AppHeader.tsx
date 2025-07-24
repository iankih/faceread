import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuizContext } from '../contexts/QuizContext'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ThemeToggle from './ThemeToggle'
import type { SupportedLanguage } from '../types/quiz'

const AppHeader: React.FC = () => {
  const { i18n } = useTranslation()
  const { language, setStep } = useQuizContext()
  
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(
    language || (i18n.language as SupportedLanguage)
  )

  const languages = [
    { value: 'ko', label: '한국어', flag: '🇰🇷' },
    { value: 'en', label: 'English', flag: '🇺🇸' },
    // { value: 'es', label: 'Español', flag: '🇪🇸' }, // 스페인어 임시 비활성화
  ]

  const handleLanguageChange = (value: SupportedLanguage) => {
    setCurrentLanguage(value)
    i18n.changeLanguage(value)
  }

  const handleLogoClick = () => {
    setStep('intro')
  }

  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleLogoClick}
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-none">FaceRead</h1>
            <span className="text-xl sm:text-2xl md:text-3xl" role="img" aria-label="Theater masks representing emotions">🎭</span>
          </div>

          {/* 언어 선택 및 테마 토글 */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Select
              value={currentLanguage}
              onValueChange={handleLanguageChange}
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
      </div>
    </header>
  )
}

export default AppHeader