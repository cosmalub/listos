
# Додати футер на сторінку /valentine

## Що зараз
На сторінці `/valentine` є простий інлайн-футер:
```tsx
<footer className="bg-gray-50 py-12 border-t border-gray-100">
  <p>© 2024 Листосик. Зроблено з любов'ю.</p>
</footer>
```

## Що зробимо
Замінимо його на повноцінний `Footer` компонент з головної сторінки, який містить:
- Логотип Листосик
- Слоган бренду
- Посилання (FAQ, оформити замовлення, студія)
- Контакти (email, Instagram, Telegram)
- Копірайт

---

## Зміни

### Файл: `src/pages/Valentine.tsx`

1. Додати імпорт `Footer` компонента
2. Замінити інлайн-футер на компонент `<Footer />`

```tsx
import { Footer } from '@/components/sections/footer';
// ... інші імпорти

export default function Valentine() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      <HeroSection />
      <PainSection />
      <SolutionSection />
      <HowItWorksSection />
      <GallerySection />
      <TrustSection />
      <WhoIsThisForSection />
      <InsightSection />
      <FinalCTASection />
      <Footer />  {/* Замість інлайн-футера */}
    </div>
  );
}
```

---

## Результат
- Сторінка `/valentine` матиме такий самий футер як головна сторінка
- Кнопка "Оформити замовлення" в футері відкриватиме діалог (з source="footer")
- Всі посилання та контакти працюватимуть
