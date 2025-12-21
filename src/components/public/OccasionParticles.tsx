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
    console.log('OccasionParticles: Starting initialization for occasion:', occasion);
    initParticlesEngine(async (engine) => {
      console.log('OccasionParticles: Loading slim engine...');
      await loadSlim(engine);
    }).then(() => {
      console.log('OccasionParticles: Engine initialized successfully!');
      setInit(true);
    }).catch((error) => {
      console.error('OccasionParticles: Failed to initialize engine:', error);
    });
  }, []);

  // Store container reference for potential interactions
  const particlesLoaded = async (container?: Container) => {
    console.log('OccasionParticles: Particles loaded, container:', container?.id);
  };

  // Get config based on occasion
  const config = getParticleConfig(occasion);

  // Check for reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    console.log('OccasionParticles: Reduced motion preference:', mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Don't render particles if user prefers reduced motion
  if (reducedMotion) {
    console.log('OccasionParticles: Not rendering due to reduced motion preference');
    return null;
  }

  // Show loading state while initializing
  if (!init) {
    console.log('OccasionParticles: Still initializing...');
    return null;
  }

  console.log('OccasionParticles: Rendering particles for occasion:', occasion);

  return (
    <Particles
      id={`occasion-particles-${occasion}`}
      className={className}
      particlesLoaded={particlesLoaded}
      options={config}
    />
  );
};

export default OccasionParticles;