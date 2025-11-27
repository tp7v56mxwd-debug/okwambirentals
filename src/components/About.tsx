import { Award, Shield, Users, Zap } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Award,
      title: "Premium Fleet",
      description: "Meticulously maintained collection of top-tier adventure vehicles, ensuring an exceptional experience every time."
    },
    {
      icon: Shield,
      title: "Safety Excellence",
      description: "Comprehensive safety protocols, professional-grade equipment, and expert guidance for complete peace of mind."
    },
    {
      icon: Zap,
      title: "Instant Booking",
      description: "Seamless reservation system with real-time availability and instant confirmation for your convenience."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Passionate professionals dedicated to delivering unforgettable adventures with personalized service."
    }
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Elegant Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full mb-6">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Why Choose Us</span>
          </div>
          
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
            Crafted for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-accent">Adventure</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            Located at the pristine Mussulo Peninsula, Okwambi Rentals is Luanda's premier destination 
            for water and land adventures. We combine top-quality equipment with professional service 
            to deliver safe, thrilling experiences for adventure seekers of all levels.
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Every vehicle in our fleet is rigorously maintained and includes comprehensive safety equipment. 
            Our experienced team provides thorough briefings, GPS tracking, and on-site support. Whether you're 
            a first-timer or an experienced rider, we ensure your adventure at Mussulo is unforgettable, 
            safe, and perfectly tailored to your skill level.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative"
            >
              {/* Subtle Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl transform transition-all duration-500 group-hover:scale-105 opacity-0 group-hover:opacity-100" />
              
              {/* Card Content */}
              <div className="relative bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-premium">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground mb-6 shadow-premium group-hover:shadow-luxury transition-all group-hover:-translate-y-1">
                  <feature.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                
                {/* Title */}
                <h3 className="font-display text-2xl font-bold mb-3 text-foreground">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
