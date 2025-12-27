import { Header } from "@/components/sections/header";
import { HeroSection } from "@/components/sections/hero-section";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { MascotSection } from "@/components/sections/mascot-section";
import ExamplesSection3D from "@/components/sections/examples-section-3d";
import { MomentsGallerySection } from "@/components/sections/moments-gallery-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { GuaranteeSection } from "@/components/sections/guarantee-section";
import FaqAndCtaSections from "@/components/sections/faq-and-cta-sections";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { Footer } from "@/components/sections/footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <section id="hero">
        <HeroSection />
      </section>
      <section id="benefits">
        <BenefitsSection />
      </section>
      <section id="mascot">
        <MascotSection />
      </section>
      <section id="moments-gallery">
        <MomentsGallerySection />
      </section>
      <section id="examples">
        <ExamplesSection3D />
      </section>
      <section id="reviews">
        <ReviewsSection />
      </section>
      <section id="pricing">
        <PricingSection />
      </section>
      <section id="guarantee">
        <GuaranteeSection />
      </section>
      <section id="faq">
        <FaqAndCtaSections />
      </section>
      <section id="final-cta">
        <FinalCtaSection />
      </section>
      <Footer />
    </div>
  );
};

export default Index;
