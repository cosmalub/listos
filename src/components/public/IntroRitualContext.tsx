import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

/**
 * Intro Ritual Phase System
 * 
 * This context manages the "ritual" phase - the first 8-10 seconds after page load
 * where emotional animations play. After this phase ends:
 * - All animations stop completely
 * - Animation components unmount
 * - Only static background remains
 * - Focus shifts to music and lyrics
 */

interface IntroRitualContextType {
  isRitualActive: boolean;
  ritualProgress: number; // 0 to 1
  ritualDuration: number; // in milliseconds
  endRitual: () => void;
}

const IntroRitualContext = createContext<IntroRitualContextType | null>(null);

// Default ritual duration: 8 seconds
// This is intentionally short - the animation is a brief emotional moment,
// not a continuous distraction
const DEFAULT_RITUAL_DURATION = 8000;

interface IntroRitualProviderProps {
  children: React.ReactNode;
  duration?: number;
  onRitualEnd?: () => void;
}

export const IntroRitualProvider: React.FC<IntroRitualProviderProps> = ({
  children,
  duration = DEFAULT_RITUAL_DURATION,
  onRitualEnd
}) => {
  const [isRitualActive, setIsRitualActive] = useState(true);
  const [ritualProgress, setRitualProgress] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const animationFrameRef = useRef<number | null>(null);

  const endRitual = useCallback(() => {
    setIsRitualActive(false);
    setRitualProgress(1);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    onRitualEnd?.();
  }, [onRitualEnd]);

  useEffect(() => {
    startTimeRef.current = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      setRitualProgress(progress);

      if (progress >= 1) {
        endRitual();
      } else {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateProgress);

    // Fallback timer to ensure ritual ends even if RAF is blocked
    const fallbackTimer = setTimeout(endRitual, duration + 100);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(fallbackTimer);
    };
  }, [duration, endRitual]);

  return (
    <IntroRitualContext.Provider 
      value={{ 
        isRitualActive, 
        ritualProgress, 
        ritualDuration: duration,
        endRitual 
      }}
    >
      {children}
    </IntroRitualContext.Provider>
  );
};

export const useIntroRitual = (): IntroRitualContextType => {
  const context = useContext(IntroRitualContext);
  if (!context) {
    // Return default values if used outside provider (graceful degradation)
    return {
      isRitualActive: false,
      ritualProgress: 1,
      ritualDuration: DEFAULT_RITUAL_DURATION,
      endRitual: () => {}
    };
  }
  return context;
};

/**
 * Hook for components that should only render during the ritual phase
 * Returns null after ritual ends, allowing for clean unmounting
 */
export const useRitualGuard = () => {
  const { isRitualActive, ritualProgress } = useIntroRitual();
  
  return {
    shouldRender: isRitualActive,
    progress: ritualProgress,
    fadeOutOpacity: isRitualActive ? 1 : 0
  };
};

