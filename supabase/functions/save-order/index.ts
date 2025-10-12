import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const {
      orderId,
      lyrics,
      musicVariant,
      pageData,
      frontDesign,
      backDesign,
      frontImageBase64,
      backImageBase64,
    } = await req.json();

    console.log('Saving order with data:', {
      hasLyrics: !!lyrics,
      hasMusicVariant: !!musicVariant,
      hasPageData: !!pageData,
      hasFrontDesign: !!frontDesign,
      hasBackDesign: !!backDesign,
      hasFrontImage: !!frontImageBase64,
      hasBackImage: !!backImageBase64,
    });

    // Перевірка наявності orderId
    if (!orderId) {
      console.error('No orderId provided');
      return new Response(
        JSON.stringify({ error: 'orderId is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    // Оновлюємо існуючий запис замість створення нового
    const { data: orderData, error: updateError } = await supabase
      .from('orders')
      .update({
        lyrics,
        music_variant_id: musicVariant?.id || null,
        music_variant_title: musicVariant?.title || null,
        music_variant_description: musicVariant?.description || null,
        music_variant_style: musicVariant?.style || null,
        music_selected: !!musicVariant,
        music_audio_url: musicVariant?.audioUrl || null,
        page_occasion: pageData.occasion,
        page_recipient: pageData.recipient,
        page_sender: pageData.sender,
        front_design_mode: frontDesign.mode,
        front_design_style: frontDesign.style,
        front_design_caption: frontDesign.caption,
        front_design_prompt: frontDesign.prompt,
        back_design_color: backDesign.selectedColor,
        back_design_message: backDesign.personalMessage,
      })
      .eq('id', orderId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating order:', updateError);
      throw updateError;
    }

    console.log('Order updated with ID:', orderId);

    // Helper function to upload base64 image
    async function uploadBase64Image(base64Data: string, path: string) {
      const base64Content = base64Data.split(',')[1];
      const imageBuffer = Uint8Array.from(atob(base64Content), (c) => c.charCodeAt(0));
      
      const { data, error } = await supabase.storage
        .from('postcards')
        .upload(path, imageBuffer, {
          contentType: 'image/png',
          upsert: true,
        });

      if (error) {
        console.error(`Error uploading ${path}:`, error);
        throw error;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('postcards')
        .getPublicUrl(path);

      return publicUrl;
    }

    // Upload front image
    const frontImagePath = `${orderId}/front.png`;
    const frontImageUrl = await uploadBase64Image(frontImageBase64, frontImagePath);
    console.log('Front image uploaded:', frontImageUrl);

    // Upload back image
    const backImagePath = `${orderId}/back.png`;
    const backImageUrl = await uploadBase64Image(backImageBase64, backImagePath);
    console.log('Back image uploaded:', backImageUrl);

    // Update order with image URLs and mark as completed
    const { error: finalUpdateError } = await supabase
      .from('orders')
      .update({
        front_image_url: frontImageUrl,
        back_image_url: backImageUrl,
        studio_completed: true,
        studio_completed_at: new Date().toISOString()
      })
      .eq('id', orderId);

    if (finalUpdateError) {
      console.error('Error updating order with images:', finalUpdateError);
      throw finalUpdateError;
    }

    console.log('Order saved and completed successfully:', orderId);

    return new Response(
      JSON.stringify({ orderId, success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in save-order function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
