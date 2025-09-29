import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SAMPLE_CHALLENGES, TOPICS } from './constants';
import type { Challenge, User, UserProgress } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomChallenge(): Challenge {
  const randomIndex = Math.floor(Math.random() * SAMPLE_CHALLENGES.length);
  return SAMPLE_CHALLENGES[randomIndex];
}

export function getRandomTopic(): string {
  const randomIndex = Math.floor(Math.random() * TOPICS.length);
  return TOPICS[randomIndex];
}

export function formatPoints(points: number): string {
  if (points >= 1000) {
    return `${(points / 1000).toFixed(1)}k`;
  }
  return points.toString();
}

export function calculateStreak(lastChallengeDate?: string): number {
  if (!lastChallengeDate) return 0;
  
  const lastDate = new Date(lastChallengeDate);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - lastDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays <= 1 ? 1 : 0;
}

export function getProgressPercentage(current: number, target: number): number {
  return Math.min((current / target) * 100, 100);
}

export function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function getDefaultUser(): User {
  return {
    userId: generateUserId(),
    learningStreak: 0,
    totalPointsEarned: 0,
    rewardsRedeemed: 0,
  };
}

export function getDefaultProgress(): UserProgress {
  return {
    streak: 0,
    totalChallenges: 0,
    correctAnswers: 0,
    totalPoints: 0,
    subjectsExplored: [],
    badges: [],
  };
}

export function getBadgeForStreak(streak: number): string | null {
  if (streak >= 30) return '🔥 Fire Streak';
  if (streak >= 14) return '⚡ Lightning Learner';
  if (streak >= 7) return '🌟 Week Warrior';
  if (streak >= 3) return '🎯 Triple Threat';
  return null;
}

export function getBadgeForPoints(points: number): string | null {
  if (points >= 1000) return '💎 Diamond Scholar';
  if (points >= 500) return '🏆 Gold Achiever';
  if (points >= 250) return '🥈 Silver Star';
  if (points >= 100) return '🥉 Bronze Beginner';
  return null;
}
