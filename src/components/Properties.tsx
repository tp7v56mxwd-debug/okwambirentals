import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookingDialog } from "./BookingDialog";
import { Users, Gauge, Shield, ChevronDown } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const Properties = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useIntersectionObserver();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  
  const fleet = [
    {
      category: t('fleet.vehicles.jetski.category'),
      name: t('fleet.vehicles.jetski.name'),
      capacity: t('fleet.vehicles.jetski.capacity'),
      speed: t('fleet.vehicles.jetski.speed'),
      features: [
        t('fleet.vehicles.jetski.features.0'),
        t('fleet.vehicles.jetski.features.1'),
        t('fleet.vehicles.jetski.features.2')
      ],
      price: "30.000 Kz",
      basePricePerHalfHour: 30000
    },
    {
      category: t('fleet.vehicles.atv.category'),
      name: t('fleet.vehicles.atv.name'),
      capacity: t('fleet.vehicles.atv.capacity'),
      speed: t('fleet.vehicles.atv.speed'),
      features: [
        t('fleet.vehicles.atv.features.0'),
        t('fleet.vehicles.atv.features.1'),
        t('fleet.vehicles.atv.features.2')
      ],
      price: "35.000 Kz",
      basePricePerHalfHour: 35000
    },
    {
      category: t('fleet.vehicles.utv.category'),
      name: t('fleet.vehicles.utv.name'),
      capacity: t('fleet.vehicles.utv.capacity'),
      speed: t('fleet.vehicles.utv.speed'),
      features: [
        t('fleet.vehicles.utv.features.0'),
        t('fleet.vehicles.utv.features.1'),
        t('fleet.vehicles.utv.features.2')
      ],
      price: "45.000 Kz",
      basePricePerHalfHour: 45000
    }
  ];

  return (
    <>
      <section id="fleet" className="py-32 relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
        {/* Elegant Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }} />
        
        <div ref={ref} className={`container mx-auto px-6 lg:px-8 relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/5 border border-accent/10 rounded-full mb-6">
              <span className="text-accent text-sm font-semibold tracking-widest uppercase">{t('fleet.badge')}</span>
            </div>
            
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
              {t('fleet.title1')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-accent-glow">{t('fleet.title2')}</span>
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t('fleet.description')}
            </p>
          </div>

          {/* Vehicle Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {fleet.map((vehicle, index) => (
              <Card 
                key={index}
                className={`group relative overflow-hidden bg-gradient-to-br from-card/70 to-card/50 backdrop-blur-md border-2 border-border/40 hover:border-primary/60 transition-all duration-700 hover:shadow-[0_25px_70px_rgba(0,0,0,0.2)] flex flex-col rounded-3xl animate-in fade-in slide-in-from-bottom-6 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 150}ms`, animationDuration: '800ms' }}
              >
                {/* Animated gradient border effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/0 via-primary/10 to-accent/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Enhanced shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out" />
                </div>
                {/* Content */}
                <div className="relative z-10 p-10 flex-1 flex flex-col">
                  <Badge className="w-fit mb-5 bg-gradient-to-r from-primary via-primary-light to-accent backdrop-blur-sm border border-primary-foreground/10 text-primary-foreground font-bold tracking-wider shadow-lg text-xs px-4 py-1.5">
                    {vehicle.category}
                  </Badge>
                  <h3 className="font-display text-4xl font-bold mb-6 text-foreground group-hover:text-primary transition-colors duration-300">
                    {vehicle.name}
                  </h3>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-primary" strokeWidth={1.5} />
                      <span className="text-muted-foreground font-medium">{vehicle.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Gauge className="w-4 h-4 text-primary" strokeWidth={1.5} />
                      <span className="text-muted-foreground font-medium">{vehicle.speed}</span>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-3 mb-6">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-accent" />
                      {t('fleet.included')}
                    </h4>
                    {vehicle.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                        <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Safety Badge */}
                  <div className="bg-muted/30 rounded-xl p-3 mb-6 border border-border/30">
                    <div className="flex items-center gap-2 text-xs">
                      <Shield className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground font-semibold">{t('fleet.safety')}</span>
                    </div>
                  </div>

                  {/* Price & CTA - More Prominent */}
                  <div className="mt-auto">
                    {/* Prominent Price Display */}
                    <div className="bg-gradient-to-br from-primary/15 via-primary/10 to-accent/10 rounded-2xl p-6 mb-6 border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-300 group-hover:shadow-[0_8px_30px_rgba(var(--primary),0.2)]">
                      <div className="flex items-baseline justify-center gap-2 mb-2">
                        <span className="text-sm text-muted-foreground uppercase tracking-wider font-bold">{t('fleet.priceLabel')}</span>
                      </div>
                      <div className="text-center">
                        <div className="text-5xl font-black text-primary mb-1 tracking-tight">{vehicle.price}</div>
                        <div className="text-sm text-muted-foreground font-semibold">{t('fleet.per30min')}</div>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => {
                        setSelectedVehicle(vehicle);
                        setBookingOpen(true);
                      }}
                      className="w-full font-bold text-base px-8 py-7 bg-gradient-to-r from-primary via-primary-light to-accent hover:from-accent hover:via-primary-light hover:to-primary shadow-[0_8px_30px_rgba(var(--primary),0.4)] hover:shadow-[0_12px_40px_rgba(var(--primary),0.6)] transition-all duration-300 hover:scale-[1.02] rounded-xl group/btn relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {t('fleet.bookNow')}
                        <ChevronDown className="w-5 h-5 rotate-[-90deg] group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        vehicleName={selectedVehicle?.name || ""}
        vehiclePrice={selectedVehicle?.price || ""}
        basePricePerHalfHour={selectedVehicle?.basePricePerHalfHour || 0}
      />
    </>
  );
};

export default Properties;
