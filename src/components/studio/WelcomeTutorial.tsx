import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Play, ArrowRight, Music, Heart, Palette, Send, Sparkles, Star, Loader2, Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const DEV_MODE = import.meta.env.DEV;

interface WelcomeTutorialProps {
  onStart: () => void;
}

export const WelcomeTutorial: React.FC<WelcomeTutorialProps> = ({ onStart }) => {
  const [showTokenDialog, setShowTokenDialog] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [isValidating, setIsValidating] = useState(false);

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

  const handleStartClick = () => {
    setShowTokenDialog(true);
  };

  const handleTokenSubmit = async () => {
    if (!accessToken.trim()) {
      toast.error('Будь ласка, введіть код доступу');
      return;
    }

    setIsValidating(true);

    try {
      console.log('Validating access token...');
      
      const { data, error } = await supabase.functions.invoke('validate-studio-token', {
        body: { token: accessToken.trim() }
      });

      if (error) {
        console.error('Error invoking function:', error);
        throw error;
      }

      console.log('Validation response:', data);

      if (data.valid) {
        // Зберігаємо токен і orderId в sessionStorage
        sessionStorage.setItem('studio-access-token', accessToken.trim());
        sessionStorage.setItem('studio-order-id', data.orderId);
        
        console.log('Token validated successfully, stored in sessionStorage');
        
        toast.success(data.message || 'Код доступу підтверджено!');
        
        // Закриваємо діалог і переходимо до студії
        setShowTokenDialog(false);
        setAccessToken('');
        onStart();
      } else {
        toast.error(data.message || 'Невірний код доступу');
      }
    } catch (error) {
      console.error('Error validating token:', error);
      toast.error('Помилка при перевірці коду доступу. Спробуйте ще раз.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!isValidating) {
      setShowTokenDialog(open);
      if (!open) {
        setAccessToken('');
      }
    }
  };

  const handleDevSkip = () => {
    // Імітуємо валідний токен для dev режиму
    sessionStorage.setItem('studio-access-token', 'dev-mode-token');
    sessionStorage.setItem('studio-order-id', 'dev-mode-order-id');
    
    console.log('🔧 DEV MODE: Skipped token validation');
    toast.success('Dev mode: пропущено перевірку токена');
    
    onStart();
  };

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
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleStartClick}
            size="lg"
            className="min-w-[200px]"
          >
            Почати створення
            <ArrowRight className="h-5 w-5" />
          </Button>
          
          {/* Dev кнопка - показується тільки в dev режимі */}
          {DEV_MODE && (
            <Button
              onClick={handleDevSkip}
              size="lg"
              variant="outline"
              className="min-w-[200px] border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950"
            >
              🔧 Skip (Dev)
            </Button>
          )}
        </div>

      {/* Діалог для введення токена */}
      <Dialog open={showTokenDialog} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-[#6A5ACD]" />
              Введіть код доступу
            </DialogTitle>
            <DialogDescription>
              Введіть код доступу, який ви отримали після оплати замовлення
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="access-token">Код доступу</Label>
              <Input
                id="access-token"
                type="text"
                placeholder="Вставте ваш код доступу"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                disabled={isValidating}
                className="text-center font-mono"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isValidating) {
                    handleTokenSubmit();
                  }
                }}
              />
              <p className="text-xs text-muted-foreground">
                Код виглядає як: 12345678-1234-1234-1234-123456789abc
              </p>
            </div>

            <Card className="bg-blue-50 border-blue-200 p-3">
              <p className="text-sm text-blue-900">
                <strong>Не отримали код?</strong><br />
                Зв'яжіться з нами після оплати, і ми відправимо вам код доступу
              </p>
            </Card>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDialogClose(false)}
              disabled={isValidating}
            >
              Скасувати
            </Button>
            <Button
              onClick={handleTokenSubmit}
              disabled={isValidating || !accessToken.trim()}
              className="bg-[#6A5ACD] hover:bg-[#5A4ABD]"
            >
              {isValidating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Перевірка...
                </>
              ) : (
                'Продовжити'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
