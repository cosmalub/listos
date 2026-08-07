import { Button } from "@/components/ui/button";
import { useOrderDialog } from "@/components/order/OrderDialogContext";
import { MessageCircle, Music, Palette, Printer, Truck, Sparkles } from "lucide-react";
import type { Occasion } from "@/data/occasionData";

/** Секція ситуації: чому коротке привітання іноді не передає головного. */
export function OccasionSituationSection({ occasion }: { occasion: Occasion }) {
    return (
        <section className="bg-gray-50/60 py-20">
            <div className="container mx-auto max-w-3xl px-4 text-center">
                <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl">
                    Коли звичних слів не вистачає
                </h2>
                <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
                    {occasion.emotionalProblem}
                </p>
                <p className="mt-6 text-lg font-medium leading-relaxed text-gray-800">
                    Персональна пісня допомагає сказати це своїми словами — і залишити їх у формі, яку можна тримати в руках.
                </p>
            </div>
        </section>
    );
}

/** Ідеї, про що може бути пісня для цього приводу. */
export function OccasionSongIdeasSection({ occasion }: { occasion: Occasion }) {
    return (
        <section className="bg-white py-20">
            <div className="container mx-auto max-w-5xl px-4">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl">
                        Про що може бути твоя пісня
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
                        Це лише напрямки для натхнення. Фінальний текст складається з твоєї історії.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {occasion.suggestedLines.map((line, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <span
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${occasion.accent} text-sm font-bold text-white`}
                            >
                                {index + 1}
                            </span>
                            <p className="text-base leading-relaxed text-gray-700 md:text-lg">{line}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const flowSteps = [
    { icon: MessageCircle, title: "Розкажи історію", text: "У студії ти відповідаєш на кілька питань про людину й ситуацію." },
    { icon: Music, title: "Отримай текст і музику", text: "Сервіс допомагає скласти текст пісні та згенерувати трек у вибраному стилі." },
    { icon: Palette, title: "Оформи листівку", text: "Твоє фото або згенерована ілюстрація стають дизайном листівки." },
    { icon: Printer, title: "Ми друкуємо", text: "Готовий макет друкується на щільному картоні формату A6." },
    { icon: Truck, title: "Доставляємо", text: "Надсилаємо листівку «Новою поштою» по Україні." },
];

/** Коротка механіка сервісу без змін у бізнес-логіці. */
export function OccasionHowItWorksSection() {
    return (
        <section className="bg-gray-50/60 py-20">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl">
                        Як це працює
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                    {flowSteps.map((step, index) => (
                        <div
                            key={index}
                            className="flex h-full flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
                        >
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0F0FF] text-[#6A5ACD]">
                                <step.icon className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-gray-900">{step.title}</h3>
                            <p className="text-sm leading-relaxed text-gray-600">{step.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/** Фінальний CTA: працює лише QR-версія, звукова залишається зі статусом «Незабаром». */
export function OccasionFinalCta({ occasion }: { occasion: Occasion }) {
    const { openOrderDialog } = useOrderDialog();

    return (
        <section className="border-t border-gray-100 bg-white py-20">
            <div className="container mx-auto max-w-3xl px-4 text-center">
                <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl">
                    Готовий створити листівку?
                </h2>
                <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-600">
                    Зараз можна замовити класичну листівку з QR-кодом за 249 грн — все включено: створення пісні, друк і доставка по Україні.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button
                        onClick={() => openOrderDialog(`occasion-${occasion.slug}-final-cta`, 'Створити QR-листівку')}
                        className="h-auto w-full min-w-[220px] rounded-full bg-gradient-to-r from-[#6A5ACD] via-[#9370DB] to-[#FF85A2] px-8 py-6 text-lg font-bold text-white shadow-md transition-all hover:-translate-y-1 hover:opacity-90 hover:shadow-lg sm:w-auto"
                    >
                        <Sparkles className="mr-2 h-5 w-5" />
                        Створити QR-листівку
                    </Button>

                    <div
                        aria-disabled="true"
                        className="flex h-auto w-full min-w-[220px] items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-gray-50 px-8 py-6 text-lg font-bold text-gray-500 sm:w-auto"
                    >
                        Звукова версія — незабаром
                    </div>
                </div>
            </div>
        </section>
    );
}
