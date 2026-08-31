import { ProductFormatCards } from "@/components/product/product-format-cards";
import type { Occasion } from "@/data/occasionData";

/**
 * Ті самі два фізичні формати, що й на головній.
 * Візуал і статуси беруться з єдиного компонента, щоб не дублювати JSX.
 */
export function OccasionProductFormats({ occasion }: { occasion: Occasion }) {
    return (
        <section className="bg-white py-20">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl">
                        Обери, як зазвучить твоя листівка
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
                        Пісня та дизайн залишаються персональними в обох варіантах — різниця лише в тому, як саме твоя музика зазвучить у руках близької людини.
                    </p>
                </div>

                <ProductFormatCards
                    qrOrderSource={`occasion-${occasion.slug}-product-qr`}
                    soundOrderSource={`occasion-${occasion.slug}-product-sound`}
                />
            </div>
        </section>
    );
}
