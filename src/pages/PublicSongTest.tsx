import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { OccasionBackground } from '@/components/public/OccasionBackground';
import { Play, Pause, Volume2, Heart, Share2, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

const demoData = {
  occasion: 'congratulations',
  recipient: 'Марії',
  sender: 'Олексія',
  tone: 'heartfelt',
  customMessage: 'Дорога Маріє! Ця пісня написана спеціально для тебе з нагоди твого дня народження. Нехай вона принесе тобі радість та натхнення. З любов\'ю, Олексій 💫',
  lyrics: `Verse 1:
В цей особливий день для тебе
Хочу співати пісню ніжну
Маріє, ти - як зірка в небі
Освітлюєш дорогу віщу

Chorus:
З днем народження, дорога
Нехай щастя буде много
Кожен день приносить радість
Та здійснюються мрії

Verse 2:
Роки минають, ти цвітеш
Як весняна квітка красива
Посмішкою світ яскравіш
Серце наповнюєш силою`,
  musicVariant: {
    id: 'demo-1',
    title: 'Ніжна балада',
    description: 'Спокійна мелодія з акустичною гітарою',
    style: 'acoustic',
    duration: 180
  }
};

export default function PublicSongTest() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = demoData.musicVariant.duration;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Simulate audio playback
    if (!isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            clearInterval(interval);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="min-h-screen relative">
      <OccasionBackground occasion={demoData.occasion} />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 border">
              <Heart className="h-4 w-4 text-primary fill-current" />
              <span className="text-sm font-medium">Персональна пісня</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Для {demoData.recipient}
              </h1>
              <p className="text-lg text-muted-foreground">
                Від {demoData.sender}
              </p>
            </div>
          </div>

          {/* Message Card */}
          <Card className="bg-background/90 backdrop-blur-sm border-primary/20 shadow-soft">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary-foreground fill-current" />
                </div>
                <p className="text-lg leading-relaxed text-foreground">
                  {demoData.customMessage}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Audio Player */}
          <Card className="bg-background/90 backdrop-blur-sm border-primary/20 shadow-soft">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">{demoData.musicVariant.title}</h3>
                  <p className="text-muted-foreground">{demoData.musicVariant.description}</p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    onClick={handlePlayPause}
                    size="lg"
                    className={cn(
                      "w-16 h-16 rounded-full bg-gradient-primary hover:shadow-soft transition-all",
                      isPlaying && "animate-pulse"
                    )}
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6 ml-1" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lyrics */}
          <Card className="bg-background/90 backdrop-blur-sm border-primary/20 shadow-soft">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-center">Текст пісні</h3>
              <div className="space-y-4 text-center">
                {demoData.lyrics.split('\n\n').map((verse, index) => (
                  <div key={index} className="space-y-1">
                    {verse.split('\n').map((line, lineIndex) => (
                      <p key={lineIndex} className={cn(
                        "leading-relaxed",
                        line.startsWith('Verse') || line.startsWith('Chorus') 
                          ? "font-semibold text-primary mt-4" 
                          : "text-foreground"
                      )}>
                        {line}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3">
            <Button variant="outline" size="sm" className="bg-background/80">
              <Share2 className="h-4 w-4 mr-2" />
              Поділитися
            </Button>
            <Button variant="outline" size="sm" className="bg-background/80">
              <Download className="h-4 w-4 mr-2" />
              Завантажити
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground mt-8">
            <p>Створено за допомогою Листосик</p>
          </div>
        </div>
      </div>
    </div>
  );
}