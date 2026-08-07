import { HeaderExperiment } from "@/components/sections/header-experiment";
import { HeroSectionExperiment } from "@/components/sections/hero-section-experiment";
import { UnifiedFlowExperiment } from "@/components/sections/unified-flow-experiment";
import { FooterExperiment } from "@/components/sections/footer-experiment";
import { FinalCTAExperiment } from "@/components/sections/final-cta-experiment";
import { FaqSectionMain } from "@/components/sections/faq-section-main";
import { OccasionsCatalogSection } from "@/components/sections/occasions-catalog-section";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeaderExperiment ctaLabel="Створити QR-листівку" />

      {/* Hero - чистый первый экран с главным CTA */}
      <HeroSectionExperiment />

      {/* Каталог поводов: выбор ситуации -> тематический лендинг */}
      <OccasionsCatalogSection />

      {/* Unified Flow: Problem -> Process -> Pricing (One seamless section) */}
      <UnifiedFlowExperiment />

      {/* FAQ Section */}
      <FaqSectionMain />

      {/* Final CTA Buttons */}
      <FinalCTAExperiment />

      {/* Минималистичный футер */}
      <FooterExperiment />
    </div>
  );
};

export default Index;
