import { Button } from "@/components/ui/button";
import { MessageCircle, CheckCheck } from "lucide-react";

interface MessageProps {
  text: string;
  emojis?: string;
}

function MessageBubble({ text, emojis }: MessageProps) {
  return (
    <div className="flex-shrink-0 w-[380px] md:w-[420px]">
      <div className="bg-white rounded-3xl rounded-bl-md p-5 shadow-md border-2 border-primary/20 relative">
        <p className="text-foreground/90 leading-relaxed text-base mb-2">
          {text}
        </p>
        {emojis && (
          <div className="flex gap-1 mt-3">
            {emojis.split('').map((emoji, i) => (
              <span key={i} className="text-xl">{emoji}</span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-end gap-1 mt-2 text-xs text-muted-foreground">
          <CheckCheck className="w-4 h-4 text-primary" />
        </div>
      </div>
    </div>
  );
}

export function ReviewsSection() {
  const messages = [
    { text: "Дуже дякую. Все сподобалось 😊", emojis: "😊" },
    { text: "Дякую вам, Наталі🙏🏻 Дякую що втілили мою ідею в життя. Тепер чекаємо на день народження і будемо дарувати листівку💜", emojis: "🙏🏻💜" },
    { text: "Дякую велике🥹🫶🏻 Дуже красива листівка вийшла. Особливо сподобалась пісня. Я прям заплакала😭", emojis: "🥹🫶🏻😭" },
    { text: "Дякую велике🙏 Сподобалось все🤗", emojis: "🙏🤗" },
  ];

  // Дублюємо повідомлення для безперервної прокрутки
  const firstRow = [...messages, ...messages];
  const secondRow = [...messages.slice().reverse(), ...messages.slice().reverse()];

  return (
    <section className="py-16 bg-gradient-to-b from-secondary/30 to-background relative z-10 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <MessageCircle className="w-8 h-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary">
            Відгуки наших клієнтів
          </h2>
        </div>
        <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Реальні повідомлення від задоволених покупців
        </p>

        {/* Перший ряд - рух вліво */}
        <div className="relative mb-6">
          <div className="flex gap-5 animate-scroll-left">
            {firstRow.map((message, index) => (
              <MessageBubble key={`row1-${index}`} {...message} />
            ))}
          </div>
        </div>

        {/* Другий ряд - рух вправо */}
        <div className="relative mb-16">
          <div className="flex gap-5 animate-scroll-right">
            {secondRow.map((message, index) => (
              <MessageBubble key={`row2-${index}`} {...message} />
            ))}
          </div>
        </div>

        {/* CTA після відгуків */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-3xl border-2 border-primary/30 hover:border-primary/50 transition-all hover:shadow-lg p-8 text-center">
            <Button 
              onClick={() => window.location.href = '/order'}
              className="text-lg px-10 py-7 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-105 font-bold mb-6"
            >
              🎵 Я теж хочу такий подарунок!
            </Button>
            
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">💝</span>
                <span className="text-sm md:text-base">Понад 500 створених емоційних історій</span>
              </div>
              
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">🔄</span>
                <span className="text-sm md:text-base">Клієнти замовляють знову — для мами, тата, коханих</span>
              </div>
              
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">⚡️</span>
                <span className="text-sm md:text-base">Студія настільки проста, що справишся за 10 хвилин</span>
              </div>
              
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">🚚</span>
                <span className="text-sm md:text-base">Безкоштовна доставка Новою поштою за 1-2 дні</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
