import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, ArrowRight, Music, Heart, Palette, Send, Sparkles, Star } from 'lucide-react';

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
    <div className="min-h-screen px-4 py-8">
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

                <h3 className="text-xl font-bold text-[#6A5ACD] mb-3 text-left">Як це працює?</h3>
                <p className="text-muted-foreground text-left">
                  Подивіться на відео нижче, щоб зрозуміти, як працює процес створення музичної листівки.
                  Я крок за кроком покажу, як створити унікальний подарунок з піснею!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Section - integrated into page flow */}
        <div className="mb-16 text-center">
          <div className="relative aspect-video max-w-2xl mx-auto rounded-2xl overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <Play className="h-12 w-12 text-primary fill-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Promise text - integrated into page flow */}
        <div className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-[#6A5ACD] mb-4">
            Разом створимо шедевр
          </h3>
          <p className="text-lg md:text-xl text-slate-900 dark:text-white max-w-2xl mx-auto">
            Ви створите неймовірну музичну листівку, яка точно вразить отримувача. Листосик допоможе на кожному кроці!
          </p>
        </div>

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
  );
};
