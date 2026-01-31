

# Виправлення завантаження аватарок

## Проблема
Аватарки не завантажуються через неправильний формат параметра `top` в URL. DiceBear API не розуміє запит і повертає помилку.

## Рішення
Видалити проблемний параметр `top`, залишити тільки фільтри для посмішок та очей. Це дасть стабільно приємні аватарки у стилі Avataaars.

### Зміни в коді

```text
БУЛО:
const getAvatarUrl = (index: number, gender: "male" | "female") => {
  const baseUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${index + 5}&mouth=smile,default&eyes=default,happy,side`;
  const topStyles = gender === "female" 
    ? "&top=longHair,longHairBigHair,longHairBob,longHairCurly,longHairCurvy,longHairStraight"
    : "&top=shortHairDreads01,shortHairDreads02,shortHairShortFlat,shortHairShortWaved,shortHairSides,shortHairShortCurly";
  return baseUrl + topStyles;
};

СТАНЕ:
const getAvatarUrl = (index: number, gender: "male" | "female") => {
  // Різні seed offset для чоловіків та жінок — підвищує ймовірність відповідності
  const seedOffset = gender === "female" ? 50 : 150;
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${index + seedOffset}&mouth=smile,default&eyes=default,happy,side`;
};
```

### Логіка
- Використовуємо різні діапазони `seed` для жінок (50+) і чоловіків (150+)
- Це дає різні генерації аватарок для різних статей
- Фільтри `mouth=smile,default` та `eyes=default,happy,side` залишаються — всі обличчя будуть приємними
- Стиль Avataaars зберігається

## Файл для редагування

| Файл | Зміни |
|------|-------|
| `src/components/sections/hero-section-experiment.tsx` | Спростити функцію `getAvatarUrl` (рядки 21-27) |

## Що не змінюється
- Дані TESTIMONIALS з полем gender
- Анімації та логіка перемикання
- Загальний дизайн компонента

