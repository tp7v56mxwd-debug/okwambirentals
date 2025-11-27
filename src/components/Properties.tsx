import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, Gauge, Check } from "lucide-react";
import { BookingDialog } from "./BookingDialog";

const Properties = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState({ name: "", price: "", basePrice: 0 });
  
  const fleet = [
    {
      name: "Jet Ski",
      category: "Water Adventure",
      capacity: "1-2 Riders",
      speed: "Up to 65 mph",
      price: "45.000 Kz",
      basePrice: 45000,
      features: [
        "Professional life jackets included",
        "Ocean and coastline access",
        "Safety briefing & training",
        "Fuel included in rental"
      ]
    },
    {
      name: "ATV",
      category: "Land Exploration",
      capacity: "1 Rider",
      speed: "Variable speeds",
      price: "30.000 Kz",
      basePrice: 30000,
      features: [
        "Premium safety gear provided",
        "Beach & dune exploration",
        "Easy to ride for beginners",
        "Guided route suggestions"
      ]
    },
    {
      name: "UTV",
      category: "Family Experience",
      capacity: "2-4 Passengers",
      speed: "Off-road capable",
      price: "50.000 Kz",
      basePrice: 50000,
      features: [
        "Roll cage & safety harnesses",
        "Perfect for groups & families",
        "All-terrain capability",
        "Comfortable seating"
      ]
    },
  ];

  return (
    <>
      <section id="fleet" className="py-32 relative overflow-hidden bg-gradient-to-b from-background via-muted/10 to-background">
        {/* Elegant Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/5 border border-accent/10 rounded-full mb-6">
              <span className="text-accent text-sm font-semibold tracking-widest uppercase">Our Fleet</span>
            </div>
            
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
              Choose Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-accent-glow">Adventure</span>
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Premium vehicles meticulously maintained for your ultimate adventure experience
            </p>
          </div>

          {/* Fleet Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {fleet.map((vehicle, index) => (
              <div
                key={vehicle.name}
                className="group relative"
              >
                {/* Hover Glow Effect */}
                <div className="absolute -inset-px bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Card */}
                <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/20 transition-all duration-500 overflow-hidden hover:shadow-luxury">
                  {/* Image Placeholder with Category Badge */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                    <span className="relative font-display text-6xl font-bold text-foreground/10 group-hover:text-foreground/20 transition-colors">
                      {vehicle.name}
                    </span>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-background/90 backdrop-blur-sm border border-border/50 rounded-full">
                      <span className="text-xs font-semibold text-foreground tracking-wide">{vehicle.category}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    {/* Title */}
                    <h3 className="font-display text-3xl font-bold text-foreground mb-2">
                      {vehicle.name}
                    </h3>

                    {/* Specs */}
                    <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" strokeWidth={1.5} />
                        <span>{vehicle.capacity}</span>
                      </div>
                      <div className="w-px h-4 bg-border" />
                      <div className="flex items-center gap-1.5">
                        <Gauge className="w-4 h-4" strokeWidth={1.5} />
                        <span>{vehicle.speed}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {vehicle.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" strokeWidth={2} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Price and CTA */}
                    <div className="pt-6 border-t border-border/50">
                      <div className="flex items-end justify-between mb-4">
                        <div>
                          <div className="text-xs text-muted-foreground font-medium tracking-wide uppercase mb-1">Starting from</div>
                          <div className="font-display text-3xl font-bold text-foreground">{vehicle.price}</div>
                          <div className="text-xs text-muted-foreground">per 30 minutes</div>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => {
                          setSelectedVehicle({ 
                            name: vehicle.name, 
                            price: vehicle.price, 
                            basePrice: vehicle.basePrice 
                          });
                          setBookingOpen(true);
                        }}
                        className="w-full bg-primary hover:bg-primary-light text-primary-foreground font-semibold tracking-wide shadow-premium hover:shadow-luxury transition-all"
                      >
                        RESERVE NOW
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        vehicleName={selectedVehicle.name}
        vehiclePrice={selectedVehicle.price}
        basePricePerHalfHour={selectedVehicle.basePrice}
      />
    </>
  );
};

export default Properties;
