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
}

export function PostcardDesign({ lyrics, onComplete, onBack, pageData, chatMessages }: PostcardDesignProps) {
  const [currentSubStep, setCurrentSubStep] = useState<'front' | 'back'>('front');
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
    onComplete(finalData);
  };

  const handleBackToFront = () => {
    setCurrentSubStep('front');
  };

  const isReadyForBack = designData.front.imageUrl && designData.front.caption;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
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
            />
          </CardContent>
        </Card>
      ) : (
        /* Back design with dual preview at top */
        <div className="space-y-6">
          {/* Single interactive preview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Превью листівки</CardTitle>
              <p className="text-xs text-muted-foreground mt-2">
                💡 Двічі клікніть на листівку, щоб перевернути і побачити лицьову сторону
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="max-w-xs mx-auto">
                <PostcardPreview
                  frontData={designData.front}
                  backData={designData.back}
                  showFront={false}
                  size="compact"
                />
              </div>
            </CardContent>
          </Card>

          {/* Design form */}
          <Card>
            <CardContent className="p-6">
              <BackDesignStep
                frontDesign={designData.front}
                lyrics={lyrics}
                initialData={designData.back}
                onComplete={handleBackComplete}
                onBack={handleBackToFront}
                onDataChange={(newBackData) => setDesignData(prev => ({ ...prev, back: newBackData }))}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}