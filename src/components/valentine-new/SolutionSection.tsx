import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, PenTool, Heart, Sparkles, ScanLine } from 'lucide-react';
import { useOrderDialog } from '@/components/order/OrderDialogContext';

export function SolutionSection() {
  const { openOrderDialog } = useOrderDialog();
  const [cardsExpanded, setCardsExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Різні значення раздвижки для десктопу і мобільного
  const expandedX = isDesktop ? 160 : 100;

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
        <div className="relative min-h-[650px] flex items-center justify-center mb-24">

          {/* Floating Hearts Animation - Emanating FROM the cards in ALL directions */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Soft glow behind cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-200/30 blur-[80px] rounded-full" />

            {/* Hearts rising UP from card area */}
            {[...Array(8)].map((_, i) => {
              const size = 14 + Math.random() * 14;
              const startX = 35 + (i * 4) % 30;
              const endX = (i % 2 === 0 ? -1 : 1) * (30 + Math.random() * 40);
              const duration = 4 + Math.random() * 3;
              const delay = i * 0.7;

              return (
                <motion.div
                  key={`heart-up-${i}`}
                  className="absolute text-rose-400/70"
                  style={{
                    left: `${startX}%`,
                    top: '55%',
                    fontSize: `${size}px`,
                  }}
                  initial={{ y: 0, x: 0, opacity: 0, scale: 0.5 }}
                  animate={{
                    y: [0, -300, -500],
                    x: [0, endX * 0.5, endX],
                    opacity: [0, 1, 0.8, 0],
                    scale: [0.5, 1, 0.8],
                    rotate: [0, (i % 2 === 0 ? 15 : -15)],
                  }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    delay: delay,
                    ease: "easeOut",
                  }}
                >
                  ♥
                </motion.div>
              );
            })}

            {/* Hearts going LEFT from card area */}
            {[...Array(5)].map((_, i) => {
              const size = 12 + Math.random() * 12;
              const startY = 40 + (i * 5) % 20;
              const endY = (i % 2 === 0 ? -1 : 1) * (20 + Math.random() * 30);
              const duration = 4.5 + Math.random() * 2.5;
              const delay = i * 0.8 + 0.3;

              return (
                <motion.div
                  key={`heart-left-${i}`}
                  className="absolute text-rose-300/60"
                  style={{
                    left: '50%',
                    top: `${startY}%`,
                    fontSize: `${size}px`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                  animate={{
                    x: [0, -200, -350],
                    y: [0, endY * 0.5, endY],
                    opacity: [0, 0.9, 0.7, 0],
                    scale: [0.5, 1, 0.7],
                    rotate: [0, -20],
                  }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    delay: delay,
                    ease: "easeOut",
                  }}
                >
                  ♥
                </motion.div>
              );
            })}

            {/* Hearts going RIGHT from card area */}
            {[...Array(5)].map((_, i) => {
              const size = 12 + Math.random() * 12;
              const startY = 40 + (i * 5) % 20;
              const endY = (i % 2 === 0 ? -1 : 1) * (20 + Math.random() * 30);
              const duration = 4.5 + Math.random() * 2.5;
              const delay = i * 0.8 + 0.5;

              return (
                <motion.div
                  key={`heart-right-${i}`}
                  className="absolute text-rose-300/60"
                  style={{
                    left: '50%',
                    top: `${startY}%`,
                    fontSize: `${size}px`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                  animate={{
                    x: [0, 200, 350],
                    y: [0, endY * 0.5, endY],
                    opacity: [0, 0.9, 0.7, 0],
                    scale: [0.5, 1, 0.7],
                    rotate: [0, 20],
                  }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    delay: delay,
                    ease: "easeOut",
                  }}
                >
                  ♥
                </motion.div>
              );
            })}

            {/* Musical notes rising from cards */}
            {[...Array(6)].map((_, i) => {
              const size = 16 + Math.random() * 12;
              const startX = 40 + (i * 4) % 20;
              const endX = (i % 2 === 0 ? -1 : 1) * (40 + Math.random() * 50);
              const duration = 5 + Math.random() * 2;
              const delay = i * 0.9 + 0.2;

              return (
                <motion.div
                  key={`note-${i}`}
                  className="absolute text-purple-400/60"
                  style={{
                    left: `${startX}%`,
                    top: '55%',
                    fontSize: `${size}px`,
                  }}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{
                    y: [0, -250, -450],
                    x: [0, endX * 0.3, endX * 0.8],
                    opacity: [0, 0.8, 0.6, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    delay: delay,
                    ease: "easeOut",
                  }}
                >
                  ♪
                </motion.div>
              );
            })}
          </div>

          {/* The Cards: Overlapping & Tilted - REAL IMAGES with click interaction */}
          <div
            className="relative w-full max-w-xl h-[450px] flex items-center justify-center cursor-pointer"
            onClick={() => setCardsExpanded(!cardsExpanded)}
          >

            {/* Back Card (QR/зворотня) - Behind, tilted right */}
            <motion.div
              initial={{ opacity: 0, rotate: 12, x: 70, y: 15 }}
              animate={{
                opacity: 1,
                rotate: cardsExpanded ? 3 : 8,
                x: cardsExpanded ? expandedX : 60,
                y: cardsExpanded ? 0 : 5
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute z-10 w-64 sm:w-72 md:w-80 h-[360px] sm:h-[420px] md:h-[480px] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden"
            >
              <img
                src="/postcards/valentine-back.png"
                alt="Зворотня сторона листівки з QR-кодом"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Front Card (Design/лицьова) - In front, tilted left */}
            <motion.div
              initial={{ opacity: 0, rotate: -12, x: -70, y: -15 }}
              animate={{
                opacity: 1,
                rotate: cardsExpanded ? -3 : -6,
                x: cardsExpanded ? -expandedX : -55,
                y: 0
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute z-20 w-64 sm:w-72 md:w-80 h-[360px] sm:h-[420px] md:h-[480px] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.18)] overflow-hidden"
            >
              <img
                src="/postcards/valentine-front.jpg"
                alt="Лицьова сторона листівки"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Hint to click */}
            <motion.div
              className="absolute -bottom-2 md:-bottom-32 text-sm text-gray-400 flex items-center gap-1"
              animate={{ opacity: cardsExpanded ? 0 : [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span>Натисни для перегляду</span>
            </motion.div>

          </div>
        </div>

        {/* Features Grid - Refined */}
        <div className="grid md:grid-cols-3 gap-12 text-center px-4 relative z-20">
          <div className="space-y-4 group">
            <div className="w-14 h-14 mx-auto bg-white shadow-lg rounded-2xl flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform duration-300">
              <Music size={26} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">В руках і в серці</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              Листівка, яку тримають в руках. <br />
              Пісня, яку відчувають серцем.
            </p>
          </div>

          <div className="space-y-4 group">
            <div className="w-14 h-14 mx-auto bg-white shadow-lg rounded-2xl flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform duration-300">
              <PenTool size={26} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Без творчих мук</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              Ми допомагаємо сформулювати ваші думки <br />
              і бережно перетворюємо їх на пісню.
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
            className="px-10 py-5 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-full font-bold shadow-xl hover:shadow-rose-500/40 transition-all flex items-center gap-3 mx-auto"
          >
            <Sparkles size={18} className="text-white/80" />
            <span>Створити свою магію</span>
          </motion.button>
        </div>

      </div >
    </section >
  );
}