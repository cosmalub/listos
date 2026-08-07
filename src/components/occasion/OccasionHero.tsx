import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrderDialog } from "@/components/order/OrderDialogContext";
import type { Occasion } from "@/data/occasionData";

export function OccasionHero({ occasion }: { occasion: Occasion }) {
    const { openOrderDialog } = useOrderDialog();
    const Icon = occasion.icon;

    return (
        <section className="bg-gradient-to-b from-[#F3E8FF] via-[#F5F3FF] to-white px-4 pb-16 pt-44">
            <div className="container mx-auto max-w-4xl text-center">
                <div className="mb-8 flex flex-col items-center gap-4">
                    <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${occasion.accent} text-white shadow-md`}
                    >
                        <Icon className="h-7 w-7" />
                    </div>
                    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-gray-600 backdrop-blur-md">
                        {occasion.recipientLabel}
                    </span>
                </div>

                <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl">
                    {occasion.heroTitle}
                </h1>

                <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-gray-600 md:text-2xl">
                    {occasion.heroDescription}
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button
                        onClick={() => openOrderDialog(`occasion-${occasion.slug}-hero`, 'Створити листівку')}
                        className="h-auto w-full min-w-[220px] rounded-full bg-gradient-to-r from-[#6A5ACD] via-[#9370DB] to-[#FF85A2] px-8 py-6 text-lg font-bold text-white shadow-md transition-all hover:-translate-y-1 hover:opacity-90 hover:shadow-lg sm:w-auto"
                    >
                        <Sparkles className="mr-2 h-5 w-5" />
                        Створити листівку
                    </Button>

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-base font-medium text-gray-500 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9370DB] focus-visible:ring-offset-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        На головну
                    </Link>
                </div>
            </div>
        </section>
    );
}
