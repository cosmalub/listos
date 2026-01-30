import { Button } from "@/components/ui/button";
import { useOrderDialog } from "@/components/order/OrderDialogContext";

export function ListosikIntroExperiment() {
  const { openOrderDialog } = useOrderDialog();
  
  return (
    <section className="py-16 bg-white rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] relative z-10">
      <div className="container mx-auto px-4">
        <div className="mt-8 text-center">
          <p className="text-lg text-[#6A5ACD]/80 italic animate-pulse-slow">
            А тепер — познайомся з Листосиком, котиком, який перетворить твої слова й почуття на листівку з піснею
          </p>
          <div className="w-12 h-12 mx-auto mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B8B3FF] animate-bounce w-full h-full">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>

          {/* Lystosyk Introduction with Speech Bubble */}
          <div className="max-w-5xl mx-auto mt-0 mb-8 px-4">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              {/* Cat Image */}
              <div className="w-full md:w-1/3 flex justify-center">
                <img src="/lovable-uploads/26b60a97-63b1-4ff3-93d6-e0607581e4b0.png" alt="Листосик - кіт-помічник для створення музичних листівок" className="w-64 h-64 transform transition-transform hover:scale-105 drop-shadow-2xl" />
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
        </div>
      </div>
    </section>
  );
}
