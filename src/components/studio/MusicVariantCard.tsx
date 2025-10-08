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
  const [currentTime, setCurrentTime] = React.useState(0);
  const [realDuration, setRealDuration] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (variant.audioUrl) {
      console.log('🎵 Setting up audio for variant:', variant.title);
      console.log('🎵 Audio URL:', variant.audioUrl.substring(0, 100) + '...');
      
      const audioElement = new Audio(variant.audioUrl);
      
      const handleEnded = () => {
        console.log('🎵 Audio ended');
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
      };
      
      const handleError = (e: any) => {
        console.error('🎵 Audio playback error:', e);
        console.error('🎵 Audio error details:', audioElement.error);
        setIsPlaying(false);
      };
      
      const handleLoadedMetadata = () => {
        console.log('🎵 Audio metadata loaded - Duration:', audioElement.duration);
        setRealDuration(audioElement.duration);
      };
      
      const handleTimeUpdate = () => {
        const current = audioElement.currentTime;
        const duration = audioElement.duration;
        setCurrentTime(current);
        if (duration > 0) {
          setProgress((current / duration) * 100);
        }
      };
      
      const handleCanPlay = () => {
        console.log('🎵 Audio can play - Duration:', audioElement.duration);
      };
      
      audioElement.addEventListener('ended', handleEnded);
      audioElement.addEventListener('error', handleError);
      audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
      audioElement.addEventListener('canplay', handleCanPlay);
      
      setAudio(audioElement);
      
      return () => {
        audioElement.pause();
        audioElement.removeEventListener('ended', handleEnded);
        audioElement.removeEventListener('error', handleError);
        audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
        audioElement.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [variant.audioUrl]);

  const handlePlayPause = () => {
    if (!audio || !variant.audioUrl) {
      console.log('🎵 Audio not available for playback');
      return;
    }
    
    if (isPlaying) {
      console.log('🎵 Pausing audio at:', audio.currentTime);
      audio.pause();
      setIsPlaying(false);
    } else {
      console.log('🎵 Starting audio playback');
      audio.play().catch(error => {
        console.error('🎵 Failed to play audio:', error);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
        <div className="text-center space-y-1">
          <CardTitle className="text-lg">{variant.title}</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed text-center">
          {variant.description}
        </p>

        {/* Audio Player Simulation */}
        <div className="bg-secondary/20 rounded-lg p-3 space-y-3">
          <div className="flex items-center justify-center">
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

          {/* Time Display and Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{realDuration > 0 ? formatTime(realDuration) : '--:--'}</span>
            </div>
            <div className="w-full bg-secondary/40 rounded-full h-1">
              <div 
                className="bg-primary h-1 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
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