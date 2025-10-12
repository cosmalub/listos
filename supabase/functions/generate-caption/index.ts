import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lyrics, style, length = 'medium' }: { lyrics: string; style?: string; length?: 'short' | 'medium' | 'long' } = await req.json();

    if (!lyrics) {
      throw new Error('Lyrics are required');
    }

    const lengthPrompts: Record<'short' | 'medium' | 'long', string> = {
      short: 'Создай очень короткую подпись (2-4 слова)',
      medium: 'Создай короткую подпись (2-8 слов)', 
      long: 'Создай подпись (максимум 12 слов для особых случаев)'
    };

    // Detect language from lyrics
    const detectedLanguage = detectLanguage(lyrics);
    console.log('Detected language:', detectedLanguage);

    const languageInstructions = {
      Ukrainian: 'КРИТИЧНО: Створи підпис ВИКЛЮЧНО українською мовою. Використовуй українську лексику, граматику та правопис.',
      Russian: 'КРИТИЧНО: Создай подпись ИСКЛЮЧИТЕЛЬНО на русском языке. Используй русскую лексику, грамматику и правописание.',
      English: 'CRITICAL: Create caption EXCLUSIVELY in English language. Use English vocabulary, grammar and spelling.'
    };

    const systemPrompt = `Ты - эксперт по созданию коротких, емких подписей для открыток. Твоя задача - на основе слов песни создать краткую подпись (2-8 слов) для лицевой части открытки А6, которая передаст суть послания и эмоцию.

${languageInstructions[detectedLanguage]}

Алгоритм работы:

1. АНАЛИЗ ВХОДНЫХ ДАННЫХ:
- Текст песни - анализируй ключевые образы, эмоции, метафоры
- Тип открытки - определи повод (день рождения, благодарность, извинение, поздравление и т.д.)
- Получатель - учти возможный возраст, пол, отношения с отправителем

2. ОПРЕДЕЛЕНИЕ СТИЛЯ ПОДПИСИ:

🎉 ЭНЕРГИЧНЫЙ СТИЛЬ (для радостных поводов):
- Яркие, позитивные формулировки
- Восклицательные знаки
- Активные глаголы
- Примеры: "Сияй ярче звезд!", "Твоя энергия зажигает!"

🌸 НЕЖНЫЙ СТИЛЬ (для интимных, личных моментов):
- Мягкие, теплые слова
- Метафоры из природы
- Спокойная интонация
- Примеры: "Твоя доброта цветет", "Спасибо за тепло души"

🌿 УНИВЕРСАЛЬНЫЙ СТИЛЬ (для нейтральных поводов):
- Сбалансированные формулировки
- Классические пожелания
- Умеренная эмоциональность
- Примеры: "С пожеланиями счастья", "Пусть сбываются мечты"

3. СТРУКТУРА ПОДПИСИ:
Базовая формула: [Эмоция/Образ из песни] + [Персональное обращение/Повод]

Варианты конструкций:
- Метафора + пожелание: "Твои крылья несут к звездам"
- Прямое обращение: "Светлана, с днем рождения!"
- Цитата-переосмысление: "Когда музыка живет в сердце"
- Личное послание: "Спасибо за твою мелодию"

4. ТЕХНИЧЕСКИЕ ТРЕБОВАНИЯ:
- ${lengthPrompts[length]}
- Формат: Одна строка или две короткие строки
- Язык: ${detectedLanguage} (определен из песни)
- Тон: Соответствует настроению песни и поводу

5. СТРОГО ЗАПРЕЩЕНО:
- Эмоджи, смайлики, символы (✨, 🎉, 💝, ❤️, 🌟, 🎂, 🌈, и ЛЮБЫЕ другие)
- Слишком длинных фраз (более 8 слов)
- Сложных метафор, требующих объяснения
- Грустных или негативных формулировок (кроме извинений)
- Прямого копирования строк из песни
- Банальных штампов без связи с текстом

ВАЖНО: Подпись должна содержать ТОЛЬКО текст на языке ${detectedLanguage}, никаких эмоджи!
На выходе только готовая подпись БЕЗ эмоджи и без дополнительных объяснений.`;

    const userPrompt = `ТЕКСТ ПЕСНИ:
"${lyrics}"

Создай подпись для открытки согласно алгоритму${style ? `, используя ${style} стиль` : ''}.

ВНИМАНИЕ: НЕ используй эмоджи, смайлики или любые символы! Только текст!`;

    console.log('Generating caption with OpenAI...');

    // Helpers for sanitizing and fallback
    const removeEmojis = (text: string) =>
      text
        // Remove emojis and variation selectors / zero-width joiners
        .replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, '')
        .replace(/["'“”‘’]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    const limitByLength = (text: string) => {
      const limits: Record<'short' | 'medium' | 'long', number> = { short: 4, medium: 8, long: 12 };
      const maxWords = limits[length] ?? 8;
      const words = text.split(/\s+/).filter(Boolean);
      return words.length > maxWords ? words.slice(0, maxWords).join(' ') : text;
    };

    const sanitizeCaption = (text: string) => limitByLength(removeEmojis(text));

    const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
    const serverFallback = (language: 'Ukrainian' | 'Russian' | 'English'): string => {
      try {
        const lower = String(lyrics || '').toLowerCase();
        const joyWords = ['радість','щастя','сміх','весел','святк'];
        const loveWords = ['любов','кохан','серце','душа','коханий','кохана'];
        const springWords = ['весна','квіти','квіт','зелень','природа'];
        const sadWords = ['сум','біль','сльоз','жаль','самот'];

        if (joyWords.some(w => lower.includes(w))) {
          return pick(['Ділюся радістю з тобою', 'Щастя поруч з тобою', 'Святкуємо разом']);
        }
        if (loveWords.some(w => lower.includes(w))) {
          return pick(['З любов’ю і теплом', 'Від щирого серця для тебе', 'З любов’ю для тебе']);
        }
        if (springWords.some(w => lower.includes(w))) {
          return pick(['Весняний настрій для тебе', 'Ніжність весни для тебе', 'Квітучий настрій для тебе']);
        }
        if (sadWords.some(w => lower.includes(w))) {
          return pick(['Поруч у думках', 'Думаю про тебе', 'Світла підтримка для тебе']);
        }
        return pick(['З найкращими побажаннями', 'Від щирого серця', 'Для тебе з турботою', 'Нехай мрії збуваються']);
      } catch {
        return 'З найкращими побажаннями';
      }
    };

    // Attempt 1: GPT-5-mini (newer API)
    const response1 = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_completion_tokens: 100,
      }),
    });

    let rawCaption = '';
    if (response1.ok) {
      const data1 = await response1.json();
      rawCaption = data1?.choices?.[0]?.message?.content?.trim?.() ?? '';
      console.log('OpenAI raw (gpt-5-mini):', rawCaption);
    } else {
      const err1 = await response1.json().catch(() => ({}));
      console.error('OpenAI API error (gpt-5-mini):', err1);
    }

    let finalCaption = sanitizeCaption(rawCaption);

    // Attempt 2: fallback to gpt-4o-mini if needed
    if (!finalCaption) {
      const response2 = await fetch('https://api.openai.com/v1/chat/completions', {
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
          max_tokens: 60,
          temperature: 0.7,
        }),
      });

      if (response2.ok) {
        const data2 = await response2.json();
        const raw2 = data2?.choices?.[0]?.message?.content?.trim?.() ?? '';
        console.log('OpenAI raw (gpt-4o-mini):', raw2);
        finalCaption = sanitizeCaption(raw2);
      } else {
        const err2 = await response2.json().catch(() => ({}));
        console.error('OpenAI API error (gpt-4o-mini):', err2);
      }
    }

    if (!finalCaption) {
      finalCaption = serverFallback(detectedLanguage);
    }

    console.log('Generated caption (sanitized):', finalCaption);

    return new Response(JSON.stringify({ caption: finalCaption }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-caption function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});