
# Додати секцію відгуків зі скриншотами на сторінку Valentine

## Що зробимо
Додамо секцію відгуків на сторінку `/valentine` — такий самий анімований скрол зі скриншотами реальних відгуків як на головній, але адаптований під стилістику сторінки Valentine.

## Розташування
Секція буде додана **після** `WhoIsThisForSection` і **перед** `FaqSection`

## Зміни

### 1. Створити новий файл: `src/components/valentine/ReviewsSection.tsx`

Компонент буде містити:
- Ті ж самі 9 скриншотів відгуків що на головній
- Анімований скрол в два ряди (вліво/вправо)
- Стилістика адаптована під Valentine:
  - Заголовок: `text-gray-900` замість фіолетового
  - Підзаголовок: `text-gray-600`
  - Картки: `border-purple-100` замість `border-primary/10`
  - Тіні: `shadow-purple-100/50` замість `shadow-primary/20`

```tsx
// Структура компонента
export function ReviewsSection() {
  const reviews = [
    { imagePath: "/lovable-uploads/1-3.png", alt: "Відгук клієнта 1" },
    { imagePath: "/lovable-uploads/review-iryna.png", alt: "Відгук Ірини" },
    // ... всі 9 скриншотів
  ];

  const firstRow = [...reviews, ...reviews];
  const secondRow = [...reviews.reverse(), ...reviews.reverse()];

  return (
    <section className="py-20 px-4 bg-white overflow-hidden">
      {/* Заголовок в стилі Valentine */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
        Відгуки наших клієнтів
      </h2>
      <p className="text-lg text-center text-gray-600 mb-12">
        Реальні повідомлення від задоволених покупців
      </p>
      
      {/* Анімований скрол */}
      <div className="flex gap-5 animate-scroll-left">...</div>
      <div className="flex gap-5 animate-scroll-right">...</div>
    </section>
  );
}
```

### 2. Оновити файл: `src/pages/Valentine.tsx`

Додати імпорт та вставити компонент:

```tsx
import { ReviewsSection } from '../components/valentine/ReviewsSection';

// В JSX, порядок секцій:
<TrustSection />
<WhoIsThisForSection />
<ReviewsSection />        {/* Нова секція */}
<FaqSection />
<FinalCTASection />
```

## Стилістичні відмінності від головної

| Елемент | Головна | Valentine |
|---------|---------|-----------|
| Заголовок | `SectionHeader` з градієнтом | Простий `text-gray-900` |
| Підзаголовок | `text-muted-foreground` | `text-gray-600` |
| Бордер картки | `border-primary/10` | `border-purple-100` |
| Тінь картки | `shadow-primary/20` | `shadow-purple-100/50` |
| Hover тінь | `shadow-primary/30` | `shadow-purple-200/60` |
| Фон секції | `bg-white` | `bg-white` |

## Технічні деталі
- Анімації `animate-scroll-left` та `animate-scroll-right` вже визначені в `tailwind.config.ts`
- Пауза анімації при hover вже працює через CSS в `index.css`
- Картки дублюються для безперервного скролу

## Результат
- Сторінка `/valentine` матиме таку ж секцію відгуків зі скриншотами як головна
- Стиль узгоджений з іншими секціями Valentine (сірі тони)
- Анімований скрол працює ідентично
