import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

interface ReviewScreenshotProps {
  imagePath: string;
  alt: string;
}

function ReviewScreenshot({ imagePath, alt }: ReviewScreenshotProps) {
  return (
    <div className="flex-shrink-0 w-[380px] md:w-[450px]">
      <div className="bg-white rounded-2xl p-2 shadow-lg shadow-primary/20 border border-primary/10 overflow-hidden hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
        <img src={imagePath} alt={alt} className="w-full h-auto rounded-xl object-contain" />
      </div>
    </div>
  );
}

export function ReviewsSection() {
  const reviews = [
    { imagePath: "/lovable-uploads/1-3.png", alt: "Відгук клієнта 1" },
    { imagePath: "/lovable-uploads/2-2.png", alt: "Відгук клієнта 2" },
    { imagePath: "/lovable-uploads/3.png", alt: "Відгук клієнта 3" },
    { imagePath: "/lovable-uploads/4.png", alt: "Відгук клієнта 4" },
  ];

  // Дублюємо відгуки для безперервної прокрутки
  const firstRow = [...reviews, ...reviews];
  const secondRow = [...reviews.slice().reverse(), ...reviews.slice().reverse()];

  return (
    <section className="py-16 bg-white relative z-10 overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Відгуки наших клієнтів"
          subtitle="Реальні повідомлення від задоволених покупців"
          size="md"
        />

        {/* Перший ряд - рух вліво */}
        <div className="relative mb-6">
          <div className="flex gap-5 animate-scroll-left">
            {firstRow.map((review, index) => (
              <ReviewScreenshot key={`row1-${index}`} {...review} />
            ))}
          </div>
        </div>

        {/* Другий ряд - рух вправо */}
        <div className="relative mb-16">
          <div className="flex gap-5 animate-scroll-right">
            {secondRow.map((review, index) => (
              <ReviewScreenshot key={`row2-${index}`} {...review} />
            ))}
          </div>
        </div>

        {/* CTA після відгуків */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-3xl border-2 border-primary/30 hover:border-primary/50 transition-all hover:shadow-lg p-8 text-center">
            <Button
              onClick={() => (window.location.href = "/order")}
              className="text-lg px-10 py-7 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-105 font-bold mb-6"
            >
              🎵 Я теж хочу такий подарунок!
            </Button>

            <div className="space-y-3 text-muted-foreground">
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
