'use client';

import { useState, useCallback } from 'react';
import StepIndicator from '@/components/StepIndicator';
import UploadSection from '@/components/UploadSection';
import BgRemoverToggle from '@/components/BgRemoverToggle';
import DesignGallery from '@/components/DesignGallery';
import NameInput from '@/components/NameInput';
import PreviewSection from '@/components/PreviewSection';
import AdsSection from '@/components/AdsSection';
import { DesignConfig } from '@/lib/designs';
import { removeBackground } from '@/lib/remove-bg';

export default function Home() {
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [userImageSrc, setUserImageSrc] = useState<string | null>(null);
  const [originalImageSrc, setOriginalImageSrc] = useState<string | null>(null);
  const [removeBgEnabled, setRemoveBgEnabled] = useState(false);
  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<DesignConfig | null>(null);
  const [userName, setUserName] = useState('');

  const handleImageUpload = useCallback((file: File, dataUrl: string) => {
    setOriginalImageSrc(dataUrl);
    setUserImageSrc(dataUrl);
    setCurrentStep(2);
  }, []);

  const handleBgRemoveToggle = useCallback(async (enabled: boolean) => {
    setRemoveBgEnabled(enabled);
    
    if (!enabled) {
      // Reset to original image
      setUserImageSrc(originalImageSrc);
      return;
    }

    if (!originalImageSrc) return;

    setIsRemovingBg(true);
    try {
      // Convert base64 to File
      const response = await fetch(originalImageSrc);
      const blob = await response.blob();
      const file = new File([blob], 'image.png', { type: 'image/png' });

      const result = await removeBackground(file);
      
      if (result.success && result.data) {
        setUserImageSrc(result.data);
      } else {
        alert(result.error || 'Failed to remove background');
        setRemoveBgEnabled(false);
      }
    } catch (error) {
      console.error('Background removal error:', error);
      alert('Failed to remove background. Please try again.');
      setRemoveBgEnabled(false);
    } finally {
      setIsRemovingBg(false);
    }
  }, [originalImageSrc]);

  const handleDesignSelect = useCallback((design: DesignConfig) => {
    setSelectedDesign(design);
    setCurrentStep(4);
  }, []);

  const handleNameChange = useCallback((name: string) => {
    setUserName(name);
  }, []);

  const canProceedToStep = (step: number) => {
    switch (step) {
      case 1:
        return !!userImageSrc;
      case 2:
        return true; // Background removal is optional
      case 3:
        return !!selectedDesign;
      case 4:
        return userName.trim().length > 0;
      default:
        return false;
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <main className="min-h-screen bg-dark-100">
      {/* Header */}
      <header className="py-8 px-4 border-b border-dark-300">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center">
              <span className="text-dark text-2xl font-bold">D</span>
            </div>
            <div>
              <h1 className="text-gold font-bold text-xl">Dannion DP Generator</h1>
              <p className="text-gold-400 text-sm">Create stunning profile pictures</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Step Content */}
        <div className="mt-12">
          {/* Step 1: Upload */}
          {currentStep === 1 && (
            <section className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-white text-center mb-4">Upload Your Photo</h2>
              <p className="text-gold-400 text-center mb-8">Choose a clear, high-quality photo for best results</p>
              <UploadSection onImageUpload={handleImageUpload} />
            </section>
          )}

          {/* Step 2: Background Removal */}
          {currentStep === 2 && (
            <section className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-white text-center mb-4">Remove Background?</h2>
              <p className="text-gold-400 text-center mb-8">Toggle to make your photo background transparent</p>
              <BgRemoverToggle onToggle={handleBgRemoveToggle} isProcessing={isRemovingBg} />
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={handleBack}
                  className="px-6 py-3 bg-dark-200 text-gold border border-gold-400 rounded-xl hover:bg-dark-300 transition-all duration-300"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 bg-gold text-dark font-bold rounded-xl hover:bg-gold-400 transition-all duration-300"
                >
                  Continue to Designs →
                </button>
              </div>
            </section>
          )}

          {/* Step 3: Design Selection */}
          {currentStep === 3 && (
            <section className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-white text-center mb-4">Choose a Design</h2>
              <p className="text-gold-400 text-center mb-8">Select a themed template for your profile picture</p>
              <DesignGallery selectedDesign={selectedDesign?.id || null} onSelectDesign={handleDesignSelect} />
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleBack}
                  className="px-6 py-3 bg-dark-200 text-gold border border-gold-400 rounded-xl hover:bg-dark-300 transition-all duration-300"
                >
                  ← Back
                </button>
              </div>
            </section>
          )}

          {/* Step 4: Name Input */}
          {currentStep === 4 && (
            <section className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-white text-center mb-4">Add Your Name</h2>
              <p className="text-gold-400 text-center mb-8">Your name will be displayed on the DP</p>
              <NameInput onNameChange={handleNameChange} />
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={handleBack}
                  className="px-6 py-3 bg-dark-200 text-gold border border-gold-400 rounded-xl hover:bg-dark-300 transition-all duration-300"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setCurrentStep(5)}
                  disabled={!userName.trim()}
                  className={`px-6 py-3 bg-gold text-dark font-bold rounded-xl transition-all duration-300 ${
                    userName.trim() ? 'hover:bg-gold-400' : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  Generate Preview →
                </button>
              </div>
            </section>
          )}

          {/* Step 5: Preview & Download */}
          {currentStep === 5 && (
            <section className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-white text-center mb-4">Your DP is Ready!</h2>
              <p className="text-gold-400 text-center mb-8">Download your personalized display picture</p>
              <PreviewSection
                userImageSrc={userImageSrc!}
                selectedDesign={selectedDesign}
                userName={userName}
                removeBackground={removeBgEnabled}
              />
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleBack}
                  className="px-6 py-3 bg-dark-200 text-gold border border-gold-400 rounded-xl hover:bg-dark-300 transition-all duration-300"
                >
                  ← Modify
                </button>
              </div>
            </section>
          )}
        </div>

        {/* Start Over Button */}
        {currentStep > 1 && (
          <div className="text-center mt-12">
            <button
              onClick={() => {
                setCurrentStep(1);
                setUserImageSrc(null);
                setOriginalImageSrc(null);
                setRemoveBgEnabled(false);
                setSelectedDesign(null);
                setUserName('');
              }}
              className="text-gold-400 hover:text-gold transition-colors text-sm underline"
            >
              Start Over
            </button>
          </div>
        )}
      </div>

      {/* Ads Section */}
      <AdsSection />
    </main>
  );
}