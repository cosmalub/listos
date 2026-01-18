import { Button } from "@/components/ui/button";
import { useOrderDialog } from "@/components/order/OrderDialogContext";
import postcardScanImage from "@/assets/postcard-scan.png";

export function MascotSection() {
  const { openOrderDialog } = useOrderDialog();
  return (
    <section className="py-16 bg-white rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] relative z-10">
      <div className="container mx-auto px-4">
        <div className="mt-8 text-center">
          <p className="text-lg text-[#6A5ACD]/80 italic animate-pulse-slow">
            А тепер — познайомся з Листосиком, котиком, який перетворить твої слова й почуття на листівку з піснею
          </p>
          <div className="w-12 h-12 mx-auto mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#B8B3FF] animate-bounce w-full h-full"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>

          {/* Lystosyk Introduction with Speech Bubble */}
          <div className="max-w-5xl mx-auto mt-0 mb-8 px-4">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              {/* Cat Image */}
              <div className="w-full md:w-1/3 flex justify-center">
                <img
                  src="/lovable-uploads/26b60a97-63b1-4ff3-93d6-e0607581e4b0.png"
                  alt="Листосик - кіт-помічник для створення музичних листівок"
                  className="w-64 h-64 transform transition-transform hover:scale-105 drop-shadow-2xl"
                />
              </div>

              {/* Speech Bubble */}
              <div className="w-full md:w-2/3 relative group">
                <div className="bg-card p-6 rounded-3xl border-2 border-[#B8B3FF]/60 group-hover:border-[#B8B3FF] transition-colors group-hover:shadow-md relative">
                  {/* Speech bubble pointer - only visible on md screens and up */}
                  <div className="hidden md:block absolute top-1/2 -left-3 transform -translate-y-1/2 w-6 h-6 rotate-45 border-l-2 border-b-2 border-[#B8B3FF]/60 group-hover:border-[#B8B3FF] transition-colors bg-card"></div>

                  <h3 className="text-xl font-bold text-[#6A5ACD] mb-3 text-left">Привіт, я Листосик!</h3>
                  <p className="text-muted-foreground text-left">
                    Розкажи, що хочеш сказати — «дякую», «вибач», «вітаю» чи «кохаю», — а я допоможу написати пісню,
                    зроблю дизайн листівки з QR-кодом, надрукую та надішлю її тобі, щоб ти подарував її особливій людині.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How it works section */}
          <div className="max-w-6xl mx-auto mt-20 mb-12 px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">
              Як це працює?
            </h2>
            <p className="text-lg text-center text-muted-foreground mb-12">
              3 простих кроки — від покупки до готової листівки
            </p>

            <div className="space-y-8">
              {/* Step 1: Купуєш доступ */}
              <div className="flex flex-col gap-6 bg-card rounded-2xl border-2 border-[#B8B3FF]/40 hover:border-[#B8B3FF] transition-all hover:shadow-lg p-6">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">Крок 1: Купуєш доступ до студії</h3>
                  <p className="text-muted-foreground">
                    Оплачуєш 399 грн та вказуєш адресу доставки → на твій email приходить посилання на студію.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    <span className="font-semibold text-primary">Доставка безкоштовна</span> по всій Україні. Студія доступна <span className="font-semibold text-primary">24/7</span> — створюй, коли зручно!
                  </p>
                </div>
                <div className="w-full flex justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#B8B3FF] to-[#E8B3FF] hover:from-[#A8A3EF] hover:to-[#D8A3EF] text-white font-bold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    onClick={openOrderDialog}
                  >
                    Купити доступ
                  </Button>
                </div>
              </div>

              {/* Step 2: Створюєш у студії */}
              <div className="flex flex-col gap-6 bg-card rounded-2xl border-2 border-[#E8B3FF]/40 hover:border-[#E8B3FF] transition-all hover:shadow-lg p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-primary mb-2">Крок 2: Створюєш пісню і дизайн у студії</h3>
                  <p className="text-muted-foreground mb-6">У зручній студії за 10 хвилин ти:</p>
                </div>

                {/* Grid of 4 cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {/* Card 1 */}
                  <div className="bg-gradient-to-br from-[#B8B3FF]/10 to-[#E8B3FF]/10 rounded-xl p-5 border border-[#B8B3FF]/30 text-center hover:border-[#B8B3FF]/60 transition-colors">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gradient-to-r from-[#B8B3FF] to-[#E8B3FF] flex items-center justify-center text-white font-bold text-lg shadow-md">
                      1
                    </div>
                    <h4 className="font-semibold text-primary mb-2">Створюєш слова пісні</h4>
                    <p className="text-sm text-muted-foreground">
                      Листосик (ШІ-помічник) ставить питання і допомагає знайти правильні слова. 
                      Не потрібно писати вірші — просто розкажи, що хочеш сказати.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-gradient-to-br from-[#E8B3FF]/10 to-[#B8B3FF]/10 rounded-xl p-5 border border-[#E8B3FF]/30 text-center hover:border-[#E8B3FF]/60 transition-colors">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gradient-to-r from-[#E8B3FF] to-[#B8B3FF] flex items-center justify-center text-white font-bold text-lg shadow-md">
                      2
                    </div>
                    <h4 className="font-semibold text-primary mb-2">Генеруєш унікальну музику</h4>
                    <p className="text-sm text-muted-foreground">
                      ШІ створює пісню за 30 секунд. Не сподобалось? 
                      Перегенеруй безкоштовно. Скільки завгодно разів.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-gradient-to-br from-[#B8B3FF]/10 to-[#E8B3FF]/10 rounded-xl p-5 border border-[#B8B3FF]/30 text-center hover:border-[#B8B3FF]/60 transition-colors">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gradient-to-r from-[#B8B3FF] to-[#E8B3FF] flex items-center justify-center text-white font-bold text-lg shadow-md">
                      3
                    </div>
                    <h4 className="font-semibold text-primary mb-2">Створюєш сторінку з анімацією</h4>
                    <p className="text-sm text-muted-foreground">
                      Обираєш нагоду, вказуєш кому та від кого. Система створює персональну сторінку 
                      з анімацією, музикою та текстом. Отримувач побачить її, відсканувавши QR-код.
                    </p>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-gradient-to-br from-[#E8B3FF]/10 to-[#B8B3FF]/10 rounded-xl p-5 border border-[#E8B3FF]/30 text-center hover:border-[#E8B3FF]/60 transition-colors">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gradient-to-r from-[#E8B3FF] to-[#B8B3FF] flex items-center justify-center text-white font-bold text-lg shadow-md">
                      4
                    </div>
                    <h4 className="font-semibold text-primary mb-2">Створюєш дизайн листівки</h4>
                    <p className="text-sm text-muted-foreground">
                      Обираєш фото, текст, стиль. Все просто, як конструктор.
                    </p>
                  </div>
                </div>

                {/* Time badge */}
                <div className="text-center">
                  <span className="inline-block bg-gradient-to-r from-[#B8B3FF]/20 to-[#E8B3FF]/20 text-primary font-semibold px-4 py-2 rounded-full border border-[#B8B3FF]/30">
                    ⏱️ Весь процес займає 10 хвилин
                  </span>
                </div>

                {/* Video */}
                <div className="w-full max-w-2xl mx-auto">
                  <video
                    src="/videos/studio.mp4"
                    controls
                    className="rounded-lg w-full shadow-lg"
                    preload="metadata"
                  >
                    Ваш браузер не підтримує відео.
                  </video>
                </div>
              </div>

              {/* Step 3: Даруєш і дивишся на емоції */}
              <div className="flex flex-col md:flex-row gap-6 items-center bg-card rounded-2xl border-2 border-[#B8B3FF]/40 hover:border-[#B8B3FF] transition-all hover:shadow-lg p-6">
                <div className="w-full md:w-80 flex-shrink-0">
                  <img
                    src={postcardScanImage}
                    alt="Листівка з QR-кодом та смартфон, який сканує її"
                    className="rounded-lg aspect-square object-cover w-full shadow-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary mb-3">Крок 3: Даруєш і дивишся на емоції</h3>
                  <p className="text-muted-foreground mb-2">
                    Листівка приїжджає <span className="font-semibold text-primary">Новою поштою за 1-2 дні</span>.
                    Ти отримуєш її та даруєш особливій людині.
                  </p>
                  <p className="text-muted-foreground mb-3">
                    <span className="font-semibold text-primary">А далі відбувається магія:</span> отримувач відкриває листівку → читає твої слова → сканує QR-код → і... звучить пісня, створена саме для нього.
                  </p>
                  <p className="text-muted-foreground mb-2">
                    Пісня звучить. Слова зворушують. Емоції переповнюють.
                  </p>
                  <p className="text-muted-foreground font-semibold mb-2">
                    <span className="text-primary">Мама плаче від радості. Коханий обіймає. Друг посміхається.</span>
                  </p>
                  <p className="text-muted-foreground italic">
                    Це не просто листівка. Це спогад на все життя.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}