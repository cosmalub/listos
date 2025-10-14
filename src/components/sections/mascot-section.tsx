import { Play } from "lucide-react";

export function MascotSection() {
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
              4 простих кроки — від покупки до готової листівки
            </p>

            <div className="space-y-8">
              {/* Step 1: Купуєш доступ */}
              <div className="flex flex-col md:flex-row gap-6 items-center bg-card rounded-2xl border-2 border-[#B8B3FF]/40 hover:border-[#B8B3FF] transition-all hover:shadow-lg p-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#B8B3FF] flex items-center justify-center text-white text-2xl font-bold">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary mb-3">Крок 1: Купуєш доступ до студії</h3>
                  <p className="text-muted-foreground">
                    Оплачуєш 399 грн → на твій email приходить посилання на студію.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Студія доступна <span className="font-semibold text-primary">24/7</span> — створюй, коли зручно! Ніхто не поганяє, ніхто не чекає. Твій темп, твій час.
                  </p>
                </div>
                <div className="w-full md:w-80 flex-shrink-0">
                  <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg aspect-video flex items-center justify-center">
                    <p className="text-muted-foreground text-sm">Візуал буде тут</p>
                  </div>
                </div>
              </div>

              {/* Step 2: Створюєш у студії */}
              <div className="flex flex-col md:flex-row-reverse gap-6 items-center bg-card rounded-2xl border-2 border-[#E8B3FF]/40 hover:border-[#E8B3FF] transition-all hover:shadow-lg p-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#E8B3FF] flex items-center justify-center text-white text-2xl font-bold">
                    2
                  </div>
                </div>
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
                      <span><span className="font-semibold text-primary">Створюєш дизайн листівки</span> — обираєш фото, текст, стиль. Все просто, як конструктор.</span>
                    </li>
                  </ol>
                  <p className="text-muted-foreground mt-3">
                    <span className="font-semibold text-primary">Процес займає 10 хвилин.</span> Все інтуїтивно — справиться кожен!
                  </p>
                </div>
                <div className="w-full md:w-80 flex-shrink-0">
                  <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg aspect-video flex items-center justify-center">
                    <p className="text-muted-foreground text-sm">Скріншоти студії</p>
                  </div>
                </div>
              </div>

              {/* Step 3: Замовляєш доставку */}
              <div className="flex flex-col md:flex-row gap-6 items-center bg-card rounded-2xl border-2 border-[#B8B3FF]/40 hover:border-[#B8B3FF] transition-all hover:shadow-lg p-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#B8B3FF] flex items-center justify-center text-white text-2xl font-bold">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary mb-3">Крок 3: Замовляєш доставку</h3>
                  <p className="text-muted-foreground mb-2">
                    Коли пісня і дизайн готові — замовляєш доставку прямо у студії.
                  </p>
                  <p className="text-muted-foreground mb-2">Вказуєш:</p>
                  <ul className="space-y-1 text-muted-foreground ml-4">
                    <li>— ПІБ отримувача</li>
                    <li>— Номер відділення Нової пошти</li>
                    <li>— Коментар (якщо потрібно)</li>
                  </ul>
                  <p className="text-muted-foreground mt-3">
                    <span className="font-semibold text-primary">Доставка безкоштовна</span> по всій Україні.
                  </p>
                </div>
                <div className="w-full md:w-80 flex-shrink-0">
                  <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg aspect-video flex items-center justify-center">
                    <p className="text-muted-foreground text-sm">Форма замовлення</p>
                  </div>
                </div>
              </div>

              {/* Step 4: Отримуєш готову листівку */}
              <div className="flex flex-col md:flex-row-reverse gap-6 items-center bg-card rounded-2xl border-2 border-[#E8B3FF]/40 hover:border-[#E8B3FF] transition-all hover:shadow-lg p-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#E8B3FF] flex items-center justify-center text-white text-2xl font-bold">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary mb-3">Крок 4: Отримуєш готову листівку</h3>
                  <p className="text-muted-foreground mb-2">
                    Листівка приїжджає за 1-2 дні.
                  </p>
                  <p className="text-muted-foreground mb-3">
                    Відкриваєш → читаєш текст → сканінуєш QR-код на зворотній стороні → відкривається анімована сторінка з піснею.
                  </p>
                  <p className="text-muted-foreground font-semibold text-primary mb-2">
                    І тут починається магія.
                  </p>
                  <p className="text-muted-foreground mb-2">
                    Пісня звучить. Фото з'являються. Емоції переповнюють.
                  </p>
                  <p className="text-muted-foreground font-semibold mb-2">
                    <span className="text-primary">Мама плаче від радості. Коханий обіймає. Друг посміхається.</span>
                  </p>
                  <p className="text-muted-foreground italic">
                    Це не просто листівка. Це спогад на все життя.
                  </p>
                </div>
                <div className="w-full md:w-80 flex-shrink-0">
                  <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg aspect-video flex items-center justify-center">
                    <p className="text-muted-foreground text-sm">Листівка + смартфон</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Video demonstration */}
            <div className="mt-16 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-center text-[#6A5ACD]">
                Подивіться, як це працює:
              </h3>
              <div className="relative rounded-xl overflow-hidden shadow-soft border-2 border-[#B8B3FF]/60 hover:border-[#B8B3FF] transition-colors hover:shadow-md bg-card">
                <div className="aspect-video">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                    {/* Custom play button overlay */}
                    <div className="bg-card/90 backdrop-blur-sm text-primary rounded-full p-4 transform transition-transform hover:scale-110 shadow-soft cursor-pointer">
                      <Play size={32} />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-card">
                  <p className="text-muted-foreground text-center">
                    Від ідеї до готової музичної листівки — весь процес створення за 2 хвилини
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