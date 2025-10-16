import { Check, X, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ServiceComparisonProps {
  service: {
    name: string;
    price: string;
    pricePerMonth: string;
    features: Array<{ text: string; available: boolean }>;
    highlight?: boolean;
  };
}

function ServiceCard({ service }: ServiceComparisonProps) {
  return (
    <Card
      className={`border-2 transition-all h-full ${
        service.highlight
          ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-xl scale-105"
          : "border-gray-300 bg-gray-50"
      }`}
    >
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3
            className={`text-2xl font-bold mb-2 ${
              service.highlight ? "text-green-700" : "text-gray-700"
            }`}
          >
            {service.name}
          </h3>
          <div className="mb-4">
            <div
              className={`text-4xl font-bold ${
                service.highlight ? "text-green-600" : "text-gray-600"
              }`}
            >
              {service.price}
            </div>
            <div
              className={`text-sm ${
                service.highlight ? "text-green-600" : "text-gray-500"
              }`}
            >
              {service.pricePerMonth}
            </div>
          </div>
        </div>

        <ul className="space-y-3">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              {feature.available ? (
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              )}
              <span
                className={`text-sm ${
                  feature.available
                    ? service.highlight
                      ? "text-green-900"
                      : "text-gray-700"
                    : "text-gray-400 line-through"
                }`}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function ValuePropositionSection() {
  const services = [
    {
      name: "Suno AI v5",
      price: "$10",
      pricePerMonth: "на місяць",
      features: [
        { text: "Генерація пісень", available: true },
        { text: "Потрібно самому писати промпти", available: false },
        { text: "Потрібно самому підбирати стиль", available: false },
        { text: "Допомога з текстами", available: false },
        { text: "Фізична листівка", available: false },
        { text: "Анімована сторінка", available: false },
      ],
    },
    {
      name: "ElevenLabs Music",
      price: "$22",
      pricePerMonth: "на місяць",
      features: [
        { text: "Генерація музики", available: true },
        { text: "Потрібно самому налаштовувати", available: false },
        { text: "Експертна допомога", available: false },
        { text: "Готове рішення", available: false },
        { text: "Фізична листівка", available: false },
        { text: "Анімована сторінка", available: false },
      ],
    },
    {
      name: "Listosyk",
      price: "399 грн",
      pricePerMonth: "~$10 одноразово",
      highlight: true,
      features: [
        { text: "Suno AI v5 + ElevenLabs Music", available: true },
        { text: "Обучений ШІ для створення текстів", available: true },
        { text: "Автопідбір оптимального стилю", available: true },
        { text: "Необмежені регенерації", available: true },
        { text: "Фізична листівка з дизайном", available: true },
        { text: "Персональна анімована сторінка", available: true },
      ],
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-purple-50 relative">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6A5ACD] mb-4">
            Чому Listosyk краще, ніж Suno чи ElevenLabs напряму?
          </h2>
          <p className="text-lg text-[#6A5ACD]/80 max-w-3xl mx-auto">
            У Suno та ElevenLabs є свої інтерфейси, але щоб користуватися
            найкращими версіями, потрібна підписка. Ми пропонуємо більше за ту ж
            ціну:
          </p>
        </div>

        {/* Порівняння сервісів */}
        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        {/* Ключові переваги */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#8A7AEE]/10 to-[#D292FF]/10 rounded-2xl border-2 border-[#B8B3FF] p-8">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-[#6A5ACD]" />
              <h3 className="text-2xl font-bold text-[#6A5ACD]">
                Наша унікальна цінність:
              </h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <p className="text-[#6A5ACD]/90">
                  <strong className="text-[#6A5ACD]">
                    Дві топові моделі одночасно:
                  </strong>{" "}
                  Ви отримуєте доступ і до Suno AI v5, і до ElevenLabs Music за
                  ціну однієї підписки
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <p className="text-[#6A5ACD]/90">
                  <strong className="text-[#6A5ACD]">
                    Готове рішення "під ключ":
                  </strong>{" "}
                  Не потрібно розбиратися в промптах, стилях чи технічних деталях
                  — наш обучений ШІ все зробить за вас
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <p className="text-[#6A5ACD]/90">
                  <strong className="text-[#6A5ACD]">
                    Експертиза в емоційних текстах:
                  </strong>{" "}
                  Ми навчили ШІ створювати справді зворушливі слова, які
                  резонують з вашими почуттями
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <p className="text-[#6A5ACD]/90">
                  <strong className="text-[#6A5ACD]">
                    Комплексний подарунок:
                  </strong>{" "}
                  Не просто пісня, а цілий пакет: цифрова пісня + персональна
                  анімована сторінка + фізична листівка з індивідуальним дизайном
                </p>
              </div>
            </div>

            {/* Висновок */}
            <div className="bg-white rounded-xl p-6 border-2 border-green-300 text-center">
              <p className="text-xl font-bold text-[#6A5ACD] mb-2">
                💎 Висновок
              </p>
              <p className="text-[#6A5ACD]/90">
                За ціну одної підписки Suno ви отримуєте повноцінний емоційний
                подарунок з фізичним втіленням. Це не просто пісня — це
                незабутній досвід.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            onClick={() => (window.location.href = "/studio")}
            className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] hover:from-[#7A6ADE] hover:to-[#C282EF] text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 font-bold"
          >
            🎵 Спробувати зараз
          </Button>
        </div>
      </div>
    </section>
  );
}
