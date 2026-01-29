import { Truck, Music, FileText, Sparkles, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useOrderDialog } from "@/components/order/OrderDialogContext";
import { motion } from "framer-motion";

export function PricingSection() {
  const { openOrderDialog } = useOrderDialog();
  const features = [
    {
      icon: Music,
      title: "Створення пісні з твоїх слів",
      desc: "ШІ-магія перетворює твій текст на професійний трек"
    },
    {
      icon: Sparkles,
      title: "Персональна веб-сторінка",
      desc: "З візуалізацією, анімацією та твоїм текстом"
    },
    {
      icon: FileText,
      title: "Преміум листівка A6",
      desc: "Дизайнерський картон, якісний друк, QR-код"
    },
    {
      icon: Truck,
      title: "Безкоштовна доставка",
      desc: "Новою Поштою у будь-який куточок України"
    },
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden" id="pricing">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA] to-white" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Подарунок, який <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">неможливо забути</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Ми об'єднали технології та справжні почуття, щоб ти міг подарувати щось більше, ніж просто річ.
              </p>

              <div className="space-y-6">
                {features.map((feature, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#6B5CE7] flex-shrink-0">
                      <feature.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{feature.title}</h4>
                      <p className="text-gray-500">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Pricing Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-300 to-purple-300 blur-3xl opacity-20 transform translate-y-4 scale-105" />

              <div className="relative bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-purple-100 overflow-hidden">
                {/* Top Label */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#6B5CE7] to-[#FF69B4]" />

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Все включено</h3>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">399</span>
                    <span className="text-xl font-medium text-gray-400">грн</span>
                  </div>
                  <p className="text-gray-500">Єдина ціна. Жодних прихованих платежів.</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openOrderDialog('pricing-valentine', 'Почати створення')}
                  className="w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xl font-bold py-5 rounded-2xl shadow-xl hover:shadow-rose-500/40 transition-all flex items-center justify-center gap-3 group mb-6"
                >
                  <span>Створити листівку</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <div className="bg-gray-50 rounded-2xl p-4 text-center">
                  <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                    <Check size={16} className="text-green-500" />
                    100% Гарантія якості
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
