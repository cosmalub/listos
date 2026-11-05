import { Button } from "@/components/ui/button";
import { useOrderDialog } from "@/components/order/OrderDialogContext";
import { QrCode, Smartphone, Volume2, Check } from "lucide-react";

interface ProductFormatCardsProps {
   /** Source для існуючого openOrderDialog. Контракт замовлення не змінюється. */
   qrOrderSource?: string;
}

/**
 * Дві фірмові карточки фізичних форматів листівки у стилістиці Листосика
 * з булітами переваг та виразним блоком ціни.
 */
export function ProductFormatCards({ qrOrderSource = "homepage-product-qr" }: ProductFormatCardsProps) {
   const { openOrderDialog } = useOrderDialog();

   return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">

         {/* ================================================================= */}
         {/* ФОРМАТ 1: Фізична листівка з QR-кодом (249 грн)                   */}
         {/* ================================================================= */}
         <div className="group relative h-full flex flex-col bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-[#E6E6FA] hover:border-[#B8B3FF]">
            {/* Top Badge Row */}
            <div className="flex items-center justify-start gap-3 mb-5">
               <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F0FF] text-[#6A5ACD] px-3.5 py-1.5 text-xs font-bold tracking-wide uppercase border border-[#D8D0FF]">
                  <QrCode className="w-3.5 h-3.5" />
                  Фізична листівка з QR-кодом з піснею
               </span>
            </div>

            {/* Title & Description */}
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight">
               Класична листівка з QR-кодом
            </h3>
            <p className="text-base text-gray-600 leading-relaxed mb-6">
               Отримувач наводить камеру телефона на QR-код — і одразу відкриває персональну веб-сторінку з твоєю піснею, текстом та святковою анімацією.
            </p>

            {/* Feature Pills */}
            <div className="bg-[#F8F7FF] rounded-2xl p-4 mb-6 border border-[#E6E6FA] space-y-2.5">
               <div className="flex items-center gap-2.5 text-sm text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#6A5ACD]/15 text-[#6A5ACD] flex items-center justify-center shrink-0">
                     <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Друк на преміум-картоні формату A6</span>
               </div>
               <div className="flex items-center gap-2.5 text-sm text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#6A5ACD]/15 text-[#6A5ACD] flex items-center justify-center shrink-0">
                     <Smartphone className="w-3.5 h-3.5" />
                  </div>
                  <span>Персональна анімована сторінка з піснею</span>
               </div>
               <div className="flex items-center gap-2.5 text-sm text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#6A5ACD]/15 text-[#6A5ACD] flex items-center justify-center shrink-0">
                     <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Доставка «Новою поштою» по Україні</span>
               </div>
            </div>

            {/* Price & CTA */}
            <div className="mt-auto pt-2 space-y-4">
               <div className="flex items-baseline justify-between px-1">
                  <div>
                     <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">249</span>
                     <span className="text-lg font-bold text-gray-500 ml-1">грн</span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#6A5ACD] bg-[#F3F0FF] px-3 py-1 rounded-full">
                     Все включено
                  </span>
               </div>

               <Button
                  onClick={() => openOrderDialog(qrOrderSource, 'Створити QR-листівку')}
                  className="w-full bg-gradient-to-r from-[#6A5ACD] via-[#9370DB] to-[#FF85A2] text-white hover:opacity-95 rounded-full px-6 py-6 text-base font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all h-auto"
               >
                  Створити QR-листівку
               </Button>
            </div>
         </div>

         {/* ================================================================= */}
         {/* ФОРМАТ 2: Фізична листівка зі звуковим модулем (899 грн)          */}
         {/* ================================================================= */}
         <div className="group relative h-full flex flex-col bg-gradient-to-b from-white via-white to-[#FFF5F8]/60 rounded-[2rem] p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-[#FFB8D0]/80 hover:border-[#FF85A2]">
            {/* Top Badge Row */}
            <div className="flex items-center justify-start gap-3 mb-5">
               <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0F5] text-[#D6336C] px-3.5 py-1.5 text-xs font-bold tracking-wide uppercase border border-[#FFCCE0]">
                  <Volume2 className="w-3.5 h-3.5" />
                  Фізична листівка зі звуковим модулем
               </span>
            </div>

            {/* Title & Description */}
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight">
               Листівка, що співає при відкритті
            </h3>
            <p className="text-base text-gray-600 leading-relaxed mb-6">
               Відкриваєш листівку — і твоя пісня звучить одразу наживо! Всередині вмонтовано справжній звуковий модуль з динаміком, без сканування QR-коду та телефону.
            </p>

            {/* Feature Pills */}
            <div className="bg-gradient-to-br from-[#FFF5F8] to-[#F8F5FF] rounded-2xl p-4 mb-6 border border-[#FFD6E7] space-y-2.5">
               <div className="flex items-center gap-2.5 text-sm text-gray-800 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#FF85A2]/20 text-[#D6336C] flex items-center justify-center shrink-0">
                     <Volume2 className="w-3.5 h-3.5" />
                  </div>
                  <span>Вбудований динамік — вмикається при розгортанні</span>
               </div>
               <div className="flex items-center gap-2.5 text-sm text-gray-800 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#FF85A2]/20 text-[#D6336C] flex items-center justify-center shrink-0">
                     <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Складана конструкція-книжка з розворотом (88×166 мм)</span>
               </div>
               <div className="flex items-center gap-2.5 text-sm text-gray-800 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#FF85A2]/20 text-[#D6336C] flex items-center justify-center shrink-0">
                     <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Запис твоєї пісні в модуль, друк і доставка</span>
               </div>
            </div>

            {/* Price & CTA */}
            <div className="mt-auto pt-2 space-y-4">
               <div className="flex items-baseline justify-between px-1">
                  <div>
                     <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#D6336C] via-[#9370DB] to-[#6A5ACD]">
                        899
                     </span>
                     <span className="text-lg font-bold text-gray-500 ml-1">грн</span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#D6336C] bg-[#FFF0F5] px-3 py-1 rounded-full border border-[#FFCCE0]/60">
                     Все включено
                  </span>
               </div>

               <Button
                  onClick={() => openOrderDialog("homepage-product-sound", "Створити звукову листівку")}
                  className="w-full bg-gradient-to-r from-[#FF85A2] via-[#9370DB] to-[#6A5ACD] text-white hover:opacity-95 rounded-full px-6 py-6 text-base font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all h-auto"
               >
                  Замовити звукову листівку
               </Button>
            </div>
         </div>

      </div>
   );
}
