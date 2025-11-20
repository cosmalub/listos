import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { promoCode } = await req.json();

    if (!promoCode) {
      throw new Error('Promo code is required');
    }

    console.log('Validating promo code:', promoCode);

    const { data: promo, error } = await supabase
      .from('promo_codes')
      .select('*')
      .eq('code', promoCode.toUpperCase().trim())
      .single();

    if (error || !promo) {
      console.log('Promo code not found:', promoCode);
      return new Response(
        JSON.stringify({ 
          valid: false, 
          message: 'Промокод не знайдено' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Проверяем, не использован ли
    if (promo.is_used) {
      console.log('Promo code already used:', promoCode);
      return new Response(
        JSON.stringify({ 
          valid: false, 
          message: 'Промокод вже використано' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Проверяем срок действия
    const now = new Date();
    const expiresAt = new Date(promo.expires_at);
    
    if (now > expiresAt) {
      console.log('Promo code expired:', promoCode);
      return new Response(
        JSON.stringify({ 
          valid: false, 
          message: 'Промокод прострочений' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Promo code valid:', promoCode);
    return new Response(
      JSON.stringify({ 
        valid: true, 
        discountPercent: promo.discount_percent,
        message: `Знижка ${promo.discount_percent}% застосована!`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in validate-promo-code function:', error);
    return new Response(
      JSON.stringify({ 
        valid: false,
        error: error.message 
      }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
