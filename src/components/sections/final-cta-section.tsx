import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  const contrasts = [
    { item: "Квіти", result: "зів'януть", opacity: "opacity-50" },
    { item: "Солодощі", result: "зникнуть", opacity: "opacity-50" },
    { item: "Звичайні листівки", result: "забудуться", opacity: "opacity-50" },
    { item: "Пісня", result: "залишиться", opacity: "opacity-100", highlight: true },
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-[#F8F7FF] to-[#F0EEFF] rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] relative z-10 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#E8B3FF]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-[#B8B3FF]/25 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-[#6A5ACD]/5 to-[#D292FF]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl mx-auto text-center">
          {/* Заголовок */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#6A5ACD] mb-6 leading-tight">
            Створи подарунок,
            <br />
            <span className="bg-gradient-to-r from-[#6A5ACD] to-[#D292FF] bg-clip-text text-transparent">
              який запам'ятається надовго
            </span>
          </h2>

          {/* Підзаголовок */}
          <p className="text-lg md:text-xl text-[#6A5ACD]/70 mb-14 leading-relaxed">
            Квіти зів'януть. Солодощі закінчаться.
            <br />
            А пісня, створена з почуттям, залишиться.
          </p>

          {/* Контраст - красивий список */}
          <div className="bg-white/60 backdrop-blur-sm border border-[#6A5ACD]/10 rounded-3xl p-8 md:p-10 mb-12 shadow-lg">
            <div className="flex flex-col gap-4">
              {contrasts.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center gap-3 text-lg md:text-xl transition-all ${
                    item.highlight
                      ? "text-[#6A5ACD] font-semibold scale-105"
                      : "text-[#6A5ACD]/50"
                  }`}
                >
                  <span className={item.highlight ? "" : ""}>{item.item}</span>
                  <span className="text-[#6A5ACD]/30">—</span>
                  <span className={item.highlight ? "bg-gradient-to-r from-[#6A5ACD] to-[#D292FF] bg-clip-text text-transparent" : ""}>
                    {item.result}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Інсайт про ціну */}
          <div className="mb-12">
            <p className="text-xl md:text-2xl text-[#6A5ACD] font-medium mb-2">
              399 грн — це не ціна листівки.
            </p>
            <p className="text-lg md:text-xl text-[#6A5ACD]/70">
              Це спосіб залишити спогад.
            </p>
          </div>

          {/* CTA */}
          <Button
            onClick={() => (window.location.href = "/order")}
            size="lg"
            className="text-lg md:text-xl px-12 md:px-16 py-7 md:py-8 rounded-full bg-gradient-to-r from-[#6A5ACD] via-[#8A7AEE] to-[#D292FF] hover:from-[#5A4ABD] hover:via-[#7A6ADE] hover:to-[#C282EF] text-white shadow-xl shadow-[#6A5ACD]/25 transition-all duration-300 hover:shadow-2xl hover:shadow-[#6A5ACD]/35 hover:scale-105 font-semibold"
          >
            Створити спогад
          </Button>
        </div>
      </div>
    </section>
  );
}
