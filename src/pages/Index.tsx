import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HeroSection } from "@/components/sections/hero-section";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { MascotSection } from "@/components/sections/mascot-section";
import ExamplesSection3D from "@/components/sections/examples-section-3d";
import { PricingSection } from "@/components/sections/pricing-section";
import { FaqSection } from "@/components/sections/faq-section";
import FaqAndCtaSections from "@/components/sections/faq-and-cta-sections";


const Index = () => {
  const location = useLocation();

  // Handle hash scrolling when component mounts or hash changes
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen pt-16">
      <HeroSection />
      <BenefitsSection />
      <MascotSection />
      <ExamplesSection3D />
      <PricingSection />
      <FaqAndCtaSections />
    </div>
  );
};

export default Index;
