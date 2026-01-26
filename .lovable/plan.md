
# План: Виправлення білого екрану після оформлення замовлення

## Діагностика

### Виявлена проблема
При оформленні замовлення в `OrderDialog.tsx`:
1. Користувач натискає "Оформити замовлення"
2. Запис створюється в `pre_orders` ✅
3. `closeOrderDialog()` закриває діалог (анімація Radix Dialog)
4. `navigate('/order-pending')` виконується одночасно
5. **Конфлікт**: Radix Dialog unmount + React Router навігація відбуваються паралельно
6. **Результат**: `NotFoundError: removeChild` → білий екран

### Підтвердження з консолі
```
NotFoundError: Failed to execute 'removeChild' on 'Node': 
The node to be removed is not a child of this node.
```

Це типова помилка коли Radix Dialog анімація unmount конфліктує з React Router навігацією.

---

## Рішення

### 1. Затримати навігацію після закриття діалогу

**Файл: `src/components/order/OrderDialog.tsx`**

Змінити рядки 117-118:

```tsx
// Було:
closeOrderDialog();
navigate(`/order-pending?orderId=${data.id}`);

// Стане:
closeOrderDialog();
// Даємо час Radix Dialog завершити анімацію закриття
setTimeout(() => {
  navigate(`/order-pending?orderId=${data.id}`);
}, 150); // 150ms достатньо для анімації
```

### 2. Альтернативне рішення: Навігувати без закриття діалогу

Radix Dialog автоматично закриється при зміні route, тому можна не викликати `closeOrderDialog()`:

```tsx
// Було:
closeOrderDialog();
navigate(`/order-pending?orderId=${data.id}`);

// Стане:
// Не закриваємо діалог вручну - він закриється автоматично при зміні route
navigate(`/order-pending?orderId=${data.id}`);
```

### 3. Рекомендоване рішення (комбіноване)

Використати `setTimeout` для безпечної навігації:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const { data, error } = await supabase
      .from('pre_orders')
      .insert({
        client_name: formData.name,
        user_email: formData.contactType === 'telegram' ? formData.telegram : null,
        user_phone: formData.contactType === 'phone' ? formData.phone : null,
        city: formData.city,
        nova_poshta: formData.novaPoshta,
        comment: formData.comment,
        contact_type: formData.contactType,
      })
      .select()
      .single();

    if (error) throw error;

    if (promoStatus?.valid && formData.promoCode) {
      await supabase
        .from('promo_codes')
        .update({
          is_used: true,
          used_at: new Date().toISOString(),
          used_in_order_id: data.id
        })
        .eq('code', formData.promoCode.toUpperCase().trim());
    }

    // Трекаємо успішне замовлення
    posthog.capture('order_submitted', {
      price: finalPrice,
      has_promo: promoStatus?.valid || false,
      contact_type: formData.contactType
    });

    // Закриваємо діалог
    closeOrderDialog();
    
    // ВИПРАВЛЕННЯ: Даємо час Radix Dialog завершити анімацію
    // перед навігацією, щоб уникнути конфлікту DOM операцій
    setTimeout(() => {
      navigate(`/order-pending?orderId=${data.id}`);
    }, 150);

  } catch (error) {
    console.error('Error creating order:', error);
    toast.error('Помилка при створенні замовлення');
    setIsSubmitting(false); // Reset тільки при помилці
  }
  // Видаляємо finally блок - не скидаємо isSubmitting при успіху,
  // бо користувач буде переведений на іншу сторінку
};
```

---

## Технічні деталі

### Чому це працює

1. **Radix Dialog анімація** займає ~150ms для завершення
2. **React Router** чекає поки DOM стабілізується
3. **setTimeout(150)** гарантує що анімація закриття завершиться до навігації

### Побічний ефект

Користувач побачить коротку затримку (~150ms) перед переходом на нову сторінку. Це непомітно і краще ніж білий екран.

---

## Додаткове покращення (опціонально)

### Прибрати finally блок

Поточний код:
```tsx
} finally {
  setIsSubmitting(false);
}
```

Проблема: `setIsSubmitting(false)` виконується навіть при успіху, що може викликати flicker кнопки перед навігацією.

Краще:
```tsx
} catch (error) {
  console.error('Error creating order:', error);
  toast.error('Помилка при створенні замовлення');
  setIsSubmitting(false); // Тільки при помилці
}
// Без finally - при успіху компонент unmount перед reset
```

---

## Файли для зміни

| Файл | Зміни |
|------|-------|
| `src/components/order/OrderDialog.tsx` | Додати setTimeout перед navigate(), видалити finally блок |

---

## Очікуваний результат

1. ✅ Користувач натискає "Оформити замовлення"
2. ✅ Діалог закривається з анімацією
3. ✅ Через 150ms відбувається навігація на `/order-pending`
4. ✅ Сторінка `/order-pending` показує "Заявка створена успішно!"
5. ✅ Немає білого екрану та DOM помилок
