import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const kieApiKey = Deno.env.get('KIE_API_KEY');

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

    if (!kieApiKey) {
      console.error('KIE API key not configured');
      throw new Error('KIE API key not configured');
    }

    // Create postcard prompt
    const postcardPrompt = createPostcardPrompt(caption, imageDescription, style);
    
    console.log('Generated postcard prompt:', postcardPrompt.substring(0, 200));
    console.log('Creating image generation task with Kie.ai API...');

    // Step 1: Create task
    const taskId = await createImageTask(postcardPrompt);
    console.log('Task created with ID:', taskId);

    // Step 2: Poll for results
    console.log('Polling for task completion...');
    const imageUrl = await pollTaskResult(taskId);
    console.log('Image generated successfully:', imageUrl);

    // Step 3: Convert to base64
    console.log('Converting image to base64...');
    const dataUrl = await fetchImageAsBase64(imageUrl);

    return new Response(JSON.stringify({ 
      imageUrl: dataUrl,
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

async function createImageTask(prompt: string): Promise<string> {
  const response = await fetch('https://api.kie.ai/api/v1/jobs/createTask', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${kieApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'nano-banana-pro',
      input: {
        prompt: prompt,
        aspect_ratio: '2:3',    // Portrait format for A6 postcard
        resolution: '2K',        // Medium resolution
        output_format: 'png'
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('Kie.ai API error:', response.status, errorData);
    throw new Error(`Kie.ai API error: ${response.status}`);
  }

  const data = await response.json();
  
  if (!data.data || !data.data.taskId) {
    console.error('Invalid response structure from Kie.ai:', data);
    throw new Error('Invalid response from Kie.ai API - no taskId found');
  }

  return data.data.taskId;
}

async function pollTaskResult(taskId: string, maxAttempts = 30): Promise<string> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log(`Polling attempt ${attempt}/${maxAttempts}...`);
    
    const response = await fetch(
      `https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`,
      {
        headers: {
          'Authorization': `Bearer ${kieApiKey}`
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Error polling task status:', response.status, errorData);
      throw new Error(`Failed to poll task status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Task state:', data.data.state);

    if (data.data.state === 'success') {
      const result = JSON.parse(data.data.resultJson);
      if (!result.resultUrls || !result.resultUrls[0]) {
        throw new Error('No result URLs in successful response');
      }
      return result.resultUrls[0];
    }

    if (data.data.state === 'fail') {
      const failMsg = data.data.failMsg || 'Unknown error';
      console.error('Task failed:', failMsg);
      throw new Error(`Image generation failed: ${failMsg}`);
    }

    // Wait 2 seconds before next poll
    if (attempt < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  throw new Error('Task timeout: image generation took too long');
}

async function fetchImageAsBase64(url: string): Promise<string> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const base64 = btoa(String.fromCharCode(...bytes));
  
  return `data:image/png;base64,${base64}`;
}

function createPostcardPrompt(caption: string, imageDescription: string, style: string): string {
  // Base settings for A6 postcard
  const basePrompt = `Create a beautiful postcard design in A6 format (105x148mm, vertical orientation). `;
  
  // Style modifiers - all styles must fill entire canvas edge-to-edge
  const styleModifiers = {
    joyful: `Bright, energetic, festive style with vivid colors, simple flat 2D graphics, cartoonish elements, celebration motifs like confetti or stars. The illustration MUST fill the entire canvas edge-to-edge with NO white borders or fading edges. `,
    gentle: `Soft watercolor style with delicate brush strokes, pastel and muted color palette, dreamy artistic look. The illustration MUST fill the entire canvas edge-to-edge with NO white borders, NO fading edges, NO color bleeding at margins. `,
    universal: `Studio Ghibli style with soft pastel tones, natural elements like clouds, trees, flowers, landscapes, whimsical and dreamy atmosphere, balanced composition with warm mood. The illustration MUST fill the entire canvas edge-to-edge with NO white borders or blank margins. `
  };

  // Determine style
  const styleKey = style === 'энергичный' || style === 'joyful' ? 'joyful' :
                  style === 'нежный' || style === 'gentle' ? 'gentle' : 
                  'universal';
  
  // Text requirements
  const textRequirements = `The postcard must include the text "${caption}" prominently displayed and clearly readable. `;
  
  // Composition requirements
  const compositionRequirements = `The design should be centered, leave space for the text, and maintain good visual balance. `;
  
  // Technical requirements  
  const technicalRequirements = `High quality illustration, professional postcard design, suitable for printing. CRITICAL: The artwork MUST completely fill all four edges of the canvas - no white margins, no fading borders, no blank spaces at any edge. `;

  return basePrompt + styleModifiers[styleKey] + textRequirements + imageDescription + '. ' + compositionRequirements + technicalRequirements;
}