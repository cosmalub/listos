import { X, Check } from "lucide-react";

const standardGifts = [
  {
    name: "Букет квітів",
    price: "500 грн",
    downside: "завяне через тиждень",
  },
  {
    name: "Листівка з магазину",
    price: "50 грн",
    downside: "прочитає і забуде через день",
  },
  {
    name: "Цукерки",
    price: "300 грн",
    downside: "зʼїдяться через годину",
  }
];

const listosykGift = {
  name: "Listosyk",
  price: "399 грн",
  benefit: "залишиться назавжди",
};

export function ComparisonSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-12">
          Порівняння стандартних подарунків і Listosyk
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Standard gifts - with red X */}
          {standardGifts.map((gift, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border-2 border-red-100 dark:border-red-900/30">
              <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <X className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-foreground">{gift.name}</span>
                <span className="text-muted-foreground"> ({gift.price})</span>
                <span className="text-muted-foreground"> → {gift.downside}</span>
              </div>
            </div>
          ))}
          
          {/* Listosyk - with green checkmark */}
          <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border-2 border-green-200 dark:border-green-900/30 hover:border-primary transition-colors">
            <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <span className="font-bold text-primary">{listosykGift.name}</span>
              <span className="text-muted-foreground"> ({listosykGift.price})</span>
              <span className="text-primary font-medium"> → {listosykGift.benefit}</span>
            </div>
          </div>
        </div>
        
        <p className="text-center text-lg font-medium text-primary mt-8 max-w-2xl mx-auto">
          Листівка з піснею говорить за тебе і залишається назавжди.
        </p>
      </div>
    </section>
  );
}
