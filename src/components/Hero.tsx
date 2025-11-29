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
    <section id="hero" className="relative min-h-[90vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Mussulo Beach - Premium Adventure Destination in Luanda, Angola"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-background/20" />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-20 pb-24 w-full">
        <div className="max-w-3xl mb-16 relative">
          {/* Animated glow background */}
          <div className="absolute -inset-8 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 blur-3xl opacity-60 animate-gradient -z-10" />
          
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-[1.1] tracking-tight">
            <span 
              className="block text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground animate-fade-in-up animate-gradient" 
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards', opacity: 0 }}
            >
              Experience
            </span>
            <span 
              className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-orange-400 to-accent animate-fade-in-up animate-gradient animate-glow" 
              style={{ animationDelay: '0.5s', animationFillMode: 'forwards', opacity: 0 }}
            >
              Mussulo
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
            {t('hero.subtitle')}
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          <Button 
            size="default"
            onClick={scrollToFleet}
            className="transition-colors"
          >
            {t('hero.exploreFleet')}
            <ChevronDown className="ml-2 w-4 h-4" />
          </Button>
          <Button 
            size="default"
            variant="outline"
            onClick={() => setBookingOpen(true)}
            className="transition-colors"
          >
            {t('hero.reserveNow')}
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
