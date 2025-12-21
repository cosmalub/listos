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

// Balloon shape
const balloonShape = confetti.shapeFromPath({
  path: 'M50,0C22.4,0,0,22.4,0,50c0,22.4,15,42,36,48l14,22l14-22c21-6,36-25.6,36-48C100,22.4,77.6,0,50,0z',
  matrix: [0.015, 0, 0, 0.015, -0.75, -0.75]
});

export const OccasionAnimation: React.FC<OccasionAnimationProps> = ({
  occasion,
  duration = 3000,
  useEnhanced = true
}) => {
  const [showParticles, setShowParticles] = useState(false);
  const [showLottie, setShowLottie] = useState(true);

  console.log('OccasionAnimation: Rendering with occasion:', occasion);

  // Run unique confetti based on occasion
  useEffect(() => {
    console.log('OccasionAnimation: Starting animation for:', occasion);
    
    // Run initial burst
    runOccasionBurst(occasion);

    // Set up continuous effects with occasion-specific timing
    const interval = getOccasionInterval(occasion);
    const continuousInterval = setInterval(() => {
      runContinuousEffect(occasion);
    }, interval);

    // Show particles after a delay
    if (useEnhanced) {
      const particleTimer = setTimeout(() => {
        setShowParticles(true);
      }, 1500);
      
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
          onIntroComplete={() => {
            console.log('OccasionAnimation: Lottie intro complete');
          }}
        />
      )}
      
      {useEnhanced && showParticles && (
        <OccasionParticles occasion={occasion} />
      )}
    </>
  );
};

// Get interval based on occasion type
const getOccasionInterval = (occasion: string): number => {
  switch (occasion) {
    case 'birthday':
      return 3000; // Slower, more relaxed
    case 'love':
      return 2500; // Hearts floating up gently
    case 'apology':
      return 5000; // Very gentle and calm
    case 'thanks':
      return 3500; // Golden sparkles
    default:
      return 2500;
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

// ============= BIRTHDAY: Slow, colorful confetti rain with balloons =============
const runBirthdayBurst = () => {
  const colors = ['#FF1744', '#FF6B9D', '#FFD700', '#00D4FF', '#9C27B0', '#FF9800', '#4CAF50'];
  
  // Central slow burst
  confetti({
    particleCount: 80,
    spread: 100,
    startVelocity: 25, // Slower
    origin: { x: 0.5, y: 0.5 },
    colors: colors,
    shapes: [balloonShape, 'circle', 'square'],
    scalar: 1.5, // Bigger
    gravity: 0.5, // Slower fall
    ticks: 300, // Visible longer
    drift: 0
  });

  // Delayed side bursts
  setTimeout(() => {
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 60,
      startVelocity: 20,
      origin: { x: 0, y: 0.7 },
      colors: colors,
      shapes: ['circle', 'square'],
      scalar: 1.3,
      gravity: 0.4,
      ticks: 250
    });
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 60,
      startVelocity: 20,
      origin: { x: 1, y: 0.7 },
      colors: colors,
      shapes: ['circle', 'square'],
      scalar: 1.3,
      gravity: 0.4,
      ticks: 250
    });
  }, 300);
};

const runBirthdayContinuous = () => {
  const colors = ['#FF1744', '#FF6B9D', '#FFD700', '#00D4FF', '#9C27B0'];
  
  // Gentle confetti rain from top
  confetti({
    particleCount: 15,
    spread: 120,
    startVelocity: 10,
    origin: { x: Math.random(), y: 0 },
    colors: colors,
    shapes: ['circle', 'square'],
    scalar: 1.2,
    gravity: 0.3,
    ticks: 400,
    drift: (Math.random() - 0.5) * 0.3
  });
};

// ============= LOVE: Only hearts, floating upward =============
const runLoveBurst = () => {
  const colors = ['#ff006e', '#ff1744', '#f50057', '#ff4081', '#e91e63', '#d81b60'];
  
  // Central heart burst
  confetti({
    particleCount: 60,
    spread: 80,
    startVelocity: 30,
    origin: { x: 0.5, y: 0.6 },
    colors: colors,
    shapes: [heartShape],
    scalar: 2, // Big hearts
    gravity: 0.6,
    ticks: 250
  });

  // Hearts floating up from bottom
  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 8,
          spread: 40,
          startVelocity: 35,
          origin: { x: 0.2 + i * 0.3, y: 1 },
          colors: colors,
          shapes: [heartShape],
          scalar: 1.8,
          gravity: -0.1, // Float up
          ticks: 300,
          drift: 0
        });
      }, i * 200);
    }
  }, 400);
};

const runLoveContinuous = () => {
  const colors = ['#ff006e', '#ff1744', '#f50057', '#ff4081'];
  
  // Hearts floating up
  confetti({
    particleCount: 5,
    spread: 30,
    startVelocity: 25,
    origin: { x: Math.random(), y: 1 },
    colors: colors,
    shapes: [heartShape],
    scalar: 1.5,
    gravity: -0.05, // Gently float up
    ticks: 350,
    drift: (Math.random() - 0.5) * 0.2
  });
};

// ============= THANKS: Golden stars and sparkles =============
const runThanksBurst = () => {
  const colors = ['#FFD700', '#FFA500', '#FFED4E', '#FFB700', '#FFC300'];
  
  // Star burst from center
  confetti({
    particleCount: 70,
    spread: 360,
    startVelocity: 35,
    origin: { x: 0.5, y: 0.5 },
    colors: colors,
    shapes: [starShape],
    scalar: 1.4,
    gravity: 0.7,
    ticks: 200
  });

  // Golden sparkles
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 100,
      startVelocity: 20,
      origin: { x: 0.5, y: 0.4 },
      colors: ['#FFD700', '#FFFFFF'],
      shapes: ['circle'],
      scalar: 0.8,
      gravity: 0.5,
      ticks: 180
    });
  }, 200);
};

const runThanksContinuous = () => {
  const colors = ['#FFD700', '#FFA500', '#FFED4E'];
  
  // Twinkling stars
  confetti({
    particleCount: 8,
    spread: 60,
    startVelocity: 15,
    origin: { x: Math.random(), y: Math.random() * 0.5 },
    colors: colors,
    shapes: [starShape],
    scalar: 1.2,
    gravity: 0.4,
    ticks: 200
  });
};

// ============= CONGRATULATIONS: Fireworks and confetti =============
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
        particleCount: 100,
        spread: 360,
        startVelocity: 45,
        origin: pos,
        colors: colors,
        shapes: [starShape, 'circle'],
        scalar: 1.2,
        gravity: 1,
        ticks: 150
      });
    }, index * 150);
  });
};

const runCongratulationsContinuous = () => {
  const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1'];
  
  // Random firework
  confetti({
    particleCount: 40,
    spread: 360,
    startVelocity: 35,
    origin: { x: Math.random(), y: 0.3 + Math.random() * 0.3 },
    colors: colors,
    shapes: [starShape, 'circle'],
    scalar: 1,
    gravity: 0.9,
    ticks: 120
  });
};

// ============= HOLIDAY: Universal festive (no snowflakes) =============
const runHolidayBurst = () => {
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
  
  // Festive confetti burst
  confetti({
    particleCount: 100,
    spread: 90,
    startVelocity: 40,
    origin: { x: 0.5, y: 0.5 },
    colors: colors,
    shapes: [starShape, balloonShape, 'circle', 'square'],
    scalar: 1.3,
    gravity: 0.7,
    ticks: 200
  });

  // Streamers from sides
  setTimeout(() => {
    confetti({
      particleCount: 30,
      angle: 60,
      spread: 45,
      startVelocity: 35,
      origin: { x: 0, y: 0.5 },
      colors: colors,
      shapes: ['square'],
      scalar: 1.5,
      gravity: 0.6,
      ticks: 180
    });
    confetti({
      particleCount: 30,
      angle: 120,
      spread: 45,
      startVelocity: 35,
      origin: { x: 1, y: 0.5 },
      colors: colors,
      shapes: ['square'],
      scalar: 1.5,
      gravity: 0.6,
      ticks: 180
    });
  }, 250);
};

const runHolidayContinuous = () => {
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'];
  
  // Festive particles
  confetti({
    particleCount: 20,
    spread: 80,
    startVelocity: 20,
    origin: { x: Math.random(), y: 0.1 },
    colors: colors,
    shapes: [starShape, 'circle'],
    scalar: 1.1,
    gravity: 0.5,
    ticks: 250,
    drift: (Math.random() - 0.5) * 0.3
  });
};

// ============= FRIENDSHIP: Rainbow sparkles =============
const runFriendshipBurst = () => {
  const colors = ['#ff6b9d', '#c44569', '#f8b500', '#18dcff', '#7d5fff', '#32ff7e', '#ff9ff3'];
  
  // Rainbow burst
  confetti({
    particleCount: 90,
    spread: 100,
    startVelocity: 35,
    origin: { x: 0.5, y: 0.5 },
    colors: colors,
    shapes: [starShape, heartShape, 'circle'],
    scalar: 1.3,
    gravity: 0.6,
    ticks: 220
  });

  // Sparkles
  setTimeout(() => {
    confetti({
      particleCount: 40,
      spread: 120,
      startVelocity: 25,
      origin: { x: 0.5, y: 0.4 },
      colors: ['#FFFFFF', '#FFD700', '#ff9ff3'],
      shapes: ['circle'],
      scalar: 0.7,
      gravity: 0.4,
      ticks: 180
    });
  }, 200);
};

const runFriendshipContinuous = () => {
  const colors = ['#ff6b9d', '#18dcff', '#7d5fff', '#32ff7e'];
  
  // Rainbow sparkles
  confetti({
    particleCount: 12,
    spread: 70,
    startVelocity: 18,
    origin: { x: Math.random(), y: Math.random() * 0.4 },
    colors: colors,
    shapes: [starShape, 'circle'],
    scalar: 1,
    gravity: 0.5,
    ticks: 200
  });
};

// ============= APOLOGY: Gentle, calming, slow =============
const runApologyBurst = () => {
  const colors = ['#a8dadc', '#457b9d', '#81d4fa', '#b3e5fc', '#e1f5fe'];
  
  // Gentle soft burst
  confetti({
    particleCount: 40,
    spread: 80,
    startVelocity: 15, // Very slow
    origin: { x: 0.5, y: 0.5 },
    colors: colors,
    shapes: ['circle'],
    scalar: 1.4,
    gravity: 0.3, // Floats slowly
    ticks: 400, // Visible for long
    drift: 0
  });
};

const runApologyContinuous = () => {
  const colors = ['#a8dadc', '#457b9d', '#81d4fa'];
  
  // Very gentle floating circles
  confetti({
    particleCount: 5,
    spread: 50,
    startVelocity: 8,
    origin: { x: Math.random(), y: Math.random() * 0.5 },
    colors: colors,
    shapes: ['circle'],
    scalar: 1.2,
    gravity: 0.2,
    ticks: 500,
    drift: 0
  });
};

// ============= DEFAULT: Multi-color celebration =============
const runDefaultBurst = () => {
  const colors = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444'];
  
  confetti({
    particleCount: 80,
    spread: 90,
    startVelocity: 35,
    origin: { x: 0.5, y: 0.5 },
    colors: colors,
    shapes: ['circle', 'square'],
    scalar: 1.2,
    gravity: 0.7,
    ticks: 200
  });
};

const runDefaultContinuous = () => {
  const colors = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
  
  confetti({
    particleCount: 15,
    spread: 60,
    startVelocity: 20,
    origin: { x: Math.random(), y: Math.random() * 0.3 },
    colors: colors,
    shapes: ['circle', 'square'],
    scalar: 1,
    gravity: 0.6,
    ticks: 180
  });
};

export default OccasionAnimation;
