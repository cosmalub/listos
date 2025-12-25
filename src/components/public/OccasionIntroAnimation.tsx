import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useIntroRitual } from './IntroRitualContext';

interface OccasionIntroAnimationProps {
  occasion: string;
}

/**
 * OccasionIntroAnimation
 * 
 * Elegant, mobile-first animations for the intro ritual phase.
 * 
 * Design principles:
 * - Quality > quantity - fewer, larger, slower elements
 * - Mobile-first - all motion from center, nothing cropped
 * - Birthday/Congratulations use confetti (2-3 waves from center)
 * - Love/Thanks/Apology use CSS glow effects (no particles)
 * - Smooth fade-out in last 30% of ritual
 * - Complete unmount after ritual ends
 */
export const OccasionIntroAnimation: React.FC<OccasionIntroAnimationProps> = ({
  occasion
}) => {
  const { isRitualActive, ritualProgress, ritualDuration } = useIntroRitual();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiInstanceRef = useRef<confetti.CreateTypes | null>(null);
  const hasPlayedRef = useRef(false);
  const [opacity, setOpacity] = useState(1);
  
  // Glow animation state for non-confetti occasions
  const [glowScale, setGlowScale] = useState(1);
  const [glowOpacity, setGlowOpacity] = useState(0);

  // Determine if this occasion uses confetti or glow
  const usesConfetti = occasion === 'birthday' || occasion === 'congratulations' || occasion === 'friendship';

  // Create and manage canvas for confetti
  useEffect(() => {
    if (!usesConfetti || !isRitualActive) return;

    // Create dedicated canvas
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:50;';
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    // Create confetti instance with resize and worker
    confettiInstanceRef.current = confetti.create(canvas, {
      resize: true,
      useWorker: true
    });

    return () => {
      // Clean up canvas and confetti instance
      if (confettiInstanceRef.current) {
        confettiInstanceRef.current.reset();
        confettiInstanceRef.current = null;
      }
      if (canvasRef.current && canvasRef.current.parentNode) {
        canvasRef.current.parentNode.removeChild(canvasRef.current);
        canvasRef.current = null;
      }
    };
  }, [usesConfetti, isRitualActive]);

  // Play confetti animation (Birthday/Congratulations/Friendship)
  useEffect(() => {
    if (!usesConfetti || hasPlayedRef.current || !isRitualActive || !confettiInstanceRef.current) return;
    hasPlayedRef.current = true;

    const fireConfetti = confettiInstanceRef.current;
    
    if (occasion === 'birthday' || occasion === 'congratulations') {
      playCelebrationWaves(fireConfetti, ritualDuration);
    } else if (occasion === 'friendship') {
      playFriendshipWaves(fireConfetti, ritualDuration);
    }
  }, [occasion, usesConfetti, isRitualActive, ritualDuration]);

  // Glow breathing animation for Love/Thanks/Apology
  useEffect(() => {
    if (usesConfetti || !isRitualActive) return;

    // Fade in glow
    const fadeInTimer = setTimeout(() => setGlowOpacity(1), 100);

    // Breathing animation
    let animationFrame: number;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const breathCycle = Math.sin(elapsed / 2000) * 0.5 + 0.5; // 0-1, 4s cycle
      
      if (occasion === 'love') {
        setGlowScale(1 + breathCycle * 0.15); // 1.0 - 1.15
      } else if (occasion === 'thanks') {
        setGlowScale(1 + breathCycle * 0.08); // 1.0 - 1.08 (subtle)
      } else if (occasion === 'apology') {
        // Almost no motion for apology
        setGlowScale(1 + breathCycle * 0.03); // 1.0 - 1.03
      } else {
        setGlowScale(1 + breathCycle * 0.1);
      }
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);

    return () => {
      clearTimeout(fadeInTimer);
      cancelAnimationFrame(animationFrame);
    };
  }, [occasion, usesConfetti, isRitualActive]);

  // Fade out in last 30% of ritual
  useEffect(() => {
    if (ritualProgress > 0.7) {
      const fadeProgress = (ritualProgress - 0.7) / 0.3;
      setOpacity(1 - fadeProgress);
      setGlowOpacity(1 - fadeProgress);
    }
  }, [ritualProgress]);

  // Don't render after ritual ends
  if (!isRitualActive) {
    return null;
  }

  // Confetti occasions: canvas handles rendering
  if (usesConfetti) {
    return null;
  }

  // Glow-based occasions: render CSS glow element
  return (
    <div 
      className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center"
      style={{ opacity }}
      aria-hidden="true"
    >
      {occasion === 'love' && (
        <div
          className="absolute rounded-full"
          style={{
            width: '60vmin',
            height: '60vmin',
            background: 'radial-gradient(circle, rgba(255,0,110,0.25) 0%, rgba(255,23,68,0.15) 40%, rgba(245,0,87,0.05) 70%, transparent 100%)',
            transform: `scale(${glowScale})`,
            opacity: glowOpacity,
            transition: 'opacity 1.5s ease-out',
            filter: 'blur(20px)',
          }}
        />
      )}
      
      {occasion === 'thanks' && (
        <div
          className="absolute rounded-full"
          style={{
            width: '50vmin',
            height: '50vmin',
            background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(255,165,0,0.12) 40%, rgba(255,183,0,0.04) 70%, transparent 100%)',
            transform: `scale(${glowScale})`,
            opacity: glowOpacity,
            transition: 'opacity 1.5s ease-out',
            filter: 'blur(25px)',
          }}
        />
      )}
      
      {occasion === 'apology' && (
        <div
          className="absolute rounded-full"
          style={{
            width: '40vmin',
            height: '40vmin',
            background: 'radial-gradient(circle, rgba(129,212,250,0.15) 0%, rgba(179,229,252,0.08) 50%, transparent 100%)',
            transform: `scale(${glowScale})`,
            opacity: glowOpacity * 0.7, // Even more subtle
            transition: 'opacity 2s ease-out',
            filter: 'blur(30px)',
          }}
        />
      )}
      
      {/* Default glow for unknown occasions */}
      {!['love', 'thanks', 'apology'].includes(occasion) && (
        <div
          className="absolute rounded-full"
          style={{
            width: '50vmin',
            height: '50vmin',
            background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, rgba(236,72,153,0.1) 50%, transparent 100%)',
            transform: `scale(${glowScale})`,
            opacity: glowOpacity,
            transition: 'opacity 1.5s ease-out',
            filter: 'blur(25px)',
          }}
        />
      )}
    </div>
  );
};

/**
 * Birthday / Congratulations
 * 2-3 elegant waves from center over 8-10 seconds
 * No side bursts, mobile-friendly
 */
const playCelebrationWaves = (fire: confetti.CreateTypes, duration: number) => {
  const colors = ['#FF6B9D', '#FFD700', '#9C27B0', '#4CAF50', '#00D4FF'];
  
  // Wave 1: Initial burst (300ms delay)
  setTimeout(() => {
    fire({
      particleCount: 30,
      spread: 70,
      startVelocity: 20,
      origin: { x: 0.5, y: 0.4 },
      colors,
      shapes: ['circle'],
      scalar: 2.0,
      gravity: 0.35,
      ticks: 350,
      drift: 0,
      decay: 0.93
    });
  }, 300);

  // Wave 2: Second gentle burst (2.5s)
  setTimeout(() => {
    fire({
      particleCount: 25,
      spread: 60,
      startVelocity: 18,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes: ['circle'],
      scalar: 1.8,
      gravity: 0.3,
      ticks: 320,
      drift: 0,
      decay: 0.92
    });
  }, 2500);

  // Wave 3: Final soft burst (5s) - only if duration allows
  if (duration >= 7000) {
    setTimeout(() => {
      fire({
        particleCount: 20,
        spread: 50,
        startVelocity: 15,
        origin: { x: 0.5, y: 0.5 },
        colors,
        shapes: ['circle'],
        scalar: 1.6,
        gravity: 0.25,
        ticks: 280,
        drift: 0,
        decay: 0.91
      });
    }, 5000);
  }
};

/**
 * Friendship
 * Single elegant wave with rainbow colors
 * Reduced particles, center origin
 */
const playFriendshipWaves = (fire: confetti.CreateTypes, duration: number) => {
  const colors = ['#ff6b9d', '#7d5fff', '#18dcff', '#32ff7e', '#f8b500'];
  
  // Single gentle wave
  setTimeout(() => {
    fire({
      particleCount: 25,
      spread: 65,
      startVelocity: 16,
      origin: { x: 0.5, y: 0.45 },
      colors,
      shapes: ['circle'],
      scalar: 1.6,
      gravity: 0.35,
      ticks: 300,
      drift: 0,
      decay: 0.92
    });
  }, 400);

  // Second subtle wave
  if (duration >= 6000) {
    setTimeout(() => {
      fire({
        particleCount: 18,
        spread: 55,
        startVelocity: 14,
        origin: { x: 0.5, y: 0.5 },
        colors,
        shapes: ['circle'],
        scalar: 1.4,
        gravity: 0.3,
        ticks: 260,
        drift: 0,
        decay: 0.91
      });
    }, 3500);
  }
};

export default OccasionIntroAnimation;

