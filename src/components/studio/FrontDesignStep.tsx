import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ArrowRight, Wand2, Loader2 } from 'lucide-react';
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
}

interface FrontDesignStepProps {
  lyrics: string;
  initialData: FrontDesignData;
  onComplete: (data: FrontDesignData) => void;
  onBack: () => void;
}

export function FrontDesignStep({ lyrics, initialData, onComplete, onBack }: FrontDesignStepProps) {
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

  // Auto-generate caption on component load
  useEffect(() => {
    if (lyrics && !designData.caption) {
      setIsGeneratingCaption(true);
      generateAutomaticCaption(lyrics, 'medium').then(caption => {
        setDesignData(prev => ({ ...prev, caption }));
        setIsGeneratingCaption(false);
      });
    }
  }, [lyrics]);

  const generatePromptFromLyrics = (lyrics: string, style: StyleKey): string => {
    const stylePrompt = getStylePrompt(style, lyrics);
    const cleanedLyrics = lyrics.replace(/\[.*?\]/g, '').trim();
    const firstLines = cleanedLyrics.split('\n').slice(0, 4).join(' ');
    
    return `${stylePrompt}. Зміст пісні: "${firstLines}". Створи красиву листівку в стилі ${style} що відображає настрій та тематику цієї пісні.`;
  };

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

      return data.caption || generateFallbackCaption(lyrics);
    } catch (error) {
      console.error('Error generating AI caption, using fallback:', error);
      return generateFallbackCaption(lyrics);
    }
  };

  const generateFallbackCaption = (lyrics: string): string => {
    try {
      // Fallback keyword-based caption generation
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
      console.error('Error generating fallback caption:', error);
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
    setDesignData(prev => ({ ...prev, style }));
    
    // Auto-generate prompt and caption when style is selected
    if (lyrics) {
      const prompt = generatePromptFromLyrics(lyrics, style);
      setDesignData(prev => ({ ...prev, prompt }));
      
      // Generate caption
      generateAutomaticCaption(lyrics).then(caption => {
        setDesignData(prev => ({ ...prev, caption }));
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
      // Mock AI generation - in real app would call OpenAI DALL-E
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock generated image URL
      const mockImageUrl = `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&crop=center`;
      
      setDesignData(prev => ({ ...prev, imageUrl: mockImageUrl }));
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
      // Mock upload process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create object URL for preview
      const imageUrl = URL.createObjectURL(file);
      setDesignData(prev => ({ ...prev, imageUrl }));
      
      // Generate caption for uploaded photo
      const caption = await generateAutomaticCaption(lyrics);
      setDesignData(prev => ({ ...prev, caption }));
      
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
      <div className="space-y-8">
        <div>
          
          {/* Caption Section - Always visible */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-primary" />
                Підпис для листівки
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Ця підпис згенерована автоматично на основі вашої пісні, але ви можете її відредагувати за бажанням. Підпис з'явиться на лицьовій частині листівки.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Textarea
                  value={designData.caption}
                  onChange={(e) => setDesignData(prev => ({ ...prev, caption: e.target.value }))}
                  placeholder={isGeneratingCaption ? "Генерую підпис..." : "Введіть підпис для листівки..."}
                  className="min-h-[80px]"
                  disabled={isGeneratingCaption}
                />
                
                <Button
                  variant="outline"
                  onClick={async () => {
                    setIsGeneratingCaption(true);
                    try {
                      const caption = await generateAutomaticCaption(lyrics, 'medium');
                      setDesignData(prev => ({ ...prev, caption }));
                      toast.success('Підпис згенеровано!');
                    } catch (error) {
                      toast.error('Помилка при генерації підпису');
                    } finally {
                      setIsGeneratingCaption(false);
                    }
                  }}
                  disabled={isGeneratingCaption}
                  size="sm"
                >
                  {isGeneratingCaption ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Генерую підпис...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Згенерувати заново
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Mode Selection */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base font-medium">Режим створення</CardTitle>
              <p className="text-sm text-muted-foreground">
                Оберіть як створити зображення для лицьової частини листівки:
              </p>
            </CardHeader>
            <CardContent>
              <Tabs value={designData.mode} onValueChange={(value) => handleModeChange(value as 'photo' | 'ai-generation')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="ai-generation" className="text-sm">
                    AI Генерація
                  </TabsTrigger>
                  <TabsTrigger value="photo" className="text-sm">
                    Завантажити фото
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="mt-3 text-xs text-muted-foreground space-y-1">
                {designData.mode === 'ai-generation' ? (
                  <p>Штучний інтелект створить унікальне зображення на основі вашої пісні. Ви зможете обрати стиль, а потім ШІ згенерує красиву листівку що відповідає настрою пісні.</p>
                ) : (
                  <p>Завантажте власну фотографію з вашого пристрою. Це може бути будь-яке зображення, яке ви хочете використати як основу для листівки.</p>
                )}
              </div>
            </CardContent>
          </Card>

          {designData.mode === 'ai-generation' ? (
            <>
              {/* Style Selection */}
              <div className="mb-8">
                <Label className="text-lg font-semibold mb-4 block">1. Оберіть стиль</Label>
                <StyleSelector
                  selectedStyle={designData.style}
                  onStyleSelect={handleStyleSelect}
                />
              </div>

              {/* Image Generation */}
              {designData.style && (
                <div className="mb-8">
                  <Label className="text-lg font-semibold mb-4 block">2. Генерація зображення</Label>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="prompt" className="text-sm font-medium mb-2 block">
                        Опис для генерації (автоматично створений на основі пісні)
                      </Label>
                      <Textarea
                        id="prompt"
                        value={designData.prompt}
                        onChange={(e) => setDesignData(prev => ({ ...prev, prompt: e.target.value }))}
                        placeholder="Опишіть, що ви хочете бачити на листівці..."
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleGenerateImage}
                      disabled={!designData.style || !designData.prompt || isGenerating}
                      className="w-full"
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
                    
                    {designData.imageUrl && (
                      <div className="mt-4 p-4 border rounded-lg">
                        <img 
                          src={designData.imageUrl} 
                          alt="Generated postcard" 
                          className="w-full max-w-md mx-auto rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

            </>
          ) : (
            <>
              {/* Photo Upload */}
              <div className="mb-8">
                <Label className="text-lg font-semibold mb-4 block">Завантажити фотографію</Label>
                <ImageUploader
                  onImageUpload={handleImageUpload}
                  isUploading={isUploading}
                />
              </div>

            </>
          )}
        </div>

        {/* Continue Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleComplete}
            disabled={!isComplete}
            size="lg"
            className="flex items-center gap-2"
          >
            Далі до зворотної сторони
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}