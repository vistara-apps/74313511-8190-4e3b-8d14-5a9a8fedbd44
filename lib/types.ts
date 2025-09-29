export interface User {
  userId: string;
  farcasterId?: string;
  ethAddress?: string;
  learningStreak: number;
  totalPointsEarned: number;
  rewardsRedeemed: number;
  lastChallengeDate?: string;
}

export interface Challenge {
  challengeId: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  rewardPoints: number;
  explanation?: string;
}

export interface ChallengeAttempt {
  attemptId: string;
  userId: string;
  challengeId: string;
  timestamp: string;
  isCorrect: boolean;
  pointsEarned: number;
}

export interface Reward {
  rewardId: string;
  userId: string;
  type: 'points' | 'voucher' | 'crypto';
  value: number;
  status: 'pending' | 'redeemed';
  timestamp: string;
}

export interface SpinResult {
  topic: string;
  challenge: Challenge;
  animation: boolean;
}

export interface UserProgress {
  streak: number;
  totalChallenges: number;
  correctAnswers: number;
  totalPoints: number;
  subjectsExplored: string[];
  badges: string[];
}
