import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlayCircle, ArrowRight, ChevronRight, Heart, Music, Image, Send } from 'lucide-react';

interface WelcomeTutorialProps {
  onStart: () => void;
}

export const WelcomeTutorial: React.FC<WelcomeTutorialProps> = ({ onStart }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Welcome Header */}
      <Card className="p-8 text-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Ласкаво просимо до студії створення листівок! 🎉
            </h1>
            <div className="space-y-3">
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Дякуємо, що обрали наш сервіс! 
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Ми допоможемо вам створити неймовірну музичну листівку, яка підкорить серце будь-кого. 
                Разом ми пройдемо весь процес від створення унікальної пісні до красивого дизайну листівки.
              </p>
            </div>
          </div>

          {/* Video Section */}
          <div className="relative bg-muted rounded-xl overflow-hidden aspect-video max-w-3xl mx-auto group hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
              <div className="text-center space-y-4">
                <PlayCircle className="w-20 h-20 text-primary mx-auto group-hover:scale-110 transition-transform duration-300" />
                <div className="space-y-2">
                  <p className="text-lg font-medium text-foreground">Повний огляд процесу створення</p>
                  <p className="text-muted-foreground">
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
      </Card>

      {/* Process Steps Overview */}
      <Card className="p-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground text-center">
            Що нас чекає попереду?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Music className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Крок 1: Створення слів</h3>
                <p className="text-sm text-muted-foreground">
                  Разом з AI створимо унікальний текст пісні для вашої особливої події
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Крок 2: Генерація музики</h3>
                <p className="text-sm text-muted-foreground">
                  Створимо 2 варіанти мелодії і виберемо найкращий для вашої пісні
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Image className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Крок 3: Дизайн листівки</h3>
                <p className="text-sm text-muted-foreground">
                  Оберемо стиль та створимо красивий дизайн для лицьової та зворотної сторони
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Send className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Крок 4: Персональна сторінка</h3>
                <p className="text-sm text-muted-foreground">
                  Створимо спеціальну сторінку з піснею та оформимо все для відправлення
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Promise Section */}
      <Card className="p-6 bg-gradient-to-r from-secondary/5 to-primary/5">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-foreground">
            Наша обіцянка ✨
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ми створимо для вас не просто листівку, а справжній витвір мистецтва. 
            Кожна пісня буде унікальною, кожен дизайн - особливим. 
            Ваш подарунок стане незабутнім!
          </p>
        </div>
      </Card>

      {/* Start Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={onStart}
          size="lg"
          className="min-w-64 gap-3 text-lg py-6"
        >
          Почати створення листівки
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};