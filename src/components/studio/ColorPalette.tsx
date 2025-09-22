import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Plus, X, RefreshCw } from 'lucide-react';
import { getStyleColors, type StyleKey } from '@/lib/postcard-styles';
import { cn } from '@/lib/utils';

interface ColorPaletteProps {
  style: StyleKey;
  selectedColors: string[];
  onColorSelect: (colors: string[]) => void;
}

// Additional color variations for each style
const STYLE_COLOR_VARIATIONS: Record<StyleKey, string[][]> = {
  joyful: [
    ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
    ['#FF8E53', '#6C5CE7', '#A29BFE', '#FD79A8'],
    ['#00B894', '#FDCB6E', '#E17055', '#74B9FF'],
  ],
  gentle: [
    ['#F8BBD9', '#E4C1F9', '#A8E6CF', '#FFD3A5'],
    ['#FD99A5', '#C7CEEA', '#F0E6D2', '#D4B896'],
    ['#E4D1C0', '#C4A478', '#F0E0B8', '#D0B492'],
  ],
  universal: [
    ['#8B7355', '#A0937D', '#B5A58A', '#D4C5A0'],
    ['#6B5B73', '#7F9F65', '#F2E8C6', '#D4B896'],
    ['#9A8478', '#B5C99A', '#F7E7A5', '#F0C49A'],
  ]
};

export function ColorPalette({ style, selectedColors, onColorSelect }: ColorPaletteProps) {
  const [customColor, setCustomColor] = useState('#000000');
  const [activeVariation, setActiveVariation] = useState(0);

  const defaultColors = getStyleColors(style);
  const variations = STYLE_COLOR_VARIATIONS[style] || [defaultColors];
  const currentColors = selectedColors.length > 0 ? selectedColors : variations[activeVariation];

  const addCustomColor = () => {
    if (customColor && !currentColors.includes(customColor)) {
      const newColors = [...currentColors, customColor];
      onColorSelect(newColors);
    }
  };

  const removeColor = (index: number) => {
    const newColors = currentColors.filter((_, i) => i !== index);
    onColorSelect(newColors);
  };

  const selectVariation = (variationIndex: number) => {
    setActiveVariation(variationIndex);
    onColorSelect(variations[variationIndex]);
  };

  const resetToDefault = () => {
    onColorSelect(defaultColors);
    setActiveVariation(0);
  };

  return (
    <div className="space-y-6">
      {/* Color Variations */}
      <div>
        <Label className="text-base font-medium mb-3 block">Готові палітри</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {variations.map((variation, index) => (
            <Card
              key={index}
              className={cn(
                "p-3 cursor-pointer transition-all border-2",
                JSON.stringify(currentColors) === JSON.stringify(variation)
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              )}
              onClick={() => selectVariation(index)}
            >
              <div className="flex gap-2 mb-2">
                {variation.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="flex-1 h-8 rounded border border-border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Палітра {index + 1}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Current Color Palette */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Label className="text-base font-medium">Поточна палітра</Label>
          <Button variant="outline" size="sm" onClick={resetToDefault}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Скинути
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {currentColors.map((color, index) => (
            <div key={index} className="relative group">
              <div
                className="w-12 h-12 rounded-lg border-2 border-border cursor-pointer transition-transform hover:scale-105"
                style={{ backgroundColor: color }}
              />
              <button
                onClick={() => removeColor(index)}
                className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <X className="w-3 h-3" />
              </button>
              <p className="text-xs text-center mt-1 text-muted-foreground">
                {color}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Custom Color */}
      <div>
        <Label className="text-base font-medium mb-3 block">Додати свій колір</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            className="w-16 h-10 p-1 cursor-pointer"
          />
          <Input
            type="text"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            placeholder="#000000"
            className="flex-1"
          />
          <Button onClick={addCustomColor} size="icon">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}