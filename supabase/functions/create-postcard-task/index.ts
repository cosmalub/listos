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
    console.log('Create postcard task called with:', { caption, imageDescription, style });

    if (!caption || !imageDescription) {
      throw new Error('Caption and imageDescription are required');
    }

    const KIE_API_KEY = Deno.env.get('KIE_API_KEY');
    if (!KIE_API_KEY) {
      throw new Error('KIE_API_KEY is not configured');
    }

    const prompt = createPostcardPrompt(caption, imageDescription, style || 'universal');
    console.log('Generated postcard prompt:', prompt);

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
      prompt: prompt,
      aspect_ratio: '2:3',
      resolution: '2K',
      output_format: 'png'
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Kie.ai API error:', response.status, errorText);
    throw new Error(`Failed to create image task: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  console.log('Kie.ai API response:', JSON.stringify(data, null, 2));
  
  // Check both possible field names for taskId
  const taskId = data.taskId || data.task_id || data.id;
  
  if (!taskId) {
    console.error('No taskId found in response. Full response:', JSON.stringify(data, null, 2));
    throw new Error('No taskId received from Kie.ai API');
  }

  return taskId;
}

function createPostcardPrompt(caption: string, imageDescription: string, style: string): string {
  const styleModifiers = {
    joyful: 'Bright, energetic, festive style with vivid colors, simple flat 2D graphics, cartoonish elements, celebration motifs',
    gentle: 'Soft, delicate, tender style with pastel tones, simple flat 2D graphics, subtle ornaments, romantic elements',
    universal: 'Versatile, balanced style with harmonious colors, simple flat 2D graphics, clean lines, elegant compositions'
  };

  const basePrompt = `Create a beautiful postcard design in A6 format (105x148mm, vertical orientation). ${styleModifiers[style] || styleModifiers.universal}`;
  
  const textRequirement = `The postcard MUST include the text "${caption}" prominently displayed in elegant, readable typography with good contrast against the background.`;
  
  const visualDescription = `Visual content: ${imageDescription}`;
  
  const composition = `Composition: Arrange elements to leave clear space for the text, ensuring readability. Use 2D flat illustration style, avoid 3D effects or photorealism.`;
  
  const technicalSpecs = `Technical requirements: High quality 2K resolution, PNG format, suitable for printing, vibrant but not oversaturated colors, clean and professional look.`;

  return `${basePrompt}\n\n${textRequirement}\n\n${visualDescription}\n\n${composition}\n\n${technicalSpecs}`;
}
