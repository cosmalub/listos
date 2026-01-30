import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ReviewScreenshotProps {
  imagePath: string;
  alt: string;
}

function ReviewScreenshot({ imagePath, alt }: ReviewScreenshotProps) {
  return (
    <div className="flex-shrink-0 w-[300px] md:w-[400px] px-4">
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        className="bg-white rounded-3xl p-3 shadow-lg border border-purple-50 overflow-hidden relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-100/20 to-pink-100/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <img src={imagePath} alt={alt} className="w-full h-auto rounded-2xl object-cover shadow-sm" />
      </motion.div>
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
    <section className="py-24 bg-[#FAFAFA] overflow-hidden relative">
      {/* Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1200px] bg-gradient-to-r from-purple-100/30 via-pink-100/30 to-purple-100/30 blur-3xl rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-gray-900 drop-shadow-sm mb-6">
              Їхні слова, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A5ACD] via-[#9370DB] to-[#FF85A2]">їхні емоції</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Коли ми кажемо, що це зворушує до сліз — ми не перебільшуємо. Ось що пишуть люди, які вже подарували Листосик.
            </p>
          </motion.div>
        </div>

        {/* Перший ряд - рух вліво */}
        <div className="relative mb-12 -mx-4 md:-mx-20 rotate-1">
          <div
            className="flex w-max animate-scroll-left hover:[animation-play-state:paused]"
            style={{ animationDuration: '120s' }}
          >
            {firstRow.map((review, index) => (
              <ReviewScreenshot key={`row1-${index}`} {...review} />
            ))}
          </div>
        </div>

        {/* Другий ряд - рух вправо */}
        <div className="relative -mx-4 md:-mx-20 -rotate-1">
          <div
            className="flex w-max animate-scroll-right hover:[animation-play-state:paused]"
            style={{ animationDuration: '120s' }}
          >
            {secondRow.map((review, index) => (
              <ReviewScreenshot key={`row2-${index}`} {...review} />
            ))}
          </div>
        </div>
      </div>

      {/* Side Vignettes */}
      <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-[#FAFAFA] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-[#FAFAFA] to-transparent z-20 pointer-events-none" />
    </section>
  );
}
