import html2canvas from 'html2canvas';

export async function captureElement(element: HTMLElement): Promise<string> {
  const canvas = await html2canvas(element, {
    scale: 2, // High quality
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    logging: false,
  });
  return canvas.toDataURL('image/png');
}

export async function captureDraftPageHtml(): Promise<string> {
  // Get the HTML of the entire draft page
  const html = document.documentElement.outerHTML;
  return html;
}

export async function preprocessImageToA6(imageUrl: string): Promise<string> {
  // A6 format: 105x148mm at 300 DPI = 1240x1748 pixels
  const A6_WIDTH = 1240;
  const A6_HEIGHT = 1748;
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = A6_WIDTH;
      canvas.height = A6_HEIGHT;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Canvas context unavailable'));
        return;
      }
      
      // Calculate dimensions to cover the A6 canvas (object-cover logic)
      const imgRatio = img.width / img.height;
      const canvasRatio = A6_WIDTH / A6_HEIGHT;
      
      let drawWidth, drawHeight, offsetX, offsetY;
      
      if (imgRatio > canvasRatio) {
        // Image is wider - fit by height
        drawHeight = A6_HEIGHT;
        drawWidth = img.width * (A6_HEIGHT / img.height);
        offsetX = -(drawWidth - A6_WIDTH) / 2;
        offsetY = 0;
      } else {
        // Image is taller - fit by width
        drawWidth = A6_WIDTH;
        drawHeight = img.height * (A6_WIDTH / img.width);
        offsetX = 0;
        offsetY = -(drawHeight - A6_HEIGHT) / 2;
      }
      
      // Fill background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, A6_WIDTH, A6_HEIGHT);
      
      // Draw image with object-cover logic
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      
      resolve(canvas.toDataURL('image/png'));
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageUrl;
  });
}
