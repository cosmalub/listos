import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Це просто пісня?",
    answer: "Ні. Це персональна музична листівка: фізична листівка з QR-кодом, персональна сторінка з піснею та анімацією і готовий подарунок, який можна вручити.",
  },
  {
    question: "Як створюється пісня?",
    answer: "Все відбувається у форматі чату з Листосиком. Ти просто пишеш йому свою історію, а він допомагає перетворити її на текст пісні. Далі ти обираєш настрій і стиль, а штучний інтелект створює магію. Ти отримуєш декілька варіантів, можеш експериментувати та генерувати заново, поки не почуєш «той самий» трек.",
  },
  {
    question: "Я не вмію писати пісні чи вірші. Це проблема?",
    answer: "Ні. Пісня створюється на основі твоєї історії та сенсу. Від тебе — думка і почуття. Форму і слова допомагає зробити Листосик.",
  },
  {
    question: "На якій мові можуть бути пісня та листівка?",
    answer: "Основні мови — українська та російська. Листосик підхоплює мову і допомагає оформити і слова пісні, і текст листівки красиво та щиро.",
  },
  {
    question: "Хто автор пісні?",
    answer: "Автор — ти. Листосик допомагає оформити твої думки і почуття в пісню.",
  },
  {
    question: "А пісня не буде шаблонною?",
    answer: "Ні. Кожна пісня створюється під твою історію. Навіть у схожих ситуаціях результат завжди різний.",
  },
  {
    question: "Що якщо мені не сподобається результат?",
    answer: "Ти можеш перегенерувати пісню стільки разів, скільки потрібно, без доплат. А якщо все одно не відчуєш, що це «воно», ми повернемо гроші.",
  },
  {
    question: "Як я отримаю та прослухаю пісню?",
    answer: "Ти отримаєш фізичну листівку з QR-кодом. За ним відкривається персональна сторінка з піснею.",
  },
  {
    question: "Коли я отримаю листівку?",
    answer: "Зазвичай доставка займає 1–2 дні по Україні.",
  },
  {
    question: "Чи це дорого?",
    answer: "Ні. У вартість 399 грн входить створення пісні, доступ до студії, друк фізичної листівки та доставка.",
  },
  {
    question: "А це робить штучний інтелект?",
    answer: "Так, використовуються сучасні технології, щоб допомогти оформити думки. Але головне — це що ти хочеш сказати.",
  },
];

export function FaqSection() {
  return (
    <section className="py-24 px-4 bg-white" id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-gray-900 drop-shadow-sm mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">Часті запитання</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Все, що варто знати перед створенням листівки
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-gray-100 rounded-2xl px-6 data-[state=open]:bg-gray-50/50 transition-colors"
            >
              <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-[#6B5CE7] text-left hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-6 text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
