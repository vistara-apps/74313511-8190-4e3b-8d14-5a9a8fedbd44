'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, Award, ArrowRight } from 'lucide-react';
import type { Challenge } from '@/lib/types';

interface ChallengeCardProps {
  challenge: Challenge;
  onAnswer: (selectedAnswer: number, isCorrect: boolean) => void;
  isAnswered: boolean;
  selectedAnswer?: number;
}

export function ChallengeCard({ challenge, onAnswer, isAnswered, selectedAnswer }: ChallengeCardProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    const isCorrect = answerIndex === challenge.correctAnswer;
    onAnswer(answerIndex, isCorrect);
    
    // Show explanation after a brief delay
    setTimeout(() => {
      setShowExplanation(true);
    }, 1000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-success';
      case 'medium': return 'text-warning';
      case 'hard': return 'text-error';
      default: return 'text-accent';
    }
  };

  const getOptionStyle = (index: number) => {
    if (!isAnswered) {
      return 'bg-surface bg-opacity-50 hover:bg-opacity-70 border-accent border-opacity-20 hover:border-opacity-40';
    }
    
    if (index === challenge.correctAnswer) {
      return 'bg-success bg-opacity-20 border-success text-success';
    }
    
    if (index === selectedAnswer && index !== challenge.correctAnswer) {
      return 'bg-error bg-opacity-20 border-error text-error';
    }
    
    return 'bg-surface bg-opacity-30 border-accent border-opacity-10 text-fg text-opacity-50';
  };

  return (
    <div className="cyber-card space-y-6">
      {/* Challenge Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="px-3 py-1 bg-accent bg-opacity-20 rounded-full">
            <span className="text-accent font-semibold text-sm">{challenge.topic}</span>
          </div>
          <div className={`px-3 py-1 bg-opacity-20 rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
            <span className={`font-semibold text-sm ${getDifficultyColor(challenge.difficulty)}`}>
              {challenge.difficulty.toUpperCase()}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-accent">
          <Award className="w-4 h-4" />
          <span className="font-bold">{challenge.rewardPoints} pts</span>
        </div>
      </div>

      {/* Question */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-fg leading-relaxed">
          {challenge.question}
        </h3>
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {challenge.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={isAnswered}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${getOptionStyle(index)} ${
              !isAnswered ? 'hover:scale-105 cursor-pointer' : 'cursor-default'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{option}</span>
              {isAnswered && (
                <div className="flex items-center">
                  {index === challenge.correctAnswer && (
                    <CheckCircle className="w-5 h-5 text-success" />
                  )}
                  {index === selectedAnswer && index !== challenge.correctAnswer && (
                    <XCircle className="w-5 h-5 text-error" />
                  )}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Result and Explanation */}
      {isAnswered && (
        <div className="space-y-4 pt-4 border-t border-accent border-opacity-20">
          {/* Result */}
          <div className={`flex items-center space-x-3 p-4 rounded-lg ${
            selectedAnswer === challenge.correctAnswer 
              ? 'bg-success bg-opacity-20 border border-success border-opacity-30' 
              : 'bg-error bg-opacity-20 border border-error border-opacity-30'
          }`}>
            {selectedAnswer === challenge.correctAnswer ? (
              <>
                <CheckCircle className="w-6 h-6 text-success" />
                <div>
                  <p className="font-semibold text-success">Correct!</p>
                  <p className="text-sm text-success text-opacity-80">
                    You earned {challenge.rewardPoints} points
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-error" />
                <div>
                  <p className="font-semibold text-error">Incorrect</p>
                  <p className="text-sm text-error text-opacity-80">
                    Better luck next time!
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Explanation */}
          {showExplanation && challenge.explanation && (
            <div className="bg-surface bg-opacity-30 p-4 rounded-lg border border-accent border-opacity-20">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-accent bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent text-sm font-bold">i</span>
                </div>
                <div>
                  <p className="font-semibold text-accent mb-1">Explanation</p>
                  <p className="text-fg text-opacity-80 leading-relaxed">
                    {challenge.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
