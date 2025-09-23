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
    
    // Check if we're in test mode
    const testMode = Deno.env.get('TEST_MODE') === 'true';
    console.log('Test mode:', testMode);
    
    console.log('Generating music for lyrics (full length):', lyrics.length, 'characters');
    console.log('Full lyrics text:', lyrics);
    
    const elevenlabsApiKey = Deno.env.get('ELEVENLABS_API_KEY');
    if (!elevenlabsApiKey) {
      throw new Error('ElevenLabs API key not configured');
    }

    // Analyze lyrics to determine mood, tempo, and style
    const moodAnalysis = analyzeLyrics(lyrics);
    
    // Generate prompts based on test mode
    const prompts = generateMusicPrompts(lyrics, moodAnalysis, style, userFeedback, testMode);
    
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
            duration_seconds: testMode ? 60 : 90
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
          duration: testMode ? 60 : 90,
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

function detectVocalGender(lyrics: string): 'male' | 'female' | 'unspecified' {
  const lowerLyrics = lyrics.toLowerCase();
  
  // Direct indicators
  const maleIndicators = [
    // English
    'i\'m a man', 'i\'m a guy', 'i\'m a boy', 'from a man', 'guy to',
    // Ukrainian
    'я чоловік', 'я хлопець', 'я парубок', 'від хлопця', 'від чоловіка', 'я пішов', 'я сказав', 'я зробив',
    // Russian
    'я мужчина', 'я парень', 'я мальчик', 'от парня', 'от мужчины', 'я пошёл', 'я сказал', 'я сделал'
  ];
  
  const femaleIndicators = [
    // English
    'i\'m a woman', 'i\'m a girl', 'from a woman', 'girl to',
    // Ukrainian
    'я жінка', 'я дівчина', 'я дівчинка', 'від дівчини', 'від жінки', 'я пішла', 'я сказала', 'я зробила',
    // Russian
    'я женщина', 'я девушка', 'я девочка', 'от девушки', 'от женщины', 'я пошла', 'я сказала', 'я сделала'
  ];
  
  // Context indicators
  const maleContextWords = [
    // English
    'my girlfriend', 'my wife', 'she is', 'her eyes', 'her smile',
    // Ukrainian
    'моя дівчина', 'моя дружина', 'вона є', 'її очі', 'її посмішка', 'твоя дівчина',
    // Russian
    'моя девушка', 'моя жена', 'она есть', 'её глаза', 'её улыбка', 'твоя девушка'
  ];
  
  const femaleContextWords = [
    // English
    'my boyfriend', 'my husband', 'he is', 'his eyes', 'his smile',
    // Ukrainian
    'мій хлопець', 'мій чоловік', 'він є', 'його очі', 'його посмішка', 'твій хлопець',
    // Russian
    'мой парень', 'мой муж', 'он есть', 'его глаза', 'его улыбка', 'твой парень'
  ];
  
  let maleScore = 0;
  let femaleScore = 0;
  
  // Check direct indicators (higher weight)
  maleIndicators.forEach(indicator => {
    if (lowerLyrics.includes(indicator)) maleScore += 3;
  });
  
  femaleIndicators.forEach(indicator => {
    if (lowerLyrics.includes(indicator)) femaleScore += 3;
  });
  
  // Check context indicators (lower weight)
  maleContextWords.forEach(word => {
    if (lowerLyrics.includes(word)) maleScore += 1;
  });
  
  femaleContextWords.forEach(word => {
    if (lowerLyrics.includes(word)) femaleScore += 1;
  });
  
  if (maleScore > femaleScore) return 'male';
  if (femaleScore > maleScore) return 'female';
  return 'unspecified';
}

function analyzeLyrics(lyrics: string) {
  const lowerLyrics = lyrics.toLowerCase();
  const detectedLanguage = detectLanguage(lyrics);
  const vocalGender = detectVocalGender(lyrics);
  
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

  return { mood, energy, language: detectedLanguage, vocalGender, lyricsLength: lyrics.length };
}

function generateMusicPrompts(lyrics: string, analysis: any, userStyle?: string, userFeedback?: string, testMode = false) {
  const { mood, energy, language, vocalGender } = analysis;
  
  // Full lyrics for prompt - NO TRUNCATION
  const fullLyricsForPrompt = lyrics;
  
  console.log(`Detected vocal gender: ${vocalGender}, Language: ${language}`);
  
  // Enhanced language support for clear pronunciation
  let languageLabel = 'English';
  let pronunciationInstructions = '';
  
  if (language === 'Ukrainian') {
    languageLabel = 'Ukrainian';
    pronunciationInstructions = 'Use proper Ukrainian phonetics and stress patterns. Pronounce Ukrainian letters і, ї, є, ґ correctly with clear articulation.';
  } else if (language === 'Russian') {
    languageLabel = 'Russian';
    pronunciationInstructions = 'Use proper Russian phonetics and stress patterns. Pronounce Russian soft and hard consonants correctly with clear articulation.';
  }
  
  // Simplified style determination - focus on POP with tempo variations
  let popStyle = 'pop';
  let tempoDescription = '';
  
  if (userStyle) {
    popStyle = userStyle; // Allow override if provided
  } else {
    // Auto-detect only tempo based on mood and energy for better vocal quality
    if (mood === 'melancholic' || energy === 'low') {
      popStyle = 'slow pop';
      tempoDescription = 'ballad-like slow tempo';
    } else if (mood === 'positive' && energy === 'high') {
      popStyle = 'energetic pop';
      tempoDescription = 'upbeat and energetic tempo';
    } else {
      popStyle = 'pop';
      tempoDescription = 'medium tempo';
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

  const duration = testMode ? 60 : 90;
  const prompts = [];

  // Vocal generation logic based on gender detection and mode
  if (testMode) {
    // Test mode: Generate ONE vocal variant with detected gender (or male default)
    const preferredGender = vocalGender === 'unspecified' ? 'male' : vocalGender;
    const genderLabel = preferredGender === 'male' ? 'чоловічий вокал' : 'жіночий вокал';
    
    const vocalPrompt = {
      text: `${popStyle} song in ${languageLabel} language with ${preferredGender} vocals, ${tempoDescription}. CRITICAL: The ${preferredGender} vocalist must sing exactly these lyrics word-for-word with NO improvisation, NO ad-libs, NO omissions: "${fullLyricsForPrompt}". Every single word must be sung clearly and precisely with perfect ${languageLabel} pronunciation and articulation. Do not change, skip, or mumble any words. Each syllable must be pronounced distinctly by the ${preferredGender} voice. ${pronunciationInstructions} Focus on vocal clarity and emotional delivery over complex instrumentation. ${mood} emotional tone. Structure: Intro (instrumental 3-5 seconds), Verse (${preferredGender} vocals singing the provided lyrics with crystal-clear diction), Chorus (${preferredGender} vocals repeating key phrases from lyrics with emphasis and perfect pronunciation), Bridge (vocal harmonies), Outro. Professional ${preferredGender} vocal delivery with flawless pronunciation, radio-ready production, duration ${duration} seconds${promptEnhancement}`,
      title: `${capitalizeFirst(popStyle)} (${genderLabel}) (Test)`,
      description: `Версія з ${genderLabel} у поп-стилі - тестовий режим`,
      style: `${popStyle} vocal ${preferredGender}`
    };
    prompts.push(vocalPrompt);
  } else {
    // Normal mode: Generate TWO vocal variants based on gender detection
    if (vocalGender === 'unspecified') {
      // Generate both male and female versions
      const variants = [
        { gender: 'male', label: 'чоловічий вокал' },
        { gender: 'female', label: 'жіночий вокал' }
      ];
      
      variants.forEach((variant, index) => {
        const vocalPrompt = {
          text: `${popStyle} song in ${languageLabel} language with ${variant.gender} vocals, ${tempoDescription}. CRITICAL: The ${variant.gender} vocalist must sing exactly these lyrics word-for-word with NO improvisation, NO ad-libs, NO omissions: "${fullLyricsForPrompt}". Every single word must be sung clearly and precisely with perfect ${languageLabel} pronunciation and articulation. Do not change, skip, or mumble any words. Each syllable must be pronounced distinctly by the ${variant.gender} voice. ${pronunciationInstructions} Focus on vocal clarity and emotional delivery over complex instrumentation. ${mood} emotional tone. Structure: Intro (instrumental 3-5 seconds), Verse (${variant.gender} vocals singing the provided lyrics with crystal-clear diction), Chorus (${variant.gender} vocals repeating key phrases from lyrics with emphasis and perfect pronunciation), Bridge (vocal harmonies), Outro. Professional ${variant.gender} vocal delivery with flawless pronunciation, radio-ready production, duration ${duration} seconds${promptEnhancement}`,
          title: `${capitalizeFirst(popStyle)} (${variant.label})`,
          description: `Версія з ${variant.label} у поп-стилі`,
          style: `${popStyle} vocal ${variant.gender}`
        };
        prompts.push(vocalPrompt);
      });
    } else {
      // Generate two versions with the detected gender in different styles
      const genderLabel = vocalGender === 'male' ? 'чоловічий вокал' : 'жіночий вокал';
      // Generate two pop variations with the detected gender
      const variations = [
        { variation: 'classic', label: 'класична версія' },
        { variation: 'modern', label: 'сучасна версія' }
      ];
      
      variations.forEach((styleVariant, index) => {
        const vocalPrompt = {
          text: `${popStyle} song in ${languageLabel} language with ${vocalGender} vocals, ${tempoDescription}. ${styleVariant.variation === 'modern' ? 'Modern pop arrangement with subtle electronic elements.' : 'Classic pop arrangement with traditional instruments.'} CRITICAL: The ${vocalGender} vocalist must sing exactly these lyrics word-for-word with NO improvisation, NO ad-libs, NO omissions: "${fullLyricsForPrompt}". Every single word must be sung clearly and precisely with perfect ${languageLabel} pronunciation and articulation. Do not change, skip, or mumble any words. Each syllable must be pronounced distinctly by the ${vocalGender} voice. ${pronunciationInstructions} Focus on vocal clarity and emotional delivery over complex instrumentation. ${mood} emotional tone. Structure: Intro (instrumental 3-5 seconds), Verse (${vocalGender} vocals singing the provided lyrics with crystal-clear diction), Chorus (${vocalGender} vocals repeating key phrases from lyrics with emphasis and perfect pronunciation), Bridge (vocal harmonies), Outro. Professional ${vocalGender} vocal delivery with flawless pronunciation, radio-ready production, duration ${duration} seconds${promptEnhancement}`,
          title: `${capitalizeFirst(popStyle)} (${genderLabel}, ${styleVariant.label})`,
          description: `${styleVariant.label} з ${genderLabel} у поп-стилі`,
          style: `${popStyle} vocal ${vocalGender}`
        };
        prompts.push(vocalPrompt);
      });
    }
  }

  return prompts;
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}