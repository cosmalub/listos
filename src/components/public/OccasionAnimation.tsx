import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface OccasionAnimationProps {
  occasion: string;
  duration?: number;
}

export const OccasionAnimation: React.FC<OccasionAnimationProps> = ({
  occasion,
  duration = 3000
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  const renderAnimation = () => {
    switch (occasion) {
      case 'birthday':
        return <BirthdayAnimation />;
      case 'congratulations':
        return <CongratulationsAnimation />;
      case 'love':
        return <LoveAnimation />;
      case 'apology':
        return <ApologyAnimation />;
      case 'thanks':
        return <ThanksAnimation />;
      case 'friendship':
        return <FriendshipAnimation />;
      case 'holiday':
        return <HolidayAnimation />;
      default:
        return <DefaultAnimation />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {renderAnimation()}
    </div>
  );
};

// Birthday: Balloons bursting upward with confetti
const BirthdayAnimation: React.FC = () => {
  const balloons = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    color: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'][i % 6],
    startX: 10 + (i * 3.5),
    delay: i * 0.08,
    size: 30 + Math.random() * 20
  }));

  const confetti = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    color: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'][i % 5],
    startX: Math.random() * 100,
    delay: 0.3 + Math.random() * 0.5,
    rotation: Math.random() * 360
  }));

  return (
    <>
      {balloons.map((balloon) => (
        <div
          key={`balloon-${balloon.id}`}
          className="absolute animate-balloon-burst"
          style={{
            left: `${balloon.startX}%`,
            bottom: '-10%',
            animationDelay: `${balloon.delay}s`,
            width: `${balloon.size}px`,
            height: `${balloon.size * 1.2}px`,
          }}
        >
          <div
            className="w-full h-full relative"
            style={{
              backgroundColor: balloon.color,
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              boxShadow: 'inset -4px -4px 10px rgba(0,0,0,0.2)',
            }}
          >
            <div className="absolute bottom-0 left-1/2 w-0.5 h-6 bg-gray-600 transform -translate-x-1/2 translate-y-full opacity-70" />
          </div>
        </div>
      ))}
      {confetti.map((item) => (
        <div
          key={`confetti-${item.id}`}
          className="absolute w-2 h-4 animate-confetti-burst"
          style={{
            left: `${item.startX}%`,
            top: '-5%',
            backgroundColor: item.color,
            animationDelay: `${item.delay}s`,
            transform: `rotate(${item.rotation}deg)`,
          }}
        />
      ))}
    </>
  );
};

// Congratulations: Fireworks explosions
const CongratulationsAnimation: React.FC = () => {
  const fireworks = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    x: 20 + i * 15,
    y: 20 + (i % 2) * 30,
    delay: i * 0.6,
    color: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'][i % 5]
  }));

  return (
    <>
      {fireworks.map((fw) => (
        <div
          key={`firework-${fw.id}`}
          className="absolute"
          style={{
            left: `${fw.x}%`,
            top: `${fw.y}%`,
            animationDelay: `${fw.delay}s`,
          }}
        >
          {/* Центральный взрыв */}
          <div className="absolute animate-firework-center" style={{ backgroundColor: fw.color, width: '20px', height: '20px', borderRadius: '50%' }} />
          
          {/* Искры разлетаются */}
          {Array.from({ length: 12 }).map((_, sparkIdx) => {
            const angle = (sparkIdx * 30) * (Math.PI / 180);
            return (
              <div
                key={`spark-${sparkIdx}`}
                className="absolute w-1 h-6 animate-firework-spark"
                style={{
                  backgroundColor: fw.color,
                  transformOrigin: 'bottom center',
                  transform: `rotate(${sparkIdx * 30}deg)`,
                  animationDelay: `${fw.delay}s`,
                }}
              />
            );
          })}
        </div>
      ))}
    </>
  );
};

// Love: Hearts bursting from center
const LoveAnimation: React.FC = () => {
  const hearts = Array.from({ length: 30 }, (_, i) => {
    const angle = (i * 12) * (Math.PI / 180);
    const distance = 40 + Math.random() * 30;
    return {
      id: i,
      angle,
      distance,
      delay: i * 0.05,
      size: 20 + Math.random() * 30,
    };
  });

  return (
    <>
      {hearts.map((heart) => (
        <div
          key={`heart-${heart.id}`}
          className="absolute text-red-500 animate-heart-burst"
          style={{
            left: '50%',
            top: '50%',
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            '--tx': `${Math.cos(heart.angle) * heart.distance}vw`,
            '--ty': `${Math.sin(heart.angle) * heart.distance}vh`,
          } as React.CSSProperties}
        >
          ♥
        </div>
      ))}
    </>
  );
};

// Apology: Gentle waves and falling droplets
const ApologyAnimation: React.FC = () => {
  const waves = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    delay: i * 0.5,
  }));

  const droplets = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: 10 + i * 4.5,
    delay: i * 0.15,
  }));

  return (
    <>
      {waves.map((wave) => (
        <div
          key={`wave-${wave.id}`}
          className="absolute inset-0 animate-gentle-wave"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
            animationDelay: `${wave.delay}s`,
          }}
        />
      ))}
      {droplets.map((drop) => (
        <div
          key={`drop-${drop.id}`}
          className="absolute w-2 h-2 bg-blue-400/60 rounded-full animate-droplet-fall"
          style={{
            left: `${drop.x}%`,
            top: '-5%',
            animationDelay: `${drop.delay}s`,
          }}
        />
      ))}
    </>
  );
};

// Thanks: Stars twinkling all over
const ThanksAnimation: React.FC = () => {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: i * 0.05,
    size: 15 + Math.random() * 25,
  }));

  return (
    <>
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="absolute text-yellow-400 animate-star-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            fontSize: `${star.size}px`,
            animationDelay: `${star.delay}s`,
          }}
        >
          ★
        </div>
      ))}
    </>
  );
};

// Friendship: Rainbow circles expanding
const FriendshipAnimation: React.FC = () => {
  const circles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    color: ['#ef4444', '#f59e0b', '#fbbf24', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f97316'][i],
    delay: i * 0.2,
  }));

  return (
    <>
      {circles.map((circle) => (
        <div
          key={`circle-${circle.id}`}
          className="absolute animate-rainbow-expand"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: `4px solid ${circle.color}`,
            animationDelay: `${circle.delay}s`,
          }}
        />
      ))}
    </>
  );
};

// Holiday: Heavy snowflakes or sparkles
const HolidayAnimation: React.FC = () => {
  const snowflakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: i * 0.05,
    size: 15 + Math.random() * 25,
    duration: 2 + Math.random() * 1.5,
  }));

  return (
    <>
      {snowflakes.map((snow) => (
        <div
          key={`snow-${snow.id}`}
          className="absolute text-cyan-300/80 animate-snowflake-burst"
          style={{
            left: `${snow.x}%`,
            top: '-10%',
            fontSize: `${snow.size}px`,
            animationDelay: `${snow.delay}s`,
            animationDuration: `${snow.duration}s`,
          }}
        >
          ❄
        </div>
      ))}
    </>
  );
};

// Default: Sparkles and confetti
const DefaultAnimation: React.FC = () => {
  const sparkles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: i * 0.05,
    color: ['#8b5cf6', '#ec4899', '#f59e0b'][i % 3],
    size: 20 + Math.random() * 20,
  }));

  return (
    <>
      {sparkles.map((sparkle) => (
        <div
          key={`sparkle-${sparkle.id}`}
          className="absolute animate-sparkle-pop"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            fontSize: `${sparkle.size}px`,
            color: sparkle.color,
            animationDelay: `${sparkle.delay}s`,
          }}
        >
          ✨
        </div>
      ))}
    </>
  );
};
