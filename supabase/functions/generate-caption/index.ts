import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lyrics, style, length = 'medium' } = await req.json();

    if (!lyrics) {
      throw new Error('Lyrics are required');
    }

    const lengthPrompts = {
      short: 'Создай очень короткую подпись (2-4 слова)',
      medium: 'Создай короткую подпись (2-8 слов)', 
      long: 'Создай подпись (максимум 12 слов для особых случаев)'
    };

    const systemPrompt = `Ты - эксперт по созданию коротких, емких подписей для открыток. Твоя задача - на основе слов песни создать краткую подпись (2-8 слов) для лицевой части открытки А6, которая передаст суть послания и эмоцию.

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
- Язык: Тот же, что и в исходной песне
- Тон: Соответствует настроению песни и поводу

5. ЧЕГО ИЗБЕГАТЬ:
- Слишком длинных фраз (более 8 слов)
- Сложных метафор, требующих объяснения
- Грустных или негативных формулировок (кроме извинений)
- Прямого копирования строк из песни
- Банальных штампов без связи с текстом

На выходе только готовая подпись без дополнительных объяснений.`;

    const userPrompt = `ТЕКСТ ПЕСНИ:
"${lyrics}"

Создай подпись для открытки согласно алгоритму${style ? `, используя ${style} стиль` : ''}:`;

    console.log('Generating caption with OpenAI...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
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

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(error.error?.message || 'Failed to generate caption');
    }

    const data = await response.json();
    const caption = data.choices[0].message.content.trim();

    console.log('Generated caption:', caption);

    return new Response(JSON.stringify({ caption }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-caption function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});