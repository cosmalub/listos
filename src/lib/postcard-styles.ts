// Конфігурація стилів для дизайну листівок
export type StyleKey = 'joyful' | 'gentle' | 'universal';

export interface PostcardStyle {
  id: StyleKey;
  name: string;
  description: string;
  occasionsText: string;
  previewImage: string;
  systemPrompt: string;
  colors: string[];
}

// Бібліотека унікальних елементів для кожного стилю
export const STYLE_ELEMENTS: Record<StyleKey, {
  decorations: string[];
  subjects: string[];
  backgrounds: string[];
  moods: string[];
  compositions: string[];
}> = {
  joyful: {
    decorations: [
      'colorful confetti and streamers',
      'shiny party balloons',
      'golden stars and sparkles',
      'festive ribbons and bows',
      'fireworks bursts',
      'glitter effects',
      'celebration banners'
    ],
    subjects: [
      'cute cartoon cat celebrating',
      'happy dancing bunny',
      'cheerful little bird with party hat',
      'adorable hedgehog with gift',
      'playful puppy with balloons',
      'smiling bear with cake',
      'joyful owl with confetti'
    ],
    backgrounds: [
      'vibrant gradient from yellow to coral',
      'rainbow burst pattern',
      'sunny sky with fluffy clouds',
      'party pattern with dots and stars',
      'warm sunset gradient',
      'energetic swirl of bright colors'
    ],
    moods: ['energetic', 'festive', 'playful', 'cheerful', 'exciting', 'vibrant'],
    compositions: [
      'dynamic diagonal layout',
      'burst from center',
      'elements flowing from corner',
      'circular arrangement around center',
      'cascading from top'
    ]
  },
  gentle: {
    decorations: [
      'delicate flower petals floating',
      'soft butterflies',
      'gentle feathers',
      'small hearts',
      'tender leaves and branches',
      'soft clouds',
      'tiny stars'
    ],
    subjects: [
      'elegant roses bouquet',
      'soft peonies arrangement',
      'delicate cherry blossoms branch',
      'gentle tulips',
      'romantic lavender field',
      'tender wildflowers',
      'graceful orchids'
    ],
    backgrounds: [
      'soft watercolor wash in pastels',
      'misty morning atmosphere',
      'dreamy clouds gradient',
      'gentle pink to lavender blend',
      'soft peach sunrise',
      'ethereal light blue mist'
    ],
    moods: ['tender', 'romantic', 'peaceful', 'dreamy', 'serene', 'delicate'],
    compositions: [
      'elegant asymmetric arrangement',
      'soft frame around edges',
      'gentle flow from side',
      'centered with breathing space',
      'botanical corner arrangement'
    ]
  },
  universal: {
    decorations: [
      'gentle leaves and vines',
      'soft clouds',
      'small birds',
      'delicate stars',
      'nature elements',
      'warm light rays',
      'peaceful water reflections'
    ],
    subjects: [
      'cozy cottage in meadow',
      'peaceful garden path',
      'gentle hills at sunset',
      'serene forest clearing',
      'warm countryside scene',
      'magical tree with lights',
      'peaceful lake reflection'
    ],
    backgrounds: [
      'Studio Ghibli sky with fluffy clouds',
      'warm countryside sunset',
      'peaceful meadow gradient',
      'soft morning mist',
      'golden hour lighting',
      'nostalgic sepia-tinted scene'
    ],
    moods: ['nostalgic', 'warm', 'inviting', 'magical', 'cozy', 'peaceful'],
    compositions: [
      'balanced scenic view',
      'depth with foreground interest',
      'panoramic landscape',
      'intimate close-up scene',
      'layered atmospheric perspective'
    ]
  }
};

// Функція для отримання випадкового елемента
function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Функція для отримання випадкових елементів стилю
export function getRandomStyleElements(style: StyleKey): {
  decoration: string;
  subject: string;
  background: string;
  mood: string;
  composition: string;
} {
  const elements = STYLE_ELEMENTS[style];
  return {
    decoration: getRandomElement(elements.decorations),
    subject: getRandomElement(elements.subjects),
    background: getRandomElement(elements.backgrounds),
    mood: getRandomElement(elements.moods),
    composition: getRandomElement(elements.compositions)
  };
}

export const POSTCARD_STYLES: Record<StyleKey, PostcardStyle> = {
  joyful: {
    id: 'joyful',
    name: 'Радісний',
    description: 'Яскравий та життєрадісний стиль для особливих моментів і урочистостей',
    occasionsText: 'Ідеально для: днів народження, свят, поздоровлень',
    previewImage: '/api/placeholder/joyful-preview',
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'],
    systemPrompt: `Створи яскраву святкову листівку на основі: {basePrompt}.

ВІЗУАЛЬНІ ХАРАКТЕРИСТИКИ:
- Яскраві, насичені кольори з високою контрастністю
- Прості, чіткі форми та силуети
- Товсті, виразні контури
- Плоскі кольорові області без складного затінення
- Веселий та радісний настрій
- Святковий та урочистий характер

СТИЛЬ МУЛЬТЯШНОЇ ГРАФІКИ:
- 2D плоска ілюстрація
- Векторний вигляд з чіткими краями
- Мінімальне але ефективне затінення
- Яскраві кольорові контрасти
- Веселий та привабливий естетичний вигляд
- Зрозуміла композиція
- Святкові елементи (конфеті, зірочки, серця)

Результат має бути радісним, енергійним та миттєво привабливим з сучасним святковим естетичним виглядом.`
  },

  gentle: {
    id: 'gentle',
    name: 'Ніжний',
    description: 'Делікатний та теплий стиль для щирих почуттів та особистих моментів',
    occasionsText: 'Ідеально для: вибачень, подяки, підтримки',
    previewImage: '/api/placeholder/gentle-preview',
    colors: ['#F8BBD9', '#E4C1F9', '#A8E6CF', '#FFD3A5', '#FD99A5', '#C7CEEA'],
    systemPrompt: `Створи ніжну акварельну листівку на основі: {basePrompt}.

ВІЗУАЛЬНІ ХАРАКТЕРИСТИКИ:
- М'які, плинні акварельні техніки з природним розтіканням кольорів
- Делікатні мазки пензля та органічні текстури
- Прозорі кольорові шари з тонкими градієнтами
- Ніжні кольорові переходи та змішування
- Легка, повітряна композиція з великою кількістю білого простору
- Пастельна та приглушена колірна палітра

АКВАРЕЛЬНІ ТЕХНІКИ:
- Ефекти "мокре по мокрому" для фону
- Контрольоване розтікання та розквітання кольору
- Різна непрозорість та прозорість
- Природна текстура паперу, що проглядає
- Вільні, експресивні мазки пензлем
- Органічні форми та м'які краї

Результат має бути делікатним, мрійливим та художнім з автентичним виглядом традиційного акварельного живопису.`
  },

  universal: {
    id: 'universal',
    name: 'Універсальний',
    description: 'Стільний та гармонійний дизайн на всі випадки життя',
    occasionsText: 'Ідеально для: прохань, спілкування, запрошень',
    previewImage: '/api/placeholder/universal-preview',
    colors: ['#8B7355', '#A0937D', '#B5A58A', '#D4C5A0', '#E8DCC6', '#6A5ACD'],
    systemPrompt: `Створи стильну листівку в стилі Studio Ghibli на основі: {basePrompt}.

ВІЗУАЛЬНІ ХАРАКТЕРИСТИКИ:
- М'яка, приглушена колірна палітра з пастельними та земляними тонами
- Чисті, чіткі контури з помірною товщиною ліній
- Плоскі кольорові області з мінімальними градієнтами
- Прості, елегантні форми
- Ніжне освітлення з м'якими тінями
- Природні елементи (хмари, дерева, квіти, краєвиди)
- Химерна та мрійлива атмосфера
- Злегка стилізовані але впізнавані форми

ХУДОЖНІЙ СТИЛЬ:
- 2D ілюстрація в стилі фільмів Studio Ghibli
- Рукотворна естетика з цифровою полірованістю
- Збалансована композиція з чіткими фокусними точками
- Органічні, плинні лінії та форми
- Тонка текстура у фоні
- Теплий, привітний настрій
- Чистий, професійний вигляд, підходящий для вітальних листівок

Зображення має викликати відчуття тепла, ностальгії та лагідної краси.`
  }
};

export function getStylePrompt(style: StyleKey, basePrompt: string, caption?: string): string {
  const styleConfig = POSTCARD_STYLES[style];
  if (!styleConfig) {
    throw new Error(`Невідомий стиль: ${style}`);
  }
  
  let enhancedPrompt = styleConfig.systemPrompt.replace('{basePrompt}', basePrompt);
  
  if (caption) {
    enhancedPrompt += `\n\nПриродно включи цей підпис у дизайн: "${caption}"`;
  }
  
  enhancedPrompt += '\n\nФормат: Вертикальний формат листівки (портретна орієнтація), висока якість, придатна для друку.';
  
  return enhancedPrompt;
}


export function getStyleColors(style: StyleKey): string[] {
  const styleConfig = POSTCARD_STYLES[style];
  if (!styleConfig) {
    return ['#6A5ACD', '#E6E6FA', '#DDA0DD']; // fallback colors
  }
  return styleConfig.colors;
}

export function getAllStyles(): PostcardStyle[] {
  return Object.values(POSTCARD_STYLES);
}
