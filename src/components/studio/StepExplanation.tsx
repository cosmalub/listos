import React from 'react';

interface StepExplanationProps {
  currentStep: number;
}

const stepHints = [
  'Опишіть для кого пісня, з якого приводу та який настрій хочете передати',
  'Прослухайте варіанти та оберіть той, що найкраще передає ваші емоції',
  'Додайте особисті деталі для красивої персональної сторінки',
  'Оберіть дизайн листівки під ваш настрій та випадок',
  'Заповніть адресу доставки та завершіть замовлення'
];

export const StepExplanation: React.FC<StepExplanationProps> = ({ currentStep }) => {
  const hint = stepHints[currentStep - 1];
  
  if (!hint) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 mb-4">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-sm text-muted-foreground bg-muted/30 rounded-lg px-4 py-2">
          💡 {hint}
        </p>
      </div>
    </div>
  );
};