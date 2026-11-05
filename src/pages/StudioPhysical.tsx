import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Settings, Trash, Loader2, Printer, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChatInterface, ChatInterfaceRef } from '@/components/studio/ChatInterface';
import { MusicGeneration } from '@/components/studio/MusicGeneration';
import { MusicStyleSelector } from '@/components/studio/MusicStyleSelector';
import { PhysicalPostcardDesign, PhysicalPostcardDesignData } from '@/components/studio-physical/PhysicalPostcardDesign';
import { PhysicalWelcomeTutorial } from '@/components/studio-physical/PhysicalWelcomeTutorial';
import { PhysicalStepsHeader } from '@/components/studio-physical/PhysicalStepsHeader';
import { HeaderExperiment } from '@/components/sections/header-experiment';
import { FooterExperiment } from '@/components/sections/footer-experiment';
import { useOrderDialog } from '@/components/order/OrderDialogContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { MusicStyle, getStyleById } from '@/lib/music-styles';
import { composePhysicalA4PrintSheets } from '@/lib/physical-postcard-generator';
import { posthog } from '@/providers/PostHogProvider';

const DEV_MODE = import.meta.env.DEV;

const steps = [
  { id: 1, title: 'Створення слів', description: 'Створюємо слова для пісні' },
  { id: 1.5, title: 'Вибір стилю', description: 'Обираємо стиль музики' },
  { id: 2, title: 'Генерація музики', description: 'Генеруємо 2 варіанти на основі тексту' },
  { id: 3, title: 'Дизайн листівки', description: 'Обкладинка та розворот (88×166 мм)' },
];

const stepHints: { [key: string]: string } = {
  '1': 'На цьому кроці ви поспілкуєтесь з Листосиком, щоб створити персональний текст пісні для вашої звукової листівки',
  '1.5': 'Оберіть стиль музики, який найкраще підійде для вашої пісні',
  '2': '',
  '3': 'Створіть лицьову обкладинку (88×166 мм), оберіть колір фону та відредагуйте текст привітання всередині розвороту',
};

const TEST_DATA = {
  lyrics: `Ти — моє кохання назавжди,
Крізь дощі і вечірні вогні,
Під червоною парасолькою ми вдвох,
І весь світ завмирає в ці дні!

Приспів:
Хай лунає ця ніжна мелодія,
Що написана тільки для нас,
Ти — моя найпрекрасніша мрія,
Нехай зупиниться час!`,
  musicVariant: {
    id: 'test-variant-phys-1',
    title: 'Ти — моє кохання назавжди',
    url: 'https://example.com/test-music.mp3',
    style: 'Romantic Ballad',
    duration: '3:15'
  }
};

const StudioPhysical = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { openOrderDialog } = useOrderDialog();
  const [currentStep, setCurrentStep] = useState(0);
  const [lyrics, setLyrics] = useState('');
  const [selectedMusicVariant, setSelectedMusicVariant] = useState<any>(null);
  const [designData, setDesignData] = useState<PhysicalPostcardDesignData | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [recommendedStyles, setRecommendedStyles] = useState<MusicStyle[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<MusicStyle | null>(null);
  const [isAnalyzingLyrics, setIsAnalyzingLyrics] = useState(false);
  const [chatKey, setChatKey] = useState(0);
  const [isGeneratingDevPrint, setIsGeneratingDevPrint] = useState(false);
  const chatRef = useRef<ChatInterfaceRef>(null);

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('studio-physical-chat-messages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setChatMessages(messagesWithDates);
      } catch (e) {
        console.error('Error loading chat history:', e);
      }
    }
  }, []);

  // Save chat history
  useEffect(() => {
    if (chatMessages.length > 0) {
      localStorage.setItem('studio-physical-chat-messages', JSON.stringify(chatMessages));
    }
  }, [chatMessages]);

  // Sync current step with URL parameter
  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) {
      const step = parseFloat(stepParam);
      if ((step >= 1 && step <= 3) || step === 1.5) {
        setCurrentStep(step);
        setShowWelcome(false);
      }
    } else {
      setCurrentStep(0);
      setShowWelcome(true);
    }
  }, [searchParams]);

  // Access token guard
  useEffect(() => {
    if (showWelcome) return;
    if (DEV_MODE) return;

    const token = sessionStorage.getItem('studio-access-token');
    const preOrderId = sessionStorage.getItem('studio-pre-order-id');

    if (!token || !preOrderId) {
      setShowWelcome(true);
      setCurrentStep(0);
      navigate('/studio-physical');
      toast.error('Будь ласка, введіть код доступу для продовження', {
        description: 'Код доступу ви отримали після оплати',
        duration: 5000,
      });
    }
  }, [showWelcome, currentStep, navigate]);

  const handleLyricsConfirmed = async (confirmedLyrics: string) => {
    setLyrics(confirmedLyrics);
    posthog.capture('lyrics_confirmed', { postcard_type: 'physical_sound' });

    setIsAnalyzingLyrics(true);
    setCurrentStep(1.5);
    navigate('/studio-physical?step=1.5');

    try {
      const { data, error } = await supabase.functions.invoke('analyze-lyrics-for-music', {
        body: { lyrics: confirmedLyrics }
      });

      if (error) {
        const fallbackStyles = ['pop-dance', 'acoustic-folk', 'soul-emotional', 'romantic-ballad']
          .map(id => getStyleById(id))
          .filter(Boolean) as MusicStyle[];
        setRecommendedStyles(fallbackStyles);
      } else {
        sessionStorage.setItem('music-parameters', JSON.stringify(data));
        const recommendedStyleIds = data.recommendedStyles || [];
        const styles = recommendedStyleIds
          .map((id: string) => getStyleById(id))
          .filter(Boolean) as MusicStyle[];
        setRecommendedStyles(styles);
        if (styles.length > 0) {
          toast.success('Підібрали найкращі стилі для вашої пісні!');
        }
      }
    } catch {
      const fallbackStyles = ['pop-dance', 'acoustic-folk', 'soul-emotional']
        .map(id => getStyleById(id))
        .filter(Boolean) as MusicStyle[];
      setRecommendedStyles(fallbackStyles);
    } finally {
      setIsAnalyzingLyrics(false);
    }
  };

  const handleStyleSelected = async (style: MusicStyle) => {
    setSelectedStyle(style);
    const storedParams = sessionStorage.getItem('music-parameters');
    if (storedParams) {
      const params = JSON.parse(storedParams);
      params.selectedStyleId = style.id;
      params.style = style.style;
      sessionStorage.setItem('music-parameters', JSON.stringify(params));
    }
    toast.success(`Обрано стиль: ${style.name}`);
    setCurrentStep(2);
    navigate('/studio-physical?step=2');
  };

  const handleMusicVariantSelected = async (variant: any) => {
    setSelectedMusicVariant(variant);
    sessionStorage.setItem('studio-selected-music', JSON.stringify(variant));
    // Directly proceed to Step 3: Physical Postcard Design (skipping QR web page creation)
    setCurrentStep(3);
    navigate('/studio-physical?step=3');
  };

  const handleContinueWithoutSong = () => {
    setCurrentStep(3);
    navigate('/studio-physical?step=3');
  };

  const handleBackToLyrics = () => {
    setCurrentStep(1);
    navigate('/studio-physical?step=1');
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.prefillAndSend('Хочу змінити слова');
      }
    }, 500);
  };

  const handleWelcomeStart = () => {
    setLyrics('');
    setChatMessages([]);
    setChatKey(prev => prev + 1);
    setSelectedMusicVariant(null);
    setSelectedStyle(null);
    setRecommendedStyles([]);
    setDesignData(null);

    setShowWelcome(false);
    setCurrentStep(1);
    navigate('/studio-physical?step=1');
  };

  const handlePostcardDesignComplete = async (postcardDesignData: PhysicalPostcardDesignData) => {
    const toastId = toast.loading('Створення замовлення...');

    try {
      setDesignData(postcardDesignData);

      const storedPreOrderId = sessionStorage.getItem('studio-pre-order-id') || (DEV_MODE ? 'dev-mode-pre-order-id' : null);
      if (!storedPreOrderId) {
        throw new Error('Pre-order ID not found in session storage');
      }

      const defaultPageInfo = {
        occasion: 'sound_postcard',
        recipient: 'Отримувача',
        sender: 'Відправника'
      };

      // PHASE 1: Create order and get orderId
      const { data: createData, error: createError } = await supabase.functions.invoke('save-order', {
        body: {
          phase: 'create',
          preOrderId: storedPreOrderId,
          lyrics,
          musicVariant: selectedMusicVariant,
          pageData: defaultPageInfo,
          frontDesign: postcardDesignData.front,
          backDesign: postcardDesignData.back,
        },
      });

      if (createError) throw createError;
      const orderId = createData.orderId;

      toast.loading('Генерація макетів та A4 розгортки для друку...', { id: toastId });

      // Generate A4 Print Sheets (Side 1 Outer + Side 2 Inner) & Previews
      const printSheets = await composePhysicalA4PrintSheets({
        frontImageUrl: postcardDesignData.front.imageUrl || '',
        caption: postcardDesignData.front.caption,
        useFrame: postcardDesignData.front.useFrame,
        mode: postcardDesignData.front.mode,
        color: postcardDesignData.back.selectedColor,
        personalMessage: postcardDesignData.back.personalMessage,
      });

      // Save A4 print sheets in sessionStorage so the owner can immediately download them on OrderSuccess
      try {
        sessionStorage.setItem(`physical-a4-outer-${orderId}`, printSheets.a4OuterSideBase64);
        sessionStorage.setItem(`physical-a4-inner-${orderId}`, printSheets.a4InnerSideBase64);
      } catch (e) {
        console.warn('SessionStorage quota exceeded for A4 sheets, will rely on uploaded URLs or re-render:', e);
      }

      toast.loading('Завантаження на сервер...', { id: toastId });

      // PHASE 2: Finalize order
      // We upload the A4 Outer Print Sheet as frontImageBase64 or frontPreviewBase64,
      // and also upload A4 sheets to storage if possible
      const { error: finalizeError } = await supabase.functions.invoke('save-order', {
        body: {
          phase: 'finalize',
          preOrderId: storedPreOrderId,
          lyrics,
          musicVariant: selectedMusicVariant,
          pageData: defaultPageInfo,
          frontDesign: postcardDesignData.front,
          backDesign: postcardDesignData.back,
          frontImageBase64: printSheets.frontPreviewBase64,
          backImageBase64: printSheets.insideSpreadPreviewBase64,
          qrCodeUrl: 'physical_sound_postcard',
        },
      });

      if (finalizeError) throw finalizeError;

      toast.success('Замовлення фізичної листівки збережено!', { id: toastId });

      sessionStorage.removeItem('studio-access-token');
      sessionStorage.removeItem('studio-pre-order-id');

      navigate(`/order-success?orderId=${orderId}&type=physical`);
    } catch (error) {
      console.error('Error saving physical order:', error);
      toast.error('Помилка збереження замовлення', { id: toastId });
    }
  };

  // Helper for downloading A4 test sheets directly in Dev Mode
  const handleDownloadSampleA4 = async () => {
    setIsGeneratingDevPrint(true);
    const toastId = toast.loading('Генеруємо тестові листи А4 з лініями різу...');
    try {
      // Create a sample gradient image on the fly if no imageUrl is set
      const sampleCanvas = document.createElement('canvas');
      sampleCanvas.width = 880;
      sampleCanvas.height = 1660;
      const sCtx = sampleCanvas.getContext('2d')!;
      const grad = sCtx.createLinearGradient(0, 0, 0, 1660);
      grad.addColorStop(0, '#4A304D');
      grad.addColorStop(0.5, '#E28743');
      grad.addColorStop(1, '#F5C276');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 880, 1660);
      sCtx.fillStyle = '#FFFFFF';
      sCtx.font = 'bold 64px Georgia, serif';
      sCtx.textAlign = 'center';
      sCtx.fillText('Ти — моє кохання', 440, 260);
      sCtx.fillText('назавжди', 440, 340);

      const sampleImgUrl = designData?.front?.imageUrl || sampleCanvas.toDataURL('image/png');
      const sheets = await composePhysicalA4PrintSheets({
        frontImageUrl: sampleImgUrl,
        caption: designData?.front?.caption || 'Ти — моє кохання назавжди',
        useFrame: designData?.front?.useFrame || false,
        mode: designData?.front?.mode || 'ai-generation',
        color: designData?.back?.selectedColor || '#E8B878',
        personalMessage:
          designData?.back?.personalMessage ||
          'Моя люба, ця пісня — моє серце, що б’ється лише для тебе. Відкрий листівку і почуй слова, які я співав тисячу разів у думках.\n\nТи — моє кохання назавжди. Вийдеш за мене?',
      });

      const downloadDataUrl = (dataUrl: string, filename: string) => {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
      };

      downloadDataUrl(sheets.a4OuterSideBase64, 'A4_Side1_Outer_Print.png');
      setTimeout(() => {
        downloadDataUrl(sheets.a4InnerSideBase64, 'A4_Side2_Inner_Print.png');
      }, 400);

      toast.success('Завантажено обидві сторони А4 для друку!', { id: toastId });
    } catch (e) {
      console.error(e);
      toast.error('Помилка генерації тестового А4', { id: toastId });
    } finally {
      setIsGeneratingDevPrint(false);
    }
  };

  const goToStep = (step: number) => {
    if (DEV_MODE) {
      if (step >= 1.5 && !lyrics) {
        setLyrics(TEST_DATA.lyrics);
      }
      if (step >= 1.5 && recommendedStyles.length === 0) {
        const fallbackStyles = ['pop-dance', 'acoustic-folk', 'soul-emotional', 'romantic-ballad']
          .map(id => getStyleById(id))
          .filter(Boolean) as MusicStyle[];
        setRecommendedStyles(fallbackStyles);
      }
      if (step >= 2 && !selectedStyle) {
        const style = getStyleById('romantic-ballad') || getStyleById('pop-dance');
        if (style) setSelectedStyle(style);
      }
      if (step >= 3 && !selectedMusicVariant) {
        setSelectedMusicVariant(TEST_DATA.musicVariant);
        sessionStorage.setItem('studio-selected-music', JSON.stringify(TEST_DATA.musicVariant));
      }
      setCurrentStep(step);
      setShowWelcome(false);
      if (step === 0) {
        setShowWelcome(true);
        navigate('/studio-physical');
      } else {
        navigate(`/studio-physical?step=${step}`);
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PhysicalWelcomeTutorial onStart={handleWelcomeStart} />;
      case 1:
        return (
          <div className="h-full">
            <Card className="p-4 h-full">
              <ChatInterface
                key={chatKey}
                ref={chatRef}
                initialMessages={chatMessages}
                onMessagesChange={setChatMessages}
                onLyricsGenerated={setLyrics}
                onConfirmLyrics={handleLyricsConfirmed}
              />
            </Card>
          </div>
        );
      case 1.5:
        if (isAnalyzingLyrics) {
          return (
            <Card className="border-border bg-muted/20 max-w-4xl mx-auto">
              <CardContent className="p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <Loader2 className="h-12 w-12 animate-spin text-foreground" />
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
              navigate('/studio-physical?step=1');
            }}
          />
        );
      case 2:
        return (
          <MusicGeneration
            lyrics={lyrics}
            onVariantSelected={handleMusicVariantSelected}
            onRequestSpecialist={() => console.log('Specialist requested')}
            onContinueWithoutSong={handleContinueWithoutSong}
            onBackToLyrics={handleBackToLyrics}
            recommendedStyles={recommendedStyles}
          />
        );
      case 3:
        return (
          <PhysicalPostcardDesign
            lyrics={lyrics}
            onComplete={handlePostcardDesignComplete}
            onBack={() => {
              setCurrentStep(2);
              navigate('/studio-physical?step=2');
            }}
            chatMessages={chatMessages}
          />
        );
      default:
        return null;
    }
  };

  const currentHint = showWelcome ? '' : stepHints[currentStep.toString()];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0F8FF] via-[#F5F3FF] to-white">
      <HeaderExperiment
        hideNav
        showMenu={false}
        ctaLabel={showWelcome ? 'Оформити замовлення' : undefined}
        ctaPath={showWelcome ? '#' : undefined}
        onCtaClick={showWelcome ? () => openOrderDialog('studio_physical_header', 'Оформити замовлення') : undefined}
      />

      {!showWelcome && <PhysicalStepsHeader currentStep={currentStep} />}

      {currentHint && (
        <div className="container mx-auto px-4 mb-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-foreground bg-muted/20 rounded-lg px-4 py-2 text-sm font-light">
              {currentHint}
            </p>
          </div>
        </div>
      )}

      {/* Dev Mode Panel */}
      {DEV_MODE && (
        <div className="fixed top-20 right-4 z-50 bg-background border border-border rounded-lg p-4 shadow-lg min-w-[220px]">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-[#D6336C]" />
              <span className="text-sm font-semibold">Physical Studio Dev</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground mb-1">Швидкий перехід по кроках:</div>
            <div className="flex items-center gap-1.5 mb-2">
              <Button
                variant={showWelcome && currentStep === 0 ? 'default' : 'outline'}
                size="sm"
                onClick={() => goToStep(0)}
                className="h-8 px-2 text-xs"
              >
                W
              </Button>
              {steps.map((step) => (
                <Button
                  key={step.id}
                  variant={currentStep === step.id && !showWelcome ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => goToStep(step.id)}
                  className="h-8 w-8 p-0 text-xs"
                >
                  {step.id}
                </Button>
              ))}
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleDownloadSampleA4}
              disabled={isGeneratingDevPrint}
              className="w-full text-xs flex items-center justify-center gap-1.5"
            >
              {isGeneratingDevPrint ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Printer className="w-3.5 h-3.5" />
              )}
              Скачати А4 розгортку (2 листи)
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/studio')}
              className="w-full text-xs"
            >
              Перейти в QR-студію (/studio)
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                localStorage.removeItem('studio-physical-chat-messages');
                setChatMessages([]);
                setChatKey(prev => prev + 1);
                toast.success('Історію чату очищено');
              }}
              className="text-xs w-full"
            >
              <Trash className="w-3 h-3 mr-1" />
              Очистити чат
            </Button>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)] max-w-3xl">
        {renderStepContent()}
      </main>

      <FooterExperiment />
    </div>
  );
};

export default StudioPhysical;
