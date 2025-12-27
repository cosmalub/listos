import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import mascotQualityGuarantee from "@/assets/mascot-quality-guarantee.png";

export function GuaranteeSection() {
  const guarantees = [
    {
      icon: "✅",
      title: "Повернення грошей протягом 24 годин",
    },
    {
      icon: "🔄",
      title: "Необмежені перегенерації",
    },
  ];

  return (
    <section className="py-16 bg-white rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] relative z-10">
      <div className="container mx-auto px-4">
        {/* 1. ОСНОВНИЙ БЛОК ГАРАНТІЙ */}
        <SectionHeader
          title="Ми гарантуємо"
          subtitle="Твій ризик = 0. Якщо результат не сподобається — ми повернемо гроші."
          size="md"
        />

        {/* Guarantee Items - Simple List */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="flex flex-col gap-4">
            {guarantees.map((guarantee, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-[#F8F7FF] p-5 rounded-2xl border border-[#6A5ACD]/10"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-white shadow-sm">
                  {guarantee.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#6A5ACD]">{guarantee.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* 2. CTA БЛОК "БЕЗ РИЗИКУ" */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-[#6A5ACD] to-[#8A7AEE] rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Створюй без ризику</h3>
              <p className="text-lg text-white/90 max-w-xl mx-auto mb-8">
                Спробуй спокійно. Якщо щось піде не так — ми повернемо гроші.
              </p>

              <Button
                onClick={() => (window.location.href = "/order")}
                size="lg"
                className="text-lg px-12 py-7 rounded-full bg-white text-[#6A5ACD] hover:bg-gray-50 shadow-xl transition-all hover:scale-105 font-bold"
              >
                Почати без ризику
              </Button>
            </div>
          </div>
        </div>

        {/* 3. ЛЮДСЬКИЙ БЛОК З ЛИСТОСИКОМ */}
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src={mascotQualityGuarantee}
              alt="Листосик"
              className="w-48 h-48 md:w-56 md:h-56 transform transition-transform hover:scale-105 drop-shadow-xl"
            />
          </div>

          <div className="w-full md:w-2/3 relative group">
            <div className="bg-white p-6 rounded-3xl border-2 border-[#B8B3FF]/60 group-hover:border-[#B8B3FF] transition-colors group-hover:shadow-md relative">
              {/* Speech bubble pointer - only visible on md screens and up */}
              <div className="hidden md:block absolute top-1/2 -left-3 transform -translate-y-1/2 w-6 h-6 rotate-45 border-l-2 border-b-2 border-[#B8B3FF]/60 group-hover:border-[#B8B3FF] transition-colors bg-white"></div>

              <h3 className="text-xl font-bold text-[#6A5ACD] mb-3">Я поруч, якщо щось піде не так</h3>
              <p className="text-[#6A5ACD]/80 leading-relaxed">
                Якщо результат не сподобається — просто напиши нам.
                <br />
                Ми все вирішимо спокійно і без зайвих питань.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
