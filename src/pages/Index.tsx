import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Properties from "@/components/Properties";
import { Reviews } from "@/components/Reviews";
import { BookingTracker } from "@/components/BookingTracker";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import SkipToContent from "@/components/SkipToContent";

const Index = () => {
  return (
    <>
      <SkipToContent />
      <ScrollProgress />
      <main id="main-content" className="min-h-screen">
        <Navigation />
        <Hero />
        <Properties />
        <Reviews />
        <BookingTracker />
        <Contact />
        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
};

export default Index;
