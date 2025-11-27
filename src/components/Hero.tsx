import { Button } from "@/components/ui/button";
import heroImage from "@/assets/mussulo-hero.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Okwambi Rentals
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white/90 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
          Experience paradise at Mussulo, Angola's premier coastal destination
        </p>
        <div className="flex gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            View Properties
          </Button>
          <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
