import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { OccasionParticles } from './OccasionParticles';
import { OccasionLottie } from './OccasionLottie';

interface OccasionAnimationProps {
  occasion: string;
  duration?: number;
  useEnhanced?: boolean; // Use new tsParticles + Lottie system
}

// Створюємо кастомні форми на рівні модуля
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
  useEnhanced = true // Default to enhanced animations
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<any>(null);
  const [showParticles, setShowParticles] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  console.log('OccasionAnimation: Rendering for occasion:', occasion, 'useEnhanced:', useEnhanced);

  // Show particles after intro animation
  useEffect(() => {
    if (useEnhanced) {
      console.log('OccasionAnimation: Will show particles after 2s delay');
      // Delay particles to let intro Lottie play first
      const timer = setTimeout(() => {
        console.log('OccasionAnimation: Now showing particles');
        setShowParticles(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [useEnhanced]);

  // Fallback to canvas-confetti if not using enhanced
  useEffect(() => {
    if (useEnhanced || !canvasRef.current) return;

    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true
    });

    // Запускаємо відповідну анімацію
    switch (occasion) {
      case 'birthday':
        animationRef.current = runBirthdayAnimation(myConfetti);
        break;
      case 'congratulations':
        animationRef.current = runCongratulationsAnimation(myConfetti);
        break;
      case 'love':
        animationRef.current = runLoveAnimation(myConfetti);
        break;
      case 'thanks':
        animationRef.current = runThanksAnimation(myConfetti);
        break;
      case 'friendship':
        animationRef.current = runFriendshipAnimation(myConfetti);
        break;
      case 'holiday':
        animationRef.current = runHolidayAnimation(myConfetti);
        break;
      case 'apology':
        animationRef.current = runApologyAnimation(myConfetti);
        break;
      default:
        animationRef.current = runDefaultAnimation(myConfetti);
        break;
    }

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
      myConfetti.reset();
    };
  }, [occasion, useEnhanced]);

  // Enhanced mode with tsParticles + Lottie
  if (useEnhanced) {
    return (
      <>
        {/* Lottie intro animation + background decorations */}
        <OccasionLottie 
          occasion={occasion}
          showIntro={true}
          onIntroComplete={() => setIntroComplete(true)}
        />
        
        {/* tsParticles for continuous interactive effects */}
        {showParticles && (
          <OccasionParticles occasion={occasion} />
        )}
      </>
    );
  }

  // Fallback to canvas-confetti
  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

// Birthday: Яркое праздничное конфетти
const runBirthdayAnimation = (confetti: any) => {
  const colors = ['#FF1744', '#FF6B9D', '#FFD700', '#00D4FF', '#9C27B0', '#FF9800'];
  
  function celebration() {
    confetti({
      particleCount: 150,
      spread: 90,
      startVelocity: 50,
      origin: { y: 0.6 },
      colors: colors,
      scalar: 1.3,
      gravity: 1,
      shapes: ['circle', 'square']
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 60,
        startVelocity: 45,
        origin: { x: 0, y: 0.6 },
        colors: colors,
        scalar: 1.1
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 60,
        startVelocity: 45,
        origin: { x: 1, y: 0.6 },
        colors: colors,
        scalar: 1.1
      });
    }, 250);

    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 110,
        startVelocity: 40,
        origin: { y: 0.4 },
        colors: colors,
        scalar: 0.9
      });
    }, 500);
  }

  celebration();
  const interval = setInterval(celebration, 8000);
  return interval;
};

// Congratulations: Elegant rising particles
const runCongratulationsAnimation = (confetti: any) => {
  const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'];
  
  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  function burst() {
    confetti({
      particleCount: 25,
      spread: 50,
      startVelocity: 35,
      origin: { x: randomInRange(0.2, 0.4), y: 0.7 },
      colors: colors,
      shapes: ['circle', 'square'],
      scalar: 1.2,
      gravity: 0.8
    });
    
    confetti({
      particleCount: 25,
      spread: 50,
      startVelocity: 35,
      origin: { x: randomInRange(0.6, 0.8), y: 0.7 },
      colors: colors,
      shapes: ['circle', 'square'],
      scalar: 1.2,
      gravity: 0.8
    });
  }

  const interval = setInterval(burst, 1500);
  return interval;
};

// Love: Romantic hearts floating
const runLoveAnimation = (confetti: any) => {
  const colors = ['#ff006e', '#fb5607', '#ff1744', '#f50057', '#ff4081'];
  
  function heartRain() {
    confetti({
      particleCount: 25,
      spread: 70,
      startVelocity: 30,
      gravity: 0.8,
      ticks: 150,
      origin: { x: 0.5, y: 0.2 },
      shapes: [heartShape],
      colors: colors,
      scalar: 2.5
    });

    setTimeout(() => {
      confetti({
        particleCount: 15,
        angle: 60,
        spread: 55,
        startVelocity: 25,
        origin: { x: 0, y: 0.5 },
        shapes: [heartShape],
        colors: colors,
        scalar: 2,
        gravity: 0.8
      });
      
      confetti({
        particleCount: 15,
        angle: 120,
        spread: 55,
        startVelocity: 25,
        origin: { x: 1, y: 0.5 },
        shapes: [heartShape],
        colors: colors,
        scalar: 2,
        gravity: 0.8
      });
    }, 300);

    setTimeout(() => {
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          confetti({
            particleCount: 12,
            spread: 50,
            startVelocity: 20,
            origin: { x: 0.3 + (Math.random() * 0.4), y: 0 },
            shapes: [heartShape],
            colors: colors,
            scalar: 1.8,
            gravity: 0.6,
            drift: (Math.random() - 0.5)
          });
        }, i * 350);
      }
    }, 500);
  }

  heartRain();
  const interval = setInterval(heartRain, 7000);
  return interval;
};

// Thanks: Золотые звезды благодарности
const runThanksAnimation = (confetti: any) => {
  const colors = ['#FFD700', '#FFA500', '#FFED4E', '#FFB700', '#FFC300'];
  
  function sparkle() {
    confetti({
      particleCount: 35,
      spread: 80,
      startVelocity: 35,
      gravity: 0.8,
      ticks: 120,
      origin: { x: 0.5, y: 0.3 },
      shapes: [starShape],
      colors: colors,
      scalar: 2
    });

    setTimeout(() => {
      confetti({
        particleCount: 18,
        spread: 60,
        startVelocity: 30,
        angle: 60,
        gravity: 0.8,
        origin: { x: 0.1, y: 0.5 },
        shapes: [starShape],
        colors: colors,
        scalar: 1.8
      });
      
      confetti({
        particleCount: 18,
        spread: 60,
        startVelocity: 30,
        angle: 120,
        gravity: 0.8,
        origin: { x: 0.9, y: 0.5 },
        shapes: [starShape],
        colors: colors,
        scalar: 1.8
      });
    }, 300);
  }

  sparkle();
  const interval = setInterval(sparkle, 4500);
  return interval;
};

// Friendship: Warm colorful celebration
const runFriendshipAnimation = (confetti: any) => {
  const colors = ['#ff6b9d', '#c44569', '#f8b500', '#18dcff', '#7d5fff'];
  
  function friendshipBurst() {
    confetti({
      particleCount: 30,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.6 },
      colors: colors,
      scalar: 1.2,
      gravity: 0.9
    });
    
    confetti({
      particleCount: 30,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.6 },
      colors: colors,
      scalar: 1.2,
      gravity: 0.9
    });

    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 90,
        startVelocity: 35,
        origin: { x: 0.5, y: 0.5 },
        colors: colors,
        scalar: 1,
        gravity: 1
      });
    }, 400);
  }

  friendshipBurst();
  const interval = setInterval(friendshipBurst, 5000);
  return interval;
};

// Holiday: Яркие праздничные салюты
const runHolidayAnimation = (confetti: any) => {
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
  
  function festiveFireworks() {
    confetti({
      particleCount: 100,
      spread: 80,
      startVelocity: 45,
      origin: { y: 0.5 },
      colors: colors,
      scalar: 1.3,
      gravity: 1,
      shapes: ['circle', 'square']
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 70,
        startVelocity: 40,
        origin: { x: 0.1, y: 0.6 },
        colors: colors,
        scalar: 1.1
      });
      
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 70,
        startVelocity: 40,
        origin: { x: 0.9, y: 0.6 },
        colors: colors,
        scalar: 1.1
      });
    }, 300);

    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 120,
        startVelocity: 35,
        origin: { x: 0.3, y: 0.3 },
        colors: colors,
        scalar: 0.9
      });
      
      confetti({
        particleCount: 50,
        spread: 120,
        startVelocity: 35,
        origin: { x: 0.7, y: 0.3 },
        colors: colors,
        scalar: 0.9
      });
    }, 600);
  }

  festiveFireworks();
  const interval = setInterval(festiveFireworks, 8000);
  return interval;
};

// Apology: Gentle, sincere particles
const runApologyAnimation = (confetti: any) => {
  const colors = ['#a8dadc', '#457b9d', '#1d3557', '#f1faee', '#a8dadc'];
  
  function gentle() {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 15,
          spread: 50,
          startVelocity: 15,
          gravity: 0.5,
          ticks: 120,
          origin: { x: 0.3 + (i * 0.2), y: 0.3 },
          colors: colors,
          scalar: 1,
          drift: 0
        });
      }, i * 300);
    }
  }

  gentle();
  const interval = setInterval(gentle, 5000);
  return interval;
};

// Default: Multi-color confetti
const runDefaultAnimation = (confetti: any) => {
  const colors = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];
  
  function burst() {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
      scalar: 1.1,
      gravity: 1
    });

    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors
      });
    }, 400);
  }

  burst();
  const interval = setInterval(burst, 6000);
  return interval;
};
