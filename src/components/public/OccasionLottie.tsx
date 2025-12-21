import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { getLottieAnimation, getLottieUrl } from './lottie/lottieConfigs';

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
  const [animationData, setAnimationData] = useState<any>(null);
  const [loadingFailed, setLoadingFailed] = useState(false);

  // Check for reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Try to load animation from CDN, fallback to inline
  useEffect(() => {
    const loadAnimation = async () => {
      const config = getLottieUrl(occasion);
      
      // Try primary URL
      try {
        const response = await fetch(config.url);
        if (response.ok) {
          const data = await response.json();
          console.log('OccasionLottie: Loaded animation from CDN:', config.url);
          setAnimationData(data);
          return;
        }
      } catch (e) {
        console.log('OccasionLottie: Primary URL failed, trying fallback');
      }

      // Try fallback URL
      if (config.fallbackUrl) {
        try {
          const response = await fetch(config.fallbackUrl);
          if (response.ok) {
            const data = await response.json();
            console.log('OccasionLottie: Loaded animation from fallback CDN:', config.fallbackUrl);
            setAnimationData(data);
            return;
          }
        } catch (e) {
          console.log('OccasionLottie: Fallback URL also failed');
        }
      }

      // Use inline animation as final fallback
      console.log('OccasionLottie: Using inline animation fallback');
      setAnimationData(getLottieAnimation(occasion));
      setLoadingFailed(true);
    };

    loadAnimation();
  }, [occasion]);

  useEffect(() => {
    if (showIntro && animationData) {
      // Intro animation runs for 3 seconds (longer for visibility)
      const timer = setTimeout(() => {
        setIsIntroPlaying(false);
        setShowMainAnimation(true);
        onIntroComplete?.();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showIntro, onIntroComplete, animationData]);

  if (reducedMotion) {
    return null;
  }

  // Show nothing while loading
  if (!animationData) {
    return null;
  }

  return (
    <>
      {/* Intro burst animation - LARGE and centered */}
      {isIntroPlaying && (
        <div className={`fixed inset-0 z-50 pointer-events-none flex items-center justify-center ${className}`}>
          <div className="w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] lg:w-[650px] lg:h-[650px] animate-scale-in">
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
          <div className="absolute top-[5%] left-[5%] w-28 h-28 md:w-36 md:h-36 opacity-60 animate-float-slow">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
            />
          </div>
          <div className="absolute top-[10%] right-[10%] w-32 h-32 md:w-40 md:h-40 opacity-50 animate-float-delayed">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
            />
          </div>
          <div className="absolute bottom-[25%] left-[15%] w-24 h-24 md:w-32 md:h-32 opacity-55 animate-float-slow">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
            />
          </div>
          <div className="absolute bottom-[15%] right-[20%] w-28 h-28 md:w-36 md:h-36 opacity-45 animate-float-delayed">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
            />
          </div>
          <div className="absolute top-[40%] left-[3%] w-20 h-20 md:w-28 md:h-28 opacity-50 animate-float-slow">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
            />
          </div>
          <div className="absolute top-[35%] right-[5%] w-24 h-24 md:w-32 md:h-32 opacity-45 animate-float-delayed">
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
