import { MapPin, Waves, Zap, Shield } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden" style={{ background: 'var(--gradient-subtle)' }}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-primary/10 text-primary font-bold text-sm tracking-wider rounded-full border border-primary/20">
              THE WAMBI EXPERIENCE
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent leading-tight">
            Adventure on Land & Sea
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
            Experience the thrill of Mussulo Peninsula with our premium fleet of adventure vehicles
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl transform rotate-2 group-hover:rotate-3 transition-all duration-500 blur-sm" />
            <div className="relative bg-card p-10 rounded-3xl shadow-soft hover:shadow-elegant transition-all duration-500 border border-border/50 hover:border-primary/30 hover:-translate-y-3 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-soft">
                <Zap className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-foreground">Premium Vehicles</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">
                Top-tier ATVs, UTVs, and Jet Skis maintained to perfection for your ultimate adventure experience
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 rounded-3xl transform -rotate-2 group-hover:-rotate-3 transition-all duration-500 blur-sm" />
            <div className="relative bg-card p-10 rounded-3xl shadow-soft hover:shadow-elegant transition-all duration-500 border border-border/50 hover:border-accent/30 hover:-translate-y-3 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-glow flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-soft">
                <Shield className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-foreground">Safety First</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">
                Professional safety briefings, quality gear, and experienced guides ensure your adventure is thrilling yet secure
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl transform rotate-2 group-hover:rotate-3 transition-all duration-500 blur-sm" />
            <div className="relative bg-card p-10 rounded-3xl shadow-soft hover:shadow-elegant transition-all duration-500 border border-border/50 hover:border-primary/30 hover:-translate-y-3 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-soft">
                <MapPin className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-black mb-4 text-foreground">Epic Location</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">
                Explore Mussulo's stunning beaches, dunes, and waters - Angola's premier adventure destination
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
