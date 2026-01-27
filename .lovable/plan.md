
# Перемістити InsightSection після 2-го блоку

## Поточний порядок секцій на /valentine:
1. HeroSection
2. PainSection ← 2-й блок
3. SolutionSection
4. HowItWorksSection
5. GallerySection
6. TrustSection
7. WhoIsThisForSection
8. InsightSection ← зараз тут
9. FinalCTASection
10. Footer

## Новий порядок:
1. HeroSection
2. PainSection
3. **InsightSection** ← переміщуємо сюди
4. SolutionSection
5. HowItWorksSection
6. GallerySection
7. TrustSection
8. WhoIsThisForSection
9. FinalCTASection
10. Footer

## Зміни

### Файл: `src/pages/Valentine.tsx`

Змінити порядок компонентів — перенести `<InsightSection />` після `<PainSection />`:

```tsx
export default function Valentine() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      <HeroSection />
      <PainSection />
      <InsightSection />  {/* Переміщено сюди */}
      <SolutionSection />
      <HowItWorksSection />
      <GallerySection />
      <TrustSection />
      <WhoIsThisForSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
```

## Результат
Секція "Любов — це не фраза..." з'явиться одразу після PainSection, створюючи кращий емоційний перехід до рішення.
