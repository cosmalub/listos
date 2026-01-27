

# Додати Header на сторінку Valentine

## Що зробимо
Перевикористаємо існуючий компонент `Header` з головної сторінки, передавши йому пункти меню, адаптовані під контент Valentine сторінки.

## Проблема
Зараз Header використовує захардкоджені `menuItems`. Потрібно:
1. Зробити menuItems параметром Header
2. Додати ID до секцій на Valentine
3. Додати Header на Valentine сторінку

## Зміни

### 1. Оновити `src/components/sections/header.tsx`

Додати новий проп `menuItems`:

```tsx
interface MenuItem {
  name: string;
  href: string;
  isExternal?: boolean;
}

interface HeaderProps {
  centerTitle?: string;
  hideNav?: boolean;
  showMenu?: boolean;
  ctaLabel?: string;
  ctaPath?: string;
  onCtaClick?: () => void;
  menuItems?: MenuItem[];  // НОВИЙ ПРОП
}
```

Використати переданий `menuItems` або дефолтний масив.

### 2. Додати ID до секцій Valentine

| Секція | ID |
|--------|-----|
| HowItWorksSection | `how-it-works` |
| ReviewsSection | `reviews` |
| PricingSection | `pricing` |
| TrustSection | `guarantee` |
| FaqSection | `faq` |

### 3. Оновити `src/pages/Valentine.tsx`

Додати Header з пунктами меню для Valentine:

```tsx
import { Header } from '@/components/sections/header';

const valentineMenuItems = [
  { name: "Як це працює", href: "#how-it-works" },
  { name: "Відгуки", href: "#reviews" },
  { name: "Ціна", href: "#pricing" },
  { name: "Гарантія", href: "#guarantee" },
  { name: "FAQ", href: "#faq" },
];

export default function Valentine() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      <Header 
        ctaLabel="Створити" 
        menuItems={valentineMenuItems}
      />
      {/* секції з id */}
      ...
    </div>
  );
}
```

### 4. Додати ID до компонентів секцій

Кожну секцію обгорнути в div з відповідним id:

```tsx
<section id="how-it-works">
  <HowItWorksSection />
</section>
<section id="reviews">
  <ReviewsSection />
</section>
// ... і так далі
```

## Пункти меню для Valentine

| Пункт | Секція |
|-------|--------|
| Як це працює | HowItWorksSection |
| Відгуки | ReviewsSection |
| Ціна | PricingSection |
| Гарантія | TrustSection |
| FAQ | FaqSection |

## Результат

- Красивий Header з логотипом Листосик у верхній частині сторінки
- 5 пунктів навігації з плавним скролом до відповідних секцій
- Кнопка "Створити" справа (фіолетова)
- Мобільне меню-бургер для маленьких екранів
- Стилістика ідентична головній сторінці (backdrop-blur, заокруглені кути)

