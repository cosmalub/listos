import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  titleSecondLine?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  showUnderline?: boolean;
}

export function SectionHeader({ 
  title, 
  subtitle, 
  titleSecondLine,
  className,
  size = "md",
  showUnderline = true
}: SectionHeaderProps) {
  const sizeClasses = {
    sm: "text-xl md:text-2xl lg:text-3xl",
    md: "text-2xl md:text-3xl lg:text-4xl",
    lg: "text-2xl md:text-4xl lg:text-5xl"
  };

  const subtitleSizeClasses = {
    sm: "text-sm md:text-base",
    md: "text-base md:text-lg",
    lg: "text-base md:text-lg"
  };

  // Генеруємо унікальний ID для градієнта
  const gradientId = `gradient-${title.replace(/\s+/g, '-').toLowerCase().slice(0, 20)}`;

  return (
    <div className={cn("text-center mb-10 md:mb-14", className)}>
      <h2 className={cn("font-bold mb-4 leading-tight", sizeClasses[size])}>
        <span className="bg-gradient-to-r from-primary via-primary/90 to-primary bg-clip-text text-transparent">
          {title}
        </span>
        {titleSecondLine && (
          <>
            <br className="hidden sm:block" />
            <span className="relative inline-block mt-1 md:mt-2">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {titleSecondLine}
              </span>
              {/* Декоративна лінія під текстом */}
              {showUnderline && (
                <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                  <path 
                    d="M2 8C30 4 60 2 100 4C140 6 170 8 198 4" 
                    stroke={`url(#${gradientId})`}
                    strokeWidth="3" 
                    strokeLinecap="round"
                    className="animate-pulse"
                  />
                  <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
            </span>
          </>
        )}
      </h2>
      
      {subtitle && (
        <p className={cn(
          "text-muted-foreground max-w-2xl mx-auto leading-relaxed",
          subtitleSizeClasses[size]
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

