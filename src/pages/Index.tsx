import Hero from "@/components/Hero";
import About from "@/components/About";
import Properties from "@/components/Properties";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Properties />
      <Contact />
      
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Okwambi Rentals. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
