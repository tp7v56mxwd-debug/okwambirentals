import { Shield, FileCheck, CreditCard, Clock } from "lucide-react";
import { useTranslation } from 'react-i18next';

const DialogRequirements = () => {
  const { t } = useTranslation();
  
  const requirements = [
    {
      icon: FileCheck,
      title: t('requirements.validId.title'),
      description: "Identificação válida é essencial",
      items: [
        t('requirements.validId.items.0'),
        t('requirements.validId.items.1')
      ]
    },
    {
      icon: CreditCard,
      title: t('requirements.deposit.title'),
      description: "Depósito seguro e reembolsável",
      items: [
        t('requirements.deposit.items.0'),
        t('requirements.deposit.items.1')
      ]
    },
    {
      icon: Clock,
      title: t('requirements.booking.title'),
      description: "Flexibilidade nas suas reservas",
      items: [
        t('requirements.booking.items.0'),
        t('requirements.booking.items.1')
      ]
    },
    {
      icon: Shield,
      title: t('requirements.safety.title'),
      description: "Sua segurança é prioridade",
      items: [
        t('requirements.safety.items.0'),
        t('requirements.safety.items.1')
      ]
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">
          {t('requirements.title1')} <span className="text-primary">{t('requirements.title2')}</span>
        </h2>
        <p className="text-lg text-muted-foreground">{t('requirements.description')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {requirements.map((req, index) => {
          const Icon = req.icon;
          return (
            <div key={index} className="group relative bg-gradient-to-br from-card to-card/50 border-2 border-border hover:border-primary/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
              
              <div className="relative space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl text-foreground">{req.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{req.description}</p>
                  </div>
                </div>
                
                <div className="space-y-4 pt-2">
                  {req.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-background/50 hover:bg-background/80 transition-colors">
                      <span className="text-primary text-2xl flex-shrink-0">✓</span>
                      <span className="text-base leading-relaxed text-foreground/90 pt-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-foreground text-xl mb-3">Nota Importante</h4>
            <p className="text-base text-foreground/80 leading-relaxed">
              Para menores de 18 anos, é necessário consentimento parental ou de tutor para alugar. Todos os documentos devem ser apresentados no momento da retirada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogRequirements;
