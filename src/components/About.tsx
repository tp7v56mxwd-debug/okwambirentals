import { MapPin, Waves, Zap } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden" style={{ background: 'var(--gradient-subtle)' }}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            WHY CHOOSE US
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Adventure on Land & <span className="text-gradient">Sea</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the thrill of Mussulo with our premium ATV, UTV, and jet ski rentals. 
            Professional equipment, expert guidance, unforgettable memories.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="group text-center p-8 bg-card rounded-2xl shadow-md hover-lift border border-border/50">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/50 text-white mb-6 group-hover:scale-110 transition-transform">
              <MapPin className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-card-foreground">Prime Location</h3>
            <p className="text-muted-foreground leading-relaxed">
              Located on Mussulo Peninsula with direct beach and ocean access for ultimate adventure
            </p>
          </div>
          
          <div className="group text-center p-8 bg-card rounded-2xl shadow-md hover-lift border border-border/50">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-accent/50 text-white mb-6 group-hover:scale-110 transition-transform">
              <Waves className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-card-foreground">Water Sports</h3>
            <p className="text-muted-foreground leading-relaxed">
              Top-quality jet skis for exploring crystal-clear turquoise waters and coastline
            </p>
          </div>
          
          <div className="group text-center p-8 bg-card rounded-2xl shadow-md hover-lift border border-border/50">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/50 text-white mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-card-foreground">Off-Road Thrills</h3>
            <p className="text-muted-foreground leading-relaxed">
              Premium ATVs and UTVs for beach riding and exploring Mussulo's terrain
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
