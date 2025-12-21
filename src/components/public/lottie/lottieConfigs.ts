// Lottie animation URLs from LottieFiles CDN
// These are high-quality, optimized animations

export interface LottieConfig {
  url: string;
  fallbackUrl?: string;
  loop: boolean;
  autoplay: boolean;
  speed?: number;
}

// CDN URLs for real Lottie animations
export const lottieUrls: Record<string, LottieConfig> = {
  birthday: {
    url: "https://lottie.host/4db68bbd-31f6-4cd8-84eb-189571d8e735/KJJlMTrK0S.json",
    fallbackUrl: "https://assets5.lottiefiles.com/packages/lf20_u4yrau.json",
    loop: false,
    autoplay: true,
    speed: 1
  },
  love: {
    url: "https://lottie.host/9a8c7e3a-3df2-4fa5-b2d1-c83e7c5a0e9f/hearts.json",
    fallbackUrl: "https://assets2.lottiefiles.com/packages/lf20_uwos23x2.json",
    loop: false,
    autoplay: true,
    speed: 1
  },
  thanks: {
    url: "https://lottie.host/stars-celebration.json",
    fallbackUrl: "https://assets9.lottiefiles.com/packages/lf20_obhph3sh.json",
    loop: false,
    autoplay: true,
    speed: 1
  },
  holiday: {
    url: "https://lottie.host/holiday-fireworks.json",
    fallbackUrl: "https://assets6.lottiefiles.com/packages/lf20_1pxqjqps.json",
    loop: false,
    autoplay: true,
    speed: 1
  },
  congratulations: {
    url: "https://lottie.host/congrats-confetti.json",
    fallbackUrl: "https://assets3.lottiefiles.com/packages/lf20_aEFaHc.json",
    loop: false,
    autoplay: true,
    speed: 1
  },
  friendship: {
    url: "https://lottie.host/friendship-sparkle.json",
    fallbackUrl: "https://assets7.lottiefiles.com/packages/lf20_xlkxtmul.json",
    loop: false,
    autoplay: true,
    speed: 1
  },
  apology: {
    url: "https://lottie.host/gentle-wave.json",
    fallbackUrl: "https://assets10.lottiefiles.com/packages/lf20_kxsd2ytq.json",
    loop: false,
    autoplay: true,
    speed: 0.8
  }
};

// Enhanced inline animations with more visible effects
// These are used as reliable fallbacks when CDN fails

export const birthdayInline = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 180,
  w: 500,
  h: 500,
  assets: [],
  layers: [
    // Multiple confetti pieces with different colors and positions
    ...Array.from({ length: 12 }, (_, i) => ({
      ddd: 0,
      ind: i + 1,
      ty: 4,
      nm: `confetti-${i}`,
      sr: 1,
      ks: {
        o: { a: 1, k: [
          { t: 0, s: [0], e: [100] },
          { t: 20, s: [100], e: [100] },
          { t: 150, s: [100], e: [0] },
          { t: 180, s: [0] }
        ]},
        r: { 
          a: 1, 
          k: [
            { t: 0, s: [0], e: [720 + Math.random() * 360] },
            { t: 180, s: [720 + Math.random() * 360] }
          ]
        },
        p: { 
          a: 1, 
          k: [
            { t: 0, s: [250 + (Math.random() - 0.5) * 100, 250, 0], e: [50 + i * 35, 500, 0] },
            { t: 180, s: [50 + i * 35, 500, 0] }
          ]
        },
        s: { 
          a: 1, 
          k: [
            { t: 0, s: [0, 0, 100], e: [100, 100, 100] },
            { t: 30, s: [100, 100, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "rc",
          d: 1,
          s: { a: 0, k: [15 + Math.random() * 10, 15 + Math.random() * 10] },
          p: { a: 0, k: [0, 0] },
          r: { a: 0, k: 2 }
        },
        {
          ty: "fl",
          c: { a: 0, k: [
            [1, 0.1, 0.3, 1],
            [1, 0.84, 0, 1],
            [0, 0.8, 1, 1],
            [0.6, 0.2, 0.8, 1],
            [1, 0.4, 0, 1],
            [0.2, 0.8, 0.4, 1]
          ][i % 6] },
          o: { a: 0, k: 100 }
        }
      ]
    }))
  ]
};

export const loveInline = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 180,
  w: 500,
  h: 500,
  assets: [],
  layers: [
    // Central big heart
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "main-heart",
      sr: 1,
      ks: {
        o: { a: 1, k: [
          { t: 0, s: [0], e: [100] },
          { t: 30, s: [100], e: [100] },
          { t: 150, s: [100], e: [0] },
          { t: 180, s: [0] }
        ]},
        r: { a: 0, k: 0 },
        p: { a: 0, k: [250, 250, 0] },
        s: { 
          a: 1, 
          k: [
            { t: 0, s: [0, 0, 100], e: [120, 120, 100] },
            { t: 40, s: [120, 120, 100], e: [100, 100, 100] },
            { t: 60, s: [100, 100, 100], e: [110, 110, 100] },
            { t: 80, s: [110, 110, 100], e: [100, 100, 100] },
            { t: 100, s: [100, 100, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "sh",
          ks: {
            a: 0,
            k: {
              c: true,
              v: [[0, -40], [40, -80], [80, -40], [40, 40], [0, 80], [-40, 40], [-80, -40], [-40, -80]],
              i: [[0, 0], [22, 0], [0, 22], [0, 0], [-22, 0], [0, 0], [0, -22], [0, 0]],
              o: [[0, 0], [0, 22], [22, 0], [0, 0], [0, -22], [-22, 0], [0, 0], [0, 22]]
            }
          }
        },
        {
          ty: "fl",
          c: { a: 0, k: [1, 0.1, 0.3, 1] },
          o: { a: 0, k: 100 }
        }
      ]
    },
    // Floating smaller hearts
    ...Array.from({ length: 8 }, (_, i) => ({
      ddd: 0,
      ind: i + 2,
      ty: 4,
      nm: `heart-${i}`,
      sr: 1,
      ks: {
        o: { a: 1, k: [
          { t: 20 + i * 10, s: [0], e: [80] },
          { t: 40 + i * 10, s: [80], e: [0] },
          { t: 180, s: [0] }
        ]},
        r: { a: 1, k: [
          { t: 0, s: [-15 + Math.random() * 30], e: [15 - Math.random() * 30] },
          { t: 180, s: [15 - Math.random() * 30] }
        ]},
        p: { 
          a: 1, 
          k: [
            { t: 0, s: [250 + (Math.random() - 0.5) * 200, 350, 0], e: [250 + (Math.random() - 0.5) * 300, 100, 0] },
            { t: 180, s: [250 + (Math.random() - 0.5) * 300, 100, 0] }
          ]
        },
        s: { a: 0, k: [30 + Math.random() * 20, 30 + Math.random() * 20, 100] }
      },
      shapes: [
        {
          ty: "sh",
          ks: {
            a: 0,
            k: {
              c: true,
              v: [[0, -15], [15, -30], [30, -15], [15, 15], [0, 30], [-15, 15], [-30, -15], [-15, -30]],
              i: [[0, 0], [8, 0], [0, 8], [0, 0], [-8, 0], [0, 0], [0, -8], [0, 0]],
              o: [[0, 0], [0, 8], [8, 0], [0, 0], [0, -8], [-8, 0], [0, 0], [0, 8]]
            }
          }
        },
        {
          ty: "fl",
          c: { a: 0, k: [[1, 0.2, 0.4, 1], [1, 0.4, 0.6, 1], [1, 0.3, 0.5, 1]][i % 3] },
          o: { a: 0, k: 100 }
        }
      ]
    }))
  ]
};

export const thanksInline = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 180,
  w: 500,
  h: 500,
  assets: [],
  layers: [
    // Multiple stars bursting out
    ...Array.from({ length: 10 }, (_, i) => ({
      ddd: 0,
      ind: i + 1,
      ty: 4,
      nm: `star-${i}`,
      sr: 1,
      ks: {
        o: { 
          a: 1, 
          k: [
            { t: i * 5, s: [0], e: [100] },
            { t: 30 + i * 5, s: [100], e: [100] },
            { t: 150, s: [100], e: [0] },
            { t: 180, s: [0] }
          ]
        },
        r: { 
          a: 1, 
          k: [
            { t: 0, s: [0], e: [180] },
            { t: 180, s: [180] }
          ]
        },
        p: { 
          a: 1, 
          k: [
            { t: 0, s: [250, 250, 0], e: [
              250 + Math.cos(i * 36 * Math.PI / 180) * 200,
              250 + Math.sin(i * 36 * Math.PI / 180) * 200,
              0
            ]},
            { t: 180, s: [
              250 + Math.cos(i * 36 * Math.PI / 180) * 200,
              250 + Math.sin(i * 36 * Math.PI / 180) * 200,
              0
            ]}
          ]
        },
        s: { 
          a: 1, 
          k: [
            { t: 0, s: [0, 0, 100], e: [80, 80, 100] },
            { t: 60, s: [80, 80, 100], e: [60, 60, 100] },
            { t: 180, s: [60, 60, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "sr",
          sy: 1,
          d: 1,
          pt: { a: 0, k: 5 },
          p: { a: 0, k: [0, 0] },
          r: { a: 0, k: 0 },
          ir: { a: 0, k: 15 },
          is: { a: 0, k: 0 },
          or: { a: 0, k: 35 },
          os: { a: 0, k: 0 }
        },
        {
          ty: "fl",
          c: { a: 0, k: [1, 0.84, 0, 1] },
          o: { a: 0, k: 100 }
        }
      ]
    }))
  ]
};

// Holiday: Universal festive confetti and stars (no snowflakes)
export const holidayInline = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 180,
  w: 500,
  h: 500,
  assets: [],
  layers: [
    // Festive confetti and stars
    ...Array.from({ length: 15 }, (_, i) => ({
      ddd: 0,
      ind: i + 1,
      ty: 4,
      nm: `festive-${i}`,
      sr: 1,
      ks: {
        o: { a: 1, k: [
          { t: i * 6, s: [0], e: [90] },
          { t: 25 + i * 6, s: [90], e: [90] },
          { t: 150, s: [90], e: [0] },
          { t: 180, s: [0] }
        ]},
        r: { 
          a: 1, 
          k: [
            { t: 0, s: [0], e: [360 + Math.random() * 180] },
            { t: 180, s: [360 + Math.random() * 180] }
          ]
        },
        p: { 
          a: 1, 
          k: [
            { t: 0, s: [250 + (Math.random() - 0.5) * 150, 250, 0], e: [50 + i * 30, 500, 0] },
            { t: 180, s: [50 + i * 30, 500, 0] }
          ]
        },
        s: { a: 0, k: [50 + Math.random() * 30, 50 + Math.random() * 30, 100] }
      },
      shapes: [
        // Mix of stars and squares
        i % 2 === 0 ? {
          ty: "sr",
          sy: 1,
          d: 1,
          pt: { a: 0, k: 5 },
          p: { a: 0, k: [0, 0] },
          r: { a: 0, k: 0 },
          ir: { a: 0, k: 8 },
          is: { a: 0, k: 0 },
          or: { a: 0, k: 20 },
          os: { a: 0, k: 0 }
        } : {
          ty: "rc",
          d: 1,
          s: { a: 0, k: [12, 12] },
          p: { a: 0, k: [0, 0] },
          r: { a: 0, k: 2 }
        },
        {
          ty: "fl",
          c: { a: 0, k: [
            [1, 0.84, 0, 1],      // Gold
            [1, 0.42, 0.42, 1],   // Coral
            [0.31, 0.8, 0.77, 1], // Teal
            [0.27, 0.72, 0.82, 1], // Cyan
            [1, 0.63, 0.48, 1],   // Peach
            [0.6, 0.85, 0.78, 1]  // Mint
          ][i % 6] },
          o: { a: 0, k: 100 }
        }
      ]
    }))
  ]
};

export const congratulationsInline = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 180,
  w: 500,
  h: 500,
  assets: [],
  layers: [
    // Burst effect with expanding rings
    ...Array.from({ length: 5 }, (_, i) => ({
      ddd: 0,
      ind: i + 1,
      ty: 4,
      nm: `ring-${i}`,
      sr: 1,
      ks: {
        o: { 
          a: 1, 
          k: [
            { t: i * 15, s: [100], e: [0] },
            { t: 60 + i * 15, s: [0] }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [250, 250, 0] },
        s: { 
          a: 1, 
          k: [
            { t: i * 15, s: [0, 0, 100], e: [200, 200, 100] },
            { t: 60 + i * 15, s: [200, 200, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "el",
          p: { a: 0, k: [0, 0] },
          s: { a: 0, k: [100, 100] }
        },
        {
          ty: "st",
          c: { a: 0, k: [[1, 0.84, 0, 1], [1, 0.4, 0, 1], [0.8, 0.2, 0.8, 1], [0, 0.8, 0.8, 1], [0.4, 1, 0.4, 1]][i] },
          o: { a: 0, k: 100 },
          w: { a: 0, k: 8 }
        }
      ]
    })),
    // Confetti pieces
    ...Array.from({ length: 20 }, (_, i) => ({
      ddd: 0,
      ind: i + 6,
      ty: 4,
      nm: `confetti-${i}`,
      sr: 1,
      ks: {
        o: { a: 1, k: [
          { t: 10, s: [0], e: [100] },
          { t: 30, s: [100], e: [100] },
          { t: 150, s: [100], e: [0] },
          { t: 180, s: [0] }
        ]},
        r: { 
          a: 1, 
          k: [
            { t: 0, s: [0], e: [360 + Math.random() * 360] },
            { t: 180, s: [360 + Math.random() * 360] }
          ]
        },
        p: { 
          a: 1, 
          k: [
            { t: 0, s: [250, 250, 0], e: [
              250 + Math.cos(i * 18 * Math.PI / 180) * (150 + Math.random() * 100),
              250 + Math.sin(i * 18 * Math.PI / 180) * (150 + Math.random() * 100),
              0
            ]},
            { t: 180, s: [
              250 + Math.cos(i * 18 * Math.PI / 180) * (150 + Math.random() * 100),
              250 + Math.sin(i * 18 * Math.PI / 180) * (150 + Math.random() * 100),
              0
            ]}
          ]
        },
        s: { a: 0, k: [50 + Math.random() * 30, 50 + Math.random() * 30, 100] }
      },
      shapes: [
        {
          ty: "rc",
          d: 1,
          s: { a: 0, k: [8, 8] },
          p: { a: 0, k: [0, 0] },
          r: { a: 0, k: 1 }
        },
        {
          ty: "fl",
          c: { a: 0, k: [
            [1, 0.1, 0.3, 1],
            [1, 0.84, 0, 1],
            [0, 0.8, 1, 1],
            [0.6, 0.2, 0.8, 1],
            [1, 0.4, 0, 1]
          ][i % 5] },
          o: { a: 0, k: 100 }
        }
      ]
    }))
  ]
};

export const friendshipInline = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 180,
  w: 500,
  h: 500,
  assets: [],
  layers: [
    // Rainbow circles expanding
    ...Array.from({ length: 7 }, (_, i) => ({
      ddd: 0,
      ind: i + 1,
      ty: 4,
      nm: `rainbow-${i}`,
      sr: 1,
      ks: {
        o: { a: 1, k: [
          { t: i * 10, s: [0], e: [60] },
          { t: 40 + i * 10, s: [60], e: [0] },
          { t: 180, s: [0] }
        ]},
        r: { a: 0, k: 0 },
        p: { a: 0, k: [250, 250, 0] },
        s: { 
          a: 1, 
          k: [
            { t: i * 10, s: [20 + i * 25, 20 + i * 25, 100], e: [80 + i * 25, 80 + i * 25, 100] },
            { t: 100 + i * 10, s: [80 + i * 25, 80 + i * 25, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "el",
          p: { a: 0, k: [0, 0] },
          s: { a: 0, k: [100, 100] }
        },
        {
          ty: "st",
          c: { a: 0, k: [
            [1, 0.2, 0.2, 1],
            [1, 0.5, 0.2, 1],
            [1, 1, 0.2, 1],
            [0.2, 0.8, 0.2, 1],
            [0.2, 0.5, 1, 1],
            [0.4, 0.2, 0.8, 1],
            [0.8, 0.2, 0.8, 1]
          ][i] },
          o: { a: 0, k: 100 },
          w: { a: 0, k: 6 }
        }
      ]
    }))
  ]
};

export const apologyInline = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 180,
  w: 500,
  h: 500,
  assets: [],
  layers: [
    // Gentle waves expanding
    ...Array.from({ length: 6 }, (_, i) => ({
      ddd: 0,
      ind: i + 1,
      ty: 4,
      nm: `wave-${i}`,
      sr: 1,
      ks: {
        o: { 
          a: 1, 
          k: [
            { t: i * 20, s: [60], e: [0] },
            { t: 90 + i * 20, s: [0] }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [250, 250, 0] },
        s: { 
          a: 1, 
          k: [
            { t: i * 20, s: [20, 20, 100], e: [180, 180, 100] },
            { t: 90 + i * 20, s: [180, 180, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "el",
          p: { a: 0, k: [0, 0] },
          s: { a: 0, k: [100, 100] }
        },
        {
          ty: "st",
          c: { a: 0, k: [0.4, 0.7, 0.8, 1] },
          o: { a: 0, k: 100 },
          w: { a: 0, k: 3 }
        }
      ]
    }))
  ]
};

export const getLottieUrl = (occasion: string): LottieConfig => {
  return lottieUrls[occasion] || lottieUrls.congratulations;
};

export const getLottieAnimation = (occasion: string) => {
  switch (occasion) {
    case 'birthday':
      return birthdayInline;
    case 'love':
      return loveInline;
    case 'thanks':
      return thanksInline;
    case 'congratulations':
      return congratulationsInline;
    case 'holiday':
      return holidayInline;
    case 'friendship':
      return friendshipInline;
    case 'apology':
      return apologyInline;
    default:
      return congratulationsInline;
  }
};
