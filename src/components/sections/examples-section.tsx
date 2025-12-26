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
      audioUrl: "/audio/birthday-sample.mp3", // подставим позже ваш URL
    },
    {
      title: "Ти — моє все",
      occasion: "Освідчення в коханні",
      author: "Від Максима",
      audioUrl: "/audio/love-sample.mp3",
    },
    {
      title: "Дякую за все",
      occasion: "Подяка близькій людині",
      author: "Від Олега",
      audioUrl: "/audio/thanks-sample.mp3",
    },
    {
      title: "Моя Настя",
      occasion: "Освідчення в коханні",
      author: "Від Дмитра",
      audioUrl: "/audio/nastya-love.mp3",
      frontImg: "/examples/nastya-front.png",
      backImg: "/examples/nastya-back.png",
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

  const Front = ({ example }: { example: Example }) => (
    <div className="h-full relative">
      {example.frontImg ? (
        <img 
          src={example.frontImg} 
          alt={example.title}
          className="w-full h-full object-cover rounded-xl"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#6A5ACD]/80 to-[#8A7CDD] rounded-xl">
          <div className="absolute inset-4 rounded-lg bg-white/85 p-4 flex items-end">
            <div className="text-[#6A5ACD] font-semibold text-lg">{example.title}</div>
          </div>
        </div>
      )}
    </div>
  );

  const Back = ({ example }: { example: Example }) => (
    <div className="h-full relative">
      {example.backImg ? (
        <img 
          src={example.backImg} 
          alt={`${example.title} - зворотна сторона`}
          className="w-full h-full object-cover rounded-xl"
        />
      ) : (
        <div className="absolute inset-0 bg-card rounded-xl">
          <div className="absolute inset-0 p-6">
            <div className="rounded-lg border-2 border-[#6A5ACD]/50 h-full p-4 text-sm text-card-foreground">
              <div className="mb-2 font-semibold text-[#6A5ACD]">Особисте повідомлення</div>
              <p className="text-muted-foreground leading-relaxed">
                Тут буде тепле побажання, спогади або зізнання — все, що зробить подарунок
                по-справжньому неповторним.
              </p>
              <div className="mt-4 text-right text-[#6A5ACD]">— {example.author}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section className="py-12 md:py-16 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#6A5ACD] to-[#8A7CDD] bg-clip-text text-transparent mb-6">
            Приклади музичних листівок
          </h2>
          <p className="text-lg md:text-xl text-[#6A5ACD]/80 max-w-3xl mx-auto leading-relaxed">
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
                <CarouselItem key={idx} className="basis-[240px] sm:basis-[260px] md:basis-[300px] lg:basis-[320px]">
                  <Card className="bg-card p-4 md:p-5 rounded-2xl shadow-card border border-primary/30 hover:shadow-soft transition-all">
                    {/* 3D postcard */}
                    <div className="mb-5 group mx-auto w-[220px] sm:w-[240px] md:w-[280px] lg:w-[300px] max-w-[85vw]">
                      <Postcard3D
                        className="bg-muted rounded-xl"
                        orientation="portrait"
                        front={<Front example={ex} />}
                        back={<Back example={ex} />}
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
                        {playingIndex === idx ? <Pause className="h-3.5 w-3.5 md:h-4 md:w-4" /> : <Play className="h-3.5 w-3.5 md:h-4 md:w-4" />}
                      </Button>
                    </div>

                    {error && (
                      <p className="mt-3 text-sm text-destructive">{error}</p>
                    )}
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