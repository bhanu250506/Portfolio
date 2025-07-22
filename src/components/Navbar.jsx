import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Expierence", href: "#experience" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-40 transition-all duration-300",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6 md:px-12">
        {/* Logo / Brand */}
      <a
  href="#hero"
  className="flex items-center gap-4 select-none"
>
  <h1
    className="
      text-2xl md:text-3xl font-semibold tracking-wide
      bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500
      bg-clip-text text-transparent
    "
  >
    Bhanu Pratap Singh
  </h1>
  <span className="text-gray-400 text-lg md:text-xl font-medium tracking-wide whitespace-nowrap">
    Portfolio
  </span>
</a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-10">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="
                relative
                text-foreground/90
                font-medium
                transition
                duration-300
                px-1
                cursor-pointer
                after:absolute
                after:left-0
                after:-bottom-1
                after:w-0
                after:h-[2px]
                after:bg-primary
                after:transition-all
                after:duration-300
                hover:after:w-full
                active:scale-95
                active:text-primary
              "
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center md:hidden transition-all duration-300",
            isMenuOpen
              ? "opacity-100 pointer-events-auto scale-100"
              : "opacity-0 pointer-events-none scale-95"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl font-semibold">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="
                  text-foreground/90
                  transition
                  duration-300
                  px-2
                  cursor-pointer
                  hover:text-primary
                  active:scale-95
                "
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};