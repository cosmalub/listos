import { Play } from "lucide-react";

export function MascotSection() {
  return (
    <section className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="mt-20 text-center">
          <p className="text-lg text-primary/90 italic animate-pulse-slow">
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
              className="text-accent animate-bounce w-full h-full"
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

                  <h3 className="text-xl font-bold text-primary mb-3">Привіт, я Листосик!</h3>
                  <p className="text-muted-foreground">
                    Розкажи, що хочеш сказати — «дякую», «вибач», «вітаю» чи «кохаю», — а я допоможу написати пісню,
                    зроблю дизайн листівки з QR-кодом, надрукую та надішлю її тобі, щоб ти подарував її особливій людині.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Process Steps - directly after Lystosyk introduction without heading */}
          <div className="max-w-5xl mx-auto mt-16 mb-12 px-4">
            <div className="flex flex-col md:flex-row gap-6 md:gap-0">
              {/* Step 1 */}
              <div className="flex-1 relative">
                <div className="bg-card rounded-xl border-l-4 border-accent p-6 h-full transition-all hover:shadow-soft">
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-lg font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary">Створюєш слова і пісню</h3>
                  <p className="text-muted-foreground">
                    Ти складаєш <span className="font-semibold text-primary">слова пісні</span> та відразу{" "}
                    <span className="font-semibold text-primary">створюєш саму пісню</span> для твого привітання, вибачення чи
                    подяки. Листосик допоможе знайти правильні слова та мелодію! Ти отримуєш{" "}
                    <span className="font-semibold text-primary">готову персоналізовану пісню</span> одразу після створення.
                  </p>
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="hidden md:flex items-center justify-center w-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="24"
                  viewBox="0 0 48 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                >
                  <path d="M5 12h38" />
                  <path d="M30 5l13 7-13 7" />
                </svg>
              </div>

              {/* Step 2 */}
              <div className="flex-1 relative">
                <div className="bg-card rounded-xl border-l-4 border-[#B8B3FF]/60 hover:border-[#B8B3FF] p-6 h-full transition-colors hover:shadow-md">
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#B8B3FF] flex items-center justify-center text-white text-lg font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary">Створюєш дизайн листівки</h3>
                  <p className="text-muted-foreground">
                    Ти оформлюєш <span className="font-semibold text-primary">лицеву сторону листівки</span> з головним
                    посланням. Потім додаєш{" "}
                    <span className="font-semibold text-primary">особисті слова на зворотній стороні</span> та підпис –
                    щоб зробити подарунок по-справжньому неповторним.
                  </p>
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="hidden md:flex items-center justify-center w-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="24"
                  viewBox="0 0 48 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                >
                  <path d="M5 12h38" />
                  <path d="M30 5l13 7-13 7" />
                </svg>
              </div>

              {/* Step 3 */}
              <div className="flex-1 relative">
                <div className="bg-card rounded-xl border-l-4 border-accent p-6 h-full transition-all hover:shadow-soft">
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-lg font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary">Отримуєш готову листівку</h3>
                  <p className="text-muted-foreground">
                    Ось і все! Твоя <span className="font-semibold text-primary">унікальна листівка</span> з
                    персоналізованою піснею готова. Завдяки{" "}
                    <span className="font-semibold text-primary">спеціальному QR-коду</span> на листівці, твій одержувач
                    зможе відразу почути твоє музичне послання.
                  </p>
                </div>
              </div>

              {/* Mobile arrows */}
              <div className="flex justify-center md:hidden my-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                >
                  <path d="M12 5v14" />
                  <path d="M19 12l-7 7-7-7" />
                </svg>
              </div>
              <div className="flex justify-center md:hidden my-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                >
                  <path d="M12 5v14" />
                  <path d="M19 12l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Video demonstration */}
            <div className="mt-16 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-6 text-center text-primary">
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