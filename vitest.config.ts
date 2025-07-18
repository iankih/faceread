/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  test: {
    // 테스트 환경
    environment: 'jsdom',
    
    // 설정 파일
    setupFiles: ['./src/test/setup.ts'],
    
    // 전역 설정
    globals: true,
    
    // 파일 패턴
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],
    exclude: [
      'node_modules',
      'dist',
      '.idea',
      '.git',
      '.cache'
    ],
    
    // 커버리지 설정
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      
      // 커버리지 대상 파일
      include: [
        'src/**/*.{js,ts,jsx,tsx}'
      ],
      exclude: [
        'node_modules/',
        'src/test/',
        'src/**/*.d.ts',
        'src/**/*.config.ts',
        'src/**/*.stories.tsx',
        'src/main.tsx', // 엔트리 포인트 제외
        'src/vite-env.d.ts'
      ],
      
      // 커버리지 임계값 (90% 목표)
      thresholds: {
        global: {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90
        },
        // 개별 파일 최소 임계값
        perFile: true,
        'src/lib/**.ts': {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85
        },
        'src/components/**.tsx': {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      },
      
      // 커버리지 실패 시 프로세스 종료
      skipFull: false,
      all: true
    },
    
    // 테스트 실행 설정
    testTimeout: 10000, // 10초
    hookTimeout: 10000,
    teardownTimeout: 10000,
    
    // 병렬 실행
    pool: 'threads',
    poolOptions: {
      threads: {
        maxThreads: 4,
        minThreads: 1
      }
    },
    
    // 재시도 설정
    retry: 2,
    
    // 감시 모드 설정
    watch: true,
    watchExclude: [
      'node_modules/**',
      'dist/**',
      'coverage/**'
    ],
    
    // 리포터 설정
    reporter: ['verbose', 'html', 'json'],
    outputFile: {
      html: './test-results/index.html',
      json: './test-results/results.json'
    },
    
    // 모킹 설정
    mockReset: true,
    clearMocks: true,
    restoreMocks: true,
    
    // 타입 체킹
    typecheck: {
      enabled: true,
      tsconfig: './tsconfig.json'
    },
    
    // 환경 변수
    env: {
      NODE_ENV: 'test',
      VITE_API_BASE_URL: 'http://localhost:3000/test',
      VITE_CDN_BASE_URL: 'http://localhost:5173/test'
    },
    
    // 성능 모니터링 (필요시 활성화)
    // benchmark: true,
    
    // UI 테스트 (headless)
    ui: false,
    
    // 오픈 브라우저 비활성화 (CI 환경)
    open: false,
    
    // 로그 레벨
    logHeapUsage: true,
    
    // 에러 처리
    bail: 1, // 첫 번째 실패 시 중단
    
    // 스냅샷 설정
    resolveSnapshotPath: (testPath, snapExtension) => 
      testPath.replace('/src/', '/src/test/__snapshots__/') + snapExtension
  }
}) 