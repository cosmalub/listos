import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Postcard3D } from "@/components/postcards/Postcard3D";

type Example = {
  title: string;       // Название (на обложке/внизу)
  occasion: string;    // Повод
  author: string;      // Подпись/кто дарит
  creator: string;     // Создатель (Листосик)
  audioUrl?: string;   // Ссылка на аудио
  frontImg?: string;   // Фронт (если есть)
  backImg?: string;    // Оборот (если есть)
};

export function ExamplesSection() {
  const examples: Example[] = [
    {
      title: "З днем народження, мамо",
      occasion: "Вітання з днем народження",
      author: "Від Ані",
      creator: "Листосик",
      audioUrl: "/audio/birthday-sample.mp3", // подставим позже ваш URL
    },
    {
      title: "Ти — моє все",
      occasion: "Освідчення в коханні",
      author: "Від Максима",
      creator: "Листосик",
      audioUrl: "/audio/love-sample.mp3",
    },
    {
      title: "Дякую за все",
      occasion: "Подяка близькій людині",
      author: "Від Олега",
      creator: "Листосик",
      audioUrl: "/audio/thanks-sample.mp3",
    },
  ];

  // Один общий аудио-плеер
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    const onEnded = () => setPlayingIndex(null);
    const onError = () => setError("Не вдалося завантажити аудіо. Спробуйте пізніше.");
    audioRef.current.addEventListener("ended", onEnded);
    audioRef.current.addEventListener("error", onError);
    return () => {
      audioRef.current?.pause();
      audioRef.current?.removeEventListener("ended", onEnded);
      audioRef.current?.removeEventListener("error", onError);
      audioRef.current = null;
    };
  }, []);

  const togglePlay = async (idx: number) => {
    setError(null);
    const ex = examples[idx];
    if (!audioRef.current) return;

    // Если тот же — пауза
    if (playingIndex === idx) {
      audioRef.current.pause();
      setPlayingIndex(null);
      return;
    }

    // Новый трек
    if (ex.audioUrl) {
      try {
        audioRef.current.src = ex.audioUrl;
        await audioRef.current.play();
        setPlayingIndex(idx);
      } catch {
        setError("Не вдалося завантажити аудіо. Спробуйте пізніше.");
        setPlayingIndex(null);
      }
    } else {
      setError("Аудіо недоступне для цього прикладу.");
    }
  };

  const Front = ({ title }: { title: string }) => (
    <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary">
      <div className="absolute inset-4 rounded-lg bg-white/75 p-4 flex items-end">
        <div className="text-primary font-semibold text-lg">{title}</div>
      </div>
    </div>
  );

  const Back = ({ author }: { author: string }) => (
    <div className="absolute inset-0 bg-card">
      <div className="absolute inset-0 p-6">
        <div className="rounded-lg border-2 border-primary/50 h-full p-4 text-sm text-card-foreground">
          <div className="mb-2 font-semibold text-primary">Особисте повідомлення</div>
          <p className="text-muted-foreground leading-relaxed">
            Тут буде тепле побажання, спогади або зізнання — все, що зробить подарунок
            по-справжньому неповторним.
          </p>
          <div className="mt-4 text-right text-primary">— {author}</div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Приклади музичних листівок
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Крутiть листівку як 3D-об'єкт, переглядайте обидві сторони та слухайте пісню.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {examples.map((ex, idx) => (
                <CarouselItem key={idx} className="md:basis-1/2">
                  <Card className="bg-card p-6 rounded-3xl shadow-card border-2 border-primary/40 hover:shadow-soft transition-all duration-300">
                    {/* 3D postcard */}
                    <div className="mb-6 group">
                      <Postcard3D
                        className="bg-muted rounded-xl"
                        front={<Front title={ex.title} />}
                        back={<Back author={ex.author} />}
                      />
                    </div>

                    {/* Meta + play */}
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <div className="font-semibold text-card-foreground truncate">{ex.title}</div>
                        <div className="text-sm text-muted-foreground truncate">{ex.occasion}</div>
                      </div>
                      <Button
                        size="icon"
                        className="rounded-full bg-primary hover:bg-primary/90 text-white"
                        onClick={() => togglePlay(idx)}
                        aria-label={playingIndex === idx ? "Пауза" : "Відтворити"}
                      >
                        {playingIndex === idx ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                    </div>

                    {error && (
                      <p className="mt-3 text-sm text-destructive">{error}</p>
                    )}

                    <div className="mt-2 text-xs text-muted-foreground">
                      <span className="opacity-80">{ex.creator}</span>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="border-2 border-primary/60 text-primary bg-white/70 hover:bg-white" />
            <CarouselNext className="border-2 border-primary/60 text-primary bg-white/70 hover:bg-white" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}