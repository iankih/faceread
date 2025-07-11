/**
 * FaceRead Analytics 유틸리티
 * 개인정보 수집 없이 KPI 측정을 위한 이벤트 추적
 * PRD 목표: 공유율 ≥15%, 재플레이 ≥1.8회, 광고 CTR ≥0.9%
 */

interface AnalyticsEvent {
  type: string
  category: string
  action: string
  label?: string
  value?: number
  timestamp: number
  sessionId: string
  metadata?: Record<string, any>
}

interface KPIMetrics {
  // 공유 관련 KPI
  shareClickRate: number      // 공유 클릭률 (목표: ≥15%)
  shareSuccess: number        // 성공한 공유 횟수
  shareAttempts: number       // 공유 시도 횟수
  
  // 재플레이 관련 KPI  
  sessionReplays: number      // 세션당 재플레이 횟수 (목표: ≥1.8회)
  totalReplays: number        // 총 재플레이 횟수
  totalSessions: number       // 총 세션 수
  
  // 광고 관련 KPI
  adCTR: number              // 광고 클릭률 (목표: ≥0.9%)
  adClicks: number           // 광고 클릭 수
  adImpressions: number      // 광고 노출 수
  
  // 사용자 경험 KPI
  quizCompletionRate: number  // 퀴즈 완료율
  avgQuizDuration: number     // 평균 퀴즈 소요 시간 (초)
}

interface SessionData {
  sessionId: string
  startTime: number
  quizStarted: boolean
  quizCompleted: boolean
  replays: number
  shareAttempts: number
  shareSuccesses: number
  adClicks: number
  adImpressions: number
}

class Analytics {
  private events: AnalyticsEvent[] = []
  private sessionId: string
  private sessionData: SessionData
  private batchSize = 10
  private flushInterval = 30000 // 30초
  // private endpoint = '/api/analytics' // 실제 구현에서는 환경변수로 설정
  
  constructor() {
    this.sessionId = this.generateSessionId()
    this.sessionData = this.initializeSession()
    this.startBatchProcessor()
    this.setupBeforeUnload()
  }
  
  private generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
  
  private initializeSession(): SessionData {
    return {
      sessionId: this.sessionId,
      startTime: Date.now(),
      quizStarted: false,
      quizCompleted: false,
      replays: 0,
      shareAttempts: 0,
      shareSuccesses: 0,
      adClicks: 0,
      adImpressions: 0
    }
  }
  
  /**
   * 이벤트 추적
   */
  track(category: string, action: string, label?: string, value?: number, metadata?: Record<string, any>) {
    const event: AnalyticsEvent = {
      type: 'track',
      category,
      action,
      label,
      value,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      metadata
    }
    
    this.events.push(event)
    this.updateSessionData()
    
    // 중요 이벤트는 즉시 전송
    if (this.isCriticalEvent(event)) {
      this.flush()
    }
  }
  
  /**
   * 페이지 뷰 추적
   */
  pageView(page: string, referrer?: string) {
    this.track('navigation', 'pageview', page, undefined, {
      referrer: referrer || document.referrer,
      userAgent: navigator.userAgent,
      language: navigator.language,
      timestamp: Date.now()
    })
  }
  
  /**
   * 퀴즈 관련 이벤트
   */
  quizEvents = {
    start: (mode: 'standard' | 'integrated', language: string) => {
      this.sessionData.quizStarted = true
      this.track('quiz', 'start', mode, undefined, { language })
    },
    
    complete: (score: number, duration: number, mode: string) => {
      this.sessionData.quizCompleted = true
      this.track('quiz', 'complete', mode, score, { 
        duration,
        completionRate: 100 
      })
    },
    
    abandon: (questionNumber: number, totalQuestions: number) => {
      const abandonRate = Math.round((questionNumber / totalQuestions) * 100)
      this.track('quiz', 'abandon', undefined, abandonRate, {
        questionNumber,
        totalQuestions
      })
    },
    
    replay: () => {
      this.sessionData.replays++
      this.track('quiz', 'replay', undefined, this.sessionData.replays)
    },
    
    answerQuestion: (questionType: string, isCorrect: boolean, timeSpent: number) => {
      this.track('quiz', 'answer', questionType, isCorrect ? 1 : 0, {
        timeSpent,
        correct: isCorrect
      })
    }
  }
  
  /**
   * 공유 관련 이벤트
   */
  shareEvents = {
    attempt: (method: string, grade: string, score: number) => {
      this.sessionData.shareAttempts++
      this.track('share', 'attempt', method, score, { grade })
    },
    
    success: (method: string, grade: string, score: number) => {
      this.sessionData.shareSuccesses++
      this.track('share', 'success', method, score, { grade })
    },
    
    failure: (method: string, error: string) => {
      this.track('share', 'failure', method, undefined, { error })
    }
  }
  
  /**
   * 광고 관련 이벤트
   */
  adEvents = {
    impression: (adType: string, position: string) => {
      this.sessionData.adImpressions++
      this.track('ad', 'impression', adType, undefined, { position })
    },
    
    click: (adType: string, position: string) => {
      this.sessionData.adClicks++
      this.track('ad', 'click', adType, 1, { position })
    },
    
    error: (adType: string, error: string) => {
      this.track('ad', 'error', adType, undefined, { error })
    }
  }
  
  /**
   * 사용자 경험 이벤트
   */
  uxEvents = {
    languageChange: (from: string, to: string) => {
      this.track('ux', 'language_change', `${from}_to_${to}`)
    },
    
    modeChange: (mode: string) => {
      this.track('ux', 'mode_change', mode)
    },
    
    error: (component: string, error: string) => {
      this.track('ux', 'error', component, undefined, { error })
    },
    
    performance: (metric: string, value: number) => {
      this.track('ux', 'performance', metric, value)
    }
  }
  
  /**
   * 현재 KPI 메트릭 계산
   */
  getKPIMetrics(): KPIMetrics {
    const shareClickRate = this.sessionData.shareAttempts > 0 
      ? (this.sessionData.shareAttempts / (this.sessionData.quizCompleted ? 1 : 0.1)) * 100
      : 0
      
    const sessionReplays = this.sessionData.replays
    
    const adCTR = this.sessionData.adImpressions > 0
      ? (this.sessionData.adClicks / this.sessionData.adImpressions) * 100
      : 0
      
    const quizCompletionRate = this.sessionData.quizStarted && this.sessionData.quizCompleted ? 100 : 0
    
    return {
      shareClickRate,
      shareSuccess: this.sessionData.shareSuccesses,
      shareAttempts: this.sessionData.shareAttempts,
      sessionReplays,
      totalReplays: this.sessionData.replays,
      totalSessions: 1, // 현재 세션만 계산
      adCTR,
      adClicks: this.sessionData.adClicks,
      adImpressions: this.sessionData.adImpressions,
      quizCompletionRate,
      avgQuizDuration: this.calculateAvgQuizDuration()
    }
  }
  
  /**
   * KPI 목표 달성 여부 확인
   */
  checkKPITargets(): Record<string, boolean> {
    const metrics = this.getKPIMetrics()
    
    return {
      shareRate: metrics.shareClickRate >= 15,     // 목표: ≥15%
      replayRate: metrics.sessionReplays >= 1.8,  // 목표: ≥1.8회
      adCTR: metrics.adCTR >= 0.9                  // 목표: ≥0.9%
    }
  }
  
  private updateSessionData() {
    // 이벤트에 따른 세션 데이터 업데이트는 각 이벤트 메서드에서 처리
  }
  
  private isCriticalEvent(event: AnalyticsEvent): boolean {
    const criticalEvents = [
      'quiz.complete',
      'share.success', 
      'ad.click',
      'ux.error'
    ]
    return criticalEvents.includes(`${event.category}.${event.action}`)
  }
  
  private calculateAvgQuizDuration(): number {
    // 실제 구현에서는 퀴즈 시작/완료 시간을 추적해서 계산
    return 0
  }
  
  /**
   * 배치 처리 시작
   */
  private startBatchProcessor() {
    setInterval(() => {
      if (this.events.length >= this.batchSize) {
        this.flush()
      }
    }, this.flushInterval)
  }
  
  /**
   * 이벤트 전송
   */
  private async flush() {
    if (this.events.length === 0) return
    
    const eventsToSend = [...this.events]
    this.events = []
    
    try {
      // 실제 구현에서는 서버로 전송
      if (typeof window !== 'undefined' && 'fetch' in window) {
        // 실제 API 엔드포인트로 전송
        console.log('Analytics events (would be sent to server):', eventsToSend)
        
        // await fetch(this.endpoint, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     events: eventsToSend,
        //     session: this.sessionData
        //   })
        // })
      }
    } catch (error) {
      console.error('Analytics flush failed:', error)
      // 실패한 이벤트를 다시 큐에 추가 (선택적)
      this.events.unshift(...eventsToSend)
    }
  }
  
  /**
   * 페이지 언로드 시 남은 이벤트 전송
   */
  private setupBeforeUnload() {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.flush()
      })
      
      // Page Visibility API를 사용한 백그라운드 처리
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          this.flush()
        }
      })
    }
  }
  
  /**
   * 세션 종료
   */
  endSession() {
    this.track('session', 'end', undefined, Date.now() - this.sessionData.startTime)
    this.flush()
  }
}

// 싱글톤 인스턴스
let analyticsInstance: Analytics | null = null

/**
 * Analytics 인스턴스 가져오기
 */
export function getAnalytics(): Analytics {
  if (!analyticsInstance) {
    analyticsInstance = new Analytics()
  }
  return analyticsInstance
}

/**
 * 편의 함수들
 */
export const analytics = {
  // 기본 추적
  track: (category: string, action: string, label?: string, value?: number, metadata?: Record<string, any>) => {
    getAnalytics().track(category, action, label, value, metadata)
  },
  
  // 페이지 뷰
  pageView: (page: string, referrer?: string) => {
    getAnalytics().pageView(page, referrer)
  },
  
  // 퀴즈 이벤트
  quiz: getAnalytics().quizEvents,
  
  // 공유 이벤트  
  share: getAnalytics().shareEvents,
  
  // 광고 이벤트
  ad: getAnalytics().adEvents,
  
  // UX 이벤트
  ux: getAnalytics().uxEvents,
  
  // KPI 메트릭
  getKPIMetrics: () => getAnalytics().getKPIMetrics(),
  checkKPITargets: () => getAnalytics().checkKPITargets(),
  
  // 세션 종료
  endSession: () => getAnalytics().endSession()
}

export default analytics

// 타입 내보내기
export type { AnalyticsEvent, KPIMetrics, SessionData } 