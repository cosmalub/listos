import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TestimonialCardProps {
  name: string;
  text: string;
  initials: string;
  className?: string;
}

export function TestimonialCard({ name, text, initials, className }: TestimonialCardProps) {
  return (
    <Card className={`p-4 bg-card/80 backdrop-blur-sm border-2 border-accent/30 rounded-2xl shadow-card ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold text-accent-foreground">{initials}</span>
        </div>
        <div>
          <h4 className="font-semibold text-card-foreground">{name}</h4>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{text}</p>
    </Card>
  );
}