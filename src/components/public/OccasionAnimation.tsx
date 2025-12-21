import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface OccasionAnimationProps {
  occasion: string;
}

// Конфигурация для каждого события
const occasionConfig: Record<string, {
  gradient: string;
  particles: { emoji: string; count: number }[];
  confettiColors: string[];
  confettiShapes: ('circle' | 'square' | 'star')[];
}> = {
  birthday: {
    gradient: 'from-pink-100 via-purple-50 to-indigo-100',
    particles: [
      { emoji: '🎈', count: 6 },
      { emoji: '🎁', count: 4 },
      { emoji: '✨', count: 5 },
    ],
    confettiColors: ['#FF1744', '#FF6B9D', '#FFD700', '#00D4FF', '#9C27B0', '#FF9800'],
    confettiShapes: ['circle', 'square'],
  },
  love: {
    gradient: 'from-rose-100 via-pink-50 to-red-100',
    particles: [
      { emoji: '❤️', count: 8 },
      { emoji: '💕', count: 6 },
      { emoji: '💖', count: 4 },
    ],
    confettiColors: ['#ff006e', '#ff1744', '#f50057', '#ff4081', '#e91e63'],
    confettiShapes: ['circle'],
  },
  valentines: {
    gradient: 'from-rose-100 via-pink-100 to-red-50',
    particles: [
      { emoji: '💘', count: 6 },
      { emoji: '💝', count: 5 },
      { emoji: '🌹', count: 4 },
    ],
    confettiColors: ['#ff006e', '#ff1744', '#f50057', '#ff4081'],
    confettiShapes: ['circle'],
  },
  thanks: {
    gradient: 'from-amber-50 via-yellow-50 to-orange-50',
    particles: [
      { emoji: '⭐', count: 7 },
      { emoji: '✨', count: 6 },
      { emoji: '🌟', count: 5 },
    ],
    confettiColors: ['#FFD700', '#FFA500', '#FFED4E', '#FFB700', '#FFC300'],
    confettiShapes: ['star', 'circle'],
  },
  congratulations: {
    gradient: 'from-yellow-50 via-orange-50 to-pink-50',
    particles: [
      { emoji: '🎉', count: 6 },
      { emoji: '🎊', count: 5 },
      { emoji: '🏆', count: 3 },
    ],
    confettiColors: ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#9c27b0'],
    confettiShapes: ['circle', 'square', 'star'],
  },
  'new-year': {
    gradient: 'from-indigo-100 via-purple-50 to-pink-100',
    particles: [
      { emoji: '🎆', count: 5 },
      { emoji: '🎇', count: 5 },
      { emoji: '✨', count: 6 },
    ],
    confettiColors: ['#FFD700', '#C0C0C0', '#FF6B6B', '#4ECDC4', '#9B59B6'],
    confettiShapes: ['star', 'circle'],
  },
  holiday: {
    gradient: 'from-cyan-50 via-sky-50 to-blue-100',
    particles: [
      { emoji: '🎄', count: 4 },
      { emoji: '🎁', count: 5 },
      { emoji: '⭐', count: 5 },
    ],
    confettiColors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'],
    confettiShapes: ['star', 'circle', 'square'],
  },
  friendship: {
    gradient: 'from-amber-50 via-lime-50 to-emerald-50',
    particles: [
      { emoji: '🤝', count: 4 },
      { emoji: '💫', count: 5 },
      { emoji: '🌈', count: 4 },
    ],
    confettiColors: ['#ff6b9d', '#c44569', '#f8b500', '#18dcff', '#7d5fff', '#32ff7e'],
    confettiShapes: ['star', 'circle'],
  },
  apology: {
    gradient: 'from-blue-50 via-indigo-50 to-purple-50',
    particles: [
      { emoji: '💙', count: 5 },
      { emoji: '🕊️', count: 4 },
      { emoji: '💐', count: 4 },
    ],
    confettiColors: ['#a8dadc', '#457b9d', '#81d4fa', '#b3e5fc'],
    confettiShapes: ['circle'],
  },
  'mothers-day': {
    gradient: 'from-pink-50 via-rose-50 to-fuchsia-50',
    particles: [
      { emoji: '🌸', count: 6 },
      { emoji: '💐', count: 5 },
      { emoji: '💝', count: 4 },
    ],
    confettiColors: ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493', '#DB7093'],
    confettiShapes: ['circle'],
  },
  anniversary: {
    gradient: 'from-amber-50 via-yellow-50 to-rose-50',
    particles: [
      { emoji: '💍', count: 4 },
      { emoji: '💕', count: 5 },
      { emoji: '🥂', count: 4 },
    ],
    confettiColors: ['#FFD700', '#FFA500', '#FF69B4', '#E6E6FA'],
    confettiShapes: ['star', 'circle'],
  },
};

// Стандартная конфигурация
const defaultConfig = {
  gradient: 'from-violet-50 via-purple-50 to-pink-50',
  particles: [
    { emoji: '✨', count: 6 },
    { emoji: '🎉', count: 4 },
    { emoji: '💫', count: 5 },
  ],
  confettiColors: ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'],
  confettiShapes: ['circle', 'square'] as ('circle' | 'square')[],
};

// Custom confetti shapes
const heartPath = 'M167.5,80.5c0,0-21.5-22.5-43-22.5c-21.5,0-41.5,22.5-41.5,22.5s-20-22.5-41.5-22.5S0,80.5,0,80.5s0,43,83.5,112.5C167,163,167.5,80.5,167.5,80.5z';
const starPath = 'M0,-15L4.5,-4.5L15,-3L7.5,3L9,15L0,9L-9,15L-7.5,3L-15,-3L-4.5,-4.5Z';

let heartShape: confetti.Shape;
let starShape: confetti.Shape;

try {
  heartShape = confetti.shapeFromPath({
    path: heartPath,
    matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -2.7916666666666665, -2.6666666666666665]
  });
  starShape = confetti.shapeFromPath({
    path: starPath,
    matrix: [1, 0, 0, 1, 0, 0]
  });
} catch (e) {
  // Fallback if shapes fail
}

export const OccasionAnimation: React.FC<OccasionAnimationProps> = ({ occasion }) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    emoji: string;
    left: number;
    delay: number;
    duration: number;
    size: number;
  }>>([]);

  const config = occasionConfig[occasion] || defaultConfig;

  // Создаём частицы при монтировании
  useEffect(() => {
    const newParticles: typeof particles = [];
    let id = 0;

    config.particles.forEach(({ emoji, count }) => {
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: id++,
          emoji,
          left: 5 + Math.random() * 90, // 5-95% от ширины
          delay: Math.random() * 8, // задержка 0-8 сек
          duration: 12 + Math.random() * 8, // длительность 12-20 сек
          size: 24 + Math.random() * 16, // размер 24-40px (ОДИНАКОВЫЙ для всех событий)
        });
      }
    });

    setParticles(newParticles);
  }, [occasion]);

  // Запускаем confetti burst при загрузке
  useEffect(() => {
    const shapes = config.confettiShapes.map(shape => {
      if (shape === 'star' && starShape) return starShape;
      return shape;
    });

    // Добавляем сердечки для love-related событий
    const isLoveOccasion = ['love', 'valentines', 'anniversary', 'mothers-day'].includes(occasion);
    if (isLoveOccasion && heartShape) {
      shapes.push(heartShape);
    }

    // Initial burst
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        startVelocity: 35,
        origin: { x: 0.5, y: 0.5 },
        colors: config.confettiColors,
        shapes: shapes,
        scalar: 1.5,
        gravity: 0.6,
        ticks: 300,
      });
    }, 300);

    // Side bursts
    setTimeout(() => {
      confetti({
        particleCount: 35,
        angle: 60,
        spread: 60,
        startVelocity: 30,
        origin: { x: 0, y: 0.6 },
        colors: config.confettiColors,
        shapes: shapes,
        scalar: 1.3,
        gravity: 0.5,
        ticks: 250,
      });
      confetti({
        particleCount: 35,
        angle: 120,
        spread: 60,
        startVelocity: 30,
        origin: { x: 1, y: 0.6 },
        colors: config.confettiColors,
        shapes: shapes,
        scalar: 1.3,
        gravity: 0.5,
        ticks: 250,
      });
    }, 600);

    // Continuous gentle confetti
    const interval = setInterval(() => {
      confetti({
        particleCount: 8,
        spread: 80,
        startVelocity: 12,
        origin: { x: Math.random(), y: 0 },
        colors: config.confettiColors,
        shapes: shapes,
        scalar: 1.2,
        gravity: 0.3,
        ticks: 400,
        drift: (Math.random() - 0.5) * 0.3,
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [occasion, config]);

  // Проверяем prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (reducedMotion) {
    // Показываем только статичный градиент
    return (
      <div className={`fixed inset-0 -z-10 bg-gradient-to-br ${config.gradient}`} />
    );
  }

  return (
    <>
      {/* Градиентный фон */}
      <div className={`fixed inset-0 -z-10 bg-gradient-to-br ${config.gradient}`}>
        {/* Мягкое свечение */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/20" />
      </div>

      {/* Плавающие эмодзи - ОДИНАКОВЫЕ РАЗМЕРЫ для всех событий */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute animate-occasion-float"
            style={{
              left: `${particle.left}%`,
              bottom: '-10%',
              fontSize: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              opacity: 0.7,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            }}
          >
            {particle.emoji}
          </div>
        ))}
      </div>
    </>
  );
};

export default OccasionAnimation;
