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

    const systemPrompt = `Ты создаешь простое описание дизайна открытки для пользователя на основе текста песни.

Твоя задача - описать как будет выглядеть открытка простыми словами, чтобы пользователь понял нравится ему дизайн или нет.

ОПИСЫВАЙ ТОЛЬКО:
- Основные визуальные элементы (что изображено)
- Цвета и настроение 
- Общую композицию

НЕ ОПИСЫВАЙ:
- Технические детали (формат А6, техники рисования)
- Текст или подписи на открытке
- Процесс создания

СТИЛИ:
🎉 Радостный - яркие цвета, праздничные элементы, энергичное настроение
🌸 Нежный - мягкие пастельные тона, воздушная композиция, спокойное настроение  
🌿 Универсальный - природные элементы, сбалансированная композиция, теплое настроение

Создай короткое описание (30-50 слов) на том же языке, что и песня.`;

    const userPrompt = `ТЕКСТ ПЕСНИ:
"${lyrics}"

Создай простое описание дизайна открытки на основе настроения и образов из песни:`;

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