import type { EmotionQuestion, SupportedLanguage } from '../types/quiz';
import { testQuestions } from '../data/test-questions';

/**
 * 언어별 문제 데이터 동적 로딩 시스템
 * STEP 3 PoC: 언어별 JSON import 테스트
 */

interface QuestionLoaderConfig {
  cacheEnabled: boolean;
  fallbackLanguage: SupportedLanguage;
  maxRetries: number;
}

interface LoadResult {
  questions: EmotionQuestion[];
  language: SupportedLanguage;
  loadTime: number;
  fromCache: boolean;
  chunkSize?: number;
}

export class QuestionLoader {
  private cache = new Map<SupportedLanguage, EmotionQuestion[]>();
  private loadingPromises = new Map<SupportedLanguage, Promise<EmotionQuestion[]>>();
  
  constructor(private config: QuestionLoaderConfig = {
    cacheEnabled: true,
    fallbackLanguage: 'ko',
    maxRetries: 3
  }) {}

  /**
   * 지정된 언어의 문제 데이터를 로드합니다
   * @param language 로드할 언어
   * @returns 문제 배열과 메타데이터
   */
  async loadQuestions(language: SupportedLanguage): Promise<LoadResult> {
    const startTime = performance.now();
    
    // 캐시 확인
    if (this.config.cacheEnabled && this.cache.has(language)) {
      const questions = this.cache.get(language)!;
      return {
        questions,
        language,
        loadTime: performance.now() - startTime,
        fromCache: true
      };
    }

    // 동시 로딩 방지 - 같은 언어에 대한 진행 중인 요청이 있는지 확인
    if (this.loadingPromises.has(language)) {
      const questions = await this.loadingPromises.get(language)!;
      return {
        questions,
        language,
        loadTime: performance.now() - startTime,
        fromCache: false
      };
    }

    // 새로운 로딩 프로세스 시작
    const loadingPromise = this.performLoad(language);
    this.loadingPromises.set(language, loadingPromise);

    try {
      const questions = await loadingPromise;
      
      // 캐시에 저장
      if (this.config.cacheEnabled) {
        this.cache.set(language, questions);
      }

      const loadTime = performance.now() - startTime;
      
      // 번들 사이즈 정보 로깅 (개발 환경에서만)
      if ((import.meta as any).env?.DEV) {
        console.log(`[QuestionLoader] ${language} loaded:`, {
          count: questions.length,
          loadTime: `${loadTime.toFixed(2)}ms`,
          estimated_size: `${JSON.stringify(questions).length} bytes`
        });
      }

      return {
        questions,
        language,
        loadTime,
        fromCache: false,
        chunkSize: JSON.stringify(questions).length
      };
    } catch (error) {
      // 폴백 언어로 재시도
      if (language !== this.config.fallbackLanguage) {
        console.warn(`[QuestionLoader] Failed to load ${language}, falling back to ${this.config.fallbackLanguage}`);
        return this.loadQuestions(this.config.fallbackLanguage);
      }
      
      throw new Error(`Failed to load questions for language: ${language}. ${error}`);
    } finally {
      // 로딩 프로미스 제거
      this.loadingPromises.delete(language);
    }
  }

  /**
   * 실제 파일 로딩 수행
   * @param language 로드할 언어
   * @returns 문제 배열
   */
  private async performLoad(language: SupportedLanguage): Promise<EmotionQuestion[]> {
    // 개발/테스트를 위해 임시 데이터 사용
    console.log(`[QuestionLoader] Using test data for development (language: ${language})`);
    return Promise.resolve(testQuestions);
    
    // 원래 로직 (주석 처리)
    /*
    let retries = 0;
    
    while (retries < this.config.maxRetries) {
      try {
        // 동적 import로 언어별 JSON 로딩
        // Vite가 코드 스플리팅을 위해 별도 청크로 분리함
        const module = await import(
          // @vite-ignore 
          `../data/questions.${language}.json`
        );
        
        // ES 모듈과 CommonJS 호환성
        const questions: EmotionQuestion[] = module.default || module;
        
        // 데이터 유효성 검증
        this.validateQuestions(questions, language);
        
        return questions;
      } catch (error) {
        retries++;
        if (retries >= this.config.maxRetries) {
          throw error;
        }
        
        // 재시도 전 잠시 대기
        await new Promise(resolve => setTimeout(resolve, 100 * retries));
      }
    }
    
    throw new Error(`Failed to load after ${this.config.maxRetries} retries`);
    */
  }

  /**
   * 로드된 문제 데이터의 유효성을 검증합니다
   * @param questions 검증할 문제 배열
   * @param language 언어 코드
   */
  /*
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _validateQuestions(_questions: EmotionQuestion[], _language: SupportedLanguage): void {
    if (!Array.isArray(_questions)) {
      throw new Error(`Invalid questions data for ${_language}: not an array`);
    }

    if (questions.length === 0) {
      throw new Error(`No questions found for language: ${language}`);
    }

    // 기본 구조 검증
    for (const question of questions) {
      if (!question.id || !question.type || !question.choices || !question.correctAnswer) {
        throw new Error(`Invalid question structure in ${language}: ${question.id || 'unknown'}`);
      }

      if (!['face2text', 'text2face', 'eyes2text'].includes(question.type)) {
        throw new Error(`Invalid question type: ${question.type}`);
      }

      if (question.choices.length !== 4) {
        throw new Error(`Question must have exactly 4 choices: ${question.id}`);
      }
    }
  }
  */

  /**
   * 캐시된 데이터를 모두 삭제합니다
   */
  clearCache(): void {
    this.cache.clear();
    console.log('[QuestionLoader] Cache cleared');
  }

  /**
   * 특정 언어의 캐시를 삭제합니다
   * @param language 삭제할 언어
   */
  clearLanguageCache(language: SupportedLanguage): void {
    this.cache.delete(language);
    console.log(`[QuestionLoader] Cache cleared for ${language}`);
  }

  /**
   * 현재 캐시 상태를 반환합니다
   * @returns 캐시된 언어 목록
   */
  getCacheStatus(): { language: SupportedLanguage; count: number }[] {
    return Array.from(this.cache.entries()).map(([language, questions]) => ({
      language,
      count: questions.length
    }));
  }

  /**
   * 미리 지정된 언어들을 프리로드합니다
   * @param languages 프리로드할 언어 배열
   * @returns 로드 결과들
   */
  async preloadLanguages(languages: SupportedLanguage[]): Promise<LoadResult[]> {
    const results = await Promise.allSettled(
      languages.map(lang => this.loadQuestions(lang))
    );

    return results
      .filter((result): result is PromiseFulfilledResult<LoadResult> => 
        result.status === 'fulfilled'
      )
      .map(result => result.value);
  }

  /**
   * 모든 지원 언어를 프리로드합니다
   * @returns 로드 결과들
   */
  async preloadAllLanguages(): Promise<LoadResult[]> {
    const supportedLanguages: SupportedLanguage[] = ['ko', 'en', 'es'];
    return this.preloadLanguages(supportedLanguages);
  }
}

/**
 * 기본 QuestionLoader 인스턴스
 * 싱글톤 패턴으로 전역에서 사용
 */
export const questionLoader = new QuestionLoader();

/**
 * 개발용 유틸리티 함수들
 */
export const questionLoaderUtils = {
  /**
   * 각 언어별 로딩 성능을 테스트합니다
   */
  async benchmarkLoading(): Promise<void> {
    if (!(import.meta as any).env?.DEV) {
      console.warn('Benchmark is only available in development mode');
      return;
    }

    const languages: SupportedLanguage[] = ['ko', 'en', 'es'];
    const results: Array<{ language: SupportedLanguage; time: number; size: number }> = [];

    for (const language of languages) {
      const start = performance.now();
      const result = await questionLoader.loadQuestions(language);
      const time = performance.now() - start;
      
      results.push({
        language,
        time,
        size: result.chunkSize || 0
      });
    }

    console.table(results);
  },

  /**
   * 캐시 효율성을 테스트합니다
   */
  async testCacheEfficiency(): Promise<void> {
    if (!(import.meta as any).env?.DEV) return;

    const language: SupportedLanguage = 'ko';
    
    // 첫 번째 로드 (캐시 미스)
    const start1 = performance.now();
    await questionLoader.loadQuestions(language);
    const time1 = performance.now() - start1;

    // 두 번째 로드 (캐시 히트)
    const start2 = performance.now();
    const result2 = await questionLoader.loadQuestions(language);
    const time2 = performance.now() - start2;

    console.log('Cache efficiency test:', {
      'First load (cache miss)': `${time1.toFixed(2)}ms`,
      'Second load (cache hit)': `${time2.toFixed(2)}ms`,
      'Cache hit': result2.fromCache,
      'Speed improvement': `${((time1 - time2) / time1 * 100).toFixed(1)}%`
    });
  }
}; 