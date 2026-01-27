import React from 'react';
import { motion } from 'framer-motion';
export function InsightSection() {
  return (
    <section className="py-24 px-4 bg-[#6B5CE7] text-white text-center relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 opacity-20 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
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
            duration: 0.8
          }}>

          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            💡 Любов — це не фраза.
            <br />
            Любов — це те, що залишається.
          </h2>

          <div className="text-xl md:text-2xl text-purple-100 space-y-4 font-medium">
            <p>Не ще один подарунок.</p>
            <p>Не ще один жест.</p>
            <p className="text-3xl md:text-4xl text-white font-bold pt-4">
              А момент, який можна зберегти. ✨
            </p>
          </div>
        </motion.div>
      </div>
    </section>);

}