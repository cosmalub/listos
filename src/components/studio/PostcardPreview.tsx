import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Postcard3D } from '@/components/postcards/Postcard3D';
import { QrCode, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StyleKey } from '@/lib/postcard-styles';
import QRCode from 'react-qr-code';

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
          {/* Caption overlay - for both modes */}
          {frontData.caption && (
            <div className="absolute top-6 left-4 right-4">
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
          className="h-full flex flex-col p-6"
          style={{ backgroundColor: backData.selectedColor }}
        >
          {/* Personal message - takes most space */}
          <div className="flex-1 flex items-center justify-center px-4">
            {backData.personalMessage ? (
              <div className="text-center max-w-sm">
                <p className={cn(
                  "leading-snug font-medium",
                  isLightColor(backData.selectedColor) ? "text-gray-900" : "text-white",
                  size === 'large' ? "text-base" : "text-sm"
                )}>
                  {backData.personalMessage}
                </p>
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