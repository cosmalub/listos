

# План: PainPointsSection на второе место

**Файл:** `src/pages/Index.tsx`

## Изменение

Переставить `<PainPointsSection />` сразу после `<HeroSectionExperiment />`:

```text
<HeroSectionExperiment />

<PainPointsSection />  ← "Коли слів стає замало" - СЮДА

<AiBenefitsSection />

<UnifiedFlowExperiment />

<FaqSectionMain />

<FinalCTAExperiment />

<FooterExperiment />
```

## Результат

Порядок секций на главной:
1. Hero ("Перетвори почуття на музичну листівку")
2. **PainPointsSection** ("Коли слів стає замало") 
3. AiBenefitsSection ("Чому ШІ — це круто?")
4. UnifiedFlowExperiment
5. FAQ
6. Final CTA
7. Footer

