import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Users, Gauge, Shield, ShoppingCart, MessageCircle } from "lucide-react";
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
  const [vehiclePhotos, setVehiclePhotos] = useState<Record<string, string[]>>({});

  const openWhatsAppBooking = (vehicle: any) => {
    const message = `Hello Okwambi Rentals! I want to book:\n\n• Vehicle: ${vehicle.name}\n• Price: ${vehicle.price} per 30 minutes\n• Location: Mussulo Peninsula, Luanda\n\nPlease send me payment instructions.`;
    const whatsappUrl = `https://wa.me/447477963492?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

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
                className="group relative overflow-hidden rounded-xl border-4 border-primary shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in bg-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                
                {vehiclePhotos[vehicle.id] && vehiclePhotos[vehicle.id].length > 0 ? (
                  <div className="relative aspect-[4/3] overflow-hidden bg-background">
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
                  <div className="relative aspect-[4/3] bg-background flex items-center justify-center">
                    <div className="text-center p-6 relative z-10">
                      <Shield className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">{vehicle.name}</p>
                      <p className="text-xs text-muted-foreground/70 mt-1">Photos coming soon</p>
                    </div>
                  </div>
                )}
                
                <div className="p-6 relative z-10 bg-background">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary via-accent to-primary" />
                  
                  <div className="text-xs font-bold tracking-widest uppercase text-accent mb-3 pt-3 flex items-center gap-2">
                    <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
                    {vehicle.category}
                    <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
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

                  <div className="space-y-1.5 mb-6 p-4 rounded-lg bg-card border border-border">
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
                        onClick={() => openWhatsAppBooking(vehicle)}
                        size="sm"
                        className="flex-1 bg-[#25D366] hover:bg-[#20BA5A]"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
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
    </>
  );
};

export default Properties;
