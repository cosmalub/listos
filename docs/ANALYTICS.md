# Аналітика проекту (PostHog)

## Огляд

Проект використовує PostHog для відстеження поведінки користувачів та аналізу воронок конверсії.

## Конфігурація

**Файл:** `src/providers/PostHogProvider.tsx`

- Хост: `https://us.i.posthog.com`
- Автоматичний pageview вимкнено (ручний трекінг для SPA)
- API ключ налаштовано в провайдері

## Відстежувані події

### Головна сторінка (воронка замовлень)

| Подія | Опис | Параметри |
|-------|------|-----------|
| `$pageview` | Перегляд сторінки | `$current_url` |
| `order_dialog_opened` | Відкриття діалогу замовлення | `source`, `button_label`, `product_format` (`qr` \| `sound`) |
| `order_submitted` | Успішне оформлення замовлення | `price`, `has_promo`, `contact_type`, `product_format` |

**Значення `source`:**
- `hero` — головний екран
- `pricing` — секція з ціною
- `mascot` — секція з маскотом
- `guarantee` — секція гарантії
- `final_cta` — фінальний заклик до дії
- `footer` — футер
- `header` — шапка сайту
- `examples` — секція прикладів
- `welcome_tutorial` — туторіал в студії
- `studio_no_token` — студія без токена
- `homepage-product-qr` — картка QR-формату на головній / occasion
- `homepage-product-sound` — картка звукової листівки (заявка без ціни)

### Студія (воронка створення)

| Подія | Опис | Параметри |
|-------|------|-----------|
| `studio_started` | Початок роботи в студії | `order_id`, `product_format` |
| `lyrics_confirmed` | Підтвердження тексту пісні | — |
| `music_generated` | Вибір музичного варіанту | `variant_id`, `style`, `generation_attempt` |
| `postcard_completed` | Завершення дизайну листівки | `front_mode`, `front_style`, `has_frame`, `product_format` |

## Воронки в PostHog

### 1. Воронка замовлень
```
$pageview → order_dialog_opened → order_submitted
```

### 2. Воронка студії
```
studio_started → lyrics_confirmed → music_generated → postcard_completed
```

## Файли з трекінгом

| Файл | Події |
|------|-------|
| `src/providers/PostHogProvider.tsx` | Ініціалізація, `$pageview` |
| `src/components/order/OrderDialogContext.tsx` | `order_dialog_opened` |
| `src/components/order/OrderDialog.tsx` | `order_submitted` |
| `src/components/studio/WelcomeTutorial.tsx` | `studio_started` |
| `src/pages/Studio.tsx` | `lyrics_confirmed` |
| `src/components/studio/MusicGeneration.tsx` | `music_generated` |
| `src/components/studio/PostcardDesign.tsx` | `postcard_completed` |

## Як додати нову подію

```tsx
import { posthog } from '@/providers/PostHogProvider';

// Базова подія
posthog.capture('event_name');

// Подія з параметрами
posthog.capture('event_name', {
  param1: 'value1',
  param2: 123
});
```

## Доступ до PostHog

Для доступу до дашборду PostHog зверніться до адміністратора проекту.
