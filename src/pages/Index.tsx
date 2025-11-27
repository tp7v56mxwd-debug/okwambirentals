import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Properties from "@/components/Properties";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Properties />
      <Contact />
      
      <footer className="bg-gradient-to-br from-foreground to-foreground/90 text-background py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <div>
                <div className="font-bold text-lg">Okwambi Rentals</div>
                <div className="text-sm text-background/70">Be Fearless</div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-background/90 mb-1">&copy; 2024 Okwambi Rentals. All rights reserved.</p>
              <p className="text-sm text-background/70">Mussulo Peninsula, Luanda, Angola</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
