'use client';

import { useState } from 'react';
import { trackBgToggle } from '@/lib/analytics';

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
    trackBgToggle(newValue ? 'enabled' : 'disabled');
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
          enabled 
            ? 'bg-gradient-to-br from-[#4DA3FF] to-[#0070F4] shadow-md' 
            : 'bg-gray-100'
        }`}>
          {enabled ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </div>

        {/* Text */}
        <div className="flex-1 mx-4">
          <h3 className="text-gray-800 font-semibold text-base">Remove Background</h3>
          <p className="text-gray-500 text-sm">Make your photo transparent</p>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={handleToggle}
          disabled={isProcessing}
          className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
            enabled 
              ? 'bg-gradient-to-r from-[#0070F4] to-[#4DA3FF]' 
              : 'bg-gray-200'
          } ${isProcessing ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
          aria-label="Toggle background removal"
        >
          <div
            className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 flex items-center justify-center ${
              enabled ? 'left-7' : 'left-1'
            }`}
          >
            <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              enabled ? 'bg-[#0070F4]' : 'bg-gray-400'
            }`} />
          </div>
        </button>
      </div>

      {/* Processing State */}
      {isProcessing && (
        <div className="mt-5 pt-5 border-t border-gray-100 flex items-center gap-3">
          <div 
            className="w-5 h-5 border-2 border-[#0070F4] border-t-transparent rounded-full animate-spin"
          />
          <span className="text-[#0070F4] text-sm font-medium">Processing background removal...</span>
        </div>
      )}
    </div>
  );
}