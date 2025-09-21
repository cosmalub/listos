import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlayCircle, ArrowRight, Heart, Music, Image, Send, Star } from 'lucide-react';

interface WelcomeTutorialProps {
  onStart: () => void;
}

export const WelcomeTutorial: React.FC<WelcomeTutorialProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 space-y-12">
        {/* Mascot with speech bubble */}
        <div className="flex justify-center mb-16">
          <div className="relative flex flex-col items-center">
            <div className="w-24 h-24 mb-4">
              <img
                src="/lovable-uploads/26b60a97-63b1-4ff3-93d6-e0607581e4b0.png"
                alt="Листосик - кіт-помічник для створення музичних листівок"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="relative bg-card backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border max-w-md">
              <p className="text-base font-medium text-foreground text-center">
                Привіт, я Листосик! 👋 Допоможу тобі створити незабутню музичну листівку
              </p>
              {/* Speech bubble arrow */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-card"></div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <Card className="bg-card/80 backdrop-blur-sm shadow-lg border">
          <div className="relative overflow-hidden aspect-video group">
            <div className="absolute inset-0 bg-muted/20 flex items-center justify-center">
              <div className="text-center space-y-4">
                <PlayCircle className="w-16 h-16 text-primary mx-auto group-hover:scale-110 transition-transform duration-300" />
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-foreground">Повний огляд процесу створення</p>
                  <p className="text-muted-foreground">
                    Подивіться, як легко створити персональну музичну листівку
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Process Steps Overview */}
        <Card className="bg-card/80 backdrop-blur-sm shadow-card border border-border/50">
          <div className="p-8 space-y-8">
            <h2 className="text-3xl font-bold text-foreground text-center">
              Що нас чекає попереду?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Step 1 */}
              <div className="relative group">
                <div className="bg-card rounded-2xl border-l-4 border-primary/60 hover:border-primary p-6 h-full transition-all duration-300 hover:shadow-soft transform hover:-translate-y-1">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xl font-bold shadow-soft">
                    1
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Music className="w-8 h-8 text-primary" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-foreground">Створення слів і музики</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Разом з AI створимо унікальний текст пісні та мелодію для вашої особливої події. 
                        Отримаєте готову персоналізовану пісню одразу після створення.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group">
                <div className="bg-card rounded-2xl border-l-4 border-accent/60 hover:border-accent p-6 h-full transition-all duration-300 hover:shadow-soft transform hover:-translate-y-1">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center text-white text-xl font-bold shadow-soft">
                    2
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <Heart className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-foreground">Вибір варіантів музики</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Створимо 2 варіанти мелодії і виберемо найкращий для вашої пісні. 
                        Ви зможете прослухати та обрати той, що найбільше підходить.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group">
                <div className="bg-card rounded-2xl border-l-4 border-secondary/60 hover:border-secondary p-6 h-full transition-all duration-300 hover:shadow-soft transform hover:-translate-y-1">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center text-foreground text-xl font-bold shadow-soft">
                    3
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/30 transition-colors">
                      <Image className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-foreground">Дизайн листівки</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Оберемо стиль та створимо красивий дизайн для лицьової та зворотної сторони. 
                        Додамо особисті слова та підпис для неповторності.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative group">
                <div className="bg-card rounded-2xl border-l-4 border-primary/60 hover:border-primary p-6 h-full transition-all duration-300 hover:shadow-soft transform hover:-translate-y-1">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xl font-bold shadow-soft">
                    4
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Send className="w-8 h-8 text-primary" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-foreground">Персональна сторінка</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Створимо спеціальну сторінку з піснею та QR-кодом. 
                        Ваша унікальна листівка буде готова для подарування!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Promise Section */}
        <Card className="bg-muted/30 border">
          <div className="p-6 text-center space-y-4">
            <h3 className="text-xl font-semibold text-foreground">
              Наша обіцянка ✨
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ми створимо для вас не просто листівку, а справжній витвір мистецтва. 
              Кожна пісня буде унікальною, кожен дизайн - особливим.
            </p>
          </div>
        </Card>

        {/* Start Button */}
        <div className="flex justify-center pt-8">
          <Button
            onClick={onStart}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg font-semibold rounded-lg gap-3"
          >
            🎵 Почати створення листівки
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};