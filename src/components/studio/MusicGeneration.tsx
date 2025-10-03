import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Music, Sparkles, RefreshCw, HeadphonesIcon, Info, TestTube, ArrowRight } from 'lucide-react';
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
  onContinueWithoutSong?: () => void;
}

export const MusicGeneration: React.FC<MusicGenerationProps> = ({
  lyrics,
  onVariantSelected,
  onRequestSpecialist,
  onContinueWithoutSong
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [variants, setVariants] = useState<MusicVariant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<MusicVariant | null>(null);
  const [generationAttempt, setGenerationAttempt] = useState(0);
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
          style: undefined // Auto-detect style for now
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

  const handleRegenerate = async () => {
    if (generationAttempt >= 2) {
      return;
    }
    
    await startGeneration();
  };

  const handleVariantSelect = (variant: MusicVariant) => {
    setSelectedVariant(variant);
    onVariantSelected(variant);
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
              <div className="flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
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

          {/* Info Notice */}
          <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>Автоматичне створення пісень:</strong> У вас є 2 спроби для створення пісні. Ви можете перегенерувати варіанти, якщо результат не той, який ви очікували.
                </p>
                <p className="text-xs text-muted-foreground">
                  Якщо після спроб вам не підійде жоден варіант - не переживайте! Ви можете продовжити створення листівки, а наш спеціаліст зв'яжеться з вами і створить пісню вручну, яка вам точно сподобається.
                </p>
              </div>
            </AlertDescription>
          </Alert>
          
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
            {generationAttempt < 2 ? (
              <Button
                variant="outline"
                onClick={handleRegenerate}
                className="w-full sm:w-auto"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Перегенерувати
              </Button>
            ) : (
              <div className="w-full text-center space-y-3">
                <p className="text-sm font-medium text-muted-foreground">
                  Оберіть один із варіантів вище, або продовжте створення листівки
                </p>
                {onContinueWithoutSong && (
                  <Button
                    onClick={onContinueWithoutSong}
                    className="w-full sm:w-auto sm:min-w-[250px]"
                  >
                    Продовжити далі
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};