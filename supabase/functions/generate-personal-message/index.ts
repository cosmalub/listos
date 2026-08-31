import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { caption, lyrics, format = 'qr', occasion, recipient, sender } = await req.json();
    console.log('Generate personal message function called');
    console.log('Input received:', { caption, format, occasion, lyrics: lyrics?.substring(0, 100) + '...' });

    if (!caption) {
      throw new Error('Caption is required');
    }

    const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
    if (!ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY is not configured');
    }

    // Detect language from caption and lyrics
    const detectedLanguage = detectLanguage(lyrics || caption);
    console.log('Detected language:', detectedLanguage);

    const languageInstructions = {
      Ukrainian: 'КРИТИЧНО: Створи повідомлення ВИКЛЮЧНО українською мовою. Використовуй українську лексику, граматику та правопис.',
      Russian: 'КРИТИЧНО: Создай сообщение ИСКЛЮЧИТЕЛЬНО на русском языке. Используй русскую лексику, грамматику и правописание.',
      English: 'CRITICAL: Create message EXCLUSIVELY in English language. Use English vocabulary, grammar and spelling.'
    };

    const isSound = format === 'sound';

    const qrSystemPrompt = `Ты - эксперт по созданию персональных посланий для обратной стороны открыток. Твоя задача - на основе заголовка лицевой части и слов песни создать теплое, личное послание (25-35 слов, до 210 символів), которое объясняет подарок-песню и передает глубокие чувства отправителя.

${languageInstructions[detectedLanguage]}

Алгоритм работы:

1. Анализ входных данных:
   - Заголовок лицевой части - ключевая эмоция и повод
   - Текст песни - образы, метафоры, настроение для вдохновения
   - Контекст отношений - определить близость отношений (семья, друзья, коллеги)

2. Структура послания:
   Формула: [Личное обращение] + [Метафора/образ из песни] + [Объяснение QR-кода] + [Пожелание/благословение]
   
   Обязательные элементы:
   - Персональное обращение по имени
   - Упоминание QR-кода и песни внутри
   - Связь между песней и получателем
   - Теплые пожелания или благословения

3. Стилистические особенности:
   🎵 Музыкальные метафоры: "мелодия души", "твоя песня", "звучит в сердце", "каждая нота", "гармония жизни", "ритм счастья"
   🌟 Персональные образы: связать качества человека с элементами песни, использовать профессию, хобби, особенности характера
   💝 Эмоциональные акценты: искренность и теплота, признание уникальности получателя, надежда на будущее

4. Технические требования:
   - Длина: 25-35 слов, до 210 символів (2-3 предложения)
   - Тон: Теплый, личный, искренний
   - Язык: ${detectedLanguage} (определен из текста песни)
   - Обязательно: Упоминание QR-кода и песни

5. Избегать:
   - Формальных фраз без эмоций
   - Слишком сложных метафор
   - Банальных поздравлений
   - Прямого цитирования текста песни
   - Превышения лимита слов
   - Превышения 210 символов

Формат ответа:
На выходе только готовый текст послания (25-35 слов, до 210 символів) на языке ${detectedLanguage} без дополнительных пояснений.`;

    const soundSystemPrompt = `Ти — автор теплих текстів усередині музичної листівки, яка САМА заграє пісню, щойно її відкриють. Жодного QR-коду: не пиши «скануй», «QR», «код», «камера», «сторінка».

${languageInstructions[detectedLanguage]}

Привід: ${occasion || 'не вказано'}
Отримувач: ${recipient || 'не вказано'}
Від кого: ${sender || 'не вказано'}
Підпис на обкладинці: ${caption}

Структура — ДВА короткі абзаци (розділи порожнім рядком):
1) Особисте звернення + навіщо ця пісня.
2) Що станеться, коли листівку відкриють (пісня зазвучить) + тепле побажання.

Вимоги:
- Українська (або мова пісні, якщо вона не українська): ${detectedLanguage}
- Тепло, просто, без канцеляриту
- Близько 180–250 символів, не більше 250
- Два короткі абзаци
- Згадай, що пісня грає, коли листівку відкривають
- НЕ згадуй QR, сканування, телефон, посилання

На виході — лише готовий текст, без лапок і пояснень.`;

    const systemPrompt = isSound ? soundSystemPrompt : qrSystemPrompt;

    const userPrompt = isSound
      ? `Підпис на обкладинці: ${caption}

Текст пісні:
${lyrics || 'Не вказано'}

Напиши теплий текст УСЕРЕДИНІ листівки (два короткі абзаци, до 250 символів). Пісня заграє, щойно листівку відкриють. Без QR.`
      : `Заголовок лицевой части: ${caption}

Текст песни:
${lyrics || 'Не указан'}

Создай персональное послание для обратной стороны открытки.`;

    console.log('Calling Anthropic Claude Sonnet 4...');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [
          { role: 'user', content: userPrompt }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);
      throw new Error(`Anthropic API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    let personalMessage = data.content[0]?.text?.trim();

    if (!personalMessage) {
      throw new Error('No message generated by AI');
    }

    const maxChars = isSound ? 250 : 210;
    if (personalMessage.length > maxChars) {
      const trimmed = personalMessage.substring(0, maxChars);
      const lastSentence = Math.max(
        trimmed.lastIndexOf('.'),
        trimmed.lastIndexOf('!'),
        trimmed.lastIndexOf('?')
      );
      personalMessage = lastSentence > maxChars - 60
        ? trimmed.substring(0, lastSentence + 1)
        : trimmed.substring(0, maxChars - 3) + '...';
    }

    console.log('Personal message generated successfully');
    console.log('Message length:', personalMessage.length);

    return new Response(
      JSON.stringify({ personalMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-personal-message function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
