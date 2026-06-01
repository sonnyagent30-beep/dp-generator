export interface DesignConfig {
  id: string;
  name: string;
  description: string;
  image: string;
  // Photo placement zone within the template
  photoPosition: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  // Name text placement
  namePosition: {
    x: number;
    y: number;
    fontSize: number;
    color: string;
    fontFamily?: string;
  };
}

export const designs: DesignConfig[] = [
  {
    id: 'anniversary-gold',
    name: 'Anniversary Gold',
    description: 'Elegant gold frame for special occasions',
    image: '/designs/anniversary-gold.png',
    photoPosition: { x: 100, y: 100, width: 600, height: 500 },
    namePosition: { x: 400, y: 680, fontSize: 36, color: '#FFD700' },
  },
  {
    id: 'romantic-rose',
    name: 'Romantic Rose',
    description: 'Rose gold/pink theme with love motif',
    image: '/designs/romantic-rose.png',
    photoPosition: { x: 80, y: 120, width: 640, height: 480 },
    namePosition: { x: 400, y: 660, fontSize: 32, color: '#FF69B4' },
  },
  {
    id: 'classic-minimal',
    name: 'Classic Minimal',
    description: 'Clean black and gold elegant frame',
    image: '/designs/classic-minimal.png',
    photoPosition: { x: 120, y: 80, width: 560, height: 560 },
    namePosition: { x: 400, y: 720, fontSize: 28, color: '#FFFFFF' },
  },
  {
    id: 'celebration',
    name: 'Celebration',
    description: 'Colorful festive frame for milestones',
    image: '/designs/celebration.png',
    photoPosition: { x: 90, y: 90, width: 620, height: 520 },
    namePosition: { x: 400, y: 680, fontSize: 34, color: '#00FFFF' },
  },
];

export const getDesignById = (id: string): DesignConfig | undefined => {
  return designs.find((d) => d.id === id);
};