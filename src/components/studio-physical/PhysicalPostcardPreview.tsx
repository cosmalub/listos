import React, { forwardRef } from 'react';
import { Heart, Loader2, Music } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StyleKey } from '@/lib/postcard-styles';
import { isLightHex, splitMessageToParagraphs } from '@/lib/physical-postcard-generator';

export interface PhysicalFrontDesignData {
  mode: 'photo' | 'ai-generation';
  style: StyleKey | null;
  imageUrl: string | null;
  caption: string;
  prompt: string;
  useFrame?: boolean;
}

export interface PhysicalBackDesignData {
  selectedColor: string;
  personalMessage: string;
}

export type PhysicalPreviewView = 'front' | 'inside' | 'back';

interface PhysicalPostcardPreviewProps {
  frontData: PhysicalFrontDesignData;
  backData: PhysicalBackDesignData;
  view?: PhysicalPreviewView;
  size?: 'large' | 'compact';
  isGeneratingMessage?: boolean;
}

function splitCaptionTo2Lines(caption: string): string[] {
  const words = caption.trim().split(/\s+/);
  if (words.length <= 1) return [caption.trim()];
  const midPoint = Math.ceil(words.length / 2);
  return [
    words.slice(0, midPoint).join(' '),
    words.slice(midPoint).join(' ')
  ].filter(line => line.length > 0);
}

export const PhysicalPostcardPreview = forwardRef<HTMLDivElement, PhysicalPostcardPreviewProps>(
  ({ frontData, backData, view = 'front', size = 'large', isGeneratingMessage = false }, ref) => {
    const bgColor = backData.selectedColor || '#E8B878';
    const isLight = isLightHex(bgColor);

    // 1. FRONT COVER (88 x 166 mm)
    const frontCover = (
      <div className="relative w-full h-full bg-white rounded-xl overflow-hidden shadow-lg ring-1 ring-black/10">
        {frontData.imageUrl ? (
          <>
            {frontData.mode === 'photo' && frontData.useFrame ? (
              <div className="relative w-full h-full bg-white overflow-hidden">
                <img
                  src={frontData.imageUrl}
                  alt="Postcard front"
                  className="absolute object-cover"
                  style={{
                    zIndex: 1,
                    left: '5.2%',
                    top: '3.5%',
                    width: '90%',
                    height: '93.5%'
                  }}
                />
                {frontData.caption && (
                  <div className="absolute bottom-[4.5%] left-[5.2%] right-[4.8%]" style={{ zIndex: 2 }}>
                    <div className="bg-black/60 backdrop-blur-sm py-2.5 px-3">
                      <div className={cn(
                        "text-white text-center font-bold uppercase leading-tight tracking-wide",
                        size === 'large' ? "text-sm sm:text-base" : "text-xs sm:text-sm"
                      )}>
                        {splitCaptionTo2Lines(frontData.caption).map((line, index) => (
                          <div key={index}>{line}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <img
                  src="/frames/elegant-frame.png?v=5"
                  alt="Frame"
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none"
                  style={{ zIndex: 3 }}
                />
              </div>
            ) : (
              <>
                <img
                  src={frontData.imageUrl}
                  alt="Postcard front"
                  className="w-full h-full object-cover"
                />
                {frontData.caption && frontData.mode === 'photo' && (
                  <div className="absolute bottom-6 left-3 right-3 z-20">
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg py-2.5 px-3">
                      <p className={cn(
                        "text-white text-center font-bold uppercase leading-snug",
                        size === 'large' ? "text-sm sm:text-base" : "text-xs sm:text-sm"
                      )}>
                        {frontData.caption}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground font-medium text-sm">Лицьова обкладинка</p>
              <p className="text-xs text-muted-foreground">88 × 166 мм</p>
            </div>
          </div>
        )}
      </div>
    );

    // 2. INSIDE LEFT PAGE (Matching color + Musical motif)
    const insideLeftPage = (
      <div
        className="relative w-full h-full overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: bgColor }}
      >
        {/* Warm radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isLight
              ? 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 68%)'
              : 'radial-gradient(circle at 50% 50%, rgba(255,230,180,0.35) 0%, rgba(255,230,180,0) 68%)'
          }}
        />

        {/* Decorative musical staff SVG */}
        <svg
          viewBox="0 0 200 380"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
          fill="none"
        >
          {[-12, -6, 0, 6, 12].map((offset, idx) => (
            <path
              key={idx}
              d={`M ${35 + offset} 330 C ${175 + offset} 250, ${25 + offset} 130, ${155 + offset} 50`}
              stroke={isLight ? 'rgba(120,75,30,0.4)' : 'rgba(255,240,210,0.5)'}
              strokeWidth="1.2"
            />
          ))}
        </svg>

        {/* Floating musical notes & central emblem */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-3">
          <span
            className="text-xl select-none opacity-80 -translate-x-8 -translate-y-6"
            style={{ color: isLight ? 'rgba(90,50,15,0.75)' : 'rgba(255,245,225,0.85)' }}
          >
            ♪
          </span>
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-inner"
            style={{
              backgroundColor: isLight ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.12)',
              color: isLight ? 'rgba(90,50,15,0.85)' : 'rgba(255,245,225,0.95)'
            }}
          >
            <Music className="w-8 h-8" />
          </div>
          <span
            className="text-xl select-none opacity-80 translate-x-8 translate-y-6"
            style={{ color: isLight ? 'rgba(90,50,15,0.75)' : 'rgba(255,245,225,0.85)' }}
          >
            ♫
          </span>
        </div>
      </div>
    );

    // 3. INSIDE RIGHT PAGE (Matching color + Personal Message)
    const insideRightPage = (
      <div
        className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6"
        style={{ backgroundColor: bgColor }}
      >
        {isGeneratingMessage ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className={cn(
              "h-6 w-6 animate-spin",
              isLight ? "text-gray-900/70" : "text-white/70"
            )} />
            <p className={cn(
              "text-xs text-center",
              isLight ? "text-gray-900/70" : "text-white/70"
            )}>
              Генеруємо привітання...
            </p>
          </div>
        ) : backData.personalMessage ? (
          <div className="text-center max-w-[190px]">
            {splitMessageToParagraphs(backData.personalMessage).map((paragraph, index) => (
              <p
                key={index}
                className={cn(
                  "leading-snug",
                  isLight ? "text-gray-900" : "text-white",
                  index > 0 && "mt-3"
                )}
                style={{
                  fontFamily: "'Bebas Neue Cyrillic', 'Bebas Neue', sans-serif",
                  fontSize: size === 'large' ? '13px' : '11px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <p className={cn(
            "text-xs sm:text-sm italic text-center",
            isLight ? "text-gray-900/70" : "text-white/70"
          )}>
            Ваше особисте привітання
          </p>
        )}
      </div>
    );

    // 4. BACK COVER (Matching color + Barcode & Branding)
    const backCover = (
      <div
        className="relative w-full h-full rounded-xl overflow-hidden shadow-lg ring-1 ring-black/10 flex flex-col items-center justify-end pb-7 px-4"
        style={{ backgroundColor: bgColor }}
      >
        {/* Barcode box */}
        <div className="bg-white rounded px-2.5 py-1.5 shadow-sm flex flex-col items-center mb-2">
          <div className="flex items-center gap-[1.5px] h-5">
            {[2, 1, 3, 1, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2].map((w, i) => (
              <div
                key={i}
                className="bg-black h-full"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
          <span className="text-[7px] font-mono text-black leading-none mt-0.5 tracking-wider">
            4 820260 001249
          </span>
        </div>

        {/* Lystosyk branding */}
        <div
          className="text-center leading-tight"
          style={{ color: isLight ? 'rgba(130,50,95,0.8)' : 'rgba(255,220,240,0.85)' }}
        >
          <p className="text-[9px] font-bold tracking-wider uppercase">LYSTOSYK.COM</p>
          <p className="text-[7px] font-medium uppercase opacity-90">Музична листівка з власною піснею</p>
        </div>
      </div>
    );

    if (view === 'inside') {
      // Open book spread: 2 pages side-by-side (each 88x166 -> combined 176x166)
      return (
        <div
          ref={ref}
          className="w-full max-w-lg mx-auto aspect-[176/166] rounded-xl overflow-hidden shadow-xl ring-1 ring-black/15 grid grid-cols-2 relative"
        >
          <div className="relative h-full border-r border-black/15">
            {insideLeftPage}
          </div>
          <div className="relative h-full">
            {insideRightPage}
          </div>
          {/* Center fold spine shadow */}
          <div
            className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-4"
            style={{
              background: 'linear-gradient(90deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.22) 50%, rgba(255,255,255,0.08) 100%)'
            }}
          />
        </div>
      );
    }

    return (
      <div ref={ref} className="w-full max-w-[230px] mx-auto aspect-[88/166]">
        {view === 'front' ? frontCover : backCover}
      </div>
    );
  }
);

PhysicalPostcardPreview.displayName = 'PhysicalPostcardPreview';
