import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Info, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { HeaderExperiment } from '@/components/sections/header-experiment';
import { FooterExperiment } from '@/components/sections/footer-experiment';
import { OccasionAnimation } from '@/components/public/OccasionAnimation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Fire confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2,
        },
      });

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2,
        },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error) {
        console.error('Error fetching order:', error);
        toast({
          title: 'Помилка',
          description: 'Не вдалося завантажити дані замовлення',
          variant: 'destructive',
        });
      } else {
        setOrderData(data);
      }

      setLoading(false);
    }

    fetchOrder();
  }, [orderId, toast]);

  // Генерация промокода при загрузке страницы
  useEffect(() => {
    const generatePromoCode = async () => {
      if (!orderData?.pre_order_id) return;

      try {
        console.log('Generating promo code for pre_order_id:', orderData.pre_order_id);
        const { data, error } = await supabase.functions.invoke('generate-promo-code', {
          body: { preOrderId: orderData.pre_order_id }
        });

        if (error) throw error;

        console.log('Promo code generated:', data);
      } catch (error) {
        console.error('Error generating promo code:', error);
      }
    };

    generatePromoCode();
  }, [orderData?.pre_order_id]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F0F8FF] via-[#F5F3FF] to-white">
        <Loader2 className="w-8 h-8 animate-spin text-gray-700" />
      </div>
    );
  }

  if (!orderId || !orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F0F8FF] via-[#F5F3FF] to-white">
        <Card className="max-w-md mx-4 bg-white rounded-2xl shadow-sm border border-gray-100">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Замовлення не знайдено</h2>
            <p className="text-gray-600 mb-6">
              Можливо, сталася помилка або замовлення ще не створено.
            </p>
            <Button asChild>
              <Link to="/studio">Повернутися до студії</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0F8FF] via-[#F5F3FF] to-white">
      <OccasionAnimation occasion={orderData.page_occasion || 'congratulations'} />
      <HeaderExperiment />

      {/* Success Header Section */}
      <div className="bg-transparent pt-24 md:pt-28 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-gray-700 bg-gray-50 rounded-lg px-6 py-3 text-base md:text-lg font-normal border border-gray-100">
              Вітаємо! 🎉 Ваша листівка створена
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 pb-12 relative z-10">
        <Card className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100">
          <CardContent className="p-8 md:p-12">

            {/* Postcard Preview - both sides */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
                  {orderData.product_format === 'sound' ? 'Обкладинка' : 'Лицьова сторона'}
                </h3>
                <div className={`rounded-lg overflow-hidden border-2 border-gray-200 ${orderData.product_format === 'sound' ? 'aspect-[88/166]' : 'aspect-[105/148]'}`}>
                  {orderData.front_image_url ? (
                    <img
                      src={orderData.front_image_url}
                      alt="Front of postcard"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 gap-2">
                      <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                      <span className="text-sm text-gray-500">Обробляється...</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
                  {orderData.product_format === 'sound' ? 'Всередині справа' : 'Зворотня сторона'}
                </h3>
                <div className={`rounded-lg overflow-hidden border-2 border-gray-200 ${orderData.product_format === 'sound' ? 'aspect-[88/166]' : 'aspect-[105/148]'}`}>
                  {orderData.back_image_url ? (
                    <img
                      src={orderData.back_image_url}
                      alt="Back of postcard"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 gap-2">
                      <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                      <span className="text-sm text-gray-500">Обробляється...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {orderData.product_format === 'sound' && (
              <p className="text-center text-gray-600 mb-8 -mt-4">
                Листівка заграє пісню, щойно її відкриють. Ми надрукуємо її, вкладемо звуковий модуль і надішлемо.
              </p>
            )}

            {/* Next Steps */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center sm:text-left">Що далі?</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-2xl">✓</span>
                  <span>Ваша листівка збережена у нашій системі</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-2xl">🎨</span>
                  <span>Ми надрукуємо її у високій якості на професійному обладнанні</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-2xl">📞</span>
                  <span>Зв'яжемося з вами для узгодження деталей та адреси доставки</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-2xl">📦</span>
                  <span>Відправимо Новою Поштою протягом 1-2 робочих днів</span>
                </li>
              </ul>
            </div>


            {/* Draft Page Link */}
            <Alert className="bg-gray-50 border border-gray-100 rounded-xl">
              <Info className="h-4 w-4 text-gray-600" />
              <AlertDescription className="flex items-center justify-between text-gray-700">
                <span>Ваша персональна сторінка з піснею готова!</span>
                <Button asChild variant="outline" size="sm" className="border-gray-200 hover:bg-gray-100">
                  <Link to={`/s/song/${orderId}`}>Переглянути</Link>
                </Button>
              </AlertDescription>
            </Alert>

            {/* Discount CTA */}
            <div className="text-center mt-6">
              <Button
                size="lg"
                className="text-base sm:text-lg w-full sm:w-auto"
                onClick={() => window.location.href = `/discount?ref=${orderData.pre_order_id}`}
              >
                <span className="sm:hidden">Отримати знижку 25% 🎁</span>
                <span className="hidden sm:inline">Отримати знижку 25% на наступне замовлення 🎁</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <FooterExperiment />
    </div>
  );
}
