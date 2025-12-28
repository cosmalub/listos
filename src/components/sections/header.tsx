import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Menu } from "lucide-react";
import logoListosik from "@/assets/logo-listosik.png";

interface HeaderProps {
  centerTitle?: string;
  hideNav?: boolean;
  showMenu?: boolean;
}

const Header = ({ centerTitle, hideNav = false, showMenu = true }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    {
      name: "Як це працює",
      href: "#mascot"
    },
    {
      name: "Приклади",
      href: "#examples"
    },
    {
      name: "Відгуки",
      href: "#reviews"
    },
    {
      name: "Ціни",
      href: "#pricing"
    },
    {
      name: "Гарантія",
      href: "#guarantee"
    },
    {
      name: "FAQ",
      href: "#faq"
    }
  ];

  const handleNavClick = (item: any) => {
    if (item.isExternal) {
      window.location.href = item.href;
    } else {
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
    setIsOpen(false);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-4 py-0.5 md:py-1 pt-safe-top">
      <div className="w-full max-w-[90rem] 2xl:max-w-screen-2xl backdrop-blur-md bg-background/30 border border-white/10 rounded-2xl px-6 shadow-lg shadow-black/5 my-[3px] py-0 mx-auto">
        <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-3 items-center md:justify-items-center">
          {/* Logo */}
          <a href="/" className="justify-self-start hover:opacity-80 transition-opacity">
            <img src={logoListosik} alt="Листосик" className="h-8 md:h-10" />
          </a>

          {/* Desktop Navigation or Center Title */}
          {centerTitle ? (
            <div className="hidden md:block text-xl font-semibold text-foreground justify-self-center">
              {centerTitle}
            </div>
          ) : !hideNav ? (
            <nav className="hidden md:flex items-center space-x-8 justify-self-center">
              {menuItems.map(item => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="text-foreground/80 hover:text-foreground transition-all duration-300 hover:scale-105 transform relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-transparent rounded-md px-2 py-1"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          ) : (
            <div />
          )}

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-3 justify-self-end">
            {/* Language Switcher */}
            <ToggleGroup type="single" defaultValue="ua" className="bg-background/60 backdrop-blur-sm border border-white/10 rounded-lg p-0.5">
              <ToggleGroupItem value="ua" className="rounded-md px-2.5 py-1 text-xs font-medium text-foreground/80 data-[state=on]:bg-primary data-[state=on]:text-white transition-all duration-200 hover:bg-primary/10">
                UA
              </ToggleGroupItem>
              <ToggleGroupItem value="ru" className="rounded-md px-2.5 py-1 text-xs font-medium text-foreground/80 data-[state=on]:bg-primary data-[state=on]:text-white transition-all duration-200 hover:bg-primary/10">
                RU
              </ToggleGroupItem>
            </ToggleGroup>

            {/* Mobile Menu */}
            {showMenu && (
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" className="bg-background/60 backdrop-blur-sm border border-white/10 hover:bg-background/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-lg border-l border-white/10">
                  <div className="flex flex-col space-y-6 mt-8">
                    {menuItems.map(item => (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item)}
                        className="text-left text-lg text-foreground/80 hover:text-foreground transition-colors duration-300 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };