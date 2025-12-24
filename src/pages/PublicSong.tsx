import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { OccasionAnimation } from '@/components/public/OccasionAnimation';
import { supabase } from '@/integrations/supabase/client';

// Визначення мови тексту за характерними літерами
const detectLanguage = (text: string): 'uk' | 'ru' => {
  const ukrainianChars = /[іїєґ]/i;
  const russianChars = /[ыэъ]/i;
  
  const hasUkrainian = ukrainianChars.test(text);
  const hasRussian = russianChars.test(text);
  
  if (hasUkrainian && !hasRussian) return 'uk';
  if (hasRussian && !hasUkrainian) return 'ru';
  
  return 'uk';
};

const locale = {
  uk: {
    for: 'Для:',
    from: 'Від:',
    browserNotSupported: 'Ваш браузер не підтримує аудіо елемент.',
  },
  ru: {
    for: 'Для:',
    from: 'От:',
    browserNotSupported: 'Ваш браузер не поддерживает аудио элемент.',
  }
};

export default function PublicSong() {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
      {/* Intro ritual animation (8 seconds) + static background */}
      <OccasionAnimation occasion={orderData.page_occasion} ritualDuration={8000} />
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-8">
            {/* Для кого / Від кого - НАД заголовком */}
            <div className="mb-4">
              <p className="text-lg text-center font-baloo text-muted-foreground">
                {locale[detectLanguage(orderData.lyrics || '')].for} {orderData.page_recipient} • {locale[detectLanguage(orderData.lyrics || '')].from} {orderData.page_sender}
              </p>
            </div>

            {/* Заголовок - используем caption с лицевой стороны или стандартный по событию */}
            <h1 className="text-4xl font-bold font-baloo text-center mb-8">
              {orderData.front_design_caption || (
                <>
                  {orderData.page_occasion === 'birthday' && '🎂 З Днем Народження!'}
                  {orderData.page_occasion === 'anniversary' && '💕 З річницею!'}
                  {orderData.page_occasion === 'new-year' && '🎄 З Новим Роком!'}
                  {orderData.page_occasion === 'valentines' && '💖 З Днем Святого Валентина!'}
                  {orderData.page_occasion === 'mothers-day' && '🌸 З Днем Матері!'}
                  {orderData.page_occasion === 'congratulations' && '🎉 Вітаємо!'}
                  {orderData.page_occasion === 'thanks' && '🙏 Дякую!'}
                  {orderData.page_occasion === 'apology' && '💐 Вибач!'}
                  {orderData.page_occasion === 'love' && '❤️ Кохаю!'}
                  {orderData.page_occasion === 'friendship' && '🤝 Дружбі!'}
                </>
              )}
            </h1>

            {/* Аудио плеер */}
            {orderData.music_selected && orderData.music_audio_url && (
              <div className="text-center mb-8">
                <audio controls className="mx-auto w-full max-w-md">
                  <source src={orderData.music_audio_url} type="audio/mpeg" />
                  {locale[detectLanguage(orderData.lyrics || '')].browserNotSupported}
                </audio>
              </div>
            )}

            {/* Текст песни */}
            {orderData.lyrics && (
              <div className="bg-gradient-to-r from-[hsl(var(--primary))]/10 to-[hsl(var(--secondary))]/10 rounded-lg p-6">
                <div 
                  className="whitespace-pre-wrap text-center"
                  dangerouslySetInnerHTML={{
                    __html: (() => {
                      return orderData.lyrics
                        // Видаляємо слово LYRICS (з або без зворотних лапок)
                        .replace(/```?LYRICS```?/gi, '')
                        .replace(/^LYRICS\s*/gim, '')
                        // Видаляємо зворотні лапки markdown
                        .replace(/```/g, '')
                        // Видаляємо теги в квадратних дужках: [Куплет 1], [Припев] тощо
                        .replace(/\[.*?\]/g, '')
                        // Видаляємо теги в круглих дужках: (Куплет 1), (Припев) тощо
                        .replace(/\(.*?(куплет|припев|verse|chorus|bridge|outro|intro).*?\)/gi, '')
                        // Конвертуємо **текст** в <strong>текст</strong>
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        // Видаляємо зайві порожні рядки (більше 2 підряд)
                        .replace(/\n{3,}/g, '\n\n')
                        // Обрізаємо пробіли на початку і в кінці
                        .trim();
                    })()
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
