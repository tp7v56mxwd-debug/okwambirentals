import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Properties from "@/components/Properties";
import DailyPackages from "@/components/DailyPackages";
import About from "@/components/About";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import SkipToContent from "@/components/SkipToContent";
import QuickBookingForm from "@/components/QuickBookingForm";

const Index = () => {
  return (
    <>
      <SkipToContent />
      <ScrollProgress />
      <main id="main-content" className="min-h-screen">
        <Navigation />
        <Hero />
        <Properties />
        <DailyPackages />
        <About />
        <section id="quick-booking" className="py-16 px-4 bg-muted/30">
          <QuickBookingForm />
        </section>
        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
};

export default Index;
