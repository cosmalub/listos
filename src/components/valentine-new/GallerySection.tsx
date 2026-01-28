import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
const galleryImages = [
{
  url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop',
  alt: 'Romantic moment with flowers',
  caption: 'Перша річниця',
  rotate: -2
},
{
  url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop',
  alt: 'Love letter and coffee',
  caption: 'Ранок разом',
  rotate: 1
},
{
  url: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop',
  alt: 'Couple holding hands',
  caption: 'Теплі обійми',
  rotate: -1
},
{
  url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800&auto=format&fit=crop',
  alt: 'Couple laughing',
  caption: 'Щирі емоції',
  rotate: 2
},
{
  url: 'https://images.unsplash.com/photo-1621621667797-e06afc217fb0?q=80&w=800&auto=format&fit=crop',
  alt: 'Gift box',
  caption: 'Особливий подарунок',
  rotate: -1
},
{
  url: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?q=80&w=800&auto=format&fit=crop',
  alt: 'Sunset silhouette',
  caption: 'Наші мрії',
  rotate: 1
}];

export function GallerySection() {
  return (
    <section className="py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">

            Моменти, які хочеться запам'ятати
          </motion.h2>
          <motion.p
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: 0.1
            }}
            className="text-xl text-gray-600 max-w-2xl mx-auto">

            Це не просто подарунок, а момент, який проживають разом.
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {galleryImages.map((image, index) =>
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 40
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: index * 0.1
            }}
            whileHover={{
              scale: 1.03,
              rotate: 0,
              zIndex: 10,
              transition: {
                duration: 0.3
              }
            }}
            className="relative group"
            style={{
              rotate: image.rotate
            }}>

              {/* Polaroid-style card */}
              <div className="bg-white p-4 pb-12 rounded-sm shadow-lg border border-gray-100 transform transition-transform duration-300 group-hover:shadow-2xl">
                <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-4 relative">
                  <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover filter sepia-[0.1] contrast-[0.9] group-hover:sepia-0 group-hover:contrast-100 transition-all duration-500" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Handwritten-style caption */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <p className="font-handwriting text-gray-600 text-lg font-medium group-hover:text-[#6B5CE7] transition-colors">
                    {image.caption}
                  </p>
                </div>

                {/* Decorative tape effect */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-yellow-100/80 rotate-1 shadow-sm backdrop-blur-[1px]" />
              </div>

              {/* Like button overlay */}
              <motion.div
              initial={{
                opacity: 0,
                scale: 0.8
              }}
              whileHover={{
                opacity: 1,
                scale: 1
              }}
              className="absolute top-6 right-6 bg-white/90 p-2 rounded-full shadow-md text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                <Heart size={20} fill="currentColor" />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}