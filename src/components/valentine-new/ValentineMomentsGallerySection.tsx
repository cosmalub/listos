import { useState } from "react";
import { motion } from "framer-motion";

interface GalleryImageProps {
    src: string;
    alt: string;
    index: number;
}

function GalleryImage({ src, alt, index }: GalleryImageProps) {
    const [imageError, setImageError] = useState(false);

    // Randomize rotation slightly for that "scattered" look (deterministic based on index)
    const rotation = index % 2 === 0 ? 2 : -2;

    if (imageError) return null;

    return (
        <div className="flex-shrink-0 w-[280px] p-4 group cursor-pointer">
            <div
                className="bg-white p-3 pb-6 rounded-sm shadow-md border border-gray-100 transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-0 group-hover:z-10 group-hover:shadow-xl"
                style={{ transform: `rotate(${rotation}deg)` }}
            >
                {/* Photo Area */}
                <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                    <img
                        src={src}
                        alt={alt}
                        onError={() => setImageError(true)}
                        className="w-full h-full object-cover filter sepia-[0.1] contrast-[0.95] group-hover:sepia-0 group-hover:contrast-100 transition-all duration-500"
                        loading="lazy"
                    />
                    {/* Subtle Grain/Texture overlay */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
                </div>

                {/* Decorative 'Tape' */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-yellow-50/80 rotate-1 shadow-sm backdrop-blur-[1px] opacity-80" />
            </div>
        </div>
    );
}

// Automatically import all images from gallery folder
const galleryModules = import.meta.glob('/public/gallery/*.{jpg,jpeg,png,webp,gif}', { eager: true, as: 'url' });

// Convert to array
const galleryImages = Object.entries(galleryModules).map(([path, url]) => ({
    src: url as string,
    alt: path.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'Листівка'
}));

export function ValentineMomentsGallerySection() {
    if (galleryImages.length === 0) return null;

    // Split and duplicate for infinite scroll
    const midPoint = Math.ceil(galleryImages.length / 2);
    // Ensure we have enough items for scrolling even if few images exist
    const row1Base = galleryImages.slice(0, midPoint);
    const row2Base = galleryImages.slice(midPoint);

    // Duplicate multiple times if needed to fill screen, but at least double for loop
    const firstRow = [...row1Base, ...row1Base, ...row1Base, ...row1Base];
    const secondRow = [...row2Base, ...row2Base, ...row2Base, ...row2Base];

    return (
        <section className="py-24 bg-rose-50/30 relative overflow-hidden">
            {/* Background ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-100/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10 mb-12">
                <div className="text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-gray-900 drop-shadow-sm mb-6"
                    >
                        Моменти, які хочеться <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">
                            запам'ятати
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                        Це не просто подарунок, а момент, який проживають разом.
                    </motion.p>
                </div>
            </div>

            {/* Moving Rows */}
            <div className="relative w-full overflow-hidden space-y-8">
                <div
                    className="flex animate-scroll-left hover:[animation-play-state:paused] w-max"
                    style={{ animationDuration: '120s' }}
                >
                    {firstRow.map((image, index) => (
                        <GalleryImage key={`r1-${index}`} {...image} index={index} />
                    ))}
                </div>

                {/* Row 2 - Right */}
                <div
                    className="flex animate-scroll-right hover:[animation-play-state:paused] w-max"
                    style={{ animationDuration: '120s' }}
                >
                    {secondRow.map((image, index) => (
                        <GalleryImage key={`r2-${index}`} {...image} index={index} />
                    ))}
                </div>
            </div>

            {/* Side Vignettes for smooth fade */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-rose-50/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-rose-50/80 to-transparent z-20 pointer-events-none" />

        </section>
    );
}
