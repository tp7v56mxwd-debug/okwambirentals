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
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">
          {t('requirements.title1')} {t('requirements.title2')}
        </h2>
        <p className="text-muted-foreground">{t('requirements.description')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {requirements.map((req, index) => {
          const Icon = req.icon;
          return (
            <div key={index} className="border border-border rounded-lg p-5 bg-card hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-foreground">{req.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{req.description}</p>
                </div>
              </div>
              
              <ul className="space-y-2">
                {req.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="text-primary flex-shrink-0 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="bg-muted/50 border border-border rounded-lg p-5 mt-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-foreground/80">
              <span className="font-semibold text-foreground">Nota:</span> Para menores de 18 anos, é necessário consentimento parental. Documentos devem ser apresentados no momento da retirada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogRequirements;
