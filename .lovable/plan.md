
# Підключити всі кнопки до форми замовлення

## Що робимо
Зробити так, щоб кнопка "Створити" у меню та всі кнопки на сторінці Valentine відкривали діалог оформлення замовлення.

## Зміни

### 1. Header (`src/components/sections/header.tsx`)
Зараз кнопка CTA робить навігацію на `/studio`. Потрібно:
- Додати імпорт `useOrderDialog`
- При наявності `onCtaClick` — викликати його
- Інакше — відкривати `openOrderDialog('header-cta', ctaLabel)`

```tsx
import { useOrderDialog } from "@/components/order/OrderDialogContext";

const Header = ({ ... }) => {
  const { openOrderDialog } = useOrderDialog();
  
  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      openOrderDialog('header-cta', ctaLabel || 'Створити');
    }
  };
  // ...
};
```

### 2. Valentine HeroSection (`src/components/valentine/HeroSection.tsx`)
Додати:
- Імпорт `useOrderDialog`
- Кнопка "Створити листівку до 14 лютого" → `openOrderDialog('hero-valentine', ...)`

### 3. Valentine SolutionSection (`src/components/valentine/SolutionSection.tsx`)
Додати:
- Імпорт `useOrderDialog`
- Кнопка "Спробувати створити свою листівку" → `openOrderDialog('solution-valentine', ...)`

### 4. Valentine HowItWorksSection (`src/components/valentine/HowItWorksSection.tsx`)
Додати:
- Імпорт `useOrderDialog`
- Кнопка "Купити доступ" → `openOrderDialog('how-it-works-valentine', ...)`

### 5. Valentine FinalCTASection (`src/components/valentine/FinalCTASection.tsx`)
Додати:
- Імпорт `useOrderDialog`
- Кнопка "Створити листівку з піснею до 14 лютого" → `openOrderDialog('final-cta-valentine', ...)`

## Технічна реалізація
У кожному компоненті:

```tsx
import { useOrderDialog } from "@/components/order/OrderDialogContext";

export function ComponentName() {
  const { openOrderDialog } = useOrderDialog();
  
  return (
    // ...
    <button onClick={() => openOrderDialog('source-name', 'Button Label')}>
      Button Label
    </button>
  );
}
```

## Результат

| Компонент | Кнопка | Tracking source |
|-----------|--------|-----------------|
| Header | Створити | `header-cta` |
| HeroSection | Створити листівку до 14 лютого | `hero-valentine` |
| SolutionSection | Спробувати створити свою листівку | `solution-valentine` |
| HowItWorksSection | Купити доступ | `how-it-works-valentine` |
| FinalCTASection | Створити листівку з піснею до 14 лютого | `final-cta-valentine` |

Всі кнопки відкриватимуть діалог замовлення з відповідним tracking source для аналітики.
