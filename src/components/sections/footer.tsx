export function Footer() {
  return (
    <footer className="relative bg-background">
      {/* Gradient line at top */}
      <div className="h-1 bg-gradient-to-r from-[#8A7AEE] to-[#D292FF]"></div>
      
      <div className="bg-white rounded-t-3xl shadow-soft pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Main Navigation */}
            <div className="space-y-4">
              <h3 className="font-bold text-foreground text-lg">Навігація</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-muted-foreground hover:text-primary transition-colors">Головна</a></li>
                <li><a href="#benefits" className="text-muted-foreground hover:text-primary transition-colors">Переваги</a></li>
                <li><a href="#examples" className="text-muted-foreground hover:text-primary transition-colors">Приклади</a></li>
                <li><a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Ціни</a></li>
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="font-bold text-foreground text-lg">Послуги</h3>
              <ul className="space-y-2">
                <li><a href="/order" className="text-muted-foreground hover:text-primary transition-colors">Створити листівку</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Шаблони</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Персоналізація</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Доставка</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="font-bold text-foreground text-lg">Підтримка</h3>
              <ul className="space-y-2">
                <li><a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Контакти</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Політика конфіденційності</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Умови користування</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-bold text-foreground text-lg">Зв'язок</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>info@listosyk.com</p>
                <p>+380 XX XXX XX XX</p>
                <div className="flex space-x-4 pt-2">
                  <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                  <a href="#" className="hover:text-primary transition-colors">Telegram</a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-border pt-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                © 2025 Листосик. Всі права захищені.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}