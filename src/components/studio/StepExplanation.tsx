import React from 'react';

interface StepExplanationProps {
  currentStep: number;
}

const stepHints = [
  'Мета: створити слова пісні. Що зробити: розкажіть про отримувача, привід і настрій',
  'Мета: підібрати музику. Що зробити: прослухайте варіанти і оберіть найкращий',
  'Мета: створити персональну сторінку. Що зробити: додайте дані для оформлення',
  'Мета: створити листівку. Що зробити: оберіть дизайн під ваш випадок',
  'Мета: оформити замовлення. Що зробити: вкажіть адресу і завершіть покупку'
];

export const StepExplanation: React.FC<StepExplanationProps> = ({ currentStep }) => {
  const hint = stepHints[currentStep - 1];
  
  if (!hint) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 mb-4">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-sm text-muted-foreground bg-muted/20 rounded-lg px-4 py-2">
          {hint}
        </p>
      </div>
    </div>
  );
};