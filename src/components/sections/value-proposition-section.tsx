import { Check, Sparkles, Music, Zap, Heart, Gift, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ValuePropositionSection() {
  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] text-white px-4 py-2 rounded-full text-sm font-semibold">
              🎯 Як це працює
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#6A5ACD] mb-6">
            Ми — більше ніж генератор музики
          </h2>
          <p className="text-lg md:text-xl text-[#6A5ACD]/80 max-w-4xl mx-auto leading-relaxed">
            На ринку генерації музики є топові сервіси — <strong className="text-[#6A5ACD]">Suno AI</strong> та <strong className="text-[#6A5ACD]">ElevenLabs Music</strong>. 
            Багато хто пропонує пісні на замовлення за <strong className="text-[#6A5ACD]">500-2500 грн</strong>, створюючи їх вручну в цих інструментах — це довго і складно.
          </p>
          <p className="text-lg md:text-xl text-[#6A5ACD]/80 max-w-4xl mx-auto mt-4 leading-relaxed">
            <strong className="text-[#6A5ACD]">Ми інтегрували API цих моделей</strong> та автоматизували весь процес — тому це швидко, доступно і ви отримуєте набагато більше!
          </p>
        </div>

        {/* Візуальне порівняння */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Ліва частина - Інші варіанти */}
            <div className="space-y-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-700 mb-4 flex items-center justify-center md:justify-start gap-2">
                  <Music className="w-7 h-7" />
                  Інші варіанти на ринку
                </h3>
                <p className="text-gray-600 mb-6">Те, що пропонують конкуренти:</p>
              </div>

              <div className="space-y-4">
                <Card className="border-2 border-gray-200 hover:border-gray-300 transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-3xl">🎵</div>
                      <div>
                        <h4 className="font-bold text-gray-800 mb-1">Самостійно через Suno/ElevenLabs</h4>
                        <p className="text-sm text-gray-600">від $10-22/міс підписка</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400">•</span>
                        <span>Потрібно самому писати промпти</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400">•</span>
                        <span>Самостійно підбирати стиль музики</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400">•</span>
                        <span>Розбиратися в технічних налаштуваннях</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400">•</span>
                        <span>Отримуєте тільки аудіо-файл</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-orange-200 hover:border-orange-300 transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-3xl">👨‍💻</div>
                      <div>
                        <h4 className="font-bold text-gray-800 mb-1">Пісні на замовлення</h4>
                        <p className="text-sm text-orange-600 font-semibold">500-2500 грн</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400">•</span>
                        <span>Створюють вручну в тих же інструментах</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400">•</span>
                        <span>Очікування 2-7 днів</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400">•</span>
                        <span>Висока ціна за роботу людини</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400">•</span>
                        <span>Тільки пісня, без додаткових матеріалів</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                  <p className="text-center text-gray-600 font-semibold text-sm">
                    ⚠️ Або складно, або дорого, або довго
                  </p>
                </div>
              </div>
            </div>

            {/* Права частина - Листосик */}
            <div className="space-y-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-[#6A5ACD] mb-4 flex items-center justify-center md:justify-start gap-2">
                  <Sparkles className="w-7 h-7" />
                  Готове рішення "під ключ"
                </h3>
                <p className="text-[#6A5ACD]/80 mb-6">Те, що пропонуємо ми:</p>
              </div>

              <div className="space-y-4">
                <Card className="border-2 border-[#8A7AEE] bg-gradient-to-br from-[#F3D1FF]/30 to-[#B8B3FF]/30 hover:shadow-xl transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="text-3xl">✨</div>
                      <div>
                        <h4 className="font-bold text-[#6A5ACD] mb-1">Листосик</h4>
                        <p className="text-sm text-[#6A5ACD]/80">399 грн (~$10 одноразово)</p>
                      </div>
                    </div>

                    <div className="bg-white/70 rounded-lg p-3 mb-3">
                      <p className="text-xs font-semibold text-[#6A5ACD] mb-2">🔥 API інтеграція топових моделей:</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Suno AI v5 API
                        </span>
                        <span className="bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] text-white px-3 py-1 rounded-full text-xs font-semibold">
                          ElevenLabs API
                        </span>
                      </div>
                      <p className="text-xs text-[#6A5ACD]/70">
                        ⚡️ Автоматично обробляємо через API — без ручної роботи
                      </p>
                    </div>

                    <ul className="space-y-2 text-sm text-[#6A5ACD]">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Обучений ШІ</strong> створює емоційні тексти за вас</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Автопідбір стилю</strong> під вашу історію</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Необмежені регенерації</strong> доки не буде ідеально</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Фізична листівка</strong> з індивідуальним дизайном</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Анімована сторінка</strong> для події</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-300">
                  <p className="text-center text-green-700 font-semibold">
                    💚 Для кожного — просто та швидко
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Стрілка між блоками (мобільна) */}
          <div className="flex justify-center my-6 md:hidden">
            <ArrowRight className="w-12 h-12 text-[#6A5ACD] rotate-90" />
          </div>
        </div>

        {/* Основна цінність */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-[#8A7AEE]/10 to-[#D292FF]/10 rounded-3xl border-2 border-[#B8B3FF] p-8 md:p-12">
            <div className="text-center mb-8">
              <Sparkles className="w-12 h-12 text-[#6A5ACD] mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-[#6A5ACD] mb-4">
                Наша унікальна цінність
              </h3>
              <p className="text-lg text-[#6A5ACD]/80">
                Ми беремо найкращі технології ШІ і додаємо те, чого не вистачає іншим:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border-2 border-[#B8B3FF]/40">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#6A5ACD] mb-2">Експертиза + автоматизація</h4>
                    <p className="text-sm text-[#6A5ACD]/80">
                      Навчили ШІ розуміти емоції та створювати справді зворушливі тексти. Ви просто розповідаєте історію — решту робимо ми.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-[#B8B3FF]/40">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#6A5ACD] mb-2">Персоналізація</h4>
                    <p className="text-sm text-[#6A5ACD]/80">
                      Кожна пісня унікальна, кожна листівка створюється під вашу історію. Не шаблони — справжні емоції.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-[#B8B3FF]/40">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] flex items-center justify-center flex-shrink-0">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#6A5ACD] mb-2">Комплексне рішення</h4>
                    <p className="text-sm text-[#6A5ACD]/80">
                      Не просто пісня в файлі. Це цифрова пісня + красива анімована сторінка + фізична листівка, яку можна потримати в руках.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-[#B8B3FF]/40">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] flex items-center justify-center flex-shrink-0">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#6A5ACD] mb-2">API автоматизація</h4>
                    <p className="text-sm text-[#6A5ACD]/80">
                      Інтегрували Suno AI v5 та ElevenLabs через API. Все працює автоматично — за 30 секунд отримуєте результат, який іншим потрібно робити вручну годинами.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Висновок */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-300 text-center">
              <p className="text-2xl font-bold text-green-700 mb-4">
                💎 Висновок
              </p>
              <div className="space-y-3 mb-6">
                <p className="text-base text-gray-700 leading-relaxed">
                  <strong>Самостійно через Suno/ElevenLabs</strong> — складно і потрібно розбиратися.
                </p>
                <p className="text-base text-gray-700 leading-relaxed">
                  <strong>Пісні на замовлення (500-2500 грн)</strong> — роблять вручну, довго і дорого.
                </p>
                <p className="text-lg text-[#6A5ACD] leading-relaxed font-semibold">
                  <strong className="text-[#6A5ACD]">Листосик (399 грн)</strong> — API автоматизація топових моделей + експертиза + персоналізація + комплексний подарунок з фізичною листівкою.
                </p>
              </div>
              <div className="inline-block bg-white px-6 py-3 rounded-full border-2 border-[#8A7AEE] shadow-lg">
                <p className="text-[#6A5ACD] font-bold">
                  🤖 Автоматизація + ❤️ Експертиза = 🎁 Готовий подарунок
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            onClick={() => (window.location.href = "/order")}
            className="text-lg px-10 py-7 rounded-full bg-gradient-to-r from-[#8A7AEE] to-[#D292FF] hover:from-[#7A6ADE] hover:to-[#C282EF] text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 font-bold"
          >
            🎵 Обираю професійне рішення
          </Button>
        </div>
      </div>
    </section>
  );
}
