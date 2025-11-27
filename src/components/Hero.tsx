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
        <div className="inline-block mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <span className="text-sm font-semibold tracking-wider">MUSSULO ADVENTURES</span>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100 leading-tight">
          <span className="block">Okwambi</span>
          <span className="block text-accent">Rentals</span>
        </h1>
        
        <p className="text-2xl md:text-3xl mb-12 max-w-3xl mx-auto font-bold text-white drop-shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          Be Fearless. Conquer Land & Sea at Mussulo
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <Button 
            size="lg" 
            onClick={scrollToFleet}
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            View Our Fleet
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={scrollToFleet}
            className="text-lg px-8 py-6 bg-white/10 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-primary shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
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
