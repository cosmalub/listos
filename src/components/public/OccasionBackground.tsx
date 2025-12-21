import React from 'react';
import { cn } from '@/lib/utils';

interface OccasionBackgroundProps {
  occasion: string;
  className?: string;
}

export const OccasionBackground: React.FC<OccasionBackgroundProps> = ({
  occasion,
  className
}) => {
  const getBackgroundByOccasion = (occasion: string) => {
    switch (occasion) {
      case 'birthday':
        return {
          background: 'bg-gradient-to-br from-pink-100/90 via-purple-50/70 to-blue-100/90',
          particleType: 'birthday',
          overlay: 'after:bg-gradient-to-br after:from-pink-400/20 after:via-purple-300/15 after:to-blue-400/20'
        };
      case 'congratulations':
        return {
          background: 'bg-gradient-to-br from-yellow-100/85 via-orange-50/65 to-pink-100/85',
          particleType: 'congratulations',
          overlay: 'after:bg-gradient-to-br after:from-yellow-400/20 after:via-orange-300/10 after:to-pink-400/20'
        };
      case 'love':
        return {
          background: 'bg-gradient-to-br from-rose-100/90 via-pink-50/70 to-red-100/90',
          particleType: 'love',
          overlay: 'after:bg-gradient-to-br after:from-rose-400/25 after:via-pink-300/15 after:to-red-400/25'
        };
      case 'apology':
        return {
          background: 'bg-gradient-to-br from-blue-50/85 via-indigo-50/65 to-purple-100/85',
          particleType: 'apology',
          overlay: 'after:bg-gradient-to-br after:from-blue-400/15 after:via-indigo-300/10 after:to-purple-400/15'
        };
      case 'thanks':
        return {
          background: 'bg-gradient-to-br from-green-50/85 via-emerald-50/65 to-teal-100/85',
          particleType: 'thanks',
          overlay: 'after:bg-gradient-to-br after:from-green-400/15 after:via-emerald-300/10 after:to-teal-400/15'
        };
      case 'friendship':
        return {
          background: 'bg-gradient-to-br from-amber-100/85 via-yellow-50/65 to-lime-100/85',
          particleType: 'friendship',
          overlay: 'after:bg-gradient-to-br after:from-amber-400/20 after:via-yellow-300/10 after:to-lime-400/20'
        };
      case 'holiday':
        return {
          background: 'bg-gradient-to-br from-cyan-100/85 via-sky-50/65 to-blue-100/85',
          particleType: 'holiday',
          overlay: 'after:bg-gradient-to-br after:from-cyan-400/20 after:via-sky-300/10 after:to-blue-400/20'
        };
      default:
        return {
          background: 'bg-gradient-to-br from-violet-100/85 via-purple-50/65 to-pink-100/85',
          particleType: 'default',
          overlay: 'after:bg-gradient-to-br after:from-violet-400/15 after:via-purple-300/10 after:to-pink-400/15'
        };
    }
  };

  const { background, particleType, overlay } = getBackgroundByOccasion(occasion);

  const renderParticles = () => {
    const particleCount = particleType === 'birthday' || particleType === 'love' ? 20 : 15;
    
    return [...Array(particleCount)].map((_, i) => {
      const delay = Math.random() * 5;
      const duration = 3 + Math.random() * 4;
      const left = Math.random() * 100;
      const size = 8 + Math.random() * 12;
      
      // Birthday: balloons and confetti
      if (particleType === 'birthday') {
        const isBalloon = i % 3 !== 0;
        if (isBalloon) {
          const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${left}%`,
                bottom: '-10%',
                animationDelay: `${delay}s`,
                animation: `balloon-rise ${duration + 3}s ease-out infinite`
              }}
            >
              <div 
                className="relative"
                style={{
                  width: `${size + 4}px`,
                  height: `${size + 8}px`,
                  backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.1)'
                }}
              >
                <div className="absolute bottom-0 left-1/2 w-px h-4 bg-gray-400 transform -translate-x-1/2 translate-y-full" />
              </div>
            </div>
          );
        } else {
          return (
            <div
              key={i}
              className="absolute opacity-80"
              style={{
                left: `${left}%`,
                top: `${-10 + Math.random() * 20}%`,
                width: `${size / 2}px`,
                height: `${size}px`,
                backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'][Math.floor(Math.random() * 4)],
                animationDelay: `${delay}s`,
                animation: `confetti-fall ${duration}s linear infinite`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          );
        }
      }
      
      // Love: hearts and petals
      if (particleType === 'love') {
        const isHeart = i % 2 === 0;
        if (isHeart) {
          return (
            <div
              key={i}
              className="absolute text-red-400/70"
              style={{
                left: `${left}%`,
                bottom: '-5%',
                fontSize: `${size + 4}px`,
                animationDelay: `${delay}s`,
                animation: `float-up ${duration + 2}s ease-in-out infinite`
              }}
            >
              ♥
            </div>
          );
        } else {
          return (
            <div
              key={i}
              className="absolute bg-pink-400/60 rounded-full"
              style={{
                left: `${left}%`,
                top: `${-5 + Math.random() * 15}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${delay}s`,
                animation: `petal-fall ${duration}s ease-in-out infinite`
              }}
            />
          );
        }
      }
      
      // Congratulations: colorful balloons
      if (particleType === 'congratulations') {
        const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              bottom: '-8%',
              width: `${size}px`,
              height: `${size + 4}px`,
              backgroundColor: colors[Math.floor(Math.random() * colors.length)],
              animationDelay: `${delay}s`,
              animation: `balloon-rise ${duration + 2}s ease-out infinite`,
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              opacity: 0.8
            }}
          />
        );
      }
      
      // Friendship: stars
      if (particleType === 'friendship') {
        return (
          <div
            key={i}
            className="absolute text-yellow-400/70"
            style={{
              left: `${left}%`,
              top: `${-5 + Math.random() * 15}%`,
              fontSize: `${size + 2}px`,
              animationDelay: `${delay}s`,
              animation: `twinkle ${duration}s ease-in-out infinite`
            }}
          >
            ★
          </div>
        );
      }
      
      // Holiday: Universal festive elements (no snowflakes)
      if (particleType === 'holiday') {
        const festiveElements = ['🎉', '🎊', '✨', '⭐', '🎈'];
        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${left}%`,
              top: `${-10 + Math.random() * 20}%`,
              fontSize: `${size + 2}px`,
              animationDelay: `${delay}s`,
              animation: `confetti-fall ${duration}s linear infinite`
            }}
          >
            {festiveElements[Math.floor(Math.random() * festiveElements.length)]}
          </div>
        );
      }
      
      // Default particles
      const colors = {
        apology: 'bg-blue-400/60',
        thanks: 'bg-green-400/60',
        default: 'bg-purple-400/60'
      };
      
      return (
        <div
          key={i}
          className={cn(
            "absolute rounded-full",
            colors[particleType as keyof typeof colors] || colors.default
          )}
          style={{
            left: `${left}%`,
            top: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${delay}s`,
            animation: `gentle-float ${duration}s ease-in-out infinite`
          }}
        />
      );
    });
  };

  return (
    <div className={cn(
      "fixed inset-0 -z-10",
      background,
      `after:absolute after:inset-0 ${overlay}`,
      className
    )}>
      <div className="absolute inset-0 overflow-hidden">
        {renderParticles()}
      </div>
    </div>
  );
};