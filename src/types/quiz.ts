// 감정 인식 퀴즈 타입 정의

export interface EmotionQuestion {
  id: string;
  type: 'face2text';
  image: string; // face2text에서 항상 사용
  emotionKey: string; // i18n 키 또는 감정 텍스트
  choices: AnswerChoice[];
  correctAnswer: string;
  explanation?: {
    ko: string;
    en: string;
    es: string;
  };
}

export interface AnswerChoice {
  id: string;
  text: string;
}

export interface UserAnswer {
  questionId: string;
  selectedAnswerId: string; // useQuiz와 호환
  correctAnswerId: string; // useQuiz와 호환
  isCorrect: boolean;
  timeSpent: number; // milliseconds
  timestamp?: number; // 선택적으로 변경
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  grade: string;
  answers: UserAnswer[]; // useQuiz와 호환
  correctAnswers: number; // useQuiz와 호환
  incorrectAnswers: UserAnswer[]; // useQuiz와 호환
  wrongAnswers?: WrongAnswer[]; // 기존 호환성 유지
  completedAt?: number; // 선택적으로 변경
}

export interface WrongAnswer {
  questionId: string;
  question: EmotionQuestion;
  selectedAnswer: string;
  correctAnswer: string;
  explanation: string;
}

export interface QuizState {
  // 앱 플로우 관리
  currentStep: AppStep;
  
  // 사용자 정보
  nickname: string;
  
  // 퀴즈 설정
  gameMode: QuizMode; // useQuiz와 호환
  mode?: QuizMode; // 기존 호환성 유지
  customRatios?: CustomRatios;
  language: SupportedLanguage;
  
  // 진행 상태
  currentQuestionIndex: number; // useQuiz와 호환
  currentQuestion?: number; // 기존 호환성 유지
  questions: EmotionQuestion[];
  answers: UserAnswer[];
  score: number; // useQuiz와 호환
  
  // 상태 플래그
  isQuizStarted: boolean; // useQuiz와 호환
  isQuizFinished: boolean; // useQuiz와 호환
  
  // 결과
  result?: QuizResult;
  
  // UI 상태
  isLoading: boolean;
  error: string | null;
}

export type QuizMode = 'standard' | 'integrated';
export type GameMode = QuizMode; // useQuiz 호환성을 위한 타입 별칭

export interface CustomRatios {
  face2text: number; // 0-1 범위
  text2face: number;
  eyes2text: number;
}

export type SupportedLanguage = 'ko' | 'en' | 'es';

// 앱 단계 타입 (단일 페이지 구조용)
export type AppStep = 'intro' | 'quiz' | 'result';

export interface QuizConfig {
  standardModeDistribution: {
    face2text: number;
    text2face: number;
    eyes2text: number;
  };
  totalQuestions: number;
  maxTimePerQuestion?: number; // seconds
}

// 퀴즈 액션 타입들
export type QuizAction = 
  | { type: 'SET_STEP'; payload: AppStep }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_NICKNAME'; payload: string }
  | { type: 'SET_MODE'; payload: QuizMode }
  | { type: 'SET_LANGUAGE'; payload: SupportedLanguage }
  | { type: 'SET_CUSTOM_RATIOS'; payload: CustomRatios }
  | { type: 'LOAD_QUESTIONS_START' }
  | { type: 'LOAD_QUESTIONS_SUCCESS'; payload: EmotionQuestion[] }
  | { type: 'LOAD_QUESTIONS_ERROR'; payload: string }
  | { type: 'ANSWER_QUESTION'; payload: UserAnswer }
  | { type: 'SUBMIT_ANSWER'; payload: UserAnswer } // useQuiz 호환
  | { type: 'START_QUIZ'; payload: { mode: QuizMode; language: SupportedLanguage } } // useQuiz 호환
  | { type: 'NEXT_QUESTION' } // useQuiz 호환
  | { type: 'FINISH_QUIZ' } // useQuiz 호환
  | { type: 'CALCULATE_RESULT' }
  | { type: 'RESET_QUIZ' }
  | { type: 'SET_ERROR'; payload: string | null };

// 등급 타입
export type GradeType = '감정 탐정 마스터' | '감정 탐정 전문가' | '감정 탐정 초보자' | '감정 탐정 견습생';

// 공유 관련 타입
export interface ShareData {
  title: string;
  text: string;
  url: string;
  grade: GradeType;
  score: number;
  nickname: string;
} 