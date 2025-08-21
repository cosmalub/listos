import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Menu } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Головна", href: "#hero" },
    { name: "Переваги", href: "#benefits" },
    { name: "Приклади", href: "#examples" },
    { name: "Ціни", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <header className="sticky md:absolute top-0 left-0 right-0 z-50 px-4 py-2 md:py-2 pt-safe-top">
      <div className="max-w-7xl mx-auto px-6 py-3 md:py-3 md:bg-transparent bg-white/10 backdrop-blur-md border-b md:border-b-0 border-white/10 rounded-b-2xl md:rounded-none mb-2 md:mb-0">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Listosyk
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground/80 hover:text-foreground transition-all duration-300 hover:scale-105 transform relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-transparent rounded-md px-2 py-1"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <ToggleGroup type="single" defaultValue="ua" className="md:bg-black/30 md:dark:bg-black/30 md:supports-[backdrop-filter]:bg-black/20 bg-white/20 backdrop-blur-md border border-white/10 rounded-lg p-0.5">
              <ToggleGroupItem value="ua" className="rounded-md px-2.5 py-1 text-xs font-medium md:text-white/80 text-foreground/80 data-[state=on]:bg-primary data-[state=on]:text-white transition-all duration-200 md:hover:bg-white/10 hover:bg-foreground/10">
                UA
              </ToggleGroupItem>
              <ToggleGroupItem value="en" className="rounded-md px-2.5 py-1 text-xs font-medium md:text-white/80 text-foreground/80 data-[state=on]:bg-primary data-[state=on]:text-white transition-all duration-200 md:hover:bg-white/10 hover:bg-foreground/10">
                EN
              </ToggleGroupItem>
            </ToggleGroup>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="md:bg-black/30 md:dark:bg-black/30 md:supports-[backdrop-filter]:bg-black/20 bg-white/20 backdrop-blur-md border border-white/10 md:hover:bg-black/40 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                >
                  <Menu className="h-5 w-5 md:text-white text-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-black/35 dark:bg-black/30 supports-[backdrop-filter]:bg-black/25 backdrop-blur-md border-l border-white/10">
                <div className="flex flex-col space-y-6 mt-8">
                  {menuItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="text-left text-lg text-white/90 hover:text-white transition-colors duration-300 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };