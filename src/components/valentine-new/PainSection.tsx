import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { HeartCrack, Flower2, MessageCircle, MicOff, type LucideIcon } from 'lucide-react';

interface PainPoint {
  icon: LucideIcon;
  text: string;
  subtext: string;
}

const painPoints: PainPoint[] = [
  {
    icon: HeartCrack,
    text: '"Я тебе люблю"',
    subtext: 'звучить занадто просто',
  },
  {
    icon: Flower2,
    text: 'Квіти — гарно,',
    subtext: 'але порожньо',
  },
  {
    icon: MessageCircle,
    text: 'Повідомлення',
    subtext: 'зникне завтра',
  },
  {
    icon: MicOff,
    text: 'Слова застрягають',
    subtext: 'десь усередині',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function PainSection() {
  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-rose-50/60 to-purple-50/40 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        {/* Section header - matching Hero style */}
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-gray-400 uppercase tracking-[0.2em] mb-4"
          >
            Знайома ситуація?
          </motion.p>
        </div>

        {/* Cards grid - cleaner, more editorial style */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group flex items-start gap-5"
              >
                {/* Icon - simple, elegant */}
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-50 to-purple-50 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                  <Icon className="w-6 h-6 text-rose-400" strokeWidth={1.5} />
                </div>
                
                {/* Text - larger, editorial */}
                <div className="pt-2">
                  <p className="text-xl md:text-2xl font-medium text-gray-900 leading-snug">
                    {point.text}
                  </p>
                  <p className="text-xl md:text-2xl font-light text-gray-400 leading-snug">
                    {point.subtext}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
