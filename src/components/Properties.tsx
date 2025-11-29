import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookingDialog } from "./BookingDialog";
import { Users, Gauge, Shield, ChevronDown, ShoppingCart, Calendar } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { supabase } from "@/integrations/supabase/client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const Properties = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useIntersectionObserver();
  const { addToCart } = useCart();
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
      <section id="fleet" className="section-padding bg-gradient-to-b from-background via-background/95 to-background">
        <div ref={ref} className={`container mx-auto px-6 lg:px-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <div className="inline-block mb-4">
              <div className="h-1 w-24 bg-gradient-to-r from-primary via-accent to-primary rounded-full animate-pulse mb-4 mx-auto" />
              <h2 className="font-display text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t('fleet.title1')} {t('fleet.title2')}
              </h2>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed mx-auto">
              {t('fleet.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {fleet.map((vehicle, index) => (
              <article 
                key={index}
                className="group relative overflow-hidden rounded-xl border-4 border-primary shadow-[0_0_30px_rgba(0,150,255,0.3)] hover:shadow-[0_0_50px_rgba(0,150,255,0.5)] transition-all duration-300 animate-fade-in bg-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                
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
                              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-3" />
                      <CarouselNext className="right-3" />
                    </Carousel>
                  </div>
                ) : (
                  <div className="relative aspect-[4/3] bg-muted flex items-center justify-center">
                    <div className="text-center p-6 relative z-10">
                      <Shield className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">{vehicle.name}</p>
                      <p className="text-xs text-muted-foreground/70 mt-1">Photos coming soon</p>
                    </div>
                  </div>
                )}
                
                <div className="p-6 relative z-10 bg-gradient-to-b from-background/95 to-background">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary" />
                  
                  <div className="text-xs font-bold tracking-widest uppercase text-accent mb-3 pt-3 flex items-center gap-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
                    {vehicle.category}
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
                  </div>
                  
                  <h3 className="font-display text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {vehicle.name}
                  </h3>

                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-primary" strokeWidth={1.5} />
                      <span className="text-xs text-muted-foreground">{vehicle.capacity}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Gauge className="w-4 h-4 text-primary" strokeWidth={1.5} />
                      <span className="text-xs text-muted-foreground">{vehicle.speed}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-6 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                    {vehicle.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                        <span className="text-xs text-muted-foreground leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border space-y-3">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-xl font-semibold text-foreground">{vehicle.price}</div>
                        <div className="text-xs text-muted-foreground">{t('fleet.per30min')}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          addToCart({
                            vehicleId: vehicle.id,
                            vehicleName: vehicle.name,
                            vehiclePrice: vehicle.price,
                            basePricePerHalfHour: vehicle.basePricePerHalfHour,
                            duration: 30,
                          });
                          toast.success('Added to cart!');
                        }}
                        size="sm"
                        variant="outline"
                        className="flex-1"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedVehicle(vehicle);
                          setBookingOpen(true);
                        }}
                        size="sm"
                        className="flex-1"
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        {t('fleet.bookNow')}
                      </Button>
                    </div>
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
