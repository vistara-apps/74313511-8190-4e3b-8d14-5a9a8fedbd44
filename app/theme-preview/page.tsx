'use client';

import { useState } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { AppHeader } from '../components/AppHeader';
import { SpinWheel } from '../components/SpinWheel';
import { ChallengeCard } from '../components/ChallengeCard';
import { RewardBadge } from '../components/RewardBadge';
import { ProgressBar } from '../components/ProgressBar';
import { SAMPLE_CHALLENGES } from '@/lib/constants';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const themes = [
  { id: 'default', name: 'Cyberpunk Gaming', description: 'Dark purple with neon green accents' },
  { id: 'celo', name: 'CELO', description: 'Black background with yellow accents' },
  { id: 'solana', name: 'Solana', description: 'Dark purple with purple/magenta accents' },
  { id: 'base', name: 'Base', description: 'Dark blue with Base blue accents' },
  { id: 'coinbase', name: 'Coinbase', description: 'Dark navy with Coinbase blue accents' },
];

export default function ThemePreviewPage() {
  const { theme, setTheme } = useTheme();
  const [selectedAnswer, setSelectedAnswer] = useState<number>();
  const [isAnswered, setIsAnswered] = useState(false);

  const sampleChallenge = SAMPLE_CHALLENGES[0];

  const handleAnswer = (answerIndex: number, isCorrect: boolean) => {
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
  };

  const resetChallenge = () => {
    setSelectedAnswer(undefined);
    setIsAnswered(false);
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-screen-lg mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link 
            href="/"
            className="p-2 rounded-lg bg-surface bg-opacity-50 hover:bg-opacity-70 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-fg" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-glow">Theme Preview</h1>
            <p className="text-fg text-opacity-70">Preview all available themes for EduSpin</p>
          </div>
        </div>

        {/* Theme Selector */}
        <div className="cyber-card p-6 mb-8">
          <h2 className="text-xl font-semibold text-fg mb-4">Select Theme</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => setTheme(themeOption.id as any)}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                  theme === themeOption.id
                    ? 'border-accent bg-accent bg-opacity-20'
                    : 'border-accent border-opacity-20 bg-surface bg-opacity-50 hover:bg-opacity-70'
                }`}
              >
                <h3 className="font-semibold text-fg">{themeOption.name}</h3>
                <p className="text-sm text-fg text-opacity-70 mt-1">{themeOption.description}</p>
                {theme === themeOption.id && (
                  <div className="mt-2 text-accent text-sm font-medium">✓ Active</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Component Previews */}
        <div className="space-y-8">
          {/* Header Preview */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-fg">App Header</h2>
            <AppHeader userPoints={1250} userStreak={7} />
          </div>

          {/* Spin Wheel Preview */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-fg">Spin Wheel</h2>
            <div className="flex justify-center">
              <SpinWheel
                onSpin={() => {}}
                isSpinning={false}
                canSpin={true}
              />
            </div>
          </div>

          {/* Challenge Card Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-fg">Challenge Card</h2>
              <button
                onClick={resetChallenge}
                className="px-4 py-2 bg-accent bg-opacity-20 text-accent rounded-lg hover:bg-opacity-30 transition-all duration-200"
              >
                Reset
              </button>
            </div>
            <ChallengeCard
              challenge={sampleChallenge}
              onAnswer={handleAnswer}
              isAnswered={isAnswered}
              selectedAnswer={selectedAnswer}
            />
          </div>

          {/* Progress Bars Preview */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-fg">Progress Bars</h2>
            <div className="grid gap-4">
              <div className="cyber-card p-4">
                <ProgressBar
                  variant="streak"
                  current={7}
                  target={10}
                  label="Learning Streak"
                />
              </div>
              <div className="cyber-card p-4">
                <ProgressBar
                  variant="subject"
                  current={4}
                  target={6}
                  label="Subjects Explored"
                />
              </div>
            </div>
          </div>

          {/* Reward Badges Preview */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-fg">Reward Badges</h2>
            <div className="grid gap-4">
              <RewardBadge
                variant="earned"
                title="🔥 Fire Streak"
                description="30 day learning streak achieved"
                points={300}
                icon="zap"
                rarity="legendary"
              />
              <RewardBadge
                variant="earned"
                title="🏆 Gold Achiever"
                description="Earned 500 total points"
                points={500}
                icon="trophy"
                rarity="epic"
              />
              <RewardBadge
                variant="locked"
                title="💎 Diamond Scholar"
                description="Earn 1000 total points"
                points={1000}
                icon="award"
                rarity="legendary"
              />
            </div>
          </div>

          {/* Color Palette Preview */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-fg">Color Palette</h2>
            <div className="cyber-card p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="w-full h-16 bg-bg rounded-lg border border-accent border-opacity-20"></div>
                  <p className="text-sm text-fg text-opacity-70">Background</p>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-16 bg-surface rounded-lg border border-accent border-opacity-20"></div>
                  <p className="text-sm text-fg text-opacity-70">Surface</p>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-16 bg-accent rounded-lg"></div>
                  <p className="text-sm text-fg text-opacity-70">Accent</p>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-16 bg-primary rounded-lg"></div>
                  <p className="text-sm text-fg text-opacity-70">Primary</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
