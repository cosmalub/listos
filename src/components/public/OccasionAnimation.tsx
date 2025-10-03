import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';

interface OccasionAnimationProps {
  occasion: string;
  duration?: number;
}

export const OccasionAnimation: React.FC<OccasionAnimationProps> = ({
  occasion,
  duration = 3000
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

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
      // Очищаємо інтервали при розмонтуванні
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
      myConfetti.reset();
    };
  }, [occasion]);

  const getScreenEffect = () => {
    switch (occasion) {
      case 'birthday':
        return 'animate-birthday-flash';
      case 'congratulations':
        return 'animate-congratulations-burst';
      case 'love':
        return 'animate-love-pulse';
      case 'apology':
        return 'animate-apology-wave';
      case 'thanks':
        return 'animate-thanks-glow';
      case 'friendship':
        return 'animate-friendship-rainbow';
      case 'holiday':
        return 'animate-holiday-sparkle';
      default:
        return 'animate-default-shimmer';
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Canvas для confetti */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

// Birthday: Colorful celebration bursts
const runBirthdayAnimation = (confetti: any) => {
  const colors = ['#ff0080', '#7928ca', '#ff0080', '#ffd700', '#00d4ff'];
  
  function celebration() {
    // Центральний вибух
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
      scalar: 1.2,
      gravity: 1,
      drift: 0
    });

    // Бічні вибухи
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors,
        scalar: 1
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors,
        scalar: 1
      });
    }, 250);

    // Додатковий каскад
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        startVelocity: 45,
        origin: { y: 0.5 },
        colors: colors,
        scalar: 0.8
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
  const colors = ['#ff006e', '#fb5607', '#ff006e', '#d62828', '#f72585'];
  
  function heartRain() {
    // Великі серця
    confetti({
      particleCount: 15,
      spread: 80,
      startVelocity: 25,
      gravity: 0.6,
      ticks: 120,
      origin: { x: 0.5, y: 0.3 },
      shapes: ['heart'],
      colors: colors,
      scalar: 2
    });

    // Малі серця що падають
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          confetti({
            particleCount: 8,
            spread: 60,
            startVelocity: 15,
            gravity: 0.5,
            ticks: 100,
            origin: { x: Math.random(), y: 0 },
            shapes: ['heart'],
            colors: colors,
            scalar: 1.5,
            drift: (Math.random() - 0.5) * 2
          });
        }, i * 400);
      }
    }, 200);
  }

  heartRain();
  const interval = setInterval(heartRain, 6000);
  return interval;
};

// Thanks: Elegant gratitude sparkles
const runThanksAnimation = (confetti: any) => {
  const colors = ['#ffd700', '#ffed4e', '#ffb700', '#ffa500', '#ffc300'];
  
  function sparkle() {
    // Центральні зірки
    confetti({
      particleCount: 20,
      spread: 70,
      startVelocity: 30,
      gravity: 0.7,
      ticks: 100,
      origin: { x: 0.5, y: 0.4 },
      shapes: ['star'],
      colors: colors,
      scalar: 1.3
    });

    // Бічні зірки
    setTimeout(() => {
      confetti({
        particleCount: 12,
        spread: 55,
        startVelocity: 25,
        angle: 60,
        gravity: 0.7,
        origin: { x: 0.2, y: 0.5 },
        shapes: ['star'],
        colors: colors,
        scalar: 1.1
      });
      
      confetti({
        particleCount: 12,
        spread: 55,
        startVelocity: 25,
        angle: 120,
        gravity: 0.7,
        origin: { x: 0.8, y: 0.5 },
        shapes: ['star'],
        colors: colors,
        scalar: 1.1
      });
    }, 300);
  }

  sparkle();
  const interval = setInterval(sparkle, 4000);
  return interval;
};

// Friendship: Warm colorful celebration
const runFriendshipAnimation = (confetti: any) => {
  const colors = ['#ff6b9d', '#c44569', '#f8b500', '#18dcff', '#7d5fff'];
  
  function friendshipBurst() {
    // Симетричні вибухи з боків
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

    // Центральний акцент
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

// Holiday: Universal festive celebration
const runHolidayAnimation = (confetti: any) => {
  const colors = ['#ee5a6f', '#f29263', '#f7d794', '#778beb', '#e77f67'];
  
  function festive() {
    // Святкові вибухи
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
      scalar: 1.1,
      gravity: 1
    });

    // Додаткові акценти
    setTimeout(() => {
      for (let i = 0; i < 2; i++) {
        confetti({
          particleCount: 25,
          angle: 60 + (i * 60),
          spread: 55,
          origin: { x: i === 0 ? 0 : 1, y: 0.6 },
          colors: colors,
          scalar: 0.9,
          gravity: 1
        });
      }
    }, 250);

    // Верхні частинки що падають
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 100,
        startVelocity: 30,
        origin: { y: 0.3 },
        colors: colors,
        scalar: 0.8,
        gravity: 0.8
      });
    }, 500);
  }

  festive();
  const interval = setInterval(festive, 7000);
  return interval;
};

// Apology: Gentle, sincere particles
const runApologyAnimation = (confetti: any) => {
  const colors = ['#a8dadc', '#457b9d', '#1d3557', '#f1faee', '#a8dadc'];
  
  function gentle() {
    // М'які частинки що повільно падають
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
