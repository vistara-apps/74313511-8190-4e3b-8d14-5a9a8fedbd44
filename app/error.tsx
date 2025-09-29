'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('EduSpin Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="cyber-card p-8 text-center max-w-md w-full">
        <div className="w-16 h-16 bg-error bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-error" />
        </div>
        
        <h2 className="text-2xl font-bold text-fg mb-4">
          Oops! Something went wrong
        </h2>
        
        <p className="text-fg text-opacity-70 mb-6">
          Don't worry, even the best learners encounter obstacles. Let's get you back on track!
        </p>
        
        <div className="space-y-3">
          <button
            onClick={reset}
            className="cyber-button w-full flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          
          <Link
            href="/"
            className="block w-full p-3 bg-surface bg-opacity-50 text-fg rounded-lg hover:bg-opacity-70 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
        </div>
        
        {error.digest && (
          <p className="text-xs text-fg text-opacity-50 mt-4">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
