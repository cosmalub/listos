import { useOrderDialog } from "@/components/order/OrderDialogContext";
import logoListosik from "@/assets/logo-listosik.png";

export function FooterExperiment() {
  const { openOrderDialog } = useOrderDialog();

  return (
    <footer className="pt-20 pb-8 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-8 md:gap-16 mb-12">
            {/* Brand Left */}
            <div className="flex flex-col items-center md:items-start gap-4 max-w-[280px] text-center md:text-left">
              <img src={logoListosik} alt="Листосик" className="h-10 md:h-12" />
              <p className="text-sm font-medium text-gray-600 leading-relaxed">
                Допомагає сказати важливе — красиво і по-справжньому
              </p>
            </div>

            {/* Right group: links + contacts */}
            <div className="grid grid-cols-2 gap-6 md:flex md:flex-row md:gap-16 md:ml-auto">
              {/* Useful Information */}
              <div className="space-y-3 text-left">
                <h3 className="font-bold text-gray-900 text-base md:text-lg">Корисна інформація</h3>
                <ul className="space-y-1.5">
                  <li><a href="#faq" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Часті запитання</a></li>

                  <li>
                    <button
                      onClick={() => openOrderDialog('footer', 'Оформити замовлення')}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors text-left"
                    >
                      Оформити замовлення
                    </button>
                  </li>
                  <li>
                    <a
                      href="https://lystosyk.com/studio"
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Створити листівку
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col items-start space-y-2 text-left">
                <h3 className="font-bold text-gray-900 text-base md:text-lg">Зв'язок</h3>
                <div className="space-y-2 text-gray-600">
                  <p className="text-sm">melodlistiv@gmail.com</p>

                  <div className="flex gap-3 pt-1">
                    <a href="https://www.instagram.com/melodiinalistivka/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-gray-900 transition-colors">Instagram</a>
                    <a href="https://t.me/genbyhuman" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-gray-900 transition-colors">Telegram</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright - full width border */}
      <div className="border-t border-gray-200 mt-4">
        <div className="container mx-auto px-4 pt-4">
          <p className="text-sm text-gray-500 text-center">
            © 2026 Листосик. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
}
