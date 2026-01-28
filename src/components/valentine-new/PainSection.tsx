import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PainPoint = ({ text, index }: { text: React.ReactNode, index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.5, 0.8], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.8], [50, -50]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="min-h-[40vh] flex items-center justify-center p-8"
    >
      <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 text-center leading-tight tracking-tight max-w-4xl mx-auto">
        {text}
      </h3>
    </motion.div>
  );
};

export function PainSection() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-white via-white to-[#FAFAFA] overflow-hidden">

      {/* Abstract Background Shadows/Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-[120px] mix-blend-multiply" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-[120px] mix-blend-multiply" />

        {/* Shadow Overlay */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.02) 100%)'
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-24 px-4">
          <p className="text-sm md:text-base font-medium text-rose-500 uppercase tracking-[0.2em] mb-4">
            Чому звичайного недостатньо
          </p>
        </div>

        <div className="space-y-0">
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
      </div>
    </section>
  );
}