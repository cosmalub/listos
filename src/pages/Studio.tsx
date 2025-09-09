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
import { StepExplanation } from '@/components/studio/StepExplanation';

const steps = [
  { id: 1, title: 'Створення слів', description: 'Створюємо слова для пісні' },
  { id: 2, title: 'Генерація музики', description: 'Генеруємо 2 варіанти на основі тексту' },
  { id: 3, title: 'Дизайн листівки', description: 'Обираємо дизайн та стиль листівки' },
  { id: 4, title: 'Сторінка з піснею', description: 'Створюємо персональну сторінку' },
];

const Studio = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [lyrics, setLyrics] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [hasUnconfirmedLyrics, setHasUnconfirmedLyrics] = useState(false);
  const [selectedMusicVariant, setSelectedMusicVariant] = useState<any>(null);
  const [pageData, setPageData] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const chatRef = useRef<ChatInterfaceRef>(null);

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('studio-chat-messages');
    if (savedMessages) {
      setChatMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (chatMessages.length > 0) {
      localStorage.setItem('studio-chat-messages', JSON.stringify(chatMessages));
    }
  }, [chatMessages]);

  // Sync current step with URL parameter
  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) {
      const step = parseInt(stepParam, 10);
      if (step >= 1 && step <= 4) {
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
    // Auto-switch to draft tab after lyrics generation
    setActiveTab('draft');
  };

  const handleRequestEdit = (editText: string) => {
    // Compose full message with current lyrics context
    const currentLyrics = lyrics.trim();
    const composedMessage = currentLyrics ? 
      `${editText}\n\nПоточний текст пісні:\n\`\`\`LYRICS\n${currentLyrics}\n\`\`\`` : 
      editText;
    
    setActiveTab('chat');
    setTimeout(() => {
      chatRef.current?.prefillAndSend(composedMessage);
    }, 100);
  };

  const handleMusicVariantSelected = (variant: any) => {
    setSelectedMusicVariant(variant);
    setCurrentStep(3); // Move to postcard design step
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
            {/* Unified tabbed layout for both desktop and mobile */}
            <div className="h-full relative">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
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
                      initialMessages={chatMessages}
                      onMessagesChange={setChatMessages}
                      onLyricsGenerated={handleLyricsGenerated}
                      onConfirmLyrics={handleLyricsConfirmed}
                      onEditLyrics={() => setActiveTab('draft')}
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

              {/* Bottom CTA panel for all screen sizes */}
              {activeTab === 'chat' && hasUnconfirmedLyrics && currentStep === 1 && (
                <div className="fixed bottom-4 left-4 right-4 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 md:w-96 bg-background border border-border rounded-lg p-3 shadow-lg flex gap-2 z-10">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setActiveTab('draft')}
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
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <Card className="p-6">
              <p className="text-muted-foreground mb-4">Тут буде вибір дизайну та стилю листівки</p>
              <Button onClick={() => setCurrentStep(4)} size="lg">
                Створити сторінку з піснею
              </Button>
            </Card>
          </div>
        );
      case 4:
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
      <StepsHeader currentStep={currentStep} />

      {/* Step explanation */}
      <StepExplanation currentStep={currentStep} />

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)] max-w-3xl">
        {renderStepContent()}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Studio;