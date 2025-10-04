import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { OccasionAnimation } from '@/components/public/OccasionAnimation';
import { supabase } from '@/integrations/supabase/client';

export default function PublicSong() {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [draftHtml, setDraftHtml] = useState('');

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error) {
        console.error('Error fetching order:', error);
        setLoading(false);
        return;
      }

      setOrderData(data);

      // Fetch draft HTML if available
      if (data.draft_page_url) {
        try {
          const response = await fetch(data.draft_page_url);
          const html = await response.text();
          setDraftHtml(html);
        } catch (err) {
          console.error('Error fetching draft HTML:', err);
        }
      }

      setLoading(false);
    }

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Сторінка не знайдена</h2>
          <p className="text-muted-foreground">
            Можливо, посилання неправильне або сторінка більше не існує.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <OccasionAnimation occasion={orderData.page_occasion} />
      
      <div className="relative z-10">
        {draftHtml ? (
          <div dangerouslySetInnerHTML={{ __html: draftHtml }} />
        ) : (
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-8">
              <h1 className="text-4xl font-bold text-center mb-6">
                {orderData.page_occasion === 'birthday' && '🎂 З Днем Народження!'}
                {orderData.page_occasion === 'anniversary' && '💕 З річницею!'}
                {orderData.page_occasion === 'new-year' && '🎄 З Новим Роком!'}
                {orderData.page_occasion === 'valentines' && '💖 З Днем Святого Валентина!'}
                {orderData.page_occasion === 'mothers-day' && '🌸 З Днем Матері!'}
                {orderData.page_occasion === 'congratulations' && '🎉 Вітаємо!'}
              </h1>
              
              <div className="mb-8">
                <p className="text-xl text-center mb-2">
                  <strong>Для:</strong> {orderData.page_recipient}
                </p>
                <p className="text-xl text-center">
                  <strong>Від:</strong> {orderData.page_sender}
                </p>
              </div>

              {orderData.front_image_url && (
                <div className="mb-8">
                  <img
                    src={orderData.front_image_url}
                    alt="Postcard"
                    className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                  />
                  {orderData.front_design_caption && (
                    <p className="text-center mt-4 text-lg italic">
                      {orderData.front_design_caption}
                    </p>
                  )}
                </div>
              )}

              {orderData.lyrics && (
                <div className="bg-gradient-to-r from-[hsl(var(--primary))]/10 to-[hsl(var(--secondary))]/10 rounded-lg p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-center">Ваша пісня</h2>
                  <div className="whitespace-pre-wrap text-center">
                    {orderData.lyrics}
                  </div>
                </div>
              )}

              {orderData.music_selected && orderData.music_audio_url && (
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4">Прослухати пісню</h3>
                  <audio controls className="mx-auto">
                    <source src={orderData.music_audio_url} type="audio/mpeg" />
                    Ваш браузер не підтримує аудіо елемент.
                  </audio>
                </div>
              )}

              {orderData.back_design_message && (
                <div className="mt-8 text-center">
                  <h3 className="text-xl font-semibold mb-4">Персональне повідомлення</h3>
                  <p className="text-lg italic">
                    {orderData.back_design_message}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
