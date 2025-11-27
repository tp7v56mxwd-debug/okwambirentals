import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/mussulo-beach.jpg";

const Hero = () => {
  const scrollToFleet = () => {
    const element = document.getElementById('fleet');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          transform: 'scale(1.1)',
        }}
      />
      
      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-overlay)' }} />
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />
      
      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
        {/* Main Headline */}
        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 leading-[1.1] tracking-tight">
          <span className="block text-white">Experience</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-accent-glow to-accent">Mussulo</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
          Your gateway to unforgettable adventures at Mussulo Peninsula. Professional equipment, expert guidance, and unmatched safety standards.
        </p>
        
        {/* Luxury Divider */}
        <div className="flex items-center justify-center gap-3 mb-12 animate-in fade-in duration-1000 delay-300">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent" />
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent" />
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
          <Button 
            size="lg" 
            onClick={scrollToFleet}
            className="group bg-accent hover:bg-accent-glow text-accent-foreground font-semibold tracking-wide shadow-glow hover:shadow-luxury transition-all hover:-translate-y-0.5 px-10 py-6 text-base"
          >
            <span>EXPLORE FLEET</span>
            <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={scrollToFleet}
            className="bg-white/5 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white hover:text-primary font-semibold tracking-wide shadow-premium hover:shadow-luxury transition-all hover:-translate-y-0.5 px-10 py-6 text-base"
          >
            RESERVE NOW
          </Button>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/60 text-sm animate-in fade-in duration-1000 delay-500">
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-white/30" />
            <span className="font-medium tracking-wide">PREMIUM FLEET</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-white/30" />
            <span className="font-medium tracking-wide">CERTIFIED SAFETY</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-white/30" />
            <span className="font-medium tracking-wide">EXPERT GUIDANCE</span>
          </div>
        </div>
      </div>
      
      {/* Elegant Scroll Indicator */}
      <button 
        onClick={scrollToFleet}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors group animate-bounce"
      >
        <span className="text-xs font-semibold tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent" />
      </button>
    </section>
  );
};

export default Hero;
