import { Play } from "lucide-react";
import { Card } from "@/components/ui/card";

export function VideoSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Подивіться, як це працює:
          </h2>
        </div>

        <Card className="max-w-4xl mx-auto bg-gradient-soft rounded-3xl p-8 shadow-soft">
          <div className="relative aspect-video bg-muted rounded-2xl overflow-hidden group cursor-pointer">
            {/* Video placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <Play className="h-12 w-12 text-primary fill-primary" />
              </div>
            </div>
            
            {/* Video controls overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Play className="h-4 w-4 text-white fill-white" />
                </div>
                <span className="text-white text-sm">0:00</span>
                <div className="flex-1 h-1 bg-white/30 rounded-full">
                  <div className="h-1 bg-white rounded-full w-0"></div>
                </div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-white/20 rounded"></div>
                  <div className="w-6 h-6 bg-white/20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-center text-muted-foreground mt-6">
            Від ідеї до готової музичної листівки — весь процес створення за 2 хвилини
          </p>
        </Card>
      </div>
    </section>
  );
}