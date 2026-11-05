import React from 'react';
import { CheckCircle } from 'lucide-react';

const steps = [
  { id: 1, title: 'Створення слів', description: 'Створюємо слова\nдля пісні' },
  { id: 2, title: 'Генерація музики', description: 'Генеруємо 2 варіанти на основі тексту' },
  { id: 3, title: 'Дизайн листівки', description: 'Обкладинка та розворот (88×166 мм)' },
];

interface PhysicalStepsHeaderProps {
  currentStep: number;
}

export const PhysicalStepsHeader: React.FC<PhysicalStepsHeaderProps> = ({ currentStep }) => {
  return (
    <div className="bg-transparent pt-24 md:pt-28">
      <div className="container mx-auto px-4 py-6">
        <div className="hidden md:flex items-start justify-center gap-4 max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center w-40">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  currentStep > step.id
                    ? 'bg-success border-success text-success-foreground'
                    : currentStep === step.id || (step.id === 1 && currentStep === 1.5)
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
                  <div className="text-xs text-muted-foreground whitespace-pre-line">
                    {step.description}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-0.5 w-16 mt-5 transition-colors ${
                  currentStep > step.id ? 'bg-success' : 'bg-border'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="md:hidden grid grid-cols-3 gap-2 max-w-sm mx-auto">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                currentStep > step.id
                  ? 'bg-success border-success text-success-foreground'
                  : currentStep === step.id || (step.id === 1 && currentStep === 1.5)
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
                <div className={`text-xs leading-tight font-medium ${
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
