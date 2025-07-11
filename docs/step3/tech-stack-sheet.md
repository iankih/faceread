# 기술 스택 확정 시트

**문서 버전:** 1.0  
**작성일:** 2025-07-11  
**작성자:** AI Development Team  
**참조:** PRD v5.2, STEP 2 아키텍처, coding-standards

---

## 🎯 기술 스택 확정 목표

### 확정 기준
1. **PRD 요구사항 100% 충족**
2. **성능 목표 달성**: FCP < 1.5s, LCP < 2.5s
3. **접근성 목표**: Lighthouse a11y ≥ 95점
4. **개발 효율성**: 2 FTE, 3주 일정 준수

---

## 🏗️ 확정된 기술 스택

### 1. 핵심 프레임워크 ✅

| 기술 | 버전 | 확정 사유 | 상태 |
|------|------|-----------|------|
| **React** | 18.2.0 | 함수형 컴포넌트, Hooks 활용 | ✅ 설치됨 |
| **TypeScript** | 5.2.2 | 엄격한 타입 검사, 코딩 표준 준수 | ✅ 설치됨 |
| **Vite** | 5.0.8 | 빠른 HMR, 최적화된 빌드 | ✅ 설치됨 |

### 2. UI 라이브러리 ✅

| 기술 | 버전 | 확정 사유 | 상태 |
|------|------|-----------|------|
| **Tailwind CSS** | 4.1.11 | 디자인 토큰 일원화, 성능 최적화 | ✅ 설치됨 |
| **Radix UI** | 1.2.x | 접근성 기반 헤드리스 컴포넌트 | 🔄 부분 설치 |
| **shadcn/ui** | latest | Radix + Tailwind wrapper | 🔄 설정 필요 |

### 3. 추가 필요 패키지

| 기술 | 버전 | 용도 | 우선순위 |
|------|------|------|----------|
| **react-router-dom** | ^6.20.0 | SPA 라우팅 | 🔴 필수 |
| **framer-motion** | ^10.16.0 | 120ms 애니메이션 | 🔴 필수 |
| **react-i18next** | ^13.5.0 | 다국어 지원 | 🔴 필수 |
| **i18next** | ^23.7.0 | 국제화 프레임워크 | 🔴 필수 |
| **@types/node** | ^20.10.0 | Node.js 타입 정의 | 🟡 개발 편의 |

---

## 🧪 개발 도구 체인

### 1. 테스팅 도구 (신규 추가)

| 도구 | 버전 | 용도 | 설치 명령 |
|------|------|------|-----------|
| **Vitest** | ^1.0.0 | 단위 테스트, 90% 커버리지 목표 | `pnpm add -D vitest` |
| **@testing-library/react** | ^14.1.0 | React 컴포넌트 테스트 | `pnpm add -D @testing-library/react` |
| **@testing-library/jest-dom** | ^6.1.0 | DOM 매처 확장 | `pnpm add -D @testing-library/jest-dom` |
| **jsdom** | ^23.0.0 | 브라우저 환경 시뮬레이션 | `pnpm add -D jsdom` |

### 2. 성능 도구

| 도구 | 버전 | 용도 | 설치 방법 |
|------|------|------|-----------|
| **@vitejs/plugin-legacy** | ^5.2.0 | 레거시 브라우저 지원 | `pnpm add -D @vitejs/plugin-legacy` |
| **vite-plugin-pwa** | ^0.17.0 | PWA 기능 (옵션) | `pnpm add -D vite-plugin-pwa` |
| **rollup-plugin-visualizer** | ^5.9.0 | 번들 크기 분석 | `pnpm add -D rollup-plugin-visualizer` |

### 3. 린팅 & 포매팅 (강화)

| 도구 | 버전 | 용도 | 상태 |
|------|------|------|------|
| **ESLint** | 8.55.0 | 코드 품질 검사 | ✅ 설치됨 |
| **Prettier** | ^3.1.0 | 코드 포매팅 | 🔄 추가 필요 |
| **eslint-config-prettier** | ^9.1.0 | ESLint-Prettier 충돌 방지 | 🔄 추가 필요 |

---

## 📦 패키지 설치 계획

### 1. 즉시 설치 (필수)

```bash
# 라우팅 및 애니메이션
pnpm add react-router-dom@^6.20.0
pnpm add framer-motion@^10.16.0

# 국제화
pnpm add react-i18next@^13.5.0 i18next@^23.7.0

# 추가 Radix UI 컴포넌트
pnpm add @radix-ui/react-dialog@^1.0.5
pnpm add @radix-ui/react-toast@^1.1.5
pnpm add @radix-ui/react-progress@^1.0.3

# shadcn/ui 초기화
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input progress accordion dialog toast
```

### 2. 개발 도구 설치

```bash
# 테스팅
pnpm add -D vitest@^1.0.0
pnpm add -D @testing-library/react@^14.1.0
pnpm add -D @testing-library/jest-dom@^6.1.0
pnpm add -D jsdom@^23.0.0

# 성능 도구
pnpm add -D rollup-plugin-visualizer@^5.9.0
pnpm add -D @vitejs/plugin-legacy@^5.2.0

# 코드 품질
pnpm add -D prettier@^3.1.0
pnpm add -D eslint-config-prettier@^9.1.0
```

---

## ⚙️ 빌드 최적화 전략

### 1. Vite 설정 확장

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true
    })
  ],
  
  // 코드 스플리팅 최적화
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-accordion', '@radix-ui/react-dialog'],
          'i18n-vendor': ['react-i18next', 'i18next']
        }
      }
    },
    
    // 최적화 설정
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: false,
    
    // 번들 크기 경고 임계값
    chunkSizeWarningLimit: 1000
  },
  
  // 개발 서버 최적화
  server: {
    hmr: {
      overlay: false
    }
  }
})
```

### 2. 언어별 동적 Import 구현

```typescript
// src/lib/question-loader.ts
interface QuestionLoader {
  loadQuestions: (language: 'ko' | 'en' | 'es') => Promise<EmotionQuestion[]>;
}

export const createQuestionLoader = (): QuestionLoader => {
  const cache = new Map<string, EmotionQuestion[]>();
  
  return {
    async loadQuestions(language) {
      // 캐시 확인
      if (cache.has(language)) {
        return cache.get(language)!;
      }
      
      // 동적 import로 언어별 로딩
      const module = await import(
        /* @vite-ignore */
        `../data/questions.${language}.json`
      );
      
      const questions = module.default || module;
      cache.set(language, questions);
      
      return questions;
    }
  };
};
```

### 3. 이미지 최적화 전략

```typescript
// src/lib/image-optimization.ts
interface ImageLoaderConfig {
  format: 'webp' | 'avif' | 'jpg';
  quality: number;
  lazy: boolean;
}

export const createImageLoader = (config: ImageLoaderConfig) => {
  return {
    // WebP 지원 확인
    supportsWebP: () => {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    },
    
    // 최적화된 이미지 URL 생성
    getOptimizedUrl: (src: string) => {
      const format = config.format === 'webp' && !this.supportsWebP() 
        ? 'jpg' 
        : config.format;
      
      return `${src}?format=${format}&quality=${config.quality}`;
    }
  };
};
```

---

## 🔒 보안 설정

### 1. CSP (Content Security Policy)

```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' https://cdn.faceread.app data:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://api.faceread.app;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
">
```

### 2. 환경 변수 관리

```typescript
// src/lib/env.ts
interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  VITE_API_BASE_URL?: string;
  VITE_CDN_BASE_URL?: string;
  VITE_ANALYTICS_ID?: string;
}

export const env: EnvironmentConfig = {
  NODE_ENV: import.meta.env.MODE as any,
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  VITE_CDN_BASE_URL: import.meta.env.VITE_CDN_BASE_URL || '',
  VITE_ANALYTICS_ID: import.meta.env.VITE_ANALYTICS_ID
};

// 개발 환경에서만 사용
export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
```

---

## 🧪 테스트 설정

### 1. Vitest 설정

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.ts'
      ],
      thresholds: {
        global: {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90
        }
      }
    }
  }
})
```

### 2. 테스트 설정 파일

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Jest-DOM 매처 확장
expect.extend(matchers)

// 각 테스트 후 정리
afterEach(() => {
  cleanup()
})

// 전역 모킹
global.matchMedia = global.matchMedia || function (query) {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }
}
```

---

## 📊 성능 목표 및 측정

### 1. Core Web Vitals 목표

| 지표 | 목표 | 현재 상태 | 측정 도구 |
|------|------|-----------|-----------|
| **FCP** | < 1.5s | 미측정 | Lighthouse |
| **LCP** | < 2.5s | 미측정 | Lighthouse |
| **CLS** | < 0.1 | 미측정 | Lighthouse |
| **FID** | < 100ms | 미측정 | Lighthouse |

### 2. 번들 크기 목표

| 항목 | 목표 | 현재 | 전략 |
|------|------|------|------|
| **초기 JS** | < 150KB (gzipped) | 46KB | 코드 스플리팅 |
| **초기 CSS** | < 50KB (gzipped) | 1.25KB | PurgeCSS |
| **이미지** | < 200KB per image | 미적용 | WebP 변환 |
| **전체 번들** | < 500KB | 미측정 | 트리 셰이킹 |

### 3. Lighthouse 설정

```javascript
// lighthouse-ci.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:4173'],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
}
```

---

## 🚀 배포 환경 설정

### 1. Cloudflare Pages 설정

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run tests
        run: pnpm test
      
      - name: Build project
        run: pnpm build
      
      - name: Publish to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: faceread
          directory: dist
```

### 2. 환경별 설정

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000
VITE_CDN_BASE_URL=http://localhost:5173
VITE_ANALYTICS_ID=dev-analytics

# .env.production
VITE_API_BASE_URL=https://api.faceread.app
VITE_CDN_BASE_URL=https://cdn.faceread.app
VITE_ANALYTICS_ID=prod-analytics
```

---

## ✅ 기술 스택 체크리스트

### 즉시 설치 필요
- [ ] react-router-dom@^6.20.0
- [ ] framer-motion@^10.16.0
- [ ] react-i18next@^13.5.0
- [ ] i18next@^23.7.0
- [ ] 추가 Radix UI 컴포넌트들
- [ ] shadcn/ui 컴포넌트 설치

### 개발 도구 설치
- [ ] Vitest 테스트 환경
- [ ] Prettier 코드 포매팅
- [ ] 번들 분석 도구
- [ ] Lighthouse CI 설정

### 설정 파일 생성
- [ ] vite.config.ts 확장
- [ ] vitest.config.ts 생성
- [ ] prettier.config.js 생성
- [ ] .env 파일들 생성

---

**다음 단계**: 패키지 설치 및 PoC 구현 