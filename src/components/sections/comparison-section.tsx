import { ArrowRight } from "lucide-react";

interface ComparisonRowProps {
  standard: {
    icon: string;
    title: string;
    subtitle: string;
  };
  listosyk: {
    icon: string;
    title: string;
    subtitle: string;
  };
}

function ComparisonRow({ standard, listosyk }: ComparisonRowProps) {
  return (
    <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
      {/* Стандартний подарунок */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-gray-300 transition-all">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{standard.icon}</span>
          <h4 className="font-bold text-gray-700">{standard.title}</h4>
        </div>
        <p className="text-sm text-gray-500 ml-12">{standard.subtitle}</p>
      </div>

      {/* Стрілка */}
      <div className="hidden md:flex items-center justify-center">
        <ArrowRight className="w-6 h-6 text-[#6A5ACD]/40" />
      </div>
      <div className="md:hidden flex items-center justify-center -my-2">
        <ArrowRight className="w-6 h-6 text-[#6A5ACD]/40 rotate-90" />
      </div>

      {/* Listosyk */}
      <div className="bg-gradient-to-br from-[#F8F7FF] to-white border border-[#B8B3FF]/50 rounded-2xl p-5 hover:border-[#B8B3FF] hover:shadow-sm transition-all">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{listosyk.icon}</span>
          <h4 className="font-bold text-[#6A5ACD]">{listosyk.title}</h4>
        </div>
        <p className="text-sm text-[#6A5ACD]/70 ml-12">{listosyk.subtitle}</p>
      </div>
    </div>
  );
}

export function ComparisonSection() {
  const comparisons = [
    {
      standard: {
        icon: "💐",
        title: "Букет квітів (500 грн)",
        subtitle: "Завяне через тиждень",
      },
      listosyk: {
        icon: "🎵",
        title: "Пісня + листівка",
        subtitle: "Залишиться назавжди",
      },
    },
    {
      standard: {
        icon: "⏰",
        title: "Купити в магазині",
        subtitle: "Година на пошуки, стандартна листівка",
      },
      listosyk: {
        icon: "⚡️",
        title: "Створити онлайн",
        subtitle: "10 хвилин, унікальна листівка з піснею",
      },
    },
    {
      standard: {
        icon: "😐",
        title: "Звичайна реакція",
        subtitle: "\"Дякую\" — забуде через тиждень",
      },
      listosyk: {
        icon: "😭",
        title: "Емоційна реакція",
        subtitle: "\"Я плачу\" — запам'ятає назавжди",
      },
    },
  ];

  return (
    <section className="py-16 bg-white rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6A5ACD] mb-4">
            Чому Листосик краще?
          </h2>
          <p className="text-lg text-[#6A5ACD]/70 max-w-2xl mx-auto">
            Порівняй зі звичайними подарунками
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 mb-12">
          {comparisons.map((comparison, index) => (
            <ComparisonRow key={index} {...comparison} />
          ))}
        </div>

        {/* Висновок */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl border border-[#B8B3FF]/30 p-8 text-center shadow-sm">
            <p className="text-lg text-[#6A5ACD]/80 mb-3">
              Стандартні подарунки — це витрати.
            </p>
            <p className="text-2xl font-bold text-[#6A5ACD]">
              Листосик — це інвестиція в емоції 💜
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
