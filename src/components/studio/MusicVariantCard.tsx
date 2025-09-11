import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Download, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MusicVariant {
  id: string;
  title: string;
  description: string;
  audioUrl?: string;
  duration?: number;
  style: string;
}

interface MusicVariantCardProps {
  variant: MusicVariant;
  isSelected: boolean;
  onSelect: () => void;
}

export const MusicVariantCard: React.FC<MusicVariantCardProps> = ({
  variant,
  isSelected,
  onSelect
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    if (variant.audioUrl) {
      const audioElement = new Audio(variant.audioUrl);
      audioElement.addEventListener('ended', () => setIsPlaying(false));
      setAudio(audioElement);
      
      return () => {
        audioElement.pause();
        audioElement.removeEventListener('ended', () => setIsPlaying(false));
      };
    }
  }, [variant.audioUrl]);

  const handlePlayPause = () => {
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-lg group",
        isSelected 
          ? "ring-2 ring-primary bg-primary/5 border-primary" 
          : "hover:border-primary/50"
      )}
      onClick={onSelect}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{variant.title}</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {variant.style}
            </Badge>
          </div>
          {variant.duration && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {variant.duration}с
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {variant.description}
        </p>

        {/* Audio Player Simulation */}
        <div className="bg-secondary/20 rounded-lg p-3 space-y-3">
          <div className="flex items-center justify-between">
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                handlePlayPause();
              }}
              className="h-8 w-8 p-0"
            >
              {isPlaying ? (
                <Pause className="h-3 w-3" />
              ) : (
                <Play className="h-3 w-3" />
              )}
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => e.stopPropagation()}
              className="h-8 w-8 p-0"
            >
              <Download className="h-3 w-3" />
            </Button>
          </div>

          {/* Waveform Visualization */}
          <div className="flex items-center justify-center space-x-1 h-8">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "bg-primary/30 rounded-full transition-all duration-300",
                  isPlaying 
                    ? "animate-pulse h-2 w-1" 
                    : "h-1 w-1"
                )}
                style={{
                  height: isPlaying 
                    ? `${Math.random() * 16 + 4}px` 
                    : '4px',
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-secondary/40 rounded-full h-1">
            <div 
              className={cn(
                "bg-primary h-1 rounded-full transition-all duration-1000",
                isPlaying ? "w-1/3" : "w-0"
              )}
            />
          </div>
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <div className="text-center animate-fade-in">
            <Badge className="bg-primary text-primary-foreground">
              ✓ Обрано
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};