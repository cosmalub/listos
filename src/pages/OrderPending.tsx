import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Mail, MessageCircle, CreditCard, HelpCircle, Phone, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/sections/header';
import { Footer } from '@/components/sections/footer';

export default function OrderPending() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get('orderId');
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      navigate('/order');
      return;
    }

    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from('pre_orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error || !data) {
        console.error('Error fetching order:', error);
        navigate('/order');
        return;
      }

      setOrderData(data);
      setLoading(false);
    };

    fetchOrder();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFD1DC] via-[#F3D1FF]/30 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFD1DC] from-0% via-[#F3D1FF]/30 via-50% to-white to-90% flex flex-col">
      <Header hideNav />

      <main className="flex-1 pt-20 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-3">
              Заявка створена успішно!
            </h1>
            <p className="text-lg text-primary/80">
              Номер замовлення: <span className="font-mono font-semibold">{orderId?.slice(0, 8)}</span>
            </p>
          </div>

          <div className="space-y-6">
            {/* What's Next Card */}
            <Card className="border border-[#E8D5FF] shadow-sm bg-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-primary mb-5 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Що далі?
                </h2>
                <p className="text-primary/80">
                  Ми отримали вашу заявку. Після оплати відкриється доступ до студії для створення пісні та листівки. Далі ми надрукуємо листівку та надішлемо її вам.
                </p>
              </CardContent>
            </Card>

            {/* Payment Details Card */}
            <Card className="border border-[#E8D5FF] shadow-sm bg-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Оплата — 399 грн
                </h2>
                <p className="text-primary/80 pl-7">
                  Реквізити для оплати ми надішлемо вам окремо.
                </p>
              </CardContent>
            </Card>



            {/* Contact Card */}
            <Card className="border border-[#E8D5FF] shadow-sm bg-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Є питання?
                </h2>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="mailto:melodlistiv@gmail.com"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFD1DC]/20 hover:bg-[#FFD1DC]/40 transition-colors text-foreground"
                  >
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-sm">melodlistiv@gmail.com</span>
                  </a>
                  <a
                    href="https://t.me/genbyhuman"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E8D5FF]/30 hover:bg-[#E8D5FF]/50 transition-colors text-foreground"
                  >
                    <MessageCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm">Telegram: @genbyhuman</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Back Button */}
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="border-primary/30 hover:border-primary hover:bg-primary/5"
            >
              Повернутися на головну
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
