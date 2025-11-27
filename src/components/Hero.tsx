import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/mussulo-beach.jpg";
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { BookingDialog } from "./BookingDialog";

const Hero = () => {
  const { t } = useTranslation();
  const [bookingOpen, setBookingOpen] = useState(false);
  
  const scrollToFleet = () => {
    const element = document.getElementById('fleet');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          transform: 'scale(1.05)',
        }}
        role="img"
        aria-label="Mussulo Beach panoramic view"
      />
      
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/80 backdrop-blur-[2px]" />
      
      {/* Animated Gradient Accent */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 animate-pulse" style={{ animationDuration: '4s' }} />
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
        backgroundSize: '48px 48px'
      }} />
      
      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
        {/* Main Headline */}
        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 leading-[1.1] tracking-tight">
          <span className="block text-white">Experience</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-accent-glow to-accent">Mussulo</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
          {t('hero.subtitle')}
        </p>
        
        {/* Luxury Divider */}
        <div className="flex items-center justify-center gap-3 mb-12 animate-in fade-in duration-1000 delay-300">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent" />
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent" />
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
          <Button 
            size="lg" 
            onClick={scrollToFleet}
            className="group relative overflow-hidden bg-gradient-to-r from-accent to-accent-glow hover:from-accent-glow hover:to-accent text-accent-foreground font-bold tracking-wide shadow-[0_8px_30px_rgba(var(--accent),0.4)] hover:shadow-[0_12px_40px_rgba(var(--accent),0.6)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-12 py-7 text-base rounded-xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t('hero.exploreFleet')}
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Button>
          <Button 
            size="lg" 
            onClick={() => setBookingOpen(true)}
            className="group relative overflow-hidden bg-background/10 backdrop-blur-xl border-2 border-white/40 text-white hover:bg-white hover:text-primary hover:border-white font-bold tracking-wide shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 px-12 py-7 text-base rounded-xl"
          >
            <span className="relative z-10">{t('hero.reserveNow')}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Button>
        </div>
      </div>
      
      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        vehicleName=""
        vehiclePrice=""
        basePricePerHalfHour={0}
      />
    </section>
  );
};

export default Hero;
