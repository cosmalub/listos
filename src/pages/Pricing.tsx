import { HeaderExperiment } from "@/components/sections/header-experiment";
import { FooterExperiment } from "@/components/sections/footer-experiment";
import { Button } from "@/components/ui/button";
import { useOrderDialog } from "@/components/order/OrderDialogContext";
import { Truck, Music, FileText, Sparkles, Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Pricing = () => {
    const { openOrderDialog } = useOrderDialog();

    // Features relevant to the general product
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
        <div className="min-h-screen bg-white">
            <HeaderExperiment />

            {/* Page Header */}
            <section className="pt-44 pb-12 text-center px-4 bg-gradient-to-b from-[#FFE4EC] via-[#FFF0F5] to-white">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
                    Проста та прозора <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A5ACD] via-[#9370DB] to-[#FF85A2]">ціна</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Все включено. Жодних прихованих платежів. Ти платиш лише за результат.
                </p>
            </section>

            {/* Pricing Content */}
            <section className="py-12 md:py-20 px-4 relative overflow-hidden bg-white">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/50" />

                <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left Content: Features List */}
                        <div className="space-y-10">
                            <div className="text-left">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
                                    Що входить у вартість?
                                </h2>
                                <p className="text-lg text-gray-600">
                                    Ми подбали про кожну деталь, щоб ти отримав ідеальний подарунок.
                                </p>
                            </div>

                            <div className="space-y-8">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="flex gap-5 group">
                                        <div className="w-14 h-14 rounded-2xl bg-[#F0F0FF] flex items-center justify-center text-[#6A5ACD] flex-shrink-0 group-hover:bg-[#E6E6FA] transition-colors">
                                            <feature.icon size={28} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-gray-900 mb-1">{feature.title}</h4>
                                            <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Content: Pricing Card */}
                        <div className="relative">
                            {/* Blur effect behind */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#6A5ACD] via-[#9370DB] to-[#FF85A2] blur-3xl opacity-20 transform translate-y-4 scale-105" />

                            <div className="relative bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 overflow-hidden text-center">
                                {/* Top Gradient Bar */}
                                <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-[#6A5ACD] via-[#9370DB] to-[#FF85A2]" />

                                <h3 className="text-2xl font-bold text-gray-900 mb-2 mt-4">Все включено</h3>

                                <div className="flex items-center justify-center gap-2 mb-4 mt-2">
                                    <span className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6A5ACD] via-[#9370DB] to-[#FF85A2]">399</span>
                                    <span className="text-2xl font-bold text-gray-400 self-end mb-4">грн</span>
                                </div>

                                <p className="text-gray-500 mb-8 font-medium">Повна вартість за створення, друк та доставку</p>

                                <div className="space-y-4">
                                    <Button
                                        onClick={() => openOrderDialog('pricing-page', 'Отримати доступ')}
                                        className="w-full bg-gradient-to-r from-[#6A5ACD] via-[#9370DB] to-[#FF85A2] text-white hover:opacity-90 rounded-full px-8 py-7 text-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all h-auto"
                                    >
                                        Отримати доступ
                                    </Button>

                                    <Button
                                        variant="outline"
                                        onClick={() => openOrderDialog('login', 'Увійти')}
                                        className="w-full rounded-full px-8 py-7 text-xl font-bold border-2 border-gray-200 text-gray-600 hover:border-[#9370DB] hover:text-[#9370DB] hover:bg-transparent transition-all h-auto"
                                    >
                                        Увійти
                                    </Button>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <p className="text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                                        <Check size={18} className="text-green-500" />
                                        100% Гарантія повернення коштів
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Guarantee Section Mini */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">Ти нічим не ризикуєш</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                        Якщо результат тобі не сподобається — ми повернемо гроші протягом 24 годин. Без зайвих питань. Ми впевнені у якості нашого продукту.
                    </p>
                </div>
            </section>

            <FooterExperiment />
        </div>
    );
};

export default Pricing;
