import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useIntroRitual } from './IntroRitualContext';

interface OccasionIntroAnimationProps {
  occasion: string;
}

// ============================================================
// CUSTOM SHAPES - Symbolic emotional language
// ============================================================

// Heart shape for Love - the universal symbol of love
const heartShape = confetti.shapeFromPath({
  path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  matrix: [0.05, 0, 0, 0.05, -0.6, -0.5]
});

// Teardrop shape for Apology - fragile, honest, vulnerable
const teardropShape = confetti.shapeFromPath({
  path: 'M12 2C12 2 4 10 4 14.5C4 18.64 7.58 22 12 22C16.42 22 20 18.64 20 14.5C20 10 12 2 12 2Z',
  matrix: [0.045, 0, 0, 0.055, -0.55, -0.6]
});

// Star shape for Birthday/Thanks - celebratory, warm
const starShape = confetti.shapeFromPath({
  path: 'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z',
  matrix: [0.045, 0, 0, 0.045, -0.55, -0.5]
});

// Spark/diamond shape for Thanks - warm gratitude
const sparkShape = confetti.shapeFromPath({
  path: 'M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z',
  matrix: [0.04, 0, 0, 0.04, -0.45, -0.45]
});

// Rounded square for Friendship - friendly, approachable
const roundedSquareShape = confetti.shapeFromPath({
  path: 'M4 8C4 5.79 5.79 4 8 4H16C18.21 4 20 5.79 20 8V16C20 18.21 18.21 20 16 20H8C5.79 20 4 18.21 4 16V8Z',
  matrix: [0.045, 0, 0, 0.045, -0.55, -0.55]
});

// Snowflake for Holiday
const snowflakeShape = confetti.shapeFromPath({
  path: 'M12 2V22M2 12H22M4.93 4.93L19.07 19.07M19.07 4.93L4.93 19.07',
  matrix: [0.04, 0, 0, 0.04, -0.45, -0.45]
});

/**
 * OccasionIntroAnimation - FINAL VERSION
 * 
 * EVERY occasion uses particle-based animations.
 * SHAPES are symbolic - they speak emotional language.
 * 
 * Architecture:
 * - Single full-screen canvas for all occasions
 * - Scene-based model: Core Blast + Energy Layer + Decay Layer
 * - Mobile-first: all origins centered (x:0.5, y:0.45)
 * - Peak intensity in first 3-4 seconds, beautiful decay after
 * 
 * Shape philosophy:
 * - If shape is abstract, emotion becomes abstract
 * - If shape is symbolic, emotion becomes human
 * - Fewer particles + larger size + slower motion = dignity
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
 * Shapes: circle, star, square - abstract celebratory forms
 * Feeling: Massive joy, attention, "this is YOUR moment"
 */
const playCelebrationScene = (fire: confetti.CreateTypes, duration: number) => {
  const colors = ['#FF6B9D', '#FFD700', '#9C27B0', '#4CAF50', '#00D4FF', '#FF4081'];
  const shapes = ['circle', starShape, 'square'];
  
  // === CORE BLAST (0-500ms) ===
  setTimeout(() => {
    fire({
      particleCount: 45,
      spread: 80,
      startVelocity: 35,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes,
      scalar: 2.5,
      gravity: 0.8,
      ticks: 400,
      drift: 0,
      decay: 0.92
    });
  }, 200);

  // Core blast layer 2
  setTimeout(() => {
    fire({
      particleCount: 35,
      spread: 100,
      startVelocity: 30,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes,
      scalar: 2.2,
      gravity: 0.7,
      ticks: 380,
      drift: 0,
      decay: 0.91
    });
  }, 400);

  // === ENERGY LAYER (1.5-3s) ===
  setTimeout(() => {
    fire({
      particleCount: 30,
      spread: 70,
      startVelocity: 25,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes,
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
      shapes,
      scalar: 1.8,
      gravity: 0.45,
      ticks: 320,
      drift: 0,
      decay: 0.92
    });
  }, 2800);

  // === DECAY LAYER (4-6s) ===
  if (duration >= 6000) {
    setTimeout(() => {
      fire({
        particleCount: 20,
        spread: 50,
        startVelocity: 15,
        origin: { x: 0.5, y: 0.45 },
        colors,
        shapes,
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
 * Love - HEARTS ONLY - intimate power
 * Shapes: heartShape ONLY - no circles allowed
 * Feeling: Intimate power, heartfelt, romantic
 * Reduced count, increased size, slow velocity
 */
const playLoveScene = (fire: confetti.CreateTypes, duration: number) => {
  const colors = ['#FF006E', '#FF1744', '#F50057', '#FF4081', '#E91E63', '#FF80AB'];
  const shapes = [heartShape]; // HEARTS ONLY
  
  // === CORE BLAST - Fewer but LARGER hearts ===
  setTimeout(() => {
    fire({
      particleCount: 18, // Reduced for dignity
      spread: 70,
      startVelocity: 16, // Slower
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes,
      scalar: 3.5, // VERY LARGE hearts
      gravity: 0.35,
      ticks: 500,
      drift: 0,
      decay: 0.95
    });
  }, 300);

  // Second pulse - expanding love
  setTimeout(() => {
    fire({
      particleCount: 14, // Reduced
      spread: 90,
      startVelocity: 12, // Slower
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes,
      scalar: 3.2,
      gravity: 0.3,
      ticks: 480,
      drift: 0,
      decay: 0.94
    });
  }, 1200);

  // === DECAY - Long, beautiful fall ===
  if (duration >= 5000) {
    setTimeout(() => {
      fire({
        particleCount: 10, // Very few
        spread: 60,
        startVelocity: 10, // Very slow
        origin: { x: 0.5, y: 0.45 },
        colors,
        shapes,
        scalar: 2.8,
        gravity: 0.2,
        ticks: 550,
        drift: 0,
        decay: 0.96
      });
    }, 3500);
  }
};

/**
 * Thanks - WARM GOLDEN STARS & SPARKS
 * Shapes: starShape, sparkShape - warm gratitude symbols
 * Feeling: Gratitude, warmth, golden shimmer
 * No basic circles - only meaningful shapes
 */
const playThanksScene = (fire: confetti.CreateTypes, duration: number) => {
  const colors = ['#FFD700', '#FFA500', '#FFED4E', '#FFB700', '#FF8C00', '#FFC107'];
  const shapes = [starShape, sparkShape]; // Warm symbolic shapes
  
  // === CORE BLAST - Warm explosion ===
  setTimeout(() => {
    fire({
      particleCount: 28,
      spread: 75,
      startVelocity: 22,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes,
      scalar: 2.6,
      gravity: 0.5,
      ticks: 400,
      drift: 0,
      decay: 0.93
    });
  }, 250);

  // Energy layer
  setTimeout(() => {
    fire({
      particleCount: 22,
      spread: 65,
      startVelocity: 18,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes,
      scalar: 2.2,
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
        particleCount: 16,
        spread: 55,
        startVelocity: 14,
        origin: { x: 0.5, y: 0.45 },
        colors,
        shapes,
        scalar: 1.9,
        gravity: 0.3,
        ticks: 450,
        drift: 0,
        decay: 0.94
      });
    }, 3200);
  }
};

/**
 * Apology - TEARDROPS - fragile honesty
 * Shapes: teardropShape ONLY - fragile, vulnerable, honest
 * Feeling: Sincerity, vulnerability, gentle presence
 * Very few particles, slow movement, must feel fragile not decorative
 */
const playApologyScene = (fire: confetti.CreateTypes, duration: number) => {
  const colors = ['#81D4FA', '#4FC3F7', '#29B6F6', '#B3E5FC', '#E1F5FE', '#80DEEA'];
  const shapes = [teardropShape]; // TEARDROPS ONLY - fragile and honest
  
  // === SINGLE GENTLE BURST - fragile, not decorative ===
  setTimeout(() => {
    fire({
      particleCount: 12, // Very few - dignified
      spread: 55,
      startVelocity: 10, // Very slow
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes,
      scalar: 2.8, // Large so they're meaningful
      gravity: 0.2,
      ticks: 550, // Long life - contemplative
      drift: 0,
      decay: 0.97 // Very slow decay - lingering
    });
  }, 400);

  // Second gentle wave - quiet presence
  if (duration >= 4000) {
    setTimeout(() => {
      fire({
        particleCount: 8, // Even fewer
        spread: 45,
        startVelocity: 8, // Very slow
        origin: { x: 0.5, y: 0.45 },
        colors,
        shapes,
        scalar: 2.5,
        gravity: 0.15,
        ticks: 600, // Very long life
        drift: 0,
        decay: 0.98 // Almost no decay
      });
    }, 2500);
  }
};

/**
 * Friendship - CIRCLES & ROUNDED SQUARES
 * Shapes: circle, roundedSquareShape - friendly, approachable
 * Feeling: Energy, joy, rainbow connection
 * Lively but friendly shapes
 */
const playFriendshipScene = (fire: confetti.CreateTypes, duration: number) => {
  const colors = ['#FF6B9D', '#7D5FFF', '#18DCFF', '#32FF7E', '#F8B500', '#FF4081'];
  const shapes = ['circle', roundedSquareShape]; // Friendly shapes
  
  // === CORE BLAST - Energetic ===
  setTimeout(() => {
    fire({
      particleCount: 35,
      spread: 80,
      startVelocity: 28,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes,
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
      shapes,
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
        shapes,
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
 * Shapes: snowflakeShape, starShape, circle - festive mix
 * Feeling: Celebration, festive, magical
 */
const playHolidayScene = (fire: confetti.CreateTypes, duration: number) => {
  const colors = ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#FFD700', '#FFC107'];
  const shapes = [snowflakeShape, starShape, 'circle']; // Festive mix
  
  // Core blast
  setTimeout(() => {
    fire({
      particleCount: 40,
      spread: 85,
      startVelocity: 30,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes,
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
      shapes,
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
        shapes,
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

