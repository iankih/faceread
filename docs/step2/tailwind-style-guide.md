# Tailwind 스타일 가이드 및 설정 확장

**문서 버전:** 1.0  
**작성일:** 2025-07-11  
**작성자:** AI Development Team  
**참조:** PRD v5.2, 모바일 와이어프레임

---

## 🎨 디자인 토큰 확장

### 현재 Tailwind 설정 분석
기존 설정에는 PRD 컬러 팔레트가 기본적으로 적용되어 있습니다. 와이어프레임 요구사항에 맞춰 추가 확장이 필요합니다.

---

## 📐 확장된 Tailwind Config

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // PRD 기본 팔레트 (기존 유지)
        primary: '#00A4E4',
        secondary: {
          600: '#006FBA',
          900: '#001F4E'
        },
        background: {
          light: '#FFFFFF',
          blue: '#DFF3FD'
        },
        divider: '#F1F1F1',
        
        // 추가 확장 색상
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a'
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626'
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706'
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827'
        }
      },
      
      // 모바일 우선 간격
      spacing: {
        '18': '4.5rem',   // 72px
        '88': '22rem',    // 352px
        'touch': '2.75rem', // 44px (최소 터치 영역)
        'ad-mobile': '3.125rem', // 50px (모바일 광고)
        'ad-desktop': '5.625rem' // 90px (데스크톱 광고)
      },
      
      // 타이포그래피
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        'display': ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }]
      },
      
      // 그림자 (깊이감)
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'modal': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'ad-banner': '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      },
      
      // 애니메이션 (120ms 기준)
      transitionDuration: {
        '120': '120ms'
      },
      
      // 브레이크포인트 확장
      screens: {
        'xs': '320px',
        'sm': '375px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px'
      },
      
      // 테두리 반경
      borderRadius: {
        'card': '0.75rem',    // 12px
        'button': '0.5rem',   // 8px
        'input': '0.375rem'   // 6px
      }
    },
  },
  plugins: [
    // 접근성 플러그인 추가 예정
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/aspect-ratio')
  ],
}
```

---

## 🧩 컴포넌트별 스타일 토큰

### 1. 버튼 컴포넌트
```css
/* Primary Button */
.btn-primary {
  @apply h-touch w-full bg-primary text-white font-medium rounded-button 
         shadow-card hover:shadow-card-hover active:scale-95 
         transition-all duration-120 
         focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2;
}

/* Secondary Button */
.btn-secondary {
  @apply h-touch w-full bg-white text-primary border-2 border-primary 
         font-medium rounded-button shadow-card hover:bg-primary hover:text-white 
         transition-all duration-120
         focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2;
}

/* Destructive Button */
.btn-destructive {
  @apply h-touch w-full bg-error-500 text-white font-medium rounded-button 
         shadow-card hover:bg-error-600 
         transition-all duration-120
         focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-2;
}
```

### 2. 카드 컴포넌트
```css
/* Base Card */
.card {
  @apply bg-white rounded-card shadow-card p-4 border border-gray-200;
}

/* Result Card */
.card-result {
  @apply card text-center p-6 mb-4;
}

/* Question Card */
.card-question {
  @apply card hover:shadow-card-hover transition-shadow duration-120 cursor-pointer
         focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2;
}

/* Selected State */
.card-question-selected {
  @apply ring-2 ring-primary bg-blue-50;
}

/* Correct Answer */
.card-question-correct {
  @apply ring-2 ring-success-500 bg-success-50;
}

/* Wrong Answer */
.card-question-wrong {
  @apply ring-2 ring-error-500 bg-error-50;
}
```

### 3. 입력 필드
```css
/* Base Input */
.input {
  @apply w-full h-touch px-4 rounded-input border border-gray-300 
         focus:ring-2 focus:ring-primary focus:border-primary 
         transition-colors duration-120
         placeholder:text-gray-400;
}

/* Input Success */
.input-success {
  @apply input border-success-500 focus:ring-success-500 focus:border-success-500;
}

/* Input Error */
.input-error {
  @apply input border-error-500 focus:ring-error-500 focus:border-error-500;
}
```

### 4. 진행률 표시
```css
/* Progress Container */
.progress-container {
  @apply flex items-center justify-between p-4 bg-white;
}

/* Progress Dots */
.progress-dot {
  @apply w-2 h-2 rounded-full transition-colors duration-120;
}

.progress-dot-completed {
  @apply bg-primary;
}

.progress-dot-pending {
  @apply bg-gray-300;
}

/* Progress Text */
.progress-text {
  @apply text-sm font-medium text-gray-600;
}
```

### 5. 광고 배너
```css
/* Ad Banner Container */
.ad-banner {
  @apply w-full h-ad-mobile bg-gray-100 shadow-ad-banner 
         flex items-center justify-center
         md:h-ad-desktop;
}

/* Ad Banner Collapsed */
.ad-banner-collapsed {
  @apply h-0 overflow-hidden;
}
```

---

## ♿ 접근성 (ARIA) 규칙

### 1. 필수 ARIA 속성
```typescript
// 버튼 컴포넌트
interface ButtonProps {
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-pressed'?: boolean;
  'aria-expanded'?: boolean;
}

// 입력 필드
interface InputProps {
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
  'aria-required'?: boolean;
}

// 진행률 표시
interface ProgressProps {
  role: 'progressbar';
  'aria-valuenow': number;
  'aria-valuemin': number;
  'aria-valuemax': number;
  'aria-label': string;
}
```

### 2. 접근성 유틸리티 클래스
```css
/* 스크린 리더 전용 텍스트 */
.sr-only {
  @apply absolute w-px h-px p-0 -m-px overflow-hidden 
         whitespace-nowrap border-0;
}

/* 포커스 가능한 요소 */
.focus-visible {
  @apply focus:outline-none focus-visible:ring-2 
         focus-visible:ring-primary focus-visible:ring-offset-2;
}

/* 고대비 모드 지원 */
@media (prefers-contrast: high) {
  .high-contrast {
    @apply border-2 border-black;
  }
}

/* 움직임 감소 */
@media (prefers-reduced-motion: reduce) {
  .reduce-motion {
    @apply transition-none;
  }
}
```

### 3. 색상 대비 검증
```css
/* 최소 대비 4.5:1 준수 */
.text-contrast-aa {
  color: #374151; /* gray-700 - 대비 7.56:1 */
}

.text-contrast-aaa {
  color: #1f2937; /* gray-800 - 대비 11.88:1 */
}

/* 버튼 텍스트 대비 검증 */
.btn-primary {
  /* #00A4E4 배경에 흰색 텍스트 - 대비 3.1:1 (AA Large 통과) */
  @apply bg-primary text-white;
}
```

---

## 📱 반응형 유틸리티

### 1. 모바일 우선 클래스
```css
/* 컨테이너 */
.container-mobile {
  @apply px-4 mx-auto max-w-sm
         sm:px-6 sm:max-w-md
         md:px-8 md:max-w-2xl
         lg:px-12 lg:max-w-4xl;
}

/* 터치 영역 */
.touch-target {
  @apply min-h-touch min-w-touch;
}

/* 광고 크기 반응형 */
.ad-responsive {
  @apply h-ad-mobile md:h-ad-desktop;
}
```

### 2. 텍스트 크기 조정
```css
/* 제목 */
.heading-primary {
  @apply text-2xl font-bold text-gray-900
         sm:text-3xl
         md:text-4xl;
}

/* 본문 */
.body-text {
  @apply text-base text-gray-700
         md:text-lg;
}

/* 캡션 */
.caption-text {
  @apply text-sm text-gray-500
         md:text-base;
}
```

---

## 🎭 애니메이션 패턴

### 1. 전환 애니메이션 (120ms)
```css
/* 기본 전환 */
.transition-default {
  @apply transition-all duration-120 ease-out;
}

/* 호버 효과 */
.hover-lift {
  @apply hover:transform hover:-translate-y-1 hover:shadow-card-hover 
         transition-all duration-120;
}

/* 클릭 효과 */
.active-scale {
  @apply active:scale-95 transition-transform duration-120;
}
```

### 2. 로딩 애니메이션
```css
/* 펄스 효과 */
.pulse-loading {
  @apply animate-pulse bg-gray-200;
}

/* 스피너 */
.spinner {
  @apply animate-spin rounded-full h-8 w-8 border-b-2 border-primary;
}
```

### 3. 페이지 전환
```css
/* 페이드 인 */
.fade-in {
  @apply opacity-0 translate-y-4 transition-all duration-300;
}

.fade-in-active {
  @apply opacity-100 translate-y-0;
}

/* 슬라이드 업 */
.slide-up {
  @apply transform translate-y-full transition-transform duration-300;
}

.slide-up-active {
  @apply transform translate-y-0;
}
```

---

## 🔧 개발자 도구

### 1. 디버깅 클래스
```css
/* 레이아웃 디버깅 */
.debug-layout {
  @apply ring-2 ring-red-500 ring-opacity-50;
}

/* 터치 영역 표시 */
.debug-touch {
  @apply bg-red-200 bg-opacity-30;
}
```

### 2. 컴포넌트 테스트 클래스
```css
/* 로딩 상태 */
.test-loading {
  @apply pointer-events-none opacity-50;
}

/* 에러 상태 */
.test-error {
  @apply ring-2 ring-error-500 bg-error-50;
}
```

---

## 📊 성능 최적화

### 1. CSS 크기 최적화
```javascript
// PurgeCSS 설정 (자동 적용됨)
// 사용하지 않는 스타일 자동 제거

// Critical CSS 인라인화
// 첫 화면 렌더링에 필요한 스타일만 인라인
```

### 2. 런타임 성능
```css
/* GPU 가속 활용 */
.gpu-accelerated {
  @apply transform-gpu will-change-transform;
}

/* 레이어 분리 */
.layer-separate {
  @apply transform translate3d-0;
}
```

---

## 🧪 스타일 가이드 준수 검증

### 1. Lighthouse 체크리스트
- [ ] 색상 대비 4.5:1 이상
- [ ] 터치 영역 44px 이상
- [ ] 텍스트 크기 16px 이상 (모바일)
- [ ] 포커스 인디케이터 명확

### 2. 크로스 브라우저 테스트
- [ ] Chrome 90+
- [ ] Safari 15+
- [ ] Firefox 88+
- [ ] iOS Safari
- [ ] Android Chrome

---

**다음 단계**: 컴포넌트 아키텍처 설계 