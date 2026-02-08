import { Button } from "@/components/ui/button";
import { useOrderDialog } from "@/components/order/OrderDialogContext";

export function FinalCTAExperiment() {
    const { openOrderDialog } = useOrderDialog();

    return (
        <section className="py-12 pb-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        onClick={() => openOrderDialog('main-page-cta', 'Отримати доступ')}
                        className="bg-gradient-to-r from-[#6A5ACD] via-[#9370DB] to-[#FF85A2] text-white hover:opacity-90 rounded-full px-8 py-6 text-lg font-bold shadow-md hover:shadow-lg hover:-translate-y-1 transition-all h-auto min-w-[200px]"
                    >
                        Отримати доступ
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => openOrderDialog('login', 'Увійти')}
                        className="rounded-full px-8 py-6 text-lg font-bold border-2 border-gray-200 text-gray-600 hover:border-[#9370DB] hover:text-[#9370DB] hover:bg-transparent transition-all h-auto min-w-[200px]"
                    >
                        Увійти
                    </Button>
                </div>

                <div className="flex justify-center mt-6">
                    <p className="text-sm text-gray-500 font-medium text-center max-w-2xl mx-auto leading-relaxed">
                        * Ти отримуєш доступ до студії, де з ШІ-помічником у зручному інтерфейсі створиш слова, музику та дизайн листівки. А ми її надрукуємо і відправимо — все включено за 249 грн.
                    </p>
                </div>
            </div>
        </section>
    );
}
