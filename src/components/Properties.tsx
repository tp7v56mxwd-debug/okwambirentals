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
      price: "35.000 Kz",
      basePricePerHalfHour: 35000
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
      price: "30.000 Kz",
      basePricePerHalfHour: 30000
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
      <section id="fleet" className="py-32 relative overflow-hidden bg-gradient-to-b from-background via-muted/10 to-background">
        {/* Elegant Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fleet.map((vehicle, index) => (
              <Card 
                key={index}
                className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-md border border-border/40 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:-translate-y-2 flex flex-col rounded-2xl"
              >
                {/* Animated gradient border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
                {/* Content */}
                <div className="relative z-10 p-8 flex-1 flex flex-col">
                  <Badge className="w-fit mb-4 bg-gradient-to-r from-primary to-primary-light backdrop-blur-sm border border-primary-foreground/10 text-primary-foreground font-bold tracking-wider shadow-md">
                    {vehicle.category}
                  </Badge>
                  <h3 className="font-display text-3xl font-bold mb-4 text-foreground">
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

                  {/* Price & CTA */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between pt-6 border-t border-border/50">
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold">{t('fleet.priceLabel')}</div>
                        <div className="text-2xl font-black text-primary">{vehicle.price}</div>
                        <div className="text-xs text-muted-foreground">{t('fleet.per30min')}</div>
                      </div>
                      <Button
                        onClick={() => {
                          setSelectedVehicle(vehicle);
                          setBookingOpen(true);
                        }}
                        className="font-bold text-sm px-8 py-6 bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 rounded-xl group"
                      >
                        <span>{t('fleet.bookNow')}</span>
                        <ChevronDown className="ml-1 w-4 h-4 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
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
