export function ComparisonSection() {
  const withoutWords = [
    "Хочеш сказати щось важливе — але не знаходиш слів",
    "Даруєш — а воно лежить на полиці без історії",
    "Емоція була — але через тиждень її вже не згадати",
  ];

  const withWords = [
    "Твої слова стають піснею — і звучать від серця",
    "Подарунок несе твою історію, яку можна переслухати",
    "Емоція залишається — бо її можна відчути знову",
  ];

  return (
    <section className="py-12 md:py-16 bg-white rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] relative z-10">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#6A5ACD]">
            Різниця — у словах
          </h2>
        </div>

        {/* Дві колонки */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Ліва колонка — Коли слів немає */}
          <div className="bg-gray-50 rounded-2xl p-5 md:p-6 border border-gray-200">
            <h3 className="text-lg md:text-xl font-bold text-gray-500 mb-4 md:mb-5 text-center">
              Коли слів немає
            </h3>
            <div className="space-y-3 md:space-y-4">
              {withoutWords.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-gray-400 mt-0.5">—</span>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Права колонка — Коли слова є */}
          <div className="bg-gradient-to-br from-[#F8F7FF] to-white rounded-2xl p-5 md:p-6 border border-[#B8B3FF]/40">
            <h3 className="text-lg md:text-xl font-bold text-[#6A5ACD] mb-4 md:mb-5 text-center">
              Коли слова є
            </h3>
            <div className="space-y-3 md:space-y-4">
              {withWords.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-[#B8B3FF] mt-0.5">♪</span>
                  <p className="text-[#6A5ACD]/80 text-sm md:text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Фінальна фраза */}
        <div className="max-w-2xl mx-auto mt-8 md:mt-10 text-center">
          <p className="text-base md:text-lg text-[#6A5ACD]/90 leading-relaxed">
            Листівка з піснею — це спосіб сказати те, що важко висловити,
            <br className="hidden md:block" />
            <span className="font-medium text-[#6A5ACD]"> і зберегти цей момент назавжди.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
