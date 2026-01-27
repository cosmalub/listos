
# Додати FAQ секцію на сторінку Valentine

## Що зробимо
Створимо новий компонент FAQ для Valentine сторінки, який використовує ті ж самі питання-відповіді що і на головній, але адаптований під стилістику Valentine:
- Кольори: `text-gray-900` для заголовків, `text-gray-600` для тексту
- Акценти: `text-[#6B5CE7]` (фіолетовий) та `border-purple-100`
- Фон: білий або м'який градієнт

## Розташування
Секція буде додана **перед** `FinalCTASection` (блок "14 лютого буває раз на рік")

## Зміни

### 1. Створити новий файл: `src/components/valentine/FaqSection.tsx`

```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  // Ті ж самі питання-відповіді що на головній
];

export function FaqSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-3xl mx-auto">
        {/* Заголовок у стилі Valentine */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          Часті запитання
        </h2>
        <p className="text-lg text-center text-gray-600 mb-12">
          Все, що варто знати перед створенням листівки
        </p>
        
        {/* Акордеон з питаннями */}
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border-purple-100"
            >
              <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-[#6B5CE7]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 whitespace-pre-line">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
```

### 2. Оновити файл: `src/pages/Valentine.tsx`

Додати імпорт та вставити компонент перед FinalCTASection:

```tsx
import { FaqSection } from '../components/valentine/FaqSection';

export default function Valentine() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      <HeroSection />
      <PainSection />
      <InsightSection />
      <SolutionSection />
      <HowItWorksSection />
      <MomentsGallerySection />
      <TrustSection />
      <WhoIsThisForSection />
      <FaqSection />          {/* Нова секція */}
      <FinalCTASection />
      <Footer />
    </div>
  );
}
```

## Стилістичні деталі

| Елемент | Головна сторінка | Valentine сторінка |
|---------|------------------|-------------------|
| Заголовок | `text-[#6A5ACD]` | `text-gray-900` |
| Текст питання | `text-[#6A5ACD]` | `text-gray-900` + hover `text-[#6B5CE7]` |
| Текст відповіді | `text-[#6A5ACD]/80` | `text-gray-600` |
| Фон секції | `bg-white` з тінню | `bg-gradient-to-b from-purple-50 to-white` |
| Бордери | стандартні | `border-purple-100` |

## Результат
- FAQ секція з'явиться перед фінальним CTA блоком
- Стилістика узгоджена з іншими секціями Valentine (TrustSection, SolutionSection)
- Ті ж самі 11 питань-відповідей що на головній сторінці
