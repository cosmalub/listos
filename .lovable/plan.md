
# Поднять текст выше внутри сердца

## Текущее состояние
Контейнер с текстом (строка 53) имеет padding сверху `pt-16` — это 64px.

## Решение
Уменьшить верхний padding, чтобы текст поднялся выше. Изменить `pt-16` на `pt-8` (32px) — сдвиг на 32px вверх.

## Изменение в `src/components/valentine-new/HeroSection.tsx`

**Строка 53:**

```tsx
// Было:
<div className="relative z-10 flex flex-col items-center text-center pt-16 pb-12 px-12 max-w-2xl">

// Станет:
<div className="relative z-10 flex flex-col items-center text-center pt-8 pb-12 px-12 max-w-2xl">
```

## Результат
- Заголовок и подзаголовок поднимутся на ~32px выше
- Визуально текст будет ближе к центру сердца
