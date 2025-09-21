import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlayCircle, ArrowRight, Music, Heart, Palette, Send, Sparkles, Star } from 'lucide-react';

interface WelcomeTutorialProps {
  onStart: () => void;
}

export const WelcomeTutorial: React.FC<WelcomeTutorialProps> = ({ onStart }) => {
  const steps = [
    {
      icon: Music,
      title: "Слова та музика",
      description: "Створимо унікальну пісню разом з AI",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      iconColor: "text-purple-600"
    },
    {
      icon: Heart,
      title: "Вибір мелодії",
      description: "Оберемо найкращий варіант з 2-х",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      iconColor: "text-red-600"
    },
    {
      icon: Palette,
      title: "Дизайн листівки",
      description: "Створимо красивий персональний дизайн",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      iconColor: "text-blue-600"
    },
    {
      icon: Send,
      title: "Готова сторінка",
      description: "Персональна сторінка з QR-кодом",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      iconColor: "text-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-950">
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Lystosyk with Speech Bubble */}
        <div className="max-w-5xl mx-auto mt-0 mb-8 px-4">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            {/* Cat Image */}
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                src="/lovable-uploads/26b60a97-63b1-4ff3-93d6-e0607581e4b0.png"
                alt="Листосик - кіт-помічник"
                className="w-48 h-48 transform transition-transform hover:scale-105 drop-shadow-2xl"
              />
            </div>

            {/* Speech Bubble */}
            <div className="w-full md:w-2/3 relative group">
              <div className="bg-card p-6 rounded-3xl border-2 border-[#B8B3FF]/60 group-hover:border-[#B8B3FF] transition-colors group-hover:shadow-md relative">
                {/* Speech bubble pointer */}
                <div className="hidden md:block absolute top-1/2 -left-3 transform -translate-y-1/2 w-6 h-6 rotate-45 border-l-2 border-b-2 border-[#B8B3FF]/60 group-hover:border-[#B8B3FF] transition-colors bg-card"></div>

                <p className="text-muted-foreground text-left">
                  Подивіться на відео нижче, щоб зрозуміти, як працює процес створення музичної листівки.
                  Я крок за кроком покажу, як створити унікальний подарунок з піснею!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Video Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#6A5ACD]">
            Як це працює?
          </h1>
          <p className="text-lg md:text-xl mb-8 text-[#6A5ACD]/80">
            Подивіться демонстрацію процесу створення
          </p>
        </div>

        {/* Demo Video Placeholder */}
        <Card className="bg-white dark:bg-slate-800 shadow-xl border-0 overflow-hidden mb-12">
          <div className="relative aspect-video group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-lg">
                    <PlayCircle className="w-10 h-10 text-purple-600" />
                  </div>
                  <div className="absolute -inset-2 bg-purple-400/30 rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                    Як це працює?
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Натисніть, щоб переглянути процес
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>


        {/* Collaboration Section */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-0 shadow-lg mb-12">
          <div className="p-8 text-center">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">
              Разом створимо шедевр
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Ви створите неймовірну музичну листівку, яка точно вразить отримувача. Листосик допоможе на кожному кроці!
            </p>
          </div>
        </Card>

        {/* Start Button */}
        <div className="flex justify-center">
          <Button
            onClick={onStart}
            size="lg"
            className="bg-[#6A5ACD] hover:bg-[#5A4ABD] text-white px-8 py-4 text-lg font-semibold rounded-lg"
          >
            Почати створення
          </Button>
        </div>
      </div>
    </div>
  );
};
