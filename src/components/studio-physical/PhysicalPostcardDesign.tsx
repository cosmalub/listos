import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Eye, RotateCw } from 'lucide-react';
import { PhysicalFrontDesignStep } from './PhysicalFrontDesignStep';
import { PhysicalInsideDesignStep } from './PhysicalInsideDesignStep';
import {
  PhysicalPostcardPreview,
  PhysicalFrontDesignData,
  PhysicalBackDesignData,
  PhysicalPreviewView
} from './PhysicalPostcardPreview';
import { posthog } from '@/providers/PostHogProvider';

export interface PhysicalPostcardDesignData {
  front: PhysicalFrontDesignData;
  back: PhysicalBackDesignData;
}

interface PhysicalPostcardDesignProps {
  lyrics: string;
  onComplete: (designData: PhysicalPostcardDesignData) => void;
  onBack: () => void;
  chatMessages?: any[];
}

export function PhysicalPostcardDesign({
  lyrics,
  onComplete,
  onBack,
  chatMessages
}: PhysicalPostcardDesignProps) {
  const [currentSubStep, setCurrentSubStep] = useState<'front' | 'inside'>('front');
  const [previewView, setPreviewView] = useState<PhysicalPreviewView>('inside');
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);
  const [designData, setDesignData] = useState<PhysicalPostcardDesignData>({
    front: {
      mode: 'ai-generation',
      style: null,
      imageUrl: null,
      caption: '',
      prompt: '',
      useFrame: false
    },
    back: {
      selectedColor: '',
      personalMessage: ''
    }
  });

  const handleFrontComplete = (frontData: PhysicalFrontDesignData) => {
    setDesignData(prev => ({ ...prev, front: frontData }));
    setCurrentSubStep('inside');
    setPreviewView('inside');
  };

  const handleInsideComplete = (backData: PhysicalBackDesignData) => {
    const finalData: PhysicalPostcardDesignData = { ...designData, back: backData };
    setDesignData(finalData);

    posthog.capture('postcard_completed', {
      postcard_type: 'physical_sound',
      front_mode: finalData.front.mode,
      front_style: finalData.front.style,
      has_frame: finalData.front.useFrame
    });

    onComplete(finalData);
  };

  const isReadyForInside = !!(designData.front.imageUrl && designData.front.caption);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Sub-step progress indicator */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-center">Дизайн фізичної звукової листівки (88 × 166 мм)</CardTitle>
          <div className="flex items-center justify-center space-x-4 text-sm mt-2">
            <div className={`flex items-center space-x-2 ${currentSubStep === 'front' ? 'text-primary font-medium' : isReadyForInside ? 'text-green-600' : 'text-muted-foreground'}`}>
              <div className={`w-3 h-3 rounded-full ${currentSubStep === 'front' ? 'bg-primary' : isReadyForInside ? 'bg-green-600' : 'bg-muted'}`} />
              <span>1. Лицьова обкладинка</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <div className={`flex items-center space-x-2 ${currentSubStep === 'inside' ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
              <div className={`w-3 h-3 rounded-full ${currentSubStep === 'inside' ? 'bg-primary' : 'bg-muted'}`} />
              <span>2. Внутрішній розворот + зворот</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {currentSubStep === 'front' ? (
        <Card>
          <CardContent className="p-6">
            <PhysicalFrontDesignStep
              lyrics={lyrics}
              initialData={designData.front}
              onComplete={handleFrontComplete}
              onBack={onBack}
              chatMessages={chatMessages}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Interactive 3-mode preview (Front / Open Spread / Back) */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <CardTitle className="text-base font-semibold">Превью вашої складаної листівки</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    Перемикайте вигляд, щоб побачити обкладинку, внутрішній розворот та зворотну сторону
                  </p>
                </div>

                {/* View switcher buttons */}
                <div className="flex flex-wrap gap-1.5 bg-muted/60 p-1 rounded-lg">
                  <Button
                    type="button"
                    size="sm"
                    variant={previewView === 'front' ? 'default' : 'ghost'}
                    onClick={() => setPreviewView('front')}
                    className="h-8 text-xs px-3"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1.5" />
                    Обкладинка
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={previewView === 'inside' ? 'default' : 'ghost'}
                    onClick={() => setPreviewView('inside')}
                    className="h-8 text-xs px-3"
                  >
                    <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                    Розворот (всередині)
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={previewView === 'back' ? 'default' : 'ghost'}
                    onClick={() => setPreviewView('back')}
                    className="h-8 text-xs px-3"
                  >
                    <RotateCw className="w-3.5 h-3.5 mr-1.5" />
                    Зворот
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <PhysicalPostcardPreview
                frontData={designData.front}
                backData={designData.back}
                view={previewView}
                size="compact"
                isGeneratingMessage={isGeneratingMessage}
              />
            </CardContent>
          </Card>

          {/* Inside & Back customization form */}
          <Card>
            <CardContent className="p-6">
              <PhysicalInsideDesignStep
                frontDesign={designData.front}
                lyrics={lyrics}
                initialData={designData.back}
                onComplete={handleInsideComplete}
                onBack={() => setCurrentSubStep('front')}
                onDataChange={(newBackData) => setDesignData(prev => ({ ...prev, back: newBackData }))}
                onGeneratingChange={setIsGeneratingMessage}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
