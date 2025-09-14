import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getAllStyles, type StyleKey } from '@/lib/postcard-styles';
import { cn } from '@/lib/utils';

interface StyleSelectorProps {
  selectedStyle: StyleKey | null;
  onStyleSelect: (style: StyleKey) => void;
}

export function StyleSelector({ selectedStyle, onStyleSelect }: StyleSelectorProps) {
  const styles = getAllStyles();

  return (
    <RadioGroup
      value={selectedStyle || ''}
      onValueChange={(value) => onStyleSelect(value as StyleKey)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {styles.map((style) => (
          <div key={style.id} className="relative">
            <RadioGroupItem value={style.id} id={style.id} className="sr-only" />
            <Label
              htmlFor={style.id}
              className={cn(
                "block cursor-pointer transition-all",
                selectedStyle === style.id 
                  ? 'ring-2 ring-primary' 
                  : 'hover:ring-1 hover:ring-primary/50'
              )}
            >
              <Card className={cn(
                "p-4 transition-all",
                selectedStyle === style.id 
                  ? 'border-primary bg-primary/5' 
                  : 'hover:border-primary/50'
              )}>
                {/* Style preview */}
                <div className="aspect-[3/4] bg-gradient-to-br rounded-lg mb-3 relative overflow-hidden"
                     style={{
                       background: `linear-gradient(135deg, ${style.colors[0]}, ${style.colors[1] || style.colors[0]})`
                     }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white/80 text-xs font-medium px-2 py-1 bg-black/20 rounded">
                      Превью
                    </div>
                  </div>
                  
                  {/* Style-specific decorative elements */}
                  {style.id === 'gilby' && (
                    <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-white/30" />
                  )}
                  
                  {style.id === 'watercolor' && (
                    <div className="absolute top-2 left-2 w-8 h-4 bg-white/20 rounded-full blur-sm" />
                  )}
                  
                  {style.id === 'cartoon' && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white/40 rounded" />
                  )}
                  
                  {style.id === 'pixel' && (
                    <div className="absolute inset-0 opacity-20"
                         style={{
                           backgroundImage: 'repeating-conic-gradient(#000 0% 25%, transparent 0% 50%)',
                           backgroundSize: '4px 4px'
                         }} />
                  )}
                  
                  {style.id === 'cosmic' && (
                    <>
                      <div className="absolute top-3 right-3 w-1 h-1 bg-white rounded-full animate-pulse" />
                      <div className="absolute bottom-4 left-3 w-1 h-1 bg-white rounded-full animate-pulse delay-300" />
                      <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-700" />
                    </>
                  )}
                </div>

                {/* Style info */}
                <div className="space-y-2">
                  <h3 className="font-semibold">{style.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {style.description}
                  </p>
                  
                  {/* Color palette preview */}
                  <div className="flex gap-1">
                    {style.colors.slice(0, 4).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-sm border border-border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </Card>
            </Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
}