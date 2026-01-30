import { HeaderExperiment } from "@/components/sections/header-experiment";
import { FooterExperiment } from "@/components/sections/footer-experiment";
import { Button } from "@/components/ui/button";
import { useOrderDialog } from "@/components/order/OrderDialogContext";
import { ArrowRight, Sparkles, Heart, Gift, Zap, Fingerprint, Palette, RefreshCw, Brain, CheckCircle, Music } from "lucide-react";
import postcardScanImage from "@/assets/postcard-scan.png";
import { motion } from "framer-motion";

// ============================================
// SECTION 1: SERVICE OVERVIEW HERO — Суть продукту (Integrated Process)
// ============================================
const ServiceOverviewHero = () => {
    return (
        <section className="pt-44 pb-20 px-4 bg-gradient-to-b from-[#F0F8FF] via-[#F5F3FF] to-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto max-w-6xl relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-[#6A5ACD] mb-8 border border-[#E6E6FA] shadow-sm">
                        <Music className="w-4 h-4" />
                        <span>Більше ніж просто папір</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-8">
                        Новий спосіб подарувати <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A5ACD] via-[#9370DB] to-[#FF85A2]">
                            справжні емоції
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-16">
                        Ми поєднали ваші щирі слова, зворушливу музику та якісну листівку.
                        Це не просто подарунок, це історія, яку можна потримати в руках і почути серцем.
                    </p>
                </motion.div>

                {/* 2-Step Process Visualization (Enhanced with Video/Images) */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative w-full mx-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        {/* Step 1: Studio */}
                        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(106,90,205,0.1)] border border-purple-50 flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                            {/* Background Decoration */}
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#6A5ACD] to-[#9370DB]" />

                            <div className="w-16 h-16 bg-[#F5F3FF] rounded-2xl flex items-center justify-center text-[#6A5ACD] mb-6 group-hover:scale-110 transition-transform duration-500">
                                <Sparkles className="w-8 h-8" />
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Крок 1: Твориш у студії
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-8 max-w-md">
                                Заходиш у студію, відповідаєш на прості питання. Листосик миттєво генерує текст, створює музику та записує вокал.
                            </p>

                            {/* Video Visual for Studio */}
                            <div className="w-full bg-gray-900 rounded-3xl overflow-hidden relative shadow-lg aspect-video">
                                <video
                                    src="/videos/studio.mp4"
                                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                                    muted
                                    playsInline
                                    loop
                                    autoPlay
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white text-sm font-medium flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    Генерація магії...
                                </div>
                            </div>
                        </div>

                        {/* Connection Arrow (Desktop) */}
                        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-xl border border-gray-100 text-[#9370DB]">
                            <ArrowRight className="w-8 h-8" />
                        </div>

                        {/* Step 2: Physical Product */}
                        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(255,133,162,0.1)] border border-pink-50 flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                            {/* Background Decoration */}
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FF85A2] to-[#FF6B8A]" />

                            <div className="w-16 h-16 bg-[#FFF0F3] rounded-2xl flex items-center justify-center text-[#FF85A2] mb-6 group-hover:scale-110 transition-transform duration-500">
                                <Gift className="w-8 h-8" />
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Крок 2: Отримуєш магію
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-8 max-w-md">
                                Ми друкуємо результат на преміальному картоні і надсилаємо тобі. Скануєш QR-код — і музика оживає.
                            </p>

                            {/* Video Visual for Print (Placeholder) */}
                            <div className="w-full bg-gray-900 rounded-3xl overflow-hidden relative shadow-lg aspect-video">
                                <video
                                    src="/videos/studio.mp4"
                                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                                    muted
                                    playsInline
                                    loop
                                    autoPlay
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white text-sm font-medium flex items-center gap-2">
                                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                                    Очікування дива...
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// ============================================
// SECTION 2: MEET LISTOSYK — Знайомство з помічником
// ============================================
const ListosykIntro = () => {
    return (
        <section className="py-20 bg-white relative">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        Як створити шедевр без досвіду?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Тобі не потрібно бути композитором чи дизайнером. Все складне ми взяли на себе.
                        Точніше, доручили це нашому генію.
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto mt-0 mb-8 px-4">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                        {/* Cat Image */}
                        <div className="w-full md:w-1/3 flex justify-center">
                            <motion.img
                                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                src="/lovable-uploads/26b60a97-63b1-4ff3-93d6-e0607581e4b0.png"
                                alt="Листосик - кіт-помічник"
                                className="w-64 h-64 transform transition-transform hover:scale-105 drop-shadow-2xl"
                            />
                        </div>

                        {/* Speech Bubble */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="w-full md:w-2/3 relative group"
                        >
                            <div className="bg-white p-8 rounded-3xl border-2 border-[#B8B3FF]/60 hover:border-[#B8B3FF] transition-all hover:shadow-md relative">
                                {/* Speech bubble pointer */}
                                <div className="hidden md:block absolute top-1/2 -left-3 transform -translate-y-1/2 w-6 h-6 rotate-45 border-l-2 border-b-2 border-[#B8B3FF]/60 group-hover:border-[#B8B3FF] transition-colors bg-white"></div>

                                <h3 className="text-2xl font-bold text-[#6A5ACD] mb-4 text-left flex items-center gap-3">
                                    <span>Привіт, я Листосик!</span>
                                    <span className="text-2xl animate-bounce">👋</span>
                                </h3>
                                <p className="text-lg text-gray-600 leading-relaxed text-left">
                                    Розкажи, що хочеш сказати — «дякую», «вибач», «вітаю» чи «кохаю», — а я допоможу написати пісню,
                                    зроблю дизайн листівки, надрукую та надішлю її тобі.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ============================================
// SECTION 3: VALUES — Цінності
// ============================================
const ValuesSection = () => {
    const values = [
        {
            icon: Fingerprint,
            title: "Унікальність",
            description: "Твоя історія = твоя пісня. Ніхто більше не матиме такої ж — вона тільки твоя.",
            gradient: "from-purple-500 to-indigo-500"
        },
        {
            icon: Zap,
            title: "Легкість",
            description: "10 хвилин — і готово. Відповідаєш на питання — Листосик робить магію.",
            gradient: "from-amber-500 to-orange-500"
        },
        {
            icon: Gift,
            title: "Результат",
            description: "Отримуєш друковану листівку з QR-кодом, яка вражає з першого погляду.",
            gradient: "from-rose-500 to-pink-500"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                        Чому це працює
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Листосик поєднує технології та емоції, щоб твій подарунок став незабутнім.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-[#B8B3FF] transition-all duration-300 hover:shadow-xl flex flex-col items-center text-center"
                        >
                            {/* Icon */}
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <value.icon className="w-7 h-7 text-white" />
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================
// SECTION 5: GUARANTEE — Комфорт та гарантії (Black Headings)
// ============================================
const GuaranteeSection = () => {
    const guarantees = [
        {
            icon: Palette,
            title: "Зрозумілий інтерфейс",
            description: "Прості питання, миттєвий результат на екрані. Без технічних складнощів.",
            color: "bg-blue-50 text-blue-600"
        },
        {
            icon: RefreshCw,
            title: "Повний контроль",
            description: "Не подобається — переробляй, поки не буде ідеально. Без обмежень.",
            color: "bg-green-50 text-green-600"
        },
        {
            icon: Brain,
            title: "ШІ, який розуміє",
            description: "Листосик навчений створювати те, що доречно саме твоїй ситуації.",
            color: "bg-purple-50 text-purple-600"
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                        Ми гарантуємо, що тобі сподобається
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Ти керуєш — Листосик допомагає. Зручно навіть якщо ти далекий від технологій.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {guarantees.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-3xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col items-center text-center"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-6`}>
                                <item.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Extra trust indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-6 mt-12"
                >
                    {["Безкоштовна доставка", "500+ задоволених клієнтів", "Преміальна якість"].map((text) => (
                        <div key={text} className="flex items-center gap-2 text-gray-600">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="font-medium">{text}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

// ============================================
// SECTION 6: CTA — Фінальний заклик до дії
// ============================================
const CTASection = () => {
    const { openOrderDialog } = useOrderDialog();

    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 to-[#F5F3FF]">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-8">
                        Готові створити магію?
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                        <Button
                            onClick={() => openOrderDialog('how-it-works-page', 'Отримати доступ')}
                            className="bg-gradient-to-r from-[#6A5ACD] via-[#9370DB] to-[#FF85A2] text-white hover:opacity-90 rounded-full px-10 py-7 text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all h-auto min-w-[220px]"
                        >
                            <Sparkles className="w-5 h-5 mr-2" />
                            Створити листівку
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => openOrderDialog('login', 'Увійти')}
                            className="rounded-full px-10 py-7 text-lg font-bold border-2 border-gray-200 text-gray-600 hover:border-[#9370DB] hover:text-[#9370DB] hover:bg-transparent transition-all h-auto min-w-[220px]"
                        >
                            Увійти
                        </Button>
                    </div>

                    <p className="text-sm text-gray-500 font-medium">
                        Все включено: від ідеї до доставки — <span className="text-gray-900 font-bold">399 грн</span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

// ============================================
// MAIN PAGE COMPONENT
// ============================================
const HowItWorks = () => {
    return (
        <div className="min-h-screen bg-white">
            <HeaderExperiment />

            {/* Section 1: Service Overview + Process (Merged) */}
            <ServiceOverviewHero />

            {/* Section 2: Meet Listosyk */}
            <ListosykIntro />

            {/* Section 3: Values */}
            <ValuesSection />

            {/* Removed ProcessSection (Merged into Hero) */}

            {/* Section 5: Guarantee */}
            <GuaranteeSection />

            {/* Section 6: CTA */}
            <CTASection />

            <FooterExperiment />
        </div>
    );
};

export default HowItWorks;
