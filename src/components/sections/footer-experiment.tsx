import logoListosik from "@/assets/logo-listosik.png";

export function FooterExperiment() {
  return (
    <footer className="py-12 bg-[#FDFBF7] border-t border-gray-100/50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Logo */}
            <a href="/" className="hover:opacity-80 transition-opacity grayscale hover:grayscale-0">
              <img src={logoListosik} alt="Листосик" className="h-7 opacity-80" />
            </a>

            {/* Links */}
            <nav className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-gray-500">
              {["Як це працює", "Ціна", "Кейси", "FAQ"].map((item) => (
                <a 
                  key={item}
                  href={`#${item === "Як це працює" ? "how-it-works" : item === "Ціна" ? "pricing" : item === "Кейси" ? "cases" : "faq"}`}
                  className="hover:text-[#6A5ACD] transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6A5ACD] transition-all group-hover:w-full opacity-50" />
                </a>
              ))}
            </nav>

            {/* Copyright */}
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Листосик
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
