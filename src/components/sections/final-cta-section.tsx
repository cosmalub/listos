import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#F8F7FF] relative z-10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Головна картка */}
          <div className="relative bg-gradient-to-br from-white via-[#FDFCFF] to-[#F8F7FF] border-2 border-[#6A5ACD]/20 rounded-3xl p-10 md:p-14 text-center shadow-xl shadow-[#6A5ACD]/10 overflow-hidden">
            {/* Декоративні елементи */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#E8B3FF]/30 to-transparent rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#B8B3FF]/30 to-transparent rounded-full blur-2xl translate-x-1/2 translate-y-1/2" />

            <div className="relative">
              {/* Заголовок */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#6A5ACD] mb-4 leading-tight">
                Створи подарунок,
                <br />
                <span className="bg-gradient-to-r from-[#6A5ACD] to-[#D292FF] bg-clip-text text-transparent">
                  який запам'ятається надовго
                </span>
              </h2>

              {/* Підзаголовок */}
              <p className="text-base md:text-lg text-[#6A5ACD]/60 mb-8">
                Квіти зів'януть. Солодощі закінчаться.
                <br />
                А пісня, створена з почуттям, залишиться.
              </p>

              {/* Ціна */}
              <div className="mb-8">
                <p className="text-lg md:text-xl text-[#6A5ACD] font-medium">
                  399 грн — це спосіб залишити спогад.
                </p>
              </div>

              {/* CTA */}
              <Button
                onClick={() => (window.location.href = "/order")}
                size="lg"
                className="text-lg md:text-xl px-10 md:px-14 py-7 md:py-8 rounded-full bg-gradient-to-r from-[#6A5ACD] via-[#8A7AEE] to-[#D292FF] hover:from-[#5A4ABD] hover:via-[#7A6ADE] hover:to-[#C282EF] text-white shadow-lg shadow-[#6A5ACD]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#6A5ACD]/35 hover:scale-105 font-semibold"
              >
                Створити спогад
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
