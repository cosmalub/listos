import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useOrderDialog } from '@/components/order/OrderDialogContext';
export function FinalCTASection() {
  const {
    openOrderDialog
  } = useOrderDialog();
  return <section className="py-24 px-4 bg-gradient-to-b from-pink-50 to-white text-center">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{
        scale: 0.9,
        opacity: 0
      }} whileInView={{
        scale: 1,
        opacity: 1
      }} viewport={{
        once: true
      }} className="bg-white p-8 md:p-16 rounded-[3rem] shadow-2xl border border-pink-100 relative overflow-hidden">

          {/* Background hearts */}
          <Heart className="absolute top-10 left-10 text-pink-100 w-24 h-24 -rotate-12" fill="currentColor" />

          <Heart className="absolute bottom-10 right-10 text-purple-100 w-32 h-32 rotate-12" fill="currentColor" />


          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-[#6B5CE7] mb-6">
              ❤️ 14 лютого буває раз на рік.
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              А такі слова — не щодня в житті.
              <br />
              <span className="font-bold text-[#6B5CE7]">
                Скажи їх так, щоб вони залишилися.
              </span>
            </p>

            <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} onClick={() => openOrderDialog('final-cta-valentine', 'Створити листівку з піснею до 14 лютого')} className="bg-[#6B5CE7] text-white text-lg md:text-xl font-bold py-5 px-12 rounded-full shadow-xl hover:shadow-2xl hover:bg-[#5a4bd1] transition-all duration-300 flex items-center gap-3 mx-auto">

               Створити листівку з піснею до 14 лютого
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>;
}