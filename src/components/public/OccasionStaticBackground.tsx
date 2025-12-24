import React from 'react';
import { cn } from '@/lib/utils';

interface OccasionStaticBackgroundProps {
  occasion: string;
  className?: string;
}

/**
 * OccasionStaticBackground
 * 
 * A completely STATIC background for each occasion.
 * 
 * Design principles:
 * - NO animations whatsoever
 * - NO particles, no floating elements
 * - Clean, elegant gradient that sets emotional tone
 * - Creates atmosphere without distraction
 * - Allows focus on music and lyrics
 * 
 * This is what remains after the intro ritual ends.
 * The background should feel calm, expensive, and respectful.
 */
export const OccasionStaticBackground: React.FC<OccasionStaticBackgroundProps> = ({
  occasion,
  className
}) => {
  const backgroundStyle = getBackgroundStyle(occasion);

  return (
    <div 
      className={cn(
        "fixed inset-0 -z-10 transition-opacity duration-1000",
        className
      )}
      style={backgroundStyle}
      aria-hidden="true"
    />
  );
};

/**
 * Get static background style for each occasion
 * These are carefully crafted gradients that evoke the right emotion
 * without any movement or distraction
 */
const getBackgroundStyle = (occasion: string): React.CSSProperties => {
  switch (occasion) {
    case 'birthday':
      // Warm, joyful - soft pink to lavender
      return {
        background: `
          linear-gradient(
            135deg,
            hsl(330, 70%, 96%) 0%,
            hsl(280, 60%, 95%) 50%,
            hsl(250, 60%, 96%) 100%
          )
        `
      };

    case 'congratulations':
      // Celebratory - warm gold to soft coral
      return {
        background: `
          linear-gradient(
            135deg,
            hsl(45, 80%, 96%) 0%,
            hsl(35, 70%, 94%) 50%,
            hsl(15, 60%, 95%) 100%
          )
        `
      };

    case 'love':
      // Intimate, warm - rose to soft pink
      return {
        background: `
          linear-gradient(
            135deg,
            hsl(350, 80%, 96%) 0%,
            hsl(340, 70%, 95%) 50%,
            hsl(330, 60%, 96%) 100%
          )
        `
      };

    case 'apology':
      // Calm, sincere - soft blue to misty
      return {
        background: `
          linear-gradient(
            135deg,
            hsl(210, 50%, 97%) 0%,
            hsl(220, 40%, 96%) 50%,
            hsl(230, 35%, 97%) 100%
          )
        `
      };

    case 'thanks':
      // Warm gratitude - soft green to cream
      return {
        background: `
          linear-gradient(
            135deg,
            hsl(120, 30%, 96%) 0%,
            hsl(90, 25%, 95%) 50%,
            hsl(60, 30%, 96%) 100%
          )
        `
      };

    case 'friendship':
      // Warm, connected - amber to soft peach
      return {
        background: `
          linear-gradient(
            135deg,
            hsl(40, 60%, 96%) 0%,
            hsl(50, 50%, 95%) 50%,
            hsl(30, 50%, 96%) 100%
          )
        `
      };

    case 'holiday':
      // Festive but calm - cool silver to soft blue
      return {
        background: `
          linear-gradient(
            135deg,
            hsl(200, 40%, 97%) 0%,
            hsl(210, 35%, 96%) 50%,
            hsl(220, 30%, 97%) 100%
          )
        `
      };

    default:
      // Elegant default - soft violet to lavender
      return {
        background: `
          linear-gradient(
            135deg,
            hsl(270, 50%, 97%) 0%,
            hsl(280, 40%, 96%) 50%,
            hsl(290, 35%, 97%) 100%
          )
        `
      };
  }
};

export default OccasionStaticBackground;

