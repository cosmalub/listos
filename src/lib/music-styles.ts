/**
 * Перевірені стилі для генерації музики в Suno
 * Кожен стиль має свої унікальні характеристики та підходить для певних випадків
 */

export type MusicStyleCategory = 'energetic' | 'romantic' | 'emotional' | 'celebratory' | 'calm' | 'creative';

export interface MusicStyle {
  id: string;
  style: string; // Стиль для Suno API
  name: string; // Читабельна назва українською
  description: string; // Опис стилю
  category: MusicStyleCategory;
  mood: string; // Настрій
  bestFor: string[]; // Найкраще підходить для
  vocalGender?: 'male' | 'female'; // Рекомендована стать вокалу
  energy: number; // 1-5, рівень енергійності
  romance: number; // 1-5, рівень романтичності
  icon: string; // Emoji для візуалізації
}

export const MUSIC_STYLES: MusicStyle[] = [
  // ЕНЕРГІЙНІ ТА СВЯТКОВІ
  {
    id: 'hip-hop-trap',
    style: 'HipHop, Trap, male vocals',
    name: 'Енергійний Хіп-Хоп',
    description: 'Сучасний ритмічний біт з потужним басом та впевненим вокалом',
    category: 'energetic',
    mood: 'Впевнений, енергійний',
    bestFor: ['День народження молодої людини', 'Мотиваційні послання', 'Для друга'],
    vocalGender: 'male',
    energy: 5,
    romance: 1,
    icon: '🔥'
  },
  {
    id: 'funk-dance-pop',
    style: 'Funk, Dance Pop, Groovy, male vocals',
    name: 'Танцювальний Фанк',
    description: 'Заводний грув з фанковими басами та танцювальною енергією',
    category: 'celebratory',
    mood: 'Веселий, танцювальний',
    bestFor: ['Святкування', 'Вечірка', 'День народження', 'Веселі привітання'],
    vocalGender: 'male',
    energy: 5,
    romance: 2,
    icon: '🎉'
  },
  {
    id: 'pop-dance',
    style: 'Pop, Dance Pop, Ethereal, female vocals',
    name: 'Ефірний Поп',
    description: 'Легкий танцювальний поп з повітряним жіночим вокалом',
    category: 'celebratory',
    mood: 'Легкий, радісний',
    bestFor: ['День народження дівчини', 'Подяка', 'Святкові привітання'],
    vocalGender: 'female',
    energy: 4,
    romance: 3,
    icon: '✨'
  },
  {
    id: 'disco-groovy',
    style: 'Disco, Dance Pop, Groovy, female vocals',
    name: 'Диско Грув',
    description: 'Ностальгічне диско з заводним ритмом та жіночим вокалом',
    category: 'celebratory',
    mood: 'Ретро, веселий',
    bestFor: ['Вечірка', 'Святкування', 'Весела подяка'],
    vocalGender: 'female',
    energy: 5,
    romance: 2,
    icon: '🪩'
  },

  // РОМАНТИЧНІ ТА НІЖНІ
  {
    id: 'romantic-ballad',
    style: 'Pop, RnB, Emotional, female vocals',
    name: 'Романтична Балада',
    description: 'Ніжна емоційна балада з проникливим жіночим вокалом',
    category: 'romantic',
    mood: 'Романтичний, ніжний',
    bestFor: ['Зізнання в коханні', 'Романтичне послання', 'Річниця', 'Вибачення перед коханою'],
    vocalGender: 'female',
    energy: 2,
    romance: 5,
    icon: '💕'
  },
  {
    id: 'romantic-ballad-male',
    style: 'Pop, RnB, Emotional, Heartfelt, male vocals',
    name: 'Романтична Балада (чоловічий вокал)',
    description: 'Ніжна емоційна балада з щирим чоловічим вокалом',
    category: 'romantic',
    mood: 'Романтичний, ніжний',
    bestFor: ['Зізнання в коханні від хлопця', 'Романтичне послання для неї', 'Річниця', 'Вибачення'],
    vocalGender: 'male',
    energy: 2,
    romance: 5,
    icon: '💜'
  },
  {
    id: 'acoustic-folk',
    style: 'Classic Rock, Mellifluous Folk, Acoustic Guitar, male vocals',
    name: 'Акустична Фолк-Балада',
    description: 'Теплий акустичний звук з мелодійним чоловічим вокалом',
    category: 'romantic',
    mood: 'Щирий, теплий',
    bestFor: ['Романтичне послання', 'Подяка від щирого серця', 'Інтимні моменти'],
    vocalGender: 'male',
    energy: 2,
    romance: 5,
    icon: '🎸'
  },
  {
    id: 'soul-emotional',
    style: 'Soul, Emotional, Torch-Lounge, female vocals',
    name: 'Емоційний Соул',
    description: 'Глибокий душевний вокал з емоційним виконанням',
    category: 'emotional',
    mood: 'Глибокий, душевний',
    bestFor: ['Вибачення', 'Емоційна подяка', 'Підтримка', 'Зворушливі моменти'],
    vocalGender: 'female',
    energy: 3,
    romance: 4,
    icon: '💙'
  },

  // ЕМОЦІЙНІ ТА ЩИРІ
  {
    id: 'alternative-folk',
    style: 'Alternative Rock, Atmospheric Pop, Alternative Folk, Emotional, female vocals',
    name: 'Альтернативний Фолк',
    description: 'Атмосферний звук з емоційним жіночим вокалом',
    category: 'emotional',
    mood: 'Атмосферний, емоційний',
    bestFor: ['Підтримка в складні часи', 'Емоційна подяка', 'Щирі слова'],
    vocalGender: 'female',
    energy: 3,
    romance: 3,
    icon: '🌙'
  },
  {
    id: 'piano-pop-rock',
    style: 'Piano Pop Rock, Theatrical, male vocals',
    name: 'Фортепіанний Поп-Рок',
    description: 'Театральне виконання з піаніно та потужним вокалом',
    category: 'emotional',
    mood: 'Драматичний, щирий',
    bestFor: ['Важливі послання', 'Вибачення', 'Емоційні моменти', 'Підтримка'],
    vocalGender: 'male',
    energy: 3,
    romance: 3,
    icon: '🎹'
  },

  // КЛАСИЧНІ ТА ВІЧНІ
  {
    id: 'country-americana',
    style: 'Country, Americana, male vocals',
    name: 'Американа Кантрі',
    description: 'Класичний кантрі-звук з історіями та щирим вокалом',
    category: 'calm',
    mood: 'Спокійний, розповідний',
    bestFor: ['Історії життя', 'Подяка батькам', 'Сімейні моменти'],
    vocalGender: 'male',
    energy: 3,
    romance: 3,
    icon: '🤠'
  },
  {
    id: 'country-storytelling',
    style: 'Country, Storytelling, female vocals',
    name: 'Кантрі-Історія',
    description: 'Розповідна манера з жіночим вокалом в стилі кантрі',
    category: 'calm',
    mood: 'Розповідний, теплий',
    bestFor: ['Історії про життя', 'Родинні історії', 'Теплі спогади'],
    vocalGender: 'female',
    energy: 3,
    romance: 3,
    icon: '📖'
  },

  // ЕНЕРГІЙНИЙ РОК
  {
    id: 'classic-rock',
    style: 'Rock, Hard Rock, Classic',
    name: 'Класичний Рок',
    description: 'Потужні гітарні рифи та енергійне виконання',
    category: 'energetic',
    mood: 'Потужний, енергійний',
    bestFor: ['Мотивація', 'Для чоловіка', 'День народження', 'Підбадьорення'],
    energy: 5,
    romance: 1,
    icon: '🎸'
  },
  {
    id: 'alternative-rock',
    style: 'Alternative Rock, Electronic, Unusual',
    name: 'Альтернативний Рок',
    description: 'Сучасний електронний рок з незвичайним звучанням',
    category: 'creative',
    mood: 'Сучасний, креативний',
    bestFor: ['Для творчих людей', 'Незвичайні привітання', 'Молодь'],
    energy: 4,
    romance: 2,
    icon: '⚡'
  },

  // РИТМ-ЕНД-БЛЮЗ
  {
    id: 'rnb-anthemic',
    style: 'RnB, Anthemic, Danceable, female vocals',
    name: 'Танцювальний RnB',
    description: 'Потужний ритмічний RnB з жіночим вокалом',
    category: 'celebratory',
    mood: 'Впевнений, танцювальний',
    bestFor: ['Святкування', 'День народження дівчини', 'Мотивація для жінки'],
    vocalGender: 'female',
    energy: 4,
    romance: 3,
    icon: '👑'
  },
  {
    id: 'rnb-dark-cinematic',
    style: 'RnB, Dark, Cinematic, male vocals',
    name: 'Кінематографічний RnB',
    description: 'Темний атмосферний RnB з драматичним вокалом',
    category: 'emotional',
    mood: 'Драматичний, атмосферний',
    bestFor: ['Серйозні послання', 'Глибокі емоції', 'Вибачення'],
    vocalGender: 'male',
    energy: 3,
    romance: 4,
    icon: '🎬'
  },

  // ДЖАЗ ТА СВІНГ
  {
    id: 'pop-latin-jazz',
    style: 'Pop, Latin Jazz, Festive, female vocals',
    name: 'Латино Джаз',
    description: 'Святковий латинський джаз з енергійним вокалом',
    category: 'celebratory',
    mood: 'Святковий, ритмічний',
    bestFor: ['Свята', 'Вечірки', 'Танцювальні привітання'],
    vocalGender: 'female',
    energy: 5,
    romance: 3,
    icon: '💃'
  },
  {
    id: 'lounge-singer',
    style: '1940s big band, Lounge Singer, male vocals',
    name: 'Лаунж-Співак',
    description: 'Класичний біг-бенд звук з елегантним вокалом',
    category: 'calm',
    mood: 'Елегантний, ретро',
    bestFor: ['Елегантні привітання', 'Для старшого покоління', 'Ностальгія'],
    vocalGender: 'male',
    energy: 3,
    romance: 3,
    icon: '🎩'
  },

  // РЕГІ ТА ЧИЛАУТ
  {
    id: 'reggae-peaceful',
    style: 'Reggae, Peaceful, Soulful, male vocals',
    name: 'Спокійний Регі',
    description: 'Розслаблений регі з душевним вокалом',
    category: 'calm',
    mood: 'Спокійний, позитивний',
    bestFor: ['Розслаблені привітання', 'Позитивні послання', 'Підтримка'],
    vocalGender: 'male',
    energy: 2,
    romance: 2,
    icon: '🌴'
  },

  // ГОСПЕЛ ТА ДУХОВНІ
  {
    id: 'soul-gospel',
    style: 'Soul, Gospel, Powerful, female vocals',
    name: 'Потужний Госпел',
    description: 'Піднесений духовний госпел з потужним вокалом',
    category: 'emotional',
    mood: 'Піднесений, натхненний',
    bestFor: ['Натхнення', 'Підтримка', 'Важливі моменти життя'],
    vocalGender: 'female',
    energy: 4,
    romance: 2,
    icon: '🙏'
  },

  // EDM ТА ЕЛЕКТРОНІКА
  {
    id: 'edm-party',
    style: 'EDM, Dance, Party',
    name: 'Вечірковий EDM',
    description: 'Енергійна електронна музика для танців',
    category: 'celebratory',
    mood: 'Енергійний, вечірковий',
    bestFor: ['Вечірки', 'Молодь', 'Танці', 'Святкування'],
    energy: 5,
    romance: 1,
    icon: '🎧'
  },
  {
    id: 'edm-melodic',
    style: 'EDM, Melodic, Euphoric, male vocals',
    name: 'Мелодійний EDM',
    description: 'Піднесений мелодійний EDM з ейфоричною енергією',
    category: 'celebratory',
    mood: 'Ейфоричний, піднесений',
    bestFor: ['Святкування', 'Мотивація', 'Позитивні моменти'],
    vocalGender: 'male',
    energy: 5,
    romance: 2,
    icon: '🌟'
  },

  // СПЕЦІАЛЬНІ ТА КРЕАТИВНІ
  {
    id: 'indie-pop-minimal',
    style: 'Indie Pop, Minimal, Atmospheric',
    name: 'Мінімалістичний Інді',
    description: 'Атмосферний інді-поп з мінімалістичним звуком',
    category: 'creative',
    mood: 'Атмосферний, інтимний',
    bestFor: ['Для творчих людей', 'Інтимні послання', 'Сучасна молодь'],
    energy: 2,
    romance: 4,
    icon: '🎨'
  },
  {
    id: 'art-pop-experimental',
    style: 'Art Pop, Electronic, Experimental, female vocals',
    name: 'Експериментальний Арт-Поп',
    description: 'Авангардний електронний поп з незвичайним звучанням',
    category: 'creative',
    mood: 'Експериментальний, унікальний',
    bestFor: ['Для митців', 'Незвичайні подарунки', 'Креативні особистості'],
    vocalGender: 'female',
    energy: 3,
    romance: 2,
    icon: '🎭'
  },

  // АКУСТИЧНІ ТА ІНТИМНІ
  {
    id: 'indie-folk-intimate',
    style: 'Indie Folk, Ethereal, Intimate, male vocals',
    name: 'Інтимний Інді-Фолк',
    description: 'Ефірний інді-фолк з інтимним чоловічим вокалом',
    category: 'romantic',
    mood: 'Інтимний, ніжний',
    bestFor: ['Романтичні моменти', 'Особисті послання', 'Щирі емоції'],
    vocalGender: 'male',
    energy: 2,
    romance: 5,
    icon: '🕯️'
  },
  {
    id: 'acoustic-storytelling',
    style: 'Folk, Storytelling, Acoustic Guitar, male vocals',
    name: 'Акустична Історія',
    description: 'Розповідна акустична пісня з гітарою',
    category: 'calm',
    mood: 'Розповідний, щирий',
    bestFor: ['Історії життя', 'Спогади', 'Сімейні моменти'],
    vocalGender: 'male',
    energy: 2,
    romance: 3,
    icon: '📚'
  },

  // ФАНК ТА СОУЛ
  {
    id: 'soul-funk-joyful',
    style: 'Soul, Funk, Joyful, male vocals',
    name: 'Радісний Фанк-Соул',
    description: 'Заводний фанковий соул з радісною енергією',
    category: 'celebratory',
    mood: 'Радісний, грувовий',
    bestFor: ['Святкування', 'Подяка', 'Веселі моменти'],
    vocalGender: 'male',
    energy: 4,
    romance: 2,
    icon: '🎺'
  },
  {
    id: 'rnb-neo-soul',
    style: 'RnB, Neo Soul, Emotional, female vocals',
    name: 'Нео-Соул',
    description: 'Сучасний емоційний соул з жіночим вокалом',
    category: 'emotional',
    mood: 'Емоційний, сучасний',
    bestFor: ['Емоційні послання', 'Подяка', 'Щирі слова для жінки'],
    vocalGender: 'female',
    energy: 3,
    romance: 4,
    icon: '🌹'
  },

  // ПОП-РОК
  {
    id: 'pop-rock-groovy',
    style: 'Pop, Rock, Groovy, male vocals',
    name: 'Грувовий Поп-Рок',
    description: 'Енергійний поп-рок з заводним грувом',
    category: 'energetic',
    mood: 'Енергійний, радісний',
    bestFor: ['День народження', 'Святкування', 'Мотивація'],
    vocalGender: 'male',
    energy: 4,
    romance: 2,
    icon: '🎤'
  },
  {
    id: 'pop-rock-danceable',
    style: 'Pop Rock, Danceable, male vocals',
    name: 'Танцювальний Поп-Рок',
    description: 'Танцювальний поп-рок з енергійним виконанням',
    category: 'celebratory',
    mood: 'Танцювальний, веселий',
    bestFor: ['Вечірки', 'День народження', 'Веселі привітання'],
    vocalGender: 'male',
    energy: 5,
    romance: 2,
    icon: '🕺'
  },

  // GRUNGE
  {
    id: 'grunge',
    style: '90s Grunge, Heavy, Dark, male vocals',
    name: 'Гранж',
    description: 'Важкий темний гранж з емоційним звучанням',
    category: 'energetic',
    mood: 'Бунтарський, емоційний',
    bestFor: ['Підлітки', 'Емоційні моменти', 'Для друзів-бунтарів'],
    vocalGender: 'male',
    energy: 5,
    romance: 1,
    icon: '🎸'
  },

  // BLUES ROCK
  {
    id: 'blues-rock',
    style: 'Blues Rock, Soulful, Gritty, male vocals',
    name: 'Блюз-Рок',
    description: 'Душевний блюз-рок з грубим звучанням',
    category: 'emotional',
    mood: 'Душевний, чесний',
    bestFor: ['Дорослі чоловіки', 'Чесні емоції', 'Життєві історії'],
    vocalGender: 'male',
    energy: 4,
    romance: 3,
    icon: '🎸'
  },

  // DREAM POP
  {
    id: 'dream-pop',
    style: 'Dream Pop, Ethereal, Shimmering Guitars, Lush Synths, female vocals',
    name: 'Дрім-Поп',
    description: 'Ефірний поп з мерехтливими гітарами та синтезаторами',
    category: 'romantic',
    mood: 'Мрійливий, ефірний',
    bestFor: ['Романтичні моменти', 'Мрійливі послання', 'Для творчих людей'],
    vocalGender: 'female',
    energy: 2,
    romance: 5,
    icon: '✨'
  },

  // PUNK ROCK
  {
    id: 'punk-rock',
    style: 'Punk Rock, Aggressive, Youthful, male vocals',
    name: 'Панк-Рок',
    description: 'Агресивний молодіжний панк зі швидким темпом',
    category: 'energetic',
    mood: 'Бунтарський, енергійний',
    bestFor: ['Молодь', 'Енергійні привітання', 'Бунтарські друзі'],
    vocalGender: 'male',
    energy: 5,
    romance: 1,
    icon: '🤘'
  },

  // PSYCHEDELIC ROCK
  {
    id: 'psychedelic-rock',
    style: 'Psychedelic Rock, Groovy, Eclectic, male vocals',
    name: 'Психоделічний Рок',
    description: 'Грувовий психоделічний рок з екслектичним звучанням',
    category: 'creative',
    mood: 'Психоделічний, експериментальний',
    bestFor: ['Креативні люди', 'Незвичайні подарунки', 'Експериментальні моменти'],
    vocalGender: 'male',
    energy: 3,
    romance: 2,
    icon: '🌀'
  },

  // POWER METAL
  {
    id: 'power-metal',
    style: 'Heavy Metal, Power, Epic, male vocals',
    name: 'Павер-Метал',
    description: 'Епічний павер-метал з героїчними темами',
    category: 'energetic',
    mood: 'Епічний, героїчний',
    bestFor: ['Фанати металу', 'Епічні моменти', 'Героїчні теми'],
    vocalGender: 'male',
    energy: 5,
    romance: 1,
    icon: '⚔️'
  },

  // THRASH METAL
  {
    id: 'thrash-metal',
    style: 'Thrash Metal, Aggressive, Dark, male vocals',
    name: 'Треш-Метал',
    description: 'Агресивний темний треш-метал зі швидким темпом',
    category: 'energetic',
    mood: 'Агресивний, темний',
    bestFor: ['Екстремальна енергія', 'Агресивні привітання', 'Молодь'],
    vocalGender: 'male',
    energy: 5,
    romance: 1,
    icon: '⚡'
  },

  // DOOM METAL
  {
    id: 'doom-metal',
    style: 'Heavy Metal, Doom, Dark, male vocals',
    name: 'Дум-Метал',
    description: 'Важкий повільний метал з темною атмосферою',
    category: 'emotional',
    mood: 'Темний, важкий',
    bestFor: ['Темні теми', 'Важкі емоції', 'Повільний метал'],
    vocalGender: 'male',
    energy: 4,
    romance: 1,
    icon: '🌑'
  }
];

// Категорії для фільтрації
export const STYLE_CATEGORIES = {
  energetic: {
    name: 'Енергійні',
    description: 'Потужні та динамічні стилі для святкувань',
    icon: '⚡',
    color: 'from-orange-500 to-red-500'
  },
  romantic: {
    name: 'Романтичні',
    description: 'Ніжні стилі для висловлення кохання',
    icon: '💕',
    color: 'from-pink-500 to-rose-500'
  },
  emotional: {
    name: 'Емоційні',
    description: 'Глибокі стилі для щирих переживань',
    icon: '💙',
    color: 'from-blue-500 to-purple-500'
  },
  celebratory: {
    name: 'Святкові',
    description: 'Веселі стилі для вечірок та свят',
    icon: '🎉',
    color: 'from-yellow-500 to-orange-500'
  },
  calm: {
    name: 'Спокійні',
    description: 'Розслаблені стилі для інтимних моментів',
    icon: '🌙',
    color: 'from-indigo-500 to-blue-500'
  },
  creative: {
    name: 'Креативні',
    description: 'Незвичайні стилі для творчих особистостей',
    icon: '🎨',
    color: 'from-purple-500 to-pink-500'
  }
} as const;

// Допоміжні функції
export function getStyleById(id: string): MusicStyle | undefined {
  return MUSIC_STYLES.find(style => style.id === id);
}

export function getStylesByCategory(category: MusicStyleCategory): MusicStyle[] {
  return MUSIC_STYLES.filter(style => style.category === category);
}

export function getStylesByMood(searchMood: string): MusicStyle[] {
  return MUSIC_STYLES.filter(style =>
    style.mood.toLowerCase().includes(searchMood.toLowerCase())
  );
}

export function getRecommendedStyles(
  occasion: string,
  mood: string,
  recipientGender?: 'male' | 'female'
): MusicStyle[] {
  return MUSIC_STYLES.filter(style => {
    const matchesOccasion = style.bestFor.some(use =>
      use.toLowerCase().includes(occasion.toLowerCase())
    );
    const matchesMood = style.mood.toLowerCase().includes(mood.toLowerCase());

    // Якщо вказана стать отримувача, враховуємо рекомендований вокал
    let matchesGender = true;
    if (recipientGender && style.vocalGender) {
      // Для романтичних пісень вокал протилежної статі
      if (style.category === 'romantic') {
        matchesGender = style.vocalGender !== recipientGender;
      }
    }

    return (matchesOccasion || matchesMood) && matchesGender;
  });
}

// Отримати випадкові стилі для тестування
export function getRandomStyles(count: number = 5): MusicStyle[] {
  const shuffled = [...MUSIC_STYLES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
