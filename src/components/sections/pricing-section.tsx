import { Music, Check, Heart, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import mascotImage from "@/assets/listosyk-mascot.png";

export function PricingSection() {
  const features = [
    "Ви надаєте текст і настрій",
    "Ми створюємо унікальну пісню", 
    "Красивий дизайн листівки",
    "QR-код для прослуховування"
  ];

  return (
    <section className="py-24 bg-gradient-soft relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-baloo text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Персональна музична листівка
          </h2>
          <p className="text-xl text-muted-foreground font-medium">
            Друк і відправка за 1–2 дні • Безкоштовна доставка «Новою поштою»
          </p>
        </div>

        {/* Main pricing card */}
        <div className="max-w-7xl mx-auto">
          <Card className="bg-card/95 backdrop-blur-lg rounded-[2rem] shadow-soft border border-accent/20 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              
              {/* Left side - Mascot and Price */}
              <div className="bg-gradient-primary p-12 flex flex-col items-center justify-center text-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/20"></div>
                
                {/* Mascot */}
                <div className="relative z-10 mb-8">
                  <div className="w-48 h-48 mx-auto mb-6 relative">
                    <img 
                      src={mascotImage} 
                      alt="Листосик - талісман музичних листівок" 
                      className="w-full h-full object-contain animate-subtle-move filter drop-shadow-2xl"
                    />
                  </div>
                  <div className="bg-card/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                    <p className="text-white font-medium text-lg">
                      Привіт! Я Листосик і допомагаю створювати незабутні музичні подарунки! 🎵
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-center gap-4">
                    <span className="font-baloo text-6xl font-bold text-white drop-shadow-lg">399 грн</span>
                    <div className="text-center">
                      <span className="text-2xl text-white/60 line-through block">699 грн</span>
                      <Badge className="bg-destructive text-destructive-foreground px-3 py-1 text-sm font-bold rounded-full">
                        -43%
                      </Badge>
                    </div>
                  </div>
                  
                  <Button 
                    size="lg" 
                    className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 px-10 py-4 text-xl font-semibold rounded-full shadow-xl border-2 border-white/30"
                    onClick={() => window.location.href = '/order'}
                  >
                    <Heart className="mr-3 h-6 w-6" />
                    Замовити зараз
                  </Button>
                </div>
              </div>

              {/* Right side - Features and Guarantee */}
              <div className="p-12 space-y-8">
                <div>
                  <h3 className="font-baloo text-3xl font-bold text-foreground mb-8 text-center lg:text-left">
                    Що ви отримаєте:
                  </h3>
                  
                  {/* Features list */}
                  <div className="space-y-6">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-5 group">
                        <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-card group-hover:scale-110 transition-transform duration-300">
                          <Check className="h-6 w-6 text-white font-bold" />
                        </div>
                        <span className="text-foreground font-medium text-lg leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guarantee section */}
                <Card className="bg-success/5 border-2 border-success/30 p-6 rounded-2xl">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-success rounded-2xl flex items-center justify-center">
                      <Gift className="h-6 w-6 text-success-foreground" />
                    </div>
                    <h4 className="font-semibold text-xl text-success">100% Гарантія задоволення</h4>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Якщо вау-ефекту не буде і вам не сподобається — повернемо всі гроші без запитань
                  </p>
                </Card>

                {/* Trust indicators */}
                <div className="flex items-center justify-center lg:justify-start gap-6 pt-4">
                  <div className="text-center">
                    <div className="font-bold text-2xl text-primary">1-2 дні</div>
                    <div className="text-sm text-muted-foreground">Швидке виконання</div>
                  </div>
                  <div className="w-px h-12 bg-border"></div>
                  <div className="text-center">
                    <div className="font-bold text-2xl text-primary">Безкоштовно</div>
                    <div className="text-sm text-muted-foreground">Доставка по Україні</div>
                  </div>
                  <div className="w-px h-12 bg-border"></div>
                  <div className="text-center">
                    <div className="font-bold text-2xl text-primary">100%</div>
                    <div className="text-sm text-muted-foreground">Гарантія якості</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}