import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from './ui/button';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pt' ? 'en' : 'pt';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2 text-foreground hover:text-primary transition-colors"
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4" />
      <span className="font-semibold">{i18n.language.toUpperCase()}</span>
    </Button>
  );
};

export default LanguageSwitcher;
