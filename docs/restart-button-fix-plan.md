# "다시하기" 버튼 먹통 현상 해결 계획서

## 📋 프로젝트 개요

- **문제**: 결과 페이지에서 "다시하기" 버튼 클릭 시 페이지가 먹통되는 현상
- **원인**: Race Condition으로 인한 상태 관리 충돌
- **해결방안**: 기존 resetToHome 함수 활용 + 조건부 렌더링 개선
- **우선순위**: High (사용자 경험에 직접적 영향)

## 🔍 문제 분석 결과

### 1. 핵심 문제점
```typescript
// ResultPage.tsx:14-19 - 문제가 되는 코드
const handleRestart = () => {
  quiz.resetQuiz()                    // 동기: 상태 초기화
  quiz.loadQuestions(quiz.language)   // 비동기: 문제 로딩 시작
  quiz.setStep('intro')               // 동기: 즉시 화면 전환
}
```

**Race Condition 발생 구조:**
1. `resetQuiz()` → 상태 초기화 (questions 유지됨)
2. `loadQuestions()` → 비동기 로딩 시작 (await 없음)
3. `setStep('intro')` → 즉시 화면 전환
4. **충돌**: 비동기 로딩 완료 시 예상치 못한 상태 변경

### 2. 조건부 렌더링 문제
```typescript
// ResultPage.tsx:9-12
if (!quiz.isQuizFinished || !quiz.quizResult) {
  quiz.setStep('intro')  // 렌더링 중 동기적 상태 변경
  return null
}
```

## 🎯 해결 전략

### 선택된 방안: **기존 함수 활용 + 최적화**

**이유:**
- `useQuiz.ts:336-343`에 이미 `resetToHome` 함수 존재
- 완전한 초기화 로직이 구현되어 있음
- Race Condition 완전 제거 가능
- 코드 중복 최소화

## 📝 상세 구현 계획

### Phase 1: ResultPage.tsx 수정

#### 1.1 handleRestart 함수 단순화
```typescript
// 수정 전
const handleRestart = () => {
  quiz.resetQuiz()
  quiz.loadQuestions(quiz.language)
  quiz.setStep('intro')
}

// 수정 후
const handleRestart = () => {
  quiz.resetToHome()  // 기존 함수 활용
}
```

#### 1.2 조건부 렌더링 개선
```typescript
// 수정 전 (문제가 되는 코드)
if (!quiz.isQuizFinished || !quiz.quizResult) {
  quiz.setStep('intro')
  return null
}

// 수정 후 (React Router에서 처리)
// 조건부 렌더링 로직 제거하고 router에서 보호
```

### Phase 2: useQuiz.ts 개선 (선택적)

#### 2.1 resetToHome 함수 이름 명확화
```typescript
// 현재 이름이 명확하지 않으므로 alias 추가
const restartQuiz = resetToHome  // 더 명확한 이름
```

#### 2.2 로깅 개선
```typescript
const resetToHome = useCallback(() => {
  console.log('🔄 Quiz restart initiated...')
  dispatch({ type: 'RESET_QUIZ' })
  dispatch({ type: 'LOAD_QUESTIONS_SUCCESS', payload: [] })
  dispatch({ type: 'SET_NICKNAME', payload: '' })
  dispatch({ type: 'SET_STEP', payload: 'intro' })
  console.log('✅ Quiz restart completed')
}, [])
```

### Phase 3: 라우팅 보호 추가

#### 3.1 ResultPage 접근 보호
```typescript
// QuizContext나 App.tsx에서 라우팅 보호 로직 추가
const ProtectedResultPage = () => {
  const quiz = useQuizContext()
  
  if (!quiz.isQuizFinished || !quiz.quizResult) {
    return <Navigate to="/" replace />
  }
  
  return <ResultPage />
}
```

## 🚀 구현 단계별 체크리스트

### ✅ Phase 1: 핵심 수정 (필수)
- [ ] `ResultPage.tsx` handleRestart 함수 수정
- [ ] 조건부 렌더링 로직 제거
- [ ] 기본 동작 테스트

### ✅ Phase 2: 코드 품질 개선 (권장)
- [ ] resetToHome 함수에 별칭 추가
- [ ] 로깅 메시지 개선
- [ ] 에러 처리 강화

### ✅ Phase 3: 라우팅 강화 (선택)
- [ ] ResultPage 접근 보호 로직 추가
- [ ] 잘못된 접근 시 리다이렉트 처리
- [ ] 사용자 피드백 메시지 추가

## 🧪 테스트 계획

### 1. 기능 테스트
- [ ] "다시하기" 버튼 정상 동작 확인
- [ ] 퀴즈 상태 완전 초기화 확인
- [ ] 새 퀴즈 시작 시 문제 정상 로딩 확인

### 2. Edge Case 테스트
- [ ] 빠른 연속 클릭 테스트
- [ ] 네트워크 지연 상황 테스트
- [ ] 브라우저 뒤로가기/앞으로가기 테스트

### 3. 성능 테스트
- [ ] 메모리 누수 확인
- [ ] 상태 변경 횟수 최적화 확인
- [ ] 렌더링 성능 측정

## 📊 예상 효과

### 개선 효과
- **사용자 경험**: 버튼 응답성 100% 개선
- **코드 품질**: Race Condition 완전 제거
- **성능**: 불필요한 비동기 작업 제거
- **유지보수**: 코드 단순화 및 중복 제거

### 리스크 최소화
- 기존 로직의 최소한 변경
- 검증된 함수 재사용
- 단계별 구현으로 안정성 확보

## 🔄 롤백 계획

### 문제 발생 시 대안
1. **즉시 롤백**: 기존 코드로 복구
2. **방법 1 적용**: async/await 사용
3. **방법 3 적용**: Promise.then() 사용

## 📈 성공 지표

- [ ] "다시하기" 버튼 클릭 후 3초 이내 intro 화면 표시
- [ ] 연속 클릭 시에도 정상 동작
- [ ] 콘솔 에러 발생 0건
- [ ] 메모리 사용량 증가 없음

## 📅 예상 일정

- **Phase 1**: 1-2시간 (핵심 수정)
- **Phase 2**: 1시간 (코드 개선)
- **Phase 3**: 2-3시간 (라우팅 강화)
- **테스트**: 1-2시간
- **총 소요시간**: 5-8시간

---

> **Note**: 이 계획서는 error.md의 분석을 바탕으로 작성되었으며, 실제 코드 검증을 통해 최적화된 해결방안을 제시합니다.

**마지막 업데이트**: 2025-07-20  
**작성자**: Claude Code Analysis  
**상태**: 구현 대기