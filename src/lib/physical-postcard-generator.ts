import QRCode from 'qrcode';

/**
 * Physical Sound Postcard Generator (88x166mm folded format & A4 Die-Cut Print Sheets)
 *
 * Dimensions from physical template (in mm):
 * - Left panel: 88.5 mm
 * - Left spine (fold): 6 mm
 * - Center panel: 88 mm (with top & bottom flaps: 5 mm spine + 15 mm trapezoid flap)
 * - Right spine (fold): 5 mm
 * - Right panel: 87 mm
 * - Glue flap on right: 4 mm spine + 13 mm trapezoid flap
 * - Main panel height: 166 mm
 * - Total width: 88.5 + 6 + 88 + 5 + 87 + 4 + 13 = 291.5 mm (fits on A4 landscape 297 mm)
 * - Total height with flaps: 15 + 5 + 166 + 5 + 15 = 206 mm (fits on A4 landscape 210 mm)
 */

// 300 DPI scale: 3508 x 2480 px for 297 x 210 mm
export const A4_WIDTH_MM = 297;
export const A4_HEIGHT_MM = 210;
export const A4_WIDTH_PX = 3508;
export const A4_HEIGHT_PX = 2480;
export const PX_PER_MM = A4_WIDTH_PX / A4_WIDTH_MM; // ~11.8114478 px/mm

// Single panel high-res dimensions (88 x 166 mm at 300 DPI)
export const PANEL_WIDTH_PX = Math.round(88 * PX_PER_MM);   // 1039 px
export const PANEL_HEIGHT_PX = Math.round(166 * PX_PER_MM); // 1961 px

export function mmToPx(mm: number): number {
  return Math.round(mm * PX_PER_MM);
}

export function isLightHex(hex: string): boolean {
  const h = (hex || '#F3C68F').replace('#', '');
  if (h.length < 6) return true;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.5;
}

export function splitMessageToParagraphs(message: string): string[] {
  if (!message) return [];
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

function splitTo2Lines(text: string): string[] {
  const words = text.trim().split(/\s+/);
  if (words.length <= 1) return [text.trim()];
  const mid = Math.ceil(words.length / 2);
  return [
    words.slice(0, mid).join(' '),
    words.slice(mid).join(' ')
  ].filter(l => l.length > 0);
}

async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (!url.startsWith('blob:') && !url.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}

/**
 * 1. Render Front Cover Panel (88 x 166 mm -> 1039 x 1961 px)
 */
export async function composePhysicalFrontPanel(opts: {
  imageUrl: string;
  caption: string;
  useFrame?: boolean;
  mode?: 'photo' | 'ai-generation';
  widthPx?: number;
  heightPx?: number;
}): Promise<HTMLCanvasElement> {
  const W = opts.widthPx || PANEL_WIDTH_PX;
  const H = opts.heightPx || PANEL_HEIGHT_PX;
  const useFrame = !!opts.useFrame;
  const mode = opts.mode || 'ai-generation';

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, W, H);

  if (opts.imageUrl) {
    const img = await loadImage(opts.imageUrl);
    const frameLeft = Math.round(W * 0.052);
    const frameTop = Math.round(H * 0.035);
    const frameW = Math.round(W * 0.90);
    const frameH = Math.round(H * 0.935);

    const photoX = useFrame ? frameLeft : 0;
    const photoY = useFrame ? frameTop : 0;
    const photoW = useFrame ? frameW : W;
    const photoH = useFrame ? frameH : H;

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

    if (useFrame) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(photoX, photoY, photoW, photoH);
      ctx.clip();
    }

    ctx.drawImage(img, offX, offY, drawW, drawH);

    if (useFrame) {
      ctx.restore();
    }

    // Caption overlay for photo mode
    const text = (opts.caption || '').trim().toUpperCase();
    if (text && mode === 'photo') {
      const margin = useFrame ? frameLeft : Math.round(W * 0.05);
      const bottomMargin = Math.round(H * 0.045);
      const padX = Math.round(W * 0.04);
      const padY = Math.round(H * 0.02);

      const lines = splitTo2Lines(text);
      const fontSize = Math.round(W * 0.055);
      const lineHeight = Math.round(fontSize * 1.18);
      ctx.font = `bold ${fontSize}px Inter, system-ui, -apple-system, sans-serif`;

      const textHeight = lines.length * lineHeight;
      const rectW = useFrame ? frameW : (W - margin * 2);
      const rectH = textHeight + padY * 2;
      const rectX = margin;
      const rectY = (useFrame ? frameTop + frameH : H) - bottomMargin - rectH;

      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(rectX, rectY, rectW, rectH);

      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const centerX = rectX + rectW / 2;
      let y = rectY + padY + lineHeight / 2;
      for (const line of lines) {
        ctx.fillText(line, centerX, y);
        y += lineHeight;
      }
    }

    if (useFrame) {
      try {
        const frameImg = await loadImage('/frames/elegant-frame.png');
        ctx.drawImage(frameImg, 0, 0, W, H);
      } catch (e) {
        console.warn('Frame image failed to load:', e);
      }
    }
  }

  return canvas;
}

/**
 * 2. Render Inside Left Panel (88.5 x 166 mm): Matching solid background + musical decoration
 */
export async function composePhysicalInsideLeftPanel(opts: {
  color: string;
  widthPx?: number;
  heightPx?: number;
}): Promise<HTMLCanvasElement> {
  const W = opts.widthPx || PANEL_WIDTH_PX;
  const H = opts.heightPx || PANEL_HEIGHT_PX;
  const bgColor = opts.color || '#E8B878';
  const isLight = isLightHex(bgColor);

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // Background fill
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, W, H);

  // Soft warm radial glow in the center
  const centerX = W * 0.5;
  const centerY = H * 0.5;
  const glow = ctx.createRadialGradient(centerX, centerY, W * 0.05, centerX, centerY, W * 0.48);
  if (isLight) {
    glow.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
    glow.addColorStop(0.6, 'rgba(255, 255, 255, 0.18)');
    glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
  } else {
    glow.addColorStop(0, 'rgba(255, 230, 180, 0.32)');
    glow.addColorStop(0.6, 'rgba(255, 230, 180, 0.10)');
    glow.addColorStop(1, 'rgba(255, 230, 180, 0)');
  }
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  const strokeColor = isLight ? 'rgba(120, 75, 30, 0.35)' : 'rgba(255, 240, 210, 0.45)';
  const accentColor = isLight ? 'rgba(90, 50, 15, 0.65)' : 'rgba(255, 245, 225, 0.8)';

  // Draw flowing musical staff curves (like on the video)
  ctx.save();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = Math.max(2, Math.round(W * 0.0025));

  for (let i = -2; i <= 2; i++) {
    const offset = i * (W * 0.022);
    ctx.beginPath();
    ctx.moveTo(W * 0.18 + offset, H * 0.85);
    ctx.bezierCurveTo(
      W * 0.88 + offset, H * 0.65,
      W * 0.12 + offset, H * 0.35,
      W * 0.78 + offset, H * 0.14
    );
    ctx.stroke();
  }

  // Draw decorative sparkles and musical notes along the swirl
  const notes = [
    { x: 0.34, y: 0.24, symbol: '♪', size: 0.065, rot: -0.2 },
    { x: 0.68, y: 0.20, symbol: '♫', size: 0.055, rot: 0.15 },
    { x: 0.25, y: 0.42, symbol: '♬', size: 0.05, rot: -0.1 },
    { x: 0.75, y: 0.48, symbol: '♪', size: 0.06, rot: 0.25 },
    { x: 0.32, y: 0.70, symbol: '♫', size: 0.055, rot: -0.15 },
    { x: 0.64, y: 0.76, symbol: '♪', size: 0.065, rot: 0.1 },
  ];

  ctx.fillStyle = accentColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (const n of notes) {
    ctx.save();
    ctx.translate(W * n.x, H * n.y);
    ctx.rotate(n.rot);
    ctx.font = `${Math.round(W * n.size)}px Georgia, serif`;
    ctx.fillText(n.symbol, 0, 0);
    ctx.restore();
  }

  // Draw central heart / treble emblem
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.fillStyle = accentColor;
  ctx.font = `${Math.round(W * 0.16)}px Georgia, serif`;
  ctx.fillText('𝄞', 0, 0);
  ctx.restore();

  // Subtle decorative dots (bokeh)
  const dots = [
    { x: 0.48, y: 0.18, r: 0.008 },
    { x: 0.56, y: 0.30, r: 0.012 },
    { x: 0.40, y: 0.36, r: 0.007 },
    { x: 0.62, y: 0.58, r: 0.010 },
    { x: 0.38, y: 0.62, r: 0.009 },
    { x: 0.50, y: 0.80, r: 0.011 },
  ];
  ctx.fillStyle = isLight ? 'rgba(255, 255, 255, 0.65)' : 'rgba(255, 240, 200, 0.55)';
  for (const d of dots) {
    ctx.beginPath();
    ctx.arc(W * d.x, H * d.y, W * d.r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
  return canvas;
}

/**
 * 3. Render Inside Right Panel (87 x 166 mm): Matching solid background + Personal Message centered
 */
export async function composePhysicalInsideRightPanel(opts: {
  color: string;
  message: string;
  widthPx?: number;
  heightPx?: number;
}): Promise<HTMLCanvasElement> {
  const W = opts.widthPx || PANEL_WIDTH_PX;
  const H = opts.heightPx || PANEL_HEIGHT_PX;
  const bgColor = opts.color || '#E8B878';
  const isLight = isLightHex(bgColor);

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, W, H);

  const textColor = isLight ? '#181818' : '#FFFFFF';
  const paragraphs = splitMessageToParagraphs((opts.message || '').trim());

  const maxTextWidth = Math.round(W * 0.74);
  const initialFont = Math.round(W * 0.044); // ~46px at 1039w
  const minFont = Math.round(W * 0.028);
  const paragraphGap = Math.round(H * 0.024);

  try {
    await document.fonts.load(`bold ${initialFont}px "Bebas Neue Cyrillic"`);
  } catch {
    // Fallback
  }

  const setFont = (size: number) => {
    ctx.font = `bold ${size}px "Bebas Neue Cyrillic", "Bebas Neue", Inter, sans-serif`;
  };

  const wrapParagraph = (text: string, fontSize: number): string[] => {
    setFont(fontSize);
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let cur = '';
    for (const w of words) {
      const test = cur ? `${cur} ${w}` : w;
      if (ctx.measureText(test).width <= maxTextWidth) {
        cur = test;
      } else {
        if (cur) lines.push(cur);
        cur = w;
      }
    }
    if (cur) lines.push(cur);
    return lines;
  };

  const availableHeight = Math.round(H * 0.72);
  let fontSize = initialFont;
  let allParagraphLines: string[][] = [];
  let lineHeight = 0;

  while (fontSize >= minFont) {
    lineHeight = Math.round(fontSize * 1.35);
    allParagraphLines = paragraphs.map(p => wrapParagraph(p.toUpperCase(), fontSize));
    const totalLines = allParagraphLines.reduce((sum, l) => sum + l.length, 0);
    const totalH = totalLines * lineHeight + Math.max(0, allParagraphLines.length - 1) * paragraphGap;
    if (totalH <= availableHeight) break;
    fontSize -= 2;
  }

  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  setFont(fontSize);

  const totalLines = allParagraphLines.reduce((sum, l) => sum + l.length, 0);
  const totalH = totalLines * lineHeight + Math.max(0, allParagraphLines.length - 1) * paragraphGap;

  let y = (H - totalH) / 2 + lineHeight / 2;
  const centerX = W / 2;

  for (let pIdx = 0; pIdx < allParagraphLines.length; pIdx++) {
    for (const line of allParagraphLines[pIdx]) {
      ctx.fillText(line, centerX, y);
      y += lineHeight;
    }
    if (pIdx < allParagraphLines.length - 1) {
      y += paragraphGap;
    }
  }

  return canvas;
}

/**
 * 4. Render Back Cover Panel (88 x 166 mm): Matching background + Lystosyk branding & barcode at bottom
 */
export async function composePhysicalBackPanel(opts: {
  color: string;
  brandText?: string;
  widthPx?: number;
  heightPx?: number;
}): Promise<HTMLCanvasElement> {
  const W = opts.widthPx || PANEL_WIDTH_PX;
  const H = opts.heightPx || PANEL_HEIGHT_PX;
  const bgColor = opts.color || '#E8B878';
  const isLight = isLightHex(bgColor);

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, W, H);

  // Barcode box near the bottom (like on the video)
  const barcodeW = Math.round(W * 0.28);
  const barcodeH = Math.round(H * 0.055);
  const barcodeX = Math.round((W - barcodeW) / 2);
  const barcodeY = Math.round(H * 0.80);

  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(barcodeX, barcodeY, barcodeW, barcodeH, Math.round(W * 0.008));
  ctx.fill();

  // Draw crisp decorative barcode bars inside white box
  const padX = Math.round(barcodeW * 0.08);
  const padY = Math.round(barcodeH * 0.14);
  const innerW = barcodeW - padX * 2;
  const innerH = barcodeH - padY * 2 - Math.round(barcodeH * 0.18);
  const pattern = [2, 1, 3, 1, 1, 2, 4, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 2];
  const totalUnits = pattern.reduce((a, b) => a + b, 0);
  const unitW = innerW / totalUnits;

  ctx.fillStyle = '#111111';
  let curX = barcodeX + padX;
  for (let i = 0; i < pattern.length; i++) {
    const bw = pattern[i] * unitW;
    if (i % 2 === 0) {
      ctx.fillRect(curX, barcodeY + padY, Math.max(1, bw), innerH);
    }
    curX += bw;
  }

  // Numbers under barcode bars
  ctx.font = `600 ${Math.round(barcodeH * 0.18)}px monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText('4 820260 001249', barcodeX + barcodeW / 2, barcodeY + barcodeH - Math.round(barcodeH * 0.04));

  // Brand footer text below barcode (matching the pink/subtle brand styling on the video)
  const brandColor = isLight ? 'rgba(130, 50, 95, 0.75)' : 'rgba(255, 220, 240, 0.85)';
  ctx.fillStyle = brandColor;
  const fontSize1 = Math.round(W * 0.024);
  const fontSize2 = Math.round(W * 0.020);

  ctx.font = `bold ${fontSize1}px Inter, system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(opts.brandText || 'LYSTOSYK.COM', W / 2, barcodeY + barcodeH + Math.round(H * 0.018));

  ctx.font = `500 ${fontSize2}px Inter, system-ui, sans-serif`;
  ctx.fillText('МУЗИЧНА ЛИСТІВКА З ВЛАСНОЮ ПІСНЕЮ', W / 2, barcodeY + barcodeH + Math.round(H * 0.036));

  return canvas;
}

/**
 * Helper to convert a canvas to PNG data URL
 */
export function canvasToDataUrl(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL('image/png');
}

/**
 * 5. Compose A4 Die-Cut Print Sheets (Side 1: Outer Sheet & Side 2: Inner Sheet)
 *
 * Exact blueprint geometry (centered on 297 x 210 mm A4 Landscape):
 * Total template width = 88.5 + 6 + 88 + 5 + 87 + 4 + 13 = 291.5 mm
 * Left margin on A4 = (297 - 291.5) / 2 = 2.75 mm
 * Total template height (with top & bottom flaps) = 15 + 5 + 166 + 5 + 15 = 206 mm
 * Top margin on A4 = (210 - 206) / 2 = 2.0 mm
 * Main body Y range = [2 + 20, 2 + 20 + 166] = [22 mm, 188 mm]
 *
 * SIDE 2 (Inner side — matches the user's photo orientation):
 * - Left [88.5 mm]: Inside Left panel (colored background + musical decoration)
 * - Spine [6 mm]: Colored fold spine
 * - Center [88 mm] + Spine [5 mm] + Right [87 mm] + Glue flap [4 + 13 mm]:
 *   Inside of sound-module pocket (light guide marks + dimension labels)
 *
 * SIDE 1 (Outer side — horizontally mirrored so double-sided A4 printing registers 1:1):
 * - Left glue flap [13 + 4 mm]: White glue tab + 4mm colored spine
 * - Left-most panel [87 mm]: Inside Right panel (Personal Message — folds inward to face Inside Left!)
 * - Spine [5 mm]: Colored fold spine
 * - Center panel [88 mm] (with top & bottom 5+15mm flaps): Back Cover (branding + barcode)
 * - Spine [6 mm]: Colored fold spine
 * - Right-most panel [88.5 mm]: Front Cover (Illustration + Caption)
 */
export async function composePhysicalA4PrintSheets(opts: {
  frontImageUrl: string;
  caption: string;
  useFrame?: boolean;
  mode?: 'photo' | 'ai-generation';
  color: string;
  personalMessage: string;
}): Promise<{
  a4OuterSideBase64: string;
  a4InnerSideBase64: string;
  frontPreviewBase64: string;
  insideSpreadPreviewBase64: string;
  backPreviewBase64: string;
}> {
  const bgColor = opts.color || '#E8B878';

  // Render individual high-res panels first
  const w88_5 = mmToPx(88.5);
  const w88 = mmToPx(88);
  const w87 = mmToPx(87);
  const h166 = mmToPx(166);

  const [frontCanvas, insideLeftCanvas, insideRightCanvas, backCanvas] = await Promise.all([
    composePhysicalFrontPanel({
      imageUrl: opts.frontImageUrl,
      caption: opts.caption,
      useFrame: opts.useFrame,
      mode: opts.mode,
      widthPx: w88_5,
      heightPx: h166,
    }),
    composePhysicalInsideLeftPanel({
      color: bgColor,
      widthPx: w88_5,
      heightPx: h166,
    }),
    composePhysicalInsideRightPanel({
      color: bgColor,
      message: opts.personalMessage,
      widthPx: w87,
      heightPx: h166,
    }),
    composePhysicalBackPanel({
      color: bgColor,
      widthPx: w88,
      heightPx: h166,
    }),
  ]);

  // Also create a combined Inside Spread preview (Left + Right side-by-side) for OrderSuccess
  const spreadCanvas = document.createElement('canvas');
  spreadCanvas.width = w88_5 + w87;
  spreadCanvas.height = h166;
  const sCtx = spreadCanvas.getContext('2d')!;
  sCtx.drawImage(insideLeftCanvas, 0, 0);
  sCtx.drawImage(insideRightCanvas, w88_5, 0);
  // Center fold shadow line
  sCtx.strokeStyle = 'rgba(0,0,0,0.18)';
  sCtx.lineWidth = 4;
  sCtx.beginPath();
  sCtx.moveTo(w88_5, 0);
  sCtx.lineTo(w88_5, h166);
  sCtx.stroke();

  // =========================================================================
  // SHEET 1: OUTER SIDE (Лист 1 — Зовнішня сторона розгортки, 297x210 мм)
  // Mirrored horizontally relative to the photo so duplex printing aligns!
  // Left-to-right on Outer Sheet:
  // [Margin 2.75] [Flap 13] [Spine 4] [Panel 87 (Inside Right)] [Spine 5] [Panel 88 (Back Cover + Top/Bottom flaps)] [Spine 6] [Panel 88.5 (Front Cover)] [Margin 2.75]
  // =========================================================================
  const outerCanvas = document.createElement('canvas');
  outerCanvas.width = A4_WIDTH_PX;
  outerCanvas.height = A4_HEIGHT_PX;
  const oCtx = outerCanvas.getContext('2d')!;

  oCtx.fillStyle = '#FFFFFF';
  oCtx.fillRect(0, 0, A4_WIDTH_PX, A4_HEIGHT_PX);

  const marginX = mmToPx(2.75);
  const topFlapY = mmToPx(2.0);
  const topSpineY = mmToPx(2.0 + 15);
  const bodyY = mmToPx(2.0 + 15 + 5); // 22 mm
  const bodyBottomY = bodyY + h166;   // 188 mm
  const botSpineBottomY = bodyBottomY + mmToPx(5); // 193 mm
  const botFlapBottomY = botSpineBottomY + mmToPx(15); // 208 mm

  const xFlap13 = marginX;
  const xSpine4 = xFlap13 + mmToPx(13);
  const xPanel87 = xSpine4 + mmToPx(4);
  const xSpine5 = xPanel87 + w87;
  const xPanel88 = xSpine5 + mmToPx(5);
  const xSpine6 = xPanel88 + w88;
  const xPanel88_5 = xSpine6 + mmToPx(6);
  const xRightEdge = xPanel88_5 + w88_5;

  // Fill background color on all spines and flaps so folds have zero white edges
  oCtx.fillStyle = bgColor;
  // 4mm right-flap spine + 87mm panel + 5mm spine + 88mm panel + 6mm spine
  oCtx.fillRect(xSpine4, bodyY, xPanel88_5 - xSpine4, h166);
  // Top and bottom 5mm spines + part of 15mm flaps on center 88mm section
  oCtx.fillRect(xPanel88, topFlapY, w88, mmToPx(20));
  oCtx.fillRect(xPanel88, bodyBottomY, w88, mmToPx(20));
  // Slight 2mm bleed on glue flap
  oCtx.fillRect(xSpine4 - mmToPx(2), bodyY, mmToPx(2), h166);

  // Draw the 3 main panels on Outer Sheet
  oCtx.drawImage(insideRightCanvas, xPanel87, bodyY, w87, h166);
  oCtx.drawImage(backCanvas, xPanel88, bodyY, w88, h166);
  oCtx.drawImage(frontCanvas, xPanel88_5, bodyY, w88_5, h166);

  // Draw Die-Cut (solid) and Crease/Fold (dashed) lines for Outer Sheet
  drawDieCutAndFoldLines(oCtx, {
    orientation: 'outer',
    xStart: marginX,
    bodyY,
    bodyH: h166,
  });

  // =========================================================================
  // SHEET 2: INNER SIDE (Лист 2 — Внутрішня сторона розгортки, як на фото)
  // Left-to-right on Inner Sheet:
  // [Margin 2.75] [Panel 88.5 (Inside Left)] [Spine 6] [Panel 88 (Center pocket base)] [Spine 5] [Panel 87] [Spine 4] [Flap 13] [Margin 2.75]
  // =========================================================================
  const innerCanvas = document.createElement('canvas');
  innerCanvas.width = A4_WIDTH_PX;
  innerCanvas.height = A4_HEIGHT_PX;
  const iCtx = innerCanvas.getContext('2d')!;

  iCtx.fillStyle = '#FFFFFF';
  iCtx.fillRect(0, 0, A4_WIDTH_PX, A4_HEIGHT_PX);

  const ixPanel88_5 = marginX;
  const ixSpine6 = ixPanel88_5 + w88_5;
  const ixPanel88 = ixSpine6 + mmToPx(6);
  const ixSpine5 = ixPanel88 + w88;
  const ixPanel87 = ixSpine5 + mmToPx(5);
  const ixSpine4 = ixPanel87 + w87;

  // Fill 6mm spine and bleed into center panel with background color
  iCtx.fillStyle = bgColor;
  iCtx.fillRect(ixPanel88_5, bodyY, w88_5 + mmToPx(6) + mmToPx(3), h166);

  // Draw Inside Left panel on the 88.5mm section
  iCtx.drawImage(insideLeftCanvas, ixPanel88_5, bodyY, w88_5, h166);

  // Helpful subtle assembly annotations inside the pocket (will be hidden when glued)
  iCtx.save();
  iCtx.fillStyle = '#9CA3AF';
  iCtx.font = `${mmToPx(3.2)}px Inter, sans-serif`;
  iCtx.textAlign = 'center';
  iCtx.fillText('ВНУТРІШНЯ ЧАСТИНА КИШЕНІ ПІД ЗВУКОВИЙ МОДУЛЬ (88 мм)', ixPanel88 + w88 / 2, bodyY + h166 / 2 - mmToPx(4));
  iCtx.fillText('(Склеюється всередину з правою панеллю 87 мм)', ixPanel88 + w88 / 2, bodyY + h166 / 2 + mmToPx(4));
  iCtx.fillText('ЗВОРОТ ПРАВОЇ ПАНЕЛІ (87 мм — всередині кишені)', ixPanel87 + w87 / 2, bodyY + h166 / 2);
  iCtx.restore();

  // Draw Die-Cut (solid) and Crease/Fold (dashed) lines for Inner Sheet
  drawDieCutAndFoldLines(iCtx, {
    orientation: 'inner',
    xStart: marginX,
    bodyY,
    bodyH: h166,
  });

  // Suppress unused variable warnings
  void topSpineY;
  void botFlapBottomY;
  void xRightEdge;
  void ixSpine4;

  return {
    a4OuterSideBase64: canvasToDataUrl(outerCanvas),
    a4InnerSideBase64: canvasToDataUrl(innerCanvas),
    frontPreviewBase64: canvasToDataUrl(frontCanvas),
    insideSpreadPreviewBase64: canvasToDataUrl(spreadCanvas),
    backPreviewBase64: canvasToDataUrl(backCanvas),
  };
}

/**
 * Draws exact cut lines (solid) and fold/crease lines (dashed) according to the user's blueprint photo
 */
function drawDieCutAndFoldLines(
  ctx: CanvasRenderingContext2D,
  opts: {
    orientation: 'outer' | 'inner';
    xStart: number;
    bodyY: number;
    bodyH: number;
  }
) {
  const { orientation, xStart, bodyY, bodyH } = opts;
  const bodyBottom = bodyY + bodyH;
  const taper = mmToPx(4); // angled corner taper for glue flaps

  let x0: number, x1: number, x2: number, x3: number, x4: number, x5: number, x6: number, x7: number;
  let centerPanelLeft: number, centerPanelRight: number;
  let glueFlapOuterX: number, glueFlapSpineX: number;

  if (orientation === 'inner') {
    // Left to right: 88.5 | 6 | 88 | 5 | 87 | 4 | 13
    x0 = xStart;
    x1 = x0 + mmToPx(88.5);
    x2 = x1 + mmToPx(6);
    x3 = x2 + mmToPx(88);
    x4 = x3 + mmToPx(5);
    x5 = x4 + mmToPx(87);
    x6 = x5 + mmToPx(4);
    x7 = x6 + mmToPx(13);
    centerPanelLeft = x2;
    centerPanelRight = x3;
    glueFlapSpineX = x6;
    glueFlapOuterX = x7;
  } else {
    // Mirrored: 13 | 4 | 87 | 5 | 88 | 6 | 88.5
    x0 = xStart;
    x1 = x0 + mmToPx(13);
    x2 = x1 + mmToPx(4);
    x3 = x2 + mmToPx(87);
    x4 = x3 + mmToPx(5);
    x5 = x4 + mmToPx(88);
    x6 = x5 + mmToPx(6);
    x7 = x6 + mmToPx(88.5);
    centerPanelLeft = x4;
    centerPanelRight = x5;
    glueFlapOuterX = x0;
    glueFlapSpineX = x1;
  }

  const topSpineY = bodyY - mmToPx(5);
  const topFlapY = topSpineY - mmToPx(15);
  const botSpineY = bodyBottom + mmToPx(5);
  const botFlapY = botSpineY + mmToPx(15);

  ctx.save();

  // 1. FOLD / CREASE LINES (Dashed gray/magenta line)
  ctx.strokeStyle = 'rgba(80, 80, 80, 0.75)';
  ctx.lineWidth = 2;
  ctx.setLineDash([12, 10]);

  const verticalFolds = [x1, x2, x3, x4, x5, x6];
  for (const fx of verticalFolds) {
    ctx.beginPath();
    ctx.moveTo(fx, bodyY);
    ctx.lineTo(fx, bodyBottom);
    ctx.stroke();
  }

  // Horizontal fold lines on the center 88mm panel (top & bottom 5mm spines)
  for (const fy of [bodyY, topSpineY, bodyBottom, botSpineY]) {
    ctx.beginPath();
    ctx.moveTo(centerPanelLeft, fy);
    ctx.lineTo(centerPanelRight, fy);
    ctx.stroke();
  }

  // 2. OUTER CUT CONTOUR (Solid dark line)
  ctx.setLineDash([]);
  ctx.strokeStyle = '#111111';
  ctx.lineWidth = 3;

  // Top & Bottom edges of main panels (excluding center panel which extends into flaps)
  if (orientation === 'inner') {
    // Left part (88.5 + 6)
    ctx.beginPath();
    ctx.moveTo(x0, bodyBottom);
    ctx.lineTo(x0, bodyY);
    ctx.lineTo(x2, bodyY);
    ctx.moveTo(x0, bodyBottom);
    ctx.lineTo(x2, bodyBottom);
    ctx.stroke();

    // Right part (5 + 87 + 4) + 13mm tapered glue flap
    ctx.beginPath();
    ctx.moveTo(x3, bodyY);
    ctx.lineTo(x6, bodyY);
    ctx.lineTo(glueFlapOuterX, bodyY + taper);
    ctx.lineTo(glueFlapOuterX, bodyBottom - taper);
    ctx.lineTo(x6, bodyBottom);
    ctx.lineTo(x3, bodyBottom);
    ctx.stroke();
  } else {
    // Outer mirrored: Left is 13mm tapered glue flap + (4 + 87 + 5)
    ctx.beginPath();
    ctx.moveTo(x4, bodyY);
    ctx.lineTo(glueFlapSpineX, bodyY);
    ctx.lineTo(glueFlapOuterX, bodyY + taper);
    ctx.lineTo(glueFlapOuterX, bodyBottom - taper);
    ctx.lineTo(glueFlapSpineX, bodyBottom);
    ctx.lineTo(x4, bodyBottom);
    ctx.stroke();

    // Right part (6 + 88.5)
    ctx.beginPath();
    ctx.moveTo(x5, bodyY);
    ctx.lineTo(x7, bodyY);
    ctx.lineTo(x7, bodyBottom);
    ctx.lineTo(x5, bodyBottom);
    ctx.stroke();
  }

  // Top flap contour on center 88mm panel (5mm straight + 15mm trapezoid)
  ctx.beginPath();
  ctx.moveTo(centerPanelLeft, bodyY);
  ctx.lineTo(centerPanelLeft, topSpineY);
  ctx.lineTo(centerPanelLeft + taper, topFlapY);
  ctx.lineTo(centerPanelRight - taper, topFlapY);
  ctx.lineTo(centerPanelRight, topSpineY);
  ctx.lineTo(centerPanelRight, bodyY);
  ctx.stroke();

  // Bottom flap contour on center 88mm panel (5mm straight + 15mm trapezoid)
  ctx.beginPath();
  ctx.moveTo(centerPanelLeft, bodyBottom);
  ctx.lineTo(centerPanelLeft, botSpineY);
  ctx.lineTo(centerPanelLeft + taper, botFlapY);
  ctx.lineTo(centerPanelRight - taper, botFlapY);
  ctx.lineTo(centerPanelRight, botSpineY);
  ctx.lineTo(centerPanelRight, bodyBottom);
  ctx.stroke();

  // Small legend in top-left corner of A4 margin
  ctx.fillStyle = '#374151';
  ctx.font = `bold ${mmToPx(2.4)}px Inter, sans-serif`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  const sheetLabel = orientation === 'outer'
    ? 'ЛИСТ 1: ЗОВНІШНЯ СТОРОНА (A4 297×210 мм — Друк 100% без полів) | Суцільна лінія — різ, пунктир — згин'
    : 'ЛИСТ 2: ВНУТРІШНЯ СТОРОНА (A4 297×210 мм — Друк 100% без полів) | 88.5 / 6 / 88 / 5 / 87 / 4 / 13 мм × 166 мм';
  ctx.fillText(sheetLabel, xStart, mmToPx(0.8));

  ctx.restore();
}
