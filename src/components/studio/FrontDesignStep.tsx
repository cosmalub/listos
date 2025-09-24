import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Wand2, Loader2, RotateCcw, Edit3 } from 'lucide-react';
import { ImageUploader } from './ImageUploader';
import { PostcardPreview } from './PostcardPreview';
import { getStylePrompt, type StyleKey } from '@/lib/postcard-styles';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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

  // Auto-generate caption on component load
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

  // Auto-generate image description after caption is ready
  useEffect(() => {
    if (lyrics && designData.caption && !imageDescription && selectedSource === 'ai-generation') {
      generateImageDescription();
    }
  }, [lyrics, designData.caption, selectedSource]);

  // Switch to preview when image and caption are available
  useEffect(() => {
    if (designData.imageUrl && designData.caption) {
      setCurrentState('preview');
    } else {
      setCurrentState('editing');
    }
  }, [designData.imageUrl, designData.caption]);

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
        imageUrl: mockImageUrl,
        mode: 'ai-generation'
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

  const handleRegenerate = () => {
    setDesignData(prev => ({
      ...prev,
      imageUrl: null
    }));
    setCurrentState('editing');
    if (selectedSource === 'ai-generation') {
      setTimeout(() => handleGenerateImage(), 100);
    }
  };

  const handleEdit = () => {
    setCurrentState('editing');
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
          <Button 
            onClick={handleComplete}
            className="w-full"
            size="lg"
          >
            Перейти на створення зворотної сторони
          </Button>
          
          <div className="flex gap-3">
            {designData.mode === 'ai-generation' && (
              <Button 
                variant="outline"
                onClick={handleRegenerate}
                disabled={isGenerating}
                className="flex-1"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Генерую...
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Перегенерувати
                  </>
                )}
              </Button>
            )}
            
            <Button 
              variant="outline"
              onClick={handleEdit}
              className="flex-1"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Редагувати
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Editing mode - simplified interface
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
            variant={selectedSource === 'photo' ? 'default' : 'outline'}
            onClick={() => setSelectedSource('photo')}
            className="flex-1"
          >
            Завантажити фото
          </Button>
          <span className="self-center text-muted-foreground">або</span>
          <Button 
            variant={selectedSource === 'ai-generation' ? 'default' : 'outline'}
            onClick={() => setSelectedSource('ai-generation')}
            className="flex-1"
          >
            Згенерувати опис
          </Button>
        </div>

        {selectedSource === 'ai-generation' && (
          <div className="space-y-4 mt-6">
            <Textarea 
              placeholder="Опис для генерації зображення буде створено автоматично..."
              value={imageDescription}
              onChange={(e) => setImageDescription(e.target.value)}
              className="min-h-[120px] text-sm resize-none"
              disabled={isGeneratingDescription}
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">
                  {imageDescription?.split(' ').filter(word => word.length > 0).length || 0}/80 слів
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

            {imageDescription && !isGeneratingDescription && (
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
          placeholder="Введіть підпис для листівки..."
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

      {/* Navigation */}
      <div className="flex justify-start pt-4 border-t">
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="w-auto px-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>
      </div>
    </div>
  );
}