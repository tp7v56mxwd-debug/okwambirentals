import { MapPin, Waves, Zap } from "lucide-react";

const About = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Adventure on Land & Sea</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the thrill of Mussulo with our premium ATV, UTV, and jet ski rentals
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-card rounded-lg shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">Prime Location</h3>
            <p className="text-muted-foreground">
              Located on Mussulo Peninsula with direct beach and ocean access for ultimate adventure
            </p>
          </div>
          
          <div className="text-center p-6 bg-card rounded-lg shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
              <Waves className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">Water Sports</h3>
            <p className="text-muted-foreground">
              Top-quality jet skis for exploring crystal-clear turquoise waters and coastline
            </p>
          </div>
          
          <div className="text-center p-6 bg-card rounded-lg shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">Off-Road Thrills</h3>
            <p className="text-muted-foreground">
              Premium ATVs and UTVs for beach riding and exploring Mussulo's terrain
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
