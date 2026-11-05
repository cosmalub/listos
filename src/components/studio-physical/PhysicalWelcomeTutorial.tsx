import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowRight, Music, Heart, Palette, Volume2, Loader2, Lock, Gift } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useOrderDialog } from '@/components/order/OrderDialogContext';
import { posthog } from '@/providers/PostHogProvider';

const DEV_MODE = import.meta.env.DEV;

interface PhysicalWelcomeTutorialProps {
  onStart: () => void;
}

export const PhysicalWelcomeTutorial: React.FC<PhysicalWelcomeTutorialProps> = ({ onStart }) => {
  const [showTokenDialog, setShowTokenDialog] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const { openOrderDialog } = useOrderDialog();

  const userSteps = [
    {
      id: 1,
      icon: Music,
      title: 'Слова пісні',
      description: 'Створимо особистий текст пісні разом з AI',
    },
    {
      id: 2,
      icon: Heart,
      title: 'Вибір мелодії',
      description: 'Згенеруємо 2 варіанти треку на вибір',
    },
    {
      id: 3,
      icon: Palette,
      title: 'Дизайн та привітання',
      description: 'Обкладинка та внутрішній розворот (88×166 мм)',
    },
  ];

  const systemStep = {
    id: 4,
    icon: Volume2,
    title: 'Звукова листівка',
    description: 'Записуємо пісню в звуковий модуль і відправляємо вам',
  };

  const handleTokenSubmit = async () => {
    const rawToken = accessToken.trim();
    if (!rawToken) {
      toast.error('Будь ласка, введіть код доступу');
      return;
    }

    setIsValidating(true);

    try {
      // Allow optional prefix like "SOUND-" or "PHYS-" on top of standard UUID token
      const cleanToken = rawToken.replace(/^(SOUND-|PHYS-)/i, '').trim();

      const { data, error } = await supabase.functions.invoke('validate-studio-token', {
        body: { token: cleanToken }
      });

      if (error) throw error;

      if (data.valid) {
        localStorage.removeItem('studio-physical-chat-messages');
        sessionStorage.removeItem('studio-physical-draft-data');
        sessionStorage.removeItem('music-parameters');
        sessionStorage.removeItem('studio-selected-music');

        sessionStorage.setItem('studio-access-token', cleanToken);
        sessionStorage.setItem('studio-pre-order-id', data.preOrderId);
        sessionStorage.setItem('studio-type', 'physical');

        posthog.capture('studio_started', { postcard_type: 'physical_sound' });
        toast.success('Код доступу підтверджено! Створюємо звукову листівку');

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

  const handleDevSkip = () => {
    localStorage.removeItem('studio-physical-chat-messages');
    sessionStorage.removeItem('studio-physical-draft-data');
    sessionStorage.removeItem('music-parameters');
    sessionStorage.removeItem('studio-selected-music');

    sessionStorage.setItem('studio-access-token', 'dev-mode-token');
    sessionStorage.setItem('studio-pre-order-id', 'dev-mode-pre-order-id');
    sessionStorage.setItem('studio-type', 'physical');

    posthog.capture('studio_started', { dev_mode: true, postcard_type: 'physical_sound' });
    toast.success('Dev mode: пропущено перевірку токена (фізична листівка)');
    onStart();
  };

  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <div className="text-center mb-16 md:mb-20 mt-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#FF85A2]/15 text-[#D6336C] px-4 py-1.5 text-xs sm:text-sm font-semibold mb-4">
          <Volume2 className="w-4 h-4" />
          Студія створення фізичної звукової листівки
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Листівка, що співає при відкритті
        </h3>
        <p className="text-base md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Ви створите власну пісню, обкладинку та внутрішній розворот з привітанням, а ми вмонтуємо звуковий модуль і надішлемо готову листівку Новою Поштою!
        </p>
      </div>

      {/* Lystosyk with Speech Bubble */}
      <div className="max-w-5xl mx-auto mt-0 mb-16 md:mb-20 px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src="/lovable-uploads/26b60a97-63b1-4ff3-93d6-e0607581e4b0.png"
              alt="Листосик - кіт-помічник"
              className="w-44 h-44 transform transition-transform hover:scale-105 drop-shadow-2xl"
            />
          </div>

          <div className="w-full md:w-2/3 relative group">
            <div className="bg-card p-6 rounded-3xl border-2 border-[#B8B3FF]/60 group-hover:border-[#B8B3FF] transition-colors group-hover:shadow-md relative">
              <div className="hidden md:block absolute top-1/2 -left-3 transform -translate-y-1/2 w-6 h-6 rotate-45 border-l-2 border-b-2 border-[#B8B3FF]/60 group-hover:border-[#B8B3FF] transition-colors bg-card"></div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center md:text-left">
                3 прості кроки + виробництво зі звуковим модулем
              </h3>
              <p className="text-muted-foreground text-center md:text-left">
                Спершу ми напишемо слова пісні та згенеруємо мелодію. А далі — оформимо лицьову обкладинку (88×166 мм) і внутрішній розворот з вашим привітанням. Ніяких QR-кодів — музика гратиме сама при відкритті листівки!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Steps overview */}
      <div className="mb-16 md:mb-20">
        <div className="bg-transparent py-4">
          <div className="container mx-auto px-4">
            <div className="hidden md:flex items-start justify-center gap-4 max-w-4xl mx-auto">
              {userSteps.map((step, index, array) => (
                <div key={step.id} className="contents">
                  <div className="flex flex-col items-center w-40">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 bg-background border-border text-muted-foreground relative z-10">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-sm font-medium text-foreground">{step.title}</div>
                      <div className="text-xs text-muted-foreground whitespace-pre-line">{step.description}</div>
                    </div>
                  </div>
                  {index < array.length - 1 && (
                    <div className="h-0.5 w-12 mt-5 bg-border" />
                  )}
                </div>
              ))}

              <div className="h-0.5 w-16 mt-5 bg-gradient-to-r from-border to-orange-400 relative">
                <div className="absolute right-0 -top-1.5 text-orange-400">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              <div className="flex flex-col items-center w-44 relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-orange-400 bg-orange-50 text-orange-600 shadow-sm z-10">
                  <Gift className="w-6 h-6" />
                </div>
                <div className="mt-2 text-center">
                  <div className="text-sm font-bold text-orange-600">{systemStep.title}</div>
                  <div className="text-xs text-orange-600/80 whitespace-pre-line font-medium">
                    {systemStep.description}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile compact grid */}
            <div className="md:hidden flex flex-col gap-6 max-w-sm mx-auto">
              <div className="grid grid-cols-3 gap-2">
                {userSteps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 bg-background border-border text-muted-foreground">
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                    <div className="mt-1 text-center">
                      <div className="text-xs leading-tight font-medium text-foreground">{step.title}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative border-t pt-4 border-dashed border-orange-200">
                <div className="flex items-center justify-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-orange-400 bg-orange-50 text-orange-600">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-orange-600">{systemStep.title}</div>
                    <div className="text-xs text-orange-600/80">{systemStep.description}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={() => setShowTokenDialog(true)}
            size="lg"
            className="min-w-[200px] bg-gradient-to-r from-[#6A5ACD] via-[#9370DB] to-[#FF85A2] hover:opacity-90 shadow-lg"
          >
            Почати створення
            <ArrowRight className="h-5 w-5 ml-1" />
          </Button>

          {DEV_MODE && (
            <Button
              onClick={handleDevSkip}
              size="lg"
              variant="outline"
              className="min-w-[200px] border-orange-500 text-orange-600 hover:bg-orange-50"
            >
              🔧 Skip (Dev)
            </Button>
          )}
        </div>
      </div>

      {/* Token Dialog */}
      <Dialog open={showTokenDialog} onOpenChange={(open) => !isValidating && setShowTokenDialog(open)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-[#6A5ACD]" />
              Введіть код доступу
            </DialogTitle>
            <DialogDescription className="space-y-2">
              <p>Введіть код доступу для створення фізичної звукової листівки.</p>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="phys-access-token">Код доступу</Label>
              <Input
                id="phys-access-token"
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
            </div>

            <Card className="bg-[#6A5ACD]/5 border-[#6A5ACD]/20 p-4">
              <p className="text-sm text-gray-700">
                <strong>У вас ще немає коду?</strong><br />
                Ви можете{' '}
                <button
                  className="text-[#6A5ACD] underline hover:text-[#5A4ABD] font-semibold bg-transparent border-0 p-0 cursor-pointer inline"
                  onClick={(e) => {
                    e.preventDefault();
                    openOrderDialog('studio_physical_token_dialog', 'Оформити замовлення');
                  }}
                >
                  оформити замовлення тут
                </button>
              </p>
            </Card>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowTokenDialog(false)}
              disabled={isValidating}
            >
              Скасувати
            </Button>
            <Button
              onClick={handleTokenSubmit}
              disabled={isValidating || !accessToken.trim()}
              className="bg-gradient-to-r from-[#6A5ACD] via-[#9370DB] to-[#FF85A2] hover:opacity-90"
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
