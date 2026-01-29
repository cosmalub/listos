import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, Play } from 'lucide-react';
import { useOrderDialog } from '@/components/order/OrderDialogContext';

export function HeroSection() {
  const { openOrderDialog } = useOrderDialog();
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-40 pb-32 px-4 bg-white">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center">

        {/* THE GLASS HEART CONTAINER */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="relative flex items-center justify-center"
        >
          {/* Heart Shape SVG Background */}
          <div className="absolute inset-0 flex items-center justify-center drop-shadow-2xl">
            <motion.svg
              viewBox="0 0 512 512"
              className="w-[850px] h-[850px]"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                fill="none"
                stroke="#fecdd3"
                strokeWidth="3"
                d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
              />
            </motion.svg>

          </div>

          {/* Text Content - Positioned visually inside the heart */}
          <div className="relative z-10 flex flex-col items-center text-center pt-16 pb-12 px-12 max-w-2xl -translate-y-8">

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-gray-900 drop-shadow-sm mb-6"
            >
              Скажи <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">"Я кохаю"</span> <br />
              так, щоб це запам'яталось.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-gray-600 leading-relaxed font-light mb-8 max-w-lg mx-auto"
            >
              Ваша історія кохання, перетворена на справжню, живу листівку, що звучить.
            </motion.p>
          </div>
        </motion.div>

        {/* CTA Group - Moved Outside & Below Heart with increased margin */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 mt-24 relative z-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openOrderDialog('hero-valentine', 'Створити листівку')}
            className="px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-rose-500/40 transition-shadow"
          >
            Створити листівку
          </motion.button>
        </motion.div>

        {/* Social Proof - Moved Below Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-3 mt-8 opacity-80"
        >
          <div className="flex -space-x-3">
            <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
              <img src="/avatars/couple1.jpg" alt="couple" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
              <img src="/avatars/couple2.jpg" alt="couple" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
              <img src="/avatars/couple3.jpg" alt="couple" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
              <img src="/avatars/couple4.jpg" alt="couple" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
              <img src="/avatars/couple5.jpg" alt="couple" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map(s => <span key={s}>★</span>)}
            </div>
            <span><span className="font-bold text-gray-900">500+</span> щасливих історій</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}