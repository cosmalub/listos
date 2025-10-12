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
    const { token } = await req.json();

    if (!token || typeof token !== 'string') {
      console.log('Invalid token format');
      return new Response(
        JSON.stringify({ 
          valid: false, 
          message: 'Невірний формат токена' 
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Validating access token:', token.substring(0, 8) + '...');

    // Шукаємо передзамовлення з таким токеном
    const { data: preOrder, error } = await supabase
      .from('pre_orders')
      .select('*')
      .eq('access_token', token)
      .maybeSingle();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    if (!preOrder) {
      console.log('Token not found in database');
      return new Response(
        JSON.stringify({ 
          valid: false, 
          message: 'Невірний код доступу. Перевірте правильність введення.' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Перевіряємо чи оплачено
    if (!preOrder.is_paid) {
      console.log('Pre-order not paid:', preOrder.id);
      return new Response(
        JSON.stringify({ 
          valid: false, 
          message: 'Замовлення ще не оплачено. Будь ласка, зв\'яжіться з нами для підтвердження оплати.' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Перевіряємо чи не завершено вже
    if (preOrder.status === 'completed') {
      console.log('Studio already completed for pre-order:', preOrder.id);
      return new Response(
        JSON.stringify({ 
          valid: false, 
          message: 'Ви вже створили листівку з цим кодом доступу. Кожен код можна використати лише один раз.' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Оновлюємо статус на studio_started якщо це перший вхід
    if (preOrder.status === 'paid') {
      console.log('First time access, updating status to studio_started for pre-order:', preOrder.id);
      const { error: updateError } = await supabase
        .from('pre_orders')
        .update({ status: 'studio_started' })
        .eq('id', preOrder.id);

      if (updateError) {
        console.error('Error updating pre-order status:', updateError);
        // Не критично, продовжуємо
      }
    }

    console.log('Token validated successfully for pre-order:', preOrder.id);

    return new Response(
      JSON.stringify({ 
        valid: true,
        preOrderId: preOrder.id,
        message: 'Код доступу дійсний. Ласкаво просимо до створення вашої музичної листівки!' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error validating token:', error);
    return new Response(
      JSON.stringify({ 
        valid: false, 
        message: 'Помилка при перевірці коду доступу. Спробуйте ще раз.' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
