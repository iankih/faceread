import { useReducer, useCallback, useEffect } from 'react'
import { questionLoader } from '../lib/question-loader'
import type { 
  EmotionQuestion, 
  QuizState, 
  UserAnswer, 
  QuizResult, 
  GameMode,
  SupportedLanguage 
} from '../types/quiz'

// 퀴즈 액션 타입 정의
type QuizAction = 
  | { type: 'LOAD_QUESTIONS_START' }
  | { type: 'LOAD_QUESTIONS_SUCCESS'; payload: EmotionQuestion[] }
  | { type: 'LOAD_QUESTIONS_ERROR'; payload: string }
  | { type: 'START_QUIZ'; payload: { mode: GameMode; language: SupportedLanguage } }
  | { type: 'SUBMIT_ANSWER'; payload: UserAnswer }
  | { type: 'NEXT_QUESTION' }
  | { type: 'FINISH_QUIZ' }
  | { type: 'RESET_QUIZ' }
  | { type: 'SET_NICKNAME'; payload: string }

// 초기 상태
const initialState: QuizState = {
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

// 등급 계산 함수 (PRD 3.2 기준)
const calculateGrade = (score: number): string => {
  if (score >= 9) return 'master'
  if (score >= 6) return 'expert'
  if (score >= 3) return 'rookie'
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

// 표준 모드 문제 선정 (face→text 4, text→face 3, eyes→text 3)
const selectStandardModeQuestions = (questions: EmotionQuestion[]): EmotionQuestion[] => {
  const faceToText = questions.filter(q => q.type === 'face2text')
  const textToFace = questions.filter(q => q.type === 'text2face')
  const eyesToText = questions.filter(q => q.type === 'eyes2text')
  
  const selectedQuestions = [
    ...shuffleArray(faceToText).slice(0, 4),
    ...shuffleArray(textToFace).slice(0, 3),
    ...shuffleArray(eyesToText).slice(0, 3)
  ]
  
  return shuffleArray(selectedQuestions)
}

// 통합 모드 문제 선정 (현재는 표준 모드와 동일, 추후 슬라이더 구현 시 확장)
const selectIntegratedModeQuestions = (questions: EmotionQuestion[]): EmotionQuestion[] => {
  return shuffleArray(questions).slice(0, 10)
}

// 퀴즈 리듀서
const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
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
      const newAnswers = [...state.answers, action.payload]
      const newScore = calculateScore(newAnswers)
      
      return {
        ...state,
        answers: newAnswers,
        score: newScore
      }
    }
      
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1
      }
      
    case 'FINISH_QUIZ':
      return {
        ...state,
        isQuizFinished: true
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
    const currentQuestion = state.questions[state.currentQuestionIndex]
    if (!currentQuestion) return
    
    const isCorrect = currentQuestion.correctAnswer === selectedAnswerId
    const answer: UserAnswer = {
      questionId,
      selectedAnswerId,
      correctAnswerId: currentQuestion.correctAnswer,
      isCorrect,
      timeSpent: 0 // TODO: 시간 측정 기능 추가
    }
    
    dispatch({ type: 'SUBMIT_ANSWER', payload: answer })
    
    // 다음 문제로 이동 또는 퀴즈 종료
    setTimeout(() => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        dispatch({ type: 'NEXT_QUESTION' })
      } else {
        dispatch({ type: 'FINISH_QUIZ' })
      }
    }, 1200) // 1.2초 후 자동 진행 (사용자가 결과를 확인할 시간)
  }, [state.currentQuestionIndex, state.questions])
  
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
  
  // 퀴즈 리셋
  const resetQuiz = useCallback(() => {
    dispatch({ type: 'RESET_QUIZ' })
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
    
    // 유틸리티
    calculateGrade,
    
    // 통계
    totalQuestions: state.questions.length,
    answeredQuestions: state.answers.length,
    remainingQuestions: state.questions.length - state.currentQuestionIndex - 1
  }
}

export default useQuiz 