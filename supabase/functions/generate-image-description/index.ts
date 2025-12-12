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

// Map occasion to visual themes
function getOccasionTheme(occasion: string): string {
  const occasionThemes: Record<string, string> = {
    'birthday': 'святковий, з тортом, свічками, подарунками, веселий настрій',
    'wedding': 'романтичний, з квітами, серцями, елегантний',
    'anniversary': 'теплий, романтичний, ностальгічний',
    'thank-you': 'теплий, вдячний, з квітами або серцями',
    'congratulation': 'святковий, урочистий, з зірками і конфетті',
    'love': 'романтичний, ніжний, з серцями і квітами',
    'apology': 'ніжний, спокійний, делікатний',
    'get-well': 'теплий, оптимістичний, з квітами і сонцем',
    'holiday': 'святковий, яскравий, урочистий',
    'new-year': 'зимовий, святковий, з ялинкою і сніжинками',
    'christmas': 'зимовий, теплий, з ялинкою і подарунками',
    'easter': 'весняний, з квітами і писанками',
    'mothers-day': 'ніжний, з квітами, теплий',
    'fathers-day': 'теплий, спокійний, з природою',
    'valentines': 'романтичний, з серцями і трояндами'
  };
  
  return occasionThemes[occasion] || 'теплий, універсальний';
}

// Map relationship to visual elements
function getRelationshipElements(relationship: string): string {
  const relationshipElements: Record<string, string> = {
    'мама': 'ніжні квіти (троянди, півонії), материнська любов, теплі тони',
    'тато': 'спокійна природа, сила, стабільність, земляні тони',
    'бабуся': 'затишок, традиції, квіти, вишиванка',
    'дідусь': 'мудрість, природа, спокій',
    'дружина': 'романтика, троянди, елегантність, любов',
    'чоловік': 'сила, підтримка, романтика',
    'кохана': 'романтика, серця, троянди, ніжність',
    'коханий': 'романтика, любов, серця',
    'друг': 'веселощі, енергія, яскраві кольори',
    'подруга': 'веселощі, квіти, яскраві кольори',
    'сестра': 'близькість, веселощі, квіти',
    'брат': 'підтримка, енергія, динаміка',
    'дитина': 'казковість, яскравість, милі персонажі',
    'колега': 'професійність, теплота, універсальність'
  };
  
  return relationshipElements[relationship?.toLowerCase()] || 'теплі, дружні елементи';
}

serve(async (req) => {
  console.log('Generate image description function called');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lyrics, caption, userContext } = await req.json();
    console.log('Input received:', { 
      lyricsLength: lyrics?.length,
      caption,
      hasUserContext: !!userContext,
      userContext
    });

    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      throw new Error('OpenAI API key not configured');
    }

    // Detect language from lyrics
    const detectedLanguage = detectLanguage(lyrics);
    console.log('Detected language:', detectedLanguage);

    // Build personalization context
    let personalizationContext = '';
    if (userContext) {
      const parts: string[] = [];
      
      if (userContext.occasion) {
        const occasionTheme = getOccasionTheme(userContext.occasion);
        parts.push(`Привід: ${occasionTheme}`);
      }
      
      if (userContext.recipient?.relationship) {
        const relationshipElements = getRelationshipElements(userContext.recipient.relationship);
        parts.push(`Для ${userContext.recipient.relationship}: ${relationshipElements}`);
      }
      
      if (userContext.recipient?.name) {
        parts.push(`Отримувач: ${userContext.recipient.name}`);
      }
      
      if (userContext.conversationSummary) {
        parts.push(`Додаткові деталі: ${userContext.conversationSummary}`);
      }
      
      if (parts.length > 0) {
        personalizationContext = `\n\nПЕРСОНАЛІЗАЦІЯ:\n${parts.join('\n')}`;
      }
    }

    const languageInstructions = {
      Ukrainian: 'КРИТИЧНО: Створи опис ВИКЛЮЧНО українською мовою. Використовуй українську лексику, граматику та правопис.',
      Russian: 'КРИТИЧНО: Создай описание ИСКЛЮЧИТЕЛЬНО на русском языке. Используй русскую лексику, грамматику и правописание.',
      English: 'CRITICAL: Create description EXCLUSIVELY in English language. Use English vocabulary, grammar and spelling.'
    };

    const systemPrompt = `Ти створюєш ПЕРСОНАЛІЗОВАНИЙ опис дизайну листівки на основі тексту пісні.

${languageInstructions[detectedLanguage]}
${personalizationContext}

ТВОЯ ЗАДАЧА - створити УНІКАЛЬНИЙ опис що ВІДОБРАЖАЄ:
1. Конкретного отримувача (якщо відомо)
2. Привід (якщо відомо)
3. Настрій та образи з пісні
4. Специфічні деталі що роблять листівку особистою

ОПИСУВАЙ:
- Конкретні візуальні елементи (що САМЕ зображено)
- Кольорову палітру що підходить отримувачу/приводу
- Настрій та атмосферу
- Унікальні деталі що роблять листівку персональною

НЕ ОПИСУЙ:
- Технічні деталі (формат, техніки)
- Текст на листівці

ПРИКЛАДИ ПЕРСОНАЛІЗАЦІЇ:
- Для мами → ніжні квіти, теплі рожево-персикові тони, затишна атмосфера
- Для друга → яскраві кольори, динамічні елементи, веселий настрій
- На день народження → святкові елементи, торт/кульки/подарунки
- На подяку → теплі тони, квіти, серця

Створи короткий але КОНКРЕТНИЙ опис (40-60 слів).`;

    const userPrompt = `ТЕКСТ ПІСНІ:
"${lyrics}"

Створи персоналізований опис дизайну листівки:`;

    console.log('Calling OpenAI API with personalization context...');

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
        max_tokens: 250,
        temperature: 0.8, // Increased for more variety
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
    console.log('Generated personalized description:', imageDescription);

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
