import { Shield, AlertTriangle, FileCheck, Clock, CreditCard, PhoneCall } from "lucide-react";
import { useTranslation } from 'react-i18next';

const DialogSafety = () => {
  const { t } = useTranslation();
  
  const policies = [
    {
      icon: Shield,
      title: t('safety.equipment.title'),
      description: t('safety.equipment.description'),
      items: t('safety.equipment.items', { returnObjects: true })
    },
    {
      icon: AlertTriangle,
      title: t('safety.rules.title'),
      description: t('safety.rules.description'),
      items: t('safety.rules.items', { returnObjects: true })
    },
    {
      icon: CreditCard,
      title: t('safety.deposit.title'),
      description: t('safety.deposit.description'),
      items: t('safety.deposit.items', { returnObjects: true })
    },
    {
      icon: Clock,
      title: t('safety.timing.title'),
      description: t('safety.timing.description'),
      items: t('safety.timing.items', { returnObjects: true })
    },
    {
      icon: FileCheck,
      title: t('safety.damage.title'),
      description: t('safety.damage.description'),
      items: t('safety.damage.items', { returnObjects: true })
    },
    {
      icon: PhoneCall,
      title: t('safety.emergency.title'),
      description: t('safety.emergency.description'),
      items: t('safety.emergency.items', { returnObjects: true })
    }
  ];

  return (
    <div className="space-y-6 p-2">
      <div>
        <h2 className="text-3xl font-bold mb-2">
          {t('safety.title1')} <span className="text-primary">{t('safety.title2')}</span>
        </h2>
        <p className="text-muted-foreground">{t('safety.description')}</p>
      </div>

      <div className="grid gap-4">
        {policies.map((policy, index) => {
          const Icon = policy.icon;
          return (
            <div key={index} className="border border-border rounded-lg p-4 bg-card hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-foreground">{policy.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3 ml-2">{policy.description}</p>
              <ul className="space-y-2 ml-2">
                {(policy.items as string[]).map((item, idx) => (
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

      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <h3 className="font-bold text-foreground mb-2">{t('safety.cta.title')}</h3>
        <p className="text-sm text-muted-foreground">{t('safety.cta.description')}</p>
      </div>
    </div>
  );
};

export default DialogSafety;
