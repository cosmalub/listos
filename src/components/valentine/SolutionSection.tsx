import React from 'react';
import { motion } from 'framer-motion';
import { Music, PenTool, Heart } from 'lucide-react';
const FeatureCard = ({ icon: Icon, title, description, delay }: any) =>
<motion.div
  initial={{
    opacity: 0,
    y: 20
  }}
  whileInView={{
    opacity: 1,
    y: 0
  }}
  viewport={{
    once: true
  }}
  transition={{
    delay
  }}
  className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow border border-purple-50">

    <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-[#6B5CE7] mb-6">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>;

export function SolutionSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Листосик — це листівка, <br />
            <span className="text-[#6B5CE7]">в якій живе пісня</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={Music}
            title="Фізична + Цифрова"
            description="Ти створюєш справжню фізичну листівку, яку можна потримати в руках, а всередині — персональна пісня, створена з твоїх слів."
            delay={0.1} />

          <FeatureCard
            icon={PenTool}
            title="Без мук творчості"
            description="Без віршів. Без «я не вмію». Без страху зробити щось не так. Ми перетворимо твої думки на мистецтво."
            delay={0.2} />

          <FeatureCard
            icon={Heart}
            title="Ти — співавтор"
            description="Ти — автор ідеї та почуттів. Листосик — твій надійний помічник поруч, щоб допомогти оформити це красиво."
            delay={0.3} />

        </div>

        <div className="text-center">
          <motion.button
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95
            }}
            className="bg-[#6B5CE7] text-white text-lg font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all">

            💌 Спробувати створити свою листівку
          </motion.button>
        </div>
      </div>
    </section>);

}