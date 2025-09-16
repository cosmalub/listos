import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Music, Sparkles, RefreshCw, HeadphonesIcon, UserCheck, Info, TestTube } from 'lucide-react';
import { MusicVariantCard } from './MusicVariantCard';
import { supabase } from '@/integrations/supabase/client';

interface MusicVariant {
  id: string;
  title: string;
  description: string;
  audioUrl?: string;
  duration?: number;
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
  const [isTestMode, setIsTestMode] = useState(false);

  useEffect(() => {
    if (lyrics) {
      startGeneration();
    }
  }, [lyrics]);

  const startGeneration = async () => {
    setIsGenerating(true);
    setVariants([]);
    
    try {
      console.log('Starting music generation with lyrics:', lyrics.substring(0, 100) + '...');
      
      const { data, error } = await supabase.functions.invoke('generate-music', {
        body: { 
          lyrics: lyrics,
          style: undefined, // Auto-detect style for now
          userFeedback: generationAttempt > 0 ? feedback : undefined
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to generate music');
      }

      if (!data.success) {
        console.error('Music generation failed:', data.error);
        throw new Error(data.error || 'Failed to generate music');
      }

      console.log('Music generation successful:', data.variants?.length || 0, 'variants');
      setVariants(data.variants || []);
      
      // Check if any variant has "Test" in title to detect test mode
      setIsTestMode(data.variants?.some((v: MusicVariant) => v.title?.includes('(Test)')) || false);
      
    } catch (error) {
      console.error('Music generation error:', error);
      setVariants([]);
    } finally {
      setIsGenerating(false);
      setGenerationAttempt(prev => prev + 1);
    }
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
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Generation Status */}
      {isGenerating && (
        <Card className="border-border bg-muted/20">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Loader2 className="h-12 w-12 animate-spin text-foreground" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold">Аналізуємо ваші слова...</p>
                <p className="text-sm text-muted-foreground max-w-md">
                  Наша ШІ аналізує текст, визначає стать вокаліста та генерує варіанти з вокалом
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span>Генерація варіантів з вокалом • Спроба {generationAttempt + 1} з 2</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Variants Display */}
      {variants.length > 0 && !isGenerating && (
        <div className="space-y-4 animate-fade-in">
          {isTestMode && (
            <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
              <TestTube className="h-4 w-4" />
              <AlertDescription>
                <strong>Тестовий режим:</strong> Генерується 1 варіант з вокалом тривалістю 60 секунд для економії кредитів під час тестування.
              </AlertDescription>
            </Alert>
          )}
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">Оберіть один варіант, щоб продовжити:</p>
            <p className="text-sm text-muted-foreground">
              Спроба {generationAttempt} з 2 {isTestMode ? '• Тестовий режим' : ''}
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