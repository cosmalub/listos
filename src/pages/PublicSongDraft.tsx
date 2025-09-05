import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, CheckCircle } from 'lucide-react';
import { OccasionBackground } from '@/components/public/OccasionBackground';
import { Header } from '@/components/sections/header';
import { StepsHeader } from '@/components/studio/StepsHeader';
import { Footer } from '@/components/sections/footer';

const PublicSongDraft = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const occasion = searchParams.get('occasion') || 'congratulations';
  const recipient = searchParams.get('recipient') || 'Марії';
  const sender = searchParams.get('sender') || 'Олексія';
  const tone = searchParams.get('tone') || 'friendly';

  // Demo song data
  const song = {
    title: "Персональна пісня для вас",
    duration: "2:45",
    lyrics: `Вірш 1:
Сьогодні день особливий настав,
Хочу привітати тебе я.
Нехай удача завжди буде з тобою,
А щастя наповнює життя.

Приспів:
З днем народження вітаю,
Здоров'я, радості бажаю.
Нехай мрії всі збуваються,
А смуток геть розвіється.

Вірш 2:
Хай кожен день приносить новий світ,
А серце завжди буде молодим.
Нехай любов і дружба оточують,
А життя буде яскравим і теплим.`
  };

  useEffect(() => {
    // Generate default message
    const toneMap: Record<string, string> = {
      formal: 'офіційному',
      friendly: 'дружньому', 
      romantic: 'романтичному',
      playful: 'грайливому',
      heartfelt: 'щирому',
      humorous: 'гумористичному'
    };

    const occasionMap: Record<string, string> = {
      birthday: 'дня народження',
      congratulations: 'вітання',
      thanks: 'подяки',
      apology: 'вибачення',
      love: 'кохання',
      friendship: 'дружби',
      holiday: 'свята',
      other: 'особливої нагоди'
    };

    const defaultMessage = `Дорог${recipient.endsWith('ї') || recipient.endsWith('і') ? 'а' : 'ий'} ${recipient}! 

Ця пісня створена спеціально для тебе з нагоди ${occasionMap[occasion] || occasion}. Нехай вона принесе тобі радість та натхнення.

З любов'ю, ${sender} 💫`;

    setMessage(defaultMessage);

    // Show confetti for congratulations
    if (occasion === 'congratulations') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [occasion, recipient, sender]);

  const handleApprove = () => {
    // Save the message and redirect to next step
    console.log('Final message:', message);
    alert('Сторінка затверджена та опублікована! Переходимо до наступного кроку.');
    navigate('/studio?step=4');
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In real app, this would control audio playback
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFD1DC] via-white to-white">
      <OccasionBackground occasion={occasion} />
      
      {/* Header */}
      <Header centerTitle="Студія створення листівки" hideNav showMenu={false} />
      
      {/* Steps indicator */}
      <StepsHeader currentStep={3} />

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)] relative z-10">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Song Card */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                    Чернетка
                  </Badge>
                  <Badge variant="secondary" className="mx-auto">
                    {occasion === 'congratulations' ? 'Вітання' : 
                     occasion === 'thanks' ? 'Подяка' : 
                     occasion === 'apology' ? 'Вибачення' : 'Особлива нагода'}
                  </Badge>
                </div>
                <CardTitle className="text-2xl">{song.title}</CardTitle>
                <p className="text-muted-foreground">Для {recipient} від {sender}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Audio Player */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <Button
                    size="lg"
                    variant={isPlaying ? "secondary" : "default"}
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full p-0"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
                      <span>Ваша персональна пісня</span>
                      <span>{song.duration}</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-1/3 transition-all"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Song Lyrics */}
              <div className="space-y-2">
                <h3 className="font-medium">Текст пісні</h3>
                <div className="bg-muted/30 rounded-lg p-4 text-sm whitespace-pre-line">
                  {song.lyrics}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Message Editor */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Особисте повідомлення</CardTitle>
              <p className="text-sm text-muted-foreground">
                Відредагуйте повідомлення, яке побачить {recipient}
              </p>
            </CardHeader>
            <CardContent>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px] resize-none"
                maxLength={300}
              />
              <p className="text-xs text-muted-foreground mt-2">
                {message.length}/300 символів
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Sticky bottom buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 z-20 pb-safe">
        <div className="container mx-auto max-w-2xl">
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/studio?step=3')}
              className="w-full sm:w-auto text-center"
            >
              Повернутися до редагування
            </Button>
            <Button 
              onClick={handleApprove} 
              className="w-full sm:w-auto sm:min-w-[200px] text-center"
            >
              <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="whitespace-nowrap">Затвердити сторінку</span>
            </Button>
          </div>
          {/* Footer note */}
          <div className="text-center text-sm text-muted-foreground mt-2">
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