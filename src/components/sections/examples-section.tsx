import { Play, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ExamplesSection() {
  const examples = [
    {
      title: "Вітання з днем народження",
      subtitle: "Музична листівка для мами з теплими словами та улюбленою піснею",
      author: "З днем народження, мамо",
      creator: "Листосик",
      error: "Не вдалося завантажити аудіо. Спробуйте пізніше."
    },
    {
      title: "Освідчення в коханні", 
      subtitle: "Романтична листівка з ніжною мелодією для коханої людини",
      author: "Ти - моє все",
      creator: "Листосик",
      error: "Не вдалося завантажити аудіо. Спробуйте пізніше."
    }
  ];

  return (
    <section className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Приклади музичних листівок
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Погляньте на листівки, які вже створили наші клієнти. Ви можете повертати їх, 
            щоб побачити обидві сторони, та послухати пісні.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {examples.map((example, index) => (
            <Card key={index} className="bg-card p-6 rounded-3xl shadow-card border-2 border-accent/20 hover:shadow-soft transition-all duration-300">
              <h3 className="text-xl font-bold text-primary mb-2">{example.title}</h3>
              <p className="text-muted-foreground mb-6">{example.subtitle}</p>
              
              {/* Postcard preview */}
              <div className="aspect-[4/3] bg-muted rounded-xl mb-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"></div>
                <div className="absolute top-3 right-3">
                  <Button variant="ghost" size="icon" className="bg-white/80 backdrop-blur-sm hover:bg-white">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Audio player */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-card-foreground">{example.author}</h4>
                    <p className="text-sm text-muted-foreground">{example.creator}</p>
                  </div>
                  <Button size="icon" className="bg-gradient-primary hover:shadow-soft rounded-full">
                    <Play className="h-4 w-4 fill-white" />
                  </Button>
                </div>
                <p className="text-sm text-destructive">{example.error}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="icon" className="rounded-full border-2 border-primary/30">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full border-2 border-primary/30">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}