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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('requirements.title')}</h2>
        <p className="text-muted-foreground">{t('requirements.description')}</p>
      </div>

      <div className="grid gap-4">
        {requirements.map((req, index) => {
          const Icon = req.icon;
          return (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{req.title}</h3>
              </div>
              <ul className="space-y-2">
                {req.items.map((item, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DialogRequirements;
