import { DesignConfig } from './designs';

export interface CompositorOptions {
  userImageSrc: string; // base64 or URL
  templateImageSrc: string;
  design: DesignConfig;
  userName: string;
}

export async function compositeDP(options: CompositorOptions): Promise<string> {
  const { userImageSrc, templateImageSrc, design, userName } = options;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    // Load template image
    const templateImg = new Image();
    templateImg.crossOrigin = 'anonymous';

    templateImg.onload = () => {
      // Draw template first
      ctx.drawImage(templateImg, 0, 0, 800, 800);

      // Load user image
      const userImg = new Image();
      userImg.crossOrigin = 'anonymous';

      userImg.onload = () => {
        // Draw user photo in the designated position
        const { x, y, width, height } = design.photoPosition;
        
        // Create circular clipping for the photo area (optional - makes it look like a profile pic)
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, 20);
        ctx.clip();
        
        // Draw user image scaled to fit the photo area
        ctx.drawImage(userImg, x, y, width, height);
        ctx.restore();

        // Draw name text
        ctx.save();
        ctx.font = `bold ${design.namePosition.fontSize}px ${design.namePosition.fontFamily || 'Arial, sans-serif'}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Add text shadow for visibility
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        ctx.fillStyle = design.namePosition.color;
        ctx.fillText(userName.toUpperCase(), design.namePosition.x, design.namePosition.y);
        ctx.restore();

        // Export as PNG
        const dataUrl = canvas.toDataURL('image/png');
        resolve(dataUrl);
      };

      userImg.onerror = () => reject(new Error('Failed to load user image'));
      userImg.src = userImageSrc;
    };

    templateImg.onerror = () => reject(new Error('Failed to load template image'));
    templateImg.src = templateImageSrc;
  });
}