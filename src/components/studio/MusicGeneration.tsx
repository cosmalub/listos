import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Music, Sparkles, RefreshCw, HeadphonesIcon, TestTube, ArrowRight } from 'lucide-react';
import { MusicVariantCard } from './MusicVariantCard';
import { supabase } from '@/integrations/supabase/client';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

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
  const [generationMethod, setGenerationMethod] = useState<'elevenlabs' | 'suno'>('suno');
  const [sunoModel, setSunoModel] = useState<'V3_5' | 'V4' | 'V4_5' | 'V4_5PLUS' | 'V5'>('V5');
  const [analyzedParams, setAnalyzedParams] = useState<any>(null);
  const [pendingTaskId, setPendingTaskId] = useState<string | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  // Load analyzed parameters from sessionStorage
  useEffect(() => {
    const storedParams = sessionStorage.getItem('music-parameters');
    if (storedParams) {
      try {
        const params = JSON.parse(storedParams);
        setAnalyzedParams(params);
        console.log('Loaded analyzed music parameters:', params);
      } catch (error) {
        console.error('Failed to parse stored music parameters:', error);
      }
    }
  }, []);

  // Auto-check pending task status every 10 seconds
  useEffect(() => {
    if (!pendingTaskId) return;

    const checkStatus = async () => {
      setIsCheckingStatus(true);
      try {
        const { data, error } = await supabase.functions.invoke('check-music-status', {
          body: { taskId: pendingTaskId }
        });

        if (error) {
          console.error('Error checking status:', error);
          return;
        }

        if (data.status === 'completed' && data.variants) {
          console.log('Music ready:', data.variants.length, 'variants');
          setVariants(data.variants);
          setPendingTaskId(null);
          setIsTestMode(data.variants?.some((v: MusicVariant) => v.title?.includes('(Test)')) || false);
        }
      } catch (error) {
        console.error('Status check error:', error);
      } finally {
        setIsCheckingStatus(false);
      }
    };

    // Check immediately
    checkStatus();

    // Then check every 10 seconds
    const interval = setInterval(checkStatus, 10000);

    return () => clearInterval(interval);
  }, [pendingTaskId]);

  // Start generation only when both lyrics and analyzedParams are ready
  useEffect(() => {
    if (lyrics && analyzedParams) {
      console.log('Starting generation with lyrics and analyzedParams');
      startGeneration();
    }
  }, [lyrics, analyzedParams]);

  const startGeneration = async () => {
    setIsGenerating(true);
    setVariants([]);
    
    try {
      console.log('Starting music generation with lyrics:', lyrics.substring(0, 100) + '...');
      console.log('Method:', generationMethod, 'Model:', sunoModel);
      console.log('Analyzed params:', analyzedParams);
      
      const functionName = generationMethod === 'suno' ? 'generate-music-suno' : 'generate-music';
      
      // Prepare request body with analyzed parameters
      const requestBody: any = { 
        lyrics: lyrics,
        model: generationMethod === 'suno' ? sunoModel : undefined
      };

      // Add analyzed parameters if available
      if (analyzedParams) {
        requestBody.style = analyzedParams.style;
        requestBody.title = analyzedParams.title;
        requestBody.vocalGender = analyzedParams.vocalGender;
        requestBody.styleWeight = analyzedParams.styleWeight;
        requestBody.weirdnessConstraint = analyzedParams.weirdnessConstraint;
        requestBody.audioWeight = analyzedParams.audioWeight;
        requestBody.negativeTags = analyzedParams.negativeTags;
      }
      
      const response = await supabase.functions.invoke(functionName, {
        body: requestBody
      });

      if (response.error) {
        console.error('Supabase function error:', response.error);
        throw new Error(response.error.message || 'Failed to generate music');
      }

      const data = response.data;

      // Handle 202 status - task is pending
      if (data.status === 'pending' && data.taskId) {
        console.log('Music generation pending, taskId:', data.taskId);
        setPendingTaskId(data.taskId);
        setIsGenerating(false);
        return;
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
    
    // Re-analyze lyrics to get new parameters for variation
    setIsGenerating(true);
    try {
      console.log('Re-analyzing lyrics for regeneration...');
      const { data: analysisData, error: analysisError } = await supabase.functions.invoke('analyze-lyrics-for-music', {
        body: { lyrics }
      });

      if (analysisError) {
        console.error('Analysis error during regeneration:', analysisError);
        // Continue with existing params if analysis fails
      } else if (analysisData) {
        console.log('New parameters from re-analysis:', analysisData);
        setAnalyzedParams(analysisData);
        // Update sessionStorage with new params
        sessionStorage.setItem('music-parameters', JSON.stringify(analysisData));
      }
    } catch (error) {
      console.error('Error during re-analysis:', error);
      // Continue with existing params if analysis fails
    }
    setIsGenerating(false);
    
    // Start generation with new or existing params
    await startGeneration();
  };

  const handleRegenerateWithFeedback = async (feedback: string) => {
    if (generationAttempt >= 2) {
      return;
    }
    
    // Re-analyze lyrics to get new parameters for variation with feedback
    setIsGenerating(true);
    try {
      console.log('Re-analyzing lyrics for regeneration with feedback...');
      const { data: analysisData, error: analysisError } = await supabase.functions.invoke('analyze-lyrics-for-music', {
        body: { lyrics, feedback }
      });

      if (analysisError) {
        console.error('Analysis error during regeneration:', analysisError);
        // Continue with existing params if analysis fails
      } else if (analysisData) {
        console.log('New parameters from re-analysis:', analysisData);
        setAnalyzedParams(analysisData);
        // Update sessionStorage with new params
        sessionStorage.setItem('music-parameters', JSON.stringify(analysisData));
      }
    } catch (error) {
      console.error('Error during re-analysis:', error);
      // Continue with existing params if analysis fails
    }
    setIsGenerating(false);
    
    // Start generation with new or existing params
    await startGeneration();
  };

  const handleVariantSelect = (variant: MusicVariant) => {
    setSelectedVariant(variant);
    onVariantSelected(variant);
  };

  const handleCheckStatus = async () => {
    if (!pendingTaskId) return;

    setIsCheckingStatus(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-music-status', {
        body: { taskId: pendingTaskId }
      });

      if (error) {
        console.error('Error checking status:', error);
        throw new Error(error.message || 'Failed to check status');
      }

      if (data.status === 'pending') {
        console.log('Still pending...');
        return;
      }

      if (data.status === 'completed' && data.variants) {
        console.log('Music ready:', data.variants.length, 'variants');
        setVariants(data.variants);
        setPendingTaskId(null);
        setIsTestMode(data.variants?.some((v: MusicVariant) => v.title?.includes('(Test)')) || false);
      }
    } catch (error) {
      console.error('Status check error:', error);
    } finally {
      setIsCheckingStatus(false);
    }
  };


  // Check if DEV_MODE is enabled by looking for it in window object
  const DEV_MODE = typeof window !== 'undefined' && (window as any).DEV_MODE === true;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Dev Mode: Method Selection */}
      {DEV_MODE && !isGenerating && variants.length === 0 && (
        <Card className="border-orange-200 bg-orange-50/50 dark:bg-orange-950/20">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TestTube className="h-4 w-4" />
              Dev Mode: Music Generation Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Метод генерації</Label>
              <RadioGroup value={generationMethod} onValueChange={(value: 'elevenlabs' | 'suno') => setGenerationMethod(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="suno" id="suno" />
                  <Label htmlFor="suno" className="font-normal cursor-pointer">
                    Suno AI (Рекомендовано) - Краща якість, довші треки
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="elevenlabs" id="elevenlabs" />
                  <Label htmlFor="elevenlabs" className="font-normal cursor-pointer">
                    ElevenLabs - Швидша генерація
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            {generationMethod === 'suno' && (
              <div className="space-y-2">
                <Label>Suno Model</Label>
                <Select value={sunoModel} onValueChange={(value: 'V3_5' | 'V4' | 'V4_5' | 'V4_5PLUS' | 'V5') => setSunoModel(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="V5">V5 - Найкраща якість та швидкість (Рекомендовано)</SelectItem>
                    <SelectItem value="V4_5PLUS">V4.5 PLUS - Багата звучання (макс 8 хв)</SelectItem>
                    <SelectItem value="V4_5">V4.5 - Швидша генерація (макс 8 хв)</SelectItem>
                    <SelectItem value="V4">V4 - Покращений вокал (макс 4 хв)</SelectItem>
                    <SelectItem value="V3_5">V3.5 - Краща структура пісні (макс 4 хв)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Show analyzed parameters in Dev Mode */}
            {analyzedParams && (
              <div className="space-y-2 mt-4 pt-4 border-t border-orange-200">
                <Label className="text-xs font-semibold">Проаналізовані параметри з Claude:</Label>
                <div className="text-xs space-y-1 font-mono bg-background/50 p-3 rounded-md">
                  <div><span className="text-muted-foreground">Стиль:</span> <span className="font-semibold">{analyzedParams.style || 'auto'}</span></div>
                  <div><span className="text-muted-foreground">Назва:</span> <span className="font-semibold">{analyzedParams.title || 'auto'}</span></div>
                  {analyzedParams.vocalGender && (
                    <div><span className="text-muted-foreground">Вокал:</span> <span className="font-semibold">{analyzedParams.vocalGender}</span></div>
                  )}
                  {analyzedParams.styleWeight !== undefined && (
                    <div><span className="text-muted-foreground">Вага стилю:</span> <span className="font-semibold">{analyzedParams.styleWeight}/100</span></div>
                  )}
                  {analyzedParams.weirdnessConstraint !== undefined && (
                    <div><span className="text-muted-foreground">Експериментальність:</span> <span className="font-semibold">{analyzedParams.weirdnessConstraint}/100</span></div>
                  )}
                  {analyzedParams.audioWeight !== undefined && (
                    <div><span className="text-muted-foreground">Баланс вокал/інструменти:</span> <span className="font-semibold">{analyzedParams.audioWeight}/100</span></div>
                  )}
                  {analyzedParams.negativeTags && analyzedParams.negativeTags.length > 0 && (
                    <div><span className="text-muted-foreground">Небажані елементи:</span> <span className="font-semibold">{analyzedParams.negativeTags.join(', ')}</span></div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Generation Status */}
      {isGenerating && (
        <Card className="border-border bg-muted/20">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Loader2 className="h-12 w-12 animate-spin text-foreground" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold">Листосик створює пісню на основі ваших слів...</p>
                <p className="text-sm text-muted-foreground max-w-md">
                  Це займе 1-2 хвилини. Будь ласка, зачекайте — створюємо мелодію та вокал спеціально для вас
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pending Status - Music still generating */}
      {pendingTaskId && !isGenerating && variants.length === 0 && (
        <Card className="border-yellow-200 bg-yellow-50/50 dark:bg-yellow-950/20">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <Music className="h-12 w-12 text-yellow-600 dark:text-yellow-400" />
              <div className="space-y-2">
                <p className="text-lg font-semibold">Музика генерується...</p>
                <p className="text-sm text-muted-foreground max-w-md">
                  Suno AI створює вашу пісню. Це може зайняти 1-2 хвилини.
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Task ID: {pendingTaskId}
              </p>
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
            {generationAttempt < 2 ? (
              <Button
                variant="outline"
                onClick={() => setShowFeedbackDialog(true)}
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

      {/* Feedback Dialog */}
      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Що ви хочете змінити?</DialogTitle>
            <DialogDescription>
              Опишіть, що ви хочете покращити в музиці. Це допоможе нам створити саме те, що вам потрібно.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Швидкий вибір:</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFeedbackText('Більш енергійно і весело')}
                  className="text-xs"
                >
                  Більш енергійно
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFeedbackText('Більш романтично і ніжно')}
                  className="text-xs"
                >
                  Більш романтично
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFeedbackText('Жіночий вокал замість чоловічого')}
                  className="text-xs"
                >
                  Жіночий вокал
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFeedbackText('Чоловічий вокал замість жіночого')}
                  className="text-xs"
                >
                  Чоловічий вокал
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFeedbackText('Повільніше і спокійніше')}
                  className="text-xs"
                >
                  Повільніше
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFeedbackText('Більш акустично, менше інструментів')}
                  className="text-xs"
                >
                  Більш акустично
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback">Або опишіть своїми словами:</Label>
              <Textarea
                id="feedback"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Наприклад: 'Хочу більш веселу мелодію з акустичною гітарою' або 'Зробіть більш емоційно і з жіночим вокалом'"
                className="min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowFeedbackDialog(false);
                setFeedbackText('');
              }}
            >
              Скасувати
            </Button>
            <Button
              onClick={async () => {
                setShowFeedbackDialog(false);
                await handleRegenerateWithFeedback(feedbackText);
                setFeedbackText('');
              }}
              disabled={!feedbackText.trim()}
            >
              Перегенерувати
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};