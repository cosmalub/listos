import React, { useEffect, useRef, useState } from 'react';
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

export const OccasionAnimation: React.FC<OccasionAnimationProps> = ({
  occasion,
  duration = 3000,
  useEnhanced = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const confettiInstanceRef = useRef<confetti.CreateTypes | null>(null);
  const [showParticles, setShowParticles] = useState(false);
  const [showLottie, setShowLottie] = useState(true);

  // Always run canvas-confetti as primary animation (most reliable)
  useEffect(() => {
    console.log('OccasionAnimation: Starting confetti animation for:', occasion);
    
    // Run confetti burst immediately
    runConfettiBurst(occasion);

    // Set up continuous confetti
    const continuousInterval = setInterval(() => {
      runContinuousConfetti(occasion);
    }, 4000);

    // Show particles after a delay (if they work, they're a bonus)
    if (useEnhanced) {
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Canvas for confetti fallback (always renders but invisible canvas) */}
      <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden" />
      
      {/* Lottie animations for visual enhancement */}
      {useEnhanced && showLottie && (
        <OccasionLottie 
          occasion={occasion}
          showIntro={true}
          onIntroComplete={() => {
            console.log('OccasionAnimation: Lottie intro complete');
          }}
        />
      )}
      
      {/* tsParticles for continuous background effects (bonus if it works) */}
      {useEnhanced && showParticles && (
        <OccasionParticles occasion={occasion} />
      )}
    </>
  );
};

// Initial confetti burst - runs immediately
const runConfettiBurst = (occasion: string) => {
  const colors = getOccasionColors(occasion);
  const shapes = getOccasionShapes(occasion);
  
  // Center burst
  confetti({
    particleCount: 120,
    spread: 80,
    startVelocity: 45,
    origin: { x: 0.5, y: 0.5 },
    colors: colors,
    shapes: shapes,
    scalar: 1.3,
    gravity: 0.9,
    ticks: 200
  });

  // Side bursts after short delay
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      startVelocity: 40,
      origin: { x: 0, y: 0.6 },
      colors: colors,
      shapes: shapes,
      scalar: 1.1
    });
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      startVelocity: 40,
      origin: { x: 1, y: 0.6 },
      colors: colors,
      shapes: shapes,
      scalar: 1.1
    });
  }, 200);

  // Top bursts
  setTimeout(() => {
    confetti({
      particleCount: 40,
      spread: 100,
      startVelocity: 35,
      origin: { x: 0.3, y: 0.2 },
      colors: colors,
      scalar: 0.9
    });
    confetti({
      particleCount: 40,
      spread: 100,
      startVelocity: 35,
      origin: { x: 0.7, y: 0.2 },
      colors: colors,
      scalar: 0.9
    });
  }, 400);
};

// Continuous confetti - runs every few seconds
const runContinuousConfetti = (occasion: string) => {
  const colors = getOccasionColors(occasion);
  const shapes = getOccasionShapes(occasion);
  
  // Gentle continuous effect
  confetti({
    particleCount: 30,
    spread: 60,
    startVelocity: 25,
    origin: { x: Math.random(), y: Math.random() * 0.3 },
    colors: colors,
    shapes: shapes,
    scalar: 1,
    gravity: 0.8,
    drift: (Math.random() - 0.5) * 0.5
  });
};

const getOccasionColors = (occasion: string): string[] => {
  switch (occasion) {
    case 'birthday':
      return ['#FF1744', '#FF6B9D', '#FFD700', '#00D4FF', '#9C27B0', '#FF9800', '#4CAF50'];
    case 'love':
      return ['#ff006e', '#fb5607', '#ff1744', '#f50057', '#ff4081', '#e91e63'];
    case 'thanks':
      return ['#FFD700', '#FFA500', '#FFED4E', '#FFB700', '#FFC300', '#FF8C00'];
    case 'holiday':
      return ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
    case 'friendship':
      return ['#ff6b9d', '#c44569', '#f8b500', '#18dcff', '#7d5fff', '#32ff7e'];
    case 'apology':
      return ['#a8dadc', '#457b9d', '#1d3557', '#f1faee', '#e9c46a'];
    case 'congratulations':
      return ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#ff9f43'];
    default:
      return ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444'];
  }
};

const getOccasionShapes = (occasion: string): confetti.Shape[] => {
  switch (occasion) {
    case 'love':
      return [heartShape, 'circle'];
    case 'thanks':
      return [starShape, 'circle'];
    default:
      return ['circle', 'square'];
  }
};

export default OccasionAnimation;
