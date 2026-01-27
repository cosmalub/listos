import { HeroSection } from '../components/valentine/HeroSection';
import { PainSection } from '../components/valentine/PainSection';
import { SolutionSection } from '../components/valentine/SolutionSection';
import { HowItWorksSection } from '../components/valentine/HowItWorksSection';
import { MomentsGallerySection } from '@/components/sections/moments-gallery-section';
import { TrustSection } from '../components/valentine/TrustSection';
import { WhoIsThisForSection } from '../components/valentine/WhoIsThisForSection';
import { InsightSection } from '../components/valentine/InsightSection';
import { FaqSection } from '../components/valentine/FaqSection';
import { FinalCTASection } from '../components/valentine/FinalCTASection';
import { ReviewsSection } from '../components/valentine/ReviewsSection';
import { PricingSection } from '../components/valentine/PricingSection';
import { Footer } from '@/components/sections/footer';
import { Header } from '@/components/sections/header';

const valentineMenuItems = [
  { name: "Як це працює", href: "#how-it-works" },
  { name: "Відгуки", href: "#reviews" },
  { name: "Ціна", href: "#pricing" },
  { name: "Гарантія", href: "#guarantee" },
  { name: "FAQ", href: "#faq" },
];

export default function Valentine() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      <Header ctaLabel="Створити" menuItems={valentineMenuItems} />
      <HeroSection />
      <PainSection />
      <InsightSection />
      <SolutionSection />
      <div id="how-it-works">
        <HowItWorksSection />
      </div>
      <MomentsGallerySection />
      <div id="reviews">
        <ReviewsSection />
      </div>
      <div id="pricing">
        <PricingSection />
      </div>
      <div id="guarantee">
        <TrustSection />
      </div>
      <WhoIsThisForSection />
      <div id="faq">
        <FaqSection />
      </div>
      <FinalCTASection />
      <Footer />
    </div>
  );
}
