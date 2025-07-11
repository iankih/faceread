import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    // 번들 분석 도구 (빌드 시에만)
    visualizer({
      filename: 'dist/stats.html',
      open: false, // CI 환경에서는 자동 오픈 비활성화
      gzipSize: true,
      brotliSize: true,
      template: 'treemap' // 'treemap', 'sunburst', 'network'
    })
  ],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // 코드 스플리팅 최적화
  build: {
    rollupOptions: {
      output: {
        // 벤더 라이브러리별 청크 분리
        manualChunks: {
          // React 코어
          'react-vendor': ['react', 'react-dom'],
          
          // UI 라이브러리
          'ui-vendor': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog', 
            '@radix-ui/react-separator',
            '@radix-ui/react-slot'
          ],
          
          // 국제화
          'i18n-vendor': ['react-i18next', 'i18next'],
          
          // 라우팅 및 애니메이션
          'router-vendor': ['react-router-dom'],
          'animation-vendor': ['framer-motion'],
          
          // 유틸리티
          'utils-vendor': ['clsx', 'class-variance-authority', 'tailwind-merge']
        },
        
        // 파일명 패턴 정의
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name?.includes('vendor')) {
            return 'vendor/[name]-[hash].js';
          }
          return 'chunks/[name]-[hash].js';
        },
        
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'styles/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    
    // 최적화 설정
    target: 'es2020', // 모던 브라우저 타겟
    minify: 'esbuild', // 빠른 압축
    sourcemap: false, // 프로덕션에서는 소스맵 비활성화
    cssCodeSplit: true, // CSS 코드 스플리팅
    
    // 번들 크기 경고 임계값
    chunkSizeWarningLimit: 1000, // 1MB
    
    // 에셋 인라인 임계값
    assetsInlineLimit: 4096, // 4KB 미만은 인라인
    
    // 압축 최적화
    cssMinify: 'esbuild',
    
    // 폴백 설정
    reportCompressedSize: true,
    
    // 빌드 성능 최적화
    write: true,
    emptyOutDir: true
  },
  
  // 개발 서버 최적화
  server: {
    hmr: {
      overlay: false // HMR 오류 오버레이 비활성화
    }
  },
  
  // 프리 번들링 설정
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'react-i18next',
      'i18next'
    ],
    exclude: [
      // 동적 import되는 JSON 파일들은 제외
      'src/data/questions.ko.json',
      'src/data/questions.en.json', 
      'src/data/questions.es.json'
    ]
  },
  
  // 프리뷰 서버 설정
  preview: {
    port: 4173,
    strictPort: true,
    host: true // Docker 환경에서 접근 가능
  },
  
  // 환경 변수 설정
  envPrefix: 'VITE_',
  
  // 실험적 기능
  experimental: {
    renderBuiltUrl: (filename) => {
      // CDN 설정 시 사용할 수 있는 URL 변환
      return filename;
    }
  },
  
  // CSS 설정
  css: {
    devSourcemap: true, // 개발 시 CSS 소스맵
    postcss: {
      plugins: []
    }
  },
  
  // 로깅 설정
  logLevel: 'info',
  clearScreen: false, // CI 환경에서 화면 클리어 비활성화
  
  // 타입 체킹 (빌드 시)
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
}) 