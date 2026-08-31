import React, { useState } from 'react';
import { Heart, Loader2, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { StyleKey } from '@/lib/postcard-styles';
import listosMascot from '@/assets/listosyk-mascot.png';
import { SOUND_CARD_SLOGAN } from '@/lib/product-format';

interface FrontDesignData {
  mode: 'photo' | 'ai-generation';
  style: StyleKey | null;
  imageUrl: string | null;
  caption: string;
  prompt: string;
  useFrame?: boolean;
}

interface InsideDesignData {
  selectedColor: string;
  personalMessage: string;
}

interface SoundCardPreviewProps {
  frontData: FrontDesignData;
  insideData: InsideDesignData;
  /** closed = one face (cover or outer back). open = two-page spread. */
  view?: 'closed' | 'open';
  /** When view is closed, which side of the physical card. */
  closedSide?: 'cover' | 'back';
  size?: 'large' | 'compact';
  isGeneratingMessage?: boolean;
  className?: string;
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

function splitCaptionTo2Lines(caption: string): string[] {
  const words = caption.trim().split(/\s+/);
  if (words.length <= 1) return [caption.trim()];
  const midPoint = Math.ceil(words.length / 2);
  return [words.slice(0, midPoint).join(' '), words.slice(midPoint).join(' ')].filter(
    (line) => line.length > 0
  );
}

function CoverFace({
  frontData,
  size,
  showCaption,
}: {
  frontData: FrontDesignData;
  size: 'large' | 'compact';
  showCaption: boolean;
}) {
  return (
    <div className="relative w-full h-full bg-white rounded-xl overflow-hidden shadow-lg ring-1 ring-black/10">
      {frontData.imageUrl ? (
        <>
          {frontData.mode === 'photo' && frontData.useFrame ? (
            <div className="relative w-full h-full bg-white overflow-hidden">
              <img
                src={frontData.imageUrl}
                alt=""
                className="absolute object-cover"
                style={{
                  zIndex: 1,
                  left: '5.2%',
                  top: '3.5%',
                  width: '90%',
                  height: '93.5%',
                }}
              />
              {showCaption && frontData.caption && (
                <div className="absolute bottom-[4.5%] left-[5.2%] right-[4.8%]" style={{ zIndex: 2 }}>
                  <div className="bg-black/60 backdrop-blur-sm py-2.5 px-3">
                    <div
                      className={cn(
                        'text-white text-center font-bold uppercase leading-tight tracking-wide',
                        size === 'large' ? 'text-base sm:text-lg' : 'text-sm'
                      )}
                    >
                      {splitCaptionTo2Lines(frontData.caption).map((line, index) => (
                        <div key={index}>{line}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <img
                src="/frames/elegant-frame.png?v=5"
                alt=""
                className="absolute inset-0 w-full h-full object-fill pointer-events-none"
                style={{ zIndex: 3 }}
              />
            </div>
          ) : (
            <>
              <div className="w-full h-full p-1">
                <img
                  src={frontData.imageUrl}
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              {showCaption && frontData.caption && frontData.mode === 'photo' && (
                <div className="absolute bottom-6 left-4 right-4 z-20">
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg py-3 px-4">
                    <p
                      className={cn(
                        'text-white text-center font-bold uppercase leading-snug',
                        size === 'large' ? 'text-base sm:text-lg' : 'text-sm'
                      )}
                    >
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
          <div className="space-y-2">
            <p className="text-muted-foreground font-medium">Обкладинка</p>
            <p className="text-xs text-muted-foreground">Оберіть зображення</p>
          </div>
        </div>
      )}
    </div>
  );
}

function InsideRightFace({
  insideData,
  isGeneratingMessage,
}: {
  insideData: InsideDesignData;
  isGeneratingMessage: boolean;
}) {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg ring-1 ring-black/10">
      {insideData.selectedColor ? (
        <div className="h-full flex flex-col p-5" style={{ backgroundColor: insideData.selectedColor }}>
          <div className="flex-1 flex items-center justify-center px-1">
            {isGeneratingMessage ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2
                  className={cn(
                    'h-6 w-6 animate-spin',
                    isLightColor(insideData.selectedColor) ? 'text-gray-900/70' : 'text-white/70'
                  )}
                />
                <p
                  className={cn(
                    'text-xs text-center',
                    isLightColor(insideData.selectedColor) ? 'text-gray-900/70' : 'text-white/70'
                  )}
                >
                  Пишемо текст усередині...
                </p>
              </div>
            ) : insideData.personalMessage ? (
              <div className="text-center max-w-[200px]">
                {splitMessageToParagraphs(insideData.personalMessage).map((paragraph, index) => (
                  <p
                    key={index}
                    className={cn(
                      'leading-snug',
                      isLightColor(insideData.selectedColor) ? 'text-gray-900' : 'text-white',
                      index > 0 && 'mt-3'
                    )}
                    style={{
                      fontFamily: "'Bebas Neue Cyrillic', 'Bebas Neue', sans-serif",
                      fontSize: '12px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <p
                className={cn(
                  'text-sm italic',
                  isLightColor(insideData.selectedColor) ? 'text-gray-900/70' : 'text-white/70'
                )}
              >
                Теплий текст про вашу пісню
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4 bg-background">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Volume2 className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground font-medium">Всередині справа</p>
            <p className="text-xs text-muted-foreground">Оберіть колір тла</p>
          </div>
        </div>
      )}
    </div>
  );
}

function OuterBackFace({ color }: { color: string }) {
  const bg = color || '#EDEAF7';
  return (
    <div
      className="relative w-full h-full rounded-xl overflow-hidden shadow-lg ring-1 ring-black/10 flex items-center justify-center p-4"
      style={{ backgroundColor: bg }}
    >
      <div className="bg-white rounded-2xl w-[82%] h-[62%] flex flex-col items-center justify-center px-3 py-4 shadow-sm">
        <img src={listosMascot} alt="Листосик" className="h-[45%] w-auto object-contain mb-2" />
        <p className="font-baloo font-extrabold text-base text-[#4A3FA0] leading-none">Листосик</p>
        <p className="font-baloo font-semibold text-[11px] text-[#6A5ACD] text-center leading-snug mt-2 px-1">
          {SOUND_CARD_SLOGAN}
        </p>
      </div>
    </div>
  );
}

/**
 * Customer preview of the physical sound card — not the A4 print sheet.
 * Closed: flip cover ↔ outer back. Open: two-page spread.
 * Aspect 88×166 (narrower/taller than A6 3:4).
 */
export function SoundCardPreview({
  frontData,
  insideData,
  view = 'closed',
  closedSide = 'cover',
  size = 'compact',
  isGeneratingMessage = false,
  className,
}: SoundCardPreviewProps) {
  const faceClass = 'w-full aspect-[88/166]';

  if (view === 'open') {
    return (
      <div className={cn('w-full', className)}>
        <div className="flex items-stretch justify-center gap-1 sm:gap-2">
          <div className={cn(faceClass, 'max-w-[46%]')}>
            <CoverFace frontData={frontData} size={size} showCaption={false} />
          </div>
          <div className={cn(faceClass, 'max-w-[46%]')}>
            <InsideRightFace insideData={insideData} isGeneratingMessage={isGeneratingMessage} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(faceClass, className)}>
      {closedSide === 'back' ? (
        <OuterBackFace color={insideData.selectedColor} />
      ) : (
        <CoverFace frontData={frontData} size={size} showCaption={true} />
      )}
    </div>
  );
}

interface SoundCardPreviewControlsProps {
  frontData: FrontDesignData;
  insideData: InsideDesignData;
  isGeneratingMessage?: boolean;
  size?: 'large' | 'compact';
}

export function SoundCardPreviewWithControls({
  frontData,
  insideData,
  isGeneratingMessage = false,
  size = 'compact',
}: SoundCardPreviewControlsProps) {
  const [view, setView] = useState<'closed' | 'open'>('closed');
  const [closedSide, setClosedSide] = useState<'cover' | 'back'>('cover');

  const handleClosedInteract = () => {
    if (view === 'closed') {
      setClosedSide((side) => (side === 'cover' ? 'back' : 'cover'));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-2">
        <Button
          type="button"
          size="sm"
          variant={view === 'closed' ? 'default' : 'outline'}
          onClick={() => setView('closed')}
        >
          Закрита листівка
        </Button>
        <Button
          type="button"
          size="sm"
          variant={view === 'open' ? 'default' : 'outline'}
          onClick={() => setView('open')}
        >
          Відкрита листівка
        </Button>
      </div>

      <div
        className={cn('mx-auto', view === 'closed' ? 'max-w-[220px] cursor-pointer select-none' : 'max-w-lg')}
        onClick={view === 'closed' ? handleClosedInteract : undefined}
        role={view === 'closed' ? 'button' : undefined}
        tabIndex={view === 'closed' ? 0 : undefined}
        onKeyDown={(e) => {
          if (view === 'closed' && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleClosedInteract();
          }
        }}
      >
        <SoundCardPreview
          frontData={frontData}
          insideData={insideData}
          view={view}
          closedSide={closedSide}
          size={size}
          isGeneratingMessage={isGeneratingMessage}
        />
      </div>

      <p className="text-xs text-muted-foreground text-center">
        {view === 'closed'
          ? closedSide === 'cover'
            ? 'Обкладинка — те, що видно, коли листівка закрита. Натисніть, щоб побачити зворот.'
            : 'Зворот закритої листівки. Натисніть, щоб повернути обкладинку.'
          : 'Всередині: зліва — ваша картинка, справа — колір і теплий текст. Пісня заграє, щойно листівку відкриють.'}
      </p>
    </div>
  );
}
