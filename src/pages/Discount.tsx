import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, ArrowRight, Loader2, AlertTriangle, Camera, CalendarPlus, Send } from "lucide-react";
import { Header } from "@/components/sections/header";
import { FooterExperiment } from "@/components/sections/footer-experiment";
import { supabase } from "@/integrations/supabase/client";

const Discount = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("ref");
  const [promoData, setPromoData] = useState<{
    code: string;
    expiresAt: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromoCode = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('promo_codes')
          .select('code, expires_at')
          .eq('pre_order_id', orderId)
          .eq('is_used', false)
          .maybeSingle();

        if (error) {
          console.error('Error fetching promo code:', error);
        } else if (data) {
          setPromoData({
            code: data.code,
            expiresAt: data.expires_at
          });
        }
      } catch (error) {
        console.error('Error fetching promo code:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromoCode();
  }, [orderId]);

  const copyPromoCode = () => {
    if (promoData?.code) {
      navigator.clipboard.writeText(promoData.code);
      toast.success("Промокод скопійовано! ✅");
    }
  };

  const showScreenshotTip = () => {
    toast.info(
      "📱 iPhone: бокова + гучність\n📱 Android: живлення + гучність\n💻 Mac: Cmd+Shift+4\n💻 Windows: Win+Shift+S",
      { duration: 8000 }
    );
  };

  const addToCalendar = () => {
    if (!promoData) return;

    const expiryDate = new Date(promoData.expiresAt);
    const reminderDate = new Date(expiryDate.getTime() - 3 * 24 * 60 * 60 * 1000);

    const formatICSDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Listosyk//Promo Reminder//UK
BEGIN:VEVENT
DTSTART:${formatICSDate(reminderDate)}
DTEND:${formatICSDate(new Date(reminderDate.getTime() + 60 * 60 * 1000))}
SUMMARY:🎁 Промокод Листосик закінчується через 3 дні!
DESCRIPTION:Ваш промокод ${promoData.code} дає знижку 25%. Використайте на listosyk.com
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `listosyk-promo-${promoData.code}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Нагадування завантажено! Відкрийте файл, щоб додати в календар 📅");
  };

  const sendToTelegram = () => {
    if (!promoData) return;

    const text = `🎁 Мій промокод Листосик: ${promoData.code}\n\nЗнижка 25% на наступну листівку!\n⏰ Дійсний до: ${formatExpiryDate(promoData.expiresAt)}\n\n🔗 lystosyk.com`;

    window.open(`https://t.me/share/url?url=https://lystosyk.com&text=${encodeURIComponent(text)}`, '_blank');
  };

  const formatExpiryDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
        <Header ctaLabel="Створити" />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!promoData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
        <Header ctaLabel="Створити" />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Промокод не знайдено
            </h1>
            <p className="text-xl text-muted-foreground">
              Можливо, промокод ще генерується або вже використаний
            </p>
            <Button onClick={() => window.location.href = '/'}>
              На головну
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFD1DC] to-white/20">
      <Header ctaLabel="Створити" />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-[#6A5ACD] font-baloo">
              Дякуємо за замовлення! 🎉
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-baloo">
              Ось ваша персональна знижка на наступне замовлення ✨
            </p>
          </div>

          {/* Warning Block - Save Promo Code */}
          <Card className="p-4 md:p-6 bg-amber-50 border-2 border-amber-300 rounded-xl">
            <div className="flex items-start gap-3 text-left">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-amber-800 text-lg">
                  Збережіть цей промокод!
                </p>
                <p className="text-amber-700 text-sm mt-1">
                  Ця сторінка може бути недоступна пізніше. Скопіюйте код або зробіть скріншот прямо зараз!
                </p>
              </div>
            </div>
          </Card>

          {/* Promo Code Card */}
          <Card className="p-8 bg-gradient-to-br from-[#FFD1DC] via-[#E6E6FA] to-[#DDA0DD] border-2 border-[#6A5ACD]/30 rounded-2xl shadow-lg hover:shadow-xl transition-all backdrop-blur-sm animate-scale-in">
            <div className="space-y-6">
              <div className="text-7xl md:text-8xl font-bold text-[#6A5ACD] font-baloo animate-pulse">
                25% ✨
              </div>
              <p className="text-xl md:text-2xl text-[#6A5ACD] font-baloo font-semibold">
                Знижка на наступну листівку 🎁
              </p>

              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 space-y-4 border-2 border-[#6A5ACD]/20 shadow-inner">
                <p className="text-sm text-gray-600 uppercase tracking-wide font-semibold">
                  Ваш персональний промокод
                </p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <code className="text-3xl md:text-4xl font-mono font-bold text-[#6A5ACD] tracking-wider bg-[#E6E6FA]/50 px-4 py-2 rounded-lg">
                    {promoData.code}
                  </code>
                </div>
                <p className="text-sm text-gray-600">
                  ⏰ Дійсний до: {formatExpiryDate(promoData.expiresAt)}
                </p>

                {/* Save Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-[#6A5ACD]/20">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyPromoCode}
                    className="border-[#6A5ACD] text-[#6A5ACD] hover:bg-[#6A5ACD] hover:text-white"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Скопіювати
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={showScreenshotTip}
                    className="border-[#6A5ACD] text-[#6A5ACD] hover:bg-[#6A5ACD] hover:text-white"
                  >
                    <Camera className="w-4 h-4 mr-1" />
                    Скріншот
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addToCalendar}
                    className="border-[#6A5ACD] text-[#6A5ACD] hover:bg-[#6A5ACD] hover:text-white"
                  >
                    <CalendarPlus className="w-4 h-4 mr-1" />
                    Календар
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={sendToTelegram}
                    className="border-[#6A5ACD] text-[#6A5ACD] hover:bg-[#6A5ACD] hover:text-white"
                  >
                    <Send className="w-4 h-4 mr-1" />
                    Telegram
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Instructions */}
          <Card className="p-6 md:p-8 text-left bg-white/80 backdrop-blur-sm border-2 border-[#FFD1DC] rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#6A5ACD] font-baloo">
              Як скористатися знижкою
            </h2>
            <ol className="space-y-4 text-gray-700">
              <li className="flex gap-3">
                <span className="font-bold text-lg text-[#6A5ACD] font-baloo min-w-[2rem]">1.</span>
                <span className="text-base">Оберіть новий дизайн листівки на головній сторінці</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-lg text-[#6A5ACD] font-baloo min-w-[2rem]">2.</span>
                <span className="text-base">При оформленні замовлення введіть промокод <code className="bg-[#E6E6FA] px-3 py-1 rounded-lg text-[#6A5ACD] font-mono font-bold">{promoData.code}</code></span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-lg text-[#6A5ACD] font-baloo min-w-[2rem]">3.</span>
                <span className="text-base">Отримайте знижку 25% на всю листівку</span>
              </li>
            </ol>
          </Card>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button
              size="lg"
              className="text-lg md:text-xl font-baloo bg-[#6A5ACD] hover:bg-[#5B4BC2] text-white shadow-lg hover:shadow-xl transition-all"
              onClick={() => window.location.href = `/?promo=${promoData.code}`}
            >
              Створити нову листівку 🎨
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {orderId && (
              <Button
                size="lg"
                variant="outline"
                className="text-lg md:text-xl font-baloo border-2 border-[#6A5ACD] text-[#6A5ACD] hover:bg-[#6A5ACD] hover:text-white shadow-md hover:shadow-lg transition-all"
                onClick={() => window.location.href = `/s/song/${orderId}`}
              >
                Переглянути мою пісню 🎵
              </Button>
            )}
          </div>

          {/* Social Sharing Suggestion */}
          <Card className="p-6 bg-gradient-to-r from-[#FFD1DC]/60 to-[#E6E6FA]/60 backdrop-blur-sm border-2 border-[#DDA0DD]/30 rounded-2xl shadow-md">
            <p className="text-base md:text-lg text-gray-700">
              💡 <strong className="text-[#6A5ACD] font-baloo">Порадьте друзям!</strong> Поділіться своєю унікальною листівкою з близькими 💝
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Discount;
