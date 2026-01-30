import { Button } from "@/components/ui/button";
import { useOrderDialog } from "@/components/order/OrderDialogContext";
import { ArrowDown, Sparkles, CheckCircle2 } from "lucide-react";
import postcardScanImage from "@/assets/postcard-scan.png";

export function UnifiedFlowExperiment() {
  const { openOrderDialog } = useOrderDialog();
  
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-white to-[#FFF5F5]">
      
      {/* Decorative background elements connecting the flow */}
      <div className="absolute top-[10%] left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[5%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#E6E6FA]/40 blur-[120px]" />
         <div className="absolute top-[40%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#FFD1DC]/30 blur-[120px]" />
         <div className="absolute bottom-[5%] right-[10%] w-[30%] h-[30%] rounded-full bg-[#B8B3FF]/20 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* --- PART 1: PROBLEM / SOLUTION (UNIFIED STYLE) --- */}
          <div className="mb-32 relative z-10">
            
            {/* Header - Matching Hero Style */}
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
                Листосик <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A5ACD] via-[#9370DB] to-[#FF85A2]">вирішує</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Ми перетворюємо сумніви на впевненість, а слова — на магію.
              </p>
            </div>
            
            {/* Cards Grid - Modern & Clean */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-20 px-4">
               {[
                  {
                     problem: "Не знаєш, що подарувати?",
                     desc: "Людині, у якої «все є»?",
                     solution: "Потрібна незабутня емоція, а не черговий сувенір."
                  },
                  {
                     problem: "Хочеш сказати важливе?",
                     desc: "«Дякую», «кохаю», «пробач»",
                     solution: "Звичайна листівка — безлико. Пісня — щиро і до сліз."
                  },
                  {
                     problem: "Турбуєшся про слова?",
                     desc: "Що вони не донесуть почуттів?",
                     solution: "Ідеальна пісня на основі твого досвіду зробить момент особливим."
                  },
                  {
                     problem: "Подарунок «тут і зараз»?",
                     desc: "Потрібно терміново?",
                     solution: "2 хвилини на створення. Емоції на все життя."
                  },
                  {
                     problem: "Немає натхнення?",
                     desc: "Не знаєш з чого почати?",
                     solution: "Ми підкажемо кожне слово. Лише тепло і нічого зайвого."
                  }
               ].map((item, index) => (
                  <div 
                    key={index} 
                    className={`group relative bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(106,90,205,0.1)] hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col justify-between h-full ${index >= 3 ? 'lg:col-span-1 lg:last:col-start-auto' : ''} ${index === 3 ? 'lg:ml-auto' : ''} ${index === 4 ? 'lg:mr-auto' : ''}`}
                  >
                     {/* Gradient Blob on Hover */}
                     <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#E6E6FA] to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                     
                     <div className="relative z-10">
                        <div className="mb-4 inline-flex p-3 rounded-2xl bg-[#F8F7FF] text-[#6A5ACD] group-hover:scale-110 transition-transform duration-500">
                           <CheckCircle2 size={24} />
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                           {item.problem}
                        </h3>
                        <p className="text-sm text-gray-400 mb-4 font-medium">
                           {item.desc}
                        </p>
                        
                        <div className="w-full h-px bg-gray-100 mb-4 group-hover:bg-[#6A5ACD]/20 transition-colors" />
                        
                        <p className="text-lg font-medium text-gray-600 group-hover:text-[#6A5ACD] transition-colors leading-snug">
                           {item.solution}
                        </p>
                     </div>
                     
                     {/* Bottom accent line */}
                     <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-gradient-to-r from-[#6A5ACD] to-[#9370DB] group-hover:w-full transition-all duration-500" />
                  </div>
               ))}
            </div>
          </div>


          {/* --- PART 2 REMOVED (MAGIC STEPS) --- */}


          {/* --- PART 3: FINAL OFFER (CTA) --- */}
          <div id="pricing" className="relative">
             <div className="bg-gradient-to-br from-[#6A5ACD] to-[#8A7AEE] rounded-[3rem] p-10 md:p-16 text-center text-white shadow-2xl shadow-[#6A5ACD]/30 relative overflow-hidden">
                
                {/* Decorative circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 max-w-3xl mx-auto">
                   <h3 className="text-3xl md:text-5xl font-bold mb-6">
                      Готовий подарунок «під ключ»
                   </h3>
                   <p className="text-xl md:text-2xl text-white/90 mb-4 leading-relaxed font-medium">
                      Це не просто привітання. Це персональна історія.
                   </p>
                   <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed">
                      Унікальна пісня + Дизайн + Друк + Доставка <br/>
                      <span className="font-bold border-b-2 border-white/30 pb-1">Все включено за 399 грн</span>
                   </p>

                   <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                      <Button
                         onClick={() => openOrderDialog('unified-flow', 'Почати створення')}
                         className="bg-white text-[#6A5ACD] hover:bg-gray-50 rounded-full px-12 py-8 text-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all h-auto min-w-[200px]"
                      >
                         Почати створення
                      </Button>
                      
                      <p className="text-sm text-white/70 flex items-center gap-2">
                         <Sparkles size={16} />
                         Гарантія емоцій або повернення коштів
                      </p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
