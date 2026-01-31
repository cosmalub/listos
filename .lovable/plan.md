
# Редизайн Welcome Studio — мінімалістичний стиль

## Що змінюємо

### 1. Хедер сторінки Studio
Замінити поточний `Header` на `HeaderExperiment` — це дасть нейтральний білий хедер з сірими акцентами замість фіолетових.

```text
БУЛО                              СТАНЕ
Header (фіолетовий стиль)  ->     HeaderExperiment (нейтральний)
```

### 2. Фон сторінки
Оновити градієнт з насиченого рожевого на м'який (як на OrderPending):

```text
БУЛО: from-[#FFD1DC] via-white to-white
СТАНЕ: from-[#FFE4EC] via-[#FFF0F5] to-white
```

### 3. Заголовки в WelcomeTutorial

```text
БУЛО: text-[#6A5ACD] (фіолетовий)
СТАНЕ: text-gray-900 (нейтральний)
```

### 4. Speech Bubble (бульбашка маскота)

```text
БУЛО: border-[#B8B3FF]/60 + text-[#6A5ACD]
СТАНЕ: border-rose-200 + text-gray-900
```

### 5. Головна CTA кнопка

```text
БУЛО: дефолтна primary (фіолетова)
СТАНЕ: bg-gradient-to-r from-rose-500 to-purple-600 з shadow
```

### 6. Діалог введення токена

```text
БУЛО:
- Іконка Lock: text-[#6A5ACD]
- Кнопка "Продовжити": bg-[#6A5ACD]
- Карточка: from-blue-50 to-purple-50

СТАНЕ:
- Іконка Lock: text-rose-500
- Кнопка: bg-gradient-to-r from-rose-500 to-purple-600
- Карточка: bg-rose-50/50 border-rose-200
```

### 7. Посилання "Оформити замовлення"

```text
БУЛО: text-[#6A5ACD]
СТАНЕ: text-rose-500 hover:text-rose-600
```

## Файли для редагування

| Файл | Зміни |
|------|-------|
| `src/pages/Studio.tsx` | Замінити Header на HeaderExperiment, оновити градієнт фону |
| `src/components/studio/WelcomeTutorial.tsx` | Оновити всі кольори на нейтральні + рожевий градієнт |

## Що НЕ змінюємо
- Всю функціональність (валідація токена, PostHog, навігація)
- Структуру компонентів
- Кроки туторіалу (4 кроки + доставка)
- Dev mode панель

## Візуальний результат
Сторінка буде мати нейтральний сірий стиль з м'якими рожевими акцентами, що відповідає загальному мінімалістичному напрямку сайту.
