import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SaveMusicRequest {
  lyrics: string;
  selectedVariant: {
    id: string;
    title: string;
    description: string;
    style: string;
    duration: number;
    audioUrl?: string;
  };
  userFeedback?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lyrics, selectedVariant, userFeedback }: SaveMusicRequest = await req.json();
    
    console.log('Saving music selection:', {
      lyrics: lyrics.substring(0, 50) + '...',
      variant: selectedVariant.title,
      style: selectedVariant.style
    });

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Store selection in database
    const { data, error } = await supabase
      .from('music_requests')
      .insert({
        lyrics,
        style: selectedVariant.style,
        user_feedback: userFeedback || null,
        generated_variants: [selectedVariant]
      })
      .select('id')
      .single();

    if (error) {
      console.error('Database error:', error);
      throw new Error('Failed to save music selection');
    }

    console.log('Music selection saved successfully with ID:', data.id);
    
    return new Response(JSON.stringify({ 
      success: true, 
      id: data.id,
      message: 'Music selection saved successfully'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in save-music-selection function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});