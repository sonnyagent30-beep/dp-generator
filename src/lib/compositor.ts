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
        // Template already drawn. Now clip and draw user photo in the circular area
        const { x, y, width, height } = design.photoPosition;
        const centerX = x + width / 2;
        const centerY = y + height / 2;
        const radius = Math.min(width, height) / 2;

        ctx.save();
        // Create circular clip for the photo area
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.clip();

        // Draw user image - scale and center to fill the circle
        const imgAspect = userImg.width / userImg.height;
        const circleAspect = width / height;
        let drawX, drawY, drawW, drawH;
        if (imgAspect > circleAspect) {
          // Image is wider - fit by height
          drawH = height;
          drawW = userImg.width * (height / userImg.height);
          drawX = centerX - drawW / 2;
          drawY = y;
        } else {
          // Image is taller - fit by width
          drawW = width;
          drawH = userImg.height * (width / userImg.width);
          drawX = x;
          drawY = centerY - drawH / 2;
        }
        ctx.drawImage(userImg, drawX, drawY, drawW, drawH);
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
