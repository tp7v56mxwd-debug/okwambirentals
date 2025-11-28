import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, Shield, Calendar, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LanguageSwitcher from "./LanguageSwitcher";
import { InfoDialogs, MobileInfoDialogs } from "./InfoDialogs";
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Navigation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = ['hero', 'fleet', 'testimonials', 'contact'];
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

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Logged out successfully');
      navigate('/');
      setIsOpen(false);
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };

  const navLinks = [
    { id: 'hero', label: t('nav.home') },
    { id: 'fleet', label: t('nav.fleet') },
    { id: 'testimonials', label: t('nav.testimonials') },
    { id: 'contact', label: t('nav.contact') },
  ];

  return (
    <nav 
      role="navigation" 
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled || isOpen
          ? 'bg-background/95 backdrop-blur-md border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('hero')} 
            className="group"
            aria-label="Go to homepage"
          >
            <span className="font-display text-xl font-normal tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent">
              OKWAMBI
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1" role="menubar" aria-label="Desktop navigation menu">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                role="menuitem"
                aria-label={`Navigate to ${link.label}`}
                aria-current={activeSection === link.id ? 'page' : undefined}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.id
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </button>
            ))}
            <InfoDialogs />
            <div className="ml-6 pl-6 border-l border-border flex items-center gap-3">
              <LanguageSwitcher />
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Account
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {isAdmin ? (
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        <Shield className="h-4 w-4 mr-2" />
                        Admin Dashboard
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => navigate('/my-bookings')}>
                        <Calendar className="h-4 w-4 mr-2" />
                        My Bookings
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => navigate('/2fa')}>
                      <Shield className="h-4 w-4 mr-2" />
                      Security (2FA)
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/auth')}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-foreground p-2 transition-colors duration-200 hover:text-accent"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
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
              
              <div className="mt-2 px-2 space-y-2">
                {user ? (
                  <>
                    {isAdmin ? (
                      <Button
                        variant="default"
                        className="w-full"
                        onClick={() => {
                          navigate('/admin');
                          setIsOpen(false);
                        }}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Admin Dashboard
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        className="w-full"
                        onClick={() => {
                          navigate('/my-bookings');
                          setIsOpen(false);
                        }}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        My Bookings
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => {
                        navigate('/2fa');
                        setIsOpen(false);
                      }}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Security (2FA)
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full text-destructive hover:text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      navigate('/auth');
                      setIsOpen(false);
                    }}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                )}
              </div>
            </div>
            
            <div className="px-6 pt-4 mt-2 border-t border-border/20">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
