import { Shield, FileCheck, CreditCard, Clock } from "lucide-react";
import { useTranslation } from 'react-i18next';

const DialogRequirements = () => {
  const { t } = useTranslation();
  
  const requirements = [
    {
      icon: FileCheck,
      title: t('requirements.validId.title'),
      items: [
        t('requirements.validId.items.0'),
        t('requirements.validId.items.1')
      ]
    },
    {
      icon: CreditCard,
      title: t('requirements.deposit.title'),
      items: [
        t('requirements.deposit.items.0'),
        t('requirements.deposit.items.1')
      ]
    },
    {
      icon: Clock,
      title: t('requirements.booking.title'),
      items: [
        t('requirements.booking.items.0'),
        t('requirements.booking.items.1')
      ]
    },
    {
      icon: Shield,
      title: t('requirements.safety.title'),
      items: [
        t('requirements.safety.items.0'),
        t('requirements.safety.items.1')
      ]
    }
  ];

  return (
    <div className="space-y-6 p-2">
      <div>
        <h2 className="text-3xl font-bold mb-2">
          {t('requirements.title1')} <span className="text-primary">{t('requirements.title2')}</span>
        </h2>
        <p className="text-muted-foreground">{t('requirements.description')}</p>
      </div>

      <div className="grid gap-4">
        {requirements.map((req, index) => {
          const Icon = req.icon;
          return (
            <div key={index} className="border border-border rounded-lg p-4 bg-card hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-foreground">{req.title}</h3>
              </div>
              <ul className="space-y-2 ml-2">
                {req.items.map((item, idx) => (
                  <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                    <span className="text-primary mt-1 flex-shrink-0 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Nota:</span> Para menores de 18 anos, é necessário consentimento parental ou de tutor para alugar.
        </p>
      </div>
    </div>
  );
};

export default DialogRequirements;
