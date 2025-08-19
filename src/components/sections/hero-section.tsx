import { Music, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestimonialCard } from "@/components/ui/testimonial-card";

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-soft overflow-hidden">
      {/* Testimonials positioned around the hero */}
      <div className="absolute inset-0 pointer-events-none">
        <TestimonialCard
          name="Олена С."
          text="Чудова ідея для подарунка!"
          initials="ОС"
          className="absolute top-20 left-8 max-w-[240px] pointer-events-auto"
        />
        <TestimonialCard
          name="Софія М."
          text="Замовляла вже двічі, завжди чудовий результат!"
          initials="СМ"
          className="absolute top-16 right-8 max-w-[280px] pointer-events-auto"
        />
        <TestimonialCard
          name="Марія К."
          text="Дуже зворушливий подарунок!"
          initials="МК"
          className="absolute top-64 left-4 max-w-[220px] pointer-events-auto"
        />
        <TestimonialCard
          name="Дмитро С."
          text="Листосик допоміг зробити ідеальне освідчення!"
          initials="ДС"
          className="absolute top-80 left-48 max-w-[260px] pointer-events-auto"
        />
        <TestimonialCard
          name="Андрій В."
          text="Оригінально та душевно!"
          initials="АВ"
          className="absolute top-72 right-12 max-w-[240px] pointer-events-auto"
        />
        <TestimonialCard
          name="Наталія Р."
          text="Неймовірно приємний сервіс!"
          initials="НР"
          className="absolute bottom-32 right-24 max-w-[240px] pointer-events-auto"
        />
      </div>

      {/* Main hero content */}
      <div className="container mx-auto px-4 pt-32 pb-20 text-center relative z-10">
        <div className="flex items-center justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="ml-2 text-muted-foreground">500+ задоволених клієнтів</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight">
          Створи унікальну листівку з<br />
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            твоєю особистою піснею
          </span>
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Перетвори слова привітання, вибачення чи подяки на музичний подарунок, який 
          можна почути та потримати у руках. Я, Листосик, допоможу тобі легко і тепло 
          висловити будь-які почуття.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-gradient-primary hover:shadow-soft transition-all duration-300 px-8 py-6 text-lg rounded-full">
            <Music className="mr-2 h-5 w-5" />
            Створити листівку
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-6 text-lg rounded-full border-2 border-primary/30 hover:bg-primary/10">
            <Star className="mr-2 h-5 w-5" />
            Дивитися приклади
          </Button>
        </div>
      </div>
    </section>
  );
}