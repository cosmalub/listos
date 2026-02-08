import { HeaderExperiment } from "@/components/sections/header-experiment";
import { HeroSectionExperiment } from "@/components/sections/hero-section-experiment";
import { AiBenefitsSection } from "@/components/sections/ai-benefits-section";
import { UnifiedFlowExperiment } from "@/components/sections/unified-flow-experiment";
import { FooterExperiment } from "@/components/sections/footer-experiment";
import { PainPointsSection } from "@/components/sections/pain-points-section";
import { FinalCTAExperiment } from "@/components/sections/final-cta-experiment";
import { FaqSectionMain } from "@/components/sections/faq-section-main";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeaderExperiment />

      {/* Hero - чистый первый экран с главным CTA */}
      <HeroSectionExperiment />

      {/* Коли слів стає замало - второй блок */}
      <PainPointsSection />

      {/* AI Benefits - почему ШІ это круто */}
      <AiBenefitsSection />

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
