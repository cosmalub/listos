import { Music, Star, Sparkles, Heart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import listosykMascot from "@/assets/listosyk-mascot.png";

export function PricingSection() {
  const features = [
    "Листосик допоможе зі словами",
    "Дизайн створюється під твій настрій", 
    "Пісня озвучена з душею та теплом",
    "Гарантований \"Вау!\" ефект"
  ];

  const featureIcons = [Star, Sparkles, Heart, Music];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Унікальна листівка з твоєю піснею
          </h2>
        </div>

        <Card className="max-w-4xl mx-auto bg-gradient-soft rounded-3xl p-8 shadow-soft border-2 border-accent/30">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Features list */}
            <div className="lg:w-1/2 space-y-6">
              {features.map((feature, index) => {
                const Icon = featureIcons[index];
                return (
                  <div key={index} className="flex items-center gap-4 p-4 bg-card/60 rounded-2xl backdrop-blur-sm">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-soft">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-card-foreground font-medium">{feature}</span>
                  </div>
                );
              })}
            </div>

            {/* Pricing and mascot */}
            <div className="lg:w-1/2 text-center">
              <img 
                src={listosykMascot} 
                alt="Листосик з ціною" 
                className="w-32 h-32 mx-auto mb-6 drop-shadow-xl"
              />
              
              <div className="mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-4xl font-bold text-primary">399 грн</span>
                  <span className="text-2xl text-muted-foreground line-through">699 грн</span>
                  <Badge className="bg-destructive text-destructive-foreground px-3 py-1 text-lg font-bold">
                    -43%
                  </Badge>
                </div>
                
                <Button size="lg" className="bg-gradient-primary hover:shadow-soft transition-all duration-300 px-8 py-6 text-lg rounded-full">
                  <Music className="mr-2 h-5 w-5" />
                  Створити листівку
                </Button>
              </div>

              <Card className="bg-success/10 border-success/30 p-4 rounded-2xl">
                <div className="flex items-center justify-center gap-2 text-success">
                  <Check className="h-5 w-5" />
                  <span className="font-semibold">100% гарантія задоволення</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  — не викличе "Вау!" ефект, повернемо гроші
                </p>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}