import { Shield, FileCheck, CreditCard, Clock } from "lucide-react";

const Requirements = () => {
  const requirements = [
    {
      icon: FileCheck,
      title: "Valid Documentation",
      items: [
        "Driver's license (held for 2+ years)",
        "Government-issued ID or passport",
        "Minimum age: 21 years"
      ]
    },
    {
      icon: CreditCard,
      title: "Security Deposit",
      items: [
        "Refundable deposit required",
        "Credit card authorization",
        "Returned within 7-10 business days"
      ]
    },
    {
      icon: Clock,
      title: "Booking Policy",
      items: [
        "Free cancellation up to 24 hours",
        "Flexible rental durations",
        "Instant confirmation available"
      ]
    },
    {
      icon: Shield,
      title: "Safety Standards",
      items: [
        "Comprehensive safety briefing",
        "Premium protective equipment",
        "Professional guidance included"
      ]
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full mb-6">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Before You Start</span>
          </div>
          
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
            Simple & Clear
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-accent-glow">Requirements</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Everything you need to know before embarking on your adventure
          </p>
        </div>

        {/* Requirements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {requirements.map((req, index) => (
            <div 
              key={index}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-premium h-full">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground mb-6 shadow-subtle group-hover:shadow-premium transition-all group-hover:-translate-y-1">
                  <req.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                
                {/* Title */}
                <h3 className="font-display text-xl font-bold mb-4 text-foreground">
                  {req.title}
                </h3>
                
                {/* Items */}
                <ul className="space-y-3">
                  {req.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1 h-1 rounded-full bg-accent flex-shrink-0 mt-2" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Requirements;
