# KPI 대시보드 및 성공 지표

**문서 버전:** 1.0  
**작성일:** 2025-07-11  
**작성자:** AI Development Team  
**참조:** PRD v5.2, 제품 비전

---

## 🎯 핵심 KPI 요약

| KPI | 목표값 | 현재값 | 상태 |
|-----|--------|--------|------|
| **공유 클릭률** | ≥ 15% | TBD | 🔄 |
| **세션당 재플레이** | ≥ 1.8회 | TBD | 🔄 |
| **광고 CTR** | ≥ 0.9% | TBD | 🔄 |

---

## 📊 1. 공유 클릭률 (Share Click Rate)

### 정의
결과 화면에서 공유 버튼을 클릭한 사용자 비율

### 계산 공식
```
공유 클릭률 = (공유 버튼 클릭 수 / 퀴즈 완료 수) × 100
```

### 목표 설정
- **최소 목표:** 15%
- **기대 목표:** 20%
- **스트레치 목표:** 25%

### 측정 방법
```typescript
// 이벤트 추적
analytics.track('quiz_completed', { userId, score, grade });
analytics.track('share_clicked', { userId, shareType: 'clipboard' | 'social' });
```

### 개선 전략
- [ ] 매력적인 결과 카드 디자인
- [ ] 간편한 공유 UI/UX
- [ ] 공유 유도 메시지 최적화
- [ ] 소셜 미디어 최적화 (OG 태그)

---

## 🔄 2. 세션당 재플레이 (Replay per Session)

### 정의
한 세션 내에서 사용자가 퀴즈를 재시도한 평균 횟수

### 계산 공식
```
세션당 재플레이 = 총 퀴즈 시작 수 / 고유 세션 수
```

### 목표 설정
- **최소 목표:** 1.8회
- **기대 목표:** 2.2회
- **스트레치 목표:** 2.5회

### 측정 방법
```typescript
// 세션 추적
analytics.track('session_start', { sessionId, timestamp });
analytics.track('quiz_start', { sessionId, attemptNumber });
analytics.track('quiz_completed', { sessionId, attemptNumber, score });
```

### 개선 전략
- [ ] 다양한 문제 유형으로 재미 증대
- [ ] 실패 시 재도전 유도 메시지
- [ ] 통합 모드로 난이도 조절 가능
- [ ] 오답 해설로 학습 동기 부여

---

## 💰 3. 광고 CTR (Ad Click-Through Rate)

### 정의
광고 노출 대비 클릭 비율

### 계산 공식
```
광고 CTR = (광고 클릭 수 / 광고 노출 수) × 100
```

### 목표 설정
- **최소 목표:** 0.9%
- **기대 목표:** 1.2%
- **스트레치 목표:** 1.5%

### 측정 방법
```typescript
// 광고 이벤트 추적
analytics.track('ad_impression', { adSlot: 'top_banner', adId });
analytics.track('ad_click', { adSlot: 'top_banner', adId });
```

### 개선 전략
- [ ] 컨텐츠와 광고 컬러 대비 최적화
- [ ] 적절한 광고 위치 선정 (상단 고정)
- [ ] 모바일 최적화된 광고 크기
- [ ] 관련성 높은 광고 콘텐츠

---

## 📈 보조 지표 (Secondary Metrics)

### 사용자 참여도
| 지표 | 목표값 | 측정 방법 |
|------|--------|-----------|
| **완료율** | ≥ 85% | (퀴즈 완료 / 퀴즈 시작) × 100 |
| **평균 소요 시간** | 2-3분 | 시작~완료 시간 측정 |
| **이탈률** | ≤ 15% | 중간 이탈 사용자 비율 |

### 기술 성능
| 지표 | 목표값 | 측정 방법 |
|------|--------|-----------|
| **FCP (First Contentful Paint)** | < 1.5s | Web Vitals API |
| **LCP (Largest Contentful Paint)** | < 2.5s | Web Vitals API |
| **CLS (Cumulative Layout Shift)** | < 0.1 | Web Vitals API |

### 접근성 & 품질
| 지표 | 목표값 | 측정 방법 |
|------|--------|-----------|
| **Lighthouse 접근성 점수** | ≥ 95 | 자동화된 Lighthouse CI |
| **브라우저 호환성** | 99% | BrowserStack 테스트 |
| **에러율** | < 1% | 에러 로깅 및 모니터링 |

---

## 🔍 분석 도구 및 구현

### 1. 기본 분석 스택
```typescript
// src/lib/analytics.ts
interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: number;
  sessionId: string;
  userId?: string;
}

class Analytics {
  track(event: string, properties: Record<string, any>) {
    // Google Analytics 4 또는 경량 분석 도구
  }
  
  trackPageView(path: string) {
    // 페이지뷰 추적
  }
  
  trackWebVitals(vitals: WebVitals) {
    // 성능 지표 추적
  }
}
```

### 2. 대시보드 구성
- **실시간 모니터링**: KPI 현황 표시
- **일일/주간/월간 리포트**: 트렌드 분석
- **A/B 테스트 결과**: 개선사항 검증
- **알람 시스템**: 목표치 미달성 시 알림

---

## 📅 KPI 모니터링 일정

### 일일 체크 (Daily)
- [ ] 실시간 사용자 수
- [ ] 오늘의 완료율
- [ ] 시스템 에러율

### 주간 리뷰 (Weekly)
- [ ] 핵심 KPI 3개 달성률
- [ ] 사용자 피드백 분석
- [ ] 성능 지표 검토

### 월간 분석 (Monthly)
- [ ] KPI 트렌드 분석
- [ ] 개선사항 도출
- [ ] 다음 달 목표 설정

---

## 🚨 위험 신호 및 대응

### 공유 클릭률 < 10%
- **원인 분석**: UX 문제, 결과 만족도 낮음
- **대응책**: 결과 카드 개선, 공유 유도 메시지 수정

### 재플레이율 < 1.5회
- **원인 분석**: 지루함, 난이도 문제
- **대응책**: 문제 다양성 증대, 모드 추가

### 광고 CTR < 0.5%
- **원인 분석**: 광고 위치, 관련성 문제
- **대응책**: 광고 배치 최적화, 타겟팅 개선

---

## 🎯 성공 시나리오

**1개월 후 목표:**
- 일일 활성 사용자 1,000명
- 공유를 통한 바이럴 확산 시작
- 광고 수익 월 $500 달성

**3개월 후 목표:**
- 월간 활성 사용자 50,000명
- 소셜 미디어에서 자발적 언급 증가
- 광고 수익 월 $5,000 달성

---

**다음 단계:** FMEA 리스크 분석 수행 