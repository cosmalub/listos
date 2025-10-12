import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Music, Shield, Play, CheckCircle, Sparkles, Phone, MessageCircle } from "lucide-react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function Order() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    novaPoshta: "",
    comment: "",
    contactType: "phone",
    telegram: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Створюємо запис у таблиці orders
      const { data, error } = await supabase
        .from('orders')
        .insert({
          // Дані з форми
          user_email: formData.contactType === 'phone' ? null : formData.telegram,
          user_phone: formData.contactType === 'phone' ? formData.phone : null,
          // Пусті поля, які будуть заповнені в Studio
          lyrics: '',
          page_occasion: '',
          page_recipient: '',
          page_sender: '',
          // is_paid = false за замовчуванням
          // access_token згенерується автоматично
        })
        .select()
        .single();

      if (error) throw error;

      console.log('Order created:', data);

      // Показуємо успішне повідомлення
      toast.success('Ваша заявка успішно створена!', {
        description: 'Ми зв\'яжемося з вами найближчим часом для підтвердження оплати',
        duration: 5000,
      });

      // Очищаємо форму
      setFormData({
        name: "",
        phone: "",
        city: "",
        novaPoshta: "",
        comment: "",
        contactType: "phone",
        telegram: ""
      });

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

  return (
    <div className="min-h-screen">
      <Header centerTitle="Замовлення" hideNav={false} showMenu={true} />
      
      <div className="min-h-screen bg-gradient-to-b from-[#FFD1DC] to-white/20 py-8 pt-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-8">
            <div className="text-center">
              <p className="font-baloo font-semibold text-xl md:text-2xl lg:text-3xl leading-tight tracking-tight text-foreground/90 max-w-4xl mx-auto text-balance mb-8">
                З Листосиком створіть особисту пісню після оплати, отримайте готову листівку за <span className="whitespace-nowrap">1–2 дні</span>
              </p>
            </div>
          </div>

          {/* Процесс создания */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Как это работает */}
            <Card className="bg-white/70 backdrop-blur-xl ring-1 ring-white/20 shadow-sm border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-[#6A5ACD]">
                  Як це працює
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { step: "1", title: "Оплачуєте замовлення", desc: "Безпечна оплата через LiqPay" },
                  { step: "2", title: "Отримуєте посилання", desc: "На студію створення з ШІ" },
                  { step: "3", title: "Створюєте листівку", desc: "З допомогою ШІ за вашими побажаннями" },
                  { step: "4", title: "Отримуєте готову листівку", desc: "Доставка Новою Поштою безкоштовно" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#6A5ACD]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-[#6A5ACD]">{item.step}</span>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-[#6A5ACD] text-sm">{item.title}</p>
                      <p className="text-xs text-[#6A5ACD]/70 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Видео-демонстрация */}
            <Card className="bg-white/70 backdrop-blur-xl ring-1 ring-white/20 shadow-sm border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-[#6A5ACD]">
                  Демонстрація процесу
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gradient-to-br from-[#6A5ACD]/5 to-[#6A5ACD]/10 rounded-xl aspect-video flex items-center justify-center ring-1 ring-[#6A5ACD]/10">
                  <div className="text-center space-y-2">
                    <Play className="h-8 w-8 text-[#6A5ACD]/60 mx-auto" />
                    <p className="text-sm text-[#6A5ACD]/70 font-medium">
                      Відео буде додано найближчим часом
                    </p>
                    <p className="text-xs text-[#6A5ACD]/60">
                      Тут ви побачите весь процес створення
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-[#6A5ACD]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#6A5ACD]">
                <Music className="h-5 w-5" />
                Дані для замовлення
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Одним гридом керуємо позиціями полів. На мобільному порядок: Ім'я, Спосіб зв'язку, Місто, Відділення. На десктопі: зліва Ім'я/Місто/Відділення, справа Спосіб зв'язку */}
                <div className="grid grid-cols-1 md:grid-cols-2 md:auto-rows-min gap-4">
                  {/* Ім'я */}
                  <div className="space-y-2 md:col-start-1 md:row-start-1">
                    <Label htmlFor="name">Ваше ім'я *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Введіть ваше ім'я"
                      required
                    />
                  </div>

                  {/* Спосіб зв'язку (праворуч на десктопі, розтягується по висоті трьох рядків) */}
                  <div className="space-y-2 md:col-start-2 md:row-start-1 md:row-span-3 md:self-start">
                    <Label>Спосіб зв'язку *</Label>
                    <div className="space-y-3">
                      <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                        {/* Спочатку Telegram */}
                        <button
                          type="button"
                          onClick={() => handleInputChange("contactType", "telegram")}
                          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all duration-200 ${
                            formData.contactType === "telegram"
                              ? "bg-[#6A5ACD] text-white shadow-sm"
                              : "text-[#6A5ACD] hover:bg-white/50"
                          }`}
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Telegram</span>
                        </button>
                        {/* Потім Телефон */}
                        <button
                          type="button"
                          onClick={() => handleInputChange("contactType", "phone")}
                          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all duration-200 ${
                            formData.contactType === "phone"
                              ? "bg-[#6A5ACD] text-white shadow-sm"
                              : "text-[#6A5ACD] hover:bg-white/50"
                          }`}
                        >
                          <Phone className="h-4 w-4" />
                          <span className="text-sm font-medium">Телефон</span>
                        </button>
                      </div>

                      {formData.contactType === "phone" ? (
                        <div className="space-y-1">
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+380 XX XXX XX XX"
                            required
                            className="transition-all duration-200"
                          />
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <Input
                            id="telegram"
                            value={formData.telegram}
                            onChange={(e) => handleInputChange("telegram", e.target.value)}
                            placeholder="@username або t.me/username"
                            required
                            className="transition-all duration-200"
                          />
                          <p className="text-xs text-[#6A5ACD]/60">
                            Приклади: @username, t.me/username або https://t.me/username
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Місто */}
                  <div className="space-y-2 md:col-start-1 md:row-start-2">
                    <Label htmlFor="city">Місто *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Ваше місто"
                      required
                    />
                  </div>

                  {/* Відділення Нової Пошти */}
                  <div className="space-y-2 md:col-start-1 md:row-start-3">
                    <Label htmlFor="novaPoshta">Відділення Нової Пошти *</Label>
                    <Input
                      id="novaPoshta"
                      value={formData.novaPoshta}
                      onChange={(e) => handleInputChange("novaPoshta", e.target.value)}
                      placeholder="№ відділення або адреса"
                      required
                    />
                  </div>
                </div>

                <div className="bg-[#6A5ACD]/10 p-4 rounded-lg border border-[#6A5ACD]/20">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span className="text-[#6A5ACD]">До сплати:</span>
                    <span className="text-[#6A5ACD]">399 грн</span>
                  </div>
                  <p className="text-sm text-[#6A5ACD]/70 mt-1">
                    Безкоштовна доставка Новою Поштою включена
                  </p>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-lg px-8 py-6 rounded-full bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] hover:from-[#7A6ADE] hover:to-[#C282EF] text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 font-bold"
                >
                  Оформити замовлення
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Гарантия возврата */}
          <Card className="mt-8 border-green-200 bg-green-50/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 rounded-full p-2">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-green-800">Гарантія 100% повернення коштів</h3>
                  <p className="text-sm text-green-700">
                    Якщо результат вас не влаштує, ми повернемо всі кошти без питань протягом 7 днів
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