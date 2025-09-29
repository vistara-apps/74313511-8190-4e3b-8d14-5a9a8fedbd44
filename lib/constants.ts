export const TOPICS = [
  'Math',
  'Science', 
  'History',
  'Art',
  'Technology',
  'Geography'
] as const;

export const TOPIC_COLORS = {
  Math: '#ff6b6b',
  Science: '#6c5ce7', 
  History: '#00ff41',
  Art: '#fdcb6e',
  Technology: '#a29bfe',
  Geography: '#e84393'
} as const;

export const DIFFICULTY_POINTS = {
  easy: 10,
  medium: 20,
  hard: 30
} as const;

export const SAMPLE_CHALLENGES = [
  {
    challengeId: '1',
    topic: 'Math',
    difficulty: 'easy' as const,
    question: 'What is 15 + 27?',
    options: ['40', '42', '44', '46'],
    correctAnswer: 1,
    rewardPoints: 10,
    explanation: '15 + 27 = 42. Great job!'
  },
  {
    challengeId: '2',
    topic: 'Science',
    difficulty: 'medium' as const,
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Au', 'Ag', 'Gd'],
    correctAnswer: 1,
    rewardPoints: 20,
    explanation: 'Au comes from the Latin word "aurum" meaning gold.'
  },
  {
    challengeId: '3',
    topic: 'History',
    difficulty: 'hard' as const,
    question: 'In which year did the Berlin Wall fall?',
    options: ['1987', '1989', '1991', '1993'],
    correctAnswer: 1,
    rewardPoints: 30,
    explanation: 'The Berlin Wall fell on November 9, 1989, marking the end of the Cold War era.'
  },
  {
    challengeId: '4',
    topic: 'Technology',
    difficulty: 'medium' as const,
    question: 'What does "HTTP" stand for?',
    options: ['HyperText Transfer Protocol', 'High Tech Transfer Process', 'Home Terminal Transfer Protocol', 'Hybrid Text Transport Protocol'],
    correctAnswer: 0,
    rewardPoints: 20,
    explanation: 'HTTP stands for HyperText Transfer Protocol, the foundation of data communication on the web.'
  },
  {
    challengeId: '5',
    topic: 'Art',
    difficulty: 'easy' as const,
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
    correctAnswer: 1,
    rewardPoints: 10,
    explanation: 'Leonardo da Vinci painted the Mona Lisa between 1503-1519.'
  },
  {
    challengeId: '6',
    topic: 'Geography',
    difficulty: 'medium' as const,
    question: 'What is the capital of Australia?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
    correctAnswer: 2,
    rewardPoints: 20,
    explanation: 'Canberra is the capital of Australia, not Sydney or Melbourne as many people think!'
  }
];
