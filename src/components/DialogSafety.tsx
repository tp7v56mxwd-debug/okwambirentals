import { Shield, AlertTriangle, FileCheck, Clock, CreditCard, PhoneCall } from "lucide-react";
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">
          {t('safety.title1')} <span className="text-primary">{t('safety.title2')}</span>
        </h2>
        <p className="text-muted-foreground">{t('safety.description')}</p>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {policies.map((policy, index) => {
          const Icon = policy.icon;
          return (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border rounded-lg bg-card hover:border-primary/50 transition-colors"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <div className="flex items-center gap-4 text-left w-full">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base text-foreground mb-1">
                      {policy.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {policy.description}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-5 pb-4">
                <div className="grid md:grid-cols-2 gap-3 mt-2">
                  {(policy.items as string[]).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-primary flex-shrink-0 mt-0.5">•</span>
                      <span className="text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <div className="bg-muted/50 border border-border rounded-lg p-5 mt-6">
        <div className="flex items-start gap-3">
          <PhoneCall className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">{t('safety.cta.title')}</h3>
            <p className="text-sm text-muted-foreground mb-3">{t('safety.cta.description')}</p>
            <div className="flex gap-2">
              <a href="tel:+244923456789" className="text-sm px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
                Ligar
              </a>
              <a href="https://wa.me/244923456789" target="_blank" rel="noopener noreferrer" className="text-sm px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors">
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
