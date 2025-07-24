import { useReducer, useCallback, useEffect } from 'react'
import { questionLoader } from '../lib/question-loader'
import type { 
  EmotionQuestion, 
  QuizState, 
  UserAnswer, 
  QuizResult, 
  GameMode,
  SupportedLanguage,
  QuizAction,
  AppStep
} from '../types/quiz'

// QuizAction은 types/quiz.ts에서 import

// 초기 상태
const initialState: QuizState = {
  currentStep: 'intro',
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  score: 0,
  isLoading: false,
  error: null,
  gameMode: 'standard',
  language: 'ko',
  nickname: '',
  isQuizStarted: false,
  isQuizFinished: false
}

// 점수 계산 함수
const calculateScore = (answers: UserAnswer[]): number => {
  return answers.reduce((total, answer) => {
    return total + (answer.isCorrect ? 1 : 0)
  }, 0)
}

// 등급 계산 함수 (15문제 기준)
const calculateGrade = (score: number): string => {
  if (score >= 12) return 'master'
  if (score >= 8) return 'expert' 
  if (score >= 4) return 'rookie'
  return 'novice'
}

// 문제 셔플 함수 (Fisher-Yates algorithm)
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// 표준 모드 문제 선정 (face2text 15개)
const selectStandardModeQuestions = (questions: EmotionQuestion[]): EmotionQuestion[] => {
  const faceToText = questions.filter(q => q.type === 'face2text')
  return shuffleArray(faceToText).slice(0, 15)
}

// 통합 모드 문제 선정 (face2text 15개, 표준 모드와 동일)
const selectIntegratedModeQuestions = (questions: EmotionQuestion[]): EmotionQuestion[] => {
  const faceToText = questions.filter(q => q.type === 'face2text')
  return shuffleArray(faceToText).slice(0, 15)
}

// 퀴즈 리듀서
const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  console.log('=== REDUCER DEBUG ===')
  console.log('Action type:', action.type)
  console.log('Current state:', {
    currentStep: state.currentStep,
    currentQuestionIndex: state.currentQuestionIndex,
    questionsLength: state.questions.length,
    answersLength: state.answers.length,
    isQuizStarted: state.isQuizStarted,
    isQuizFinished: state.isQuizFinished
  })
  
  switch (action.type) {
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload
      }
      
    case 'NEXT_STEP': {
      const stepOrder: AppStep[] = ['intro', 'quiz', 'result']
      const currentIndex = stepOrder.indexOf(state.currentStep)
      const nextStep = stepOrder[currentIndex + 1]
      return nextStep ? { ...state, currentStep: nextStep } : state
    }
    
    case 'PREV_STEP': {
      const stepOrder: AppStep[] = ['intro', 'quiz', 'result']
      const currentIndex = stepOrder.indexOf(state.currentStep)
      const prevStep = stepOrder[currentIndex - 1]
      return prevStep ? { ...state, currentStep: prevStep } : state
    }
      
    case 'LOAD_QUESTIONS_START':
      return {
        ...state,
        isLoading: true,
        error: null
      }
      
    case 'LOAD_QUESTIONS_SUCCESS':
      return {
        ...state,
        questions: action.payload,
        isLoading: false,
        error: null
      }
      
    case 'LOAD_QUESTIONS_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
      
    case 'START_QUIZ': {
      const { mode, language } = action.payload
      let selectedQuestions: EmotionQuestion[]
      
      if (mode === 'standard') {
        selectedQuestions = selectStandardModeQuestions(state.questions)
      } else {
        selectedQuestions = selectIntegratedModeQuestions(state.questions)
      }
      
      return {
        ...state,
        currentStep: 'quiz' as AppStep,
        gameMode: mode,
        language,
        questions: selectedQuestions,
        currentQuestionIndex: 0,
        answers: [],
        score: 0,
        isQuizStarted: true,
        isQuizFinished: false
      }
    }
      
    case 'SUBMIT_ANSWER': {
      console.log('SUBMIT_ANSWER reducer - payload:', action.payload)
      const newAnswers = [...state.answers, action.payload]
      const newScore = calculateScore(newAnswers)
      
      const newState = {
        ...state,
        answers: newAnswers,
        score: newScore
      }
      
      console.log('SUBMIT_ANSWER reducer - new state:', {
        answersLength: newAnswers.length,
        score: newScore,
        currentQuestionIndex: newState.currentQuestionIndex
      })
      
      return newState
    }
      
    case 'NEXT_QUESTION': {
      const newIndex = state.currentQuestionIndex + 1
      console.log('NEXT_QUESTION reducer - moving from index', state.currentQuestionIndex, 'to', newIndex)
      
      const newState = {
        ...state,
        currentQuestionIndex: newIndex
      }
      
      console.log('NEXT_QUESTION reducer - new state:', {
        currentQuestionIndex: newState.currentQuestionIndex,
        questionsLength: newState.questions.length
      })
      
      return newState
    }
      
    case 'FINISH_QUIZ': {
      console.log('FINISH_QUIZ reducer - finishing quiz')
      
      const newState = {
        ...state,
        currentStep: 'result' as AppStep,
        isQuizFinished: true
      }
      
      console.log('FINISH_QUIZ reducer - new state:', {
        currentStep: newState.currentStep,
        isQuizFinished: newState.isQuizFinished
      })
      
      return newState
    }
      
    case 'RESET_QUIZ':
      return {
        ...initialState,
        questions: state.questions // 문제는 유지
      }
      
    case 'SET_NICKNAME':
      return {
        ...state,
        nickname: action.payload
      }
      
    default:
      console.log('Unknown action type:', action.type)
      return state
  }
}

// useQuiz Hook
export const useQuiz = () => {
  const [state, dispatch] = useReducer(quizReducer, initialState)
  
  // 문제 로드
  const loadQuestions = useCallback(async (language: SupportedLanguage) => {
    dispatch({ type: 'LOAD_QUESTIONS_START' })
    
    try {
      const result = await questionLoader.loadQuestions(language)
      dispatch({ type: 'LOAD_QUESTIONS_SUCCESS', payload: result.questions })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '문제를 불러올 수 없습니다.'
      dispatch({ type: 'LOAD_QUESTIONS_ERROR', payload: errorMessage })
    }
  }, [])
  
  // 퀴즈 시작
  const startQuiz = useCallback((mode: GameMode, language: SupportedLanguage) => {
    dispatch({ type: 'START_QUIZ', payload: { mode, language } })
  }, [])
  
  // 답변 제출
  const submitAnswer = useCallback((questionId: string, selectedAnswerId: string) => {
    console.log('=== SUBMIT ANSWER DEBUG START ===')
    console.log('QuestionId:', questionId)
    console.log('SelectedAnswerId:', selectedAnswerId)
    console.log('Current state.currentQuestionIndex:', state.currentQuestionIndex)
    console.log('Questions length:', state.questions.length)
    console.log('Is quiz started:', state.isQuizStarted)
    console.log('Is quiz finished:', state.isQuizFinished)
    
    const currentQuestion = state.questions[state.currentQuestionIndex]
    if (!currentQuestion) {
      console.error('❌ No current question found at index:', state.currentQuestionIndex)
      console.log('Available questions:', state.questions.map(q => ({ id: q.id, type: q.type })))
      return
    }
    
    console.log('✅ Current question found:', {
      id: currentQuestion.id,
      type: currentQuestion.type,
      correctAnswer: currentQuestion.correctAnswer
    })
    
    const isCorrect = currentQuestion.correctAnswer === selectedAnswerId
    console.log('Answer correctness:', isCorrect)
    
    const answer: UserAnswer = {
      questionId,
      selectedAnswerId,
      correctAnswerId: currentQuestion.correctAnswer,
      isCorrect,
      timeSpent: 0 // TODO: 시간 측정 기능 추가
    }
    
    console.log('Dispatching SUBMIT_ANSWER with:', answer)
    dispatch({ type: 'SUBMIT_ANSWER', payload: answer })
    
    // 다음 문제로 이동 또는 퀴즈 종료 판단
    const isLastQuestion = state.currentQuestionIndex >= state.questions.length - 1
    console.log('Question progression check:')
    console.log('- Current index:', state.currentQuestionIndex)
    console.log('- Total questions:', state.questions.length)
    console.log('- Is last question:', isLastQuestion)
    
    if (isLastQuestion) {
      console.log('🏁 Quiz finished - dispatching FINISH_QUIZ')
      dispatch({ type: 'FINISH_QUIZ' })
    } else {
      console.log('➡️ Moving to next question - dispatching NEXT_QUESTION')
      dispatch({ type: 'NEXT_QUESTION' })
    }
    
    console.log('=== SUBMIT ANSWER DEBUG END ===')
  }, [state.currentQuestionIndex, state.questions, state.isQuizStarted, state.isQuizFinished])
  
  // 닉네임 설정
  const setNickname = useCallback((nickname: string) => {
    // PRD 3.2 닉네임 규칙 검증: ^[A-Za-z0-9가-힣]{1,10}$
    const nicknameRegex = /^[A-Za-z0-9가-힣]{1,10}$/
    if (nicknameRegex.test(nickname)) {
      dispatch({ type: 'SET_NICKNAME', payload: nickname })
      return true
    }
    return false
  }, [])
  
  // Step 관리 함수들
  const setStep = useCallback((step: AppStep) => {
    dispatch({ type: 'SET_STEP', payload: step })
  }, [])
  
  const nextStep = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' })
  }, [])
  
  const prevStep = useCallback(() => {
    dispatch({ type: 'PREV_STEP' })
  }, [])
  
  // 퀴즈 리셋
  const resetQuiz = useCallback(() => {
    dispatch({ type: 'RESET_QUIZ' })
  }, [])
  
  // 퀴즈 완전 재시작 (다시하기 버튼용)
  const resetToHome = useCallback(() => {
    console.log('🔄 Quiz restart initiated...')
    // 완전 초기화 - questions도 제거
    dispatch({ type: 'RESET_QUIZ' })
    dispatch({ type: 'LOAD_QUESTIONS_SUCCESS', payload: [] }) // questions 초기화
    dispatch({ type: 'SET_NICKNAME', payload: '' })
    dispatch({ type: 'SET_STEP', payload: 'intro' })
    console.log('✅ Quiz restart completed')
  }, [])
  
  // 현재 문제
  const currentQuestion = state.questions[state.currentQuestionIndex] || null
  
  // 퀴즈 결과
  const quizResult: QuizResult | null = state.isQuizFinished ? {
    score: state.score,
    grade: calculateGrade(state.score),
    answers: state.answers,
    totalQuestions: state.questions.length,
    correctAnswers: state.answers.filter(a => a.isCorrect).length,
    incorrectAnswers: state.answers.filter(a => !a.isCorrect)
  } : null
  
  // 퀴즈 진행률
  const progress = state.questions.length > 0 
    ? ((state.currentQuestionIndex + (state.isQuizFinished ? 1 : 0)) / state.questions.length) * 100 
    : 0
  
  // 언어 변경 시 문제 자동 로드 (초기 마운트 제외)
  useEffect(() => {
    // 초기 마운트 시에는 자동 로딩하지 않음
    // 사용자가 명시적으로 loadQuestions를 호출해야 함
  }, [])
  
  return {
    // 상태
    ...state,
    currentQuestion,
    quizResult,
    progress,
    
    // 액션
    loadQuestions,
    startQuiz,
    submitAnswer,
    setNickname,
    resetQuiz,
    
    // Step 관리
    setStep,
    nextStep,
    prevStep,
    resetToHome,
    restartQuiz: resetToHome, // 더 명확한 별칭
    
    // 유틸리티
    calculateGrade,
    
    // 통계
    totalQuestions: state.questions.length,
    answeredQuestions: state.answers.length,
    remainingQuestions: state.questions.length - state.currentQuestionIndex - 1
  }
}

export default useQuiz 