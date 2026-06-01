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

  const handleShareWhatsApp = () => {
    if (!previewUrl) return;
    const text = encodeURIComponent('Check out my new DP created with Dannion DP Generator! 🎉');
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleShareInstagram = () => {
    alert('To share on Instagram, please download the image first and then upload it manually to your Instagram story or post.');
  };

  if (!selectedDesign || !userName.trim()) {
    return (
      <div className="bg-white rounded-2xl p-10 w-full max-w-md mx-auto border border-gray-200 flex flex-col items-center justify-center min-h-[300px] shadow-lg">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
        <p className="text-gray-500 text-center font-medium">Select a design and enter your name to preview</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Preview Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-[#D4AF37]/30 shadow-xl w-full max-w-sm sm:max-w-md">
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl aspect-square overflow-hidden flex items-center justify-center">
          {isGenerating ? (
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-[#D4AF37] font-medium">Generating preview...</p>
            </div>
          ) : previewUrl ? (
            <img src={previewUrl} alt="DP Preview" className="w-full h-full object-contain" />
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-gray-200 rounded-full mb-4 animate-pulse" />
              <p className="text-gray-500">Preparing preview...</p>
            </div>
          )}
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        disabled={!previewUrl || isGenerating}
        className={`mt-6 px-8 py-4 gold-btn shadow-lg ${
          previewUrl && !isGenerating ? 'hover:scale-105' : 'opacity-50 cursor-not-allowed'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download Your DP
      </button>

      {/* Share Section */}
      <div className="mt-8 pt-6 border-t border-gray-200 w-full max-w-sm">
        <p className="text-center text-gray-600 text-sm mb-4 font-medium">Share your DP</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleShareWhatsApp}
            disabled={!previewUrl}
            className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="text-gray-700 font-medium text-sm">WhatsApp</span>
          </button>
          <button
            onClick={handleShareInstagram}
            disabled={!previewUrl}
            className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-pink-500 hover:bg-pink-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span className="text-gray-700 font-medium text-sm">Instagram</span>
          </button>
        </div>
      </div>
    </div>
  );
}