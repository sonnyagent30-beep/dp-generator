'use client';

import { designs, DesignConfig } from '@/lib/designs';

interface DesignGalleryProps {
  selectedDesign: string | null;
  onSelectDesign: (design: DesignConfig) => void;
}

export default function DesignGallery({ selectedDesign, onSelectDesign }: DesignGalleryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mx-auto">
      {designs.map((design) => (
        <button
          key={design.id}
          onClick={() => onSelectDesign(design)}
          className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
            selectedDesign === design.id
              ? 'border-gold bg-gold-400 bg-opacity-10'
              : 'border-dark-200 bg-dark-100 hover:border-gold-400'
          }`}
        >
          {/* Design Preview Placeholder */}
          <div className="bg-dark-200 rounded-xl aspect-square mb-4 flex items-center justify-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: design.id.includes('anniversary') 
                  ? 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)' 
                  : design.id.includes('romantic')
                  ? 'linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)'
                  : design.id.includes('classic')
                  ? 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)'
                  : 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
              }}
            />
            <div className="absolute inset-4 border-2 border-white border-opacity-30 rounded-lg" />
            <div className="absolute inset-8 border border-white border-opacity-20 rounded-lg" />
            <span className="text-white text-opacity-50 font-medium z-10">{design.name}</span>
          </div>
          <h3 className="text-white font-semibold mb-1">{design.name}</h3>
          <p className="text-gold-400 text-sm">{design.description}</p>
          {selectedDesign === design.id && (
            <div className="absolute top-4 right-4 w-6 h-6 bg-gold rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}