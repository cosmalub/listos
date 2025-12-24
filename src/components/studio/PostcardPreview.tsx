import React from 'react';
import { QrCode, Heart, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StyleKey } from '@/lib/postcard-styles';
import QRCode from 'react-qr-code';

interface FrontDesignData {
  mode: 'photo' | 'ai-generation';
  style: StyleKey | null;
  imageUrl: string | null;
  caption: string;
  prompt: string;
  useFrame?: boolean;
}

interface BackDesignData {
  selectedColor: string;
  personalMessage: string;
}

interface PostcardPreviewProps {
  frontData: FrontDesignData;
  backData: BackDesignData;
  showFront?: boolean;
  size?: 'large' | 'compact';
  isGeneratingMessage?: boolean;
}

// Helper function to determine if color is light or dark
function isLightColor(color: string): boolean {
  // Remove # if present
  const hex = color.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return true if light (> 0.5)
  return luminance > 0.5;
}

// Split message into paragraphs (by double newline or after first sentence)
function splitMessageToParagraphs(message: string): string[] {
  // First try to split by double newline
  if (message.includes('\n\n')) {
    return message.split('\n\n').map(p => p.trim()).filter(p => p.length > 0);
  }
  
  // Otherwise split after first sentence (ends with . or ! or ?)
  const sentences = message.split(/(?<=[.!?])\s+/);
  if (sentences.length >= 2) {
    // First paragraph: first 1-2 sentences, rest in second
    const firstParagraph = sentences.slice(0, 2).join(' ');
    const secondParagraph = sentences.slice(2).join(' ');
    if (secondParagraph.length > 0) {
      return [firstParagraph, secondParagraph];
    }
  }
  
  return [message];
}

// Split caption into lines with max 2-3 words per line
function splitCaptionToLines(caption: string): string[] {
  const words = caption.trim().split(/\s+/);
  const lines: string[] = [];
  
  let i = 0;
  while (i < words.length) {
    // Take 2-3 words per line depending on word lengths
    const remaining = words.length - i;
    let wordsToTake = 2;
    
    // If we have 3-4 words left, split evenly
    if (remaining === 3) {
      wordsToTake = 2; // 2 + 1
    } else if (remaining === 4) {
      wordsToTake = 2; // 2 + 2
    } else if (remaining <= 2) {
      wordsToTake = remaining;
    } else {
      // Check if current words are short, can take 3
      const nextThreeWords = words.slice(i, i + 3).join(' ');
      wordsToTake = nextThreeWords.length <= 20 ? 3 : 2;
    }
    
    lines.push(words.slice(i, i + wordsToTake).join(' '));
    i += wordsToTake;
  }
  
  return lines;
}

export function PostcardPreview({ frontData, backData, showFront = true, size = 'large', isGeneratingMessage = false }: PostcardPreviewProps) {
  // Front side content
  const frontSide = (
    <div id="postcard-front-preview" className="relative w-full h-full bg-white rounded-xl overflow-hidden shadow-lg ring-1 ring-black/10">
      {frontData.imageUrl ? (
        <>
          {/* Photo with frame mode */}
          {frontData.mode === 'photo' && frontData.useFrame ? (
            <div className="relative w-full h-full bg-white overflow-hidden">
              {/* Photo as background - inside frame area */}
              <img
                src={frontData.imageUrl}
                alt="Postcard design"
                className="absolute object-cover"
                style={{ 
                  zIndex: 1,
                  left: '5.2%',
                  top: '3.5%',
                  width: '90%',
                  height: '93.5%'
                }}
              />
              
              {/* Frame overlay - on top of photo */}
              <img
                src="/frames/elegant-frame.png?v=5"
                alt="Frame"
                className="absolute inset-0 w-full h-full object-fill pointer-events-none"
                style={{ zIndex: 2 }}
              />
              
              {/* Caption overlay - at bottom, on top of everything */}
              {frontData.caption && (
                <div className="absolute bottom-[4.5%] left-[5.2%] right-[4.8%]" style={{ zIndex: 3 }}>
                  <div className="bg-black/60 backdrop-blur-sm py-2.5 px-3">
                    <div className={cn(
                      "text-white text-center font-bold uppercase leading-tight tracking-wide",
                      size === 'large' ? "text-base sm:text-lg md:text-xl" : "text-sm sm:text-base"
                    )}>
                      {splitCaptionToLines(frontData.caption).map((line, index) => (
                        <div key={index}>{line}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Regular photo mode without frame */
            <>
              <div className="w-full h-full p-1">
                <img
                  src={frontData.imageUrl}
                  alt="Postcard design"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              {/* Caption overlay - only for photo mode without frame */}
              {frontData.caption && frontData.mode === 'photo' && (
                <div className="absolute bottom-6 left-4 right-4 z-20">
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg py-3 px-4">
                    <p className={cn(
                      "text-white text-center font-bold uppercase leading-snug",
                      size === 'large' ? "text-base sm:text-lg md:text-xl" : "text-sm md:text-base"
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
        /* Placeholder when no image */
        <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground font-medium">Ваша листівка</p>
            <p className="text-xs text-muted-foreground">Оберіть зображення</p>
          </div>
        </div>
      )}
    </div>
  );

  // Back side content
  const backSide = (
    <div id="postcard-back-preview" className="relative w-full h-full bg-background border rounded-xl overflow-hidden">
      {backData.selectedColor ? (
        <div 
          className="h-full flex flex-col p-6"
          style={{ backgroundColor: backData.selectedColor }}
        >
          {/* Personal message - takes most space */}
          <div className="flex-1 flex items-center justify-center px-2">
            {isGeneratingMessage ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className={cn(
                  "h-6 w-6 animate-spin",
                  isLightColor(backData.selectedColor) ? "text-gray-900/70" : "text-white/70"
                )} />
                <p className={cn(
                  "text-xs text-center",
                  isLightColor(backData.selectedColor) ? "text-gray-900/70" : "text-white/70"
                )}>
                  Генеруємо підпис...
                </p>
              </div>
            ) : backData.personalMessage ? (
              <div className="text-center max-w-[200px]">
                {splitMessageToParagraphs(backData.personalMessage).map((paragraph, index) => (
                  <p 
                    key={index}
                    className={cn(
                      "leading-snug",
                      isLightColor(backData.selectedColor) ? "text-gray-900" : "text-white",
                      index > 0 && "mt-3"
                    )}
                    style={{ 
                      fontFamily: "'Bebas Neue Cyrillic', 'Bebas Neue', sans-serif",
                      fontSize: '14px',
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
                "text-sm italic",
                isLightColor(backData.selectedColor) ? "text-gray-900/70" : "text-white/70"
              )}>
                Ваше особисте повідомлення
              </p>
            )}
          </div>

          {/* QR Code - compact at bottom */}
          <div className="flex justify-center pb-4">
            <div 
              className={cn(
                "bg-white rounded-lg flex items-center justify-center p-3",
                size === 'large' ? "w-32 h-32" : "w-24 h-24"
              )}
            >
              <QRCode
                value="https://listos.app/postcard/sample"
                size={size === 'large' ? 104 : 72}
                level="M"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      ) : (
        /* Placeholder when no color selected */
        <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <QrCode className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground font-medium">Зворотна сторона</p>
            <p className="text-xs text-muted-foreground">Оберіть колір</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full aspect-[3/4]">
      {showFront ? frontSide : backSide}
    </div>
  );
}
