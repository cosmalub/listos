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

    // Шукаємо замовлення з таким токеном
    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .eq('access_token', token)
      .maybeSingle();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    if (!order) {
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
    if (!order.is_paid) {
      console.log('Order not paid:', order.id);
      return new Response(
        JSON.stringify({ 
          valid: false, 
          message: 'Замовлення ще не оплачено. Будь ласка, зв\'яжіться з нами для підтвердження оплати.' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Перевіряємо чи не завершено вже
    if (order.studio_completed) {
      console.log('Studio already completed for order:', order.id);
      return new Response(
        JSON.stringify({ 
          valid: false, 
          message: 'Ви вже створили листівку з цим кодом доступу. Кожен код можна використати лише один раз.' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Оновлюємо studio_started_at якщо це перший вхід
    if (!order.studio_started_at) {
      console.log('First time access, updating studio_started_at for order:', order.id);
      const { error: updateError } = await supabase
        .from('orders')
        .update({ studio_started_at: new Date().toISOString() })
        .eq('id', order.id);

      if (updateError) {
        console.error('Error updating studio_started_at:', updateError);
        // Не критично, продовжуємо
      }
    }

    console.log('Token validated successfully for order:', order.id);

    return new Response(
      JSON.stringify({ 
        valid: true,
        orderId: order.id,
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
