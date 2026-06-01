'use client';

import { useCallback } from 'react';

interface UploadSectionProps {
  onImageUpload: (file: File, dataUrl: string) => void;
}

export default function UploadSection({ onImageUpload }: UploadSectionProps) {
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

  return (
    <div className="w-full max-w-md mx-auto">
      <label
        htmlFor="drop-zone"
        className="border-2 border-dashed border-gold-400 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-gold transition-all duration-300 bg-dark-100 hover:bg-dark-200"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="w-20 h-20 bg-gold-400 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-gold font-semibold mb-2">Click to upload or drag & drop</p>
        <p className="text-gold-400 text-sm">PNG, JPG, GIF up to 10MB</p>
        <input
          id="drop-zone"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}