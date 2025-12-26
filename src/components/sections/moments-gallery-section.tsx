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
      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <div className="text-center mb-12 md:mb-16">
          {/* Головний заголовок */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary bg-clip-text text-transparent">
              Моменти, для яких створюють
            </span>
            <br className="hidden sm:block" />
            <span className="relative inline-block mt-1 md:mt-2">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                разом з Листосиком
              </span>
              {/* Декоративна лінія під текстом */}
              <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                <path 
                  d="M2 8C30 4 60 2 100 4C140 6 170 8 198 4" 
                  stroke="url(#gradient-line)" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  className="animate-pulse"
                />
                <defs>
                  <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          
          {/* Підзаголовок */}
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-6">
            Кожна листівка — це унікальна історія кохання, дружби та вдячності
            <span className="text-primary ml-1">✨</span>
          </p>
        </div>

        {/* Перший ряд галереї - рух вліво */}
        <div className="relative mb-6 md:mb-8 -mx-4 md:mx-0">
          {/* Градієнти для плавного затухання по краях */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 lg:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 lg:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />
          
          <div className="flex gap-4 md:gap-6 animate-scroll-left hover:[animation-play-state:paused] px-4 md:px-0">
            {firstRow.map((image, index) => (
              <GalleryImage key={`row1-${index}`} {...image} />
            ))}
          </div>
        </div>

        {/* Другий ряд галереї - рух вправо */}
        {secondRow.length > 0 && (
          <div className="relative -mx-4 md:mx-0">
            {/* Градієнти для плавного затухання по краях */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 lg:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 lg:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />
            
            <div className="flex gap-4 md:gap-6 animate-scroll-right hover:[animation-play-state:paused] px-4 md:px-0">
              {secondRow.map((image, index) => (
                <GalleryImage key={`row2-${index}`} {...image} />
              ))}
            </div>
          </div>
        )}

        {/* Інтерактивна підказка */}
        <div className="text-center mt-10 md:mt-14">
          <p className="inline-flex items-center gap-3 text-sm text-muted-foreground/70">
            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-pulse" />
            Наведіть на картку, щоб зупинити прокрутку
            <span className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-pulse delay-500" />
          </p>
        </div>
      </div>
    </section>
  );
}
