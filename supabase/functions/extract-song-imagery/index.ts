import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SongImagery {
  directImages: string[];
  metaphors: string[];
  colorMood: string;
  atmosphere: string;
  timeContext?: string;
  personalObjects?: string[];
  relationship: string;
  emotionalCore: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lyrics, userContext } = await req.json();

    if (!lyrics) {
      return new Response(
        JSON.stringify({ error: 'Lyrics are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    console.log('Extracting imagery from lyrics:', lyrics.substring(0, 100) + '...');
    console.log('User context:', userContext);

    const systemPrompt = `Ти експерт з аналізу текстів пісень та їх візуалізації. 
Твоя задача - витягти з тексту пісні КОНКРЕТНІ образи, метафори та атмосферу для створення персоналізованої листівки.

ВАЖЛИВО: Витягуй ТІЛЬКИ те, що РЕАЛЬНО є в тексті. Не вигадуй!

Відповідай ТІЛЬКИ у форматі JSON:
{
  "directImages": ["конкретні об'єкти/сутності згадані в тексті: сонце, квіти, море, зірки тощо"],
  "metaphors": ["порівняння та метафори з тексту: 'любов як море', 'серце б'ється як птах'"],
  "colorMood": "опис кольорової гами що випливає з тексту: теплі золотисті тони, ніжні пастельні, яскраві святкові",
  "atmosphere": "емоційна атмосфера: тепла і ностальгічна, весела і енергійна, романтична і ніжна",
  "timeContext": "час доби/сезон якщо згадується: весняний ранок, зимовий вечір, літній день",
  "personalObjects": ["особисті предмети/деталі: кухня, сад, книги, гітара"],
  "relationship": "тип стосунків: мама-дитина, закохані, друзі, сім'я",
  "emotionalCore": "головна емоція/посил пісні в 2-3 словах: материнська любов, радість зустрічі, щира подяка"
}`;

    const userPrompt = `Проаналізуй цей текст пісні та витягни образи для візуалізації:

ТЕКСТ ПІСНІ:
${lyrics}

${userContext ? `ДОДАТКОВИЙ КОНТЕКСТ:
- Привід: ${userContext.occasion || 'не вказано'}
- Отримувач: ${userContext.recipient?.name || 'не вказано'} (${userContext.recipient?.relationship || 'не вказано'})
- Відправник: ${userContext.sender?.name || 'не вказано'}` : ''}

Витягни КОНКРЕТНІ образи з цього тексту для створення унікальної листівки.`;

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
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('Empty response from OpenAI');
    }

    console.log('Raw AI response:', content);

    // Parse JSON from response
    let imagery: SongImagery;
    try {
      // Find JSON in response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        imagery = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse imagery:', parseError);
      // Return fallback
      imagery = {
        directImages: ['серце', 'любов', 'тепло'],
        metaphors: [],
        colorMood: 'теплі пастельні тони',
        atmosphere: 'тепла і ніжна',
        relationship: 'близькі люди',
        emotionalCore: 'щира любов'
      };
    }

    console.log('Extracted imagery:', imagery);

    return new Response(
      JSON.stringify({ imagery }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in extract-song-imagery:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
