import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Music, Sparkles, RefreshCw, HeadphonesIcon, UserCheck, Info } from 'lucide-react';
import { MusicVariantCard } from './MusicVariantCard';

interface MusicVariant {
  id: string;
  title: string;
  description: string;
  audioUrl?: string;
  duration?: string;
  style: string;
}

interface MusicGenerationProps {
  lyrics: string;
  onVariantSelected: (variant: MusicVariant) => void;
  onRequestSpecialist: () => void;
}

export const MusicGeneration: React.FC<MusicGenerationProps> = ({
  lyrics,
  onVariantSelected,
  onRequestSpecialist
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [variants, setVariants] = useState<MusicVariant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<MusicVariant | null>(null);
  const [generationAttempt, setGenerationAttempt] = useState(0);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showSpecialistDialog, setShowSpecialistDialog] = useState(false);

  useEffect(() => {
    if (lyrics) {
      startGeneration();
    }
  }, [lyrics]);

  const startGeneration = async () => {
    setIsGenerating(true);
    setVariants([]);
    
    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock variants - in real implementation, this would call the backend
    const mockVariants: MusicVariant[] = [
      {
        id: '1',
        title: 'Енергійний поп',
        description: 'Сучасний поп-трек з яскравим ритмом та запоминающимся припевом',
        duration: '3:24',
        style: 'Upbeat Pop'
      },
      {
        id: '2',
        title: 'Мелодійна балада',
        description: 'Ніжна акустична версія з глибоким емоційним звучанням',
        duration: '3:45',
        style: 'Acoustic Ballad'
      }
    ];
    
    setVariants(mockVariants);
    setIsGenerating(false);
    setGenerationAttempt(prev => prev + 1);
  };

  const handleRegenerateWithFeedback = async () => {
    if (generationAttempt >= 2) {
      setShowSpecialistDialog(true);
      return;
    }
    
    setShowFeedbackDialog(false);
    setFeedback('');
    await startGeneration();
  };

  const handleVariantSelect = (variant: MusicVariant) => {
    setSelectedVariant(variant);
    onVariantSelected(variant);
  };

  const handleContactSpecialist = () => {
    setShowSpecialistDialog(false);
    onRequestSpecialist();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Генерація музики</h2>
        <p className="text-muted-foreground">
          Створюємо музичні варіанти на основі ваших слів
        </p>
      </div>

      {/* Generation Status */}
      {isGenerating && (
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <Sparkles className="h-6 w-6 text-secondary absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Аналізуємо ваші слова...</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Наша ШІ створює унікальні музичні промпти та генерує для вас два варіанти композиції
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span>Спроба {generationAttempt + 1} з 2</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Variants Display */}
      {variants.length > 0 && !isGenerating && (
        <div className="space-y-4 animate-fade-in">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Оберіть один варіант, щоб продовжити:</h3>
            <p className="text-sm text-muted-foreground">
              Спроба {generationAttempt} з 2
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {variants.map((variant) => (
              <MusicVariantCard
                key={variant.id}
                variant={variant}
                isSelected={selectedVariant?.id === variant.id}
                onSelect={() => handleVariantSelect(variant)}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button
              variant="outline"
              onClick={() => setShowFeedbackDialog(true)}
              disabled={generationAttempt >= 2}
              className="w-full sm:w-auto"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Перегенерувати
            </Button>
            
            {generationAttempt >= 2 && (
              <Button
                variant="secondary"
                onClick={() => setShowSpecialistDialog(true)}
                className="w-full sm:w-auto"
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Зв'язатися зі спеціалістом
              </Button>
            )}
          </div>

          {/* Info Alert - What's next */}
          <Alert className="border-primary/20 bg-primary/5">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Що далі:</strong> Після вибору варіанту музики, ми створимо персональну сторінку з вашою піснею та побажанням. 
              Потім згенеруємо листівку з QR-кодом, який веде на цю сторінку.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Feedback Dialog */}
      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Що не підходить?</DialogTitle>
            <DialogDescription>
              Коротко опишіть, що ви хочете змінити в музиці
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Наприклад: зробити більш швидко, додати гітару, змінити настрій..."
              className="min-h-[100px]"
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowFeedbackDialog(false)}
              >
                Скасувати
              </Button>
              <Button
                onClick={handleRegenerateWithFeedback}
                disabled={!feedback.trim()}
              >
                Перегенерувати
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Specialist Dialog */}
      <Dialog open={showSpecialistDialog} onOpenChange={setShowSpecialistDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Зв'язатися зі спеціалістом</DialogTitle>
            <DialogDescription>
              Ми використали всі автоматичні спроби. Спеціаліст допоможе створити ідеальну музику для вашої пісні.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-secondary/20 p-4 rounded-lg">
              <p className="text-sm">
                <strong>Ваш запит:</strong> Створення музики для пісні
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Спеціаліст зв'яжеться з вами найближчим часом
              </p>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowSpecialistDialog(false)}
              >
                Продовжити самостійно
              </Button>
              <Button onClick={handleContactSpecialist}>
                Зв'язатися зі спеціалістом
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};