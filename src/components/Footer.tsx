import { Facebook, Instagram, Mail, MapPin, Phone, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative bg-gradient-to-br from-primary via-primary to-primary-dark text-primary-foreground overflow-hidden" role="contentinfo" aria-label="Footer">
      {/* Enhanced Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <span className="font-display text-2xl font-bold tracking-tight">OKWAMBI</span>
              <p className="text-sm text-primary-foreground/60 mt-2 font-light">
                {t('footer.description')}
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://facebook.com/okwambirentals"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-primary-foreground/10 hover:bg-accent backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg group border border-primary-foreground/5"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 group-hover:text-accent-foreground transition-colors" />
              </a>
              <a
                href="https://instagram.com/okwambirentals"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-primary-foreground/10 hover:bg-accent backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg group border border-primary-foreground/5"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 group-hover:text-accent-foreground transition-colors" />
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display text-sm font-bold tracking-wider uppercase mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/terms"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm font-light"
                >
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm font-light"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-bold tracking-wider uppercase mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="text-primary-foreground/70 font-light">Mussulo Peninsula, Luanda</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Phone className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="text-primary-foreground/70 font-light">+244 923 456 789</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="text-primary-foreground/70 font-light">info@okwambi.ao</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-4 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60 font-light">
              &copy; {new Date().getFullYear()} Okwambi Rentals. {t('footer.rights')}
            </p>
            <p className="text-sm text-primary-foreground/60 font-light">
              {t('footer.madeIn')}
            </p>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-xs text-primary-foreground/70 hover:text-primary-foreground transition-all duration-300 group"
              aria-label="Back to top"
            >
              <span className="font-medium">{t('footer.backToTop', 'Back to top')}</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
