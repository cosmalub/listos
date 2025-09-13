import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";


const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
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
            duration_seconds: 90
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`ElevenLabs API error for variant ${i + 1}:`, response.status, errorText);
          continue; // Skip this variant if it fails
        }

        const audioBuffer = await response.arrayBuffer();
        const bufferSizeKB = audioBuffer.byteLength / 1024;
        console.log(`🎵 Received audio buffer for variant ${i + 1}: ${bufferSizeKB.toFixed(2)} KB`);
        
        // Convert to base64 safely (chunked)
        const base64Audio = arrayBufferToBase64(audioBuffer);
        const base64SizeKB = base64Audio.length / 1024;
        console.log(`🎵 Base64 encoded size for variant ${i + 1}: ${base64SizeKB.toFixed(2)} KB`);
        
        const audioUrl = `data:audio/mpeg;base64,${base64Audio}`;

        variants.push({
          id: `variant-${i + 1}`,
          title: prompt.title,
          description: prompt.description,
          audioUrl: audioUrl,
          duration: 90,
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

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000; // 32KB chunks to avoid stack overflow
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
}

function detectLanguage(lyrics: string): string {
  const ukrainianMarkers = ['і', 'ї', 'є', 'ґ', 'тобі', 'мій', 'твій', 'щастя', 'доля', 'хай'];
  const russianMarkers = ['ы', 'ъ', 'тебе', 'мой', 'твой', 'что', 'это', 'счастье', 'судьба'];
  
  let ukrainianScore = 0;
  let russianScore = 0;
  
  const lowerLyrics = lyrics.toLowerCase();
  
  ukrainianMarkers.forEach(marker => {
    if (lowerLyrics.includes(marker)) ukrainianScore++;
  });
  
  russianMarkers.forEach(marker => {
    if (lowerLyrics.includes(marker)) russianScore++;
  });
  
  if (ukrainianScore > russianScore) return 'Ukrainian';
  if (russianScore > ukrainianScore) return 'Russian';
  return 'English'; // fallback
}

function analyzeLyrics(lyrics: string) {
  const lowerLyrics = lyrics.toLowerCase();
  const detectedLanguage = detectLanguage(lyrics);
  
  // Multi-language mood analysis
  const positiveWords = [
    // English
    'love', 'happy', 'joy', 'beautiful', 'amazing', 'wonderful', 'bright', 'sunshine', 'smile', 'laugh',
    // Ukrainian
    'радість', 'щастя', 'любов', 'красиво', 'дивовижно', 'чудово', 'яскраво', 'сонце', 'посмішка', 'сміх',
    // Russian
    'радость', 'счастье', 'любовь', 'красиво', 'удивительно', 'чудесно', 'ярко', 'солнце', 'улыбка', 'смех'
  ];
  
  const negativeWords = [
    // English
    'sad', 'cry', 'pain', 'hurt', 'broken', 'lonely', 'dark', 'shadow', 'tears', 'goodbye',
    // Ukrainian
    'сумний', 'плач', 'біль', 'боляче', 'зламаний', 'самотній', 'темний', 'тінь', 'сльози', 'прощавай',
    // Russian
    'грустный', 'плач', 'боль', 'больно', 'сломанный', 'одинокий', 'тёмный', 'тень', 'слёзы', 'прощай'
  ];
  
  const energeticWords = [
    // English
    'dance', 'party', 'rock', 'wild', 'crazy', 'fast', 'run', 'jump', 'exciting', 'energy',
    // Ukrainian
    'танець', 'вечірка', 'рок', 'дикий', 'божевільний', 'швидко', 'біг', 'стрибок', 'захоплюючий', 'енергія',
    // Russian
    'танец', 'вечеринка', 'рок', 'дикий', 'безумный', 'быстро', 'бег', 'прыжок', 'захватывающий', 'энергия'
  ];
  
  const calmWords = [
    // English
    'quiet', 'peace', 'calm', 'soft', 'gentle', 'whisper', 'silent', 'still', 'breathe', 'slow',
    // Ukrainian
    'тихий', 'мир', 'спокій', 'м\'який', 'ніжний', 'шепіт', 'мовчазний', 'нерухомий', 'дихати', 'повільно',
    // Russian
    'тихий', 'мир', 'спокойствие', 'мягкий', 'нежный', 'шёпот', 'молчаливый', 'неподвижный', 'дышать', 'медленно'
  ];

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

  return { mood, energy, language: detectedLanguage, lyricsLength: lyrics.length };
}

function generateMusicPrompts(lyrics: string, analysis: any, userStyle?: string, userFeedback?: string) {
  const { mood, energy, language } = analysis;
  
  // Get lyrics for inclusion in prompts - use more content for better results
  const lyricsLines = lyrics.split('\n').filter(line => line.trim().length > 0);
  const firstLines = lyricsLines.slice(0, 4).join(' ').substring(0, 200);
  const fullLyricsForPrompt = lyrics.substring(0, 300); // More context for better generation
  const languageLabel = language === 'Ukrainian' ? 'Ukrainian' : language === 'Russian' ? 'Russian' : 'English';
  
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
    text: `${baseGenre} instrumental track in ${languageLabel} style, ${energy} energy, ${mood} mood, catchy melody with modern production, duration 90 seconds${promptEnhancement}`,
    title: `${capitalizeFirst(baseGenre)} Instrumental`,
    description: `Инструментальная версия в стиле ${baseGenre}`,
    style: `${baseGenre} instrumental`
  };

  // Variant 2: Vocal version with actual lyrics - IMPROVED
  const vocalPrompt = {
    text: `${baseGenre} song in ${languageLabel} language. Vocals must sing exactly these lyrics verbatim: "${fullLyricsForPrompt}". ${energy} energy, ${mood} emotional tone. Structure: Intro (instrumental 5 seconds), Verse (vocals singing the provided lyrics clearly), Chorus (vocals repeating key phrases from lyrics), Bridge (instrumental), Outro. Clear vocal delivery with perfect pronunciation, radio-ready production, duration 90 seconds${promptEnhancement}`,
    title: `${capitalizeFirst(baseGenre)} с вокалом`,
    description: `Версия с вокалом в стиле ${baseGenre} на ${languageLabel.toLowerCase()} языке`,
    style: `${baseGenre} vocal`
  };

  prompts.push(instrumentalPrompt, vocalPrompt);

  return prompts;
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}