import { Button } from "@/components/ui/button";
import { Users, Gauge } from "lucide-react";

const Properties = () => {
  const fleet = [
    {
      name: "Jet Ski",
      icon: "🌊",
      capacity: "1-2 Riders",
      speed: "Up to 65 mph",
      price: "45.000 Kz",
      features: [
        "Professional life jackets included",
        "Ocean and coastline access",
        "Safety briefing & training",
        "Fuel included in rental"
      ]
    },
    {
      name: "ATV",
      icon: "🏍️",
      capacity: "1 Rider",
      speed: "Variable speeds",
      price: "30.000 Kz",
      features: [
        "Premium safety gear provided",
        "Beach & dune exploration",
        "Easy to ride for beginners",
        "Guided route suggestions"
      ]
    },
    {
      name: "UTV",
      icon: "🚙",
      capacity: "2-4 Passengers",
      speed: "Off-road capable",
      price: "50.000 Kz",
      features: [
        "Roll cage & safety harnesses",
        "Perfect for groups & families",
        "All-terrain capability",
        "Comfortable seating"
      ]
    },
  ];

  return (
    <section id="fleet" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-accent/10 text-accent font-bold text-sm tracking-wider rounded-full border border-accent/20">
              CHOOSE YOUR ADVENTURE
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent leading-tight">
            Our Fleet
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
            Premium vehicles ready to unleash your Wambi spirit
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {fleet.map((vehicle, index) => (
            <div
              key={vehicle.name}
              className="group relative animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-card rounded-3xl shadow-soft hover:shadow-elegant transition-all duration-500 overflow-hidden border border-border/50 hover:border-primary/30 hover:-translate-y-3">
                <div className="aspect-video bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-accent/0 to-primary/0 group-hover:from-primary/10 group-hover:via-accent/10 group-hover:to-primary/10 transition-all duration-500" />
                  <div className="text-center relative z-10">
                    <span className="text-7xl mb-3 block transform group-hover:scale-110 transition-transform duration-500">{vehicle.icon}</span>
                    <span className="text-base font-bold text-muted-foreground uppercase tracking-wide">{vehicle.name}</span>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-3xl font-black mb-4 text-foreground group-hover:text-primary transition-colors duration-300">{vehicle.name}</h3>
                  
                  <div className="flex gap-4 mb-6">
                    <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm font-bold">{vehicle.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg">
                      <Gauge className="w-4 h-4 text-accent" />
                      <span className="text-sm font-bold">{vehicle.speed}</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 mb-6 border border-primary/20 relative overflow-hidden group-hover:border-primary/40 transition-colors duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
                    <div className="relative">
                      <div className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">{vehicle.price}</div>
                      <div className="text-sm text-muted-foreground font-bold uppercase tracking-wide">Per 30 minutes</div>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {vehicle.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-accent-glow mt-1.5 flex-shrink-0" />
                        <span className="font-medium leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full text-base py-7 font-bold shadow-soft hover:shadow-accent transition-all duration-300 bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary">
                    Book Your Adventure
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Properties;
