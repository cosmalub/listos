import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#FFF8FB] via-white to-[#F8F7FF] rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] relative z-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-[#6A5ACD] mb-6">
              💜 Створи подарунок, який запам'ятається назавжди
            </h2>
            <p className="text-xl md:text-2xl text-[#6A5ACD]/70 leading-relaxed">
              Квіти завянуть. Цукерки зʼїдяться. А пісня, створена для коханої людини, залишиться назавжди.
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-gradient-to-br from-[#F8F7FF] to-white border-2 border-[#B8B3FF]/60 rounded-3xl p-8 md:p-12 mb-8 shadow-lg hover:shadow-xl hover:border-[#B8B3FF] transition-all shadow-[0_0_20px_rgba(184,179,255,0.15)]">
            <div className="space-y-6 text-[#6A5ACD]/80 text-lg leading-relaxed">
              <p>
                <strong className="text-[#6A5ACD] text-xl">399 грн</strong> (або <strong className="text-[#6A5ACD] text-xl">299 грн</strong> зі знижкою) — це не ціна листівки. <strong className="text-[#6A5ACD]">Це ціна спогаду на все життя.</strong>
              </p>

              <p>
                Це ціна емоцій, які ти подаруєш. Це ціна <strong className="text-[#6A5ACD]">сліз радості на очах мами</strong>, коли вона почує своє ім'я в пісні. Це ціна <strong className="text-[#6A5ACD]">посмішки коханого</strong>, коли він відскануе QR-код і почує твої слова в музиці. Це ціна <strong className="text-[#6A5ACD]">сміху друзів</strong> на вечірці, коли вони танцюватимуть під твою пісню.
              </p>

              <p className="text-2xl font-bold text-[#6A5ACD] text-center py-4">
                Стандартні подарунки — це витрати. Листосик — це інвестиція в емоції.
              </p>
            </div>
          </div>

          {/* Comparison */}
          <div className="bg-white border-2 border-[#E8B3FF]/60 rounded-3xl p-8 mb-8 shadow-md hover:shadow-lg hover:border-[#E8B3FF] transition-all shadow-[0_0_15px_rgba(232,179,255,0.15)]">
            <div className="space-y-4 text-[#6A5ACD]/80 text-lg">
              <p className="flex items-center gap-3">
                <span className="text-2xl">💐</span>
                <span>Букет квітів за 500 грн завяне через тиждень.</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-2xl">💌</span>
                <span>Листівка з магазину за 50 грн забудеться через день.</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-2xl">🍫</span>
                <span>Цукерки за 300 грн зʼїдяться через годину.</span>
              </p>
              
              <p className="text-2xl font-bold text-[#6A5ACD] pt-4 flex items-center gap-3">
                <span className="text-3xl">🎵</span>
                <span>А пісня, створена з любов'ю, залишиться назавжди.</span>
              </p>
            </div>
          </div>

          {/* Urgency */}
          <div className="text-center mb-10">
            <p className="text-xl text-[#6A5ACD] mb-3 font-semibold">
              Не втрачай шанс здивувати. Створи пісню зараз — за 10 хвилин.
            </p>
            <p className="text-lg text-[#6A5ACD]/70 mb-2">
              День народження не чекає. Річниця не переноситься. Емоції не можна відкласти на потім.
            </p>
            <p className="text-2xl font-bold text-[#6A5ACD] mt-6">
              Створи спогад, який залишиться на все життя.
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center bg-gradient-to-br from-[#F8F7FF]/30 to-transparent rounded-3xl p-8">
            <Button
              onClick={() => window.location.href = '/order'}
              className="text-xl px-16 py-8 rounded-full bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] hover:from-[#7A6ADE] hover:to-[#C282EF] text-white shadow-2xl transition-all hover:shadow-3xl hover:scale-110 font-bold animate-pulse-slow"
            >
              🎵 Створити спогад назавжди
            </Button>
            
            <p className="text-sm text-[#6A5ACD]/60 mt-6">
              ⚡️ Процес займає 10 хвилин • 💯 Гарантія повернення грошей • 🚚 Доставка за 1-2 дні
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}