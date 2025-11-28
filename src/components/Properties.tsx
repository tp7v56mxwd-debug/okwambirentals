import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookingDialog } from "./BookingDialog";
import { Users, Gauge, Shield, ChevronDown } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { supabase } from "@/integrations/supabase/client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Properties = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useIntersectionObserver();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [vehiclePhotos, setVehiclePhotos] = useState<Record<string, string[]>>({});

  useEffect(() => {
    fetchVehiclePhotos();
  }, []);

  const fetchVehiclePhotos = async () => {
    try {
      const { data, error } = await supabase
        .from("vehicle_photos")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Failed to load vehicle photos:", error);
        return;
      }

      const photosByVehicle: Record<string, string[]> = {};
      data?.forEach((photo) => {
        if (!photosByVehicle[photo.vehicle_type]) {
          photosByVehicle[photo.vehicle_type] = [];
        }
        photosByVehicle[photo.vehicle_type].push(photo.image_url);
      });

      setVehiclePhotos(photosByVehicle);
    } catch (error) {
      console.error("Unexpected error loading photos:", error);
    }
  };
  
  const fleet = [
    {
      id: "jetski",
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
      id: "atv",
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
      id: "utv",
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
      <section id="fleet" className="py-32 bg-muted/30">
        <div ref={ref} className={`container mx-auto px-6 lg:px-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Section Header */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-16 bg-accent" />
              <span className="text-sm font-semibold tracking-[0.2em] uppercase text-muted-foreground">{t('fleet.badge')}</span>
            </div>
            
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] max-w-4xl">
              {t('fleet.title1')}{' '}
              <span className="text-accent">{t('fleet.title2')}</span>
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed mt-6 max-w-2xl">
              {t('fleet.description')}
            </p>
          </div>

          {/* Vehicle Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 bg-border">
            {fleet.map((vehicle, index) => (
              <article 
                key={index}
                className="group relative overflow-hidden bg-background transition-all duration-300 hover:bg-muted/50"
              >
                {/* Vehicle Image Gallery */}
                {vehiclePhotos[vehicle.id] && vehiclePhotos[vehicle.id].length > 0 ? (
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Carousel className="w-full h-full">
                      <CarouselContent>
                        {vehiclePhotos[vehicle.id].map((photoUrl, photoIndex) => (
                          <CarouselItem key={photoIndex}>
                            <img
                              src={photoUrl}
                              alt={`${vehicle.name} ${photoIndex + 1}`}
                              loading="lazy"
                              decoding="async"
                              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-4" />
                      <CarouselNext className="right-4" />
                    </Carousel>
                  </div>
                ) : (
                  <div className="relative aspect-[4/3] bg-muted flex items-center justify-center">
                    <div className="text-center p-6">
                      <Shield className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground font-medium">{vehicle.name}</p>
                      <p className="text-xs text-muted-foreground/70 mt-1">Photos coming soon</p>
                    </div>
                  </div>
                )}
                
                {/* Content */}
                <div className="p-8">
                  <div className="text-xs font-bold tracking-[0.15em] uppercase text-accent mb-3">
                    {vehicle.category}
                  </div>
                  
                  <h3 className="font-display text-3xl font-bold mb-4 text-foreground">
                    {vehicle.name}
                  </h3>

                  {/* Specs */}
                  <div className="flex items-center gap-6 mb-6 pb-6 border-b border-border">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{vehicle.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{vehicle.speed}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-8">
                    {vehicle.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-1 h-1 rounded-full bg-accent flex-shrink-0 mt-2" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-end justify-between pt-6 border-t border-border">
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t('fleet.priceLabel')}</div>
                      <div className="text-3xl font-bold text-foreground">{vehicle.price}</div>
                      <div className="text-xs text-muted-foreground">{t('fleet.per30min')}</div>
                    </div>
                    <Button
                      onClick={() => {
                        setSelectedVehicle(vehicle);
                        setBookingOpen(true);
                      }}
                      variant="default"
                      className="font-semibold transition-all duration-300"
                    >
                      {t('fleet.bookNow')}
                    </Button>
                  </div>
                </div>
              </article>
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
