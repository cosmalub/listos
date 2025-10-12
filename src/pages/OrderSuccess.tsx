import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Info, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Header } from '@/components/sections/header';
import { Footer } from '@/components/sections/footer';
import { OccasionAnimation } from '@/components/public/OccasionAnimation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
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

  const handleSubmitContact = async () => {
    if (!orderId || (!email && !phone)) {
      toast({
        title: 'Помилка',
        description: 'Введіть хоча б email або телефон',
        variant: 'destructive',
      });
      return;
    }

    // Оновлюємо контакти в pre_orders через order->pre_order зв'язок
    // Спочатку отримуємо pre_order_id з order
    const { data: order } = await supabase
      .from('orders')
      .select('pre_order_id')
      .eq('id', orderId)
      .single();

    if (!order?.pre_order_id) {
      toast({
        title: 'Помилка',
        description: 'Не знайдено пов\'язане передзамовлення',
        variant: 'destructive',
      });
      return;
    }

    // Оновлюємо контакти в pre_orders
    const { error } = await supabase
      .from('pre_orders')
      .update({
        user_email: email || null,
        user_phone: phone || null,
      })
      .eq('id', order.pre_order_id);

    if (error) {
      console.error('Error updating contact:', error);
      toast({
        title: 'Помилка',
        description: 'Не вдалося зберегти контакти',
        variant: 'destructive',
      });
    } else {
      setContactSubmitted(true);
      toast({
        title: 'Успіх!',
        description: 'Контактні дані збережено',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!orderId || !orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Замовлення не знайдено</h2>
            <p className="text-muted-foreground mb-6">
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
    <div className="min-h-screen bg-gradient-to-b from-[#FFD1DC] via-white to-white">
      <OccasionAnimation occasion={orderData.page_occasion || 'congratulations'} />
      <Header centerTitle="Студія створення листівки" hideNav showMenu={false} />

      {/* Success Header Section with Pink Background */}
      <div className="bg-transparent pt-24 md:pt-28 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-foreground bg-muted/20 rounded-lg px-6 py-3 text-base md:text-lg font-normal">
              Вітаємо! 🎉 Ваша листівка створена
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 pb-12 relative z-10">
        <Card className="max-w-5xl mx-auto">
          <CardContent className="p-8 md:p-12">

            {/* Postcard Preview - both sides */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-center">
                  Лицьова сторона
                </h3>
                <div className="aspect-[105/148] rounded-lg overflow-hidden border-2 border-border">
                  <img
                    src={orderData.front_image_url}
                    alt="Front of postcard"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-center">
                  Зворотня сторона
                </h3>
                <div className="aspect-[105/148] rounded-lg overflow-hidden border-2 border-border">
                  <img
                    src={orderData.back_image_url}
                    alt="Back of postcard"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-secondary/30 rounded-lg p-6 mb-8 border border-border">
              <h2 className="text-2xl font-bold mb-4">Що далі?</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <span>Ваша листівка збережена у нашій системі</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🎨</span>
                  <span>Ми надрукуємо її у високій якості на професійному обладнанні</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📞</span>
                  <span>Зв'яжемося з вами для узгодження деталей та адреси доставки</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📦</span>
                  <span>Відправимо Новою Поштою протягом 1-2 робочих днів</span>
                </li>
              </ul>
            </div>

            {/* Contact Form */}
            {!contactSubmitted && (
              <div className="bg-card rounded-lg border border-border p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  Залиште контакти для зв'язку
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Це допоможе нам швидше узгодити деталі доставки
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="tel"
                    placeholder="Телефон"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <Button onClick={handleSubmitContact} className="w-full">
                  Надіслати контакти
                </Button>
              </div>
            )}

            {contactSubmitted && (
              <Alert className="mb-8 bg-secondary/30 border-border">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Дякуємо! Ми зв'яжемося з вами найближчим часом.
                </AlertDescription>
              </Alert>
            )}

            {/* Draft Page Link */}
            <Alert className="bg-secondary/30 border-border">
              <Info className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>Ваша персональна сторінка з піснею готова!</span>
                <Button asChild variant="outline" size="sm">
                  <Link to={`/s/song/${orderId}`}>Переглянути</Link>
                </Button>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
