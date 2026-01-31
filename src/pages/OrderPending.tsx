import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Mail, MessageCircle, CreditCard, HelpCircle, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { HeaderExperiment } from '@/components/sections/header-experiment';
import { FooterExperiment } from '@/components/sections/footer-experiment';

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
      <div className="min-h-screen bg-gradient-to-b from-[#FFE4EC] via-[#FFF0F5] to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE4EC] via-[#FFF0F5] to-white flex flex-col">
      <HeaderExperiment />

      <main className="flex-1 pt-20 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
              Заявка створена успішно!
            </h1>
            <p className="text-lg text-gray-600">
              Номер замовлення: <span className="font-mono font-semibold">{orderId?.slice(0, 8)}</span>
            </p>
          </div>

          <div className="space-y-6">
            {/* What's Next Card */}
            <Card className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-gray-700" />
                  Що далі?
                </h2>
                <p className="text-gray-600">
                  Ми отримали вашу заявку. Після оплати відкриється доступ до студії для створення пісні та листівки. Далі ми надрукуємо листівку та надішлемо її вам.
                </p>
              </CardContent>
            </Card>

            {/* Payment Details Card */}
            <Card className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-gray-700" />
                  Оплата — 399 грн
                </h2>
                <p className="text-gray-600 pl-7">
                  Реквізити для оплати ми надішлемо вам окремо.
                </p>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-gray-700" />
                  Є питання?
                </h2>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="mailto:melodlistiv@gmail.com"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">melodlistiv@gmail.com</span>
                  </a>
                  <a
                    href="https://t.me/genbyhuman"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700"
                  >
                    <MessageCircle className="w-4 h-4" />
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
              className="border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            >
              Повернутися на головну
            </Button>
          </div>
        </div>
      </main>

      <FooterExperiment />
    </div>
  );
}
