import { HeroSection } from "@/components/sections/hero-section";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { MascotSection } from "@/components/sections/mascot-section";
import ExamplesSection3D from "@/components/sections/examples-section-3d";
import { PricingSection } from "@/components/sections/pricing-section";
import { FaqSection } from "@/components/sections/faq-section";
import FaqAndCtaSections from "@/components/sections/faq-and-cta-sections";
import { Footer } from "@/components/sections/footer";


const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BenefitsSection />
      <MascotSection />
      <ExamplesSection3D />
      <PricingSection />
      <FaqAndCtaSections />
      <Footer />
    </div>
  );
};

export default Index;
