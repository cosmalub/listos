import React from 'react';
import { CheckCircle } from 'lucide-react';

const steps = [
  { id: 1, title: 'Створення слів', description: 'Створюємо слова для пісні' },
  { id: 2, title: 'Генерація музики', description: 'Генеруємо 2 варіанти на основі тексту' },
  { id: 3, title: 'Сторінка з піснею', description: 'Створюємо персональну сторінку' },
  { id: 4, title: 'Дизайн листівки', description: 'Обираємо дизайн та стиль листівки' },
  { id: 5, title: 'Замовлення', description: 'Оформлюємо замовлення та доставку' },
];

interface StepsHeaderProps {
  currentStep: number;
}

export const StepsHeader: React.FC<StepsHeaderProps> = ({ currentStep }) => {
  return (
    <div className="bg-transparent pt-24 md:pt-28">
      <div className="container mx-auto px-4 py-6">
        {/* Desktop: Horizontal layout with connecting lines */}
        <div className="hidden md:flex items-center justify-between max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  currentStep > step.id 
                    ? 'bg-success border-success text-success-foreground' 
                    : currentStep === step.id 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : 'bg-background border-border text-muted-foreground'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {step.description}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 transition-colors ${
                  currentStep > step.id ? 'bg-success' : 'bg-border'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Mobile: Compact grid layout */}
        <div className="md:hidden grid grid-cols-5 gap-2 max-w-sm mx-auto">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                currentStep > step.id 
                  ? 'bg-success border-success text-success-foreground' 
                  : currentStep === step.id 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'bg-background border-border text-muted-foreground'
              }`}>
                {currentStep > step.id ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <span className="text-xs font-medium">{step.id}</span>
                )}
              </div>
              <div className="mt-1 text-center h-8 overflow-hidden">
                <div className={`text-[11px] leading-tight font-medium ${
                  currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};