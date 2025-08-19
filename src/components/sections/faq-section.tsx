import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  const faqs = [
    {
      question: "Як створюється пісня?",
      answer: "Наш талановитий композитор створює унікальну мелодію на основі ваших слів та обраного настрою. Кожна пісня пишеться індивідуально спеціально для вашої листівки."
    },
    {
      question: "Коли я отримаю листівку?",
      answer: "Процес створення займає 3-5 робочих днів. Після завершення ми надішлемо готову листівку на вказану адресу протягом 1-2 робочих днів через Нову Пошту."
    },
    {
      question: "Як отримувач прослухає пісню?",
      answer: "На листівці буде спеціальний QR-код. Отримувач просто сканує його телефоном і відразу може прослухати вашу персональну пісню онлайн."
    }
  ];

  return (
    <section className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Часті запитання
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-0">
                <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                  <AccordionTrigger className="px-6 py-6 text-left hover:no-underline hover:bg-secondary/50 transition-colors">
                    <span className="text-lg font-semibold text-primary">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </AccordionContent>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}