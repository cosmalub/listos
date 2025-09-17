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
      short: 'Create a very short caption (1-3 words)',
      medium: 'Create a medium caption (a short meaningful phrase)',
      long: 'Create a longer caption (1-2 sentences)'
    };

    const systemPrompt = `You are an expert at creating beautiful, emotional captions for postcards based on song lyrics. 
    ${lengthPrompts[length]} that captures the essence and emotion of the song.
    The caption should be in Ukrainian language and evoke feelings related to the song's theme.
    Make it personal, touching, and suitable for a postcard.
    Return ONLY the caption text, nothing else.`;

    const userPrompt = `Based on these song lyrics, create a caption${style ? ` that fits the ${style} style` : ''}:

${lyrics}`;

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