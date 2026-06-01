'use client';

import { designs, DesignConfig } from '@/lib/designs';
import { trackDesignSelected } from '@/lib/analytics';

interface DesignGalleryProps {
  selectedDesign: string | null;
  onSelectDesign: (design: DesignConfig) => void;
}

export default function DesignGallery({ selectedDesign, onSelectDesign }: DesignGalleryProps) {
  const handleDesignClick = (design: DesignConfig) => {
    trackDesignSelected(design.id, design.name);
    onSelectDesign(design);
  };
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl mx-auto">
      {designs.map((design, index) => (
        <button
          key={design.id}
          onClick={() => handleDesignClick(design)}
          className={`relative bg-white rounded-2xl p-4 sm:p-5 border-2 transition-all duration-300 text-left group hover:shadow-xl ${
            selectedDesign === design.id
              ? 'border-[#D4AF37] shadow-lg scale-[1.02]'
              : 'border-gray-200 hover:border-[#D4AF37]/50 hover:scale-[1.01]'
          }`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Design Preview */}
          <div 
            className="relative aspect-square rounded-xl mb-4 overflow-hidden"
            style={{
              background: design.id.includes('anniversary') 
                ? 'linear-gradient(135deg, #FFD700 0%, #B8860B 50%, #D4AF37 100%)' 
                : design.id.includes('romantic')
                ? 'linear-gradient(135deg, #FF69B4 0%, #FF1493 50%, #FFB6C1 100%)'
                : design.id.includes('classic')
                ? 'linear-gradient(135deg, #1a1a1a 0%, #333 50%, #4a4a4a 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            }}
          >
            {/* Design pattern overlay */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-4 border-2 border-white/50 rounded-xl" />
              <div className="absolute inset-8 border border-white/30 rounded-lg" />
              <div className="absolute inset-12 border border-white/20 rounded-md" />
            </div>
            
            {/* Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              {design.id.includes('anniversary') && (
                <svg className="w-12 h-12 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              )}
              {design.id.includes('romantic') && (
                <svg className="w-12 h-12 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              )}
              {design.id.includes('classic') && (
                <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
              {design.id.includes('celebration') && (
                <svg className="w-12 h-12 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.5 2.5c0 1.5-1.5 3.5-1.5 5.5 0 1 .5 2 1.5 3l6 6c1 1 1 2 0 3l-2 2c-1 1-2 1-3 0l-6-6c-1-1-2-1.5-3-1.5-2 0-4 1.5-5.5 1.5S1 14 1 15.5c0 2.5 2 4 4 4h11c2 0 4-1.5 4-4 0-1.5-1-3-2.5-4-.5-.5-1.5-1.5-1.5-3z"/>
                </svg>
              )}
            </div>
          </div>

          {/* Design Name & Description */}
          <h3 className="text-gray-800 font-semibold text-sm sm:text-base mb-1 group-hover:text-[#D4AF37] transition-colors">
            {design.name}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm leading-tight">{design.description}</p>

          {/* Selected Indicator */}
          {selectedDesign === design.id && (
            <div className="absolute -top-3 -right-3 w-7 h-7 bg-gradient-to-br from-[#E5C158] to-[#D4AF37] rounded-full flex items-center justify-center shadow-md animate-scaleIn">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}