import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function PricingSection() {
  const features = [
    "Ви створюєте текст і обираєте настрій",
    "Ми друкуємо красиву листівку з QR-кодом", 
    "Доставляємо Новою поштою безкоштовно",
    "Отримуєте за 1–2 дні готовий подарунок"
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-card border border-primary/20 rounded-3xl shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              
              {/* Left side - Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="space-y-6">
                  <div>
                    <h2 className="font-baloo text-2xl md:text-3xl font-bold text-foreground mb-3">
                      Персональна музична листівка
                    </h2>
                    <p className="text-base text-muted-foreground">
                      Друк і відправка за 1–2 дні • Безкоштовна доставка «Новою поштою»
                    </p>
                  </div>
                  
                  {/* Features list */}
                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-foreground text-sm md:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <Button 
                      size="lg" 
                      className="bg-gradient-primary text-white hover:opacity-90 transition-all duration-300 px-8 py-3 text-lg font-semibold rounded-2xl shadow-lg w-full sm:w-auto"
                      onClick={() => window.location.href = '/order'}
                    >
                      Замовити за 399 грн
                    </Button>
                  </div>

                  {/* Guarantee */}
                  <div className="flex items-center gap-3 pt-2">
                    <ShieldCheck className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Гарантія повернення коштів, якщо не сподобається
                    </span>
                  </div>
                </div>
              </div>

              {/* Right side - Mascot with Price */}
              <div className="bg-gradient-subtle p-8 lg:p-12 flex flex-col items-center justify-center text-center relative">
                <div className="relative">
                  <img 
                    src="/lovable-uploads/98b9ac57-70e6-41db-9354-14e9f857e503.png" 
                    alt="Маскот з табличкою ціни 399 грн" 
                    className="w-64 h-64 object-contain animate-subtle-move"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}