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
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;

    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true
    });

    // Запускаємо відповідну анімацію
    switch (occasion) {
      case 'birthday':
        runBirthdayAnimation(myConfetti);
        break;
      case 'congratulations':
        runCongratulationsAnimation(myConfetti);
        break;
      case 'love':
        runLoveAnimation(myConfetti);
        break;
      case 'thanks':
        runThanksAnimation(myConfetti);
        break;
      case 'friendship':
        runFriendshipAnimation(myConfetti);
        break;
      case 'holiday':
        runHolidayAnimation(myConfetti);
        break;
      default:
        runDefaultAnimation(myConfetti);
        break;
    }

    return () => {
      myConfetti.reset();
    };
  }, [isVisible, occasion]);

  if (!isVisible) return null;

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
      
      {/* Screen overlay effects */}
      <div className={`absolute inset-0 ${getScreenEffect()}`} />
    </div>
  );
};

// Birthday: Massive confetti explosion with screen flash
const runBirthdayAnimation = (confetti: any) => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999
  };

  function fire(particleRatio: number, opts: any) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      spread: 100,
      startVelocity: 55,
    });
  }

  // Вибух 1
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  
  // Вибух 2
  fire(0.2, {
    spread: 60,
  });
  
  // Вибух 3
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  
  // Вибух 4
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  
  // Вибух 5
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });

  // Повторні вибухи
  setTimeout(() => {
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 }
    });
  }, 300);

  setTimeout(() => {
    confetti({
      particleCount: 100,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 }
    });
  }, 300);
};

// Congratulations: Fireworks sequence
const runCongratulationsAnimation = (confetti: any) => {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    });
  }, 250);
};

// Love: Hearts explosion from center
const runLoveAnimation = (confetti: any) => {
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0.8,
    decay: 0.94,
    startVelocity: 30,
    shapes: ['heart'],
    colors: ['#FF0080', '#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493']
  };

  confetti({
    ...defaults,
    particleCount: 50,
    scalar: 2
  });

  confetti({
    ...defaults,
    particleCount: 30,
    scalar: 1.5,
    startVelocity: 20
  });

  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.8
    });
  }, 300);

  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 30,
      scalar: 1.3,
      startVelocity: 25
    });
  }, 600);
};

// Thanks: Golden stars rain
const runThanksAnimation = (confetti: any) => {
  const defaults = {
    shapes: ['star'],
    colors: ['#FFD700', '#FFA500', '#FFFF00', '#FFD700', '#FFC107'],
    scalar: 1.5,
    spread: 180,
    ticks: 150,
    gravity: 0.6,
    decay: 0.95
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 30,
      startVelocity: 30,
      origin: { y: 0 }
    });
  }

  shoot();
  setTimeout(shoot, 200);
  setTimeout(shoot, 400);
  setTimeout(shoot, 600);
  setTimeout(shoot, 800);
  setTimeout(shoot, 1000);
};

// Friendship: Rainbow wave
const runFriendshipAnimation = (confetti: any) => {
  const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
  
  const end = Date.now() + (2 * 1000);

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
};

// Holiday: Snow or fireworks
const runHolidayAnimation = (confetti: any) => {
  const duration = 3000;
  const animationEnd = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 3,
      startVelocity: 0,
      ticks: 200,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.3
      },
      colors: ['#ffffff', '#e0f7ff', '#b3e5fc'],
      shapes: ['circle'],
      gravity: 0.4,
      scalar: 0.8,
      drift: Math.random() > 0.5 ? 1 : -1
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  }());
};

// Default: Multi-color confetti
const runDefaultAnimation = (confetti: any) => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981']
  });

  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });
  }, 500);
};
