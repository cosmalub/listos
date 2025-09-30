import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import type { StyleKey } from '@/lib/postcard-styles';
import { getStyleColors } from '@/lib/postcard-styles';

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
}

// Helper function to extract dominant colors from front design
function extractDominantColors(frontDesign: FrontDesignData): string[] {
  if (frontDesign.style) {
    // Get colors from style definition and take first 3
    const styleColors = getStyleColors(frontDesign.style);
    return styleColors.slice(0, 3);
  }
  
  // Fallback colors for photo upload mode
  return ['#6A5ACD', '#E6E6FA', '#DDA0DD'];
}

// Helper function to generate personal message using AI
async function generatePersonalMessage(caption: string, lyrics: string): Promise<string> {
  try {
    const response = await fetch(
      `https://fmucxrtpiqxnfgvamjlo.supabase.co/functions/v1/generate-personal-message`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ caption, lyrics }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to generate message: ${response.status}`);
    }

    const data = await response.json();
    return data.personalMessage;
  } catch (error) {
    console.error('Error generating personal message:', error);
    // Fallback to predefined message on error
    const fallbackMessages = [
      'Дорогий друже! Ця особлива пісня нагадала мені про тебе. Скануй QR-код і послухай мелодію, створену спеціально для тебе. Хай вона принесе радість!',
      'Привіт! Створив для тебе цю унікальну музичну листівку. Відскануй QR-код та послухай пісню, що розповідає про наші спогади. Насолоджуйся!',
      'Дорогий! У цьому QR-коді чекає особлива мелодія. Вона нагадала мені про тебе і я хотів поділитися нею. Скануй і слухай з посмішкою!'
    ];
    return fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];
  }
}

export function BackDesignStep({ frontDesign, lyrics, initialData, onComplete, onBack, onDataChange }: BackDesignStepProps) {
  const [backData, setBackData] = useState<BackDesignData>(initialData);
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);

  // Update parent component with live changes
  const updateBackData = (newData: BackDesignData) => {
    setBackData(newData);
    onDataChange?.(newData);
  };
  
  const dominantColors = extractDominantColors(frontDesign);

  // Auto-generate personal message on mount if not already set
  useEffect(() => {
    if (!backData.personalMessage.trim() && !isGeneratingMessage) {
      setIsGeneratingMessage(true);
      generatePersonalMessage(frontDesign.caption, lyrics)
        .then((generatedMessage) => {
          updateBackData({ ...backData, personalMessage: generatedMessage });
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
      const newMessage = await generatePersonalMessage(frontDesign.caption, lyrics);
      updateBackData({ ...backData, personalMessage: newMessage });
    } catch (error) {
      console.error('Failed to regenerate message:', error);
    } finally {
      setIsGeneratingMessage(false);
    }
  };

  const isComplete = backData.selectedColor && backData.personalMessage.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          До лицьової сторони
        </Button>
        <div /> {/* For spacing */}
      </div>

      {/* Color Selection */}
      <Card>
        <CardHeader>
          <CardTitle>1. Оберіть колір для дизайну</CardTitle>
          <p className="text-sm text-muted-foreground mt-3">
            Ми автоматично визначили домінуючі кольори з лицьової частини. Оберіть колір для оформлення зворотної частини листівки.
          </p>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      {/* Personal Message */}
      <Card>
        <CardHeader>
          <CardTitle>2. Персональне повідомлення</CardTitle>
          <p className="text-sm text-muted-foreground mt-3">
            {isGeneratingMessage ? 
              "Створюємо музичну магію на основі ваших слів..." : 
              "Ми створили персональне повідомлення на основі вашої листівки. Ви можете відредагувати його або згенерувати нове."
            }
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
                rows={4}
                maxLength={500}
              />
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-muted-foreground">
                  {backData.personalMessage.length}/500 символів
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


      {/* Complete Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleComplete}
          disabled={!isComplete}
          size="lg"
          className="flex items-center gap-2"
        >
          Завершити дизайн
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}