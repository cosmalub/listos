import React from 'react';
import { IntroRitualProvider } from './IntroRitualContext';
import { OccasionIntroAnimation } from './OccasionIntroAnimation';
import { OccasionStaticBackground } from './OccasionStaticBackground';

interface OccasionAnimationProps {
  occasion: string;
  /** Duration of the intro ritual in milliseconds. Default: 8000ms (8 seconds) */
  ritualDuration?: number;
}

/**
 * OccasionAnimation - Main Animation Controller
 * 
 * This component orchestrates the entire animation experience:
 * 
 * 1. INTRO RITUAL PHASE (0-8 seconds):
 *    - A single, elegant animation plays
 *    - Animation is occasion-specific and emotionally appropriate
 *    - No loops, no continuous effects
 *    - Animation fades out toward the end
 * 
 * 2. STATIC PHASE (after 8 seconds):
 *    - All animations stop completely
 *    - Animation components unmount
 *    - Only the static background remains
 *    - Focus shifts to music and lyrics
 * 
 * Design Philosophy:
 * - Animation is a brief emotional ritual, not entertainment
 * - Less is more - restraint creates elegance
 * - The song is the star, animations are just the introduction
 * - After the ritual, the page should feel calm and expensive
 * 
 * Success Criteria:
 * - If sound is muted, page should feel emotionally empty
 * - Music and lyrics are always the main emotional drivers
 * - The recipient should feel: "This moment is for me"
 */
export const OccasionAnimation: React.FC<OccasionAnimationProps> = ({
  occasion,
  ritualDuration = 8000
}) => {
  // Check for reduced motion preference
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <>
      {/* Static background - always present, no animations */}
      <OccasionStaticBackground occasion={occasion} />
      
      {/* Intro ritual animation - only plays during first 8 seconds */}
      {!reducedMotion && (
        <IntroRitualProvider duration={ritualDuration}>
          <OccasionIntroAnimation occasion={occasion} />
        </IntroRitualProvider>
      )}
    </>
  );
};

export default OccasionAnimation;
