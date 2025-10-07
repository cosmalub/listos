import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MusicGenerationRequest {
  lyrics: string;
  style?: string;
  userFeedback?: string;
  model?: 'V3_5' | 'V4' | 'V4_5' | 'V4_5PLUS';
}

interface MusicVariant {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: number;
  style: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lyrics, style, userFeedback, model = 'V4' }: MusicGenerationRequest = await req.json();
    const SUNO_API_KEY = Deno.env.get('SUNO_API_KEY');

    if (!SUNO_API_KEY) {
      throw new Error('SUNO_API_KEY is not configured');
    }

    console.log('Starting Suno music generation with lyrics:', lyrics.substring(0, 100) + '...');
    console.log('Model:', model, 'Style:', style || 'auto-detect');

    // Analyze lyrics for style and language
    const analysis = analyzeLyrics(lyrics);
    const detectedLanguage = analysis.language;
    
    console.log('Detected language:', detectedLanguage);

    // Generate music prompt
    const prompt = userFeedback || `${lyrics}`;
    const musicStyle = style || generateStyleFromAnalysis(analysis);

    console.log('Generated style:', musicStyle);

    // Step 1: Generate music via Suno API
    const generateResponse = await fetch('https://api.kie.ai/api/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUNO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        customMode: true,
        instrumental: false,
        model: model,
        style: musicStyle,
        title: extractTitle(lyrics) || 'Generated Song',
        callBackUrl: '', // Not using callbacks for now
      }),
    });

    if (!generateResponse.ok) {
      const errorText = await generateResponse.text();
      console.error('Suno generate error:', errorText);
      throw new Error(`Suno generation failed: ${errorText}`);
    }

    const generateResult = await generateResponse.json();
    
    if (generateResult.code !== 200) {
      throw new Error(`Suno error: ${generateResult.msg || 'Unknown error'}`);
    }

    const taskId = generateResult.data.taskId;
    console.log('Suno task created:', taskId);

    // Step 2: Poll for completion
    const maxAttempts = 60; // 5 minutes max (5s intervals)
    let attempts = 0;
    let taskResult = null;

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      
      const statusResponse = await fetch(`https://api.kie.ai/api/v1/generate/record-info?taskId=${taskId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${SUNO_API_KEY}`,
        },
      });

      if (!statusResponse.ok) {
        console.error('Status check failed:', await statusResponse.text());
        attempts++;
        continue;
      }

      const statusResult = await statusResponse.json();
      
      if (statusResult.code !== 200) {
        console.error('Status error:', statusResult.msg);
        attempts++;
        continue;
      }

      const status = statusResult.data.status;
      console.log(`Task status (attempt ${attempts + 1}):`, status);

      if (status === 'SUCCESS' || status === 'FIRST_SUCCESS') {
        taskResult = statusResult.data;
        break;
      } else if (status === 'CREATE_TASK_FAILED' || status === 'GENERATE_AUDIO_FAILED' || 
                 status === 'SENSITIVE_WORD_ERROR') {
        throw new Error(statusResult.data.errorMessage || `Generation failed with status: ${status}`);
      }

      attempts++;
    }

    if (!taskResult) {
      throw new Error('Music generation timeout - task did not complete in time');
    }

    // Step 3: Format response
    const sunoData = taskResult.response.sunoData || [];
    
    if (sunoData.length === 0) {
      throw new Error('No music tracks were generated');
    }

    const variants: MusicVariant[] = sunoData.map((track: any, index: number) => ({
      id: track.id,
      title: track.title || `Generated Song ${index + 1}`,
      description: `Style: ${track.tags || musicStyle}`,
      audioUrl: track.audioUrl,
      duration: track.duration || 0,
      style: track.tags || musicStyle,
    }));

    console.log(`Successfully generated ${variants.length} Suno music variant(s)`);

    return new Response(
      JSON.stringify({
        success: true,
        variants: variants,
        taskId: taskId,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Suno music generation error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

// Helper functions
function detectLanguage(lyrics: string): string {
  const ukrainianMarkers = ['щ', 'є', 'ї', 'і', 'ґ', 'й'];
  const russianMarkers = ['ё', 'ъ', 'ы', 'э'];
  
  for (const marker of ukrainianMarkers) {
    if (lyrics.toLowerCase().includes(marker)) {
      return 'Ukrainian';
    }
  }
  
  for (const marker of russianMarkers) {
    if (lyrics.toLowerCase().includes(marker)) {
      return 'Russian';
    }
  }
  
  return 'English';
}

function analyzeLyrics(lyrics: string) {
  const language = detectLanguage(lyrics);
  
  // Detect mood
  const positiveWords = ['happy', 'joy', 'love', 'celebrate', 'smile', 'радість', 'щастя', 'кохання', 'святкуй'];
  const melancholicWords = ['sad', 'cry', 'lonely', 'miss', 'сумно', 'плач', 'самотній'];
  
  const lowerLyrics = lyrics.toLowerCase();
  const hasPositive = positiveWords.some(word => lowerLyrics.includes(word));
  const hasMelancholic = melancholicWords.some(word => lowerLyrics.includes(word));
  
  let mood = 'neutral';
  if (hasPositive && !hasMelancholic) mood = 'positive';
  else if (hasMelancholic && !hasPositive) mood = 'melancholic';
  
  return {
    language,
    mood,
  };
}

function generateStyleFromAnalysis(analysis: any): string {
  const styles = [];
  
  // Add genre based on mood
  if (analysis.mood === 'positive') {
    styles.push('Pop', 'Upbeat', 'Energetic');
  } else if (analysis.mood === 'melancholic') {
    styles.push('Ballad', 'Emotional', 'Slow');
  } else {
    styles.push('Contemporary', 'Melodic');
  }
  
  return styles.join(', ');
}

function extractTitle(lyrics: string): string | null {
  const lines = lyrics.trim().split('\n');
  const firstLine = lines[0].trim();
  
  // Remove quotes if present
  const titleMatch = firstLine.match(/^["'](.+)["']$/);
  if (titleMatch) {
    return titleMatch[1];
  }
  
  // Return first line if it's short enough
  if (firstLine.length <= 50 && firstLine.length > 0) {
    return firstLine;
  }
  
  return null;
}
