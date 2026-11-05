import { Button } from "@/components/ui/button";
import { useOrderDialog } from "@/components/order/OrderDialogContext";
import { QrCode, Smartphone, Volume2, Sparkles, Check, Music } from "lucide-react";

interface ProductFormatCardsProps {
   /** Source для існуючого openOrderDialog. Контракт замовлення не змінюється. */
   qrOrderSource?: string;
}

/**
 * Дві яскраві фірмові карточки фізичних форматів листівки у стилістиці Листосика
 * з візуальними міні-сценами, булітами переваг та виразним блоком ціни.
 */
export function ProductFormatCards({ qrOrderSource = "homepage-product-qr" }: ProductFormatCardsProps) {
   const { openOrderDialog } = useOrderDialog();

   return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">

         {/* ================================================================= */}
         {/* ФОРМАТ 1: Класична QR-листівка (249 грн)                          */}
         {/* ================================================================= */}
         <div className="group relative h-full flex flex-col bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-[#E6E6FA] hover:border-[#B8B3FF]">
            {/* Top Badge Row */}
            <div className="flex items-center justify-between gap-3 mb-5">
               <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F0FF] text-[#6A5ACD] px-3.5 py-1.5 text-xs font-bold tracking-wide uppercase border border-[#D8D0FF]">
                  <QrCode className="w-3.5 h-3.5" />
                  Класичний формат
               </span>
               <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold border border-emerald-200/60">
                  Бестселер
               </span>
            </div>

            {/* Visual Mockup Illustration: Postcard + Smartphone Player */}
            <div className="relative h-48 mb-6 rounded-2xl bg-gradient-to-br from-[#F5F3FF] via-[#FAF8FF] to-[#FFF0F5] border border-[#E6E6FA]/80 overflow-hidden flex items-center justify-center p-4">
               {/* Decorative background glow */}
               <div className="absolute -top-10 -left-10 w-36 h-36 rounded-full bg-[#9370DB]/15 blur-2xl pointer-events-none" />
               <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-[#FF85A2]/15 blur-2xl pointer-events-none" />

               <div className="relative flex items-center justify-center gap-3 sm:gap-5 group-hover:scale-105 transition-transform duration-300">
                  {/* Flat A6 Postcard with QR */}
                  <div className="w-24 h-34 bg-white rounded-xl shadow-md border border-purple-100 p-2.5 flex flex-col items-center justify-between -rotate-6 transform">
                     <div className="w-full h-14 rounded-lg bg-gradient-to-br from-[#9370DB]/30 to-[#FF85A2]/30 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-[#6A5ACD]" />
                     </div>
                     <div className="w-9 h-9 rounded-md bg-[#F8F7FF] border border-purple-200 flex items-center justify-center my-1">
                        <QrCode className="w-6 h-6 text-[#6A5ACD]" />
                     </div>
                     <div className="w-12 h-1.5 rounded-full bg-gray-200" />
                  </div>

                  {/* Animated Scan Connection */}
                  <div className="flex flex-col items-center text-[#9370DB]">
                     <div className="w-6 border-t-2 border-dashed border-[#9370DB]/60" />
                     <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 px-2 py-0.5 rounded-full shadow-xs border border-purple-100 mt-1">
                        Скан
                     </span>
                  </div>

                  {/* Smartphone with Personal Song Page */}
                  <div className="w-24 h-36 bg-gray-900 rounded-2xl p-1.5 shadow-lg rotate-3 transform">
                     <div className="w-full h-full bg-gradient-to-b from-[#6A5ACD] via-[#9370DB] to-[#FF85A2] rounded-xl p-2 flex flex-col items-center justify-between text-white">
                        <div className="w-8 h-1 rounded-full bg-white/40" />
                        <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
                           <Music className="w-4 h-4 text-white" />
                        </div>
                        {/* Equalizer bars */}
                        <div className="flex items-end gap-1 h-4">
                           <span className="w-1 h-2 bg-white/80 rounded-full animate-pulse" />
                           <span className="w-1 h-4 bg-white rounded-full animate-pulse" />
                           <span className="w-1 h-3 bg-white/90 rounded-full animate-pulse" />
                           <span className="w-1 h-1.5 bg-white/70 rounded-full animate-pulse" />
                        </div>
                        <div className="w-14 h-1.5 rounded-full bg-white/60" />
                     </div>
                  </div>
               </div>
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
         {/* ФОРМАТ 2: Складана звукова листівка (899 грн)                     */}
         {/* ================================================================= */}
         <div className="group relative h-full flex flex-col bg-gradient-to-b from-white via-white to-[#FFF5F8]/60 rounded-[2rem] p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-[#FFB8D0]/80 hover:border-[#FF85A2]">
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 inset-x-8 h-1.5 rounded-b-full bg-gradient-to-r from-[#FF85A2] via-[#9370DB] to-[#6A5ACD]" />

            {/* Top Badge Row */}
            <div className="flex items-center justify-between gap-3 mb-5">
               <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF0F5] text-[#D6336C] px-3.5 py-1.5 text-xs font-bold tracking-wide uppercase border border-[#FFCCE0]">
                  <Volume2 className="w-3.5 h-3.5" />
                  Звуковий модуль
               </span>
               <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#FF85A2] to-[#9370DB] text-white px-3.5 py-1 text-xs font-bold shadow-xs">
                  <Sparkles className="w-3 h-3" />
                  ВАУ-ефект · Новинка
               </span>
            </div>

            {/* Visual Mockup Illustration: Open Folded Sound Card with Music Notes */}
            <div className="relative h-48 mb-6 rounded-2xl bg-gradient-to-br from-[#FFF0F5] via-[#F8F0FF] to-[#FFE8D6]/50 border border-[#FFD6E7] overflow-hidden flex items-center justify-center p-4">
               {/* Radial warm glow */}
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,133,162,0.18),transparent_70%)] pointer-events-none" />

               {/* Floating musical notes around the card */}
               <span className="absolute top-4 left-8 text-lg text-[#D6336C]/70 font-serif animate-bounce select-none">♪</span>
               <span className="absolute top-5 right-9 text-xl text-[#6A5ACD]/70 font-serif animate-pulse select-none">♫</span>
               <span className="absolute bottom-4 left-12 text-base text-[#9370DB]/70 font-serif select-none">♬</span>

               {/* Open Book Folded Postcard Mockup */}
               <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <div className="flex w-48 h-34 rounded-xl shadow-lg overflow-hidden border border-amber-300/80 bg-[#F3C68F]">
                     {/* Left inner page (Illustration + notes) */}
                     <div className="w-1/2 h-full bg-gradient-to-b from-[#E59866] to-[#F3C68F] border-r border-black/15 p-2.5 flex flex-col items-center justify-center relative">
                        <div className="w-10 h-10 rounded-full bg-white/35 flex items-center justify-center shadow-inner">
                           <Music className="w-5 h-5 text-[#6E2C00]" />
                        </div>
                        <span className="text-[9px] font-bold text-[#6E2C00]/80 mt-1.5 tracking-tight">
                           Ти — моє кохання
                        </span>
                     </div>

                     {/* Right inner page (Personal greeting + built-in speaker) */}
                     <div className="w-1/2 h-full bg-[#F5CBA7] p-2.5 flex flex-col items-center justify-between text-center">
                        <div className="space-y-1 mt-2 w-full">
                           <div className="w-4/5 h-1.5 bg-[#4A2311]/70 rounded-full mx-auto" />
                           <div className="w-full h-1.5 bg-[#4A2311]/70 rounded-full mx-auto" />
                           <div className="w-3/4 h-1.5 bg-[#4A2311]/70 rounded-full mx-auto" />
                           <div className="w-2/3 h-1.5 bg-[#4A2311]/50 rounded-full mx-auto pt-1" />
                        </div>

                        {/* Sound waves badge */}
                        <div className="inline-flex items-center gap-1 bg-white/90 text-[#D6336C] px-2 py-0.5 rounded-full shadow-xs">
                           <Volume2 className="w-3 h-3 animate-pulse" />
                           <span className="text-[8px] font-extrabold uppercase">Грає сама!</span>
                        </div>
                     </div>
                  </div>
               </div>
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
