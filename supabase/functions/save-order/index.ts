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
      phase = 'finalize', // 'create' or 'finalize'
      preOrderId,
      lyrics,
      musicVariant,
      pageData,
      frontDesign,
      backDesign,
      frontImageBase64,
      backImageBase64,
      qrCodeUrl,
      productFormat = 'qr',
      insideLeftImageBase64,
      insideRightImageBase64,
      outerBackImageBase64,
      printSheetImageBase64,
    } = await req.json();

    console.log('Saving order with data:', {
      phase,
      preOrderId,
      productFormat,
      hasLyrics: !!lyrics,
      hasMusicVariant: !!musicVariant,
      hasPageData: !!pageData,
      hasFrontDesign: !!frontDesign,
      hasBackDesign: !!backDesign,
      hasFrontImage: !!frontImageBase64,
      hasBackImage: !!backImageBase64,
      hasInsideLeft: !!insideLeftImageBase64,
      hasInsideRight: !!insideRightImageBase64,
      hasOuterBack: !!outerBackImageBase64,
      hasPrintSheet: !!printSheetImageBase64,
      qrCodeUrl,
    });

    // Перевірка наявності preOrderId
    if (!preOrderId) {
      console.error('No preOrderId provided');
      return new Response(
        JSON.stringify({ error: 'preOrderId is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    // Handle dev mode: create pre_order if it doesn't exist
    let actualPreOrderId = preOrderId;
    if (preOrderId === 'dev-mode-pre-order-id') {
      console.log('Dev mode detected, checking/creating pre_order');
      const { data: existingPreOrder } = await supabase
        .from('pre_orders')
        .select('id')
        .eq('access_token', 'dev-mode-token')
        .maybeSingle();

      if (!existingPreOrder) {
        const { data: newPreOrder, error: preOrderError } = await supabase
          .from('pre_orders')
          .insert({
            access_token: 'dev-mode-token',
            is_paid: false,
            status: 'pending',
          })
          .select()
          .single();

        if (preOrderError) {
          console.error('Error creating dev pre_order:', preOrderError);
          throw preOrderError;
        }

        actualPreOrderId = newPreOrder.id;
        console.log('Created dev pre_order with ID:', actualPreOrderId);
      } else {
        actualPreOrderId = existingPreOrder.id;
        console.log('Using existing dev pre_order with ID:', actualPreOrderId);
      }
    }

    // Перевіряємо, чи вже існує запис для цього pre_order
    const { data: existingOrder } = await supabase
      .from('orders')
      .select('id')
      .eq('pre_order_id', actualPreOrderId)
      .maybeSingle();

    let orderId: string;

    const resolvedFormat = productFormat === 'sound' ? 'sound' : 'qr';

    const orderPayload = {
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
          product_format: resolvedFormat,
    };

    if (existingOrder) {
      // Якщо запис існує - оновлюємо його
      console.log('Updating existing order:', existingOrder.id);
      const { error: updateError } = await supabase
        .from('orders')
        .update(orderPayload)
        .eq('id', existingOrder.id);

      if (updateError) {
        console.error('Error updating order:', updateError);
        throw updateError;
      }
      
      orderId = existingOrder.id;
      console.log('Order updated with ID:', orderId);
    } else {
      // Якщо запису немає - створюємо новий
      console.log('Creating new order for pre_order:', actualPreOrderId);
      const { data: newOrder, error: insertError } = await supabase
        .from('orders')
        .insert({
          pre_order_id: actualPreOrderId,
          ...orderPayload,
          production_stage: 'created',
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error inserting order:', insertError);
        throw insertError;
      }

      orderId = newOrder.id;
      console.log('Order created with ID:', orderId);
    }

    // PHASE 1: If 'create' phase, just return the orderId
    if (phase === 'create') {
      console.log('Phase CREATE completed, returning orderId:', orderId);
      return new Response(
        JSON.stringify({ orderId, success: true }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    // PHASE 2: 'finalize' phase - upload images and complete order
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

    // Upload front image (QR back, or sound cover)
    const frontImagePath = `${orderId}/front.png`;
    const frontImageUrl = await uploadBase64Image(frontImageBase64, frontImagePath);
    console.log('Front image uploaded:', frontImageUrl);

    const imageUpdates: Record<string, string | null> = {
      front_image_url: frontImageUrl,
      qr_code_url: resolvedFormat === 'sound' ? null : (qrCodeUrl || null),
    };

    if (resolvedFormat === 'sound') {
      // Cover already stored as front_image_url.
      // inside-right is the designed interior (analogous to QR back).
      const insideRightUrl = insideRightImageBase64
        ? await uploadBase64Image(insideRightImageBase64, `${orderId}/inside-right.png`)
        : (backImageBase64 ? await uploadBase64Image(backImageBase64, `${orderId}/back.png`) : null);
      imageUpdates.back_image_url = insideRightUrl;
      imageUpdates.inside_right_image_url = insideRightUrl;

      if (insideLeftImageBase64) {
        imageUpdates.inside_left_image_url = await uploadBase64Image(insideLeftImageBase64, `${orderId}/inside-left.png`);
      }
      if (outerBackImageBase64) {
        imageUpdates.outer_back_image_url = await uploadBase64Image(outerBackImageBase64, `${orderId}/outer-back.png`);
      }
      if (printSheetImageBase64) {
        imageUpdates.print_sheet_image_url = await uploadBase64Image(printSheetImageBase64, `${orderId}/print-sheet.png`);
      }
      console.log('Sound card faces uploaded');
    } else {
      const backImagePath = `${orderId}/back.png`;
      const backImageUrl = await uploadBase64Image(backImageBase64, backImagePath);
      console.log('Back image uploaded:', backImageUrl);
      imageUpdates.back_image_url = backImageUrl;
    }

    // Update order with image URLs and mark as completed
    const { error: finalUpdateError } = await supabase
      .from('orders')
      .update({
        ...imageUpdates,
        studio_completed: true,
        studio_completed_at: new Date().toISOString()
      })
      .eq('id', orderId);

    if (finalUpdateError) {
      console.error('Error updating order with images:', finalUpdateError);
      throw finalUpdateError;
    }

    // Оновлюємо статус в pre_orders
    const { error: preOrderUpdateError } = await supabase
      .from('pre_orders')
      .update({ status: 'completed' })
      .eq('id', actualPreOrderId);

    if (preOrderUpdateError) {
      console.error('Error updating pre_order status:', preOrderUpdateError);
      // Не кидаємо помилку, бо order вже збережено
    }

    console.log('Order finalized and completed successfully:', orderId);

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
