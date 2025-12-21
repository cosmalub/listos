import type { ISourceOptions } from "@tsparticles/engine";

// Birthday: Festive colorful confetti with balloons
export const birthdayConfig: ISourceOptions = {
  fullScreen: { enable: true, zIndex: 40 },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 60, density: { enable: true } },
    color: { value: ["#FF1744", "#FF6B9D", "#FFD700", "#00D4FF", "#9C27B0", "#FF9800"] },
    shape: { 
      type: ["circle", "square"],
    },
    opacity: { value: { min: 0.6, max: 1 } },
    size: { value: { min: 8, max: 18 } },
    move: {
      enable: true,
      speed: { min: 2, max: 5 }, // Slower
      direction: "bottom",
      random: true,
      straight: false,
      outModes: { default: "out", top: "none" },
      gravity: { enable: true, acceleration: 1.5 } // Gentler gravity
    },
    rotate: {
      value: { min: 0, max: 360 },
      direction: "random",
      animation: { enable: true, speed: 10 }
    },
    wobble: {
      enable: true,
      distance: 30,
      speed: 10
    },
    tilt: {
      enable: true,
      value: { min: 0, max: 360 },
      direction: "random",
      animation: { enable: true, speed: 20 }
    }
  },
  interactivity: {
    events: {
      onClick: { enable: true, mode: "push" },
      onHover: { enable: true, mode: "repulse" }
    },
    modes: {
      push: { quantity: 10 },
      repulse: { distance: 100, duration: 0.4 }
    }
  },
  emitters: [
    {
      position: { x: 50, y: 0 },
      rate: { delay: 0.3, quantity: 5 },
      size: { width: 100, height: 10 }
    }
  ]
};

// Love: Romantic floating hearts - ONLY HEARTS
export const loveConfig: ISourceOptions = {
  fullScreen: { enable: true, zIndex: 40 },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 40, density: { enable: true } },
    color: { value: ["#ff006e", "#fb5607", "#ff1744", "#f50057", "#ff4081"] },
    shape: {
      type: "char",
      options: {
        char: {
          value: ["❤️", "💕", "💖", "💗", "💘", "♥"],
          font: "Segoe UI Emoji",
          weight: "400"
        }
      }
    },
    opacity: { value: { min: 0.6, max: 1 } },
    size: { value: { min: 24, max: 48 } }, // Bigger hearts
    move: {
      enable: true,
      speed: { min: 1.5, max: 4 },
      direction: "top", // Float up
      random: true,
      straight: false,
      outModes: { default: "out", bottom: "none" }
    },
    wobble: {
      enable: true,
      distance: 15,
      speed: 6
    }
  },
  interactivity: {
    events: {
      onClick: { enable: true, mode: "push" },
      onHover: { enable: true, mode: "bubble" }
    },
    modes: {
      push: { quantity: 5 },
      bubble: { distance: 150, size: 60, duration: 0.3 }
    }
  },
  emitters: [
    {
      position: { x: 50, y: 100 },
      rate: { delay: 0.4, quantity: 3 },
      size: { width: 100, height: 10 }
    }
  ]
};

// Thanks: Golden stars and sparkles
export const thanksConfig: ISourceOptions = {
  fullScreen: { enable: true, zIndex: 40 },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 50, density: { enable: true } },
    color: { value: ["#FFD700", "#FFA500", "#FFED4E", "#FFB700", "#FFC300"] },
    shape: {
      type: "char",
      options: {
        char: {
          value: ["⭐", "✨", "🌟", "💫", "★"],
          font: "Segoe UI Emoji",
          weight: "400"
        }
      }
    },
    opacity: { 
      value: { min: 0.5, max: 1 },
      animation: { enable: true, speed: 1, sync: false }
    },
    size: { value: { min: 18, max: 36 } },
    move: {
      enable: true,
      speed: { min: 1, max: 2.5 },
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "bounce" }
    },
    twinkle: {
      particles: { enable: true, frequency: 0.1, opacity: 1 }
    }
  },
  interactivity: {
    events: {
      onClick: { enable: true, mode: "push" },
      onHover: { enable: true, mode: "attract" }
    },
    modes: {
      push: { quantity: 4 },
      attract: { distance: 200, duration: 0.4, factor: 3 }
    }
  }
};

// Congratulations: Fireworks effect
export const congratulationsConfig: ISourceOptions = {
  fullScreen: { enable: true, zIndex: 40 },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 0 },
    color: { value: ["#ffd700", "#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#9c27b0"] },
    shape: { type: ["circle", "star"] },
    opacity: { value: { min: 0.4, max: 1 } },
    size: { value: { min: 4, max: 10 } },
    move: {
      enable: true,
      speed: { min: 8, max: 20 },
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "destroy" },
      gravity: { enable: true, acceleration: 6 }
    },
    life: {
      duration: { sync: false, value: 3 },
      count: 1
    }
  },
  emitters: [
    {
      position: { x: 50, y: 60 },
      rate: { delay: 0.5, quantity: 50 },
      size: { width: 0, height: 0 },
      life: { duration: 0.1 },
      particles: {
        move: {
          direction: "none",
          outModes: { default: "destroy" }
        }
      }
    }
  ]
};

// Holiday: Universal festive (NO snowflakes - works for any holiday)
export const holidayConfig: ISourceOptions = {
  fullScreen: { enable: true, zIndex: 40 },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 70, density: { enable: true } },
    color: { value: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F"] },
    shape: {
      type: "char",
      options: {
        char: {
          value: ["🎉", "🎊", "✨", "⭐", "🎈", "🎁"],
          font: "Segoe UI Emoji",
          weight: "400"
        }
      }
    },
    opacity: { value: { min: 0.5, max: 0.9 } },
    size: { value: { min: 16, max: 32 } },
    move: {
      enable: true,
      speed: { min: 2, max: 4 },
      direction: "bottom",
      random: true,
      straight: false,
      outModes: { default: "out", top: "none" },
      gravity: { enable: true, acceleration: 0.5 }
    },
    wobble: {
      enable: true,
      distance: 30,
      speed: 12
    },
    rotate: {
      value: { min: 0, max: 360 },
      animation: { enable: true, speed: 6 }
    }
  },
  interactivity: {
    events: {
      onClick: { enable: true, mode: "push" },
      onHover: { enable: true, mode: "slow" }
    },
    modes: {
      push: { quantity: 6 },
      slow: { factor: 3, radius: 100 }
    }
  }
};

// Friendship: Rainbow sparkles and stars
export const friendshipConfig: ISourceOptions = {
  fullScreen: { enable: true, zIndex: 40 },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 60, density: { enable: true } },
    color: { value: ["#ff6b9d", "#c44569", "#f8b500", "#18dcff", "#7d5fff", "#ff9ff3", "#32ff7e"] },
    shape: {
      type: "char",
      options: {
        char: {
          value: ["✨", "⭐", "💫", "🌈", "💖", "★"],
          font: "Segoe UI Emoji",
          weight: "400"
        }
      }
    },
    opacity: { 
      value: { min: 0.6, max: 1 },
      animation: { enable: true, speed: 0.5, sync: false }
    },
    size: { value: { min: 20, max: 38 } },
    move: {
      enable: true,
      speed: { min: 1.5, max: 4 },
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "bounce" }
    },
    twinkle: {
      particles: { enable: true, frequency: 0.15, opacity: 1 }
    }
  },
  interactivity: {
    events: {
      onClick: { enable: true, mode: "push" },
      onHover: { enable: true, mode: "connect" }
    },
    modes: {
      push: { quantity: 5 },
      connect: { distance: 80, radius: 120 }
    }
  }
};

// Apology: Gentle, calming particles - very slow and soft
export const apologyConfig: ISourceOptions = {
  fullScreen: { enable: true, zIndex: 40 },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 30, density: { enable: true } },
    color: { value: ["#a8dadc", "#457b9d", "#81d4fa", "#b3e5fc", "#e1f5fe"] },
    shape: { type: "circle" },
    opacity: { 
      value: { min: 0.3, max: 0.6 },
      animation: { enable: true, speed: 0.2, sync: false }
    },
    size: { value: { min: 8, max: 24 } },
    move: {
      enable: true,
      speed: { min: 0.3, max: 1 }, // Very slow
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "bounce" }
    },
    wobble: {
      enable: true,
      distance: 10,
      speed: 3
    }
  },
  interactivity: {
    events: {
      onClick: { enable: true, mode: "push" },
      onHover: { enable: true, mode: "grab" }
    },
    modes: {
      push: { quantity: 3 },
      grab: { distance: 150, links: { opacity: 0.2 } }
    }
  }
};

// Default: Multi-color celebration
export const defaultConfig: ISourceOptions = {
  fullScreen: { enable: true, zIndex: 40 },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 50, density: { enable: true } },
    color: { value: ["#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6"] },
    shape: { type: ["circle", "square"] },
    opacity: { value: { min: 0.5, max: 1 } },
    size: { value: { min: 8, max: 18 } },
    move: {
      enable: true,
      speed: { min: 1.5, max: 4 },
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "bounce" }
    },
    rotate: {
      value: { min: 0, max: 360 },
      animation: { enable: true, speed: 8 }
    }
  },
  interactivity: {
    events: {
      onClick: { enable: true, mode: "push" },
      onHover: { enable: true, mode: "repulse" }
    },
    modes: {
      push: { quantity: 6 },
      repulse: { distance: 100, duration: 0.4 }
    }
  }
};

export const getParticleConfig = (occasion: string): ISourceOptions => {
  console.log('getParticleConfig: Getting config for occasion:', occasion);
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
