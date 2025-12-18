import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Shield, Phone, MessageCircle, Loader2, CreditCard, Link2, Palette, Truck } from "lucide-react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

      if (promoStatus?.valid && formData.promoCode) {
        await supabase
          .from('promo_codes')
          .update({
            is_used: true,
            used_at: new Date().toISOString(),
            used_in_order_id: data.id
          })
          .eq('code', formData.promoCode.toUpperCase().trim());
      }

      navigate(`/order-pending?orderId=${data.id}`);

    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Помилка при створенні замовлення');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    { icon: CreditCard, title: "Оплачуєте замовлення", desc: "Безпечна оплата через LiqPay" },
    { icon: Link2, title: "Отримуєте посилання", desc: "На студію створення з ШІ" },
    { icon: Palette, title: "Створюєте листівку", desc: "З допомогою ШІ за вашими побажаннями" },
    { icon: Truck, title: "Отримуєте готову листівку", desc: "Безкоштовна доставка Новою Поштою" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F4FF] to-white">
      <Header centerTitle="Замовлення" hideNav={false} showMenu={true} />
      
      <div className="py-8 pt-24">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Заголовок */}
          <div className="text-center mb-10">
            <h1 className="font-baloo font-bold text-2xl md:text-3xl text-[#6A5ACD] mb-3">
              Оформлення замовлення
            </h1>
            <p className="text-[#6A5ACD]/70 max-w-xl mx-auto">
              Створіть особисту пісню та отримайте готову листівку за 1–2 дні
            </p>
          </div>

          {/* Як це працює */}
          <Card className="mb-8 border border-[#E5E0FF] shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-[#6A5ACD]">
                Як це працює
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {steps.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#6A5ACD]/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#6A5ACD]" />
                      </div>
                      <p className="text-sm font-medium text-[#6A5ACD] mb-1">{item.title}</p>
                      <p className="text-xs text-[#6A5ACD]/60">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Форма */}
          <Card className="border border-[#E5E0FF] shadow-sm mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#6A5ACD]">
                <Music className="h-5 w-5" />
                Дані для замовлення
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Ім'я */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#6A5ACD]">Ваше ім'я *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Введіть ваше ім'я"
                    required
                  />
                </div>

                {/* Спосіб зв'язку */}
                <div className="space-y-2">
                  <Label className="text-[#6A5ACD]">Спосіб зв'язку *</Label>
                  <div className="flex gap-2 p-1 bg-[#F8F4FF] rounded-lg">
                    <button
                      type="button"
                      onClick={() => handleInputChange("contactType", "phone")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-md transition-all ${
                        formData.contactType === "phone"
                          ? "bg-[#6A5ACD] text-white"
                          : "text-[#6A5ACD] hover:bg-white"
                      }`}
                    >
                      <Phone className="h-4 w-4" />
                      <span className="text-sm font-medium">Телефон</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange("contactType", "telegram")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-md transition-all ${
                        formData.contactType === "telegram"
                          ? "bg-[#6A5ACD] text-white"
                          : "text-[#6A5ACD] hover:bg-white"
                      }`}
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Telegram</span>
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
                    />
                  ) : (
                    <div className="space-y-1">
                      <Input
                        id="telegram"
                        value={formData.telegram}
                        onChange={(e) => handleInputChange("telegram", e.target.value)}
                        placeholder="@username"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Наприклад: @username або t.me/username
                      </p>
                    </div>
                  )}
                </div>

                {/* Місто та відділення */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-[#6A5ACD]">Місто *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Ваше місто"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="novaPoshta" className="text-[#6A5ACD]">Відділення Нової Пошти *</Label>
                    <Input
                      id="novaPoshta"
                      value={formData.novaPoshta}
                      onChange={(e) => handleInputChange("novaPoshta", e.target.value)}
                      placeholder="№ відділення"
                      required
                    />
                  </div>
                </div>

                {/* Промокод */}
                <div className="space-y-2">
                  <Label htmlFor="promoCode" className="text-[#6A5ACD]">Промокод</Label>
                  <div className="flex gap-2">
                    <Input
                      id="promoCode"
                      value={formData.promoCode}
                      onChange={(e) => handleInputChange("promoCode", e.target.value.toUpperCase())}
                      placeholder="NEXT25-XXXXXX"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={validatePromoCode}
                      disabled={validatingPromo || !formData.promoCode.trim()}
                      variant="outline"
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

                {/* Ціна */}
                <div className="bg-[#F8F4FF] p-4 rounded-lg">
                  {promoStatus?.valid && (
                    <>
                      <div className="flex justify-between text-sm text-[#6A5ACD]/70 mb-1">
                        <span>Початкова ціна:</span>
                        <span className="line-through">{basePrice} грн</span>
                      </div>
                      <div className="flex justify-between text-sm text-green-600 mb-2">
                        <span>Знижка {promoStatus.discountPercent}%:</span>
                        <span>-{basePrice - finalPrice} грн</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between items-center text-lg font-bold text-[#6A5ACD]">
                    <span>До сплати:</span>
                    <span>{finalPrice} грн</span>
                  </div>
                  <p className="text-xs text-[#6A5ACD]/60 mt-2">
                    Безкоштовна доставка Новою Поштою
                  </p>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-[#6A5ACD] hover:bg-[#5A4ABD] text-white font-semibold"
                >
                  Оформити замовлення
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Гарантія */}
          <Card className="border border-green-200 bg-green-50">
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 rounded-full p-2">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">Гарантія 100% повернення</h3>
                  <p className="text-sm text-green-700">
                    Якщо результат не влаштує — повернемо кошти протягом 7 днів
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}