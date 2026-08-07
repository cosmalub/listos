import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
    holidayOccasions,
    momentOccasions,
    occasionCategoryTitles,
    type Occasion,
} from "@/data/occasionData";

function OccasionCard({ occasion }: { occasion: Occasion }) {
    return (
        <Link
            to={`/povody/${occasion.slug}`}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border-2 border-[#F3D1FF]/50 hover:border-[#B8B3FF] flex flex-col h-full group text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9370DB]"
        >
            <div className="h-40 mb-6 flex items-center justify-center p-4 bg-gray-50 rounded-xl group-hover:scale-105 transition-transform duration-300">
                {occasion.image && (
                    <img src={occasion.image} alt={occasion.title} className="max-h-full object-contain mix-blend-multiply" />
                )}
            </div>
            
            <h4 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{occasion.title}</h4>
            
            {/* Using emotionalProblem as the problem text, falling back to shortDescription if missing */}
            <p className="text-gray-600 text-base mb-6 flex-grow leading-relaxed px-2">
                {occasion.emotionalProblem || occasion.shortDescription}
            </p>

            <div className="mt-auto flex flex-col gap-4">
                {/* Solution text - using heroDescription or shortDescription */}
                <div className="bg-gradient-to-br from-[#F8F7FF] to-[#F0F0FF] rounded-xl p-4 border border-[#E6E6FA] group-hover:border-[#D8D4FF] transition-colors">
                    <p className="text-[#6A5ACD] font-bold text-sm leading-snug line-clamp-3">
                        {occasion.heroDescription}
                    </p>
                </div>
                
                <span className="inline-flex items-center justify-center gap-2 text-sm font-bold text-[#6A5ACD] group-hover:text-[#5849b8] transition-colors mt-2">
                    Обрати привід
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
            </div>
        </Link>
    );
}

export function OccasionsCatalogSection() {
    return (
        <section className="bg-gray-50/50 py-24" id="povody">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="mb-20 text-center space-y-12">
                    {/* First text block */}
                    <div>
                        <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl">
                            Коли слів стає замало
                        </h2>
                        <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
                            Листосик допомагає там, де звичайні подарунки безсилі, а емоції потребують голосу.
                        </p>
                    </div>
                    
                    <div className="w-16 h-1 bg-gradient-to-r from-[#9370DB] to-[#FF85A2] mx-auto rounded-full opacity-50"></div>

                    {/* Second text block */}
                    <div>
                        <h3 className="mb-6 text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl">
                            Знайдемо привід сказати важливе
                        </h3>
                        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
                            Обери ситуацію — і ми покажемо, як перетворити твою історію на особливий музичний подарунок.
                        </p>
                    </div>
                </div>

                <div className="space-y-16">
                    {/* Свята та важливі дати */}
                    <div>
                        <h3 className="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-gray-400">
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
                        <h3 className="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-gray-400">
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
