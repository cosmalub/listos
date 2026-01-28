import React from 'react';
import { Button } from "@/components/ui/button";
import { useOrderDialog } from "@/components/order/OrderDialogContext";
import { Lightbulb, ShieldCheck, HandHeart, RefreshCcw } from "lucide-react";

const TrustCard = ({ icon: Icon, title }: { icon: any, title: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
    <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-[#6B5CE7] flex-shrink-0">
      <Icon size={20} />
    </div>
    <p className="text-gray-800 font-medium leading-tight">{title}</p>
  </div>
);

export function TrustSection() {
  const { openOrderDialog } = useOrderDialog();

  return (
    <section className="py-24 px-4 bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-gray-900 drop-shadow-sm mb-6">
            Ми гарантуємо <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">емоції</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Якщо результат не сподобається — ми повернемо гроші протягом 24 годин.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <TrustCard icon={Lightbulb} title="Не потрібно нічого вигадувати" />
          <TrustCard icon={ShieldCheck} title="Неможливо «зробити погано»" />
          <TrustCard icon={HandHeart} title="Ми проведемо тебе на кожному кроці" />
          <TrustCard icon={RefreshCcw} title="100% повернення коштів, якщо не сподобається" />
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden border border-rose-100 shadow-xl shadow-purple-100/50">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Спробуй без ризику</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
              Ти нічим не ризикуєш. Або це стане найкращим подарунком, або ми повернемо гроші.
            </p>

            <Button
              onClick={() => openOrderDialog('guarantee-valentine', 'Почати без ризику')}
              size="lg"
              className="bg-gradient-to-r from-rose-500 to-purple-600 text-white hover:shadow-rose-500/25 px-10 py-7 text-xl rounded-full font-bold shadow-xl transition-all hover:scale-105"
            >
              Створити листівку
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
