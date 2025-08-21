import { Header } from "@/components/sections/header";
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
      <Header />
      <section id="hero" className="scroll-mt-16 md:scroll-mt-0">
        <HeroSection />
      </section>
      <section id="benefits" className="scroll-mt-16 md:scroll-mt-28">
        <BenefitsSection />
      </section>
      <section id="mascot" className="scroll-mt-16 md:scroll-mt-28">
        <MascotSection />
      </section>
      <section id="examples" className="scroll-mt-16 md:scroll-mt-28">
        <ExamplesSection3D />
      </section>
      <section id="pricing" className="scroll-mt-16 md:scroll-mt-28">
        <PricingSection />
      </section>
      <section id="faq" className="scroll-mt-16 md:scroll-mt-28">
        <FaqAndCtaSections />
      </section>
      <Footer />
    </div>
  );
};

export default Index;
