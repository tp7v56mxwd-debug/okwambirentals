import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
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

  return (
    <footer className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <span className="font-display text-2xl font-bold tracking-tight">OKWAMBI</span>
              <p className="text-sm text-primary-foreground/60 mt-2 font-light">
                {t('footer.description')}
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent flex items-center justify-center transition-all hover:scale-110 group"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 group-hover:text-accent-foreground transition-colors" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent flex items-center justify-center transition-all hover:scale-110 group"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 group-hover:text-accent-foreground transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-sm font-bold tracking-wider uppercase mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm font-light"
                >
                  {t('footer.links.about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('fleet')}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm font-light"
                >
                  {t('footer.links.fleet')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm font-light"
                >
                  {t('footer.links.faq')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm font-light"
                >
                  {t('footer.links.contact')}
                </button>
              </li>
            </ul>
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
        <div className="pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60 font-light">
              &copy; {new Date().getFullYear()} Okwambi Rentals. {t('footer.rights')}
            </p>
            <p className="text-sm text-primary-foreground/60 font-light">
              {t('footer.madeIn')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
