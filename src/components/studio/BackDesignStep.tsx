import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import type { StyleKey } from '@/lib/postcard-styles';
import { getStyleColors } from '@/lib/postcard-styles';
import { extractDominantColors as extractColors, FALLBACK_COLORS } from '@/lib/color-extractor';
import type { ProductFormat } from '@/lib/product-format';

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

interface BackDesignStepProps {
  frontDesign: FrontDesignData;
  lyrics: string;
  initialData: BackDesignData;
  onComplete: (data: BackDesignData) => void;
  onBack: () => void;
  onDataChange?: (data: BackDesignData) => void;
  onGeneratingChange?: (isGenerating: boolean) => void;
  productFormat?: ProductFormat;
  occasion?: string;
  recipient?: string;
  sender?: string;
}

// Helper function to extract dominant colors from front design
async function extractDominantColorsFromImage(frontDesign: FrontDesignData): Promise<string[]> {
  // Если есть изображение, извлекаем реальные цвета
  if (frontDesign.imageUrl) {
    try {
      const colors = await extractColors(frontDesign.imageUrl, 3);
      return colors;
    } catch (error) {
      console.error('Failed to extract colors from image:', error);
      // Fallback на цвета стиля или дефолтные
    }
  }

  // Если выбран стиль AI-генерации, используем цвета стиля
  if (frontDesign.style) {
    const styleColors = getStyleColors(frontDesign.style);
    return styleColors.slice(0, 3);
  }

  // Fallback цвета
  return FALLBACK_COLORS;
}

// Helper function to generate personal message using AI
async function generatePersonalMessage(
  caption: string,
  lyrics: string,
  productFormat: ProductFormat = 'qr',
  extra?: { occasion?: string; recipient?: string; sender?: string }
): Promise<string> {
  try {
    const response = await fetch(
      `https://fmucxrtpiqxnfgvamjlo.supabase.co/functions/v1/generate-personal-message`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caption,
          lyrics,
          format: productFormat,
          occasion: extra?.occasion,
          recipient: extra?.recipient,
          sender: extra?.sender,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to generate message: ${response.status}`);
    }

    const data = await response.json();
    return data.personalMessage;
  } catch (error) {
    console.error('Error generating personal message:', error);
    if (productFormat === 'sound') {
      const soundFallbacks = [
        'Моя люба! Ця пісня — тепло, яке я хотів передати тобі в долоні.\n\nВідкриєш листівку — і почуєш, як сильно тебе люблю. Зростай щасливою.',
        'Для тебе я склав цю мелодію. У ній — наші тихі «люблю» і всі обійми, які не вміщаються в слова.\n\nВідкриєш — і пісня заграє сама. Нехай гріє щоразу, коли засумуєш.',
        'Це наша пісня, написана спеціально для тебе.\n\nЩойно відкриєш листівку, вона зазвучить. Слухай і знай: ти мені дуже дорогий.',
      ];
      return soundFallbacks[Math.floor(Math.random() * soundFallbacks.length)];
    }
    const fallbackMessages = [
      'Дорогий друже! Ця особлива пісня нагадала мені про тебе. Скануй QR-код і послухай мелодію, створену спеціально для тебе. Хай вона принесе радість!',
      'Привіт! Створив для тебе цю унікальну музичну листівку. Відскануй QR-код та послухай пісню, що розповідає про наші спогади. Насолоджуйся!',
      'Дорогий! У цьому QR-коді чекає особлива мелодія. Вона нагадала мені про тебе і я хотів поділитися нею. Скануй і слухай з посмішкою!'
    ];
    return fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];
  }
}

export function BackDesignStep({
  frontDesign,
  lyrics,
  initialData,
  onComplete,
  onBack,
  onDataChange,
  onGeneratingChange,
  productFormat = 'qr',
  occasion,
  recipient,
  sender,
}: BackDesignStepProps) {
  const [backData, setBackData] = useState<BackDesignData>(initialData);
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);
  const [dominantColors, setDominantColors] = useState<string[]>(FALLBACK_COLORS);
  const [isLoadingColors, setIsLoadingColors] = useState(true);

  // Notify parent about generating state
  useEffect(() => {
    onGeneratingChange?.(isGeneratingMessage);
  }, [isGeneratingMessage]);

  // Update parent component with live changes
  const updateBackData = (newData: BackDesignData) => {
    setBackData(newData);
    onDataChange?.(newData);
  };

  // Extract colors from image on mount
  useEffect(() => {
    const loadColors = async () => {
      setIsLoadingColors(true);
      try {
        const colors = await extractDominantColorsFromImage(frontDesign);
        setDominantColors(colors);
      } catch (error) {
        console.error('Failed to load colors:', error);
        setDominantColors(FALLBACK_COLORS);
      } finally {
        setIsLoadingColors(false);
      }
    };

    loadColors();
  }, [frontDesign.imageUrl]);

  // Auto-generate personal message on mount if not already set
  useEffect(() => {
    if (!backData.personalMessage.trim() && !isGeneratingMessage) {
      setIsGeneratingMessage(true);
      generatePersonalMessage(frontDesign.caption, lyrics, productFormat, { occasion, recipient, sender })
        .then((generatedMessage) => {
          // Use functional update to get the latest state (preserves selectedColor)
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

  const handleComplete = () => {
    onComplete(backData);
  };

  const handleRegenerateMessage = async () => {
    setIsGeneratingMessage(true);
    try {
      const newMessage = await generatePersonalMessage(frontDesign.caption, lyrics, productFormat, {
        occasion,
        recipient,
        sender,
      });
      // Use functional update to preserve selectedColor
      setBackData(prev => {
        const newData = { ...prev, personalMessage: newMessage };
        onDataChange?.(newData);
        return newData;
      });
    } catch (error) {
      console.error('Failed to regenerate message:', error);
    } finally {
      setIsGeneratingMessage(false);
    }
  };

  const isComplete = backData.selectedColor && backData.personalMessage.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Color Selection */}
      <Card>
        <CardHeader>
          <CardTitle>{productFormat === 'sound' ? '1. Колір тла всередині' : '1. Оберіть колір для дизайну'}</CardTitle>
          <p className="text-sm text-muted-foreground mt-3">
            {productFormat === 'sound'
              ? 'Ми взяли кольори з обкладинки. Оберіть тло для правої сторінки всередині — там буде ваш текст.'
              : 'Ми автоматично визначили домінуючі кольори з лицьової частини. Оберіть колір для оформлення зворотної частини листівки.'}
          </p>
        </CardHeader>
        <CardContent>
          {isLoadingColors ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span className="text-sm">Аналізуємо кольори зображення...</span>
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
                    <RadioGroupItem value={color} id={color} className="sr-only" />
                    <Label
                      htmlFor={color}
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

      {/* Personal Message */}
      <Card>
        <CardHeader>
          <CardTitle>{productFormat === 'sound' ? '2. Текст усередині листівки' : '2. Персональне повідомлення'}</CardTitle>
          <p className="text-sm text-muted-foreground mt-3">
            {isGeneratingMessage
              ? (productFormat === 'sound' ? 'Пишемо теплі слова про вашу пісню...' : 'Створюємо музичну магію на основі ваших слів...')
              : productFormat === 'sound'
                ? 'Ми написали короткий текст про пісню, яка заграє, щойно листівку відкриють. Можете виправити або згенерувати ще раз.'
                : 'Ми створили персональне повідомлення на основі вашої листівки. Ви можете відредагувати його або згенерувати нове.'}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="personalMessage">Ваше повідомлення</Label>
              <Textarea
                id="personalMessage"
                value={backData.personalMessage}
                onChange={(e) => updateBackData({ ...backData, personalMessage: e.target.value })}
                placeholder="Напишіть особливе повідомлення для отримувача..."
                rows={6}
                maxLength={250}
                className="min-h-[140px]"
              />
              <div className="flex items-center justify-between mt-1">
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
          <span className="sm:hidden">Назад</span>
          <span className="hidden sm:inline">{productFormat === 'sound' ? 'До обкладинки' : 'До лицьової сторони'}</span>
        </Button>
        <Button
          onClick={handleComplete}
          disabled={!isComplete}
          size="lg"
          className="flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <span className="sm:hidden">Завершити</span>
          <span className="hidden sm:inline">{productFormat === 'sound' ? 'Завершити оформлення' : 'Завершити дизайн'}</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}