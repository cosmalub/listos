import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Play, ArrowRight, Music, Heart, Palette, Send, Sparkles, Star, Loader2, Lock, CheckCircle, Gift } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useOrderDialog } from '@/components/order/OrderDialogContext';

const DEV_MODE = import.meta.env.DEV;

interface WelcomeTutorialProps {
  onStart: () => void;
}

export const WelcomeTutorial: React.FC<WelcomeTutorialProps> = ({ onStart }) => {
  const [showTokenDialog, setShowTokenDialog] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const { openOrderDialog } = useOrderDialog();

  const steps = [
    {
      id: 1,
      icon: Music,
      title: "Слова та музика",
      description: "Створимо унікальну пісню разом з AI",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      iconColor: "text-purple-600"
    },
    {
      id: 2,
      icon: Heart,
      title: "Вибір мелодії",
      description: "Оберемо найкращий варіант з 2-х",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      iconColor: "text-red-600"
    },
    {
      id: 3,
      icon: Palette,
      title: "Дизайн листівки",
      description: "Створимо красивий персональний дизайн",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      iconColor: "text-blue-600"
    },
    {
      id: 4,
      icon: Send,
      title: "Готова сторінка",
      description: "Персональна сторінка з QR-кодом",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      iconColor: "text-green-600"
    },
    {
      id: 5,
      icon: Gift,
      title: "Відправка",
      description: "Відправляємо готову фізичну листівку вам",
      color: "from-orange-500 to-yellow-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
      iconColor: "text-orange-600"
    }
  ];

  const userSteps = steps.slice(0, 4);
  const systemStep = steps[4];

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
        // ОЧИЩАЄМО ВСІ СТАРІ ДАНІ ПЕРЕД НОВИМ ЗАМОВЛЕННЯМ
        localStorage.removeItem('studio-chat-messages');
        sessionStorage.removeItem('studio-draft-data');
        sessionStorage.removeItem('music-parameters');
        sessionStorage.removeItem('studio-selected-music');

        // Зберігаємо новий токен і preOrderId
        sessionStorage.setItem('studio-access-token', accessToken.trim());
        sessionStorage.setItem('studio-pre-order-id', data.preOrderId);

        console.log('Token validated successfully, cleared old data, stored new token');

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
    // ОЧИЩАЄМО ВСІ СТАРІ ДАНІ
    localStorage.removeItem('studio-chat-messages');
    sessionStorage.removeItem('studio-draft-data');
    sessionStorage.removeItem('music-parameters');
    sessionStorage.removeItem('studio-selected-music');

    // Імітуємо валідний токен для dev режиму
    sessionStorage.setItem('studio-access-token', 'dev-mode-token');
    sessionStorage.setItem('studio-pre-order-id', 'dev-mode-pre-order-id');

    console.log('🔧 DEV MODE: Cleared old data, skipped token validation');
    toast.success('Dev mode: пропущено перевірку токена');

    onStart();
  };

  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      {/* Promise text - integrated into page flow */}
      <div className="text-center mb-20 md:mb-24 mt-4 md:mt-8">
        <h3 className="text-2xl md:text-3xl font-bold text-[#6A5ACD] mb-6">
          Разом створимо шедевр
        </h3>
        <p className="text-lg md:text-xl text-slate-900 dark:text-white max-w-2xl mx-auto leading-relaxed">
          Ви створите неймовірну музичну листівку, яка точно вразить отримувача. Листосик допоможе на кожному кроці!
        </p>
      </div>

      {/* Lystosyk with Speech Bubble */}
      <div className="max-w-5xl mx-auto mt-0 mb-20 md:mb-24 px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
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

              <h3 className="text-xl font-bold text-[#6A5ACD] mb-3 text-left">4 прості кроки створенння + доставка</h3>
              <p className="text-muted-foreground text-left">
                Спершу ми створимо слова, далі — згенеруємо унікальну пісню та сторінку для неї.
                А на завершення — зробимо дизайн самої листівки. Я буду поруч на кожному кроці!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Steps integrated into page flow */}
      <div className="mb-20 md:mb-24">
        <div className="bg-transparent py-6">
          <div className="container mx-auto px-4">
            {/* Desktop: Horizontal layout with connecting lines */}
            <div className="hidden md:flex items-start justify-center gap-4 max-w-5xl mx-auto">
              {userSteps.map((step, index, array) => (
                <div key={step.id} className="contents">
                  <div className="flex flex-col items-center w-36">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 bg-background border-border text-muted-foreground transition-colors relative z-10">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-sm font-medium text-foreground">
                        {step.title}
                      </div>
                      <div className="text-xs text-muted-foreground whitespace-pre-line">
                        {step.description}
                      </div>
                    </div>
                  </div>
                  {index < array.length - 1 && (
                    <div className="h-0.5 w-12 mt-5 bg-border transition-colors" />
                  )}
                </div>
              ))}

              {/* Arrow to system step */}
              <div className="h-0.5 w-16 mt-5 bg-gradient-to-r from-border to-orange-400 transition-colors relative">
                <div className="absolute right-0 -top-1.5 text-orange-400">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* System step (Delivery) */}
              <div className="flex flex-col items-center w-40 relative">

                <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-orange-400 bg-orange-50 text-orange-600 shadow-sm z-10">
                  <Gift className="w-6 h-6" />
                </div>
                <div className="mt-2 text-center">
                  <div className="text-sm font-bold text-orange-600">
                    {systemStep.title}
                  </div>
                  <div className="text-xs text-orange-600/80 whitespace-pre-line font-medium">
                    {systemStep.description}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: Compact grid layout */}
            <div className="md:hidden flex flex-col gap-6 max-w-sm mx-auto">
              <div className="grid grid-cols-4 gap-2">
                {userSteps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 bg-background border-border text-muted-foreground transition-colors">
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                    <div className="mt-1 text-center h-8 overflow-hidden">
                      <div className="text-xs leading-tight font-medium text-foreground">
                        {step.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative border-t pt-4 border-dashed border-orange-200">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-min-h-screen px-2 text-xs text-orange-400 bg-[#FFD1DC] rounded-full px-2">
                  Ми робимо
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-orange-400 bg-orange-50 text-orange-600">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-orange-600">
                      {systemStep.title}
                    </div>
                    <div className="text-xs text-orange-600/80">
                      {systemStep.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Start Button */}
      <div className="flex flex-col items-center gap-4">
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

        <p className="text-sm text-muted-foreground text-center">
          Ще немає коду доступу?{' '}
          <button
            type="button"
            onClick={openOrderDialog}
            className="text-[#6A5ACD] hover:underline font-medium bg-transparent border-0 p-0 cursor-pointer inline"
          >
            Оформити замовлення
          </button>
        </p>
      </div>

      {/* Діалог для введення токена */}
      <Dialog open={showTokenDialog} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-[#6A5ACD]" />
              Введіть код доступу
            </DialogTitle>
            <DialogDescription className="space-y-2">
              <p>Введіть код доступу, який ви отримали на email/telegram після оплати.</p>
              <p className="text-sm">Або просто перейдіть за посиланням з email/telegram — код підставиться автоматично.</p>
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

            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-purple-200 p-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-purple-900">
                    <strong>Не отримали код?</strong><br />
                    Зв'яжіться з нами після оплати, і ми відправимо вам код доступу
                  </p>
                </div>

                <div className="border-t border-purple-200 pt-3">
                  <p className="text-sm text-purple-900">
                    <strong>У вас ще немає коду?</strong><br />
                    Ви можете{' '}
                    <button
                      className="text-[#6A5ACD] underline hover:text-[#5A4ABD] font-semibold bg-transparent border-0 p-0 cursor-pointer inline"
                      onClick={(e) => {
                        e.preventDefault();
                        openOrderDialog();
                      }}
                    >
                      оформити замовлення тут
                    </button>
                    {' '}і отримати код доступу після оплати
                  </p>
                </div>
              </div>
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
