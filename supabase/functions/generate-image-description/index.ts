import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('Generate image description function called');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lyrics, caption } = await req.json();
    console.log('Input received:', { lyrics: lyrics?.substring(0, 100), caption });

    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = `Ти - эксперт по созданию дизайна открыток. Твоя задача - проанализировать слова песни и создать детальное описание визуального дизайна для лицевой части открытки формата А6 (105x148 мм).

Алгоритм работы:

1. АНАЛИЗ ТЕКСТА ПЕСНИ:
- Определи основное эмоциональное настроение
- Выдели ключевые образы и метафоры  
- Определи тип послания (поздравление, благодарность, извинение, просьба и т.д.)

2. ВЫБОР СТИЛЯ:
- Радостный: для ярких, праздничных, энергичных текстов
- Нежный: для лирических, извиняющихся, благодарных текстов  
- Универсальный: для просьб, приглашений, нейтральных посланий

3. СОЗДАНИЕ ОПИСАНИЯ ДИЗАЙНА:
- Опиши композицию в формате А6
- Укажи цветовую палитру согласно выбранному стилю
- Детализируй визуальные элементы
- Учти особенности стиля

ХАРАКТЕРИСТИКИ СТИЛЕЙ:

🎉 РАДОСТНЫЙ СТИЛЬ:
- Яркие насыщенные цвета с высокой контрастностью
- Простые четкие формы и силуэты
- Плоская 2D графика в мультяшном стиле
- Праздничные элементы (конфетти, звездочки, сердца)
- Радостное и энергичное настроение

🌸 НЕЖНЫЙ СТИЛЬ:  
- Мягкие акварельные техники с естественным растеканием цветов
- Деликатные мазки кисти и органичные текстуры
- Пастельная и приглушенная цветовая палитра
- Легкая воздушная композиция с большим количеством белого пространства
- Мечтательный и художественный вид

🌿 УНИВЕРСАЛЬНЫЙ СТИЛЬ:
- Стиль Studio Ghibli с мягкими пастельными тонами  
- Природные элементы (облака, деревья, цветы, пейзажи)
- Причудливая и мечтательная атмосфера
- Сбалансированная композиция с теплым настроением
- Чистый профессиональный вид

ВАЖНО: Если в песне описываются конкретные люди, описывай их абстрактно - через силуэты, тени, символические образы, нарисованные фигуры или метафоры.

Создай описание на том же языке, что и текст песни (50-80 слов), включающее только текст описания без вступительного текста.`;

    const userPrompt = `ТЕКСТ ПЕСНИ:
"${lyrics}"

ПОДПИСЬ ДЛЯ ОТКРЫТКИ:
"${caption}"

Проанализируй текст песни согласно алгоритму:
1. Определи эмоциональное настроение и тип послания
2. Выбери подходящий стиль (радостный/нежный/универсальный)
3. Создай детальное описание визуального дизайна для открытки А6

Создай описание на том же языке, что и текст песни:`;

    console.log('Calling OpenAI API...');

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
        temperature: 0.7,
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

    return new Response(JSON.stringify({ imageDescription }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-image-description function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});