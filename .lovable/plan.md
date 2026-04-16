

Пользователь подтверждает: на Kie.ai есть модель **V5.5** (в формате `V5_5` по конвенции их API). Нужно обновить дефолт в edge function и добавить тип.

## Изменения

**Файл:** `supabase/functions/generate-music-suno/index.ts`

1. Обновить тип:
```ts
model?: 'V3_5' | 'V4' | 'V4_5' | 'V4_5PLUS' | 'V5' | 'V5_5'
```

2. Поменять дефолт:
```ts
model = 'V5_5'  // было 'V5'
```

## Проверка фронтенда

Быстрый поиск по `model:` и `'V5'` в `src/` чтобы убедиться, что нигде на фронте модель не хардкодится. Если найдётся — синхронизировать.

## Memory

Обновить `mem://tech/music-generation-config`:
- Старое: «Suno V5 через Kie.ai»
- Новое: «Suno V5.5 (`V5_5`) через Kie.ai»

И обновить Core в `mem://index.md`:
- Старое: «Suno V5 via Kie.ai»
- Новое: «Suno V5.5 via Kie.ai»

## Результат

Все новые генерации музыки пойдут через Suno **V5.5** — последнюю доступную модель на Kie.ai. Никаких изменений UI не требуется, параметры (`vocalGender`, `styleWeight`, `weirdnessConstraint`, `audioWeight`, `negativeTags`) остаются совместимыми.

