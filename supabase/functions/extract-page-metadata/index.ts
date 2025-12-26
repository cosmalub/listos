import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `Ти — помічник, який аналізує історію чату та витягує структуровану інформацію про пісню/листівку.

На основі історії чату визнач:
1. **occasion** — привід (одне з: birthday, congratulations, thanks, apology, love, friendship, holiday, other)
2. **recipient** — ім'я отримувача (кому призначена листівка), у давальному відмінку якщо можливо (напр. "Марії", "Олі", "мамі")
3. **sender** — ім'я або роль відправника (хто дарує листівку), у родовому відмінку якщо можливо (напр. "Влада", "Олі", "хлопця")

Маппінг приводів:
- День народження, birthday, ДН → "birthday"
- Вітання, поздоровлення → "congratulations"  
- Подяка, дякую, спасибі → "thanks"
- Вибачення, вибач, пробачення → "apology"
- Кохання, love, романтика, освідчення → "love"
- Дружба, друг/подруга → "friendship"
- Свято, новий рік, різдво → "holiday"
- Якщо незрозуміло → "other"

Відповідай ТІЛЬКИ у форматі JSON без пояснень:
{
  "occasion": "birthday",
  "recipient": "Марії",
  "sender": "Влада"
}

Якщо якесь поле неможливо визначити, використовуй порожній рядок "".`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { chatMessages, lyrics } = await req.json();

    if (!chatMessages || chatMessages.length === 0) {
      return new Response(
        JSON.stringify({ 
          occasion: '',
          recipient: '',
          sender: ''
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
    if (!anthropicApiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    // Build context from chat history
    const chatContext = chatMessages
      .map((msg: any) => `${msg.sender === 'user' ? 'Користувач' : 'Листосик'}: ${msg.content}`)
      .join('\n\n');

    const userPrompt = `Ось історія чату:\n\n${chatContext}\n\n${lyrics ? `Текст пісні:\n${lyrics}\n\n` : ''}Витягни інформацію про отримувача, відправника та привід.`;

    console.log('Extracting metadata from chat...');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Claude API error:', errorData);
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.content[0]?.text || '{}';

    console.log('Raw response:', reply);

    // Parse JSON from response
    let metadata;
    try {
      // Try to extract JSON from the response
      const jsonMatch = reply.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        metadata = JSON.parse(jsonMatch[0]);
      } else {
        metadata = JSON.parse(reply);
      }
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      metadata = { occasion: '', recipient: '', sender: '' };
    }

    // Validate and normalize occasion
    const validOccasions = ['birthday', 'congratulations', 'thanks', 'apology', 'love', 'friendship', 'holiday', 'other'];
    if (!validOccasions.includes(metadata.occasion)) {
      metadata.occasion = '';
    }

    console.log('Extracted metadata:', metadata);

    return new Response(
      JSON.stringify(metadata),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in extract-page-metadata:', error);
    return new Response(
      JSON.stringify({ 
        occasion: '',
        recipient: '',
        sender: '',
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 200, // Return 200 with empty data instead of error
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
