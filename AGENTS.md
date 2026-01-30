# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Основные команды

### Установка и запуск
- Установка зависимостей: `npm install`
- Локальная разработка (Vite dev‑server на `localhost:8080`): `npm run dev`
- Продакшн‑сборка: `npm run build`
- Дев‑сборка (быстрая проверка сборки с dev‑конфигом): `npm run build:dev`
- Предпросмотр собранного приложения: `npm run preview`

### Линтинг
- Запустить общий линт: `npm run lint`
- Пролинтить конкретный файл: `npx eslint src/pages/Studio.tsx`

В проекте на данный момент не настроены тестовые скрипты (`npm test` и т.п.). Если вы добавите тесты, обновите этот файл с описанием, как запускать весь набор и отдельные тесты.

## Архитектура и структура проекта

### Стек и базовая конфигурация
- Frontend‑стек: Vite + React + TypeScript, React Router DOM, shadcn‑ui + Radix UI, Tailwind CSS.
- Точка входа: `src/main.tsx` рендерит `<App />` в элемент `#root`.
- Vite‑конфиг: `vite.config.ts` настраивает:
  - dev‑сервер на порту `8080` (хост `::`).
  - React через `@vitejs/plugin-react-swc`.
  - Алиас `@` → `./src` (см. также `tsconfig.json` → `"@/*": ["./src/*"]`). При добавлении файлов предпочитайте алиасные импорты (`@/components/...`).
- Tailwind: `tailwind.config.ts` сканирует `./src`, `./components`, `./pages`, использует CSS‑переменные для темизации, шрифты `Baloo 2` и набор анимаций (`scroll-left/right`, `accordion-*`).
- ESLint: `eslint.config.js` c TypeScript‑правилами, `react-hooks` и `react-refresh`. Важно: правило `react-refresh/only-export-components` → экспортируйте компоненты как значения верхнего уровня.

### Маршрутизация и layout
- Главный роутер описан в `src/App.tsx`:
  - Обёртки верхнего уровня: `QueryClientProvider` (React Query), `TooltipProvider`, `Toaster` + `Sonner` для уведомлений.
  - SPA‑роутер: `BrowserRouter` с набором страниц:
    - `/` → `pages/Index.tsx` (лендинг, секции под `components/sections/*`).
    - `/studio` → `pages/Studio.tsx` (пошаговая студия створення пісні та листівки).
    - `/s/song/:orderId` → `pages/PublicSong.tsx` (публічна сторінка з піснею для отримувача).
    - `/s/draft` → `pages/PublicSongDraft.tsx` (превью/черновик сторінки перед фінальним збереженням).
    - `/order-success`, `/order-pending`, `/discount`, `/valentine` и страница 404 (`NotFound`).
  - Глобальный `OrderDialog` и `OrderDialogProvider` монтируются в `App` и доступны из любого места через контекст.
  - `PostHogProvider` оборачивает всё приложение для аналитики.

### Структура каталогов `src/`
- `pages/`
  - Страницы верхнего уровня, соответствующие роутам. Внутренняя логика обычно делегируется в компоненты из `components/*`.
  - Особенно важные страницы:
    - `Studio.tsx` — оркестрация всего многошагового процесса (см. раздел ниже).
    - `PublicSong.tsx` и `PublicSongDraft.tsx` — публичные/черновые страницы с піснею, використовують `OccasionAnimation` и интеграцию с Supabase (`orders` таблица).
    - `OrderSuccess.tsx` — итоговая страница заказу: подгружает данные заказа из Supabase, показывает превью лицевой/обратной сторон листівки и генерирует промокод через Edge Function.

- `components/sections/`
  - Блоки лендинга для главной страницы (`Index.tsx`): `HeroSection`, `BenefitsSection`, `HowItWorksSection`, `MomentsGallerySection`, `ExamplesSection3D`, `PricingSection`, `ReviewsSection`, `GuaranteeSection`, `FaqAndCtaSections`, `FinalCtaSection`, `Footer` и др.
  - Если вы добавляете новый лендинговый блок — следуйте существующему паттерну: отдельный компонент в `components/sections`, подключение в `pages/Index.tsx` с `id` для якорной навигации.

- `components/valentine-new/`
  - Альтернативный лендинг под акцию/кампанию (`ValentineNew.tsx`): секции боли/решения/социального доказательства и т.п. Реиспользует общую визуальную тему (Tailwind, UI‑компоненты).

- `components/ui/`
  - Набор шадкн‑компонентов (`button`, `card`, `dialog`, `toast`, `accordion`, `tabs`, `textarea`, `calendar`, `carousel`, и т.д.).
  - Эти компоненты считаются инфраструктурными; при правках лучше сохранять совместимость с Tailwind‑токенами и не ломать публичный API (props), так как они используются по всему приложению.

- `components/order/`
  - `OrderDialogContext.tsx` — React Context, предоставляющий методы открытия/закрытия диалога заказа и источник `PostHog`‑событий (`order_dialog_opened`).
  - `OrderDialog.tsx` — реальный UI заказа, обрабатывает форму, триггерит `order_submitted` и создаёт предварительный заказ в Supabase/бекенде.

- `components/studio/`
  - Содержит всю UI‑логику студии создания пісні и листівки:
    - `WelcomeTutorial` — стартовый экран / онбординг.
    - `ChatInterface` — чат для генерации и уточнения текста пісні.
    - `MusicStyleSelector`, `MusicGeneration`, `MusicVariantCard` — выбор стиля и генерация музыки (клient взаимодействует с Supabase Edge Function `analyze-lyrics-for-music` и последующими API).
    - `PageCaptionStep` — создание текстов для публичной страницы (тайтл, кому/от кого и т.п.).
    - `PostcardDesign`, `FrontDesignStep`, `BackDesignStep`, `PostcardPreview`, `ColorPalette`, `ImageUploader` — визуальный конструктор листівки и предпросмотр.
    - `StepsHeader`, `StepExplanation` — визуализация текущего шага и подсказки.
  - Оркестрация шагов (`currentStep`, работа с URL‑параметром `step`, сохранение промежуточных данных) находится в `pages/Studio.tsx`.

- `components/public/`
  - Анимации и оформление публичной страницы: `OccasionAnimation`, `OccasionBackground`, `OccasionIntroAnimation`, `OccasionLottie`, `OccasionParticles`, `OccasionStaticBackground` плюс контекст `IntroRitualContext`.
  - Эти компоненты используются и на публичной странице (`PublicSong`), и на черновой (`PublicSongDraft`), и в `OrderSuccess`.

- `hooks/`
  - `use-mobile.tsx` — хук для определения мобильного layout.
  - `use-toast.ts` — обёртка над шадкн‑уведомлениями (используется, например, в `OrderSuccess.tsx`).

- `integrations/supabase/`
  - `client.ts` — инициализация Supabase‑клиента (`createClient<Database>`) с URL и публичным anon‑key. Этот файл генерируется Lovable; не хардкодьте ключи по‑новой и не меняйте URL без синхронизации с Supabase‑проектом.
  - `types.ts` — типы БД, сгенерированные по Supabase‑схеме (используются для типобезопасных запросов).

- `lib/`
  - `music-styles.ts` — справочник музыкальных стилей Suno (id, человекочитаемое название, категория, mood, bestFor, рекомендации по полу вокала) + функции подбора (`getStyleById`, `getRecommendedStyles`, `getRandomStyles` и др.).
  - `postcard-styles.ts` — стили оформления листівок (joyful/gentle/universal), текстовые подсказки для генерации изображений и вспомогательные функции (`getStylePrompt`, `getStyleColors`, `getRandomStyleElements`).
  - `postcard-generator.ts` — низкоуровневые функции генерации изображений лицевой/обратной стороны в формате A6:
    - `preprocessImageToA6` — подгонка исходной картинки под A6 с логикой `object-cover`.
    - `composeFrontImageA6` — отрисовка лицевой стороны (фон, картинка, рамка, подпись, опциональная декоративная рамка `frames/elegant-frame.png`).
    - `composeBackImageA6` — отрисовка обратной стороны с фоном, многострочным текстом и QR‑кодом.
    - `captureElement` / `captureDraftPageHtml` — утилиты для рендеринга/снимка DOM‑элементов через `html2canvas`.
  - `color-extractor.ts`, `utils.ts (cn)` — небольшие утилиты.

- `providers/`
  - `PostHogProvider.tsx` — инициализация PostHog и ручной `$pageview` при смене `location`. Предоставляет экспорт `posthog` для вызова `posthog.capture(...)` из других модулей.

### Студия: жизненный цикл данных

Страница `Studio.tsx` — наиболее сложный модуль, важен для понимания всей логики:
- Хранит ключевые стейты: `lyrics`, `selectedMusicVariant`, `pageData`, `designData`, `chatMessages`, `recommendedStyles`, `selectedStyle`, `currentStep`, флаги загрузки и вспомогательные ключи.
- Использует:
  - `localStorage` для долговременного хранения истории чата (`studio-chat-messages`).
  - `sessionStorage` для временного хранения рабочих данных между шагами и страницами:
    - `studio-draft-data` — агрегированные данные черновика (текст, выбранная музыка, данные страницы, дизайн).
    - `studio-selected-music`, `music-parameters`, `studio-access-token`, `studio-pre-order-id` и др.
- Поток шагов:
  1. Welcome (`currentStep = 0`): `WelcomeTutorial` → после старта сбрасывает стейты и переключает на шаг 1.
  2. Шаг 1 — генерация/уточнение текста через `ChatInterface`; по нажатию "підтвердити" вызывается `handleLyricsConfirmed`, который:
     - сохраняет `lyrics`,
     - триггерит событие `lyrics_confirmed` через PostHog,
     - вызывает Supabase Edge Function `analyze-lyrics-for-music` для подбора стилей и параметров генерации.
  3. Шаг 1.5 — выбор музыкального стиля в `MusicStyleSelector` на основе результата анализа текста (либо fallback‑набор стилей из `lib/music-styles.ts`).
  4. Шаг 2 — `MusicGeneration`: генерация двух вариантов трека и выбор пользователем (`handleMusicVariantSelected`), либо запрос помощи специалиста.
  5. Шаг 3 — `PageCaptionStep`: формирование текстов публичной страницы (кому/от кого, заголовок и т.п.).
  6. Шаг 4 — `PostcardDesign`: конструктор лицевой/обратной стороны листівки. При завершении вызывается `handlePostcardDesignComplete`, который:
     - создаёт заказ через Supabase Function `save-order` (фаза `create`),
     - генерирует финальные изображения для печати (front/back) с помощью `composeFrontImageA6` и `captureElement`,
     - завершает заказ (`save-order` фаза `finalize`),
     - очищает доступ в студию и перенаправляет на `/order-success?orderId=...`.
- В DEV‑режиме (`import.meta.env.DEV`) есть панели `Dev Mode` с быстрым переходом по шагам и автозаполнением тестовых данных.

### Публичные страницы и безопасность данных
- `PublicSong.tsx` и `PublicSongDraft.tsx`:
  - Загружают данные из Supabase (`orders` или `sessionStorage`) и отображают персональные тексты и аудио.
  - Есть простая языковая детекция (`uk`/`ru`) по специфическим символам для переключения подписи UI и заголовков.
  - В `PublicSong.tsx` при монтировании добавляется `<meta name="robots" content="noindex, nofollow">`, чтобы поисковики не индексировали персональные страницы.
  - Тексты пісень очищаются от служебных разметочных тегов (`LYRICS`, markdown‑форматирование, `[Куплет]` и т.п.) перед отображением.

### Аналитика (PostHog)

Подробная документация по аналитике находится в `docs/ANALYTICS.md` и является источником правды по ивентам и воронкам.
Ключевые моменты для агентов:
- Все новые события должны быть задокументированы в `docs/ANALYTICS.md` (название, описание, параметры, где вызывается).
- Существующие события и их использование:
  - `$pageview` — вызывается в `PostHogProvider` при смене маршрута.
  - `order_dialog_opened`, `order_submitted` — контекст и компонент заказа (`components/order/*`).
  - `studio_started`, `lyrics_confirmed`, `music_generated`, `postcard_completed` — шаги студии (см. `Studio` и `components/studio/*`).
- При добавлении новых шагов/экранов в студии или воронке заказа желательно поддерживать линейные воронки из `docs/ANALYTICS.md`.

## Взаимодействие с Supabase и Edge Functions

- Конфигурация Supabase находится в `supabase/config.toml` и миграциях в `supabase/migrations/*.sql`. Логику Edge Functions см. в соответствующих функциях Supabase‑проекта (они не лежат в этом репо, но вызываются из фронтенда через `supabase.functions.invoke`).
- На фронтенде активно используются следующие Edge Functions (см. `Studio.tsx`, `OrderSuccess.tsx` и другие компоненты):
  - `analyze-lyrics-for-music` — анализ текста пісні и подбор музыкальных стилей/параметров для генерации.
  - `save-order` — двухфазное сохранение заказа (`phase: 'create'` и `phase: 'finalize'`), включая загрузку base64‑изображений.
  - `generate-promo-code` — генерация промокода после успешного заказа (`OrderSuccess.tsx`).
- При изменении контрактов этих функций обязательно:
  - Обновляйте типизацию входных/выходных данных на фронтенде.
  - Синхронизируйте документацию по поведению (особенно для критических шагов студии: сохранение заказа, генерация промокодов).

## Особенности, о которых важно помнить агентам

- Алиасы импорта: используйте `@/...` вместо относительных путей там, где это уже применяется.
- Хранение состояния студии распределено между React‑стейтом, `localStorage` и `sessionStorage`. При изменении структуры данных черновика (`studio-draft-data`, `music-parameters` и т.п.) не забывайте обновлять:
  - логику инициализации/восстановления в `Studio.tsx`,
  - компоненты `PublicSongDraft`/`PostcardDesign`, полагающиеся на эти данные.
- При работе с генерацией изображений для печати (A6‑формат) не меняйте произвольно размеры холста и масштабирование — это критично для качества печати и выравнивания рамок и QR‑кода.
- При работе с публичными страницами (`/s/song/:orderId`) не добавляйте туда лишних маркетинговых блоков и ссылок — это персональная страница подарка, её задача — сфокусироваться на пісні и повідомленні.
- Любые изменения в аналитических событиях (названия, свойства, порядок шагов) должны проходить через обновление `docs/ANALYTICS.md` и синхронизацию с дашбордами PostHog.