import { Gift, Sparkles, Heart, Frown } from "lucide-react";
import { Card } from "@/components/ui/card";

export function BenefitsSection() {
  const benefits = [
    {
      icon: Gift,
      title: "Стандартні подарунки не передають почуття",
      description: "Хочеш показати близькій людині, наскільки вона важлива, але всі готові листівки здаються надто звичайними? → Листівка з піснею говорить за тебе й залишається назавжди.",
      iconColor: "text-primary"
    },
    {
      icon: Sparkles,
      title: "\"Дякую\" звучить сухо",
      description: "Відчуваєш океан вдячності, але просте \"дякую\" не передає навіть крапельки того, що ти відчуваєш? → Пісня всередині листівки зробить це щиро та голосно.",
      iconColor: "text-accent-foreground"
    },
    {
      icon: Heart,
      title: "Страх банальності у важливих словах",
      description: "Настав момент розкрити свої почуття, але боїшся, що звичайні слова здадуться банальними чи нещирими? → Листівка з піснею надасть значення глибини.",
      iconColor: "text-destructive"
    },
    {
      icon: Frown,
      title: "Складно щиро вибачитись",
      description: "Шукаєш спосіб вибачитися так, щоб людина відчула всю щирість твоїх намірів? → Пісня скаже \"пробач\" від серця.",
      iconColor: "text-orange-500"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Коли стандартні слова безсилі, допоможе<br />
            особиста листівка з піснею — ось як саме:
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-8 bg-card border-0 shadow-card rounded-3xl hover:shadow-soft transition-all duration-300">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary rounded-2xl mb-4">
                  <benefit.icon className={`h-10 w-10 ${benefit.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">
                  {benefit.title}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-center">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground italic">
            А тепер — познайомся з Листосиком, котиком, який перетворить твої слова й почуття на листівку з піснею
          </p>
          <div className="mt-4">
            <div className="w-8 h-8 mx-auto border-l-2 border-b-2 border-primary transform rotate-45 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
}