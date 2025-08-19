import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
export function PricingSection() {
  const features = ["Ви створюєте текст пісні і обираєте настрій для мелодії", "Ми друкуємо красиву листівку з унікальним QR-кодом для прослуховування", "Доставляємо Новою поштою безкоштовно по всій Україні", "Отримуєте за 1–2 дні готовий персональний музичний подарунок"];
  return <section className="py-16 bg-white rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] relative z-10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto relative">
          <Card className="bg-card border border-[#6A5ACD]/20 rounded-3xl shadow-lg overflow-hidden">
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

          {/* Mascot with Speech Bubble - Bottom Section for All Screens */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mt-12">
            {/* Cat Image */}
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                src="/lovable-uploads/bfc3ff59-dfa5-40be-a6ec-6d9dbe6007d8.png"
                alt="Листосик - гарантія якості"
                className="w-64 h-64 transform transition-transform hover:scale-105 drop-shadow-2xl"
              />
            </div>

            {/* Speech Bubble */}
            <div className="w-full md:w-2/3 relative group">
              <div className="bg-card p-6 rounded-3xl border-2 border-[#B8B3FF]/60 group-hover:border-[#B8B3FF] transition-colors group-hover:shadow-md relative">
                {/* Speech bubble pointer - only visible on md screens and up */}
                <div className="hidden md:block absolute top-1/2 -left-3 transform -translate-y-1/2 w-6 h-6 rotate-45 border-l-2 border-b-2 border-[#B8B3FF]/60 group-hover:border-[#B8B3FF] transition-colors bg-card"></div>

                <h3 className="text-xl font-bold text-[#6A5ACD] mb-3">Гарантія якості!</h3>
                <p className="text-muted-foreground">
                  Якщо не сподобається — повернемо гроші! Ми впевнені в якості наших музичних листівок і готові відповідати за результат.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}