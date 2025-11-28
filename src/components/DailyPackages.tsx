import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Sparkles, TrendingUp, CheckCircle2 } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const DailyPackages = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useIntersectionObserver();

  const packages = [
    {
      id: 'basic',
      name: t('packages.basic.name'),
      icon: TrendingUp,
      price: "150.000 Kz",
      duration: "3.5 horas",
      features: [
        t('packages.basic.features.0'),
        t('packages.basic.features.1'),
        t('packages.basic.features.2')
      ],
      gradient: "from-primary/10 to-accent/10",
      borderGradient: "from-primary to-accent"
    },
    {
      id: 'premium',
      name: t('packages.premium.name'),
      icon: Crown,
      price: "250.000 Kz",
      duration: "6 horas",
      popular: true,
      features: [
        t('packages.premium.features.0'),
        t('packages.premium.features.1'),
        t('packages.premium.features.2'),
        t('packages.premium.features.3')
      ],
      gradient: "from-accent/20 to-accent-glow/20",
      borderGradient: "from-accent via-accent-glow to-accent"
    },
    {
      id: 'ultimate',
      name: t('packages.ultimate.name'),
      icon: Sparkles,
      price: "400.000 Kz",
      duration: "10 horas",
      features: [
        t('packages.ultimate.features.0'),
        t('packages.ultimate.features.1'),
        t('packages.ultimate.features.2'),
        t('packages.ultimate.features.3'),
        t('packages.ultimate.features.4')
      ],
      gradient: "from-primary/15 to-accent/15",
      borderGradient: "from-primary via-accent to-accent-glow"
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-background via-accent/5 to-background">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
      
      <div ref={ref} className={`container mx-auto px-6 lg:px-8 relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent/10 to-accent-glow/10 border border-accent/20 rounded-full mb-6">
            <Crown className="w-4 h-4 text-accent" />
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">{t('packages.badge')}</span>
          </div>
          
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-foreground">{t('packages.title1')}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-glow to-accent animate-shimmer">{t('packages.title2')}</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t('packages.description')}
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <Card 
                key={pkg.id}
                className={`group relative overflow-hidden bg-gradient-to-br ${pkg.gradient} backdrop-blur-sm border-2 ${pkg.popular ? 'border-accent/50 scale-105 shadow-[0_20px_70px_rgba(var(--accent),0.3)]' : 'border-border/40 hover:border-accent/30'} transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(0,0,0,0.2)] flex flex-col rounded-2xl`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <Badge className="bg-gradient-to-r from-accent to-accent-glow text-accent-foreground font-bold px-6 py-2 text-xs shadow-lg border-2 border-background">
                      {t('packages.mostPopular')}
                    </Badge>
                  </div>
                )}

                {/* Animated Border */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${pkg.borderGradient} opacity-0 group-hover:opacity-20 blur transition-opacity duration-500`} />
                
                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 flex-1 flex flex-col">
                  {/* Icon & Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${pkg.borderGradient} bg-opacity-10`}>
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      {pkg.name}
                    </h3>
                  </div>

                  {/* Pricing */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl font-black text-foreground">{pkg.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">{pkg.duration}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full font-bold py-6 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 ${
                      pkg.popular 
                        ? 'bg-gradient-to-r from-accent via-accent-glow to-accent hover:from-accent-glow hover:via-accent hover:to-accent-glow text-accent-foreground shadow-[0_10px_40px_rgba(var(--accent),0.4)] hover:shadow-[0_15px_50px_rgba(var(--accent),0.6)]' 
                        : 'bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-primary-foreground shadow-md hover:shadow-xl'
                    }`}
                  >
                    {t('packages.bookPackage')}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">{t('packages.customNote')}</p>
          <Button variant="outline" size="lg" className="border-2 border-accent/30 hover:border-accent hover:bg-accent/10 font-semibold">
            {t('packages.contactUs')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DailyPackages;
