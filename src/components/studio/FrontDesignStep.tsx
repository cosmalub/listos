import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ArrowLeft, Wand2, Loader2, RotateCcw, ArrowRight, Heart, Gift, MessageCircle, Info, RefreshCw } from 'lucide-react';
import { ImageUploader } from './ImageUploader';
import { PostcardPreview } from './PostcardPreview';
import { getStylePrompt, type StyleKey, POSTCARD_STYLES } from '@/lib/postcard-styles';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface FrontDesignData {
  mode: 'photo' | 'ai-generation';
  style: StyleKey | null;
  imageUrl: string | null;
  caption: string;
  prompt: string;
}

interface FrontDesignStepProps {
  lyrics: string;
  initialData: FrontDesignData;
  onComplete: (data: FrontDesignData) => void;
  onBack: () => void;
}

type ComponentState = 'editing' | 'preview';

const styleIcons = {
  joyful: Gift,
  gentle: Heart,
  universal: MessageCircle
};

const styleGradients = {
  joyful: 'from-orange-100 to-pink-100',
  gentle: 'from-blue-50 to-purple-50',
  universal: 'from-green-50 to-blue-50'
};

const StyleTooltip = ({ style }: { style: StyleKey }) => {
  const styleData = POSTCARD_STYLES[style];
  const Icon = styleIcons[style];
  
  return (
    <div className={cn(
      "w-72 sm:w-80 p-4 rounded-lg bg-gradient-to-br relative overflow-hidden border shadow-lg",
      styleGradients[style]
    )}>
      <div className="relative space-y-3">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 p-2 rounded-full bg-primary text-primary-foreground">
            <Icon className="w-4 h-4" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-medium text-foreground">
              {styleData.name}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {styleData.description}
            </p>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {styleData.occasionsText}
          </p>
        </div>
      </div>
    </div>
  );
};

// Auto-select style based on description content
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

export function FrontDesignStep({
  lyrics,
  initialData,
  onComplete,
  onBack
}: FrontDesignStepProps) {
  const [designData, setDesignData] = useState<FrontDesignData>({
    mode: 'ai-generation',
    style: null,
    imageUrl: null,
    caption: '',
    prompt: '',
    ...initialData
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [currentStep, setCurrentStep] = useState<'caption' | 'source' | 'design'>('caption');
  const [currentState, setCurrentState] = useState<ComponentState>('editing');
  const [selectedSource, setSelectedSource] = useState<'ai-generation' | 'photo'>('ai-generation');
  const [imageDescription, setImageDescription] = useState('');
  const [isGeneratingNewVariant, setIsGeneratingNewVariant] = useState(false);
  const [showVariantDescription, setShowVariantDescription] = useState(false);
  const [newVariantDescription, setNewVariantDescription] = useState('');

  // Auto-generate caption on mount
  useEffect(() => {
    if (lyrics && !designData.caption && !isGeneratingCaption && currentStep === 'caption') {
      setIsGeneratingCaption(true);
      generateAutomaticCaption(lyrics, 'medium').then(caption => {
        setDesignData(prev => ({
          ...prev,
          caption
        }));
        setIsGeneratingCaption(false);
      });
    }
  }, [lyrics, currentStep]);

  // Auto-generate image description when moving to design step with AI mode
  useEffect(() => {
    if (lyrics && designData.caption && !imageDescription && selectedSource === 'ai-generation' && currentStep === 'design' && !isGeneratingDescription) {
      generateImageDescription();
    }
  }, [currentStep, selectedSource, designData.caption]);

  // Switch to preview only when explicitly triggered
  useEffect(() => {
    if (designData.imageUrl && designData.caption && selectedSource === 'ai-generation' && isGenerating === false && currentStep === 'design') {
      // Auto-switch to preview after AI generation completes
      setCurrentState('preview');
    }
  }, [designData.imageUrl, designData.caption, selectedSource, isGenerating, currentStep]);

  const generateImageDescription = async () => {
    if (!lyrics || !designData.caption) return;
    
    setIsGeneratingDescription(true);
    try {
      console.log('Generating image description for lyrics and caption');
      
      const { data, error } = await supabase.functions.invoke('generate-image-description', {
        body: { 
          lyrics: lyrics,
          caption: designData.caption
        }
      });

      if (error) {
        console.error('Error generating image description:', error);
        return;
      }

      if (data?.imageDescription) {
        console.log('Generated image description:', data.imageDescription);
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

  const generatePromptFromLyrics = (lyrics: string, style: StyleKey): string => {
    const stylePrompt = getStylePrompt(style, lyrics);
    const cleanedLyrics = lyrics.replace(/\[.*?\]/g, '').trim();
    const firstLines = cleanedLyrics.split('\n').slice(0, 4).join(' ');
    return `${stylePrompt}. Зміст пісні: "${firstLines}". Створи красиву листівку в стилі ${style} що відображає настрій та тематику цієї пісні.`;
  };

  const stripEmojis = (text: string) => text.replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, '').replace(/\s+/g, ' ').trim();

  const generateAutomaticCaption = async (lyrics: string, length: 'short' | 'medium' | 'long' = 'medium'): Promise<string> => {
    try {
      console.log('Generating AI caption...');
      const { data, error } = await supabase.functions.invoke('generate-caption', {
        body: {
          lyrics,
          style: designData.style,
          length
        }
      });
      if (error) {
        console.error('Caption generation error:', error);
        throw error;
      }
      const aiCaption = data?.caption ? stripEmojis(String(data.caption)) : '';
      if (!aiCaption) {
        const fb = generateFallbackCaption(lyrics, true);
        return fb;
      }
      return aiCaption;
    } catch (error) {
      console.error('Error generating AI caption, using fallback:', error);
      return generateFallbackCaption(lyrics, true);
    }
  };

  const generateFallbackCaption = (lyrics: string, notify: boolean = false): string => {
    try {
      const cleanedLyrics = lyrics.replace(/\[.*?\]/g, '').trim().toLowerCase();
      const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

      const loveWords = ['любов', 'кохання', 'серце', 'душа', 'коханий', 'кохана'];
      const sadWords = ['сум', 'біль', 'сльози', 'жаль', 'самота'];
      const joyWords = ['радість', 'щастя', 'сміх', 'весел', 'святк'];
      const springWords = ['весна', 'квіти', 'квіт', 'зелень', 'природа'];

      let result: string;
      if (joyWords.some(word => cleanedLyrics.includes(word))) {
        result = pick(['Ділюся радістю з тобою', 'Щастя поруч з тобою', 'Святкуємо разом']);
      } else if (loveWords.some(word => cleanedLyrics.includes(word))) {
        result = pick(['З любов’ю і теплом', 'Від щирого серця для тебе', 'З любов’ю для тебе']);
      } else if (springWords.some(word => cleanedLyrics.includes(word))) {
        result = pick(['Весняний настрій для тебе', 'Ніжність весни для тебе', 'Квітучий настрій для тебе']);
      } else if (sadWords.some(word => cleanedLyrics.includes(word))) {
        result = pick(['Поруч у думках', 'Думаю про тебе', 'Світла підтримка для тебе']);
      } else {
        result = pick(['З найкращими побажаннями', 'Від щирого серця', 'Для тебе з турботою', 'Нехай мрії збуваються']);
      }

      if (notify) {
        toast.info('Підпис згенеровано локально');
      }
      return result;
    } catch (error) {
      console.error('Помилка генерації резервного підпису:', error);
      if (notify) toast.info('Підпис згенеровано локально');
      return 'З найкращими побажаннями';
    }
  };

  const handleGenerateImage = async () => {
    if (!designData.caption || !imageDescription || !designData.style) {
      toast.error('Потрібні підпис, опис дизайну та стиль для генерації');
      return;
    }
    
    setIsGenerating(true);
    try {
      console.log('Generating postcard image with:', {
        caption: designData.caption,
        imageDescription: imageDescription.substring(0, 100),
        style: designData.style
      });

      const { data, error } = await supabase.functions.invoke('generate-postcard-image', {
        body: {
          caption: designData.caption,
          imageDescription: imageDescription,
          style: designData.style
        }
      });

      if (error) {
        console.error('Error generating postcard image:', error);
        throw new Error(error.message || 'Помилка генерації зображення');
      }

      if (data?.imageUrl) {
        setDesignData(prev => ({
          ...prev,
          imageUrl: data.imageUrl,
          prompt: data.prompt || prev.prompt,
          mode: 'ai-generation'
        }));
        toast.success('Зображення успішно згенеровано!');
        console.log('Generated image URL:', data.imageUrl);
      } else {
        throw new Error('Не отримано URL зображення');
      }
    } catch (error) {
      console.error('Failed to generate postcard image:', error);
      toast.error('Помилка при генерації зображення: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const imageUrl = URL.createObjectURL(file);
      setDesignData(prev => ({
        ...prev,
        imageUrl,
        mode: 'photo'
      }));
      toast.success('Зображення успішно завантажено!');
    } catch (error) {
      toast.error('Помилка при завантаженні зображення');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateVariant = async () => {
    setIsGeneratingNewVariant(true);
    try {
      console.log('Generating new variant description for lyrics');
      
      const { data, error } = await supabase.functions.invoke('generate-image-description', {
        body: { 
          lyrics: lyrics,
          caption: designData.caption
        }
      });

      if (error) {
        console.error('Error generating new variant description:', error);
        toast.error('Помилка при генерації нового варіанту');
        return;
      }

      if (data?.imageDescription) {
        console.log('Generated new variant description:', data.imageDescription);
        setNewVariantDescription(data.imageDescription);
        setShowVariantDescription(true);
        toast.success('Новий варіант опису готовий!');
      }
    } catch (error) {
      console.error('Failed to generate new variant description:', error);
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

  const handleRejectVariant = () => {
    setShowVariantDescription(false);
    setNewVariantDescription('');
  };


  const handleComplete = () => {
    if (!designData.imageUrl || !designData.caption) {
      toast.error('Додайте зображення та підпис');
      return;
    }
    onComplete(designData);
  };

  // Preview mode - show large postcard with action buttons
  if (currentState === 'preview') {
    return (
      <div className="space-y-6">
        {/* Variant Description Modal */}
        {showVariantDescription && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
            <h3 className="font-medium">Новий варіант опису:</h3>
            <div className="p-3 bg-background rounded border text-sm">
              {newVariantDescription}
            </div>
            <div className="flex gap-3">
              <Button onClick={handleAcceptVariant} size="sm">
                Утвердити і згенерувати
              </Button>
              <Button variant="outline" onClick={handleRejectVariant} size="sm">
                Відхилити
              </Button>
              <Button variant="outline" onClick={handleCreateVariant} size="sm" disabled={isGeneratingNewVariant}>
                {isGeneratingNewVariant ? (
                  <>
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                    Генерую...
                  </>
                ) : (
                  'Ще варіант'
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Postcard Preview */}
        <div className="flex justify-center">
          <div className="w-full max-w-xs">
            <PostcardPreview 
              frontData={designData} 
              backData={{
                selectedColor: 'red',
                personalMessage: ''
              }}
              showFront={true}
              size="compact"
            />
          </div>
        </div>

         {/* Action buttons */}
        <div className="space-y-3">
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
            className="w-full"
            size="lg"
          >
            Перейти на створення зворотної сторони
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  // Editing mode with 3-step flow
  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium",
          currentStep === 'caption' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}>
          1
        </div>
        <div className={cn("h-0.5 w-12", currentStep !== 'caption' ? "bg-primary" : "bg-muted")} />
        <div className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium",
          currentStep === 'source' ? "bg-primary text-primary-foreground" : currentStep === 'design' ? "bg-muted text-muted-foreground" : "bg-muted text-muted-foreground"
        )}>
          2
        </div>
        <div className={cn("h-0.5 w-12", currentStep === 'design' ? "bg-primary" : "bg-muted")} />
        <div className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium",
          currentStep === 'design' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}>
          3
        </div>
      </div>

      {/* Step 1: Caption */}
      {currentStep === 'caption' && (
        <div className="space-y-6">
          <div className="space-y-4 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
            <h2 className="text-lg font-semibold">Крок 1: Підпис для листівки</h2>
            <p className="text-sm text-muted-foreground">
              Підпис буде розміщено на лицьовій частині листівки. Він підходить як для фото, так і для згенерованого дизайну.
            </p>
            
            <Textarea 
              value={designData.caption} 
              onChange={e => setDesignData(prev => ({
                ...prev,
                caption: e.target.value
              }))} 
              placeholder={isGeneratingCaption ? "⏳ Генерую підпис..." : "Введіть підпис для листівки..."}
              className="min-h-[100px] text-sm resize-none" 
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
                    setDesignData(prev => ({
                      ...prev,
                      caption
                    }));
                    toast.success('Підпис згенеровано!');
                  } catch (error) {
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
                    Регенерувати підпис
                  </>
                )}
              </Button>
            </div>
          </div>

          <Button 
            onClick={() => setCurrentStep('source')}
            disabled={!designData.caption}
            className="w-full"
            size="lg"
          >
            Далі
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {/* Step 2: Source Selection */}
      {currentStep === 'source' && (
        <div className="space-y-6">
          {/* Show caption at top */}
          {designData.caption && (
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="text-xs text-muted-foreground mb-1">Підпис:</p>
              <p className="text-sm font-medium">{designData.caption}</p>
            </div>
          )}

          <div className="space-y-4 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
            <h2 className="text-lg font-semibold">Крок 2: Вибір основи</h2>
            <p className="text-sm text-muted-foreground">
              Лицьова частина листівки може бути створена на основі вашого фото або згенерованого дизайну під вашу пісню
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant={selectedSource === 'photo' ? 'default' : 'outline'}
                onClick={() => setSelectedSource('photo')}
                className="flex-1 min-h-[44px]"
              >
                <span className="sm:hidden">Фото</span>
                <span className="hidden sm:inline">Завантажити фото</span>
              </Button>
              <span className="self-center text-muted-foreground text-sm">або</span>
              <Button 
                variant={selectedSource === 'ai-generation' ? 'default' : 'outline'}
                onClick={() => setSelectedSource('ai-generation')}
                className="flex-1 min-h-[44px]"
              >
                <span className="sm:hidden">Дизайн</span>
                <span className="hidden sm:inline">Згенерувати дизайн</span>
              </Button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline"
              onClick={() => setCurrentStep('caption')}
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
            <Button 
              onClick={() => setCurrentStep('design')}
              className="flex-1"
              size="lg"
            >
              Далі
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Design Creation */}
      {currentStep === 'design' && (
        <div className="space-y-6">
          {/* Show caption at top */}
          {designData.caption && (
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="text-xs text-muted-foreground mb-1">Підпис:</p>
              <p className="text-sm font-medium">{designData.caption}</p>
            </div>
          )}

          {selectedSource === 'ai-generation' && (
            <div className="space-y-4 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
              <h2 className="text-lg font-semibold">Крок 3: Створення дизайну</h2>
              <p className="text-sm text-muted-foreground">
                Опис для генерації дизайну створюється на основі вашої пісні та підпису
              </p>

              <Textarea 
                placeholder={isGeneratingDescription ? "⏳ Генерую опис дизайну..." : "Опис для генерації зображення"}
                value={imageDescription}
                onChange={(e) => setImageDescription(e.target.value)}
                className="min-h-[120px] text-sm resize-none"
                disabled={isGeneratingDescription}
              />
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <span className="text-xs text-muted-foreground">
                    {imageDescription?.split(' ').filter(word => word.length > 0).length || 0}/80 слів
                  </span>
                  {designData.style && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="flex items-center gap-1 text-xs px-2 py-1 bg-primary/10 text-primary rounded cursor-pointer hover:bg-primary/20 transition-colors w-fit">
                          <span>
                            Стиль: {designData.style === 'joyful' ? 'Радісний' : designData.style === 'gentle' ? 'Ніжний' : 'Універсальний'}
                          </span>
                          <Info className="w-3 h-3" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent side="top" className="p-0 w-auto">
                        <StyleTooltip style={designData.style} />
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
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
                      Інший опис
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {selectedSource === 'photo' && (
            <div className="space-y-4 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
              <h2 className="text-lg font-semibold">Крок 3: Завантаження фото</h2>
              <p className="text-sm text-muted-foreground">
                Завантажте фото для лицьової частини листівки
              </p>
              
              <ImageUploader 
                onImageUpload={handleImageUpload} 
                isUploading={isUploading} 
              />
            </div>
          )}

          <div className="flex gap-3">
            <Button 
              variant="outline"
              onClick={() => setCurrentStep('source')}
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
            
            {selectedSource === 'ai-generation' && (
              <Button 
                onClick={handleGenerateImage} 
                disabled={!designData.style || !designData.prompt || isGenerating} 
                className="flex-1"
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
                    Створити дизайн
                  </>
                )}
              </Button>
            )}

            {selectedSource === 'photo' && designData.imageUrl && (
              <Button 
                onClick={() => setCurrentState('preview')}
                className="flex-1"
                size="lg"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Створити лицьову частину
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}