import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { caption, imageDescription, style } = await req.json();
    console.log('Create postcard task called with:', { 
      caption, 
      imageDescription: imageDescription?.substring(0, 100),
      style
    });

    if (!caption || !imageDescription) {
      throw new Error('Caption and imageDescription are required');
    }

    const KIE_API_KEY = Deno.env.get('KIE_API_KEY');
    if (!KIE_API_KEY) {
      throw new Error('KIE_API_KEY is not configured');
    }

    const prompt = createPostcardPrompt(caption, imageDescription, style || 'universal');
    console.log('Generated postcard prompt:', prompt.substring(0, 500));

    const taskId = await createImageTask(prompt, KIE_API_KEY);
    console.log('Task created with ID:', taskId);

    return new Response(
      JSON.stringify({ taskId, prompt }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error) {
    console.error('Error in create-postcard-task function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});

async function createImageTask(prompt: string, apiKey: string): Promise<string> {
  console.log('Creating image generation task with Kie.ai API...');
  
  const response = await fetch('https://api.kie.ai/api/v1/jobs/createTask', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'nano-banana-pro',
      input: {
        prompt: prompt,
        aspect_ratio: '2:3',
        resolution: '2K',
        output_format: 'png'
      }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Kie.ai API error:', response.status, errorText);
    throw new Error(`Failed to create image task: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  console.log('Kie.ai API response:', JSON.stringify(data, null, 2));
  
  const taskId = data?.data?.taskId;
  
  if (!taskId) {
    console.error('No taskId found in response. Full response:', JSON.stringify(data, null, 2));
    throw new Error('No taskId received from Kie.ai API');
  }

  return taskId;
}

function createPostcardPrompt(caption: string, imageDescription: string, style: string): string {
  // Style-specific watercolor techniques
  const styleConfig: Record<string, { palette: string; mood: string }> = {
    joyful: {
      palette: 'vibrant warm colors — coral, golden yellow, turquoise accents',
      mood: 'energetic, celebratory, full of light'
    },
    gentle: {
      palette: 'soft pastels — blush pink, lavender, peach, mint',
      mood: 'tender, dreamy, intimate'
    },
    universal: {
      palette: 'warm earth tones with soft greens and gentle blues',
      mood: 'nostalgic, warm, peaceful'
    }
  };

  const config = styleConfig[style] || styleConfig.universal;

  return `ІЛЮСТРАЦІЯ ДЛЯ ЛИСТІВКИ

${imageDescription}

────────────────────────
СТИЛЬ
────────────────────────
– full-bleed акварельна ілюстрація
– м'які краї з розчиненням фарби (художній ефект, не рамка)
– поетична, емоційна сцена
– персонажі символічні (силуети, світло, рух)
– настрій: ${config.mood}
– палітра: ${config.palette}

────────────────────────
ТЕКСТ НА ЛИСТІВЦІ
────────────────────────
"${caption}"
– елегантний декоративний або рукописний шрифт
– контрастний, чітко читабельний
– центральне або виділене розміщення
– текст є частиною композиції, не накладений зверху

────────────────────────
ФОРМАТ
────────────────────────
– вертикальний A6 (2:3 aspect ratio)
– 2D ілюстрація, без 3D ефектів
– готовий до друку
– NO photorealism, NO stock imagery`;
}
