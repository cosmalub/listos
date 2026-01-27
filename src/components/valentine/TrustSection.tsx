import React from 'react';
import { ShieldCheck } from 'lucide-react';
export function TrustSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Зняття страхів
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          Ми подбали про все, щоб тобі було легко і впевнено
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-purple-100 text-left">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <span className="text-purple-600 font-bold">✓</span>
            </div>
            <p className="text-gray-800 font-medium">
              Не потрібно вміти писати вірші
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-purple-100 text-left">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <span className="text-purple-600 font-bold">✓</span>
            </div>
            <p className="text-gray-800 font-medium">
              Неможливо «зробити погано»
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-purple-100 text-left">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <span className="text-purple-600 font-bold">✓</span>
            </div>
            <p className="text-gray-800 font-medium">
              Ми проведемо тебе на кожному кроці
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-purple-100 text-left">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <span className="text-purple-600 font-bold">✓</span>
            </div>
            <p className="text-gray-800 font-medium">
              Якщо не відчуєш «це воно» — повернемо гроші
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-purple-100">
          <p className="text-xl md:text-2xl font-bold text-gray-900">
            Твій ризик — нуль.{' '}
            <span className="text-[#6B5CE7]">Твоя емоція — максимум.</span>
          </p>
        </div>
      </div>
    </section>);

}