import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, HeartCrack, Flower2, MicOff } from 'lucide-react';
const PainPoint = ({
  icon: Icon,
  text,
  delay




}: {icon: any;text: string;delay: number;}) =>
<motion.div
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
    delay,
    duration: 0.5
  }}
  className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-pink-100">

    <div className="p-3 bg-pink-50 rounded-full text-pink-500">
      <Icon size={24} />
    </div>
    <p className="text-lg text-gray-700 font-medium">{text}</p>
  </motion.div>;

export function PainSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{
              opacity: 0
            }}
            whileInView={{
              opacity: 1
            }}
            viewport={{
              once: true
            }}
            className="space-y-6">

            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Ти ж це знаєш.
            </h2>
            <div className="w-20 h-1 bg-[#6B5CE7] rounded-full mb-8" />

            <div className="space-y-4">
              <PainPoint
                icon={HeartCrack}
                text="«Я тебе люблю» звучить занадто просто"
                delay={0.1} />

              <PainPoint
                icon={Flower2}
                text="Квіти — гарно, але порожньо"
                delay={0.2} />

              <PainPoint
                icon={MessageCircle}
                text="Повідомлення в месенджері зникне завтра"
                delay={0.3} />

              <PainPoint
                icon={MicOff}
                text="А слова… кожного разу застрягають десь усередині"
                delay={0.4} />

            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            whileInView={{
              opacity: 1,
              scale: 1
            }}
            viewport={{
              once: true
            }}
            className="bg-white p-6 md:p-8 rounded-3xl text-center relative overflow-hidden border-2 border-purple-100 shadow-xl">

            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-60" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-pink-100 rounded-full blur-3xl opacity-60" />

            {/* Top decorative accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent" />

            <div className="relative z-10 max-w-2xl mx-auto">
              {/* Animated emoji */}
              <motion.span
                animate={{
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="text-5xl mb-4 block">

                💭
              </motion.span>

              {/* Quote with decorative marks */}
              <div className="relative">
                <span className="absolute -top-2 -left-2 text-4xl text-purple-200 font-serif leading-none">
                  "
                </span>
                <p className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed px-6">
                  Хочеться сказати більше. Глибше. Щиро.
                  <br className="my-2 block" />
                  <span className="text-[#6B5CE7] font-semibold">
                    Але як — щоб не банально і не ніяково?
                  </span>
                </p>
                <span className="absolute -bottom-2 -right-2 text-4xl text-pink-200 font-serif leading-none">
                  "
                </span>
              </div>
            </div>

            {/* Bottom decorative accent */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>);

}