import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlayCircle, ArrowRight, ChevronRight } from 'lucide-react';

interface PostcardTutorialProps {
  onContinue: () => void;
  onSkip?: () => void;
}

export const PostcardTutorial: React.FC<PostcardTutorialProps> = ({
  onContinue,
  onSkip
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Main Video Section */}
      <Card className="p-8 text-center bg-gradient-to-br from-background to-muted/20">
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-foreground">
              Знайомство з дизайном листівки
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Перш ніж почати створювати дизайн, давайте розберемося, 
              як буде виглядати ваша листівка і що вас чекає на наступних кроках
            </p>
          </div>

          {/* Video Placeholder */}
          <div className="relative bg-muted rounded-xl overflow-hidden aspect-video max-w-2xl mx-auto group hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <div className="text-center space-y-4">
                <PlayCircle className="w-16 h-16 text-primary mx-auto group-hover:scale-110 transition-transform duration-300" />
                <div className="space-y-2">
                  <p className="font-medium text-foreground">Відео-інструкція</p>
                  <p className="text-sm text-muted-foreground">
                    Дізнайтеся, як створити ідеальну листівку
                  </p>
                </div>
              </div>
            </div>
            {/* Uncomment when video is ready */}
            {/* <iframe 
              src="YOUR_VIDEO_URL" 
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            /> */}
          </div>
        </div>
      </Card>

      {/* Explanation Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Front Side */}
        <Card className="p-6 border-l-4 border-l-primary">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Лицьова частина
              </h3>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>
                На лицьовій стороні буде розміщено:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Зображення</strong> - згенероване AI або ваше фото</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Підпис</strong> - короткий текст до листівки</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Стиль оформлення</strong> - художнє направлення</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Back Side */}
        <Card className="p-6 border-l-4 border-l-secondary">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="text-secondary font-bold text-sm">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Зворотна частина
              </h3>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>
                На зворотній стороні буде розміщено:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  <span><strong>QR-код</strong> - посилання на персональну сторінку</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  <span><strong>Адреса отримувача</strong> - куди відправляти</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  <span><strong>Марка та оформлення</strong> - відповідно до теми</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Process Overview */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground text-center">
            Що відбувається далі?
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-primary font-bold">1</span>
              </div>
              <p className="font-medium text-foreground">Створюємо лицьову частину</p>
              <p className="text-sm text-muted-foreground">Вибираємо стиль і генеруємо зображення</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-primary font-bold">2</span>
              </div>
              <p className="font-medium text-foreground">Створюємо зворотну частину</p>
              <p className="text-sm text-muted-foreground">Налаштовуємо QR-код і адресу</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-primary font-bold">3</span>
              </div>
              <p className="font-medium text-foreground">Готова листівка</p>
              <p className="text-sm text-muted-foreground">Переглядаємо результат і замовляємо</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center pt-4">
        {onSkip && (
          <Button
            variant="outline"
            onClick={onSkip}
            className="min-w-32"
          >
            Пропустити
          </Button>
        )}
        <Button
          onClick={onContinue}
          size="lg"
          className="min-w-48 gap-2"
        >
          Почати дизайн лицьової частини
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};