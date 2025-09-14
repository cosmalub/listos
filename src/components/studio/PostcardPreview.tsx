import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Postcard3D } from '@/components/postcards/Postcard3D';
import { QrCode, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StyleKey } from '@/lib/postcard-styles';

interface FrontDesignData {
  style: StyleKey | null;
  colors: string[];
  imageUrl: string | null;
  caption: string;
  prompt: string;
}

interface BackDesignData {
  template: string;
  qrPosition: 'top-right' | 'bottom-right' | 'bottom-left';
  personalMessage: string;
  fontStyle: 'elegant' | 'playful' | 'classic';
}

interface PostcardPreviewProps {
  frontData: FrontDesignData;
  backData: BackDesignData;
  showFront?: boolean;
}

const QR_POSITION_CLASSES = {
  'top-right': 'top-4 right-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4'
};

const FONT_STYLE_CLASSES = {
  elegant: 'font-serif',
  playful: 'font-sans font-medium',
  classic: 'font-sans'
};

export function PostcardPreview({ frontData, backData, showFront = true }: PostcardPreviewProps) {
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
          
          {/* Caption overlay */}
          {frontData.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
              <p className="text-white text-sm md:text-base font-medium text-center">
                {frontData.caption}
              </p>
            </div>
          )}
          
          {/* Style indicator */}
          {frontData.style && (
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="text-xs">
                {frontData.style}
              </Badge>
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
            {frontData.style ? (
              <Badge variant="outline">{frontData.style}</Badge>
            ) : (
              <p className="text-xs text-muted-foreground">Оберіть стиль</p>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // Back side content
  const backSide = (
    <div className="relative w-full h-full bg-background border rounded-xl overflow-hidden">
      {backData.template ? (
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-primary mb-2">
              Персональна листівка
            </h3>
            <div className="w-12 h-0.5 bg-primary mx-auto"></div>
          </div>

          {/* Personal message */}
          <div className="flex-1 flex items-center justify-center">
            {backData.personalMessage ? (
              <div className={cn(
                "text-center max-w-xs",
                FONT_STYLE_CLASSES[backData.fontStyle]
              )}>
                <p className="text-sm leading-relaxed text-foreground">
                  {backData.personalMessage}
                </p>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm italic">
                Ваше особисте повідомлення
              </p>
            )}
          </div>

          {/* QR Code */}
          <div className={cn(
            "absolute w-12 h-12 bg-muted rounded flex items-center justify-center",
            QR_POSITION_CLASSES[backData.qrPosition]
          )}>
            <QrCode className="w-6 h-6 text-muted-foreground" />
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-xs text-muted-foreground">
              Скануйте QR-код для прослуховування пісні
            </p>
          </div>
        </div>
      ) : (
        /* Placeholder when no template selected */
        <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <QrCode className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground font-medium">Зворотна сторона</p>
            <p className="text-xs text-muted-foreground">Оберіть шаблон</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-center">Превью листівки</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-w-sm mx-auto">
          <Postcard3D
            front={frontSide}
            back={backSide}
            orientation="portrait"
            className="w-full"
            initialTilt={{ x: showFront ? -5 : 175, y: 5 }}
          />
        </div>
        
        {/* Instructions */}
        <div className="mt-4 text-center space-y-1">
          <p className="text-xs text-muted-foreground">
            Двічі клікніть або натисніть 'f' щоб перевернути
          </p>
          <p className="text-xs text-muted-foreground">
            Перетягуйте для обертання
          </p>
        </div>
      </CardContent>
    </Card>
  );
}