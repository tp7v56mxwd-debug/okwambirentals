import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-xl shadow-luxury border-b border-border/50' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full group-hover:bg-accent/30 transition-all" />
              <span className="relative font-display text-2xl lg:text-3xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                OKWAMBI
              </span>
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="px-5 py-2.5 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors tracking-wide"
            >
              HOME
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="px-5 py-2.5 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors tracking-wide"
            >
              ABOUT
            </button>
            <button 
              onClick={() => scrollToSection('fleet')} 
              className="px-5 py-2.5 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors tracking-wide"
            >
              FLEET
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="px-5 py-2.5 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors tracking-wide"
            >
              FAQ
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="px-5 py-2.5 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors tracking-wide"
            >
              CONTACT
            </button>
            <div className="ml-4">
              <Button 
                onClick={() => scrollToSection('fleet')}
                className="bg-primary hover:bg-primary-light text-primary-foreground font-semibold tracking-wide shadow-premium hover:shadow-luxury transition-all px-8 py-2.5 text-sm"
              >
                RESERVE NOW
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200 border-t border-border/50">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="block w-full text-left py-3 px-4 text-sm font-semibold text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-lg transition-all tracking-wide"
            >
              HOME
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="block w-full text-left py-3 px-4 text-sm font-semibold text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-lg transition-all tracking-wide"
            >
              ABOUT
            </button>
            <button 
              onClick={() => scrollToSection('fleet')} 
              className="block w-full text-left py-3 px-4 text-sm font-semibold text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-lg transition-all tracking-wide"
            >
              FLEET
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="block w-full text-left py-3 px-4 text-sm font-semibold text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-lg transition-all tracking-wide"
            >
              FAQ
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="block w-full text-left py-3 px-4 text-sm font-semibold text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-lg transition-all tracking-wide"
            >
              CONTACT
            </button>
            <Button 
              className="w-full mt-4 bg-primary hover:bg-primary-light text-primary-foreground font-semibold tracking-wide shadow-premium" 
              onClick={() => scrollToSection('fleet')}
            >
              RESERVE NOW
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
