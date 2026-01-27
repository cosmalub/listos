import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
export function WhoIsThisForSection() {
  const points = [
  'Для тих, хто любить, але не вміє красиво говорити',
  'Для тих, хто боїться банальності',
  'Для тих, хто хоче справжній момент, а не формальність',
  'Для тих, кому важливо, щоб це запам’яталося'];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-900 to-[#6B5CE7] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          💬 Для кого це 14 лютого
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-12 text-left">
          {points.map((point, i) =>
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: -20
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: i * 0.1
            }}
            className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">

              <CheckCircle2
              className="text-[#FF69B4] shrink-0 mt-1"
              size={24} />

              <span className="text-lg font-medium">{point}</span>
            </motion.div>
          )}
        </div>

        <p className="text-2xl font-bold italic text-purple-100">
          "Якщо це про тебе — ти тут не випадково."
        </p>
      </div>
    </section>);

}