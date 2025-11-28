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
    <section id="hero" className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Mussulo Beach - Premium Adventure Destination in Luanda, Angola"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 lg:px-16 py-24 pb-32 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="mb-8 flex items-center gap-4">
            <div className="h-[2px] w-16 bg-accent" />
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-muted-foreground">Premium Adventure Rentals</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-8 leading-[0.95] tracking-tight">
            <span className="block text-foreground">Experience</span>
            <span className="block text-accent">Mussulo</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-16 leading-relaxed max-w-2xl">
            {t('hero.subtitle')}
          </p>
        </div>
        
        {/* CTA Buttons - Centered at bottom */}
        <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
          <Button 
            size="lg" 
            onClick={scrollToFleet}
            className="group bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-6 text-base transition-all duration-300"
          >
            {t('hero.exploreFleet')}
            <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => setBookingOpen(true)}
            className="border-2 font-semibold px-10 py-6 text-base transition-all duration-300 hover:bg-foreground/5"
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
