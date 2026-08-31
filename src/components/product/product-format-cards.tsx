import { Button } from "@/components/ui/button";
import { useOrderDialog } from "@/components/order/OrderDialogContext";
import { QrCode, Smartphone, Volume2, BookOpen } from "lucide-react";

// Дані для звукової листівки поки не підтверджені продуктом.
// Коли з'являться реальна ціна та посилання на заявку — достатньо заповнити ці константи.
const SOUND_CARD_PRICE: string | null = null;
const SOUND_CARD_REQUEST_URL: string | null = null;

interface ProductFormatCardsProps {
   /** Source для існуючого openOrderDialog. Контракт замовлення не змінюється. */
   qrOrderSource?: string;
   soundOrderSource?: string;
}

/**
 * Дві рівноправні карточки фізичних форматів листівки.
 * QR-версія веде в наявний order dialog. Звукова — «Новинка» / заявка без ціни
 * (`SOUND_CARD_PRICE` лишається null), але CTA відкриває той самий OrderDialog
 * з `productFormat: 'sound'`.
 */
export function ProductFormatCards({
   qrOrderSource = "homepage-product-qr",
   soundOrderSource = "homepage-product-sound",
}: ProductFormatCardsProps) {
   const { openOrderDialog } = useOrderDialog();

   return (
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
                  onClick={() => openOrderDialog(qrOrderSource, 'Створити QR-листівку')}
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
                  <Button
                     onClick={() => openOrderDialog(soundOrderSource, 'Залишити заявку на звукову листівку', 'sound')}
                     variant="outline"
                     className="w-full rounded-full border-2 border-[#9370DB] px-6 py-6 text-base font-bold text-[#6A5ACD] hover:bg-[#9370DB]/10 h-auto"
                  >
                     Незабаром — залишити заявку
                  </Button>
               )}
            </div>
         </div>
      </div>
   );
}
