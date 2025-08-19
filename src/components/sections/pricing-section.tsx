import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
export function PricingSection() {
  const features = ["Ви створюєте текст пісні і обираєте настрій для мелодії", "Ми друкуємо красиву листівку з унікальним QR-кодом для прослуховування", "Доставляємо Новою поштою безкоштовно по всій Україні", "Отримуєте за 1–2 дні готовий персональний музичний подарунок"];
  return <section className="py-16 bg-white rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] relative z-10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto relative">
          <Card className="bg-card border border-[#6A5ACD]/20 rounded-3xl shadow-lg overflow-hidden md:pr-20">
            <div className="p-8 lg:p-12">
              
              {/* Header - Centered */}
              <div className="text-center mb-8">
                <h2 className="font-baloo text-2xl md:text-3xl font-bold text-[#6A5ACD] mb-3">
                  Персональна музична листівка
                </h2>
                <p className="text-base text-[#6A5ACD]/80">
                  Друк і відправка за 1–2 дні • Безкоштовна доставка «Новою поштою»
                </p>
              </div>

              {/* Features List - Centered */}
              <div className="flex justify-center mb-8">
                <div className="space-y-4 max-w-lg">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#6A5ACD] to-[#8A7CDD] rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-[#6A5ACD] text-sm md:text-base leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA with Pricing */}
              <div className="text-center space-y-4">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                  <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] hover:from-[#7A6ADE] hover:to-[#C282EF] text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 font-bold" onClick={() => window.location.href = '/order'}>
                    Створити листівку
                  </Button>
                  
                  <div className="flex items-center gap-3">
                    <span className="line-through text-[#6A5ACD]/60 text-base md:text-lg">600 грн</span>
                    <span className="text-[#6A5ACD] font-bold text-xl md:text-2xl">399 грн</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Desktop Mascot with Speech Bubble - Right Side */}
          <div className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 flex-row-reverse items-center gap-4">
            <img src="/lovable-uploads/bfc3ff59-dfa5-40be-a6ec-6d9dbe6007d8.png" alt="Маскот Листосик" className="w-48 h-48 object-contain animate-subtle-move" />
            
            <div className="relative">
              <div className="bg-white border-2 border-[#B8B3FF]/60 rounded-2xl p-4 shadow-lg max-w-xs">
                <p className="text-[#6A5ACD] text-sm font-medium text-center">
                  Гарантую: якщо не сподобається — повернемо гроші!
                </p>
              </div>
              {/* Speech bubble tail pointing right */}
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 bg-white border-r-2 border-t-2 border-[#B8B3FF]/60 transform rotate-45"></div>
            </div>
          </div>

          {/* Mobile Mascot with Speech Bubble - Below Card */}
          <div className="md:hidden flex flex-col items-center mt-8 gap-4">
            <div className="relative flex justify-center">
              <div className="bg-white border-2 border-[#B8B3FF]/60 rounded-2xl p-4 shadow-lg max-w-xs">
                <p className="text-[#6A5ACD] text-sm font-medium text-center">
                  Гарантую: якщо не сподобається — повернемо гроші!
                </p>
              </div>
              {/* Speech bubble tail pointing down */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-b-2 border-[#B8B3FF]/60 transform rotate-45"></div>
            </div>
            
            <img src="/lovable-uploads/bfc3ff59-dfa5-40be-a6ec-6d9dbe6007d8.png" alt="Маскот Листосик" className="w-40 h-40 object-contain animate-subtle-move" />
          </div>
        </div>
      </div>
    </section>;
}