import React from 'react';
import { motion } from 'framer-motion';

export function InsightSection() {
  return (
    <section className="py-28 px-4 bg-[#6B5CE7] text-white text-center relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 opacity-20 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main statement */}
          <div className="space-y-2">
            <p className="text-2xl md:text-3xl font-medium text-purple-200">
              Любов — це не фраза.
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Любов — це те, що залишається.
            </h2>
          </div>

          {/* Decorative line */}
          <div className="flex justify-center">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>

          {/* Supporting text */}
          <div className="space-y-1 text-lg md:text-xl text-purple-200/90 font-light">
            <p>Не ще один подарунок.</p>
            <p>Не ще один жест.</p>
          </div>

          {/* Conclusion */}
          <p className="text-2xl md:text-3xl font-semibold text-white pt-2">
            А момент, який можна зберегти.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
