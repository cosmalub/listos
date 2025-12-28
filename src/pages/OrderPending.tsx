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

  const steps = [
    { text: 'Ми вже отримали вашу заявку і будемо поруч далі.', done: true },
    { text: 'Після підтвердження оплати ви отримаєте доступ до студії.', done: false },
    { text: 'У студії ви створите пісню та листівку — це займе близько 10 хвилин.', done: false },
    { text: 'Після цього ми надрукуємо листівку та надішлемо її вам.', done: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFD1DC] via-[#F3D1FF]/30 to-white flex flex-col">
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
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`
                        flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium
                        ${step.done
                          ? 'bg-green-100 text-green-600'
                          : 'bg-primary/10 text-primary'
                        }
                      `}>
                        {step.done ? <Check className="w-4 h-4" /> : index + 1}
                      </div>
                      <p className="text-primary/80 pt-0.5">{step.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Details Card */}
            <Card className="border border-[#E8D5FF] shadow-sm bg-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Реквізити для оплати
                </h2>
                <div className="bg-[#FFD1DC]/20 rounded-lg p-4">
                  <p className="text-lg font-semibold text-primary mb-2">
                    До сплати: <span className="text-primary">399 грн</span>
                  </p>
                  <p className="text-sm text-primary/80">
                    Реквізити будуть надіслані вам під час зв'язку з менеджером
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info Display (Moved Up) */}
            {orderData && (
              <Card className="border border-[#E8D5FF] shadow-sm bg-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-primary mb-2">Ми будемо на звʼязку</h3>
                  <p className="text-sm text-primary/80 mb-4">
                    Ми використаємо цей контакт, якщо потрібно щось уточнити або допомогти.
                  </p>
                  <div className="space-y-2 text-sm text-primary/80">
                    {orderData.user_phone && (
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{orderData.user_phone}</span>
                      </p>
                    )}
                    {orderData.user_email && (
                      <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{orderData.user_email}</span>
                      </p>
                    )}
                    {orderData.contact_type && (
                      <p className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>Спосіб зв'язку: {orderData.contact_type === 'telegram' ? 'Telegram' : 'Телефон'}</span>
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

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
                    <span className="text-sm">@genbyhuman</span>
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
