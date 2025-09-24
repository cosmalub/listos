import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ArrowRight, Wand2, Loader2, PlayCircle, Edit3, RotateCcw } from 'lucide-react';
import { StyleSelector } from './StyleSelector';
import { ImageUploader } from './ImageUploader';
import { getStylePrompt, type StyleKey } from '@/lib/postcard-styles';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface FrontDesignData {
  mode: 'photo' | 'ai-generation';
  style: StyleKey | null; // only for AI generation
  imageUrl: string | null;
  caption: string;
  prompt: string; // only for AI generation
  imageDescription: string;
}

interface FrontDesignStepProps {
  lyrics: string;
  initialData: FrontDesignData;
  onComplete: (data: FrontDesignData) => void;
  onBack: () => void;
}

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
    imageDescription: '',
    ...initialData
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [selectedSource, setSelectedSource] = useState<'generate' | 'upload'>('generate');

  // Auto-generate caption and description on component load
  useEffect(() => {
    if (lyrics && !designData.caption) {
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
    if (lyrics && designData.caption && !designData.imageDescription) {
      generateImageDescription();
    }
  }, [lyrics, designData.caption]);

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
        setDesignData(prev => ({ 
          ...prev, 
          imageDescription: data.imageDescription,
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

  const generateAutomaticCaption = async (lyrics: string, length: 'short' | 'medium' | 'long' = 'medium'): Promise<string> => {
    try {
      console.log('Generating AI caption...');
      const {
        data,
        error
      } = await supabase.functions.invoke('generate-caption', {
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
      return data.caption || generateFallbackCaption(lyrics);
    } catch (error) {
      console.error('Error generating AI caption, using fallback:', error);
      return generateFallbackCaption(lyrics);
    }
  };

  const generateFallbackCaption = (lyrics: string): string => {
    try {
      const cleanedLyrics = lyrics.replace(/\[.*?\]/g, '').trim();
      const words = cleanedLyrics.toLowerCase().split(/\s+/);
      const loveWords = ['любов', 'кохання', 'серце', 'душа', 'милий', 'мила'];
      const sadWords = ['сумно', 'біль', 'сльози', 'жаль', 'самота'];
      const joyWords = ['радість', 'щастя', 'сміх', 'веселий', 'святкую'];
      const springWords = ['весна', 'квіти', 'зелень', 'природа'];

      if (words.some(word => loveWords.includes(word))) {
        return 'З любов\'ю та теплими почуттями 💕';
      } else if (words.some(word => sadWords.includes(word))) {
        return 'Думаю про тебе... 🤗';
      } else if (words.some(word => joyWords.includes(word))) {
        return 'Ділюся радістю з тобою! ✨';
      } else if (words.some(word => springWords.includes(word))) {
        return 'Весняний настрій для тебе 🌸';
      } else {
        return 'Спеціально для тебе 🎵';
      }
    } catch (error) {
      console.error('Помилка генерації резервного підпису:', error);
      return 'З музикою в серці 🎵';
    }
  };

  const handleModeChange = (mode: 'photo' | 'ai-generation') => {
    setDesignData(prev => ({
      ...prev,
      mode,
      style: mode === 'photo' ? null : prev.style,
      prompt: mode === 'photo' ? '' : prev.prompt
    }));
  };

  const handleStyleSelect = (style: StyleKey) => {
    setDesignData(prev => ({
      ...prev,
      style
    }));

    if (lyrics) {
      const prompt = generatePromptFromLyrics(lyrics, style);
      setDesignData(prev => ({
        ...prev,
        prompt
      }));

      generateAutomaticCaption(lyrics).then(caption => {
        setDesignData(prev => ({
          ...prev,
          caption
        }));
      });
    }
  };

  const handleGenerateImage = async () => {
    if (!designData.style || !designData.prompt) {
      toast.error('Оберіть стиль та введіть опис для генерації');
      return;
    }
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockImageUrl = `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&crop=center`;
      setDesignData(prev => ({
        ...prev,
        imageUrl: mockImageUrl
      }));
      toast.success('Зображення успішно згенеровано!');
    } catch (error) {
      toast.error('Помилка при генерації зображення');
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
        imageUrl
      }));

      const caption = await generateAutomaticCaption(lyrics);
      setDesignData(prev => ({
        ...prev,
        caption
      }));
      toast.success('Зображення успішно завантажено!');
    } catch (error) {
      toast.error('Помилка при завантаженні зображення');
    } finally {
      setIsUploading(false);
    }
  };

  const handleComplete = () => {
    if (!designData.imageUrl || !designData.caption) {
      toast.error('Додайте зображення та підпис');
      return;
    }
    onComplete(designData);
  };

  const isComplete = designData.imageUrl && designData.caption;

  return (
    <div className="space-y-6">
      {/* 1. Source Selection */}
      <div className="space-y-4 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
        <h2 className="text-lg font-semibold">1. Джерело</h2>
        <p className="text-sm text-muted-foreground">
          Можна завантажити фото, додати підпис або просто описати ідею — ми створимо дизайн листівки автоматично
        </p>
        
        <div className="flex gap-3">
          <Button 
            variant={selectedSource === 'upload' ? 'default' : 'outline'}
            onClick={() => setSelectedSource('upload')}
            className="flex-1"
          >
            Завантажити фото
          </Button>
          <span className="self-center text-muted-foreground">або</span>
          <Button 
            variant={selectedSource === 'generate' ? 'default' : 'outline'}
            onClick={() => setSelectedSource('generate')}
            className="flex-1"
          >
            Згенерувати опис
          </Button>
        </div>

        {selectedSource === 'generate' && (
          <div className="space-y-4 mt-6">
            <Textarea 
              placeholder="Опис для генерації зображення буде створено автоматично..."
              value={designData.imageDescription}
              onChange={(e) => setDesignData(prev => ({ ...prev, imageDescription: e.target.value }))}
              className="min-h-[120px] text-sm resize-none"
              disabled={isGeneratingDescription}
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">
                  {designData.imageDescription.split(' ').filter(word => word.length > 0).length}/80 слів
                </span>
                {designData.style && (
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                    Стиль: {designData.style === 'joyful' ? 'Радісний' : designData.style === 'gentle' ? 'Ніжний' : 'Універсальний'}
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={generateImageDescription}
                disabled={isGeneratingDescription || !lyrics || !designData.caption}
                className="h-8 px-3"
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

            {designData.imageDescription && !isGeneratingDescription && (
              <Button 
                onClick={handleGenerateImage} 
                disabled={!designData.style || !designData.prompt || isGenerating} 
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Генерую зображення...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Згенерувати зображення
                  </>
                )}
              </Button>
            )}
          </div>
        )}

        {selectedSource === 'upload' && (
          <div className="mt-6">
            <ImageUploader 
              onImageUpload={handleImageUpload} 
              isUploading={isUploading} 
            />
          </div>
        )}

        {/* Generated/Uploaded Image Display */}
        {designData.imageUrl && (
          <div className="mt-6 pt-6 border-t border-dashed border-muted-foreground/20">
            <h3 className="text-base font-medium mb-4">Попередній перегляд</h3>
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto bg-muted rounded-lg overflow-hidden">
              <img 
                src={designData.imageUrl} 
                alt="Зображення листівки" 
                className="w-full h-full object-cover" 
              />
              {designData.caption && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-3 rounded-lg text-sm">
                  {designData.caption}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. Caption Variants */}
      <div className="space-y-4 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
        <h2 className="text-lg font-semibold">2. Варіанти підпису</h2>
        <p className="text-sm text-muted-foreground">
          Підпис буде розміщено на лицьовій частині листівки
        </p>
        
        <Textarea 
          value={designData.caption} 
          onChange={e => setDesignData(prev => ({
            ...prev,
            caption: e.target.value
          }))} 
          placeholder="Або введіть свій підпис..."
          className="min-h-[80px] text-sm resize-none" 
          disabled={isGeneratingCaption} 
        />
        
        <div className="flex items-center justify-between">
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
            disabled={isGeneratingCaption} 
            size="sm"
            className="h-8 px-3"
          >
            {isGeneratingCaption ? (
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            ) : (
              <RotateCcw className="w-3 h-3 mr-1" />
            )}
            Більше варіантів
          </Button>
        </div>
      </div>

      {/* 3. Your Caption */}
      <div className="space-y-4 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
        <h2 className="text-lg font-semibold">3. Ваш підпис</h2>
        <p className="text-sm text-muted-foreground">
          Підпис буде розміщено в дизайні згенерованої листівки
        </p>
        
        <Textarea 
          value={designData.caption} 
          onChange={e => setDesignData(prev => ({
            ...prev,
            caption: e.target.value
          }))} 
          placeholder="Наприклад: З любов'ю, Марія"
          className="min-h-[60px] text-sm resize-none" 
        />
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="w-auto px-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>
        
        <Button 
          onClick={handleComplete} 
          disabled={!isComplete} 
          className="w-auto px-8"
          size="lg"
        >
          Далі
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}