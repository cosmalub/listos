import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, ArrowRight, QrCode } from 'lucide-react';
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

interface BackDesignStepProps {
  frontDesign: FrontDesignData;
  initialData: BackDesignData;
  onComplete: (data: BackDesignData) => void;
  onBack: () => void;
}

const BACK_TEMPLATES = [
  {
    id: 'classic',
    name: 'Класичний',
    description: 'Традиційний дизайн листівки з елегантним оформленням'
  },
  {
    id: 'modern',
    name: 'Сучасний',
    description: 'Мінімалістичний дизайн з чистими лініями'
  },
  {
    id: 'decorative',
    name: 'Декоративний',
    description: 'Багато прикрас та візерунків'
  }
];

const FONT_STYLES = [
  {
    id: 'elegant',
    name: 'Елегантний',
    description: 'Витончений серифний шрифт',
    className: 'font-serif'
  },
  {
    id: 'playful',
    name: 'Ігривий',
    description: 'Веселий округлий шрифт',
    className: 'font-sans rounded'
  },
  {
    id: 'classic',
    name: 'Класичний',
    description: 'Стандартний читабельний шрифт',
    className: 'font-sans'
  }
];

const QR_POSITIONS = [
  {
    id: 'top-right',
    name: 'Вгорі справа',
    description: 'QR-код у верхньому правому куті'
  },
  {
    id: 'bottom-right',
    name: 'Внизу справа',
    description: 'QR-код у нижньому правому куті'
  },
  {
    id: 'bottom-left',
    name: 'Внизу зліва',
    description: 'QR-код у нижньому лівому куті'
  }
];

export function BackDesignStep({ frontDesign, initialData, onComplete, onBack }: BackDesignStepProps) {
  const [backData, setBackData] = useState<BackDesignData>(initialData);

  const handleComplete = () => {
    onComplete(backData);
  };

  const isComplete = backData.template && backData.personalMessage.trim().length > 0;

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

      {/* Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle>1. Оберіть шаблон</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={backData.template}
            onValueChange={(value) => setBackData(prev => ({ ...prev, template: value }))}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {BACK_TEMPLATES.map((template) => (
                <div key={template.id} className="relative">
                  <RadioGroupItem value={template.id} id={template.id} className="sr-only" />
                  <Label
                    htmlFor={template.id}
                    className={`
                      block p-4 border-2 rounded-lg cursor-pointer transition-all
                      ${backData.template === template.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                      }
                    `}
                  >
                    <div className="text-center space-y-2">
                      <div className="h-20 bg-muted rounded flex items-center justify-center">
                        <span className="text-muted-foreground">{template.name}</span>
                      </div>
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
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

      {/* Font Style */}
      <Card>
        <CardHeader>
          <CardTitle>3. Стиль шрифту</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={backData.fontStyle}
            onValueChange={(value: 'elegant' | 'playful' | 'classic') => 
              setBackData(prev => ({ ...prev, fontStyle: value }))
            }
          >
            <div className="space-y-3">
              {FONT_STYLES.map((fontStyle) => (
                <div key={fontStyle.id} className="flex items-center space-x-3">
                  <RadioGroupItem value={fontStyle.id} id={fontStyle.id} />
                  <Label htmlFor={fontStyle.id} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className={`text-lg ${fontStyle.className}`}>{fontStyle.name}</span>
                        <p className="text-sm text-muted-foreground">{fontStyle.description}</p>
                      </div>
                      <div className={`text-muted-foreground ${fontStyle.className}`}>
                        Приклад тексту
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* QR Code Position */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            4. Розташування QR-коду
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={backData.qrPosition}
            onValueChange={(value: 'top-right' | 'bottom-right' | 'bottom-left') => 
              setBackData(prev => ({ ...prev, qrPosition: value }))
            }
          >
            <div className="space-y-3">
              {QR_POSITIONS.map((position) => (
                <div key={position.id} className="flex items-center space-x-3">
                  <RadioGroupItem value={position.id} id={position.id} />
                  <Label htmlFor={position.id} className="flex-1 cursor-pointer">
                    <div>
                      <span className="font-medium">{position.name}</span>
                      <p className="text-sm text-muted-foreground">{position.description}</p>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
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