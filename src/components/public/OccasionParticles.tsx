import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container } from "@tsparticles/engine";
import { getParticleConfig } from './particles/particleConfigs';

interface OccasionParticlesProps {
  occasion: string;
  className?: string;
}

export const OccasionParticles: React.FC<OccasionParticlesProps> = ({
  occasion,
  className = ""
}) => {
  const [init, setInit] = useState(false);

  // Initialize tsParticles engine once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Store container reference for potential interactions
  const particlesLoaded = async (container?: Container) => {
    console.log('Particles loaded:', container?.id);
  };

  // Get config based on occasion
  const config = getParticleConfig(occasion);

  // Check for reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Don't render particles if user prefers reduced motion or not initialized
  if (reducedMotion || !init) {
    return null;
  }

  return (
    <Particles
      id={`occasion-particles-${occasion}`}
      className={`fixed inset-0 z-40 pointer-events-auto ${className}`}
      particlesLoaded={particlesLoaded}
      options={config}
    />
  );
};

export default OccasionParticles;
