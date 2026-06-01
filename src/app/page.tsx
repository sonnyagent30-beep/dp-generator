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
      setUserImageSrc(originalImageSrc);
      return;
    }

    if (!originalImageSrc) return;

    setIsRemovingBg(true);
    try {
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

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(180deg, #F8F9FA 0%, #FFFFFF 50%, #FFFFFF 100%)' }}>
      {/* Header - Clean and Professional */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                style={{ background: 'linear-gradient(135deg, #E5C158 0%, #D4AF37 50%, #B8960C 100%)' }}
              >
                <span className="text-white text-xl font-bold">D</span>
              </div>
              <div>
                <h1 className="text-gray-800 font-bold text-lg leading-tight">Dannion DP Generator</h1>
                <p className="text-gray-500 text-xs">Create stunning profile pictures</p>
              </div>
            </div>
            {/* Step Counter Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100">
              <span className="text-gray-500 text-sm">Step</span>
              <span className="text-gray-800 font-bold">{currentStep}</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-500">5</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Step Indicator - Modern Progress Bar */}
        <div className="mb-10">
          <StepIndicator currentStep={currentStep} />
        </div>

        {/* Step Content */}
        <div className="animate-fadeInUp">
          {/* Step 1: Upload */}
          {currentStep === 1 && (
            <section>
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Upload Your Photo</h2>
                <p className="text-gray-500">Choose a clear, high-quality photo for best results</p>
              </div>
              <UploadSection onImageUpload={handleImageUpload} />
            </section>
          )}

          {/* Step 2: Background Removal */}
          {currentStep === 2 && (
            <section>
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Remove Background?</h2>
                <p className="text-gray-500">Toggle to make your photo background transparent</p>
              </div>
              <div className="max-w-md mx-auto">
                <BgRemoverToggle onToggle={handleBgRemoveToggle} isProcessing={isRemovingBg} />
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
                <button
                  onClick={handleBack}
                  className="outline-btn"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="gold-btn"
                >
                  Continue to Designs →
                </button>
              </div>
            </section>
          )}

          {/* Step 3: Design Selection */}
          {currentStep === 3 && (
            <section>
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Choose a Design</h2>
                <p className="text-gray-500">Select a themed template for your profile picture</p>
              </div>
              <DesignGallery selectedDesign={selectedDesign?.id || null} onSelectDesign={handleDesignSelect} />
              <div className="flex justify-center mt-8">
                <button onClick={handleBack} className="outline-btn">
                  ← Back
                </button>
              </div>
            </section>
          )}

          {/* Step 4: Name Input */}
          {currentStep === 4 && (
            <section>
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Add Your Name</h2>
                <p className="text-gray-500">Your name will be beautifully displayed on the DP</p>
              </div>
              <div className="max-w-md mx-auto">
                <NameInput onNameChange={handleNameChange} />
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
                <button onClick={handleBack} className="outline-btn">
                  ← Back
                </button>
                <button
                  onClick={() => setCurrentStep(5)}
                  disabled={!userName.trim()}
                  className={`gold-btn ${!userName.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Generate Preview →
                </button>
              </div>
            </section>
          )}

          {/* Step 5: Preview & Download */}
          {currentStep === 5 && (
            <section>
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Your DP is Ready!</h2>
                <p className="text-gray-500">Download your personalized display picture</p>
              </div>
              <PreviewSection
                userImageSrc={userImageSrc!}
                selectedDesign={selectedDesign}
                userName={userName}
                removeBackground={removeBgEnabled}
              />
              <div className="flex justify-center mt-8">
                <button onClick={handleBack} className="outline-btn">
                  ← Modify
                </button>
              </div>
            </section>
          )}
        </div>

        {/* Start Over Button */}
        {currentStep > 1 && (
          <div className="text-center mt-10 pt-6 border-t border-gray-200">
            <button
              onClick={() => {
                setCurrentStep(1);
                setUserImageSrc(null);
                setOriginalImageSrc(null);
                setRemoveBgEnabled(false);
                setSelectedDesign(null);
                setUserName('');
              }}
              className="text-gray-500 hover:text-gray-700 transition-colors text-sm underline underline-offset-4"
            >
              Start Over
            </button>
          </div>
        )}
      </div>

      {/* Ads Section - Dannion Creative Hub */}
      <AdsSection />
    </main>
  );
}