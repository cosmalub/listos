import { HeroSection } from '../components/valentine-new/HeroSection';
import { PainSection } from '../components/valentine-new/PainSection';
import { SolutionSection } from '../components/valentine-new/SolutionSection';
import { HowItWorksSection } from '../components/valentine-new/HowItWorksSection';
import { ValentineMomentsGallerySection } from '../components/valentine-new/ValentineMomentsGallerySection';
import { ReviewsSection } from '../components/valentine-new/ReviewsSection';
import { TrustSection } from '../components/valentine-new/TrustSection';
import { WhoIsThisForSection } from '../components/valentine-new/WhoIsThisForSection';
import { InsightSection } from '../components/valentine-new/InsightSection';
import { FaqSection } from '../components/valentine-new/FaqSection';
import { FinalCTASection } from '../components/valentine-new/FinalCTASection';
import { PricingSection } from '../components/valentine-new/PricingSection';
import { Footer } from '@/components/sections/footer';
import { HeaderExperiment } from '@/components/sections/header-experiment';

const valentineMenuItems = [
  { name: "Як це працює", href: "#how-it-works" },
  { name: "Галерея", href: "#gallery" },
  { name: "Відгуки", href: "#reviews" },
  { name: "Ціна", href: "#pricing" },
  { name: "Для кого", href: "#for-whom" },
  { name: "FAQ", href: "#faq" },
];

export default function Valentine() {
  return (
    <div className="min-h-screen bg-rose-50/50 font-sans text-gray-900 overflow-x-hidden selection:bg-rose-100 selection:text-rose-600">
      <HeaderExperiment ctaLabel="Створити" menuItems={valentineMenuItems} showProductsDropdown={false} logoHref="#top" />
      <HeroSection />
      <PainSection />
      <InsightSection />
      <SolutionSection />
      <div id="how-it-works">
        <HowItWorksSection />
      </div>

      {/* Real Photos Gallery (Custom Polaroid Style for Valentine New Page) */}
      <div id="gallery">
        <ValentineMomentsGallerySection />
      </div>

      {/* Screenshots Reviews */}
      <div id="reviews">
        <ReviewsSection />
      </div>

      <div id="pricing">
        <PricingSection />
      </div>
      <div id="guarantee">
        <TrustSection />
      </div>
      <div id="for-whom">
        <WhoIsThisForSection />
      </div>
      <div id="faq">
        <FaqSection />
      </div>
      <FinalCTASection />
      <Footer />
    </div>
  );
}
