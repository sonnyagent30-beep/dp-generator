'use client';

import { useState } from 'react';

interface BgRemoverToggleProps {
  onToggle: (remove: boolean) => void;
  isProcessing: boolean;
}

export default function BgRemoverToggle({ onToggle, isProcessing }: BgRemoverToggleProps) {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    onToggle(newValue);
  };

  return (
    <div className="bg-dark-100 rounded-2xl p-6 w-full max-w-md mx-auto border border-dark-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${enabled ? 'bg-gold' : 'bg-dark-200'}`}>
            <svg className={`w-6 h-6 ${enabled ? 'text-dark' : 'text-gold-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-semibold">Remove Background</h3>
            <p className="text-gold-400 text-sm">Make your photo transparent</p>
          </div>
        </div>
        <button
          onClick={handleToggle}
          disabled={isProcessing}
          className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
            enabled ? 'bg-gold' : 'bg-dark-200'
          } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div
            className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 ${
              enabled ? 'left-9' : 'left-1'
            }`}
          />
        </button>
      </div>
      {isProcessing && (
        <div className="mt-4 flex items-center gap-3 text-gold">
          <div className="animate-spin w-5 h-5 border-2 border-gold border-t-transparent rounded-full" />
          <span className="text-sm">Processing background removal...</span>
        </div>
      )}
    </div>
  );
}