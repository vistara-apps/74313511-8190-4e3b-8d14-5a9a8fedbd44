'use client';

import { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { TOPICS, TOPIC_COLORS } from '@/lib/constants';
import type { Challenge } from '@/lib/types';

interface SpinWheelProps {
  onSpin: (topic: string) => void;
  isSpinning: boolean;
  canSpin: boolean;
  lastSpinTopic?: string;
}

export function SpinWheel({ onSpin, isSpinning, canSpin, lastSpinTopic }: SpinWheelProps) {
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    if (!canSpin || isSpinning) return;

    // Generate random rotation (multiple full rotations + random position)
    const spins = 5 + Math.random() * 5; // 5-10 full rotations
    const finalRotation = rotation + (spins * 360) + Math.random() * 360;
    
    setRotation(finalRotation);

    // Determine which topic was selected based on final position
    const normalizedRotation = finalRotation % 360;
    const sectionSize = 360 / TOPICS.length;
    const selectedIndex = Math.floor(normalizedRotation / sectionSize);
    const selectedTopic = TOPICS[selectedIndex];

    // Trigger the spin callback after animation
    setTimeout(() => {
      onSpin(selectedTopic);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Spin Wheel */}
      <div className="relative">
        {/* Wheel */}
        <div
          className="spin-wheel transition-transform duration-[3000ms] ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Wheel Sections */}
          {TOPICS.map((topic, index) => {
            const angle = (360 / TOPICS.length) * index;
            const color = TOPIC_COLORS[topic as keyof typeof TOPIC_COLORS];
            
            return (
              <div
                key={topic}
                className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm"
                style={{
                  transform: `rotate(${angle}deg)`,
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((360 / TOPICS.length) * Math.PI / 180)}% ${50 - 50 * Math.sin((360 / TOPICS.length) * Math.PI / 180)}%)`,
                  backgroundColor: color,
                }}
              >
                <span
                  className="transform"
                  style={{ transform: `rotate(${360 / TOPICS.length / 2}deg) translateY(-80px)` }}
                >
                  {topic}
                </span>
              </div>
            );
          })}
        </div>

        {/* Center Hub */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-surface rounded-full border-4 border-accent flex items-center justify-center shadow-neon">
            <div className="w-8 h-8 bg-accent rounded-full animate-pulse-neon"></div>
          </div>
        </div>

        {/* Pointer */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-accent shadow-neon"></div>
        </div>
      </div>

      {/* Spin Button */}
      <div className="text-center space-y-4">
        {canSpin ? (
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className={`cyber-button flex items-center space-x-2 ${
              isSpinning ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-neon-lg'
            }`}
          >
            {isSpinning ? (
              <>
                <RotateCcw className="w-5 h-5 animate-spin" />
                <span>Spinning...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Daily Learning Goals</span>
              </>
            )}
          </button>
        ) : (
          <div className="cyber-card text-center">
            <p className="text-fg text-opacity-70 mb-2">Today's challenge completed!</p>
            {lastSpinTopic && (
              <p className="text-accent font-semibold">Last topic: {lastSpinTopic}</p>
            )}
            <p className="text-sm text-fg text-opacity-50 mt-2">Come back tomorrow for a new challenge</p>
          </div>
        )}
      </div>
    </div>
  );
}
