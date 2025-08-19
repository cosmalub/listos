import * as React from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// FAQ data
const faqs = [
  {
    question: "Як створюється пісня?",
    answer: "Пісні створюються з використанням нейронних мереж, що гарантує унікальність і теплоту виконання.",
  },
  {
    question: "Коли я отримаю листівку?",
    answer: "Виготовлення та доставка займає до 3 робочих днів після затвердження.",
  },
  {
    question: "Як отримувач прослухає пісню?",
    answer:
      "Отримувач сканує QR-код на листівці за допомогою смартфона, після чого відкривається веб-сторінка з вашим музичним повідомленням.",
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
    <>
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#6A5ACD] font-baloo">Часті запитання</h2>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-[#6A5ACD]">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-[#6A5ACD]/80">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-b from-white to-[#B8B3FF]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#6A5ACD] font-baloo">Готові створити свою музичну листівку?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-[#6A5ACD]/80">
            Подаруйте емоції та спогади, які залишаться назавжди.
          </p>
          <CreatePostcardButton />
        </div>
      </section>
    </>
  )
}