import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { useOrderDialog } from '@/components/order/OrderDialogContext';

export function FinalCTASection() {
  const { openOrderDialog } = useOrderDialog();

  return (
    <section className="py-24 px-4 bg-[#FAFAFA] overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white p-12 md:p-20 rounded-[3rem] shadow-2xl border border-rose-100 relative overflow-hidden text-center"
        >
          {/* Decorative Hearts from Original Design */}
          <Heart className="absolute -top-2 left-4 sm:top-10 sm:left-10 text-pink-100 w-16 h-16 sm:w-24 sm:h-24 -rotate-12" fill="currentColor" />
          <Heart className="absolute -bottom-4 right-2 sm:bottom-10 sm:right-10 text-purple-100 w-20 h-20 sm:w-32 sm:h-32 rotate-12" fill="currentColor" />

          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-gray-900 drop-shadow-sm">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">14 лютого</span> <br className="hidden md:block" />
              буває раз на рік.
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              А такі слова — не щодня в житті. <br />
              <span className="font-bold text-gray-900">Скажи їх так, щоб вони залишилися.</span>
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openOrderDialog('final-cta-valentine', 'Створити листівку')}
              className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white text-base sm:text-xl font-bold py-3 px-6 sm:py-5 sm:px-10 rounded-full shadow-lg hover:shadow-rose-500/40 transition-all"
            >
              <span>Створити листівку</span>
              <ArrowRight size={20} className="sm:w-6 sm:h-6" />
            </motion.button>

            <p className="text-sm text-gray-400 mt-6">
              * Замов до 10 лютого, щоб гарантовано отримати до свята
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}