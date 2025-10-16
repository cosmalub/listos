import { X, Check } from "lucide-react";

interface ComparisonRowProps {
  standard: {
    icon: string;
    title: string;
    price: string;
    downside: string;
  };
  listosyk: {
    icon: string;
    title: string;
    benefit: string;
  };
}

function ComparisonRow({ standard, listosyk }: ComparisonRowProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Стандартний подарунок */}
      <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 relative">
        <div className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
          <X className="w-5 h-5 text-white" />
        </div>
        <div className="flex items-start gap-3">
          <span className="text-4xl">{standard.icon}</span>
          <div className="flex-1">
            <h3 className="font-bold text-gray-700 mb-1">
              {standard.title} <span className="text-sm text-gray-500">({standard.price})</span>
            </h3>
            <p className="text-sm text-red-600">{standard.downside}</p>
          </div>
        </div>
      </div>

      {/* Listosyk */}
      <div className="bg-gradient-to-br from-[#6A5ACD]/10 to-[#D292FF]/10 border-2 border-[#B8B3FF] rounded-xl p-6 relative">
        <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <Check className="w-5 h-5 text-white" />
        </div>
        <div className="flex items-start gap-3">
          <span className="text-4xl">{listosyk.icon}</span>
          <div className="flex-1">
            <h3 className="font-bold text-[#6A5ACD] mb-1">
              {listosyk.title}
            </h3>
            <p className="text-sm text-green-600 font-semibold">{listosyk.benefit}</p>
          </div>
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
        title: "Букет квітів",
        price: "500 грн",
        downside: "завяне через тиждень",
      },
      listosyk: {
        icon: "🎵",
        title: "Пісня що не зів'яне",
        benefit: "залишиться назавжди",
      },
    },
    {
      standard: {
        icon: "💌",
        title: "Листівка з магазину",
        price: "50 грн",
        downside: "прочитає і покладе в шухляду",
      },
      listosyk: {
        icon: "🎶",
        title: "Персональна музика",
        benefit: "буде слухати знову і знову",
      },
    },
    {
      standard: {
        icon: "🍫",
        title: "Цукерки",
        price: "300 грн",
        downside: "з'їдяться через день",
      },
      listosyk: {
        icon: "💎",
        title: "Емоції що залишаться",
        benefit: "безцінно",
      },
    },
    {
      standard: {
        icon: "⏰",
        title: "Купити в магазині",
        price: "1 година",
        downside: "час на пошуки",
      },
      listosyk: {
        icon: "⚡️",
        title: "Створити онлайн",
        benefit: "за 10 хвилин у студії",
      },
    },
    {
      standard: {
        icon: "😐",
        title: "Реакція: \"Дякую\"",
        price: "",
        downside: "забуде через тиждень",
      },
      listosyk: {
        icon: "😭",
        title: "Реакція: \"Я плачу\"",
        benefit: "запам'ятає назавжди",
      },
    },
  ];

  return (
    <section className="py-16 bg-white rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] relative z-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#6A5ACD] mb-4">
          Listosyk vs Стандартні подарунки
        </h2>
        <p className="text-lg text-center text-[#6A5ACD]/80 mb-12 max-w-3xl mx-auto">
          Що вибереш: подарунок, який зів'яне, або емоцію, яка залишиться назавжди?
        </p>

        <div className="max-w-5xl mx-auto">
          {/* Заголовки колонок */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 border-2 border-gray-300 rounded-xl p-4 text-center">
              <h3 className="text-xl font-bold text-gray-700">Стандартні подарунки</h3>
              <p className="text-sm text-gray-500 mt-1">(багато варіантів, що не залишаються)</p>
            </div>
            <div className="bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] rounded-xl p-4 text-center">
              <h3 className="text-xl font-bold text-white">Один Listosyk</h3>
              <p className="text-sm text-white/90 mt-1">(399 грн — замінює все)</p>
            </div>
          </div>

          {/* Порівняння */}
          <div className="space-y-6 mb-12">
            {comparisons.map((comparison, index) => (
              <ComparisonRow key={index} {...comparison} />
            ))}
          </div>
        </div>

        {/* Висновок */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#8A7AEE]/10 to-[#D292FF]/10 rounded-2xl border-2 border-[#B8B3FF] p-8 text-center">
          <h3 className="text-2xl font-bold text-[#6A5ACD] mb-4">Висновок:</h3>
          <p className="text-lg text-[#6A5ACD]/90 mb-4">
            Стандартні подарунки — це витрати. Listosyk — це інвестиція в емоції.
          </p>
          <p className="text-xl font-bold text-[#6A5ACD]">
            399 грн за спогад, який залишиться на все життя. Це не дорого. Це безцінно.
          </p>
        </div>
      </div>
    </section>
  );
}
