import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Mail, MessageCircle, CreditCard, HelpCircle, Sparkles, Heart, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/sections/header';
import { Footer } from '@/components/sections/footer';
import mascot from '@/assets/listosyk-mascot.png';

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
    { text: 'Ми отримали вашу заявку', done: true },
    { text: <>Зв'яжемося з вами протягом <span className="font-semibold text-primary">1-2 годин</span> для підтвердження оплати</>, done: false },
    { text: <>Після оплати надішлемо на ваш {orderData?.contact_type === 'telegram' ? 'Telegram' : 'email/телефон'} <span className="font-semibold text-primary">посилання на студію</span></>, done: false },
    { text: <>В студії ви зможете створити пісню та дизайн листівки за <span className="font-semibold text-primary">10 хвилин</span></>, done: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFD1DC] via-[#F3D1FF]/30 to-white flex flex-col">
      <Header centerTitle="Заявка створена" hideNav />
      
      <main className="flex-1 py-12 px-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 text-4xl animate-float opacity-60">✨</div>
        <div className="absolute top-40 right-16 text-3xl animate-float opacity-60" style={{ animationDelay: '0.5s' }}>💜</div>
        <div className="absolute bottom-40 left-20 text-3xl animate-float opacity-60" style={{ animationDelay: '1s' }}>🎵</div>
        <div className="absolute top-60 right-10 opacity-40">
          <Sparkles className="w-8 h-8 text-[#B8B3FF] animate-pulse" />
        </div>
        <div className="absolute bottom-60 right-24 opacity-40">
          <Star className="w-6 h-6 text-[#FFD1DC] animate-pulse" style={{ animationDelay: '0.7s' }} />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Success Header */}
          <div className="text-center mb-10 animate-fade-in">
            <div className="relative inline-block mb-4">
              <span className="text-7xl inline-block animate-bounce">🎉</span>
              <Heart className="absolute -right-4 -top-2 w-6 h-6 text-[#FF6B9D] animate-pulse" />
              <Sparkles className="absolute -left-4 top-0 w-5 h-5 text-[#B8B3FF] animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>
            <h1 
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] bg-clip-text text-transparent mb-3" 
              style={{ fontFamily: "'Baloo 2', cursive" }}
            >
              Заявка створена успішно!
            </h1>
            <p className="text-lg text-muted-foreground">
              Номер замовлення: <span className="font-mono font-semibold text-primary bg-primary/10 px-2 py-1 rounded">{orderId?.slice(0, 8)}</span>
            </p>
          </div>

          {/* Main content with mascot */}
          <div className="grid md:grid-cols-[1fr,auto] gap-6 items-start">
            <div className="space-y-6">
              {/* What's Next Card */}
              <Card className="border-2 border-[#B8B3FF] shadow-lg hover:shadow-xl transition-all bg-white animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2" style={{ fontFamily: "'Baloo 2', cursive" }}>
                    <MessageCircle className="w-6 h-6 text-[#8A7AEE]" />
                    Що далі?
                  </h2>
                  <div className="space-y-4">
                    {steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`
                          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                          ${step.done 
                            ? 'bg-gradient-to-br from-green-400 to-green-500 text-white' 
                            : 'bg-gradient-to-br from-[#B8B3FF] to-[#8A7AEE] text-white'
                          }
                        `}>
                          {step.done ? '✓' : index + 1}
                        </div>
                        <p className="text-muted-foreground pt-1">{step.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Details Card */}
              <Card className="border-2 border-[#FFD1DC] shadow-lg hover:shadow-xl transition-all bg-white animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2" style={{ fontFamily: "'Baloo 2', cursive" }}>
                    <CreditCard className="w-6 h-6 text-[#FF6B9D]" />
                    Реквізити для оплати
                  </h2>
                  <div className="bg-gradient-to-br from-[#FFD1DC]/30 to-[#B8B3FF]/20 rounded-xl p-5 border border-[#FFD1DC]/50">
                    <p className="text-xl font-bold text-primary mb-2">
                      До сплати: <span className="text-2xl bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] bg-clip-text text-transparent">399 грн</span>
                    </p>
                    <div className="space-y-2 text-sm text-muted-foreground mt-4">
                      <p>💳 Реквізити будуть надіслані вам під час зв'язку з менеджером</p>
                      <p className="text-xs opacity-75">або ви можете написати нам першим за контактами нижче</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card className="border-2 border-[#E8D5FF] shadow-lg hover:shadow-xl transition-all bg-white animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2" style={{ fontFamily: "'Baloo 2', cursive" }}>
                    <HelpCircle className="w-6 h-6 text-[#B8B3FF]" />
                    Є питання?
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href="mailto:info@listosyk.com" 
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#FFD1DC]/30 to-[#FFD1DC]/10 hover:from-[#FFD1DC]/50 hover:to-[#FFD1DC]/30 transition-all text-foreground group"
                    >
                      <Mail className="w-5 h-5 text-[#FF6B9D] group-hover:scale-110 transition-transform" />
                      <span>info@listosyk.com</span>
                    </a>
                    <a 
                      href="https://t.me/listosyk" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-[#B8B3FF]/30 to-[#B8B3FF]/10 hover:from-[#B8B3FF]/50 hover:to-[#B8B3FF]/30 transition-all text-foreground group"
                    >
                      <MessageCircle className="w-5 h-5 text-[#8A7AEE] group-hover:scale-110 transition-transform" />
                      <span>@listosyk</span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info Display */}
              {orderData && (
                <Card className="border-2 border-[#E8D5FF]/50 shadow-md bg-white/80 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-semibold text-primary mb-3">Ваші контактні дані:</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      {orderData.user_phone && (
                        <p>📱 Телефон: <span className="font-medium text-foreground">{orderData.user_phone}</span></p>
                      )}
                      {orderData.user_email && (
                        <p>✉️ Email: <span className="font-medium text-foreground">{orderData.user_email}</span></p>
                      )}
                      {orderData.contact_type && (
                        <p>💬 Спосіб зв'язку: <span className="font-medium text-foreground capitalize">{orderData.contact_type === 'telegram' ? 'Telegram' : 'Телефон'}</span></p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Mascot */}
            <div className="hidden md:block animate-float">
              <div className="relative">
                <img 
                  src={mascot} 
                  alt="Листосик" 
                  className="w-48 h-auto drop-shadow-lg"
                />
                <div className="absolute -top-4 -left-4 bg-white rounded-2xl px-4 py-2 shadow-lg border-2 border-[#B8B3FF]">
                  <p className="text-sm font-medium text-primary" style={{ fontFamily: "'Baloo 2', cursive" }}>
                    Очікуйте на зв'язок! 💜
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center mt-10 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all"
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
