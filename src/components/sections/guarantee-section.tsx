import { CheckCircle, Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GuaranteeCardProps {
  icon: string;
  title: string;
  content: string[];
  accentColor: string;
}

function GuaranteeCard({ icon, title, content, accentColor }: GuaranteeCardProps) {
  return (
    <div 
      className="group bg-white rounded-2xl p-6 border-2 transition-all hover:shadow-xl hover:scale-105"
      style={{ borderColor: `${accentColor}40` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-md transition-all group-hover:scale-110"
          style={{ backgroundColor: `${accentColor}20` }}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold text-[#6A5ACD]">{title}</h3>
      </div>
      
      <div className="space-y-3">
        {content.map((paragraph, index) => (
          <p key={index} className="text-[#6A5ACD]/80 leading-relaxed">
            {paragraph.split('**').map((part, i) => 
              i % 2 === 1 ? <strong key={i} className="text-[#6A5ACD] font-semibold">{part}</strong> : part
            )}
          </p>
        ))}
      </div>
    </div>
  );
}

export function GuaranteeSection() {
  const guarantees = [
    {
      icon: "✅",
      title: "Повернення грошей без питань",
      content: [
        "Якщо листівка не викличе вау-ефект у отримувача — повернемо гроші. Без питань. Без бюрократії.",
        "Просто напиши в чат або на email: \"Не сподобалось\" — і гроші повернуться на картку протягом 24 годин.",
        "**Чому ми це робимо?** Бо впевнені у якості. Понад 500 клієнтів залишилися задоволені. **Жодного повернення.**"
      ],
      accentColor: "#10B981"
    },
    {
      icon: "✨",
      title: "Гарантія унікальності",
      content: [
        "Якщо знайдеш таку ж пісню у іншого замовника — повернемо подвійно (798 грн).",
        "ШІ не копіює. Він створює кожну пісню з нуля — базуючись на твоїх словах, емоціях, історії.",
        "У всьому світі немає такої ж музики, як твоя. **Твоя пісня — єдина у своєму роді.**"
      ],
      accentColor: "#8B5CF6"
    },
    {
      icon: "🔄",
      title: "Необмежені перегенерації",
      content: [
        "Якщо ШІ зробить помилку в тексті або пісня не сподобається — перегенеруємо безкоштовно. Скільки завгодно разів.",
        "У студії ти можеш перегенерувати пісню 10, 20, 100 разів. Доки не буде ідеально.",
        "**Ти платиш тільки тоді, коли задоволений результатом.**"
      ],
      accentColor: "#3B82F6"
    }
  ];

  return (
    <section className="py-16 bg-white rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] relative z-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6A5ACD] mb-4">
            Ми гарантуємо
          </h2>
          <p className="text-lg md:text-xl text-[#6A5ACD]/70 max-w-2xl mx-auto">
            Твій ризик = 0. Ми повертаємо гроші, якщо не сподобається
          </p>
        </div>

        {/* Guarantee Cards */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
          {guarantees.map((guarantee, index) => (
            <GuaranteeCard key={index} {...guarantee} />
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#6A5ACD] to-[#8A7AEE] rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Створюй без ризиків — всі гарантії на твоєму боці
                </h3>
                <p className="text-lg text-white/90 max-w-2xl mx-auto">
                  Спробуй прямо зараз. Якщо щось не так — повернемо гроші протягом 24 годин
                </p>
              </div>

              <div className="flex justify-center mb-8">
                <Button 
                  onClick={() => window.location.href = '/studio'}
                  size="lg"
                  className="text-lg px-12 py-7 rounded-full bg-white text-[#6A5ACD] hover:bg-gray-50 shadow-xl transition-all hover:scale-105 font-bold"
                >
                  🎵 Почати безпечно за 399 грн
                </Button>
              </div>

              {/* Benefits grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <p className="font-semibold">Повернення за 24 години</p>
                  <p className="text-sm text-white/80">Без питань та бюрократії</p>
                </div>

                <div className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <p className="font-semibold">100% унікальність</p>
                  <p className="text-sm text-white/80">Подвійне повернення якщо знайдеш копію</p>
                </div>

                <div className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <p className="font-semibold">Необмежені спроби</p>
                  <p className="text-sm text-white/80">Перегенеруй скільки потрібно</p>
                </div>
              </div>

              {/* Trust badge */}
              <div className="mt-8 text-center">
                <p className="text-white/90 text-sm">
                  ✨ Понад <strong className="text-white">500 задоволених клієнтів</strong> • 
                  <strong className="text-white"> 0 повернень</strong> • 
                  Рейтинг <strong className="text-white">5.0/5.0</strong> ⭐
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mascot with additional guarantee message */}
        <div className="max-w-4xl mx-auto mt-12 flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/4 flex justify-center">
            <img
              src="/lovable-uploads/bfc3ff59-dfa5-40be-a6ec-6d9dbe6007d8.png"
              alt="Листосик - гарантує безпеку"
              className="w-48 h-48 transform transition-transform hover:scale-105 drop-shadow-2xl"
            />
          </div>

          <div className="w-full md:w-3/4 relative group">
            <div className="bg-white p-6 rounded-3xl border-2 border-[#B8B3FF]/60 group-hover:border-[#B8B3FF] transition-colors group-hover:shadow-md relative">
              <div className="hidden md:block absolute top-1/2 -left-3 transform -translate-y-1/2 w-6 h-6 rotate-45 border-l-2 border-b-2 border-[#B8B3FF]/60 group-hover:border-[#B8B3FF] transition-colors bg-white"></div>
              
              <h3 className="text-xl font-bold text-[#6A5ACD] mb-3">
                Я особисто слідкую за якістю! 😻
              </h3>
              <p className="text-[#6A5ACD]/80">
                Привіт! Я, Листосик, гарантую, що кожна листівка — це шедевр. 
                Якщо щось піде не так — я сам подбаю про повернення грошей. 
                Твоє задоволення — мій пріоритет! 💜
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
