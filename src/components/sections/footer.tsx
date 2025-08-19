export function Footer() {
  return (
    <footer className="py-16 bg-gradient-to-b from-white to-[#B8B3FF]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Useful Information */}
          <div className="space-y-4">
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
          <div className="space-y-4 md:text-right">
            <h3 className="font-bold text-[#6A5ACD] text-lg">Зв'язок</h3>
            <div className="space-y-2 text-[#6A5ACD]/80">
              <p>info@listosyk.com</p>
              <p>+380 XX XXX XX XX</p>
              <div className="flex space-x-4 pt-2 md:justify-end">
                <a href="#" className="hover:text-[#6A5ACD] transition-colors">Instagram</a>
                <a href="#" className="hover:text-[#6A5ACD] transition-colors">Telegram</a>
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
    </footer>
  );
}