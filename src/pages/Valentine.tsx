import { HeroSection } from '../components/valentine/HeroSection';
import { PainSection } from '../components/valentine/PainSection';
import { SolutionSection } from '../components/valentine/SolutionSection';
import { HowItWorksSection } from '../components/valentine/HowItWorksSection';
import { GallerySection } from '../components/valentine/GallerySection';
import { TrustSection } from '../components/valentine/TrustSection';
import { WhoIsThisForSection } from '../components/valentine/WhoIsThisForSection';
import { InsightSection } from '../components/valentine/InsightSection';
import { FinalCTASection } from '../components/valentine/FinalCTASection';

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

      {/* Footer */}
      <footer className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500">
          <p>© 2024 Листосик. Зроблено з любов'ю.</p>
        </div>
      </footer>
    </div>
  );
}
