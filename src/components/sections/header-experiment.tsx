import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import logoListosik from "@/assets/logo-listosik.png";
import { useOrderDialog } from "@/components/order/OrderDialogContext";

interface MenuItem {
  name: string;
  href: string;
  isExternal?: boolean;
}

const mainMenuItems: MenuItem[] = [
  { name: "Як це працює", href: "/how-it-works" },
  { name: "Ціна", href: "/pricing" },
  { name: "Кейси", href: "/cases" },
  { name: "Хто такий Листосик", href: "/about-listosik" },
];

const productItems = [
  { name: "День святого Валентина", href: "/valentine" },
];

export function HeaderExperiment() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const { openOrderDialog } = useOrderDialog();

  const handleNavClick = (item: MenuItem) => {
    if (item.isExternal || item.href.startsWith('/')) {
      navigate(item.href);
    } else {
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-4 py-2 pt-safe-top">
      <div className="w-full max-w-6xl backdrop-blur-md bg-white/80 border border-gray-200/50 rounded-2xl px-6 shadow-sm my-[3px] py-2 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="hover:opacity-80 transition-opacity">
            <img src={logoListosik} alt="Листосик" className="h-8 md:h-10" />
          </a>

          {/* Desktop Navigation - centered on page like the title below */}
          <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center space-x-6">
            {/* Products Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                onBlur={() => setTimeout(() => setIsProductsOpen(false), 150)}
                className="flex items-center gap-1 text-gray-700 hover:text-[#6A5ACD] transition-colors font-medium"
              >
                Продукти
                <ChevronDown size={16} className={`transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProductsOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[160px]">
                  {productItems.map(item => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-[#6A5ACD]/5 hover:text-[#6A5ACD] transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="/how-it-works" className="text-gray-700 hover:text-[#6A5ACD] transition-colors font-medium">Як це працює</a>
            <a href="/pricing" className="text-gray-700 hover:text-[#6A5ACD] transition-colors font-medium">Ціна</a>
            <a href="/cases" className="text-gray-700 hover:text-[#6A5ACD] transition-colors font-medium">Кейси</a>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            {/* Get Access - first */}
            <Button
              onClick={() => openOrderDialog('header-experiment', 'Отримати доступ')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 border border-transparent hover:border-gray-300 rounded-full px-6 py-2 transition-all font-medium"
            >
              Отримати доступ
            </Button>

            {/* Login - second */}
            <Button
              variant="ghost"
              className="hidden md:flex text-gray-600 hover:text-[#6A5ACD] hover:bg-transparent font-medium"
            >
              Увійти
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white border-l border-gray-100">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="pb-4 border-b border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">Продукти</p>
                    {productItems.map(item => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block py-2 text-gray-700 hover:text-[#6A5ACD]"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  {mainMenuItems.map(item => (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item)}
                      className="text-left text-lg text-gray-700 hover:text-[#6A5ACD] py-2"
                    >
                      {item.name}
                    </button>
                  ))}
                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <Button variant="outline" className="w-full">Увійти</Button>
                    <Button
                      onClick={() => openOrderDialog('header-mobile', 'Отримати доступ')}
                      className="w-full bg-[#6A5ACD] hover:bg-[#5A4ABD] text-white"
                    >
                      Отримати доступ
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
