import { Button } from "@/components/ui/button";
import { useOrderDialog } from "@/components/order/OrderDialogContext";

export function ProblemSolutionExperiment() {
  const { openOrderDialog } = useOrderDialog();
  
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-white">
      {/* Background Gradient similar to Hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#E6E6FA]/30 blur-[100px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#FFD1DC]/30 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="relative z-10 max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Листосик вирішує
            </h2>
            <p className="text-xl text-[#6A5ACD] font-medium">
              Замість банальних подарунків — реальні емоції
            </p>
          </div>
          
          {/* Grid Layout for Benefits */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-10 h-10 rounded-full bg-[#E0F2F1] flex items-center justify-center text-[#00695C] font-bold mb-4 text-lg">✓</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Не знаєш, що подарувати?</h3>
              <p className="text-gray-600 leading-relaxed">Людині, у якої «все є», потрібна незабутня емоція, а не черговий сувенір.</p>
            </div>

            <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-10 h-10 rounded-full bg-[#F3E5F5] flex items-center justify-center text-[#6A5ACD] font-bold mb-4 text-lg">✓</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Хочеш сказати важливе?</h3>
              <p className="text-gray-600 leading-relaxed">«Дякую», «кохаю», «пробач» — звичайна листівка звучить безлико, а пісня робить це щиро.</p>
            </div>

            <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-10 h-10 rounded-full bg-[#FFF3E0] flex items-center justify-center text-[#EF6C00] font-bold mb-4 text-lg">✓</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Потрібен подарунок «тут і зараз»?</h3>
              <p className="text-gray-600 leading-relaxed">Без складної підготовки. Листосик працює за 2 хвилини, а емоції залишаються назавжди.</p>
            </div>

            <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-10 h-10 rounded-full bg-[#E3F2FD] flex items-center justify-center text-[#1565C0] font-bold mb-4 text-lg">✓</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Немає натхнення?</h3>
              <p className="text-gray-600 leading-relaxed">Не хвилюйся, ми все підкажемо й допоможемо. Лише тепло і нічого зайвого.</p>
            </div>
          </div>

          {/* Special Feature Block */}
          <div className="bg-gradient-to-r from-[#6A5ACD]/5 to-[#9370DB]/5 rounded-[2rem] p-8 md:p-10 mb-12 border border-[#6A5ACD]/10 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#6A5ACD]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
             
             <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed relative z-10">
                <span className="text-2xl mr-2">✨</span>
                <span className="font-bold text-[#6A5ACD]">Чому це не просто привітання:</span><br/>
                Листосик створює унікальну пісню і візуальну листівку з твого настрою — це персональна історія, яку приємно не тільки отримати, а й дарувати.
              </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center justify-center gap-4">
            <Button
              onClick={() => openOrderDialog('problem-solution', 'Спробувати')}
              className="h-auto text-xl px-12 py-6 rounded-full bg-[#6A5ACD] hover:bg-[#5A4ABD] text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 font-bold"
            >
              Спробувати
            </Button>
            
            <span className="text-sm text-gray-400 font-medium tracking-wide">399 ГРН • ВСЕ ВКЛЮЧЕНО</span>
          </div>

        </div>
      </div>
    </section>
  );
}
