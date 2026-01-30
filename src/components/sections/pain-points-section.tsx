import { Sparkles } from "lucide-react";

// Data from BenefitsSection (The "Problem/Solution" cards)
const situations = [
    {
        title: "Подарувати емоцію, а не річ",
        problemText: "Готові листівки — це просто картон. Ти хочеш, щоб подарунок викликав сльози щастя і мурашки по шкірі?",
        solutionText: "Листосик створює момент, який неможливо забути.",
        image: "/lovable-uploads/7f7fb560-80fa-472a-b68a-d4dc88d33cf9.png",
        alt: "Людина дарує подарунок, який не викликає емоцій",
    },
    {
        title: "Сказати «Дякую» по-справжньому",
        problemText: "Іноді вдячність настільки велика, що просте слово здається сухим і формальним. Як передати глибину?",
        solutionText: "Пісня розкаже про твої почуття гучніше за будь-які слова.",
        image: "/lovable-uploads/598fb37d-7bb1-4197-b975-75ed61df0d07.png",
        alt: "Магічна пляшечка з написом 'Дякую', що випромінює світло",
    },
    {
        title: "Зізнатися без банальності",
        problemText: "Боїшся, що твоє «люблю» загубиться серед тисяч інших? Хочеться зробити зізнання особливим.",
        solutionText: "Твоя історія стане унікальним треком, якого немає більше ні в кого.",
        image: "/lovable-uploads/f79bea48-f239-452c-85d0-3381e14b8e7c.png",
        alt: "Бульбашки з важливими словами: Вітаю, Кохаю, Дякую",
    },
    {
        title: "Вибачитися, коли важко говорити",
        problemText: "Помилився і не знаєш, як підібрати правильні слова, щоб тебе почули і пробачили?",
        solutionText: "Музика розтопить лід і донесе твою щирість прямо до серця.",
        image: "/lovable-uploads/19a52528-d3d5-4ba8-9878-b232726fff8d.png",
        alt: "Людина тримає табличку з написом 'Вибач'",
    },
];

export const PainPointsSection = () => {
    return (
        <section className="py-20 bg-gray-50/50">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                        Коли слів стає замало
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Листосик допомагає там, де звичайні подарунки безсилі, а емоції потребують голосу.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {situations.map((item, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border-2 border-[#F3D1FF]/50 hover:border-[#B8B3FF] flex flex-col h-full group text-center">
                            <div className="h-40 mb-6 flex items-center justify-center p-4 bg-gray-50 rounded-xl group-hover:scale-105 transition-transform duration-300">
                                <img src={item.image} alt={item.alt} className="max-h-full object-contain" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{item.title}</h3>
                            <p className="text-gray-600 text-base mb-6 flex-grow leading-relaxed px-2">{item.problemText}</p>

                            {/* Redesigned Solution Block */}
                            <div className="mt-auto">
                                <div className="bg-gradient-to-br from-[#F8F7FF] to-[#F0F0FF] rounded-xl p-4 border border-[#E6E6FA] group-hover:border-[#D8D4FF] transition-colors">
                                    <p className="text-[#6A5ACD] font-bold text-sm leading-snug">
                                        {item.solutionText}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
