import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Gauge, Waves } from "lucide-react";

const Properties = () => {
  const rentals = [
    {
      title: "Jet Skis",
      description: "High-performance watercraft for ocean adventures",
      capacity: "1-2 riders",
      speed: "Up to 65 mph",
      features: "Life jackets included",
      price: "45.000 Kz",
      duration: "30 minutes",
    },
    {
      title: "ATVs",
      description: "All-terrain vehicles for beach and dune exploration",
      capacity: "1 rider",
      speed: "Variable speeds",
      features: "Safety gear provided",
      price: "30.000 Kz",
      duration: "30 minutes",
    },
    {
      title: "UTVs",
      description: "Side-by-side utility vehicles for group adventures",
      capacity: "2-4 passengers",
      speed: "Off-road capable",
      features: "Roll cage & harnesses",
      price: "50.000 Kz",
      duration: "30 minutes",
    },
  ];

  return (
    <section id="fleet" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            OUR VEHICLES
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Choose Your <span className="text-gradient">Adventure</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Premium selection of vehicles and watercraft. All rentals include safety equipment, 
            briefing, and access to Mussulo's best spots.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {rentals.map((rental, index) => (
            <Card key={index} className="group overflow-hidden hover-lift border-2 border-border/50 hover:border-primary/50 transition-all">
              <div 
                className="h-64 relative overflow-hidden"
                style={{ background: 'var(--gradient-card)' }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
                    AVAILABLE NOW
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl">{rental.title}</CardTitle>
                <CardDescription className="text-base">{rental.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{rental.capacity}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Gauge className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{rental.speed}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Waves className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{rental.features}</span>
                  </div>
                </div>
                
                <div className="mb-6 p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border-2 border-primary/20">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-4xl font-black text-primary mb-1">{rental.price}</div>
                      <div className="text-sm text-muted-foreground font-medium">per {rental.duration}</div>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full text-base font-semibold" size="lg">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Properties;
