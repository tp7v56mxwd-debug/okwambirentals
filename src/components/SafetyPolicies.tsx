import { Shield, AlertTriangle, FileCheck, Clock, CreditCard, PhoneCall } from "lucide-react";

const SafetyPolicies = () => {
  const policies = [
    {
      icon: Shield,
      title: "Safety Equipment",
      description: "All rentals include premium safety equipment to ensure your adventure is both thrilling and secure.",
      items: [
        "Professional grade helmets (all sizes)",
        "Premium life jackets (jet skis)",
        "Protective gear (ATVs & UTVs)",
        "GPS tracking on all vehicles",
        "Emergency communication devices",
        "First aid kits on-site"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Rental Rules",
      description: "Clear rules to keep everyone safe while maximizing your adventure experience.",
      items: [
        "16+ with valid ID (parental consent if under 18)",
        "Driver's license required for ATVs/UTVs",
        "No alcohol or drugs before/during rental",
        "Stay within designated zones and routes",
        "Follow all staff instructions and briefings",
        "Report any issues immediately"
      ]
    },
    {
      icon: CreditCard,
      title: "Deposit & Payment",
      description: "Transparent pricing and refundable deposits for your peace of mind.",
      items: [
        "Jet Ski: 50.000 Kz refundable deposit",
        "ATV: 60.000 Kz refundable deposit", 
        "UTV: 80.000 Kz refundable deposit",
        "Deposits returned within 24 hours",
        "Credit card or cash accepted",
        "Full refund if equipment returned safely on time"
      ]
    },
    {
      icon: Clock,
      title: "Timing & Returns",
      description: "Flexible rental durations with clear policies on timing and late returns.",
      items: [
        "Operating hours: 9:00 AM - 6:00 PM daily",
        "Last rental starts at 5:30 PM",
        "15-minute grace period for returns",
        "Late returns charged at 2x hourly rate",
        "Early returns: No partial refunds",
        "Free rescheduling up to 24 hours before"
      ]
    },
    {
      icon: FileCheck,
      title: "Damage Policy",
      description: "Fair and transparent damage policies that protect both you and our equipment.",
      items: [
        "Pre-rental inspection documented with photos",
        "Normal wear and tear is expected",
        "Reckless damage: Deposit forfeited + repair costs",
        "Minor scratches: No charge",
        "Lost/stolen equipment: Full replacement cost",
        "Insurance options available (recommended)"
      ]
    },
    {
      icon: PhoneCall,
      title: "Emergency Support",
      description: "24/7 support and emergency assistance for complete peace of mind.",
      items: [
        "24/7 emergency hotline: +244 923 456 789",
        "Staff on-site during operating hours",
        "First aid trained personnel",
        "Quick response team for breakdowns",
        "Direct line to local authorities if needed",
        "Immediate replacement vehicles when available"
      ]
    }
  ];

  return (
    <section id="policies" className="py-32 relative overflow-hidden bg-gradient-to-b from-muted/20 to-background">
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full mb-6">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Safety First</span>
          </div>
          
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
            Our Policies &
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-accent-glow">Safety Standards</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Crystal clear policies designed for your safety, security, and peace of mind
          </p>
        </div>

        {/* Policies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {policies.map((policy, index) => (
            <div 
              key={index}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-premium h-full">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground mb-6 shadow-subtle group-hover:shadow-premium transition-all group-hover:-translate-y-1">
                  <policy.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                
                {/* Title */}
                <h3 className="font-display text-xl font-bold mb-3 text-foreground">
                  {policy.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {policy.description}
                </p>
                
                {/* Items */}
                <ul className="space-y-3">
                  {policy.items.map((item, idx) => (
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

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20 max-w-2xl mx-auto">
            <h3 className="font-display text-2xl font-bold mb-3 text-foreground">
              Questions About Our Policies?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our team is here to answer any questions you have about safety, deposits, or rental terms.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold hover:shadow-luxury transition-all duration-300 hover:-translate-y-1"
            >
              <PhoneCall className="w-5 h-5" />
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetyPolicies;
