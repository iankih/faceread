import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuizContext } from '../contexts/QuizContext'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
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
  type: "tween" as const,
  ease: "anticipate" as const,  
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
      
      {/* 
        [AdBanner 주석 처리 사유]
        - 일시 비활성화: 2025-07-22
        - 담당자: Gemini
        - 사유: 현재 광고 컨텐츠가 확정되지 않아, 구글 애드센스 심사 시 '미구현된 기능'으로 분류될 가능성이 있습니다.
                 정책 위반 소지를 없애기 위해 심사 전까지 임시로 주석 처리합니다.
                 추후 광고 컨텐츠가 준비되면 이 주석을 해제하고 AdBanner 컴포넌트를 다시 활성화해주세요.
      */}
      {/* <AdBanner /> */}
      
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