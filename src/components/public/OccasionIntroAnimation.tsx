import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useIntroRitual } from './IntroRitualContext';

interface OccasionIntroAnimationProps {
  occasion: string;
}

// ============================================================
// CUSTOM SHAPES - Symbolic emotional language
// ============================================================

// Heart shape for Love - the universal symbol of love (LARGER - 18% scale)
const heartShape = confetti.shapeFromPath({
  path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  matrix: [0.18, 0, 0, 0.18, -2.2, -2.0]
});

// Teardrop shape for Apology - fragile, honest, vulnerable (LARGER)
const teardropShape = confetti.shapeFromPath({
  path: 'M12 2C12 2 4 10 4 14.5C4 18.64 7.58 22 12 22C16.42 22 20 18.64 20 14.5C20 10 12 2 12 2Z',
  matrix: [0.16, 0, 0, 0.19, -1.9, -2.1]
});

// Star shape for Birthday/Thanks - celebratory, warm (LARGER)
const starShape = confetti.shapeFromPath({
  path: 'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z',
  matrix: [0.16, 0, 0, 0.16, -1.9, -1.8]
});

// Spark/diamond shape for Thanks - warm gratitude (LARGER)
const sparkShape = confetti.shapeFromPath({
  path: 'M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z',
  matrix: [0.14, 0, 0, 0.14, -1.7, -1.7]
});

// Rounded square for Friendship - friendly, approachable (LARGER)
const roundedSquareShape = confetti.shapeFromPath({
  path: 'M4 8C4 5.79 5.79 4 8 4H16C18.21 4 20 5.79 20 8V16C20 18.21 18.21 20 16 20H8C5.79 20 4 18.21 4 16V8Z',
  matrix: [0.16, 0, 0, 0.16, -1.9, -1.9]
});

// Snowflake for Holiday (LARGER)
const snowflakeShape = confetti.shapeFromPath({
  path: 'M12 2V22M2 12H22M4.93 4.93L19.07 19.07M19.07 4.93L4.93 19.07',
  matrix: [0.14, 0, 0, 0.14, -1.7, -1.7]
});

// ============================================================
// ADAPTIVE PARAMETERS - Mobile-first responsive
// ============================================================
const getAdaptiveParams = () => {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  
  return {
    // Larger particles on mobile for visibility
    scalarMultiplier: isMobile ? 1.4 : isTablet ? 1.2 : 1.0,
    // Fewer particles on mobile for performance
    particleMultiplier: isMobile ? 0.7 : isTablet ? 0.85 : 1.0,
    // Slower on mobile for better visibility
    velocityMultiplier: isMobile ? 0.8 : isTablet ? 0.9 : 1.0,
  };
};

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
  const { scalarMultiplier, particleMultiplier, velocityMultiplier } = getAdaptiveParams();
  
  // === WAVE 1: Big explosion (0.2s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(50 * particleMultiplier),
      spread: 90,
      startVelocity: 38 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 3.0 * scalarMultiplier,
      gravity: 0.7,
      ticks: 450,
      drift: 0,
      decay: 0.93
    });
  }, 200);

  // === WAVE 2: Second burst (0.6s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(40 * particleMultiplier),
      spread: 110,
      startVelocity: 32 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 2.6 * scalarMultiplier,
      gravity: 0.6,
      ticks: 420,
      drift: 0,
      decay: 0.92
    });
  }, 600);

  // === WAVE 3: Energy (1.8s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(35 * particleMultiplier),
      spread: 80,
      startVelocity: 28 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 2.3 * scalarMultiplier,
      gravity: 0.5,
      ticks: 400,
      drift: 0,
      decay: 0.93
    });
  }, 1800);

  // === WAVE 4: Continuing (3.2s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(28 * particleMultiplier),
      spread: 70,
      startVelocity: 24 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 2.0 * scalarMultiplier,
      gravity: 0.4,
      ticks: 380,
      drift: 0,
      decay: 0.93
    });
  }, 3200);

  // === WAVE 5: Soft decay (5s) ===
  if (duration >= 8000) {
    setTimeout(() => {
      fire({
        particleCount: Math.round(22 * particleMultiplier),
        spread: 60,
        startVelocity: 18 * velocityMultiplier,
        origin: { x: 0.5, y: 0.4 },
        colors,
        shapes,
        scalar: 1.8 * scalarMultiplier,
        gravity: 0.3,
        ticks: 450,
        drift: 0,
        decay: 0.94
      });
    }, 5000);
  }

  // === WAVE 6: Final sparkles (7s) ===
  if (duration >= 10000) {
    setTimeout(() => {
      fire({
        particleCount: Math.round(15 * particleMultiplier),
        spread: 50,
        startVelocity: 14 * velocityMultiplier,
        origin: { x: 0.5, y: 0.4 },
        colors,
        shapes,
        scalar: 1.5 * scalarMultiplier,
        gravity: 0.25,
        ticks: 500,
        drift: 0,
        decay: 0.95
      });
    }, 7000);
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
  const { scalarMultiplier, particleMultiplier, velocityMultiplier } = getAdaptiveParams();
  
  // === WAVE 1: Initial burst (0.3s) - Big romantic hearts ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(25 * particleMultiplier),
      spread: 90,
      startVelocity: 20 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 4.5 * scalarMultiplier,
      gravity: 0.25,
      ticks: 600,
      drift: 0,
      decay: 0.96
    });
  }, 300);

  // === WAVE 2: Expanding love (1.5s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(20 * particleMultiplier),
      spread: 100,
      startVelocity: 18 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 4.0 * scalarMultiplier,
      gravity: 0.2,
      ticks: 580,
      drift: 0,
      decay: 0.95
    });
  }, 1500);

  // === WAVE 3: Continuing romance (3s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(18 * particleMultiplier),
      spread: 85,
      startVelocity: 15 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 3.5 * scalarMultiplier,
      gravity: 0.18,
      ticks: 560,
      drift: 0,
      decay: 0.95
    });
  }, 3000);

  // === WAVE 4: Gentle decay (4.5s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(14 * particleMultiplier),
      spread: 70,
      startVelocity: 12 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 3.2 * scalarMultiplier,
      gravity: 0.15,
      ticks: 650,
      drift: 0,
      decay: 0.96
    });
  }, 4500);

  // === WAVE 5: Soft ending (6.5s) ===
  if (duration >= 8000) {
    setTimeout(() => {
      fire({
        particleCount: Math.round(10 * particleMultiplier),
        spread: 55,
        startVelocity: 10 * velocityMultiplier,
        origin: { x: 0.5, y: 0.4 },
        colors,
        shapes,
        scalar: 2.8 * scalarMultiplier,
        gravity: 0.12,
        ticks: 700,
        drift: 0,
        decay: 0.97
      });
    }, 6500);
  }

  // === WAVE 6: Final whisper (8s) ===
  if (duration >= 10000) {
    setTimeout(() => {
      fire({
        particleCount: Math.round(6 * particleMultiplier),
        spread: 45,
        startVelocity: 8 * velocityMultiplier,
        origin: { x: 0.5, y: 0.4 },
        colors,
        shapes,
        scalar: 2.5 * scalarMultiplier,
        gravity: 0.1,
        ticks: 750,
        drift: 0,
        decay: 0.98
      });
    }, 8000);
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
  const shapes = [starShape, sparkShape];
  const { scalarMultiplier, particleMultiplier, velocityMultiplier } = getAdaptiveParams();
  
  // === WAVE 1: Warm burst (0.25s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(35 * particleMultiplier),
      spread: 85,
      startVelocity: 26 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 3.2 * scalarMultiplier,
      gravity: 0.45,
      ticks: 480,
      drift: 0,
      decay: 0.94
    });
  }, 250);

  // === WAVE 2: Golden shimmer (1.5s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(28 * particleMultiplier),
      spread: 75,
      startVelocity: 22 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 2.8 * scalarMultiplier,
      gravity: 0.38,
      ticks: 450,
      drift: 0,
      decay: 0.93
    });
  }, 1500);

  // === WAVE 3: Continuing warmth (3s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(22 * particleMultiplier),
      spread: 65,
      startVelocity: 18 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 2.4 * scalarMultiplier,
      gravity: 0.3,
      ticks: 500,
      drift: 0,
      decay: 0.94
    });
  }, 3000);

  // === WAVE 4: Soft glow (5s) ===
  if (duration >= 8000) {
    setTimeout(() => {
      fire({
        particleCount: Math.round(16 * particleMultiplier),
        spread: 55,
        startVelocity: 14 * velocityMultiplier,
        origin: { x: 0.5, y: 0.4 },
        colors,
        shapes,
        scalar: 2.0 * scalarMultiplier,
        gravity: 0.25,
        ticks: 550,
        drift: 0,
        decay: 0.95
      });
    }, 5000);
  }

  // === WAVE 5: Final sparkle (7s) ===
  if (duration >= 10000) {
    setTimeout(() => {
      fire({
        particleCount: Math.round(10 * particleMultiplier),
        spread: 45,
        startVelocity: 10 * velocityMultiplier,
        origin: { x: 0.5, y: 0.4 },
        colors,
        shapes,
        scalar: 1.7 * scalarMultiplier,
        gravity: 0.2,
        ticks: 600,
        drift: 0,
        decay: 0.96
      });
    }, 7000);
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
  const shapes = [teardropShape];
  const { scalarMultiplier, particleMultiplier, velocityMultiplier } = getAdaptiveParams();
  
  // === WAVE 1: Gentle burst (0.4s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(15 * particleMultiplier),
      spread: 60,
      startVelocity: 12 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 3.5 * scalarMultiplier,
      gravity: 0.18,
      ticks: 650,
      drift: 0,
      decay: 0.97
    });
  }, 400);

  // === WAVE 2: Quiet presence (2.5s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(12 * particleMultiplier),
      spread: 50,
      startVelocity: 10 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 3.0 * scalarMultiplier,
      gravity: 0.15,
      ticks: 700,
      drift: 0,
      decay: 0.97
    });
  }, 2500);

  // === WAVE 3: Contemplative (4.5s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(10 * particleMultiplier),
      spread: 45,
      startVelocity: 8 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 2.6 * scalarMultiplier,
      gravity: 0.12,
      ticks: 750,
      drift: 0,
      decay: 0.98
    });
  }, 4500);

  // === WAVE 4: Lingering (6.5s) ===
  if (duration >= 8000) {
    setTimeout(() => {
      fire({
        particleCount: Math.round(8 * particleMultiplier),
        spread: 40,
        startVelocity: 6 * velocityMultiplier,
        origin: { x: 0.5, y: 0.4 },
        colors,
        shapes,
        scalar: 2.3 * scalarMultiplier,
        gravity: 0.1,
        ticks: 800,
        drift: 0,
        decay: 0.98
      });
    }, 6500);
  }

  // === WAVE 5: Final silence (8.5s) ===
  if (duration >= 10000) {
    setTimeout(() => {
      fire({
        particleCount: Math.round(5 * particleMultiplier),
        spread: 35,
        startVelocity: 5 * velocityMultiplier,
        origin: { x: 0.5, y: 0.4 },
        colors,
        shapes,
        scalar: 2.0 * scalarMultiplier,
        gravity: 0.08,
        ticks: 850,
        drift: 0,
        decay: 0.99
      });
    }, 8500);
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
  const shapes = ['circle', roundedSquareShape];
  const { scalarMultiplier, particleMultiplier, velocityMultiplier } = getAdaptiveParams();
  
  // === WAVE 1: Energetic burst (0.25s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(42 * particleMultiplier),
      spread: 95,
      startVelocity: 32 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 2.8 * scalarMultiplier,
      gravity: 0.55,
      ticks: 420,
      drift: 0,
      decay: 0.93
    });
  }, 250);

  // === WAVE 2: Rainbow explosion (1.2s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(35 * particleMultiplier),
      spread: 85,
      startVelocity: 28 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 2.4 * scalarMultiplier,
      gravity: 0.48,
      ticks: 400,
      drift: 0,
      decay: 0.92
    });
  }, 1200);

  // === WAVE 3: Lively energy (2.5s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(28 * particleMultiplier),
      spread: 75,
      startVelocity: 24 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 2.1 * scalarMultiplier,
      gravity: 0.4,
      ticks: 380,
      drift: 0,
      decay: 0.93
    });
  }, 2500);

  // === WAVE 4: Continuing joy (4s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(22 * particleMultiplier),
      spread: 65,
      startVelocity: 20 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 1.8 * scalarMultiplier,
      gravity: 0.35,
      ticks: 420,
      drift: 0,
      decay: 0.93
    });
  }, 4000);

  // === WAVE 5: Soft rainbow (6s) ===
  if (duration >= 8000) {
    setTimeout(() => {
      fire({
        particleCount: Math.round(16 * particleMultiplier),
        spread: 55,
        startVelocity: 16 * velocityMultiplier,
        origin: { x: 0.5, y: 0.4 },
        colors,
        shapes,
        scalar: 1.5 * scalarMultiplier,
        gravity: 0.28,
        ticks: 450,
        drift: 0,
        decay: 0.94
      });
    }, 6000);
  }

  // === WAVE 6: Final sparkles (8s) ===
  if (duration >= 10000) {
    setTimeout(() => {
      fire({
        particleCount: Math.round(10 * particleMultiplier),
        spread: 45,
        startVelocity: 12 * velocityMultiplier,
        origin: { x: 0.5, y: 0.4 },
        colors,
        shapes,
        scalar: 1.3 * scalarMultiplier,
        gravity: 0.22,
        ticks: 480,
        drift: 0,
        decay: 0.95
      });
    }, 8000);
  }
};

/**
 * Holiday - FESTIVE WINTER MAGIC
 * Shapes: snowflakeShape, starShape, circle - festive mix
 * Feeling: Celebration, festive, magical
 */
const playHolidayScene = (fire: confetti.CreateTypes, duration: number) => {
  const colors = ['#FFD700', '#FFC107', '#FF9800', '#E91E63', '#9C27B0', '#4CAF50', '#00BCD4'];
  const shapes = [starShape, sparkShape, 'circle'];
  const { scalarMultiplier, particleMultiplier, velocityMultiplier } = getAdaptiveParams();
  
  // === WAVE 1: Festive explosion (0.2s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(45 * particleMultiplier),
      spread: 100,
      startVelocity: 35 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 2.8 * scalarMultiplier,
      gravity: 0.55,
      ticks: 450,
      drift: 0,
      decay: 0.93
    });
  }, 200);

  // === WAVE 2: Magical burst (0.8s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(38 * particleMultiplier),
      spread: 90,
      startVelocity: 30 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 2.5 * scalarMultiplier,
      gravity: 0.48,
      ticks: 420,
      drift: 0,
      decay: 0.92
    });
  }, 800);

  // === WAVE 3: Celebration (2s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(32 * particleMultiplier),
      spread: 80,
      startVelocity: 26 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 2.2 * scalarMultiplier,
      gravity: 0.42,
      ticks: 400,
      drift: 0,
      decay: 0.93
    });
  }, 2000);

  // === WAVE 4: Festive glow (3.5s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(25 * particleMultiplier),
      spread: 70,
      startVelocity: 22 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 1.9 * scalarMultiplier,
      gravity: 0.35,
      ticks: 430,
      drift: 0,
      decay: 0.93
    });
  }, 3500);

  // === WAVE 5: Magic sparkles (5.5s) ===
  if (duration >= 8000) {
    setTimeout(() => {
      fire({
        particleCount: Math.round(18 * particleMultiplier),
        spread: 60,
        startVelocity: 18 * velocityMultiplier,
        origin: { x: 0.5, y: 0.4 },
        colors,
        shapes,
        scalar: 1.6 * scalarMultiplier,
        gravity: 0.28,
        ticks: 470,
        drift: 0,
        decay: 0.94
      });
    }, 5500);
  }

  // === WAVE 6: Final magic (7.5s) ===
  if (duration >= 10000) {
    setTimeout(() => {
      fire({
        particleCount: Math.round(12 * particleMultiplier),
        spread: 50,
        startVelocity: 14 * velocityMultiplier,
        origin: { x: 0.5, y: 0.4 },
        colors,
        shapes,
        scalar: 1.4 * scalarMultiplier,
        gravity: 0.22,
        ticks: 500,
        drift: 0,
        decay: 0.95
      });
    }, 7500);
  }
};

/**
 * Default - ELEGANT UNIVERSAL
 * For any unknown occasion - still beautiful!
 */
const playDefaultScene = (fire: confetti.CreateTypes, duration: number) => {
  const colors = ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6'];
  const shapes = ['circle', starShape];
  const { scalarMultiplier, particleMultiplier, velocityMultiplier } = getAdaptiveParams();
  
  // === WAVE 1: Initial burst (0.25s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(40 * particleMultiplier),
      spread: 90,
      startVelocity: 30 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 2.6 * scalarMultiplier,
      gravity: 0.5,
      ticks: 420,
      drift: 0,
      decay: 0.93
    });
  }, 250);

  // === WAVE 2: Expanding (1.3s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(32 * particleMultiplier),
      spread: 80,
      startVelocity: 25 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 2.2 * scalarMultiplier,
      gravity: 0.42,
      ticks: 400,
      drift: 0,
      decay: 0.93
    });
  }, 1300);

  // === WAVE 3: Continuing (2.8s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(25 * particleMultiplier),
      spread: 70,
      startVelocity: 20 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 1.9 * scalarMultiplier,
      gravity: 0.35,
      ticks: 420,
      drift: 0,
      decay: 0.94
    });
  }, 2800);

  // === WAVE 4: Soft decay (4.5s) ===
  setTimeout(() => {
    fire({
      particleCount: Math.round(18 * particleMultiplier),
      spread: 58,
      startVelocity: 16 * velocityMultiplier,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes,
      scalar: 1.6 * scalarMultiplier,
      gravity: 0.28,
      ticks: 450,
      drift: 0,
      decay: 0.94
    });
  }, 4500);

  // === WAVE 5: Gentle fade (6.5s) ===
  if (duration >= 8000) {
    setTimeout(() => {
      fire({
        particleCount: Math.round(12 * particleMultiplier),
        spread: 48,
        startVelocity: 12 * velocityMultiplier,
        origin: { x: 0.5, y: 0.4 },
        colors,
        shapes,
        scalar: 1.4 * scalarMultiplier,
        gravity: 0.22,
        ticks: 480,
        drift: 0,
        decay: 0.95
      });
    }, 6500);
  }

  // === WAVE 6: Final touch (8.5s) ===
  if (duration >= 10000) {
    setTimeout(() => {
      fire({
        particleCount: Math.round(8 * particleMultiplier),
        spread: 40,
        startVelocity: 10 * velocityMultiplier,
        origin: { x: 0.5, y: 0.4 },
        colors,
        shapes,
        scalar: 1.2 * scalarMultiplier,
        gravity: 0.18,
        ticks: 520,
        drift: 0,
        decay: 0.96
      });
    }, 8500);
  }
};

export default OccasionIntroAnimation;

