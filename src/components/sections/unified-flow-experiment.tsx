import { Button } from "@/components/ui/button";
import { useOrderDialog } from "@/components/order/OrderDialogContext";
import { ArrowDown, ArrowRight, QrCode, Smartphone, Volume2, BookOpen } from "lucide-react";

// Дані для звукової листівки поки не підтверджені продуктом.
// Коли з'являться реальна ціна та посилання на заявку — достатньо заповнити ці константи.
const SOUND_CARD_PRICE: string | null = null;
const SOUND_CARD_REQUEST_URL: string | null = null;

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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

                     {/* Формат 1: QR-листівка */}
                     <div className="h-full flex flex-col bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between gap-3 mb-4">
                           <div className="w-12 h-12 rounded-xl bg-[#6A5ACD]/10 text-[#6A5ACD] flex items-center justify-center">
                              <QrCode className="w-6 h-6" />
                           </div>
                           <span className="inline-flex items-center rounded-full bg-[#6A5ACD]/10 text-[#6A5ACD] px-3 py-1 text-xs font-semibold">
                              Доступно зараз
                           </span>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                           Класична листівка з QR-кодом
                        </h3>
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                           Отримувач наводить камеру телефона на QR-код — і одразу відкриває персональну сторінку з твоєю піснею та анімацією.
                        </p>

                        <div className="flex items-start gap-3 text-gray-600 mb-6">
                           <Smartphone className="w-5 h-5 mt-0.5 shrink-0 text-[#9370DB]" />
                           <span className="text-base leading-relaxed">
                              Друкована листівка, персональна сторінка з піснею та доставка по Україні.
                           </span>
                        </div>

                        <div className="mt-auto space-y-4">
                           <p className="text-lg font-bold text-gray-900">
                              249 грн <span className="text-base font-medium text-gray-500">— все включено</span>
                           </p>
                           <Button
                              onClick={() => openOrderDialog('homepage-product-qr', 'Створити QR-листівку')}
                              className="w-full bg-gradient-to-r from-[#6A5ACD] via-[#9370DB] to-[#FF85A2] text-white hover:opacity-90 rounded-full px-6 py-6 text-base font-bold shadow-md hover:shadow-lg transition-all h-auto"
                           >
                              Створити QR-листівку
                           </Button>
                        </div>
                     </div>

                     {/* Формат 2: Листівка зі звуковим модулем */}
                     <div className="h-full flex flex-col bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between gap-3 mb-4">
                           <div className="w-12 h-12 rounded-xl bg-[#FF85A2]/10 text-[#FF85A2] flex items-center justify-center">
                              <Volume2 className="w-6 h-6" />
                           </div>
                           <span className="inline-flex items-center rounded-full bg-[#FF85A2]/10 text-[#D6336C] px-3 py-1 text-xs font-semibold">
                              Новинка
                           </span>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                           Листівка, що звучить при відкритті
                        </h3>
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                           Відкриваєш — і твоя пісня звучить одразу. Її відтворює вбудований звуковий модуль, без сканування QR-коду.
                        </p>

                        <div className="flex items-start gap-3 text-gray-600 mb-6">
                           <BookOpen className="w-5 h-5 mt-0.5 shrink-0 text-[#9370DB]" />
                           <span className="text-base leading-relaxed">
                              Той самий персональний текст, музика й дизайн — тільки музика вмикається сама.
                           </span>
                        </div>

                        <div className="mt-auto space-y-4">
                           {SOUND_CARD_PRICE ? (
                              <p className="text-lg font-bold text-gray-900">{SOUND_CARD_PRICE}</p>
                           ) : (
                              <p className="text-base font-medium text-gray-500">
                                 Готуємо цей формат до запуску — вартість оголосимо згодом.
                              </p>
                           )}

                           {SOUND_CARD_REQUEST_URL ? (
                              <a
                                 href={SOUND_CARD_REQUEST_URL}
                                 className="flex w-full items-center justify-center rounded-full border-2 border-[#9370DB] px-6 py-4 text-base font-bold text-[#6A5ACD] transition-all hover:bg-[#9370DB]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9370DB] focus-visible:ring-offset-2"
                              >
                                 Залишити заявку
                              </a>
                           ) : (
                              <div
                                 aria-disabled="true"
                                 className="flex w-full items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-4 text-base font-bold text-gray-500"
                              >
                                 Незабаром
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </section>
   );
}
