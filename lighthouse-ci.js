module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:4173'],
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
        // 모바일 시뮬레이션 (Moto G 3G)
        emulatedFormFactor: 'mobile',
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4
        },
        // 화면 크기
        screenEmulation: {
          mobile: true,
          width: 375,
          height: 667,
          deviceScaleFactor: 2
        }
      }
    },
    assert: {
      assertions: {
        // 성능 목표 (PRD 요구사항)
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        
        // Core Web Vitals 세부 목표
        'first-contentful-paint': ['error', { maxNumericValue: 1500 }], // < 1.5s
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }], // < 2.5s
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'first-input-delay': ['error', { maxNumericValue: 100 }], // < 100ms
        
        // 번들 크기 제한
        'total-byte-weight': ['warn', { maxNumericValue: 512000 }], // 500KB
        'unused-javascript': ['warn', { maxNumericValue: 51200 }], // 50KB
        'dom-size': ['warn', { maxNumericValue: 1500 }],
        
        // 리소스 최적화
        'uses-webp-images': ['warn'],
        'uses-optimized-images': ['warn'],
        'uses-text-compression': ['error'],
        'efficient-animated-content': ['warn'],
        
        // 보안 관련
        'is-on-https': ['error'],
        'csp-xss': ['warn'],
        
        // 접근성 세부 사항
        'color-contrast': ['error'],
        'button-name': ['error'],
        'link-name': ['error'],
        'image-alt': ['error'],
        'aria-valid-attr': ['error'],
        'aria-allowed-attr': ['error'],
        
        // 모바일 최적화
        'viewport': ['error'],
        'tap-targets': ['error'],
        'content-width': ['error']
      }
    },
    upload: {
      target: 'temporary-public-storage',
      reportFilenamePattern: 'lighthouse-report-%%DATETIME%%.json'
    }
  }
} 