import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Properties from "@/components/Properties";
import DailyPackages from "@/components/DailyPackages";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import SkipToContent from "@/components/SkipToContent";
import TrustBadges from "@/components/TrustBadges";
import StickyBookingBar from "@/components/StickyBookingBar";

const Index = () => {
  return (
    <>
      <SkipToContent />
      <ScrollProgress />
      <main id="main-content" className="min-h-screen">
        <Navigation />
        <Hero />
        <div className="container mx-auto px-6 lg:px-8">
          <TrustBadges />
        </div>
        <Properties />
        <DailyPackages />
        <About />
        <Contact />
        <Footer />
        <WhatsAppButton />
        <StickyBookingBar />
      </main>
    </>
  );
};

export default Index;
