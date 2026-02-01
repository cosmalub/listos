import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrderDialog } from "@/components/order/OrderDialogContext";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  { id: 0, text: "Мама плакала від щастя...", author: "Олена", image: "/lovable-uploads/review-iryna.png" },
  { id: 1, text: "Найкращий подарунок у житті", author: "Андрій", image: "/lovable-uploads/review-artem.png" },
  { id: 2, text: "Замовляла вже тричі!", author: "Софія", image: "/lovable-uploads/review-miroslav.png" },
  { id: 3, text: "Дуже зворушливо і щиро", author: "Марія", image: "/lovable-uploads/review-oleksandr.png" },
  { id: 4, text: "Всі гості були в захваті", author: "Дмитро", image: "/lovable-uploads/review-vitalii.png" },
  { id: 5, text: "Це просто магія!", author: "Вікторія", image: "/lovable-uploads/review-iryna.png" },
  { id: 6, text: "Не очікував такого ефекту", author: "Максим", image: "/lovable-uploads/review-artem.png" },
  { id: 7, text: "Подарунок, що запам'ятається", author: "Ірина", image: "/lovable-uploads/review-miroslav.png" },
  { id: 8, text: "Краще за будь-які квіти", author: "Олексій", image: "/lovable-uploads/review-oleksandr.png" },
  { id: 9, text: "Справжні емоції!", author: "Наталя", image: "/lovable-uploads/review-vitalii.png" },
  { id: 10, text: "Рекомендую всім друзям", author: "Тарас", image: "/lovable-uploads/review-iryna.png" },
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
    <div className="flex flex-col items-center gap-6 mt-4 w-full max-w-2xl mx-auto">

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
              className="w-14 h-14 md:w-16 md:h-16 rounded-full border-[3px] border-white bg-gray-200 overflow-hidden cursor-pointer relative shadow-lg transition-all duration-300"
              onClick={() => setActiveIndex(i)}
            >
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 5}&mouth=smile,default&eyes=default,happy,side`}
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

      {/* Animated Review Screenshot */}
      <div className="h-40 md:h-56 w-full flex justify-center items-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 max-w-lg"
          >
            <img
              src={TESTIMONIALS[activeIndex].image}
              alt={`Відгук від ${TESTIMONIALS[activeIndex].author}`}
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}


export function HeroSectionExperiment() {
  const { openOrderDialog } = useOrderDialog();

  return (
    <section className="relative flex items-center overflow-hidden bg-gradient-to-b from-[#FFE4EC] via-[#FFF0F5] to-white">

      <div className="container mx-auto px-4 pt-44 pb-0 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main content */}
          <div className="text-center mb-6 mt-0">
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
              Твої слова стануть піснею. Твоя пісня — подарунком, який неможливо забути.
            </motion.p>
          </div>

          {/* CTA buttons - ONLY ONE MAIN BUTTON */}


          {/* Interactive Social Proof */}
          <InteractiveReviewBadge />
        </div>
      </div>
    </section>
  );
}
