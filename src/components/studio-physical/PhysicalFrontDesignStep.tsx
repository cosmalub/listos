import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Wand2, Loader2, RotateCcw, ArrowRight, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { ImageUploader } from '@/components/studio/ImageUploader';
import { PhysicalPostcardPreview, PhysicalFrontDesignData } from './PhysicalPostcardPreview';
import { getStylePrompt, type StyleKey } from '@/lib/postcard-styles';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface SongImagery {
  directImages?: string[];
  metaphors?: string[];
  colorMood?: string;
  atmosphere?: string;
  timeContext?: string;
  personalObjects?: string[];
  relationship?: string;
  emotionalCore?: string;
}

interface PhysicalFrontDesignStepProps {
  lyrics: string;
  initialData: PhysicalFrontDesignData;
  onComplete: (data: PhysicalFrontDesignData) => void;
  onBack: () => void;
  chatMessages?: any[];
}

type ComponentState = 'editing' | 'preview';

const selectStyleFromDescription = (description: string): StyleKey => {
  const lowerDesc = description.toLowerCase();
  const joyfulKeywords = ['свято', 'радість', 'яскравий', 'веселий', 'енергійний', 'святкування', 'смішний'];
  const gentleKeywords = ['ніжний', 'делікатний', 'м\'який', 'спокійний', 'теплий', 'романтичний', 'любов'];

  if (joyfulKeywords.some(keyword => lowerDesc.includes(keyword))) {
    return 'joyful';
  } else if (gentleKeywords.some(keyword => lowerDesc.includes(keyword))) {
    return 'gentle';
  }
  return 'universal';
};

export function PhysicalFrontDesignStep({
  lyrics,
  initialData,
  onComplete,
  chatMessages
}: PhysicalFrontDesignStepProps) {
  const [designData, setDesignData] = useState<PhysicalFrontDesignData>({
    mode: 'ai-generation',
    style: null,
    imageUrl: null,
    caption: '',
    prompt: '',
    useFrame: false,
    ...initialData
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [currentState, setCurrentState] = useState<ComponentState>(
    initialData.imageUrl && initialData.caption ? 'preview' : 'editing'
  );
  const [selectedSource, setSelectedSource] = useState<'ai-generation' | 'photo'>(
    initialData.mode || 'ai-generation'
  );
  const [imageDescription, setImageDescription] = useState('');
  const [isGeneratingNewVariant, setIsGeneratingNewVariant] = useState(false);
  const [showVariantDescription, setShowVariantDescription] = useState(false);
  const [newVariantDescription, setNewVariantDescription] = useState('');
  const [generationProgress, setGenerationProgress] = useState(0);
  const [songImagery, setSongImagery] = useState<SongImagery | null>(null);
  const [isExtractingImagery, setIsExtractingImagery] = useState(false);
  const pollingIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (lyrics && !songImagery && !isExtractingImagery) {
      extractSongImagery();
    }
  }, [lyrics]);

  useEffect(() => {
    if (lyrics && !designData.caption && !isGeneratingCaption) {
      setIsGeneratingCaption(true);
      generateAutomaticCaption(lyrics, 'medium').then(caption => {
        setDesignData(prev => ({
          ...prev,
          caption
        }));
        setIsGeneratingCaption(false);
      });
    }
  }, [lyrics]);

  useEffect(() => {
    if (lyrics && designData.caption && songImagery && !imageDescription && selectedSource === 'ai-generation' && !isGeneratingDescription) {
      generateImageDescription();
    }
  }, [lyrics, designData.caption, songImagery, selectedSource]);

  useEffect(() => {
    if (designData.imageUrl && designData.caption && selectedSource === 'ai-generation' && isGenerating === false) {
      setCurrentState('preview');
    }
  }, [designData.imageUrl, designData.caption, selectedSource, isGenerating]);

  const buildUserContext = () => {
    const context: Record<string, any> = {};
    if (chatMessages && chatMessages.length > 0) {
      const userMessages = chatMessages
        .filter((m: any) => m.sender === 'user')
        .map((m: any) => m.content)
        .slice(0, 3)
        .join(' ');
      if (userMessages.length > 0) {
        context.conversationSummary = userMessages.substring(0, 200);
      }
    }
    return context;
  };

  const extractSongImagery = async () => {
    if (!lyrics) return;
    setIsExtractingImagery(true);
    try {
      const userContext = buildUserContext();
      const { data, error } = await supabase.functions.invoke('extract-song-imagery', {
        body: { lyrics, userContext }
      });
      if (!error && data?.imagery) {
        setSongImagery(data.imagery);
      }
    } catch (error) {
      console.error('Failed to extract song imagery:', error);
    } finally {
      setIsExtractingImagery(false);
    }
  };

  const generateImageDescription = async () => {
    if (!lyrics || !designData.caption) return;
    setIsGeneratingDescription(true);
    try {
      const userContext = buildUserContext();
      const { data, error } = await supabase.functions.invoke('generate-image-description', {
        body: {
          lyrics,
          caption: designData.caption,
          userContext,
          songImagery
        }
      });
      if (!error && data?.imageDescription) {
        const autoStyle = selectStyleFromDescription(data.imageDescription);
        setImageDescription(data.imageDescription);
        setDesignData(prev => ({
          ...prev,
          style: autoStyle,
          prompt: generatePromptFromLyrics(lyrics, autoStyle)
        }));
      }
    } catch (error) {
      console.error('Failed to generate image description:', error);
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  const generatePromptFromLyrics = (lyricsText: string, style: StyleKey): string => {
    const stylePrompt = getStylePrompt(style, lyricsText);
    const cleanedLyrics = lyricsText.replace(/\[.*?\]/g, '').trim();
    const firstLines = cleanedLyrics.split('\n').slice(0, 4).join(' ');
    return `${stylePrompt}. Зміст пісні: "${firstLines}". Створи красиву вертикальну листівку (88x166 мм) в стилі ${style}, що відображає настрій та тематику цієї пісні.`;
  };

  const stripEmojis = (text: string) =>
    text.replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, '').replace(/\s+/g, ' ').trim();

  const generateAutomaticCaption = async (lyricsText: string, length: 'short' | 'medium' | 'long' = 'medium'): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-caption', {
        body: { lyrics: lyricsText, style: designData.style, length }
      });
      if (error) throw error;
      const aiCaption = data?.caption ? stripEmojis(String(data.caption)) : '';
      return aiCaption || generateFallbackCaption(lyricsText);
    } catch {
      return generateFallbackCaption(lyricsText);
    }
  };

  const generateFallbackCaption = (lyricsText: string): string => {
    const cleaned = lyricsText.replace(/\[.*?\]/g, '').trim().toLowerCase();
    if (['любов', 'кохання', 'серце', 'коханий', 'кохана'].some(w => cleaned.includes(w))) {
      return 'Ти — моє кохання назавжди';
    }
    if (['радість', 'щастя', 'святк', 'народження'].some(w => cleaned.includes(w))) {
      return 'Щастя поруч з тобою';
    }
    return 'Від щирого серця для тебе';
  };

  const handleGenerateImage = async () => {
    if (!designData.caption || !imageDescription || !designData.style) {
      toast.error('Потрібні підпис, опис дизайну та стиль для генерації');
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      const userContext = buildUserContext();
      const { data: taskData, error: taskError } = await supabase.functions.invoke('create-postcard-task', {
        body: {
          caption: designData.caption,
          imageDescription,
          style: designData.style,
          userContext,
          songImagery
        }
      });

      if (taskError || !taskData?.taskId) {
        throw new Error(taskError?.message || 'Помилка створення задачі генерації');
      }

      toast.info('Генерація розпочата...');
      await pollForCompletion(taskData.taskId);
    } catch (error: any) {
      toast.error('Помилка при генерації зображення: ' + (error?.message || 'Невідома помилка'));
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  const pollForCompletion = async (taskId: string) => {
    let attempts = 0;
    const maxAttempts = 60;

    const checkStatus = async () => {
      attempts++;
      try {
        const { data, error } = await supabase.functions.invoke('check-postcard-status', {
          body: { taskId }
        });

        if (error) throw new Error(error.message || 'Помилка перевірки статусу');

        if (data.status === 'completed' && data.imageUrl) {
          setDesignData(prev => ({
            ...prev,
            imageUrl: data.imageUrl,
            mode: 'ai-generation'
          }));
          setGenerationProgress(100);
          toast.success('Зображення успішно згенеровано!');

          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
          }
          setIsGenerating(false);
          return;
        }

        if (data.status === 'failed') {
          throw new Error(data.error || 'Генерація зображення не вдалася');
        }

        const progress = Math.min(5 + attempts * 1.5, 95);
        setGenerationProgress(progress);

        if (attempts >= maxAttempts) {
          throw new Error('Час очікування вичерпано. Спробуйте ще раз.');
        }
      } catch (error: any) {
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
        }
        setIsGenerating(false);
        setGenerationProgress(0);
        toast.error('Помилка: ' + (error?.message || 'Невідома помилка'));
      }
    };

    pollingIntervalRef.current = window.setInterval(checkStatus, 2000);
    checkStatus();
  };

  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const imageUrl = URL.createObjectURL(file);
      setDesignData(prev => ({
        ...prev,
        imageUrl,
        mode: 'photo'
      }));
      toast.success('Зображення успішно завантажено!');
    } catch {
      toast.error('Помилка при завантаженні зображення');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateVariant = async () => {
    setIsGeneratingNewVariant(true);
    try {
      const userContext = buildUserContext();
      const { data, error } = await supabase.functions.invoke('generate-image-description', {
        body: {
          lyrics,
          caption: designData.caption,
          userContext,
          songImagery
        }
      });

      if (error) {
        toast.error('Помилка при генерації нового варіанту');
        return;
      }

      if (data?.imageDescription) {
        setNewVariantDescription(data.imageDescription);
        setShowVariantDescription(true);
        toast.success('Новий варіант опису готовий!');
      }
    } catch {
      toast.error('Помилка при генерації нового варіанту');
    } finally {
      setIsGeneratingNewVariant(false);
    }
  };

  const handleAcceptVariant = () => {
    const autoStyle = selectStyleFromDescription(newVariantDescription);
    setImageDescription(newVariantDescription);
    setDesignData(prev => ({
      ...prev,
      style: autoStyle,
      prompt: generatePromptFromLyrics(lyrics, autoStyle),
      imageUrl: null
    }));
    setShowVariantDescription(false);
    setCurrentState('editing');
    setTimeout(() => handleGenerateImage(), 100);
  };

  const handleComplete = () => {
    if (!designData.imageUrl || !designData.caption) {
      toast.error('Додайте зображення та підпис');
      return;
    }
    onComplete(designData);
  };

  if (currentState === 'preview') {
    return (
      <div className="space-y-6">
        {showVariantDescription && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
            <h3 className="font-medium">Новий варіант опису:</h3>
            <div className="p-3 bg-background rounded border text-sm">
              {newVariantDescription}
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={handleCreateVariant} size="sm" disabled={isGeneratingNewVariant}>
                  {isGeneratingNewVariant ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                      Генерую...
                    </>
                  ) : (
                    'Перегенерувати опис'
                  )}
                </Button>
                <Button onClick={handleAcceptVariant} size="sm">
                  Утвердити і згенерувати
                </Button>
              </div>
              <div className="border-t pt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowVariantDescription(false);
                    setDesignData(prev => ({
                      ...prev,
                      imageUrl: null,
                      mode: 'photo',
                      prompt: '',
                      style: null
                    }));
                    setCurrentState('editing');
                    setSelectedSource('photo');
                  }}
                  className="w-full text-muted-foreground hover:text-foreground"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Або завантажити своє фото замість AI
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Physical Postcard Preview (88x166mm ratio) */}
        <div className="flex justify-center">
          <PhysicalPostcardPreview
            frontData={designData}
            backData={{ selectedColor: '#E8B878', personalMessage: '' }}
            view="front"
            size="large"
          />
        </div>

        {designData.mode === 'photo' && (
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
            <div className="flex-1">
              <p className="font-medium text-sm">Додати рамку</p>
              <p className="text-xs text-muted-foreground">
                Надає листівці класичного, урочистого вигляду
              </p>
            </div>
            <Switch
              checked={designData.useFrame || false}
              onCheckedChange={(checked) =>
                setDesignData(prev => ({ ...prev, useFrame: checked }))
              }
            />
          </div>
        )}

        <div className="space-y-3">
          {designData.mode === 'photo' && (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setDesignData(prev => ({ ...prev, imageUrl: null }));
                  setCurrentState('editing');
                }}
                className="w-full"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Змінити фото
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setDesignData(prev => ({
                    ...prev,
                    imageUrl: null,
                    mode: 'ai-generation',
                  }));
                  setSelectedSource('ai-generation');
                  setCurrentState('editing');
                }}
                className="w-full text-muted-foreground hover:text-foreground"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Або згенерувати AI замість фото
              </Button>
            </>
          )}

          {designData.mode === 'ai-generation' && (
            <Button
              variant="outline"
              onClick={handleCreateVariant}
              disabled={isGeneratingNewVariant}
              className="w-full"
            >
              {isGeneratingNewVariant ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Генерую новий варіант...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Створити інший варіант
                </>
              )}
            </Button>
          )}

          <Button
            onClick={handleComplete}
            className="w-full text-sm sm:text-base"
            size="lg"
          >
            <span>Далі: розворот та привітання</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Caption for Postcard */}
      <div className="space-y-4 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
        <h2 className="text-lg font-semibold">1. Підпис для обкладинки</h2>
        <p className="text-sm text-muted-foreground">
          Підпис буде розміщено на лицьовій обкладинці фізичної листівки (формат 88 × 166 мм)
        </p>

        <Textarea
          value={designData.caption}
          onChange={e => setDesignData(prev => ({
            ...prev,
            caption: e.target.value
          }))}
          placeholder={isGeneratingCaption ? "⏳ Генерую підпис..." : "Введіть підпис для обкладинки..."}
          className="min-h-[80px] text-sm resize-none"
          disabled={isGeneratingCaption}
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span className="text-xs text-muted-foreground">
            {designData.caption ? `${designData.caption.length}/80 символів` : '0/80 символів'}
          </span>
          <Button
            variant="ghost"
            onClick={async () => {
              setIsGeneratingCaption(true);
              try {
                const caption = await generateAutomaticCaption(lyrics, 'short');
                setDesignData(prev => ({ ...prev, caption }));
                toast.success('Підпис згенеровано!');
              } catch {
                toast.error('Помилка при генерації підпису');
              } finally {
                setIsGeneratingCaption(false);
              }
            }}
            disabled={isGeneratingCaption || !lyrics}
            className="h-8 px-3 w-full sm:w-auto"
          >
            {isGeneratingCaption ? (
              <>
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                Генерую...
              </>
            ) : (
              <>
                <Wand2 className="w-3 h-3 mr-1" />
                Більше варіантів
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 2. Source Selection */}
      <div className="space-y-4 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
        <h2 className="text-lg font-semibold">2. Вибір основи обкладинки</h2>
        <p className="text-sm text-muted-foreground">
          Лицьова частина може бути створена на основі вашого фото або згенерованого дизайну під вашу пісню
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant={selectedSource === 'photo' ? 'default' : 'outline'}
            onClick={() => setSelectedSource('photo')}
            className="flex-1 min-h-[44px]"
          >
            Завантажити фото
          </Button>
          <span className="self-center text-muted-foreground text-sm">або</span>
          <Button
            variant={selectedSource === 'ai-generation' ? 'default' : 'outline'}
            onClick={() => setSelectedSource('ai-generation')}
            className="flex-1 min-h-[44px]"
          >
            Згенерувати дизайн
          </Button>
        </div>

        {selectedSource === 'ai-generation' && (
          <div className="space-y-4 mt-6">
            <Textarea
              placeholder={isGeneratingDescription ? "⏳ Генерую опис дизайну..." : "Опис для генерації зображення..."}
              value={imageDescription}
              onChange={(e) => setImageDescription(e.target.value)}
              className="min-h-[120px] text-sm resize-none"
              disabled={isGeneratingDescription}
            />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="text-xs text-muted-foreground">
                {imageDescription?.split(' ').filter(word => word.length > 0).length || 0}/80 слів
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={generateImageDescription}
                disabled={isGeneratingDescription || !lyrics || !designData.caption}
                className="h-8 px-3 w-full sm:w-auto"
              >
                {isGeneratingDescription ? (
                  <>
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                    Генерую...
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Згенерувати інший опис
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {selectedSource === 'photo' && (
          <div className="mt-6">
            <ImageUploader
              onImageUpload={handleImageUpload}
              isUploading={isUploading}
            />
          </div>
        )}
      </div>

      {/* 3. Action Button */}
      {(designData.caption && selectedSource === 'ai-generation' && imageDescription) && (
        <div className="space-y-4 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
          <h2 className="text-lg font-semibold">3. Створення обкладинки</h2>
          <p className="text-sm text-muted-foreground">
            Створіть ілюстрацію обкладинки на основі опису та підпису
          </p>

          {isGenerating && generationProgress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Генерація зображення...</span>
                <span className="font-medium">{Math.round(generationProgress)}%</span>
              </div>
              <Progress value={generationProgress} className="h-2" />
              <p className="text-xs text-muted-foreground text-center">
                Це може зайняти до 2 хвилин. Будь ласка, зачекайте.
              </p>
            </div>
          )}

          <Button
            onClick={handleGenerateImage}
            disabled={!designData.style || !designData.prompt || isGenerating}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Створюю дизайн...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Створити обкладинку
              </>
            )}
          </Button>
        </div>
      )}

      {(designData.imageUrl && designData.caption && selectedSource === 'photo') && (
        <div className="space-y-4 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
          <h2 className="text-lg font-semibold">3. Створення обкладинки</h2>
          <p className="text-sm text-muted-foreground">
            Перегляньте готову лицьову обкладинку з вашим фото та підписом
          </p>

          <Button
            onClick={() => setCurrentState('preview')}
            className="w-full text-sm sm:text-base"
            size="lg"
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Переглянути лицьову частину
          </Button>
        </div>
      )}
    </div>
  );
}
