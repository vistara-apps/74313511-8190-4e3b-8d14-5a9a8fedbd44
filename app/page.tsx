'use client';

import { useState, useEffect } from 'react';
import { AppHeader } from './components/AppHeader';
import { SpinWheel } from './components/SpinWheel';
import { ChallengeCard } from './components/ChallengeCard';
import { ProgressBar } from './components/ProgressBar';
import { RewardBadge } from './components/RewardBadge';
import { getRandomChallenge, getDefaultUser, getDefaultProgress, getBadgeForStreak, getBadgeForPoints } from '@/lib/utils';
import type { Challenge, User, UserProgress } from '@/lib/types';
import { Trophy, Target, Calendar, Star } from 'lucide-react';

export default function HomePage() {
  // State Management
  const [user, setUser] = useState<User>(getDefaultUser());
  const [progress, setProgress] = useState<UserProgress>(getDefaultProgress());
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpunToday, setHasSpunToday] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>();
  const [lastSpinTopic, setLastSpinTopic] = useState<string>();

  // Initialize user data from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('eduspin-user');
    const savedProgress = localStorage.getItem('eduspin-progress');
    const lastSpin = localStorage.getItem('eduspin-last-spin');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    if (lastSpin) {
      const lastSpinDate = new Date(lastSpin);
      const today = new Date();
      const isToday = lastSpinDate.toDateString() === today.toDateString();
      setHasSpunToday(isToday);
      
      if (isToday) {
        const savedTopic = localStorage.getItem('eduspin-last-topic');
        if (savedTopic) {
          setLastSpinTopic(savedTopic);
        }
      }
    }
  }, []);

  // Save user data to localStorage
  const saveUserData = (newUser: User, newProgress: UserProgress) => {
    localStorage.setItem('eduspin-user', JSON.stringify(newUser));
    localStorage.setItem('eduspin-progress', JSON.stringify(newProgress));
    setUser(newUser);
    setProgress(newProgress);
  };

  // Handle spin wheel
  const handleSpin = (topic: string) => {
    setIsSpinning(true);
    
    // Get a challenge for the selected topic
    const challenge = getRandomChallenge();
    
    setTimeout(() => {
      setCurrentChallenge(challenge);
      setIsSpinning(false);
      setHasSpunToday(true);
      setLastSpinTopic(topic);
      
      // Save spin data
      localStorage.setItem('eduspin-last-spin', new Date().toISOString());
      localStorage.setItem('eduspin-last-topic', topic);
    }, 3000);
  };

  // Handle challenge answer
  const handleAnswer = (answerIndex: number, isCorrect: boolean) => {
    if (!currentChallenge) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    // Update user stats
    const pointsEarned = isCorrect ? currentChallenge.rewardPoints : 0;
    const newStreak = isCorrect ? progress.streak + 1 : 0;
    
    const updatedUser: User = {
      ...user,
      totalPointsEarned: user.totalPointsEarned + pointsEarned,
      learningStreak: newStreak,
      lastChallengeDate: new Date().toISOString(),
    };
    
    const updatedProgress: UserProgress = {
      ...progress,
      streak: newStreak,
      totalChallenges: progress.totalChallenges + 1,
      correctAnswers: isCorrect ? progress.correctAnswers + 1 : progress.correctAnswers,
      totalPoints: progress.totalPoints + pointsEarned,
      subjectsExplored: progress.subjectsExplored.includes(currentChallenge.topic) 
        ? progress.subjectsExplored 
        : [...progress.subjectsExplored, currentChallenge.topic],
    };
    
    saveUserData(updatedUser, updatedProgress);
  };

  // Get available badges
  const getAvailableBadges = () => {
    const badges = [];
    
    const streakBadge = getBadgeForStreak(progress.streak);
    if (streakBadge) {
      badges.push({
        title: streakBadge,
        description: `${progress.streak} day learning streak`,
        variant: 'earned' as const,
        icon: 'zap' as const,
        rarity: progress.streak >= 30 ? 'legendary' as const : progress.streak >= 14 ? 'epic' as const : 'rare' as const,
      });
    }
    
    const pointsBadge = getBadgeForPoints(progress.totalPoints);
    if (pointsBadge) {
      badges.push({
        title: pointsBadge,
        description: `Earned ${progress.totalPoints} total points`,
        variant: 'earned' as const,
        icon: 'trophy' as const,
        rarity: progress.totalPoints >= 1000 ? 'legendary' as const : progress.totalPoints >= 500 ? 'epic' as const : 'rare' as const,
      });
    }
    
    // Add locked badges for motivation
    if (progress.streak < 7) {
      badges.push({
        title: '🌟 Week Warrior',
        description: 'Complete 7 days in a row',
        variant: 'locked' as const,
        icon: 'star' as const,
      });
    }
    
    if (progress.totalPoints < 500) {
      badges.push({
        title: '🏆 Gold Achiever',
        description: 'Earn 500 total points',
        variant: 'locked' as const,
        icon: 'trophy' as const,
      });
    }
    
    return badges;
  };

  const badges = getAvailableBadges();

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-screen-sm mx-auto px-4 py-6">
        {/* Header */}
        <AppHeader 
          userPoints={user.totalPointsEarned} 
          userStreak={user.learningStreak} 
        />

        {/* Main Content */}
        <div className="space-y-8">
          {/* Spin Wheel Section */}
          {!currentChallenge && (
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-glow">Ready to Learn?</h2>
                <p className="text-fg text-opacity-70">
                  Spin the wheel to discover today's educational challenge!
                </p>
              </div>
              
              <SpinWheel
                onSpin={handleSpin}
                isSpinning={isSpinning}
                canSpin={!hasSpunToday}
                lastSpinTopic={lastSpinTopic}
              />
            </div>
          )}

          {/* Challenge Section */}
          {currentChallenge && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-glow mb-2">Today's Challenge</h2>
                <p className="text-fg text-opacity-70">Test your knowledge and earn points!</p>
              </div>
              
              <ChallengeCard
                challenge={currentChallenge}
                onAnswer={handleAnswer}
                isAnswered={isAnswered}
                selectedAnswer={selectedAnswer}
              />
            </div>
          )}

          {/* Progress Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-fg flex items-center space-x-2">
              <Target className="w-5 h-5 text-accent" />
              <span>Your Progress</span>
            </h3>
            
            <div className="grid gap-4">
              <div className="cyber-card p-4">
                <ProgressBar
                  variant="streak"
                  current={progress.streak}
                  target={7}
                  label="Learning Streak"
                  icon={<Calendar className="w-4 h-4 text-warning" />}
                />
              </div>
              
              <div className="cyber-card p-4">
                <ProgressBar
                  variant="subject"
                  current={progress.subjectsExplored.length}
                  target={6}
                  label="Subjects Explored"
                  icon={<Star className="w-4 h-4 text-accent" />}
                />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="cyber-card p-4 text-center">
              <div className="text-2xl font-bold text-accent">{progress.totalChallenges}</div>
              <div className="text-sm text-fg text-opacity-70">Challenges</div>
            </div>
            
            <div className="cyber-card p-4 text-center">
              <div className="text-2xl font-bold text-success">
                {progress.totalChallenges > 0 ? Math.round((progress.correctAnswers / progress.totalChallenges) * 100) : 0}%
              </div>
              <div className="text-sm text-fg text-opacity-70">Accuracy</div>
            </div>
          </div>

          {/* Badges Section */}
          {badges.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-fg flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-accent" />
                <span>Achievements</span>
              </h3>
              
              <div className="grid gap-4">
                {badges.map((badge, index) => (
                  <RewardBadge
                    key={index}
                    variant={badge.variant}
                    title={badge.title}
                    description={badge.description}
                    icon={badge.icon}
                    rarity={badge.rarity}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
