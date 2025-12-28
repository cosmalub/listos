import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Wand2, Loader2, RotateCcw, ArrowRight, Heart, Gift, MessageCircle, Info, RefreshCw, Image as ImageIcon } from 'lucide-react';
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
  useFrame?: boolean;
}

interface UserContext {
  occasion?: string;
  recipient?: {
    name?: string;
    relationship?: string;
  };
  sender?: {
    name?: string;
  };
  conversationSummary?: string;
}

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

interface FrontDesignStepProps {
  lyrics: string;
  initialData: FrontDesignData;
  onComplete: (data: FrontDesignData) => void;
  onBack: () => void;
  pageData?: {
    occasion?: string;
    recipient?: string;
    sender?: string;
  };
  chatMessages?: any[];
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
  onBack,
  pageData,
  chatMessages
}: FrontDesignStepProps) {
  const [designData, setDesignData] = useState<FrontDesignData>({
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
  const [currentState, setCurrentState] = useState<ComponentState>('editing');
  const [selectedSource, setSelectedSource] = useState<'ai-generation' | 'photo'>('ai-generation');
  const [imageDescription, setImageDescription] = useState('');
  const [isGeneratingNewVariant, setIsGeneratingNewVariant] = useState(false);
  const [showVariantDescription, setShowVariantDescription] = useState(false);
  const [newVariantDescription, setNewVariantDescription] = useState('');
  const [generationProgress, setGenerationProgress] = useState(0);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [songImagery, setSongImagery] = useState<SongImagery | null>(null);
  const [isExtractingImagery, setIsExtractingImagery] = useState(false);
  const pollingIntervalRef = useRef<number | null>(null);

  // Extract song imagery first (before caption)
  useEffect(() => {
    if (lyrics && !songImagery && !isExtractingImagery) {
      extractSongImagery();
    }
  }, [lyrics]);

  // Auto-generate caption for both modes (AI and photo)
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

  // Auto-generate image description after caption and imagery are ready
  useEffect(() => {
    if (lyrics && designData.caption && songImagery && !imageDescription && selectedSource === 'ai-generation' && !isGeneratingDescription) {
      generateImageDescription();
    }
  }, [lyrics, designData.caption, songImagery, selectedSource]);

  // Switch to preview when image and caption are ready (only for AI generation)
  useEffect(() => {
    if (designData.imageUrl && designData.caption && selectedSource === 'ai-generation' && isGenerating === false) {
      setCurrentState('preview');
    }
  }, [designData.imageUrl, designData.caption, selectedSource, isGenerating]);

  // Build user context from available data
  const buildUserContext = (): UserContext => {
    const context: UserContext = {};

    if (pageData?.occasion) {
      context.occasion = pageData.occasion;
    }

    if (pageData?.recipient) {
      context.recipient = {
        name: pageData.recipient,
        relationship: detectRelationship(pageData.recipient, chatMessages)
      };
    }

    if (pageData?.sender) {
      context.sender = {
        name: pageData.sender
      };
    }

    // Extract summary from chat messages
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

  // Detect relationship from recipient name or chat
  const detectRelationship = (recipient: string, messages?: any[]): string | undefined => {
    const lowerRecipient = recipient.toLowerCase();

    const relationships = [
      'мама', 'тато', 'бабуся', 'дідусь', 'сестра', 'брат',
      'дружина', 'чоловік', 'кохана', 'коханий', 'друг', 'подруга'
    ];

    for (const rel of relationships) {
      if (lowerRecipient.includes(rel)) {
        return rel;
      }
    }

    // Try to find in chat messages
    if (messages) {
      const allText = messages.map((m: any) => m.content).join(' ').toLowerCase();
      for (const rel of relationships) {
        if (allText.includes(rel)) {
          return rel;
        }
      }
    }

    return undefined;
  };

  // Extract song imagery from lyrics
  const extractSongImagery = async () => {
    if (!lyrics) return;

    setIsExtractingImagery(true);
    try {
      console.log('Extracting song imagery from lyrics...');

      const userContext = buildUserContext();

      const { data, error } = await supabase.functions.invoke('extract-song-imagery', {
        body: {
          lyrics: lyrics,
          userContext: userContext
        }
      });

      if (error) {
        console.error('Error extracting song imagery:', error);
        return;
      }

      if (data?.imagery) {
        console.log('Extracted song imagery:', data.imagery);
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
      console.log('Generating personalized image description');

      const userContext = buildUserContext();
      console.log('User context:', userContext);

      const { data, error } = await supabase.functions.invoke('generate-image-description', {
        body: {
          lyrics: lyrics,
          caption: designData.caption,
          userContext: userContext,
          songImagery: songImagery
        }
      });

      if (error) {
        console.error('Error generating image description:', error);
        return;
      }

      if (data?.imageDescription) {
        console.log('Generated personalized description:', data.imageDescription);
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
    setGenerationProgress(0);

    try {
      console.log('Creating postcard generation task with:', {
        caption: designData.caption,
        imageDescription: imageDescription.substring(0, 100),
        style: designData.style,
        hasUserContext: !!pageData
      });

      // Build user context for personalization
      const userContext = buildUserContext();

      // Step 1: Create the task
      const { data: taskData, error: taskError } = await supabase.functions.invoke('create-postcard-task', {
        body: {
          caption: designData.caption,
          imageDescription: imageDescription,
          style: designData.style,
          userContext: userContext,
          songImagery: songImagery
        }
      });

      if (taskError || !taskData?.taskId) {
        console.error('Error creating postcard task:', taskError);
        throw new Error(taskError?.message || 'Помилка створення задачі генерації');
      }

      const taskId = taskData.taskId;
      setCurrentTaskId(taskId);
      console.log('Task created with ID:', taskId);
      toast.info('Генерація розпочата...');

      // Step 2: Poll for completion
      await pollForCompletion(taskId);

    } catch (error) {
      console.error('Failed to generate postcard image:', error);
      toast.error('Помилка при генерації зображення: ' + error.message);
      setIsGenerating(false);
      setGenerationProgress(0);
      setCurrentTaskId(null);
    }
  };

  const pollForCompletion = async (taskId: string) => {
    let attempts = 0;
    const maxAttempts = 60; // 2 minutes max (2s * 60)

    const checkStatus = async () => {
      attempts++;
      console.log(`Polling attempt ${attempts}/${maxAttempts}...`);

      try {
        const { data, error } = await supabase.functions.invoke('check-postcard-status', {
          body: { taskId }
        });

        if (error) {
          throw new Error(error.message || 'Помилка перевірки статусу');
        }

        if (data.status === 'completed' && data.imageUrl) {
          // Success!
          console.log('Image generation completed!');
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
          setCurrentTaskId(null);
          return;
        }

        if (data.status === 'failed') {
          throw new Error(data.error || 'Генерація зображення не вдалася');
        }

        // Still generating - update progress
        const progress = Math.min(5 + (attempts * 1.5), 95);
        setGenerationProgress(progress);

        if (attempts >= maxAttempts) {
          throw new Error('Час очікування вичерпано. Спробуйте ще раз.');
        }
      } catch (error) {
        console.error('Polling error:', error);
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
        }
        setIsGenerating(false);
        setGenerationProgress(0);
        setCurrentTaskId(null);
        toast.error('Помилка: ' + error.message);
      }
    };

    // Start polling every 2 seconds
    pollingIntervalRef.current = window.setInterval(checkStatus, 2000);
    // Check immediately
    checkStatus();
  };

  // Cleanup polling on unmount
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

      const userContext = buildUserContext();

      const { data, error } = await supabase.functions.invoke('generate-image-description', {
        body: {
          lyrics: lyrics,
          caption: designData.caption,
          userContext: userContext,
          songImagery: songImagery
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

              {/* Alternative: switch to photo upload */}
              <div className="border-t pt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowVariantDescription(false);
                    setDesignData(prev => ({
                      ...prev,
                      imageUrl: '',
                      mode: undefined,
                      prompt: '',
                      style: undefined
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

        {/* Frame toggle for photo mode */}
        {designData.mode === 'photo' && (
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
            <div className="flex-1">
              <p className="font-medium text-sm">Святкова рамка</p>
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

        {/* Action buttons */}
        <div className="space-y-3">
          {designData.mode === 'photo' && (
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
      {/* 1. Caption for Postcard */}
      <div className="space-y-4 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
        <h2 className="text-lg font-semibold">1. Підпис для листівки</h2>
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

      {/* 2. Source Selection */}
      <div className="space-y-4 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
        <h2 className="text-lg font-semibold">2. Вибір основи</h2>
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

      {/* 3. Action Button */}
      {(designData.caption && selectedSource === 'ai-generation' && imageDescription) && (
        <div className="space-y-4 border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
          <h2 className="text-lg font-semibold">3. Створення дизайну</h2>
          <p className="text-sm text-muted-foreground">
            Створіть дизайн на основі опису та підпису
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