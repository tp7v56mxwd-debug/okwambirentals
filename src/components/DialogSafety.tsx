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
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">
          {t('safety.title1')} <span className="text-primary">{t('safety.title2')}</span>
        </h2>
        <p className="text-lg text-muted-foreground">{t('safety.description')}</p>
      </div>

      <div className="space-y-6">
        {policies.map((policy, index) => {
          const Icon = policy.icon;
          return (
            <div key={index} className="group relative bg-gradient-to-br from-card to-card/50 border-2 border-border hover:border-primary/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
              
              <div className="relative">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-2xl text-foreground mb-3">{policy.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{policy.description}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-3 pl-2">
                  {(policy.items as string[]).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-foreground/90">
                      <span className="text-primary text-xl flex-shrink-0 mt-0.5">✓</span>
                      <span className="text-base leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-2xl p-8">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <PhoneCall className="w-7 h-7 text-accent" />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-2xl mb-3">{t('safety.cta.title')}</h3>
            <p className="text-base text-foreground/80 leading-relaxed mb-4">{t('safety.cta.description')}</p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+244923456789" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Ligar Agora
              </a>
              <a href="https://wa.me/244923456789" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogSafety;
