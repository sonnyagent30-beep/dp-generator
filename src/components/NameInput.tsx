'use client';

import { useState } from 'react';

interface NameInputProps {
  onNameChange: (name: string) => void;
}

export default function NameInput({ onNameChange }: NameInputProps) {
  const [name, setName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    onNameChange(value);
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <label htmlFor="name-input" className="block text-gray-700 font-semibold mb-3">
          Enter Your Name
        </label>
        <div className="relative">
          <input
            id="name-input"
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="Your name will appear on your DP"
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0070F4] focus:bg-white transition-all duration-300 text-base"
            maxLength={30}
          />
          {/* Character counter */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <span className={`text-sm font-medium ${name.length > 25 ? 'text-red-500' : 'text-gray-400'}`}>
              {name.length}
            </span>
            <span className="text-gray-400 text-sm">/30</span>
          </div>
        </div>

        {/* Preview hint */}
        {name.trim() && (
          <div className="mt-4 p-4 bg-gradient-to-r from-[#0070F4]/10 via-[#4DA3FF]/10 to-[#0070F4]/10 rounded-xl border border-[#0070F4]/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4DA3FF] to-[#0070F4] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <p className="text-gray-600 text-sm">
                Name preview: <span className="font-semibold text-[#001E36]">{name.toUpperCase()}</span>
              </p>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-500 text-xs">30 characters max</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-500 text-xs">Uppercase formatting</span>
        </div>
      </div>
    </div>
  );
}