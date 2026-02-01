import { Button } from "@/components/ui/button";
import { useOrderDialog } from "@/components/order/OrderDialogContext";
import { ArrowDown, ArrowRight } from "lucide-react";
import postcardScanImage from "@/assets/postcard-scan.png";

export function UnifiedFlowExperiment() {
   const { openOrderDialog } = useOrderDialog();

   return (
      <section className="pt-24 pb-24 bg-white overflow-hidden">
         <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-16">

               {/* Block 1: Intro */}
               <div className="text-center space-y-6">
                  <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                     Що це та як працює Листосик?
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                     Листосик — це онлайн-сервіс, що допомагає створити незабутній подарунок з музикою для близької людини без зайвого клопоту.
                  </p>
               </div>

               {/* 2 Separate Cards Layout with Arrow */}
               <div className="flex flex-col md:flex-row items-center gap-8 md:gap-6">

                  {/* Card 1: Creation */}
                  <div className="flex-1 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full items-center text-center w-full">
                     <h3 className="text-2xl font-bold text-gray-900 mb-4">Магія створення</h3>
                     <p className="text-lg text-gray-700 leading-relaxed font-medium mb-6">
                        Ти заходиш у “студію”, відповідаєш на кілька питань — і сервіс миттєво створює унікальний текст пісні, музику та дизайн листівки.
                     </p>
                     {/* Media 1: Video */}
                     <div className="mt-auto relative w-full aspect-video bg-[#2A2A2A] rounded-xl overflow-hidden shadow-sm border border-gray-200">
                        <video
                           className="w-full h-full object-cover"
                           controls
                           playsInline
                           preload="auto"
                        >
                           <source src="/videos/mama-case.mp4" type="video/mp4" />
                        </video>
                     </div>
                  </div>

                  {/* Connector Arrow */}
                  <div className="flex items-center justify-center text-gray-300">
                     <ArrowDown className="w-8 h-8 md:hidden" />
                     <ArrowRight className="w-10 h-10 hidden md:block" />
                  </div>

                  {/* Card 2: Result */}
                  <div className="flex-1 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full items-center text-center w-full">
                     <h3 className="text-2xl font-bold text-gray-900 mb-4">Емоція в руках</h3>
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



            </div>
         </div>
      </section>
   );
}
