'use client';

import { Award, Lock, Star, Trophy, Zap } from 'lucide-react';

interface RewardBadgeProps {
  variant: 'earned' | 'locked';
  title: string;
  description: string;
  points?: number;
  icon?: 'award' | 'star' | 'trophy' | 'zap';
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

export function RewardBadge({ 
  variant, 
  title, 
  description, 
  points, 
  icon = 'award',
  rarity = 'common' 
}: RewardBadgeProps) {
  const getIconComponent = () => {
    switch (icon) {
      case 'star': return <Star className="w-6 h-6" />;
      case 'trophy': return <Trophy className="w-6 h-6" />;
      case 'zap': return <Zap className="w-6 h-6" />;
      default: return <Award className="w-6 h-6" />;
    }
  };

  const getRarityStyles = () => {
    switch (rarity) {
      case 'legendary':
        return {
          bg: 'bg-gradient-to-br from-yellow-400 to-orange-500',
          border: 'border-yellow-400',
          glow: 'shadow-[0_0_20px_rgba(251,191,36,0.5)]'
        };
      case 'epic':
        return {
          bg: 'bg-gradient-to-br from-purple-500 to-pink-500',
          border: 'border-purple-500',
          glow: 'shadow-[0_0_15px_rgba(168,85,247,0.4)]'
        };
      case 'rare':
        return {
          bg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
          border: 'border-blue-500',
          glow: 'shadow-[0_0_10px_rgba(59,130,246,0.3)]'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-gray-500 to-gray-600',
          border: 'border-gray-500',
          glow: 'shadow-[0_0_5px_rgba(107,114,128,0.2)]'
        };
    }
  };

  const rarityStyles = getRarityStyles();

  if (variant === 'locked') {
    return (
      <div className="cyber-card bg-surface bg-opacity-30 border-opacity-10 relative overflow-hidden">
        {/* Locked Overlay */}
        <div className="absolute inset-0 bg-surface bg-opacity-50 flex items-center justify-center z-10">
          <Lock className="w-8 h-8 text-fg text-opacity-30" />
        </div>
        
        <div className="p-4 space-y-3 opacity-50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-surface bg-opacity-50 rounded-full flex items-center justify-center">
              {getIconComponent()}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-fg">{title}</h4>
              <p className="text-sm text-fg text-opacity-70">{description}</p>
            </div>
          </div>
          
          {points && (
            <div className="flex items-center justify-between pt-2 border-t border-accent border-opacity-10">
              <span className="text-sm text-fg text-opacity-50">Reward</span>
              <span className="font-bold text-accent text-opacity-50">{points} pts</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`cyber-card relative overflow-hidden ${rarityStyles.glow} animate-float`}>
      {/* Rarity Indicator */}
      <div className={`absolute top-0 right-0 w-0 h-0 border-l-8 border-b-8 border-l-transparent ${rarityStyles.border} opacity-80`} />
      
      <div className="p-4 space-y-3">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${rarityStyles.bg} rounded-full flex items-center justify-center text-white ${rarityStyles.glow}`}>
            {getIconComponent()}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-fg">{title}</h4>
            <p className="text-sm text-fg text-opacity-70">{description}</p>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${rarityStyles.bg} text-white inline-block mt-1`}>
              {rarity.toUpperCase()}
            </span>
          </div>
        </div>
        
        {points && (
          <div className="flex items-center justify-between pt-2 border-t border-accent border-opacity-20">
            <span className="text-sm text-fg text-opacity-70">Earned</span>
            <span className="font-bold text-accent">{points} pts</span>
          </div>
        )}
      </div>
    </div>
  );
}
