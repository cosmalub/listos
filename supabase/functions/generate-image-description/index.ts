import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// User context interface for personalization
interface UserContext {
  occasion?: string;
  recipient?: {
    name?: string;
    relationship?: string;
  };
  sender?: {
    name?: string;
  };
  conversationSummary?: string;
}

// Song imagery extracted from lyrics
interface SongImagery {
  directImages?: string[];
  metaphors?: string[];
  colorMood?: string;
  atmosphere?: string;
  timeContext?: string;
  personalObjects?: string[];
  relationship?: string;
  emotionalCore?: string;
}

// Detect language from lyrics
function detectLanguage(lyrics: string): 'Ukrainian' | 'Russian' | 'English' {
  const ukrainianMarkers = ['і', 'ї', 'є', 'ґ', 'тобі', 'мій', 'твій', 'щастя', 'доля', 'хай'];
  const russianMarkers = ['ы', 'ъ', 'тебе', 'мой', 'твой', 'что', 'это', 'счастье', 'судьба'];
  
  let ukrainianScore = 0;
  let russianScore = 0;
  
  const lowerLyrics = lyrics.toLowerCase();
  
  ukrainianMarkers.forEach(marker => {
    if (lowerLyrics.includes(marker)) ukrainianScore++;
  });
  
  russianMarkers.forEach(marker => {
    if (lowerLyrics.includes(marker)) russianScore++;
  });
  
  if (ukrainianScore > russianScore) return 'Ukrainian';
  if (russianScore > ukrainianScore) return 'Russian';
  return 'English';
}

// Map occasion to theme hint
function getOccasionTheme(occasion: string): string {
  const occasionThemes: Record<string, string> = {
    'birthday': 'день народження, святкова радість',
    'wedding': 'весілля, романтика, єднання',
    'anniversary': 'річниця, спогади, любов',
    'thank-you': 'вдячність, тепло, визнання',
    'congratulation': 'привітання, досягнення, гордість',
    'love': 'кохання, ніжність, пристрасть',
    'apology': 'вибачення, каяття, примирення',
    'get-well': 'одужання, підтримка, надія',
    'holiday': 'свято, радість, традиції',
    'new-year': 'новий рік, надії, початок',
    'christmas': 'різдво, затишок, магія',
    'easter': 'великдень, відродження, весна',
    'mothers-day': 'день матері, любов, вдячність',
    'fathers-day': 'день батька, повага, тепло',
    'valentines': 'день закоханих, романтика, пристрасть'
  };
  
  return occasionThemes[occasion] || occasion;
}

// Check if occasion is romantic (allows human silhouettes)
function isRomanticOccasion(occasion: string): boolean {
  const romanticOccasions = ['love', 'wedding', 'anniversary', 'valentines'];
  return romanticOccasions.includes(occasion);
}

// Generate characters section based on occasion type
function getCharactersSection(occasion: string): string {
  if (isRomanticOccasion(occasion)) {
    return `────────────────────────
ПРО ПЕРСОНАЖІВ
────────────────────────
Якщо пісня про РЕАЛЬНИХ ЛЮДЕЙ:
– не зображай конкретну зовнішність, риси облич, вік або етнічність
– персонажі мають бути СИМВОЛІЧНИМИ та УЗАГАЛЬНЕНИМИ
  (силуети, світло, рух, присутність)
– ілюстрація має відчуватися як ОСОБИСТА ІСТОРІЯ,
  а не випадкова або стокова сцена
– уникай типових, шаблонних образів людей`;
  } else {
    return `────────────────────────
ВАЖЛИВО: БЕЗ ЛЮДЕЙ!
────────────────────────
Для цієї події НЕ ВИКОРИСТОВУЙ персонажів чи силуети людей!
Використовуй ВІЗУАЛЬНІ ОБРАЗИ, які СИМВОЛІЧНО випливають зі слів пісні:
– предмети або деталі, що відображають сенс (не персонажів)
– простір або середовище, пов'язане з настроєм пісні
– світло і колір як носії емоції
– метафори без людей або людських взаємодій
– природні явища, рослини, абстрактні форми
– символічні об'єкти: свічки, квіти, зірки, вікна, двері тощо`;
  }
}

serve(async (req) => {
  console.log('Generate image description function called');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lyrics, caption, userContext, songImagery } = await req.json();
    console.log('Input received:', { 
      lyricsLength: lyrics?.length,
      caption,
      hasUserContext: !!userContext,
      hasSongImagery: !!songImagery,
      userContext,
      songImagery
    });

    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      throw new Error('OpenAI API key not configured');
    }

    // Detect language from lyrics
    const detectedLanguage = detectLanguage(lyrics);
    console.log('Detected language:', detectedLanguage);

    // Build personalization context - as a hint for image selection
    let personalizationContext = '';
    if (userContext) {
      const hints: string[] = [];
      
      if (userContext.recipient?.relationship) {
        hints.push(`Це листівка для ${userContext.recipient.relationship}`);
      }
      if (userContext.occasion) {
        hints.push(`Привід: ${getOccasionTheme(userContext.occasion)}`);
      }
      
      if (hints.length > 0) {
        personalizationContext = `
────────────────────────
КОНТЕКСТ ПЕРСОНАЛІЗАЦІЇ
────────────────────────
${hints.join('\n')}
Використай це для вибору ГОЛОВНОГО ОБРАЗУ,
але не ілюструй буквально — шукай метафору в пісні.`;
      }
    }

    // Build song imagery context - more poetic and focused
    let songImageryContext = '';
    if (songImagery) {
      const parts: string[] = [];
      
      if (songImagery.directImages?.length > 0) {
        parts.push(`Візуальні образи з пісні: ${songImagery.directImages.join(', ')}`);
      }
      if (songImagery.metaphors?.length > 0) {
        parts.push(`Метафори для інтерпретації: ${songImagery.metaphors.join(', ')}`);
      }
      if (songImagery.colorMood) {
        parts.push(`Кольоровий настрій: ${songImagery.colorMood}`);
      }
      if (songImagery.atmosphere) {
        parts.push(`Атмосфера: ${songImagery.atmosphere}`);
      }
      if (songImagery.emotionalCore) {
        parts.push(`Головна емоція: ${songImagery.emotionalCore}`);
      }
      
      if (parts.length > 0) {
        songImageryContext = `
────────────────────────
ОБРАЗИ З ПІСНІ (ОБИРАЙ ГОЛОВНИЙ!)
────────────────────────
${parts.join('\n')}`;
      }
    }

    const languageInstructions = {
      Ukrainian: 'Створи опис ВИКЛЮЧНО українською мовою.',
      Russian: 'Создай описание ИСКЛЮЧИТЕЛЬНО на русском языке.',
      English: 'Create description EXCLUSIVELY in English.'
    };

    const systemPrompt = `Ти створюєш ПЕРСОНАЛІЗОВАНИЙ художній опис ілюстрації
на основі ТЕКСТУ ПІСНІ, який подається на вхід.

ПІСНЯ Є ДЖЕРЕЛОМ ОБРАЗІВ ТА ЕМОЦІЙ, А НЕ ІНСТРУКЦІЄЮ
ДЛЯ БУКВАЛЬНОГО ІЛЮСТРУВАННЯ РЯДКІВ.

ТВОЯ ЗАДАЧА — створити УНІКАЛЬНИЙ, ВІЗУАЛЬНО КОНКРЕТНИЙ опис,
який передає ОСОБИСТУ ІСТОРІЮ та НАСТРІЙ пісні.

────────────────────────
ОСНОВНІ ПРИНЦИПИ
────────────────────────
1. ОБЕРИ ОДИН ГОЛОВНИЙ ВІЗУАЛЬНИЙ ОБРАЗ
   (ключову сцену або метафору з пісні).
2. ОБЕРИ 1–2 ДРУГОРЯДНІ ОБРАЗИ
   як атмосферні елементи (світло, простір, відчуття, фон).
3. ДОПУСКАЙ ХУДОЖНЮ ІНТЕРПРЕТАЦІЮ МЕТАФОР,
   але зберігай емоційну точність.

${getCharactersSection(userContext?.occasion || '')}

────────────────────────
ВІЗУАЛЬНИЙ СТИЛЬ
────────────────────────
– ілюстрація заповнює простір від краю до краю (full-bleed)
– світлі «рамки» по краях — це АКВАРЕЛЬНЕ РОЗЧИНЕННЯ ФАРБИ,
  художній ефект, ЧАСТИНА ЖИВОПИСУ,
  а не папір, не край листа і не фон
– відчуття живої, емоційної, поетичної сцени
${personalizationContext}
${songImageryContext}

────────────────────────
ОПИСУЙ
────────────────────────
– конкретну візуальну сцену (де, що відбувається, між ким)
– кольорову палітру, що логічно випливає з пісні
– світло, простір, атмосферу
– емоційний підтекст і відчуття близькості
– персональну інтимність моменту

────────────────────────
НЕ ОПИСУЙ
────────────────────────
– формат, розміри, друк
– технічні параметри
– мокапи, папір, тіні від об'єктів
– текст, який буде написаний на ілюстрації

────────────────────────
ФОРМАТ ВІДПОВІДІ
────────────────────────
– короткий, поетичний, ВІЗУАЛЬНО КОНКРЕТНИЙ опис
– 40–60 слів
– без списків і пояснень
– лише сам художній опис

${languageInstructions[detectedLanguage]}`;

    const userPrompt = `ТЕКСТ ПІСНІ:
"${lyrics}"

Створи персоналізований художній опис ілюстрації:`;

    console.log('Calling OpenAI API with artistic prompt...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 200,
        temperature: 0.9,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');

    const imageDescription = data.choices[0].message.content.trim();
    console.log('Generated artistic description:', imageDescription);

    return new Response(JSON.stringify({ imageDescription }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-image-description function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
