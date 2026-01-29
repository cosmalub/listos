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
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function PainSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#FAFAFA] overflow-hidden">
      {/* Background Decor - matching HowItWorks */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-100/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-wider text-rose-500 uppercase block"
          >
            Знайома ситуація?
          </motion.span>
        </div>

        {/* Cards grid - HowItWorks style */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-rose-100 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  {/* Icon container - matching HowItWorks */}
                  <div className="flex-shrink-0 p-3 bg-rose-50 rounded-2xl">
                    <Icon className="w-6 h-6 text-rose-500" />
                  </div>
                  
                  {/* Text */}
                  <div className="pt-1">
                    <p className="text-lg font-semibold text-gray-900">
                      {point.text}
                    </p>
                    <p className="text-gray-600 font-normal">
                      {point.subtext}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
