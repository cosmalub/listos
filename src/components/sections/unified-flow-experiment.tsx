import { ArrowDown, ArrowRight } from "lucide-react";
import { ProductFormatCards } from "@/components/product/product-format-cards";

export function UnifiedFlowExperiment() {
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
                           preload="metadata"
                        >
                           <source src="/videos/mama-case.mp4#t=0.1" type="video/mp4" />
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
                        Ми друкуємо твою листівку з обраним способом відтворення пісні і надсилаємо “Новою поштою” по Україні.
                     </p>
                     {/* Media 2: Video */}
                     <div className="mt-auto relative w-full aspect-video bg-[#2A2A2A] rounded-xl overflow-hidden shadow-sm border border-gray-200">
                        <video
                           className="w-full h-full object-cover"
                           controls
                           playsInline
                           preload="metadata"
                        >
                           <source src="/videos/mamo.mp4#t=0.1" type="video/mp4" />
                        </video>
                     </div>
                  </div>
               </div>

               {/* Block 3: Два фізичні формати листівки */}
               <div className="space-y-10">
                  <div className="text-center space-y-4">
                     <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
                        Обери, як зазвучить твоя листівка
                     </h2>
                     <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        Пісня та дизайн залишаються персональними в обох варіантах — різниця лише в тому, як саме твоя музика зазвучить у руках близької людини.
                     </p>
                  </div>

                  <ProductFormatCards qrOrderSource="homepage-product-qr" />
               </div>

            </div>
         </div>
      </section>
   );
}
