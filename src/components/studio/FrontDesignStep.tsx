import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, Upload, Wand2, RefreshCw } from 'lucide-react';
import { StyleSelector } from './StyleSelector';
import { ColorPalette } from './ColorPalette';
import { ImageUploader } from './ImageUploader';
import { getAllStyles, getStylePrompt, type StyleKey } from '@/lib/postcard-styles';
import { toast } from 'sonner';

interface FrontDesignData {
  style: StyleKey | null;
  colors: string[];
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

export function FrontDesignStep({ lyrics, initialData, onComplete, onBack }: FrontDesignStepProps) {
  const [designData, setDesignData] = useState<FrontDesignData>(initialData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [generationMode, setGenerationMode] = useState<'ai' | 'upload'>('ai');

  // Generate automatic prompt based on lyrics and style
  const generatePromptFromLyrics = (style: StyleKey, lyrics: string): string => {
    // Extract key themes and emotions from lyrics (simplified)
    const lyricsLower = lyrics.toLowerCase();
    
    // Basic sentiment analysis
    const themes = [];
    if (lyricsLower.includes('любов') || lyricsLower.includes('любл') || lyricsLower.includes('серц')) themes.push('любов');
    if (lyricsLower.includes('сум') || lyricsLower.includes('плак') || lyricsLower.includes('біль')) themes.push('сум');
    if (lyricsLower.includes('радіст') || lyricsLower.includes('щаст') || lyricsLower.includes('сміх')) themes.push('радість');
    if (lyricsLower.includes('мрі') || lyricsLower.includes('надій') || lyricsLower.includes('майбутн')) themes.push('надія');
    if (lyricsLower.includes('природ') || lyricsLower.includes('квіт') || lyricsLower.includes('небо')) themes.push('природа');
    
    // Generate basic prompt based on themes
    let basePrompt = '';
    if (themes.includes('любов')) {
      basePrompt = 'Romantic scene with warm colors, hearts, gentle lighting';
    } else if (themes.includes('природа')) {
      basePrompt = 'Beautiful natural landscape with flowers, trees, peaceful atmosphere';
    } else if (themes.includes('радість')) {
      basePrompt = 'Joyful celebration with bright colors, festive elements';
    } else if (themes.includes('сум')) {
      basePrompt = 'Melancholic but beautiful scene with soft, muted tones';
    } else {
      basePrompt = 'Beautiful artistic composition with harmonious colors';
    }
    
    return basePrompt;
  };

  const generateAutomaticCaption = (lyrics: string): string => {
    // Extract first meaningful line or generate based on content
    const lines = lyrics.split('\n').filter(line => line.trim().length > 0);
    const firstLine = lines[0]?.trim();
    
    if (firstLine && firstLine.length <= 50) {
      return firstLine;
    }
    
    // Generate generic captions
    const captions = [
      'З любов\'ю',
      'Від щирого серця',
      'Для тебе з теплом',
      'Назавжди в серці',
      'З найкращими побажаннями'
    ];
    
    return captions[Math.floor(Math.random() * captions.length)];
  };

  const handleStyleSelect = (style: StyleKey) => {
    const autoPrompt = generatePromptFromLyrics(style, lyrics);
    const autoCaption = designData.caption || generateAutomaticCaption(lyrics);
    
    setDesignData(prev => ({
      ...prev,
      style,
      prompt: autoPrompt,
      caption: autoCaption
    }));
  };

  const handleColorSelect = (colors: string[]) => {
    setDesignData(prev => ({ ...prev, colors }));
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
      toast.success('Зображення успішно завантажено!');
    } catch (error) {
      toast.error('Помилка при завантаженні зображення');
    } finally {
      setIsUploading(false);
    }
  };

  const handleComplete = () => {
    if (!designData.style || !designData.imageUrl) {
      toast.error('Оберіть стиль та додайте зображення');
      return;
    }
    onComplete(designData);
  };

  const isComplete = designData.style && designData.imageUrl;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Назад
        </Button>
        <h2 className="text-xl font-semibold">Лицьова частина листівки</h2>
        <div></div>
      </div>

      {/* Style Selection */}
      <Card>
        <CardHeader>
          <CardTitle>1. Оберіть стиль</CardTitle>
        </CardHeader>
        <CardContent>
          <StyleSelector 
            selectedStyle={designData.style}
            onStyleSelect={handleStyleSelect}
          />
        </CardContent>
      </Card>

      {/* Color Palette */}
      {designData.style && (
        <Card>
          <CardHeader>
            <CardTitle>2. Налаштування кольорів</CardTitle>
          </CardHeader>
          <CardContent>
            <ColorPalette
              style={designData.style}
              selectedColors={designData.colors}
              onColorSelect={handleColorSelect}
            />
          </CardContent>
        </Card>
      )}

      {/* Image Generation/Upload */}
      {designData.style && (
        <Card>
          <CardHeader>
            <CardTitle>3. Додати зображення</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Mode selector */}
            <div className="flex gap-2">
              <Button
                variant={generationMode === 'ai' ? 'default' : 'outline'}
                onClick={() => setGenerationMode('ai')}
                className="flex-1"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Генерувати
              </Button>
              <Button
                variant={generationMode === 'upload' ? 'default' : 'outline'}
                onClick={() => setGenerationMode('upload')}
                className="flex-1"
              >
                <Upload className="w-4 h-4 mr-2" />
                Завантажити
              </Button>
            </div>

            {generationMode === 'ai' ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="prompt">Опис зображення</Label>
                  <Textarea
                    id="prompt"
                    value={designData.prompt}
                    onChange={(e) => setDesignData(prev => ({ ...prev, prompt: e.target.value }))}
                    placeholder="Опишіть що ви хочете бачити на листівці..."
                    rows={3}
                  />
                </div>
                <Button
                  onClick={handleGenerateImage}
                  disabled={isGenerating || !designData.prompt}
                  className="w-full"
                >
                  {isGenerating ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Wand2 className="w-4 h-4 mr-2" />
                  )}
                  {isGenerating ? 'Генерую...' : 'Згенерувати зображення'}
                </Button>
              </div>
            ) : (
              <ImageUploader
                onImageUpload={handleImageUpload}
                isUploading={isUploading}
              />
            )}
          </CardContent>
        </Card>
      )}

      {/* Caption */}
      {designData.imageUrl && (
        <Card>
          <CardHeader>
            <CardTitle>4. Підпис на листівці</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="caption">Текст підпису</Label>
              <Input
                id="caption"
                value={designData.caption}
                onChange={(e) => setDesignData(prev => ({ ...prev, caption: e.target.value }))}
                placeholder="Наприклад: З любов'ю..."
                maxLength={100}
              />
              <p className="text-sm text-muted-foreground mt-1">
                {designData.caption.length}/100 символів
              </p>
            </div>
          </CardContent>
        </Card>
      )}

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
  );
}