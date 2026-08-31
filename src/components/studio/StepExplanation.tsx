import React from 'react';
import type { ProductFormat } from '@/lib/product-format';
import { getStoredProductFormat } from '@/lib/product-format';

interface StepExplanationProps {
  currentStep: number;
  showTutorial?: boolean;
  productFormat?: ProductFormat;
}

const qrHints: { [key: string]: string } = {
  '1': 'На цьому кроці ви поспілкуєтесь з Лістосиком - нашим помічником, який поставить вам кілька питань про отримувача, привід і настрій, щоб створити слова для пісні',
  '1.5': 'На цьому кроці ви оберете стиль музики, який найкраще підійде для вашої пісні. Ми підібрали найкращі варіанти на основі вашого тексту, але ви можете переглянути всі доступні стилі',
  '2': '',
  '3': 'На цьому кроці ви створите персональну сторінку з піснею, на яку людина потрапить по QR-коду. Вкажіть нагоду, кому і від кого пісня',
  '4': 'На цьому кроці ви оберете дизайн листівки з QR-кодом, яка веде на вашу сторінку з піснею. Ця фізична листівка буде надрукована та відправлена'
};

const soundHints: { [key: string]: string } = {
  '1': 'Зараз ви розкажете Лістосику про людину і привід — і разом напишете слова пісні. Це основа всієї листівки.',
  '1.5': 'Оберіть, як звучатиме пісня. Ми вже підказали стилі під ваш текст — можете взяти наш варіант або глянути всі.',
  '2': '',
  '3': 'Підпишіть пісню: нагода, кому і від кого. Це допоможе оформити листівку й персональну сторінку.',
  '4': 'Зараз ви оформлюєте листівку, яка заграє пісню, щойно її відкриють. Спочатку обкладинка, потім теплий текст усередині.'
};

const tutorialHint = '';
export const StepExplanation: React.FC<StepExplanationProps> = ({
  currentStep,
  showTutorial = false,
  productFormat
}) => {
  const format = productFormat ?? getStoredProductFormat();
  const hints = format === 'sound' ? soundHints : qrHints;
  const hint = showTutorial ? tutorialHint : hints[currentStep.toString()];
  if (!hint) {
    return null;
  }
  return <div className="container mx-auto px-4 mb-4">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-foreground bg-muted/20 rounded-lg px-4 py-2 text-sm font-light">
          {hint}
        </p>
      </div>
    </div>;
};
