
# Соответствие пола аватарок и авторов отзывов

## Проблема
Сейчас аватарки генерируются случайно по индексу, без учета пола автора. В результате мужские имена могут иметь женские аватарки и наоборот.

## Решение
Добавить в данные TESTIMONIALS поле `gender` и генерировать аватарки с соответствующими типами причесок.

### Изменения в данных

```text
БУЛО:
{ id: 0, text: "...", author: "Олена", image: "..." }

СТАНЕ:
{ id: 0, text: "...", author: "Олена", image: "...", gender: "female" }
```

### Изменения в URL аватарок

```text
БУЛО:
https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 5}&mouth=smile,default&eyes=default,happy,side

СТАНЕ (для женщин):
https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 5}&mouth=smile,default&eyes=default,happy,side&top=longHair,longHairBigHair,longHairBob,longHairCurly,longHairCurvy,longHairStraight

СТАНЕ (для мужчин):
https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 5}&mouth=smile,default&eyes=default,happy,side&top=shortHairDreads01,shortHairDreads02,shortHairShortFlat,shortHairShortWaved,shortHairSides,shortHairShortCurly
```

### Распределение по полу

| Индекс | Автор | Пол |
|--------|-------|-----|
| 0 | Олена | female |
| 1 | Андрій | male |
| 2 | Софія | female |
| 3 | Марія | female |
| 4 | Дмитро | male |
| 5 | Вікторія | female |
| 6 | Максим | male |
| 7 | Ірина | female |
| 8 | Олексій | male |
| 9 | Наталя | female |
| 10 | Тарас | male |

## Файл для редактирования

| Файл | Зміни |
|------|-------|
| `src/components/sections/hero-section-experiment.tsx` | Добавить gender в TESTIMONIALS, обновить URL генерации аватарок |

## Что НЕ меняется
- Логика анимации и переключения
- Стилистика Avataaars
- Скриншоты отзывов
- Общий дизайн компонента
