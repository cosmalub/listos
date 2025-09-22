import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ArrowRight, Wand2, Loader2, PlayCircle, Edit3 } from 'lucide-react';
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
      // Резервна генерація підпису на основі ключових слів
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

    // Автоматично генеруємо промпт та підпис при виборі стилю
    if (lyrics) {
      const prompt = generatePromptFromLyrics(lyrics, style);
      setDesignData(prev => ({
        ...prev,
        prompt
      }));

      // Генеруємо підпис
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
      // Mock AI generation - in real app would call OpenAI DALL-E
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock generated image URL
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
      // Mock upload process
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Create object URL for preview
      const imageUrl = URL.createObjectURL(file);
      setDesignData(prev => ({
        ...prev,
        imageUrl
      }));

      // Generate caption for uploaded photo
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
  return <div className="space-y-4 sm:space-y-6">
      <div className="space-y-6 sm:space-y-8">
        <div>
          
          {/* Caption Section - Always visible */}
          <Card className="mb-4 sm:mb-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2">
                <Wand2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Підпис для листівки
              </CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Цей підпис згенерований автоматично на основі вашої пісні, але ви можете його відредагувати за бажанням. Підпис з'явиться на лицьовій частині листівки.
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <Textarea 
                  value={designData.caption} 
                  onChange={e => setDesignData(prev => ({
                    ...prev,
                    caption: e.target.value
                  }))} 
                  placeholder={isGeneratingCaption ? "Генерую підпис..." : "Введіть підпис для листівки..."} 
                  className="min-h-[80px] text-sm resize-none" 
                  disabled={isGeneratingCaption} 
                />
                
                <Button 
                  variant="outline" 
                  onClick={async () => {
                    setIsGeneratingCaption(true);
                    try {
                      const caption = await generateAutomaticCaption(lyrics, 'medium');
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
                  className="w-full sm:w-auto"
                >
                  {isGeneratingCaption ? <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Генерую підпис...
                    </> : <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Згенерувати заново
                    </>}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Design Creation - Unified Card */}
          <Card className="mb-4 sm:mb-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium">Створення дизайну лицьової частини</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Оберіть, як створити зображення для лицьової частини листівки:
              </p>
            </CardHeader>
            <CardContent className="pt-0 space-y-6">
              {/* Mode Selection */}
              <div>
                <Tabs value={designData.mode} onValueChange={value => handleModeChange(value as 'photo' | 'ai-generation')}>
                  <TabsList className="grid w-full grid-cols-2 h-10 sm:h-11">
                    <TabsTrigger value="ai-generation" className="text-xs sm:text-sm px-1 sm:px-2">
                      <span className="hidden sm:inline">Згенерований дизайн</span>
                      <span className="sm:hidden">ШІ дизайн</span>
                    </TabsTrigger>
                    <TabsTrigger value="photo" className="text-xs sm:text-sm px-1 sm:px-2">
                      <span className="hidden sm:inline">Власне фото</span>
                      <span className="sm:hidden">Ваше фото</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="mt-3 text-xs text-muted-foreground space-y-1">
                  {designData.mode === 'ai-generation' ? 
                    <p className="leading-relaxed">Штучний інтелект створить унікальне зображення на основі вашої пісні. Ви зможете обрати стиль, а потім ШІ згенерує красиву листівку, що відповідає настрою пісні.</p> : 
                    <p className="leading-relaxed">Завантажте власну фотографію з вашого пристрою. Це може бути будь-яке зображення, яке ви хочете використати як основу для листівки.</p>
                  }
                </div>
              </div>

              {/* AI Generation Mode Content */}
              {designData.mode === 'ai-generation' ? (
                <>
                  {/* Style Selection */}
                  <div className="border-t pt-6">
                    <div className="mb-4 space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground block">1. Оберіть стиль</Label>
                      <p className="text-xs text-muted-foreground">
                        Кожен стиль створений для певних випадків та настроїв
                      </p>
                    </div>
                    
                    <StyleSelector selectedStyle={designData.style} onStyleSelect={handleStyleSelect} />
                  </div>

                  {/* Image Generation */}
                  {designData.style && (
                    <div className="border-t pt-6">
                      <Label className="text-sm font-medium text-muted-foreground mb-4 block">2. Генерація зображення</Label>
                      <div className="space-y-4">
                        <Button 
                          onClick={handleGenerateImage} 
                          disabled={!designData.style || !designData.prompt || isGenerating} 
                          className="w-full"
                          size="lg"
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Створюю лицьову частину...
                            </>
                          ) : (
                            <>
                              <Wand2 className="w-4 h-4 mr-2" />
                              Створити лицьову частину
                            </>
                          )}
                        </Button>
                        
                        {designData.imageUrl && (
                          <div className="mt-4 p-3 sm:p-4 border rounded-lg bg-muted/30">
                            <img 
                              src={designData.imageUrl} 
                              alt="Згенерована листівка" 
                              className="w-full max-w-sm mx-auto rounded-lg shadow-sm" 
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Photo Upload Mode Content */
                <div className="border-t pt-6">
                  <Label className="text-sm font-medium text-muted-foreground mb-4 block">Завантажити фотографію</Label>
                  <ImageUploader onImageUpload={handleImageUpload} isUploading={isUploading} />
                  
                  {designData.imageUrl && (
                    <div className="mt-4 p-3 sm:p-4 border rounded-lg bg-muted/30">
                      <img 
                        src={designData.imageUrl} 
                        alt="Завантажене фото" 
                        className="w-full max-w-sm mx-auto rounded-lg shadow-sm" 
                      />
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Continue Button */}
        <div className="flex justify-end pt-4 border-t">
          <Button 
            onClick={handleComplete} 
            disabled={!isComplete} 
            size="lg" 
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            Далі до зворотної сторони
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>;
}