import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Функция генерации уникального кода
function generatePromoCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Без похожих символов
  let code = 'NEXT25-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { preOrderId } = await req.json();

    if (!preOrderId) {
      throw new Error('preOrderId is required');
    }

    console.log('Generating promo code for pre_order:', preOrderId);

    // Проверяем, не создан ли уже промокод для этого заказа
    const { data: existingPromo } = await supabase
      .from('promo_codes')
      .select('code, expires_at')
      .eq('pre_order_id', preOrderId)
      .eq('is_used', false)
      .single();

    if (existingPromo) {
      console.log('Promo code already exists:', existingPromo.code);
      return new Response(
        JSON.stringify({ 
          success: true, 
          promoCode: existingPromo.code,
          expiresAt: existingPromo.expires_at 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Генерируем уникальный код
    let promoCode = '';
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 10) {
      promoCode = generatePromoCode();
      
      // Проверяем уникальность
      const { data: existing } = await supabase
        .from('promo_codes')
        .select('id')
        .eq('code', promoCode)
        .single();

      if (!existing) {
        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      throw new Error('Failed to generate unique promo code');
    }

    // Создаем промокод со сроком действия 30 дней
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const { data: promoData, error: promoError } = await supabase
      .from('promo_codes')
      .insert({
        code: promoCode,
        pre_order_id: preOrderId,
        discount_percent: 25,
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single();

    if (promoError) {
      console.error('Error creating promo code:', promoError);
      throw promoError;
    }

    console.log('Promo code created:', promoData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        promoCode: promoData.code,
        expiresAt: promoData.expires_at 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-promo-code function:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
