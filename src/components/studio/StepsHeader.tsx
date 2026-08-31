import React from 'react';
import { CheckCircle } from 'lucide-react';
import type { ProductFormat } from '@/lib/product-format';
import { getStoredProductFormat } from '@/lib/product-format';

const qrSteps = [
  { id: 1, title: 'Створення слів', description: 'Створюємо слова\nдля пісні' },
  { id: 2, title: 'Генерація музики', description: 'Генеруємо 2 варіанти на основі тексту' },
  { id: 3, title: 'Сторінка з піснею', description: 'Створюємо персональну сторінку з піснею' },
  { id: 4, title: 'Дизайн листівки', description: 'Робимо дизайн\nлистівки з QR-кодом' },
];

const soundSteps = [
  { id: 1, title: 'Створення слів', description: 'Створюємо слова\nдля пісні' },
  { id: 2, title: 'Генерація музики', description: 'Генеруємо 2 варіанти на основі тексту' },
  { id: 3, title: 'Сторінка з піснею', description: 'Підписуємо пісню:\nнагода, кому і від кого' },
  { id: 4, title: 'Дизайн листівки', description: 'Оформлюємо листівку,\nщо грає при відкритті' },
];

interface StepsHeaderProps {
  currentStep: number;
  productFormat?: ProductFormat;
}

export const StepsHeader: React.FC<StepsHeaderProps> = ({ currentStep, productFormat }) => {
  const format = productFormat ?? getStoredProductFormat();
  const steps = format === 'sound' ? soundSteps : qrSteps;

  return (
    <div className="bg-transparent pt-24 md:pt-28">
      <div className="container mx-auto px-4 py-6">
        {/* Desktop: Horizontal layout with connecting lines */}
        <div className="hidden md:flex items-start justify-center gap-4 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center w-36">
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
                  <div className="text-xs text-muted-foreground whitespace-pre-line">
                    {step.description}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-0.5 w-12 mt-5 transition-colors ${
                  currentStep > step.id ? 'bg-success' : 'bg-border'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile: Compact grid layout */}
        <div className="md:hidden grid grid-cols-4 gap-2 max-w-sm mx-auto">
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
