export function Footer() {
  return (
    <footer className="py-16 bg-gradient-to-b from-white to-[#B8B3FF]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Main Navigation */}
          <div className="space-y-4">
            <h3 className="font-bold text-[#6A5ACD] text-lg">Навігація</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-[#6A5ACD]/80 hover:text-[#6A5ACD] transition-colors">Головна</a></li>
              <li><a href="#benefits" className="text-[#6A5ACD]/80 hover:text-[#6A5ACD] transition-colors">Переваги</a></li>
              <li><a href="#examples" className="text-[#6A5ACD]/80 hover:text-[#6A5ACD] transition-colors">Приклади</a></li>
              <li><a href="#pricing" className="text-[#6A5ACD]/80 hover:text-[#6A5ACD] transition-colors">Ціни</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-bold text-[#6A5ACD] text-lg">Послуги</h3>
            <ul className="space-y-2">
              <li><a href="/order" className="text-[#6A5ACD]/80 hover:text-[#6A5ACD] transition-colors">Створити листівку</a></li>
              <li><a href="#" className="text-[#6A5ACD]/80 hover:text-[#6A5ACD] transition-colors">Шаблони</a></li>
              <li><a href="#" className="text-[#6A5ACD]/80 hover:text-[#6A5ACD] transition-colors">Персоналізація</a></li>
              <li><a href="#" className="text-[#6A5ACD]/80 hover:text-[#6A5ACD] transition-colors">Доставка</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-bold text-[#6A5ACD] text-lg">Підтримка</h3>
            <ul className="space-y-2">
              <li><a href="#faq" className="text-[#6A5ACD]/80 hover:text-[#6A5ACD] transition-colors">FAQ</a></li>
              <li><a href="#" className="text-[#6A5ACD]/80 hover:text-[#6A5ACD] transition-colors">Контакти</a></li>
              <li><a href="#" className="text-[#6A5ACD]/80 hover:text-[#6A5ACD] transition-colors">Політика конфіденційності</a></li>
              <li><a href="#" className="text-[#6A5ACD]/80 hover:text-[#6A5ACD] transition-colors">Умови користування</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-[#6A5ACD] text-lg">Зв'язок</h3>
            <div className="space-y-2 text-[#6A5ACD]/80">
              <p>info@listosyk.com</p>
              <p>+380 XX XXX XX XX</p>
              <div className="flex space-x-4 pt-2">
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