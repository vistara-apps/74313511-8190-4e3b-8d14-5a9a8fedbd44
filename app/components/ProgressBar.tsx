'use client';

import { TrendingUp, Target, Calendar } from 'lucide-react';
import { getProgressPercentage } from '@/lib/utils';

interface ProgressBarProps {
  variant: 'streak' | 'subject';
  current: number;
  target: number;
  label: string;
  icon?: React.ReactNode;
}

export function ProgressBar({ variant, current, target, label, icon }: ProgressBarProps) {
  const percentage = getProgressPercentage(current, target);
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'streak':
        return {
          bg: 'bg-warning bg-opacity-20',
          fill: 'progress-glow',
          text: 'text-warning'
        };
      case 'subject':
        return {
          bg: 'bg-accent bg-opacity-20',
          fill: 'progress-glow',
          text: 'text-accent'
        };
      default:
        return {
          bg: 'bg-primary bg-opacity-20',
          fill: 'progress-glow',
          text: 'text-primary'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon || (variant === 'streak' ? <Calendar className="w-4 h-4" /> : <Target className="w-4 h-4" />)}
          <span className="font-medium text-fg">{label}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`font-bold ${styles.text}`}>{current}</span>
          <span className="text-fg text-opacity-50">/ {target}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className={`w-full h-3 rounded-full ${styles.bg} overflow-hidden`}>
          <div
            className={`h-full ${styles.fill} transition-all duration-1000 ease-out rounded-full`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        {/* Percentage Label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-fg drop-shadow-lg">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>

      {/* Achievement Indicator */}
      {percentage >= 100 && (
        <div className="flex items-center justify-center space-x-2 text-success animate-pulse-neon">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-semibold">Goal Achieved!</span>
        </div>
      )}
    </div>
  );
}
