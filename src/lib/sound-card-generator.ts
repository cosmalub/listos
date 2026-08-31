/**
 * Sound-card print compositor (ops only).
 *
 * Customer UI never uses this file. QR A6 generation stays in postcard-generator.ts.
 *
 * Four visual faces, each 88 × 166 mm @ 300 DPI:
 *   1. cover        — photo/AI art + caption/signature (closed front)
 *   2. inside-left  — same art, no caption (open spread, left)
 *   3. inside-right — background color + personal text, NO QR (open spread, right)
 *   4. outer-back   — same color + Lystosyk branding + slogan (closed back)
 *
 * Physical die (paper prototype, 1:1 on A4 landscape):
 *   Visible face ~88 × 166 mm. Unfolded ~286.5 × 206 mm (fits 297 × 210).
 *
 * Fold order on the 1-sided print sheet, L→R:
 *   cover-with-caption | inside-left | inside-right
 * Outer-back is the 4th exported PNG (closed-card back). It does not fit as a
 * fourth 88 mm panel on A4 at 1:1; ops can duplex it onto the reverse of the
 * folded packet. Crop/fold marks stay on the die.
 */

import mascotUrl from '@/assets/listosyk-mascot.png';
import { SOUND_CARD_SLOGAN } from '@/lib/product-format';

export const SOUND_DPI = 300;
export const MM_TO_PX = SOUND_DPI / 25.4;

function mm(value: number): number {
  return Math.round(value * MM_TO_PX);
}

/** Visible face of the folded card. 88 mm ≈ 1039 px, 166 mm ≈ 1961 px @ 300 DPI. */
export const SOUND_FACE = {
  widthMm: 88,
  heightMm: 166,
  widthPx: mm(88),
  heightPx: mm(166),
} as const;

/** A4 landscape @ 300 DPI */
export const A4_LANDSCAPE = {
  widthMm: 297,
  heightMm: 210,
  widthPx: 3508,
  heightPx: 2480,
} as const;

/**
 * Paper-prototype die, millimetres (approximate, as marked on the hand-cut mock).
 *
 * L→R:
 *   left 88.5 | spine 6 | center 88 | spine 5 | right 87 | flap 4+8
 * Center also has 5+15 mm flaps on top and bottom (speaker-module pocket).
 */
export const SOUND_DIE_MM = {
  leftPanel: 88.5,
  leftSpine: 6,
  centerPanel: 88,
  rightSpine: 5,
  rightPanel: 87,
  flapInner: 4,
  flapOuter: 8,
  centerFlapInner: 5,
  centerFlapOuter: 15,
  faceHeight: 166,
} as const;

export const SOUND_DIE = {
  leftPanel: mm(SOUND_DIE_MM.leftPanel),
  leftSpine: mm(SOUND_DIE_MM.leftSpine),
  centerPanel: mm(SOUND_DIE_MM.centerPanel),
  rightSpine: mm(SOUND_DIE_MM.rightSpine),
  rightPanel: mm(SOUND_DIE_MM.rightPanel),
  flapInner: mm(SOUND_DIE_MM.flapInner),
  flapOuter: mm(SOUND_DIE_MM.flapOuter),
  centerFlapInner: mm(SOUND_DIE_MM.centerFlapInner),
  centerFlapOuter: mm(SOUND_DIE_MM.centerFlapOuter),
  faceHeight: mm(SOUND_DIE_MM.faceHeight),
} as const;

export const SOUND_DIE_SIZE = {
  widthPx:
    SOUND_DIE.leftPanel +
    SOUND_DIE.leftSpine +
    SOUND_DIE.centerPanel +
    SOUND_DIE.rightSpine +
    SOUND_DIE.rightPanel +
    SOUND_DIE.flapInner +
    SOUND_DIE.flapOuter,
  heightPx:
    SOUND_DIE.centerFlapOuter +
    SOUND_DIE.centerFlapInner +
    SOUND_DIE.faceHeight +
    SOUND_DIE.centerFlapInner +
    SOUND_DIE.centerFlapOuter,
} as const;

export type SoundCardFaceId = 'cover' | 'insideLeft' | 'insideRight' | 'outerBack';

export interface SoundCardFaceInputs {
  imageUrl: string;
  caption: string;
  useFrame?: boolean;
  mode?: 'photo' | 'ai-generation';
  color: string;
  personalMessage: string;
}

export interface SoundCardPrintPackage {
  cover: string;
  insideLeft: string;
  insideRight: string;
  outerBack: string;
  printSheet: string;
}

function isLightColor(color: string): boolean {
  const hex = color.replace('#', '');
  if (hex.length < 6) return true;
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5;
}

function splitMessageToParagraphs(message: string): string[] {
  if (message.includes('\n\n')) {
    return message.split('\n\n').map((p) => p.trim()).filter((p) => p.length > 0);
  }
  const sentences = message.split(/(?<=[.!?])\s+/);
  if (sentences.length >= 2) {
    const firstParagraph = sentences.slice(0, 2).join(' ');
    const secondParagraph = sentences.slice(2).join(' ');
    if (secondParagraph.length > 0) return [firstParagraph, secondParagraph];
  }
  return [message];
}

function splitTo2Lines(text: string): string[] {
  const words = text.trim().split(/\s+/);
  if (words.length <= 1) return [text.trim()];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')].filter((l) => l.length > 0);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (!src.startsWith('blob:') && !src.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src.slice(0, 80)}`));
    img.src = src;
  });
}

function drawObjectCover(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  imgW: number,
  imgH: number,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const imgRatio = imgW / imgH;
  const boxRatio = w / h;
  let drawW: number, drawH: number, offX: number, offY: number;
  if (imgRatio > boxRatio) {
    drawH = h;
    drawW = imgW * (h / imgH);
    offX = x - (drawW - w) / 2;
    offY = y;
  } else {
    drawW = w;
    drawH = imgH * (w / imgW);
    offX = x;
    offY = y - (drawH - h) / 2;
  }
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.drawImage(img, offX, offY, drawW, drawH);
  ctx.restore();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number,
  initialFont: number,
  minFont: number
): { lines: string[]; fontSize: number; lineHeight: number } {
  const setFont = (size: number) => {
    ctx.font = `bold ${size}px Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;
  };
  let fontSize = initialFont;
  let lines: string[] = [];
  let lineHeight = 0;
  const words = text.split(/\s+/);

  while (fontSize >= minFont) {
    setFont(fontSize);
    const lh = Math.round(fontSize * 1.15);
    const tmp: string[] = [];
    let current = '';
    for (const w of words) {
      const test = current ? `${current} ${w}` : w;
      if (ctx.measureText(test).width <= maxWidth) {
        current = test;
      } else {
        if (current) tmp.push(current);
        current = w;
      }
    }
    if (current) tmp.push(current);
    if (tmp.length <= maxLines) {
      lines = tmp;
      lineHeight = lh;
      break;
    }
    fontSize -= 2;
  }

  if (lines.length === 0) {
    setFont(minFont);
    lineHeight = Math.round(minFont * 1.15);
    lines = [text];
    fontSize = minFont;
  }
  return { lines, fontSize, lineHeight };
}

async function composeArtFace(
  imageUrl: string,
  caption: string,
  useFrame: boolean,
  mode: 'photo' | 'ai-generation',
  includeCaption: boolean
): Promise<string> {
  const W = SOUND_FACE.widthPx;
  const H = SOUND_FACE.heightPx;
  const MARGIN = Math.round(50 * (W / 1240));
  const BOTTOM_MARGIN = Math.round(75 * (H / 1748));
  const PAD_X = Math.round(50 * (W / 1240));
  const PAD_Y = Math.round(37 * (H / 1748));
  const FRAME_LEFT = Math.round(W * 0.052);
  const FRAME_TOP = Math.round(H * 0.035);
  const FRAME_WIDTH = Math.round(W * 0.9);
  const FRAME_HEIGHT = Math.round(H * 0.935);

  const img = await loadImage(imageUrl);
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context unavailable');

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, W, H);

  const photoX = useFrame ? FRAME_LEFT : 0;
  const photoY = useFrame ? FRAME_TOP : 0;
  const photoW = useFrame ? FRAME_WIDTH : W;
  const photoH = useFrame ? FRAME_HEIGHT : H;
  drawObjectCover(ctx, img, img.width, img.height, photoX, photoY, photoW, photoH);

  const text = (caption || '').trim().toUpperCase();
  if (includeCaption && text && mode === 'photo') {
    const captionMargin = useFrame ? FRAME_LEFT : MARGIN;
    const maxTextWidth = useFrame ? FRAME_WIDTH - PAD_X * 2 : W - MARGIN * 2 - PAD_X * 2;
    let lines: string[];
    let fontSize: number;
    let lineHeight: number;
    const scale = W / 1240;

    if (useFrame) {
      lines = splitTo2Lines(text);
      fontSize = Math.round(72 * scale);
      lineHeight = Math.round(fontSize * 1.15);
      ctx.font = `bold ${fontSize}px Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;
    } else {
      const wrapped = wrapText(ctx, text, maxTextWidth, 2, Math.round(85 * scale), Math.round(45 * scale));
      lines = wrapped.lines;
      fontSize = wrapped.fontSize;
      lineHeight = wrapped.lineHeight;
    }

    const textHeight = lines.length * lineHeight;
    const rectW = useFrame ? maxTextWidth + PAD_X * 2 : W - MARGIN * 2;
    const rectH = textHeight + PAD_Y * 2;
    const rectX = captionMargin;
    const rectY = (useFrame ? FRAME_TOP + FRAME_HEIGHT : H) - BOTTOM_MARGIN - rectH;

    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(rectX, rectY, rectW, rectH);
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${fontSize}px Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;
    const centerX = rectX + rectW / 2;
    let y = rectY + PAD_Y + lineHeight / 2;
    for (const line of lines) {
      ctx.fillText(line, centerX, y);
      y += lineHeight;
    }
  }

  if (useFrame) {
    try {
      const frameImg = await loadImage('/frames/elegant-frame.png');
      ctx.drawImage(frameImg, 0, 0, W, H);
    } catch (err) {
      console.warn('Sound card: frame overlay skipped', err);
    }
  }

  return canvas.toDataURL('image/png');
}

export async function composeSoundCover(opts: SoundCardFaceInputs): Promise<string> {
  return composeArtFace(
    opts.imageUrl,
    opts.caption,
    opts.useFrame ?? false,
    opts.mode ?? 'photo',
    true
  );
}

export async function composeSoundInsideLeft(opts: SoundCardFaceInputs): Promise<string> {
  return composeArtFace(
    opts.imageUrl,
    opts.caption,
    opts.useFrame ?? false,
    opts.mode ?? 'photo',
    false
  );
}

export async function composeSoundInsideRight(opts: SoundCardFaceInputs): Promise<string> {
  const W = SOUND_FACE.widthPx;
  const H = SOUND_FACE.heightPx;
  const color = opts.color || '#FFFFFF';
  const message = (opts.personalMessage || '').trim();

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context unavailable');

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, W, H);

  const textColor = isLightColor(color) ? '#111111' : '#FFFFFF';
  const paragraphs = splitMessageToParagraphs(message);
  const PAD = Math.round(W * 0.1);
  const TEXT_MAX_WIDTH = W - PAD * 2;
  const PREVIEW_LINE_H = 1.375;
  const PARAGRAPH_GAP = Math.round(H * 0.035);
  const FONT_SIZE = Math.round(W * 0.07);
  const MIN_FONT = Math.round(W * 0.045);

  const setFont = (size: number) => {
    ctx.font = `bold ${size}px "Bebas Neue Cyrillic", "Bebas Neue", sans-serif`;
  };

  try {
    await document.fonts.load(`bold ${FONT_SIZE}px "Bebas Neue Cyrillic"`);
  } catch {
    /* fallback font metrics are fine */
  }

  function wrapParagraph(text: string, fontSize: number): string[] {
    setFont(fontSize);
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let cur = '';
    for (const w of words) {
      const test = cur ? `${cur} ${w}` : w;
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

  let fontSize = FONT_SIZE;
  let allParagraphLines: string[][] = [];
  let lineHeight = 0;
  const availableHeight = H - PAD * 2;

  while (fontSize >= MIN_FONT) {
    lineHeight = Math.round(fontSize * PREVIEW_LINE_H);
    allParagraphLines = paragraphs.map((p) => wrapParagraph(p.toUpperCase(), fontSize));
    const totalLines = allParagraphLines.reduce((sum, lines) => sum + lines.length, 0);
    const totalHeight = totalLines * lineHeight + (allParagraphLines.length - 1) * PARAGRAPH_GAP;
    if (totalHeight <= availableHeight) break;
    fontSize -= 2;
  }

  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  setFont(fontSize);

  const totalLines = allParagraphLines.reduce((sum, lines) => sum + lines.length, 0);
  const totalH = totalLines * lineHeight + (allParagraphLines.length - 1) * PARAGRAPH_GAP;
  let y = PAD + (availableHeight - totalH) / 2 + lineHeight / 2;
  const centerX = W / 2;

  for (let pIdx = 0; pIdx < allParagraphLines.length; pIdx++) {
    for (const line of allParagraphLines[pIdx]) {
      ctx.fillText(line, centerX, y);
      y += lineHeight;
    }
    if (pIdx < allParagraphLines.length - 1) y += PARAGRAPH_GAP;
  }

  return canvas.toDataURL('image/png');
}

export async function composeSoundOuterBack(opts: SoundCardFaceInputs): Promise<string> {
  const W = SOUND_FACE.widthPx;
  const H = SOUND_FACE.heightPx;
  const color = opts.color || '#6A5ACD';

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context unavailable');

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, W, H);

  const cardW = Math.round(W * 0.78);
  const cardH = Math.round(H * 0.62);
  const cardX = Math.round((W - cardW) / 2);
  const cardY = Math.round((H - cardH) / 2);
  const radius = Math.round(W * 0.04);

  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, radius);
  ctx.fill();

  try {
    const mascot = await loadImage(mascotUrl);
    const mascotH = Math.round(cardH * 0.48);
    const mascotW = Math.round((mascot.width / mascot.height) * mascotH);
    const mascotX = cardX + Math.round((cardW - mascotW) / 2);
    const mascotY = cardY + Math.round(cardH * 0.08);
    ctx.drawImage(mascot, mascotX, mascotY, mascotW, mascotH);
  } catch (err) {
    console.warn('Sound card: mascot skipped', err);
  }

  const textColor = '#4A3FA0';
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  try {
    await document.fonts.load('800 64px "Baloo 2"');
  } catch {
    /* ignore */
  }

  const brandSize = Math.round(W * 0.11);
  ctx.font = `800 ${brandSize}px "Baloo 2", "Trebuchet MS", sans-serif`;
  ctx.fillText('Листосик', W / 2, cardY + cardH * 0.72);

  const sloganSize = Math.round(W * 0.042);
  ctx.font = `600 ${sloganSize}px "Baloo 2", "Trebuchet MS", sans-serif`;
  ctx.fillStyle = '#6A5ACD';
  const sloganY = cardY + cardH * 0.86;
  wrapCentered(ctx, SOUND_CARD_SLOGAN, W / 2, sloganY, cardW * 0.86, sloganSize);
  return canvas.toDataURL('image/png');
}

function wrapCentered(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  fontSize: number
) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const w of words) {
    const test = current ? `${current} ${w}` : w;
    if (ctx.measureText(test).width <= maxWidth) {
      current = test;
    } else {
      if (current) lines.push(current);
      current = w;
    }
  }
  if (current) lines.push(current);
  const lh = Math.round(fontSize * 1.25);
  const startY = y - ((lines.length - 1) * lh) / 2;
  lines.forEach((line, i) => ctx.fillText(line, x, startY + i * lh));
}

/**
 * A4 landscape 300 DPI print sheet for staff (never shown to customers).
 *
 * 1:1 paper-prototype die, L→R:
 *   cover-with-caption | inside-left | inside-right | glue-flap (outer-back wrap)
 * Outer-back is also a separate 88×166 mm PNG (4th face) for duplex / reprint.
 */
export async function composeSoundCardPrintSheet(faces: {
  cover: string;
  insideLeft: string;
  insideRight: string;
  outerBack: string;
}): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = A4_LANDSCAPE.widthPx;
  canvas.height = A4_LANDSCAPE.heightPx;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context unavailable');

  ctx.fillStyle = '#F7F5FB';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const originX = Math.round((A4_LANDSCAPE.widthPx - SOUND_DIE_SIZE.widthPx) / 2);
  const originY = Math.round((A4_LANDSCAPE.heightPx - SOUND_DIE_SIZE.heightPx) / 2);

  const faceTop = originY + SOUND_DIE.centerFlapOuter + SOUND_DIE.centerFlapInner;
  const leftX = originX;
  const centerX = originX + SOUND_DIE.leftPanel + SOUND_DIE.leftSpine;
  const rightX = centerX + SOUND_DIE.centerPanel + SOUND_DIE.rightSpine;
  const flapX = rightX + SOUND_DIE.rightPanel;

  const [coverImg, insideLeftImg, insideRightImg, outerBackImg] = await Promise.all([
    loadImage(faces.cover),
    loadImage(faces.insideLeft),
    loadImage(faces.insideRight),
    loadImage(faces.outerBack),
  ]);

  ctx.fillStyle = '#EDEAF7';
  ctx.fillRect(originX, originY, SOUND_DIE_SIZE.widthPx, SOUND_DIE_SIZE.heightPx);

  const drawFace = (img: HTMLImageElement, x: number, panelW: number) => {
    drawObjectCover(ctx, img, img.width, img.height, x, faceTop, panelW, SOUND_DIE.faceHeight);
  };

  drawFace(coverImg, leftX, SOUND_DIE.leftPanel);
  drawFace(insideLeftImg, centerX, SOUND_DIE.centerPanel);
  drawFace(insideRightImg, rightX, SOUND_DIE.rightPanel);

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(flapX, faceTop, SOUND_DIE.flapInner + SOUND_DIE.flapOuter, SOUND_DIE.faceHeight);
  drawObjectCover(
    ctx,
    outerBackImg,
    outerBackImg.width,
    outerBackImg.height,
    flapX,
    faceTop,
    SOUND_DIE.flapInner + SOUND_DIE.flapOuter,
    SOUND_DIE.faceHeight
  );

  ctx.fillStyle = '#EDEAF7';
  ctx.fillRect(centerX, originY, SOUND_DIE.centerPanel, SOUND_DIE.centerFlapOuter + SOUND_DIE.centerFlapInner);
  ctx.fillRect(
    centerX,
    faceTop + SOUND_DIE.faceHeight,
    SOUND_DIE.centerPanel,
    SOUND_DIE.centerFlapInner + SOUND_DIE.centerFlapOuter
  );

  drawFoldCropGuides(ctx, {
    originX,
    originY,
    faceTop,
    leftX,
    centerX,
    rightX,
    flapX,
  });

  ctx.fillStyle = '#6B6580';
  ctx.font = '18px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const captionY = Math.min(originY + SOUND_DIE_SIZE.heightPx + 16, A4_LANDSCAPE.heightPx - 14);
  ctx.fillText(
    'Die L→R: cover | inside-left | inside-right | glue-flap  •  Face PNGs: cover, inside-left, inside-right, outer-back  •  88×166 mm @ 300 DPI',
    A4_LANDSCAPE.widthPx / 2,
    captionY
  );

  return canvas.toDataURL('image/png');
}

function drawFoldCropGuides(
  ctx: CanvasRenderingContext2D,
  pos: {
    originX: number;
    originY: number;
    faceTop: number;
    leftX: number;
    centerX: number;
    rightX: number;
    flapX: number;
  }
) {
  const { originX, originY, faceTop, leftX, centerX, rightX, flapX } = pos;
  const faceBottom = faceTop + SOUND_DIE.faceHeight;
  const dieRight = originX + SOUND_DIE_SIZE.widthPx;
  const dieBottom = originY + SOUND_DIE_SIZE.heightPx;
  const mark = 28;
  const guide = '#7B6BBF';

  ctx.save();
  ctx.strokeStyle = guide;
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 8]);

  const vFolds = [
    leftX + SOUND_DIE.leftPanel,
    centerX,
    centerX + SOUND_DIE.centerPanel,
    rightX,
    rightX + SOUND_DIE.rightPanel,
    flapX + SOUND_DIE.flapInner,
  ];
  for (const x of vFolds) {
    ctx.beginPath();
    ctx.moveTo(x, faceTop);
    ctx.lineTo(x, faceBottom);
    ctx.stroke();
  }

  const hFolds = [
    originY + SOUND_DIE.centerFlapOuter,
    faceTop,
    faceBottom,
    faceBottom + SOUND_DIE.centerFlapInner,
  ];
  for (const y of hFolds) {
    ctx.beginPath();
    ctx.moveTo(centerX, y);
    ctx.lineTo(centerX + SOUND_DIE.centerPanel, y);
    ctx.stroke();
  }

  ctx.setLineDash([]);
  ctx.strokeStyle = '#111111';
  ctx.lineWidth = 2;

  const corners: Array<[number, number, number, number]> = [
    [originX, originY, 1, 1],
    [dieRight, originY, -1, 1],
    [originX, dieBottom, 1, -1],
    [dieRight, dieBottom, -1, -1],
  ];
  for (const [x, y, dx, dy] of corners) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + dx * mark, y);
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + dy * mark);
    ctx.stroke();
  }

  drawScissors(ctx, centerX + SOUND_DIE.centerPanel / 2, originY - 6);
  drawScissors(ctx, centerX + SOUND_DIE.centerPanel / 2, dieBottom + 6);
  ctx.restore();
}

function drawScissors(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = '#111111';
  ctx.fillStyle = '#111111';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(-10, 0, 5, 0, Math.PI * 2);
  ctx.arc(10, 0, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-4, 0);
  ctx.lineTo(4, 0);
  ctx.moveTo(0, -8);
  ctx.lineTo(0, 8);
  ctx.stroke();
  ctx.restore();
}

export async function composeSoundCardPrintPackage(
  opts: SoundCardFaceInputs
): Promise<SoundCardPrintPackage> {
  const [cover, insideLeft, insideRight, outerBack] = await Promise.all([
    composeSoundCover(opts),
    composeSoundInsideLeft(opts),
    composeSoundInsideRight(opts),
    composeSoundOuterBack(opts),
  ]);

  const printSheet = await composeSoundCardPrintSheet({
    cover,
    insideLeft,
    insideRight,
    outerBack,
  });

  return { cover, insideLeft, insideRight, outerBack, printSheet };
}
