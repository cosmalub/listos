import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown, Heart } from "lucide-react";
import logoListosik from "@/assets/logo-listosik.png";
import { useOrderDialog } from "@/components/order/OrderDialogContext";

interface MenuItem {
  name: string;
  href: string;
  isExternal?: boolean;
}

interface HeaderExperimentProps {
  hideNav?: boolean;
  showMenu?: boolean;
  ctaLabel?: string;
  ctaPath?: string;
  onCtaClick?: () => void;
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

export function HeaderExperiment({ hideNav = false, showMenu = true, ctaLabel, onCtaClick }: HeaderExperimentProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const { openOrderDialog } = useOrderDialog();

  const isActive = (href: string) => location.pathname === href;
  const isProductActive = productItems.some(item => location.pathname === item.href);

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      openOrderDialog('header-experiment', ctaLabel || 'Отримати доступ');
    }
  };

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
          {!hideNav && (
            <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center space-x-6">
              {/* Products Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  onBlur={() => setTimeout(() => setIsProductsOpen(false), 150)}
                  className={`flex items-center gap-1 font-medium transition-all duration-200 ${isProductsOpen || isProductActive ? 'text-[#6A5ACD]' : 'text-gray-700 hover:text-gray-900'}`}
                >
                  Продукти
                  <ChevronDown size={16} className={`transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProductsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-lg ring-1 ring-black/5 p-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    {productItems.map(item => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 whitespace-nowrap group/item"
                      >
                        <Heart size={16} className="shrink-0 text-rose-400 group-hover/item:scale-110 group-hover/item:text-rose-500 transition-all duration-200" />
                        <span className="min-w-0 flex-1">{item.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a href="/how-it-works" className={`font-medium transition-all duration-200 ${isActive('/how-it-works') ? 'text-[#6A5ACD]' : 'text-gray-700 hover:text-gray-900'}`}>Як це працює</a>
              <a href="/pricing" className={`font-medium transition-all duration-200 ${isActive('/pricing') ? 'text-[#6A5ACD]' : 'text-gray-700 hover:text-gray-900'}`}>Ціна</a>
              <a href="/cases" className={`font-medium transition-all duration-200 ${isActive('/cases') ? 'text-[#6A5ACD]' : 'text-gray-700 hover:text-gray-900'}`}>Кейси</a>
            </nav>
          )}

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            {/* Get Access - first */}
            <Button
              onClick={handleCtaClick}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 border border-transparent hover:border-gray-300 rounded-full px-6 py-2 transition-all font-medium"
            >
              {ctaLabel || 'Отримати доступ'}
            </Button>

            {!hideNav && (
              <Button
                variant="ghost"
                className="hidden md:flex text-gray-600 hover:text-gray-900 hover:bg-transparent font-medium"
              >
                Увійти
              </Button>
            )}

            {showMenu && (
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
                          className="block py-2 text-gray-700 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                    {mainMenuItems.map(item => (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item)}
                        className="text-left text-lg text-gray-700 hover:text-gray-900 py-2"
                      >
                        {item.name}
                      </button>
                    ))}
                    <div className="pt-4 border-t border-gray-100 space-y-3">
                      <Button variant="outline" className="w-full">Увійти</Button>
                      <Button
                        onClick={handleCtaClick}
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                      >
                        {ctaLabel || 'Отримати доступ'}
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
