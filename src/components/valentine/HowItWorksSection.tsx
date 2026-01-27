import React from 'react';
import { motion } from 'framer-motion';
export function HowItWorksSection() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#6B5CE7] mb-4">
            Як це працює?
          </h2>
          <p className="text-xl text-gray-500">
            3 простих кроки — від ідеї до листівки з піснею
          </p>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 border border-purple-100 text-center">

            <h3 className="text-2xl md:text-3xl font-bold text-[#6B5CE7] mb-4">
              Крок 1: Купуєш доступ до студії
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Оплачуєш 399 грн та вказуєш адресу доставки → на твій email
              приходить посилання на студію.
            </p>
            <p className="text-gray-600 mb-6">
              <span className="font-semibold text-[#6B5CE7]">
                Доставка безкоштовна
              </span>{' '}
              по всій Україні. Студія доступна{' '}
              <span className="font-semibold text-[#6B5CE7]">24/7</span> —
              створюй, коли зручно!
            </p>
            <button className="bg-[#6B5CE7] text-white font-bold py-3 px-8 rounded-full hover:bg-[#5a4bd1] transition-colors">
              Купити доступ
            </button>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: 0.1
            }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 border border-purple-100">

            <h3 className="text-2xl md:text-3xl font-bold text-[#6B5CE7] mb-6 text-center">
              Крок 2: Створюєш пісню і дизайн у студії
            </h3>
            <p className="text-center text-gray-600 mb-10">
              У зручній студії ти:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Sub-step 1 */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#6B5CE7] text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  1
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Створюєш слова пісні
                </h4>
                <p className="text-gray-600 text-sm">
                  Листосик (ШІ-помічник) ставить питання і допомагає знайти
                  правильні слова. Не потрібно писати вірші — просто розкажи, що
                  хочеш сказати.
                </p>
              </div>

              {/* Sub-step 2 */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#6B5CE7] text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  2
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Генеруєш унікальну музику
                </h4>
                <p className="text-gray-600 text-sm">
                  Ші створює пісню за 30 секунд. Не сподобалось? Перегенеруй
                  безкоштовно. Скільки завгодно разів.
                </p>
              </div>

              {/* Sub-step 3 */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#6B5CE7] text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  3
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Створюєш сторінку з анімацією
                </h4>
                <p className="text-gray-600 text-sm">
                  Обираєш настрій, вказуєш кому та від кого. Система створює
                  персональну сторінку з анімацією, музикою та текстом. Отримуєш
                  її, відскануєвши QR-код.
                </p>
              </div>

              {/* Sub-step 4 */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#6B5CE7] text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  4
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Створюєш дизайн листівки
                </h4>
                <p className="text-gray-600 text-sm">
                  Обираєш фото, текст, стиль. Все просто, як конструктор.
                </p>
              </div>
            </div>

            <div className="text-center mb-8">
              <p className="text-[#6B5CE7] font-semibold flex items-center justify-center gap-2">
                <span>⏱️</span> Весь процес займає 10 хвилин
              </p>
            </div>

            {/* Video Demo Section */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  {/* Replace this div with actual video embed */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-[#6B5CE7] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24">

                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium">
                      Демо-відео процесу створення
                    </p>
                  </div>
                  {/*
                    To add actual video, replace above div with:
                    <iframe
                    className="w-full h-full"
                    src="YOUR_VIDEO_URL"
                    title="Demo video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    />
                    Or use <video> tag for direct video file
                    */}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: 0.2
            }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl overflow-hidden border border-purple-100">

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Image placeholder */}
              <div className="bg-gradient-to-br from-pink-200 to-purple-200 aspect-square md:aspect-auto md:h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="text-8xl mb-4">💝</div>
                  <p className="text-gray-600 font-medium">
                    Фото листівки + телефону
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:pr-12">
                <h3 className="text-2xl md:text-3xl font-bold text-[#6B5CE7] mb-4">
                  Крок 3: Даруєш і дивишся на емоції
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Листівка приїжджає{' '}
                    <span className="font-semibold text-[#6B5CE7]">
                      Новою поштою за 1-2 дні
                    </span>
                    . Ти отримуєш її та даруєш особливій людині.
                  </p>
                  <p>
                    <span className="font-semibold text-[#6B5CE7]">
                      А далі відбувається магія:
                    </span>{' '}
                    отримувач відкриває листівку → читає твої слова → сканує
                    QR-код → і... звучить пісня, створена саме для нього.
                  </p>
                  <p className="italic text-gray-600">
                    Пісня звучить. Слова зворушують. Емоції переповнюють.
                  </p>
                  <p className="font-bold text-[#6B5CE7] text-lg">
                    Мама плаче від радості. Коханий обіймає. Друг посміхається.
                  </p>
                  <p className="text-sm text-gray-500 italic">
                    Це не просто листівка. Це спогад на все життя.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}