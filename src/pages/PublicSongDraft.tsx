import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Info } from 'lucide-react';
import { OccasionBackground } from '@/components/public/OccasionBackground';
import { OccasionAnimation } from '@/components/public/OccasionAnimation';
import { Header } from '@/components/sections/header';
import { StepsHeader } from '@/components/studio/StepsHeader';
import { Footer } from '@/components/sections/footer';

// Визначення мови
const detectLanguage = (text: string): 'uk' | 'ru' => {
  const ukrainianChars = /[іїєґ]/i;
  const russianChars = /[ыэъ]/i;
  
  const hasUkrainian = ukrainianChars.test(text);
  const hasRussian = russianChars.test(text);
  
  if (hasUkrainian && !hasRussian) return 'uk';
  if (hasRussian && !hasUkrainian) return 'ru';
  return 'uk';
};

// Об'єкт локалізації
const locale = {
  uk: {
    for: 'Для:',
    from: 'Від:',
    songCreated: 'Для вас створили пісню:',
    browserNotSupported: 'Ваш браузер не підтримує аудіо елемент.',
  },
  ru: {
    for: 'Для:',
    from: 'От:',
    songCreated: 'Для вас создали песню:',
    browserNotSupported: 'Ваш браузер не поддерживает аудио элемент.',
  }
};

// Очищення тексту пісні
const cleanLyrics = (text: string): string => {
  return text
    .replace(/<LYRICS>|<\/LYRICS>/gi, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\[.*?\]/g, '')
    .replace(/\(.*?\)/g, '')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

// Отримати заголовок події
const getOccasionTitle = (occasion: string, lang: 'uk' | 'ru') => {
  const titles = {
    uk: {
      'birthday': '🎂 З Днем Народження!',
      'anniversary': '💕 З річницею!',
      'new-year': '🎄 З Новим Роком!',
      'congratulations': '🎉 Вітаємо!',
      'thanks': '🙏 Дякуємо!',
      'apology': '😔 Вибачте!',
      'love': '❤️ З любов\'ю!',
      'friendship': '🤝 З дружбою!',
    },
    ru: {
      'birthday': '🎂 С Днем Рождения!',
      'anniversary': '💕 С годовщиной!',
      'new-year': '🎄 С Новым Годом!',
      'congratulations': '🎉 Поздравляем!',
      'thanks': '🙏 Спасибо!',
      'apology': '😔 Извините!',
      'love': '❤️ С любовью!',
      'friendship': '🤝 С дружбой!',
    }
  };
  return titles[lang]?.[occasion] || titles[lang]['congratulations'];
};

const PublicSongDraft = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [draftData, setDraftData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAnimations, setShowAnimations] = useState(false);

  // Load data from sessionStorage
  useEffect(() => {
    const savedData = sessionStorage.getItem('studio-draft-data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setDraftData(parsed);
        console.log('Draft data loaded:', parsed);
      } catch (error) {
        console.error('Error parsing draft data:', error);
      }
    }
    setIsLoading(false);
    
    // Delay animations to ensure page is mounted
    const animTimer = setTimeout(() => {
      setShowAnimations(true);
    }, 300);
    
    return () => clearTimeout(animTimer);
  }, []);

  // Get occasion from draftData first, then URL params, then default
  const occasion = draftData?.occasion || searchParams.get('occasion') || 'congratulations';
  const recipient = draftData?.recipient || searchParams.get('recipient') || 'Марії';
  const sender = draftData?.sender || searchParams.get('sender') || 'Олексія';
  
  console.log('PublicSongDraft - occasion:', occasion, 'showAnimations:', showAnimations);

  // Get song data from sessionStorage or use fallback
  const lyrics = draftData?.lyrics || `Вірш 1:
Сьогодні день особливий настав,
Хочу привітати тебе я.
Нехай удача завжди буде з тобою,
А щастя наповнює життя.

Приспів:
З днем народження вітаю,
Здоров'я, радості бажаю.
Нехай мрії всі збуваються,
А смуток геть розвіється.`;
  
  const caption = draftData?.designData?.front?.caption || 'З найкращими побажаннями';
  const musicVariant = draftData?.musicVariant;
  
  // Визначення мови та заголовка
  const language = detectLanguage(lyrics);
  const occasionTitle = getOccasionTitle(occasion, language);

  const handleApprove = () => {
    alert('Сторінка затверджена та опублікована! Переходимо до наступного кроку.');
    navigate('/studio?step=4');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFD1DC] via-white to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Завантаження...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFD1DC] via-white to-white">
      <OccasionBackground occasion={occasion} />
      {showAnimations && (
        <OccasionAnimation occasion={occasion} duration={7000} />
      )}
      
      {/* Header */}
      <Header centerTitle="Студія створення листівки" hideNav showMenu={false} />
      
      {/* Steps indicator */}
      <StepsHeader currentStep={3} />

      {/* Main content */}
      <main className="container mx-auto px-4 py-6 sm:py-8 min-h-[calc(100vh-200px)] relative z-10">
        <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
          {/* Draft Info Notice */}
          <Alert className="border-blue-200 bg-blue-50/95 dark:bg-blue-950/20 backdrop-blur-sm">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>Це чернетка вашої сторінки</strong> — попередній перегляд того, як буде виглядати фінальна версія для отримувача.
                </p>
                <p className="text-xs text-muted-foreground">
                  Після натискання кнопки "Затвердити сторінку" вона стане доступна за QR-кодом на вашій листівці. Отримувач побачить чисту, елегантну сторінку з піснею, текстом та святковою анімацією — без меню сайту, підвалу чи інших зайвих елементів. Тільки ваш особистий подарунок! 🎁
                </p>
              </div>
            </AlertDescription>
          </Alert>

          {/* Song Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-8">
            {/* Для кого / Від кого — НАД заголовком */}
            <div className="mb-4">
              <p className="text-lg text-center font-baloo text-muted-foreground">
                {locale[language].for} {recipient} • {locale[language].from} {sender}
              </p>
            </div>

            {/* Заголовок */}
            <h1 className="text-4xl font-bold font-baloo text-center mb-8">
              {caption || occasionTitle}
            </h1>

            {/* Стандартний HTML аудіо плеєр */}
            {musicVariant?.audio_url && (
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  {locale[language].songCreated}
                </h3>
                <audio controls className="mx-auto w-full max-w-md">
                  <source src={musicVariant.audio_url} type="audio/mpeg" />
                  {locale[language].browserNotSupported}
                </audio>
              </div>
            )}

            {/* Текст пісні з HTML рендерингом */}
            {lyrics && (
              <div className="bg-gradient-to-r from-[hsl(var(--primary))]/10 to-[hsl(var(--secondary))]/10 rounded-lg p-6">
                <div 
                  className="whitespace-pre-wrap text-center"
                  dangerouslySetInnerHTML={{
                    __html: cleanLyrics(lyrics)
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Sticky bottom buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/98 backdrop-blur-md border-t border-border p-3 sm:p-4 z-20 shadow-lg">
        <div className="container mx-auto max-w-2xl">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/studio?step=4')}
              className="w-full sm:w-auto text-center text-sm sm:text-base"
            >
              Повернутися до редагування
            </Button>
            <Button 
              onClick={handleApprove} 
              className="w-full sm:w-auto sm:min-w-[200px] text-center text-sm sm:text-base"
            >
              <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="whitespace-nowrap">Затвердити сторінку</span>
            </Button>
          </div>
          {/* Footer note */}
          <div className="text-center text-xs sm:text-sm text-muted-foreground mt-2">
            <p>Після затвердження ця сторінка буде доступна за QR-кодом на листівці</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublicSongDraft;