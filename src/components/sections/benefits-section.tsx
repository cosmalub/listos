// Data for the situations
const commonSituations = [
  {
    title: "Стандартні подарунки не передають почуття",
    problemText:
      "Хочеш показати близькій людині, наскільки вона важлива, але всі готові листівки здаються надто звичайними?",
    solutionText: "Листівка з піснею говорить за тебе й залишається назавжди.",
    image: "/lovable-uploads/7f7fb560-80fa-472a-b68a-d4dc88d33cf9.png",
    alt: "Людина дарує подарунок, який не викликає емоцій",
  },
  {
    title: '"Дякую" звучить сухо',
    problemText: 'Відчуваєш океан вдячності, але просте "дякую" не передає навіть краплинки того, що ти відчуваєш?',
    solutionText: "Пісня всередині листівки зробить це щиро та голосно.",
    image: "/lovable-uploads/598fb37d-7bb1-4197-b975-75ed61df0d07.png",
    alt: "Магічна пляшечка з написом 'Дякую', що випромінює світло",
  },
  {
    title: "Страх банальності у важливих словах",
    problemText: "Настав момент розкрити свої почуття, але боїшся, що звичайні слова здадуться банальними чи нещирими?",
    solutionText: "Листівка з піснею надасть зізнанню глибини.",
    image: "/lovable-uploads/f79bea48-f239-452c-85d0-3381e14b8e7c.png",
    alt: "Бульбашки з важливими словами: Вітаю, Кохаю, Дякую",
  },
  {
    title: "Складно щиро вибачитись",
    problemText: "Шукаєш спосіб вибачитися так, щоб людина відчула всю щирість твоїх намірів?",
    solutionText: "Пісня скаже «пробач» від серця.",
    image: "/lovable-uploads/19a52528-d3d5-4ba8-9878-b232726fff8d.png",
    alt: "Людина тримає табличку з написом 'Вибач'",
  },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-12 -mt-8 bg-gradient-to-b from-white/20 to-white relative z-10 scroll-mt-24">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-medium mt-8 mb-8 text-center text-[#6A5ACD] max-w-3xl mx-auto">
          Коли стандартні слова безсилі, допоможе
          <br />
          особиста листівка з піснею — ось як саме:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {commonSituations.map((situation, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border-2 border-[#F3D1FF]/50 hover:border-[#B8B3FF] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col"
            >
              <div className="h-[140px] sm:h-[160px] md:h-[180px] relative flex-shrink-0 mx-auto w-full">
                <img
                  src={situation.image}
                  alt={situation.alt}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-sm sm:text-base font-bold mb-3 text-[#6A5ACD] text-center">{situation.title}</h3>
                <div className="text-xs sm:text-sm text-center">
                  <p className="text-[#6A5ACD]/80">
                    {situation.problemText}{" "}
                    <span className="inline-flex items-center mx-1">
                      <span className="text-[#B8B3FF] mx-1">→</span>
                    </span>
                    <span className="text-[#6A5ACD] font-medium">{situation.solutionText}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}