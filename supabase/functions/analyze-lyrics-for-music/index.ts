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
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: `Проаналізуй текст пісні і визнач оптимальні параметри для генерації музики в Suno V5.

ТЕКСТ ПІСНІ:
${lyrics}

Визнач наступні параметри:

1. **style** - музичний стиль/жанр (наприклад: "pop rock", "acoustic ballad", "energetic electronic", "romantic jazz")
2. **title** - назву пісні (з першого рядка або змісту)
3. **vocalGender** - стать вокалу: "male" або "female" (базуючись на темі та настрої)
4. **styleWeight** - вага стилю 0-100:
   - 0-30: мінімальна прив'язка до стилю, більше свободи
   - 40-60: баланс між стилем і креативністю (рекомендовано)
   - 70-100: сильна прив'язка до обраного стилю
5. **weirdnessConstraint** - рівень експериментальності 0-100:
   - 0-30: традиційна, передбачувана музика
   - 40-60: помірна креативність (рекомендовано для більшості)
   - 70-100: експериментальна, незвична музика
6. **audioWeight** - баланс між вокалом і інструментами 0-100:
   - 0-30: акцент на інструментах
   - 40-60: збалансовано (рекомендовано)
   - 70-100: акцент на вокалі
7. **negativeTags** - масив небажаних елементів (наприклад: ["screaming", "heavy metal", "rap"])

Аналізуй:
- Настрій і емоції тексту
- Тематику (любовна, енергійна, сумна, мотиваційна тощо)
- Цільову аудиторію
- Стиль викладу (ліричний, ритмічний, розповідний)

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
