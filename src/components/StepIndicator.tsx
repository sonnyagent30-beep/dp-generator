'use client';

import { useState, useCallback } from 'react';

interface Step {
  id: number;
  label: string;
}

const steps: Step[] = [
  { id: 1, label: 'Upload' },
  { id: 2, label: 'Background' },
  { id: 3, label: 'Design' },
  { id: 4, label: 'Name' },
  { id: 5, label: 'Download' },
];

export default function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  currentStep >= step.id
                    ? 'bg-gold text-dark'
                    : 'bg-dark-200 text-gold-400 border-2 border-gold-400'
                }`}
              >
                {currentStep > step.id ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <span className={`text-xs mt-2 hidden sm:block ${currentStep >= step.id ? 'text-gold' : 'text-gold-400'}`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-8 sm:w-16 h-0.5 mx-1 sm:mx-2 transition-all duration-300 ${
                  currentStep > step.id ? 'bg-gold' : 'bg-dark-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}