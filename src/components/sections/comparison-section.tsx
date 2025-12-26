import { Check, X } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

interface ComparisonItemProps {
  icon: string;
  text: string;
  isPositive?: boolean;
}

function ComparisonItem({ icon, text, isPositive = false }: ComparisonItemProps) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
      isPositive 
        ? "bg-gradient-to-r from-[#F8F7FF] to-white" 
        : "bg-gray-50"
    }`}>
      <span className="text-2xl flex-shrink-0">{icon}</span>
      <span className={`text-sm md:text-base ${isPositive ? "text-[#6A5ACD]" : "text-gray-600"}`}>
        {text}
      </span>
    </div>
  );
}

export function ComparisonSection() {
  const standardItems = [
    { icon: "💐", text: "Квіти зів'януть через тиждень" },
    { icon: "🎁", text: "Стандартна листівка — забудеться" },
    { icon: "⏰", text: "Години на пошуки в магазинах" },
    { icon: "😐", text: "Реакція: «Дякую» і все" },
    { icon: "💸", text: "Гроші витрачені — емоцій мало" },
  ];

  const listosykItems = [
    { icon: "🎵", text: "Пісня залишиться назавжди" },
    { icon: "💜", text: "Унікальна листівка — тільки для неї/нього" },
    { icon: "⚡", text: "Створення за 10 хвилин онлайн" },
    { icon: "😭", text: "Реакція: «Я плачу від щастя!»" },
    { icon: "✨", text: "Емоції на все життя" },
  ];

  return (
    <section className="py-16 bg-white rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] relative z-10">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="А тепер"
          titleSecondLine="порівняй"
          subtitle=""
          size="md"
          showUnderline={false}
        />

        <div className="max-w-5xl mx-auto relative">
          {/* Два стовпці */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            
            {/* Ліва колонка - Звичайно */}
            <div className="relative">
              {/* Заголовок колонки */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <X className="w-5 h-5 text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-500">Звичайно</h3>
              </div>
              
              {/* Картка */}
              <div className="bg-white border-2 border-gray-200 rounded-3xl p-5 md:p-6 space-y-3 h-full">
                {standardItems.map((item, index) => (
                  <ComparisonItem key={index} {...item} />
                ))}
              </div>
            </div>

            {/* Права колонка - З Листосиком */}
            <div className="relative">
              {/* Заголовок колонки */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-[#6A5ACD] to-[#9F8FEF] bg-clip-text text-transparent">
                  З Листосиком
                </h3>
              </div>
              
              {/* Картка */}
              <div className="bg-gradient-to-br from-[#F8F7FF] via-white to-[#F3EEFF] border-2 border-[#B8B3FF]/50 rounded-3xl p-5 md:p-6 space-y-3 h-full shadow-lg shadow-[#B8B3FF]/20">
                {listosykItems.map((item, index) => (
                  <ComparisonItem key={index} {...item} isPositive />
                ))}
                
                {/* Акцентна мітка */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                  ✨ Вау-ефект
                </div>
              </div>
            </div>
          </div>

          {/* VS елемент для десктопу */}
          <div className="hidden md:flex absolute left-1/2 top-[calc(50%-20px)] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-white border-4 border-[#B8B3FF]/40 flex items-center justify-center shadow-2xl">
              <span className="text-[#6A5ACD] font-black text-xl">VS</span>
            </div>
          </div>

          {/* Висновок */}
          <div className="mt-10 md:mt-12 text-center">
            <p className="text-lg md:text-xl text-[#6A5ACD] font-medium">
              Обирай емоції, а не просто подарунок 
              <span className="ml-2">💜</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
