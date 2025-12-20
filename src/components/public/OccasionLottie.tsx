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
        console.log('OccasionLottie: Intro complete, transitioning to main animation');
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
    console.log('OccasionLottie: Reduced motion preference:', mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (reducedMotion) {
    console.log('OccasionLottie: Not rendering due to reduced motion preference');
    return null;
  }

  return (
    <>
      {/* Intro burst animation - LARGE and centered */}
      {isIntroPlaying && (
        <div className={`fixed inset-0 z-50 pointer-events-none flex items-center justify-center ${className}`}>
          <div className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] animate-scale-in">
            <Lottie
              animationData={animationData}
              loop={false}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      )}

      {/* Continuous background animations - scattered around screen */}
      {showMainAnimation && (
        <div className={`fixed inset-0 z-30 pointer-events-none overflow-hidden ${className}`}>
          {/* Multiple scattered Lottie animations at different positions */}
          <div className="absolute top-[5%] left-[5%] w-24 h-24 md:w-32 md:h-32 opacity-50 animate-float-slow">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
            />
          </div>
          <div className="absolute top-[10%] right-[10%] w-28 h-28 md:w-36 md:h-36 opacity-40 animate-float-delayed">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
            />
          </div>
          <div className="absolute bottom-[25%] left-[15%] w-20 h-20 md:w-28 md:h-28 opacity-45 animate-float-slow">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
            />
          </div>
          <div className="absolute bottom-[15%] right-[20%] w-24 h-24 md:w-32 md:h-32 opacity-35 animate-float-delayed">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
            />
          </div>
          <div className="absolute top-[40%] left-[3%] w-16 h-16 md:w-24 md:h-24 opacity-40 animate-float-slow">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
            />
          </div>
          <div className="absolute top-[35%] right-[5%] w-18 h-18 md:w-26 md:h-26 opacity-35 animate-float-delayed">
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