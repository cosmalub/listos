import React, { useState, useRef, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChatInterface, ChatInterfaceRef } from '@/components/studio/ChatInterface';
import { LyricsDraft } from '@/components/studio/LyricsDraft';
import { MusicGeneration } from '@/components/studio/MusicGeneration';
import { PageCaptionStep } from '@/components/studio/PageCaptionStep';
import { Header } from '@/components/sections/header';
import { Footer } from '@/components/sections/footer';
import { StepsHeader } from '@/components/studio/StepsHeader';

const steps = [
  { id: 1, title: 'Створення слів', description: 'Створюємо слова для пісні' },
  { id: 2, title: 'Генерація музики', description: 'Генеруємо 2 варіанти на основі тексту' },
  { id: 3, title: 'Сторінка з піснею', description: 'Створюємо персональну сторінку' },
  { id: 4, title: 'Дизайн листівки', description: 'Обираємо дизайн та стиль листівки' },
  { id: 5, title: 'Замовлення', description: 'Оформлюємо замовлення та доставку' },
];

const Studio = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [lyrics, setLyrics] = useState('');
  const [mobileTab, setMobileTab] = useState('chat');
  const [hasUnconfirmedLyrics, setHasUnconfirmedLyrics] = useState(false);
  const [selectedMusicVariant, setSelectedMusicVariant] = useState<any>(null);
  const [pageData, setPageData] = useState<any>(null);
  const chatRef = useRef<ChatInterfaceRef>(null);

  // Sync current step with URL parameter
  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) {
      const step = parseInt(stepParam, 10);
      if (step >= 1 && step <= 5) {
        setCurrentStep(step);
      }
    }
  }, [searchParams]);

  const handleLyricsConfirmed = (confirmedLyrics: string) => {
    setLyrics(confirmedLyrics);
    setHasUnconfirmedLyrics(false);
    setCurrentStep(2);
  };

  const handleLyricsGenerated = (generatedLyrics: string) => {
    setLyrics(generatedLyrics);
    setHasUnconfirmedLyrics(true);
    // Auto-switch to draft tab on mobile after lyrics generation
    setMobileTab('draft');
  };

  const handleRequestEdit = (editText: string) => {
    setMobileTab('chat');
    setTimeout(() => {
      chatRef.current?.prefillAndFocus(editText);
    }, 100);
  };

  const handleMusicVariantSelected = (variant: any) => {
    setSelectedMusicVariant(variant);
    setCurrentStep(3); // Move to page caption step
  };

  const handlePageCaptionComplete = (data: any) => {
    setPageData(data);
    setCurrentStep(4);
  };

  const handleRequestSpecialist = () => {
    // Handle specialist request - could show a contact form or similar
    console.log("Specialist requested for music generation");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="h-full">
            {/* Desktop: Two-column layout */}
            <div className="hidden md:grid md:grid-cols-2 md:gap-6 h-full">
              <Card className="p-6 h-full">
                <ChatInterface 
                  ref={chatRef}
                  onLyricsGenerated={handleLyricsGenerated}
                  onConfirmLyrics={handleLyricsConfirmed}
                  onEditLyrics={() => setMobileTab('draft')}
                />
              </Card>
              <Card className="p-6 h-full">
                <LyricsDraft 
                  lyrics={lyrics} 
                  onConfirm={handleLyricsConfirmed}
                  onRequestEdit={handleRequestEdit}
                />
              </Card>
            </div>

            {/* Mobile: Tabbed layout */}
            <div className="md:hidden h-full relative">
              <Tabs value={mobileTab} onValueChange={setMobileTab} className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="chat">Чат</TabsTrigger>
                  <TabsTrigger value="draft" className="relative">
                    Чернетка
                    {hasUnconfirmedLyrics && currentStep === 1 && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
                    )}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="chat" className="flex-1">
                  <Card className="p-4 h-full">
                    <ChatInterface 
                      ref={chatRef}
                      onLyricsGenerated={handleLyricsGenerated}
                      onConfirmLyrics={handleLyricsConfirmed}
                      onEditLyrics={() => setMobileTab('draft')}
                    />
                  </Card>
                </TabsContent>
                <TabsContent value="draft" className="flex-1">
                  <Card className="p-4 h-full">
                    <LyricsDraft 
                      lyrics={lyrics} 
                      onConfirm={handleLyricsConfirmed}
                      onRequestEdit={handleRequestEdit}
                    />
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Mobile bottom CTA panel */}
              {mobileTab === 'chat' && hasUnconfirmedLyrics && currentStep === 1 && (
                <div className="fixed bottom-4 left-4 right-4 bg-background border border-border rounded-lg p-3 shadow-lg flex gap-2 z-10">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setMobileTab('draft')}
                    className="flex-1"
                  >
                    Редагувати
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleLyricsConfirmed(lyrics)}
                    className="flex-1"
                  >
                    Підтвердити і далі
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <MusicGeneration
            lyrics={lyrics}
            onVariantSelected={handleMusicVariantSelected}
            onRequestSpecialist={handleRequestSpecialist}
          />
        );
      case 3:
        return (
          <PageCaptionStep
            lyrics={lyrics}
            musicVariant={selectedMusicVariant}
            onComplete={handlePageCaptionComplete}
          />
        );
      case 4:
        return (
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold">Крок 4: Дизайн листівки</h2>
            <p className="text-muted-foreground">Тут буде вибір дизайну та стилю листівки</p>
            <Button onClick={() => setCurrentStep(5)} size="lg">
              Перейти до замовлення
            </Button>
          </div>
        );
      case 5:
        return (
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold">Крок 5: Оформлення замовлення</h2>
            <p className="text-muted-foreground">Тут буде форма оформлення замовлення та доставки</p>
            <Button variant="outline" onClick={() => setCurrentStep(4)}>
              Повернутися до дизайну
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFD1DC] via-white to-white">
      {/* Header */}
      <Header centerTitle="Студія створення листівки" hideNav showMenu={false} />

      {/* Steps indicator */}
      <StepsHeader currentStep={currentStep} />

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)]">
        {renderStepContent()}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Studio;