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
              <div className="flex flex-col md:flex-row gap-6 items-center bg-card rounded-2xl border-2 border-[#E8B3FF]/40 hover:border-[#E8B3FF] transition-all hover:shadow-lg p-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary mb-3">Крок 2: Створюєш пісню і дизайн у студії</h3>
                  <p className="text-muted-foreground mb-3">У зручній студії ти:</p>
                  <ol className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="font-semibold text-primary">1.</span>
                      <span><span className="font-semibold text-primary">Створюєш слова пісні</span> — Листосик (ШІ-помічник) ставить питання і допомагає знайти правильні слова. <span className="font-semibold">Не потрібно писати вірші</span> — просто розкажи, що хочеш сказати.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-primary">2.</span>
                      <span><span className="font-semibold text-primary">Генеруєш унікальну музику</span> — ШІ створює пісню за 30 секунд. Не сподобалось? Перегенеруй безкоштовно. Скільки завгодно разів.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-primary">3.</span>
                      <span><span className="font-semibold text-primary">Створюєш сторінку з анімацією для пісні</span> — обираєш нагоду (день народження, подяка, кохання тощо), вказуєш кому та від кого. Система автоматично створює персональну сторінку з анімацією, музикою та текстом пісні. Отримувач побачить її, відсканувавши QR-код на листівці.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-primary">4.</span>
                      <span><span className="font-semibold text-primary">Створюєш дизайн листівки</span> — обираєш фото, текст, стиль. Все просто, як конструктор.</span>
                    </li>
                  </ol>
                  <p className="text-muted-foreground mt-3">
                    <span className="font-semibold text-primary">Процес займає 10 хвилин.</span> Все інтуїтивно — справиться кожен!
                  </p>
                </div>
                <div className="w-full md:w-80 flex-shrink-0">
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