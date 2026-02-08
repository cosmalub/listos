import { Button } from "@/components/ui/button";
import { useOrderDialog } from "@/components/order/OrderDialogContext";
import { Sparkles, Gift, ArrowRight } from "lucide-react";
import postcardScanImage from "@/assets/postcard-scan.png";

export function ProcessCompactExperiment() {
  const { openOrderDialog } = useOrderDialog();
  
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gradient-to-b from-white to-[#FDFBF7] relative overflow-hidden">
      
      {/* Decorative dots */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-[#FFD1DC] rounded-full blur-sm" />
      <div className="absolute bottom-20 right-10 w-6 h-6 bg-[#E6E6FA] rounded-full blur-sm" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Як це працює
            </h2>
            <p className="text-lg text-gray-600">
              Від ідеї до емоції — всього 2 кроки
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            
            {/* Step 1 */}
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(106,90,205,0.1)] transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6A5ACD] to-[#9370DB] text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-[#6A5ACD]/20 group-hover:scale-110 transition-transform">
                  1
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Створюєш</h3>
              </div>
              
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Відповідаєш на питання Листосика — він створює пісню і дизайн листівки. 
                Все за 10 хвилин.
              </p>
              
              <div className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all">
                <video
                  src="/videos/studio.mp4"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  muted
                  playsInline
                  loop
                  autoPlay
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(106,90,205,0.1)] transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF85A2] to-[#FFB7C5] text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-[#FF85A2]/20 group-hover:scale-110 transition-transform">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Даруєш</h3>
              </div>
              
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Отримуєш листівку Новою поштою за 1-2 дні. 
                Скан QR-коду — і звучить пісня.
              </p>
              
              <div className="relative w-full aspect-video bg-gradient-to-br from-[#FFF0F5] to-[#F3E5F5] rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all p-4">
                <img
                  src={postcardScanImage}
                  alt="Листівка з QR-кодом"
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Price + CTA */}
          <div id="pricing" className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-[#F0E6FF] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#6A5ACD] via-[#FF85A2] to-[#6A5ACD]" />
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative z-10">
              
              <div className="text-center md:text-left">
                <div className="flex items-baseline justify-center md:justify-start gap-2 mb-2">
                  <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#6A5ACD] to-[#9370DB] bg-clip-text text-transparent">249</span>
                  <span className="text-2xl text-gray-400 font-medium">грн</span>
                </div>
                <p className="text-gray-500 font-medium">
                  Все включено: пісня, листівка, доставка
                </p>
              </div>

              <Button
                onClick={() => openOrderDialog('process-compact', 'Почати створення')}
                className="bg-gradient-to-r from-[#6A5ACD] to-[#9370DB] hover:from-[#5A4ABD] hover:to-[#8360CB] text-white rounded-full px-12 py-8 text-xl font-bold shadow-xl hover:shadow-[#6A5ACD]/30 hover:-translate-y-1 transition-all flex items-center gap-3 h-auto"
              >
                Почати створення
                <ArrowRight size={24} />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
