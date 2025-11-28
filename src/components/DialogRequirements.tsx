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
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">
          {t('requirements.title1')} <span className="text-primary">{t('requirements.title2')}</span>
        </h2>
        <p className="text-lg text-muted-foreground">{t('requirements.description')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {requirements.map((req, index) => {
          const Icon = req.icon;
          return (
            <div key={index} className="group relative bg-gradient-to-br from-card to-card/50 border-2 border-border hover:border-primary/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
              
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <h3 className="font-bold text-2xl text-foreground mb-4">{req.title}</h3>
                
                <ul className="space-y-3">
                  {req.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-foreground/90">
                      <span className="text-primary text-xl flex-shrink-0 mt-0.5">✓</span>
                      <span className="text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground text-lg mb-2">Nota Importante</h4>
            <p className="text-foreground/80 leading-relaxed">
              Para menores de 18 anos, é necessário consentimento parental ou de tutor para alugar. Todos os documentos devem ser apresentados no momento da retirada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogRequirements;
