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
          setAnimationData(data);
          return;
        }
      } catch (e) {
        // Silent fallback
      }

      // Try fallback URL
      if (config.fallbackUrl) {
        try {
          const response = await fetch(config.fallbackUrl);
          if (response.ok) {
            const data = await response.json();
            setAnimationData(data);
            return;
          }
        } catch (e) {
          // Silent fallback
        }
      }

      // Use inline animation as final fallback
      setAnimationData(getLottieAnimation(occasion));
    };

    loadAnimation();
  }, [occasion]);

  useEffect(() => {
    if (showIntro && animationData) {
      // Intro animation runs for 2.5 seconds
      const timer = setTimeout(() => {
        setIsIntroPlaying(false);
        setShowMainAnimation(true);
        onIntroComplete?.();
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, [showIntro, onIntroComplete, animationData]);

  if (reducedMotion || !animationData) {
    return null;
  }

  return (
    <>
      {/* Intro burst animation - standardized size */}
      {isIntroPlaying && (
        <div className={`fixed inset-0 z-50 pointer-events-none flex items-center justify-center ${className}`}>
          <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] animate-scale-in">
            <Lottie
              animationData={animationData}
              loop={false}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      )}

      {/* Continuous background animations - evenly distributed, standardized size */}
      {showMainAnimation && (
        <div className={`fixed inset-0 z-30 pointer-events-none overflow-hidden ${className}`}>
          {/* 4 corners + center - evenly distributed */}
          <div className="absolute top-[15%] left-[10%] w-16 h-16 md:w-20 md:h-20 opacity-40 animate-float-slow">
            <Lottie animationData={animationData} loop={true} autoplay={true} />
          </div>
          <div className="absolute top-[15%] right-[10%] w-16 h-16 md:w-20 md:h-20 opacity-40 animate-float-delayed">
            <Lottie animationData={animationData} loop={true} autoplay={true} />
          </div>
          <div className="absolute bottom-[30%] left-[12%] w-14 h-14 md:w-18 md:h-18 opacity-35 animate-float-slow">
            <Lottie animationData={animationData} loop={true} autoplay={true} />
          </div>
          <div className="absolute bottom-[30%] right-[12%] w-14 h-14 md:w-18 md:h-18 opacity-35 animate-float-delayed">
            <Lottie animationData={animationData} loop={true} autoplay={true} />
          </div>
        </div>
      )}
    </>
  );
};

export default OccasionLottie;
