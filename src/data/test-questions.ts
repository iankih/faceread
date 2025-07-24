import type { EmotionQuestion } from '../types/quiz'

// 테스트용 임시 데이터 - 모든 문제를 face2text 형식으로 변환
export const testQuestions: EmotionQuestion[] = [
  {
    id: '1',
    type: 'face2text',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="%23f0f0f0"/><circle cx="35" cy="40" r="3" fill="%23333"/><circle cx="65" cy="40" r="3" fill="%23333"/><path d="M 30 60 Q 50 75 70 60" stroke="%23333" stroke-width="2" fill="none"/></svg>',
    emotionKey: 'happy',
    correctAnswer: 'happy',
    choices: [
      { id: 'happy', text: '기쁨' },
      { id: 'sad', text: '슬픔' },
      { id: 'angry', text: '화남' },
      { id: 'surprised', text: '놀람' }
    ]
  },
  {
    id: '2',
    type: 'face2text',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="%23f0f0f0"/><circle cx="35" cy="40" r="3" fill="%23333"/><circle cx="65" cy="40" r="3" fill="%23333"/><path d="M 30 70 Q 50 55 70 70" stroke="%23333" stroke-width="2" fill="none"/></svg>',
    emotionKey: 'sad',
    correctAnswer: 'sad',
    choices: [
      { id: 'happy', text: '기쁨' },
      { id: 'sad', text: '슬픔' },
      { id: 'angry', text: '화남' },
      { id: 'surprised', text: '놀람' }
    ]
  },
  {
    id: '3',
    type: 'face2text',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="%23f0f0f0"/><circle cx="35" cy="40" r="2" fill="%23333"/><circle cx="65" cy="40" r="2" fill="%23333"/><line x1="30" y1="35" x2="42" y2="42" stroke="%23333" stroke-width="2"/><line x1="58" y1="42" x2="70" y2="35" stroke="%23333" stroke-width="2"/><rect x="45" y="60" width="10" height="4" fill="%23333"/></svg>',
    emotionKey: 'angry',
    correctAnswer: 'angry',
    choices: [
      { id: 'happy', text: '기쁨' },
      { id: 'sad', text: '슬픔' },
      { id: 'angry', text: '화남' },
      { id: 'surprised', text: '놀람' }
    ]
  },
  {
    id: '4',
    type: 'face2text',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="%23f0f0f0"/><circle cx="35" cy="40" r="4" fill="%23333"/><circle cx="65" cy="40" r="4" fill="%23333"/><circle cx="50" cy="65" r="5" fill="none" stroke="%23333" stroke-width="2"/></svg>',
    emotionKey: 'surprised',
    correctAnswer: 'surprised',
    choices: [
      { id: 'happy', text: '기쁨' },
      { id: 'sad', text: '슬픔' },
      { id: 'angry', text: '화남' },
      { id: 'surprised', text: '놀람' }
    ]
  },
  {
    id: '5',
    type: 'face2text',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="%23f0f0f0"/><circle cx="35" cy="40" r="2" fill="%23333"/><circle cx="65" cy="40" r="2" fill="%23333"/><line x1="45" y1="65" x2="55" y2="65" stroke="%23333" stroke-width="2"/></svg>',
    emotionKey: 'neutral',
    correctAnswer: 'neutral',
    choices: [
      { id: 'happy', text: '기쁨' },
      { id: 'neutral', text: '평온' },
      { id: 'angry', text: '화남' },
      { id: 'confused', text: '혼란' }
    ]
  },
  {
    id: '6',
    type: 'face2text',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="%23f0f0f0"/><line x1="30" y1="35" x2="42" y2="42" stroke="%23333" stroke-width="2"/><line x1="58" y1="42" x2="70" y2="35" stroke="%23333" stroke-width="2"/><circle cx="35" cy="40" r="2" fill="%23333"/><circle cx="65" cy="40" r="2" fill="%23333"/><line x1="40" y1="65" x2="60" y2="65" stroke="%23333" stroke-width="2"/></svg>',
    emotionKey: 'focused',
    correctAnswer: 'focused',
    choices: [
      { id: 'happy', text: '기쁨' },
      { id: 'focused', text: '집중' },
      { id: 'confused', text: '혼란' },
      { id: 'determined', text: '결심' }
    ]
  },
  {
    id: '7',
    type: 'face2text',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="%23f0f0f0"/><rect x="30" y="35" width="10" height="8" rx="4" fill="%23f0f0f0" stroke="%23333"/><rect x="60" y="35" width="10" height="8" rx="4" fill="%23f0f0f0" stroke="%23333"/><circle cx="33" cy="39" r="2" fill="%23333"/><circle cx="63" cy="39" r="2" fill="%23333"/><line x1="25" y1="30" x2="35" y2="33" stroke="%23333" stroke-width="2"/><line x1="65" y1="33" x2="75" y2="30" stroke="%23333" stroke-width="2"/><rect x="45" y="60" width="10" height="3" fill="%23333"/></svg>',
    emotionKey: 'determined',
    correctAnswer: 'determined',
    choices: [
      { id: 'happy', text: '기쁨' },
      { id: 'focused', text: '집중' },
      { id: 'confused', text: '혼란' },
      { id: 'determined', text: '결심' }
    ]
  },
  {
    id: '8',
    type: 'face2text',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="%23f0f0f0"/><circle cx="35" cy="40" r="2" fill="%23333"/><circle cx="65" cy="40" r="2" fill="%23333"/><path d="M 40 60 Q 42 62 44 60 Q 46 58 48 60 Q 50 62 52 60 Q 54 58 56 60 Q 58 62 60 60" stroke="%23333" stroke-width="1" fill="none"/></svg>',
    emotionKey: 'confused',
    correctAnswer: 'confused',
    choices: [
      { id: 'happy', text: '기쁨' },
      { id: 'neutral', text: '평온' },
      { id: 'confused', text: '혼란' },
      { id: 'surprised', text: '놀람' }
    ]
  },
  {
    id: '9',
    type: 'face2text',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="%23f0f0f0"/><circle cx="35" cy="40" r="3" fill="%23333"/><circle cx="65" cy="40" r="3" fill="%23333"/><path d="M 30 60 Q 50 72 70 60" stroke="%23333" stroke-width="2" fill="none"/><path d="M 20 30 Q 30 25 40 30" stroke="%23333" stroke-width="1" fill="none"/><path d="M 60 30 Q 70 25 80 30" stroke="%23333" stroke-width="1" fill="none"/></svg>',
    emotionKey: 'happy',
    correctAnswer: 'happy',
    choices: [
      { id: 'happy', text: '기쁨' },
      { id: 'sad', text: '슬픔' },
      { id: 'excited', text: '흥분' },
      { id: 'content', text: '만족' }
    ]
  },
  {
    id: '10',
    type: 'face2text',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="%23f0f0f0"/><ellipse cx="35" cy="40" rx="5" ry="3" fill="%23f0f0f0" stroke="%23333"/><ellipse cx="65" cy="40" rx="5" ry="3" fill="%23f0f0f0" stroke="%23333"/><circle cx="35" cy="40" r="2" fill="%23333"/><circle cx="65" cy="40" r="2" fill="%23333"/><path d="M 25 30 Q 35 25 45 30" stroke="%23333" stroke-width="1" fill="none"/><path d="M 55 30 Q 65 25 75 30" stroke="%23333" stroke-width="1" fill="none"/><line x1="40" y1="65" x2="60" y2="65" stroke="%23333" stroke-width="2"/></svg>',
    emotionKey: 'confused',
    correctAnswer: 'confused',
    choices: [
      { id: 'happy', text: '기쁨' },
      { id: 'focused', text: '집중' },
      { id: 'confused', text: '혼란' },
      { id: 'thoughtful', text: '사려깊음' }
    ]
  }
]