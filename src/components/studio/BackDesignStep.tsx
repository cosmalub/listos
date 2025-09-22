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
  initialData: BackDesignData;
  onComplete: (data: BackDesignData) => void;
  onBack: () => void;
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

// Helper function to generate personal message based on front design
function generatePersonalMessage(frontDesign: FrontDesignData): string {
  const baseMessages = [
    'Дорогий друже! Ця особлива пісня нагадала мені про тебе. Сподіваюся, вона принесе тобі стільки ж радості, скільки принесла мені.',
    'Привіт! Створив для тебе цю унікальну музичну листівку. Послухай цю мелодію та подумай про наші прекрасні спогади.',
    'Привіт! Ця пісня особлива для мене, і я хотів поділитися нею з тобою. Насолоджуйся музикою!',
    'Дорогий! Знайшов цю чудову мелодію і одразу подумав про тебе. Сподіваюся, вона тобі сподобається так само, як і мені.'
  ];
  
  // Select a random message
  return baseMessages[Math.floor(Math.random() * baseMessages.length)];
}

export function BackDesignStep({ frontDesign, initialData, onComplete, onBack }: BackDesignStepProps) {
  const [backData, setBackData] = useState<BackDesignData>(initialData);
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);
  
  const dominantColors = extractDominantColors(frontDesign);

  // Auto-generate personal message on mount if not already set
  useEffect(() => {
    if (!backData.personalMessage.trim()) {
      const generatedMessage = generatePersonalMessage(frontDesign);
      setBackData(prev => ({ ...prev, personalMessage: generatedMessage }));
    }
  }, [frontDesign, backData.personalMessage]);

  const handleComplete = () => {
    onComplete(backData);
  };

  const handleRegenerateMessage = () => {
    setIsGeneratingMessage(true);
    setTimeout(() => {
      const newMessage = generatePersonalMessage(frontDesign);
      setBackData(prev => ({ ...prev, personalMessage: newMessage }));
      setIsGeneratingMessage(false);
    }, 1000); // Simulate generation delay
  };

  const isComplete = backData.selectedColor && backData.personalMessage.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          До лицьової сторони
        </Button>
        <h2 className="text-xl font-semibold">Зворотна частина листівки</h2>
        <div></div>
      </div>

      {/* Color Selection */}
      <Card>
        <CardHeader>
          <CardTitle>1. Оберіть колір для дизайну</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={backData.selectedColor}
            onValueChange={(value) => setBackData(prev => ({ ...prev, selectedColor: value }))}
          >
            <div className="grid grid-cols-3 gap-4">
              {dominantColors.map((color, index) => (
                <div key={color} className="relative">
                  <RadioGroupItem value={color} id={color} className="sr-only" />
                  <Label
                    htmlFor={color}
                    className={`
                      block p-4 border-2 rounded-lg cursor-pointer transition-all
                      ${backData.selectedColor === color 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                      }
                    `}
                  >
                    <div className="text-center space-y-3">
                      <div 
                        className="h-16 w-full rounded-lg border-2 border-border/20"
                        style={{ backgroundColor: color }}
                      />
                      <div className="space-y-1">
                        <h3 className="font-medium">Колір {index + 1}</h3>
                        <p className="text-xs text-muted-foreground font-mono">{color}</p>
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
          <div className="flex items-center justify-between">
            <CardTitle>2. Персональне повідомлення</CardTitle>
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
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="personalMessage">Ваше повідомлення</Label>
              <Textarea
                id="personalMessage"
                value={backData.personalMessage}
                onChange={(e) => setBackData(prev => ({ ...prev, personalMessage: e.target.value }))}
                placeholder="Напишіть особливе повідомлення для отримувача..."
                rows={4}
                maxLength={500}
              />
              <p className="text-sm text-muted-foreground mt-1">
                {backData.personalMessage.length}/500 символів
              </p>
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