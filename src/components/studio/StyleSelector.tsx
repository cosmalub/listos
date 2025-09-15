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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
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
                "p-3 transition-all",
                selectedStyle === style.id 
                  ? 'border-primary bg-primary/5' 
                  : 'hover:border-primary/50'
              )}>
                {/* Style info */}
                <div className="space-y-2 text-center">
                  <h3 className="font-semibold text-sm">{style.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {style.description}
                  </p>
                </div>
              </Card>
            </Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
}