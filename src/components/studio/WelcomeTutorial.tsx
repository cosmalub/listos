import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlayCircle, ArrowRight, Heart, Music, Image, Send, Star } from 'lucide-react';

interface WelcomeTutorialProps {
  onStart: () => void;
}

export const WelcomeTutorial: React.FC<WelcomeTutorialProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-soft overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-subtle-move"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-subtle-move-slow"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-secondary/30 rounded-full blur-xl animate-subtle-move-reverse"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Welcome Header with Mascot */}
        <Card className="relative overflow-hidden bg-gradient-primary shadow-soft border-0">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative p-8 lg:p-12 text-center">
            <div className="space-y-8">
              {/* Mascot Section */}
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="w-48 h-48 lg:w-64 lg:h-64 flex-shrink-0">
                  <img
                    src="/lovable-uploads/26b60a97-63b1-4ff3-93d6-e0607581e4b0.png"
                    alt="Листосик - кіт-помічник для створення музичних листівок"
                    className="w-full h-full object-contain drop-shadow-2xl animate-subtle-move"
                  />
                </div>
                
                <div className="flex-1 space-y-6 text-left lg:text-left">
                  <div className="space-y-4">
                    <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
                      Ласкаво просимо до студії створення листівок! 🎉
                    </h1>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                      <h2 className="text-xl lg:text-2xl font-bold text-white mb-3">Привіт, я Листосик!</h2>
                      <p className="text-lg text-white/90 leading-relaxed">
                        Дякуємо, що обрали наш сервіс! Я допоможу вам створити неймовірну музичну листівку, 
                        яка підкорить серце будь-кого. Разом ми пройдемо весь процес від створення унікальної 
                        пісні до красивого дизайну листівки.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Section */}
              <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl overflow-hidden aspect-video max-w-4xl mx-auto group hover:shadow-xl transition-all duration-500 border border-white/30">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
                      <PlayCircle className="relative w-24 h-24 text-white mx-auto group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg" />
                    </div>
                    <div className="space-y-3">
                      <p className="text-xl font-bold text-white">Повний огляд процесу створення</p>
                      <p className="text-white/80 text-lg">
                        Подивіться, як легко створити персональну музичну листівку
                      </p>
                    </div>
                  </div>
                </div>
                {/* Uncomment when video is ready */}
                {/* <iframe 
                  src="YOUR_OVERVIEW_VIDEO_URL" 
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                /> */}
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
        <Card className="relative overflow-hidden bg-gradient-to-r from-accent/20 to-primary/20 border-0 shadow-soft">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="relative p-8 text-center space-y-6">
            <div className="flex justify-center mb-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-8 h-8 text-yellow-400 fill-current animate-twinkle"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              Наша обіцянка ✨
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ми створимо для вас не просто листівку, а справжній витвір мистецтва. 
              Кожна пісня буде унікальною, кожен дизайн - особливим. 
              Ваш подарунок стане незабутнім та торкнеться самого серця!
            </p>
          </div>
        </Card>

        {/* Start Button */}
        <div className="flex justify-center pt-8">
          <Button
            onClick={onStart}
            size="lg"
            className="bg-gradient-primary hover:opacity-90 text-white shadow-soft hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-12 py-6 text-xl font-bold rounded-full min-w-80 gap-4"
          >
            🎵 Почати створення листівки
            <ArrowRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};