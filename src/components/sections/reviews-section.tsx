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
        <div className="relative">
          <div className="flex gap-5 animate-scroll-right">
            {secondRow.map((review, index) => (
              <ReviewScreenshot key={`row2-${index}`} {...review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
