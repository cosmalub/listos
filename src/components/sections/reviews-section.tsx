import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ReviewProps {
  rating: number;
  text: string;
  customerName: string;
  customerAge: number;
  customerCity: string;
  giftFor: string;
}

function ReviewCard({ rating, text, customerName, customerAge, customerCity, giftFor }: ReviewProps) {
  return (
    <Card className="border-2 border-[#B8B3FF]/40 hover:border-[#B8B3FF] transition-all hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex text-yellow-400 mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-current" />
          ))}
        </div>
        <p className="text-[#6A5ACD]/80 leading-relaxed mb-4">{text}</p>
        <div className="border-t border-[#B8B3FF]/30 pt-4">
          <p className="font-semibold text-[#6A5ACD] mb-1">
            — {customerName}, {customerAge} років ({customerCity})
          </p>
          <p className="text-sm text-[#6A5ACD]/70">Подарунок: {giftFor}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function ReviewsSection() {
  const reviews = [
    {
      rating: 5,
      text: "Я аж расплакалась! Коли почула імена всіх моїх дітей у пісні — не змогла стримати емоцій. Листівка лежить на комоді, щодня дивлюсь на неї і посміхаюсь. Студія дуже зручна — справилась за 10 хвилин. Дякую, Listosyk!",
      customerName: "Олена",
      customerAge: 48,
      customerCity: "Київ",
      giftFor: "Для себе (від дітей на 50 років)",
    },
    {
      rating: 5,
      text: "Дуже сподобалось сину і гостям! Танцювали під цю пісню весь вечір. Листівка стала хітом вечірки. Усі просили посилання, де замовити. Це краще, ніж букет квітів за 500 грн! Студія проста — навіть я, технічний нуль, справився.",
      customerName: "Андрій",
      customerAge: 35,
      customerCity: "Львів",
      giftFor: "Для сина на 18 років",
    },
    {
      rating: 5,
      text: "Незвичний подарунок викликав купу приємних емоцій. Мама слухає щодня! Сказала, що це найкращий подарунок за все життя. Процес створення простий — справилась за 10 хвилин. Спочатку боялась, що ШІ зробить погано, але результат вразив!",
      customerName: "Марія",
      customerAge: 29,
      customerCity: "Дніпро",
      giftFor: "Для мами на день народження",
    },
    {
      rating: 5,
      text: "Створила пісню за 10 хвилин. Листівка прийшла через 2 дні. Усе просто і швидко! Чоловік був вражений — не очікував такого. Каже, що це найоригінальніший подарунок. Студія інтуїтивна — кожен крок зрозумілий.",
      customerName: "Ірина",
      customerAge: 32,
      customerCity: "Харків",
      giftFor: "Для чоловіка на річницю",
    },
    {
      rating: 5,
      text: "Спочатку боявся, що ШІ зробить погано. Але результат вразив! Краще, ніж у студії звукозапису! Пісня звучить професійно — ніхто не повірив, що це зробив ШІ. Мама плакала від радості. Рекомендую всім!",
      customerName: "Віктор",
      customerAge: 41,
      customerCity: "Одеса",
      giftFor: "Для мами на 8 березня",
    },
    {
      rating: 5,
      text: "Найкращий подарунок, який я коли-небудь робила. Коханий був просто вражений! Слухав пісню раз 20 підряд. Листівку поставив на стіл у рамку. Це безцінно! Студія дуже зручна — навіть не очікувала, що все так просто.",
      customerName: "Світлана",
      customerAge: 27,
      customerCity: "Київ",
      giftFor: "Для коханого на день народження",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-[#FFD1DC]/10 relative z-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#6A5ACD] mb-4">
          Що кажуть наші клієнти?
        </h2>
        <p className="text-lg text-center text-[#6A5ACD]/80 mb-12 max-w-2xl mx-auto">
          Понад 500 сімей вже подарували незабутні емоції
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>

        {/* CTA після відгуків */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-3xl border-2 border-[#B8B3FF]/60 hover:border-[#B8B3FF] transition-all hover:shadow-lg p-8 text-center">
            <Button 
              onClick={() => window.location.href = '/studio'}
              className="text-lg px-10 py-7 rounded-full bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] hover:from-[#7A6ADE] hover:to-[#C282EF] text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 font-bold mb-6"
            >
              Створити музичний подарунок
            </Button>
            
            <div className="space-y-3 text-[#6A5ACD]/80">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">💝</span>
                <span className="text-sm md:text-base">Понад 500 створених емоційних історій</span>
              </div>
              
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">🔄</span>
                <span className="text-sm md:text-base">Клієнти замовляють знову — для мами, тата, коханих</span>
              </div>
              
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">⚡️</span>
                <span className="text-sm md:text-base">Студія настільки проста, що справишся за 10 хвилин</span>
              </div>
              
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">🚚</span>
                <span className="text-sm md:text-base">Безкоштовна доставка Новою поштою за 1-2 дні</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
