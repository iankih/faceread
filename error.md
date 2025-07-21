✦ 문제 발생 현상 재확인 보고서

  문제 발생 현상:
  마지막 페이지에서 "다시 하기" 버튼 클릭 시 페이지가 먹통이 되는 현상 발생.

  원인 분석 (재확인):

   1. `ResultPage.tsx`의 조건부 렌더링 로직과 렌더링 사이클 내 동기 호출:
      ResultPage.tsx 컴포넌트 상단에 다음과 같은 조건부 렌더링 로직이 존재합니다:
   1     if (!quiz.isQuizFinished || !quiz.quizResult) {
   2       quiz.setStep('intro')
   3       return null
   4     }
      "다시 하기" 버튼을 클릭하면 handleRestart 함수가 호출되고, 이 함수 내에서
  quiz.resetQuiz()가 디스패치됩니다. resetQuiz는 useQuiz.ts의 quizReducer에서
  isQuizFinished 상태를 false로 변경합니다.
      isQuizFinished가 false로 변경되는 즉시 ResultPage는 재렌더링됩니다. 이 때,
  위의 if 조건(!quiz.isQuizFinished)이 true가 되면서, 렌더링 사이클 내에서
  quiz.setStep('intro')가 동기적으로 호출됩니다. 이는 불필요한 상태 변경을
  유발하고, React의 렌더링 흐름을 방해하여 UI가 응답하지 않는 것처럼 보이게
  합니다.


   2. `useQuiz.ts`의 `RESET_QUIZ` 리듀서의 불완전한 초기화:
      useQuiz.ts 파일의 quizReducer 내 RESET_QUIZ 액션은 initialState로 대부분의
  상태를 되돌리지만, questions: state.questions 라인으로 인해 이전 퀴즈의 질문
  목록을 그대로 유지합니다.

   1     case 'RESET_QUIZ':
   2       return {
   3         ...initialState,
   4         questions: state.questions // 문제는 유지
   5       }
      "다시 하기"는 완전히 새로운 퀴즈를 시작하는 것을 의미하므로, 질문 목록 또한
   초기화되어야 합니다. 질문 목록이 초기화되지 않은 상태에서 loadQuestions가 다시
   호출되더라도, 이전 데이터가 남아있어 예상치 못한 동작을 유발할 수 있습니다.


   3. `handleRestart` 함수의 중복 및 비동기 처리 미흡:
      ResultPage의 handleRestart 함수는 quiz.resetQuiz(),
  quiz.loadQuestions(quiz.language), quiz.setStep('intro')를 순차적으로
  호출합니다.
       * resetQuiz는 이미 currentStep을 'intro'로 설정하는 로직을 포함하고
         있으므로, quiz.setStep('intro')는 중복 호출입니다.
       * loadQuestions는 비동기 함수이므로, 질문 로드가 완료되기 전에 페이지가
         intro로 전환될 수 있어 상태 불일치를 야기합니다.

  결론:
  "다시 하기" 버튼 클릭 시 발생하는 페이지 먹통 현상은 ResultPage.tsx의 조건부
  렌더링 로직과 useQuiz.ts의 불완전한 퀴즈 초기화, 그리고 handleRestart 함수의
  중복 및 비동기 처리 미흡이 복합적으로 작용하여 발생하는 상태 관리의 경합 
  조건(Race Condition) 및 무한 렌더링 루프 때문입니다. ResultPage가 intro로
  전환을 시도하는 동시에 useQuiz는 리셋을 진행하고, 이 과정에서 상태가 계속
  변경되면서 UI가 멈춘 것처럼 보이게 됩니다.

  제안된 해결 방안:

   1. `useQuiz.ts` 수정:
       * quizReducer 내 RESET_QUIZ 액션에서 questions: state.questions 라인을
         제거하여 questions 배열이 initialState에 따라 완전히 초기화되도록 합니다.       
       * resetToHome 함수를 restartQuiz로 이름을 변경하고, 이 함수를 퀴즈를 완전히       
         초기화하고 홈 화면으로 이동하는 단일 진입점으로 사용합니다. 이 함수는
         RESET_QUIZ 디스패치, 질문 배열 초기화 (LOAD_QUESTIONS_SUCCESS with []),
         닉네임 초기화, 그리고 SET_STEP('intro') 호출을 포함합니다.

   2. `ResultPage.tsx` 수정:
       * 컴포넌트 상단의 if (!quiz.isQuizFinished || !quiz.quizResult) 조건부
         렌더링 블록과 그 안의 quiz.setStep('intro') 호출을 제거합니다.
         ResultPage는 isQuizFinished가 true일 때만 렌더링되도록 하고, restartQuiz
         호출로 isQuizFinished가 false가 되면 자연스럽게 언마운트되도록 합니다.
       * handleRestart 함수 내에서 quiz.resetQuiz(), quiz.loadQuestions(),
         quiz.setStep('intro') 대신 새로 정의한 quiz.restartQuiz()만 호출하도록
         변경합니다.

  이러한 변경을 통해 퀴즈 재시작 시의 상태 전환이 명확하고 일관되게 처리되어,
  페이지 먹통 현상이 해결될 것으로 예상됩니다.


    🔍 FaceRead "다시하기" 버튼 먹통 현상 분석 보고서

  📊 문제 현황

  증상: 결과 페이지에서 "다시하기" 버튼 클릭 시 페이지가 응답하지 않는 현상 발생

  🕵️ 원인 분석

  1. 코드 실행 흐름 문제

  ResultPage.tsx:14-19의 handleRestart 함수에서 다음 순서로 실행됩니다:

  const handleRestart = () => {
    quiz.resetQuiz()                    // 1. 퀴즈 상태 초기화
    quiz.loadQuestions(quiz.language)   // 2. 문제 다시 로드 (비동기)
    quiz.setStep('intro')               // 3. 즉시 intro 화면으로 이동
  }

  2. 타이밍 이슈 (Race Condition)

  핵심 문제: loadQuestions는 비동기 함수이지만 await 없이 호출된 후 바로
  setStep('intro')가 실행됩니다.

  - loadQuestions()는 Promise를 반환하는 비동기 함수
  - setStep('intro')는 즉시 실행되어 현재 step을 'intro'로 변경
  - 이후 loadQuestions가 완료되면서 상태가 불일치 발생

  3. 상태 불일치 상황

  1. 초기화 시점: resetQuiz() → 상태는 초기화되지만 questions는 유지
  2. 로딩 중: loadQuestions() 시작 → 비동기로 새 문제 로드 시작
  3. 즉시 이동: setStep('intro') → 화면은 intro로 이동
  4. 문제 발생: 비동기 로딩이 완료되면서 예상치 못한 상태 변경 발생

  4. 추가 발견된 문제점

  A. 불필요한 문제 재로딩

  // useQuiz.ts:211-215
  case 'RESET_QUIZ':
    return {
      ...initialState,
      questions: state.questions // 문제는 유지됨
    }
  - resetQuiz()는 questions를 유지하도록 설계됨
  - 그런데 loadQuestions()를 다시 호출하여 불필요한 중복 로딩 발생

  B. 캐시 시스템과의 충돌

  question-loader.ts에서 캐시 시스템을 사용하고 있어:
  - 첫 번째 loadQuestions() 호출 시 캐시에서 즉시 반환
  - 하지만 여전히 Promise 기반이므로 비동기 처리 필요

  🎯 해결방안 제안

  방법 1: async/await 사용 (권장)

  const handleRestart = async () => {
    quiz.resetQuiz()
    await quiz.loadQuestions(quiz.language)
    quiz.setStep('intro')
  }

  방법 2: 문제 재로딩 제거

  const handleRestart = () => {
    quiz.resetQuiz()
    quiz.setStep('intro')
    // loadQuestions 호출 제거 (questions는 이미 유지됨)
  }

  방법 3: 순차 실행 보장

  const handleRestart = () => {
    quiz.resetQuiz()
    quiz.loadQuestions(quiz.language).then(() => {
      quiz.setStep('intro')
    })
  }

  🏆 최적 해결책

  방법 2를 권장합니다:
  - RESET_QUIZ 액션이 이미 questions를 유지하도록 설계됨
  - 불필요한 비동기 로딩 제거로 성능 향상
  - 타이밍 이슈 완전 해결
  - 코드 단순화

  📋 추가 개선사항

  1. 에러 핸들링 강화: 비동기 작업 실패 시 사용자 피드백
  2. 로딩 상태 표시: 문제 로딩 중 사용자 경험 개선
  3. 상태 관리 개선: 비동기 작업과 UI 상태 동기화 강화

  ---

● Update Todos
  ⎿  ☒ 다시하기 버튼 관련 코드 분석
     ☒ 문제 원인 파악
     ☒ 보고서 작성 및 출력

● 결론: "다시하기" 버튼의 먹통 현상은 비동기 함수 호출 후 즉시 화면 전환으로 인한 
  Race Condition이 원인입니다. loadQuestions() 비동기 호출을 제거하거나 await로 대기
   후 화면 전환하면 해결됩니다.