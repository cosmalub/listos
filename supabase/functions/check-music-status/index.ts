import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
    const { taskId } = await req.json();

    if (!taskId) {
      throw new Error('Task ID is required');
    }

    const sunoApiKey = Deno.env.get('SUNO_API_KEY');
    if (!sunoApiKey) {
      throw new Error('SUNO_API_KEY is not configured');
    }

    console.log('Checking status for task:', taskId);

    // Check task status
    const statusResponse = await fetch(`https://api.aimlapi.com/suno/task/${taskId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sunoApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!statusResponse.ok) {
      const errorText = await statusResponse.text();
      console.error('Suno API error:', errorText);
      throw new Error(`Suno API error: ${statusResponse.status} ${errorText}`);
    }

    const taskResult = await statusResponse.json();
    console.log('Task status:', taskResult.status);

    // If still pending, return pending status
    if (taskResult.status === 'pending' || taskResult.status === 'processing') {
      return new Response(
        JSON.stringify({ 
          status: 'pending',
          message: 'Музика ще генерується, спробуйте через 30 секунд'
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // If failed, return error
    if (taskResult.status === 'failed' || taskResult.status === 'error') {
      throw new Error(taskResult.error || 'Music generation failed');
    }

    // If completed, format and return variants
    if (taskResult.status === 'completed' && taskResult.data) {
      const variants: MusicVariant[] = taskResult.data.map((item: any, index: number) => ({
        id: item.id || `variant-${index}`,
        title: item.title || `Варіант ${index + 1}`,
        description: item.tags || item.style || '',
        audioUrl: item.audio_url,
        duration: item.duration || 0,
        style: item.tags || item.style || '',
      }));

      console.log('Music generation completed:', variants.length, 'variants');

      return new Response(
        JSON.stringify({ 
          status: 'completed',
          success: true, 
          variants 
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Unknown status
    throw new Error(`Unexpected task status: ${taskResult.status}`);

  } catch (error) {
    console.error('Error checking music status:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
