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
      <img
        src={heroImage}
        alt="Mussulo Beach - Premium Adventure Destination in Luanda, Angola"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      
      {/* Enhanced Gradient Overlay - Darker for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      
      {/* Animated Gradient Accent */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-accent/30 animate-pulse" style={{ animationDuration: '4s' }} />
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
        backgroundSize: '48px 48px'
      }} />
      
      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
        {/* Main Headline */}
        <h1 className="font-display text-6xl md:text-7xl lg:text-9xl font-black mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 leading-[1.05] tracking-tighter">
          <span className="block text-white drop-shadow-[0_4px_20px_rgba(0,0,0,1)] filter brightness-110">Experience</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-accent-glow to-accent drop-shadow-[0_4px_24px_rgba(245,166,35,0.8)] filter brightness-125 animate-[shimmer_3s_ease-in-out_infinite] [text-shadow:0_0_40px_rgba(245,166,35,0.5)]">
            Mussulo
          </span>
        </h1>
        
        {/* Subtitle with Premium Styling */}
        <p className="text-xl md:text-2xl lg:text-3xl text-white mb-12 max-w-3xl mx-auto leading-relaxed font-bold tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,1)] filter brightness-110 animate-in fade-in duration-1000 delay-200">
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
            className="group relative overflow-hidden bg-gradient-to-r from-accent via-accent-glow to-accent hover:from-accent-glow hover:via-accent hover:to-accent-glow text-primary font-black tracking-wider shadow-[0_12px_48px_rgba(245,166,35,0.6)] hover:shadow-[0_20px_60px_rgba(245,166,35,0.8)] transition-all duration-500 hover:-translate-y-2 hover:scale-110 px-14 py-8 text-lg rounded-2xl border-2 border-accent-glow before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:via-white/40 before:to-white/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500"
          >
            <span className="relative z-10 flex items-center gap-3 drop-shadow-sm">
              {t('hero.exploreFleet')}
              <ChevronDown className="w-6 h-6 group-hover:translate-y-1 group-hover:animate-bounce transition-all duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </Button>
          <Button 
            size="lg" 
            onClick={() => setBookingOpen(true)}
            className="group relative overflow-hidden bg-white backdrop-blur-sm border-3 border-white text-primary hover:bg-accent hover:text-primary hover:border-accent font-black tracking-wider shadow-[0_12px_48px_rgba(255,255,255,0.5)] hover:shadow-[0_20px_60px_rgba(245,166,35,0.8)] transition-all duration-500 hover:-translate-y-2 hover:scale-110 px-14 py-8 text-lg rounded-2xl before:absolute before:inset-0 before:bg-gradient-to-r before:from-accent/0 before:via-accent/30 before:to-accent/0 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500"
          >
            <span className="relative z-10 drop-shadow-sm">{t('hero.reserveNow')}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
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
