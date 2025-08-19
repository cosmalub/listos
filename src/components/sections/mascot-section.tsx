import { Music4, Palette, QrCode } from "lucide-react";

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
              <div className="w-full md:w-2/3 relative">
                <div className="bg-card p-6 rounded-3xl border-2 border-accent shadow-soft relative">
                  {/* Speech bubble pointer - only visible on md screens and up */}
                  <div className="hidden md:block absolute top-1/2 -left-3 transform -translate-y-1/2 w-6 h-6 rotate-45 border-l-2 border-b-2 border-accent bg-card"></div>

                  <h3 className="text-xl font-bold text-primary mb-3">Привіт, я Листосик!</h3>
                  <p className="text-muted-foreground">
                    Розкажи, що хочеш сказати — «дякую», «вибач», «вітаю» чи «кохаю», — а я допоможу написати пісню,
                    зроблю дизайн листівки з QR-кодом, надрукую та надішлю її тобі, щоб ти подарував її особливій людині.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Process Steps - Beautiful redesigned version */}
          <div className="max-w-6xl mx-auto mt-16 mb-12 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4 relative">
              {/* Desktop connector line */}
              <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
              
              {/* Step 1 */}
              <div className="relative group">
                <div className="bg-gradient-to-br from-card via-card to-accent/10 rounded-2xl p-8 h-full border border-accent/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden">
                  {/* Floating number */}
                  <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-gradient-to-r from-accent to-accent/80 flex items-center justify-center text-white text-xl font-bold shadow-lg z-10">
                    1
                  </div>
                  
                  {/* Icon */}
                  <div className="flex justify-center mb-6 mt-4">
                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                      <Music4 size={32} className="text-accent" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-center text-primary">Створюєш слова і пісню</h3>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    Ти складаєш <span className="font-semibold text-primary">слова пісні</span> та відразу{" "}
                    <span className="font-semibold text-primary">створюєш саму пісню</span> для твого привітання. 
                    Листосик допоможе знайти правильні слова та мелодію!
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group">
                <div className="bg-gradient-to-br from-card via-card to-secondary/10 rounded-2xl p-8 h-full border border-secondary/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden">
                  {/* Floating number */}
                  <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-gradient-to-r from-secondary to-secondary/80 flex items-center justify-center text-white text-xl font-bold shadow-lg z-10">
                    2
                  </div>
                  
                  {/* Icon */}
                  <div className="flex justify-center mb-6 mt-4">
                    <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                      <Palette size={32} className="text-secondary" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-center text-primary">Створюєш дизайн листівки</h3>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    Ти оформлюєш <span className="font-semibold text-primary">лицеву сторону листівки</span> з головним
                    посланням та додаєш{" "}
                    <span className="font-semibold text-primary">особисті слова на зворотній стороні</span>.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group">
                <div className="bg-gradient-to-br from-card via-card to-primary/10 rounded-2xl p-8 h-full border border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden">
                  {/* Floating number */}
                  <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-white text-xl font-bold shadow-lg z-10">
                    3
                  </div>
                  
                  {/* Icon */}
                  <div className="flex justify-center mb-6 mt-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <QrCode size={32} className="text-primary" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-center text-primary">Отримуєш готову листівку</h3>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    Твоя <span className="font-semibold text-primary">унікальна листівка</span> з
                    персоналізованою піснею готова! Завдяки{" "}
                    <span className="font-semibold text-primary">QR-коду</span> одержувач почує твоє послання.
                  </p>
                </div>
              </div>

              {/* Mobile vertical connector */}
              <div className="lg:hidden flex justify-center col-span-1 -my-4">
                <div className="w-0.5 h-8 bg-gradient-to-b from-accent/50 to-transparent"></div>
              </div>
              <div className="lg:hidden flex justify-center col-span-1 -my-4">
                <div className="w-0.5 h-8 bg-gradient-to-b from-secondary/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}