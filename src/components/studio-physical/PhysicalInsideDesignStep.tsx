import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import { getStyleColors } from '@/lib/postcard-styles';
import { extractDominantColors as extractColors, FALLBACK_COLORS } from '@/lib/color-extractor';
import { PhysicalFrontDesignData, PhysicalBackDesignData } from './PhysicalPostcardPreview';

interface PhysicalInsideDesignStepProps {
  frontDesign: PhysicalFrontDesignData;
  lyrics: string;
  initialData: PhysicalBackDesignData;
  onComplete: (data: PhysicalBackDesignData) => void;
  onBack: () => void;
  onDataChange?: (data: PhysicalBackDesignData) => void;
  onGeneratingChange?: (isGenerating: boolean) => void;
}

async function extractDominantColorsFromImage(frontDesign: PhysicalFrontDesignData): Promise<string[]> {
  if (frontDesign.imageUrl) {
    try {
      const colors = await extractColors(frontDesign.imageUrl, 3);
      return colors;
    } catch (error) {
      console.error('Failed to extract colors from image:', error);
    }
  }

  if (frontDesign.style) {
    const styleColors = getStyleColors(frontDesign.style);
    return styleColors.slice(0, 3);
  }

  return FALLBACK_COLORS;
}

/**
 * Clean QR references from AI-generated personal message so it fits the Sound Postcard
 * (where music plays automatically upon opening the card).
 */
function adaptMessageForSoundPostcard(rawMessage: string): string {
  if (!rawMessage) return '';
  let text = rawMessage
    .replace(/відскануй\s+qr-?код\s+(і|та)\s+/gi, 'відкрий листівку і ')
    .replace(/скануй\s+qr-?код\s+(і|та)\s+/gi, 'слухай цю мелодію і ')
    .replace(/у\s+цьому\s+qr-?коді\s+чекає/gi, 'у цій листівці звучить')
    .replace(/за\s+цим\s+qr-?кодом/gi, 'у цій листівці')
    .replace(/qr-?код/gi, 'листівку');
  return text.trim();
}

async function generateSoundCardMessage(caption: string, lyrics: string): Promise<string> {
  try {
    const response = await fetch(
      `https://fmucxrtpiqxnfgvamjlo.supabase.co/functions/v1/generate-personal-message`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption, lyrics }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to generate message: ${response.status}`);
    }

    const data = await response.json();
    if (data?.personalMessage) {
      return adaptMessageForSoundPostcard(data.personalMessage);
    }
    throw new Error('Empty message');
  } catch (error) {
    console.error('Error generating sound card message:', error);
    const fallbackMessages = [
      'Моя люба, ця пісня — моє серце, що б’ється лише для тебе. Відкрий листівку і почуй слова, які я співав тисячу разів у думках.\n\nТи — моє кохання назавжди!',
      'Дорогий друже! Ця особлива мелодія створена спеціально для тебе. Нехай кожна нота цієї листівки дарує тобі тепло, радість і щиру посмішку!',
      'Найріднішій людині! Коли ти відкриваєш цю листівку, лунає пісня, написана саме про тебе. Слухай серцем і пам’ятай, як сильно ми тебе любимо!'
    ];
    return fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];
  }
}

export function PhysicalInsideDesignStep({
  frontDesign,
  lyrics,
  initialData,
  onComplete,
  onBack,
  onDataChange,
  onGeneratingChange
}: PhysicalInsideDesignStepProps) {
  const [backData, setBackData] = useState<PhysicalBackDesignData>(initialData);
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);
  const [dominantColors, setDominantColors] = useState<string[]>(FALLBACK_COLORS);
  const [isLoadingColors, setIsLoadingColors] = useState(true);

  useEffect(() => {
    onGeneratingChange?.(isGeneratingMessage);
  }, [isGeneratingMessage]);

  const updateBackData = (newData: PhysicalBackDesignData) => {
    setBackData(newData);
    onDataChange?.(newData);
  };

  useEffect(() => {
    const loadColors = async () => {
      setIsLoadingColors(true);
      try {
        const colors = await extractDominantColorsFromImage(frontDesign);
        setDominantColors(colors);
        // Auto-select first extracted color if none selected yet
        if (!backData.selectedColor && colors.length > 0) {
          setBackData(prev => {
            const updated = { ...prev, selectedColor: colors[0] };
            onDataChange?.(updated);
            return updated;
          });
        }
      } catch (error) {
        console.error('Failed to load colors:', error);
        setDominantColors(FALLBACK_COLORS);
      } finally {
        setIsLoadingColors(false);
      }
    };

    loadColors();
  }, [frontDesign.imageUrl]);

  useEffect(() => {
    if (!backData.personalMessage.trim() && !isGeneratingMessage) {
      setIsGeneratingMessage(true);
      generateSoundCardMessage(frontDesign.caption, lyrics)
        .then((generatedMessage) => {
          setBackData(prev => {
            const newData = { ...prev, personalMessage: generatedMessage };
            onDataChange?.(newData);
            return newData;
          });
        })
        .finally(() => {
          setIsGeneratingMessage(false);
        });
    }
  }, []);

  const handleRegenerateMessage = async () => {
    setIsGeneratingMessage(true);
    try {
      const newMessage = await generateSoundCardMessage(frontDesign.caption, lyrics);
      setBackData(prev => {
        const newData = { ...prev, personalMessage: newMessage };
        onDataChange?.(newData);
        return newData;
      });
    } finally {
      setIsGeneratingMessage(false);
    }
  };

  const isComplete = backData.selectedColor && backData.personalMessage.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* 1. Color Selection */}
      <Card>
        <CardHeader>
          <CardTitle>1. Оберіть колір фону розвороту та звороту</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Ми автоматично підібрали кольори під вашу лицьову обкладинку. Обраний колір застосується для лівої і правої внутрішніх сторінок та зворотної сторони листівки.
          </p>
        </CardHeader>
        <CardContent>
          {isLoadingColors ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span className="text-sm">Аналізуємо кольори обкладинки...</span>
              </div>
            </div>
          ) : (
            <RadioGroup
              value={backData.selectedColor}
              onValueChange={(value) => updateBackData({ ...backData, selectedColor: value })}
            >
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {dominantColors.map((color, index) => (
                  <div key={color} className="relative">
                    <RadioGroupItem value={color} id={`phys-${color}`} className="sr-only" />
                    <Label
                      htmlFor={`phys-${color}`}
                      className={`
                        block p-2 sm:p-4 border-2 rounded-lg cursor-pointer transition-all
                        ${backData.selectedColor === color
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                        }
                      `}
                    >
                      <div className="text-center space-y-2 sm:space-y-3">
                        <div
                          className="h-10 w-full sm:h-16 rounded-lg border-2 border-border/20"
                          style={{ backgroundColor: color }}
                        />
                        <div className="space-y-1">
                          <h3 className="font-medium text-xs sm:text-base">Колір {index + 1}</h3>
                          <p className="text-[10px] sm:text-xs text-muted-foreground font-mono">{color}</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}
        </CardContent>
      </Card>

      {/* 2. Personal Message */}
      <Card>
        <CardHeader>
          <CardTitle>2. Текст привітання всередині листівки (права сторінка)</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            {isGeneratingMessage
              ? 'Створюємо тепле привітання на основі вашої пісні...'
              : 'Ми створили персональне привітання для внутрішнього розвороту. Ви можете відредагувати його або згенерувати інший варіант.'}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="physicalPersonalMessage">Текст привітання</Label>
              <Textarea
                id="physicalPersonalMessage"
                value={backData.personalMessage}
                onChange={(e) => updateBackData({ ...backData, personalMessage: e.target.value })}
                placeholder="Напишіть особливе привітання для отримувача..."
                rows={6}
                maxLength={250}
                className="min-h-[140px] mt-1.5"
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-muted-foreground">
                  {backData.personalMessage.length}/250 символів
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRegenerateMessage}
                  disabled={isGeneratingMessage}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${isGeneratingMessage ? 'animate-spin' : ''}`} />
                  Згенерувати заново
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center justify-center gap-2 w-full sm:w-auto">
          <ArrowLeft className="w-4 h-4" />
          <span>До лицьової обкладинки</span>
        </Button>
        <Button
          onClick={() => onComplete(backData)}
          disabled={!isComplete}
          size="lg"
          className="flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <span>Завершити та зберегти листівку</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
