import { HeroSection } from '../components/valentine/HeroSection';
import { PainSection } from '../components/valentine/PainSection';
import { SolutionSection } from '../components/valentine/SolutionSection';
import { HowItWorksSection } from '../components/valentine/HowItWorksSection';
import { GallerySection } from '../components/valentine/GallerySection';
import { TrustSection } from '../components/valentine/TrustSection';
import { WhoIsThisForSection } from '../components/valentine/WhoIsThisForSection';
import { InsightSection } from '../components/valentine/InsightSection';
import { FinalCTASection } from '../components/valentine/FinalCTASection';
import { Footer } from '@/components/sections/footer';

export default function Valentine() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      <HeroSection />
      <PainSection />
      <SolutionSection />
      <HowItWorksSection />
      <GallerySection />
      <TrustSection />
      <WhoIsThisForSection />
      <InsightSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
