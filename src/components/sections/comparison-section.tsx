import { ArrowRight } from "lucide-react";

interface ComparisonRowProps {
  standard: {
    icon: string;
    title: string;
    description: string;
  };
  musical: {
    icon: string;
    title: string;
    description: string;
  };
}

function ComparisonRow({ standard, musical }: ComparisonRowProps) {
  return (
    <div className="grid md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-4 items-stretch">
      {/* Стандартний подарунок */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 md:p-5 flex items-start gap-3">
        <span className="text-2xl md:text-3xl flex-shrink-0">{standard.icon}</span>
        <div>
          <h4 className="font-bold text-gray-700 text-sm md:text-base mb-1">{standard.title}</h4>
          <p className="text-xs md:text-sm text-gray-500">{standard.description}</p>
        </div>
      </div>

      {/* Стрілка */}
      <div className="hidden md:flex items-center justify-center px-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#B8B3FF]/20 to-[#E8B3FF]/20 flex items-center justify-center">
          <ArrowRight className="w-5 h-5 text-[#6A5ACD]" />
        </div>
      </div>
      <div className="md:hidden flex items-center justify-center -my-1">
        <ArrowRight className="w-5 h-5 text-[#6A5ACD] rotate-90" />
      </div>

      {/* Листівка з піснею */}
      <div className="bg-gradient-to-br from-[#F8F7FF] to-white border border-[#B8B3FF]/40 rounded-2xl p-4 md:p-5 flex items-start gap-3 hover:border-[#B8B3FF] hover:shadow-md transition-all">
        <span className="text-2xl md:text-3xl flex-shrink-0">{musical.icon}</span>
        <div>
          <h4 className="font-bold text-[#6A5ACD] text-sm md:text-base mb-1">{musical.title}</h4>
          <p className="text-xs md:text-sm text-[#6A5ACD]/70">{musical.description}</p>
        </div>
      </div>
    </div>
  );
}

export function ComparisonSection() {
  const comparisons = [
    {
      standard: {
        icon: "💐",
        title: "Квіти за 500+ грн",
        description: "Зів'януть через тиждень, залишиться тільки фото",
      },
      musical: {
        icon: "🎵",
        title: "Пісня + листівка",
        description: "Залишиться назавжди, можна переслухати будь-коли",
      },
    },
    {
      standard: {
        icon: "🎁",
        title: "Листівка з магазину",
        description: "Стандартний текст, таких тисячі",
      },
      musical: {
        icon: "💜",
        title: "Унікальна листівка",
        description: "Твої слова, твій дизайн — тільки для цієї людини",
      },
    },
    {
      standard: {
        icon: "⏰",
        title: "Години на пошуки",
        description: "Бігаєш магазинами, все одно не те",
      },
      musical: {
        icon: "⚡",
        title: "10 хвилин онлайн",
        description: "Створюєш з дивана, AI допомагає",
      },
    },
    {
      standard: {
        icon: "😐",
        title: "Реакція: «Дякую»",
        description: "Посміхнеться, покладе на полицю, забуде",
      },
      musical: {
        icon: "😭",
        title: "Реакція: сльози щастя",
        description: "Буде переслуховувати і згадувати тебе",
      },
    },
  ];

  return (
    <section className="py-16 bg-white rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] relative z-10">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#6A5ACD] mb-3">
            А тепер порівняй
          </h2>
          <div className="flex items-center justify-center gap-4 md:gap-8 text-sm md:text-base text-gray-500">
            <span>Стандартний подарунок</span>
            <span className="text-[#6A5ACD]">→</span>
            <span className="text-[#6A5ACD] font-medium">Листівка з піснею</span>
          </div>
        </div>

        {/* Порівняння */}
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-5">
          {comparisons.map((comparison, index) => (
            <ComparisonRow key={index} {...comparison} />
          ))}
        </div>

        {/* Підсумок */}
        <div className="max-w-2xl mx-auto mt-10 md:mt-12">
          <div className="bg-gradient-to-r from-[#F8F7FF] to-[#FFF7FB] rounded-2xl p-6 md:p-8 text-center border border-[#B8B3FF]/30">
            <p className="text-[#6A5ACD]/80 mb-2">
              Стандартні подарунки забуваються.
            </p>
            <p className="text-lg md:text-xl font-bold text-[#6A5ACD]">
              Листівка з піснею — це емоції на все життя 💜
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
