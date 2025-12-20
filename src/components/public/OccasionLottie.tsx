import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { getLottieAnimation } from './lottie/lottieConfigs';

interface OccasionLottieProps {
  occasion: string;
  showIntro?: boolean;
  onIntroComplete?: () => void;
  className?: string;
}

export const OccasionLottie: React.FC<OccasionLottieProps> = ({
  occasion,
  showIntro = true,
  onIntroComplete,
  className = ""
}) => {
  const [isIntroPlaying, setIsIntroPlaying] = useState(showIntro);
  const [showMainAnimation, setShowMainAnimation] = useState(!showIntro);

  console.log('OccasionLottie: Rendering for occasion:', occasion, 'showIntro:', showIntro, 'isIntroPlaying:', isIntroPlaying);

  useEffect(() => {
    if (showIntro) {
      console.log('OccasionLottie: Starting intro animation for', occasion);
      // Play intro animation for 2.5 seconds
      const timer = setTimeout(() => {
        console.log('OccasionLottie: Intro complete, showing main animation');
        setIsIntroPlaying(false);
        setShowMainAnimation(true);
        onIntroComplete?.();
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, [showIntro, onIntroComplete, occasion]);

  const animationData = getLottieAnimation(occasion);

  // Check for reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (reducedMotion) {
    return null;
  }

  return (
    <>
      {/* Intro burst animation */}
      {isIntroPlaying && (
        <div className={`fixed inset-0 z-50 pointer-events-none flex items-center justify-center ${className}`}>
          <div className="w-80 h-80 md:w-96 md:h-96 animate-scale-in">
            <Lottie
              animationData={animationData}
              loop={false}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      )}

      {/* Continuous background animations */}
      {showMainAnimation && (
        <div className={`fixed inset-0 z-30 pointer-events-none overflow-hidden ${className}`}>
          {/* Multiple scattered Lottie animations */}
          <div className="absolute top-10 left-10 w-16 h-16 opacity-40 animate-float-slow">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
            />
          </div>
          <div className="absolute top-20 right-20 w-20 h-20 opacity-30 animate-float-delayed">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
            />
          </div>
          <div className="absolute bottom-32 left-1/4 w-14 h-14 opacity-35 animate-float-slow">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
            />
          </div>
          <div className="absolute bottom-20 right-1/3 w-18 h-18 opacity-25 animate-float-delayed">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default OccasionLottie;
