export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">
            This Privacy Policy describes how Dannion Creative Hub collects and uses your personal information.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Information We Collect</h2>
          <p className="text-gray-600 mb-4">
            We collect information you provide directly, such as your name when you generate a display picture. 
            Images uploaded are processed in your browser and are not stored on our servers.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">How We Use Information</h2>
          <p className="text-gray-600 mb-4">
            We use the information to provide our DP generation services and to improve user experience.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have questions, contact us at dannioncreativehub@gmail.com
          </p>
          
          <p className="text-gray-400 text-sm mt-12">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </main>
  );
}
