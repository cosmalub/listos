import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Style elements library for variety
const STYLE_ELEMENTS = {
  joyful: {
    decorations: [
      'colorful confetti and streamers',
      'shiny party balloons',
      'golden stars and sparkles',
      'festive ribbons and bows',
      'fireworks bursts',
      'glitter effects'
    ],
    subjects: [
      'cute cartoon cat celebrating',
      'happy dancing bunny',
      'cheerful little bird with party hat',
      'adorable hedgehog with gift',
      'playful puppy with balloons',
      'smiling bear with cake'
    ],
    backgrounds: [
      'vibrant gradient from yellow to coral',
      'rainbow burst pattern',
      'sunny sky with fluffy clouds',
      'party pattern with dots and stars',
      'warm sunset gradient'
    ],
    techniques: [
      'Bold pop-art style with thick outlines',
      'Vibrant flat 2D illustration',
      'Playful cartoon aesthetic',
      'Clean vector-style graphics'
    ]
  },
  gentle: {
    decorations: [
      'delicate flower petals floating',
      'soft butterflies',
      'gentle feathers',
      'small hearts',
      'tender leaves and branches',
      'soft clouds'
    ],
    subjects: [
      'elegant roses bouquet',
      'soft peonies arrangement',
      'delicate cherry blossoms branch',
      'gentle tulips',
      'romantic lavender field',
      'tender wildflowers'
    ],
    backgrounds: [
      'soft watercolor wash in pastels',
      'misty morning atmosphere',
      'dreamy clouds gradient',
      'gentle pink to lavender blend',
      'soft peach sunrise'
    ],
    techniques: [
      'Delicate watercolor technique with soft edges',
      'Dreamy ethereal style',
      'Soft pastel illustration',
      'Romantic hand-painted aesthetic'
    ]
  },
  universal: {
    decorations: [
      'gentle leaves and vines',
      'soft clouds',
      'small birds in flight',
      'delicate stars',
      'nature elements',
      'warm light rays'
    ],
    subjects: [
      'cozy cottage in meadow',
      'peaceful garden path',
      'gentle hills at golden hour',
      'serene forest clearing',
      'warm countryside scene',
      'magical tree with soft lights'
    ],
    backgrounds: [
      'Studio Ghibli sky with fluffy clouds',
      'warm countryside sunset',
      'peaceful meadow gradient',
      'soft morning mist',
      'golden hour lighting'
    ],
    techniques: [
      'Studio Ghibli inspired illustration',
      'Warm nostalgic anime style',
      'Soft hand-painted aesthetic',
      'Whimsical storybook illustration'
    ]
  }
};

// Song imagery interface
interface SongImagery {
  directImages?: string[];
  metaphors?: string[];
  colorMood?: string;
  atmosphere?: string;
  timeContext?: string;
  personalObjects?: string[];
  relationship?: string;
  emotionalCore?: string;
}

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { caption, imageDescription, style, userContext, songImagery } = await req.json();
    console.log('Create postcard task called with:', { 
      caption, 
      imageDescription: imageDescription?.substring(0, 100),
      style,
      hasUserContext: !!userContext,
      hasSongImagery: !!songImagery
    });

    if (!caption || !imageDescription) {
      throw new Error('Caption and imageDescription are required');
    }

    const KIE_API_KEY = Deno.env.get('KIE_API_KEY');
    if (!KIE_API_KEY) {
      throw new Error('KIE_API_KEY is not configured');
    }

    const prompt = createPersonalizedPrompt(caption, imageDescription, style || 'universal', userContext, songImagery);
    console.log('Generated personalized prompt:', prompt.substring(0, 500));

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

function createPersonalizedPrompt(
  caption: string, 
  imageDescription: string, 
  style: string,
  userContext?: any,
  songImagery?: SongImagery
): string {
  const styleKey = style as keyof typeof STYLE_ELEMENTS;
  const elements = STYLE_ELEMENTS[styleKey] || STYLE_ELEMENTS.universal;
  
  // Get random elements for variety
  const randomDecoration = getRandomElement(elements.decorations);
  const randomBackground = getRandomElement(elements.backgrounds);
  const randomTechnique = getRandomElement(elements.techniques);

  // Build song imagery section
  let songImagesSection = '';
  if (songImagery) {
    const imageryParts: string[] = [];
    
    if (songImagery.directImages?.length > 0) {
      imageryParts.push(`IMAGES FROM SONG (MUST USE): ${songImagery.directImages.slice(0, 5).join(', ')}`);
    }
    if (songImagery.metaphors?.length > 0) {
      imageryParts.push(`METAPHORS TO VISUALIZE: ${songImagery.metaphors.slice(0, 3).join(', ')}`);
    }
    if (songImagery.colorMood) {
      imageryParts.push(`COLOR MOOD FROM SONG: ${songImagery.colorMood}`);
    }
    if (songImagery.atmosphere) {
      imageryParts.push(`ATMOSPHERE: ${songImagery.atmosphere}`);
    }
    if (songImagery.timeContext) {
      imageryParts.push(`TIME/SEASON CONTEXT: ${songImagery.timeContext}`);
    }
    if (songImagery.personalObjects?.length > 0) {
      imageryParts.push(`PERSONAL OBJECTS TO INCLUDE: ${songImagery.personalObjects.slice(0, 3).join(', ')}`);
    }
    if (songImagery.emotionalCore) {
      imageryParts.push(`EMOTIONAL CORE: ${songImagery.emotionalCore}`);
    }
    
    if (imageryParts.length > 0) {
      songImagesSection = `\n\nSONG-BASED PERSONALIZATION (CRITICAL - USE THESE ELEMENTS!):\n${imageryParts.join('\n')}`;
    }
  }
  
  // Build style-specific prompt
  const stylePrompts = {
    joyful: `Create a vibrant, celebratory greeting card illustration.

ARTISTIC STYLE:
${randomTechnique}
- Bright, saturated colors with high contrast
- Simple, clear shapes with bold outlines
- Flat color areas with minimal shading
- Energetic and joyful mood
- Modern festive aesthetic

VISUAL ELEMENTS:
- Main theme: ${imageDescription}
- Decorations: ${randomDecoration}
- Background: ${randomBackground}
- Color palette: ${songImagery?.colorMood || 'Warm yellows, coral pinks, turquoise, vibrant orange'}`,

    gentle: `Create a delicate, tender greeting card illustration.

ARTISTIC STYLE:
${randomTechnique}
- Soft, flowing brushstrokes with organic textures
- Transparent color layers with subtle gradients
- Light, airy composition with white space
- Pastel and muted color palette
- Romantic and dreamy atmosphere

VISUAL ELEMENTS:
- Main theme: ${imageDescription}
- Decorations: ${randomDecoration}
- Background: ${randomBackground}
- Color palette: ${songImagery?.colorMood || 'Soft pinks, lavender, peach, mint green'}`,

    universal: `Create an elegant greeting card in Studio Ghibli style.

ARTISTIC STYLE:
${randomTechnique}
- Soft, muted color palette with earthy pastels
- Clean, gentle outlines with moderate line weight
- Flat colors with minimal gradients
- Natural elements and whimsical atmosphere
- Warm, inviting mood

VISUAL ELEMENTS:
- Main theme: ${imageDescription}
- Decorations: ${randomDecoration}
- Background: ${randomBackground}
- Color palette: ${songImagery?.colorMood || 'Warm earth tones, soft greens, gentle blues, cream'}`
  };

  const baseStylePrompt = stylePrompts[styleKey] || stylePrompts.universal;

  // Personalization based on user context
  let personalizationSection = '';
  if (userContext) {
    const personalDetails: string[] = [];
    
    if (userContext.recipient?.relationship) {
      personalDetails.push(`- This is for: ${userContext.recipient.relationship}`);
    }
    if (userContext.occasion) {
      personalDetails.push(`- Occasion: ${userContext.occasion}`);
    }
    if (userContext.recipient?.name) {
      personalDetails.push(`- Recipient: ${userContext.recipient.name}`);
    }
    
    if (personalDetails.length > 0) {
      personalizationSection = `\n\nPERSONALIZATION:\n${personalDetails.join('\n')}`;
    }
  }

  // Text requirements - critical for Kie.ai
  const textRequirements = `

TEXT ON POSTCARD (CRITICAL):
The postcard MUST prominently display this text: "${caption}"

Typography requirements:
- Font: Elegant, highly readable decorative or script font
- Size: Large enough to be the focal point
- Contrast: Strong contrast against background (white on dark OR dark on light)
- Position: Centered or prominent placement, NOT hidden in decorations
- Style: Match the overall artistic style of the illustration
- The text should be clearly legible and beautiful`;

  // Technical specifications
  const technicalSpecs = `

TECHNICAL REQUIREMENTS:
- Format: Vertical A6 postcard (portrait orientation, 2:3 aspect ratio)
- Resolution: High quality 2K for printing
- Style: 2D flat illustration, NO 3D effects, NO photorealism
- Composition: Leave clear space for text, avoid cluttered design
- Quality: Print-ready, vibrant but not oversaturated colors`;

  return `${baseStylePrompt}${songImagesSection}${personalizationSection}${textRequirements}${technicalSpecs}`;
}
