// Конфигурация стилей для дизайна листівок
export type StyleKey = 'gilby' | 'watercolor' | 'cartoon' | 'pixel' | 'cosmic';

export interface PostcardStyle {
  id: StyleKey;
  name: string;
  description: string;
  previewImage: string;
  colors: string[];
  systemPrompt: string;
}

export const POSTCARD_STYLES: Record<StyleKey, PostcardStyle> = {
  gilby: {
    id: 'gilby',
    name: 'Гілбі',
    description: 'Стилізований під Studio Ghibli з м\'якими кольорами та чіткими контурами',
    previewImage: '/api/placeholder/gilby-preview',
    colors: ['#8B7355', '#A8C090', '#F5E6B8', '#E8C4A0'],
    systemPrompt: `Create a stylized postcard illustration in Studio Ghibli style based on: {basePrompt}.

VISUAL CHARACTERISTICS:
- Use soft, muted color palette with pastels and earth tones
- Clean, clear outlines with moderate line weight
- Flat color areas with minimal gradients
- Simple, elegant shapes and forms
- Gentle lighting with soft shadows
- Nature-inspired elements (clouds, trees, flowers, landscapes)
- Whimsical and dreamy atmosphere
- Slightly stylized but recognizable forms

ART STYLE:
- 2D illustration style similar to Studio Ghibli films
- Hand-drawn aesthetic with digital polish
- Balanced composition with clear focal points
- Organic, flowing lines and shapes
- Subtle texture in backgrounds
- Warm, inviting mood
- Clean, professional finish suitable for greeting cards

The image should evoke feelings of warmth, nostalgia, and gentle beauty.`
  },

  watercolor: {
    id: 'watercolor',
    name: 'Акварель',
    description: 'Ніжні акварельні переходи з м\'якими кольорами',
    previewImage: '/api/placeholder/watercolor-preview',
    colors: ['#E8D5C4', '#C8A882', '#F4E4BC', '#D4B996'],
    systemPrompt: `Create a beautiful watercolor postcard illustration based on: {basePrompt}.

VISUAL CHARACTERISTICS:
- Soft, flowing watercolor technique with natural color bleeding
- Delicate brush strokes and organic textures
- Transparent color layers with subtle gradients
- Gentle color transitions and blending
- Light, airy composition with plenty of white space
- Pastel and muted color palette

WATERCOLOR TECHNIQUES:
- Wet-on-wet effects for backgrounds
- Controlled color bleeding and blooming
- Varied opacity and transparency
- Natural paper texture showing through
- Loose, expressive brushwork
- Organic shapes and soft edges

The result should feel delicate, dreamy, and artistic with the authentic look of traditional watercolor painting.`
  },

  cartoon: {
    id: 'cartoon',
    name: 'Мультяшний',
    description: 'Яскраві кольори та прості форми в мультяшному стилі',
    previewImage: '/api/placeholder/cartoon-preview',
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'],
    systemPrompt: `Create a vibrant cartoon-style postcard illustration based on: {basePrompt}.

VISUAL CHARACTERISTICS:
- Bold, bright colors with high saturation
- Simple, clean shapes and forms
- Thick, clear outlines
- Flat color areas without complex shading
- Playful and cheerful atmosphere
- Exaggerated proportions and features

CARTOON STYLE:
- 2D flat illustration style
- Vector-like appearance with crisp edges
- Minimal but effective shading
- Bold color contrasts
- Fun and approachable aesthetic
- Child-friendly visual language
- Clear, readable composition

The result should be joyful, energetic, and instantly appealing with a modern cartoon aesthetic.`
  },

  pixel: {
    id: 'pixel',
    name: 'Піксельний',
    description: 'Ретро 8-bit стиль з піксельною графікою',
    previewImage: '/api/placeholder/pixel-preview',
    colors: ['#2D5016', '#A4AC86', '#656D4A', '#414833'],
    systemPrompt: `Create a pixel art postcard illustration based on: {basePrompt}.

VISUAL CHARACTERISTICS:
- 8-bit/16-bit retro pixel art style
- Limited color palette (8-16 colors max)
- Visible pixel grid structure
- Blocky, geometric forms
- Low resolution aesthetic
- Nostalgic gaming feel

PIXEL ART TECHNIQUES:
- Sharp, crisp edges with no anti-aliasing
- Dithering for gradients and texture
- Tile-based composition
- Consistent pixel size throughout
- Limited color gradients
- Retro gaming color schemes
- Simple but effective details

The result should evoke nostalgia for classic video games with a charming, minimalist aesthetic.`
  },

  cosmic: {
    id: 'cosmic',
    name: 'Космічний',
    description: 'Градієнти, зірки та космічна атмосфера',
    previewImage: '/api/placeholder/cosmic-preview',
    colors: ['#1a1a2e', '#16213e', '#0f3460', '#533483'],
    systemPrompt: `Create a cosmic-themed postcard illustration based on: {basePrompt}.

VISUAL CHARACTERISTICS:
- Deep space color palette with purples, blues, and magentas
- Gradient backgrounds suggesting nebulae and cosmic phenomena
- Starfields and celestial bodies
- Glowing and luminous effects
- Ethereal, dreamy atmosphere
- Sense of vastness and wonder

COSMIC ELEMENTS:
- Rich gradients from dark to bright
- Particle effects and light rays
- Astronomical objects (stars, planets, galaxies)
- Aurora-like color flows
- Mysterious and mystical mood
- High contrast lighting
- Iridescent and holographic effects

The result should feel magical, infinite, and otherworldly with a sense of cosmic beauty and mystery.`
  }
};

export function getStylePrompt(style: StyleKey, basePrompt: string, caption?: string): string {
  const styleConfig = POSTCARD_STYLES[style];
  if (!styleConfig) {
    throw new Error(`Unknown style: ${style}`);
  }
  
  let enhancedPrompt = styleConfig.systemPrompt.replace('{basePrompt}', basePrompt);
  
  if (caption) {
    enhancedPrompt += `\n\nIncorporate this caption naturally into the design: "${caption}"`;
  }
  
  enhancedPrompt += '\n\nFormat: Vertical postcard format (portrait orientation), high quality, suitable for print.';
  
  return enhancedPrompt;
}

export function getStyleColors(style: StyleKey): string[] {
  return POSTCARD_STYLES[style]?.colors || [];
}

export function getAllStyles(): PostcardStyle[] {
  return Object.values(POSTCARD_STYLES);
}