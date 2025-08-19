import { Card } from "@/components/ui/card";
import listosykMascot from "@/assets/listosyk-mascot.png";

export function MascotSection() {
  const steps = [
    {
      number: "1",
      title: "Створюєш послання",
      description: "Ти складаєш особисті слова та обираєш стиль пісні для твого привітання, вибачення чи подяки. Листосик допоможе знайти правильні слова!"
    },
    {
      number: "2", 
      title: "Створюєш дизайн листівки",
      description: "Ти оформлюєш лицеву сторону листівки з головним посланням. Потім додаєш особисті слова на зворотній стороні та підпис – щоб зробити подарунок по-справжньому неповторним."
    },
    {
      number: "3",
      title: "Отримуєш готову листівку", 
      description: "Ось і все! Твоя унікальна листівка з персоналізованою піснею готова. Завдяки спеціальному QR-коду на листівці, твій одержувач зможе відразу почути твоє музичне послання."
    }
  ];

  return (
    <section className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Mascot and speech bubble */}
          <div className="lg:w-1/2 text-center">
            <img 
              src={listosykMascot} 
              alt="Листосик - котик талісман" 
              className="w-64 h-64 mx-auto mb-8 drop-shadow-2xl"
            />
            
            <Card className="relative bg-card p-6 rounded-3xl shadow-soft max-w-md mx-auto">
              <div className="absolute -top-3 left-12 w-6 h-6 bg-card transform rotate-45 border-l border-t border-border"></div>
              <h3 className="text-xl font-bold text-primary mb-4">Привіт, я Листосик!</h3>
              <p className="text-muted-foreground">
                Розкажи, що хочеш сказати — «дякую», «вибач», «вітаю» чи «кохаю», — а я 
                допоможу написати пісню, зроблю дизайн листівки з QR-кодом, надрукую та 
                надішлю її тобі, щоб ти подарував її особливій людині.
              </p>
            </Card>
          </div>

          {/* Steps */}
          <div className="lg:w-1/2 space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-soft">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-16 bg-gradient-primary mx-auto mt-4"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-primary mb-3">{step.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}