import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PainPoint = ({ text, index }: { text: React.ReactNode, index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  // Smooth animation: 0→1→0
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -40]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y }}
      className="h-[70vh] flex items-center justify-center px-8 sticky top-0"
    >
      <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center leading-tight max-w-3xl">
        {text}
      </h3>
    </motion.div>
  );
};

export function PainSection() {
  return (
    <section className="relative bg-gradient-to-b from-rose-50/30 via-white to-[#FAFAFA] overflow-visible">

      {/* Bridge gradient from Hero */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-rose-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Abstract Background Shadows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-rose-100/30 rounded-full blur-[100px] mix-blend-multiply" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-[100px] mix-blend-multiply" />
      </div>

      <div className="relative z-10">
        <PainPoint
          index={0}
          text={
            <span>
              "Я тебе люблю" <br />
              <span className="text-gray-400 font-normal">звучить занадто просто.</span>
            </span>
          }
        />
        <PainPoint
          index={1}
          text={
            <span>
              Паперові листівки <br />
              <span className="text-gray-400 font-normal">губляться в шухлядах.</span>
            </span>
          }
        />
        <PainPoint
          index={2}
          text={
            <span>
              А важливі слова <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">
                забуваються вже на ранок.
              </span>
            </span>
          }
        />
      </div>
    </section>
  );
}
