import { Award, Shield, Users, Zap } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const About = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useIntersectionObserver();
  
  const features = [
    {
      icon: Award,
      title: t('about.features.premium.title'),
      description: t('about.features.premium.description')
    },
    {
      icon: Shield,
      title: t('about.features.safety.title'),
      description: t('about.features.safety.description')
    },
    {
      icon: Zap,
      title: t('about.features.booking.title'),
      description: t('about.features.booking.description')
    },
    {
      icon: Users,
      title: t('about.features.team.title'),
      description: t('about.features.team.description')
    }
  ];

  return (
    <section id="about" className="section-padding bg-muted/30">
      <div ref={ref} className={`container mx-auto px-6 lg:px-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-3xl mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
            {t('about.title1')}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            {t('about.description1')}
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            {t('about.description2')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group h-full"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="border border-border bg-background p-8 hover:border-foreground/20 transition-colors h-full flex flex-col">
                <feature.icon className="w-8 h-8 text-foreground mb-6" strokeWidth={1.5} />
                <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
