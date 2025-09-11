import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MusicGenerationRequest {
  lyrics: string;
  style?: string;
  userFeedback?: string;
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
    const { lyrics, style, userFeedback }: MusicGenerationRequest = await req.json();
    
    console.log('Generating music for lyrics:', lyrics.substring(0, 100) + '...');
    
    const elevenlabsApiKey = Deno.env.get('ELEVENLABS_API_KEY');
    if (!elevenlabsApiKey) {
      throw new Error('ElevenLabs API key not configured');
    }

    // Initialize Supabase client for storing requests
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Analyze lyrics to determine mood, tempo, and style
    const moodAnalysis = analyzeLyrics(lyrics);
    
    // Generate two different prompts for variety
    const prompts = generateMusicPrompts(lyrics, moodAnalysis, style, userFeedback);
    
    const variants: MusicVariant[] = [];
    
    // Generate music for each prompt
    for (let i = 0; i < prompts.length; i++) {
      const prompt = prompts[i];
      console.log(`Generating variant ${i + 1} with prompt:`, prompt.text);
      
      try {
        const response = await fetch('https://api.elevenlabs.io/v1/music', {
          method: 'POST',
          headers: {
            'xi-api-key': elevenlabsApiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: prompt.text,
            duration_seconds: 30
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`ElevenLabs API error for variant ${i + 1}:`, errorText);
          continue; // Skip this variant if it fails
        }

        const audioBuffer = await response.arrayBuffer();
        const base64Audio = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));
        const audioUrl = `data:audio/mp3;base64,${base64Audio}`;

        variants.push({
          id: `variant-${i + 1}`,
          title: prompt.title,
          description: prompt.description,
          audioUrl: audioUrl,
          duration: 30,
          style: prompt.style
        });
        
        console.log(`Successfully generated variant ${i + 1}: ${prompt.title}`);
      } catch (error) {
        console.error(`Error generating variant ${i + 1}:`, error);
      }
    }

    if (variants.length === 0) {
      throw new Error('Failed to generate any music variants');
    }

    // Store request in database
    await supabase
      .from('music_requests')
      .insert({
        lyrics,
        style,
        user_feedback: userFeedback,
        generated_variants: variants
      });

    console.log(`Successfully generated ${variants.length} music variants`);
    
    return new Response(JSON.stringify({ 
      success: true, 
      variants,
      message: `Generated ${variants.length} music variants successfully`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-music function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message,
      variants: [] 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function analyzeLyrics(lyrics: string) {
  const lowerLyrics = lyrics.toLowerCase();
  
  // Simple mood analysis based on keywords
  const positiveWords = ['love', 'happy', 'joy', 'beautiful', 'amazing', 'wonderful', 'bright', 'sunshine', 'smile', 'laugh'];
  const negativeWords = ['sad', 'cry', 'pain', 'hurt', 'broken', 'lonely', 'dark', 'shadow', 'tears', 'goodbye'];
  const energeticWords = ['dance', 'party', 'rock', 'wild', 'crazy', 'fast', 'run', 'jump', 'exciting', 'energy'];
  const calmWords = ['quiet', 'peace', 'calm', 'soft', 'gentle', 'whisper', 'silent', 'still', 'breathe', 'slow'];

  const positiveScore = positiveWords.filter(word => lowerLyrics.includes(word)).length;
  const negativeScore = negativeWords.filter(word => lowerLyrics.includes(word)).length;
  const energeticScore = energeticWords.filter(word => lowerLyrics.includes(word)).length;
  const calmScore = calmWords.filter(word => lowerLyrics.includes(word)).length;

  let mood = 'neutral';
  let energy = 'medium';

  if (positiveScore > negativeScore) {
    mood = 'positive';
  } else if (negativeScore > positiveScore) {
    mood = 'melancholic';
  }

  if (energeticScore > calmScore) {
    energy = 'high';
  } else if (calmScore > energeticScore) {
    energy = 'low';
  }

  return { mood, energy, lyricsLength: lyrics.length };
}

function generateMusicPrompts(lyrics: string, analysis: any, userStyle?: string, userFeedback?: string) {
  const { mood, energy } = analysis;
  
  // Base style determination
  let baseGenre = 'pop';
  if (userStyle) {
    baseGenre = userStyle;
  } else {
    // Auto-detect genre based on analysis
    if (mood === 'melancholic' && energy === 'low') {
      baseGenre = 'ballad';
    } else if (mood === 'positive' && energy === 'high') {
      baseGenre = 'upbeat pop';
    } else if (energy === 'high') {
      baseGenre = 'rock';
    }
  }

  // Enhance prompts based on user feedback
  let promptEnhancement = '';
  if (userFeedback) {
    if (userFeedback.includes('faster') || userFeedback.includes('энергичнее') || userFeedback.includes('швидш')) {
      promptEnhancement += ', upbeat and energetic';
    }
    if (userFeedback.includes('slower') || userFeedback.includes('медленнее') || userFeedback.includes('повільн')) {
      promptEnhancement += ', slow and contemplative';
    }
    if (userFeedback.includes('rock') || userFeedback.includes('рок')) {
      promptEnhancement += ', rock style with electric guitars';
    }
    if (userFeedback.includes('classical') || userFeedback.includes('классическ') || userFeedback.includes('класичн')) {
      promptEnhancement += ', orchestral arrangement';
    }
  }

  const prompts = [];

  // Variant 1: Instrumental version
  const instrumentalPrompt = {
    text: `${baseGenre} instrumental track, ${energy} energy, ${mood} mood, catchy melody with modern production${promptEnhancement}`,
    title: `${capitalizeFirst(baseGenre)} Instrumental`,
    description: `Инструментальная версия в стиле ${baseGenre}`,
    style: `${baseGenre} instrumental`
  };

  // Variant 2: Vocal version
  const vocalPrompt = {
    text: `${baseGenre} song with vocals, ${energy} energy, ${mood} emotional tone, radio-ready production with memorable hook${promptEnhancement}`,
    title: `${capitalizeFirst(baseGenre)} с вокалом`,
    description: `Версия с вокалом в стиле ${baseGenre}`,
    style: `${baseGenre} vocal`
  };

  prompts.push(instrumentalPrompt, vocalPrompt);

  return prompts;
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}