# Dannion DP Generator

A themed display picture (DP) generator built with Next.js. Create stunning profile pictures with custom designs, background removal, and Canvas API compositing.

![Dannion DP Generator](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan)

## ✨ Features

- **📤 Photo Upload** - Drag & drop or click to upload your photo
- **✨ Background Removal** - Toggle remove.bg API for transparent backgrounds
- **🎨 Design Templates** - Choose from 4 beautiful themed templates
- **✍️ Custom Name** - Add your name to personalize your DP
- **🎯 Real-time Preview** - Canvas API compositing for instant preview
- **📥 PNG Download** - Download your finished DP instantly
- **📱 Mobile-First** - Beautiful responsive design

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A remove.bg API key (get one at https://remove.bg)

### Installation

```bash
# Clone the repository
git clone https://github.com/sonnyagent30-beep/dp-generator.git
cd dp-generator

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Add your remove.bg API key to .env.local
# Edit .env.local and set: REMOVEBG_API_KEY=your_key_here

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start creating DPs.

## 🚢 Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sonnyagent30-beep/dp-generator)

### Manual Deploy

1. Fork or clone this repository to your GitHub account
2. Go to [Vercel](https://vercel.com) and sign in
3. Click "Import Project" and select your repository
4. Add environment variable:
   - Key: `REMOVEBG_API_KEY`
   - Value: your remove.bg API key
5. Click "Deploy"

## 🎨 How to Add New Design Templates

### Step 1: Create Your Design Image

Create a PNG image (recommended size: 800x800px) with:

1. **Transparent Center Area** - This is where the user's photo will be placed
2. **Decorative Frame** - The themed border/frame around the image
3. **Text Area** - Space for the user's name

### Step 2: Add Design Configuration

Edit `src/lib/designs.ts` and add a new entry:

```typescript
{
  id: 'my-custom-design',
  name: 'My Custom Design',
  description: 'Description of your design',
  image: '/designs/my-custom-design.png',
  photoPosition: { x: 100, y: 100, width: 600, height: 500 },
  namePosition: { x: 400, y: 680, fontSize: 36, color: '#FFD700' }
}
```

**Configuration properties:**
- `id` - Unique identifier for the design
- `name` - Display name shown in the gallery
- `description` - Brief description
- `image` - Path to the PNG file in `/public/designs/`
- `photoPosition` - Where the user's photo is placed:
  - `x`, `y` - Top-left corner position
  - `width`, `height` - Size of the photo area
- `namePosition` - Where the user's name appears:
  - `x`, `y` - Center position of the text
  - `fontSize` - Size of the text
  - `color` - Text color (hex)

### Step 3: Upload Your Template

1. Save your PNG to `/public/designs/my-custom-design.png`
2. Restart the development server
3. Test your new design!

## 📁 Project Structure

```
dp-generator/
├── public/
│   └── designs/              # Design template images
│       ├── anniversary-gold.png
│       ├── romantic-rose.png
│       ├── classic-minimal.png
│       └── celebration.png
├── src/
│   ├── app/
│   │   ├── page.tsx         # Main page with step flow
│   │   ├── layout.tsx       # Root layout with fonts
│   │   └── globals.css      # Global styles + custom properties
│   ├── components/           # UI components
│   │   ├── StepIndicator.tsx
│   │   ├── UploadSection.tsx
│   │   ├── BgRemoverToggle.tsx
│   │   ├── DesignGallery.tsx
│   │   ├── NameInput.tsx
│   │   ├── PreviewSection.tsx
│   │   └── AdsSection.tsx
│   └── lib/                 # Utilities
│       ├── designs.ts       # Design configurations
│       ├── remove-bg.ts     # remove.bg API integration
│       └── compositor.ts    # Canvas API compositing
├── .env.example             # Environment variable template
├── README.md
└── package.json
```

## 🛠️ Tech Stack

- **Next.js 16** - App Router, Server Components
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Canvas API** - Client-side image compositing
- **remove.bg API** - Background removal service

## 📞 Contact

**Dannion Creative Hub**

- 💬 WhatsApp: +234 703 298 1049
- 📧 Email: dannioncreativehub@gmail.com
- 📸 Instagram: [@dannion_creative_hub](https://instagram.com/dannion_creative_hub)
- 🎵 TikTok: [@dannion_](https://tiktok.com/@dannion_)

---

Built with ❤️ by **Dannion Creative Hub**