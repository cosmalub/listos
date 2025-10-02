import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, CheckCircle, Music } from 'lucide-react';
import { OccasionBackground } from '@/components/public/OccasionBackground';
import { OccasionAnimation } from '@/components/public/OccasionAnimation';
import { Header } from '@/components/sections/header';
import { StepsHeader } from '@/components/studio/StepsHeader';
import { Footer } from '@/components/sections/footer';

const PublicSongDraft = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [draftData, setDraftData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const occasion = searchParams.get('occasion') || 'congratulations';
  const recipient = searchParams.get('recipient') || 'Марії';
  const sender = searchParams.get('sender') || 'Олексія';

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
  }, []);

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
  
  const song = {
    title: musicVariant?.title || "Персональна пісня для вас",
    duration: musicVariant?.duration || "2:45",
    lyrics: lyrics
  };

  const handleApprove = () => {
    alert('Сторінка затверджена та опублікована! Переходимо до наступного кроку.');
    navigate('/studio?step=4');
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In real app, this would control audio playback
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
      <OccasionAnimation occasion={occasion} duration={7000} />
      
      {/* Header */}
      <Header centerTitle="Студія створення листівки" hideNav showMenu={false} />
      
      {/* Steps indicator */}
      <StepsHeader currentStep={3} />

      {/* Main content */}
      <main className="container mx-auto px-4 py-6 sm:py-8 min-h-[calc(100vh-200px)] relative z-10">
        <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
          {/* Song Card */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
            <CardHeader className="text-center pb-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                    Чернетка
                  </Badge>
                  <Badge variant="secondary">
                    {occasion === 'birthday' ? 'День народження' :
                     occasion === 'congratulations' ? 'Вітання' : 
                     occasion === 'thanks' ? 'Подяка' : 
                     occasion === 'apology' ? 'Вибачення' :
                     occasion === 'love' ? 'Кохання' :
                     occasion === 'friendship' ? 'Дружба' : 'Особлива нагода'}
                  </Badge>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Music className="w-5 h-5 text-primary" />
                  <CardTitle className="text-xl sm:text-2xl">{caption || song.title}</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">Для {recipient} від {sender}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
              {/* Audio Player */}
              <div className="bg-gradient-to-br from-muted/80 to-muted/40 rounded-xl p-4 sm:p-5 border border-border/50">
                <div className="flex items-center gap-3 sm:gap-4">
                  <Button
                    size="lg"
                    variant={isPlaying ? "secondary" : "default"}
                    onClick={togglePlay}
                    className="w-14 h-14 rounded-full p-0 shadow-lg"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
                  </Button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-2">
                      <span className="truncate">Ваша персональна пісня</span>
                      <span className="ml-2 flex-shrink-0">{song.duration}</span>
                    </div>
                    <div className="w-full bg-border/50 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full w-1/3 transition-all shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Song Lyrics */}
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-muted/40 to-muted/20 rounded-xl p-4 sm:p-6 border border-border/30">
                  <div className="text-sm sm:text-base whitespace-pre-line leading-relaxed text-foreground/90">
                    {song.lyrics}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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