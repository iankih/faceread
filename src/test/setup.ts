import '@testing-library/jest-dom'
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Jest-DOM 매처 확장
expect.extend(matchers)

// 각 테스트 후 정리
afterEach(() => {
  cleanup()
})

// 전역 모킹
Object.defineProperty(global, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// ResizeObserver 모킹 (Radix UI에서 사용)
Object.defineProperty(global, 'ResizeObserver', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
})

// IntersectionObserver 모킹
Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
})

// 환경 변수 모킹
Object.defineProperty(globalThis, 'import', {
  value: {
    meta: {
      env: {
        DEV: true,
        PROD: false,
        MODE: 'test',
        VITE_API_BASE_URL: 'http://localhost:3000/test',
        VITE_CDN_BASE_URL: 'http://localhost:5173/test'
      }
    }
  }
})

// fetch 모킹 (필요한 경우)
global.fetch = vi.fn()

// 로컬 스토리지 모킹
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// 세션 스토리지 모킹
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
})

// URL 모킹 (react-router-dom)
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:3000',
    origin: 'http://localhost:3000',
    pathname: '/',
    search: '',
    hash: '',
  },
  writable: true,
})

// performance 모킹
Object.defineProperty(global, 'performance', {
  writable: true,
  value: {
    now: vi.fn(() => Date.now()),
    mark: vi.fn(),
    measure: vi.fn(),
    getEntriesByType: vi.fn(() => []),
    getEntriesByName: vi.fn(() => []),
  },
})

// Web Share API 모킹
Object.defineProperty(navigator, 'share', {
  writable: true,
  value: vi.fn(() => Promise.resolve()),
})

Object.defineProperty(navigator, 'canShare', {
  writable: true,
  value: vi.fn(() => true),
})

// Clipboard API 모킹
Object.defineProperty(navigator, 'clipboard', {
  writable: true,
  value: {
    writeText: vi.fn(() => Promise.resolve()),
    readText: vi.fn(() => Promise.resolve('')),
  },
})

// requestAnimationFrame 모킹
global.requestAnimationFrame = vi.fn((cb) => setTimeout(cb, 16)) as any
global.cancelAnimationFrame = vi.fn((id) => clearTimeout(id as any))

// CSS 모킹 (import된 CSS 파일들)
vi.mock('*.css', () => ({}))
vi.mock('*.scss', () => ({}))

// 이미지 모킹
vi.mock('*.webp', () => 'test-image.webp')
vi.mock('*.jpg', () => 'test-image.jpg')
vi.mock('*.png', () => 'test-image.png')
vi.mock('*.svg', () => 'test-image.svg')

// Framer Motion 모킹 (애니메이션 테스트에서 제외)
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    button: 'button',
    span: 'span',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  useAnimation: () => ({}),
  useMotionValue: (initial: any) => ({ set: vi.fn(), get: () => initial }),
}))

console.log('🧪 Test setup completed - FaceRead PoC Test Environment')

// 테스트별 유틸리티 함수들
export const testUtils = {
  // 모킹 리셋
  resetAllMocks: () => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
    sessionStorageMock.getItem.mockClear()
    sessionStorageMock.setItem.mockClear()
  },

  // 환경 변수 설정
  setEnvVar: (key: string, value: string) => {
    (globalThis as any).import.meta.env[key] = value
  },

  // 로컬 스토리지 상태 설정
  setLocalStorage: (items: Record<string, string>) => {
    Object.entries(items).forEach(([key, value]) => {
      localStorageMock.getItem.mockImplementation((k) => k === key ? value : null)
    })
  },

  // fetch 응답 모킹
  mockFetchResponse: (data: any, ok = true, status = 200) => {
    (global.fetch as any).mockResolvedValueOnce({
      ok,
      status,
      json: () => Promise.resolve(data),
      text: () => Promise.resolve(JSON.stringify(data)),
    })
  },

  // 에러 발생 시뮬레이션
  mockFetchError: (error = new Error('Network error')) => {
    (global.fetch as any).mockRejectedValueOnce(error)
  }
} 