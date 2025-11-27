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
    <section id="about" className="py-32 relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Elegant Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div ref={ref} className={`container mx-auto px-6 lg:px-8 relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full mb-6">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">{t('about.badge')}</span>
          </div>
          
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
            {t('about.title1')}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-accent">{t('about.title2')}</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            {t('about.description1')}
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t('about.description2')}
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative"
            >
              {/* Subtle Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl transform transition-all duration-500 group-hover:scale-105 opacity-0 group-hover:opacity-100" />
              
              {/* Card Content */}
              <div className="relative bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-premium">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground mb-6 shadow-premium group-hover:shadow-luxury transition-all group-hover:-translate-y-1">
                  <feature.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                
                {/* Title */}
                <h3 className="font-display text-2xl font-bold mb-3 text-foreground">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
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
