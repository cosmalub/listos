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
    const { taskId } = await req.json();
    console.log('Check postcard status called for taskId:', taskId);

    if (!taskId) {
      throw new Error('taskId is required');
    }

    const KIE_API_KEY = Deno.env.get('KIE_API_KEY');
    if (!KIE_API_KEY) {
      throw new Error('KIE_API_KEY is not configured');
    }

    const status = await getTaskStatus(taskId, KIE_API_KEY);
    console.log('Task status:', JSON.stringify(status, null, 2));

    // Access data via status.data
    const taskData = status?.data;

    if (!taskData) {
      throw new Error('Invalid response from Kie.ai API');
    }

    console.log('Task data:', JSON.stringify(taskData, null, 2));

    if (taskData.state === 'success' && taskData.resultJson) {
      // Parse resultJson to get resultUrls
      const resultData = JSON.parse(taskData.resultJson);
      console.log('Result data:', JSON.stringify(resultData, null, 2));
      
      const imageUrl = resultData.resultUrls?.[0];
      
      if (imageUrl) {
        const base64Image = await fetchImageAsBase64(imageUrl);
        
        return new Response(
          JSON.stringify({ 
            status: 'completed', 
            imageUrl: base64Image 
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
          }
        );
      }
    }

    if (taskData.state === 'fail') {
      return new Response(
        JSON.stringify({ 
          status: 'failed', 
          error: taskData.failMsg || 'Image generation failed' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    }

    // Still generating or waiting
    return new Response(
      JSON.stringify({ 
        status: 'generating',
        state: taskData.state
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error) {
    console.error('Error in check-postcard-status function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});

async function getTaskStatus(taskId: string, apiKey: string): Promise<any> {
  const response = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Kie.ai API error:', response.status, errorText);
    throw new Error(`Failed to get task status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

async function fetchImageAsBase64(url: string): Promise<string> {
  console.log('Fetching image from URL:', url);
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  
  // Process in chunks to avoid stack overflow with large images
  let binaryString = '';
  const chunkSize = 8192;
  for (let i = 0; i < uint8Array.length; i += chunkSize) {
    const chunk = uint8Array.subarray(i, i + chunkSize);
    binaryString += String.fromCharCode(...chunk);
  }
  
  const base64 = btoa(binaryString);
  return `data:image/png;base64,${base64}`;
}
