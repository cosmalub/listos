export function Footer() {
  return (
    <footer className="py-16 bg-gradient-to-b from-white to-[#B8B3FF]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-8 md:gap-16 mb-12">
            {/* Brand Left */}
            <div className="hidden md:flex flex-col gap-1 text-[#6A5ACD]">
              <span className="text-2xl font-extrabold tracking-tight">Листосик</span>
              <span className="text-sm text-[#6A5ACD]/80">Сервіс листівок</span>
            </div>

            {/* Right group: links + contacts */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 md:ml-auto">
              {/* Useful Information */}
              <div className="space-y-4 text-center md:text-left">
                <h3 className="font-bold text-[#6A5ACD] text-lg">Корисна інформація</h3>
                <ul className="space-y-2">
                  <li><a href="#faq" className="text-[#6A5ACD]/80 hover:text-[#6A5ACD] transition-colors">Часті запитання</a></li>
                  <li><a href="#" className="text-[#6A5ACD]/80 hover:text-[#6A5ACD] transition-colors">Доставка та оплата</a></li>
                  <li><a href="#" className="text-[#6A5ACD]/80 hover:text-[#6A5ACD] transition-colors">Політика конфіденційності</a></li>
                  <li><a href="#" className="text-[#6A5ACD]/80 hover:text-[#6A5ACD] transition-colors">Умови користування</a></li>
                  <li><a href="/order" className="text-[#6A5ACD]/80 hover:text-[#6A5ACD] transition-colors">Створити листівку</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
                <h3 className="font-bold text-[#6A5ACD] text-lg">Зв'язок</h3>
                <div className="space-y-2 text-[#6A5ACD]/80">
                  <p>info@listosyk.com</p>
                  <p>+380 XX XXX XX XX</p>
                  <div className="flex gap-4 pt-2 justify-center md:justify-start">
                    <a href="#" className="hover:text-[#6A5ACD] transition-colors">Instagram</a>
                    <a href="#" className="hover:text-[#6A5ACD] transition-colors">Telegram</a>
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