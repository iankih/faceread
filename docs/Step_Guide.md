# **faceread AI Development Step Guide (v1.0)**

> **목적** : AI 개발툴(예: Cursor AI, PRD\_SUP\_AI)이 PRD v5.2를 기반으로 **정확한 단계별 개발**을 자동·반복적으로 진행할 수 있도록 \*"로드맵 + 체크리스트 + 자동 프롬프트"\*를 제공한다.
>
> **사용 방법** : AI는 매 대화/커밋 직전 `💾 현재 단계`를 확인하고, \*\*"완료 조건"\*\*을 충족했는지 스스로 점검한 뒤 `▶ 다음 단계로 이동` 또는 `⚠️ 보완 필요` 를 결정한다.

---

## 🔄 현재 진행 상황

**💾 현재 단계**: `DEV_STEP: 1` (VISION / MVP)  
**마지막 업데이트**: 2025-07-11

### ✅ STEP 0 - INIT 완료 (2025-07-11)
- ✅ Vite + React + TypeScript 프로젝트 생성
- ✅ Tailwind CSS 설치 및 PRD 컬러 팔레트 적용
- ✅ Radix UI 및 shadcn/ui 기본 설정
- ✅ 초기 빌드 성공 확인 (dist/assets 생성)
- ✅ 프리뷰 서버 실행 가능
- 🔄 **다음**: Cloudflare Pages 배포 설정 예정

**빌드 결과**: 
- CSS: 4.60 kB (gzipped: 1.25 kB)
- JS: 143.13 kB (gzipped: 46.16 kB)
- 성능 목표 달성 가능 상태

---

## 📑 단계 개요 (5‑Step Deep‑Dive)

| 단계 | 코드                        | 주요 산출물                             | 완료 조건 (AI 체크)                                                    |
| -- | ------------------------- | ---------------------------------- | ---------------------------------------------------------------- |
| 0  | ~~**INIT**~~                  | ~~환경 세팅 리포트~~                          | ~~• Vite + TS + Tailwind 초기 빌드 성공 <br>• Cloudflare Pages 프리뷰 링크 생성~~ |
| 1  | **VISION / MVP** ⬅️ 현재          | • 기능 목록(Must/Should) <br>• KPI 정의  | • PRD KPI & 성공 요소 반영 <br>• 팀 합의 🟢                               |
| 2  | **UX / UI**               | • UX 플로우 다이어그램 <br>• 첫 와이어프레임      | • 흐름 #2 적용 <br>• 광고 슬롯 위치 확정                                     |
| 3  | **TECH / NFR**            | • 스택 확정 시트 <br>• 성능·보안 체크리스트       | • 언어별 JSON import PoC 통과 <br>• Lighthouse P‑95 ≤ 목표              |
| 4  | **MODULE BUILD**          | • 핵심 모듈 5개 코드 <br>• Vitest 90 % 보고 | • `useQuiz` 랜덤성 테스트 통과 <br>• FCP/LCP 재측정 통과                      |
| 5  | **INTEGRATION / RELEASE** | • 베타 배포 <br>• 통합 설계 문서(최종)         | • KPI 대시보드 연결 <br>• FMEA 위험 대응 체크 🟢                             |

---

## 🔄 단계 전환 프로토콜 (AI Self‑Check)

1. **💾 현재 단계** 주석 확인 `// DEV_STEP:2`
2. **"완료 조건" 자동 테스트/CI** 결과 조회
3. **조건 충족?** → `commit -m "[STEP x COMPLETED] …"`
4. **`DEV_STEP` 변수 +1** & **다음 단계 “질문 리스트”** 출력

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

## 🛠 단계별 상세 가이드 & AI 프롬프트

### STEP 0 – INIT  `// DEV_STEP:0`

| 작업                | 세부                                                                         | AI Prompt 예시                     |
| ----------------- | -------------------------------------------------------------------------- | -------------------------------- |
| Repo 초기화          | `pnpm create vite faceread --template react-ts`                            | "Vite React‑TS 프로젝트 scaffold해 줘" |
| Tailwind 설치       | `pnpm add -D tailwindcss postcss autoprefixer` → `npx tailwindcss init -p` | "tailwind.config.js에 PRD 팔레트 등록" |
| Radix · shadcn/ui | `pnpm add @radix-ui/react-*` <br>`npx shadcn-ui@latest init`               | "shadcn/ui 설치 & Button 컴포넌트 생성"  |
| CI 연결             | GitHub Actions – Node 20 build <br>Cloudflare Pages deploy preview         | "Cloudflare Pages 프로젝트 설정 안내"    |

**완료 조건 CI 스크립트** : `pnpm run build && pnpm run preview --verify`

---

### STEP 1 – VISION / MVP  `// DEV_STEP:1`

| 작업      | 세부                    | AI Prompt 예시                    |
| ------- | --------------------- | ------------------------------- |
| 기능 분류   | Must / Should / Could | "표준 모드와 통합 모드 기능 trello 카드 만들어" |
| KPI 시트  | 공유율·재플레이·CTR 목표 설정    | "Notion에 KPI 표 삽입"              |
| 리스크 초기화 | FMEA 스켈레톤 작성          | "FMEA 템플릿에 잠재 실패 모드 5개 추가"      |

---

### STEP 2 – UX / UI  `// DEV_STEP:2`

| 작업          | 세부                        | AI Prompt 예시                    |
| ----------- | ------------------------- | ------------------------------- |
| UX 플로우      | 퀴즈 → 리워드 한 화면             | "Mermaid로 유저 플로우 시각화"           |
| Wireframe   | 모바일 우선, 광고 배너 포함          | "Figma-like ASCII 와이어프레임 그려줘"   |
| style guide | Tailwind class 토큰·ARIA 규칙 | "`tailwind.config.js` theme 확장" |

**자동 체크** : Radix UI a11y tests (`@axe-core/react`) 90% 통과

---

### STEP 3 – TECH / NFR  `// DEV_STEP:3`

| 작업            | 세부                                          | AI Prompt 예시                  |
| ------------- | ------------------------------------------- | ----------------------------- |
| Lazy‑load PoC | `import(./questions.en.json)` 테스팅           | "동적 import 빌드시 chunk size 출력" |
| Lighthouse CI | FCP/LCP·a11y report                         | "Lighthouse –preset=desktop"  |
| CSP 정책        | `meta http-equiv="Content-Security-Policy"` | "CSP 헤더 설명해 줘"                |

---

### STEP 4 – MODULE BUILD  `// DEV_STEP:4`

| 작업           | 세부                       | AI Prompt 예시                  |
| ------------ | ------------------------ | ----------------------------- |
| useQuiz      | 랜덤 & 중복 제거 유닛테스트         | "Vitest 시나리오 3개 작성"           |
| QuestionCard | 4지선다, 애니메이션 120 ms       | "Framer Motion fade-scale 코드" |
| RewardScreen | 공유 버튼 · 아코디언 해설          | "Radix Accordion API 사용법"     |
| useShare     | Web Share API + fallback | "UA 감지 util 만들어"              |

---

### STEP 5 – INTEGRATION / RELEASE  `// DEV_STEP:5`

| 작업      | 세부                           | AI Prompt 예시             |
| ------- | ---------------------------- | ------------------------ |
| Beta 배포 | `/beta` URL → 테스터 그룹         | "Plausible 이벤트 대시보드 스냅샷" |
| KPI 모니터 | CTR·재플레이 실시간 패널              | "Grafana 패널 설정"          |
| FMEA 리뷰 | 위험 대응 ✅ 체크                   | "FMEA 상태판 업데이트"          |
| 정식 릴리즈  | main merge → Cloudflare Prod | "릴리즈 노트 MD 생성"           |

---

## 📌 AI Self‑Prompt Snippet (공통)

> **“현재 단계: \${DEV\_STEP}. 완료 조건을 모두 검증했습니까?
> 미충족 항목은 무엇이며, 해결 플랜을 제안하세요.”**

AI는 각 커밋 전 위 프롬프트를 실행해 스스로 다음 행동을 결정한다.

---

### 문서 버전

* **v1.0** – 2025‑07‑11 초안 (PRD v5.2 기준)
* 향후 업데이트 시 `CHANGELOG` 섹션에 기록 후 AI가 자동 반영

---

**End of Guide**
