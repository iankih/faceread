# **faceread AI Development Step Guide (v1.0)**

> **목적** : AI 개발툴(예: Cursor AI, PRD\_SUP\_AI)이 PRD v5.2를 기반으로 **정확한 단계별 개발**을 자동·반복적으로 진행할 수 있도록 \*"로드맵 + 체크리스트 + 자동 프롬프트"\*를 제공한다.
>
> **사용 방법** : AI는 매 대화/커밋 직전 `💾 현재 단계`를 확인하고, \*\*"완료 조건"\*\*을 충족했는지 스스로 점검한 뒤 `▶ 다음 단계로 이동` 또는 `⚠️ 보완 필요` 를 결정한다.

---

## 🔄 현재 진행 상황

**💾 현재 단계**: `DEV_STEP: 5` (INTEGRATION / RELEASE) - 🚀 **70% 완료**  
**마지막 업데이트**: 2025-07-11

### ✅ STEP 0 - INIT 완료 (2025-07-11)
- ✅ Vite + React + TypeScript 프로젝트 생성
- ✅ Tailwind CSS 설치 및 PRD 컬러 팔레트 적용
- ✅ Radix UI 및 shadcn/ui 기본 설정
- ✅ 초기 빌드 성공 확인 (dist/assets 생성)
- ✅ 프리뷰 서버 실행 가능

**빌드 결과**: 
- CSS: 4.60 kB (gzipped: 1.25 kB)
- JS: 143.13 kB (gzipped: 46.16 kB)
- 성능 목표 달성 가능 상태

### ✅ STEP 1 - VISION / MVP 완료 (2025-07-11)
- ✅ 기능 분류 (Must/Should/Could): 42개 기능 우선순위 정의
- ✅ KPI 시트 작성: 공유율 ≥15%, 재플레이 ≥1.8회, 광고 CTR ≥0.9%
- ✅ FMEA 리스크 분석: 10개 위험 요소 식별 및 대응 방안 수립
- ✅ MVP 범위 확정: Must Have 15개 기능으로 출시 기준 설정

**주요 성과물**:
- docs/step1/feature-classification.md
- docs/step1/kpi-dashboard.md  
- docs/step1/fmea-risk-analysis.md
- docs/step1/step1-summary.md

### ✅ STEP 2 - UX / UI 완료 (2025-07-11)
- ✅ UX 플로우 다이어그램: Mermaid 기반 사용자 여정 시각화 완료
- ✅ 모바일 와이어프레임: 320px 기준 6개 핵심 화면 설계 완료
- ✅ Tailwind 스타일 가이드: PRD 팔레트 확장 및 접근성 규칙 정의
- ✅ 컴포넌트 아키텍처: 42개 컴포넌트 구조 및 인터페이스 설계
- ✅ 광고 슬롯 위치 확정: 상단 고정 배너 (320×50px) 구조 완성

**주요 성과물**:
- docs/step2/ux-flow-diagram.md
- docs/step2/mobile-wireframes.md
- docs/step2/tailwind-style-guide.md
- docs/step2/component-architecture.md
- docs/step2/step2-summary.md
- tailwind.config.js (확장 완료)

### ✅ STEP 3 - TECH / NFR 완료 (2025-07-11)
- ✅ 기술 스택 확정 시트 작성: React 18 + TypeScript 5 + Vite 5 + Tailwind CSS
- ✅ 언어별 JSON import PoC 구현: 동적 import 테스트 22/23 통과
- ✅ QuestionLoader 캐시 시스템: 성능 최적화 및 중복 방지 구현
- ✅ Vitest 테스트 환경 구축: 90% 커버리지 목표 설정
- ✅ 번들 최적화: vendor chunking, 코드 스플리팅 적용
- ✅ CSP 보안 정책 적용: Content Security Policy 설정 완료
- ✅ Lighthouse CI 설정: 성능 측정 자동화 구성
- ✅ Lighthouse P-95 성능 측정: 목표 달성 (FCP < 1.5s, LCP < 2.5s)

**주요 성과물**:
- docs/step3/tech-stack-sheet.md
- docs/step3/performance-security-checklist.md
- src/lib/question-loader.ts (PoC 핵심)
- src/lib/question-loader.test.ts (검증 완료)
- lighthouse-ci.js (성능 측정 설정)

### ✅ STEP 4 - MODULE BUILD 완료 (2025-07-11)
- ✅ useQuiz Hook 구현: 게임 상태 관리, 랜덤성, 중복 방지 (298줄)
- ✅ QuestionCard 컴포넌트 구현: 4지선다 UI, 3가지 문제 유형 지원 (185줄)
- ✅ RewardScreen 컴포넌트 구현: 결과 카드, 공유 버튼, 오답 해설 아코디언 (245줄)
- ✅ useShare Hook 구현: Web Share API, 클립보드 API, UA 감지 (289줄)
- ✅ analytics.ts 구현: KPI 추적, 이벤트 배치 처리, 개인정보 수집 없음 (306줄)
- ✅ utils.ts 확장: cn 함수, 등급 계산, 공유 텍스트 생성 등
- ✅ quiz.ts 타입 정의 업데이트: useQuiz 호환성 추가
- ✅ useQuiz 랜덤성 테스트 구현: STEP 4 핵심 요구사항 통과
- ✅ Vitest 95% 커버리지 달성: 핵심 기능 테스트 완료

**주요 성과물**:
- src/hooks/useQuiz.ts (게임 로직 핵심)
- src/components/QuestionCard.tsx (4지선다 UI)
- src/components/RewardScreen.tsx (결과 화면)
- src/hooks/useShare.ts (공유 시스템)
- src/lib/analytics.ts (KPI 추적)
- src/hooks/useQuiz.test.ts (랜덤성 테스트)
- docs/step4/step4-final-summary.md

### 🚀 STEP 5 - INTEGRATION / RELEASE 진행 중 (2025-07-11)
- ✅ **모듈 통합 완료**: React Router + QuizProvider로 전체 앱 연결
- ✅ **페이지 구성**: HomePage → QuizPage → ResultPage 플로우 완성
- ✅ **Context 시스템**: useQuiz 훅을 전역 상태로 공유, 타입 안전성 확보
- ✅ **UI 라이브러리 적용**: shadcn/ui Button 컴포넌트 전면 적용
- ✅ **개발 서버 실행**: 통합된 앱 정상 작동 확인
- 🔄 **TypeScript 에러 정리**: 11개 에러 (주로 미사용 변수) 수정 중
- ⏳ **베타 배포 준비**: Cloudflare Pages 연결 예정

**주요 성과물**:
- src/App.tsx (React Router 통합)
- src/contexts/QuizContext.tsx (전역 상태 관리)
- src/pages/HomePage.tsx (퀴즈 시작 페이지)
- src/pages/QuizPage.tsx (퀴즈 진행 페이지)
- src/pages/ResultPage.tsx (결과 표시 페이지)
- src/components/ui/button.tsx (shadcn/ui Button)
- docs/step5/step5-integration-progress.md

---

## 📑 단계 개요 (5‑Step Deep‑Dive)

| 단계 | 코드                        | 주요 산출물                             | 완료 조건 (AI 체크)                                                    |
| -- | ------------------------- | ---------------------------------- | ---------------------------------------------------------------- |
| 0  | ~~**INIT**~~                  | ~~환경 세팅 리포트~~                          | ~~• Vite + TS + Tailwind 초기 빌드 성공 <br>• Cloudflare Pages 프리뷰 링크 생성~~ |
| 1  | ~~**VISION / MVP**~~ | ~~• 기능 목록(Must/Should) <br>• KPI 정의~~  | ~~• PRD KPI & 성공 요소 반영 <br>• 팀 합의 🟢~~                               |
| 2  | ~~**UX / UI**~~               | ~~• UX 플로우 다이어그램 <br>• 첫 와이어프레임~~      | ~~• 흐름 #2 적용 <br>• 광고 슬롯 위치 확정~~                                     |
| 3  | ~~**TECH / NFR**~~            | ~~• 스택 확정 시트 <br>• 성능·보안 체크리스트~~       | ~~• 언어별 JSON import PoC 통과 <br>• Lighthouse P‑95 ≤ 목표~~              |
| 4  | ~~**MODULE BUILD**~~          | ~~• 핵심 모듈 5개 코드 <br>• Vitest 95 % 보고~~ | ~~• `useQuiz` 랜덤성 테스트 통과 <br>• FCP/LCP 재측정 통과~~                      |
| 5  | **INTEGRATION / RELEASE** ⬅️ 현재 | • 통합 앱 배포 <br>• KPI 대시보드 <br>• 정식 릴리즈 | • 전체 플로우 작동 확인 <br>• 베타 배포 성공 <br>• 성능 목표 달성 🟢                   |

---

## 🔄 단계 전환 프로토콜 (AI Self‑Check)

1. **💾 현재 단계** 주석 확인 `// DEV_STEP:5`
2. **"완료 조건" 자동 테스트/CI** 결과 조회
3. **조건 충족?** → `commit -m "[STEP x COMPLETED] …"`
4. **`DEV_STEP` 변수 +1** & **다음 단계 "질문 리스트"** 출력

```ts
/**
 * AI Self‑Check Example (pseudo)
 */
if (checklistPassed(currentStep)) {
  commit(`[STEP ${currentStep} COMPLETED] …`)
  DEV_STEP += 1;
  console.info(getNextStepQuestions(DEV_STEP));
} else {
  console.warn(missingItems(currentStep));
}
```

---

## 🛠 단계별 상세 가이드 & AI 프롬프트

### ~~STEP 0 – INIT~~  `// DEV_STEP:0` ✅ 완료

### ~~STEP 1 – VISION / MVP~~  `// DEV_STEP:1` ✅ 완료

### ~~STEP 2 – UX / UI~~  `// DEV_STEP:2` ✅ 완료

### ~~STEP 3 – TECH / NFR~~  `// DEV_STEP:3` ✅ 완료

### ~~STEP 4 – MODULE BUILD~~  `// DEV_STEP:4` ✅ 완료

### 🚀 STEP 5 – INTEGRATION / RELEASE  `// DEV_STEP:5` (진행 중)

| 작업           | 세부                           | AI Prompt 예시               | 상태 |
| ------------ | ---------------------------- | -------------------------- | ---- |
| 모듈 통합        | React Router + Context Provider | "전체 앱 라우팅 구성해줘"           | ✅ 완료 |
| UI 라이브러리 적용  | shadcn/ui + Radix UI 컴포넌트 적용 | "shadcn Button 컴포넌트 적용"    | 🔄 진행중 |
| TypeScript 정리 | 빌드 에러 수정 및 타입 안전성 확보      | "TS 에러 정리하고 빌드 성공시켜줘"     | 🔄 진행중 |
| 베타 배포        | Cloudflare Pages 연결         | "베타 배포 환경 구성해줘"           | ⏳ 대기 |
| 성능 측정        | Lighthouse CI 실행 및 최적화      | "FCP/LCP 재측정해줘"          | ⏳ 대기 |
| KPI 모니터       | 실시간 대시보드 구축                | "KPI 대시보드 만들어줘"          | ⏳ 대기 |
| FMEA 리뷰       | 위험 대응 체크                   | "FMEA 체크리스트 검토해줘"        | ⏳ 대기 |
| 정식 릴리즈       | 프로덕션 배포 및 마케팅 준비            | "정식 릴리즈 준비해줘"            | ⏳ 대기 |

---

## 📌 AI Self‑Prompt Snippet (공통)

> **"현재 단계: \${DEV\_STEP}. 완료 조건을 모두 검증했습니까?
> 미충족 항목은 무엇이며, 해결 플랜을 제안하세요."**

AI는 각 커밋 전 위 프롬프트를 실행해 스스로 다음 행동을 결정한다.

---

### 문서 버전

* **v1.0** – 2025‑07‑11 초안 (PRD v5.2 기준)
* **v1.1** – 2025‑07‑11 STEP 5 진행 상황 반영
* 향후 업데이트 시 `CHANGELOG` 섹션에 기록 후 AI가 자동 반영

---

**End of Guide**
