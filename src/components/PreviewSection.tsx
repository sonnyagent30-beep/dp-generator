'use client';

import { useState, useEffect } from 'react';
import { DesignConfig } from '@/lib/designs';
import { compositeDP } from '@/lib/compositor';

interface PreviewSectionProps {
  userImageSrc: string;
  selectedDesign: DesignConfig | null;
  userName: string;
  removeBackground: boolean;
}

export default function PreviewSection({ userImageSrc, selectedDesign, userName, removeBackground }: PreviewSectionProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!userImageSrc || !selectedDesign || !userName.trim()) {
      setPreviewUrl(null);
      return;
    }

    const generatePreview = async () => {
      setIsGenerating(true);
      try {
        const result = await compositeDP({
          userImageSrc,
          templateImageSrc: selectedDesign.image,
          design: selectedDesign,
          userName: userName.trim(),
        });
        setPreviewUrl(result);
      } catch (error) {
        console.error('Failed to generate preview:', error);
      } finally {
        setIsGenerating(false);
      }
    };

    // Debounce preview generation
    const timeout = setTimeout(generatePreview, 300);
    return () => clearTimeout(timeout);
  }, [userImageSrc, selectedDesign, userName, removeBackground]);

  const handleDownload = () => {
    if (!previewUrl) return;
    
    const link = document.createElement('a');
    link.href = previewUrl;
    link.download = `dannion-dp-${Date.now()}.png`;
    link.click();
  };

  if (!selectedDesign || !userName.trim()) {
    return (
      <div className="bg-dark-100 rounded-2xl p-8 w-full max-w-md mx-auto border border-dark-200 flex flex-col items-center justify-center min-h-[300px]">
        <div className="text-gold-400 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <p>Select a design and enter your name to preview</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-dark-100 rounded-2xl p-6 border border-gold-400 w-full max-w-md">
        <div className="relative bg-dark-200 rounded-xl aspect-square overflow-hidden flex items-center justify-center">
          {isGenerating ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin w-12 h-12 border-4 border-gold border-t-transparent rounded-full mb-4" />
              <p className="text-gold">Generating preview...</p>
            </div>
          ) : previewUrl ? (
            <img src={previewUrl} alt="DP Preview" className="w-full h-full object-contain" />
          ) : (
            <div className="flex flex-col items-center">
              <div className="animate-pulse w-12 h-12 bg-gold-400 rounded-full mb-4" />
              <p className="text-gold-400">Preparing preview...</p>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={handleDownload}
        disabled={!previewUrl || isGenerating}
        className={`mt-6 px-8 py-4 bg-gold text-dark font-bold rounded-xl transition-all duration-300 flex items-center gap-3 ${
          previewUrl && !isGenerating
            ? 'hover:bg-gold-400 hover:scale-105'
            : 'opacity-50 cursor-not-allowed'
        }`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download Your DP
      </button>
    </div>
  );
}