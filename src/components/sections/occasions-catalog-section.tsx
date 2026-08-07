import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
    holidayOccasions,
    momentOccasions,
    occasionCategoryTitles,
    type Occasion,
} from "@/data/occasionData";

function OccasionCard({ occasion }: { occasion: Occasion }) {
    const Icon = occasion.icon;

    return (
        <Link
            to={`/povody/${occasion.slug}`}
            className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9370DB] focus-visible:ring-offset-2"
        >
            <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${occasion.accent} text-white shadow-sm transition-transform group-hover:scale-105`}
            >
                <Icon className="h-6 w-6" />
            </div>

            <h4 className="mb-2 text-xl font-bold leading-tight text-gray-900">{occasion.title}</h4>
            <p className="mb-6 text-base leading-relaxed text-gray-600">{occasion.shortDescription}</p>

            <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-[#6A5ACD]">
                Обрати привід
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
        </Link>
    );
}

export function OccasionsCatalogSection() {
    return (
        <section className="bg-white py-24" id="povody">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="mb-14 text-center">
                    <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl">
                        Знайдемо привід сказати важливе
                    </h2>
                    <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
                        Обери ситуацію — і ми покажемо, як перетворити твою історію на особливий музичний подарунок.
                    </p>
                </div>

                <div className="space-y-14">
                    {/* Свята та важливі дати */}
                    <div>
                        <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-gray-400 md:text-left">
                            {occasionCategoryTitles.holidays}
                        </h3>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {holidayOccasions.map((occasion) => (
                                <OccasionCard key={occasion.slug} occasion={occasion} />
                            ))}
                        </div>
                    </div>

                    {/* Особливі моменти */}
                    <div>
                        <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-gray-400 md:text-left">
                            {occasionCategoryTitles.moments}
                        </h3>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {momentOccasions.map((occasion) => (
                                <OccasionCard key={occasion.slug} occasion={occasion} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
