import { Button } from "@/components/ui/button";
import { useOrderDialog } from "@/components/order/OrderDialogContext";
import { ArrowDown, Sparkles, CheckCircle2 } from "lucide-react";
import postcardScanImage from "@/assets/postcard-scan.png";
import listosykMascot from "@/assets/listosyk-mascot.png";

export function UnifiedFlowExperiment() {
   const { openOrderDialog } = useOrderDialog();

   return (
      <section className="pt-24 pb-24 bg-white overflow-hidden">
         <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-16">

               {/* Block 1: Intro */}
               <div className="text-center space-y-6">
                  <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                     Що це та як працює Листосик?
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                     Листосик — це онлайн-сервіс, що допомагає створити незабутній подарунок з музикою для близької людини без зайвого клопоту.
                  </p>
               </div>


               {/* 2 Separate Cards Layout */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  {/* Card 1: Creation (Combined Step 1 & 2) */}
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full items-center text-center md:items-start md:text-left">
                     <div className="w-12 h-12 bg-[#E6E6FA] rounded-full flex items-center justify-center text-[#6A5ACD] font-bold text-xl mb-6">1</div>
                     <p className="text-lg text-gray-700 leading-relaxed font-medium mb-6">
                        Ти заходиш у “студію”, відповідаєш на кілька питань — і сервіс миттєво створює унікальний текст пісні, музику та дизайн листівки.
                     </p>
                     {/* Media 1: Video */}
                     <div className="mt-auto relative w-full aspect-video bg-[#2A2A2A] rounded-xl overflow-hidden shadow-sm border border-gray-200">
                        <video
                           src="/videos/studio.mp4"
                           className="w-full h-full object-cover"
                           muted
                           playsInline
                           loop
                           autoPlay
                        />
                     </div>
                  </div>

                  {/* Card 2: Result (Formerly Step 3) */}
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full items-center text-center md:items-start md:text-left">
                     <div className="w-12 h-12 bg-[#E6E6FA] rounded-full flex items-center justify-center text-[#6A5ACD] font-bold text-xl mb-6">2</div>
                     <p className="text-lg text-gray-700 leading-relaxed font-medium mb-6">
                        Ми друкуємо цю листівку, додаємо QR-код із твоєю персональною історією-музикою і надсилаємо “Новою поштою” по Україні.
                     </p>
                     {/* Media 2: Postcard Scan */}
                     <div className="mt-auto relative w-full aspect-video bg-gradient-to-br from-[#F5F3FF] to-[#F0F0FF] rounded-xl overflow-hidden shadow-sm border border-[#E8B3FF]/30">
                        <img
                           src={postcardScanImage}
                           alt="Листівка з QR-кодом"
                           className="w-full h-full object-cover"
                        />
                     </div>
                  </div>
               </div>


               {/* CTA & Price - Compact Block (No Background) */}
               <div className="mt-12">
                  <div className="w-full text-center relative overflow-hidden group">

                     <div className="relative z-10 flex flex-col items-center gap-6">
                        <Button
                           onClick={() => openOrderDialog('how-it-works', 'Отримати доступ')}
                           className="bg-gradient-to-r from-[#6A5ACD] via-[#9370DB] to-[#FF85A2] text-white hover:opacity-90 rounded-full px-8 py-4 text-lg font-bold shadow-md hover:shadow-lg hover:-translate-y-1 transition-all h-auto"
                        >
                           Отримати доступ
                        </Button>
                        <p className="text-xl md:text-2xl text-gray-900 font-medium">
                           Все включено: від ідеї до створення, друк та доставка — <span className="text-[#6A5ACD] font-bold">399 грн</span>.
                        </p>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </section>
   );
}
