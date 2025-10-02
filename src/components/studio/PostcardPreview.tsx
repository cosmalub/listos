import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Postcard3D } from '@/components/postcards/Postcard3D';
import { QrCode, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StyleKey } from '@/lib/postcard-styles';

interface FrontDesignData {
  mode: 'photo' | 'ai-generation';
  style: StyleKey | null;
  imageUrl: string | null;
  caption: string;
  prompt: string;
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
}


export function PostcardPreview({ frontData, backData, showFront = true, size = 'large' }: PostcardPreviewProps) {
  // Front side content
  const frontSide = (
    <div className="relative w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl overflow-hidden">
      {frontData.imageUrl ? (
        <>
          {/* Generated/uploaded image */}
          <img
            src={frontData.imageUrl}
            alt="Postcard design"
            className="w-full h-full object-cover"
          />
          {/* Caption overlay - only for photo mode */}
          {frontData.mode === 'photo' && frontData.caption && (
            <div className="absolute bottom-10 left-4 right-4">
              <div className="bg-black/50 rounded-lg py-2 px-3">
                <p className={cn(
                  "text-white text-center font-bold uppercase leading-snug",
                  size === 'large' ? "text-base sm:text-lg md:text-xl" : "text-xs md:text-sm"
                )}>
                  {frontData.caption}
                </p>
              </div>
            </div>
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
    <div className="relative w-full h-full bg-background border rounded-xl overflow-hidden">
      {backData.selectedColor ? (
        <div 
          className="h-full flex flex-col justify-center items-center p-10"
          style={{ backgroundColor: backData.selectedColor }}
        >
          {/* Personal message - centered */}
          <div className="flex-1 flex items-center justify-center">
            {backData.personalMessage ? (
              <div className="text-center px-6">
                <p className={cn(
                  "leading-relaxed text-white",
                  size === 'large' ? "text-lg sm:text-xl font-medium" : "text-base font-normal"
                )}>
                  {backData.personalMessage}
                </p>
              </div>
            ) : (
              <p className="text-white/70 text-lg italic">
                Ваше особисте повідомлення
              </p>
            )}
          </div>

          {/* QR Code - bottom */}
          <div className="flex flex-col items-center pb-6">
            <div 
              className={cn(
                "bg-white rounded-xl flex items-center justify-center p-4 shadow-lg",
                size === 'large' ? "w-44 h-44" : "w-36 h-36"
              )}
            >
              <QrCode className="w-full h-full text-gray-900" />
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
    <div className="w-full h-full">
      <Postcard3D
        front={frontSide}
        back={backSide}
        orientation="portrait"
        className="w-full h-full"
        initialTilt={{ x: -5, y: showFront ? 5 : 185 }}
      />
    </div>
  );
}