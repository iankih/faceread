import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// shadcn/ui cn 함수
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 기존 유틸리티 함수들 복구

/**
 * 등급 계산 함수 (PRD 3.2 기준)
 */
export const calculateGrade = (score: number): string => {
  if (score >= 9) return 'master'
  if (score >= 6) return 'expert'
  if (score >= 3) return 'rookie'
  return 'novice'
}

/**
 * 등급 정보 객체 반환 (공유 기능용)
 */
export interface GradeInfo {
  grade: string
  shareImage: string
}

export const getGradeInfo = (score: number): GradeInfo => {
  const grade = calculateGrade(score)
  return {
    grade,
    shareImage: `/share/${grade}.jpg`
  }
}

/**
 * 공유 텍스트 생성 함수
 */
export const generateShareText = (grade: string, score: number, nickname: string, language: string = 'ko'): string => {
  const gradeTexts = {
    ko: {
      master: '감정 탐정 마스터',
      expert: '감정 탐정 전문가', 
      rookie: '감정 탐정 초보자',
      novice: '감정 탐정 견습생'
    },
    en: {
      master: 'Emotion Detective Master',
      expert: 'Emotion Detective Expert',
      rookie: 'Emotion Detective Rookie', 
      novice: 'Emotion Detective Novice'
    },
    es: {
      master: 'Maestro Detective de Emociones',
      expert: 'Experto Detective de Emociones',
      rookie: 'Principiante Detective de Emociones',
      novice: 'Aprendiz Detective de Emociones'
    }
  }

  const shareTexts = {
    ko: `${nickname}님의 감정 인식 능력은 ${gradeTexts.ko[grade as keyof typeof gradeTexts.ko]}! (${score}/10점)
도전해보세요! https://faceread.app`,
    en: `${nickname}'s emotion recognition ability is ${gradeTexts.en[grade as keyof typeof gradeTexts.en]}! (${score}/10 points)
Try it! https://faceread.app`,
    es: `La habilidad de reconocimiento de emociones de ${nickname} es ${gradeTexts.es[grade as keyof typeof gradeTexts.es]}! (${score}/10 puntos)
¡Inténtalo! https://faceread.app`
  }

  return shareTexts[language as keyof typeof shareTexts] || shareTexts.ko
}

/**
 * 닉네임 검증 함수 (PRD 3.2 기준)
 */
export const validateNickname = (nickname: string): boolean => {
  const nicknameRegex = /^[A-Za-z0-9가-힣]{1,10}$/
  return nicknameRegex.test(nickname)
}

/**
 * 안전한 localStorage 래퍼
 */
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value)
      return true
    } catch {
      return false
    }
  },
  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  }
}

/**
 * 지연 함수
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 랜덤 배열 셔플 (Fisher-Yates 알고리즘)
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * 디바운스 함수
 */
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * 깊은 객체 복사
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T
  }
  
  if (typeof obj === 'object') {
    const cloned: any = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key])
      }
    }
    return cloned as T
  }
  
  return obj
}

/**
 * 포맷팅 유틸리티
 */
export const formatters = {
  percentage: (value: number, decimals: number = 1): string => {
    return `${value.toFixed(decimals)}%`
  },
  
  timeAgo: (timestamp: number): string => {
    const now = Date.now()
    const diff = now - timestamp
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days}일 전`
    if (hours > 0) return `${hours}시간 전`
    if (minutes > 0) return `${minutes}분 전`
    return `${seconds}초 전`
  },
  
  number: (value: number): string => {
    return value.toLocaleString()
  }
}
