# Техническая документация: Студия создания песни и открытки

## Обзор потока данных

```
[Лендинг] → OrderDialog → pre_orders → [Welcome] → validate-studio-token → [Шаги 1-4] → save-order → orders → [OrderSuccess]
```

---

## Шаг 0: Welcome / Онбординг

**Компонент:** `src/components/studio/WelcomeTutorial.tsx`

### Что происходит:
1. Пользователь видит описание 4 шагов + доставка
2. Нажимает "Почати створення" → открывается диалог ввода токена
3. Токен валидируется через Edge Function

### Edge Function вызов:
```typescript
supabase.functions.invoke('validate-studio-token', {
  body: { token: accessToken.trim() }
})
```

**Ответ:**
```typescript
{
  valid: boolean,
  preOrderId: string,  // ID из таблицы pre_orders
  message: string
}
```

### Хранение данных:
При успешной валидации:
```typescript
// ОЧИСТКА старых данных
localStorage.removeItem('studio-chat-messages');
sessionStorage.removeItem('studio-draft-data');
sessionStorage.removeItem('music-parameters');
sessionStorage.removeItem('studio-selected-music');

// ЗАПИСЬ новых
sessionStorage.setItem('studio-access-token', token);
sessionStorage.setItem('studio-pre-order-id', preOrderId);
```

### PostHog событие:
```typescript
posthog.capture('studio_started', { order_id?: string });
```

---

## Шаг 1: Генерация текста песни

**Компонент:** `src/components/studio/ChatInterface.tsx`

### Что происходит:
1. Чат с AI-ассистентом (Листосик)
2. Пользователь описывает повод, получателя, эмоции
3. AI генерирует текст песни в формате ` ```LYRICS\n...\n``` `
4. Пользователь может редактировать и уточнять текст
5. Кнопка "Підтвердити і далі" завершает шаг

### Edge Function вызов:
```typescript
supabase.functions.invoke('generate-lyrics', {
  body: {
    message: userMessage,
    conversationHistory: messages.slice(-15)  // последние 15 сообщений
  }
})
```

**Ответ:**
```typescript
{
  reply: string  // текст с возможным блоком ```LYRICS...```
}
```

### Хранение данных:
```typescript
localStorage.setItem('studio-chat-messages', JSON.stringify(messages));
```

### Переход к шагу 1.5:
При нажатии "Підтвердити":
```typescript
// В Studio.tsx
handleLyricsConfirmed(lyrics) {
  setLyrics(lyrics);
  posthog.capture('lyrics_confirmed');
  
  // Вызов анализа для подбора стилей
  supabase.functions.invoke('analyze-lyrics-for-music', {
    body: { lyrics }
  });
}
```

---

## Шаг 1.5: Выбор музыкального стиля

**Компонент:** `src/components/studio/MusicStyleSelector.tsx`

### Edge Function вызов (из шага 1):
```typescript
supabase.functions.invoke('analyze-lyrics-for-music', {
  body: { lyrics }
})
```

**Ответ:**
```typescript
{
  recommendedStyles: string[],  // ['pop-dance', 'acoustic-folk', ...]
  style: string,                // стиль для Suno API
  title: string,                // название трека
  vocalGender: 'male' | 'female',
  styleWeight: number,          // 0-100
  weirdnessConstraint: number,  // 0-100
  audioWeight: number,          // 0-100
  negativeTags: string[]
}
```

### Хранение данных:
```typescript
sessionStorage.setItem('music-parameters', JSON.stringify(analysisData));
```

### Справочник стилей:
`src/lib/music-styles.ts` содержит ~40 стилей с метаданными:
- `id`, `style` (для Suno API), `name`, `description`
- `category`: energetic | romantic | emotional | celebratory | calm | creative
- `mood`, `bestFor[]`, `vocalGender`, `energy` (1-5), `romance` (1-5)

---

## Шаг 2: Генерация музыки

**Компонент:** `src/components/studio/MusicGeneration.tsx`

### Edge Function вызовы:

**1. Запуск генерации:**
```typescript
supabase.functions.invoke('generate-music-suno', {
  body: {
    lyrics: string,
    model: 'V5' | 'V4_5PLUS' | 'V4_5' | 'V4' | 'V3_5',
    style: string,           // из music-parameters
    title: string,
    vocalGender: string,
    styleWeight: number,
    weirdnessConstraint: number,
    audioWeight: number,
    negativeTags: string[]
  }
})
```

**Ответ (async):**
```typescript
{
  status: 'pending',
  taskId: string
}
// или сразу:
{
  success: true,
  variants: MusicVariant[]
}
```

**2. Проверка статуса (polling каждые 10 сек):**
```typescript
supabase.functions.invoke('check-music-status', {
  body: { taskId }
})
```

**Ответ:**
```typescript
{
  status: 'pending' | 'completed',
  variants?: MusicVariant[]
}
```

### Интерфейс MusicVariant:
```typescript
interface MusicVariant {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: number;
  style: string;
}
```

### Перегенерация с фидбеком:
```typescript
supabase.functions.invoke('analyze-lyrics-for-music', {
  body: { lyrics, feedback: userFeedback }
})
```

### Хранение данных:
```typescript
sessionStorage.setItem('studio-selected-music', JSON.stringify(variant));
```

### PostHog событие:
```typescript
posthog.capture('music_generated', {
  variant_id: string,
  style: string,
  generation_attempt: number  // 1 или 2
});
```

---

## Шаг 3: Информация о странице

**Компонент:** `src/components/studio/PageCaptionStep.tsx`

### Edge Function вызов:
```typescript
supabase.functions.invoke('extract-page-metadata', {
  body: { chatMessages, lyrics }
})
```

**Ответ:**
```typescript
{
  occasion: string,    // 'birthday', 'thanks', 'apology', etc.
  recipient: string,   // "Марії"
  sender: string       // "Олексія"
}
```

### Доступные occasion values:
- `birthday` — День народження
- `congratulations` — Вітання
- `thanks` — Подяка
- `apology` — Вибачення
- `love` — Кохання
- `friendship` — Дружба
- `holiday` — Свято
- `other` — Інше

### Хранение данных:
```typescript
const draftData = {
  lyrics,
  musicVariant,
  designData,
  pageInfo: { occasion, recipient, sender },
  timestamp: new Date().toISOString()
};
sessionStorage.setItem('studio-draft-data', JSON.stringify(draftData));
```

### Переход:
Навигация на `/s/draft?occasion=...&recipient=...&sender=...`

---

## Шаг 4: Дизайн открытки

**Компоненты:**
- `src/components/studio/PostcardDesign.tsx` — оркестрация
- `src/components/studio/FrontDesignStep.tsx` — лицевая сторона
- `src/components/studio/BackDesignStep.tsx` — обратная сторона
- `src/components/studio/PostcardPreview.tsx` — превью

### Структура данных дизайна:
```typescript
interface PostcardDesignData {
  front: {
    mode: 'photo' | 'ai-generation';
    style: 'joyful' | 'gentle' | 'universal' | null;
    imageUrl: string | null;
    caption: string;
    prompt: string;
    imageDescription: string;
    useFrame?: boolean;
  };
  back: {
    selectedColor: string;
    personalMessage: string;
  };
}
```

### Стили открыток (`src/lib/postcard-styles.ts`):

| Стиль | Название | Описание |
|-------|----------|----------|
| `joyful` | Радісний | Яркий, праздничный, мультяшный стиль |
| `gentle` | Ніжний | Нежный, акварельный |
| `universal` | Універсальний | Studio Ghibli стиль |

### PostHog событие:
```typescript
posthog.capture('postcard_completed', {
  front_mode: 'photo' | 'ai-generation',
  front_style: string,
  has_frame: boolean
});
```

---

## Финализация: Сохранение заказа

**Файл:** `src/pages/Studio.tsx` → `handlePostcardDesignComplete()`

### Двухфазное сохранение:

**Фаза 1 — Создание заказа:**
```typescript
supabase.functions.invoke('save-order', {
  body: {
    phase: 'create',
    preOrderId: sessionStorage.getItem('studio-pre-order-id'),
    lyrics,
    musicVariant,
    pageData,
    frontDesign,
    backDesign
  }
})
```

**Ответ:**
```typescript
{ orderId: string }
```

**Між фазами — генерація зображень для печати:**
```typescript
// QR (A6) — src/lib/postcard-generator.ts
const frontImageBase64 = await composeFrontImageA6(...);
const backImageBase64 = await captureElement(previewElement, scale=4);

// Sound — src/lib/sound-card-generator.ts (four 88×166 faces + A4 300 DPI die)
const pack = await composeSoundCardPrintPackage({ imageUrl, caption, useFrame, mode, color, personalMessage });
// pack.cover, insideLeft, insideRight, outerBack, printSheet
```

**Фаза 2 — Финализация:**
```typescript
supabase.functions.invoke('save-order', {
  body: {
    phase: 'finalize',
    preOrderId,
    lyrics,
    musicVariant,
    pageData,
    frontDesign,
    backDesign,
    frontImageBase64,      // base64 PNG (QR front or sound cover)
    backImageBase64,       // base64 PNG (QR back; sound also sends named faces)
    qrCodeUrl,             // https://lystosyk.com/s/song/{orderId} — omitted for sound
    productFormat,         // 'qr' | 'sound'
    // sound only:
    insideLeftImageBase64,
    insideRightImageBase64,
    outerBackImageBase64,
    printSheetImageBase64, // A4 landscape 300 DPI die — ops only
  }
})
```

### Очистка и редирект:
```typescript
sessionStorage.removeItem('studio-access-token');
sessionStorage.removeItem('studio-pre-order-id');
navigate(`/order-success?orderId=${orderId}`);
```

---

## Страница успеха: OrderSuccess

**Файл:** `src/pages/OrderSuccess.tsx`

### Загрузка данных:
```typescript
supabase.from('orders').select('*').eq('id', orderId).single();
```

### Генерация промокода:
```typescript
supabase.functions.invoke('generate-promo-code', {
  body: { preOrderId: orderData.pre_order_id }
});
```

---

## Публичная страница: /s/song/:orderId

**Файл:** `src/pages/PublicSong.tsx`

### Загрузка:
```typescript
supabase.from('orders').select('*').eq('id', orderId).single();
```

### SEO защита:
```html
<meta name="robots" content="noindex, nofollow">
```

### Очистка текста песни:
Удаляются: `LYRICS`, markdown-разметка, `[Куплет]`, `[Припев]` и т.д.

---

## Сводка Edge Functions

| Function | Шаг | Назначение |
|----------|-----|------------|
| `validate-studio-token` | 0 | Валидация токена доступа |
| `generate-lyrics` | 1 | Генерация/уточнение текста песни |
| `analyze-lyrics-for-music` | 1→1.5, 2 | Анализ текста, подбор стилей и параметров |
| `generate-music-suno` | 2 | Запуск генерации музыки |
| `check-music-status` | 2 | Проверка статуса генерации |
| `extract-page-metadata` | 3 | Извлечение occasion/recipient/sender из чата |
| `save-order` | 4 | Двухфазное сохранение заказа |
| `generate-promo-code` | Success | Генерация промокода для скидки |
| `validate-promo-code` | Order | Валидация промокода при оформлении |

---

## Сводка Storage

| Ключ | Тип | Назначение |
|------|-----|------------|
| `studio-chat-messages` | localStorage | История чата (шаг 1) |
| `studio-access-token` | sessionStorage | Токен доступа |
| `studio-pre-order-id` | sessionStorage | ID предзаказа |
| `music-parameters` | sessionStorage | Параметры для генерации музыки |
| `studio-selected-music` | sessionStorage | Выбранный вариант музыки |
| `studio-draft-data` | sessionStorage | Агрегированные данные черновика |

---

## Генерация изображений для печати

**Файл:** `src/lib/postcard-generator.ts`

### Размеры A6:
- 1240 × 1748 px (105×148mm @ 300 DPI)

### Функции:

**`composeFrontImageA6(imageUrl, caption, useFrame, mode)`**
- Рисует изображение с object-cover логикой
- Добавляет подпись (caption) в полупрозрачном блоке
- Опционально накладывает рамку `/frames/elegant-frame.png`
- Для AI-генерации пропускает подпись (уже в изображении)

**`composeBackImageA6({ color, message, qrUrl })`**
- Заливает фон выбранным цветом
- Рисует текст сообщения (Bebas Neue шрифт)
- Генерирует и вставляет QR-код

**`captureElement(element, scale)`**
- Использует html2canvas для захвата DOM-элемента
- scale=4 для качества печати

---

## Диаграмма потока данных

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              ЛЕНДИНГ                                     │
│                                                                         │
│  [CTA Button] → openOrderDialog() → OrderDialog.tsx                     │
│                                         │                               │
│                                         ▼                               │
│                              pre_orders (Supabase)                      │
│                                         │                               │
│                            Оплата → получение токена                    │
└─────────────────────────────────────────────────────────────────────────┘
                                          │
                                          ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         СТУДИЯ (/studio)                                │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │ Шаг 0: WelcomeTutorial                                           │   │
│  │   • validate-studio-token → preOrderId                           │   │
│  │   • sessionStorage: access-token, pre-order-id                   │   │
│  │   • posthog: studio_started                                      │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                              │                                          │
│                              ▼                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │ Шаг 1: ChatInterface                                             │   │
│  │   • generate-lyrics (каждое сообщение)                           │   │
│  │   • localStorage: studio-chat-messages                           │   │
│  │   • Результат: lyrics (текст песни)                              │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                              │                                          │
│                              ▼                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │ Шаг 1.5: MusicStyleSelector                                      │   │
│  │   • analyze-lyrics-for-music → recommendedStyles                 │   │
│  │   • sessionStorage: music-parameters                             │   │
│  │   • posthog: lyrics_confirmed                                    │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                              │                                          │
│                              ▼                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │ Шаг 2: MusicGeneration                                           │   │
│  │   • generate-music-suno → taskId                                 │   │
│  │   • check-music-status (polling 10s) → variants                  │   │
│  │   • sessionStorage: studio-selected-music                        │   │
│  │   • posthog: music_generated                                     │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                              │                                          │
│                              ▼                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │ Шаг 3: PageCaptionStep                                           │   │
│  │   • extract-page-metadata → occasion, recipient, sender          │   │
│  │   • sessionStorage: studio-draft-data                            │   │
│  │   • Переход на /s/draft для превью                               │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                              │                                          │
│                              ▼                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │ Шаг 4: PostcardDesign                                            │   │
│  │   • FrontDesignStep: выбор изображения, подпись, рамка           │   │
│  │   • BackDesignStep: цвет фона, личное сообщение                  │   │
│  │   • posthog: postcard_completed                                  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                              │                                          │
│                              ▼                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │ Финализация                                                      │   │
│  │   • save-order (phase: create) → orderId                         │   │
│  │   • composeFrontImageA6 → frontImageBase64                       │   │
│  │   • captureElement → backImageBase64                             │   │
│  │   • save-order (phase: finalize)                                 │   │
│  │   • Очистка sessionStorage                                       │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                          │
                                          ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     ORDER SUCCESS (/order-success)                      │
│                                                                         │
│  • orders.select(orderId) → данные заказа                              │
│  • generate-promo-code → промокод для следующего заказа                │
│  • Превью лицевой/обратной стороны                                     │
│  • Ссылка на публичную страницу                                        │
└─────────────────────────────────────────────────────────────────────────┘
                                          │
                                          ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                  ПУБЛИЧНАЯ СТРАНИЦА (/s/song/:orderId)                  │
│                                                                         │
│  • orders.select(orderId) → lyrics, music_audio_url, page_*            │
│  • OccasionAnimation (анимация по типу события)                        │
│  • Аудиоплеер + текст песни                                            │
│  • noindex, nofollow                                                   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Dev Mode

В режиме разработки (`import.meta.env.DEV`) доступна панель Dev Mode:

- Быстрый переход между шагами
- Автозаполнение тестовых данных
- Пропуск валидации токена
- Просмотр текущего состояния

**Расположение:** правый верхний угол страницы Studio
