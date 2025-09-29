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
  const [currentState, setCurrentState] = useState<ComponentState>('editing');
  const [selectedSource, setSelectedSource] = useState<'ai-generation' | 'photo'>('ai-generation');
  const [imageDescription, setImageDescription] = useState('');
  const [isGeneratingNewVariant, setIsGeneratingNewVariant] = useState(false);
  const [showVariantDescription, setShowVariantDescription] = useState(false);
  const [newVariantDescription, setNewVariantDescription] = useState('');

  // Auto-generate caption and description when AI generation is selected
  useEffect(() => {
    if (lyrics && selectedSource === 'ai-generation' && !designData.caption && !isGeneratingCaption) {
      setIsGeneratingCaption(true);
      generateAutomaticCaption(lyrics, 'medium').then(caption => {
        setDesignData(prev => ({
          ...prev,
          caption
        }));
        setIsGeneratingCaption(false);
      });
    }
  }, [lyrics, selectedSource]);

  // Auto-generate image description after caption is ready
  useEffect(() => {
    if (lyrics && designData.caption && !imageDescription && selectedSource === 'ai-generation' && !isGeneratingDescription) {
      generateImageDescription();
    }
  }, [lyrics, designData.caption, selectedSource]);

  // Switch to preview only when explicitly triggered
  useEffect(() => {
    if (designData.imageUrl && designData.caption && selectedSource === 'ai-generation' && isGenerating === false) {
      // Auto-switch to preview after AI generation completes
      setCurrentState('preview');
    }
  }, [designData.imageUrl, designData.caption, selectedSource, isGenerating]);

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

        {/* Large Postcard Preview */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <PostcardPreview 
              frontData={designData} 
              backData={{
                selectedColor: 'red',
                personalMessage: ''
              }}
              showFront={true}
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

  // Editing mode - simplified interface
  return (
    <div className="space-y-6">
      {/* 1. Source Selection */}
      <div className="space-y-4 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
        <h2 className="text-lg font-semibold">1. Вибір основи</h2>
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

        {selectedSource === 'ai-generation' && (
          <div className="space-y-4 mt-6">
            <Textarea 
              placeholder={isGeneratingDescription ? "⏳ Генерую опис дизайну..." : imageDescription ? "Опис для генерації зображення" : "Опис для генерації зображення буде створено автоматично..."}
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
                    <span className="sm:hidden">Генерую...</span>
                    <span className="hidden sm:inline">Генерую...</span>
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-3 h-3 mr-1" />
                    <span className="sm:hidden">Інший опис</span>
                    <span className="hidden sm:inline">Згенерувати інший опис</span>
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

      {/* 2. Caption for Postcard (simplified) */}
      <div className="space-y-4 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
        <h2 className="text-lg font-semibold">2. Підпис для листівки</h2>
        <p className="text-sm text-muted-foreground">
          Підпис буде розміщено на лицьовій частині листівки
        </p>
        
        <Textarea 
          value={designData.caption} 
          onChange={e => setDesignData(prev => ({
            ...prev,
            caption: e.target.value
          }))} 
          placeholder={isGeneratingCaption ? "⏳ Генерую підпис..." : designData.caption ? "Підпис для листівки" : "Введіть підпис для листівки..."}
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
                <span className="sm:hidden">Генерую...</span>
                <span className="hidden sm:inline">Генерую...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-3 h-3 mr-1" />
                <span className="sm:hidden">Ще варіанти</span>
                <span className="hidden sm:inline">Більше варіантів</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 3. Action Button */}
      {(designData.caption && selectedSource === 'ai-generation' && imageDescription) && (
        <div className="space-y-4 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
          <h2 className="text-lg font-semibold">3. Створення дизайну</h2>
          <p className="text-sm text-muted-foreground">
            Створіть дизайн на основі опису та підпису
          </p>
          
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
                Створити дизайн
              </>
            )}
          </Button>
        </div>
      )}

      {(designData.imageUrl && designData.caption && selectedSource === 'photo') && (
        <div className="space-y-4 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
          <h2 className="text-lg font-semibold">3. Створення дизайну</h2>
          <p className="text-sm text-muted-foreground">
            Створіть лицьову частину листівки з вашим фото та підписом
          </p>
          
          <Button 
            onClick={() => {
              setCurrentState('preview');
            }}
            className="w-full"
            size="lg"
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Створити лицьову частину листівки
          </Button>
        </div>
      )}
    </div>
  );
}