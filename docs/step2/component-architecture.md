# 컴포넌트 아키텍처 설계 (업데이트됨)

**문서 버전:** 2.0  
**작성일:** 2025-07-11  
**최종 수정:** 2025-07-11  
**작성자:** AI Development Team  
**참조:** PRD v5.2 섹션 6, 와이어프레임, 스타일 가이드

---

## 🏗️ 아키텍처 개요

### 설계 원칙
1. **단일 책임 원칙**: 각 컴포넌트는 하나의 명확한 역할
2. **재사용성**: 공통 UI 컴포넌트의 높은 재사용성
3. **확장성**: 새로운 기능 추가 시 기존 구조 변경 최소화
4. **테스트 용이성**: 각 컴포넌트의 독립적 테스트 가능
5. **미니멀 디자인**: 흰색 중심의 깔끔한 UI

### 기술 스택 재확인
- **React 18**: 함수형 컴포넌트 + Hooks
- **TypeScript 5**: 엄격한 타입 검사
- **Tailwind CSS**: 유틸리티 퍼스트 스타일링
- **Radix UI**: 접근성 기반 헤드리스 컴포넌트
- **Lucide React**: 아이콘 라이브러리
- **Framer Motion**: 120ms 기준 애니메이션 (선택적)

---

## 📂 디렉토리 구조 (업데이트됨)

```
src/
├── components/           # 컴포넌트
│   ├── ui/              # shadcn/ui 기본 컴포넌트
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── modal.tsx
│   │   ├── progress.tsx
│   │   └── accordion.tsx
│   ├── AdBanner.tsx     # 광고 배너 컴포넌트 (신규)
│   ├── QuestionCard.tsx # 퀴즈 카드 컴포넌트
│   ├── RewardScreen.tsx # 결과 화면 컴포넌트
│   └── shared/          # 공통 컴포넌트
│       ├── LoadingSpinner.tsx
│       ├── ErrorBoundary.tsx
│       └── Toast.tsx
├── pages/               # 페이지 컴포넌트
│   ├── HomePage.tsx     # 메인 페이지 (완전 개편)
│   ├── QuizPage.tsx     # 퀴즈 페이지 (미니멀 디자인)
│   └── ResultPage.tsx   # 결과 페이지
├── hooks/               # 커스텀 훅
│   ├── useQuiz.ts
│   ├── useShare.ts
│   ├── useLocalStorage.ts
│   ├── useAnalytics.ts
│   └── useMediaQuery.ts
├── contexts/            # 전역 상태 컨텍스트
│   ├── QuizContext.tsx
│   ├── AnalyticsContext.tsx
│   └── ThemeContext.tsx
├── types/               # TypeScript 타입 정의
│   ├── quiz.ts          # GameMode 타입 수정 (표준 모드만)
│   ├── analytics.ts
│   └── api.ts
├── lib/                 # 유틸리티 라이브러리
│   ├── utils.ts
│   ├── analytics.ts
│   ├── validation.ts
│   └── constants.ts
├── data/                # 데이터 파일
│   ├── questions.ko.json
│   ├── questions.en.json
│   ├── questions.es.json
│   └── i18n/
│       ├── ko.json
│       ├── en.json
│       └── es.json
└── assets/              # 정적 자산
    ├── images/
    │   ├── faces/
    │   ├── eyes/
    │   └── share/
    └── icons/
```

---

## 🧩 핵심 컴포넌트 설계

### 1. AdBanner (광고 배너 - 신규)

```typescript
// src/components/AdBanner.tsx
interface AdBannerProps {
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ className = '' }) => {
  return (
    <div className={`w-full bg-gray-50 border-b border-gray-200 ${className}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center h-16 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-gray-400">
            <AlertCircle size={16} />
            <span className="text-sm font-medium">광고 배너 영역</span>
          </div>
        </div>
      </div>
    </div>
  );
};
```

### 2. HomePage (완전 개편)

```typescript
// src/pages/HomePage.tsx
export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 광고 배너 */}
      <AdBanner />

      {/* 상단바 */}
      <header className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* 언어 선택 */}
            <div className="flex items-center gap-2">
              <Globe size={20} className="text-gray-500" />
              <LanguageSelector />
            </div>

            {/* 로고 */}
            <h1 className="text-2xl font-bold text-gray-800">FaceRead</h1>

            {/* 빈 공간 (대칭을 위해) */}
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* 중앙 카드 */}
          <QuizStartCard />
          
          {/* 설명 텍스트 */}
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">
              나의 감정읽는 능력은 얼마나 될까?
            </p>
          </div>
        </div>
      </main>

      {/* 하단바 */}
      <footer className="mt-auto bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>© 2024 FaceRead • 감정 인식 능력 테스트</p>
            <p className="mt-1">얼굴 표정을 통해 감정을 읽는 능력을 재미있게 체험해보세요</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
```

### 3. QuizPage (미니멀 디자인)

```typescript
// src/pages/QuizPage.tsx
export const QuizPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header with Progress */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain size={20} className="text-primary" />
              <h1 className="text-lg font-bold text-gray-800">FaceRead</h1>
              <span className="text-sm text-gray-600">
                {nickname}님의 퀴즈
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-500" />
                <span className="text-sm text-gray-600">
                  {currentQuestion} / {totalQuestions}
                </span>
              </div>
              <ProgressBar />
            </div>
          </div>
        </div>
      </header>

      {/* Quiz Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <QuestionCard />
        </div>
      </main>
    </div>
  );
};
```

### 4. RewardScreen (강화된 결과 화면)

```typescript
// src/components/RewardScreen.tsx
export const RewardScreen: React.FC<RewardScreenProps> = ({
  result,
  nickname,
  onRestart
}) => {
  const [showExplanations, setShowExplanations] = useState(false);

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-lg mx-auto">
        {/* 메인 결과 카드 */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 mb-6">
          {/* 등급 표시 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 mb-4">
              <Award size={18} className={gradeColors[result.grade]} />
              <span className={`font-bold ${gradeColors[result.grade]}`}>
                {gradeLabels[result.grade]}
              </span>
            </div>
          </div>

          {/* 점수 표시 */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Target size={24} className="text-primary" />
              <span className="text-5xl font-bold text-gray-800">
                {result.score}
              </span>
              <span className="text-2xl text-gray-500 self-end mb-1">
                /{result.totalQuestions}
              </span>
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="space-y-3">
            <Button onClick={handleShare} size="lg" className="w-full">
              <Share2 size={18} className="mr-2" />
              결과 공유하기
            </Button>
            
            <Button onClick={onRestart} variant="outline" size="lg" className="w-full">
              <RotateCcw size={18} className="mr-2" />
              다시 도전하기
            </Button>
          </div>
        </div>

        {/* 설명보기 섹션 */}
        {result.incorrectAnswers.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <Button
              onClick={() => setShowExplanations(!showExplanations)}
              variant="ghost"
              className="w-full flex items-center justify-between p-4 h-auto text-left"
            >
              <div className="flex items-center gap-2">
                <Eye size={18} className="text-gray-600" />
                <span className="font-medium text-gray-800">
                  틀린 문제 설명보기 ({result.incorrectAnswers.length}개)
                </span>
              </div>
              {showExplanations ? (
                <ChevronUp size={18} className="text-gray-500" />
              ) : (
                <ChevronDown size={18} className="text-gray-500" />
              )}
            </Button>
            
            {showExplanations && (
              <ExplanationSection wrongAnswers={result.incorrectAnswers} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
```

---

## 🎨 디자인 시스템 변경사항

### 색상 테마 (업데이트됨)
- **Primary**: #00A4E4 (포인트로만 사용)
- **Background**: #FFFFFF (메인 배경)
- **Background-light**: #FAFAFA (연한 회색, 이전 #DFF3FD에서 변경)
- **Border**: #F1F1F1
- **Text**: #1a1a1a (메인), #6B7280 (보조)

### 아이콘 시스템
- **Lucide React**: 모든 아이콘 통일
- **크기**: 16px, 18px, 20px, 24px
- **색상**: text-gray-500, text-gray-600, text-primary

### 레이아웃 원칙
- **모바일 퍼스트**: 320px 최소 폭
- **미니멀 디자인**: 불필요한 요소 제거
- **광고 친화적**: 상단 배너 영역 확보
- **접근성**: WCAG 2.1 AA 준수

---

## 🚀 주요 변경사항

### 1. 새로운 컴포넌트
- `AdBanner`: 광고 배너 컴포넌트
- 통합 모드 관련 컴포넌트 제거

### 2. UI/UX 개선
- HomePage 완전 개편 (새로운 레이아웃)
- QuizPage 하단 정보 제거 (미니멀 디자인)
- RewardScreen 점수 표시 강화 및 설명보기 기능 추가

### 3. 디자인 시스템
- 흰색 중심 테마로 변경
- Lucide 아이콘 도입
- 불필요한 색상 제거 (미니멀)

### 4. 기능 변경
- 표준 모드만 유지 (통합 모드 제거)
- 점수는 결과 화면에서만 표시
- 문제별 설명은 접기/펼치기 형태로 제공

---

## 📋 개발 우선순위

### Phase 1 (완료됨)
- [x] AdBanner 컴포넌트 생성
- [x] HomePage 레이아웃 개편
- [x] QuizPage 미니멀 디자인 적용
- [x] RewardScreen 기능 강화
- [x] 색상 테마 업데이트
- [x] Lucide 아이콘 적용

### Phase 2 (향후)
- [ ] 성능 최적화 (이미지 로딩, 코드 스플리팅)
- [ ] 접근성 개선 (ARIA 레이블, 키보드 네비게이션)
- [ ] 다국어 지원 확장
- [ ] PWA 기능 추가

---

**참고**: 이 문서는 실제 구현된 컴포넌트 구조를 반영하여 업데이트되었습니다. 모든 변경사항은 사용자 요구사항과 미니멀 디자인 원칙에 따라 적용되었습니다. 