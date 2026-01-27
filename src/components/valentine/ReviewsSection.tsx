interface ReviewScreenshotProps {
  imagePath: string;
  alt: string;
}

function ReviewScreenshot({ imagePath, alt }: ReviewScreenshotProps) {
  return (
    <div className="flex-shrink-0 w-[380px] md:w-[450px]">
      <div className="bg-white rounded-2xl p-2 shadow-lg shadow-purple-100/50 border border-purple-100 overflow-hidden hover:shadow-xl hover:shadow-purple-200/60 transition-all duration-300">
        <img src={imagePath} alt={alt} className="w-full h-auto rounded-xl object-contain" />
      </div>
    </div>
  );
}

export function ReviewsSection() {
  const reviews = [
    { imagePath: "/lovable-uploads/1-3.png", alt: "Відгук клієнта 1" },
    { imagePath: "/lovable-uploads/review-iryna.png", alt: "Відгук Ірини" },
    { imagePath: "/lovable-uploads/2-2.png", alt: "Відгук клієнта 2" },
    { imagePath: "/lovable-uploads/review-artem.png", alt: "Відгук Артема" },
    { imagePath: "/lovable-uploads/3.png", alt: "Відгук клієнта 3" },
    { imagePath: "/lovable-uploads/review-vitalii.png", alt: "Відгук Віталія" },
    { imagePath: "/lovable-uploads/4.png", alt: "Відгук клієнта 4" },
    { imagePath: "/lovable-uploads/review-miroslav.png", alt: "Відгук Мирослава" },
    { imagePath: "/lovable-uploads/review-oleksandr.png", alt: "Відгук Олександра" },
  ];

  // Дублюємо відгуки для безперервної прокрутки
  const firstRow = [...reviews, ...reviews];
  const secondRow = [...reviews.slice().reverse(), ...reviews.slice().reverse()];

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#6B5CE7] mb-4">
          Відгуки наших клієнтів
        </h2>
        <p className="text-lg text-center text-gray-600 mb-12">
          Реальні повідомлення від задоволених покупців
        </p>

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
