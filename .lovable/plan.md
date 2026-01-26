

# Додати source до order_submitted

## Проблема
Подія `order_submitted` не містить інформації звідки прийшло замовлення (hero, pricing, footer тощо). Ця інформація є тільки в `order_dialog_opened`.

## Рішення
Зберігати `source` в контексті діалогу і передавати його в `order_submitted`.

---

## Зміни

### Файл 1: `src/components/order/OrderDialogContext.tsx`

Додати зберігання source:

```tsx
interface OrderDialogContextType {
  isOpen: boolean;
  source: string | null;  // ДОДАТИ
  openOrderDialog: (source: string, label?: string) => void;
  closeOrderDialog: () => void;
}

export function OrderDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string | null>(null);  // ДОДАТИ

  const openOrderDialog = useCallback((source: string, label?: string) => {
    setSource(source);  // ДОДАТИ - зберігаємо source
    posthog.capture('order_dialog_opened', {
      source,
      button_label: label
    });
    setIsOpen(true);
  }, []);

  const closeOrderDialog = useCallback(() => {
    setIsOpen(false);
    setSource(null);  // ДОДАТИ - очищаємо при закритті
  }, []);

  return (
    <OrderDialogContext.Provider value={{ isOpen, source, openOrderDialog, closeOrderDialog }}>
      {children}
    </OrderDialogContext.Provider>
  );
}
```

### Файл 2: `src/components/order/OrderDialog.tsx`

Використати source з контексту:

```tsx
// Рядок ~21
const { isOpen, source, closeOrderDialog } = useOrderDialog();

// Рядок ~111
posthog.capture('order_submitted', {
  source,  // ДОДАТИ
  price: finalPrice,
  has_promo: promoStatus?.valid || false,
  contact_type: formData.contactType
});
```

---

## Результат в PostHog

Після цих змін `order_submitted` матиме:

```json
{
  "source": "hero",
  "price": 399,
  "has_promo": false,
  "contact_type": "phone"
}
```

Можливі значення `source`:
- `hero` — головний екран
- `pricing` — секція з ціною
- `mascot` — секція з маскотом
- `guarantee` — секція гарантії
- `final_cta` — фінальний заклик
- `footer` — футер
- `header` — шапка
- `examples` — секція прикладів

---

## В PostHog

Після публікації зможеш:
1. **Insights → Trends**: Вибрати `order_submitted`, розбити по `source`
2. **Funnels**: Порівняти конверсію з різних джерел
3. Побачити який елемент сайту найкраще конвертує

