import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Phone, MessageCircle, Loader2, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOrderDialog } from "./OrderDialogContext";
import { posthog } from "@/providers/PostHogProvider";

export function OrderDialog() {
  const navigate = useNavigate();
  const { isOpen, source, closeOrderDialog } = useOrderDialog();
  
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
  const [showPromoField, setShowPromoField] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('pre_orders')
        .insert({
          client_name: formData.name,
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

      // Трекаємо успішне замовлення
      posthog.capture('order_submitted', {
        source,
        price: finalPrice,
        has_promo: promoStatus?.valid || false,
        contact_type: formData.contactType
      });

      closeOrderDialog();
      
      // Даємо час Radix Dialog завершити анімацію закриття
      // перед навігацією, щоб уникнути конфлікту DOM операцій
      setTimeout(() => {
        navigate(`/order-pending?orderId=${data.id}`);
      }, 150);

    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Помилка при створенні замовлення');
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeOrderDialog()}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto bg-white border border-gray-100 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Оформлення замовлення
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Заповни форму — і перейдеш до створення листівки
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Ім'я */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700">Ваше ім'я *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Введіть ваше ім'я"
              required
              className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
            />
          </div>

          {/* Спосіб зв'язку */}
          <div className="space-y-2">
            <Label className="text-gray-700">Спосіб зв'язку *</Label>
            <div className="flex gap-2 p-1 bg-[#6A5ACD]/5 rounded-lg border border-[#6A5ACD]/20">
              <button
                type="button"
                onClick={() => handleInputChange("contactType", "phone")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-md transition-all ${
                  formData.contactType === "phone"
                    ? "bg-[#6A5ACD] text-white"
                    : "text-gray-600 hover:bg-[#6A5ACD]/10"
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
                    : "text-gray-600 hover:bg-[#6A5ACD]/10"
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
                className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
              />
            ) : (
              <div className="space-y-1">
                <Input
                  id="telegram"
                  value={formData.telegram}
                  onChange={(e) => handleInputChange("telegram", e.target.value)}
                  placeholder="@username"
                  required
                  className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                />
                <p className="text-xs text-gray-500">
                  Наприклад: @username або t.me/username
                </p>
              </div>
            )}
          </div>

          {/* Доставка */}
          <div className="space-y-3 p-4 bg-[#6A5ACD]/5 rounded-xl border border-[#6A5ACD]/20">
            <Label className="text-gray-700 font-medium">Доставка (Нова Пошта)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="city" className="text-xs text-gray-500">Місто *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Ваше місто"
                  required
                  className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="novaPoshta" className="text-xs text-gray-500">Відділення *</Label>
                <Input
                  id="novaPoshta"
                  value={formData.novaPoshta}
                  onChange={(e) => handleInputChange("novaPoshta", e.target.value)}
                  placeholder="№ відділення"
                  required
                  className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Промокод - згорнутий */}
          <Collapsible open={showPromoField} onOpenChange={setShowPromoField}>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <span>Є промокод?</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showPromoField ? 'rotate-180' : ''}`} />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="flex gap-2">
                <Input
                  id="promoCode"
                  value={formData.promoCode}
                  onChange={(e) => handleInputChange("promoCode", e.target.value.toUpperCase())}
                  placeholder="Введіть промокод"
                  className="flex-1 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                />
                <Button
                  type="button"
                  onClick={validatePromoCode}
                  disabled={validatingPromo || !formData.promoCode.trim()}
                  variant="outline"
                  size="sm"
                  className="border-[#6A5ACD]/30 hover:bg-[#6A5ACD]/10"
                >
                  {validatingPromo ? <Loader2 className="h-4 w-4 animate-spin" /> : 'OK'}
                </Button>
              </div>
              {promoStatus && (
                <p className={`text-sm mt-2 ${promoStatus.valid ? 'text-green-600' : 'text-red-600'}`}>
                  {promoStatus.message}
                </p>
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* Ціна */}
          <div className="flex items-center justify-between py-3 border-t border-gray-100">
            <span className="text-gray-600">До сплати:</span>
            <div className="text-right">
              {promoStatus?.valid && (
                <span className="text-sm text-gray-400 line-through mr-2">{basePrice} грн</span>
              )}
              <span className="text-xl font-bold text-gray-900">{finalPrice} грн</span>
            </div>
          </div>

          <Button 
            type="submit" 
            size="lg" 
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#6A5ACD] via-[#9370DB] to-[#FF85A2] hover:opacity-90 hover:shadow-lg text-white font-semibold transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Оформлення...
              </>
            ) : (
              'Оформити замовлення'
            )}
          </Button>
        </form>

        {/* Гарантія - мінімальна */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 pt-2">
          <Shield className="h-4 w-4 text-[#6A5ACD]" />
          <span>Якщо результат не сподобається — ми повернемо гроші</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
