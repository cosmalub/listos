import React from 'react';
import { motion } from 'framer-motion';

export function InsightSection() {
  return (
    <section className="py-32 px-4 relative overflow-hidden bg-[#0A0A0A]">
      {/* Abstract Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-900/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-rose-900/50 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-tight">
              Любов — це не фраза. <br />
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-purple-400">
                Любов — це те, що залишається.
              </span>
            </h2>
          </div>

          <div className="flex justify-center">
            <div className="h-20 w-[1px] bg-gradient-to-b from-white/50 to-transparent" />
          </div>

          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto">
            Не ще один подарунок. Не черговий жест.<br />
            <span className="text-white font-medium">Момент, який можна зберегти назавжди.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
