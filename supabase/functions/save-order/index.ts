import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';
import QRCode from 'https://esm.sh/qrcode@1.5.4';

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
      lyrics,
      musicVariant,
      pageData,
      frontDesign,
      backDesign,
      frontImageBase64,
      backImageBase64,
      songPageHtml,
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

    // Generate unique order ID
    const { data: orderData, error: insertError } = await supabase
      .from('orders')
      .insert({
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
        front_image_url: null, // Will update after upload
        back_design_color: backDesign.selectedColor,
        back_design_message: backDesign.personalMessage,
        back_image_url: null, // Will update after upload
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting order:', insertError);
      throw insertError;
    }

    const orderId = orderData.id;
    console.log('Order created with ID:', orderId);

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

    // Helper function to upload text content (e.g., HTML)
    async function uploadText(content: string, path: string, contentType: string) {
      const encoder = new TextEncoder();
      const bytes = encoder.encode(content);
      const { error } = await supabase.storage
        .from('postcards')
        .upload(path, bytes, { contentType, upsert: true });
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

    // Generate QR code for the song page
    const songPageUrl = `${supabaseUrl.replace('fmucxrtpiqxnfgvamjlo.supabase.co', 'listosyk.lovable.app')}/s/song/${orderId}`;
    const qrCodeDataUrl = await QRCode.toDataURL(songPageUrl, {
      width: 500,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });

    // Upload QR code
    const qrCodePath = `${orderId}/qr-code.png`;
    const qrCodeUrl = await uploadBase64Image(qrCodeDataUrl, qrCodePath);
    console.log('QR code uploaded:', qrCodeUrl);

    // Upload song page HTML (draft page)
    const draftPagePath = `${orderId}/page.html`;
    const draftPageContent = typeof songPageHtml === 'string' && songPageHtml.trim() ? songPageHtml : '<!-- empty -->';
    const draftPageUrl = await uploadText(draftPageContent, draftPagePath, 'text/html; charset=utf-8');
    console.log('Draft page uploaded:', draftPageUrl);

    // Update order with all URLs
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        front_image_url: frontImageUrl,
        back_image_url: backImageUrl,
        qr_code_url: qrCodeUrl,
        draft_page_url: draftPageUrl,
      })
      .eq('id', orderId);

    if (updateError) {
      console.error('Error updating order:', updateError);
      throw updateError;
    }

    console.log('Order saved successfully:', orderId);

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
