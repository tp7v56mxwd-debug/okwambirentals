import { Button } from "@/components/ui/button";
import heroImage from "@/assets/adventure-hero.jpg";

const Hero = () => {
  const scrollToFleet = () => {
    const element = document.getElementById('fleet');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center transform scale-105 animate-in zoom-in duration-1000"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0" style={{ background: 'var(--gradient-overlay)' }} />
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 leading-[0.9] tracking-tight">
          <span className="block text-white">Okwambi</span>
          <span className="block text-white">Rentals</span>
        </h1>
        
        <p className="text-2xl md:text-4xl lg:text-5xl mb-4 font-black text-white drop-shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 tracking-tight">
          Be Wambi. Live Fearless.
        </p>
        
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium text-white/90 drop-shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          Unleash your brave spirit on Mussulo's epic terrain
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
          <Button 
            size="lg" 
            onClick={scrollToFleet}
            className="text-lg px-10 py-7 bg-gradient-to-r from-accent to-accent-glow hover:from-accent-glow hover:to-accent text-accent-foreground font-bold shadow-accent hover:shadow-glow transition-all hover:-translate-y-1 hover:scale-105"
          >
            View Our Fleet
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={scrollToFleet}
            className="text-lg px-10 py-7 bg-white/5 backdrop-blur-md border-2 border-white/80 text-white hover:bg-white hover:text-primary font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 hover:scale-105"
          >
            Book Now
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
          <div className="w-1 h-3 rounded-full bg-white/50" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
