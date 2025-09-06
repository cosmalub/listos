import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MessageSquare, Music, FileText, Palette, ShoppingCart } from 'lucide-react';

interface StepExplanationProps {
  currentStep: number;
}

const stepExplanations = [
  {
    id: 1,
    icon: MessageSquare,
    title: 'Створення слів для пісні',
    description: 'Лістосик допоможе вам створити унікальні слова для пісні. Просто опишіть вашу ідею, настрій або тему, і він згенерує персональний текст.',
    tips: 'Поради: Вкажіть для кого пісня, з якого приводу, який настрій ви хочете передати'
  },
  {
    id: 2,
    icon: Music,
    title: 'Генерація музики',
    description: 'На основі ваших слів ми створимо два унікальні музичні варіанти у різних стилях. Ви зможете прослухати кожен і обрати найкращий.',
    tips: 'Ви отримаєте варіанти в різних жанрах, щоб знайти ідеальне звучання'
  },
  {
    id: 3,
    icon: FileText,
    title: 'Персональна сторінка',
    description: 'Створіть красиву персональну сторінку з вашою піснею. Додайте особисті деталі: від кого, для кого, з якого приводу.',
    tips: 'Ця сторінка стане серцем вашої листівки - місцем, де зберігатиметься ваша пісня'
  },
  {
    id: 4,
    icon: Palette,
    title: 'Дизайн листівки',
    description: 'Оберіть дизайн та стиль вашої фізичної листівки. Різні варіанти оформлення під будь-який настрій та випадок.',
    tips: 'Кожен дизайн унікальний і створений спеціально для персональних листівок'
  },
  {
    id: 5,
    icon: ShoppingCart,
    title: 'Оформлення замовлення',
    description: 'Заповніть деталі доставки та завершіть замовлення. Ваша персональна листівка буде надрукована та доставлена за вказаною адресою.',
    tips: 'Ми подбаємо про якісний друк та швидку доставку'
  }
];

export const StepExplanation: React.FC<StepExplanationProps> = ({ currentStep }) => {
  const currentExplanation = stepExplanations.find(step => step.id === currentStep);
  
  if (!currentExplanation) {
    return null;
  }

  const Icon = currentExplanation.icon;

  return (
    <div className="container mx-auto px-4 mb-6">
      <Alert className="max-w-4xl mx-auto border-primary/20 bg-primary/5">
        <Icon className="h-4 w-4 text-primary" />
        <AlertDescription className="space-y-2">
          <div className="font-medium text-foreground">
            {currentExplanation.title}
          </div>
          <div className="text-sm text-muted-foreground">
            {currentExplanation.description}
          </div>
          <div className="text-xs text-muted-foreground italic">
            💡 {currentExplanation.tips}
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};