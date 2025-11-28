import { Button } from "@/components/ui/button";
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
      
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 lg:px-16 py-32 pb-24">
          {/* Text Content - Left Aligned */}
          <div className="max-w-5xl mb-24">
            {/* Eyebrow */}
            <div className="mb-10 flex items-center gap-3">
              <div className="h-px w-12 bg-foreground/20" />
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-muted-foreground">Premium Rentals</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="font-display text-7xl md:text-8xl lg:text-9xl font-normal mb-10 leading-[0.9] tracking-tight">
              <span className="block text-foreground">Experience</span>
              <span className="block text-accent italic">Mussulo</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl font-light">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
        
        {/* CTA Buttons - Centered */}
        <div className="border-t border-foreground/10 bg-background/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 lg:px-16 py-8">
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                onClick={scrollToFleet}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-12 py-6 rounded-none transition-all duration-200"
              >
                {t('hero.exploreFleet')}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setBookingOpen(true)}
                className="border-2 border-foreground font-medium px-12 py-6 rounded-none transition-all duration-200 hover:bg-foreground hover:text-background"
              >
                {t('hero.reserveNow')}
              </Button>
            </div>
          </div>
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
