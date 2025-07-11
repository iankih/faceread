import { useState, useCallback, useEffect } from 'react'
import { generateShareText, getGradeInfo } from '../lib/utils'

interface ShareData {
  title: string
  text: string
  url: string
  image?: string
}

interface ShareOptions {
  fallbackMessage?: string
  enableClipboard?: boolean
  enableWebShare?: boolean
}

interface ShareResult {
  success: boolean
  method: 'webshare' | 'clipboard' | 'fallback' | 'error'
  error?: string
}

interface UserAgent {
  isMobile: boolean
  isIOS: boolean
  isAndroid: boolean
  isSafari: boolean
  isChrome: boolean
  canWebShare: boolean
  canClipboard: boolean
}

/**
 * User Agent 감지 함수
 */
const detectUserAgent = (): UserAgent => {
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : ''
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
  const isIOS = /iPad|iPhone|iPod/.test(userAgent)
  const isAndroid = /Android/i.test(userAgent)
  const isSafari = /Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)
  const isChrome = /Chrome/i.test(userAgent)
  
  // Web Share API 지원 확인
  const canWebShare = typeof navigator !== 'undefined' && 'share' in navigator
  
  // Clipboard API 지원 확인
  const canClipboard = typeof navigator !== 'undefined' && 
    'clipboard' in navigator && 
    'writeText' in navigator.clipboard
  
  return {
    isMobile,
    isIOS,
    isAndroid,
    isSafari,
    isChrome,
    canWebShare,
    canClipboard
  }
}

/**
 * 클립보드에 텍스트 복사
 */
const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
    
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    
    const result = document.execCommand('copy')
    document.body.removeChild(textArea)
    
    return result
  } catch (error) {
    console.error('클립보드 복사 실패:', error)
    return false
  }
}

/**
 * Web Share API 사용
 */
const webShare = async (data: ShareData): Promise<boolean> => {
  try {
    if (!navigator.share) {
      return false
    }
    
    // Web Share API는 이미지 URL을 직접 지원하지 않으므로 text에 포함
    const shareData: any = {
      title: data.title,
      text: data.text,
      url: data.url
    }
    
    // 일부 브라우저에서는 files 공유 지원
    if (data.image && 'canShare' in navigator) {
      try {
        // 이미지를 blob으로 변환해서 공유 (실험적 기능)
        const response = await fetch(data.image)
        const blob = await response.blob()
        const file = new File([blob], 'quiz-result.jpg', { type: 'image/jpeg' })
        
        if (navigator.canShare({ files: [file] })) {
          shareData.files = [file]
        }
      } catch {
        // 이미지 공유 실패 시 무시하고 텍스트만 공유
      }
    }
    
    await navigator.share(shareData)
    return true
  } catch (error) {
    // 사용자가 공유를 취소한 경우도 에러로 처리됨
    if (error instanceof Error && error.name === 'AbortError') {
      return false
    }
    console.error('Web Share API 실패:', error)
    return false
  }
}

/**
 * 공유 Hook
 */
export const useShare = (options: ShareOptions = {}) => {
  const [isSharing, setIsSharing] = useState(false)
  const [userAgent, setUserAgent] = useState<UserAgent | null>(null)
  const [lastShareResult, setLastShareResult] = useState<ShareResult | null>(null)
  
  const {
    enableClipboard = true,
    enableWebShare = true
  } = options
  
  // User Agent 정보 초기화
  useEffect(() => {
    setUserAgent(detectUserAgent())
  }, [])
  
  /**
   * 퀴즈 결과 공유
   */
  const shareQuizResult = useCallback(async (
    score: number,
    nickname?: string
  ): Promise<ShareResult> => {
    if (!userAgent) {
      return { success: false, method: 'error', error: '브라우저 정보를 확인할 수 없습니다.' }
    }
    
    setIsSharing(true)
    
    try {
      const gradeInfo = getGradeInfo(score)
      const shareData: ShareData = {
        title: 'FaceRead 감정 인식 퀴즈 결과',
        text: generateShareText(gradeInfo.grade, score, nickname || '익명'),
        url: 'https://faceread.app',
        image: gradeInfo.shareImage
      }
      
      return await shareWithData(shareData)
    } finally {
      setIsSharing(false)
    }
  }, [userAgent])
  
  /**
   * 일반 데이터 공유
   */
  const shareWithData = useCallback(async (data: ShareData): Promise<ShareResult> => {
    if (!userAgent) {
      return { success: false, method: 'error', error: '브라우저 정보를 확인할 수 없습니다.' }
    }
    
    setIsSharing(true)
    
    try {
      let result: ShareResult
      
      // 1. Web Share API 시도 (모바일 우선)
      if (enableWebShare && userAgent.canWebShare && userAgent.isMobile) {
        const success = await webShare(data)
        if (success) {
          result = { success: true, method: 'webshare' }
        } else {
          // Web Share 실패 시 클립보드로 폴백
          result = await tryClipboardShare(data)
        }
      }
      // 2. 클립보드 API 시도 (데스크톱 또는 Web Share 미지원)
      else if (enableClipboard && userAgent.canClipboard) {
        result = await tryClipboardShare(data)
      }
      // 3. 폴백 처리
      else {
        result = { 
          success: false, 
          method: 'fallback', 
          error: '공유 기능이 지원되지 않는 환경입니다.' 
        }
      }
      
      setLastShareResult(result)
      return result
      
    } catch (error) {
      const result: ShareResult = {
        success: false,
        method: 'error',
        error: error instanceof Error ? error.message : '공유 중 오류가 발생했습니다.'
      }
      setLastShareResult(result)
      return result
    } finally {
      setIsSharing(false)
    }
  }, [userAgent, enableWebShare, enableClipboard])
  
  /**
   * 클립보드 공유 시도
   */
  const tryClipboardShare = async (data: ShareData): Promise<ShareResult> => {
    const shareText = `${data.title}\n\n${data.text}\n\n${data.url}`
    const success = await copyToClipboard(shareText)
    
    if (success) {
      return { success: true, method: 'clipboard' }
    } else {
      return { 
        success: false, 
        method: 'error', 
        error: '클립보드 복사에 실패했습니다.' 
      }
    }
  }
  
  /**
   * URL 공유 (간단한 텍스트 + URL)
   */
  const shareUrl = useCallback(async (url: string, text?: string): Promise<ShareResult> => {
    const shareData: ShareData = {
      title: 'FaceRead - 감정 인식 퀴즈',
      text: text || '감정 인식 능력을 테스트해보세요!',
      url
    }
    
    return await shareWithData(shareData)
  }, [shareWithData])
  
  /**
   * 공유 가능 여부 확인
   */
  const canShare = userAgent ? (
    (enableWebShare && userAgent.canWebShare) || 
    (enableClipboard && userAgent.canClipboard)
  ) : false
  
  /**
   * 추천 공유 방법
   */
  const recommendedMethod = userAgent ? (
    userAgent.isMobile && userAgent.canWebShare ? 'webshare' :
    userAgent.canClipboard ? 'clipboard' :
    'fallback'
  ) : 'unknown'
  
  return {
    // 상태
    isSharing,
    canShare,
    userAgent,
    lastShareResult,
    recommendedMethod,
    
    // 액션
    shareQuizResult,
    shareWithData,
    shareUrl,
    
    // 유틸리티
    generateShareText: (grade: string, score: number, nickname?: string) => 
      generateShareText(grade, score, nickname || '익명'),
    
    // 직접 접근용 함수들
    copyToClipboard,
    
    // 디바이스 정보
    isMobile: userAgent?.isMobile || false,
    canWebShare: userAgent?.canWebShare || false,
    canClipboard: userAgent?.canClipboard || false
  }
}

export default useShare

// 타입 내보내기
export type { ShareData, ShareOptions, ShareResult, UserAgent } 