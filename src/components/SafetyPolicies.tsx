import { Shield, AlertTriangle, FileCheck, Clock, CreditCard, PhoneCall } from "lucide-react";
import { useTranslation } from 'react-i18next';

const SafetyPolicies = () => {
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
    <section id="policies" className="py-32 relative overflow-hidden bg-gradient-to-b from-muted/20 to-background">
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full mb-6">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">{t('safety.badge')}</span>
          </div>
          
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
            {t('safety.title1')}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-accent-glow">{t('safety.title2')}</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t('safety.description')}
          </p>
        </div>

        {/* Policies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {policies.map((policy, index) => (
            <div 
              key={index}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-premium h-full">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground mb-6 shadow-subtle group-hover:shadow-premium transition-all group-hover:-translate-y-1">
                  <policy.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                
                {/* Title */}
                <h3 className="font-display text-xl font-bold mb-3 text-foreground">
                  {policy.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {policy.description}
                </p>
                
                {/* Items */}
                <ul className="space-y-3">
                  {(policy.items as string[]).map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1 h-1 rounded-full bg-accent flex-shrink-0 mt-2" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20 max-w-2xl mx-auto">
            <h3 className="font-display text-2xl font-bold mb-3 text-foreground">
              {t('safety.cta.title')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('safety.cta.description')}
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold hover:shadow-luxury transition-all duration-300 hover:-translate-y-1"
            >
              <PhoneCall className="w-5 h-5" />
              {t('safety.cta.button')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetyPolicies;
