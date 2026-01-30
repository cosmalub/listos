import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrderDialog } from "@/components/order/OrderDialogContext";

export function HeroSectionMinimal() {
  const { openOrderDialog } = useOrderDialog();

  return (
    <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-b from-[#fdfbf7] to-white">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#2D2D2D] tracking-tight leading-tight">
            Музична листівка, <br />
            <span className="text-[#6A5ACD]">що говорить за тебе</span>
          </h1>

          <p className="text-xl md:text-2xl mb-10 text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Створи персональний подарунок з власною піснею за 2 хвилини. 
            Просто, швидко та незабутньо.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 text-gray-700 bg-white/50 px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <div className="bg-[#E0F2F1] p-1 rounded-full text-[#00695C]">
                <Check className="w-4 h-4" />
              </div>
              <span className="text-sm md:text-base font-medium">Готово за 10 хвилин</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 bg-white/50 px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <div className="bg-[#E0F2F1] p-1 rounded-full text-[#00695C]">
                <Check className="w-4 h-4" />
              </div>
              <span className="text-sm md:text-base font-medium">Безкоштовна доставка</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 bg-white/50 px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <div className="bg-[#E0F2F1] p-1 rounded-full text-[#00695C]">
                <Check className="w-4 h-4" />
              </div>
              <span className="text-sm md:text-base font-medium">Вау-ефект</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => openOrderDialog('hero-minimal', 'Начати створення')}
              className="text-lg px-10 py-6 rounded-full bg-[#6A5ACD] hover:bg-[#5A4ABD] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold flex items-center gap-2"
            >
              Начать <ArrowRight className="w-5 h-5" />
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                const examplesSection = document.getElementById('examples');
                examplesSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-lg px-8 py-6 rounded-full border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-[#6A5ACD] hover:border-[#6A5ACD]/30 transition-all duration-300 font-medium"
            >
              Дізнатися більше
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#E6E6FA] blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#FFD1DC] blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>
    </section>
  );
}
