import { Truck, Music, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function PricingSection() {
  const features = [
    {
      icon: <Music className="w-5 h-5" />,
      title: "Створення пісні з твоїх слів",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Персональна сторінка з піснею та анімацією",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Фізична листівка формату A6",
      subtitle: "з переходом на персональну сторінку",
    },
    {
      icon: <Truck className="w-5 h-5" />,
      title: "Безкоштовна доставка по Україні",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] relative z-10 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-br from-[#E8B3FF]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-[#B8B3FF]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#6A5ACD]/5 to-[#D292FF]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          {/* Main Header Section */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">
              Скажи важливе — красиво і по-справжньому
            </h2>
            <p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto">
              Ми допоможемо оформити твої слова у музичну листівку, яку приємно вручити.
            </p>
          </div>

          {/* Features Card */}
          <Card className="bg-gradient-to-br from-white via-white to-[#F8F7FF] border-2 border-[#6A5ACD]/20 rounded-3xl shadow-xl overflow-hidden relative backdrop-blur-sm">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6A5ACD]/[0.02] to-[#D292FF]/[0.02] pointer-events-none" />
            
            <div className="p-8 md:p-10 lg:p-14 relative">
              {/* Features Section Header */}
              <div className="text-center mb-10">
                <p className="inline-block text-sm md:text-base font-medium text-[#6A5ACD]/80 bg-[#6A5ACD]/10 px-4 py-2 rounded-full">
                  ✨ Усе, щоб подарунок вийшов гідним
                </p>
              </div>

              {/* Features List */}
              <div className="mb-12">
                <div className="flex flex-col gap-4 max-w-xl mx-auto">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 md:p-5 rounded-2xl border border-[#6A5ACD]/10 hover:border-[#6A5ACD]/30 hover:shadow-lg hover:shadow-[#6A5ACD]/5 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-[#6A5ACD] to-[#8A7CDD] rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-lg shadow-[#6A5ACD]/20 group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#6A5ACD] text-base md:text-lg">{feature.title}</h4>
                        {feature.subtitle && (
                          <p className="text-[#6A5ACD]/60 text-sm">{feature.subtitle}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#6A5ACD]/20 to-transparent mb-10" />

              {/* Pricing & CTA */}
              <div className="text-center">
                {/* Price */}
                <div className="mb-8">
                  <div className="inline-flex items-baseline gap-2 mb-3">
                    <span className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#6A5ACD] to-[#8A7CDD] bg-clip-text text-transparent">
                      399
                    </span>
                    <span className="text-2xl md:text-3xl font-semibold text-[#6A5ACD]/70">грн</span>
                  </div>
                  <p className="text-[#6A5ACD]/60 text-base md:text-lg font-medium">
                    Готовий подарунок. Без доплат і сюрпризів.
                  </p>
                </div>

                {/* CTA Button */}
                <Button
                  size="lg"
                  className="text-lg md:text-xl px-10 md:px-14 py-7 md:py-8 rounded-full bg-gradient-to-r from-[#6A5ACD] via-[#8A7AEE] to-[#D292FF] hover:from-[#5A4ABD] hover:via-[#7A6ADE] hover:to-[#C282EF] text-white shadow-xl shadow-[#6A5ACD]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#6A5ACD]/40 hover:scale-105 font-bold"
                  onClick={() => (window.location.href = "/order")}
                >
                  <span className="mr-2">🎵</span>
                  Почати створення
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
