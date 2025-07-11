import { describe, it, expect, beforeEach, vi } from 'vitest'
import { QuestionLoader, questionLoader, questionLoaderUtils } from './question-loader'
import type { SupportedLanguage } from '../types/quiz'

// 테스트용 모킹 데이터
const mockQuestionData = {
  ko: [
    {
      id: 'test_ko_001',
      type: 'face2text' as const,
      image: '/test/happy.webp',
      emotionKey: 'happiness',
      choices: [
        { id: 'happy', text: '기쁨' },
        { id: 'sad', text: '슬픔' },
        { id: 'angry', text: '화남' },
        { id: 'surprised', text: '놀람' }
      ],
      correctAnswer: 'happy',
      explanation: {
        ko: '테스트 설명',
        en: 'Test explanation',
        es: 'Explicación de prueba'
      }
    }
  ],
  en: [
    {
      id: 'test_en_001',
      type: 'text2face' as const,
      emotionKey: 'Joy',
      choices: [
        { id: 'happy_face', text: 'A', image: '/test/happy.webp' },
        { id: 'sad_face', text: 'B', image: '/test/sad.webp' },
        { id: 'angry_face', text: 'C', image: '/test/angry.webp' },
        { id: 'fear_face', text: 'D', image: '/test/fear.webp' }
      ],
      correctAnswer: 'happy_face',
      explanation: {
        ko: '테스트 설명',
        en: 'Test explanation',
        es: 'Explicación de prueba'
      }
    }
  ],
  es: [
    {
      id: 'test_es_001',
      type: 'eyes2text' as const,
      image: '/test/angry_eyes.webp',
      emotionKey: 'ira',
      choices: [
        { id: 'angry', text: 'Ira' },
        { id: 'focused', text: 'Concentración' },
        { id: 'confused', text: 'Confusión' },
        { id: 'determined', text: 'Determinación' }
      ],
      correctAnswer: 'angry',
      explanation: {
        ko: '테스트 설명',
        en: 'Test explanation',
        es: 'Explicación de prueba'
      }
    }
  ]
}

// 동적 import 모킹
vi.mock('../data/questions.ko.json', () => ({
  default: mockQuestionData.ko
}))

vi.mock('../data/questions.en.json', () => ({
  default: mockQuestionData.en
}))

vi.mock('../data/questions.es.json', () => ({
  default: mockQuestionData.es
}))

describe('QuestionLoader - STEP 3 PoC', () => {
  let loader: QuestionLoader

  beforeEach(() => {
    loader = new QuestionLoader({
      cacheEnabled: true,
      fallbackLanguage: 'ko',
      maxRetries: 3
    })
    vi.clearAllMocks()
  })

  describe('동적 Import 기본 기능', () => {
    it('한국어 문제 데이터를 로드할 수 있어야 함', async () => {
      const result = await loader.loadQuestions('ko')
      
      expect(result.questions).toHaveLength(1)
      expect(result.language).toBe('ko')
      expect(result.questions[0].id).toBe('test_ko_001')
      expect(result.questions[0].type).toBe('face2text')
      expect(result.fromCache).toBe(false)
      expect(result.loadTime).toBeGreaterThan(0)
    })

    it('영어 문제 데이터를 로드할 수 있어야 함', async () => {
      const result = await loader.loadQuestions('en')
      
      expect(result.questions).toHaveLength(1)
      expect(result.language).toBe('en')
      expect(result.questions[0].id).toBe('test_en_001')
      expect(result.questions[0].type).toBe('text2face')
      expect(result.fromCache).toBe(false)
    })

    it('스페인어 문제 데이터를 로드할 수 있어야 함', async () => {
      const result = await loader.loadQuestions('es')
      
      expect(result.questions).toHaveLength(1)
      expect(result.language).toBe('es')
      expect(result.questions[0].id).toBe('test_es_001')
      expect(result.questions[0].type).toBe('eyes2text')
      expect(result.fromCache).toBe(false)
    })
  })

  describe('캐시 시스템', () => {
    it('두 번째 로드 시 캐시에서 데이터를 가져와야 함', async () => {
      // 첫 번째 로드
      const firstResult = await loader.loadQuestions('ko')
      expect(firstResult.fromCache).toBe(false)

      // 두 번째 로드 (캐시에서)
      const secondResult = await loader.loadQuestions('ko')
      expect(secondResult.fromCache).toBe(true)
      expect(secondResult.loadTime).toBeLessThan(firstResult.loadTime)
    })

    it('캐시 상태를 올바르게 반환해야 함', async () => {
      await loader.loadQuestions('ko')
      await loader.loadQuestions('en')
      
      const cacheStatus = loader.getCacheStatus()
      expect(cacheStatus).toHaveLength(2)
      expect(cacheStatus).toEqual(
        expect.arrayContaining([
          { language: 'ko', count: 1 },
          { language: 'en', count: 1 }
        ])
      )
    })

    it('캐시를 정리할 수 있어야 함', async () => {
      await loader.loadQuestions('ko')
      expect(loader.getCacheStatus()).toHaveLength(1)
      
      loader.clearCache()
      expect(loader.getCacheStatus()).toHaveLength(0)
    })

    it('특정 언어의 캐시만 정리할 수 있어야 함', async () => {
      await loader.loadQuestions('ko')
      await loader.loadQuestions('en')
      expect(loader.getCacheStatus()).toHaveLength(2)
      
      loader.clearLanguageCache('ko')
      const cacheStatus = loader.getCacheStatus()
      expect(cacheStatus).toHaveLength(1)
      expect(cacheStatus[0].language).toBe('en')
    })
  })

  describe('에러 처리 및 폴백', () => {
    it('존재하지 않는 언어에 대해 폴백 언어로 전환해야 함', async () => {
      // 잘못된 언어로 테스트 (TypeScript에서는 불가능하지만 런타임에서 가능)
      const invalidLanguage = 'invalid' as SupportedLanguage
      
      // 모킹된 import 함수를 실패하도록 설정
      vi.doMock(`../data/questions.${invalidLanguage}.json`, () => {
        throw new Error('Module not found')
      })

      const result = await loader.loadQuestions(invalidLanguage)
      
      // 폴백 언어(ko)로 전환되어야 함
      expect(result.language).toBe('ko')
      expect(result.questions).toHaveLength(1)
    })

    it('잘못된 데이터 형식에 대해 폴백 언어로 전환해야 함', async () => {
      // 존재하지 않는 언어 요청 시 폴백 동작 확인
      const result = await loader.loadQuestions('invalid' as SupportedLanguage)
      
      // 폴백 언어(ko)로 로드되어야 함
      expect(result.language).toBe('ko')
      expect(result.questions).toBeDefined()
      expect(result.questions.length).toBeGreaterThan(0)
    })
  })

  describe('데이터 검증', () => {
    it('올바른 문제 구조를 검증해야 함', async () => {
      const result = await loader.loadQuestions('ko')
      const question = result.questions[0]
      
      // 필수 필드 확인
      expect(question).toHaveProperty('id')
      expect(question).toHaveProperty('type')
      expect(question).toHaveProperty('choices')
      expect(question).toHaveProperty('correctAnswer')
      expect(question).toHaveProperty('explanation')
      
      // 선택지 개수 확인 (4개 여야 함)
      expect(question.choices).toHaveLength(4)
      
      // 타입 확인
      expect(['face2text', 'text2face', 'eyes2text']).toContain(question.type)
      
      // 설명 다국어 지원 확인
      expect(question.explanation).toHaveProperty('ko')
      expect(question.explanation).toHaveProperty('en')
      expect(question.explanation).toHaveProperty('es')
    })
  })

  describe('성능 최적화', () => {
    it('동시 로딩 요청을 중복 제거해야 함', async () => {
      const promises = [
        loader.loadQuestions('ko'),
        loader.loadQuestions('ko'),
        loader.loadQuestions('ko')
      ]
      
      const results = await Promise.all(promises)
      
      // 모든 결과가 동일해야 함
      expect(results[0].questions).toEqual(results[1].questions)
      expect(results[1].questions).toEqual(results[2].questions)
    })

    it('프리로드 기능이 작동해야 함', async () => {
      const results = await loader.preloadLanguages(['ko', 'en'])
      
      expect(results).toHaveLength(2)
      expect(results[0].language).toBe('ko')
      expect(results[1].language).toBe('en')
      
      // 프리로드 후 캐시에서 로드되는지 확인
      const cachedResult = await loader.loadQuestions('ko')
      expect(cachedResult.fromCache).toBe(true)
    })

    it('모든 언어 프리로드가 작동해야 함', async () => {
      const results = await loader.preloadAllLanguages()
      
      expect(results).toHaveLength(3) // ko, en, es
      expect(loader.getCacheStatus()).toHaveLength(3)
    })
  })

  describe('청크 크기 및 성능 메트릭', () => {
    it('청크 크기 정보를 반환해야 함', async () => {
      const result = await loader.loadQuestions('ko')
      
      expect(result.chunkSize).toBeDefined()
      expect(result.chunkSize).toBeGreaterThan(0)
      
      // 예상 크기 범위 내에 있는지 확인 (테스트 데이터이므로 작음)
      expect(result.chunkSize).toBeLessThan(10000) // 10KB 미만
    })

    it('로딩 시간을 측정해야 함', async () => {
      const result = await loader.loadQuestions('ko')
      
      expect(result.loadTime).toBeDefined()
      expect(result.loadTime).toBeGreaterThanOrEqual(0)
    })
  })
})

describe('QuestionLoaderUtils - 개발 도구', () => {
  beforeEach(() => {
    // 개발 환경 모킹
    (globalThis as any).import.meta.env.DEV = true
    vi.clearAllMocks()
  })

  describe('벤치마크 도구', () => {
    it('벤치마크 함수가 개발 환경에서만 실행되어야 함', async () => {
      const consoleSpy = vi.spyOn(console, 'table').mockImplementation(() => {})
      
      await questionLoaderUtils.benchmarkLoading()
      
      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })

    it('프로덕션 환경에서는 벤치마크를 실행하지 않아야 함', async () => {
      (globalThis as any).import.meta.env.DEV = false
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      
      await questionLoaderUtils.benchmarkLoading()
      
      expect(consoleSpy).toHaveBeenCalledWith('Benchmark is only available in development mode')
      consoleSpy.mockRestore()
    })
  })

  describe('캐시 효율성 테스트', () => {
    it('캐시 효율성을 측정해야 함', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      
      await questionLoaderUtils.testCacheEfficiency()
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'Cache efficiency test:',
        expect.objectContaining({
          'First load (cache miss)': expect.stringMatching(/\d+\.\d+ms/),
          'Second load (cache hit)': expect.stringMatching(/\d+\.\d+ms/),
          'Cache hit': true,
          'Speed improvement': expect.stringMatching(/\d+\.\d+%/)
        })
      )
      
      consoleSpy.mockRestore()
    })
  })
})

describe('싱글톤 인스턴스', () => {
  it('questionLoader 인스턴스가 올바르게 내보내져야 함', () => {
    expect(questionLoader).toBeInstanceOf(QuestionLoader)
  })

  it('전역 인스턴스를 통해 데이터를 로드할 수 있어야 함', async () => {
    const result = await questionLoader.loadQuestions('ko')
    
    expect(result.questions).toBeDefined()
    expect(result.language).toBe('ko')
  })
})

// STEP 3 PoC 통과 검증 테스트
describe('STEP 3 PoC 완료 검증', () => {
  it('언어별 JSON import가 성공적으로 작동해야 함', async () => {
    const languages: SupportedLanguage[] = ['ko', 'en', 'es']
    const results = []
    
    for (const language of languages) {
      const result = await questionLoader.loadQuestions(language)
      results.push(result)
      
      // 각 언어별로 올바른 데이터가 로드되는지 확인
      expect(result.questions).toBeDefined()
      expect(result.questions.length).toBeGreaterThan(0)
      expect(result.language).toBe(language)
      expect(result.loadTime).toBeGreaterThanOrEqual(0)
    }
    
    // 모든 언어가 성공적으로 로드되었는지 확인
    expect(results).toHaveLength(3)
    console.log('✅ STEP 3 PoC 검증 완료: 언어별 JSON import 성공')
  })

  it('캐시 시스템이 성능 목표를 달성해야 함', async () => {
    // 첫 번째 로드 (네트워크)
    const firstLoad = await questionLoader.loadQuestions('ko')
    
    // 두 번째 로드 (캐시)
    const secondLoad = await questionLoader.loadQuestions('ko')
    
    // 캐시 히트가 더 빨라야 함
    expect(secondLoad.fromCache).toBe(true)
    expect(secondLoad.loadTime).toBeLessThan(firstLoad.loadTime)
    
    // 성능 개선 비율 계산
    const improvement = (firstLoad.loadTime - secondLoad.loadTime) / firstLoad.loadTime * 100
    expect(improvement).toBeGreaterThan(0)
    
    console.log(`✅ 캐시 성능 개선: ${improvement.toFixed(1)}%`)
  })

  it('데이터 구조가 PRD 요구사항을 충족해야 함', async () => {
    const result = await questionLoader.loadQuestions('ko')
    const question = result.questions[0]
    
    // data-structure 규칙에 따른 검증
    expect(question.id).toBeDefined()
    expect(['face2text', 'text2face', 'eyes2text']).toContain(question.type)
    expect(question.choices).toHaveLength(4)
    expect(question.correctAnswer).toBeDefined()
    expect(question.explanation).toHaveProperty('ko')
    expect(question.explanation).toHaveProperty('en')
    expect(question.explanation).toHaveProperty('es')
    
    console.log('✅ 데이터 구조 검증 완료: PRD 요구사항 충족')
  })
}) 