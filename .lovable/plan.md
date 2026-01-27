
# Адаптувати заголовок галереї під стиль Valentine

## Проблема
Заголовок секції `MomentsGallerySection` використовує семантичні кольори (`text-primary`, `text-muted-foreground`), які не співпадають зі стилем інших заголовків на сторінці `/valentine`.

## Стиль заголовків на Valentine
Інші секції використовують:
- Заголовок: `text-[#6B5CE7]` або `text-gray-900` 
- Підзаголовок: `text-gray-600` або `text-gray-500`
- Розмір: `text-3xl md:text-4xl` або `text-4xl md:text-5xl`

## Зміни

### Файл: `src/components/sections/moments-gallery-section.tsx`

Рядок 63 — змінити клас заголовка:
```tsx
// Було:
<h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">

// Стане:
<h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
```

Рядок 68 — змінити клас підзаголовка:
```tsx
// Було:
<p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto">

// Стане:
<p className="text-lg text-center text-gray-600 max-w-2xl mx-auto">
```

## Результат
Заголовок "Моменти, які хочеться запам'ятати" та підзаголовок матимуть однаковий стиль як інші секції на сторінці Valentine (сірі тони замість фіолетового).
