import React from 'react';
import { motion } from 'framer-motion';
import { useOrderDialog } from '@/components/order/OrderDialogContext';
import { Sparkles, Play, Gift } from 'lucide-react';
import postcardScanImage from "@/assets/postcard-scan.png";

const StepCard = ({ number, title, children, icon: Icon, isLast = false }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="relative pl-8 md:pl-12 pb-16 last:pb-0"
    >
        {/* Connector Line */}
        {!isLast && (
            <div className="absolute left-[20px] top-12 bottom-8 w-0.5 border-l-2 border-dashed border-[#B8B3FF]/30" />
        )}

        {/* Number/Icon Bubble */}
        <div className="absolute left-0 top-0 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white border-2 border-[#B8B3FF] flex items-center justify-center z-10 shadow-sm">
            <span className="text-primary font-bold text-lg">{number}</span>
        </div>

        {/* Card Body - Home Page Style: Border, Solid BG, Rounded-2xl */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#B8B3FF]/40 hover:border-[#B8B3FF] transition-all duration-300 shadow-sm hover:shadow-lg group">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-[#B8B3FF]/20 to-[#E8B3FF]/20 rounded-xl text-primary">
                    <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary">{title}</h3>
            </div>
            <div className="text-muted-foreground leading-relaxed">
                {children}
            </div>
        </div>
    </motion.div>
);

export function HowItWorksSection() {
    const { openOrderDialog } = useOrderDialog();

    return (
        <section className="py-20 bg-white relative overflow-hidden" id="how-it-works">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">

                    {/* Left: Sticky Title & CTA */}
                    <div className="lg:sticky lg:top-32 h-fit space-y-8 text-center lg:text-left">
                        <div>
                            <span className="text-sm font-bold tracking-wider text-primary/80 uppercase mb-2 block animate-pulse-slow">Простий процес</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                                Від ідеї до емоції — <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B8B3FF] to-[#E8B3FF]">
                                    всього 2 кроки
                                </span>
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
                                Ми перетворили складний процес створення пісні на легку гру. Ти керуєш натхненням, ми робимо магію.
                            </p>
                        </div>

                        {/* Pricing Card - Home Page Style */}
                        <div className="p-6 bg-white rounded-2xl border-2 border-[#B8B3FF]/40 shadow-lg inline-block w-full max-w-md">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-primary">Повна вартість</span>
                                <span className="text-2xl font-bold text-primary">399 грн</span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-6 text-left">Все включено: створення, друк, доставка</p>

                            <ul className="space-y-3 mb-8 text-sm text-muted-foreground text-left">
                                <li className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#F0F0FF] flex items-center justify-center">
                                        <Sparkles size={12} className="text-primary" />
                                    </div>
                                    Доступ до студії без обмежень
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#F0F0FF] flex items-center justify-center">
                                        <Sparkles size={12} className="text-primary" />
                                    </div>
                                    Друк та безкоштовна доставка
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#F0F0FF] flex items-center justify-center">
                                        <Sparkles size={12} className="text-primary" />
                                    </div>
                                    Пісня, що залишається назавжди
                                </li>
                            </ul>
                            {/* Home Page Button Style: Pastel Gradient */}
                            <button
                                onClick={() => openOrderDialog('how-it-works-home', 'Купити доступ')}
                                className="w-full bg-gradient-to-r from-[#B8B3FF] to-[#E8B3FF] hover:from-[#A8A3EF] hover:to-[#D8A3EF] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                            >
                                <span>Створити пісню</span>
                                <Sparkles size={16} className="text-white/90" />
                            </button>
                        </div>
                    </div>

                    {/* Right: Timeline Steps */}
                    <div className="space-y-8">

                        {/* Step 1: Creation */}
                        <StepCard number="1" title="Магія створення" icon={Play}>
                            <p className="mb-6">
                                Ти відповідаєш на питання — ШІ створює пісню. Створюєш дизайн (фото або генерація) і бачиш результат на екрані.
                            </p>
                            {/* Media Container - Styled with Home Page borders */}
                            <div className="relative w-full aspect-video bg-[#2A2A2A] rounded-xl overflow-hidden shadow-md border border-gray-800 group cursor-pointer">
                                <video
                                    src="/videos/studio.mp4"
                                    className="w-full h-full object-cover"
                                    muted
                                    playsInline
                                    loop
                                    autoPlay
                                />
                                <div className="absolute inset-0 bg-black/10" />
                            </div>
                        </StepCard>

                        {/* Step 2: Result */}
                        <StepCard number="2" title="Емоція в руках" icon={Gift} isLast={true}>
                            <p className="mb-6">
                                Отримуєш фізичну листівку. Момент вручення, скан QR-коду — і емоції, які неможливо стримати.
                            </p>
                            {/* Media Container - Light Theme for Result */}
                            <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-[#F5F3FF] to-[#F0F0FF] rounded-xl overflow-hidden shadow-md border border-[#E8B3FF]/30">
                                <img
                                    src={postcardScanImage}
                                    alt="Листівка з QR-кодом"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </StepCard>
                    </div>

                </div>
            </div>
        </section>
    );
}
