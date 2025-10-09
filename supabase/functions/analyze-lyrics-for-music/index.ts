import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalysisRequest {
  lyrics: string;
}

interface AnalysisResponse {
  style: string;
  title: string;
  vocalGender?: 'male' | 'female';
  styleWeight?: number;
  weirdnessConstraint?: number;
  audioWeight?: number;
  negativeTags?: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lyrics }: AnalysisRequest = await req.json();
    
    if (!lyrics) {
      throw new Error('Lyrics are required');
    }

    const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
    if (!ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY is not configured');
    }

    console.log('Analyzing lyrics for music generation...');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: `Проаналізуй текст пісні для музичної листівки і визнач оптимальні параметри для генерації музики в Suno V5.

ТЕКСТ ПІСНІ:
${lyrics}

## КРОК 1: ВИЗНАЧ КОНТЕКСТ

Проаналізуй:
- **Тип події**: день народження, вибачення, подяка, привітання зі святом, визнання в коханні, мотивація, підтримка, жарт, прохання про пробачення тощо
- **Від кого**: чоловік/жінка/невідомо (хто співає/відправляє)
- **Кому**: чоловік/жінка/невідомо (кому адресована)
- **Відносини**: романтичні, дружні, родинні, професійні тощо
- **Настрій**: радісний, романтичний, сумний, енергійний, щирий, жартівливий

## КРОК 2: ПІДБЕРИ СТИЛЬ НА ОСНОВІ ПОДІЇ

**День народження**: energetic pop, happy birthday celebration, upbeat party
**Вибачення**: emotional ballad, heartfelt acoustic, sincere apologetic
**Подяка**: warm grateful, appreciative melodic, heartfelt thanks
**Романтика/Кохання**: romantic ballad, love song, intimate acoustic
**Мотивація**: powerful inspirational, uplifting motivational, energetic anthem
**Святкування**: festive celebration, joyful party, cheerful upbeat
**Дружба**: friendly cheerful, upbeat friendship, warm camaraderie
**Сумні події**: melancholic ballad, emotional slow, heartfelt sadness
**Жарт/Гумор**: playful funny, lighthearted comedy, cheerful quirky

## КРОК 3: ВИЗНАЧ СТАТЬ ВОКАЛІСТА

- Якщо пісня від чоловіка → **"male"**
- Якщо пісня від жінки → **"female"**
- Якщо невідомо, вибери на основі емоційного контексту:
  - Романтичні/ніжні пісні для жінки → male
  - Романтичні/ніжні пісні для чоловіка → female
  - Енергійні/мотиваційні → male
  - Емоційні/щирі → відповідно до адресата

## КРОК 4: НАЛАШТУЙ ПАРАМЕТРИ

**styleWeight** (0-100):
- Стандартні події (ДН, подяка): 50-60
- Романтика: 60-70 (більше відповідності стилю)
- Мотивація: 55-65
- Жарт/гумор: 40-50 (більше свободи)

**weirdnessConstraint** (0-100):
- Формальні/офіційні: 20-35 (традиційно)
- Дружні/неформальні: 40-55
- Креативні/унікальні: 55-70

**audioWeight** (0-100):
- Емоційні/щирі: 60-75 (акцент на вокалі)
- Енергійні/святкові: 45-60 (збалансовано)
- Романтичні: 65-80 (вокал важливий)

**negativeTags**: уникай невідповідних елементів
- Романтика → ["aggressive", "screaming", "heavy metal"]
- День народження → ["sad", "melancholic", "slow"]
- Вибачення → ["aggressive", "angry", "energetic"]
- Святкування → ["sad", "depressing", "slow"]

## ПРИКЛАДИ:

1. "З днем народження, мій друже! Бажаю тобі радості!" (від чоловіка другу)
   → style: "energetic birthday celebration pop", vocalGender: "male", styleWeight: 55

2. "Вибач мене, моя люба, я був неправий" (від чоловіка до жінки)
   → style: "heartfelt apologetic acoustic ballad", vocalGender: "male", styleWeight: 65

3. "Кохана, ти - моє все!" (від чоловіка до жінки)
   → style: "romantic love ballad", vocalGender: "male", styleWeight: 70

ВАЖЛИВО: Поверни ТІЛЬКИ валідний JSON без додаткового тексту:
{
  "style": "string",
  "title": "string",
  "vocalGender": "male" | "female",
  "styleWeight": number,
  "weirdnessConstraint": number,
  "audioWeight": number,
  "negativeTags": ["string"]
}`
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API error:', response.status, errorText);
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.content[0].text;
    
    console.log('Claude response:', content);

    // Parse JSON from Claude's response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse JSON from Claude response');
    }

    const analysis: AnalysisResponse = JSON.parse(jsonMatch[0]);
    
    // Validate ranges
    if (analysis.styleWeight !== undefined) {
      analysis.styleWeight = Math.max(0, Math.min(100, analysis.styleWeight));
    }
    if (analysis.weirdnessConstraint !== undefined) {
      analysis.weirdnessConstraint = Math.max(0, Math.min(100, analysis.weirdnessConstraint));
    }
    if (analysis.audioWeight !== undefined) {
      analysis.audioWeight = Math.max(0, Math.min(100, analysis.audioWeight));
    }

    console.log('Analysis result:', analysis);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-lyrics-for-music:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        fallback: {
          style: 'pop',
          title: 'Untitled',
          styleWeight: 50,
          weirdnessConstraint: 40,
          audioWeight: 50
        }
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
