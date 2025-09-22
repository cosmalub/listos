import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { getAllStyles, type StyleKey } from '@/lib/postcard-styles';
import { cn } from '@/lib/utils';
import { Heart, Gift, MessageCircle } from 'lucide-react';

interface StyleSelectorProps {
  selectedStyle: StyleKey | null;
  onStyleSelect: (style: StyleKey) => void;
}

const styleIcons = {
  joyful: Gift,
  gentle: Heart,
  universal: MessageCircle
};

const styleGradients = {
  joyful: 'from-orange-100 to-pink-100',
  gentle: 'from-blue-50 to-purple-50',
  universal: 'from-green-50 to-blue-50'
};

export function StyleSelector({ selectedStyle, onStyleSelect }: StyleSelectorProps) {
  const styles = getAllStyles();

  return (
    <div className="space-y-4">

      <RadioGroup
        value={selectedStyle || ''}
        onValueChange={(value) => onStyleSelect(value as StyleKey)}
      >
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {styles.map((style) => {
            const Icon = styleIcons[style.id];
            const isSelected = selectedStyle === style.id;
            
            return (
              <div key={style.id} className="relative">
                <RadioGroupItem value={style.id} id={style.id} className="sr-only" />
                <Label
                  htmlFor={style.id}
                  className={cn(
                    "block cursor-pointer transition-all duration-200",
                    isSelected 
                      ? 'ring-2 ring-primary ring-offset-2' 
                      : 'hover:ring-1 hover:ring-primary/50 hover:ring-offset-1'
                  )}
                >
                  <Card className={cn(
                    "p-3 sm:p-4 transition-all duration-200 overflow-hidden relative",
                    isSelected 
                      ? 'border-primary bg-primary/5 shadow-md' 
                      : 'hover:border-primary/50 hover:shadow-sm'
                  )}>
                    {/* Background gradient */}
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-20",
                      styleGradients[style.id]
                    )} />
                    
                    <div className="relative space-y-3">
                      {/* Header with icon and title */}
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "flex-shrink-0 p-1.5 sm:p-2 rounded-full",
                          isSelected 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        )}>
                          <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                        
                        <div className="flex-1 space-y-1">
                          <h3 className="font-medium text-sm sm:text-base text-foreground">
                            {style.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {style.description}
                          </p>
                        </div>
                      </div>

                      {/* Occasions */}
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          {style.occasionsText}
                        </p>
                      </div>
                    </div>

                  </Card>
                </Label>
              </div>
            );
          })}
        </div>
      </RadioGroup>
    </div>
  );
}