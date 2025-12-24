import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp
} from 'lucide-react';
import { 
  MusicStyle, 
  MUSIC_STYLES, 
  STYLE_CATEGORIES, 
  MusicStyleCategory 
} from '@/lib/music-styles';
import { cn } from '@/lib/utils';

interface MusicStyleSelectorProps {
  recommendedStyles: MusicStyle[];
  onStyleSelected: (style: MusicStyle) => void;
  onBack?: () => void;
}

export const MusicStyleSelector: React.FC<MusicStyleSelectorProps> = ({
  recommendedStyles,
  onStyleSelected,
  onBack
}) => {
  const [selectedStyleId, setSelectedStyleId] = useState<string | null>(null);
  const [showAllStyles, setShowAllStyles] = useState(false);
  const [activeCategory, setActiveCategory] = useState<MusicStyleCategory | 'all'>('all');

  const handleStyleSelect = (style: MusicStyle) => {
    setSelectedStyleId(style.id);
  };

  const handleContinue = () => {
    const style = MUSIC_STYLES.find(s => s.id === selectedStyleId);
    if (style) {
      onStyleSelected(style);
    }
  };

  // Отримати всі стилі за категорією
  const getStylesByCategory = (category: MusicStyleCategory | 'all'): MusicStyle[] => {
    if (category === 'all') return MUSIC_STYLES;
    return MUSIC_STYLES.filter(s => s.category === category);
  };

  const currentStyles = showAllStyles 
    ? getStylesByCategory(activeCategory)
    : recommendedStyles;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">

      {/* AI рекомендація */}
      {!showAllStyles && recommendedStyles.length > 0 && (
        <div className="text-center text-sm text-muted-foreground py-2">
          <Sparkles className="w-4 h-4 inline mr-1.5 text-primary" />
          Підібрано AI на основі вашої пісні та події
        </div>
      )}

      {/* Категорії (тільки для всіх стилів) */}
      {showAllStyles && (
        <Card>
          <CardContent className="pt-6">
            <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as MusicStyleCategory | 'all')}>
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 gap-1">
                <TabsTrigger value="all" className="text-xs">
                  Всі
                </TabsTrigger>
                {Object.entries(STYLE_CATEGORIES).map(([key, cat]) => (
                  <TabsTrigger key={key} value={key} className="text-xs">
                    <span className="hidden sm:inline">{cat.icon}</span> {cat.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Список стилів */}
      <div className="grid gap-3 md:gap-4 md:grid-cols-2">
        {currentStyles.map((style) => {
          const isSelected = selectedStyleId === style.id;
          const isRecommended = recommendedStyles.some(r => r.id === style.id);
          const category = STYLE_CATEGORIES[style.category];

          return (
            <Card
              key={style.id}
              className={cn(
                'cursor-pointer transition-all duration-200 hover:shadow-md',
                isSelected 
                  ? 'ring-2 ring-primary border-primary shadow-md' 
                  : 'hover:border-primary/50'
              )}
              onClick={() => handleStyleSelect(style)}
            >
              <CardContent className="p-3 md:p-4 relative overflow-hidden">
                {/* Фоновий градієнт */}
                <div 
                  className={cn(
                    'absolute inset-0 opacity-5 bg-gradient-to-br',
                    category.color
                  )}
                />

                <div className="relative space-y-2">
                  {/* Заголовок з іконкою та бейджем рекомендації */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{style.icon}</span>
                      <h3 className="font-semibold text-sm md:text-base">{style.name}</h3>
                    </div>
                    {isRecommended && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary text-xs shrink-0">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Рекомендовано
                      </Badge>
                    )}
                  </div>

                  {/* Опис */}
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {style.description}
                  </p>

                  {/* Вокал - простий текст */}
                  {style.vocalGender && (
                    <span className="text-xs text-muted-foreground">
                      {style.vocalGender === 'male' ? '👨 Чоловічий вокал' : '👩 Жіночий вокал'}
                    </span>
                  )}

                  {/* Індикатор вибору */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 md:top-3 md:right-3">
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary flex items-center justify-center">
                        <svg
                          className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Переключення між рекомендованими та всіма стилями (під списком стилів) */}
      {recommendedStyles.length > 0 && (
        <div className="flex justify-center">
          <Button
            variant={showAllStyles ? 'outline' : 'ghost'}
            onClick={() => setShowAllStyles(!showAllStyles)}
            className="gap-2"
            size="sm"
          >
            {showAllStyles ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Показати рекомендовані
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Переглянути всі стилі ({MUSIC_STYLES.length})
              </>
            )}
          </Button>
        </div>
      )}

      {/* Пояснення, якщо немає рекомендацій */}
      {!showAllStyles && recommendedStyles.length === 0 && (
        <Card className="border-orange-200 bg-orange-50/50">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Не вдалося підібрати рекомендовані стилі. Перегляньте всі доступні варіанти.
            </p>
            <Button
              variant="outline"
              onClick={() => setShowAllStyles(true)}
              className="mt-4"
            >
              Переглянути всі стилі
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Кнопки дій */}
      <div className="flex gap-3 justify-between items-center">
        {onBack && (
          <Button
            variant="ghost"
            onClick={onBack}
          >
            Назад
          </Button>
        )}
        <Button
          onClick={handleContinue}
          disabled={!selectedStyleId}
          className="ml-auto gap-2"
          size="lg"
        >
          Продовжити
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
