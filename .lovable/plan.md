
# Оновити блок "Ми гарантуємо" на Valentine

## Що зробимо
1. Замінити текст "Не потрібно вміти писати вірші" на "Не потрібно нічого вигадувати"
2. Замінити емодзі 💝 на Lucide іконки для кожної картки

## Нові іконки для карток

| Картка | Текст | Іконка | Логіка |
|--------|-------|--------|--------|
| 1 | Не потрібно нічого вигадувати | `Lightbulb` | Не потрібно думати/вигадувати |
| 2 | Неможливо «зробити погано» | `ShieldCheck` | Захист від помилок |
| 3 | Ми проведемо тебе на кожному кроці | `HandHeart` | Підтримка, турбота |
| 4 | Якщо не відчуєш «це воно» — повернемо гроші | `RefreshCcw` | Повернення, гарантія |

## Зміни у файлі

### `src/components/valentine/TrustSection.tsx`

```tsx
import { Lightbulb, ShieldCheck, HandHeart, RefreshCcw } from "lucide-react";

// Картка 1 (рядки 21-28):
<div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mb-3">
  <Lightbulb className="w-4 h-4 text-pink-500" />
</div>
<p className="text-gray-800 font-medium">
  Не потрібно нічого вигадувати
</p>

// Картка 2 (рядки 30-37):
<div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mb-3">
  <ShieldCheck className="w-4 h-4 text-pink-500" />
</div>

// Картка 3 (рядки 39-46):
<div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mb-3">
  <HandHeart className="w-4 h-4 text-pink-500" />
</div>

// Картка 4 (рядки 48-55):
<div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mb-3">
  <RefreshCcw className="w-4 h-4 text-pink-500" />
</div>
```

## Результат
- Текст першої картки змінено на "Не потрібно нічого вигадувати"
- Замість емодзі 💝 — чіткі Lucide іконки у рожевому кольорі
- Іконки відповідають змісту кожної картки
- Стиль залишається однаковим (градієнтний фон, розмір 8x8)
