import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-[#F8F7FF] rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] relative z-10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Заголовок */}
          <h2 className="text-3xl md:text-4xl font-bold text-[#6A5ACD] mb-6">
            Створи подарунок, який запам'ятається надовго
          </h2>

          {/* Підзаголовок */}
          <p className="text-lg md:text-xl text-[#6A5ACD]/70 mb-12 leading-relaxed">
            Квіти зів'януть. Солодощі закінчаться.
            <br />
            А пісня, створена з почуттям, залишиться.
          </p>

          {/* Контраст */}
          <div className="flex flex-col gap-3 mb-12 text-[#6A5ACD]/60">
            <p>Квіти — зів'януть</p>
            <p>Солодощі — зникнуть</p>
            <p>Звичайні листівки — забудуться</p>
            <p className="text-[#6A5ACD] font-semibold text-lg">Пісня — залишиться</p>
          </div>

          {/* Інсайт про ціну */}
          <p className="text-lg text-[#6A5ACD]/80 mb-10">
            399 грн — це не ціна листівки.
            <br />
            Це спосіб залишити спогад.
          </p>

          {/* CTA */}
          <Button
            onClick={() => (window.location.href = "/order")}
            size="lg"
            className="text-lg px-12 py-7 rounded-full bg-gradient-to-r from-[#6A5ACD] to-[#8A7AEE] hover:from-[#5A4ABD] hover:to-[#7A6ADE] text-white shadow-xl transition-all hover:shadow-2xl hover:scale-105 font-semibold"
          >
            Створити спогад
          </Button>
        </div>
      </div>
    </section>
  );
}
