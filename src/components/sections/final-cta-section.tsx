import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <section className="py-20 bg-gradient-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Готові створити свою музичну листівку?
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Подаруйте емоції та спогади, які залишаться назавжди.
        </p>
        
        <Button 
          size="lg" 
          variant="secondary"
          className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg rounded-full shadow-soft"
        >
          <Music className="mr-2 h-5 w-5" />
          Створити листівку
        </Button>
      </div>
    </section>
  );
}