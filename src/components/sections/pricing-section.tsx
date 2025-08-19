import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function PricingSection() {
  const features = [
    "Ви створюєте текст пісні і обираєте настрій для мелодії",
    "Ми друкуємо красиву листівку з унікальним QR-кодом для прослуховування", 
    "Доставляємо Новою поштою безкоштовно по всій Україні",
    "Отримуєте за 1–2 дні готовий персональний музичний подарунок"
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-card border border-primary/20 rounded-3xl shadow-lg overflow-hidden">
            <div className="p-8 lg:p-12">
              
              {/* Header - Centered */}
              <div className="text-center mb-8">
                <h2 className="font-baloo text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Персональна музична листівка
                </h2>
                <p className="text-base text-muted-foreground">
                  Друк і відправка за 1–2 дні • Безкоштовна доставка «Новою поштою»
                </p>
              </div>

              {/* Content Grid */}
              <div className="grid lg:grid-cols-2 gap-4 mb-8">
                
                {/* Left side - Features */}
                <div className="flex flex-col justify-center">
                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-foreground text-sm md:text-base leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side - Mascot */}
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <img 
                      src="/lovable-uploads/bfc3ff59-dfa5-40be-a6ec-6d9dbe6007d8.png" 
                      alt="Маскот з табличкою ціни 399 грн" 
                      className="w-56 h-56 object-contain animate-subtle-move"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom - CTA and Guarantee - Centered */}
              <div className="text-center space-y-4">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] hover:from-[#7A6ADE] hover:to-[#C282EF] text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 font-bold"
                  onClick={() => window.location.href = '/order'}
                >
                  Створити листівку
                </Button>

                <div className="flex items-center justify-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-success flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Гарантія повернення коштів, якщо не сподобається
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}