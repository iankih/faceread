# 기술 스택 확정 시트 (업데이트됨)

**문서 버전:** 2.0  
**작성일:** 2025-07-11  
**최종 수정:** 2025-07-11  
**작성자:** AI Development Team  
**참조:** PRD v5.2, STEP 2 아키텍처, coding-standards, 사용자 요구사항

---

## 🎯 기술 스택 확정 목표

### 확정 기준
1. **PRD 요구사항 100% 충족**
2. **성능 목표 달성**: FCP < 1.5s, LCP < 2.5s
3. **접근성 목표**: Lighthouse a11y ≥ 95점
4. **개발 효율성**: 2 FTE, 3주 일정 준수
5. **미니멀 디자인**: 흰색 중심, 포인트 색상만 사용

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
| **Radix UI** | 1.2.x | 접근성 기반 헤드리스 컴포넌트 | ✅ 부분 설치 |
| **shadcn/ui** | latest | Radix + Tailwind wrapper | ✅ 설정 완료 |
| **Lucide React** | 0.525.0 | 아이콘 라이브러리, 트리셰이킹 지원 | ✅ 설치됨 |

### 3. 추가 라이브러리 (업데이트됨)

| 기술 | 버전 | 용도 | 상태 |
|------|------|------|------|
| **react-router-dom** | 7.6.3 | SPA 라우팅 | ✅ 설치됨 |
| **framer-motion** | 12.23.3 | 120ms 애니메이션 (선택적) | ✅ 설치됨 |
| **react-i18next** | 15.6.0 | 다국어 지원 | ✅ 설치됨 |
| **i18next** | 25.3.2 | 국제화 프레임워크 | ✅ 설치됨 |

---

## 🧪 개발 도구 체인

### 1. 테스팅 도구

| 도구 | 버전 | 용도 | 상태 |
|------|------|------|------|
| **Vitest** | 3.2.4 | 단위 테스트, 90% 커버리지 목표 | ✅ 설치됨 |
| **@testing-library/react** | 16.3.0 | React 컴포넌트 테스트 | ✅ 설치됨 |
| **@testing-library/jest-dom** | 6.6.3 | DOM 매처 확장 | ✅ 설치됨 |
| **jsdom** | 26.1.0 | 브라우저 환경 시뮬레이션 | ✅ 설치됨 |

### 2. 성능 도구

| 도구 | 버전 | 용도 | 상태 |
|------|------|------|------|
| **rollup-plugin-visualizer** | 6.0.3 | 번들 크기 분석 | ✅ 설치됨 |
| **@vitejs/plugin-react** | 4.2.1 | React 최적화 플러그인 | ✅ 설치됨 |
| **@vitest/coverage-v8** | 3.2.4 | 테스트 커버리지 | ✅ 설치됨 |

### 3. 린팅 & 포매팅

| 도구 | 버전 | 용도 | 상태 |
|------|------|------|------|
| **ESLint** | 8.55.0 | 코드 품질 검사 | ✅ 설치됨 |
| **Prettier** | 3.6.2 | 코드 포매팅 | ✅ 설치됨 |
| **eslint-config-prettier** | 10.1.5 | ESLint-Prettier 충돌 방지 | ✅ 설치됨 |

---

## 🎨 UI/UX 업데이트 사항

### 1. 디자인 시스템 변경

| 항목 | 이전 | 현재 | 사유 |
|------|------|------|------|
| **메인 배경** | #DFF3FD (연한 파란색) | #FFFFFF (흰색) | 미니멀 디자인 |
| **보조 배경** | #DFF3FD | #FAFAFA (연한 회색) | 시각적 계층 구조 |
| **Primary 색상 사용** | 헤더, 버튼, 배경 등 광범위 | 포인트로만 제한 사용 | 미니멀 원칙 |
| **아이콘 시스템** | 이모지 중심 | Lucide React 통일 | 일관성, 접근성 |

### 2. 컴포넌트 구조 변경

| 컴포넌트 | 변경사항 | 이유 |
|----------|----------|------|
| **AdBanner** | 신규 추가 | 광고 수익화 |
| **HomePage** | 완전 개편 | 사용자 요구사항 |
| **QuizPage** | 하단 정보 제거 | 미니멀 디자인 |
| **RewardScreen** | 점수 강조, 설명보기 추가 | UX 개선 |
| **ModeSelector** | 제거 | 통합 모드 삭제 |

### 3. 아이콘 매핑

| 위치 | 아이콘 | 크기 | 색상 |
|------|--------|------|------|
| 언어 선택 | Globe | 20px | text-gray-500 |
| 닉네임 입력 | User | 16px | text-gray-500 |
| 시작 버튼 | Play | 18px | text-white |
| 퀴즈 헤더 | Brain | 20px | text-primary |
| 진행률 | Clock | 16px | text-gray-500 |
| 점수 표시 | Target | 24px | text-primary |
| 등급 | Award | 18px | 등급별 색상 |
| 설명보기 | Eye | 18px | text-gray-600 |
| 공유 | Share2 | 18px | text-white |
| 재시작 | RotateCcw | 18px | text-gray-700 |

---

## ⚙️ 빌드 최적화 전략 (업데이트됨)

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
          'ui-vendor': ['@radix-ui/react-accordion', '@radix-ui/react-slot'],
          'icon-vendor': ['lucide-react'],
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

### 3. Lucide 아이콘 최적화

```typescript
// src/lib/icons.ts - 트리셰이킹을 위한 명시적 import
export {
  Globe,
  User,
  Play,
  Brain,
  Clock,
  Target,
  Award,
  Eye,
  Share2,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';

// 사용 시
import { Globe, User, Play } from '@/lib/icons';
```

---

## 🔒 보안 설정 (업데이트됨)

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
">
```

### 2. 개인정보 보호 (강화됨)

```typescript
// src/lib/privacy.ts
export const PrivacyManager = {
  // 닉네임만 세션 저장, 개인정보 수집 금지
  setNickname: (nickname: string) => {
    if (!/^[A-Za-z0-9가-힣]{1,10}$/.test(nickname)) {
      throw new Error('Invalid nickname format');
    }
    sessionStorage.setItem('temp_nickname', nickname);
  },
  
  // 세션 종료 시 데이터 삭제
  clearSession: () => {
    sessionStorage.removeItem('temp_nickname');
  },
  
  // 쿠키 사용 금지
  validateNoCookies: () => {
    return document.cookie === '';
  }
};
```

---

## 📊 성능 모니터링

### 1. 핵심 메트릭

| 메트릭 | 목표 | 현재 | 측정 도구 |
|--------|------|------|-----------|
| **FCP** | < 1.5s | TBM | Lighthouse |
| **LCP** | < 2.5s | TBM | Lighthouse |
| **CLS** | < 0.1 | TBM | Lighthouse |
| **접근성** | ≥ 95점 | TBM | Lighthouse |
| **번들 크기** | < 500KB | TBM | Bundle Analyzer |

### 2. 성능 측정 스크립트

```json
// package.json
{
  "scripts": {
    "perf:build": "npm run build && npm run perf:analyze",
    "perf:analyze": "npx vite-bundle-analyzer dist/stats.html",
    "perf:lighthouse": "npx lighthouse http://localhost:3000 --output html --output-path lighthouse-report.html",
    "perf:test": "npm run test:coverage && npm run perf:lighthouse"
  }
}
```

---

## 🚀 배포 전략

### 1. Cloudflare Pages 설정

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare Pages
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test:run
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: faceread
          directory: dist
```

### 2. 환경별 설정

```typescript
// src/lib/config.ts
export const config = {
  development: {
    apiUrl: 'http://localhost:3001',
    enableAnalytics: false,
    enableAds: false
  },
  
  production: {
    apiUrl: 'https://api.faceread.app',
    enableAnalytics: true,
    enableAds: true
  }
};

export const getConfig = () => {
  return config[import.meta.env.MODE as keyof typeof config] || config.development;
};
```

---

## 🧪 테스트 전략 (강화됨)

### 1. 컴포넌트 테스트

```typescript
// src/components/__tests__/AdBanner.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdBanner from '../AdBanner';

describe('AdBanner', () => {
  it('renders advertisement placeholder', () => {
    render(<AdBanner />);
    expect(screen.getByText('광고 배너 영역')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<AdBanner className="test-class" />);
    expect(container.firstChild).toHaveClass('test-class');
  });
});
```

### 2. E2E 테스트 시나리오

```typescript
// tests/e2e/quiz-flow.spec.ts
import { test, expect } from '@playwright/test';

test('complete quiz flow', async ({ page }) => {
  await page.goto('/');
  
  // 광고 배너 확인
  await expect(page.locator('[data-testid="ad-banner"]')).toBeVisible();
  
  // 닉네임 입력
  await page.fill('input[placeholder*="닉네임"]', '테스터');
  
  // 퀴즈 시작
  await page.click('button:has-text("퀴즈 시작하기")');
  
  // 10문제 진행
  for (let i = 0; i < 10; i++) {
    await page.click('[data-testid="answer-choice"]:first-child');
    await page.waitForTimeout(1500); // 애니메이션 대기
  }
  
  // 결과 화면 확인
  await expect(page.locator('[data-testid="quiz-result"]')).toBeVisible();
  
  // 설명보기 테스트
  await page.click('button:has-text("설명보기")');
  await expect(page.locator('[data-testid="explanations"]')).toBeVisible();
});
```

---

## 🔧 마이그레이션 및 정리

### 1. 제거된 기능들

| 기능 | 이유 | 대체 방안 |
|------|------|-----------|
| 통합 모드 | 사용자 요구사항 | 표준 모드만 제공 |
| 퀴즈 페이지 점수 표시 | 미니멀 디자인 | 결과 화면에서만 표시 |
| 복잡한 색상 테마 | 단순화 | 흰색 중심, 포인트 색상만 |
| 이모지 아이콘 | 일관성 | Lucide 아이콘 통일 |

### 2. 코드 정리 작업

```bash
# 미사용 의존성 제거
npm uninstall unused-package-1 unused-package-2

# 미사용 컴포넌트 제거
rm -rf src/components/unused/
rm -rf src/pages/IntegratedMode/

# 타입 정의 업데이트
# GameMode에서 'integrated' 제거
```

---

## 📋 개발 완료 체크리스트

### Phase 1 (완료됨) ✅
- [x] AdBanner 컴포넌트 생성
- [x] HomePage 레이아웃 개편
- [x] 통합 모드 제거 (타입 수정)
- [x] QuizPage 미니멀 디자인 적용
- [x] RewardScreen 기능 강화
- [x] CSS 색상 테마 업데이트
- [x] Lucide 아이콘 적용
- [x] 관련 문서 업데이트

### Phase 2 (향후 개선사항)
- [ ] 이미지 최적화 (WebP 변환)
- [ ] PWA 기능 추가
- [ ] 성능 최적화 (코드 스플리팅)
- [ ] 접근성 개선 (ARIA 레이블)
- [ ] 다국어 확장 (독일어, 일본어)
- [ ] A/B 테스트 기능

---

## 📈 성공 지표

### 기술 지표
- **빌드 시간**: < 30초
- **테스트 커버리지**: ≥ 90%
- **타입 안전성**: 100% (any 타입 사용 금지)
- **번들 크기**: < 500KB (gzipped)

### 사용자 경험 지표
- **Core Web Vitals**: 모든 임계값 충족
- **접근성 점수**: ≥ 95점
- **모바일 친화성**: 100%
- **검색 엔진 최적화**: ≥ 90점

---

**참고**: 이 문서는 실제 구현된 변경사항을 반영하여 업데이트되었습니다. 모든 기술 스택과 설정은 사용자 요구사항과 미니멀 디자인 원칙에 따라 최적화되었습니다. 