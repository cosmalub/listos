// Lottie animation URLs from LottieFiles CDN
// These are high-quality, optimized animations

export interface LottieConfig {
  url: string;
  loop: boolean;
  autoplay: boolean;
  speed?: number;
  style?: React.CSSProperties;
}

// Birthday animations
export const birthdayLottie: LottieConfig = {
  url: "https://lottie.host/e2c01ca1-1db6-4c3a-8c2f-0a8c7a1e4c0d/birthday-confetti.json",
  loop: true,
  autoplay: true,
  speed: 1
};

// Use inline animation data for reliability
export const birthdayInline = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 90,
  w: 400,
  h: 400,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "confetti",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { 
          a: 1, 
          k: [
            { t: 0, s: [0], e: [360] },
            { t: 90, s: [360] }
          ]
        },
        p: { a: 0, k: [200, 200, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "rc",
          d: 1,
          s: { a: 0, k: [20, 20] },
          p: { a: 0, k: [0, 0] },
          r: { a: 0, k: 0 }
        },
        {
          ty: "fl",
          c: { a: 0, k: [1, 0.4, 0.6, 1] },
          o: { a: 0, k: 100 }
        }
      ]
    }
  ]
};

// Love/hearts animation  
export const loveInline = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 400,
  h: 400,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "heart",
      sr: 1,
      ks: {
        o: { a: 1, k: [
          { t: 0, s: [50], e: [100] },
          { t: 30, s: [100], e: [50] },
          { t: 60, s: [50] }
        ]},
        r: { a: 0, k: 0 },
        p: { 
          a: 1, 
          k: [
            { t: 0, s: [200, 350, 0], e: [200, 100, 0] },
            { t: 60, s: [200, 100, 0] }
          ]
        },
        s: { 
          a: 1, 
          k: [
            { t: 0, s: [80, 80, 100], e: [120, 120, 100] },
            { t: 30, s: [120, 120, 100], e: [80, 80, 100] },
            { t: 60, s: [80, 80, 100] }
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
              v: [[0, -15], [15, -30], [30, -15], [15, 15], [0, 30], [-15, 15], [-30, -15], [-15, -30]],
              i: [[0, 0], [8, 0], [0, 8], [0, 0], [-8, 0], [0, 0], [0, -8], [0, 0]],
              o: [[0, 0], [0, 8], [8, 0], [0, 0], [0, -8], [-8, 0], [0, 0], [0, 8]]
            }
          }
        },
        {
          ty: "fl",
          c: { a: 0, k: [1, 0.2, 0.4, 1] },
          o: { a: 0, k: 100 }
        }
      ]
    }
  ]
};

// Thanks/gratitude - golden sparkle
export const thanksInline = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 400,
  h: 400,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "star",
      sr: 1,
      ks: {
        o: { 
          a: 1, 
          k: [
            { t: 0, s: [30], e: [100] },
            { t: 30, s: [100], e: [30] },
            { t: 60, s: [30] }
          ]
        },
        r: { 
          a: 1, 
          k: [
            { t: 0, s: [0], e: [180] },
            { t: 60, s: [180] }
          ]
        },
        p: { a: 0, k: [200, 200, 0] },
        s: { 
          a: 1, 
          k: [
            { t: 0, s: [80, 80, 100], e: [150, 150, 100] },
            { t: 30, s: [150, 150, 100], e: [80, 80, 100] },
            { t: 60, s: [80, 80, 100] }
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
          ir: { a: 0, k: 20 },
          is: { a: 0, k: 0 },
          or: { a: 0, k: 50 },
          os: { a: 0, k: 0 }
        },
        {
          ty: "fl",
          c: { a: 0, k: [1, 0.84, 0, 1] },
          o: { a: 0, k: 100 }
        }
      ]
    }
  ]
};

// Holiday/celebration
export const holidayInline = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 90,
  w: 400,
  h: 400,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "snowflake",
      sr: 1,
      ks: {
        o: { a: 0, k: 80 },
        r: { 
          a: 1, 
          k: [
            { t: 0, s: [0], e: [360] },
            { t: 90, s: [360] }
          ]
        },
        p: { 
          a: 1, 
          k: [
            { t: 0, s: [200, -50, 0], e: [200, 450, 0] },
            { t: 90, s: [200, 450, 0] }
          ]
        },
        s: { a: 0, k: [100, 100, 100] }
      },
      shapes: [
        {
          ty: "sr",
          sy: 1,
          d: 1,
          pt: { a: 0, k: 6 },
          p: { a: 0, k: [0, 0] },
          r: { a: 0, k: 0 },
          ir: { a: 0, k: 15 },
          is: { a: 0, k: 0 },
          or: { a: 0, k: 40 },
          os: { a: 0, k: 0 }
        },
        {
          ty: "fl",
          c: { a: 0, k: [0.9, 0.95, 1, 1] },
          o: { a: 0, k: 100 }
        }
      ]
    }
  ]
};

// Congratulations - burst effect
export const congratulationsInline = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 400,
  h: 400,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "burst",
      sr: 1,
      ks: {
        o: { 
          a: 1, 
          k: [
            { t: 0, s: [100], e: [0] },
            { t: 60, s: [0] }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [200, 200, 0] },
        s: { 
          a: 1, 
          k: [
            { t: 0, s: [0, 0, 100], e: [200, 200, 100] },
            { t: 60, s: [200, 200, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "sr",
          sy: 1,
          d: 1,
          pt: { a: 0, k: 8 },
          p: { a: 0, k: [0, 0] },
          r: { a: 0, k: 0 },
          ir: { a: 0, k: 30 },
          is: { a: 0, k: 0 },
          or: { a: 0, k: 80 },
          os: { a: 0, k: 0 }
        },
        {
          ty: "fl",
          c: { a: 0, k: [1, 0.84, 0, 1] },
          o: { a: 0, k: 100 }
        }
      ]
    }
  ]
};

// Friendship - rainbow effect
export const friendshipInline = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 400,
  h: 400,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "circle1",
      sr: 1,
      ks: {
        o: { a: 0, k: 70 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [200, 200, 0] },
        s: { 
          a: 1, 
          k: [
            { t: 0, s: [80, 80, 100], e: [120, 120, 100] },
            { t: 30, s: [120, 120, 100], e: [80, 80, 100] },
            { t: 60, s: [80, 80, 100] }
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
          c: { 
            a: 1, 
            k: [
              { t: 0, s: [1, 0.4, 0.6, 1], e: [0.5, 0.4, 1, 1] },
              { t: 30, s: [0.5, 0.4, 1, 1], e: [0.1, 0.8, 0.9, 1] },
              { t: 60, s: [0.1, 0.8, 0.9, 1] }
            ]
          },
          o: { a: 0, k: 100 },
          w: { a: 0, k: 8 }
        }
      ]
    }
  ]
};

// Apology - gentle wave
export const apologyInline = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 90,
  w: 400,
  h: 400,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "wave",
      sr: 1,
      ks: {
        o: { a: 0, k: 40 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [200, 200, 0] },
        s: { 
          a: 1, 
          k: [
            { t: 0, s: [50, 50, 100], e: [150, 150, 100] },
            { t: 45, s: [150, 150, 100], e: [50, 50, 100] },
            { t: 90, s: [50, 50, 100] }
          ]
        }
      },
      shapes: [
        {
          ty: "el",
          p: { a: 0, k: [0, 0] },
          s: { a: 0, k: [150, 150] }
        },
        {
          ty: "st",
          c: { a: 0, k: [0.65, 0.85, 0.87, 1] },
          o: { 
            a: 1, 
            k: [
              { t: 0, s: [100], e: [0] },
              { t: 90, s: [0] }
            ]
          },
          w: { a: 0, k: 4 }
        }
      ]
    }
  ]
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
