import * as React from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// FAQ data
const faqs = [
  {
    question: "❓ Як створюється пісня?",
    answer: `У студії Листосик ставить вам кілька питань: для кого листівка, з якого приводу, які емоції хочете передати. Ви відповідаєте своїми словами — писати вірші не потрібно.

ШІ створює унікальну пісню за 30 секунд на основі ваших відповідей. Не сподобався результат? Перегенеруйте безкоштовно скільки завгодно разів.

Весь процес займає 10 хвилин. Студія проста та зрозуміла — справиться кожен.`,
  },
  {
    question: "❓ Коли я отримаю листівку?",
    answer: `Доставка займає 1-2 дні по Україні через Нову пошту (безкоштовно).

Як це працює:
• День 1: Створюєте пісню та дизайн у студії (10 хвилин)
• День 1: Замовляєте доставку
• День 2-3: Друкуємо та відправляємо
• День 3-4: Листівка прибуває на відділення

Потрібно терміново? Напишіть нам — спробуємо пришвидшити!`,
  },
  {
    question: "❓ Як отримувач прослухає пісню?",
    answer: `Дуже просто:
1. Отримувач отримує листівку з вашим дизайном на лицьовій стороні
2. На зворотній стороні — великий QR-код
3. Сканує QR-код камерою телефону
4. Відкривається красива анімована сторінка з піснею
5. Слухає пісню скільки завгодно разів

Пісню можна:
• Слухати онлайн необмежено
• Завантажити на телефон (MP3)
• Поділитися посиланням у месенджерах`,
  },
  {
    question: "❓ Це дорого для листівки?",
    answer: `Це не просто листівка — це комплексний подарунок:

• Унікальна пісня (створена ШІ через API топових моделей Suno AI / ElevenLabs)
• Фізична листівка з якісним друком
• Персональна анімована сторінка (доступна назавжди)
• MP3 файл для завантаження
• Безкоштовна доставка

Ціна: 399 грн за все включено.

Порівняння:
• Букет квітів (500+ грн) — зів'яне через тиждень
• Пісня на замовлення (500-2500 грн) — тільки аудіо файл
• Листосик (399 грн) — пісня + листівка + сторінка + доставка`,
  },
  {
    question: "❓ ШІ зробить погано або шаблонно?",
    answer: `Ні, і ось чому:

1. Кожна пісня унікальна
ШІ створює пісню з нуля на основі ваших слів. Використовуємо API Suno AI v5 та ElevenLabs — це найпотужніші моделі для генерації музики.

2. Перевіряєте результат до замовлення
У студії слухаєте пісню, дивитесь дизайн листівки. Якщо не подобається — перегенеруйте безкоштовно.

3. Необмежені перегенерації
Можна створювати нові варіанти скільки завгодно разів, доки не буде ідеально.

4. Послухайте приклади
Прокрутіть сторінку вгору — там є секція з реальними прикладами пісень. Кожна звучить унікально.`,
  },
  {
    question: "❓ Я не вмію писати пісні / вірші",
    answer: `Не потрібно! Ви не пишете вірші.

Листосик (ШІ-помічник) ставить прості питання:
• Для кого листівка?
• З якого приводу?
• Що хочете сказати?
• Які емоції передати?

Ви відповідаєте своїми словами, як розмовляєте зазвичай. Листосик допомагає знайти правильні слова та створює з цього пісню.

Це як чат з другом — просто розповідаєте історію, решту робить ШІ.`,
  },
  {
    question: "❓ Що якщо пісня не сподобається?",
    answer: `У студії є необмежені безкоштовні перегенерації. Можете створювати нові варіанти доти, доки результат не буде ідеальним.

Також надаємо 100% гарантію повернення грошей:
• Якщо після всіх спроб результат не задовольняє
• Якщо виникли технічні проблеми
• Якщо листівка не прибула вчасно

Ми впевнені в якості — тому даємо повну гарантію.`,
  },
]

// Create Postcard Button Component
function CreatePostcardButton() {
  return (
    <Button
      className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] hover:from-[#7A6ADE] hover:to-[#C282EF] text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 font-bold"
      onClick={() => window.location.href = '/order'}
    >
      🎵 Створити листівку
    </Button>
  )
}

export default function FaqAndCtaSections() {
  return (
    <section className="py-16 bg-white rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] relative z-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold mb-12 text-center text-[#6A5ACD] font-baloo">Часті запитання</h2>

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
          <h3 className="text-2xl font-bold text-[#6A5ACD] mb-6">
            Усі питання закриті — створюю пісню!
          </h3>
          
          <Button
            onClick={() => window.location.href = '/order'}
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
  )
}