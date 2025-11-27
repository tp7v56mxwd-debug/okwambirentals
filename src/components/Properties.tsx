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
    },
    {
      title: "ATVs",
      description: "All-terrain vehicles for beach and dune exploration",
      capacity: "1 rider",
      speed: "Variable speeds",
      features: "Safety gear provided",
    },
    {
      title: "UTVs",
      description: "Side-by-side utility vehicles for group adventures",
      capacity: "2-4 passengers",
      speed: "Off-road capable",
      features: "Roll cage & harnesses",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Our Fleet</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your adventure with our premium selection of vehicles and watercraft
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {rentals.map((rental, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-primary to-accent" />
              <CardHeader>
                <CardTitle>{rental.title}</CardTitle>
                <CardDescription>{rental.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{rental.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4" />
                    <span>{rental.speed}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Waves className="w-4 h-4" />
                    <span>{rental.features}</span>
                  </div>
                </div>
                <Button className="w-full">Book Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Properties;
