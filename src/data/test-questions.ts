import type { EmotionQuestion } from '../types/quiz'

// 테스트용 임시 데이터
export const testQuestions: EmotionQuestion[] = [
  {
    id: '1',
    type: 'face2text',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="%23f0f0f0"/><circle cx="35" cy="40" r="3" fill="%23333"/><circle cx="65" cy="40" r="3" fill="%23333"/><path d="M 30 60 Q 50 75 70 60" stroke="%23333" stroke-width="2" fill="none"/></svg>',
    emotionKey: 'happy',
    correctAnswer: 'happy',
    choices: [
      { id: 'happy', text: 'A', image: undefined },
      { id: 'sad', text: 'B', image: undefined },
      { id: 'angry', text: 'C', image: undefined },
      { id: 'surprised', text: 'D', image: undefined }
    ]
  },
  {
    id: '2',
    type: 'face2text',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="%23f0f0f0"/><circle cx="35" cy="40" r="3" fill="%23333"/><circle cx="65" cy="40" r="3" fill="%23333"/><path d="M 30 70 Q 50 55 70 70" stroke="%23333" stroke-width="2" fill="none"/></svg>',
    emotionKey: 'sad',
    correctAnswer: 'sad',
    choices: [
      { id: 'happy', text: 'A', image: undefined },
      { id: 'sad', text: 'B', image: undefined },
      { id: 'angry', text: 'C', image: undefined },
      { id: 'surprised', text: 'D', image: undefined }
    ]
  },
  {
    id: '3',
    type: 'text2face',
    image: undefined,
    emotionKey: '화남',
    correctAnswer: 'angry',
    choices: [
      { id: 'happy', text: 'A', image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><circle cx="25" cy="25" r="20" fill="%23f0f0f0"/><circle cx="18" cy="20" r="2" fill="%23333"/><circle cx="32" cy="20" r="2" fill="%23333"/><path d="M 15 30 Q 25 35 35 30" stroke="%23333" stroke-width="1" fill="none"/></svg>' },
      { id: 'sad', text: 'B', image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><circle cx="25" cy="25" r="20" fill="%23f0f0f0"/><circle cx="18" cy="20" r="2" fill="%23333"/><circle cx="32" cy="20" r="2" fill="%23333"/><path d="M 15 35 Q 25 25 35 35" stroke="%23333" stroke-width="1" fill="none"/></svg>' },
      { id: 'angry', text: 'C', image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><circle cx="25" cy="25" r="20" fill="%23f0f0f0"/><circle cx="18" cy="20" r="2" fill="%23333"/><circle cx="32" cy="20" r="2" fill="%23333"/><line x1="15" y1="15" x2="22" y2="18" stroke="%23333" stroke-width="2"/><line x1="28" y1="18" x2="35" y2="15" stroke="%23333" stroke-width="2"/><rect x="20" y="30" width="10" height="3" fill="%23333"/></svg>' },
      { id: 'surprised', text: 'D', image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><circle cx="25" cy="25" r="20" fill="%23f0f0f0"/><circle cx="18" cy="20" r="3" fill="%23333"/><circle cx="32" cy="20" r="3" fill="%23333"/><circle cx="25" cy="32" r="3" fill="none" stroke="%23333" stroke-width="1"/></svg>' }
    ]
  },
  {
    id: '4',
    type: 'eyes2text',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40"><rect x="10" y="15" width="30" height="10" rx="5" fill="%23f0f0f0" stroke="%23333"/><rect x="80" y="15" width="30" height="10" rx="5" fill="%23f0f0f0" stroke="%23333"/><circle cx="20" cy="20" r="3" fill="%23333"/><circle cx="90" cy="20" r="3" fill="%23333"/></svg>',
    emotionKey: 'focused',
    correctAnswer: 'focused',
    choices: [
      { id: 'happy', text: 'A', image: undefined },
      { id: 'focused', text: 'B', image: undefined },
      { id: 'confused', text: 'C', image: undefined },
      { id: 'determined', text: 'D', image: undefined }
    ]
  },
  {
    id: '5',
    type: 'face2text',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="%23f0f0f0"/><circle cx="35" cy="40" r="4" fill="%23333"/><circle cx="65" cy="40" r="4" fill="%23333"/><circle cx="50" cy="65" r="5" fill="none" stroke="%23333" stroke-width="2"/></svg>',
    emotionKey: 'surprised',
    correctAnswer: 'surprised',
    choices: [
      { id: 'happy', text: 'A', image: undefined },
      { id: 'sad', text: 'B', image: undefined },
      { id: 'angry', text: 'C', image: undefined },
      { id: 'surprised', text: 'D', image: undefined }
    ]
  },
  {
    id: '6',
    type: 'text2face',
    image: undefined,
    emotionKey: '기쁨',
    correctAnswer: 'happy',
    choices: [
      { id: 'happy', text: 'A', image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><circle cx="25" cy="25" r="20" fill="%23f0f0f0"/><circle cx="18" cy="20" r="2" fill="%23333"/><circle cx="32" cy="20" r="2" fill="%23333"/><path d="M 15 30 Q 25 38 35 30" stroke="%23333" stroke-width="2" fill="none"/></svg>' },
      { id: 'sad', text: 'B', image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><circle cx="25" cy="25" r="20" fill="%23f0f0f0"/><circle cx="18" cy="20" r="2" fill="%23333"/><circle cx="32" cy="20" r="2" fill="%23333"/><path d="M 15 35 Q 25 25 35 35" stroke="%23333" stroke-width="1" fill="none"/></svg>' },
      { id: 'angry', text: 'C', image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><circle cx="25" cy="25" r="20" fill="%23f0f0f0"/><circle cx="18" cy="20" r="2" fill="%23333"/><circle cx="32" cy="20" r="2" fill="%23333"/><rect x="20" y="30" width="10" height="3" fill="%23333"/></svg>' },
      { id: 'neutral', text: 'D', image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><circle cx="25" cy="25" r="20" fill="%23f0f0f0"/><circle cx="18" cy="20" r="2" fill="%23333"/><circle cx="32" cy="20" r="2" fill="%23333"/><line x1="20" y1="30" x2="30" y2="30" stroke="%23333" stroke-width="1"/></svg>' }
    ]
  },
  {
    id: '7',
    type: 'eyes2text',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40"><rect x="10" y="12" width="35" height="16" rx="8" fill="%23f0f0f0" stroke="%23333"/><rect x="75" y="12" width="35" height="16" rx="8" fill="%23f0f0f0" stroke="%23333"/><circle cx="22" cy="20" r="4" fill="%23333"/><circle cx="87" cy="20" r="4" fill="%23333"/><line x1="5" y1="8" x2="18" y2="12" stroke="%23333" stroke-width="2"/><line x1="32" y1="12" x2="45" y2="8" stroke="%23333" stroke-width="2"/><line x1="70" y1="8" x2="83" y2="12" stroke="%23333" stroke-width="2"/><line x1="97" y1="12" x2="110" y2="8" stroke="%23333" stroke-width="2"/></svg>',
    emotionKey: 'determined',
    correctAnswer: 'determined',
    choices: [
      { id: 'happy', text: 'A', image: undefined },
      { id: 'focused', text: 'B', image: undefined },
      { id: 'confused', text: 'C', image: undefined },
      { id: 'determined', text: 'D', image: undefined }
    ]
  },
  {
    id: '8',
    type: 'face2text',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="%23f0f0f0"/><circle cx="35" cy="40" r="2" fill="%23333"/><circle cx="65" cy="40" r="2" fill="%23333"/><line x1="45" y1="65" x2="55" y2="65" stroke="%23333" stroke-width="2"/></svg>',
    emotionKey: 'neutral',
    correctAnswer: 'neutral',
    choices: [
      { id: 'happy', text: 'A', image: undefined },
      { id: 'sad', text: 'B', image: undefined },
      { id: 'neutral', text: 'C', image: undefined },
      { id: 'confused', text: 'D', image: undefined }
    ]
  },
  {
    id: '9',
    type: 'text2face',
    image: undefined,
    emotionKey: '혼란',
    correctAnswer: 'confused',
    choices: [
      { id: 'confused', text: 'A', image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><circle cx="25" cy="25" r="20" fill="%23f0f0f0"/><circle cx="18" cy="20" r="2" fill="%23333"/><circle cx="32" cy="20" r="2" fill="%23333"/><path d="M 20 30 Q 22 32 24 30 Q 26 28 28 30" stroke="%23333" stroke-width="1" fill="none"/></svg>' },
      { id: 'surprised', text: 'B', image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><circle cx="25" cy="25" r="20" fill="%23f0f0f0"/><circle cx="18" cy="20" r="3" fill="%23333"/><circle cx="32" cy="20" r="3" fill="%23333"/><circle cx="25" cy="32" r="3" fill="none" stroke="%23333" stroke-width="1"/></svg>' },
      { id: 'neutral', text: 'C', image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><circle cx="25" cy="25" r="20" fill="%23f0f0f0"/><circle cx="18" cy="20" r="2" fill="%23333"/><circle cx="32" cy="20" r="2" fill="%23333"/><line x1="20" y1="30" x2="30" y2="30" stroke="%23333" stroke-width="1"/></svg>' },
      { id: 'focused', text: 'D', image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><circle cx="25" cy="25" r="20" fill="%23f0f0f0"/><line x1="15" y1="18" x2="22" y2="22" stroke="%23333" stroke-width="1"/><line x1="28" y1="22" x2="35" y2="18" stroke="%23333" stroke-width="1"/><circle cx="18" cy="20" r="2" fill="%23333"/><circle cx="32" cy="20" r="2" fill="%23333"/><line x1="20" y1="30" x2="30" y2="30" stroke="%23333" stroke-width="1"/></svg>' }
    ]
  },
  {
    id: '10',
    type: 'eyes2text',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40"><ellipse cx="27" cy="20" rx="18" ry="12" fill="%23f0f0f0" stroke="%23333"/><ellipse cx="93" cy="20" rx="18" ry="12" fill="%23f0f0f0" stroke="%23333"/><circle cx="27" cy="20" r="5" fill="%23333"/><circle cx="93" cy="20" r="5" fill="%23333"/><path d="M 15 10 Q 27 5 39 10" stroke="%23333" stroke-width="1" fill="none"/><path d="M 81 10 Q 93 5 105 10" stroke="%23333" stroke-width="1" fill="none"/></svg>',
    emotionKey: 'confused',
    correctAnswer: 'confused',
    choices: [
      { id: 'happy', text: 'A', image: undefined },
      { id: 'focused', text: 'B', image: undefined },
      { id: 'confused', text: 'C', image: undefined },
      { id: 'determined', text: 'D', image: undefined }
    ]
  }
]