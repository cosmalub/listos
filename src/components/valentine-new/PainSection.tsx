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
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-background via-background to-muted/50 overflow-hidden">
      {/* Subtle background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm md:text-base font-medium text-primary uppercase tracking-[0.2em] mb-4">
            Чому звичайного недостатньо
          </p>
        </div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-card p-6 rounded-2xl shadow-sm border border-border hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-lg text-card-foreground font-medium">
                  {point.text}{' '}
                  <span className="text-muted-foreground font-normal">{point.subtext}</span>
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
