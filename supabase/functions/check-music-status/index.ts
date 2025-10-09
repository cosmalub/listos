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

    // Check task status using Kie.ai API
    const statusResponse = await fetch(`https://api.kie.ai/api/v1/generate/record-info?taskId=${taskId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sunoApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!statusResponse.ok) {
      const errorText = await statusResponse.text();
      console.error('Kie.ai API error:', errorText);
      throw new Error(`Kie.ai API error: ${statusResponse.status} ${errorText}`);
    }

    const statusResult = await statusResponse.json();
    console.log('Status result:', JSON.stringify(statusResult, null, 2));

    if (statusResult.code !== 200) {
      console.error('API returned error code:', statusResult.code, statusResult.msg);
      throw new Error(statusResult.msg || 'Failed to check task status');
    }

    const taskData = statusResult.data;
    const taskStatus = taskData?.status;
    console.log('Task status:', taskStatus);

    // If still pending, return pending status
    if (taskStatus === 'PENDING') {
      return new Response(
        JSON.stringify({ 
          status: 'pending',
          message: 'Музика ще генерується, спробуйте через 10 секунд'
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // If failed, return error with proper error message field
    if (taskStatus === 'CREATE_TASK_FAILED' || taskStatus === 'GENERATE_AUDIO_FAILED' || 
        taskStatus === 'CALLBACK_EXCEPTION' || taskStatus === 'SENSITIVE_WORD_ERROR') {
      const errorMessage = taskData?.errorMessage || taskData?.failReason || `Generation failed with status: ${taskStatus}`;
      console.error('Task failed:', errorMessage);
      throw new Error(errorMessage);
    }

    // If completed or first success, check if response exists
    if (taskStatus === 'SUCCESS' || taskStatus === 'FIRST_SUCCESS') {
      const responseData = taskData?.response;
      
      // Check if response and sunoData exist
      if (!responseData || !responseData.sunoData || !Array.isArray(responseData.sunoData)) {
        console.warn('Response or sunoData missing, task may still be processing');
        return new Response(
          JSON.stringify({ 
            status: 'pending',
            message: 'Дані ще обробляються'
          }),
          { 
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      const sunoData = responseData.sunoData;
      
      const variants: MusicVariant[] = sunoData.map((item: any, index: number) => ({
        id: item.id || `variant-${index}`,
        title: item.title || `Варіант ${index + 1}`,
        description: item.tags || item.style || '',
        audioUrl: item.audioUrl,
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
    console.warn('Unexpected task status:', taskStatus, 'Full taskData:', taskData);
    throw new Error(`Unexpected task status: ${taskStatus}`);

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
