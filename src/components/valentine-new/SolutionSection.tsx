import React from 'react';
import { motion } from 'framer-motion';
import { Music, PenTool, Heart, Sparkles, ScanLine } from 'lucide-react';
import { useOrderDialog } from '@/components/order/OrderDialogContext';

export function SolutionSection() {
  const { openOrderDialog } = useOrderDialog();

  return (
    <section className="py-32 px-4 bg-white relative overflow-hidden">
      {/* Background Ambience - More subtle and magical */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-tr from-rose-50/50 to-purple-50/50 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight mb-6"
          >
            Листівка, в якій <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">
              живе пісня.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 font-light max-w-2xl mx-auto"
          >
            Ваш персональний дизайн. Пісня, написана спеціально про вашу історію.
          </motion.p>
        </div>

        {/* CENTERPIECE: The Artistic Composition */}
        <div className="relative min-h-[600px] flex items-center justify-center mb-24">

          {/* The "Sonic Pulse" - Visible, Rhythmic, Powerful */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none -z-10">
            {/* Core Glow */}
            <div className="absolute w-64 h-64 bg-rose-400/20 blur-[50px] rounded-full animate-pulse" />

            {/* Expanding Shockwaves (Filled) */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`wave-${i}`}
                className="absolute rounded-full bg-gradient-to-br from-rose-100/60 to-purple-100/60 mix-blend-multiply"
                initial={{ width: '250px', height: '250px', opacity: 0.8 }}
                animate={{
                  width: ['250px', '700px'],
                  height: ['250px', '700px'],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 1,
                  ease: "easeOut"
                }}
              />
            ))}

            {/* Expanding Rings (Definition) */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute rounded-full border border-rose-300/40"
                initial={{ width: '250px', height: '250px', opacity: 1 }}
                animate={{
                  width: ['250px', '800px'],
                  height: ['250px', '800px'],
                  opacity: [0.8, 0],
                  borderWidth: ['1px', '4px', '0px']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 1,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>

          {/* The Cards: Overlapping & Tilted */}
          <div className="relative w-full max-w-lg h-[400px] flex items-center justify-center">

            {/* Back Card (QR) - Tilted Right, slightly behind or front? Let's put it Front-Right for scanning focus */}
            <motion.div
              initial={{ opacity: 0, rotate: 10, x: 50, y: 10 }}
              whileInView={{ opacity: 1, rotate: 6, x: 40, y: 0 }} // Final state
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute z-20 w-64 h-96 bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center border border-white/50 backdrop-blur-sm"
            >
              {/* Texture/Noise */}
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper.png')] mix-blend-multiply" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-28 h-28 bg-gray-900 rounded-lg mb-6 flex items-center justify-center relative shadow-lg group hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 border border-white/20 rounded opacity-50" />
                  <ScanLine className="text-white w-10 h-10 opacity-80" />
                  {/* Small pulse from QR itself */}
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-lg"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">Зворот</span>
                <p className="text-[10px] text-gray-400 max-w-[120px] text-center">
                  Наведи камеру,<br />і музика заграє
                </p>
              </div>
            </motion.div>

            {/* Front Card (Design) - Tilted Left, slightly behind */}
            <motion.div
              initial={{ opacity: 0, rotate: -10, x: -50, y: -10 }}
              whileInView={{ opacity: 1, rotate: -6, x: -40, y: 0 }} // Final state
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute z-10 w-64 h-96 bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center border border-gray-100"
            >
              {/* Placeholder Design */}
              <div className="absolute inset-4 border border-rose-100 rounded-lg flex flex-col items-center justify-center">
                <Heart className="w-12 h-12 text-rose-200 mb-4" strokeWidth={1} />
                <span className="text-xs text-rose-300 font-handwriting">Ваші найтепліші слова...</span>
              </div>
              <div className="absolute bottom-6 text-[10px] text-gray-300 uppercase tracking-widest">
                Лицьова
              </div>
            </motion.div>

          </div>
        </div>

        {/* Features Grid - Refined */}
        <div className="grid md:grid-cols-3 gap-12 text-center px-4 relative z-20">
          <div className="space-y-4 group">
            <div className="w-14 h-14 mx-auto bg-white shadow-lg rounded-2xl flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform duration-300">
              <Music size={26} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Фізична + Цифрова</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              Справжня листівка в руках. <br />
              Справжня емоція в навушниках.
            </p>
          </div>

          <div className="space-y-4 group">
            <div className="w-14 h-14 mx-auto bg-white shadow-lg rounded-2xl flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform duration-300">
              <PenTool size={26} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Без творчих мук</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              Ми перетворимо ваші думки <br />
              на професійну пісню.
            </p>
          </div>

          <div className="space-y-4 group">
            <div className="w-14 h-14 mx-auto bg-white shadow-lg rounded-2xl flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform duration-300">
              <Heart size={26} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Ваша історія</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              Це не джингл. Це саундтрек <br />
              ваших стосунків.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center relative z-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openOrderDialog('solution-valentine', 'Створити пісню')}
            className="px-10 py-5 bg-gray-900 text-white rounded-full font-bold shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 mx-auto"
          >
            <Sparkles size={18} className="text-purple-300" />
            <span>Створити свою магію</span>
          </motion.button>
        </div>

      </div>
    </section>
  );
}