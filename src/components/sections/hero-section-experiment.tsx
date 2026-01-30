import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrderDialog } from "@/components/order/OrderDialogContext";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  { id: 0, text: "Мама плакала від щастя...", author: "Олена" },
  { id: 1, text: "Найкращий подарунок у житті", author: "Андрій" },
  { id: 2, text: "Замовляла вже тричі!", author: "Софія" },
  { id: 3, text: "Дуже зворушливо і щиро", author: "Марія" },
  { id: 4, text: "Всі гості були в захваті", author: "Дмитро" },
  { id: 5, text: "Це просто магія!", author: "Вікторія" },
  { id: 6, text: "Не очікував такого ефекту", author: "Максим" },
];

// Interactive review badge with avatars
function InteractiveReviewBadge() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 2500); // Чуть быстрее анимация
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 mt-10 w-full max-w-lg mx-auto">
      
      {/* Badge + Avatars Row */}
      <div className="flex flex-col items-center gap-3 w-full">
        
        {/* Avatars Row - Expanded */}
        <div className="flex justify-center -space-x-3 py-2 w-full overflow-hidden px-4">
          {TESTIMONIALS.map((_, i) => (
            <motion.div 
              key={i}
              animate={{ 
                scale: activeIndex === i ? 1.3 : 1,
                zIndex: activeIndex === i ? 20 : 10 - i, // Правильный z-index для перекрытия
                opacity: activeIndex === i ? 1 : 0.7,
                y: activeIndex === i ? -5 : 0
              }}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border-[3px] border-white bg-gray-200 overflow-hidden cursor-pointer relative shadow-lg transition-all duration-300"
              onClick={() => setActiveIndex(i)}
            >
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 5}`} // Другой сид для разнообразия
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
              {activeIndex === i && (
                <motion.div 
                  layoutId="active-ring"
                  className="absolute inset-0 border-[3px] border-[#9370DB] rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-gray-100 shadow-sm mt-1">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
          </div>
          <span className="text-sm text-gray-600 font-medium">500+ задоволених клієнтів</span>
        </div>
      </div>

      {/* Animated Testimonial Card - Enhanced */}
      <div className="h-24 w-full flex justify-center items-start">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeIndex}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white/95 backdrop-blur-xl px-6 py-4 rounded-[20px] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-sm text-center w-full"
          >
            <p className="text-base text-gray-800 italic mb-1.5 leading-snug">"{TESTIMONIALS[activeIndex].text}"</p>
            <p className="text-xs text-[#9370DB] font-bold tracking-wide uppercase">— {TESTIMONIALS[activeIndex].author}</p>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}


export function HeroSectionExperiment() {
  const { openOrderDialog } = useOrderDialog();
  
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-[#FFF5F5] to-white">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#E6E6FA]/40 to-[#FFD1DC]/30 blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-[#FFD1DC]/40 to-[#FFB7C5]/30 blur-[100px]" 
        />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main content */}
          <div className="text-center mb-12 mt-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight"
            >
              Перетвори почуття <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A5ACD] via-[#9370DB] to-[#FF85A2]">
                на музичну листівку
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Скажи «дякую», «кохаю» чи «вибач» — а Листосик створить пісню 
              і надрукує листівку з QR-кодом.
            </motion.p>
          </div>

          {/* CTA buttons - ONLY ONE MAIN BUTTON */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col items-center justify-center mb-8"
          >
            <Button
              onClick={() => openOrderDialog('hero-experiment', 'Почати створення')}
              className="h-auto text-xl px-12 py-6 rounded-full bg-gradient-to-r from-[#6A5ACD] to-[#9370DB] hover:from-[#5A4ABD] hover:to-[#8360CB] text-white shadow-xl hover:shadow-[#6A5ACD]/30 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 font-bold w-full sm:w-auto"
            >
              Почати створення
            </Button>
          </motion.div>

          {/* Interactive Social Proof */}
          <InteractiveReviewBadge />
        </div>
      </div>
    </section>
  );
}
