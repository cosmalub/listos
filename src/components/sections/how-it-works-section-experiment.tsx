import React from 'react';
import { motion } from 'framer-motion';
import { useOrderDialog } from '@/components/order/OrderDialogContext';
import { Sparkles, Play, Gift, ArrowRight } from 'lucide-react';
import postcardScanImage from "@/assets/postcard-scan.png";

const StepCard = ({ number, title, children, icon: Icon, isLast = false }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="relative flex-1"
    >
        {/* Number/Icon Bubble - Improved positioning */}
        <div className="absolute left-6 top-6 w-12 h-12 rounded-full bg-white border-2 border-[#B8B3FF] flex items-center justify-center z-10 shadow-sm">
            <span className="text-primary font-bold text-xl">{number}</span>
        </div>

        {/* Card Body - Adjusted padding and removed extra icons */}
        <div className="bg-white rounded-3xl p-6 md:p-8 pt-20 border-2 border-[#B8B3FF]/40 hover:border-[#B8B3FF] transition-all duration-300 shadow-sm hover:shadow-lg group h-full flex flex-col items-center text-center">
            
            <h3 className="text-2xl font-bold text-primary mb-4">{title}</h3>
            
            <div className="text-muted-foreground leading-relaxed mb-6 flex-grow max-w-sm mx-auto">
                {children}
            </div>
        </div>
    </motion.div>
);

export function HowItWorksSectionExperiment() {
    const { openOrderDialog } = useOrderDialog();

    return (
        <section className="py-20 bg-white relative overflow-hidden" id="how-it-works">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center max-w-6xl mx-auto space-y-12">

                    {/* Header + Pricing Card Container */}
                    <div className="w-full flex flex-col items-center text-center space-y-8">
                        <div>
                            <span className="text-sm font-bold tracking-wider text-primary/80 uppercase mb-2 block animate-pulse-slow">Простий процес</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                                Від ідеї до емоції — <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B8B3FF] to-[#E8B3FF]">
                                    всього 2 кроки
                                </span>
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-md mx-auto">
                                Ми перетворили складний процес створення пісні на легку гру. Ти керуєш натхненням, ми робимо магію.
                            </p>
                        </div>

                        {/* Pricing Card - Centered */}
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

                    {/* Steps Row */}
                    <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-center relative">
                        
                        {/* Step 1: Creation */}
                        <StepCard number="1" title="Магія створення" icon={Play}>
                            <p className="mb-6">
                                Ти відповідаєш на питання — ШІ створює пісню. Створюєш дизайн (фото або генерація) і бачиш результат на екрані.
                            </p>
                            {/* Media Container - Styled with Home Page borders */}
                            <div className="relative w-full aspect-video bg-[#2A2A2A] rounded-xl overflow-hidden shadow-md border border-gray-800 group cursor-pointer mt-auto">
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

                        {/* Arrow Separator - Desktop Only */}
                        <div className="hidden md:flex items-center justify-center text-[#B8B3FF]/50 shrink-0">
                            <ArrowRight size={48} strokeWidth={1.5} />
                        </div>

                         {/* Arrow Separator - Mobile Only (Vertical) */}
                         <div className="md:hidden flex items-center justify-center text-[#B8B3FF]/50 py-2">
                            <ArrowRight size={32} strokeWidth={1.5} className="rotate-90" />
                        </div>

                        {/* Step 2: Result */}
                        <StepCard number="2" title="Емоція в руках" icon={Gift} isLast={true}>
                            <p className="mb-6">
                                Отримуєш фізичну листівку. Момент вручення, скан QR-коду — і емоції, які неможливо стримати.
                            </p>
                            {/* Media Container - Light Theme for Result */}
                            <div className="relative w-full aspect-video md:aspect-[4/3] bg-gradient-to-br from-[#F5F3FF] to-[#F0F0FF] rounded-xl overflow-hidden shadow-md border border-[#E8B3FF]/30 mt-auto">
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
