import { useState } from "react";

interface GalleryImageProps {
  src: string;
  alt: string;
}

function GalleryImage({ src, alt }: GalleryImageProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) return null;

  return (
    <div className="flex-shrink-0 w-[260px] md:w-[320px] group cursor-pointer">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 shadow-lg shadow-primary/10 border border-primary/5 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/25 group-hover:scale-[1.03] group-hover:border-primary/20 group-hover:-translate-y-1">
        {/* Glow ефект при наведенні */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10" />

        {/* Sparkle effect */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-ping z-20" />

        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className="w-full h-[340px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Нижня лінія акценту */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-full group-hover:translate-y-0" />
      </div>
    </div>
  );
}

// Автоматично імпортуємо всі зображення з папки gallery
const galleryModules = import.meta.glob('/public/gallery/*.{jpg,jpeg,png,webp,gif}', { eager: true, as: 'url' });

// Перетворюємо на масив URL
const galleryImages = Object.entries(galleryModules).map(([path, url]) => ({
  src: url as string,
  alt: path.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'Листівка'
}));

export function MomentsGallerySection() {
  // Якщо зображень немає - не показуємо секцію
  if (galleryImages.length === 0) {
    return null;
  }

  // Дублюємо зображення для безперервної прокрутки
  const midPoint = Math.ceil(galleryImages.length / 2);
  const firstRow = [...galleryImages.slice(0, midPoint), ...galleryImages.slice(0, midPoint)];
  const secondRow = [...galleryImages.slice(midPoint), ...galleryImages.slice(midPoint)];

  return (
    <section className="py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Заголовок */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          {/* Головний заголовок */}
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#6B5CE7] mb-4">
            Моменти, які хочеться запам'ятати
          </h2>

          {/* Підзаголовок */}
          <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto">
            Це не просто подарунок, а момент, який проживають разом.
          </p>
        </div>
      </div>

      {/* Галерея на всю ширину екрану */}
      <div className="relative">
        {/* Градієнти затухання - фіксовані по краях */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 lg:w-24 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 lg:w-24 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

        {/* Перший ряд галереї - рух вліво */}
        <div className="mb-6 md:mb-8">
          <div className="flex gap-4 md:gap-6 animate-scroll-left hover:[animation-play-state:paused]">
            {firstRow.map((image, index) => (
              <GalleryImage key={`row1-${index}`} {...image} />
            ))}
          </div>
        </div>

        {/* Другий ряд галереї - рух вправо */}
        {secondRow.length > 0 && (
          <div>
            <div className="flex gap-4 md:gap-6 animate-scroll-right hover:[animation-play-state:paused]">
              {secondRow.map((image, index) => (
                <GalleryImage key={`row2-${index}`} {...image} />
              ))}
            </div>
          </div>
        )}
      </div>

    </section>
  );
}
