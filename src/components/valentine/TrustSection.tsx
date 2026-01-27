import React from 'react';
import { Button } from "@/components/ui/button";
import { useOrderDialog } from "@/components/order/OrderDialogContext";

export function TrustSection() {
  const { openOrderDialog } = useOrderDialog();

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-purple-50/40 to-pink-50/30">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#6B5CE7] mb-4">
          Ми гарантуємо
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          Ти отримаєш листівку, яку приємно вручити.
          <br />
          Якщо результат не сподобається — ми повернемо гроші протягом 24 годин.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md text-left">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mb-3">
              <span className="text-pink-500 font-bold">💝</span>
            </div>
            <p className="text-gray-800 font-medium">
              Не потрібно вміти писати вірші
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md text-left">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mb-3">
              <span className="text-pink-500 font-bold">💝</span>
            </div>
            <p className="text-gray-800 font-medium">
              Неможливо «зробити погано»
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md text-left">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mb-3">
              <span className="text-pink-500 font-bold">💝</span>
            </div>
            <p className="text-gray-800 font-medium">
              Ми проведемо тебе на кожному кроці
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md text-left">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mb-3">
              <span className="text-pink-500 font-bold">💝</span>
            </div>
            <p className="text-gray-800 font-medium">
              Якщо не відчуєш «це воно» — повернемо гроші
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#6B5CE7] to-[#8A7AEE] rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Можеш почати без ризику</h3>
            <p className="text-lg text-white/90 max-w-xl mx-auto mb-8">
              Якщо щось піде не так — ми повернемо гроші.
            </p>

            <Button
              onClick={() => openOrderDialog('guarantee-valentine', 'Почати без ризику')}
              size="lg"
              className="text-lg px-12 py-7 rounded-full bg-white text-[#6B5CE7] hover:bg-gray-50 shadow-xl transition-all hover:scale-105 font-bold"
            >
              Почати без ризику
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
