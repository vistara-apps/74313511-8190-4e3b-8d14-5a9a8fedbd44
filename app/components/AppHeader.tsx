'use client';

import { useState } from 'react';
import { User, Settings2, Trophy } from 'lucide-react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { useTheme } from './ThemeProvider';

interface AppHeaderProps {
  userPoints: number;
  userStreak: number;
}

export function AppHeader({ userPoints, userStreak }: AppHeaderProps) {
  const [showProfile, setShowProfile] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="glass-card p-4 mb-6">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-bg">E</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-glow">EduSpin</h1>
            <p className="text-sm text-fg text-opacity-70">Spin to Learn, Earn to Win</p>
          </div>
        </div>

        {/* User Stats and Profile */}
        <div className="flex items-center space-x-4">
          {/* Points Display */}
          <div className="flex items-center space-x-2 bg-surface bg-opacity-50 px-3 py-2 rounded-lg">
            <Trophy className="w-4 h-4 text-accent" />
            <span className="font-bold text-accent">{userPoints}</span>
          </div>

          {/* Streak Display */}
          <div className="flex items-center space-x-2 bg-surface bg-opacity-50 px-3 py-2 rounded-lg">
            <span className="text-lg">🔥</span>
            <span className="font-bold text-warning">{userStreak}</span>
          </div>

          {/* Wallet Connection */}
          <Wallet>
            <ConnectWallet>
              <div className="flex items-center space-x-2 cyber-button px-4 py-2 cursor-pointer">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Connect</span>
              </div>
            </ConnectWallet>
          </Wallet>

          {/* Settings */}
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="p-2 rounded-lg bg-surface bg-opacity-50 hover:bg-opacity-70 transition-all duration-200"
          >
            <Settings2 className="w-5 h-5 text-fg" />
          </button>
        </div>
      </div>

      {/* Profile Dropdown */}
      {showProfile && (
        <div className="absolute right-4 top-20 z-50 glass-card p-4 rounded-lg min-w-[200px]">
          <div className="space-y-3">
            <div className="border-b border-accent border-opacity-20 pb-3">
              <Wallet>
                <ConnectWallet>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8" />
                    <div>
                      <Name className="font-semibold" />
                      <p className="text-sm text-fg text-opacity-70">Connected</p>
                    </div>
                  </div>
                </ConnectWallet>
              </Wallet>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as any)}
                className="w-full bg-surface border border-accent border-opacity-20 rounded-lg px-3 py-2 text-fg"
              >
                <option value="default">Cyberpunk (Default)</option>
                <option value="celo">CELO</option>
                <option value="solana">Solana</option>
                <option value="base">Base</option>
                <option value="coinbase">Coinbase</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
