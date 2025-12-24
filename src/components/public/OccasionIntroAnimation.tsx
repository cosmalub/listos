import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useIntroRitual } from './IntroRitualContext';

interface OccasionIntroAnimationProps {
  occasion: string;
}

/**
 * OccasionIntroAnimation
 * 
 * A SINGLE animation that plays during the intro ritual phase.
 * 
 * Design principles:
 * - ONE burst at the start, not continuous effects
 * - Large, slow, confident movements
 * - Calm and respectful, not chaotic
 * - Completely stops when ritual ends
 * - Never distracts from music/lyrics
 */
export const OccasionIntroAnimation: React.FC<OccasionIntroAnimationProps> = ({
  occasion
}) => {
  const { isRitualActive, ritualProgress } = useIntroRitual();
  const hasPlayedRef = useRef(false);
  const [opacity, setOpacity] = useState(1);

  // Play the single intro animation once
  useEffect(() => {
    if (hasPlayedRef.current || !isRitualActive) return;
    hasPlayedRef.current = true;

    // Small delay for page to settle
    const timer = setTimeout(() => {
      playIntroAnimation(occasion);
    }, 300);

    return () => clearTimeout(timer);
  }, [occasion, isRitualActive]);

  // Fade out as ritual ends
  useEffect(() => {
    if (ritualProgress > 0.7) {
      // Start fading out in the last 30% of the ritual
      const fadeProgress = (ritualProgress - 0.7) / 0.3;
      setOpacity(1 - fadeProgress);
    }
  }, [ritualProgress]);

  // Don't render anything after ritual ends
  if (!isRitualActive) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-40 pointer-events-none"
      style={{ opacity }}
      aria-hidden="true"
    />
  );
};

/**
 * Single, elegant intro animations per occasion
 * These run ONCE and are designed to feel like a brief moment of magic
 */
const playIntroAnimation = (occasion: string) => {
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  switch (occasion) {
    case 'birthday':
    case 'congratulations':
      playWarmCelebration();
      break;
    case 'love':
      playIntimateHeart();
      break;
    case 'thanks':
      playGentleGlow();
      break;
    case 'apology':
      playSoftFade();
      break;
    case 'friendship':
      playWarmSparkle();
      break;
    default:
      playDefaultGlow();
  }
};

/**
 * Birthday / Congratulations
 * Feeling: warm joy, attention, celebration without chaos
 * Single elegant burst from center, slow falling
 */
const playWarmCelebration = () => {
  const colors = ['#FF6B9D', '#FFD700', '#9C27B0', '#4CAF50', '#00D4FF'];
  
  // One central burst - slow and graceful
  confetti({
    particleCount: 50,
    spread: 100,
    startVelocity: 25,
    origin: { x: 0.5, y: 0.45 },
    colors: colors,
    shapes: ['circle'],
    scalar: 1.8,
    gravity: 0.4,
    ticks: 300,
    drift: 0,
    decay: 0.94
  });

  // Delayed soft side accents
  setTimeout(() => {
    confetti({
      particleCount: 20,
      angle: 60,
      spread: 60,
      startVelocity: 18,
      origin: { x: 0.1, y: 0.5 },
      colors: colors,
      shapes: ['circle'],
      scalar: 1.4,
      gravity: 0.35,
      ticks: 280
    });
    confetti({
      particleCount: 20,
      angle: 120,
      spread: 60,
      startVelocity: 18,
      origin: { x: 0.9, y: 0.5 },
      colors: colors,
      shapes: ['circle'],
      scalar: 1.4,
      gravity: 0.35,
      ticks: 280
    });
  }, 400);
};

/**
 * Love / Confession
 * Feeling: intimacy, vulnerability, pause
 * Single heart-shaped burst, breathing motion
 */
const playIntimateHeart = () => {
  const colors = ['#ff006e', '#ff1744', '#f50057', '#ff4081'];
  
  // Heart shape for confetti
  const heartShape = confetti.shapeFromPath({
    path: 'M167.5,80.5c0,0-21.5-22.5-43-22.5c-21.5,0-41.5,22.5-41.5,22.5s-20-22.5-41.5-22.5S0,80.5,0,80.5s0,43,83.5,112.5C167,163,167.5,80.5,167.5,80.5z',
    matrix: [0.03, 0, 0, 0.03, -2.5, -2.5]
  });

  // Single central burst of hearts - slow and gentle
  confetti({
    particleCount: 35,
    spread: 80,
    startVelocity: 20,
    origin: { x: 0.5, y: 0.45 },
    colors: colors,
    shapes: [heartShape],
    scalar: 2.2,
    gravity: 0.45,
    ticks: 320,
    drift: 0
  });
};

/**
 * Thanks
 * Feeling: calm warmth, appreciation
 * Soft golden shimmer from center
 */
const playGentleGlow = () => {
  const colors = ['#FFD700', '#FFA500', '#FFED4E', '#FFB700'];
  
  // Star shape
  const starShape = confetti.shapeFromPath({
    path: 'M0,-15L4.5,-4.5L15,-3L7.5,3L9,15L0,9L-9,15L-7.5,3L-15,-3L-4.5,-4.5Z',
    matrix: [1, 0, 0, 1, 0, 0]
  });

  // Gentle star burst - fewer particles, slower
  confetti({
    particleCount: 30,
    spread: 70,
    startVelocity: 15,
    origin: { x: 0.5, y: 0.5 },
    colors: colors,
    shapes: [starShape, 'circle'],
    scalar: 1.5,
    gravity: 0.35,
    ticks: 350
  });
};

/**
 * Apology
 * Feeling: silence, sincerity, respect
 * Very minimal - just a soft fade effect, almost nothing
 */
const playSoftFade = () => {
  const colors = ['#a8dadc', '#81d4fa', '#b3e5fc', '#e1f5fe'];
  
  // Very subtle, almost invisible particles
  confetti({
    particleCount: 15,
    spread: 50,
    startVelocity: 8,
    origin: { x: 0.5, y: 0.5 },
    colors: colors,
    shapes: ['circle'],
    scalar: 1.0,
    gravity: 0.2,
    ticks: 400,
    drift: 0
  });
};

/**
 * Friendship
 * Feeling: shared warmth, connection
 * Gentle rainbow-tinted sparkle
 */
const playWarmSparkle = () => {
  const colors = ['#ff6b9d', '#7d5fff', '#18dcff', '#32ff7e', '#f8b500'];
  
  // Gentle mixed sparkle
  confetti({
    particleCount: 35,
    spread: 80,
    startVelocity: 18,
    origin: { x: 0.5, y: 0.5 },
    colors: colors,
    shapes: ['circle'],
    scalar: 1.4,
    gravity: 0.4,
    ticks: 300
  });
};

/**
 * Default
 * Simple, understated glow
 */
const playDefaultGlow = () => {
  const colors = ['#8b5cf6', '#ec4899', '#f59e0b'];
  
  confetti({
    particleCount: 30,
    spread: 70,
    startVelocity: 15,
    origin: { x: 0.5, y: 0.5 },
    colors: colors,
    shapes: ['circle'],
    scalar: 1.3,
    gravity: 0.4,
    ticks: 280
  });
};

export default OccasionIntroAnimation;

