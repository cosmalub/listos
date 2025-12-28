import { useOrderDialog } from "@/components/order/OrderDialogContext";
import logoListosik from "@/assets/logo-listosik.png";

export function Footer() {
  const { openOrderDialog } = useOrderDialog();

  return (
    <footer className="py-16 bg-gradient-to-b from-white to-[#B8B3FF]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-8 md:gap-16 mb-12">
            {/* Brand Left */}
            <div className="flex flex-col items-center md:items-start gap-4 text-[#6A5ACD] max-w-[280px] text-center md:text-left">
              <img src={logoListosik} alt="Листосик" className="h-10 md:h-12" />
              <p className="text-sm font-medium text-[#6A5ACD]/90 leading-relaxed">
                Допомагає сказати важливе — красиво і по-справжньому
              </p>
            </div>

            {/* Right group: links + contacts */}
            <div className="grid grid-cols-2 gap-6 md:flex md:flex-row md:gap-16 md:ml-auto">
              {/* Useful Information */}
              <div className="space-y-3 text-left">
                <h3 className="font-bold text-[#6A5ACD] text-base md:text-lg">Корисна інформація</h3>
                <ul className="space-y-1.5">
                  <li><a href="#faq" className="text-sm text-[#6A5ACD]/80 hover:text-[#6A5ACD] transition-colors">Часті запитання</a></li>
                  <li><a href="#" className="text-sm text-[#6A5ACD]/80 hover:text-[#6A5ACD] transition-colors">Доставка та оплата</a></li>
                  <li><a href="#" className="text-sm text-[#6A5ACD]/80 hover:text-[#6A5ACD] transition-colors">Політика конфіденційності</a></li>
                  <li><a href="#" className="text-sm text-[#6A5ACD]/80 hover:text-[#6A5ACD] transition-colors">Умови користування</a></li>
                  <li>
                    <button
                      onClick={openOrderDialog}
                      className="text-sm text-[#6A5ACD]/80 hover:text-[#6A5ACD] transition-colors"
                    >
                      Створити листівку
                    </button>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col items-start space-y-2 text-left">
                <h3 className="font-bold text-[#6A5ACD] text-base md:text-lg">Зв'язок</h3>
                <div className="space-y-2 text-[#6A5ACD]/80">
                  <p className="text-sm">info@listosyk.com</p>
                  <p className="text-sm">+380 XX XXX XX XX</p>
                  <div className="flex gap-3 pt-1">
                    <a href="#" className="text-sm hover:text-[#6A5ACD] transition-colors">Instagram</a>
                    <a href="#" className="text-sm hover:text-[#6A5ACD] transition-colors">Telegram</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-[#6A5ACD]/20 pt-8">
            <div className="text-center">
              <p className="text-sm text-[#6A5ACD]/80">
                © 2025 Листосик. Всі права захищені.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
