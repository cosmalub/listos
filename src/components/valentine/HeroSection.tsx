import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { useOrderDialog } from '@/components/order/OrderDialogContext';
// Floating heart decoration component
const FloatingHeart = ({
  delay,
  duration,
  className
}: {
  delay: number;
  duration: number;
  className: string;
}) => <motion.div initial={{
  opacity: 0,
  y: 0
}} animate={{
  opacity: [0, 1, 1, 0],
  y: [0, -100],
  x: [0, Math.random() * 40 - 20]
}} transition={{
  duration,
  delay,
  repeat: Infinity,
  repeatDelay: Math.random() * 3
}} className={`absolute ${className}`}>

    <Heart className="text-pink-300" fill="currentColor" size={20} />
  </motion.div>;
export function HeroSection() {
  const {
    openOrderDialog
  } = useOrderDialog();
  return <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-16 px-4">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100" />

      {/* Animated gradient blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-40 right-10 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      {/* Floating hearts decoration */}
      <FloatingHeart delay={0} duration={6} className="bottom-1/4 left-1/4" />
      <FloatingHeart delay={1} duration={7} className="bottom-1/3 right-1/4" />
      <FloatingHeart delay={2} duration={5} className="bottom-1/2 left-1/3" />
      <FloatingHeart delay={3} duration={8} className="bottom-1/4 right-1/3" />

      <div className="relative max-w-6xl mx-auto text-center z-20">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="max-w-4xl mx-auto">

          {/* Badge with sparkle */}
          <motion.div initial={{
          scale: 0.9,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} transition={{
          delay: 0.2,
          duration: 0.5
        }} className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200 text-pink-600 text-sm font-semibold mb-8 shadow-sm">

            <Sparkles size={16} className="text-pink-500" />
            <span>Спеціальна пропозиція до 14 лютого</span>
            <Sparkles size={16} className="text-purple-500" />
          </motion.div>

          {/* Main heading with enhanced styling */}
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3,
          duration: 0.8
        }} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">

            <span className="text-[#6B5CE7]">Скажи "я тебе люблю"</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B5CE7] via-[#FF69B4] to-[#6B5CE7] animate-gradient">
              як ніколи раніше
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.5,
          duration: 0.8
        }} className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">

            Персональна паперова листівка з піснею всередині —{' '}
            <span className="text-[#6B5CE7] font-semibold">
              для слів, які не вміщаються в просте «люблю»
            </span>
          </motion.p>

          {/* CTA Button with enhanced styling */}
            <motion.button initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.7,
          duration: 0.5
        }} whileHover={{
          scale: 1.05,
          boxShadow: '0 20px 40px rgba(107, 92, 231, 0.3)'
        }} whileTap={{
          scale: 0.95
        }} onClick={() => openOrderDialog('hero-valentine', 'Створити листівку до 14 лютого')} className="bg-gradient-to-r from-[#6B5CE7] to-[#8B7CE7] text-white text-lg md:text-xl font-bold py-5 px-12 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3">

              <Heart size={24} fill="currentColor" />
              Створити листівку до 14 лютого
            </motion.button>

          {/* Trust indicator */}
          <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.9,
          duration: 0.5
        }} className="mt-8 text-sm text-gray-500 flex items-center justify-center gap-2">

            
            
          </motion.p>
        </motion.div>
      </div>
    </section>;
}