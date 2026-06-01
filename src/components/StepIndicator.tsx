'use client';

interface Step {
  id: number;
  label: string;
}

const steps: Step[] = [
  { id: 1, label: 'Upload' },
  { id: 2, label: 'Design' },
  { id: 3, label: 'Name' },
  { id: 4, label: 'Download' },
];

export default function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-1 sm:gap-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              {/* Circle */}
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 shadow-sm ${
                  currentStep >= step.id
                    ? 'bg-gradient-to-br from-[#E5C158] via-[#D4AF37] to-[#B8960C] text-white shadow-md'
                    : 'bg-white text-gray-400 border-2 border-gray-200'
                }`}
              >
                {currentStep > step.id ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className={currentStep >= step.id ? 'text-white' : 'text-gray-400'}>{step.id}</span>
                )}
              </div>
              {/* Label */}
              <span className={`text-xs mt-2 font-medium hidden sm:block ${
                currentStep >= step.id ? 'text-gray-800' : 'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 mx-1 sm:mx-2 rounded-full transition-all duration-500 ${
                  currentStep > step.id 
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#E5C158]' 
                    : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}