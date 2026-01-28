import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Heart } from 'lucide-react';

export function WhoIsThisForSection() {
  const points = [
    'Для тих, хто любить, але не вміє красиво говорити',
    'Для тих, хто боїться банальності',
    'Для тих, хто хоче справжній момент, а не формальність',
    'Для тих, кому важливо, щоб це запам’яталося'
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-[#2D243F] to-[#1A1625] text-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <Heart size={16} className="text-rose-400 fill-rose-400" />
            <span className="text-sm font-medium text-white/80">Ідеальний метч</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Для кого це <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-400">14 лютого</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {points.map((point, i) =>
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex items-start gap-4 p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="mt-1 p-2 rounded-full bg-gradient-to-br from-rose-500/20 to-purple-500/20 group-hover:from-rose-500/30 group-hover:to-purple-500/30 transition-colors">
                <CheckCircle2 className="text-rose-400" size={20} />
              </div>
              <span className="text-lg font-medium text-white/90 leading-relaxed">{point}</span>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-2xl md:text-3xl font-serif italic text-white/80">
            "Якщо це про тебе — ти тут не випадково."
          </p>
        </motion.div>
      </div>
    </section>
  );
}