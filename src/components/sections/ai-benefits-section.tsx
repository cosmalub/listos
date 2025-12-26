import { Zap, Sparkles, RefreshCw, DollarSign, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  comparison?: {
    title: string;
    items: Array<{ name: string; price: string; time: string; isHighlight?: boolean }>;
  };
  bottomText?: string;
}

function BenefitCard({ icon: Icon, title, description, comparison, bottomText }: BenefitCardProps) {
  return (
    <Card className="border-2 border-[#B8B3FF]/40 hover:border-[#B8B3FF] transition-all hover:shadow-lg h-full">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#6A5ACD] to-[#8A7CDD] rounded-xl flex items-center justify-center text-white flex-shrink-0">
            <Icon className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <h3 className="text-base md:text-lg font-bold text-[#6A5ACD]">{title}</h3>
        </div>

        <p className="text-sm md:text-base text-[#6A5ACD]/80 leading-relaxed mb-4 whitespace-pre-line">{description}</p>

        {comparison && (
          <div className="mt-4 md:mt-6">
            <p className="font-semibold text-[#6A5ACD] mb-2 md:mb-3 text-sm md:text-base">{comparison.title}</p>
            <div className="space-y-2">
              {comparison.items.map((item, index) => (
                <div
                  key={index}
                  className={`p-2 md:p-3 rounded-lg border-2 ${
                    item.isHighlight ? "bg-green-50 border-green-300" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`font-semibold text-xs md:text-sm ${item.isHighlight ? "text-green-700" : "text-gray-600"}`}
                    >
                      {item.name}
                    </span>
                    <span className={item.isHighlight ? "text-green-600" : "text-red-500"}>
                      {item.isHighlight ? "✅" : "❌"}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-1 gap-0.5 sm:gap-2">
                    <span className={`text-xs md:text-sm ${item.isHighlight ? "text-green-600 font-bold" : "text-gray-500"}`}>
                      {item.price}
                    </span>
                    <span className={`text-xs md:text-sm ${item.isHighlight ? "text-green-600 font-bold" : "text-gray-500"}`}>
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {bottomText && (
          <p className="mt-3 md:mt-4 text-sm md:text-base text-[#6A5ACD] font-semibold text-center">{bottomText}</p>
        )}
      </CardContent>
    </Card>
  );
}

export function AiBenefitsSection() {
  const benefits: BenefitCardProps[] = [
    {
      icon: Zap,
      title: "Швидко — за 30 секунд",
      description: `ШІ створює твою пісню за 30 секунд. Живі музиканти працюють тижнями. Студія звукозапису — місяцями.`,
      comparison: {
        title: "Порівняння:",
        items: [
          { name: "Студія звукозапису", price: "40 000 грн", time: "2-4 тижні" },
          { name: "Живі музиканти", price: "10 000 грн", time: "1 тиждень" },
          { name: "Листосик", price: "399 грн", time: "30 секунд", isHighlight: true },
        ],
      },
      bottomText: "Результат? Той самий професійний звук. Але у 1000 разів швидше і дешевше.",
    },
    {
      icon: Sparkles,
      title: "Унікально — створює з нуля",
      description: `ШІ не копіює готові пісні. Він створює кожну музику з нуля — базуючись на твоїх словах, емоціях, історії.

У всьому світі немає такої ж пісні, як твоя. Навіть якщо двоє людей напишуть однакові слова — музика буде різною.`,
      bottomText: "Твоя пісня — єдина у своєму роді. Унікальна. Як твої почуття.",
    },
    {
      icon: RefreshCw,
      title: "Необмежено — перегенеруй скільки хочеш",
      description: `ШІ не втомлюється. Живий музикант зробить 2-3 варіанти і скаже: "Вибирай з того, що є".

ШІ? Він може перегенерувати 10, 20, 100 разів. Доки не буде ідеально.`,
      bottomText: "Ти — режисер. ШІ — твій виконавець. Який слухається безмежно і не просить доплати.",
    },
    {
      icon: DollarSign,
      title: "Доступно — ціна як у букету",
      description: `Студія звукозапису бере 40 000 грн за пісню. Живий музикант — 10 000 грн.

Листосик — 399 грн. Як букет квітів.`,
      comparison: {
        title: "Порівняння:",
        items: [
          { name: "Букет квітів", price: "500 грн", time: "завяне через тиждень" },
          { name: "Листосик", price: "399 грн", time: "залишиться назавжди", isHighlight: true },
        ],
      },
      bottomText: "Що обереш?",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] relative z-10">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Чому ШІ — це круто?"
          subtitle="Ми не приховуємо — наші пісні створює штучний інтелект. І ось чому це чудово"
          size="md"
        />

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
}
