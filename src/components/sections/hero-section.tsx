import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrderDialog } from "@/components/order/OrderDialogContext";

interface ReviewBubbleProps {
  name: string;
  rating: number;
  text: string;
  initials: string;
  bgColor: string;
}

function ReviewBubble({ name, rating, text, initials, bgColor }: ReviewBubbleProps) {
  return (
    <div
      className="bg-white p-4 rounded-xl shadow-lg w-64 border-2 transition-all duration-500 hover:shadow-xl hover:scale-105 animate-float"
      style={{
        borderColor: bgColor,
        animation: `float ${Math.random() * 2 + 3}s ease-in-out infinite, glow ${Math.random() * 3 + 4
          }s alternate infinite`,
      }}
    >
      <div className="flex items-center mb-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium mr-3"
          style={{ backgroundColor: bgColor }}
        >
          {initials}
        </div>
        <div>
          <p className="font-medium text-[#6A5ACD]">{name}</p>
          <div className="flex text-yellow-400">
            {[...Array(rating)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-current"
                style={{ animation: `twinkle ${Math.random() * 2 + 1}s ease-in-out infinite alternate` }}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-[#6A5ACD]/80">{text}</p>
    </div>
  );
}

function ReviewBubbleMobile({ name, rating, text, initials, bgColor }: ReviewBubbleProps) {
  return (
    <div
      className="bg-white p-3 rounded-xl shadow-md border-2 w-full"
      style={{
        borderColor: bgColor,
      }}
    >
      <div className="flex items-center mb-1">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium mr-2 text-sm"
          style={{ backgroundColor: bgColor }}
        >
          {initials}
        </div>
        <div>
          <p className="font-medium text-[#6A5ACD] text-sm">{name}</p>
          <div className="flex text-yellow-400">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-[#6A5ACD]/80 text-xs">{text}</p>
    </div>
  );
}

function CustomerCounter() {
  return (
    <div className="max-w-xs mx-auto mb-4 text-center">
      <div className="relative">
        <div className="transform hover:scale-105 transition-all duration-300">
          <div className="py-1 px-2 rounded-lg flex flex-row items-center justify-center gap-2">
            <div className="flex text-yellow-500 drop-shadow-sm">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <div className="flex items-center">
              <span className="text-sm text-[#5A49CD] font-medium whitespace-nowrap">500+ задоволених клієнтів</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const { openOrderDialog } = useOrderDialog();
  return (

    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-[#FFD1DC] to-white/20">
      {/* Top corners */}
      <div className="absolute top-28 left-[10%] transform -rotate-3 hidden xl:block z-10 animate-subtle-move">
        <ReviewBubble name="Олена С." rating={5} text="Чудова ідея для подарунка!" initials="ОС" bgColor="#FFD1DC" />
      </div>
      <div className="absolute top-28 right-[10%] transform rotate-3 hidden xl:block z-10 animate-subtle-move-slow-reverse">
        <ReviewBubble
          name="Софія М."
          rating={5}
          text="Замовляла вже двічі, завжди чудовий результат!"
          initials="СМ"
          bgColor="#FFD1DC"
        />
      </div>

      {/* Left and right sides - middle */}
      <div className="absolute top-1/2 left-[5%] transform -translate-y-1/2 rotate-3 hidden xl:block z-10 animate-subtle-move">
        <ReviewBubble name="Марія К." rating={5} text="Дуже зворушливий подарунок!" initials="МК" bgColor="#B8B3FF" />
      </div>
      <div className="absolute top-1/2 right-[5%] transform -translate-y-1/2 -rotate-3 hidden xl:block z-10 animate-subtle-move-reverse">
        <ReviewBubble name="Андрій В." rating={5} text="Оригінально та душевно!" initials="АВ" bgColor="#F3D1FF" />
      </div>

      {/* Bottom corners */}
      <div className="absolute bottom-10 left-[15%] transform rotate-2 hidden xl:block z-10 animate-subtle-move-slow">
        <ReviewBubble
          name="Дмитро С."
          rating={5}
          text="Листосик допоміг зробити ідеальне освідчення!"
          initials="ДС"
          bgColor="#F3D1FF"
        />
      </div>
      <div className="absolute bottom-10 right-[15%] transform -rotate-2 hidden xl:block z-10 animate-subtle-move">
        <ReviewBubble name="Наталія Р." rating={5} text="Неймовірно приємний сервіс!" initials="НР" bgColor="#B8B3FF" />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        {/* Customer counter */}
        <div className="mt-2.5 md:mt-0">
          <CustomerCounter />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-20 p-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#6A5ACD]">
            Створи унікальну листівку з твоєю особистою піснею
          </h1>

          <p className="text-lg md:text-xl mb-8 text-[#6A5ACD]/80">
            Перетвори слова привітання, вибачення чи подяки на музичний подарунок, який можна почути та потримати у
            руках. Легко і тепло вислови будь-які почуття.
          </p>

          {/* Переваги під підзаголовком - простий текст з іконками */}
          <div className="mb-10 flex flex-wrap justify-center items-center gap-x-3 gap-y-2 max-w-3xl mx-auto text-[#6A5ACD]">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡️</span>
              <span className="font-medium text-sm sm:text-base">Створення за 10 хвилин</span>
            </div>

            <span className="text-[#6A5ACD]/40 hidden sm:inline">•</span>

            <div className="flex items-center gap-2">
              <span className="text-xl">🚚</span>
              <span className="font-medium text-sm sm:text-base">Доставка за 1-2 дні</span>
            </div>

            <span className="text-[#6A5ACD]/40 hidden sm:inline">•</span>

            <div className="flex items-center gap-2">
              <span className="text-xl">💎</span>
              <span className="font-medium text-sm sm:text-base">Вау-ефект гарантуємо</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => openOrderDialog('hero', 'Почати створення')}
              className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] hover:from-[#7A6ADE] hover:to-[#C282EF] text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 font-bold"
            >
              🎵 Почати створення
            </Button>
            <Button
              onClick={() => {
                const examplesSection = document.getElementById('examples');
                examplesSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] hover:from-[#7A6ADE] hover:to-[#C282EF] text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 font-bold"
            >
              🔍 Дивитися приклади
            </Button>
          </div>
        </div>

        {/* Mobile reviews (visible only on small screens) - arranged in 2 rows */}
        <div className="mt-8 grid grid-cols-2 gap-3 xl:hidden">
          <div>
            <ReviewBubbleMobile
              name="Марія К."
              rating={5}
              text="Дуже зворушливий подарунок!"
              initials="МК"
              bgColor="#FFD1DC"
            />
          </div>
          <div>
            <ReviewBubbleMobile
              name="Андрій В."
              rating={5}
              text="Оригінально та душевно!"
              initials="АВ"
              bgColor="#B8B3FF"
            />
          </div>
          <div>
            <ReviewBubbleMobile name="Софія М." rating={5} text="Замовляла вже двічі!" initials="СМ" bgColor="#F3D1FF" />
          </div>
          <div>
            <ReviewBubbleMobile name="Дмитро С." rating={5} text="Ідеальне освідчення!" initials="ДС" bgColor="#B8B3FF" />
          </div>
        </div>
      </div>
    </section>
  );
}