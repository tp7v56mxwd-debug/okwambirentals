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
    <section className="py-16 bg-background border-t border-border">
      <div ref={ref} className={`container mx-auto px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t('packages.title1')}
          </h2>
          <p className="text-muted-foreground">
            {t('packages.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <Card 
                key={pkg.id}
                className={`relative border ${pkg.popular ? 'border-foreground' : 'border-border'} hover:border-foreground/50 transition-colors flex flex-col`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-6">
                    <Badge className="bg-foreground text-background text-xs px-3 py-1">
                      {t('packages.mostPopular')}
                    </Badge>
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon className="w-5 h-5 text-foreground" />
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {pkg.name}
                    </h3>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-2xl font-bold text-foreground">{pkg.price}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{pkg.duration}</p>
                  </div>

                  <div className="space-y-2 mb-6 flex-1">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-foreground flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-foreground leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant={pkg.popular ? "default" : "outline"}
                    className="w-full"
                  >
                    {t('packages.bookPackage')}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-3">{t('packages.customNote')}</p>
          <Button variant="outline" size="sm">
            {t('packages.contactUs')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DailyPackages;
