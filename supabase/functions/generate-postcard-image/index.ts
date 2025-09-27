import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('Generate postcard image function called');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { caption, imageDescription, style = 'universal' } = await req.json();
    console.log('Input received:', { 
      caption: caption?.substring(0, 50), 
      imageDescription: imageDescription?.substring(0, 100),
      style 
    });

    if (!caption || !imageDescription) {
      throw new Error('Caption and image description are required');
    }

    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      throw new Error('OpenAI API key not configured');
    }

    // Создаем объединенный промт для генерации открытки
    const postcardPrompt = createPostcardPrompt(caption, imageDescription, style);
    
    console.log('Generated postcard prompt:', postcardPrompt.substring(0, 200));
    console.log('Calling OpenAI GPT-4o Image Generation API...');

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        prompt: postcardPrompt,
        size: '1024x1792', // Вертикальный формат близкий к А6
        quality: 'standard',
        n: 1
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI image generation response received');

    const imageUrl = data.data[0].url;

    return new Response(JSON.stringify({ 
      imageUrl,
      prompt: postcardPrompt 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-postcard-image function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function createPostcardPrompt(caption: string, imageDescription: string, style: string): string {
  // Базовые настройки для открытки А6
  const basePrompt = `Create a beautiful postcard design in A6 format (105x148mm, vertical orientation). `;
  
  // Стилистические модификаторы
  const styleModifiers = {
    joyful: `Bright, energetic, festive style with vivid colors, simple flat 2D graphics, cartoonish elements, celebration motifs like confetti or stars. `,
    gentle: `Soft watercolor techniques with natural color bleeding, delicate brush strokes, organic textures, pastel and muted color palette, airy composition with lots of white space, dreamy artistic look. `,
    universal: `Studio Ghibli style with soft pastel tones, natural elements like clouds, trees, flowers, landscapes, whimsical and dreamy atmosphere, balanced composition with warm mood, clean professional appearance. `
  };

  // Определяем стиль
  const styleKey = style === 'энергичный' || style === 'joyful' ? 'joyful' :
                  style === 'нежный' || style === 'gentle' ? 'gentle' : 
                  'universal';
  
  // Требования к тексту на открытке
  const textRequirements = `The postcard must include the text "${caption}" prominently displayed and clearly readable. `;
  
  // Композиционные требования
  const compositionRequirements = `The design should be centered, leave space for the text, and maintain good visual balance. `;
  
  // Технические требования  
  const technicalRequirements = `High quality illustration, professional postcard design, suitable for printing, vibrant but not overwhelming colors. `;

  return basePrompt + styleModifiers[styleKey] + textRequirements + imageDescription + '. ' + compositionRequirements + technicalRequirements;
}
