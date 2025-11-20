import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Mail, MessageCircle, CreditCard, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

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

    // Fetch order data
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
      <div className="min-h-screen bg-gradient-to-br from-[#E8B3FF]/20 via-[#B8B3FF]/20 to-[#FFD6E8]/20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8B3FF]/20 via-[#B8B3FF]/20 to-[#FFD6E8]/20 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-4 shadow-lg">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2" style={{ fontFamily: "'Baloo 2', cursive" }}>
            Заявка створена успішно!
          </h1>
          <p className="text-lg text-muted-foreground">
            Номер замовлення: <span className="font-mono font-semibold text-primary">{orderId?.slice(0, 8)}</span>
          </p>
        </div>

        {/* What's Next Card */}
        <Card className="mb-6 border-2 border-primary/20 shadow-xl bg-white/80 backdrop-blur">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <MessageCircle className="w-6 h-6" />
              Що далі?
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Ми отримали вашу заявку</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Зв'яжемося з вами протягом <span className="font-semibold text-primary">1-2 годин</span> для підтвердження оплати</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Після оплати надішлемо на ваш {orderData?.contact_type === 'telegram' ? 'Telegram' : 'email/телефон'} <span className="font-semibold text-primary">посилання на студію</span></span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>В студії ви зможете створити пісню та дизайн листівки за <span className="font-semibold text-primary">10 хвилин</span></span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Details Card */}
        <Card className="mb-6 border-2 border-primary/20 shadow-xl bg-white/80 backdrop-blur">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <CreditCard className="w-6 h-6" />
              Реквізити для оплати
            </h2>
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 mb-4">
              <p className="text-lg font-semibold text-primary mb-2">
                До сплати: <span className="text-2xl">399 грн</span>
              </p>
              <div className="space-y-2 text-sm text-muted-foreground mt-4">
                <p>Реквізити будуть надіслані вам під час зв'язку з менеджером</p>
                <p className="text-xs opacity-75">або ви можете написати нам першим за контактами нижче</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Card */}
        <Card className="mb-6 border-2 border-primary/20 shadow-xl bg-white/80 backdrop-blur">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <HelpCircle className="w-6 h-6" />
              Є питання?
            </h2>
            <div className="space-y-3">
              <a 
                href="mailto:info@listosyk.com" 
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>info@listosyk.com</span>
              </a>
              <a 
                href="https://t.me/listosyk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>@listosyk</span>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info Display */}
        {orderData && (
          <Card className="border-2 border-primary/10 shadow-lg bg-white/60 backdrop-blur">
            <CardContent className="p-6">
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

        {/* Back Button */}
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="border-2 border-primary/30 hover:border-primary"
          >
            Повернутися на головну
          </Button>
        </div>
      </div>
    </div>
  );
}
