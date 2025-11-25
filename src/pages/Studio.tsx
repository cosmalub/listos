import React, { useState, useRef, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Circle, Settings, Trash, Loader2 } from 'lucide-react';

// DEV MODE - Automatically true only in development
const DEV_MODE = import.meta.env.DEV;
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChatInterface, ChatInterfaceRef } from '@/components/studio/ChatInterface';
import { LyricsDraft } from '@/components/studio/LyricsDraft';
import { MusicGeneration } from '@/components/studio/MusicGeneration';
import { MusicStyleSelector } from '@/components/studio/MusicStyleSelector';
import { PageCaptionStep } from '@/components/studio/PageCaptionStep';
import { PostcardDesign } from '@/components/studio/PostcardDesign';
import { WelcomeTutorial } from '@/components/studio/WelcomeTutorial';
import { Header } from '@/components/sections/header';
import { Footer } from '@/components/sections/footer';
import { StepsHeader } from '@/components/studio/StepsHeader';
import { StepExplanation } from '@/components/studio/StepExplanation';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { MusicStyle, MUSIC_STYLES, getStyleById } from '@/lib/music-styles';
import { composeFrontImageA6, composeBackImageA6, preprocessImageToA6 } from '@/lib/postcard-generator';

const steps = [
  { id: 1, title: 'Створення слів', description: 'Створюємо слова для пісні' },
  { id: 1.5, title: 'Вибір стилю', description: 'Обираємо стиль музики' },
  { id: 2, title: 'Генерація музики', description: 'Генеруємо 2 варіанти на основі тексту' },
  { id: 3, title: 'Сторінка з піснею', description: 'Створюємо персональну сторінку з піснею' },
  { id: 4, title: 'Дизайн листівки', description: 'Робимо дизайн листівки з QR-кодом' },
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
  const [designData, setDesignData] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [recommendedStyles, setRecommendedStyles] = useState<MusicStyle[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<MusicStyle | null>(null);
  const [isAnalyzingLyrics, setIsAnalyzingLyrics] = useState(false);
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

  // Restore data from sessionStorage (for returning from /s/draft page)
  useEffect(() => {
    const savedDraftData = sessionStorage.getItem('studio-draft-data');
    if (savedDraftData) {
      try {
        const parsed = JSON.parse(savedDraftData);
        
        // Restore lyrics if not already set
        if (parsed.lyrics && !lyrics) {
          setLyrics(parsed.lyrics);
          setHasUnconfirmedLyrics(false);
        }
        
        // Restore selectedMusicVariant if not already set
        if (parsed.musicVariant && !selectedMusicVariant) {
          setSelectedMusicVariant(parsed.musicVariant);
        }
        
        // Restore pageData if not already set
        if (parsed.pageInfo && !pageData) {
          setPageData(parsed.pageInfo);
        }
        
        // Restore designData if not already set
        if (parsed.designData && !designData) {
          setDesignData(parsed.designData);
        }
        
        console.log('✅ Restored data from sessionStorage:', {
          hasLyrics: !!parsed.lyrics,
          hasMusicVariant: !!parsed.musicVariant,
          hasPageInfo: !!parsed.pageInfo,
          hasDesignData: !!parsed.designData
        });
      } catch (error) {
        console.error('Error restoring draft data:', error);
      }
    }
  }, []);

  // Sync current step with URL parameter
  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) {
      const step = parseFloat(stepParam);
      if ((step >= 1 && step <= 4) || step === 1.5) {
        setCurrentStep(step);
        setShowWelcome(false);
      }
    } else {
      // No step parameter means we're on welcome
      setCurrentStep(0);
      setShowWelcome(true);
    }
  }, [searchParams]);

  // Захист від неавторизованого доступу
  useEffect(() => {
    // Якщо показуємо Welcome екран - не перевіряємо токен
    if (showWelcome) return;

    // У DEV режимі пропускаємо перевірку токена
    if (DEV_MODE) {
      console.log('🔧 DEV MODE: Skipping token validation');
      return;
    }

    // Перевіряємо наявність токена в sessionStorage
    const token = sessionStorage.getItem('studio-access-token');
    const preOrderId = sessionStorage.getItem('studio-pre-order-id');

    if (!token || !preOrderId) {
      console.log('No access token found, redirecting to welcome screen');
      setShowWelcome(true);
      setCurrentStep(0);
      navigate('/studio');
      toast.error('Будь ласка, введіть код доступу для продовження', {
        description: 'Код доступу ви отримали після оплати',
        duration: 5000,
      });
    }
  }, [showWelcome, currentStep, navigate]);

  const handleLyricsConfirmed = async (confirmedLyrics: string) => {
    setLyrics(confirmedLyrics);
    setHasUnconfirmedLyrics(false);
    
    // Переходимо на крок 1.5 та показуємо лоадер
    setIsAnalyzingLyrics(true);
    setCurrentStep(1.5);
    navigate('/studio?step=1.5');
    
    // Аналізуємо тексти та отримуємо рекомендовані стилі
    try {
      const { data, error } = await supabase.functions.invoke('analyze-lyrics-for-music', {
        body: { lyrics: confirmedLyrics }
      });

      if (error) {
        console.error('Error analyzing lyrics:', error);
        toast.error('Помилка аналізу текстів');
        // Використовуємо універсальні стилі як запасний варіант
        const fallbackStyles = ['pop-dance', 'acoustic-folk', 'soul-emotional']
          .map(id => getStyleById(id))
          .filter(Boolean) as MusicStyle[];
        setRecommendedStyles(fallbackStyles);
      } else {
        console.log('Analysis result:', data);
        // Зберігаємо параметри для генерації
        sessionStorage.setItem('music-parameters', JSON.stringify(data));
        
        // Отримуємо рекомендовані стилі
        const recommendedStyleIds = data.recommendedStyles || [];
        const styles = recommendedStyleIds
          .map((id: string) => getStyleById(id))
          .filter(Boolean) as MusicStyle[];
        
        setRecommendedStyles(styles);
        
        if (styles.length > 0) {
          toast.success('Підібрали найкращі стилі для вашої пісні!');
        }
      }
    } catch (error) {
      console.error('Failed to analyze lyrics:', error);
      toast.error('Помилка аналізу текстів');
      // Використовуємо універсальні стилі
      const fallbackStyles = ['pop-dance', 'acoustic-folk', 'soul-emotional']
        .map(id => getStyleById(id))
        .filter(Boolean) as MusicStyle[];
      setRecommendedStyles(fallbackStyles);
    } finally {
      setIsAnalyzingLyrics(false);
    }
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

  const handleStyleSelected = async (style: MusicStyle) => {
    setSelectedStyle(style);
    
    // Оновлюємо параметри з обраним стилем
    const storedParams = sessionStorage.getItem('music-parameters');
    if (storedParams) {
      const params = JSON.parse(storedParams);
      params.selectedStyleId = style.id;
      params.style = style.style;
      sessionStorage.setItem('music-parameters', JSON.stringify(params));
    }
    
    toast.success(`Обрано стиль: ${style.name}`);
    
    // Переходимо на генерацію музики
    setCurrentStep(2);
    navigate('/studio?step=2');
  };

  const handleMusicVariantSelected = async (variant: any) => {
    setSelectedMusicVariant(variant);
    // Save selected music to sessionStorage for draft page
    sessionStorage.setItem('studio-selected-music', JSON.stringify(variant));
    // Go to page creation (step 3)
    setCurrentStep(3);
    navigate('/studio?step=3');
  };

  const handlePageCaptionComplete = async (data: any) => {
    setPageData(data);
    // Page created, now go to postcard design (step 4)
    setCurrentStep(4);
    navigate('/studio?step=4');
  };

  const handleRequestSpecialist = () => {
    // Handle specialist request - could show a contact form or similar
    console.log("Specialist requested for music generation");
  };

  const handleContinueWithoutSong = () => {
    // User decided to continue without selecting a song
    // Specialist will contact them later
    console.log("User continues without song - specialist will be notified");
    setCurrentStep(3);
    navigate('/studio?step=3');
  };

  const handleWelcomeStart = () => {
    setShowWelcome(false);
    setCurrentStep(1);
    navigate('/studio?step=1');
  };

  const handlePostcardDesignComplete = async (postcardDesignData: any) => {
    try {
      setDesignData(postcardDesignData);
      toast.loading('Збереження замовлення...');

      // Get page data from sessionStorage
      const storedData = sessionStorage.getItem('studio-draft-data');
      if (!storedData) {
        throw new Error('Page data not found');
      }
      const parsedPageData = JSON.parse(storedData);

      // Get preOrderId from sessionStorage
      const storedPreOrderId = sessionStorage.getItem('studio-pre-order-id');
      
      if (!storedPreOrderId) {
        throw new Error('Pre-order ID not found in session storage');
      }

      // PHASE 1: Create order and get orderId
      console.log('Phase 1: Creating order...');
      const { data: createData, error: createError } = await supabase.functions.invoke('save-order', {
        body: {
          phase: 'create',
          preOrderId: storedPreOrderId,
          lyrics,
          musicVariant: selectedMusicVariant,
          pageData: parsedPageData.pageInfo,
          frontDesign: postcardDesignData.front,
          backDesign: postcardDesignData.back,
        },
      });

      if (createError) throw createError;
      
      const orderId = createData.orderId;
      console.log('Order created with ID:', orderId);

      // Generate QR code URL with correct orderId
      const qrUrl = `https://listos.app/s/song/${orderId}`;
      console.log('QR URL generated:', qrUrl);

      // Compose front image using Canvas
      let frontImageBase64;
      if (postcardDesignData.front.mode === 'photo' && postcardDesignData.front.imageUrl) {
        frontImageBase64 = await composeFrontImageA6(
          postcardDesignData.front.imageUrl,
          postcardDesignData.front.caption || ''
        );
        console.log('Front image composed to A6 format with caption overlay');
      } else if (postcardDesignData.front.imageUrl) {
        frontImageBase64 = await preprocessImageToA6(postcardDesignData.front.imageUrl);
        console.log('Front image preprocessed to A6 format');
      } else {
        throw new Error('Front image URL is missing');
      }

      // Compose back image using Canvas with CORRECT QR code
      const backImageBase64 = await composeBackImageA6({
        color: postcardDesignData.back.selectedColor || '#FFFFFF',
        message: postcardDesignData.back.personalMessage || '',
        qrUrl: qrUrl
      });
      console.log('Back image composed to A6 format with QR code');

      // PHASE 2: Finalize order with images
      console.log('Phase 2: Finalizing order with images...');
      const { data: finalizeData, error: finalizeError } = await supabase.functions.invoke('save-order', {
        body: {
          phase: 'finalize',
          preOrderId: storedPreOrderId,
          lyrics,
          musicVariant: selectedMusicVariant,
          pageData: parsedPageData.pageInfo,
          frontDesign: postcardDesignData.front,
          backDesign: postcardDesignData.back,
          frontImageBase64,
          backImageBase64,
          qrCodeUrl: qrUrl,
        },
      });

      if (finalizeError) throw finalizeError;

      toast.success('Замовлення збережено успішно!');
      
      // Очищаємо токен доступу (більше не потрібен)
      sessionStorage.removeItem('studio-access-token');
      sessionStorage.removeItem('studio-pre-order-id');
      
      // Navigate to success page
      navigate(`/order-success?orderId=${orderId}`);

    } catch (error) {
      console.error('Error saving order:', error);
      toast.error('Помилка збереження замовлення');
    }
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
      if (step >= 1.5 && !lyrics) {
        setLyrics(TEST_DATA.lyrics);
        setHasUnconfirmedLyrics(false);
      }
      if (step >= 1.5 && recommendedStyles.length === 0) {
        // Auto-fill recommended styles
        const fallbackStyles = ['pop-dance', 'acoustic-folk', 'soul-emotional']
          .map(id => getStyleById(id))
          .filter(Boolean) as MusicStyle[];
        setRecommendedStyles(fallbackStyles);
      }
      if (step >= 2 && !selectedStyle) {
        const style = getStyleById('pop-dance');
        if (style) setSelectedStyle(style);
      }
      if (step >= 3 && !selectedMusicVariant) {
        setSelectedMusicVariant(TEST_DATA.musicVariant);
        sessionStorage.setItem('studio-selected-music', JSON.stringify(TEST_DATA.musicVariant));
      }
      if (step >= 4 && !pageData) {
        // Auto-fill page data for step 4 (postcard design)
        const testPageData = {
          occasion: 'birthday',
          recipient: 'Марії',
          sender: 'Олексія'
        };
        setPageData(testPageData);
        
        // Also save to sessionStorage for step 4 to work properly
        const draftData = {
          lyrics: lyrics || TEST_DATA.lyrics,
          musicVariant: selectedMusicVariant || TEST_DATA.musicVariant,
          designData: null,
          pageInfo: testPageData,
          timestamp: new Date().toISOString()
        };
        sessionStorage.setItem('studio-draft-data', JSON.stringify(draftData));
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

  const handleClearChatHistory = () => {
    localStorage.removeItem('studio-chat-messages');
    setChatMessages([]);
    toast.success('Історію чату очищено');
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
                    disabled={isAnalyzingLyrics}
                    className="flex-1"
                  >
                    {isAnalyzingLyrics ? 'Аналізую...' : 'Підтвердити і далі'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      case 1.5:
        // Show loading animation while analyzing lyrics
        if (isAnalyzingLyrics) {
          return (
            <Card className="border-border bg-muted/20 max-w-4xl mx-auto">
              <CardContent className="p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Loader2 className="h-12 w-12 animate-spin text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold">Листосик аналізує ваш текст...</p>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Підбираємо найкращі музичні стилі для вашої пісні
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        }
        
        return (
          <MusicStyleSelector
            recommendedStyles={recommendedStyles}
            onStyleSelected={handleStyleSelected}
            onBack={() => {
              setCurrentStep(1);
              navigate('/studio?step=1');
            }}
          />
        );
      case 2:
        return (
          <MusicGeneration
            lyrics={lyrics}
            onVariantSelected={handleMusicVariantSelected}
            onRequestSpecialist={handleRequestSpecialist}
            onContinueWithoutSong={handleContinueWithoutSong}
          />
        );
      case 3:
        return (
          <PageCaptionStep
            lyrics={lyrics}
            musicVariant={selectedMusicVariant}
            designData={designData}
            onComplete={handlePageCaptionComplete}
          />
        );
      case 4:
        return (
          <PostcardDesign
            lyrics={lyrics}
            onComplete={handlePostcardDesignComplete}
            onBack={() => setCurrentStep(3)}
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
            <div className="grid grid-cols-5 gap-1">
              {steps.map((step) => (
                <Button
                  key={step.id}
                  variant={currentStep === step.id && !showWelcome ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToStep(step.id)}
                  className="h-8 w-8 p-0 text-xs"
                >
                  {step.id === 1.5 ? '1.5' : step.id}
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
            <div className="mt-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleClearChatHistory}
                className="text-xs w-full"
              >
                <Trash className="w-3 h-3 mr-1" />
                Clear Chat
              </Button>
            </div>
          </div>
        </div>
      )}

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