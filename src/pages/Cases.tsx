import { HeaderExperiment } from "@/components/sections/header-experiment";
import { FooterExperiment } from "@/components/sections/footer-experiment";
import { Button } from "@/components/ui/button";
import { useOrderDialog } from "@/components/order/OrderDialogContext";
import ExamplesSection3D from "@/components/sections/examples-section-3d";
import { ReviewsSection } from "@/components/valentine-new/ReviewsSection";
import { Heart, Star, Sparkles, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const Cases = () => {
    const { openOrderDialog } = useOrderDialog();

    const jobs = [
        {
            icon: Heart,
            title: "Освідчення в коханні",
            text: "Коли «я тебе люблю» звучить занадто просто. Створи пісню, яка розповість про ваші особливі моменти, смішні звички та плани на майбутнє.",
            gradient: "from-rose-500 to-pink-500"
        },
        {
            icon: Sparkles,
            title: "Привітання до будь-якої події",
            text: "День народження, річниця, Новий рік чи 8 березня. Створи персональний хіт, який стане найкращим подарунком до будь-якої важливої дати.",
            gradient: "from-purple-500 to-indigo-500"
        },
        {
            icon: MessageCircle,
            title: "Вибачення",
            text: "Зробив помилку? Вибачся так, щоб це торкнулося серця. Щира пісня допоможе розтопити лід краще за будь-які слова.",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: Star,
            title: "Вдячність",
            text: "Батькам, ментору або другу — подякуй за підтримку мелодією, яка залишиться з ними назавжди як нагадування про твою вдячність.",
            gradient: "from-amber-500 to-orange-500"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <HeaderExperiment />

            {/* Page Header */}
            <section className="pt-44 pb-12 text-center px-4 bg-gradient-to-b from-[#FFF0E5] via-[#FFF5F0] to-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
                        Одна листівка – <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A5ACD] via-[#9370DB] to-[#FF85A2]">тисяча емоцій</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Листосик допомагає висловити те, що важко сказати просто словами.
                    </p>
                </motion.div>
            </section>

            {/* Jobs to be Done Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-8">
                        {jobs.map((job, idx) => (
                            <div key={idx} className="group relative bg-white border-2 border-slate-100 hover:border-[#F3D1FF] rounded-3xl p-8 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col items-center text-center">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${job.gradient} flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 transition-transform`}>
                                    <job.icon size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{job.title}</h3>
                                <p className="text-lg text-gray-600 leading-relaxed">{job.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Real Examples (3D Carousel) */}
            <div className="border-t border-gray-100">
                <ExamplesSection3D />
            </div>

            {/* Reviews (Valentine Style) */}
            <div className="py-12 bg-gray-50 border-t border-gray-100">
                <ReviewsSection />
            </div>

            {/* Final CTA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
                        Готовий створити свою історію?
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                        <Button
                            onClick={() => openOrderDialog('cases-page', 'Отримати доступ')}
                            className="bg-gradient-to-r from-[#6A5ACD] via-[#9370DB] to-[#FF85A2] text-white hover:opacity-90 rounded-full px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all h-auto min-w-[220px]"
                        >
                            <Sparkles className="w-5 h-5 mr-2" />
                            Створити листівку
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => openOrderDialog('login', 'Увійти')}
                            className="rounded-full px-8 py-6 text-lg font-bold border-2 border-gray-200 text-gray-600 hover:border-[#9370DB] hover:text-[#9370DB] hover:bg-transparent transition-all h-auto min-w-[220px]"
                        >
                            Увійти
                        </Button>
                    </div>
                    <div className="flex justify-center mt-6">
                        <p className="text-sm text-gray-500 font-medium text-center max-w-2xl mx-auto leading-relaxed">
                            * Ти отримуєш доступ до студії, де з ШІ-помічником у зручному інтерфейсі створиш слова, музику та дизайн листівки. А ми її надрукуємо і відправимо – все включено за 399 грн.
                        </p>
                    </div>
                </div>
            </section>

            <FooterExperiment />
        </div>
    );
};

export default Cases;
