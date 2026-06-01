import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dannion DP Generator | Create Stunning Profile Pictures',
  description: 'Generate beautiful themed display pictures with custom designs, background removal, and Canvas API compositing. Built by Dannion Creative Hub.',
  keywords: ['DP generator', 'profile picture maker', 'display picture', 'themed templates', 'background removal'],
  authors: [{ name: 'Dannion Creative Hub' }],
  openGraph: {
    title: 'Dannion DP Generator',
    description: 'Create stunning profile pictures with custom designs',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}