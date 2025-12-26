import React, { useState, useRef, useEffect, forwardRef } from "react"
import { Play, Pause, ArrowLeft, ArrowRight, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import useEmblaCarousel from "embla-carousel-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Postcard3D } from "@/components/postcards/Postcard3D"
// --- Carousel Component (adapted from embla) ---
type CarouselApi = any
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

const CarouselContext = React.createContext<CarouselProps & { 
  carouselRef: any; 
  api: CarouselApi | undefined;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
} | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

const Carousel = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel({ ...opts, axis: orientation === "horizontal" ? "x" : "y" }, plugins)
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const scrollPrev = React.useCallback(() => api && api.scrollPrev(), [api])
    const scrollNext = React.useCallback(() => api && api.scrollNext(), [api])

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    React.useEffect(() => {
      if (!api) return
      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)
      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider value={{ 
        carouselRef, 
        api, 
        opts, 
        orientation, 
        canScrollPrev, 
        canScrollNext,
        scrollPrev,
        scrollNext
      }}>
        <div ref={ref} className={cn("relative", className)} role="region" aria-roledescription="carousel" {...props}>
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div ref={ref} className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)} {...props} />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, canScrollPrev, scrollPrev } = useCarousel()
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("absolute h-8 w-8 rounded-full", orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, canScrollNext, scrollNext } = useCarousel()
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("absolute h-8 w-8 rounded-full", orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

// --- Postcard Image Component ---
function PostcardImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false)
  
  if (hasError || !src || !src.startsWith('/')) {
    return (
      <div className="w-full h-full bg-gradient-to-b from-primary/20 to-primary/40 flex items-center justify-center">
        <span className="text-primary font-medium">{alt}</span>
      </div>
    )
  }
  
  return (
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-full object-contain bg-white"
      onError={() => setHasError(true)}
    />
  )
}

// --- Audio Player Component ---
function AudioPlayer({ audioSrc, songTitle, artist }: { audioSrc: string; songTitle: string; artist: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(() => {
          // Handle audio play errors gracefully
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const updateProgress = () => setProgress((audio.currentTime / audio.duration) * 100)
      const onEnded = () => setIsPlaying(false)
      audio.addEventListener("timeupdate", updateProgress)
      audio.addEventListener("ended", onEnded)
      return () => {
        audio.removeEventListener("timeupdate", updateProgress)
        audio.removeEventListener("ended", onEnded)
      }
    }
  }, [])

  return (
    <div className="mt-4 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-md">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h4 className="font-medium text-[#6A5ACD]">{songTitle}</h4>
          <p className="text-sm text-[#6A5ACD]/70">{artist}</p>
        </div>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-[#6A5ACD] hover:bg-[#5A4BBD] text-white" onClick={togglePlay}>
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </Button>
      </div>
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      <div className="w-full bg-[#6A5ACD]/20 rounded-full h-1.5 mt-2">
        <div className="bg-[#6A5ACD] h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  )
}


// --- Customer Story Component ---
function CustomerStory({ story, reaction, customerName, customerLocation, rating }: { 
  story: string; 
  reaction: string; 
  customerName: string; 
  customerLocation: string;
  rating: number;
}) {
  return (
    <div className="mt-4 bg-[#6A5ACD]/5 rounded-xl p-4 border-2 border-[#B8B3FF]/30">
      <div className="mb-3">
        <p className="text-sm font-semibold text-[#6A5ACD] mb-1">Історія від {customerName.split(',')[0]}:</p>
        <p className="text-sm text-[#6A5ACD]/80 leading-relaxed">{story}</p>
      </div>
      <div className="mb-3">
        <p className="text-sm font-semibold text-[#6A5ACD] mb-1">Реакція:</p>
        <p className="text-sm text-[#6A5ACD]/80 leading-relaxed">{reaction}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs italic text-[#6A5ACD]/70">— {customerName} ({customerLocation})</p>
        <div className="flex text-yellow-400">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-current" />
          ))}
        </div>
      </div>
    </div>
  )
}

// --- Main Component ---
const postcardExamples = [
  { 
    id: 1, 
    title: "Вітання з днем народження", 
    description: "Музична листівка для мами.", 
    frontImage: "/examples/stepan-front.png", 
    backImage: "/examples/stepan-back.png", 
    songTitle: "З днем народження, мамо", 
    artist: "Від Степана", 
    audioSrc: "/audio/stepan-birthday.mp3",
    customerStory: "Степан створив пісню для своєї мами Галини на день народження. У пісні він подякував за турботу, любов і підтримку, згадав дитинство, безсонні ночі та моменти, коли мама завжди була поруч.",
    customerReaction: "Мама була дуже зворушена подарунком. Слухала пісню кілька разів і зберігає листівку вдома як пам'ять.",
    customerName: "Степан, 29 років",
    customerLocation: "Київ",
    rating: 5
  },
  { 
    id: 2, 
    title: "Освідчення в коханні", 
    description: "Романтична листівка для коханої.", 
    frontImage: "/images/postcards/example-front.jpg", 
    backImage: "/images/postcards/example-back.jpg", 
    songTitle: "Ти - моє все", 
    artist: "Від Максима", 
    audioSrc: "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV6urq6urq6urq6urq6urq6urq6urq6urq6v////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAASDs90hvAAAAAAAAAAAAAAAAAAAA//OCEAAADwAABHiAAATgsAAhXiAAEaQhEIRAQYgcEKIoDAgCA",
    customerStory: "Пара згадала перше знайомство, перше побачення, момент пропозиції. Додали дати: \"10 травня 2020 — день, коли ми зустрілись\", \"15 серпня 2022 — наше весілля\".",
    customerReaction: "Чоловік не стримав сліз. Каже, що це найкращий подарунок за всі роки. Тепер це їхня улюблена пісня — слухають кожну річницю.",
    customerName: "Світлана, 27 років",
    customerLocation: "Київ",
    rating: 5
  },
  { 
    id: 3, 
    title: "Щире вибачення", 
    description: "Листівка з проникливими словами.", 
    frontImage: "/images/postcards/example-front.jpg", 
    backImage: "/images/postcards/example-back.jpg", 
    songTitle: "Дякую за все", 
    artist: "Від Олега", 
    audioSrc: "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV6urq6urq6urq6urq6urq6urq6urq6urq6v////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAASDs90hvAAAAAAAAAAAAAAAAAAAA//OCEAAADwAABHiAAATgsAAhXiAAEaQhEIRAQYgcEKIoDAgCA",
    customerStory: "Син створив пісню-подяку для батька, згадавши всі важливі життєві поради та спільні моменти. Додав щирі слова вдячності за підтримку.",
    customerReaction: "Батько не очікував такого подарунка. Слухав пісню кілька разів поспіль. Каже, це найцінніший подарунок у його житті.",
    customerName: "Олег, 35 років",
    customerLocation: "Львів",
    rating: 5
  },
  { 
    id: 4, 
    title: "Освідчення в коханні", 
    description: "Романтична музична листівка для коханої.", 
    frontImage: "/examples/nastya-front.png", 
    backImage: "/examples/nastya-back.png", 
    songTitle: "Моя Настя", 
    artist: "Від Дмитра", 
    audioSrc: "/audio/nastya-love.mp3",
    customerStory: "Дмитро створив цю пісню для своєї коханої Насті, щоб передати свої почуття і сказати, як багато вона для нього означає. У пісні він говорить про близькість, тепло і щастя бути разом.",
    customerReaction: "Настя була дуже зворушена подарунком. Сказала, що це один із найтепліших і найщиріших моментів у їхніх стосунках.",
    customerName: "Дмитро, 27 років",
    customerLocation: "Київ",
    rating: 5
  },
]

export default function ExamplesSection3D() {
  return (
    <section className="py-16 bg-white rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] relative z-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold font-baloo text-[#6A5ACD] mb-6 text-center">
          Приклади музичних листівок
        </h2>
        <p className="text-lg text-[#6A5ACD]/80 max-w-3xl mx-auto leading-relaxed mb-12 text-center">
          Погляньте на листівки, які вже створили наші клієнти. Ви можете повертати їх, щоб побачити обидві сторони, та послухати пісні.
        </p>

        <div className="max-w-5xl mx-auto">
          <Carousel opts={{ align: "center" }} className="w-full">
            <CarouselContent>
              {postcardExamples.map((postcard) => (
                <CarouselItem key={postcard.id} className="md:basis-2/3 lg:basis-1/2">
                  <div className="p-1">
                    <Card className="border-2 border-[#6A5ACD]/30 overflow-hidden">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-[#6A5ACD]">{postcard.title}</h3>
                        <p className="text-[#6A5ACD]/80 mb-4">{postcard.description}</p>
                        
                        <div className="mb-4">
                          <Postcard3D
                            front={<PostcardImage src={postcard.frontImage} alt="Лицева сторона" />}
                            back={<PostcardImage src={postcard.backImage} alt="Зворотна сторона" />}
                            orientation="portrait"
                            className="w-full max-w-[280px] mx-auto"
                            initialTilt={{ x: 0, y: 5 }}
                            maxTilt={{ x: 8, y: 15 }}
                          />
                        </div>
                        
                        <AudioPlayer 
                          audioSrc={postcard.audioSrc} 
                          songTitle={postcard.songTitle} 
                          artist={postcard.artist} 
                        />
                        
                        <CustomerStory 
                          story={postcard.customerStory} 
                          reaction={postcard.customerReaction} 
                          customerName={postcard.customerName} 
                          customerLocation={postcard.customerLocation}
                          rating={postcard.rating}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="relative static transform-none bg-[#6A5ACD] hover:bg-[#5A4BBD] text-white border-[#6A5ACD]" />
              <CarouselNext className="relative static transform-none bg-[#6A5ACD] hover:bg-[#5A4BBD] text-white border-[#6A5ACD]" />
            </div>
          </Carousel>

          {/* CTA після прикладів */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="bg-card rounded-3xl border-2 border-[#B8B3FF]/60 hover:border-[#B8B3FF] transition-all hover:shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-[#6A5ACD] mb-6">
                Створи свою унікальну історію
              </h3>
              
              <Button 
                onClick={() => window.location.href = '/order'}
                className="text-lg px-10 py-7 rounded-full bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] hover:from-[#7A6ADE] hover:to-[#C282EF] text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 font-bold mb-6"
              >
                🎵 Замовити свою листівку
              </Button>
              
              <div className="space-y-3 text-[#6A5ACD]/80">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl">💝</span>
                  <span className="text-sm md:text-base">Створи емоції, які запам'ятаються назавжди</span>
                </div>
                
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl">✨</span>
                  <span className="text-sm md:text-base">Листосик допоможе з усім — від слів пісні до дизайну листівки</span>
                </div>
                
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl">⚡️</span>
                  <span className="text-sm md:text-base">Готова листівка за 10 хвилин</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}