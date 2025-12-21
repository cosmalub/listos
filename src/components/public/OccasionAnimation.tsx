import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { OccasionParticles } from './OccasionParticles';
import { OccasionLottie } from './OccasionLottie';

interface OccasionAnimationProps {
  occasion: string;
  duration?: number;
  useEnhanced?: boolean;
}

// Custom confetti shapes
const heartShape = confetti.shapeFromPath({
  path: 'M167.5,80.5c0,0-21.5-22.5-43-22.5c-21.5,0-41.5,22.5-41.5,22.5s-20-22.5-41.5-22.5S0,80.5,0,80.5s0,43,83.5,112.5C167,163,167.5,80.5,167.5,80.5z',
  matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -2.7916666666666665, -2.6666666666666665]
});

const starShape = confetti.shapeFromPath({
  path: 'M0,-15L4.5,-4.5L15,-3L7.5,3L9,15L0,9L-9,15L-7.5,3L-15,-3L-4.5,-4.5Z',
  matrix: [1, 0, 0, 1, 0, 0]
});

const balloonShape = confetti.shapeFromPath({
  path: 'M50,0C22.4,0,0,22.4,0,50c0,22.4,15,42,36,48l14,22l14-22c21-6,36-25.6,36-48C100,22.4,77.6,0,50,0z',
  matrix: [0.015, 0, 0, 0.015, -0.75, -0.75]
});

// Determine which occasions should have tsParticles (only calm ones)
const shouldShowParticles = (occasion: string): boolean => {
  // Only show particles for calm/gentle occasions
  return ['apology', 'thanks'].includes(occasion);
};

export const OccasionAnimation: React.FC<OccasionAnimationProps> = ({
  occasion,
  duration = 3000,
  useEnhanced = true
}) => {
  const [showParticles, setShowParticles] = useState(false);
  const [showLottie, setShowLottie] = useState(true);

  useEffect(() => {
    // Run initial burst
    runOccasionBurst(occasion);

    // Set up continuous effects with occasion-specific timing
    const interval = getOccasionInterval(occasion);
    const continuousInterval = setInterval(() => {
      runContinuousEffect(occasion);
    }, interval);

    // Show particles only for specific occasions
    if (useEnhanced && shouldShowParticles(occasion)) {
      const particleTimer = setTimeout(() => {
        setShowParticles(true);
      }, 2000);
      
      return () => {
        clearInterval(continuousInterval);
        clearTimeout(particleTimer);
      };
    }

    return () => {
      clearInterval(continuousInterval);
    };
  }, [occasion, useEnhanced]);

  return (
    <>
      <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden" />
      
      {useEnhanced && showLottie && (
        <OccasionLottie 
          occasion={occasion}
          showIntro={true}
          onIntroComplete={() => {}}
        />
      )}
      
      {/* Only show particles for calm occasions */}
      {useEnhanced && showParticles && shouldShowParticles(occasion) && (
        <OccasionParticles occasion={occasion} />
      )}
    </>
  );
};

// Get interval based on occasion type - SLOWER for all
const getOccasionInterval = (occasion: string): number => {
  switch (occasion) {
    case 'birthday':
      return 4500; // Much slower
    case 'love':
      return 4000; // Slower hearts
    case 'apology':
      return 6000; // Very calm
    case 'thanks':
      return 5000; // Golden sparkles
    case 'congratulations':
      return 3000; // Fireworks
    case 'holiday':
      return 4000;
    case 'friendship':
      return 4000;
    default:
      return 4000;
  }
};

// Occasion-specific initial burst
const runOccasionBurst = (occasion: string) => {
  switch (occasion) {
    case 'birthday':
      runBirthdayBurst();
      break;
    case 'love':
      runLoveBurst();
      break;
    case 'thanks':
      runThanksBurst();
      break;
    case 'congratulations':
      runCongratulationsBurst();
      break;
    case 'holiday':
      runHolidayBurst();
      break;
    case 'friendship':
      runFriendshipBurst();
      break;
    case 'apology':
      runApologyBurst();
      break;
    default:
      runDefaultBurst();
  }
};

// Continuous effects based on occasion
const runContinuousEffect = (occasion: string) => {
  switch (occasion) {
    case 'birthday':
      runBirthdayContinuous();
      break;
    case 'love':
      runLoveContinuous();
      break;
    case 'thanks':
      runThanksContinuous();
      break;
    case 'congratulations':
      runCongratulationsContinuous();
      break;
    case 'holiday':
      runHolidayContinuous();
      break;
    case 'friendship':
      runFriendshipContinuous();
      break;
    case 'apology':
      runApologyContinuous();
      break;
    default:
      runDefaultContinuous();
  }
};

// ============= BIRTHDAY: Slow, elegant confetti (NO particles) =============
const runBirthdayBurst = () => {
  const colors = ['#FF1744', '#FF6B9D', '#FFD700', '#00D4FF', '#9C27B0', '#FF9800', '#4CAF50'];
  
  // Single elegant central burst - slow and beautiful
  confetti({
    particleCount: 60,
    spread: 80,
    startVelocity: 20, // Very slow
    origin: { x: 0.5, y: 0.5 },
    colors: colors,
    shapes: [balloonShape, 'circle'],
    scalar: 1.8, // Bigger
    gravity: 0.4, // Very slow fall
    ticks: 400, // Visible very long
    drift: 0
  });

  // Delayed gentle side bursts
  setTimeout(() => {
    confetti({
      particleCount: 25,
      angle: 60,
      spread: 50,
      startVelocity: 15,
      origin: { x: 0, y: 0.6 },
      colors: colors,
      shapes: ['circle', 'square'],
      scalar: 1.4,
      gravity: 0.3,
      ticks: 350
    });
    confetti({
      particleCount: 25,
      angle: 120,
      spread: 50,
      startVelocity: 15,
      origin: { x: 1, y: 0.6 },
      colors: colors,
      shapes: ['circle', 'square'],
      scalar: 1.4,
      gravity: 0.3,
      ticks: 350
    });
  }, 500);
};

const runBirthdayContinuous = () => {
  const colors = ['#FF1744', '#FF6B9D', '#FFD700', '#00D4FF', '#9C27B0'];
  
  // Very gentle rain - few particles, slow
  confetti({
    particleCount: 8, // Few particles
    spread: 100,
    startVelocity: 8, // Very slow
    origin: { x: Math.random(), y: 0 },
    colors: colors,
    shapes: ['circle'],
    scalar: 1.3,
    gravity: 0.2, // Very slow fall
    ticks: 500, // Very long visible
    drift: (Math.random() - 0.5) * 0.2
  });
};

// ============= LOVE: BIG hearts only, floating upward =============
const runLoveBurst = () => {
  const colors = ['#ff006e', '#ff1744', '#f50057', '#ff4081', '#e91e63'];
  
  // Central big heart burst
  confetti({
    particleCount: 40,
    spread: 70,
    startVelocity: 25,
    origin: { x: 0.5, y: 0.6 },
    colors: colors,
    shapes: [heartShape],
    scalar: 3.5, // VERY BIG hearts
    gravity: 0.5,
    ticks: 300
  });

  // Hearts floating up from bottom - staggered
  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 5,
          spread: 30,
          startVelocity: 20,
          origin: { x: 0.2 + i * 0.3, y: 1 },
          colors: colors,
          shapes: [heartShape],
          scalar: 3, // Big hearts
          gravity: -0.05, // Float up gently
          ticks: 400,
          drift: 0
        });
      }, i * 300);
    }
  }, 600);
};

const runLoveContinuous = () => {
  const colors = ['#ff006e', '#ff1744', '#f50057', '#ff4081'];
  
  // Few big hearts floating up slowly
  confetti({
    particleCount: 3, // Very few
    spread: 25,
    startVelocity: 15,
    origin: { x: Math.random(), y: 1 },
    colors: colors,
    shapes: [heartShape],
    scalar: 3, // BIG hearts
    gravity: -0.03, // Gently float up
    ticks: 500, // Very long visible
    drift: (Math.random() - 0.5) * 0.1
  });
};

// ============= THANKS: Golden stars and sparkles =============
const runThanksBurst = () => {
  const colors = ['#FFD700', '#FFA500', '#FFED4E', '#FFB700', '#FFC300'];
  
  // Star burst from center
  confetti({
    particleCount: 50,
    spread: 360,
    startVelocity: 30,
    origin: { x: 0.5, y: 0.5 },
    colors: colors,
    shapes: [starShape],
    scalar: 1.6,
    gravity: 0.6,
    ticks: 250
  });

  // Golden sparkles
  setTimeout(() => {
    confetti({
      particleCount: 35,
      spread: 90,
      startVelocity: 18,
      origin: { x: 0.5, y: 0.4 },
      colors: ['#FFD700', '#FFFFFF'],
      shapes: ['circle'],
      scalar: 1,
      gravity: 0.4,
      ticks: 220
    });
  }, 300);
};

const runThanksContinuous = () => {
  const colors = ['#FFD700', '#FFA500', '#FFED4E'];
  
  // Gentle twinkling stars
  confetti({
    particleCount: 5,
    spread: 50,
    startVelocity: 12,
    origin: { x: Math.random(), y: Math.random() * 0.4 },
    colors: colors,
    shapes: [starShape],
    scalar: 1.4,
    gravity: 0.3,
    ticks: 250
  });
};

// ============= CONGRATULATIONS: Fireworks =============
const runCongratulationsBurst = () => {
  const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#9c27b0'];
  
  // Multiple firework bursts
  const positions = [
    { x: 0.5, y: 0.4 },
    { x: 0.3, y: 0.5 },
    { x: 0.7, y: 0.5 }
  ];

  positions.forEach((pos, index) => {
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 360,
        startVelocity: 40,
        origin: pos,
        colors: colors,
        shapes: [starShape, 'circle'],
        scalar: 1.3,
        gravity: 0.9,
        ticks: 180
      });
    }, index * 200);
  });
};

const runCongratulationsContinuous = () => {
  const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1'];
  
  // Random firework
  confetti({
    particleCount: 35,
    spread: 360,
    startVelocity: 30,
    origin: { x: Math.random(), y: 0.3 + Math.random() * 0.3 },
    colors: colors,
    shapes: [starShape, 'circle'],
    scalar: 1.1,
    gravity: 0.8,
    ticks: 150
  });
};

// ============= HOLIDAY: Universal festive (geometric shapes, no emoji) =============
const runHolidayBurst = () => {
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
  
  // Festive confetti burst with geometric shapes
  confetti({
    particleCount: 70,
    spread: 80,
    startVelocity: 35,
    origin: { x: 0.5, y: 0.5 },
    colors: colors,
    shapes: [starShape, balloonShape, 'circle', 'square'],
    scalar: 1.5,
    gravity: 0.6,
    ticks: 250
  });

  // Streamers from sides
  setTimeout(() => {
    confetti({
      particleCount: 25,
      angle: 60,
      spread: 40,
      startVelocity: 30,
      origin: { x: 0, y: 0.5 },
      colors: colors,
      shapes: ['square'],
      scalar: 1.6,
      gravity: 0.5,
      ticks: 220
    });
    confetti({
      particleCount: 25,
      angle: 120,
      spread: 40,
      startVelocity: 30,
      origin: { x: 1, y: 0.5 },
      colors: colors,
      shapes: ['square'],
      scalar: 1.6,
      gravity: 0.5,
      ticks: 220
    });
  }, 350);
};

const runHolidayContinuous = () => {
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'];
  
  // Festive particles - geometric shapes only
  confetti({
    particleCount: 12,
    spread: 70,
    startVelocity: 15,
    origin: { x: Math.random(), y: 0.1 },
    colors: colors,
    shapes: [starShape, 'circle', 'square'],
    scalar: 1.3,
    gravity: 0.4,
    ticks: 300,
    drift: (Math.random() - 0.5) * 0.2
  });
};

// ============= FRIENDSHIP: Rainbow sparkles =============
const runFriendshipBurst = () => {
  const colors = ['#ff6b9d', '#c44569', '#f8b500', '#18dcff', '#7d5fff', '#32ff7e', '#ff9ff3'];
  
  // Rainbow burst
  confetti({
    particleCount: 70,
    spread: 90,
    startVelocity: 30,
    origin: { x: 0.5, y: 0.5 },
    colors: colors,
    shapes: [starShape, heartShape, 'circle'],
    scalar: 1.5,
    gravity: 0.5,
    ticks: 270
  });

  // Sparkles
  setTimeout(() => {
    confetti({
      particleCount: 30,
      spread: 100,
      startVelocity: 20,
      origin: { x: 0.5, y: 0.4 },
      colors: ['#FFFFFF', '#FFD700', '#ff9ff3'],
      shapes: ['circle'],
      scalar: 0.8,
      gravity: 0.35,
      ticks: 220
    });
  }, 300);
};

const runFriendshipContinuous = () => {
  const colors = ['#ff6b9d', '#18dcff', '#7d5fff', '#32ff7e'];
  
  // Rainbow sparkles
  confetti({
    particleCount: 8,
    spread: 60,
    startVelocity: 14,
    origin: { x: Math.random(), y: Math.random() * 0.4 },
    colors: colors,
    shapes: [starShape, 'circle'],
    scalar: 1.2,
    gravity: 0.4,
    ticks: 250
  });
};

// ============= APOLOGY: Very gentle, calming =============
const runApologyBurst = () => {
  const colors = ['#a8dadc', '#457b9d', '#81d4fa', '#b3e5fc', '#e1f5fe'];
  
  // Gentle soft burst
  confetti({
    particleCount: 30,
    spread: 60,
    startVelocity: 12,
    origin: { x: 0.5, y: 0.5 },
    colors: colors,
    shapes: ['circle'],
    scalar: 1.2,
    gravity: 0.25,
    ticks: 400
  });
};

const runApologyContinuous = () => {
  const colors = ['#a8dadc', '#81d4fa', '#b3e5fc'];
  
  // Very gentle floating bubbles
  confetti({
    particleCount: 3,
    spread: 40,
    startVelocity: 6,
    origin: { x: Math.random(), y: 1 },
    colors: colors,
    shapes: ['circle'],
    scalar: 1.5,
    gravity: -0.02, // Float up very slowly
    ticks: 600,
    drift: (Math.random() - 0.5) * 0.1
  });
};

// ============= DEFAULT =============
const runDefaultBurst = () => {
  const colors = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];
  
  confetti({
    particleCount: 60,
    spread: 80,
    startVelocity: 30,
    origin: { x: 0.5, y: 0.5 },
    colors: colors,
    shapes: ['circle', 'square'],
    scalar: 1.3,
    gravity: 0.5,
    ticks: 250
  });
};

const runDefaultContinuous = () => {
  const colors = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
  
  confetti({
    particleCount: 10,
    spread: 60,
    startVelocity: 15,
    origin: { x: Math.random(), y: 0.1 },
    colors: colors,
    shapes: ['circle', 'square'],
    scalar: 1.2,
    gravity: 0.4,
    ticks: 280
  });
};

export default OccasionAnimation;
