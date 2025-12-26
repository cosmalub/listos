import html2canvas from 'html2canvas';
import QRCode from 'qrcode';

export async function captureElement(element: HTMLElement, scale: number = 2): Promise<string> {
  const canvas = await html2canvas(element, {
    scale,
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

export async function composeFrontImageA6(
  imageUrl: string, 
  caption: string,
  useFrame: boolean = false,
  mode: 'photo' | 'ai-generation' = 'photo'
): Promise<string> {
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

  // Frame insets (matching CSS: left 5.2%, top 3.5%, width 90%, height 93.5%)
  const FRAME_LEFT = Math.round(A6_WIDTH * 0.052);
  const FRAME_TOP = Math.round(A6_HEIGHT * 0.035);
  const FRAME_WIDTH = Math.round(A6_WIDTH * 0.90);
  const FRAME_HEIGHT = Math.round(A6_HEIGHT * 0.935);

  const toUpper = (t: string) => (t || '').trim().toUpperCase();
  const setFont = (ctx: CanvasRenderingContext2D, size: number) => {
    ctx.font = `bold ${size}px Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;
  };

  // Split caption to exactly 2 lines (for frame mode)
  function splitTo2Lines(text: string): string[] {
    const words = text.trim().split(/\s+/);
    if (words.length <= 1) return [text.trim()];
    const mid = Math.ceil(words.length / 2);
    return [
      words.slice(0, mid).join(' '),
      words.slice(mid).join(' ')
    ].filter(l => l.length > 0);
  }

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

        // Determine photo area based on frame mode
        const photoX = useFrame ? FRAME_LEFT : 0;
        const photoY = useFrame ? FRAME_TOP : 0;
        const photoW = useFrame ? FRAME_WIDTH : A6_WIDTH;
        const photoH = useFrame ? FRAME_HEIGHT : A6_HEIGHT;

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

        // Clip to photo area if using frame
        if (useFrame) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(photoX, photoY, photoW, photoH);
          ctx.clip();
        }
        
        // Draw image
        ctx.drawImage(img, offX, offY, drawW, drawH);
        
        if (useFrame) {
          ctx.restore();
        }

        // Caption overlay - only for photo mode, AI-generated images already have text
        const text = toUpper(caption || '');
        if (text && mode === 'photo') {
          const captionMargin = useFrame ? FRAME_LEFT : MARGIN;
          const maxTextWidth = (useFrame ? FRAME_WIDTH : A6_WIDTH) - PAD_X * 2;
          
          // Use 2-line split for frame mode, regular wrap otherwise
          let lines: string[];
          let fontSize: number;
          let lineHeight: number;
          
          if (useFrame) {
            lines = splitTo2Lines(text);
            fontSize = 72; // Fixed size for frame mode
            lineHeight = Math.round(fontSize * LINE_HEIGHT_RATIO);
            setFont(ctx, fontSize);
          } else {
            const wrapped = wrapText(ctx, text, maxTextWidth, MAX_LINES);
            lines = wrapped.lines;
            fontSize = wrapped.fontSize;
            lineHeight = wrapped.lineHeight;
          }
          
          const textHeight = lines.length * lineHeight;
          const rectW = maxTextWidth + PAD_X * 2;
          const rectH = textHeight + PAD_Y * 2;
          const rectX = captionMargin;
          const rectY = (useFrame ? FRAME_TOP + FRAME_HEIGHT : A6_HEIGHT) - BOTTOM_MARGIN - rectH;

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

        // Draw frame overlay on top if useFrame
        if (useFrame) {
          const frameImg = new Image();
          frameImg.crossOrigin = 'anonymous';
          await new Promise<void>((res, rej) => {
            frameImg.onload = () => res();
            frameImg.onerror = () => rej(new Error('Failed to load frame'));
            frameImg.src = '/frames/elegant-frame.png';
          });
          ctx.drawImage(frameImg, 0, 0, A6_WIDTH, A6_HEIGHT);
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

// Split message into paragraphs - same logic as PostcardPreview
function splitMessageToParagraphs(message: string): string[] {
  if (message.includes('\n\n')) {
    return message.split('\n\n').map(p => p.trim()).filter(p => p.length > 0);
  }
  
  const sentences = message.split(/(?<=[.!?])\s+/);
  if (sentences.length >= 2) {
    const firstParagraph = sentences.slice(0, 2).join(' ');
    const secondParagraph = sentences.slice(2).join(' ');
    if (secondParagraph.length > 0) {
      return [firstParagraph, secondParagraph];
    }
  }
  
  return [message];
}

export async function composeBackImageA6(opts: { color: string; message: string; qrUrl: string }): Promise<string> {
  const { color, message, qrUrl } = opts;
  
  // A6 print dimensions
  const A6_WIDTH = 1240;
  const A6_HEIGHT = 1748;
  
  // Preview reference values (from PostcardPreview.tsx)
  // Container: max-w-xs = 320px, Text: max-w-[200px], p-6 = 24px, font-size: 14px
  // QR compact: w-24 h-24 = 96px, p-3 = 12px, pb-4 = 16px
  // Note: Reduced from 14 to 11 to match Canva output size
  const PREVIEW_W = 320;
  const PREVIEW_TEXT_MAX = 200;
  const PREVIEW_FONT = 11;
  const PREVIEW_LINE_H = 1.375; // leading-snug
  const PREVIEW_PARAGRAPH_GAP = 12; // mt-3 = 0.75rem = 12px
  const PREVIEW_QR_BOX = 96;
  const PREVIEW_QR_PAD = 12; // p-3
  const PREVIEW_QR_PB = 16; // pb-4
  const PREVIEW_PAD = 24; // p-6
  
  // Scale factor from preview to A6
  const SCALE = A6_WIDTH / PREVIEW_W; // ~3.875
  
  // Scaled values
  const FONT_SIZE = Math.round(PREVIEW_FONT * SCALE); // ~54px
  const MIN_FONT = Math.round(10 * SCALE); // ~39px for very long texts
  const TEXT_MAX_WIDTH = Math.round(PREVIEW_TEXT_MAX * SCALE); // ~775px
  const PARAGRAPH_GAP = Math.round(PREVIEW_PARAGRAPH_GAP * SCALE); // ~46px
  const PAD = Math.round(PREVIEW_PAD * SCALE); // ~93px
  const QR_BOX_SIZE = Math.round(PREVIEW_QR_BOX * SCALE); // ~372px
  const QR_PAD = Math.round(PREVIEW_QR_PAD * SCALE); // ~47px
  const QR_PB = Math.round(PREVIEW_QR_PB * SCALE); // ~62px
  const QR_SIZE = QR_BOX_SIZE - QR_PAD * 2; // ~278px

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

  // Split into paragraphs first (like in preview)
  const paragraphs = splitMessageToParagraphs((message || '').trim());
  
  function setFont(size: number) {
    ctx.font = `bold ${size}px "Bebas Neue Cyrillic", "Bebas Neue", sans-serif`;
  }

  // Ensure font is loaded before measuring
  try {
    await document.fonts.load(`bold ${FONT_SIZE}px "Bebas Neue Cyrillic"`);
  } catch (e) {
    console.warn('Font loading failed, using fallback');
  }

  // Wrap text for a single paragraph with max width matching preview
  function wrapParagraph(text: string, fontSize: number): string[] {
    setFont(fontSize);
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let cur = '';
    
    for (const w of words) {
      const test = cur ? cur + ' ' + w : w;
      if (ctx.measureText(test).width <= TEXT_MAX_WIDTH) {
        cur = test;
      } else {
        if (cur) lines.push(cur);
        cur = w;
      }
    }
    if (cur) lines.push(cur);
    
    return lines;
  }

  // QR code positioning (from bottom)
  const qrBoxY = A6_HEIGHT - PAD - QR_PB - QR_BOX_SIZE;
  
  // Calculate available height for text (from top padding to above QR)
  const textAreaTop = PAD;
  const textAreaBottom = qrBoxY - PAD;
  const availableHeightForText = textAreaBottom - textAreaTop;

  // Find the right font size that fits all paragraphs
  let fontSize = FONT_SIZE;
  let allParagraphLines: string[][] = [];
  let lineHeight = 0;

  while (fontSize >= MIN_FONT) {
    lineHeight = Math.round(fontSize * PREVIEW_LINE_H);
    allParagraphLines = paragraphs.map(p => wrapParagraph(p.toUpperCase(), fontSize));
    
    const totalLines = allParagraphLines.reduce((sum, lines) => sum + lines.length, 0);
    const totalHeight = totalLines * lineHeight + (allParagraphLines.length - 1) * PARAGRAPH_GAP;
    
    if (totalHeight <= availableHeightForText) {
      break;
    }
    fontSize -= 2;
  }

  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  setFont(fontSize);

  // Calculate total height of all text
  const totalLines = allParagraphLines.reduce((sum, lines) => sum + lines.length, 0);
  const totalH = totalLines * lineHeight + (allParagraphLines.length - 1) * PARAGRAPH_GAP;
  
  // Center text vertically in available space
  let y = textAreaTop + (availableHeightForText - totalH) / 2 + lineHeight / 2;
  const centerX = A6_WIDTH / 2;

  // Draw each paragraph with gap between them
  for (let pIdx = 0; pIdx < allParagraphLines.length; pIdx++) {
    const lines = allParagraphLines[pIdx];
    
    for (const line of lines) {
      ctx.fillText(line, centerX, y);
      y += lineHeight;
    }
    
    // Add paragraph gap after each paragraph except the last
    if (pIdx < allParagraphLines.length - 1) {
      y += PARAGRAPH_GAP;
    }
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

  // Draw white rounded box for QR centered horizontally
  const qrBoxX = (A6_WIDTH - QR_BOX_SIZE) / 2;
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(qrBoxX, qrBoxY, QR_BOX_SIZE, QR_BOX_SIZE, 12 * SCALE / 4);
  ctx.fill();

  // Draw QR code
  const qrImg = new Image();
  await new Promise<void>((resolve) => {
    qrImg.onload = () => resolve();
    qrImg.src = qrDataUrl;
  });
  ctx.drawImage(qrImg, qrBoxX + QR_PAD, qrBoxY + QR_PAD, QR_SIZE, QR_SIZE);

  return canvas.toDataURL('image/png');
}
