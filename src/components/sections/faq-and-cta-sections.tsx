import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeader } from "@/components/ui/section-header";

// FAQ data
const faqs = [
  {
    question: "❓ Це просто пісня?",
    answer: `Ні.

Це персональна музична листівка:
фізична листівка з QR-кодом,
персональна сторінка з піснею та анімацією
і готовий подарунок, який можна вручити.`,
  },
  {
    question: "❓ Як створюється пісня?",
    answer: `Ти розповідаєш, що хочеш сказати і для кого.

Листосик допомагає витягнути сенс, настрій і історію
та оформлює їх у пісню.

Ти можеш доповнити, змінити або затвердити текст
і перейти до наступного кроку.`,
  },
  {
    question: "❓ Я не вмію писати пісні чи вірші. Це проблема?",
    answer: `Ні.

Пісня створюється на основі твоєї історії та сенсу,
навіть якщо ти ніколи не писав віршів.

Від тебе — думка і почуття.
Форму і слова допомагає зробити Листосик.`,
  },
  {
    question: "❓ Хто автор пісні?",
    answer: `Автор — ти.

Листосик допомагає оформити
твої думки і почуття в пісню.`,
  },
  {
    question: "❓ А пісня не буде шаблонною?",
    answer: `Ні.

Кожна пісня створюється на основі твоєї історії, слів і настрою.
Навіть у схожих ситуаціях результат завжди різний.`,
  },
  {
    question: "❓ Що якщо мені не сподобається результат?",
    answer: `Ти можеш перегенерувати пісню стільки разів,
скільки потрібно, без доплат.

А якщо все одно не відчуєш, що це «воно»,
ми повернемо гроші без зайвих питань.`,
  },
  {
    question: "❓ Як я отримаю та прослухаю пісню?",
    answer: `Ти отримаєш фізичну листівку з QR-кодом.

За ним відкривається персональна сторінка з піснею,
яку можна слухати будь-коли
і ділитися з близькими.`,
  },
  {
    question: "❓ Коли я отримаю листівку?",
    answer: `Після підтвердження замовлення листівка друкується
та доставляється Новою поштою.

Зазвичай доставка займає 1–2 дні по Україні.`,
  },
  {
    question: "❓ Чи це дорого?",
    answer: `Ні.

У вартість входить створення пісні,
доступ до студії,
друк фізичної листівки та доставка.

Це готовий подарунок «під ключ».`,
  },
  {
    question: "❓ А це робить штучний інтелект?",
    answer: `Так, використовуються сучасні технології,
щоб допомогти оформити думки і сенс.

Але головне в цій листівці —
не технологія, а те, що ти хочеш сказати людині.`,
  },
];

export default function FaqAndCtaSections() {
  return (
    <section className="py-16 bg-white rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] relative z-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <SectionHeader title="Часті запитання" size="md" />

        <Accordion type="single" collapsible className="w-full mb-12">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-medium text-[#6A5ACD]">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-[#6A5ACD]/80 whitespace-pre-line">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA після FAQ */}
        <div className="mt-16 bg-gradient-to-br from-[#F8F7FF] to-white border-2 border-[#B8B3FF]/40 rounded-3xl p-8 text-center shadow-lg hover:border-[#B8B3FF] transition-all">
          <h3 className="text-2xl font-bold text-[#6A5ACD] mb-6">Усі питання закриті — створюю пісню!</h3>

          <Button
            onClick={() => (window.location.href = "/order")}
            className="text-lg px-12 py-7 rounded-full bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] hover:from-[#7A6ADE] hover:to-[#C282EF] text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 font-bold mb-6"
          >
            🎵 Усі питання закриті — замовляю!
          </Button>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-[#6A5ACD]/80">
            <div className="flex items-center gap-2">
              <span className="text-xl">✅</span>
              <span className="font-medium">Все зрозуміло</span>
            </div>
            <span className="hidden md:inline text-[#6A5ACD]/40">•</span>
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡️</span>
              <span className="font-medium">Процес займає 10 хвилин</span>
            </div>
            <span className="hidden md:inline text-[#6A5ACD]/40">•</span>
            <div className="flex items-center gap-2">
              <span className="text-xl">🎵</span>
              <span className="font-medium">Студія проста — справиться кожен</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
