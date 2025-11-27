import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BedDouble, Waves } from "lucide-react";

const Properties = () => {
  const properties = [
    {
      title: "Beachfront Villa",
      description: "Luxurious oceanfront property with private beach access",
      guests: 8,
      bedrooms: 4,
      features: "Direct beach access",
    },
    {
      title: "Coastal Apartment",
      description: "Modern apartment with stunning sea views",
      guests: 4,
      bedrooms: 2,
      features: "Ocean view terrace",
    },
    {
      title: "Island Retreat",
      description: "Secluded paradise perfect for relaxation",
      guests: 6,
      bedrooms: 3,
      features: "Private pool",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Featured Properties</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our collection of carefully curated rental properties
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {properties.map((property, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-primary to-accent" />
              <CardHeader>
                <CardTitle>{property.title}</CardTitle>
                <CardDescription>{property.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{property.guests} guests</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BedDouble className="w-4 h-4" />
                    <span>{property.bedrooms} beds</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Waves className="w-4 h-4" />
                    <span>{property.features}</span>
                  </div>
                </div>
                <Button className="w-full">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Properties;
