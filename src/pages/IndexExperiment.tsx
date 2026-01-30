import { HeaderExperiment } from "@/components/sections/header-experiment";
import { HeroSectionExperiment } from "@/components/sections/hero-section-experiment";
import { UnifiedFlowExperiment } from "@/components/sections/unified-flow-experiment";
import { FooterExperiment } from "@/components/sections/footer-experiment";

const IndexExperiment = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeaderExperiment />
      
      {/* Hero - чистый первый экран с главным CTA */}
      <HeroSectionExperiment />
      
      {/* Unified Flow: Problem -> Process -> Pricing (One seamless section) */}
      <UnifiedFlowExperiment />
      
      {/* Минималистичный футер */}
      <FooterExperiment />
    </div>
  );
};

export default IndexExperiment;
