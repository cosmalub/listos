import React, { useState, useRef, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Circle, Settings } from 'lucide-react';

// DEV MODE - Set to false for production
const DEV_MODE = true;
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChatInterface, ChatInterfaceRef } from '@/components/studio/ChatInterface';
import { LyricsDraft } from '@/components/studio/LyricsDraft';
import { MusicGeneration } from '@/components/studio/MusicGeneration';
import { PageCaptionStep } from '@/components/studio/PageCaptionStep';
import { PostcardDesign } from '@/components/studio/PostcardDesign';
import { WelcomeTutorial } from '@/components/studio/WelcomeTutorial';
import { Header } from '@/components/sections/header';
import { Footer } from '@/components/sections/footer';
import { StepsHeader } from '@/components/studio/StepsHeader';
import { StepExplanation } from '@/components/studio/StepExplanation';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const steps = [
  { id: 1, title: 'Створення слів', description: 'Створюємо слова для пісні' },
  { id: 2, title: 'Генерація музики', description: 'Генеруємо 2 варіанти на основі тексту' },
  { id: 3, title: 'Дизайн листівки', description: 'Обираємо дизайн та стиль листівки' },
  { id: 4, title: 'Сторінка з піснею', description: 'Створюємо персональну сторінку' },
];

// Test data for dev mode
const TEST_DATA = {
  lyrics: `З днем народження, мій дорогий друже!
Хай цей день буде яскравим як сонце,
Хай щастя твоє ніколи не згасне,
І мрії всі здійсняться до кінця!

Припев:
Святкуймо разом цей особливий день,
Хай музика лунає у серці,
З роками стаєш ти ще мудрішим,
Залишайся завжди таким щирим!

Хай доля дарує тобі лише радість,
А друзі завжди будуть поруч,
Живи довго, сміється і кохай,
Бо ти - найкращий у цьому світі!`,
  musicVariant: {
    id: 'test-variant-1',
    title: 'Happy Birthday Song',
    url: 'https://example.com/test-music.mp3',
    style: 'Pop',
    duration: '3:45'
  }
};

const Studio = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0); // Start with welcome tutorial
  const [lyrics, setLyrics] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [hasUnconfirmedLyrics, setHasUnconfirmedLyrics] = useState(false);
  const [selectedMusicVariant, setSelectedMusicVariant] = useState<any>(null);
  const [pageData, setPageData] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const chatRef = useRef<ChatInterfaceRef>(null);

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('studio-chat-messages');
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      // Convert timestamps back to Date objects
      const messagesWithDates = parsedMessages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      setChatMessages(messagesWithDates);
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
        setShowWelcome(false);
      }
    } else {
      // No step parameter means we're on welcome
      setCurrentStep(0);
      setShowWelcome(true);
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

  const handleMusicVariantSelected = async (variant: any) => {
    setSelectedMusicVariant(variant);
    // Go directly to postcard design (step 3)
    setCurrentStep(3);
    navigate('/studio?step=3');
    
    // Do not save yet; saving will occur after final confirmation (step 4)
  };

  const handlePageCaptionComplete = async (data: any) => {
    setPageData(data);
    // Save selection after final confirmation
    try {
      const { data: saveData, error } = await supabase.functions.invoke('save-music-selection', {
        body: {
          lyrics,
          selectedVariant: selectedMusicVariant
        }
      });
      if (error) {
        console.error('Failed to save music selection:', error);
        toast.error('Не вдалося зберегти вибір музики');
      } else {
        console.log('Music selection saved successfully:', saveData);
      }
    } catch (error) {
      console.error('Error saving music selection:', error);
      toast.error('Помилка при збереженні вибору музики');
    }
    setCurrentStep(4);
  };

  const handleRequestSpecialist = () => {
    // Handle specialist request - could show a contact form or similar
    console.log("Specialist requested for music generation");
  };

  const handleWelcomeStart = () => {
    setShowWelcome(false);
    setCurrentStep(1);
    navigate('/studio?step=1');
  };

  // Dev mode functions
  const fillTestData = () => {
    setLyrics(TEST_DATA.lyrics);
    setSelectedMusicVariant(TEST_DATA.musicVariant);
    setHasUnconfirmedLyrics(false);
    toast.success('Тестові дані заповнені');
  };

  const goToStep = (step: number) => {
    // In dev mode, allow jumping to any step
    if (DEV_MODE) {
      // Auto-fill missing data for higher steps
      if (step >= 2 && !lyrics) {
        setLyrics(TEST_DATA.lyrics);
        setHasUnconfirmedLyrics(false);
      }
      if (step >= 3 && !selectedMusicVariant) {
        setSelectedMusicVariant(TEST_DATA.musicVariant);
      }
      setCurrentStep(step);
      setShowWelcome(false);
      if (step === 0) {
        setShowWelcome(true);
        navigate('/studio');
      } else {
        navigate(`/studio?step=${step}`);
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <WelcomeTutorial onStart={handleWelcomeStart} />
        );
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
          <PostcardDesign
            lyrics={lyrics}
            onComplete={(designData) => {
              // Save design data and move to next step
              console.log('Postcard design completed:', designData);
              setCurrentStep(4);
            }}
            onBack={() => setCurrentStep(2)}
          />
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
      <StepExplanation currentStep={currentStep} showTutorial={showWelcome} />

      {/* Dev Mode Panel */}
      {DEV_MODE && (
        <div className="fixed top-20 right-4 z-50 bg-background border border-border rounded-lg p-4 shadow-lg min-w-[200px]">
          <div className="flex items-center gap-2 mb-3">
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">Dev Mode</span>
          </div>
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground mb-2">Quick Navigation:</div>
            
            {/* Welcome Button */}
            <div className="mb-2">
              <Button
                variant={showWelcome && currentStep === 0 ? "default" : "outline"}
                size="sm"
                onClick={() => goToStep(0)}
                className="h-8 px-2 text-xs bg-green-500/10 border-green-500/30 text-green-700 hover:bg-green-500/20 dark:text-green-300 dark:hover:bg-green-500/30"
              >
                W
              </Button>
              <span className="ml-2 text-xs text-muted-foreground">Welcome</span>
            </div>

            {/* Step Buttons */}
            <div className="grid grid-cols-4 gap-1">
              {steps.map((step) => (
                <Button
                  key={step.id}
                  variant={currentStep === step.id && !showWelcome ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToStep(step.id)}
                  className="h-8 w-8 p-0 text-xs"
                >
                  {step.id}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1 mt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={fillTestData}
                className="text-xs"
              >
                Fill Test Data
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const data = {
                    currentStep,
                    lyrics,
                    selectedMusicVariant,
                    pageData,
                    showWelcome
                  };
                  navigator.clipboard.writeText(JSON.stringify(data, null, 2));
                  console.log('Current Data:', data);
                  alert('Data copied to clipboard and logged to console');
                }}
                className="text-xs"
              >
                View Data
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className={currentStep === 0 ? "min-h-[calc(100vh-200px)]" : "container mx-auto px-4 py-8 min-h-[calc(100vh-200px)] max-w-3xl"}>
        {renderStepContent()}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Studio;