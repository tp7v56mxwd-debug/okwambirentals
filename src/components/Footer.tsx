import { Facebook, Instagram, Mail, MapPin, Phone, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./LanguageSwitcher";

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
    <footer className="relative bg-gradient-to-br from-primary via-primary to-primary-light text-primary-foreground overflow-hidden" role="contentinfo" aria-label="Footer">
      {/* Decorative blur elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-12 py-16 relative">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-4 tracking-wide">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4 tracking-wide">{t('footer.contact')}</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="text-primary-foreground/70">Mussulo Peninsula, Luanda</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Phone className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <a 
                  href="tel:+244951000925" 
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors hover:underline"
                >
                  +244 951 000 925
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Mail className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <a 
                  href="mailto:info@okwambi.ao" 
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors hover:underline"
                >
                  info@okwambi.ao
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Language */}
          <div>
            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/okwambirentals"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 backdrop-blur-sm bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all border border-primary-foreground/10"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/okwambirentals/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 backdrop-blur-sm bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all border border-primary-foreground/10"
                aria-label="Visit our Instagram page"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
            <div className="mt-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Back to top button - centered with spacing */}
        <div className="flex justify-center mt-12 mb-8">
          <button
            onClick={scrollToTop}
            className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors inline-flex items-center gap-2 group"
            aria-label="Back to top"
          >
            {t('footer.backToTop', 'Back to top')}
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        <div className="pt-8 border-t border-primary-foreground/20">
          <p className="text-xs text-primary-foreground/60 text-center">
            &copy; {new Date().getFullYear()} Okwambi Rentals. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
