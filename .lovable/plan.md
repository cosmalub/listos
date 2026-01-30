
# Редизайн сторінок OrderPending та OrderSuccess

## Поточна проблема
Сторінки оформлення замовлення використовують старий дизайн з фіолетовими акцентами та насиченим градієнтом, який не відповідає новому мінімалістичному стилю головної сторінки.

## Візуальне порівняння

```text
СТАРИЙ СТИЛЬ (OrderPending/OrderSuccess)     НОВИЙ СТИЛЬ (Index)
─────────────────────────────────────────    ─────────────────────────────────
Градієнт: #FFD1DC → #F3D1FF → white          Градієнт: #FFE4EC → #FFF0F5 → white
Картки: border-[#E8D5FF] (фіолетовий)        Картки: border-gray-100 (сірий)
Текст: text-primary (фіолетовий)             Текст: text-gray-900/600 (нейтральний)
Header: старий Header                        Header: HeaderExperiment (glass)
Footer: старий Footer                        Footer: FooterExperiment (чистий)
```

## План змін

### 1. OrderPending.tsx

**Імпорти:**
- Замінити `Header` на `HeaderExperiment`
- Замінити `Footer` на `FooterExperiment`

**Фон секції:**
```text
Було:  bg-gradient-to-b from-[#FFD1DC] via-[#F3D1FF]/30 to-white
Стане: bg-gradient-to-b from-[#FFE4EC] via-[#FFF0F5] to-white
```

**Стиль карток:**
```text
Було:  border border-[#E8D5FF] shadow-sm bg-white
Стане: bg-white rounded-2xl shadow-sm border border-gray-100
```

**Типографіка:**
```text
Було:  text-primary, text-primary/80
Стане: text-gray-900, text-gray-600
```

**Іконки:**
```text
Було:  text-primary
Стане: text-gray-700
```

**Кнопки контактів:**
```text
Було:  bg-[#FFD1DC]/20, bg-[#E8D5FF]/30
Стане: bg-gray-50 hover:bg-gray-100
```

### 2. OrderSuccess.tsx

**Імпорти:**
- Замінити `Header` на `HeaderExperiment`
- Замінити `Footer` на `FooterExperiment`

**Фон секції:**
```text
Було:  bg-gradient-to-b from-[#FFD1DC] via-white to-white
Стане: bg-gradient-to-b from-[#FFE4EC] via-[#FFF0F5] to-white
```

**Головна картка:**
```text
Було:  Card без специфікацій
Стане: bg-white rounded-2xl shadow-sm border border-gray-100
```

**Секція "Що далі":**
```text
Було:  bg-secondary/30 border-border
Стане: bg-gray-50 border border-gray-100 rounded-2xl
```

**Alert:**
```text
Було:  bg-secondary/30 border-border
Стане: bg-gray-50 border border-gray-100 rounded-xl
```

**Gradient CTA кнопка:**
```text
Залишаємо градієнт як акцент (це CTA)
```

## Технічна реалізація

| Файл | Зміни |
|------|-------|
| OrderPending.tsx | Імпорти + градієнт + картки + типографіка |
| OrderSuccess.tsx | Імпорти + градієнт + картки + типографіка |

## Що НЕ змінюємо
- Функціональність (fetch, navigate, toast)
- Confetti анімація на OrderSuccess
- Логіку генерації промокода
- Структуру контенту

## Результат
Сторінки OrderPending та OrderSuccess будуть візуально узгоджені з новим мінімалістичним дизайном головної сторінки.
