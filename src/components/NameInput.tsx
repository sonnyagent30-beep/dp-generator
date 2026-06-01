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
    <div className="w-full max-w-md mx-auto">
      <div className="bg-dark-100 rounded-2xl p-6 border border-dark-200">
        <label htmlFor="name-input" className="block text-white font-semibold mb-2">
          Enter Your Name
        </label>
        <input
          id="name-input"
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Your name here..."
          className="w-full px-4 py-3 bg-dark-200 border border-dark-300 rounded-xl text-white placeholder-gold-400 focus:outline-none focus:border-gold transition-all duration-300"
          maxLength={30}
        />
        <p className="text-gold-400 text-sm mt-2">{name.length}/30 characters</p>
      </div>
    </div>
  );
}