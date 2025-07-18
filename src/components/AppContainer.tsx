import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuizContext } from '../contexts/QuizContext'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
import AdBanner from './AdBanner'
import HomePage from '../pages/HomePage'
import QuizPage from '../pages/QuizPage'
import ResultPage from '../pages/ResultPage'
import type { AppStep } from '../types/quiz'

// 페이지 전환 애니메이션 설정
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
}

const pageTransition = {
  type: "tween",
  ease: "anticipate",  
  duration: 0.3
}

// Step별 컴포넌트 렌더링
const renderStepComponent = (step: AppStep) => {
  switch (step) {
    case 'intro':
      return <HomePage />
    case 'quiz':
      return <QuizPage />
    case 'result':
      return <ResultPage />
    default:
      return <HomePage />
  }
}

const AppContainer: React.FC = () => {
  const { currentStep } = useQuizContext()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 공통 헤더 */}
      <AppHeader />
      
      {/* 광고 배너 - 모든 페이지에 표시 */}
      <AdBanner />
      
      {/* 메인 컨텐츠 */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full h-full"
          >
            {renderStepComponent(currentStep)}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* 공통 푸터 */}
      <AppFooter />
    </div>
  )
}

export default AppContainer