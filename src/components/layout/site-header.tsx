import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { name: "Як це працює", href: "#how-it-works" },
  { name: "Приклади", href: "#examples" },
  { name: "Ціна", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle active section tracking
  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const visibleSections = entries.filter(entry => entry.isIntersecting);
      if (visibleSections.length > 0) {
        const mostVisible = visibleSections.reduce((prev, current) =>
          prev.intersectionRatio > current.intersectionRatio ? prev : current
        );
        setActiveSection(mostVisible.target.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0.1, 0.5],
      rootMargin: "-100px 0px -80% 0px",
    });

    const sections = ["home", "how-it-works", "examples", "pricing", "faq"];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    if (location.pathname === "/") {
      // On homepage - smooth scroll to section
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Not on homepage - navigate to homepage with hash
      navigate(`/${href}`);
    }
  };

  const isActive = (href: string) => {
    const sectionId = href.replace("#", "");
    return activeSection === sectionId;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-[#6A5ACD]/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <img
              src="/src/assets/listosyk-mascot.png"
              alt="Листосик"
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-[#6A5ACD]">Листосик</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`story-link text-sm font-medium transition-colors hover:text-[#6A5ACD] ${
                  isActive(item.href)
                    ? "text-[#6A5ACD] font-semibold"
                    : isScrolled
                    ? "text-[#6A5ACD]/80"
                    : "text-[#6A5ACD]"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-gradient-to-r from-[#6A5ACD] to-[#8A7CDD] hover:from-[#5A4BBD] hover:to-[#7A6CCD] text-white font-medium px-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Link to="/order">🎵 Створити листівку</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6 text-[#6A5ACD]" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-white/95 backdrop-blur-md">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="flex items-center space-x-2 pb-4 border-b border-[#6A5ACD]/20">
                  <img
                    src="/src/assets/listosyk-mascot.png"
                    alt="Листосик"
                    className="h-8 w-8"
                  />
                  <span className="text-xl font-bold text-[#6A5ACD]">Листосик</span>
                </div>
                
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={`text-left text-lg font-medium transition-colors hover:text-[#6A5ACD] ${
                        isActive(item.href)
                          ? "text-[#6A5ACD] font-semibold"
                          : "text-[#6A5ACD]/80"
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </nav>

                <Button
                  asChild
                  className="bg-gradient-to-r from-[#6A5ACD] to-[#8A7CDD] hover:from-[#5A4BBD] hover:to-[#7A6CCD] text-white font-medium px-6 py-3 rounded-full shadow-lg mt-6"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to="/order">🎵 Створити листівку</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}