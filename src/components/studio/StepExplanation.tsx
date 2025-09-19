import React from 'react';
interface StepExplanationProps {
  currentStep: number;
  showTutorial?: boolean;
}
const stepHints = [
  'На цьому кроці ви поспілкуєтесь з Лістосиком - нашим помічником, який поставить вам кілька питань про отримувача, привід і настрій, щоб створити слова для пісні',
  'На цьому кроці ми створимо з ваших слів справжню пісню - підберемо мелодію, аранжування. Ви зможете прослухати варіанти і обрати найкращий або попросити перегенерувати',
  'На цьому кроці ви оберете дизайн листівки під ваш випадок. Ця фізична листівка буде надрукована і відправлена, а на ній буде QR-код для переходу на сторінку з піснею',
  'На цьому кроці ви створите персональну сторінку з піснею і побажаннями, на яку людина потрапить по QR-коду з листівки. Вкажіть дані отримувача і відправника'
];

const tutorialHint = 'Спочатку давайте ознайомимося з процесом створення листівки та дізнаємося, що буде на лицьовій та зворотній частині';
export const StepExplanation: React.FC<StepExplanationProps> = ({
  currentStep,
  showTutorial = false
}) => {
  const hint = showTutorial ? tutorialHint : stepHints[currentStep - 1];
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