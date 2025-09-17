import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { FrontDesignStep } from './FrontDesignStep';
import { BackDesignStep } from './BackDesignStep';
import { PostcardPreview } from './PostcardPreview';
import type { StyleKey } from '@/lib/postcard-styles';

interface PostcardDesignData {
  front: {
    mode: 'photo' | 'ai-generation';
    style: StyleKey | null;
    imageUrl: string | null;
    caption: string;
    prompt: string;
  };
  back: {
    template: string;
    qrPosition: 'top-right' | 'bottom-right' | 'bottom-left';
    personalMessage: string;
    fontStyle: 'elegant' | 'playful' | 'classic';
  };
}

interface PostcardDesignProps {
  lyrics: string;
  onComplete: (designData: PostcardDesignData) => void;
  onBack: () => void;
}

export function PostcardDesign({ lyrics, onComplete, onBack }: PostcardDesignProps) {
  const [currentSubStep, setCurrentSubStep] = useState<'front' | 'back'>('front');
  const [designData, setDesignData] = useState<PostcardDesignData>({
    front: {
      mode: 'ai-generation',
      style: null,
      imageUrl: null,
      caption: '',
      prompt: ''
    },
    back: {
      template: 'classic',
      qrPosition: 'bottom-right',
      personalMessage: '',
      fontStyle: 'elegant'
    }
  });

  const handleFrontComplete = (frontData: PostcardDesignData['front']) => {
    setDesignData(prev => ({ ...prev, front: frontData }));
    setCurrentSubStep('back');
  };

  const handleBackComplete = (backData: PostcardDesignData['back']) => {
    const finalData = { ...designData, back: backData };
    setDesignData(finalData);
    onComplete(finalData);
  };

  const handleBackToFront = () => {
    setCurrentSubStep('front');
  };

  const isReadyForBack = designData.front.imageUrl && designData.front.caption;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Progress indicator */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-center">Дизайн листівки</CardTitle>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className={`flex items-center space-x-2 ${currentSubStep === 'front' ? 'text-primary' : isReadyForBack ? 'text-success' : 'text-muted-foreground'}`}>
              <div className={`w-3 h-3 rounded-full ${currentSubStep === 'front' ? 'bg-primary' : isReadyForBack ? 'bg-success' : 'bg-muted'}`} />
              <span>Лицьова частина</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <div className={`flex items-center space-x-2 ${currentSubStep === 'back' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-3 h-3 rounded-full ${currentSubStep === 'back' ? 'bg-primary' : 'bg-muted'}`} />
              <span>Зворотна частина</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Design workspace */}
        <div className={`${(designData.front.imageUrl || currentSubStep === 'back') ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <Card>
            <CardContent className="p-6">
              {currentSubStep === 'front' ? (
                <FrontDesignStep
                  lyrics={lyrics}
                  initialData={designData.front}
                  onComplete={handleFrontComplete}
                  onBack={onBack}
                />
              ) : (
                <BackDesignStep
                  frontDesign={designData.front}
                  initialData={designData.back}
                  onComplete={handleBackComplete}
                  onBack={handleBackToFront}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Live Preview - only show when there's content */}
        {(designData.front.imageUrl || currentSubStep === 'back') && (
          <div className="lg:col-span-1">
            <PostcardPreview
              frontData={designData.front}
              backData={designData.back}
              showFront={currentSubStep === 'front'}
            />
          </div>
        )}
      </div>
    </div>
  );
}