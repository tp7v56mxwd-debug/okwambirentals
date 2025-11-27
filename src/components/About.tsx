import { MapPin, Waves, Home } from "lucide-react";

const About = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Discover Mussulo</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A pristine peninsula where turquoise waters meet golden sands, just minutes from Luanda
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-card rounded-lg shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">Prime Location</h3>
            <p className="text-muted-foreground">
              Located on the stunning Mussulo Peninsula, offering easy access to pristine beaches and island life
            </p>
          </div>
          
          <div className="text-center p-6 bg-card rounded-lg shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
              <Waves className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">Beach Paradise</h3>
            <p className="text-muted-foreground">
              Crystal-clear waters perfect for swimming, water sports, and unforgettable sunsets
            </p>
          </div>
          
          <div className="text-center p-6 bg-card rounded-lg shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <Home className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">Premium Rentals</h3>
            <p className="text-muted-foreground">
              Carefully selected properties offering comfort, style, and authentic coastal living
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
