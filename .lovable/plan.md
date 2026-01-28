
# Вернуть белый фон в Hero-секции

## Что изменим
Файл: `src/components/valentine-new/HeroSection.tsx`

### Строка 19 — заменить градиент на белый/почти белый
```tsx
// Было:
bg-gradient-to-b from-[#FFD1DC] from-30% via-[#FFE4E9] via-60% to-white

// Станет:
bg-gradient-to-b from-white via-white to-white
```

### Строка 44 — контур сердца остаётся розовым
Контур `stroke="#fecdd3"` на белом фоне будет отлично виден — ничего менять не нужно.

---

## Результат
- Фон Hero-секции станет белым
- Контур сердца `#fecdd3` будет контрастно выделяться
- Переход между секциями останется плавным (PainSection уже начинается с `from-white`)
