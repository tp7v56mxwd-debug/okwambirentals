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
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">
          {t('safety.title1')} <span className="text-primary">{t('safety.title2')}</span>
        </h2>
        <p className="text-lg text-muted-foreground">{t('safety.description')}</p>
      </div>

      <Accordion type="single" collapsible className="space-y-6">
        {policies.map((policy, index) => {
          const Icon = policy.icon;
          return (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-2 border-border rounded-2xl bg-gradient-to-br from-card to-card/50 hover:border-primary/50 transition-all duration-300 data-[state=open]:border-primary/50 data-[state=open]:shadow-xl overflow-hidden"
            >
              <AccordionTrigger className="px-8 py-6 hover:no-underline group">
                <div className="flex items-center gap-6 text-left w-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-2xl text-foreground mb-2 group-hover:text-primary transition-colors">
                      {policy.title}
                    </h3>
                    <p className="text-base text-muted-foreground pr-4">
                      {policy.description}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-8 pb-8 pt-2">
                <div className="grid md:grid-cols-2 gap-4 pl-2">
                  {(policy.items as string[]).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
                      <span className="text-primary text-xl flex-shrink-0 mt-0.5">✓</span>
                      <span className="text-base leading-relaxed text-foreground/90">{item}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <div className="bg-gradient-to-r from-accent/10 to-primary/10 border-2 border-accent/20 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <PhoneCall className="w-7 h-7 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-foreground text-2xl mb-3">{t('safety.cta.title')}</h3>
            <p className="text-base text-foreground/80 leading-relaxed mb-6">{t('safety.cta.description')}</p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+244923456789" className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg">
                Ligar Agora
              </a>
              <a href="https://wa.me/244923456789" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all hover:scale-105 shadow-lg">
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
