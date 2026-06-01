'use client';

import { useCallback, useRef } from 'react';

interface UploadSectionProps {
  onImageUpload: (file: File, dataUrl: string) => void;
}

export default function UploadSection({ onImageUpload }: UploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target?.result as string;
          onImageUpload(file, dataUrl);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target?.result as string;
          onImageUpload(file, dataUrl);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageUpload]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="relative bg-white rounded-2xl p-10 sm:p-14 border-2 border-dashed border-gray-300 cursor-pointer transition-all duration-300 hover:border-[#D4AF37] hover:shadow-lg group"
        style={{
          background: 'linear-gradient(145deg, #FFFFFF 0%, #F8F9FA 100%)',
        }}
      >
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        
        {/* Icon Container */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%)',
          }}
        >
          <svg 
            className="w-10 h-10 text-[#D4AF37] transition-transform duration-300 group-hover:scale-110" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </div>

        {/* Text Content */}
        <div className="text-center">
          <p className="text-gray-800 font-semibold text-lg mb-2">Tap to upload your photo</p>
          <p className="text-gray-500 text-sm">or drag and drop your image here</p>
        </div>

        {/* Format hint */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-500 text-xs font-medium">PNG</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-500 text-xs font-medium">JPG</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-500 text-xs font-medium">GIF</span>
          <span className="text-gray-400 text-xs">up to 10MB</span>
        </div>

        {/* Gold accent line on hover */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-[#E5C158] via-[#D4AF37] to-[#B8960C] rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
          style={{ width: '60%' }}
        />
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-gray-300 rounded-tl-xl opacity-50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-gray-300 rounded-tr-xl opacity-50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-gray-300 rounded-bl-xl opacity-50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gray-300 rounded-br-xl opacity-50" />
    </div>
  );
}