import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useQuiz } from './useQuiz'
import { questionLoader } from '../lib/question-loader'
import type { EmotionQuestion } from '../types/quiz'

// QuestionLoader 모킹
vi.mock('../lib/question-loader', () => ({
  questionLoader: {
    loadQuestions: vi.fn()
  }
}))

const mockQuestionLoader = vi.mocked(questionLoader)

// 테스트용 문제 데이터 - face2text 타입만 지원
const createMockQuestion = (id: string): EmotionQuestion => ({
  id,
  type: 'face2text',
  image: `/images/face2text/${id}.jpg`,
  emotionKey: 'happiness',
  choices: [
    { id: 'happy', text: 'A. 기쁨' },
    { id: 'sad', text: 'B. 슬픔' },
    { id: 'angry', text: 'C. 화남' },
    { id: 'neutral', text: 'D. 무표정' }
  ],
  correctAnswer: 'happy',
  explanation: {
    ko: '이것은 기쁨의 표정입니다.',
    en: 'This is an expression of happiness.',
    es: 'Esta es una expresión de felicidad.'
  }
})

const mockQuestions: EmotionQuestion[] = [
  // face2text 문제들 (10개)
  createMockQuestion('face1'),
  createMockQuestion('face2'),
  createMockQuestion('face3'),
  createMockQuestion('face4'),
  createMockQuestion('face5'),
  createMockQuestion('face6'),
  createMockQuestion('face7'),
  createMockQuestion('face8'),
  createMockQuestion('face9'),
  createMockQuestion('face10'),
  createMockQuestion('face11'), // 추가 문제들
  createMockQuestion('face12'),
  createMockQuestion('face13')
]

describe('useQuiz Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // QuestionLoader 모킹 설정
    mockQuestionLoader.loadQuestions.mockResolvedValue({
      questions: mockQuestions,
      fromCache: false,
      loadTime: 100,
      language: 'ko'
    })
  })

  describe('초기 상태', () => {
    it('초기 상태가 올바르게 설정되어야 한다', () => {
      const { result } = renderHook(() => useQuiz())
      
      expect(result.current.questions).toEqual([])
      expect(result.current.currentQuestionIndex).toBe(0)
      expect(result.current.answers).toEqual([])
      expect(result.current.score).toBe(0)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeNull()
      expect(result.current.gameMode).toBe('standard')
      expect(result.current.language).toBe('ko')
      expect(result.current.nickname).toBe('')
      expect(result.current.isQuizStarted).toBe(false)
      expect(result.current.isQuizFinished).toBe(false)
      expect(result.current.currentQuestion).toBeNull()
      expect(result.current.quizResult).toBeNull()
      expect(result.current.progress).toBe(0)
    })
  })

  describe('문제 로딩', () => {
    it('한국어 문제를 성공적으로 로드해야 한다', async () => {
      const { result } = renderHook(() => useQuiz())
      
      await act(async () => {
        await result.current.loadQuestions('ko')
      })
      
      await waitFor(() => {
        expect(result.current.questions).toEqual(mockQuestions)
        expect(result.current.isLoading).toBe(false)
        expect(result.current.error).toBeNull()
      })
      
      expect(mockQuestionLoader.loadQuestions).toHaveBeenCalledWith('ko')
    })

    it('문제 로딩 실패 시 에러를 처리해야 한다', async () => {
      const errorMessage = '문제 로딩 실패'
      mockQuestionLoader.loadQuestions.mockRejectedValue(new Error(errorMessage))
      
      const { result } = renderHook(() => useQuiz())
      
      await act(async () => {
        await result.current.loadQuestions('ko')
      })
      
      await waitFor(() => {
        expect(result.current.error).toBe(errorMessage)
        expect(result.current.isLoading).toBe(false)
      })
    })

    it('명시적으로 loadQuestions를 호출해야 한다', async () => {
      const { result } = renderHook(() => useQuiz())
      
      // 초기에는 자동 로딩하지 않음
      expect(mockQuestionLoader.loadQuestions).not.toHaveBeenCalled()
      
      // 명시적으로 호출해야 함
      await act(async () => {
        await result.current.loadQuestions('ko')
      })
      
      expect(mockQuestionLoader.loadQuestions).toHaveBeenCalledWith('ko')
    })
  })

  describe('퀴즈 시작', () => {
    it('표준 모드로 퀴즈를 시작해야 한다', async () => {
      const { result } = renderHook(() => useQuiz())
      
      // 먼저 문제 로드
      await act(async () => {
        await result.current.loadQuestions('ko')
      })
      
      await waitFor(() => {
        expect(result.current.questions).toEqual(mockQuestions)
      })
      
      // 퀴즈 시작
      act(() => {
        result.current.startQuiz('standard', 'ko')
      })
      
      expect(result.current.isQuizStarted).toBe(true)
      expect(result.current.gameMode).toBe('standard')
      expect(result.current.language).toBe('ko')
      expect(result.current.questions).toHaveLength(10) // 표준 모드는 10문제
      expect(result.current.currentQuestionIndex).toBe(0)
      
      // 문제 유형 확인 (face2text만 지원)
      const questionTypes = result.current.questions.map(q => q.type)
      const face2textCount = questionTypes.filter(type => type === 'face2text').length
      
      expect(face2textCount).toBe(10) // 모든 문제가 face2text
    })

    it('통합 모드로 퀴즈를 시작해야 한다', async () => {
      const { result } = renderHook(() => useQuiz())
      
      await act(async () => {
        await result.current.loadQuestions('ko')
      })
      
      await waitFor(() => {
        expect(result.current.questions).toEqual(mockQuestions)
      })
      
      act(() => {
        result.current.startQuiz('integrated', 'ko')
      })
      
      expect(result.current.isQuizStarted).toBe(true)
      expect(result.current.gameMode).toBe('integrated')
      expect(result.current.questions).toHaveLength(10) // 통합 모드도 10문제
    })
  })

  describe('랜덤성 테스트 (STEP 4 핵심 요구사항)', () => {
    it('같은 조건에서 여러 번 시작할 때 문제 순서가 달라야 한다', async () => {
      const questionOrders: string[][] = []
      
      // 10번 반복해서 문제 순서 기록
      for (let i = 0; i < 10; i++) {
        const { result } = renderHook(() => useQuiz())
        
        await act(async () => {
          await result.current.loadQuestions('ko')
        })
        
        await waitFor(() => {
          expect(result.current.questions).toEqual(mockQuestions)
        })
        
        act(() => {
          result.current.startQuiz('standard', 'ko')
        })
        
        const questionIds = result.current.questions.map(q => q.id)
        questionOrders.push(questionIds)
      }
      
      // 적어도 한 번은 순서가 달라야 함 (랜덤성 확인)
      const firstOrder = questionOrders[0]
      const hasVariation = questionOrders.some(order => 
        !order.every((id, index) => id === firstOrder[index])
      )
      
      expect(hasVariation).toBe(true)
    })

    it('중복 ID 없음을 보장해야 한다', async () => {
      const { result } = renderHook(() => useQuiz())
      
      await act(async () => {
        await result.current.loadQuestions('ko')
      })
      
      await waitFor(() => {
        expect(result.current.questions).toEqual(mockQuestions)
      })
      
      act(() => {
        result.current.startQuiz('standard', 'ko')
      })
      
      const questionIds = result.current.questions.map(q => q.id)
      const uniqueIds = new Set(questionIds)
      
      expect(uniqueIds.size).toBe(questionIds.length) // 중복 없음
    })

    it('여러 언어에서 일관된 랜덤성을 보여야 한다', async () => {
      const languages = ['ko', 'en', 'es'] as const
      
      for (const language of languages) {
        const { result } = renderHook(() => useQuiz())
        
        await act(async () => {
          await result.current.loadQuestions(language)
        })
        
        await waitFor(() => {
          expect(mockQuestionLoader.loadQuestions).toHaveBeenCalledWith(language)
        })
        
        act(() => {
          result.current.startQuiz('standard', language)
        })
        
        expect(result.current.questions).toHaveLength(10)
        expect(result.current.language).toBe(language)
      }
    })
  })

  describe('답변 제출', () => {
    it('정답 제출 시 점수가 증가해야 한다', async () => {
      const { result } = renderHook(() => useQuiz())
      
      await act(async () => {
        await result.current.loadQuestions('ko')
      })
      
      await waitFor(() => {
        expect(result.current.questions).toEqual(mockQuestions)
      })
      
      act(() => {
        result.current.startQuiz('standard', 'ko')
      })
      
      const firstQuestion = result.current.questions[0]
      
      act(() => {
        result.current.submitAnswer(firstQuestion.id, firstQuestion.correctAnswer)
      })
      
      expect(result.current.answers).toHaveLength(1)
      expect(result.current.answers[0].isCorrect).toBe(true)
      expect(result.current.score).toBe(1)
    })

    it('오답 제출 시 점수가 증가하지 않아야 한다', async () => {
      const { result } = renderHook(() => useQuiz())
      
      await act(async () => {
        await result.current.loadQuestions('ko')
      })
      
      await waitFor(() => {
        expect(result.current.questions).toEqual(mockQuestions)
      })
      
      act(() => {
        result.current.startQuiz('standard', 'ko')
      })
      
      const firstQuestion = result.current.questions[0]
      const wrongAnswer = firstQuestion.choices.find(c => c.id !== firstQuestion.correctAnswer)!
      
      act(() => {
        result.current.submitAnswer(firstQuestion.id, wrongAnswer.id)
      })
      
      expect(result.current.answers).toHaveLength(1)
      expect(result.current.answers[0].isCorrect).toBe(false)
      expect(result.current.score).toBe(0)
    })

    it('자동 진행이 올바르게 작동해야 한다', async () => {
      vi.useFakeTimers()
      
      const { result } = renderHook(() => useQuiz())
      
      await act(async () => {
        await result.current.loadQuestions('ko')
      })
      
      await waitFor(() => {
        expect(result.current.questions).toEqual(mockQuestions)
      })
      
      act(() => {
        result.current.startQuiz('standard', 'ko')
      })
      
      const initialIndex = result.current.currentQuestionIndex
      const firstQuestion = result.current.questions[0]
      
      act(() => {
        result.current.submitAnswer(firstQuestion.id, firstQuestion.correctAnswer)
      })
      
      // 1.2초 후 다음 문제로 이동
      act(() => {
        vi.advanceTimersByTime(1200)
      })
      
      expect(result.current.currentQuestionIndex).toBe(initialIndex + 1)
      
      vi.useRealTimers()
    })
  })

  describe('닉네임 설정', () => {
    it('유효한 닉네임을 설정해야 한다', () => {
      const { result } = renderHook(() => useQuiz())
      
      act(() => {
        const success = result.current.setNickname('테스터123')
        expect(success).toBe(true)
      })
      
      expect(result.current.nickname).toBe('테스터123')
    })

    it('무효한 닉네임을 거부해야 한다', () => {
      const { result } = renderHook(() => useQuiz())
      
      // 특수문자 포함
      act(() => {
        const success = result.current.setNickname('테스터@123')
        expect(success).toBe(false)
      })
      
      expect(result.current.nickname).toBe('')
      
      // 11자 초과
      act(() => {
        const success = result.current.setNickname('아주긴닉네임입니다')
        expect(success).toBe(false)
      })
      
      expect(result.current.nickname).toBe('')
    })
  })

  describe('퀴즈 완료', () => {
    it('모든 문제 완료 시 퀴즈가 종료되어야 한다', async () => {
      vi.useFakeTimers()
      
      const { result } = renderHook(() => useQuiz())
      
      await act(async () => {
        await result.current.loadQuestions('ko')
      })
      
      await waitFor(() => {
        expect(result.current.questions).toEqual(mockQuestions)
      })
      
      act(() => {
        result.current.startQuiz('standard', 'ko')
      })
      
      // 모든 문제에 답변
      for (let i = 0; i < result.current.questions.length; i++) {
        const question = result.current.questions[i]
        
        act(() => {
          result.current.submitAnswer(question.id, question.correctAnswer)
        })
        
        if (i < result.current.questions.length - 1) {
          act(() => {
            vi.advanceTimersByTime(1200)
          })
        }
      }
      
      // 마지막 문제 후 퀴즈 완료
      act(() => {
        vi.advanceTimersByTime(1200)
      })
      
      expect(result.current.isQuizFinished).toBe(true)
      expect(result.current.quizResult).not.toBeNull()
      expect(result.current.quizResult?.score).toBe(10) // 모든 문제 정답
      
      vi.useRealTimers()
    })

    it('등급이 올바르게 계산되어야 한다', async () => {
      const { result } = renderHook(() => useQuiz())
      
      await act(async () => {
        await result.current.loadQuestions('ko')
      })
      
      await waitFor(() => {
        expect(result.current.questions).toEqual(mockQuestions)
      })
      
      act(() => {
        result.current.startQuiz('standard', 'ko')
      })
      
      // 6점 (전문가 등급)
      const questions = result.current.questions.slice(0, 6)
      questions.forEach(question => {
        act(() => {
          result.current.submitAnswer(question.id, question.correctAnswer)
        })
      })
      
      // 나머지는 오답
      const remainingQuestions = result.current.questions.slice(6)
      remainingQuestions.forEach(question => {
        const wrongAnswer = question.choices.find(c => c.id !== question.correctAnswer)!
        act(() => {
          result.current.submitAnswer(question.id, wrongAnswer.id)
        })
      })
      
      expect(result.current.score).toBe(6)
      expect(result.current.calculateGrade(6)).toBe('expert')
    })
  })

  describe('퀴즈 리셋', () => {
    it('퀴즈를 리셋해야 한다', async () => {
      const { result } = renderHook(() => useQuiz())
      
      await act(async () => {
        await result.current.loadQuestions('ko')
      })
      
      await waitFor(() => {
        expect(result.current.questions).toEqual(mockQuestions)
      })
      
      act(() => {
        result.current.startQuiz('standard', 'ko')
      })
      
      // 답변 제출
      const firstQuestion = result.current.questions[0]
      act(() => {
        result.current.submitAnswer(firstQuestion.id, firstQuestion.correctAnswer)
      })
      
      // 리셋
      act(() => {
        result.current.resetQuiz()
      })
      
      expect(result.current.currentQuestionIndex).toBe(0)
      expect(result.current.answers).toEqual([])
      expect(result.current.score).toBe(0)
      expect(result.current.isQuizStarted).toBe(false)
      expect(result.current.isQuizFinished).toBe(false)
      expect(result.current.questions).toEqual(mockQuestions) // 문제는 유지
    })
  })

  describe('진행률 계산', () => {
    it('진행률이 올바르게 계산되어야 한다', async () => {
      const { result } = renderHook(() => useQuiz())
      
      await act(async () => {
        await result.current.loadQuestions('ko')
      })
      
      await waitFor(() => {
        expect(result.current.questions).toEqual(mockQuestions)
      })
      
      act(() => {
        result.current.startQuiz('standard', 'ko')
      })
      
      expect(result.current.progress).toBe(0) // 시작 시 0%
      
      // 첫 번째 문제 답변
      const firstQuestion = result.current.questions[0]
      act(() => {
        result.current.submitAnswer(firstQuestion.id, firstQuestion.correctAnswer)
      })
      
      expect(result.current.progress).toBe(10) // 1/10 = 10%
    })
  })
}) 