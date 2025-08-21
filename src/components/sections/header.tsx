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
    <header className="absolute top-0 left-0 right-0 z-50 px-4 py-3 md:py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
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
              className="text-foreground/80 hover:text-foreground transition-colors duration-300 hover:scale-105 transform"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Language Switcher & Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <ToggleGroup type="single" defaultValue="ua" className="bg-white/90 backdrop-blur-sm rounded-full p-1">
            <ToggleGroupItem value="ua" className="rounded-full px-3 py-1 text-sm font-medium text-primary data-[state=on]:bg-primary data-[state=on]:text-white">
              UA
            </ToggleGroupItem>
            <ToggleGroupItem value="en" className="rounded-full px-3 py-1 text-sm font-medium text-primary data-[state=on]:bg-primary data-[state=on]:text-white">
              EN
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                className="bg-background/20 backdrop-blur-sm border border-white/20 hover:bg-background/30"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-lg">
              <div className="flex flex-col space-y-6 mt-8">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left text-lg text-foreground/80 hover:text-foreground transition-colors duration-300 py-2"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export { Header };