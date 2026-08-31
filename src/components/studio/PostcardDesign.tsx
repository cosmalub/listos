import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { FrontDesignStep } from './FrontDesignStep';
import { BackDesignStep } from './BackDesignStep';
import { PostcardPreview } from './PostcardPreview';
import { SoundCardPreviewWithControls } from './SoundCardPreview';
import type { StyleKey } from '@/lib/postcard-styles';
import { posthog } from '@/providers/PostHogProvider';
import type { ProductFormat } from '@/lib/product-format';

interface PostcardDesignData {
  front: {
    mode: 'photo' | 'ai-generation';
    style: StyleKey | null;
    imageUrl: string | null;
    caption: string;
    prompt: string;
    imageDescription: string;
    useFrame?: boolean;
  };
  back: {
    selectedColor: string;
    personalMessage: string;
  };
}

interface PostcardDesignProps {
  lyrics: string;
  onComplete: (designData: PostcardDesignData) => void;
  onBack: () => void;
  pageData?: {
    occasion?: string;
    recipient?: string;
    sender?: string;
  };
  chatMessages?: any[];
  productFormat?: ProductFormat;
}

export function PostcardDesign({ lyrics, onComplete, onBack, pageData, chatMessages, productFormat = 'qr' }: PostcardDesignProps) {
  const [currentSubStep, setCurrentSubStep] = useState<'front' | 'back'>('front');
  const [previewShowFront, setPreviewShowFront] = useState(false);
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);
  const [designData, setDesignData] = useState<PostcardDesignData>({
    front: {
      mode: 'ai-generation',
      style: null,
      imageUrl: null,
      caption: '',
      prompt: '',
      imageDescription: '',
      useFrame: false
    },
    back: {
      selectedColor: '',
      personalMessage: ''
    }
  });

  const handleFrontComplete = (frontData: PostcardDesignData['front']) => {
    setDesignData(prev => ({ ...prev, front: frontData }));
    setCurrentSubStep('back');
  };

  const handleBackComplete = (backData: PostcardDesignData['back']) => {
    const finalData = { ...designData, back: backData };
    setDesignData(finalData);
    
    // Трекаємо завершення дизайну листівки
    posthog.capture('postcard_completed', {
      front_mode: finalData.front.mode,
      front_style: finalData.front.style,
      has_frame: finalData.front.useFrame,
      product_format: productFormat,
    });
    
    onComplete(finalData);
  };

  const handleBackToFront = () => {
    setCurrentSubStep('front');
  };

  const isReadyForBack = designData.front.imageUrl && designData.front.caption;

  const isSound = productFormat === 'sound';

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Progress indicator */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-center">
            {isSound ? 'Оформлення листівки' : 'Дизайн листівки'}
          </CardTitle>
          {isSound && (
            <p className="text-sm text-center text-muted-foreground mt-2">
              Ви робите листівку, яка заграє пісню, щойно її відкриють. Зараз — обкладинка, далі — текст усередині.
            </p>
          )}
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className={`flex items-center space-x-2 ${currentSubStep === 'front' ? 'text-primary' : isReadyForBack ? 'text-success' : 'text-muted-foreground'}`}>
              <div className={`w-3 h-3 rounded-full ${currentSubStep === 'front' ? 'bg-primary' : isReadyForBack ? 'bg-success' : 'bg-muted'}`} />
              <span>{isSound ? 'Обкладинка' : 'Лицьова частина'}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <div className={`flex items-center space-x-2 ${currentSubStep === 'back' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-3 h-3 rounded-full ${currentSubStep === 'back' ? 'bg-primary' : 'bg-muted'}`} />
              <span>{isSound ? 'Всередина' : 'Зворотна частина'}</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {currentSubStep === 'front' ? (
        /* Front design - full width form only */
        <Card>
          <CardContent className="p-6">
            <FrontDesignStep
              lyrics={lyrics}
              initialData={designData.front}
              onComplete={handleFrontComplete}
              onBack={onBack}
              pageData={pageData}
              chatMessages={chatMessages}
              productFormat={productFormat}
            />
          </CardContent>
        </Card>
      ) : (
        /* Back / inside design with preview */
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                {isSound ? 'Як виглядатиме листівка' : 'Превью листівки'}
              </CardTitle>
              {!isSound && (
                <p className="text-xs text-muted-foreground mt-2">
                  💡 Двічі клікніть на листівку, щоб перевернути і побачити {previewShowFront ? 'зворотню' : 'лицьову'} сторону
                </p>
              )}
            </CardHeader>
            <CardContent className="p-6">
              {isSound ? (
                <SoundCardPreviewWithControls
                  frontData={designData.front}
                  insideData={designData.back}
                  isGeneratingMessage={isGeneratingMessage}
                  size="compact"
                />
              ) : (
                <div
                  className="max-w-xs mx-auto cursor-pointer select-none"
                  onDoubleClick={() => setPreviewShowFront(!previewShowFront)}
                >
                  <PostcardPreview
                    frontData={designData.front}
                    backData={designData.back}
                    showFront={previewShowFront}
                    size="compact"
                    isGeneratingMessage={isGeneratingMessage}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <BackDesignStep
                frontDesign={designData.front}
                lyrics={lyrics}
                initialData={designData.back}
                onComplete={handleBackComplete}
                onBack={handleBackToFront}
                onDataChange={(newBackData) => setDesignData(prev => ({ ...prev, back: newBackData }))}
                onGeneratingChange={setIsGeneratingMessage}
                productFormat={productFormat}
                occasion={pageData?.occasion}
                recipient={pageData?.recipient}
                sender={pageData?.sender}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}