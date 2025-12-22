import html2canvas from 'html2canvas';
import QRCode from 'qrcode';

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

export async function composeFrontImageA6(imageUrl: string, caption: string, frameEnabled: boolean = false): Promise<string> {
  const A6_WIDTH = 1240;
  const A6_HEIGHT = 1748;
  const MARGIN = 50;
  const BOTTOM_MARGIN = 75;
  const PAD_X = 50;
  const PAD_Y = 37;
  const MAX_LINES = 2;
  const INITIAL_FONT = 85;
  const MIN_FONT = 45;
  const LINE_HEIGHT_RATIO = 1.15;

  const toUpper = (t: string) => (t || '').trim().toUpperCase();
  const setFont = (ctx: CanvasRenderingContext2D, size: number) => {
    ctx.font = `bold ${size}px Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;
  };

  function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number,
    maxLines: number
  ): { lines: string[]; fontSize: number; lineHeight: number } {
    let fontSize = INITIAL_FONT;
    let lines: string[] = [];
    let lineHeight = 0;
    const words = text.split(/\s+/);

    while (fontSize >= MIN_FONT) {
      setFont(ctx, fontSize);
      const lh = Math.round(fontSize * LINE_HEIGHT_RATIO);
      const tmpLines: string[] = [];
      let current = '';

      for (const w of words) {
        const test = current ? current + ' ' + w : w;
        if (ctx.measureText(test).width <= maxWidth) {
          current = test;
        } else {
          if (current) tmpLines.push(current);
          current = w;
        }
      }
      if (current) tmpLines.push(current);

      if (tmpLines.length <= maxLines) {
        lines = tmpLines;
        lineHeight = lh;
        break;
      }
      fontSize -= 2;
    }

    if (lines.length === 0) {
      setFont(ctx, MIN_FONT);
      lineHeight = Math.round(MIN_FONT * LINE_HEIGHT_RATIO);
      lines = [text];
    }

    const size = parseInt(ctx.font.match(/\d+/)?.[0] || '32', 10);
    return { lines, fontSize: size, lineHeight };
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    if (!imageUrl.startsWith('blob:')) {
      img.crossOrigin = 'anonymous';
    }

    img.onload = async () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = A6_WIDTH;
        canvas.height = A6_HEIGHT;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas context unavailable'));

        // Fill white background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, A6_WIDTH, A6_HEIGHT);

        // Calculate photo area (with or without white border)
        const BORDER_SIZE = frameEnabled ? 50 : 0; // White border when frame enabled
        const photoX = BORDER_SIZE;
        const photoY = BORDER_SIZE;
        const photoW = A6_WIDTH - BORDER_SIZE * 2;
        const photoH = A6_HEIGHT - BORDER_SIZE * 2;

        // object-cover drawing within photo area
        const imgRatio = img.width / img.height;
        const photoRatio = photoW / photoH;
        let drawW: number, drawH: number, offX: number, offY: number;
        if (imgRatio > photoRatio) {
          drawH = photoH;
          drawW = img.width * (photoH / img.height);
          offX = photoX - (drawW - photoW) / 2;
          offY = photoY;
        } else {
          drawW = photoW;
          drawH = img.height * (photoW / img.width);
          offX = photoX;
          offY = photoY - (drawH - photoH) / 2;
        }
        
        // Clip to photo area
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(photoX, photoY, photoW, photoH, frameEnabled ? 20 : 0);
        ctx.clip();
        ctx.drawImage(img, offX, offY, drawW, drawH);
        ctx.restore();

        // Draw frame overlay if enabled
        if (frameEnabled) {
          await new Promise<void>((resolveFrame) => {
            const frameImg = new Image();
            frameImg.crossOrigin = 'anonymous';
            frameImg.onload = () => {
              // Draw frame within the photo area
              ctx.drawImage(frameImg, photoX, photoY, photoW, photoH);
              resolveFrame();
            };
            frameImg.onerror = () => {
              console.warn('Failed to load frame image');
              resolveFrame();
            };
            frameImg.src = '/frames/elegant-frame.png';
          });
        }

        // Caption overlay
        const text = toUpper(caption || '');
        if (text) {
          const maxTextWidth = A6_WIDTH - (MARGIN + PAD_X) * 2;
          const { lines, fontSize, lineHeight } = wrapText(ctx, text, maxTextWidth, MAX_LINES);
          const textHeight = lines.length * lineHeight;

          const rectW = maxTextWidth + PAD_X * 2;
          const rectH = textHeight + PAD_Y * 2;
          const rectX = MARGIN;
          const rectY = A6_HEIGHT - BOTTOM_MARGIN - rectH;

          ctx.fillStyle = 'rgba(0,0,0,0.6)';
          ctx.fillRect(rectX, rectY, rectW, rectH);

          ctx.fillStyle = '#FFFFFF';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          setFont(ctx, fontSize);
          const centerX = rectX + rectW / 2;
          let y = rectY + PAD_Y + lineHeight / 2;

          for (const line of lines) {
            ctx.fillText(line, centerX, y);
            y += lineHeight;
          }
        }

        resolve(canvas.toDataURL('image/png'));
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageUrl;
  });
}

export async function composeBackImageA6(opts: { color: string; message: string; qrUrl: string }): Promise<string> {
  const { color, message, qrUrl } = opts;
  const A6_WIDTH = 1240;
  const A6_HEIGHT = 1748;
  const PAD = 100;
  const INITIAL = 64;
  const MIN = 32;
  const LINE_H = 1.25;

  const isLight = (hex: string) => {
    const h = hex.replace('#', '');
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return lum > 0.5;
  };

  const canvas = document.createElement('canvas');
  canvas.width = A6_WIDTH;
  canvas.height = A6_HEIGHT;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = color || '#FFFFFF';
  ctx.fillRect(0, 0, A6_WIDTH, A6_HEIGHT);

  const textColor = isLight(color || '#FFFFFF') ? '#111111' : '#FFFFFF';
  const maxWidth = A6_WIDTH - PAD * 2;

  const words = (message || '').trim().split(/\s+/);
  let fontSize = INITIAL;
  let lines: string[] = [];
  let lineHeight = 0;

  function setFont(size: number) {
    ctx.font = `500 ${size}px Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;
  }

  while (fontSize >= MIN) {
    setFont(fontSize);
    const lh = Math.round(fontSize * LINE_H);
    const tmp: string[] = [];
    let cur = '';
    for (const w of words) {
      const test = cur ? cur + ' ' + w : w;
      if (ctx.measureText(test).width <= maxWidth) {
        cur = test;
      } else {
        if (cur) tmp.push(cur);
        cur = w;
      }
    }
    if (cur) tmp.push(cur);

    if (tmp.length <= 12) {
      lines = tmp;
      lineHeight = lh;
      break;
    }
    fontSize -= 2;
  }

  // QR Code dimensions
  const QR_SIZE = 300;
  const QR_PADDING = 24;
  const QR_BOTTOM_MARGIN = 64;
  const qrBoxSize = QR_SIZE + QR_PADDING * 2;

  // Calculate available height for text (excluding QR code area)
  const availableHeightForText = A6_HEIGHT - QR_BOTTOM_MARGIN - qrBoxSize - 40; // 40 - spacing between text and QR

  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  setFont(fontSize);

  const totalH = lines.length * lineHeight;
  let y = (availableHeightForText - totalH) / 2 + lineHeight / 2;
  const centerX = A6_WIDTH / 2;
  for (const line of lines) {
    ctx.fillText(line, centerX, y);
    y += lineHeight;
  }

  // Generate QR code as data URL
  const qrDataUrl = await QRCode.toDataURL(qrUrl, {
    width: QR_SIZE,
    margin: 0,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  });

  // Draw white rounded box for QR
  const qrBoxX = (A6_WIDTH - qrBoxSize) / 2;
  const qrBoxY = A6_HEIGHT - QR_BOTTOM_MARGIN - qrBoxSize;
  ctx.fillStyle = '#FFFFFF';
  ctx.roundRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 12);
  ctx.fill();

  // Draw QR code
  const qrImg = new Image();
  await new Promise<void>((resolve) => {
    qrImg.onload = () => resolve();
    qrImg.src = qrDataUrl;
  });
  ctx.drawImage(qrImg, qrBoxX + QR_PADDING, qrBoxY + QR_PADDING, QR_SIZE, QR_SIZE);

  return canvas.toDataURL('image/png');
}
