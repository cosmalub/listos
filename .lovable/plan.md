
# План: Виправлення підвисання сторінки після замовлення

## Виявлені проблеми

### 1. Toast.loading не закривається
У `Studio.tsx` при збереженні замовлення:
- Рядок 307: `toast.loading('Збереження замовлення...')` — створює toast
- Рядок 427: `toast.success(...)` — створює НОВИЙ toast, але не закриває loading
- Loading toast залишається на екрані нескінченно

### 2. UI блокується під час обробки
Функції `composeFrontImageA6` та `capturePreview` виконуються синхронно на головному потоці:
- Рендеринг компонентів у DOM
- Canvas-операції (малювання, scale x4)
- setTimeout(500) для очікування завантаження зображень
- Завантаження великих base64 зображень у edge function

### 3. Race condition на OrderSuccess
Навігація відбувається відразу після `save-order` Phase 2, але:
- Зображення можуть ще не завантажитися на Supabase Storage
- Дані в базі можуть ще не бути повністю збережені

---

## Рішення

### 1. Виправити toast.loading (обов'язково)
```tsx
// Studio.tsx - handlePostcardDesignComplete

// Замість:
toast.loading('Збереження замовлення...');

// Використати dismiss і правильний паттерн:
const toastId = toast.loading('Збереження замовлення...');

// При успіху:
toast.dismiss(toastId);
toast.success('Замовлення збережено успішно!');

// При помилці:
toast.dismiss(toastId);
toast.error('Помилка збереження замовлення');
```

### 2. Додати прогрес-індикатори (покращення UX)
Показувати користувачу етапи збереження:
```tsx
toast.loading('Створення замовлення...');
// Phase 1
toast.loading('Генерація зображення листівки...');
// Capture
toast.loading('Завантаження зображень...');
// Phase 2
toast.loading('Завершення...');
```

### 3. Обробка OrderSuccess без зображень (fallback)
Якщо зображення ще не готові, показувати placeholder або повідомлення замість порожніх img:
```tsx
// OrderSuccess.tsx
{orderData.front_image_url ? (
  <img src={orderData.front_image_url} ... />
) : (
  <div className="flex items-center justify-center h-full bg-muted">
    <Loader2 className="animate-spin" />
    <span>Зображення обробляється...</span>
  </div>
)}
```

---

## Зміни у файлах

| Файл | Зміни |
|------|-------|
| `src/pages/Studio.tsx` | Виправити toast.loading → toast.dismiss + покращити UX з етапами |
| `src/pages/OrderSuccess.tsx` | Додати fallback для відсутніх зображень |

---

## Технічні деталі

### Studio.tsx (~рядки 304-440)
```tsx
const handlePostcardDesignComplete = async (postcardDesignData: any) => {
  const toastId = toast.loading('Створення замовлення...');
  
  try {
    // ... Phase 1 код ...
    toast.loading('Генерація зображень...', { id: toastId });
    
    // ... capturePreview код ...
    toast.loading('Завантаження на сервер...', { id: toastId });
    
    // ... Phase 2 код ...
    
    toast.success('Замовлення збережено успішно!', { id: toastId });
    // Навігація...
    
  } catch (error) {
    toast.error('Помилка збереження замовлення', { id: toastId });
  }
};
```

### OrderSuccess.tsx (~рядки 164-188)
Додати перевірку наявності URL зображень та показувати стан завантаження якщо їх ще немає.

---

## Результат
- Toast коректно закривається після завершення операції
- Користувач бачить прогрес збереження
- Якщо зображення ще завантажуються — показується loader замість порожнього блоку
- Сторінка більше не "підвисає" візуально
