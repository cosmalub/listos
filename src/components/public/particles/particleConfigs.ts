import type { ISourceOptions } from "@tsparticles/engine";

// Birthday: DISABLED - using canvas-confetti only
export const birthdayConfig: ISourceOptions = {
  fullScreen: { enable: true, zIndex: 40 },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 0 } // Disabled
  }
};

// Love: DISABLED - using canvas-confetti only (big hearts)
export const loveConfig: ISourceOptions = {
  fullScreen: { enable: true, zIndex: 40 },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 0 } // Disabled
  }
};

// Thanks: Golden gentle sparkles - using geometric shapes
export const thanksConfig: ISourceOptions = {
  fullScreen: { enable: true, zIndex: 40 },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 25, density: { enable: true } },
    color: { value: ["#FFD700", "#FFA500", "#FFED4E", "#FFB700"] },
    shape: { type: ["circle", "star"] },
    opacity: { 
      value: { min: 0.4, max: 0.8 },
      animation: { enable: true, speed: 0.8, sync: false }
    },
    size: { value: { min: 4, max: 12 } },
    move: {
      enable: true,
      speed: { min: 0.5, max: 1.5 },
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "bounce" }
    },
    twinkle: {
      particles: { enable: true, frequency: 0.08, opacity: 1 }
    }
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "attract" }
    },
    modes: {
      attract: { distance: 150, duration: 0.3, factor: 2 }
    }
  }
};

// Congratulations: DISABLED - using canvas-confetti fireworks
export const congratulationsConfig: ISourceOptions = {
  fullScreen: { enable: true, zIndex: 40 },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 0 } // Disabled
  }
};

// Holiday: DISABLED - using canvas-confetti geometric shapes
export const holidayConfig: ISourceOptions = {
  fullScreen: { enable: true, zIndex: 40 },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 0 } // Disabled
  }
};

// Friendship: DISABLED - using canvas-confetti rainbow
export const friendshipConfig: ISourceOptions = {
  fullScreen: { enable: true, zIndex: 40 },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 0 } // Disabled
  }
};

// Apology: Very gentle, calming circles - the only occasion with particles
export const apologyConfig: ISourceOptions = {
  fullScreen: { enable: true, zIndex: 40 },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 20, density: { enable: true } },
    color: { value: ["#a8dadc", "#457b9d", "#81d4fa", "#b3e5fc", "#e1f5fe"] },
    shape: { type: "circle" },
    opacity: { 
      value: { min: 0.2, max: 0.5 },
      animation: { enable: true, speed: 0.15, sync: false }
    },
    size: { value: { min: 6, max: 20 } },
    move: {
      enable: true,
      speed: { min: 0.2, max: 0.6 }, // Very slow
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "bounce" }
    },
    wobble: {
      enable: true,
      distance: 8,
      speed: 2
    }
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" }
    },
    modes: {
      grab: { distance: 120, links: { opacity: 0.15 } }
    }
  }
};

// Default: Simple circles
export const defaultConfig: ISourceOptions = {
  fullScreen: { enable: true, zIndex: 40 },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 0 } // Disabled by default
  }
};

export const getParticleConfig = (occasion: string): ISourceOptions => {
  switch (occasion) {
    case 'birthday':
      return birthdayConfig;
    case 'love':
      return loveConfig;
    case 'thanks':
      return thanksConfig;
    case 'congratulations':
      return congratulationsConfig;
    case 'holiday':
      return holidayConfig;
    case 'friendship':
      return friendshipConfig;
    case 'apology':
      return apologyConfig;
    default:
      return defaultConfig;
  }
};
