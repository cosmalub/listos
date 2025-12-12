import { Check, ShieldCheck, Sparkles, Zap, Truck, RefreshCw, Music, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import mascot100Guarantee from "@/assets/mascot-100-guarantee.png";

export function PricingSection() {
  const features = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Доступ до студії створення пісні та дизайну",
      description: "Створюєш сам у зручному інтерфейсі. Листосик допомагає на кожному кроці."
    },
    {
      icon: <Check className="w-5 h-5" />,
      title: "Друк листівки формату А6",
      description: "Якісний друк твого дизайну. Не домашній принтер — професійна поліграфія."
    },
    {
      icon: "📱",
      title: "QR-код на зворотній стороні",
      description: "Для прослуховування пісні. Сканінуєш → відкривається анімована сторінка."
    },
    {
      icon: <Truck className="w-5 h-5" />,
      title: "Безкоштовна доставка Новою поштою",
      description: "По всій Україні. Листівка приїжджає за 1-2 дні."
    },
    {
      icon: <Music className="w-5 h-5" />,
      title: "Анімована персональна сторінка з піснею",
      description: "Доступна назавжди. Можна ділитися посиланням."
    },
    {
      icon: <Download className="w-5 h-5" />,
      title: "MP3 файл пісні",
      description: "Завантажуй на телефон, діліся у месенджерах."
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      title: "Необмежені перегенерації у студії",
      description: "Не сподобався результат? Перегенеруй безкоштовно. Скільки завгодно разів."
    }
  ];

  return <section className="py-16 bg-white rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] relative z-10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto relative">
          <Card className="bg-card border-2 border-[#6A5ACD]/30 rounded-3xl shadow-lg overflow-hidden relative">
            {/* Акційний бейдж - тільки десктоп */}
            <div className="absolute top-3 right-3 md:top-6 md:right-6 z-10 hidden md:block">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-lg animate-pulse">
                🔥 Акційна ціна
              </div>
            </div>

            <div className="p-6 md:p-8 lg:p-12">
              
              {/* Header - Centered */}
              <div className="text-center mb-8">
                {/* Бейдж для мобільних - над заголовком */}
                <div className="md:hidden mb-4 flex justify-center">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                    🔥 Акційна ціна
                  </div>
                </div>
                
                <h2 className="font-baloo text-3xl md:text-4xl font-bold text-[#6A5ACD] mb-3">
                  Персональна музична листівка
                </h2>
                <p className="text-lg text-[#6A5ACD]/80">
                  Доступ до студії + друк + доставка = все включено
                </p>
              </div>

              {/* Features List - Two columns */}
              <div className="mb-10">
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 bg-[#F8F7FF] p-4 rounded-xl hover:shadow-md transition-all">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#6A5ACD] to-[#8A7CDD] rounded-xl flex items-center justify-center flex-shrink-0 text-white">
                        {typeof feature.icon === 'string' ? <span className="text-xl">{feature.icon}</span> : feature.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#6A5ACD] mb-1 text-sm md:text-base">{feature.title}</h4>
                        <p className="text-[#6A5ACD]/70 text-xs md:text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="text-center mb-8">
                <div className="inline-block bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-300 mb-6">
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <span className="line-through text-gray-400 text-xl md:text-2xl">600 грн</span>
                    <span className="text-green-600 font-bold text-3xl md:text-4xl">399 грн</span>
                  </div>
                  <p className="text-[#6A5ACD] font-semibold text-lg">
                    Все включено! Доступ + друк + доставка
                  </p>
                </div>

                {/* CTA Button */}
                <Button 
                  size="lg" 
                  className="text-lg px-12 py-7 rounded-full bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] hover:from-[#7A6ADE] hover:to-[#C282EF] text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 font-bold mb-6" 
                  onClick={() => window.location.href = '/order'}
                >
                  🎵 Замовити зараз
                </Button>

                {/* Benefits under button */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-xs text-[#6A5ACD]/80 text-center">Гарантія повернення грошей</p>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <RefreshCw className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-xs text-[#6A5ACD]/80 text-center">Необмежені перегенерації</p>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Truck className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-xs text-[#6A5ACD]/80 text-center">Доставка за 1-2 дні</p>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-yellow-600" />
                    </div>
                    <p className="text-xs text-[#6A5ACD]/80 text-center">Створення за 10 хвилин</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Mascot with Speech Bubble - Bottom Section for All Screens */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-10 mt-12">
            {/* Cat Image */}
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                src={mascot100Guarantee}
                alt="Листосик - 100% гарантія"
                className="w-64 h-64 transform transition-transform hover:scale-105 drop-shadow-2xl"
              />
            </div>

            {/* Speech Bubble */}
            <div className="w-full md:w-2/3 relative group">
              <div className="bg-card p-6 rounded-3xl border-2 border-[#B8B3FF]/60 group-hover:border-[#B8B3FF] transition-colors group-hover:shadow-md relative">
                {/* Speech bubble pointer - only visible on md screens and up */}
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 h-6 rotate-45 border-r-2 border-t-2 border-[#B8B3FF]/60 group-hover:border-[#B8B3FF] transition-colors bg-card"></div>

                <h3 className="text-xl font-bold text-[#6A5ACD] mb-3">Гарантія якості!</h3>
                <p className="text-muted-foreground">
                  Якщо не сподобається — повернемо гроші! Ми впевнені в якості наших музичних листівок.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}