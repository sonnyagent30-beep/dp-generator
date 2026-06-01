import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Dannion DP Generator',
  description: 'Privacy policy for Dannion DP Generator - Learn how we handle your data',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(180deg, #F8F9FA 0%, #FFFFFF 50%, #FFFFFF 100%)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                style={{ background: 'linear-gradient(135deg, #E5C158 0%, #D4AF37 50%, #B8960C 100%)' }}
              >
                <span className="text-white text-xl font-bold">D</span>
              </div>
              <div>
                <h1 className="text-gray-800 font-bold text-lg leading-tight">Dannion DP Generator</h1>
                <p className="text-gray-500 text-xs">Back to home</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 sm:p-10">
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Privacy Policy</h2>
          <p className="text-gray-500 text-sm mb-8">Last updated: June 2025</p>

          {/* Content */}
          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Information We Collect</h3>
              <p className="text-gray-600 leading-relaxed">
                We collect anonymous usage statistics to improve our service. This includes:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mt-3">
                <li>Design selections (which templates you choose)</li>
                <li>Display picture generation events</li>
                <li>Browser type and device information</li>
                <li>General geographic region (country level only)</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-3">
                <strong>We do NOT collect</strong> your photos, personal images, names, email addresses, or any personally identifiable information.
              </p>
            </section>

            <div className="border-t border-gray-200 pt-6">
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">How We Process Your Photos</h3>
                <p className="text-gray-600 leading-relaxed">
                  All photo processing happens <strong>entirely in your browser</strong>. Your images are never uploaded to our servers or transmitted to any third party. When you create a display picture:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-3">
                  <li>Your photo stays on your device</li>
                  <li>Background removal uses client-side processing</li>
                  <li>The final image is composited locally</li>
                  <li>Downloads happen directly to your device</li>
                </ul>
              </section>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Google Analytics</h3>
                <p className="text-gray-600 leading-relaxed">
                  We use Google Analytics 4 to understand how visitors use our app. This service collects:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-3">
                  <li>Pages visited and navigation patterns</li>
                  <li>Design selections and creation events</li>
                  <li>Device and browser information</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Google Analytics uses cookies and may collect data according to their{' '}
                  <a 
                    href="https://policies.google.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#D4AF37] hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </section>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Data Retention</h3>
                <p className="text-gray-600 leading-relaxed">
                  We do not store any user photos or personal data on our servers. Analytics data is retained according to Google Analytics data retention settings (typically up to 14 months).
                </p>
              </section>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Children's Privacy</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our service is not directed to children under 13. We do not knowingly collect information from children under 13.
                </p>
              </section>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Changes to This Policy</h3>
                <p className="text-gray-600 leading-relaxed">
                  We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.
                </p>
              </section>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Us</h3>
                <p className="text-gray-600 leading-relaxed">
                  If you have questions about this privacy policy, please contact us:
                </p>
                <div className="mt-3 text-gray-600">
                  <p><strong>Email:</strong> dannioncreativehub@gmail.com</p>
                  <p><strong>WhatsApp:</strong> +234 703 298 1049</p>
                </div>
              </section>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#B8960C] font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to DP Generator
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Dannion Creative Hub. All rights reserved.
        </p>
      </footer>
    </main>
  );
}