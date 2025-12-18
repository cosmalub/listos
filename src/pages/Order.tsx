import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Music, Shield, Phone, MessageCircle, Loader2, Sparkles, Star, Heart, CreditCard, Link2, Palette, Truck } from "lucide-react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import mascotImage from "@/assets/listosyk-mascot.png";

export default function Order() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    novaPoshta: "",
    comment: "",
    contactType: "phone",
    telegram: "",
    promoCode: ""
  });

  const [promoStatus, setPromoStatus] = useState<{
    valid: boolean;
    message: string;
    discountPercent?: number;
  } | null>(null);
  const [validatingPromo, setValidatingPromo] = useState(false);

  const validatePromoCode = async () => {
    if (!formData.promoCode.trim()) {
      toast.error('Введіть промокод');
      return;
    }

    setValidatingPromo(true);
    try {
      const { data, error } = await supabase.functions.invoke('validate-promo-code', {
        body: { promoCode: formData.promoCode.trim() }
      });

      if (error) throw error;

      setPromoStatus(data);
      
      if (data.valid) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error validating promo code:', error);
      toast.error('Помилка при перевірці промокоду');
    } finally {
      setValidatingPromo(false);
    }
  };

  const basePrice = 399;
  const finalPrice = promoStatus?.valid 
    ? basePrice * (1 - (promoStatus.discountPercent || 0) / 100)
    : basePrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase
        .from('pre_orders')
        .insert({
          user_email: formData.contactType === 'telegram' ? formData.telegram : null,
          user_phone: formData.contactType === 'phone' ? formData.phone : null,
          city: formData.city,
          nova_poshta: formData.novaPoshta,
          comment: formData.comment,
          contact_type: formData.contactType,
        })
        .select()
        .single();

      if (error) throw error;

      console.log('Pre-order created:', data);

      if (promoStatus?.valid && formData.promoCode) {
        try {
          const { error: promoUpdateError } = await supabase
            .from('promo_codes')
            .update({
              is_used: true,
              used_at: new Date().toISOString(),
              used_in_order_id: data.id
            })
            .eq('code', formData.promoCode.toUpperCase().trim());

          if (promoUpdateError) {
            console.error('Error updating promo code:', promoUpdateError);
          } else {
            console.log('Promo code marked as used');
          }
        } catch (promoError) {
          console.error('Error with promo code update:', promoError);
        }
      }

      navigate(`/order-pending?orderId=${data.id}`);

    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Помилка при створенні замовлення', {
        description: 'Будь ласка, спробуйте ще раз або зв\'яжіться з нами',
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    { icon: CreditCard, title: "Оплачуєте замовлення", desc: "Безпечна оплата через LiqPay", color: "from-[#FF6B9D] to-[#C44569]" },
    { icon: Link2, title: "Отримуєте посилання", desc: "На студію створення з ШІ", color: "from-[#8A7AEE] to-[#6A5ACD]" },
    { icon: Palette, title: "Створюєте листівку", desc: "З допомогою ШІ за вашими побажаннями", color: "from-[#D292FF] to-[#A855F7]" },
    { icon: Truck, title: "Отримуєте готову листівку", desc: "Доставка Новою Поштою безкоштовно", color: "from-[#4ADE80] to-[#22C55E]" }
  ];

  return (
    <div className="min-h-screen">
      <Header centerTitle="Замовлення" hideNav={false} showMenu={true} />
      
      <div className="min-h-screen bg-gradient-to-b from-[#FFD1DC] via-[#F3D1FF]/30 to-white py-8 pt-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-[5%] text-4xl animate-float opacity-60">🎵</div>
          <div className="absolute top-48 right-[8%] text-3xl animate-float opacity-50" style={{ animationDelay: '1s' }}>💝</div>
          <div className="absolute top-[40%] left-[3%] animate-float opacity-40" style={{ animationDelay: '2s' }}>
            <Sparkles className="w-6 h-6 text-[#8A7AEE]" />
          </div>
          <div className="absolute top-[60%] right-[5%] animate-float opacity-50" style={{ animationDelay: '0.5s' }}>
            <Star className="w-5 h-5 text-[#FFB347] fill-[#FFB347]" />
          </div>
          <div className="absolute bottom-[30%] left-[8%] text-2xl animate-float opacity-40" style={{ animationDelay: '1.5s' }}>✨</div>
          <div className="absolute bottom-[20%] right-[10%] animate-float opacity-50" style={{ animationDelay: '2.5s' }}>
            <Heart className="w-5 h-5 text-[#FF6B9D] fill-[#FF6B9D]" />
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="text-center">
              <p className="font-baloo font-semibold text-xl md:text-2xl lg:text-3xl leading-tight tracking-tight text-foreground/90 max-w-4xl mx-auto text-balance mb-8">
                З Листосиком створіть особисту пісню після оплати, отримайте готову листівку за <span className="whitespace-nowrap">1–2 дні</span>
              </p>
            </div>
          </div>

          {/* Timeline section */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Card className="bg-white border-2 border-[#B8B3FF] shadow-lg hover:shadow-xl transition-all max-w-2xl mx-auto overflow-hidden">
              <CardHeader className="pb-4 bg-gradient-to-r from-[#F3D1FF]/30 to-[#D1E8FF]/30">
                <CardTitle className="text-lg font-bold text-[#6A5ACD] flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Як це працює
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#FF6B9D] via-[#8A7AEE] to-[#4ADE80] rounded-full" />
                  
                  <div className="space-y-6">
                    {steps.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={index} className="flex items-start gap-4 relative">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg z-10`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="space-y-1 pt-1">
                            <p className="font-bold text-[#6A5ACD]">{item.title}</p>
                            <p className="text-sm text-[#6A5ACD]/70 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form with mascot */}
          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start">
            <Card className="bg-white border-2 border-[#B8B3FF] shadow-lg hover:shadow-xl transition-all animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="bg-gradient-to-r from-[#F3D1FF]/30 to-[#D1E8FF]/30">
                <CardTitle className="flex items-center gap-2 text-[#6A5ACD]">
                  <Music className="h-5 w-5" />
                  Дані для замовлення
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 md:auto-rows-min gap-4">
                    {/* Ім'я */}
                    <div className="space-y-2 md:col-start-1 md:row-start-1">
                      <Label htmlFor="name" className="font-semibold text-[#6A5ACD]">Ваше ім'я *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Введіть ваше ім'я"
                        required
                        className="border-[#B8B3FF] focus:border-[#8A7AEE] focus:ring-[#8A7AEE]"
                      />
                    </div>

                    {/* Спосіб зв'язку */}
                    <div className="space-y-2 md:col-start-2 md:row-start-1 md:row-span-3 md:self-start">
                      <Label className="font-semibold text-[#6A5ACD]">Спосіб зв'язку *</Label>
                      <div className="space-y-3">
                        <div className="flex gap-2 p-1 bg-[#F3D1FF]/30 rounded-lg">
                          <button
                            type="button"
                            onClick={() => handleInputChange("contactType", "telegram")}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all duration-200 ${
                              formData.contactType === "telegram"
                                ? "bg-gradient-to-r from-[#8A7AEE] to-[#6A5ACD] text-white shadow-md"
                                : "text-[#6A5ACD] hover:bg-white/50"
                            }`}
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">Telegram</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleInputChange("contactType", "phone")}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all duration-200 ${
                              formData.contactType === "phone"
                                ? "bg-gradient-to-r from-[#8A7AEE] to-[#6A5ACD] text-white shadow-md"
                                : "text-[#6A5ACD] hover:bg-white/50"
                            }`}
                          >
                            <Phone className="h-4 w-4" />
                            <span className="text-sm font-medium">Телефон</span>
                          </button>
                        </div>

                        {formData.contactType === "phone" ? (
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+380 XX XXX XX XX"
                            required
                            className="border-[#B8B3FF] focus:border-[#8A7AEE] focus:ring-[#8A7AEE]"
                          />
                        ) : (
                          <div className="space-y-1">
                            <Input
                              id="telegram"
                              value={formData.telegram}
                              onChange={(e) => handleInputChange("telegram", e.target.value)}
                              placeholder="@username або t.me/username"
                              required
                              className="border-[#B8B3FF] focus:border-[#8A7AEE] focus:ring-[#8A7AEE]"
                            />
                            <p className="text-xs text-[#6A5ACD]/60">
                              Приклади: @username, t.me/username
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Місто */}
                    <div className="space-y-2 md:col-start-1 md:row-start-2">
                      <Label htmlFor="city" className="font-semibold text-[#6A5ACD]">Місто *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Ваше місто"
                        required
                        className="border-[#B8B3FF] focus:border-[#8A7AEE] focus:ring-[#8A7AEE]"
                      />
                    </div>

                    {/* Відділення Нової Пошти */}
                    <div className="space-y-2 md:col-start-1 md:row-start-3">
                      <Label htmlFor="novaPoshta" className="font-semibold text-[#6A5ACD]">Відділення Нової Пошти *</Label>
                      <Input
                        id="novaPoshta"
                        value={formData.novaPoshta}
                        onChange={(e) => handleInputChange("novaPoshta", e.target.value)}
                        placeholder="№ відділення або адреса"
                        required
                        className="border-[#B8B3FF] focus:border-[#8A7AEE] focus:ring-[#8A7AEE]"
                      />
                    </div>
                  </div>

                  {/* Промокод */}
                  <div className="space-y-2">
                    <Label htmlFor="promoCode" className="font-semibold text-[#6A5ACD]">Промокод (опціонально)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="promoCode"
                        value={formData.promoCode}
                        onChange={(e) => handleInputChange("promoCode", e.target.value.toUpperCase())}
                        placeholder="NEXT25-XXXXXX"
                        className="flex-1 border-[#B8B3FF] focus:border-[#8A7AEE] focus:ring-[#8A7AEE]"
                      />
                      <Button
                        type="button"
                        onClick={validatePromoCode}
                        disabled={validatingPromo || !formData.promoCode.trim()}
                        variant="outline"
                        className="border-[#8A7AEE] text-[#8A7AEE] hover:bg-[#8A7AEE] hover:text-white"
                      >
                        {validatingPromo ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Застосувати'}
                      </Button>
                    </div>
                    {promoStatus && (
                      <p className={`text-sm ${promoStatus.valid ? 'text-green-600' : 'text-red-600'}`}>
                        {promoStatus.message}
                      </p>
                    )}
                  </div>

                  <div className="bg-gradient-to-r from-[#8A7AEE]/10 to-[#D292FF]/10 p-4 rounded-xl border-2 border-[#B8B3FF]">
                    <div className="space-y-2">
                      {promoStatus?.valid && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-[#6A5ACD]/70">Початкова ціна:</span>
                          <span className="text-[#6A5ACD]/70 line-through">{basePrice} грн</span>
                        </div>
                      )}
                      {promoStatus?.valid && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-green-600">Знижка {promoStatus.discountPercent}%:</span>
                          <span className="text-green-600">-{basePrice - finalPrice} грн</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span className="text-[#6A5ACD]">До сплати:</span>
                        <span className="bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] bg-clip-text text-transparent">{finalPrice} грн</span>
                      </div>
                    </div>
                    <p className="text-sm text-[#6A5ACD]/70 mt-2 flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      Безкоштовна доставка Новою Поштою включена
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full text-lg px-8 py-6 rounded-full bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] hover:from-[#7A6ADE] hover:to-[#C282EF] text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 font-bold animate-pulse"
                  >
                    Оформити замовлення
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Mascot - only on desktop */}
            <div className="hidden md:block animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="relative">
                <img 
                  src={mascotImage} 
                  alt="Листосик маскот" 
                  className="w-40 h-auto animate-float"
                />
                <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-3 shadow-lg border-2 border-[#B8B3FF] max-w-[160px]">
                  <p className="text-sm text-[#6A5ACD] font-medium">
                    Я допоможу створити пісню! 🎵
                  </p>
                  <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-r-2 border-b-2 border-[#B8B3FF] transform rotate-45" />
                </div>
              </div>
            </div>
          </div>

          {/* Guarantee card */}
          <Card className="mt-8 border-2 border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-3 shadow-lg">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-green-800 text-lg">Гарантія 100% повернення коштів</h3>
                  <p className="text-sm text-green-700">
                    Якщо результат вас не влаштує, ми повернемо всі кошти без питань протягом 7 днів
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mascot for mobile - at bottom */}
          <div className="md:hidden flex justify-center mt-8 animate-fade-in">
            <div className="relative">
              <img 
                src={mascotImage} 
                alt="Листосик маскот" 
                className="w-32 h-auto animate-float"
              />
              <div className="absolute -top-2 -right-4 bg-white rounded-2xl p-2 shadow-lg border-2 border-[#B8B3FF] max-w-[140px]">
                <p className="text-xs text-[#6A5ACD] font-medium">
                  Дякую за замовлення! 💜
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}