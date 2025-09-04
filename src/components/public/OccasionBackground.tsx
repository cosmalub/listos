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
      case 'congratulations':
        return {
          background: 'bg-gradient-to-br from-yellow-100/80 via-orange-50/60 to-pink-100/80',
          particles: 'congratulations-particles',
          overlay: 'after:bg-gradient-to-br after:from-yellow-400/20 after:via-orange-300/10 after:to-pink-400/20'
        };
      case 'apology':
        return {
          background: 'bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-purple-100/80',
          particles: 'apology-particles',
          overlay: 'after:bg-gradient-to-br after:from-blue-400/15 after:via-indigo-300/10 after:to-purple-400/15'
        };
      case 'thanks':
        return {
          background: 'bg-gradient-to-br from-green-50/80 via-emerald-50/60 to-teal-100/80',
          particles: 'thanks-particles',
          overlay: 'after:bg-gradient-to-br after:from-green-400/15 after:via-emerald-300/10 after:to-teal-400/15'
        };
      default:
        return {
          background: 'bg-gradient-soft',
          particles: 'default-particles',
          overlay: 'after:bg-gradient-primary after:opacity-10'
        };
    }
  };

  const { background, particles, overlay } = getBackgroundByOccasion(occasion);

  return (
    <div className={cn(
      "fixed inset-0 -z-10",
      background,
      `before:absolute before:inset-0 before:${particles}`,
      `after:absolute after:inset-0 ${overlay}`,
      className
    )}>
      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute rounded-full opacity-60",
              occasion === 'congratulations' && "w-3 h-3 bg-yellow-400 animate-bounce",
              occasion === 'apology' && "w-2 h-2 bg-blue-400", 
              occasion === 'thanks' && "w-2 h-2 bg-green-400",
              !['congratulations', 'apology', 'thanks'].includes(occasion) && "w-2 h-2 bg-primary"
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animation: occasion === 'congratulations' 
                ? `bounce ${1 + Math.random() * 2}s ease-in-out infinite`
                : `float ${3 + Math.random() * 4}s ease-in-out infinite`
            }}
          />
        ))}
      </div>
    </div>
  );
};