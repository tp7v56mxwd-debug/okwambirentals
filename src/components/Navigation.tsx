import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./LanguageSwitcher";

const Navigation = () => {
  const { t } = useTranslation();
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
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      isScrolled || isOpen
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
              {t('nav.home')}
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="px-5 py-2.5 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors tracking-wide"
            >
              {t('nav.about')}
            </button>
            <button 
              onClick={() => scrollToSection('fleet')} 
              className="px-5 py-2.5 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors tracking-wide"
            >
              {t('nav.fleet')}
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="px-5 py-2.5 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors tracking-wide"
            >
              {t('nav.faq')}
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="px-5 py-2.5 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors tracking-wide"
            >
              {t('nav.contact')}
            </button>
            <LanguageSwitcher />
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
          <div className="lg:hidden py-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200 border-t border-border/50 bg-background/95 backdrop-blur-xl">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="block w-full text-left py-3 px-4 text-sm font-semibold text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-lg transition-all tracking-wide"
            >
              {t('nav.home')}
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="block w-full text-left py-3 px-4 text-sm font-semibold text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-lg transition-all tracking-wide"
            >
              {t('nav.about')}
            </button>
            <button 
              onClick={() => scrollToSection('fleet')} 
              className="block w-full text-left py-3 px-4 text-sm font-semibold text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-lg transition-all tracking-wide"
            >
              {t('nav.fleet')}
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="block w-full text-left py-3 px-4 text-sm font-semibold text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-lg transition-all tracking-wide"
            >
              {t('nav.faq')}
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="block w-full text-left py-3 px-4 text-sm font-semibold text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-lg transition-all tracking-wide"
            >
              {t('nav.contact')}
            </button>
            <div className="px-4 pt-2">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
