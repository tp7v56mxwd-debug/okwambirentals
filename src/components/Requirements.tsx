import { Shield, FileCheck, CreditCard, Calendar } from "lucide-react";

const Requirements = () => {
  const requirements = [
    {
      icon: FileCheck,
      title: "Valid ID Required",
      description: "Bring a valid government-issued ID or passport. International visitors welcome with valid documentation."
    },
    {
      icon: Shield,
      title: "Age Requirements",
      description: "Must be 18+ years old. Minors allowed as passengers with adult supervision and signed waiver."
    },
    {
      icon: CreditCard,
      title: "Security Deposit",
      description: "Refundable security deposit required at check-in. Accepted: Cash, Credit/Debit cards."
    },
    {
      icon: Calendar,
      title: "Booking Policy",
      description: "Cancel up to 24 hours before for full refund. Late cancellations subject to 50% charge."
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-primary/10 text-primary font-bold text-sm tracking-wider rounded-full border border-primary/20">
              BEFORE YOU RIDE
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 text-foreground leading-tight">
            What You Need to Know
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
            Quick essentials for a smooth rental experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {requirements.map((req, index) => {
            const Icon = req.icon;
            return (
              <div
                key={req.title}
                className="group relative animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-elegant transition-all duration-500 border border-border/50 hover:border-primary/30 h-full">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-black mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {req.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {req.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 border border-primary/20">
          <h3 className="text-2xl font-black text-foreground mb-4">Safety First</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            All rentals include comprehensive safety briefings, premium protective equipment, and clear operating instructions. 
            Our experienced staff ensures you're comfortable and confident before your adventure begins.
          </p>
          <p className="text-sm text-muted-foreground font-bold">
            Emergency contact and support available throughout your rental period.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Requirements;
