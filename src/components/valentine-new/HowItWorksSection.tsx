import React from 'react';
import { motion } from 'framer-motion';
import { useOrderDialog } from '@/components/order/OrderDialogContext';
import { Sparkles, MessageCircleHeart, Play, Gift } from 'lucide-react';

const StepCard = ({ number, title, children, icon: Icon, isLast = false }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    className="relative pl-8 md:pl-12 pb-16 last:pb-0"
  >
    {/* Connector Line */}
    {!isLast && (
      <div className="absolute left-[19px] md:left-[22px] top-12 bottom-0 w-0.5 bg-gradient-to-b from-rose-200 to-transparent" />
    )}

    {/* Number/Icon Bubble */}
    <div className="absolute left-0 top-0 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white border-2 border-rose-100 flex items-center justify-center z-10 shadow-sm">
      <span className="text-rose-500 font-bold text-lg">{number}</span>
    </div>

    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-rose-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-rose-50 rounded-2xl text-rose-500">
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <div className="text-gray-600 leading-relaxed">
        {children}
      </div>
    </div>
  </motion.div>
);

export function HowItWorksSection() {
  const { openOrderDialog } = useOrderDialog();

  return (
    <section className="py-24 px-4 bg-[#FAFAFA] relative overflow-hidden" id="how-it-works">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">

          {/* Left: Sticky Title & CTA */}
          <div className="lg:sticky lg:top-32 h-fit space-y-8 text-center lg:text-left">
            <div>
              <span className="text-sm font-bold tracking-wider text-rose-500 uppercase mb-2 block">Простий процес</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Від ідеї до емоції — <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">
                  всього 2 кроки
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
                Ми перетворили складний процес створення студійної пісні на легку гру. Ти керуєш натхненням, ми робимо магію.
              </p>
            </div>

            <div className="p-6 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl inline-block w-full max-w-md">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">Повна вартість</span>
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">249 грн</span>
              </div>
              <p className="text-xs text-gray-500 mb-6 text-left">Все включено: створення, друк, доставка</p>

              <ul className="space-y-3 mb-8 text-sm text-gray-600 text-left">
                <li className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center">
                    <Sparkles size={12} className="text-rose-500" />
                  </div>
                  Доступ до студії без обмежень
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center">
                    <Sparkles size={12} className="text-rose-500" />
                  </div>
                  Друк та безкоштовна доставка
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center">
                    <Sparkles size={12} className="text-rose-500" />
                  </div>
                  Пісня, що залишається назавжди
                </li>
              </ul>
              <button
                onClick={() => openOrderDialog('how-it-works-valentine', 'Купити доступ')}
                className="w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold py-4 rounded-xl hover:shadow-rose-500/40 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>Створити пісню</span>
                <Sparkles size={16} className="text-white/80" />
              </button>
            </div>
          </div>

          {/* Right: Timeline Steps */}
          <div className="relative lg:-mt-6">

            {/* Step 1: Creation (Studio Process) */}
            <StepCard number="1" title="Магія створення" icon={Play}>
              <p className="mb-6">
                Ти відповідаєш на питання — ШІ створює пісню. Створюєш дизайн (фото або генерація) і бачиш результат на екрані.
              </p>
              {/* Video Demo */}
              <div className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-800">
                <video
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                >
                  <source src="/videos/14.mp4#t=0.1" type="video/mp4" />
                  Ваш браузер не підтримує відео.
                </video>
              </div>
            </StepCard>



            {/* Step 2: Result (Video) */}
            <StepCard number="2" title="Емоція в руках" icon={Gift} isLast={true}>
              <p className="mb-6">
                Отримуєш фізичну листівку. Момент вручення, скан QR-коду — і емоції, які неможливо стримати.
              </p>
              {/* Video Demo */}
              <div className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-800">
                <video
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                >
                  <source src="/videos/14-lyst.mp4#t=0.1" type="video/mp4" />
                </video>
              </div>
            </StepCard>
          </div>

        </div>
      </div>
    </section>
  );
}