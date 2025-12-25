import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useIntroRitual } from './IntroRitualContext';

interface OccasionIntroAnimationProps {
  occasion: string;
}

/**
 * OccasionIntroAnimation - FINAL VERSION
 * 
 * EVERY occasion uses particle-based animations.
 * No glow-only effects. All animations are MASSIVE and BEAUTIFUL.
 * 
 * Architecture:
 * - Single full-screen canvas for all occasions
 * - Scene-based model: Core Blast + Energy Layer + Decay Layer
 * - Mobile-first: all origins centered (x:0.5, y:0.45)
 * - Peak intensity in first 3-4 seconds, beautiful decay after
 * 
 * Success criteria: User reaction = "Охуенно"
 */
export const OccasionIntroAnimation: React.FC<OccasionIntroAnimationProps> = ({
  occasion
}) => {
  const { isRitualActive, ritualDuration } = useIntroRitual();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiInstanceRef = useRef<confetti.CreateTypes | null>(null);
  const hasPlayedRef = useRef(false);

  // Create and manage single canvas for ALL occasions
  useEffect(() => {
    if (!isRitualActive) return;

    // Create dedicated full-screen canvas
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:50;';
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    // Create confetti instance with resize and worker
    confettiInstanceRef.current = confetti.create(canvas, {
      resize: true,
      useWorker: true
    });

    return () => {
      // Clean up canvas and confetti instance
      if (confettiInstanceRef.current) {
        confettiInstanceRef.current.reset();
        confettiInstanceRef.current = null;
      }
      if (canvasRef.current && canvasRef.current.parentNode) {
        canvasRef.current.parentNode.removeChild(canvasRef.current);
        canvasRef.current = null;
      }
    };
  }, [isRitualActive]);

  // Play particle animation for ANY occasion
  useEffect(() => {
    if (hasPlayedRef.current || !isRitualActive || !confettiInstanceRef.current) return;
    hasPlayedRef.current = true;

    const fire = confettiInstanceRef.current;
    
    switch (occasion) {
      case 'birthday':
      case 'congratulations':
        playCelebrationScene(fire, ritualDuration);
        break;
      case 'love':
        playLoveScene(fire, ritualDuration);
        break;
      case 'thanks':
        playThanksScene(fire, ritualDuration);
        break;
      case 'apology':
        playApologyScene(fire, ritualDuration);
        break;
      case 'friendship':
        playFriendshipScene(fire, ritualDuration);
        break;
      case 'holiday':
        playHolidayScene(fire, ritualDuration);
        break;
      default:
        playDefaultScene(fire, ritualDuration);
    }
  }, [occasion, isRitualActive, ritualDuration]);

  // Canvas handles all rendering - no JSX needed
  return null;
};

// ============================================================
// SCENE ANIMATIONS - Every occasion has PARTICLES
// ============================================================

/**
 * Birthday / Congratulations - CINEMATIC CELEBRATION
 * Feeling: Massive joy, attention, "this is YOUR moment"
 * 3 waves: Core Blast → Energy Layer → Decay Layer
 */
const playCelebrationScene = (fire: confetti.CreateTypes, duration: number) => {
  const colors = ['#FF6B9D', '#FFD700', '#9C27B0', '#4CAF50', '#00D4FF', '#FF4081'];
  
  // === CORE BLAST (0-500ms) ===
  // Massive initial explosion
  setTimeout(() => {
    fire({
      particleCount: 45,
      spread: 80,
      startVelocity: 35,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes: ['circle'],
      scalar: 2.5,
      gravity: 0.8,
      ticks: 400,
      drift: 0,
      decay: 0.92
    });
  }, 200);

  // Core blast layer 2 - slightly delayed
  setTimeout(() => {
    fire({
      particleCount: 35,
      spread: 100,
      startVelocity: 30,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes: ['circle'],
      scalar: 2.2,
      gravity: 0.7,
      ticks: 380,
      drift: 0,
      decay: 0.91
    });
  }, 400);

  // === ENERGY LAYER (1.5-3s) ===
  // Sustained beautiful particles
  setTimeout(() => {
    fire({
      particleCount: 30,
      spread: 70,
      startVelocity: 25,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes: ['circle'],
      scalar: 2.0,
      gravity: 0.5,
      ticks: 350,
      drift: 0,
      decay: 0.93
    });
  }, 1800);

  setTimeout(() => {
    fire({
      particleCount: 25,
      spread: 60,
      startVelocity: 22,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes: ['circle'],
      scalar: 1.8,
      gravity: 0.45,
      ticks: 320,
      drift: 0,
      decay: 0.92
    });
  }, 2800);

  // === DECAY LAYER (4-6s) ===
  // Slow, lingering particles
  if (duration >= 6000) {
    setTimeout(() => {
      fire({
        particleCount: 20,
        spread: 50,
        startVelocity: 15,
        origin: { x: 0.5, y: 0.45 },
        colors,
        shapes: ['circle'],
        scalar: 1.6,
        gravity: 0.3,
        ticks: 400,
        drift: 0,
        decay: 0.94
      });
    }, 4500);
  }
};

/**
 * Love - POWERFUL ENERGY EXPANDING FROM CENTER
 * Feeling: Intimate power, heartfelt, romantic explosion
 * Large particles, slow velocity, deep reds and pinks
 */
const playLoveScene = (fire: confetti.CreateTypes, duration: number) => {
  const colors = ['#FF006E', '#FF1744', '#F50057', '#FF4081', '#E91E63', '#FF80AB'];
  
  // === CORE BLAST - Powerful but intimate ===
  setTimeout(() => {
    fire({
      particleCount: 25,
      spread: 70,
      startVelocity: 20,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes: ['circle'],
      scalar: 3.0, // VERY LARGE particles
      gravity: 0.4,
      ticks: 450,
      drift: 0,
      decay: 0.94
    });
  }, 300);

  // Second pulse - expanding energy
  setTimeout(() => {
    fire({
      particleCount: 20,
      spread: 90,
      startVelocity: 15,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes: ['circle'],
      scalar: 2.8,
      gravity: 0.35,
      ticks: 420,
      drift: 0,
      decay: 0.93
    });
  }, 1200);

  // === DECAY - Long, beautiful fall ===
  if (duration >= 5000) {
    setTimeout(() => {
      fire({
        particleCount: 15,
        spread: 60,
        startVelocity: 12,
        origin: { x: 0.5, y: 0.45 },
        colors,
        shapes: ['circle'],
        scalar: 2.4,
        gravity: 0.25,
        ticks: 500,
        drift: 0,
        decay: 0.95
      });
    }, 3500);
  }
};

/**
 * Thanks - WARM GOLDEN RICHNESS
 * Feeling: Gratitude, warmth, golden glow
 * Medium particles, warm colors, satisfying presence
 */
const playThanksScene = (fire: confetti.CreateTypes, duration: number) => {
  const colors = ['#FFD700', '#FFA500', '#FFED4E', '#FFB700', '#FF8C00', '#FFC107'];
  
  // === CORE BLAST - Warm explosion ===
  setTimeout(() => {
    fire({
      particleCount: 30,
      spread: 75,
      startVelocity: 22,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes: ['circle'],
      scalar: 2.4,
      gravity: 0.5,
      ticks: 400,
      drift: 0,
      decay: 0.93
    });
  }, 250);

  // Energy layer
  setTimeout(() => {
    fire({
      particleCount: 25,
      spread: 65,
      startVelocity: 18,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes: ['circle'],
      scalar: 2.0,
      gravity: 0.4,
      ticks: 380,
      drift: 0,
      decay: 0.92
    });
  }, 1500);

  // === DECAY - Golden shimmer ===
  if (duration >= 5000) {
    setTimeout(() => {
      fire({
        particleCount: 18,
        spread: 55,
        startVelocity: 14,
        origin: { x: 0.5, y: 0.45 },
        colors,
        shapes: ['circle'],
        scalar: 1.8,
        gravity: 0.3,
        ticks: 450,
        drift: 0,
        decay: 0.94
      });
    }, 3200);
  }
};

/**
 * Apology - QUIET BUT PRESENT
 * Feeling: Sincerity, honesty, gentle presence
 * Few particles but VISIBLE, soft blues, slow and dignified
 */
const playApologyScene = (fire: confetti.CreateTypes, duration: number) => {
  const colors = ['#81D4FA', '#4FC3F7', '#29B6F6', '#B3E5FC', '#E1F5FE', '#80DEEA'];
  
  // === SINGLE GENTLE BURST ===
  // Not empty, but respectful
  setTimeout(() => {
    fire({
      particleCount: 18,
      spread: 60,
      startVelocity: 12,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes: ['circle'],
      scalar: 2.2, // Large so they're visible
      gravity: 0.25,
      ticks: 500, // Long life
      drift: 0,
      decay: 0.96 // Very slow decay
    });
  }, 400);

  // Second gentle wave - quiet presence
  if (duration >= 4000) {
    setTimeout(() => {
      fire({
        particleCount: 12,
        spread: 50,
        startVelocity: 10,
        origin: { x: 0.5, y: 0.45 },
        colors,
        shapes: ['circle'],
        scalar: 2.0,
        gravity: 0.2,
        ticks: 550,
        drift: 0,
        decay: 0.97
      });
    }, 2500);
  }
};

/**
 * Friendship - CONNECTION AND MOVEMENT
 * Feeling: Energy, joy, rainbow connection
 * Medium-high particles, lively velocity, rainbow colors
 */
const playFriendshipScene = (fire: confetti.CreateTypes, duration: number) => {
  const colors = ['#FF6B9D', '#7D5FFF', '#18DCFF', '#32FF7E', '#F8B500', '#FF4081'];
  
  // === CORE BLAST - Energetic ===
  setTimeout(() => {
    fire({
      particleCount: 35,
      spread: 80,
      startVelocity: 28,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes: ['circle'],
      scalar: 2.2,
      gravity: 0.6,
      ticks: 380,
      drift: 0,
      decay: 0.92
    });
  }, 250);

  // Energy layer - lively
  setTimeout(() => {
    fire({
      particleCount: 28,
      spread: 70,
      startVelocity: 24,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes: ['circle'],
      scalar: 1.9,
      gravity: 0.5,
      ticks: 350,
      drift: 0,
      decay: 0.91
    });
  }, 1600);

  // === DECAY - Rainbow lingering ===
  if (duration >= 5000) {
    setTimeout(() => {
      fire({
        particleCount: 20,
        spread: 60,
        startVelocity: 18,
        origin: { x: 0.5, y: 0.45 },
        colors,
        shapes: ['circle'],
        scalar: 1.6,
        gravity: 0.35,
        ticks: 400,
        drift: 0,
        decay: 0.93
      });
    }, 3400);
  }
};

/**
 * Holiday - FESTIVE WINTER MAGIC
 * Feeling: Celebration, festive, magical
 */
const playHolidayScene = (fire: confetti.CreateTypes, duration: number) => {
  const colors = ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#FFD700', '#FFC107'];
  
  // Core blast
  setTimeout(() => {
    fire({
      particleCount: 40,
      spread: 85,
      startVelocity: 30,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes: ['circle'],
      scalar: 2.3,
      gravity: 0.6,
      ticks: 400,
      drift: 0,
      decay: 0.92
    });
  }, 200);

  // Energy layer
  setTimeout(() => {
    fire({
      particleCount: 30,
      spread: 70,
      startVelocity: 25,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes: ['circle'],
      scalar: 2.0,
      gravity: 0.5,
      ticks: 380,
      drift: 0,
      decay: 0.93
    });
  }, 1800);

  // Decay
  if (duration >= 5000) {
    setTimeout(() => {
      fire({
        particleCount: 22,
        spread: 55,
        startVelocity: 16,
        origin: { x: 0.5, y: 0.45 },
        colors,
        shapes: ['circle'],
        scalar: 1.7,
        gravity: 0.35,
        ticks: 450,
        drift: 0,
        decay: 0.94
      });
    }, 3500);
  }
};

/**
 * Default - ELEGANT UNIVERSAL
 * For any unknown occasion - still beautiful!
 */
const playDefaultScene = (fire: confetti.CreateTypes, duration: number) => {
  const colors = ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6'];
  
  // Core blast
  setTimeout(() => {
    fire({
      particleCount: 35,
      spread: 75,
      startVelocity: 25,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes: ['circle'],
      scalar: 2.2,
      gravity: 0.55,
      ticks: 380,
      drift: 0,
      decay: 0.92
    });
  }, 250);

  // Energy layer
  setTimeout(() => {
    fire({
      particleCount: 28,
      spread: 65,
      startVelocity: 20,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes: ['circle'],
      scalar: 1.9,
      gravity: 0.45,
      ticks: 350,
      drift: 0,
      decay: 0.93
    });
  }, 1700);

  // Decay
  if (duration >= 5000) {
    setTimeout(() => {
      fire({
        particleCount: 20,
        spread: 55,
        startVelocity: 15,
        origin: { x: 0.5, y: 0.45 },
        colors,
        shapes: ['circle'],
        scalar: 1.6,
        gravity: 0.3,
        ticks: 420,
        drift: 0,
        decay: 0.94
      });
    }, 3300);
  }
};

export default OccasionIntroAnimation;

