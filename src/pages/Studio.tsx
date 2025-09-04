import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
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

const steps = [
  { id: 1, title: 'Створення слів', description: 'Створюємо слова для пісні' },
  { id: 2, title: 'Генерація музики', description: 'Генеруємо 2 варіанти на основі тексту' },
  { id: 3, title: 'Сторінка з піснею', description: 'Створюємо персональну сторінку' },
];

const Studio = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [lyrics, setLyrics] = useState('');
  const [mobileTab, setMobileTab] = useState('chat');
  const [hasUnconfirmedLyrics, setHasUnconfirmedLyrics] = useState(false);
  const [selectedMusicVariant, setSelectedMusicVariant] = useState<any>(null);
  const [pageData, setPageData] = useState<any>(null);
  const chatRef = useRef<ChatInterfaceRef>(null);

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
    // Here we would typically save the page data and redirect to the postcard design
    console.log("Page data:", data);
    alert("Сторінка створена! Далі буде дизайн листівки.");
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
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFD1DC] via-white to-white">
      {/* Header */}
      <Header centerTitle="Студія створення листівки" hideNav showMenu={false} />

      {/* Steps indicator */}
      <div className="bg-transparent pt-24 md:pt-28">
        <div className="container mx-auto px-4 py-6">
          {/* Desktop: Horizontal layout with connecting lines */}
          <div className="hidden md:flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    currentStep > step.id 
                      ? 'bg-success border-success text-success-foreground' 
                      : currentStep === step.id 
                        ? 'bg-primary border-primary text-primary-foreground' 
                        : 'bg-background border-border text-muted-foreground'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 transition-colors ${
                    currentStep > step.id ? 'bg-success' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Mobile: Compact grid layout */}
          <div className="md:hidden grid grid-cols-4 gap-2 max-w-sm mx-auto">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                  currentStep > step.id 
                    ? 'bg-success border-success text-success-foreground' 
                    : currentStep === step.id 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : 'bg-background border-border text-muted-foreground'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-medium">{step.id}</span>
                  )}
                </div>
                <div className="mt-1 text-center h-8 overflow-hidden">
                  <div className={`text-[11px] leading-tight font-medium ${
                    currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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