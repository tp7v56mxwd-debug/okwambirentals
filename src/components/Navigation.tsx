import { Waves } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

import { MobileInfoDialogs } from "./InfoDialogs";

const Navigation = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = ['hero', 'fleet', 'quick-booking'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
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

  const handleLogoClick = () => {
    // Toggle menu on all devices
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { id: 'hero', label: t('nav.home') },
    { id: 'fleet', label: t('nav.fleet') },
    { id: 'quick-booking', label: t('nav.booking') },
  ];

  return (
    <nav 
      role="navigation" 
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled || isOpen
          ? 'bg-background/98 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border-b border-border/30' 
          : 'bg-gradient-to-b from-background/90 via-background/50 to-transparent backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8 relative">
        <div className="flex items-center h-20">
          {/* Logo - Toggles menu on mobile, goes home on desktop */}
          <button 
            onClick={handleLogoClick}
            className="flex items-center gap-2 group relative"
            aria-label="Toggle menu"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all duration-300" />
              <Waves className="relative w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="relative">
              <span className="relative font-display text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent group-hover:from-accent group-hover:via-primary group-hover:to-accent transition-all duration-500 bg-[length:200%_auto] group-hover:bg-right">
                OKWAMBI
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
            </div>
          </button>


        </div>

        {/* Menu - Works on all devices */}
        {isOpen && (
          <div className="py-4 space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="max-h-[70vh] overflow-y-auto px-2">
              {navLinks.map((link, index) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-left py-3.5 px-5 text-sm font-semibold rounded-xl transition-all tracking-wide relative overflow-hidden group mb-2 ${
                    activeSection === link.id
                      ? 'text-primary bg-gradient-to-r from-primary/15 to-primary/5 shadow-sm'
                      : 'text-foreground/70 hover:text-foreground hover:bg-gradient-to-r hover:from-muted/80 hover:to-muted/40'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="relative z-10 flex items-center justify-between">
                    <span>{link.label}</span>
                    {activeSection === link.id && (
                      <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.6)] animate-pulse" />
                    )}
                  </span>
                </button>
              ))}
              
              <div className="mt-4 pt-4 border-t border-border/20">
                <MobileInfoDialogs onClose={() => setIsOpen(false)} />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
